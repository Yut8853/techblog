import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content', 'articles');
const requiredStringFields = [
  'title',
  'description',
  'category',
  'date',
  'publishedAt',
  'readTime',
  'viewer',
  'thumbnail',
  'layout',
];

const errors = [];

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isDateLikeValue(value) {
  return value instanceof Date || isNonEmptyString(value);
}

function normalizeDateValue(value) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (isNonEmptyString(value)) {
    return value.trim();
  }

  return '';
}

function validateFilesArray(filePath, files) {
  if (files == null) {
    return;
  }

  if (!Array.isArray(files)) {
    errors.push(`${filePath}: files は配列である必要があります。`);
    return;
  }

  files.forEach((file, index) => {
    if (!file || typeof file !== 'object') {
      errors.push(
        `${filePath}: files[${index}] はオブジェクトである必要があります。`
      );
      return;
    }

    ['name', 'language', 'content'].forEach(key => {
      if (!isNonEmptyString(file[key])) {
        errors.push(`${filePath}: files[${index}].${key} は必須です。`);
      }
    });
  });
}

function validateCodeBlock(filePath, code) {
  if (code == null) {
    return;
  }

  if (!code || typeof code !== 'object') {
    errors.push(`${filePath}: code はオブジェクトである必要があります。`);
    return;
  }

  if (!isNonEmptyString(code.jsx)) {
    errors.push(`${filePath}: code.jsx は必須です。`);
  }

  if (!isNonEmptyString(code.css)) {
    errors.push(`${filePath}: code.css は必須です。`);
  }
}

function validateFrontmatter(fileName, data, content) {
  const filePath = path.join('content', 'articles', fileName);

  requiredStringFields.forEach(field => {
    const isValid =
      field === 'publishedAt'
        ? isDateLikeValue(data[field])
        : isNonEmptyString(data[field]);

    if (!isValid) {
      errors.push(`${filePath}: ${field} は必須です。`);
    }
  });

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    errors.push(`${filePath}: tags は1件以上の配列である必要があります。`);
  } else if (data.tags.some(tag => !isNonEmptyString(tag))) {
    errors.push(`${filePath}: tags には空文字を含められません。`);
  }

  const publishedAt = normalizeDateValue(data.publishedAt);

  if (publishedAt && !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    errors.push(
      `${filePath}: publishedAt は YYYY-MM-DD 形式で指定してください。`
    );
  }

  validateFilesArray(filePath, data.files);
  validateCodeBlock(filePath, data.code);

  if (!isNonEmptyString(content)) {
    errors.push(`${filePath}: 本文が空です。`);
  }
}

if (!fs.existsSync(contentDir)) {
  console.error('content/articles が見つかりません。');
  process.exit(1);
}

const articleFiles = fs
  .readdirSync(contentDir)
  .filter(file => file.endsWith('.md') && !file.startsWith('_'));

if (articleFiles.length === 0) {
  console.error('検証対象の記事がありません。');
  process.exit(1);
}

const seenSlugs = new Set();

for (const fileName of articleFiles) {
  const absolutePath = path.join(contentDir, fileName);
  const source = fs.readFileSync(absolutePath, 'utf8');
  const { data, content } = matter(source);
  const slug = fileName.replace(/\.md$/, '');

  if (seenSlugs.has(slug)) {
    errors.push(`content/articles/${fileName}: slug が重複しています。`);
  }
  seenSlugs.add(slug);

  validateFrontmatter(fileName, data, content.trim());
}

if (errors.length > 0) {
  console.error('コンテンツ検証に失敗しました。');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`コンテンツ検証OK: ${articleFiles.length}件`);

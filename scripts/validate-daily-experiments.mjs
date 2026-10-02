import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');
const files = fs
  .readdirSync(ARTICLES_DIR)
  .filter(name => /^daily-\d{4}-\d{2}-\d{2}-.+\.md$/.test(name));

const errors = [];
const dates = new Set();
const days = new Set();

for (const file of files) {
  const source = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
  const { data, content } = matter(source);

  const publishedAt = String(data.publishedAt || '');
  const day = Number(data.day || 0);
  const articleFiles = Array.isArray(data.files) ? data.files : [];

  if (data.dailyLab !== true) {
    errors.push(`${file}: dailyLab must be true`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    errors.push(`${file}: publishedAt must be YYYY-MM-DD`);
  }

  if (!Number.isInteger(day) || day < 1 || day > 365) {
    errors.push(`${file}: day must be 1..365`);
  }

  if (dates.has(publishedAt)) {
    errors.push(`${file}: duplicate publishedAt ${publishedAt}`);
  }
  dates.add(publishedAt);

  if (days.has(day)) {
    errors.push(`${file}: duplicate day ${day}`);
  }
  days.add(day);

  const required = new Map([
    ['index.html', 'html'],
    ['styles.css', 'css'],
    ['experiment.js', 'javascript'],
  ]);

  for (const [name, language] of required) {
    const entry = articleFiles.find(item => item?.name === name);
    if (!entry) {
      errors.push(`${file}: missing ${name}`);
      continue;
    }
    if (entry.language !== language) {
      errors.push(`${file}: ${name} language must be ${language}`);
    }
    if (!String(entry.content || '').trim()) {
      errors.push(`${file}: ${name} is empty`);
    }
  }

  if (!String(content || '').includes('## ')) {
    errors.push(`${file}: article body needs section headings`);
  }
}

if (errors.length) {
  console.error('Daily Lab validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Daily Lab validation OK: ${files.length} article(s)`);

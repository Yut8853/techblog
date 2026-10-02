import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import matter from 'gray-matter';
import { getThumbnailByCategory } from './config/thumbnails';
import type {
  Article,
  ArticleCode,
  ArticleFile,
  ArticleLayout,
  ArticleThumbnail,
  ArticleViewer,
  DynamicCategory,
} from './articles/types';

export type {
  Article,
  ArticleCode,
  ArticleFile,
  ArticleLayout,
  ArticleThumbnail,
  ArticleViewer,
  DynamicCategory,
};

interface ArticleFrontmatter {
  slug?: string;
  title?: string;
  description?: string;
  category?: string;
  categorySlug?: string;
  categoryDescription?: string;
  referenceTitle?: string;
  referenceUrl?: string;
  referencePlatform?: string;
  qualityScore?: number;
  tags?: string[];
  date?: string;
  publishedAt?: string;
  readTime?: string;
  viewer?: string;
  thumbnail?: string;
  layout?: string;
  files?: Array<{
    name?: string;
    language?: string;
    content?: string;
  }>;
  code?: ArticleCode;
}

const articlesDirectory = path.join(process.cwd(), 'content', 'articles');
const articleViewers = ['playground', 'snippet', 'split', 'custom'] as const;
const articleThumbnails = ['runtime', 'static', 'gradient', 'custom'] as const;
const articleLayouts = ['default', 'tutorial', 'gallery', 'custom'] as const;

function normalizeTextValue(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return undefined;
}

function normalizeViewer(value: unknown): ArticleViewer {
  const normalized = normalizeTextValue(value);
  return articleViewers.includes(normalized as ArticleViewer)
    ? (normalized as ArticleViewer)
    : 'playground';
}

function normalizeThumbnail(value: unknown): ArticleThumbnail {
  const normalized = normalizeTextValue(value);
  return articleThumbnails.includes(normalized as ArticleThumbnail)
    ? (normalized as ArticleThumbnail)
    : 'runtime';
}

function normalizeLayout(value: unknown): ArticleLayout {
  const normalized = normalizeTextValue(value);
  return articleLayouts.includes(normalized as ArticleLayout)
    ? (normalized as ArticleLayout)
    : 'default';
}

function normalizeFiles(value: unknown): ArticleFile[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap(file => {
    if (!file || typeof file !== 'object') {
      return [];
    }

    const name = normalizeTextValue((file as { name?: unknown }).name);
    const language = normalizeTextValue(
      (file as { language?: unknown }).language
    );
    const content = normalizeTextValue((file as { content?: unknown }).content);

    if (!name || !language || !content) {
      return [];
    }

    return [{ name, language, content }];
  });
}

function deriveFiles(
  code?: ArticleCode,
  files: ArticleFile[] = []
): ArticleFile[] {
  if (files.length > 0) {
    return files;
  }

  if (!code) {
    return [];
  }

  return [
    {
      name: 'Component.jsx',
      language: 'jsx',
      content: code.jsx,
    },
    {
      name: 'styles.css',
      language: 'css',
      content: code.css,
    },
  ];
}

function getArticleFileNames(): string[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(articlesDirectory)
    .filter(
      fileName => /\.(md|mdx)$/i.test(fileName) && !fileName.startsWith('_')
    );
}

function readArticlesFromDisk(): Article[] {
  const parsedArticles = getArticleFileNames().map(fileName => {
    const fullPath = path.join(articlesDirectory, fileName);
    const source = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(source);
    const frontmatter = data as ArticleFrontmatter;
    const fileSlug = fileName.replace(/\.(md|mdx)$/i, '');

    const title = normalizeTextValue(frontmatter.title);
    const description = normalizeTextValue(frontmatter.description);
    const category = normalizeTextValue(frontmatter.category);
    const categorySlug =
      normalizeTextValue(frontmatter.categorySlug) || `legacy-${fileSlug}`;
    const categoryDescription =
      normalizeTextValue(frontmatter.categoryDescription) ||
      `${category || 'Web表現'}に関する実装記事です。`;
    const referenceTitle = normalizeTextValue(frontmatter.referenceTitle);
    const referenceUrl = normalizeTextValue(frontmatter.referenceUrl);
    const referencePlatform = normalizeTextValue(frontmatter.referencePlatform);
    const qualityScore =
      typeof frontmatter.qualityScore === 'number'
        ? frontmatter.qualityScore
        : undefined;
    const date = normalizeTextValue(frontmatter.date);
    const publishedAt = normalizeTextValue(frontmatter.publishedAt);
    const readTime = normalizeTextValue(frontmatter.readTime);
    const viewer = normalizeViewer(frontmatter.viewer);
    const thumbnailVariant = normalizeThumbnail(frontmatter.thumbnail);
    const layout = normalizeLayout(frontmatter.layout);
    const files = normalizeFiles(frontmatter.files);
    const tags = Array.isArray(frontmatter.tags)
      ? frontmatter.tags.filter(
          (tag): tag is string =>
            typeof tag === 'string' && tag.trim().length > 0
        )
      : [];

    if (
      !title ||
      !description ||
      !category ||
      !date ||
      !publishedAt ||
      !readTime
    ) {
      throw new Error(`Article frontmatter is incomplete: ${fileName}`);
    }

    return {
      id: 0,
      slug: frontmatter.slug?.trim() || fileSlug,
      title,
      description,
      category,
      categorySlug,
      categoryDescription,
      referenceTitle,
      referenceUrl,
      referencePlatform,
      qualityScore,
      tags,
      date,
      publishedAt,
      readTime,
      thumbnail: getThumbnailByCategory(category),
      viewer,
      thumbnailVariant,
      layout,
      files: deriveFiles(frontmatter.code, files),
      content: content.trim(),
      code: frontmatter.code,
    } satisfies Article;
  });

  const seriesStart = process.env.NEXT_PUBLIC_DAILY_LAB_START || '2026-10-03';

  return parsedArticles
    .filter(article => article.publishedAt >= seriesStart)
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
    .map((article, index) => ({
      ...article,
      id: index + 1,
    }));
}

const readCachedArticles = cache(readArticlesFromDisk);

export function getAllArticles(): Article[] {
  if (process.env.NODE_ENV === 'development') {
    return readArticlesFromDisk();
  }

  return readCachedArticles();
}

// ============================================
// 記事取得ユーティリティ
// ============================================

// slug から記事を取得
export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find(article => article.slug === slug);
}

// カテゴリーでフィルタリング（部分一致対応）
export function getArticlesByCategory(category: string): Article[] {
  if (category === 'すべて') return getAllArticles();
  return getAllArticles().filter(article => article.category === category);
}

export function getArticlesByCategorySlug(categorySlug: string): Article[] {
  return getAllArticles().filter(article => article.categorySlug === categorySlug);
}

function toTagSlug(tag: string): string {
  return encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'));
}

export function getDynamicCategories(): DynamicCategory[] {
  const categoryMap = new Map<string, DynamicCategory>();

  for (const article of getAllArticles()) {
    const current = categoryMap.get(article.categorySlug);

    if (!current) {
      categoryMap.set(article.categorySlug, {
        id: article.categorySlug,
        name: article.category,
        slug: article.categorySlug,
        description: article.categoryDescription,
        icon: 'Box',
        articleCount: 1,
        subCategories: article.tags.map(tag => ({
          name: tag,
          slug: toTagSlug(tag),
          articleCount: 1,
          active: true,
        })),
      });
      continue;
    }

    current.articleCount += 1;

    for (const tag of article.tags) {
      const existingTag = current.subCategories.find(item => item.name === tag);
      if (existingTag) {
        existingTag.articleCount += 1;
      } else {
        current.subCategories.push({
          name: tag,
          slug: toTagSlug(tag),
          articleCount: 1,
          active: true,
        });
      }
    }
  }

  return [...categoryMap.values()].sort(
    (left, right) => right.articleCount - left.articleCount || left.name.localeCompare(right.name)
  );
}

export function getDynamicCategoryBySlug(slug: string): DynamicCategory | undefined {
  return getDynamicCategories().find(category => category.slug === slug);
}

// タグでフィルタリング
export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter(article => article.tags.includes(tag));
}

// 最新記事を取得
export function getLatestArticles(count: number): Article[] {
  return getAllArticles().slice(0, count);
}

// ランダムに記事を取得（人気記事・関連記事用）
export function getRandomArticles(
  count: number,
  excludeSlug?: string
): Article[] {
  const allArticles = getAllArticles();
  const filtered = excludeSlug
    ? allArticles.filter(article => article.slug !== excludeSlug)
    : allArticles;

  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// 人気記事を取得（サイドバー用）
export function getPopularArticles(count: number = 5): Article[] {
  return getRandomArticles(count);
}

// 関連記事を取得（同じカテゴリー優先）
export function getRelatedArticles(
  currentSlug: string,
  count: number = 3
): Article[] {
  const currentArticle = getArticleBySlug(currentSlug);
  if (!currentArticle) return getRandomArticles(count);
  const allArticles = getAllArticles();

  // 同じカテゴリーの記事を優先
  const sameCategory = allArticles.filter(
    a => a.category === currentArticle.category && a.slug !== currentSlug
  );

  if (sameCategory.length >= count) {
    return sameCategory.sort(() => Math.random() - 0.5).slice(0, count);
  }

  // 足りない場合は他の記事で補完
  const others = allArticles.filter(
    a => a.category !== currentArticle.category && a.slug !== currentSlug
  );
  const shuffledOthers = others.sort(() => Math.random() - 0.5);

  return [...sameCategory, ...shuffledOthers].slice(0, count);
}

// 全タグを取得（使用されているもののみ）
export function getAllUsedTags(): string[] {
  const tagSet = new Set<string>();
  getAllArticles().forEach(article => {
    article.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

// 全カテゴリーを取得（使用されているもののみ）
export function getAllUsedCategories(): string[] {
  const categorySet = new Set<string>();
  getAllArticles().forEach(article => {
    categorySet.add(article.category);
  });
  return Array.from(categorySet);
}

// カテゴリー別の記事数を取得（カテゴリー設定と記事を照合）
export function getArticleCountByCategory(categoryName: string): number {
  return getAllArticles().filter(article => article.category === categoryName).length;
}

export function getCategoriesWithArticles(): string[] {
  return getDynamicCategories().map(category => category.name);
}

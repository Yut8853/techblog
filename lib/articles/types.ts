// 型定義

export interface ArticleFile {
  name: string;
  language: string;
  content: string;
}

export interface ArticleCode {
  jsx: string;
  css: string;
}

export type ArticleViewer = 'playground' | 'snippet' | 'split' | 'custom';

export type ArticleThumbnail = 'runtime' | 'static' | 'gradient' | 'custom';

export type ArticleLayout = 'default' | 'tutorial' | 'gallery' | 'custom';

export interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  publishedAt: string;
  readTime: string;
  thumbnail: string;
  viewer: ArticleViewer;
  thumbnailVariant: ArticleThumbnail;
  layout: ArticleLayout;
  files: ArticleFile[];
  content?: string;
  code?: ArticleCode;
}

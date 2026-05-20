'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, Play, Share2, X } from 'lucide-react';
import { CodeThumbnail } from '@/components/code-thumbnail';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Article } from '@/lib/articles/types';

interface ArticlesPageContentProps {
  articles: Article[];
  usedTags: string[];
  initialSelectedTag: string | null;
}

const PAGE_SIZE = 8;

export function ArticlesPageContent({
  articles,
  usedTags,
  initialSelectedTag,
}: ArticlesPageContentProps) {
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);
  const [previewReloadToken, setPreviewReloadToken] = useState(0);
  const [selectedTag, setSelectedTag] = useState<string | null>(
    initialSelectedTag
  );
  const [sortOrder, setSortOrder] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredArticles = selectedTag
    ? articles.filter(article => article.tags.includes(selectedTag))
    : articles;

  const sortedArticles = [...filteredArticles].sort((left, right) => {
    if (sortOrder === 'oldest') {
      return left.publishedAt.localeCompare(right.publishedAt);
    }

    return right.publishedAt.localeCompare(left.publishedAt);
  });

  const visibleArticles = sortedArticles.slice(0, visibleCount);
  const hasMoreArticles = visibleCount < sortedArticles.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedTag, sortOrder]);

  useEffect(() => {
    if (!hasMoreArticles || !loadMoreRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;

        if (entry?.isIntersecting) {
          setVisibleCount(currentCount =>
            Math.min(currentCount + PAGE_SIZE, sortedArticles.length)
          );
        }
      },
      {
        rootMargin: '200px 0px',
      }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMoreArticles, sortedArticles.length]);

  useEffect(() => {
    if (!previewArticle) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreviewArticle(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [previewArticle]);

  const openPreview = (article: Article) => {
    setPreviewReloadToken(currentToken => currentToken + 1);
    setPreviewArticle(article);
  };

  const handleReplayPreview = () => {
    setPreviewReloadToken(currentToken => currentToken + 1);
  };

  const isScrollDrivenPreview = (article: Article) =>
    article.tags.includes('ScrollTrigger') ||
    article.tags.includes('スクロール') ||
    article.files.some(file =>
      /ScrollTrigger|scrollTrigger|position:\s*sticky|min-height:\s*(180|240)vh|100svh/i.test(
        file.content
      )
    );

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">表現から探す記事一覧</h1>
          <p className="mt-2 text-muted-foreground">
            Markdown で管理している記事を一覧表示しています。
            <br />
            タグで絞り込んで、気になる表現を見つけてください。
          </p>
        </div>
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-8 space-y-4">
        <p className="text-sm font-medium">タグで絞り込む</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTag(null)}
            className="rounded-full"
          >
            すべて
          </Button>
          {usedTags.map(tag => (
            <Button
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              className="rounded-full"
            >
              {tag}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm">並び替え</span>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">新着順</SelectItem>
              <SelectItem value="popular">人気順</SelectItem>
              <SelectItem value="oldest">古い順</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {sortedArticles.length > 0 ? (
          visibleArticles.map((article, index) => (
            <article
              key={article.slug}
              className="overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <Link
                  href={`/articles/${article.slug}`}
                  className="block h-full w-full"
                  aria-label={`${article.title} の記事を見る`}
                >
                  <CodeThumbnail
                    code={article.code}
                    files={article.files}
                    fallbackClass={article.thumbnail}
                  />
                </Link>
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded bg-black/50 text-sm font-medium text-white">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                  <div className="rounded-full bg-black/55 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                    動き確認
                  </div>
                  <button
                    type="button"
                    onClick={() => openPreview(article)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-950 shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    動く画面を見る
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-wrap gap-1">
                  {article.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link href={`/articles/${article.slug}`} className="group/title">
                  <h2 className="mt-2 font-bold leading-tight text-blue-600 group-hover/title:underline">
                    {article.title}
                  </h2>
                </Link>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {article.description}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    読了 {article.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-2 py-12 text-center text-muted-foreground">
            該当する記事がありません
          </div>
        )}
      </div>

      {sortedArticles.length > 0 && hasMoreArticles && (
        <div ref={loadMoreRef} className="py-8 text-center text-sm text-muted-foreground">
          さらに読み込み中...
        </div>
      )}

      {previewArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/82 p-4 backdrop-blur-sm"
          onClick={() => setPreviewArticle(null)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl"
            onClick={event => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-sky-200/70">
                  Motion Preview
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  {previewArticle.title}
                </h2>
                <p className="mt-1 text-sm text-slate-300">
                  {isScrollDrivenPreview(previewArticle)
                    ? 'スクロール系の表現は自動スクロールで最後まで再生します。'
                    : '初期アニメーションを再生した状態を大きな画面で確認できます。'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReplayPreview}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  もう一度再生
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewArticle(null)}
                  className="rounded-full border border-white/15 p-2 text-white transition-colors hover:bg-white/10"
                  aria-label="プレビューを閉じる"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="min-h-[50vh] bg-slate-900">
                <CodeThumbnail
                  code={previewArticle.code}
                  files={previewArticle.files}
                  fallbackClass={previewArticle.thumbnail}
                  mode="player"
                  className="h-full w-full"
                  title={`${previewArticle.title} preview`}
                  reloadToken={previewReloadToken}
                />
              </div>

              <div className="border-l border-white/10 bg-slate-950/95 p-5 text-sm text-slate-300">
                <div className="flex flex-wrap gap-2">
                  {previewArticle.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="mt-4 leading-7 text-slate-300/90">
                  {previewArticle.description}
                </p>
                <div className="mt-6 space-y-2 text-xs text-slate-400">
                  <p>一覧上では見えない初期演出や長尺演出をここで確認できます。</p>
                  <p>スクロール連動のデモは、開いた直後に自動で上下スクロールして要所を見せます。</p>
                </div>
                <Link
                  href={`/articles/${previewArticle.slug}`}
                  className="mt-6 inline-flex rounded-full bg-white px-4 py-2 font-semibold text-slate-950 transition-colors hover:bg-slate-200"
                >
                  記事詳細を見る
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

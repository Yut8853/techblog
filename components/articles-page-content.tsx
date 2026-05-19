'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Calendar, Clock, Share2 } from 'lucide-react';
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

export function ArticlesPageContent({
  articles,
  usedTags,
  initialSelectedTag,
}: ArticlesPageContentProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(
    initialSelectedTag
  );
  const [sortOrder, setSortOrder] = useState('newest');

  const filteredArticles = selectedTag
    ? articles.filter(article => article.tags.includes(selectedTag))
    : articles;

  const sortedArticles = [...filteredArticles].sort((left, right) => {
    if (sortOrder === 'oldest') {
      return left.publishedAt.localeCompare(right.publishedAt);
    }

    return right.publishedAt.localeCompare(left.publishedAt);
  });

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
          sortedArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group"
            >
              <article className="overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg">
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <CodeThumbnail
                    code={article.code}
                    fallbackClass={article.thumbnail}
                  />
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded bg-black/50 text-sm font-medium text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="mt-2 font-bold leading-tight text-blue-600 group-hover:underline">
                    {article.title}
                  </h2>
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
            </Link>
          ))
        ) : (
          <div className="col-span-2 py-12 text-center text-muted-foreground">
            該当する記事がありません
          </div>
        )}
      </div>
    </>
  );
}

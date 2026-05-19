'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRightLeft,
  ArrowUpDown,
  Box,
  Home,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  Loader,
  MousePointer,
  MousePointerClick,
  Type,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Category } from '@/lib/config/categories';

type FilterType = 'all' | 'popular' | 'new' | 'recommended';

interface CategoryCard extends Category {
  articleCount: number;
  subCategories: Array<
    Category['subCategories'][number] & {
      articleCount: number;
      active: boolean;
    }
  >;
}

interface CategoriesPageContentProps {
  categories: CategoryCard[];
  usedTags: string[];
  totalCategoryCount: number;
}

const iconMap: Record<string, React.ReactNode> = {
  ArrowUpDown: <ArrowUpDown className="h-5 w-5" />,
  Layers: <Layers className="h-5 w-5" />,
  LayoutGrid: <LayoutGrid className="h-5 w-5" />,
  Type: <Type className="h-5 w-5" />,
  ArrowRightLeft: <ArrowRightLeft className="h-5 w-5" />,
  Loader: <Loader className="h-5 w-5" />,
  MousePointer: <MousePointer className="h-5 w-5" />,
  Image: <ImageIcon className="h-5 w-5" />,
  Box: <Box className="h-5 w-5" />,
  MousePointerClick: <MousePointerClick className="h-5 w-5" />,
};

export function CategoriesPageContent({
  categories,
  usedTags,
  totalCategoryCount,
}: CategoriesPageContentProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredCategories =
    filter === 'all'
      ? categories
      : filter === 'popular'
        ? categories.filter(category => category.popular)
        : categories;

  return (
    <>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <LayoutGrid className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold">表現カテゴリを一覧で探す</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              アニメーションやインタラクション表現をカテゴリごとに整理しました。
              <br />
              気になる表現カテゴリから、具体的な実装アイデアや記事を見つけてください。
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-border pt-6">
          <div>
            <p className="text-sm text-muted-foreground">総カテゴリ数</p>
            <p className="text-3xl font-bold">{totalCategoryCount}</p>
            <p className="text-xs text-muted-foreground">カテゴリ</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">利用中のタグ</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {usedTags.length > 0 ? (
                usedTags.map(tag => (
                  <Link
                    key={tag}
                    href={`/articles?tag=${encodeURIComponent(tag)}`}
                  >
                    <Badge
                      variant="secondary"
                      className="cursor-pointer bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-200"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  記事が追加されると表示されます
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        {[
          { key: 'all', label: 'すべて' },
          { key: 'popular', label: '人気順' },
          { key: 'new', label: '新着順' },
          { key: 'recommended', label: 'おすすめ' },
        ].map(tab => (
          <Button
            key={tab.key}
            variant={filter === tab.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(tab.key as FilterType)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="mt-6 space-y-6">
        {filteredCategories.map((category, index) => (
          <CategorySection
            key={category.id}
            category={category}
            index={index + 1}
          />
        ))}
      </div>
    </>
  );
}

function CategorySection({
  category,
  index,
}: {
  category: CategoryCard;
  index: number;
}) {
  const hasArticles = category.articleCount > 0;

  return (
    <div
      className={`rounded-xl border bg-card p-6 ${hasArticles ? 'border-border' : 'border-border/50 opacity-60'}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${hasArticles ? 'bg-muted text-muted-foreground' : 'bg-muted/50 text-muted-foreground/50'}`}
        >
          {iconMap[category.icon]}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {hasArticles ? (
              <Link
                href={`/categories/${category.slug}`}
                className="text-lg font-bold text-blue-600 hover:underline"
              >
                {index}. {category.name}
              </Link>
            ) : (
              <span className="text-lg font-bold text-muted-foreground">
                {index}. {category.name}
              </span>
            )}
            {hasArticles && (
              <Badge variant="outline" className="text-xs">
                {category.articleCount}件
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {category.description}
          </p>

          {category.keywords && category.keywords.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              おすすめ: {category.keywords.join(' / ')}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {category.subCategories.map(subCategory =>
          subCategory.active ? (
            <Link
              key={subCategory.slug}
              href={`/articles?tag=${encodeURIComponent(subCategory.name)}`}
            >
              <Badge
                variant="outline"
                className={
                  subCategory.featured
                    ? 'cursor-pointer border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-200'
                    : 'cursor-pointer border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-200 dark:hover:bg-blue-950/30'
                }
              >
                {subCategory.name}
                <span className="ml-1 text-xs opacity-70">
                  {subCategory.articleCount}
                </span>
              </Badge>
            </Link>
          ) : (
            <Badge
              key={subCategory.slug}
              variant="outline"
              className="cursor-not-allowed text-muted-foreground/50"
            >
              {subCategory.name}
            </Badge>
          )
        )}
      </div>
    </div>
  );
}

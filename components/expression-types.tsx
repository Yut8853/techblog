import Link from 'next/link';
import {
  ArrowRight,
  ArrowRightLeft,
  ArrowUpDown,
  Box,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  Loader,
  MousePointer,
  MousePointerClick,
  Type,
} from 'lucide-react';
import { getCategoryTotalCount } from '@/lib/articles';
import { categories } from '@/lib/config/categories';

const iconMap = {
  ArrowUpDown,
  Layers,
  LayoutGrid,
  Type,
  ArrowRightLeft,
  Loader,
  MousePointer,
  Image: ImageIcon,
  Box,
  MousePointerClick,
} as const;

export function ExpressionTypes() {
  const expressionTypes = categories.map(category => ({
    title: category.name,
    description: category.description,
    href: `/categories/${category.slug}`,
    articleCount: getCategoryTotalCount(category),
    icon: iconMap[category.icon as keyof typeof iconMap] ?? LayoutGrid,
  }));

  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold">表現タイプから探す</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {expressionTypes.map(type => {
          const isActive = type.articleCount > 0;

          if (!isActive) {
            return (
              <div
                key={type.title}
                className="rounded-xl border border-border/50 bg-card p-4 opacity-55"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted/60">
                    <type.icon className="h-6 w-6 text-muted-foreground/60" />
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-muted-foreground">
                    {type.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground/80">
                    {type.description}
                  </p>
                  <span className="mt-3 text-xs text-muted-foreground/70">
                    記事追加待ち
                  </span>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={type.title}
              href={type.href}
              className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-accent hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40">
                  <type.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-200" />
                </div>
                <h3 className="mt-3 text-sm font-medium text-blue-600 group-hover:underline">
                  {type.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {type.description}
                </p>
                <span className="mt-2 text-xs text-muted-foreground">
                  {type.articleCount}件
                </span>
                <span className="mt-2 inline-flex items-center text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

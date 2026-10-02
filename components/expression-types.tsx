import Link from 'next/link';
import { ArrowRight, Box } from 'lucide-react';
import { getDynamicCategories } from '@/lib/articles';

export function ExpressionTypes() {
  const expressionTypes = getDynamicCategories().slice(0, 10).map(category => ({
    title: category.name,
    description: category.description,
    href: `/categories/${category.slug}`,
    articleCount: category.articleCount,
    icon: Box,
  }));

  if (expressionTypes.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold">表現タイプから探す</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {expressionTypes.map(type => (
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
        ))}
      </div>
    </section>
  );
}

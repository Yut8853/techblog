import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CategorySidebar } from '@/components/category-sidebar';
import { CodeThumbnail } from '@/components/code-thumbnail';
import { Badge } from '@/components/ui/badge';
import { Home, ChevronRight, Calendar, Clock } from 'lucide-react';
import { getCategoryBySlug } from '@/lib/config/categories';
import {
  getArticlesByCategory,
  getCategoryTotalCount,
  getSubCategoryArticleCount,
} from '@/lib/articles';

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(category.name);
  const totalCount = getCategoryTotalCount(category);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href="/"
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <Home className="h-4 w-4" />
            <span>ホーム</span>
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/categories" className="text-blue-600 hover:underline">
            カテゴリー
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{category.name}</span>
        </nav>

        {/* Page Header */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="mt-2 text-muted-foreground">{category.description}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalCount}件の記事 / {category.subCategories.length}
            件のサブカテゴリ
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div>
            {/* Sub Categories */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-bold">サブカテゴリ</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.subCategories.map(sub => {
                  const count = getSubCategoryArticleCount(category, sub.name);

                  if (count === 0) {
                    return (
                      <Badge
                        key={sub.slug}
                        variant="outline"
                        className="cursor-not-allowed text-muted-foreground/50"
                      >
                        {sub.name}
                        <span className="ml-1 text-xs opacity-70">0</span>
                      </Badge>
                    );
                  }

                  return (
                    <Link
                      key={sub.slug}
                      href={`/articles?tag=${encodeURIComponent(sub.name)}`}
                    >
                      <Badge
                        variant="outline"
                        className={
                          sub.featured
                            ? 'cursor-pointer border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-200'
                            : 'cursor-pointer border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-200 dark:hover:bg-blue-950/30'
                        }
                      >
                        {sub.name}
                        <span className="ml-1 text-xs opacity-70">{count}</span>
                      </Badge>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Articles */}
            <h2 className="mt-8 text-xl font-bold">このカテゴリの記事</h2>

            {articles.length > 0 ? (
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {articles.map((article, index) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="group"
                  >
                    <article className="overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg">
                      <div className="aspect-video relative overflow-hidden bg-slate-900">
                        <CodeThumbnail
                          code={article.code}
                          files={article.files}
                          fallbackClass={article.thumbnail}
                        />
                        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded bg-black/50 text-sm font-medium text-white">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="p-4">
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                        <h3 className="mt-2 font-bold leading-tight text-blue-600 group-hover:underline">
                          {article.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
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
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">
                  このカテゴリの記事はまだありません。
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <CategorySidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
}

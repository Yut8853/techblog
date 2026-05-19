import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Sidebar } from '@/components/sidebar';
import { ArticlesPageContent } from '@/components/articles-page-content';
import { Home, ChevronRight } from 'lucide-react';
import { getAllArticles, getAllUsedTags } from '@/lib/articles';

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const articles = getAllArticles();
  const usedTags = getAllUsedTags();
  const initialSelectedTag = tag && usedTags.includes(tag) ? tag : null;

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
          <span className="text-foreground">記事一覧</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div>
            <ArticlesPageContent
              articles={articles}
              usedTags={usedTags}
              initialSelectedTag={initialSelectedTag}
            />
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
}

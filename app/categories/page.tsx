import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CategorySidebar } from '@/components/category-sidebar';
import { Home, ChevronRight } from 'lucide-react';
import { CategoriesPageContent } from '@/components/categories-page-content';
import { categories } from '@/lib/config/categories';
import {
  getAllUsedTags,
  getCategoryTotalCount,
  getSubCategoryArticleCount,
} from '@/lib/articles';

export default function CategoriesPage() {
  const usedTags = getAllUsedTags();
  const categoryCards = categories.map(category => ({
    ...category,
    articleCount: getCategoryTotalCount(category),
    subCategories: category.subCategories.map(subCategory => {
      const articleCount = getSubCategoryArticleCount(
        category,
        subCategory.name
      );
      return {
        ...subCategory,
        articleCount,
        active: articleCount > 0,
      };
    }),
  }));

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
          <span className="text-foreground">カテゴリー</span>
        </nav>

        {/* Page Title */}
        <h1 className="mt-6 text-3xl font-bold">カテゴリーから探す</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div>
            <CategoriesPageContent
              categories={categoryCards}
              usedTags={usedTags}
              totalCategoryCount={categories.length}
            />
          </div>

          {/* Sidebar */}
          <CategorySidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
}

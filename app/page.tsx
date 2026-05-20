import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Sidebar } from '@/components/sidebar';
import { CodePlayground } from '@/components/code-playground';
import { ExpressionTypes } from '@/components/expression-types';
import { RelatedArticles } from '@/components/related-articles';
import { ArticleHeader } from '@/components/article-header';
import { getLatestArticles } from '@/lib/articles';

const hiddenHomeSlugs = ['particle-glass-background-shift'];

export default function Home() {
  const article = getLatestArticles(1)[0];

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <ArticleHeader
              title={article.title}
              description={article.description}
              author={{
                name: 'Yutaka Kizaki',
                username: 'junkbranding',
                avatar: '/images/avatar.jpg',
              }}
              date={article.date}
              readTime={article.readTime}
              category={article.category}
              slug={article.slug}
              linkedTitle
            />

            <div className="mt-8">
              <CodePlayground code={article.code} files={article.files} />
            </div>

            <ExpressionTypes />

            <RelatedArticles
              currentSlug={article.slug}
              excludeSlugs={hiddenHomeSlugs}
            />
          </div>

          <Sidebar excludeSlugs={hiddenHomeSlugs} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

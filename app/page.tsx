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
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-16">
          <section className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card">
            <div className="grid min-h-[62vh] place-items-center px-6 py-16 text-center sm:px-10">
              <div className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
                  Daily Web Graphics Lab
                </p>

                <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
                  365 DAYS OF
                  <br />
                  WEB GRAPHICS
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  WebGL / WebGPU / GLSL / Three.js の表現を、
                  AIが毎日ひとつ企画・実装・検証して公開する実験ブログです。
                </p>

                <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-4">
                  {['WebGL', 'WebGPU', 'GLSL', 'Three.js'].map(item => (
                    <div
                      key={item}
                      className="rounded-2xl border border-border bg-background/60 px-4 py-5 text-sm font-semibold"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-12 rounded-2xl border border-border bg-background/50 px-5 py-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Day 001
                  </p>
                  <p className="mt-2 text-xl font-semibold">
                    2026.10.03 START
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    毎朝7:00 JSTを基準に、新しい実験を1本ずつ追加します。
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
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

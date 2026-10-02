import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Sidebar } from '@/components/sidebar';
import { CodePlayground } from '@/components/code-playground';
import { ExpressionTypes } from '@/components/expression-types';
import { RelatedArticles } from '@/components/related-articles';
import { ArticleHeader } from '@/components/article-header';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ExternalLink, Home } from 'lucide-react';
import { getArticleBySlug } from '@/lib/articles';

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

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
          <Link href="/articles" className="text-blue-600 hover:underline">
            記事一覧
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="max-w-50 truncate text-foreground">
            {article.title}
          </span>
        </nav>

        <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main Content */}
          <div>
            {/* Article Header */}
            <ArticleHeader
              category={article.category}
              title={article.title}
              description={article.description}
              author={{
                name: 'Yutaka Kizaki',
                username: 'junkbranding',
                avatar: '/images/avatar.jpg',
              }}
              date={article.date}
              readTime={article.readTime}
              slug={article.slug}
            />

            {article.referenceUrl && article.referenceTitle && (
              <section className="mt-8 rounded-xl border border-border bg-card p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Reference / 参考元
                    </p>
                    <p className="mt-1 font-semibold text-foreground">
                      {article.referenceTitle}
                    </p>
                    {article.referencePlatform && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {article.referencePlatform}
                      </p>
                    )}
                  </div>
                  <a
                    href={article.referenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start rounded-lg border border-border px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-muted"
                  >
                    参考サイトを見る
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </section>
            )}

            {/* Code Playground */}
            {(article.code || article.files.length > 0) && (
              <div className="mt-8">
                <CodePlayground code={article.code} files={article.files} />
              </div>
            )}

            {/* Article Content */}
            {article.content && (
              <article className="mt-12 prose prose-slate max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => (
                      <h2 className="mt-10 mb-4 text-2xl font-bold text-foreground">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mt-8 mb-3 text-xl font-bold text-foreground">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 leading-relaxed text-muted-foreground">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-4 ml-5 list-disc text-muted-foreground">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-4 ml-5 list-decimal text-muted-foreground">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        className="text-blue-600 underline underline-offset-4"
                      >
                        {children}
                      </a>
                    ),
                    code: ({ children }) => (
                      <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="mb-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </article>
            )}

            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                タグ
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Expression Types */}
            <div className="mt-12">
              <ExpressionTypes />
            </div>

            {/* Related Articles */}
            <RelatedArticles currentSlug={slug} />
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
}

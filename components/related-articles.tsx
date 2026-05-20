import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { CodeThumbnail } from '@/components/code-thumbnail';
import { getRelatedArticles } from '@/lib/articles';

interface RelatedArticlesProps {
  currentSlug?: string;
  excludeSlugs?: string[];
}

export function RelatedArticles({
  currentSlug,
  excludeSlugs = [],
}: RelatedArticlesProps) {
  const relatedArticles = getRelatedArticles(currentSlug || '', 10)
    .filter(article => !excludeSlugs.includes(article.slug))
    .slice(0, 3);

  if (relatedArticles.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold">関連記事</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relatedArticles.map(article => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md"
          >
            <div className="relative aspect-video overflow-hidden bg-slate-900">
              <CodeThumbnail
                code={article.code}
                files={article.files}
                fallbackClass={article.thumbnail}
              />
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-1">
                {article.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="mt-2 line-clamp-2 text-sm font-medium text-blue-600 group-hover:underline">
                {article.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {article.description}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {article.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CodeThumbnail } from '@/components/code-thumbnail';
import { Button } from '@/components/ui/button';
import { Github, Dribbble } from 'lucide-react';
import { XIcon } from '@/components/x-icon';
import { getPopularArticles, getArticleCountByCategory } from '@/lib/articles';
import { categories } from '@/lib/config/categories';
import { siteConfig } from '@/lib/config/site';

interface SidebarProps {
  excludeSlugs?: string[];
}

export function Sidebar({ excludeSlugs = [] }: SidebarProps) {
  const popularArticles = getPopularArticles(10)
    .filter(article => !excludeSlugs.includes(article.slug))
    .slice(0, 5);
  const { author, operator } = siteConfig;

  // 記事数でカテゴリーを拡張
  const categoriesWithCounts = categories
    .map(cat => ({
      ...cat,
      articleCount: getArticleCountByCategory(cat.name),
    }))
    .slice(0, 10);

  return (
    <aside className="space-y-8">
      {/* Categories */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">カテゴリー</h2>
        <ul className="mt-4 space-y-1">
          {categoriesWithCounts.map(category => {
            const hasArticles = category.articleCount > 0;
            return (
              <li key={category.slug}>
                {hasArticles ? (
                  <Link
                    href={`/categories/${category.slug}`}
                    className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-blue-600 hover:underline hover:bg-muted"
                  >
                    <span>{category.name}</span>
                    <span className="flex items-center gap-1">
                      <span className="text-muted-foreground text-xs">
                        {category.articleCount}
                      </span>
                      <ChevronRight className="h-4 w-4 text-accent" />
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-muted-foreground/50 cursor-not-allowed">
                    <span>{category.name}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Popular Articles */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">人気記事</h2>
        <ul className="mt-4 space-y-4">
          {popularArticles.map((article, index) => (
            <li key={article.slug}>
              <Link
                href={`/articles/${article.slug}`}
                className="flex items-start gap-3 group"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-3">
                    <div className="aspect-video w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <CodeThumbnail
                        code={article.code}
                        files={article.files}
                        fallbackClass={article.thumbnail}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium leading-tight line-clamp-2 text-blue-600 group-hover:underline">
                        {article.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {article.date}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Author Profile */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">プロフィール</h2>
        <div className="mt-4 flex flex-col items-center text-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="text-lg">YK</AvatarFallback>
          </Avatar>
          <h3 className="mt-3 font-bold">{author.name}</h3>
          <p className="text-sm text-muted-foreground">@{author.username}</p>
          <p className="mt-3 w-full text-left text-sm leading-relaxed text-muted-foreground">
            {author.bio}
          </p>
          <div className="mt-3 w-full rounded-lg border border-border/70 bg-muted/30 px-3 py-2 text-left text-xs text-muted-foreground">
            運営元:{' '}
            <Link
              href={operator.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:underline"
            >
              {operator.name}
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link
                href={author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">X</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link
                href={author.social.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

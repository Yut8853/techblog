import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock } from 'lucide-react';
import { ArticleHeaderActions } from '@/components/article-header-actions';

interface ArticleHeaderProps {
  title: string;
  description: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
  slug?: string;
  linkedTitle?: boolean;
}

export function ArticleHeader({
  title,
  description,
  author,
  date,
  readTime,
  category,
  slug,
  linkedTitle = false,
}: ArticleHeaderProps) {
  return (
    <div>
      {/* Category */}
      <Badge
        variant="default"
        className="bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {category}
      </Badge>

      {/* Title */}
      <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
        <div className="min-w-0 flex-1">
          {linkedTitle && slug ? (
            <Link href={`/articles/${slug}`} className="block">
              <h1 className="text-2xl font-bold leading-tight text-balance text-blue-600 transition-colors hover:text-blue-800 md:text-3xl lg:text-4xl">
                {title}
              </h1>
            </Link>
          ) : (
            <h1 className="text-2xl font-bold leading-tight text-balance md:text-3xl lg:text-4xl">
              {title}
            </h1>
          )}
        </div>
        <ArticleHeaderActions title={title} slug={slug} />
      </div>

      {/* Description */}
      <p className="mt-4 text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Author Info */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{author.name}</div>
            <div className="text-sm text-muted-foreground">
              @{author.username}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>読了時間: {readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

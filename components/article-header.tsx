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
}

export function ArticleHeader({
  title,
  description,
  author,
  date,
  readTime,
  category,
  slug,
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
      <div className="mt-4 flex items-start justify-between gap-4">
        {slug ? (
          <Link href={`/articles/${slug}`}>
            <h1 className="text-2xl font-bold leading-tight md:text-3xl lg:text-4xl text-balance text-blue-600 hover:text-blue-800 transition-colors">
              {title}
            </h1>
          </Link>
        ) : (
          <h1 className="text-2xl font-bold leading-tight md:text-3xl lg:text-4xl text-balance">
            {title}
          </h1>
        )}
        <ArticleHeaderActions title={title} slug={slug} />
      </div>

      {/* Description */}
      <p className="mt-4 text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Author Info */}
      <div className="mt-6 flex items-center gap-4">
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
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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

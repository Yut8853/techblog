import Link from 'next/link';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { XIcon } from '@/components/x-icon';
import { siteConfig } from '@/lib/config/site';

export function Footer() {
  const { author, operator } = siteConfig;

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">
                  C
                </span>
              </div>
              <span className="text-lg font-bold">Creative Dev Blog</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              クリエイティブな表現とテクノロジーの可能性を探求するブログです。アニメーションやインタラクションの実装方法を発信しています。
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              運営元:
              {' '}
              <Link
                href={operator.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {operator.name}
              </Link>
            </p>
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

          {/* Navigation */}
          <div>
            <h3 className="font-semibold">ナビゲーション</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-blue-600 hover:underline"
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-sm text-blue-600 hover:underline"
                >
                  記事一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-sm text-blue-600 hover:underline"
                >
                  カテゴリー
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-blue-600 hover:underline"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold">カテゴリー</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/categories/parallax"
                  className="text-sm text-blue-600 hover:underline"
                >
                  パララックス
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/card-type"
                  className="text-sm text-blue-600 hover:underline"
                >
                  カードタイプ
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/page-transition"
                  className="text-sm text-blue-600 hover:underline"
                >
                  ページトランジション
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/scroll"
                  className="text-sm text-blue-600 hover:underline"
                >
                  スクロール連動
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/hover"
                  className="text-sm text-blue-600 hover:underline"
                >
                  ホバーアニメーション
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="mt-2 inline-flex items-center text-sm text-blue-600 hover:underline"
                >
                  すべてのカテゴリーを見る →
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h3 className="font-semibold">フォロー</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href={author.social.twitter}
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <XIcon className="h-4 w-4" />X
                </Link>
              </li>
              <li>
                <Link
                  href={author.social.github}
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Creative Dev Blog / Operated by
            {' '}
            <Link
              href={operator.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {operator.name}
            </Link>
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-blue-600 hover:underline"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/purpose"
              className="text-sm text-blue-600 hover:underline"
            >
              利用目的
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

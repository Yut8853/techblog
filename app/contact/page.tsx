import type { Metadata } from 'next';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { XIcon } from '@/components/x-icon';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'お問い合わせ | Creative Dev Blog',
  description: 'Creative Dev Blogへのお問い合わせ先です。',
};

export default function ContactPage() {
  const { author, contact } = siteConfig;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
        <div className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-sm md:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-blue-600">
            Contact
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            お問い合わせ
          </h1>
          <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
            お問い合わせは下記にご連絡ください。
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-background/80 p-6 md:col-span-3">
              <p className="text-sm font-medium text-muted-foreground">メール</p>
              <Link
                href={`mailto:${contact.email}`}
                className="mt-3 block text-xl font-semibold text-blue-600 hover:underline md:text-2xl"
              >
                {contact.email}
              </Link>
            </div>

            <Link
              href={author.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-border/60 bg-background/80 p-6 transition-colors hover:border-blue-300 hover:bg-blue-50/60"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
                  <XIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">X</p>
                  <p className="text-base font-semibold text-foreground">@{author.username}</p>
                </div>
              </div>
              <p className="mt-4 break-all text-sm text-blue-600">{author.social.twitter}</p>
            </Link>

            <Link
              href={author.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-border/60 bg-background/80 p-6 transition-colors hover:border-blue-300 hover:bg-blue-50/60"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
                  <Github className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">GitHub</p>
                  <p className="text-base font-semibold text-foreground">Yut8853</p>
                </div>
              </div>
              <p className="mt-4 break-all text-sm text-blue-600">{author.social.github}</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
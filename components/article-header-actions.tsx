'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Facebook, Link2, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { XIcon } from '@/components/x-icon';
import { siteConfig } from '@/lib/config/site';

type ShareTarget = 'x' | 'line' | 'facebook' | 'instagram';

interface ArticleHeaderActionsProps {
  title: string;
  slug?: string;
}

export function ArticleHeaderActions({
  title,
  slug,
}: ArticleHeaderActionsProps) {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const articleUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      if (slug) {
        return new URL(`/articles/${slug}`, window.location.origin).toString();
      }

      return window.location.href;
    }

    if (slug) {
      return `${siteConfig.url}/articles/${slug}`;
    }

    return siteConfig.url;
  }, [slug]);

  useEffect(() => {
    if (!statusMessage) {
      return;
    }

    const timer = window.setTimeout(() => setStatusMessage(''), 2400);
    return () => window.clearTimeout(timer);
  }, [statusMessage]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsShareMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=640,height=720');
  };

  const copyLink = async (message: string) => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setStatusMessage(message);
    } catch {
      setStatusMessage('リンクをコピーできませんでした。');
    }
  };

  const handleShare = async (target: ShareTarget) => {
    const encodedUrl = encodeURIComponent(articleUrl);
    const encodedText = encodeURIComponent(title);

    if (target === 'x') {
      openShareWindow(
        `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`
      );
      setStatusMessage('Xの共有画面を開きました。');
      setIsShareMenuOpen(false);
      return;
    }

    if (target === 'line') {
      openShareWindow(
        `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`
      );
      setStatusMessage('LINEの共有画面を開きました。');
      setIsShareMenuOpen(false);
      return;
    }

    if (target === 'facebook') {
      openShareWindow(
        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
      );
      setStatusMessage('Facebookの共有画面を開きました。');
      setIsShareMenuOpen(false);
      return;
    }

    await copyLink('リンクをコピーしてInstagramを開きました。');
    openShareWindow('https://www.instagram.com/');
    setIsShareMenuOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => setIsShareMenuOpen(open => !open)}
          aria-expanded={isShareMenuOpen}
          aria-haspopup="menu"
        >
          <Share2 className="h-4 w-4" />
          <span className="sr-only">共有</span>
        </Button>
      </div>

      {isShareMenuOpen && (
        <div className="absolute right-0 top-12 z-20 w-64 rounded-2xl border border-border bg-card p-3 shadow-xl">
          <p className="px-2 pb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Share
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => void handleShare('x')}
              className="flex items-center gap-2 rounded-xl border border-border px-3 py-3 text-left text-sm transition-colors hover:border-blue-300 hover:bg-blue-50/70"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                <XIcon className="h-3.5 w-3.5" />
              </span>
              <span>X</span>
            </button>
            <button
              type="button"
              onClick={() => void handleShare('line')}
              className="flex items-center gap-2 rounded-xl border border-border px-3 py-3 text-left text-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50/70"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                <MessageCircle className="h-4 w-4" />
              </span>
              <span>LINE</span>
            </button>
            <button
              type="button"
              onClick={() => void handleShare('facebook')}
              className="flex items-center gap-2 rounded-xl border border-border px-3 py-3 text-left text-sm transition-colors hover:border-sky-300 hover:bg-sky-50/70"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white">
                <Facebook className="h-4 w-4" />
              </span>
              <span>Facebook</span>
            </button>
            <button
              type="button"
              onClick={() => void handleShare('instagram')}
              className="flex items-center gap-2 rounded-xl border border-border px-3 py-3 text-left text-sm transition-colors hover:border-pink-300 hover:bg-pink-50/70"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-500 via-pink-500 to-orange-400 text-white">
                <Link2 className="h-4 w-4" />
              </span>
              <span>Instagram</span>
            </button>
          </div>
          <p className="px-2 pt-3 text-xs leading-5 text-muted-foreground">
            InstagramはリンクをコピーしてからアプリやWebで貼り付ける方式です。
          </p>
        </div>
      )}

      {statusMessage && (
        <div className="absolute right-0 top-18 z-10 flex items-center gap-2 rounded-full bg-foreground px-3 py-1.5 text-xs text-background shadow-lg">
          <Check className="h-3.5 w-3.5" />
          <span>{statusMessage}</span>
        </div>
      )}
    </div>
  );
}

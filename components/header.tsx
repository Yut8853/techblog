'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '@/lib/config/site';

export function Header() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">C</span>
          </div>
          <span className="text-lg font-bold">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {siteConfig.navigation.header.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">テーマ切り替え</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

// サイト設定

export const siteConfig = {
  name: 'Creative Dev Blog',
  description:
    'クリエイティブな表現とテクノロジーの可能性を探求するブログです。アニメーションやインタラクションの実装方法を発信しています。',
  url: 'https://creative-dev-blog.vercel.app',
  operator: {
    name: 'JUNK BRANDING',
    url: 'https://junkbranding.com',
  },
  contact: {
    email: 'hello@junkbranding.com',
  },

  // 著者情報
  author: {
    name: 'Yutaka Kizaki',
    username: 'junkbranding',
    avatar: '/images/avatar.jpg',
    bio: 'フロントエンドエンジニア。アニメーションとインタラクションデザインが大好きです。',
    social: {
      twitter: 'https://x.com/junkbranding',
      github: 'https://github.com/Yut8853',
      dribbble: 'https://dribbble.com',
    },
  },

  // ナビゲーション
  navigation: {
    header: [
      { label: 'ホーム', href: '/' },
      { label: '記事一覧', href: '/articles' },
      { label: 'カテゴリー', href: '/categories' },
      { label: 'お問い合わせ', href: '/contact' },
    ],
    footer: [
      { label: 'ホーム', href: '/' },
      { label: '記事一覧', href: '/articles' },
      { label: 'カテゴリー', href: '/categories' },
      { label: 'お問い合わせ', href: '/contact' },
    ],
  },
};

// リンク生成ユーティリティ
export const links = {
  // 記事詳細ページ
  article: (slug: string) => `/articles/${slug}`,

  // カテゴリーページ
  category: (slug: string) => `/categories/${slug}`,

  // タグページ
  tag: (slug: string) => `/tags/${slug}`,

  // 外部リンク
  external: {
    twitter: (username: string) => `https://x.com/${username}`,
    github: (username: string) => `https://github.com/${username}`,
  },
};

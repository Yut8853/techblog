// 記事データ
// 新しい記事を追加する場合はここに追記

import type { ArticleCode } from '../articles/types';

export interface ArticleData {
  slug: string;
  title: string;
  description: string;
  category: string; // カテゴリー名（categories.tsのnameと一致）
  tags: string[]; // タグ名の配列（tags.tsのnameと一致）
  date: string; // 表示用の日付文字列
  readTime: string; // 読了時間
  code?: ArticleCode;
  content?: string[];
}

// ============================================
// 記事一覧（新しい記事は上に追加）
// ============================================

export const articlesData: ArticleData[] = [
  // --------------------------------------------
  // GSAPで作るスクロール連動ヒーローアニメーション
  // --------------------------------------------
  {
    slug: 'gsap-scroll-hero',
    title: 'GSAPで作るスクロール連動ヒーローアニメーション',
    description:
      'GSAPとScrollTriggerを使って、スクロールに合わせてダイナミックに動き出すヒーロー表現を実装します。',
    category: 'スクロール連動',
    tags: ['GSAP', 'ScrollTrigger', 'アニメーション'],
    date: '2024年5月20日',
    readTime: '7分',
    code: {
      jsx: `function Hero() {
  return (
    <div className="hero">
      <h1 className="hero-title">その先の、体験へ。</h1>
      <p className="hero-subtitle">Creative Dev Blog</p>
    </div>
  )
}`,
      css: `.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: white;
  text-align: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.8;
  margin-top: 1rem;
}`,
    },
    content: [
      '## はじめに',
      'Webサイトのファーストビューは、ユーザーに与える第一印象を決定づける重要な要素です。GSAPとScrollTriggerを組み合わせることで、スクロールに連動した印象的なアニメーションを実装できます。',
      'この記事では、実際のプロジェクトで使える実践的なコードを交えながら、ヒーローセクションのアニメーション実装方法を解説します。',
      '## GSAPとScrollTriggerの基本',
      'GSAP（GreenSock Animation Platform）は、高性能なJavaScriptアニメーションライブラリです。ScrollTriggerプラグインと組み合わせることで、スクロール位置に応じたアニメーションを簡単に実装できます。',
      '## まとめ',
      'GSAPとScrollTriggerを使用することで、パフォーマンスを維持しながら印象的なスクロール連動アニメーションを実装できます。',
    ],
  },
];

// カテゴリー設定
// 新しいカテゴリーを追加する場合はここに追記
// 記事数は articles.ts から自動計算されます

export interface SubCategory {
  name: string
  slug: string
  featured?: boolean // 注目タグ
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string // lucide icon name
  keywords?: string[] // 関連キーワード
  subCategories: SubCategory[]
  popular?: boolean // 人気カテゴリ
}

export const categories: Category[] = [
  {
    id: "scroll",
    name: "スクロール連動",
    slug: "scroll",
    description: "スクロールに連動する多彩な表現を集めました。",
    icon: "ArrowUpDown",
    keywords: ["スクロールリビール", "ピン留め演出"],
    popular: true,
    subCategories: [
      { name: "GSAP", slug: "gsap", featured: true },
      { name: "ScrollTrigger", slug: "scroll-trigger", featured: true },
      { name: "アニメーション", slug: "animation", featured: true },
      { name: "スクロールストーリー", slug: "scroll-story" },
      { name: "ピン留め演出", slug: "pin-effect" },
      { name: "横スクロール", slug: "horizontal-scroll" },
      { name: "スクロールスナップ", slug: "scroll-snap" },
      { name: "スクロールリビール", slug: "scroll-reveal" },
    ],
  },
  {
    id: "parallax",
    name: "パララックス系",
    slug: "parallax",
    description: "奥行き感や視差効果で没入感を高める表現です。",
    icon: "Layers",
    keywords: ["多層", "画像", "マウス"],
    subCategories: [
      { name: "パララックス", slug: "parallax-basic" },
      { name: "多層パララックス", slug: "multi-layer" },
      { name: "背景パララックス", slug: "bg-parallax" },
      { name: "マウスパララックス", slug: "mouse-parallax" },
      { name: "3Dパララックス", slug: "3d-parallax" },
    ],
  },
  {
    id: "card-ui",
    name: "カード・UIパーツ系",
    slug: "card-ui",
    description: "カードやUIパーツのインタラクティブ表現。",
    icon: "LayoutGrid",
    subCategories: [
      { name: "カードタイプ", slug: "card-type" },
      { name: "カードホバー", slug: "card-hover" },
      { name: "カードスライダー", slug: "card-slider" },
      { name: "カードフリップ", slug: "card-flip" },
      { name: "アコーディオン", slug: "accordion" },
      { name: "モーダル", slug: "modal" },
    ],
  },
  {
    id: "text-animation",
    name: "テキスト演出系",
    slug: "text-animation",
    description: "文字を魅せるための多彩なテキスト表現。",
    icon: "Type",
    popular: true,
    subCategories: [
      { name: "テキストアニメーション", slug: "text-anim" },
      { name: "タイピング演出", slug: "typing" },
      { name: "文字分割アニメーション", slug: "split-text" },
      { name: "テキストリビール", slug: "text-reveal", featured: true },
      { name: "グラデーションテキスト", slug: "gradient-text" },
      { name: "カウントアップ", slug: "count-up" },
    ],
  },
  {
    id: "page-transition",
    name: "ページ遷移・画面切り替え系",
    slug: "page-transition",
    description: "ページやセクションのスムーズな切り替え表現。",
    icon: "ArrowRightLeft",
    keywords: ["ページトランジション", "トランジション", "遷移"],
    subCategories: [
      { name: "ページトランジション", slug: "page-trans", featured: true },
      { name: "フェード遷移", slug: "fade-trans" },
      { name: "スライド遷移", slug: "slide-trans" },
      { name: "マスク遷移", slug: "mask-trans" },
    ],
  },
  {
    id: "loading",
    name: "ローディング系",
    slug: "loading",
    description: "読み込みを楽しく魅せるローディング表現。",
    icon: "Loader",
    subCategories: [
      { name: "ローディング", slug: "loading-basic" },
      { name: "プリローダー", slug: "preloader" },
      { name: "スプラッシュ画面", slug: "splash" },
      { name: "プログレスバー", slug: "progress-bar" },
      { name: "スケルトンUI", slug: "skeleton-ui" },
    ],
  },
  {
    id: "mouse-interaction",
    name: "マウス・インタラクション系",
    slug: "mouse-interaction",
    description: "カーソル操作に反応するインタラクティブ表現。",
    icon: "MousePointer",
    subCategories: [
      { name: "マウス追従", slug: "mouse-follow" },
      { name: "カスタムカーソル", slug: "custom-cursor" },
      { name: "マグネットボタン", slug: "magnet-button", featured: true },
      { name: "ホバーアニメーション", slug: "hover-anim" },
    ],
  },
  {
    id: "background-visual",
    name: "背景・ビジュアル表現系",
    slug: "background-visual",
    description: "背景やビジュアルで魅せるダイナミックな表現。",
    icon: "Image",
    subCategories: [
      { name: "背景アニメーション", slug: "bg-anim" },
      { name: "グラデーション背景", slug: "gradient-bg" },
      { name: "パーティクル", slug: "particles" },
      { name: "グラスモーフィズム", slug: "glassmorphism" },
    ],
  },
  {
    id: "3d-webgl",
    name: "3D・WebGL寄り",
    slug: "3d-webgl",
    description: "WebGLや3Dを活用したリッチな表現カテゴリ。",
    icon: "Box",
    subCategories: [
      { name: "3Dモーション", slug: "3d-motion" },
      { name: "WebGL表現", slug: "webgl" },
      { name: "シェーダー表現", slug: "shader", featured: true },
      { name: "3Dモデル表示", slug: "3d-model" },
    ],
  },
  {
    id: "button-cta",
    name: "ボタン・CTA系",
    slug: "button-cta",
    description: "CTAやボタンを魅力的にするアニメーション表現。",
    icon: "MousePointerClick",
    subCategories: [
      { name: "ボタンアニメーション", slug: "button-anim" },
      { name: "マグネットボタン", slug: "magnet-btn", featured: true },
      { name: "ホバーCTA", slug: "hover-cta" },
    ],
  },
]

// カテゴリー名からカテゴリーを取得
export function getCategoryByName(name: string): Category | undefined {
  return categories.find((c) => c.name === name)
}

// スラッグからカテゴリーを取得
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

// 全カテゴリー名のリストを取得
export function getAllCategoryNames(): string[] {
  return categories.map((c) => c.name)
}

// 人気カテゴリーを取得
export function getPopularCategories(): Category[] {
  return categories.filter((c) => c.popular)
}

// 注目のサブカテゴリーを取得
export function getFeaturedSubCategories(): { category: Category; subCategory: SubCategory }[] {
  const featured: { category: Category; subCategory: SubCategory }[] = []
  categories.forEach((cat) => {
    cat.subCategories.forEach((sub) => {
      if (sub.featured) {
        featured.push({ category: cat, subCategory: sub })
      }
    })
  })
  return featured.slice(0, 4)
}

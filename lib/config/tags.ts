// タグ設定
// 新しいタグを追加する場合はここに追記

export interface Tag {
  id: string
  name: string
  slug: string
}

export const tags: Tag[] = [
  // ライブラリ・ツール
  { id: "gsap", name: "GSAP", slug: "gsap" },
  { id: "scroll-trigger", name: "ScrollTrigger", slug: "scroll-trigger" },
  { id: "three-js", name: "Three.js", slug: "three-js" },
  { id: "framer-motion", name: "Framer Motion", slug: "framer-motion" },
  
  // 技術・言語
  { id: "css", name: "CSS", slug: "css" },
  { id: "javascript", name: "JavaScript", slug: "javascript" },
  { id: "typescript", name: "TypeScript", slug: "typescript" },
  { id: "svg", name: "SVG", slug: "svg" },
  { id: "webgl", name: "WebGL", slug: "webgl" },
  
  // 概念・カテゴリ
  { id: "animation", name: "アニメーション", slug: "animation" },
  { id: "transition", name: "トランジション", slug: "transition" },
  { id: "interaction", name: "インタラクション", slug: "interaction" },
  { id: "ux", name: "UX", slug: "ux" },
  { id: "ui", name: "UI", slug: "ui" },
  { id: "performance", name: "パフォーマンス", slug: "performance" },
  
  // 表現タイプ
  { id: "scroll", name: "スクロール", slug: "scroll" },
  { id: "text", name: "テキスト", slug: "text" },
  { id: "loading", name: "ローディング", slug: "loading" },
  { id: "3d", name: "3D", slug: "3d" },
  { id: "storytelling", name: "ストーリーテリング", slug: "storytelling" },
]

// タグ名からタグを取得
export function getTagByName(name: string): Tag | undefined {
  return tags.find((t) => t.name === name)
}

// スラッグからタグを取得
export function getTagBySlug(slug: string): Tag | undefined {
  return tags.find((t) => t.slug === slug)
}

// タグ名の配列からタグオブジェクトの配列を取得
export function getTagsByNames(names: string[]): Tag[] {
  return names.map((name) => getTagByName(name)).filter((t): t is Tag => t !== undefined)
}

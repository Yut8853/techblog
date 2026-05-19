// カテゴリーごとのサムネイルグラデーション設定

export const categoryThumbnails: Record<string, string> = {
  "スクロール連動": "bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900",
  "ページトランジション": "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950",
  "ホバーアニメーション": "bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-950",
  "テキストアニメーション": "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
  "3Dモーション": "bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-950",
  "SVGアニメーション": "bg-gradient-to-br from-cyan-900 via-blue-900 to-slate-900",
  "マウス追従": "bg-gradient-to-br from-slate-800 via-gray-900 to-slate-950",
  "ローディング": "bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900",
  "パララックス": "bg-gradient-to-br from-rose-900 via-pink-900 to-slate-900",
  "カードタイプ": "bg-gradient-to-br from-amber-900 via-orange-900 to-slate-900",
}

// カテゴリー名からサムネイルクラスを取得
export function getThumbnailByCategory(category: string): string {
  return categoryThumbnails[category] || "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950"
}

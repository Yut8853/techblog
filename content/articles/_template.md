---
title: 記事タイトルを入れる
description: 記事一覧や詳細冒頭に出す要約を 1 文で入れる
category: スクロール連動
tags:
  - GSAP
  - ScrollTrigger
  - アニメーション
date: 2026年5月18日
publishedAt: 2026-05-18
readTime: 5分
viewer: playground
thumbnail: runtime
layout: default
files:
  - name: Component.jsx
    language: jsx
    content: |
      function Demo() {
        const rootRef = React.useRef(null)
        React.useEffect(() => {
          const context = gsap.context(() => {
            // ここにクリーンアップ処理を含めたGSAPコード
          }, rootRef)
          return () => context.revert()
        }, [])
        return <div ref={rootRef} className="demo">Hello</div>
      }
  - name: styles.css
    language: css
    content: |
      .demo {
        display: grid;
        place-items: center;
        min-height: 240px;
      }
code:
  jsx: |
    function Demo() {
      return <div className="demo">Hello</div>
    }
  css: |
    .demo {
      display: grid;
      place-items: center;
      min-height: 240px;
    }
---

## 🎯 企画メモ（AI執筆時はここを必ず埋めること）

- **今回はこれ以外:** [※既存記事の「次回避ける」を2件以上読み、何を避けるかを1行で決める。例: pin hero / split text / magnetic card 以外]
- **今回の主役:** [何を一番見せる記事か。例: SVG path に沿った移動]
- **差分:** [トリガー / 主役要素 / 動きの流れ / 見せ場の位置のどこを変えるか。例: セクション切り替えではなく、1 画面内の状態変化]

---

## 📝 はじめに

[このアニメーションがユーザー体験（UX）にどのような価値をもたらすか、演出の狙いや概要を2〜3文で解説。なぜそのコード（CSSやGSAPパラメータ）にしているのかの理由も深掘りして記述してください]

## 🛠️ 実装のポイント

- **[ポイント1：DOMとCSSの設計意図]**
  [なぜこのCSS構造が必要なのか、GSAPを適用する前の下地やマスクなどのテクニックについて解説]
- **[ポイント2：タイムラインとイージングの計算]**
  [Position Parameterによる時間の重なりや、staggerの間隔、イージングの選定理由について具体的に解説]
- **[ポイント3：React生命周期におけるコンテキスト管理]**
  [gsap.context() や revert() を用いたアンマウント時のクリーンアップ処理について解説]

## 💡 使いどころとカスタマイズ

- **最適なユースケース:** [ポートフォリオ、LPのどのセクションに向いているかを提示]
- **調整ダイヤル（パラメーター変更のヒント）:**
  - `[プロパティ名]` を `[値]` に変更すると、[〇〇な印象] に変化します。
  - `[プロパティ名]` を `[値]` に変更すると、[〇〇な挙動] になります。

---

## 📖 Frontmatter & 執筆システムルール（システム指示）

### Frontmatter のルール
- `title`: 記事タイトル
- `description`: 一覧や詳細上部の説明文
- `category`: 下の「利用可能カテゴリ」から 1 つ選ぶ
- `tags`: 下の「利用可能タグ」から複数選べる
- `date` / `publishedAt`: 画面表示用 / 並び替え用の ISO 日付（2026年基準）
- `viewer`: 現状は `playground` を使う
- `thumbnail`: 現状は `runtime` を使う
- `layout`: 現状は `default` を使う
- `files` / `code`: 実際のコードとプレビュー用コード（完全に一致させること。Reactのクリーンアップコードを必須とする）

### 利用可能カテゴリ
スクロール連動 / パララックス系 / カード・UIパーツ系 / テキスト演出系 / ページ遷移・画面切り替え系 / ローディング系 / マウス・インタラクション系 / 背景・ビジュアル表現系 / 3D・WebGL寄り / ボタン・CTA系

### 利用可能タグ
GSAP / ScrollTrigger / Three.js / Framer Motion / CSS / JavaScript / TypeScript / SVG / WebGL / アニメーション / トランジション / インタラクション / UX / UI / パフォーマンス / スクロール / テキスト / ローディング / 3D / ストーリーテリング

---

## 🔍 重複回避ルール＆記事アニメーション台帳

新しい記事を作る前に、このメモで既存の表現軸を確認し、**同一パターンの焼き直し記事を作らない**こと。
次の記事では、少なくとも「トリガー」「主役要素」「動きの流れ」「見せ場の位置」から**2点以上**を変えること。

### 既存記事一覧

#### スクロール連動
- **gsap-scroll-hero**
  - 主役: ヒーロー見出しと背景グロー
  - 軸: pin されたヒーロー内でタイトルを縮小退避
  - **次回避ける:** ピン留めしたヒーロー見出しの縮小フェード
- **gsap-stacked-cards-showcase**
  - 主役: 積層カード
  - 軸: scrub でカードの主役が順番に入れ替わる
  - **次回避ける:** 縦スクロールで重なったカードを段階切り替え
- **parallax-text-reveal-intro**
  - 主役: パララックス背景 + テキスト
  - 軸: 奥行き差のある導入リビール
  - **次回避ける:** 背景と見出しを同時にずらす定番パララックス導入

#### テキスト演出
- **split-text-gradient-wave**
  - 主役: 分割文字の見出し
  - 軸: stagger 登場後に弱いウェーブを継続
  - **次回避ける:** 文字ごとの順次出現 + 常時ゆらぎ
- **gsap-splittext-cta-banner**
  - 主役: SplitText 見出しと CTA
  - 軸: editorial なバナー導入 + 背景 orbit
  - **次回避ける:** SplitText の行出現に CTA 遅延表示を足す構成

#### カード・UI パーツ
- **magnetic-cards-stagger**
  - 主役: 3 枚カード
  - 軸: stagger 登場 + hover magnetic
  - **次回避ける:** 一覧カードが順番に現れて hover で吸い付く構成
- **webgl-tilt-shader-card**
  - 主役: 単体ビジュアルカード
  - 軸: 3D tilt + shader 風発光
  - **次回避ける:** 単体カードの傾きと発光追従の組み合わせ

#### ボタン・CTA
- **button-ripple-arrow-lift**
  - 主役: CTA ボタン
  - 軸: ripple 拡張 + 矢印リフト
  - **次回避ける:** ボタン面の波紋とアイコン上昇のセット
- **cursor-magnet-trail-lab**
  - 主役: カーソルとボタン
  - 軸: custom cursor + magnetic CTA
  - **次回避ける:** カーソル追従と CTA の磁力表現のセット

#### ローディング・画面切り替え
- **loading-transition-orbs**
  - 主役: オーブ群
  - 軸: ローディングから画面遷移への一体演出
  - **次回避ける:** 球体集合がまとまってページを開く構成
- **masked-page-transition-showcase**
  - 主役: オーバーレイとコンテンツ面
  - 軸: mask 拡張 + slide 遷移
  - **次回避ける:** 全画面マスク拡張から次画面をスライドイン

#### 背景・ビジュアル
- **particle-glass-background-shift**
  - 主役: 背景パーティクル + ガラス面
  - 軸: 背景に運動を持たせて前面情報を浮かせる
  - **次回避ける:** 背景粒子と glass panel の組み合わせ

#### 複合ランディング演出
- **steelworks-landing-page-reveal**
  - 主役: 複数セクション全体
  - 軸: preloader -> card align -> central visual expand の多段構成
  - **次回避ける:** 5 枚前後の構成を段階的に整列させる reveal
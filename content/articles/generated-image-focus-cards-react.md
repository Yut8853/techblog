---
title: Generated Image Focus Cards React
description: Reactで生成したSVG画像を使い、選択中の1枚だけをGSAPでなめらかに差し替える画像フォーカスカードです。
category: カード・UIパーツ系
tags:
  - GSAP
  - CSS
  - SVG
  - JavaScript
  - UI
  - UX
  - インタラクション
date: 2026年6月12日
publishedAt: 2026-06-12
readTime: 6分
viewer: playground
thumbnail: runtime
layout: default
files:
  - name: Component.jsx
    language: jsx
    content: |
      const VISUALS = [
        {
          id: 'trace',
          label: 'TRACE 01',
          title: 'Soft trace poster',
          caption: '細いラインと淡い面を重ねた、記事カード向けの抽象ビジュアルです。',
          colors: ['#f7efe4', '#e95f49', '#1b6f79'],
        },
        {
          id: 'signal',
          label: 'SIGNAL 02',
          title: 'Signal field',
          caption: '中央の円形と斜めの帯で、プロダクトの更新感を出します。',
          colors: ['#edf6f9', '#2f80ed', '#f2b705'],
        },
        {
          id: 'fold',
          label: 'FOLD 03',
          title: 'Paper fold depth',
          caption: '紙を折ったような面の差で、静止画にも少しだけ奥行きを足します。',
          colors: ['#f5f1ea', '#4f6f52', '#d95f76'],
        },
      ]

      function createGeneratedImage(item) {
        const [base, accent, deep] = item.colors
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 820">
            <rect width="1200" height="820" fill="${base}"/>
            <path d="M0 610 C240 520 350 690 560 572 C780 448 940 486 1200 358 L1200 820 L0 820 Z" fill="${accent}" opacity="0.92"/>
            <path d="M156 104 L882 38 L1068 362 L322 454 Z" fill="${deep}" opacity="0.88"/>
            <circle cx="875" cy="540" r="168" fill="${base}" opacity="0.76"/>
            <circle cx="875" cy="540" r="92" fill="${accent}" opacity="0.86"/>
            <path d="M118 648 L520 142 M220 720 L660 88 M806 744 L1110 384" stroke="${deep}" stroke-width="18" stroke-linecap="round" opacity="0.22"/>
            <text x="86" y="160" fill="#171717" font-family="Inter, Arial, sans-serif" font-size="58" font-weight="800" letter-spacing="0">${item.label}</text>
            <text x="90" y="222" fill="#171717" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" opacity="0.66" letter-spacing="0">Generated SVG image</text>
          </svg>
        `

        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
      }

      function FocusPreview({ item }) {
        return (
          <div className="focus-preview" aria-live="polite">
            <img
              key={item.id}
              className="focus-preview-image"
              src={createGeneratedImage(item)}
              alt={`${item.title} generated preview`}
            />
            <div className="focus-preview-copy">
              <p>{item.label}</p>
              <h1>{item.title}</h1>
              <span>{item.caption}</span>
            </div>
          </div>
        )
      }

      function VisualSelector({ visuals, activeId, onSelect }) {
        return (
          <div className="focus-selector" aria-label="Generated visual selector">
            {visuals.map(item => (
              <button
                key={item.id}
                type="button"
                className="focus-card"
                data-active={item.id === activeId}
                onClick={() => onSelect(item.id)}
                onFocus={() => onSelect(item.id)}
                aria-pressed={item.id === activeId}
              >
                <img src={createGeneratedImage(item)} alt="" />
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        )
      }

      function Demo() {
        const rootRef = React.useRef(null)
        const [activeId, setActiveId] = React.useState(VISUALS[0].id)
        const activeItem = VISUALS.find(item => item.id === activeId) || VISUALS[0]

        React.useEffect(() => {
          const context = gsap.context(() => {
            gsap.from('.focus-card', {
              y: 22,
              opacity: 0,
              duration: 0.64,
              ease: 'power3.out',
              stagger: 0.08,
            })
          }, rootRef)

          return () => context.revert()
        }, [])

        React.useEffect(() => {
          const context = gsap.context(() => {
            gsap.fromTo(
              '.focus-preview-image',
              { clipPath: 'inset(0 18% 0 18%)', scale: 1.08, opacity: 0.48 },
              { clipPath: 'inset(0 0% 0 0%)', scale: 1, opacity: 1, duration: 0.72, ease: 'power3.out' }
            )

            gsap.fromTo(
              '.focus-preview-copy > *',
              { y: 14, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.48, ease: 'power3.out', stagger: 0.05 }
            )
          }, rootRef)

          return () => context.revert()
        }, [activeId])

        return (
          <main className="focus-stage" ref={rootRef}>
            <section className="focus-shell" aria-label="Generated image focus cards">
              <FocusPreview item={activeItem} />
              <VisualSelector visuals={VISUALS} activeId={activeId} onSelect={setActiveId} />
            </section>
          </main>
        )
      }
  - name: styles.css
    language: css
    content: |
      :root {
        color-scheme: light;
        --paper: #f7f3ed;
        --ink: #171717;
        --muted: rgba(23, 23, 23, 0.64);
        --line: rgba(23, 23, 23, 0.14);
        --accent: #e95f49;
      }

      body {
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        background: #dfe7e3;
        font-family: Inter, system-ui, sans-serif;
      }

      .focus-stage {
        width: min(1060px, calc(100vw - 32px));
        padding: 18px;
      }

      .focus-shell {
        display: grid;
        grid-template-columns: minmax(0, 1.4fr) minmax(250px, 0.6fr);
        gap: 18px;
        min-height: 520px;
      }

      .focus-preview,
      .focus-selector {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--paper);
      }

      .focus-preview {
        position: relative;
        min-height: 520px;
        overflow: hidden;
      }

      .focus-preview-image {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 520px;
        object-fit: cover;
        transform-origin: center;
      }

      .focus-preview::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 34%, rgba(0, 0, 0, 0.56));
        pointer-events: none;
      }

      .focus-preview-copy {
        position: absolute;
        z-index: 1;
        left: clamp(22px, 5vw, 54px);
        right: clamp(22px, 5vw, 54px);
        bottom: clamp(24px, 5vw, 54px);
        color: #fff;
      }

      .focus-preview-copy p {
        margin: 0 0 12px;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0;
        text-transform: uppercase;
      }

      .focus-preview-copy h1 {
        max-width: 680px;
        margin: 0;
        font-size: clamp(2.35rem, 6vw, 5rem);
        line-height: 0.96;
        letter-spacing: 0;
      }

      .focus-preview-copy span {
        display: block;
        max-width: 34rem;
        margin-top: 18px;
        color: rgba(255, 255, 255, 0.82);
        font-size: 0.98rem;
        line-height: 1.8;
      }

      .focus-selector {
        display: grid;
        align-content: start;
        gap: 12px;
        padding: 12px;
      }

      .focus-card {
        display: grid;
        grid-template-columns: 86px minmax(0, 1fr);
        align-items: center;
        gap: 12px;
        min-height: 96px;
        padding: 10px;
        border: 1px solid transparent;
        border-radius: 8px;
        background: transparent;
        color: var(--ink);
        text-align: left;
        cursor: pointer;
        transition: border-color 220ms ease, background 220ms ease, transform 220ms ease;
      }

      .focus-card:hover,
      .focus-card:focus-visible {
        border-color: rgba(23, 23, 23, 0.22);
        background: rgba(255, 255, 255, 0.54);
        transform: translateY(-2px);
        outline: none;
      }

      .focus-card[data-active="true"] {
        border-color: rgba(233, 95, 73, 0.52);
        background: rgba(233, 95, 73, 0.1);
      }

      .focus-card img {
        width: 86px;
        aspect-ratio: 1;
        border-radius: 6px;
        object-fit: cover;
      }

      .focus-card span {
        min-width: 0;
        color: var(--muted);
        font-size: 0.93rem;
        font-weight: 760;
        line-height: 1.35;
      }

      .focus-card[data-active="true"] span {
        color: var(--ink);
      }

      @media (max-width: 820px) {
        .focus-shell {
          grid-template-columns: 1fr;
          min-height: auto;
        }

        .focus-preview,
        .focus-preview-image {
          min-height: 440px;
        }

        .focus-selector {
          grid-template-columns: 1fr;
        }
      }
---

## はじめに

記事一覧やWorksカードでは、画像を切り替えるたびに外部画像の準備が必要になることがあります。
ただ、UIの構造やアニメーションの検証段階では、実画像よりも「同じ比率で扱える仮のビジュアル」がある方が手早く試せます。

この記事では、添付画像や外部画像を使わず、React内で生成したSVG画像をカードUIに流し込みます。
見せ場は、選択した1枚だけを大きなプレビューへ差し替える瞬間です。

## 今回作るもの

今回は、画像カードの一覧と、大きなプレビューを持つ小さなUIパーツを作ります。
画像は `data:image/svg+xml` としてReact側で生成し、選択状態はReact stateで管理します。

* **今回はこれ以外:** 一覧カードが順番に現れてhoverで吸い付く構成、フルスクリーン画像ギャラリー、外部画像を使ったループ演出
* **今回の主役:** React stateで選択した画像を、GSAPでプレビューへなめらかに差し替える処理
* **最小単位:** 3つの生成画像から1つを選び、1枚の大きなプレビューだけを更新する
* **差分:** hover magneticやスクロールではなく、click / keyboard selectionをトリガーにする
* **再利用先:** Worksカード、記事一覧、プロダクト比較、デザイン案のプレビュー、CMSの画像選択UI
* **分離する責務:** React state、生成画像データ、選択ボタン、プレビュー、GSAPの差し替えアニメーション、CSSレイアウト

## コンポーネント設計

`Demo` は選択中のIDだけを持ちます。
画像の生成やボタンの見た目まで `Demo` に詰め込むと、あとでCMSデータへ差し替えるときに触る範囲が広くなります。

`FocusPreview` は大きな画像とコピーの表示だけを担当します。
`VisualSelector` は選択ボタンの一覧だけを担当します。
`createGeneratedImage()` はSVG文字列をdata URLへ変換する役割に閉じています。

この分け方にしておくと、生成画像を本番画像へ置き換える場合も、`VISUALS` の `src` を持たせるだけで済みます。
アニメーションの対象も `.focus-preview-image` と `.focus-preview-copy` に限定できるため、カード一覧のDOMに副作用が広がりません。

## 実装のポイント

生成画像は、SVGを文字列として組み立てて `encodeURIComponent()` でdata URLにします。
外部ファイルを待たずに同じ比率の画像を作れるので、レイアウト検証や記事デモに向いています。

プレビューの切り替えでは、Reactの `key={item.id}` を画像に付けています。
これにより選択が変わるたびに画像要素が新しくなり、GSAPの `fromTo()` を同じ初期状態から走らせられます。

`clipPath` は左右を少し閉じた状態から全体表示へ戻します。
単純なフェードだけよりも、画像が差し込まれたことが分かりやすく、カード選択UIの反応としても軽く見えます。

ReactでGSAPを使う部分は `gsap.context()` で `rootRef` の内側に限定します。
記事詳細から別ページへ移動したり、選択状態が変わってeffectが再実行されたりしても、`context.revert()` で前回分を片付けられます。

## 使いどころとカスタマイズ

この部品は、画像を主役にした小さな選択UIに向いています。
たとえば、Works詳細の別案切り替え、記事サムネイルのプレビュー、プロダクトカラーの見せ分けなどです。

印象を調整するなら、まず `duration` と `clipPath` の初期値を触ります。
`duration` を短くすると管理画面寄りの反応になり、長くするとポートフォリオ寄りの余韻が出ます。
`clipPath` の `18%` を大きくすると、よりマスク演出らしくなりますが、頻繁に切り替えるUIでは少し重く見えます。

サムネイル側はCSSの `data-active` で状態を表現しています。
React stateをDOM属性へ落としておくと、JSを増やさずに選択中の見た目を調整できます。

## 発展させるなら

本番では、`createGeneratedImage()` を外してCMSやAPIの画像URLを渡す形にできます。
その場合も、プレビュー、セレクター、アニメーションの責務を分けておけば、構造はほとんど変えずに済みます。

さらに発展させるなら、選択中の画像だけではなく、隣の候補画像を薄く重ねて奥行きを作る方法があります。
ただし、この記事の主役は「生成画像を使った選択プレビュー」なので、まずは1枚の差し替えだけに絞るのが扱いやすいです。
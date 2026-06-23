---
title: Studio Dialect Image Gallery React
description: スタジオ作品の画像を、Reactの選択状態とCSSトランジションで切り替える編集的なイメージギャラリーです。
category: カード・UIパーツ系
tags:
  - React
  - CSS
  - アニメーション
  - ギャラリー
  - UI
  - インタラクション
date: 2026年6月23日
publishedAt: 2026-06-23
readTime: 6分
viewer: playground
thumbnail: runtime
layout: tutorial
files:
  - name: Component.jsx
    language: jsx
    content: |
      const PROJECTS = [
        {
          id: 'atelier',
          number: '01',
          title: 'Atelier Index',
          type: 'Brand System',
          location: 'Tokyo Studio',
          description: '余白の広い誌面構成と、静かな色面を重ねたスタジオ向けのビジュアルセットです。',
          image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80',
        },
        {
          id: 'objects',
          number: '02',
          title: 'Object Studies',
          type: 'Art Direction',
          location: 'Still Room',
          description: 'プロダクト写真をギャラリーのように見せるため、強い装飾を避けて画像の重心を前に出します。',
          image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
        },
        {
          id: 'surface',
          number: '03',
          title: 'Surface Dialect',
          type: 'Editorial',
          location: 'Print Archive',
          description: 'テキストの切り替えと画像の差し替えを同じstateから制御し、作品一覧として再利用しやすくします。',
          image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
        },
        {
          id: 'gallery',
          number: '04',
          title: 'Gallery Notes',
          type: 'Campaign',
          location: 'North Hall',
          description: '小さなサムネイル操作でも、メインビジュアルの変化が読み取りやすいように情報量を絞ります。',
          image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
        },
      ]

      function ProjectPreview({ project }) {
        return (
          <figure className="dialect-preview">
            <img key={project.id} src={project.image} alt={`${project.title} preview`} />
            <figcaption>
              <span>{project.type}</span>
              <strong>{project.location}</strong>
            </figcaption>
          </figure>
        )
      }

      function ProjectDetails({ project }) {
        return (
          <section className="dialect-copy" aria-live="polite">
            <p className="dialect-kicker">Studio Dialect / {project.number}</p>
            <h1 key={project.id}>{project.title}</h1>
            <p>{project.description}</p>
          </section>
        )
      }

      function ProjectRail({ projects, activeId, onSelect }) {
        return (
          <nav className="dialect-rail" aria-label="Project gallery">
            {projects.map(project => {
              const isActive = project.id === activeId

              return (
                <button
                  key={project.id}
                  type="button"
                  className="dialect-thumb"
                  data-active={isActive}
                  onMouseEnter={() => onSelect(project.id)}
                  onFocus={() => onSelect(project.id)}
                  onClick={() => onSelect(project.id)}
                  aria-pressed={isActive}
                >
                  <img src={project.image} alt="" />
                  <span>{project.number}</span>
                </button>
              )
            })}
          </nav>
        )
      }

      function Demo() {
        const [activeId, setActiveId] = React.useState(PROJECTS[0].id)
        const activeIndex = PROJECTS.findIndex(project => project.id === activeId)
        const activeProject = PROJECTS[activeIndex] || PROJECTS[0]
        const progress = `${((activeIndex + 1) / PROJECTS.length) * 100}%`

        return (
          <main className="dialect-stage">
            <div className="dialect-shell" style={{ '--progress': progress }}>
              <ProjectPreview project={activeProject} />

              <div className="dialect-panel">
                <ProjectDetails project={activeProject} />
                <ProjectRail projects={PROJECTS} activeId={activeId} onSelect={setActiveId} />

                <div className="dialect-progress" aria-hidden="true">
                  <span />
                </div>
              </div>
            </div>
          </main>
        )
      }
  - name: styles.css
    language: css
    content: |
      :root {
        color-scheme: light;
        --paper: #f4f0e8;
        --ink: #1b1a17;
        --muted: rgba(27, 26, 23, 0.62);
        --line: rgba(27, 26, 23, 0.16);
        --accent: #b84a34;
      }

      * {
        box-sizing: border-box;
      }

      body {
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        background: #d7ded6;
        color: var(--ink);
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      }

      .dialect-stage {
        width: min(1120px, calc(100vw - 32px));
        padding: 18px;
      }

      .dialect-shell {
        min-height: 620px;
        display: grid;
        grid-template-columns: minmax(0, 1.12fr) minmax(320px, 0.88fr);
        border: 1px solid var(--line);
        background: var(--paper);
      }

      .dialect-preview {
        position: relative;
        min-height: 620px;
        margin: 0;
        overflow: hidden;
        background: #c6cfc5;
      }

      .dialect-preview img {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 620px;
        object-fit: cover;
        animation: imageReveal 680ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }

      .dialect-preview::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 46%, rgba(0, 0, 0, 0.42));
        pointer-events: none;
      }

      .dialect-preview figcaption {
        position: absolute;
        z-index: 1;
        left: clamp(20px, 4vw, 44px);
        right: clamp(20px, 4vw, 44px);
        bottom: clamp(20px, 4vw, 42px);
        display: flex;
        justify-content: space-between;
        gap: 18px;
        color: #fff;
        font-size: 0.78rem;
        text-transform: uppercase;
      }

      .dialect-preview figcaption span,
      .dialect-preview figcaption strong {
        font-weight: 700;
        letter-spacing: 0.12em;
      }

      .dialect-panel {
        position: relative;
        display: grid;
        grid-template-rows: 1fr auto auto;
        gap: 32px;
        padding: clamp(24px, 5vw, 56px);
      }

      .dialect-copy {
        align-self: end;
      }

      .dialect-kicker {
        margin: 0 0 16px;
        color: var(--accent);
        font-size: 0.76rem;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      .dialect-copy h1 {
        max-width: 8ch;
        margin: 0;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(3.7rem, 9vw, 7.4rem);
        font-weight: 500;
        line-height: 0.9;
        letter-spacing: 0;
        animation: copyRise 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }

      .dialect-copy p:last-child {
        max-width: 34rem;
        margin: 24px 0 0;
        color: var(--muted);
        font-size: 0.96rem;
        line-height: 1.8;
      }

      .dialect-rail {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 10px;
      }

      .dialect-thumb {
        position: relative;
        aspect-ratio: 1;
        min-width: 0;
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 0;
        padding: 0;
        background: #e8e2d7;
        cursor: pointer;
      }

      .dialect-thumb img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(1) contrast(0.82);
        transform: scale(1.05);
        transition: filter 240ms ease, transform 240ms ease, opacity 240ms ease;
      }

      .dialect-thumb span {
        position: absolute;
        left: 10px;
        bottom: 9px;
        color: #fff;
        font-size: 0.72rem;
        font-weight: 800;
        text-shadow: 0 1px 8px rgba(0, 0, 0, 0.38);
      }

      .dialect-thumb[data-active="true"] img,
      .dialect-thumb:hover img,
      .dialect-thumb:focus-visible img {
        filter: grayscale(0) contrast(1);
        transform: scale(1);
      }

      .dialect-thumb[data-active="true"] {
        outline: 2px solid var(--accent);
        outline-offset: -2px;
      }

      .dialect-progress {
        height: 2px;
        background: var(--line);
        overflow: hidden;
      }

      .dialect-progress span {
        display: block;
        width: var(--progress);
        height: 100%;
        background: var(--accent);
        transition: width 360ms cubic-bezier(0.22, 1, 0.36, 1);
      }

      @keyframes imageReveal {
        from {
          opacity: 0.45;
          clip-path: inset(0 0 0 18%);
          transform: scale(1.08);
        }

        to {
          opacity: 1;
          clip-path: inset(0);
          transform: scale(1);
        }
      }

      @keyframes copyRise {
        from {
          opacity: 0;
          transform: translateY(18px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 820px) {
        .dialect-stage {
          width: min(100vw, 620px);
          padding: 0;
        }

        .dialect-shell {
          min-height: 100svh;
          grid-template-columns: 1fr;
        }

        .dialect-preview,
        .dialect-preview img {
          min-height: 48svh;
        }

        .dialect-panel {
          gap: 24px;
          padding: 24px;
        }

        .dialect-copy h1 {
          max-width: 9ch;
          font-size: clamp(3.1rem, 18vw, 5.4rem);
        }

        .dialect-rail {
          grid-template-columns: repeat(4, minmax(64px, 1fr));
        }
      }
---

## はじめに

この記事では、ページ全体のランディング演出ではなく、作品一覧やポートフォリオの一部に差し込める小さなReactコンポーネントへ整理します。

複雑な分割アニメーションではなく、Reactの選択状態からメイン画像、テキスト、サムネイル、進捗バーを同期させる構造に絞ります。

## 今回作るもの

今回作るのは、スタジオ作品を切り替えるイメージギャラリーです。
ホバー、フォーカス、クリックのどれでも選択状態を変えられるので、マウス操作とキーボード操作の両方で同じUIを使えます。

* 主役: React stateで管理する選択中プロジェクト
* トリガー: hover / focus / click
* 対象要素: メイン画像、見出し、サムネイル、進捗バー
* 再利用先: Works一覧、ポートフォリオ、ブランド事例、記事内ギャラリー

## コンポーネント設計

このデモでは、`Demo` が選択状態を持ちます。
`activeId` だけをstateにして、表示する画像やテキストは `PROJECTS` から派生させます。

`ProjectPreview` は大きな画像とメタ情報だけを担当します。
画像に `key={project.id}` を付けることで、選択が変わったときにCSSアニメーションを毎回走らせています。

`ProjectDetails` は見出しと説明文を担当します。
ここでも見出しに `key` を付け、画像の差し替えと同じタイミングでテキストが軽く立ち上がるようにします。

`ProjectRail` はサムネイルナビです。
ボタン要素にしておくと、クリックだけでなくフォーカス時にも同じ `onSelect` を使えるため、インタラクションの入口を増やしても状態管理は複雑になりません。

## 実装のポイント

一番大事なのは、アニメーションのためにstateを増やしすぎないことです。
今回必要なのは「どの作品が選ばれているか」だけなので、`activeId` から `activeProject`、`activeIndex`、`progress` を計算します。

CSS側では、画像の `clip-path` と `scale` を使って差し替え時の動きを作ります。
Reactは表示対象を切り替えるだけにして、細かな見た目の変化はCSSへ寄せています。

サムネイルには `aria-pressed` と `data-active` を持たせています。
`aria-pressed` は状態を支援技術へ伝えるため、`data-active` はCSSで選択中スタイルを当てるために分けています。

## カスタマイズの考え方

作品数を増やしたい場合は、`PROJECTS` にオブジェクトを追加するだけです。
プレビュー、コピー、サムネイル、進捗バーは同じデータから更新されます。

動きを強くしたい場合は、`imageReveal` の `clip-path` の開始位置を大きくします。
落ち着いたギャラリーにしたい場合は、`scale` の差を小さくし、アニメーション時間を少し長めにすると読みやすくなります。

背景色やアクセントカラーは `:root` のCSS変数でまとめています。
ブランドサイトやポートフォリオへ移植するときは、まず `--paper`、`--ink`、`--accent` だけを調整すると全体の印象を変えやすくなります。

## まとめ

このギャラリーは、React側で選択状態を明確に持ち、CSS側で画像とテキストの差し替え演出を担当する構成です。
複雑なタイムラインを使わなくても、データ、表示、状態、スタイルの責務を分けるだけで、実務に移植しやすいアニメーション部品になります。

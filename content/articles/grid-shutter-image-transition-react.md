---
title: Grid Shutter Image Transition React
description: 画像ビューの切り替え時に、格子状のセルを横方向へ閉じて開くシャッター遷移です。
category: ページ遷移・画面切り替え系
tags:
  - React
  - GSAP
  - アニメーション
  - トランジション
  - UI
date: 2026年6月9日
publishedAt: 2026-06-09
readTime: 6分
viewer: playground
thumbnail: runtime
layout: tutorial
files:
  - name: Component.jsx
    language: jsx
    content: |
      function GridShutterTransition() {
        const ROWS = 4
        const COLS = 12
        const [activeIndex, setActiveIndex] = React.useState(0)
        const stageRef = React.useRef(null)
        const blockRefs = React.useRef([])
        const isAnimatingRef = React.useRef(false)

        const slides = [
          {
            title: 'Genesis',
            label: 'Mountain air',
            image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80',
          },
          {
            title: 'Cascade',
            label: 'Forest route',
            image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=80',
          },
          {
            title: 'Orbit',
            label: 'Night coast',
            image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80',
          },
        ]

        const blocks = React.useMemo(
          () =>
            Array.from({ length: ROWS * COLS }, (_, index) => {
              const row = Math.floor(index / COLS)
              const col = index % COLS

              return {
                id: `${row}-${col}`,
                row,
                col,
                origin: row % 2 === 0 ? 'left center' : 'right center',
              }
            }),
          []
        )

        React.useEffect(() => {
          const ctx = gsap.context(() => {
            gsap.set(blockRefs.current, { scaleX: 0 })
          }, stageRef)

          return () => ctx.revert()
        }, [])

        const getRowBlocks = row => blockRefs.current.slice(row * COLS, row * COLS + COLS)

        const runShutter = nextIndex => {
          if (isAnimatingRef.current || nextIndex === activeIndex) return
          isAnimatingRef.current = true

          const timeline = gsap.timeline({
            defaults: { duration: 0.58, ease: 'power3.inOut' },
            onComplete: () => {
              isAnimatingRef.current = false
            },
          })

          for (let row = 0; row < ROWS; row += 1) {
            timeline.to(
              getRowBlocks(row),
              {
                scaleX: 1,
                stagger: {
                  each: 0.022,
                  from: row % 2 === 0 ? 'start' : 'end',
                },
              },
              0
            )
          }

          timeline
            .add(() => setActiveIndex(nextIndex))
            .to(blockRefs.current, {
              scaleX: 0,
              duration: 0.52,
              ease: 'power3.inOut',
              stagger: {
                grid: [ROWS, COLS],
                each: 0.012,
                from: 'center',
              },
            })
        }

        const current = slides[activeIndex]

        return (
          <section className="shutter-stage" ref={stageRef}>
            <img className="shutter-image" src={current.image} alt="" />
            <div className="shutter-shade" />

            <nav className="shutter-nav" aria-label="Image views">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  className={index === activeIndex ? 'is-active' : ''}
                  type="button"
                  onClick={() => runShutter(index)}
                >
                  {slide.title}
                </button>
              ))}
            </nav>

            <div className="shutter-copy">
              <p>{current.label}</p>
              <h1>{current.title}</h1>
            </div>

            <div className="shutter-grid" aria-hidden="true">
              {blocks.map((block, index) => (
                <span
                  key={block.id}
                  ref={element => {
                    blockRefs.current[index] = element
                  }}
                  className="shutter-block"
                  style={{
                    '--row': block.row,
                    '--col': block.col,
                    '--origin': block.origin,
                  }}
                />
              ))}
            </div>
          </section>
        )
      }
  - name: styles.css
    language: css
    content: |
      :root {
        color-scheme: dark;
        --paper: #f5efe6;
        --ink: #fffaf2;
        --muted: rgba(255, 250, 242, 0.68);
        --night: #0b1118;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #11161d;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      }

      .shutter-stage {
        position: relative;
        width: min(1040px, calc(100vw - 2rem));
        min-height: 76vh;
        overflow: hidden;
        background: var(--night);
        color: var(--ink);
      }

      .shutter-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.04);
      }

      .shutter-shade {
        position: absolute;
        inset: 0;
        background:
          linear-gradient(180deg, rgba(8, 12, 18, 0.12), rgba(8, 12, 18, 0.76)),
          linear-gradient(90deg, rgba(8, 12, 18, 0.62), transparent 60%);
      }

      .shutter-nav {
        position: absolute;
        z-index: 3;
        inset: 1rem 1rem auto;
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }

      .shutter-nav button {
        border: 1px solid rgba(255, 250, 242, 0.24);
        border-radius: 999px;
        padding: 0.65rem 0.9rem;
        background: rgba(9, 14, 20, 0.34);
        color: var(--ink);
        font: inherit;
        font-size: 0.78rem;
        letter-spacing: 0.04em;
        cursor: pointer;
        backdrop-filter: blur(14px);
      }

      .shutter-nav button.is-active {
        background: var(--paper);
        color: #15110c;
      }

      .shutter-copy {
        position: absolute;
        z-index: 2;
        left: clamp(1.25rem, 5vw, 4rem);
        bottom: clamp(1.5rem, 6vw, 4.5rem);
        max-width: 720px;
      }

      .shutter-copy p {
        margin: 0 0 0.85rem;
        color: var(--muted);
        font-size: 0.82rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
      }

      .shutter-copy h1 {
        margin: 0;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(4rem, 15vw, 11rem);
        font-weight: 500;
        line-height: 0.86;
      }

      .shutter-grid {
        position: absolute;
        z-index: 4;
        inset: 0;
        pointer-events: none;
      }

      .shutter-block {
        position: absolute;
        left: calc(var(--col) * 8.3334%);
        top: calc(var(--row) * 25%);
        width: calc(8.3334% + 1px);
        height: calc(25% + 1px);
        background: var(--paper);
        transform: scaleX(0);
        transform-origin: var(--origin);
        will-change: transform;
      }

      @media (max-width: 720px) {
        .shutter-stage {
          width: 100vw;
          min-height: 100svh;
        }

        .shutter-nav {
          justify-content: flex-start;
          overflow-x: auto;
        }

        .shutter-copy h1 {
          font-size: clamp(3.5rem, 22vw, 7rem);
        }
      }
code:
  jsx: |
    function GridShutterTransition() {
      const ROWS = 4
      const COLS = 12
      const [activeIndex, setActiveIndex] = React.useState(0)
      const stageRef = React.useRef(null)
      const blockRefs = React.useRef([])
      const isAnimatingRef = React.useRef(false)

      const slides = [
        {
          title: 'Genesis',
          label: 'Mountain air',
          image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80',
        },
        {
          title: 'Cascade',
          label: 'Forest route',
          image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=80',
        },
        {
          title: 'Orbit',
          label: 'Night coast',
          image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80',
        },
      ]

      const blocks = React.useMemo(
        () =>
          Array.from({ length: ROWS * COLS }, (_, index) => {
            const row = Math.floor(index / COLS)
            const col = index % COLS

            return {
              id: `${row}-${col}`,
              row,
              col,
              origin: row % 2 === 0 ? 'left center' : 'right center',
            }
          }),
        []
      )

      React.useEffect(() => {
        const ctx = gsap.context(() => {
          gsap.set(blockRefs.current, { scaleX: 0 })
        }, stageRef)

        return () => ctx.revert()
      }, [])

      const getRowBlocks = row => blockRefs.current.slice(row * COLS, row * COLS + COLS)

      const runShutter = nextIndex => {
        if (isAnimatingRef.current || nextIndex === activeIndex) return
        isAnimatingRef.current = true

        const timeline = gsap.timeline({
          defaults: { duration: 0.58, ease: 'power3.inOut' },
          onComplete: () => {
            isAnimatingRef.current = false
          },
        })

        for (let row = 0; row < ROWS; row += 1) {
          timeline.to(
            getRowBlocks(row),
            {
              scaleX: 1,
              stagger: {
                each: 0.022,
                from: row % 2 === 0 ? 'start' : 'end',
              },
            },
            0
          )
        }

        timeline
          .add(() => setActiveIndex(nextIndex))
          .to(blockRefs.current, {
            scaleX: 0,
            duration: 0.52,
            ease: 'power3.inOut',
            stagger: {
              grid: [ROWS, COLS],
              each: 0.012,
              from: 'center',
            },
          })
      }

      const current = slides[activeIndex]

      return (
        <section className="shutter-stage" ref={stageRef}>
          <img className="shutter-image" src={current.image} alt="" />
          <div className="shutter-shade" />

          <nav className="shutter-nav" aria-label="Image views">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                className={index === activeIndex ? 'is-active' : ''}
                type="button"
                onClick={() => runShutter(index)}
              >
                {slide.title}
              </button>
            ))}
          </nav>

          <div className="shutter-copy">
            <p>{current.label}</p>
            <h1>{current.title}</h1>
          </div>

          <div className="shutter-grid" aria-hidden="true">
            {blocks.map((block, index) => (
              <span
                key={block.id}
                ref={element => {
                  blockRefs.current[index] = element
                }}
                className="shutter-block"
                style={{
                  '--row': block.row,
                  '--col': block.col,
                  '--origin': block.origin,
                }}
              />
            ))}
          </div>
        </section>
      )
    }
  css: |
    :root {
      color-scheme: dark;
      --paper: #f5efe6;
      --ink: #fffaf2;
      --muted: rgba(255, 250, 242, 0.68);
      --night: #0b1118;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #11161d;
      font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    }

    .shutter-stage {
      position: relative;
      width: min(1040px, calc(100vw - 2rem));
      min-height: 76vh;
      overflow: hidden;
      background: var(--night);
      color: var(--ink);
    }

    .shutter-image {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.04);
    }

    .shutter-shade {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(180deg, rgba(8, 12, 18, 0.12), rgba(8, 12, 18, 0.76)),
        linear-gradient(90deg, rgba(8, 12, 18, 0.62), transparent 60%);
    }

    .shutter-nav {
      position: absolute;
      z-index: 3;
      inset: 1rem 1rem auto;
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .shutter-nav button {
      border: 1px solid rgba(255, 250, 242, 0.24);
      border-radius: 999px;
      padding: 0.65rem 0.9rem;
      background: rgba(9, 14, 20, 0.34);
      color: var(--ink);
      font: inherit;
      font-size: 0.78rem;
      letter-spacing: 0.04em;
      cursor: pointer;
      backdrop-filter: blur(14px);
    }

    .shutter-nav button.is-active {
      background: var(--paper);
      color: #15110c;
    }

    .shutter-copy {
      position: absolute;
      z-index: 2;
      left: clamp(1.25rem, 5vw, 4rem);
      bottom: clamp(1.5rem, 6vw, 4.5rem);
      max-width: 720px;
    }

    .shutter-copy p {
      margin: 0 0 0.85rem;
      color: var(--muted);
      font-size: 0.82rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }

    .shutter-copy h1 {
      margin: 0;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: clamp(4rem, 15vw, 11rem);
      font-weight: 500;
      line-height: 0.86;
    }

    .shutter-grid {
      position: absolute;
      z-index: 4;
      inset: 0;
      pointer-events: none;
    }

    .shutter-block {
      position: absolute;
      left: calc(var(--col) * 8.3334%);
      top: calc(var(--row) * 25%);
      width: calc(8.3334% + 1px);
      height: calc(25% + 1px);
      background: var(--paper);
      transform: scaleX(0);
      transform-origin: var(--origin);
      will-change: transform;
    }

    @media (max-width: 720px) {
      .shutter-stage {
        width: 100vw;
        min-height: 100svh;
      }

      .shutter-nav {
        justify-content: flex-start;
        overflow-x: auto;
      }

      .shutter-copy h1 {
        font-size: clamp(3.5rem, 22vw, 7rem);
      }
    }
---

## はじめに

画面全面に並べた小さな矩形を `scaleX` で開閉するシャッターです。

この記事では `next-transition-router` への依存を外し、React の state で画像ビューを切り替える最小デモにしています。ページ遷移へ戻す場合も、`runShutter()` の中で state を変えている箇所をルーターの `next()` に置き換えれば同じ考え方で使えます。

## 今回作るもの

- **主役:** 行ごとに方向が変わるグリッドシャッター
- **トリガー:** ボタンで画像ビューを切り替える
- **対象要素:** 画面を覆う `ROWS x COLS` のセル
- **再利用先:** ページ遷移、ギャラリー切り替え、作品詳細のビュー変更

セル自体は見た目の要素なので React が担当し、GSAP は `blockRefs.current` に入った DOM の `scaleX` だけを動かします。これで DOM 生成とアニメーションの責務が分かれます。

## 動きの組み立て

最初の `to()` では、行ごとにセルを横へ広げて画面を覆います。偶数行は左から、奇数行は右から始まるように `transform-origin` と `stagger.from` を揃えています。

画面が覆われたタイミングで `setActiveIndex(nextIndex)` を呼び、裏側の画像を差し替えます。その後、全セルを中央起点の stagger で閉じることで、切り替わった画像が見える構成です。

## 調整しやすい値

- `ROWS`: 行数。少ないほど大きな面で切り替わる
- `COLS`: 列数。多いほど細かいシャッターになる
- `each`: セルごとの遅延。大きいほど波が強くなる
- `duration`: 閉じる速さと開く速さ

画像は添付ファイル内のものを使わず、Unsplash のフリー写真 URL に差し替えています。

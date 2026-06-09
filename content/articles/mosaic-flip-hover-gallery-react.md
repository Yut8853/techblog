---
title: Mosaic Flip Hover Gallery React
description: ホバーした項目の画像を、モザイク状の3Dタイルが中央から反転して見せるギャラリー演出です。
category: カード・UIパーツ系
tags:
  - React
  - GSAP
  - アニメーション
  - Hover
  - ギャラリー
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
      function MosaicFlipGallery() {
        const TILES_X = 12
        const TILES_Y = 9
        const TILE_SIZE = 54
        const previewRef = React.useRef(null)
        const tileRefs = React.useRef([])
        const activeIndexRef = React.useRef(0)
        const revealCountRef = React.useRef(0)
        const isAnimatingRef = React.useRef(false)
        const queuedIndexRef = React.useRef(null)
        const hoverTimerRef = React.useRef(null)
        const [activeIndex, setActiveIndex] = React.useState(0)
        const [faceImages, setFaceImages] = React.useState({ front: 0, back: 0 })

        const projects = [
          {
            title: 'Archive Field',
            image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80',
          },
          {
            title: 'Glass Quarry',
            image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
          },
          {
            title: 'Night Signal',
            image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80',
          },
          {
            title: 'Still Room',
            image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
          },
          {
            title: 'Soft Circuit',
            image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1400&q=80',
          },
        ]

        const tiles = React.useMemo(
          () =>
            Array.from({ length: TILES_X * TILES_Y }, (_, index) => {
              const row = Math.floor(index / TILES_X)
              const col = index % TILES_X

              return {
                id: `${row}-${col}`,
                row,
                col,
                x: -(col * TILE_SIZE),
                y: -(row * TILE_SIZE),
              }
            }),
          []
        )

        React.useEffect(() => {
          const ctx = gsap.context(() => {
            tileRefs.current.forEach((tile, index) => {
              gsap.to(tile, {
                z: () => gsap.utils.random(-28, 28),
                duration: () => gsap.utils.random(0.8, 1.6),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: index * 0.01,
              })
            })
          }, previewRef)

          return () => {
            window.clearTimeout(hoverTimerRef.current)
            ctx.revert()
          }
        }, [])

        const revealProject = index => {
          if (index === activeIndexRef.current && !isAnimatingRef.current) return

          if (isAnimatingRef.current) {
            queuedIndexRef.current = index
            return
          }

          isAnimatingRef.current = true
          queuedIndexRef.current = null
          const nextRotation = revealCountRef.current + 1
          const hiddenFace = revealCountRef.current % 2 === 0 ? 'back' : 'front'
          activeIndexRef.current = index
          setActiveIndex(index)
          setFaceImages(current => ({ ...current, [hiddenFace]: index }))

          window.requestAnimationFrame(() => {
            revealCountRef.current = nextRotation

            gsap.to(tileRefs.current, {
              rotateY: nextRotation * 180,
              duration: 0.58,
              ease: 'power3.inOut',
              stagger: {
                grid: [TILES_Y, TILES_X],
                from: 'center',
                each: 0.018,
              },
              onComplete: () => {
                isAnimatingRef.current = false

                if (
                  queuedIndexRef.current !== null &&
                  queuedIndexRef.current !== activeIndexRef.current
                ) {
                  revealProject(queuedIndexRef.current)
                }
              },
            })
          })
        }

        const scheduleReveal = index => {
          window.clearTimeout(hoverTimerRef.current)
          hoverTimerRef.current = window.setTimeout(() => revealProject(index), 60)
        }

        return (
          <section className="mosaic-stage">
            <div
              ref={previewRef}
              className="mosaic-preview"
              style={{
                '--tile-size': `${TILE_SIZE}px`,
                '--tiles-x': TILES_X,
                '--tiles-y': TILES_Y,
                '--preview-width': `${TILES_X * TILE_SIZE}px`,
                '--preview-height': `${TILES_Y * TILE_SIZE}px`,
                '--front-image': `url(${projects[faceImages.front].image})`,
                '--back-image': `url(${projects[faceImages.back].image})`,
              }}
            >
              {tiles.map((tile, index) => (
                <span
                  key={tile.id}
                  ref={element => {
                    tileRefs.current[index] = element
                  }}
                  className="mosaic-tile"
                  style={{
                    '--x': `${tile.x}px`,
                    '--y': `${tile.y}px`,
                  }}
                >
                  <span className="mosaic-face mosaic-front" />
                  <span className="mosaic-face mosaic-back" />
                  <span className="mosaic-face mosaic-right" />
                  <span className="mosaic-face mosaic-left" />
                  <span className="mosaic-face mosaic-top" />
                  <span className="mosaic-face mosaic-bottom" />
                </span>
              ))}
            </div>

            <nav
              className="mosaic-list"
              aria-label="Project previews"
              onMouseLeave={() => scheduleReveal(0)}
            >
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  className={index === activeIndex ? 'is-active' : ''}
                  type="button"
                  onMouseEnter={() => scheduleReveal(index)}
                  onFocus={() => scheduleReveal(index)}
                >
                  {project.title}
                </button>
              ))}
            </nav>
          </section>
        )
      }
  - name: styles.css
    language: css
    content: |
      :root {
        color-scheme: dark;
        --bg: #171717;
        --ink: #f8f4ec;
        --muted: rgba(248, 244, 236, 0.48);
        --edge: #252525;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: var(--bg);
        color: var(--ink);
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      }

      .mosaic-stage {
        position: relative;
        width: min(1080px, 100vw);
        min-height: 100svh;
        overflow: hidden;
        display: grid;
        place-items: center;
        background:
          radial-gradient(circle at 34% 36%, rgba(248, 244, 236, 0.1), transparent 24%),
          var(--bg);
        perspective: 820px;
        transform-style: preserve-3d;
      }

      .mosaic-preview {
        display: grid;
        grid-template-columns: repeat(var(--tiles-x), var(--tile-size));
        grid-template-rows: repeat(var(--tiles-y), var(--tile-size));
        transform-style: preserve-3d;
      }

      .mosaic-tile {
        position: relative;
        width: var(--tile-size);
        height: var(--tile-size);
        transform-style: preserve-3d;
        will-change: transform;
      }

      .mosaic-face {
        position: absolute;
        inset: 0;
        background-size: var(--preview-width) var(--preview-height);
        background-position: var(--x) var(--y);
        backface-visibility: hidden;
      }

      .mosaic-front {
        background-image: var(--front-image);
        transform: translateZ(calc(var(--tile-size) / 2));
      }

      .mosaic-back {
        background-image: var(--back-image);
        transform: rotateY(180deg) translateZ(calc(var(--tile-size) / 2));
      }

      .mosaic-right {
        background: var(--edge);
        transform: rotateY(90deg) translateZ(calc(var(--tile-size) / 2));
      }

      .mosaic-left {
        background: #111;
        transform: rotateY(-90deg) translateZ(calc(var(--tile-size) / 2));
      }

      .mosaic-top {
        background: #2c2c2c;
        transform: rotateX(90deg) translateZ(calc(var(--tile-size) / 2));
      }

      .mosaic-bottom {
        background: #101010;
        transform: rotateX(-90deg) translateZ(calc(var(--tile-size) / 2));
      }

      .mosaic-list {
        position: absolute;
        right: clamp(1rem, 5vw, 3rem);
        bottom: clamp(1.5rem, 6vw, 3rem);
        z-index: 5;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      .mosaic-list button {
        border: 0;
        padding: 0.18rem 0;
        background: transparent;
        color: var(--muted);
        font: inherit;
        font-size: clamp(0.9rem, 2vw, 1rem);
        letter-spacing: 0.08em;
        text-align: right;
        text-transform: uppercase;
        cursor: pointer;
        transition: color 0.25s ease;
      }

      .mosaic-list button:hover,
      .mosaic-list button:focus-visible,
      .mosaic-list button.is-active {
        color: var(--ink);
      }

      @media (max-width: 760px) {
        .mosaic-preview {
          transform: scale(0.64);
        }

        .mosaic-list {
          left: 1rem;
          right: 1rem;
          align-items: flex-start;
        }

        .mosaic-list button {
          text-align: left;
        }
      }
code:
  jsx: |
    function MosaicFlipGallery() {
      const TILES_X = 12
      const TILES_Y = 9
      const TILE_SIZE = 54
      const previewRef = React.useRef(null)
      const tileRefs = React.useRef([])
      const activeIndexRef = React.useRef(0)
      const revealCountRef = React.useRef(0)
      const isAnimatingRef = React.useRef(false)
        const queuedIndexRef = React.useRef(null)
        const hoverTimerRef = React.useRef(null)
        const [activeIndex, setActiveIndex] = React.useState(0)
        const [faceImages, setFaceImages] = React.useState({ front: 0, back: 0 })

      const projects = [
        {
          title: 'Archive Field',
          image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80',
        },
        {
          title: 'Glass Quarry',
          image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
        },
        {
          title: 'Night Signal',
          image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80',
        },
        {
          title: 'Still Room',
          image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
        },
        {
          title: 'Soft Circuit',
          image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1400&q=80',
        },
      ]

      const tiles = React.useMemo(
        () =>
          Array.from({ length: TILES_X * TILES_Y }, (_, index) => {
            const row = Math.floor(index / TILES_X)
            const col = index % TILES_X

            return {
              id: `${row}-${col}`,
              row,
              col,
              x: -(col * TILE_SIZE),
              y: -(row * TILE_SIZE),
            }
          }),
        []
      )

      React.useEffect(() => {
        const ctx = gsap.context(() => {
          tileRefs.current.forEach((tile, index) => {
            gsap.to(tile, {
              z: () => gsap.utils.random(-28, 28),
              duration: () => gsap.utils.random(0.8, 1.6),
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: index * 0.01,
            })
          })
        }, previewRef)

        return () => {
          window.clearTimeout(hoverTimerRef.current)
          ctx.revert()
        }
      }, [])

      const revealProject = index => {
        if (index === activeIndexRef.current && !isAnimatingRef.current) return

        if (isAnimatingRef.current) {
          queuedIndexRef.current = index
          return
        }

        isAnimatingRef.current = true
        queuedIndexRef.current = null
        const nextRotation = revealCountRef.current + 1
        const hiddenFace = revealCountRef.current % 2 === 0 ? 'back' : 'front'
        activeIndexRef.current = index
        setActiveIndex(index)
        setFaceImages(current => ({ ...current, [hiddenFace]: index }))

        window.requestAnimationFrame(() => {
          revealCountRef.current = nextRotation

          gsap.to(tileRefs.current, {
            rotateY: nextRotation * 180,
            duration: 0.58,
            ease: 'power3.inOut',
            stagger: {
              grid: [TILES_Y, TILES_X],
              from: 'center',
              each: 0.018,
            },
            onComplete: () => {
              isAnimatingRef.current = false

              if (
                queuedIndexRef.current !== null &&
                queuedIndexRef.current !== activeIndexRef.current
              ) {
                revealProject(queuedIndexRef.current)
              }
            },
          })
        })
      }

      const scheduleReveal = index => {
        window.clearTimeout(hoverTimerRef.current)
        hoverTimerRef.current = window.setTimeout(() => revealProject(index), 60)
      }

      return (
        <section className="mosaic-stage">
          <div
            ref={previewRef}
            className="mosaic-preview"
            style={{
              '--tile-size': `${TILE_SIZE}px`,
              '--tiles-x': TILES_X,
              '--tiles-y': TILES_Y,
              '--preview-width': `${TILES_X * TILE_SIZE}px`,
              '--preview-height': `${TILES_Y * TILE_SIZE}px`,
              '--front-image': `url(${projects[faceImages.front].image})`,
              '--back-image': `url(${projects[faceImages.back].image})`,
            }}
          >
            {tiles.map((tile, index) => (
              <span
                key={tile.id}
                ref={element => {
                  tileRefs.current[index] = element
                }}
                className="mosaic-tile"
                style={{
                  '--x': `${tile.x}px`,
                  '--y': `${tile.y}px`,
                }}
              >
                <span className="mosaic-face mosaic-front" />
                <span className="mosaic-face mosaic-back" />
                <span className="mosaic-face mosaic-right" />
                <span className="mosaic-face mosaic-left" />
                <span className="mosaic-face mosaic-top" />
                <span className="mosaic-face mosaic-bottom" />
              </span>
            ))}
          </div>

          <nav
            className="mosaic-list"
            aria-label="Project previews"
            onMouseLeave={() => scheduleReveal(0)}
          >
            {projects.map((project, index) => (
              <button
                key={project.title}
                className={index === activeIndex ? 'is-active' : ''}
                type="button"
                onMouseEnter={() => scheduleReveal(index)}
                onFocus={() => scheduleReveal(index)}
              >
                {project.title}
              </button>
            ))}
          </nav>
        </section>
      )
    }
  css: |
    :root {
      color-scheme: dark;
      --bg: #171717;
      --ink: #f8f4ec;
      --muted: rgba(248, 244, 236, 0.48);
      --edge: #252525;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: var(--bg);
      color: var(--ink);
      font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    }

    .mosaic-stage {
      position: relative;
      width: min(1080px, 100vw);
      min-height: 100svh;
      overflow: hidden;
      display: grid;
      place-items: center;
      background:
        radial-gradient(circle at 34% 36%, rgba(248, 244, 236, 0.1), transparent 24%),
        var(--bg);
      perspective: 820px;
      transform-style: preserve-3d;
    }

    .mosaic-preview {
      display: grid;
      grid-template-columns: repeat(var(--tiles-x), var(--tile-size));
      grid-template-rows: repeat(var(--tiles-y), var(--tile-size));
      transform-style: preserve-3d;
    }

    .mosaic-tile {
      position: relative;
      width: var(--tile-size);
      height: var(--tile-size);
      transform-style: preserve-3d;
      will-change: transform;
    }

    .mosaic-face {
      position: absolute;
      inset: 0;
      background-size: var(--preview-width) var(--preview-height);
      background-position: var(--x) var(--y);
      backface-visibility: hidden;
    }

    .mosaic-front {
      background-image: var(--front-image);
      transform: translateZ(calc(var(--tile-size) / 2));
    }

    .mosaic-back {
      background-image: var(--back-image);
      transform: rotateY(180deg) translateZ(calc(var(--tile-size) / 2));
    }

    .mosaic-right {
      background: var(--edge);
      transform: rotateY(90deg) translateZ(calc(var(--tile-size) / 2));
    }

    .mosaic-left {
      background: #111;
      transform: rotateY(-90deg) translateZ(calc(var(--tile-size) / 2));
    }

    .mosaic-top {
      background: #2c2c2c;
      transform: rotateX(90deg) translateZ(calc(var(--tile-size) / 2));
    }

    .mosaic-bottom {
      background: #101010;
      transform: rotateX(-90deg) translateZ(calc(var(--tile-size) / 2));
    }

    .mosaic-list {
      position: absolute;
      right: clamp(1rem, 5vw, 3rem);
      bottom: clamp(1.5rem, 6vw, 3rem);
      z-index: 5;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .mosaic-list button {
      border: 0;
      padding: 0.18rem 0;
      background: transparent;
      color: var(--muted);
      font: inherit;
      font-size: clamp(0.9rem, 2vw, 1rem);
      letter-spacing: 0.08em;
      text-align: right;
      text-transform: uppercase;
      cursor: pointer;
      transition: color 0.25s ease;
    }

    .mosaic-list button:hover,
    .mosaic-list button:focus-visible,
    .mosaic-list button.is-active {
      color: var(--ink);
    }

    @media (max-width: 760px) {
      .mosaic-preview {
        transform: scale(0.64);
      }

      .mosaic-list {
        left: 1rem;
        right: 1rem;
        align-items: flex-start;
      }

      .mosaic-list button {
        text-align: left;
      }
    }
---

## はじめに

小さなタイルの集合として見せる hover ギャラリーです。

この記事では `document.createElement()` でタイルを組み立てる部分を React の JSX に置き換え、GSAP はタイルの `rotateY` と奥行きの揺れだけを担当する形にしています。

## 今回作るもの

- **主役:** 画像を分割して見せる3Dモザイクタイル
- **トリガー:** リスト項目の hover / focus
- **対象要素:** `12 x 9` のタイルグリッド
- **再利用先:** Works一覧、ギャラリー、実績リンク、ポートフォリオのプレビュー

画像の切り出しは `background-position` で行います。タイルごとに `--x` と `--y` を渡して、1枚の画像が分割されて見えるようにしています。

## 動きの組み立て

常時の動きは、各タイルの `z` を小さく揺らすだけです。これで静止画のグリッドに少しだけ奥行きが出ます。

hover 時は全タイルを `rotateY` で 180 度ずつ加算していきます。`stagger.grid` を使い、中心から外側へ反転が広がるようにしているのが見せ場です。

## 調整しやすい値

- `TILES_X`: 横方向の分割数
- `TILES_Y`: 縦方向の分割数
- `TILE_SIZE`: 1タイルのサイズ
- `stagger.each`: 反転が広がる速さ
- `duration`: 1タイルの反転速度

画像は添付ファイル内のものではなく、Unsplash のフリー写真 URL に差し替えています。

---
title: JUNKBRANDING Editorial Landing
description: 静的なランディングページの構図を React のコンポーネント構成に置き換え、ブランドタイポとパネル群を一体で見せる記事です。
category: 背景・ビジュアル表現系
tags:
  - CSS
  - JavaScript
  - UI
  - UX
  - アニメーション
date: 2026年5月23日
publishedAt: 2026-05-23
readTime: 6分
viewer: playground
thumbnail: runtime
layout: gallery
files:
  - name: Component.jsx
    language: jsx
    content: |
      function JunkBrandingLanding() {
        const rootRef = React.useRef(null)
        const backdropRows = [
          [
            ['JUNKBRANDING', 'JUNKBRANDING', 'JUNKBRANDING', 'JUNKBRANDING'],
            ['テキストテキスト、、、', 'テキストテキスト、、、'],
            ['テキストテキスト、、、', 'テキストテキスト、、、'],
            ['JUNKBRANDING'],
            [':::..:::.::::..:::'],
          ],
          [
            ['テキストテキスト、、、'],
            ['// / / ///// / / / ///'],
            ['JUNKBRANDING / 17%'],
            ['テキストテキスト、、、', 'テキストテキスト、、、'],
            ['テキストテキスト、、、', 'テキストテキスト、、、'],
            ['JB-01'],
          ],
        ]

        React.useEffect(() => {
          const ctx = gsap.context(() => {
            gsap.set('.jb-copy-line, .jb-status-line, .jb-hero-word', {
              yPercent: 100,
            })

            gsap.set('.jb-circle-track, .jb-circle-progress', {
              strokeDasharray: 974,
              strokeDashoffset: 974,
            })

            const timeline = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.6 })

            timeline
              .to('.jb-copy-line', {
                yPercent: 0,
                duration: 0.72,
                stagger: 0.035,
              })
              .to(
                '.jb-circle-track',
                {
                  strokeDashoffset: 0,
                  duration: 1.75,
                  ease: 'power2.inOut',
                },
                '<'
              )
              .to(
                '.jb-circle-progress',
                {
                  strokeDashoffset: 140,
                  duration: 1.75,
                  ease: 'power2.inOut',
                },
                '<0.08'
              )
              .to(
                '.jb-status-line',
                {
                  yPercent: 0,
                  duration: 0.72,
                  stagger: 0.06,
                },
                '-=0.72'
              )
              .to('.jb-preloader-shell', {
                scale: 0.92,
                duration: 1.2,
                ease: 'power2.inOut',
              })
              .to(
                '.jb-preloader',
                {
                  clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
                  duration: 1.25,
                  ease: 'power4.inOut',
                }
              )
              .to(
                '.jb-hero-revealer',
                {
                  clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
                  duration: 1.25,
                  ease: 'power4.inOut',
                },
                '<'
              )
              .to(
                '.jb-hero',
                {
                  scale: 1,
                  duration: 1.2,
                  ease: 'power4.out',
                },
                '<0.06'
              )
              .to(
                '.jb-hero-word',
                {
                  yPercent: 0,
                  duration: 0.95,
                  ease: 'power3.out',
                },
                '<0.12'
              )
          }, rootRef)

          return () => ctx.revert()
        }, [])

        return (
          <section ref={rootRef} className="jb-landing">
            <div className="jb-preloader-backdrop" aria-hidden="true">
              {backdropRows.map((columns, rowIndex) => (
                <div key={`row-${rowIndex}`} className="jb-backdrop-row">
                  {columns.map((lines, columnIndex) => (
                    <div key={`col-${rowIndex}-${columnIndex}`} className="jb-backdrop-col">
                      {columnIndex === 3 && rowIndex === 0 ? (
                        <div className="jb-logo-mark" />
                      ) : (
                        lines.map((line, lineIndex) => <p key={`line-${lineIndex}`}>{line}</p>)
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="jb-preloader">
              <div className="jb-preloader-row">
                <p><span className="jb-copy-line">JUNKBRANDING</span></p>
              </div>

              <div className="jb-preloader-row">
                <div className="jb-preloader-col">
                  <div className="jb-preloader-sub-col">
                    <p><span className="jb-copy-line">テキスト</span></p>
                    <p><span className="jb-copy-line">テキスト</span></p>
                  </div>

                  <div className="jb-preloader-sub-col">
                    <p><span className="jb-copy-line">テキスト</span></p>
                    <p><span className="jb-copy-line">テキスト</span></p>
                  </div>
                </div>

                <div className="jb-preloader-col">
                  <p><span className="jb-copy-line">JB-01</span></p>
                </div>
              </div>

              <div className="jb-preloader-shell" aria-hidden="true">
                <div className="jb-logo-core" />
                <div className="jb-status-copy">
                  <span className="jb-status-line">JUNKBRANDING</span>
                </div>
                <div className="jb-status-copy jb-status-copy-outro">
                  <span className="jb-status-line">テキストテキスト、、、</span>
                </div>

                <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    className="jb-circle-track"
                    cx="160"
                    cy="160"
                    r="155"
                    stroke="#2b2b2b"
                    strokeWidth="2"
                  />
                  <circle
                    className="jb-circle-progress"
                    cx="160"
                    cy="160"
                    r="155"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            <section className="jb-hero">
              <div className="jb-hero-revealer" aria-hidden="true" />
              <h1>
                <span className="jb-word-wrap">
                  <span className="jb-hero-word">JUNKBRANDING</span>
                </span>
              </h1>
              <p className="jb-hero-meta">テキストテキスト、、、</p>
            </section>
          </section>
        )
      }
  - name: styles.css
    language: css
    content: |
      @import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;800&family=Geist+Mono:wght@400;500;700&display=swap");

      :root {
        --base-100: #ffffff;
        --base-200: #7a7a7a;
        --base-300: #000000;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        min-height: 100vh;
        background: var(--base-300);
        color: var(--base-100);
        overflow: hidden;
      }

      p {
        text-transform: uppercase;
        font-family: "Geist Mono", monospace;
        font-size: 0.75rem;
        font-weight: 500;
        line-height: 1;
      }

      h1 {
        width: 90%;
        text-transform: uppercase;
        font-family: "Barlow Condensed", sans-serif;
        font-size: clamp(5rem, 15vw, 15rem);
        font-weight: 800;
        letter-spacing: -0.02em;
        line-height: 0.8;
      }

      .jb-word-wrap,
      .jb-status-copy,
      .jb-preloader p {
        display: block;
        overflow: hidden;
      }

      .jb-copy-line,
      .jb-status-line,
      .jb-hero-word {
        display: inline-block;
        will-change: transform;
      }

      .jb-landing {
        position: relative;
        min-height: 100vh;
        background: var(--base-300);
      }

      .jb-preloader-backdrop {
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: var(--base-100);
        color: var(--base-200);
        z-index: 0;
      }

      .jb-backdrop-row,
      .jb-preloader-row {
        width: 100%;
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
      }

      .jb-backdrop-row:last-child {
        align-items: flex-end;
      }

      .jb-backdrop-col,
      .jb-preloader-col {
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
      }

      .jb-preloader-col {
        flex-direction: row;
        align-items: flex-end;
        gap: 6rem;
      }

      .jb-preloader-sub-col {
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
      }

      .jb-logo-mark,
      .jb-logo-core {
        position: relative;
        width: 2.5rem;
        height: 2.5rem;
        border: 1px dashed currentColor;
      }

      .jb-logo-mark::before,
      .jb-logo-mark::after,
      .jb-logo-core::before,
      .jb-logo-core::after {
        content: "";
        position: absolute;
        inset: 0.32rem;
        border: 2px solid currentColor;
      }

      .jb-logo-mark::after,
      .jb-logo-core::after {
        inset: 0.68rem;
        background: currentColor;
      }

      .jb-preloader {
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: var(--base-300);
        color: var(--base-100);
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        z-index: 2;
      }

      .jb-preloader-shell {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20rem;
        height: 20rem;
        transform: translate(-50%, -50%);
      }

      .jb-logo-core,
      .jb-status-copy,
      .jb-preloader-shell svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .jb-logo-core {
        width: 4rem;
        height: 4rem;
      }

      .jb-status-copy {
        font-family: "Geist Mono", monospace;
        font-size: 0.9rem;
      }

      .jb-status-copy-outro {
        top: calc(50% + 1.5rem);
        opacity: 0.65;
      }

      .jb-preloader-shell svg {
        width: 100%;
        height: 100%;
      }

      .jb-hero {
        position: relative;
        width: 100%;
        height: 100svh;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1.25rem;
        text-align: center;
        background: var(--base-300);
        color: var(--base-100);
        transform: scale(0.75);
        will-change: transform;
      }

      .jb-hero-revealer {
        position: absolute;
        inset: 0;
        background: var(--base-100);
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
      }

      .jb-hero h1,
      .jb-hero-meta {
        position: relative;
        z-index: 1;
      }

      .jb-hero-meta {
        color: rgba(255, 255, 255, 0.65);
      }

      @media (max-width: 1000px) {
        .jb-backdrop-row .jb-backdrop-col:nth-child(1),
        .jb-backdrop-row .jb-backdrop-col:nth-child(2),
        .jb-backdrop-row .jb-backdrop-col:nth-child(5) {
          display: none;
        }
      }

      @media (max-width: 720px) {
        .jb-backdrop-row,
        .jb-preloader-row,
        .jb-hero {
          padding: 1rem;
        }

        .jb-preloader-col {
          gap: 2rem;
        }

        h1 {
          width: 100%;
          font-size: clamp(4rem, 20vw, 8rem);
        }
      }
code:
  jsx: |
    function JunkBrandingLanding() {
      const rootRef = React.useRef(null)
      const backdropRows = [
        [
          ['JUNKBRANDING', 'JUNKBRANDING', 'JUNKBRANDING', 'JUNKBRANDING'],
          ['テキストテキスト、、、', 'テキストテキスト、、、'],
          ['テキストテキスト、、、', 'テキストテキスト、、、'],
          ['JUNKBRANDING'],
          [':::..:::.::::..:::'],
        ],
        [
          ['テキストテキスト、、、'],
          ['// / / ///// / / / ///'],
          ['JUNKBRANDING / 17%'],
          ['テキストテキスト、、、', 'テキストテキスト、、、'],
          ['テキストテキスト、、、', 'テキストテキスト、、、'],
          ['JB-01'],
        ],
      ]

      React.useEffect(() => {
        const ctx = gsap.context(() => {
          gsap.set('.jb-copy-line, .jb-status-line, .jb-hero-word', {
            yPercent: 100,
          })

          gsap.set('.jb-circle-track, .jb-circle-progress', {
            strokeDasharray: 974,
            strokeDashoffset: 974,
          })

          const timeline = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.6 })

          timeline
            .to('.jb-copy-line', {
              yPercent: 0,
              duration: 0.72,
              stagger: 0.035,
            })
            .to(
              '.jb-circle-track',
              {
                strokeDashoffset: 0,
                duration: 1.75,
                ease: 'power2.inOut',
              },
              '<'
            )
            .to(
              '.jb-circle-progress',
              {
                strokeDashoffset: 140,
                duration: 1.75,
                ease: 'power2.inOut',
              },
              '<0.08'
            )
            .to(
              '.jb-status-line',
              {
                yPercent: 0,
                duration: 0.72,
                stagger: 0.06,
              },
              '-=0.72'
            )
            .to('.jb-preloader-shell', {
              scale: 0.92,
              duration: 1.2,
              ease: 'power2.inOut',
            })
            .to('.jb-preloader', {
              clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
              duration: 1.25,
              ease: 'power4.inOut',
            })
            .to(
              '.jb-hero-revealer',
              {
                clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
                duration: 1.25,
                ease: 'power4.inOut',
              },
              '<'
            )
            .to(
              '.jb-hero',
              {
                scale: 1,
                duration: 1.2,
                ease: 'power4.out',
              },
              '<0.06'
            )
            .to(
              '.jb-hero-word',
              {
                yPercent: 0,
                duration: 0.95,
                ease: 'power3.out',
              },
              '<0.12'
            )
        }, rootRef)

        return () => ctx.revert()
      }, [])

      return (
        <section ref={rootRef} className="jb-landing">
          <div className="jb-preloader-backdrop" aria-hidden="true">
            {backdropRows.map((columns, rowIndex) => (
              <div key={`row-${rowIndex}`} className="jb-backdrop-row">
                {columns.map((lines, columnIndex) => (
                  <div key={`col-${rowIndex}-${columnIndex}`} className="jb-backdrop-col">
                    {columnIndex === 3 && rowIndex === 0 ? (
                      <div className="jb-logo-mark" />
                    ) : (
                      lines.map((line, lineIndex) => <p key={`line-${lineIndex}`}>{line}</p>)
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="jb-preloader">
            <div className="jb-preloader-row">
              <p><span className="jb-copy-line">JUNKBRANDING</span></p>
            </div>

            <div className="jb-preloader-row">
              <div className="jb-preloader-col">
                <div className="jb-preloader-sub-col">
                  <p><span className="jb-copy-line">テキスト</span></p>
                  <p><span className="jb-copy-line">テキスト</span></p>
                </div>

                <div className="jb-preloader-sub-col">
                  <p><span className="jb-copy-line">テキスト</span></p>
                  <p><span className="jb-copy-line">テキスト</span></p>
                </div>
              </div>

              <div className="jb-preloader-col">
                <p><span className="jb-copy-line">JB-01</span></p>
              </div>
            </div>

            <div className="jb-preloader-shell" aria-hidden="true">
              <div className="jb-logo-core" />
              <div className="jb-status-copy">
                <span className="jb-status-line">JUNKBRANDING</span>
              </div>
              <div className="jb-status-copy jb-status-copy-outro">
                <span className="jb-status-line">テキストテキスト、、、</span>
              </div>

              <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="jb-circle-track" cx="160" cy="160" r="155" stroke="#2b2b2b" strokeWidth="2" />
                <circle className="jb-circle-progress" cx="160" cy="160" r="155" stroke="#fff" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <section className="jb-hero">
            <div className="jb-hero-revealer" aria-hidden="true" />
            <h1>
              <span className="jb-word-wrap">
                <span className="jb-hero-word">JUNKBRANDING</span>
              </span>
            </h1>
            <p className="jb-hero-meta">テキストテキスト、、、</p>
          </section>
        </section>
      )
    }
  css: |
    @import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;800&family=Geist+Mono:wght@400;500;700&display=swap");

    :root {
      --base-100: #ffffff;
      --base-200: #7a7a7a;
      --base-300: #000000;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      min-height: 100vh;
      background: var(--base-300);
      color: var(--base-100);
      overflow: hidden;
    }

    p {
      text-transform: uppercase;
      font-family: "Geist Mono", monospace;
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 1;
    }

    h1 {
      width: 90%;
      text-transform: uppercase;
      font-family: "Barlow Condensed", sans-serif;
      font-size: clamp(5rem, 15vw, 15rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 0.8;
    }

    .jb-word-wrap,
    .jb-status-copy,
    .jb-preloader p {
      display: block;
      overflow: hidden;
    }

    .jb-copy-line,
    .jb-status-line,
    .jb-hero-word {
      display: inline-block;
      will-change: transform;
    }

    .jb-landing {
      position: relative;
      min-height: 100vh;
      background: var(--base-300);
    }

    .jb-preloader-backdrop {
      position: fixed;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: var(--base-100);
      color: var(--base-200);
      z-index: 0;
    }

    .jb-backdrop-row,
    .jb-preloader-row {
      width: 100%;
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }

    .jb-backdrop-row:last-child {
      align-items: flex-end;
    }

    .jb-backdrop-col,
    .jb-preloader-col {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    .jb-preloader-col {
      flex-direction: row;
      align-items: flex-end;
      gap: 6rem;
    }

    .jb-preloader-sub-col {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    .jb-logo-mark,
    .jb-logo-core {
      position: relative;
      width: 2.5rem;
      height: 2.5rem;
      border: 1px dashed currentColor;
    }

    .jb-logo-mark::before,
    .jb-logo-mark::after,
    .jb-logo-core::before,
    .jb-logo-core::after {
      content: "";
      position: absolute;
      inset: 0.32rem;
      border: 2px solid currentColor;
    }

    .jb-logo-mark::after,
    .jb-logo-core::after {
      inset: 0.68rem;
      background: currentColor;
    }

    .jb-preloader {
      position: fixed;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: var(--base-300);
      color: var(--base-100);
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
      z-index: 2;
    }

    .jb-preloader-shell {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20rem;
      height: 20rem;
      transform: translate(-50%, -50%);
    }

    .jb-logo-core,
    .jb-status-copy,
    .jb-preloader-shell svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .jb-logo-core {
      width: 4rem;
      height: 4rem;
    }

    .jb-status-copy {
      font-family: "Geist Mono", monospace;
      font-size: 0.9rem;
    }

    .jb-status-copy-outro {
      top: calc(50% + 1.5rem);
      opacity: 0.65;
    }

    .jb-preloader-shell svg {
      width: 100%;
      height: 100%;
    }

    .jb-hero {
      position: relative;
      width: 100%;
      height: 100svh;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1.25rem;
      text-align: center;
      background: var(--base-300);
      color: var(--base-100);
      transform: scale(0.75);
      will-change: transform;
    }

    .jb-hero-revealer {
      position: absolute;
      inset: 0;
      background: var(--base-100);
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    }

    .jb-hero h1,
    .jb-hero-meta {
      position: relative;
      z-index: 1;
    }

    .jb-hero-meta {
      color: rgba(255, 255, 255, 0.65);
    }

    @media (max-width: 1000px) {
      .jb-backdrop-row .jb-backdrop-col:nth-child(1),
      .jb-backdrop-row .jb-backdrop-col:nth-child(2),
      .jb-backdrop-row .jb-backdrop-col:nth-child(5) {
        display: none;
      }
    }

    @media (max-width: 720px) {
      .jb-backdrop-row,
      .jb-preloader-row,
      .jb-hero {
        padding: 1rem;
      }

      .jb-preloader-col {
        gap: 2rem;
      }

      h1 {
        width: 100%;
        font-size: clamp(4rem, 20vw, 8rem);
      }
    }
      .jb-orbit-b {
        width: 210px;
        height: 210px;
        left: 38px;
        bottom: 164px;
      }

      .jb-orbit-c {
        width: 160px;
        height: 160px;
        left: 64px;
        bottom: 190px;
      }
    }
---

## 企画メモ

- 今回はこれ以外: preloader -> card align -> central visual expand の多段構成以外
- 今回の主役: ブランドタイポと情報パネルを同時に立ち上げるファーストビュー
- 差分: ローディング起点ではなく初期表示のスタッガー / 5枚整列ではなく左右 2 カラム / 見せ場は 1 画面内

## 実装の狙い

静的な見た目をそのまま持ち込むのではなく、配列マップでナビやパネルを組み直す形にしておく。後で差し替える前提なら、ここを React 側で管理できる方が楽。

見出しやブランドラベルは `JUNKBRANDING` に寄せて、本文は `テキストテキスト、、、` に統一。見た目の空気だけ先に残して、中身はあとで差し替える想定。

## 組み合わせのポイント

- ブランドタイポ、情報パネル、軌道オブジェクトを同時に立ち上げて 1 画面内で密度を作る
- 左側は文字、右側はカード群に分けて、役割を明確にしたまま同時進行で見せる
- ナビ、メトリクス、パネルを同じブランドトーンで揃えて、差し替え前提の雛形にする
- 初期表示だけで空気を作り、ローディングやスクロール依存にはしない

## 実装のポイント

- 繰り返し要素は配列で持ち、JSX で map して差し替えやすくする
- 初期表示アニメーションは `gsap.context()` 内に集約して、セレクタ管理を閉じる
- タイポ、カード、軌道で初期値を変えて、同じ timeline でも見え方に段差を作る
- モバイルではレイアウトを縦積みに落として、同じコンポーネントのまま崩れを防ぐ

## React化したポイント

1. 繰り返し要素は配列化して JSX 側で持つ
2. 初期表示アニメーションは `useEffect` と GSAP timeline に寄せる
3. 見た目の雰囲気は残しつつ、カードとパネルは再利用しやすくしておく
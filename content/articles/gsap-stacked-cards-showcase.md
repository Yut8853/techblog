---
title: GSAPで作るスタックカードのスクロールショーケース
description: ScrollTriggerでカードを重ねながら切り替えていく、縦スクロール型のショーケース演出です。
category: スクロール連動
tags:
  - GSAP
  - ScrollTrigger
  - JavaScript
  - CSS
  - アニメーション
  - スクロール
date: 2026年5月21日
publishedAt: 2026-05-21
readTime: 6分
viewer: playground
thumbnail: runtime
layout: tutorial
files:
  - name: StackedCardsShowcase.jsx
    language: jsx
    content: |
      function StackedCardsShowcase() {
        const rootRef = React.useRef(null)
        const cards = [
          {
            className: 'card-a',
            index: '01',
            title: 'Launch Story',
            body: '大胆な見出しと落ち着いた補足文で、最初の一枚を基準面にします。',
          },
          {
            className: 'card-b',
            index: '02',
            title: 'Motion Layer',
            body: '次のカードは少し縮小した状態から入り、切り替わりを明確に見せます。',
          },
          {
            className: 'card-c',
            index: '03',
            title: 'Final Focus',
            body: '最後のカードで配色を反転させ、到達点をはっきり印象付けます。',
          },
        ]

        React.useEffect(() => {
          gsap.registerPlugin(ScrollTrigger)

          const context = gsap.context(() => {
            const cardElements = gsap.utils.toArray('.stack-card')
            const progressFill = document.querySelector('.progress-fill')
            const stage = document.querySelector('.stacked-stage')

            gsap.set(cardElements, {
              yPercent: index => index * 8,
              scale: index => 1 - index * 0.05,
              rotate: index => index * -2,
              transformOrigin: '50% 100%',
            })

            const timeline = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: stage,
                start: 'top top',
                end: '+=220%',
                pin: true,
                scrub: true,
                anticipatePin: 1,
              },
            })

            timeline
              .to(cardElements[0], { yPercent: -18, scale: 0.88, rotate: -5 }, 0)
              .to(cardElements[1], { yPercent: 0, scale: 1, rotate: 0 }, 0)
              .to(cardElements[2], { yPercent: 16, scale: 0.92, rotate: -3 }, 0)
              .to(cardElements[1], { yPercent: -16, scale: 0.9, rotate: -4 }, 1)
              .to(cardElements[2], { yPercent: 0, scale: 1, rotate: 0 }, 1)
              .to(progressFill, { scaleX: 1, ease: 'none' }, 0)

            gsap.from('.stage-copy > *', {
              opacity: 0,
              y: 32,
              duration: 0.9,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.stacked-hero',
                start: 'bottom 70%',
              },
            })
          }, rootRef)

          return () => context.revert()
        }, [])

        return (
          <main ref={rootRef} className="stacked-showcase">
            <section className="stacked-hero">
              <p className="eyebrow">ScrollTrigger / Timeline</p>
              <h1>
                STACKED
                <br />
                SHOWCASE
              </h1>
              <p className="lead">
                複数カードを積層しながら、スクロールに合わせて主役を切り替えていく構成です。
              </p>
            </section>

            <section className="stacked-stage">
              <div className="stage-copy">
                <span className="stage-kicker">Feature Panels</span>
                <h2>縦スクロールの移動量を、そのまま視線誘導に変える</h2>
              </div>

              <div className="stacked-cards">
                {cards.map(card => (
                  <article key={card.index} className={`stack-card ${card.className}`}>
                    <span className="card-index">{card.index}</span>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </article>
                ))}
              </div>

              <div className="progress-rail" aria-hidden="true">
                <span className="progress-fill" />
              </div>
            </section>

            <section className="stacked-outro">
              <p>
                ScrollTrigger の pin と scrub を組み合わせると、セクション遷移そのものを演出にできます。
              </p>
            </section>
          </main>
        )
      }
  - name: styles.css
    language: css
    content: |
      :root {
        color-scheme: dark;
        --bg: #06131f;
        --panel: rgba(9, 18, 32, 0.76);
        --line: rgba(148, 163, 184, 0.22);
        --text: #e5eef8;
        --muted: rgba(226, 232, 240, 0.72);
        --accent: #67e8f9;
        --accent-strong: #22d3ee;
      }

      body {
        background:
          radial-gradient(circle at top, rgba(34, 211, 238, 0.14), transparent 26%),
          linear-gradient(180deg, #020617 0%, #06131f 100%);
        color: var(--text);
      }

      .stacked-showcase {
        min-height: 260vh;
      }

      .stacked-hero,
      .stacked-outro {
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 8vw;
        text-align: center;
      }

      .stacked-hero h1 {
        margin: 0.4rem 0 0;
        font-size: clamp(3rem, 10vw, 8rem);
        line-height: 0.88;
        letter-spacing: -0.08em;
      }

      .eyebrow,
      .stage-kicker {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.78rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: rgba(165, 243, 252, 0.78);
      }

      .lead,
      .stacked-outro p {
        max-width: 42rem;
        margin: 1.3rem auto 0;
        color: var(--muted);
        line-height: 1.8;
        font-size: clamp(1rem, 2vw, 1.18rem);
      }

      .stacked-stage {
        position: relative;
        min-height: 100vh;
        padding: 8vh 7vw;
        display: grid;
        align-items: center;
        grid-template-columns: minmax(260px, 0.9fr) minmax(320px, 1.1fr);
        gap: 3rem;
      }

      .stage-copy h2 {
        margin-top: 1rem;
        font-size: clamp(2rem, 4.8vw, 4.5rem);
        line-height: 0.98;
        letter-spacing: -0.05em;
      }

      .stacked-cards {
        position: relative;
        min-height: 520px;
      }

      .stack-card {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 2rem;
        border: 1px solid var(--line);
        border-radius: 32px;
        overflow: hidden;
        backdrop-filter: blur(14px);
        box-shadow: 0 24px 80px rgba(2, 6, 23, 0.36);
        transform-origin: 50% 100%;
      }

      .stack-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(148, 163, 184, 0.02), rgba(15, 23, 42, 0.5));
      }

      .card-a {
        background: linear-gradient(160deg, rgba(14, 116, 144, 0.56), rgba(8, 47, 73, 0.9));
      }

      .card-b {
        background: linear-gradient(160deg, rgba(22, 78, 99, 0.6), rgba(17, 24, 39, 0.92));
      }

      .card-c {
        background: linear-gradient(160deg, rgba(226, 232, 240, 0.96), rgba(191, 219, 254, 0.92));
        color: #082032;
      }

      .card-index,
      .stack-card h3,
      .stack-card p {
        position: relative;
        z-index: 1;
      }

      .card-index {
        font-size: 0.8rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        opacity: 0.8;
      }

      .stack-card h3 {
        margin-top: 0.8rem;
        font-size: clamp(2rem, 4vw, 3rem);
        line-height: 1;
      }

      .stack-card p {
        max-width: 24rem;
        margin-top: 0.9rem;
        line-height: 1.75;
      }

      .progress-rail {
        position: absolute;
        left: 7vw;
        right: 7vw;
        bottom: 7vh;
        height: 2px;
        background: rgba(148, 163, 184, 0.18);
        overflow: hidden;
      }

      .progress-fill {
        display: block;
        width: 100%;
        height: 100%;
        transform-origin: 0% 50%;
        transform: scaleX(0);
        background: linear-gradient(90deg, var(--accent), var(--accent-strong));
      }

      @media (max-width: 900px) {
        .stacked-stage {
          grid-template-columns: 1fr;
        }

        .stacked-cards {
          min-height: 420px;
        }

        .progress-rail {
          position: static;
          margin-top: 1rem;
        }
      }
code:
  jsx: |
    function StackedCardsShowcase() {
      const rootRef = React.useRef(null)
      const cards = [
        {
          className: 'card-a',
          index: '01',
          title: 'Launch Story',
          body: '大胆な見出しと落ち着いた補足文で、最初の一枚を基準面にします。',
        },
        {
          className: 'card-b',
          index: '02',
          title: 'Motion Layer',
          body: '次のカードは少し縮小した状態から入り、切り替わりを明確に見せます。',
        },
        {
          className: 'card-c',
          index: '03',
          title: 'Final Focus',
          body: '最後のカードで配色を反転させ、到達点をはっきり印象付けます。',
        },
      ]

      React.useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const context = gsap.context(() => {
          const cardElements = gsap.utils.toArray('.stack-card')
          const progressFill = document.querySelector('.progress-fill')
          const stage = document.querySelector('.stacked-stage')

          gsap.set(cardElements, {
            yPercent: index => index * 8,
            scale: index => 1 - index * 0.05,
            rotate: index => index * -2,
            transformOrigin: '50% 100%',
          })

          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: stage,
              start: 'top top',
              end: '+=220%',
              pin: true,
              scrub: true,
              anticipatePin: 1,
            },
          })

          timeline
            .to(cardElements[0], { yPercent: -18, scale: 0.88, rotate: -5 }, 0)
            .to(cardElements[1], { yPercent: 0, scale: 1, rotate: 0 }, 0)
            .to(cardElements[2], { yPercent: 16, scale: 0.92, rotate: -3 }, 0)
            .to(cardElements[1], { yPercent: -16, scale: 0.9, rotate: -4 }, 1)
            .to(cardElements[2], { yPercent: 0, scale: 1, rotate: 0 }, 1)
            .to(progressFill, { scaleX: 1, ease: 'none' }, 0)

          gsap.from('.stage-copy > *', {
            opacity: 0,
            y: 32,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.stacked-hero',
              start: 'bottom 70%',
            },
          })
        }, rootRef)

        return () => context.revert()
      }, [])

      return (
        <main ref={rootRef} className="stacked-showcase">
          <section className="stacked-hero">
            <p className="eyebrow">ScrollTrigger / Timeline</p>
            <h1>
              STACKED
              <br />
              SHOWCASE
            </h1>
            <p className="lead">
              複数カードを積層しながら、スクロールに合わせて主役を切り替えていく構成です。
            </p>
          </section>

          <section className="stacked-stage">
            <div className="stage-copy">
              <span className="stage-kicker">Feature Panels</span>
              <h2>縦スクロールの移動量を、そのまま視線誘導に変える</h2>
            </div>

            <div className="stacked-cards">
              {cards.map(card => (
                <article key={card.index} className={`stack-card ${card.className}`}>
                  <span className="card-index">{card.index}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>

            <div className="progress-rail" aria-hidden="true">
              <span className="progress-fill" />
            </div>
          </section>

          <section className="stacked-outro">
            <p>
              ScrollTrigger の pin と scrub を組み合わせると、セクション遷移そのものを演出にできます。
            </p>
          </section>
        </main>
      )
    }
  css: |
    :root {
      color-scheme: dark;
      --bg: #06131f;
      --panel: rgba(9, 18, 32, 0.76);
      --line: rgba(148, 163, 184, 0.22);
      --text: #e5eef8;
      --muted: rgba(226, 232, 240, 0.72);
      --accent: #67e8f9;
      --accent-strong: #22d3ee;
    }

    body {
      background:
        radial-gradient(circle at top, rgba(34, 211, 238, 0.14), transparent 26%),
        linear-gradient(180deg, #020617 0%, #06131f 100%);
      color: var(--text);
    }

    .stacked-showcase {
      min-height: 260vh;
    }

    .stacked-hero,
    .stacked-outro {
      display: grid;
      place-items: center;
      min-height: 100vh;
      padding: 8vw;
      text-align: center;
    }

    .stacked-hero h1 {
      margin: 0.4rem 0 0;
      font-size: clamp(3rem, 10vw, 8rem);
      line-height: 0.88;
      letter-spacing: -0.08em;
    }

    .eyebrow,
    .stage-kicker {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.78rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: rgba(165, 243, 252, 0.78);
    }

    .lead,
    .stacked-outro p {
      max-width: 42rem;
      margin: 1.3rem auto 0;
      color: var(--muted);
      line-height: 1.8;
      font-size: clamp(1rem, 2vw, 1.18rem);
    }

    .stacked-stage {
      position: relative;
      min-height: 100vh;
      padding: 8vh 7vw;
      display: grid;
      align-items: center;
      grid-template-columns: minmax(260px, 0.9fr) minmax(320px, 1.1fr);
      gap: 3rem;
    }

    .stage-copy h2 {
      margin-top: 1rem;
      font-size: clamp(2rem, 4.8vw, 4.5rem);
      line-height: 0.98;
      letter-spacing: -0.05em;
    }

    .stacked-cards {
      position: relative;
      min-height: 520px;
    }

    .stack-card {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 2rem;
      border: 1px solid var(--line);
      border-radius: 32px;
      overflow: hidden;
      backdrop-filter: blur(14px);
      box-shadow: 0 24px 80px rgba(2, 6, 23, 0.36);
      transform-origin: 50% 100%;
    }

    .stack-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(148, 163, 184, 0.02), rgba(15, 23, 42, 0.5));
    }

    .card-a {
      background: linear-gradient(160deg, rgba(14, 116, 144, 0.56), rgba(8, 47, 73, 0.9));
    }

    .card-b {
      background: linear-gradient(160deg, rgba(22, 78, 99, 0.6), rgba(17, 24, 39, 0.92));
    }

    .card-c {
      background: linear-gradient(160deg, rgba(226, 232, 240, 0.96), rgba(191, 219, 254, 0.92));
      color: #082032;
    }

    .card-index,
    .stack-card h3,
    .stack-card p {
      position: relative;
      z-index: 1;
    }

    .card-index {
      font-size: 0.8rem;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      opacity: 0.8;
    }

    .stack-card h3 {
      margin-top: 0.8rem;
      font-size: clamp(2rem, 4vw, 3rem);
      line-height: 1;
    }

    .stack-card p {
      max-width: 24rem;
      margin-top: 0.9rem;
      line-height: 1.75;
    }

    .progress-rail {
      position: absolute;
      left: 7vw;
      right: 7vw;
      bottom: 7vh;
      height: 2px;
      background: rgba(148, 163, 184, 0.18);
      overflow: hidden;
    }

    .progress-fill {
      display: block;
      width: 100%;
      height: 100%;
      transform-origin: 0% 50%;
      transform: scaleX(0);
      background: linear-gradient(90deg, var(--accent), var(--accent-strong));
    }

    @media (max-width: 900px) {
      .stacked-stage {
        grid-template-columns: 1fr;
      }

      .stacked-cards {
        min-height: 420px;
      }

      .progress-rail {
        position: static;
        margin-top: 1rem;
      }
    }
---

## はじめに

自分用メモ。

カードの切り替えは単発の `to()` を並べるより、やはり `timeline` で持った方が調整しやすい。3枚をひとつの流れとして扱い、進行バーまで同期させる構成として覚えておく。

## 組み合わせのポイント

- カードの積層感、固定スクロール、進行バーを同じ流れの中で見せる
- 手前と奥のカードで `scale` と `yPercent` に差をつけて、入れ替わりを明確にする
- pin 区間を使って読ませる時間を確保し、普通の縦スクロールとの差を作る
- 進行バーを同じ timeline に載せて、状態変化の目印を揃える

## 実装のポイント

- スクロール全体は `ScrollTrigger` を付けた `timeline` で制御する
- 各カードは `yPercent` と `scale` を中心に動かし、レイアウトの再計算を増やさない
- `pin` と `scrub` で、読ませたい区間を一度止めてから段階的に切り替える
- 進捗表示も同じタイムラインに載せて、状態の同期を崩さない

## 使いどころ

使いどころのメモとしては、機能紹介やフロー可視化みたいに順番で見せたい場面向け。カード枚数を増やすときも、同じタイムラインに区間を足す前提で考える。
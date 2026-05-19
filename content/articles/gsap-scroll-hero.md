---
title: GSAPで作るスクロール連動ヒーローアニメーション
description: GSAPとScrollTriggerを使って、スクロールに合わせてダイナミックに動き出すヒーロー表現を実装します。
category: スクロール連動
tags:
  - GSAP
  - ScrollTrigger
  - アニメーション
date: 2026年5月19日
publishedAt: 2026-05-19
readTime: 7分
viewer: playground
thumbnail: runtime
layout: tutorial
files:
  - name: Hero.jsx
    language: jsx
    content: |
      function Hero() {
        const rootRef = React.useRef(null)
        const frameRef = React.useRef(null)
        const titleRef = React.useRef(null)
        const leadRef = React.useRef(null)
        const glowRef = React.useRef(null)

        React.useEffect(() => {
          gsap.registerPlugin(ScrollTrigger)

          const ctx = gsap.context(() => {
            gsap.set([titleRef.current, leadRef.current], { transformOrigin: '50% 50%' })

            gsap.timeline({
              scrollTrigger: {
                trigger: rootRef.current,
                start: 'top top',
                end: '+=160%',
                scrub: true,
                pin: frameRef.current,
                anticipatePin: 1,
              },
            })
              .to(titleRef.current, {
                yPercent: -110,
                scale: 0.72,
                opacity: 0.18,
                ease: 'none',
              }, 0)
              .to(leadRef.current, {
                yPercent: -70,
                opacity: 0,
                ease: 'none',
              }, 0)
              .to(glowRef.current, {
                scale: 1.8,
                opacity: 0.15,
                ease: 'none',
              }, 0)
          }, rootRef)

          return () => ctx.revert()
        }, [])

        return (
          <div className="scroll-hero-page" ref={rootRef}>
            <section className="hero-frame" ref={frameRef}>
              <div className="hero-glow" ref={glowRef} />
              <div className="hero-grid" />
              <div className="hero-copy">
                <p className="hero-eyebrow">GSAP ScrollTrigger</p>
                <h1 className="hero-title" ref={titleRef}>その先の、体験へ。</h1>
                <p className="hero-subtitle" ref={leadRef}>
                  スクロールに合わせて、コピーと背景のレイヤーがゆっくりほどけていく。
                </p>
              </div>
            </section>

            <section className="hero-panel hero-panel-dark">
              <p>スクロールすると、ヒーローをピン留めしたままタイトルが上へ抜けていきます。</p>
            </section>

            <section className="hero-panel hero-panel-light">
              <p>見出し、リード、背景のグローを別々に動かして、奥行きのある導入にしています。</p>
            </section>
          </div>
        )
      }
  - name: hero.css
    language: css
    content: |
      :root {
        color-scheme: dark;
      }

      body {
        background: #07111f;
        color: #f4f7fb;
      }

      .scroll-hero-page {
        min-height: 240vh;
        background:
          radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 32%),
          linear-gradient(180deg, #040814 0%, #07111f 54%, #f4efe8 54%, #f4efe8 100%);
      }

      .hero-frame {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        min-height: 100vh;
        overflow: hidden;
        padding: 12vh 7vw;
        text-align: center;
      }

      .hero-grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
        background-size: 42px 42px;
        mask-image: radial-gradient(circle at center, black 22%, transparent 78%);
      }

      .hero-glow {
        position: absolute;
        width: 46vw;
        height: 46vw;
        border-radius: 999px;
        background: radial-gradient(circle, rgba(125, 211, 252, 0.85) 0%, rgba(59, 130, 246, 0.18) 42%, transparent 72%);
        filter: blur(12px);
      }

      .hero-copy {
        position: relative;
        max-width: 860px;
        z-index: 1;
      }

      .hero-eyebrow {
        margin-bottom: 1rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: rgba(191, 219, 254, 0.72);
        font-size: 0.8rem;
      }

      .hero-title {
        font-size: clamp(3rem, 9vw, 6.8rem);
        line-height: 0.95;
        letter-spacing: -0.05em;
        font-weight: 800;
        margin: 0;
        text-wrap: balance;
      }

      .hero-subtitle {
        margin: 1.5rem auto 0;
        max-width: 36rem;
        font-size: clamp(1rem, 2vw, 1.3rem);
        line-height: 1.8;
        color: rgba(226, 232, 240, 0.8);
      }

      .hero-panel {
        display: grid;
        place-items: center;
        min-height: 70vh;
        padding: 8vw;
      }

      .hero-panel p {
        max-width: 38rem;
        font-size: clamp(1.2rem, 3vw, 2.2rem);
        line-height: 1.5;
      }

      .hero-panel-dark {
        color: rgba(226, 232, 240, 0.82);
      }

      .hero-panel-light {
        color: #0f172a;
      }
code:
  jsx: |
    function Hero() {
      const rootRef = React.useRef(null)
      const frameRef = React.useRef(null)
      const titleRef = React.useRef(null)
      const leadRef = React.useRef(null)
      const glowRef = React.useRef(null)

      React.useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
          gsap.set([titleRef.current, leadRef.current], { transformOrigin: '50% 50%' })

          gsap.timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: '+=160%',
              scrub: true,
              pin: frameRef.current,
              anticipatePin: 1,
            },
          })
            .to(titleRef.current, {
              yPercent: -110,
              scale: 0.72,
              opacity: 0.18,
              ease: 'none',
            }, 0)
            .to(leadRef.current, {
              yPercent: -70,
              opacity: 0,
              ease: 'none',
            }, 0)
            .to(glowRef.current, {
              scale: 1.8,
              opacity: 0.15,
              ease: 'none',
            }, 0)
        }, rootRef)

        return () => ctx.revert()
      }, [])

      return (
        <div className="scroll-hero-page" ref={rootRef}>
          <section className="hero-frame" ref={frameRef}>
            <div className="hero-glow" ref={glowRef} />
            <div className="hero-grid" />
            <div className="hero-copy">
              <p className="hero-eyebrow">GSAP ScrollTrigger</p>
              <h1 className="hero-title" ref={titleRef}>その先の、体験へ。</h1>
              <p className="hero-subtitle" ref={leadRef}>
                スクロールに合わせて、コピーと背景のレイヤーがゆっくりほどけていく。
              </p>
            </div>
          </section>

          <section className="hero-panel hero-panel-dark">
            <p>スクロールすると、ヒーローをピン留めしたままタイトルが上へ抜けていきます。</p>
          </section>

          <section className="hero-panel hero-panel-light">
            <p>見出し、リード、背景のグローを別々に動かして、奥行きのある導入にしています。</p>
          </section>
        </div>
      )
    }
  css: |
    :root {
      color-scheme: dark;
    }

    body {
      background: #07111f;
      color: #f4f7fb;
    }

    .scroll-hero-page {
      min-height: 240vh;
      background:
        radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 32%),
        linear-gradient(180deg, #040814 0%, #07111f 54%, #f4efe8 54%, #f4efe8 100%);
    }

    .hero-frame {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      min-height: 100vh;
      overflow: hidden;
      padding: 12vh 7vw;
      text-align: center;
    }

    .hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
      background-size: 42px 42px;
      mask-image: radial-gradient(circle at center, black 22%, transparent 78%);
    }

    .hero-glow {
      position: absolute;
      width: 46vw;
      height: 46vw;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(125, 211, 252, 0.85) 0%, rgba(59, 130, 246, 0.18) 42%, transparent 72%);
      filter: blur(12px);
    }

    .hero-copy {
      position: relative;
      max-width: 860px;
      z-index: 1;
    }

    .hero-eyebrow {
      margin-bottom: 1rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: rgba(191, 219, 254, 0.72);
      font-size: 0.8rem;
    }

    .hero-title {
      font-size: clamp(3rem, 9vw, 6.8rem);
      line-height: 0.95;
      letter-spacing: -0.05em;
      font-weight: 800;
      margin: 0;
      text-wrap: balance;
    }

    .hero-subtitle {
      margin: 1.5rem auto 0;
      max-width: 36rem;
      font-size: clamp(1rem, 2vw, 1.3rem);
      line-height: 1.8;
      color: rgba(226, 232, 240, 0.8);
    }

    .hero-panel {
      display: grid;
      place-items: center;
      min-height: 70vh;
      padding: 8vw;
    }

    .hero-panel p {
      max-width: 38rem;
      font-size: clamp(1.2rem, 3vw, 2.2rem);
      line-height: 1.5;
    }

    .hero-panel-dark {
      color: rgba(226, 232, 240, 0.82);
    }

    .hero-panel-light {
      color: #0f172a;
    }
---

## はじめに

Webサイトのファーストビューは、ユーザーに与える第一印象を決定づける重要な要素です。GSAP と ScrollTrigger を組み合わせることで、スクロールに連動した印象的なアニメーションを実装できます。

この記事では、実際のプロジェクトで使える実践的なコードを交えながら、ヒーローセクションのアニメーション実装方法を解説します。

## GSAP と ScrollTrigger の基本

GSAP は高性能な JavaScript アニメーションライブラリです。ScrollTrigger プラグインと組み合わせることで、スクロール位置に応じたアニメーションを簡単に実装できます。

- ファーストビューに動きを付けたい
- スクロール量に合わせて演出を制御したい
- CSS だけでは作りづらい表現を入れたい

## 実装ポイント

1. ヒーロー要素を画面中央に配置する
2. スクロール位置を監視してテキストや背景を変化させる
3. 描画負荷を上げすぎないように transform 中心でアニメーションする

## まとめ

GSAP と ScrollTrigger を使用することで、パフォーマンスを維持しながら印象的なスクロール連動アニメーションを実装できます。

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
                <p className="hero-eyebrow">テキストテキスト、、、、</p>
                <h1 className="hero-title" ref={titleRef}>JUNKBRANDING</h1>
                <p className="hero-subtitle" ref={leadRef}>
                  テキストテキスト、、、、
                </p>
              </div>
            </section>

            <section className="hero-panel hero-panel-dark">
              <p>テキストテキスト、、、、</p>
            </section>

            <section className="hero-panel hero-panel-light">
              <p>テキストテキスト、、、、</p>
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
              <p className="hero-eyebrow">テキストテキスト、、、、</p>
              <h1 className="hero-title" ref={titleRef}>JUNKBRANDING</h1>
              <p className="hero-subtitle" ref={leadRef}>
                テキストテキスト、、、、
              </p>
            </div>
          </section>

          <section className="hero-panel hero-panel-dark">
            <p>テキストテキスト、、、、</p>
          </section>

          <section className="hero-panel hero-panel-light">
            <p>テキストテキスト、、、、</p>
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

ヒーローセクションは、ページを開いた瞬間の印象に関わりやすい場所です。ただ、最初から要素をたくさん動かしすぎると読みにくくなり、演出だけが前に出やすくなります。そこで取り入れやすいのが、スクロール量に合わせて少しずつ見え方を変える方法です。

GSAP と ScrollTrigger を使うと、テキスト、背景、光のレイヤーを別々に制御しながら、全体としてひとつの流れに見せることができます。このサンプルでは、ヒーローを固定したまま見出しと背景の抜け方をずらし、ページの導入に奥行きを持たせています。

## GSAP と ScrollTrigger の基本

GSAP は複数の要素を時間差で扱いやすく、ScrollTrigger を組み合わせるとスクロール位置とアニメーションを自然に結び付けやすくなります。単純なフェードだけでなく、固定や進行に応じた変化、複数レイヤーの同期までまとめて扱えるので、この手の演出とは相性がいいです。

- ファーストビューに動きを付けたい
- スクロール量に合わせて演出を制御したい
- CSS だけでは作りづらい表現を入れたい
- 固定中の時間を使って情報を段階的に見せたい

## 実装ポイント

1. ヒーロー要素は最初にしっかり読める位置へ置き、動き出す前の状態を整える
2. 見出し、補足、背景光を同じタイミングで動かさず、少しずつ差をつけて奥行きを出す
3. スクロール量に応じた変化は transform と opacity を中心に組んで負荷を抑える
4. ピン留めの長さを取りすぎず、次のコンテンツへ気持ちよく移れる長さで止める

## まとめ

スクロール連動のヒーローは、動かす量よりも順番の設計を整える方が見え方を作りやすいです。何を先に見せて、どこで抜いて、次のセクションへどう渡すかを整理するだけでも、印象は少し変わってきます。GSAP と ScrollTrigger はその調整がしやすいので、導入の質感を整えたいときに候補にしやすい組み合わせです。

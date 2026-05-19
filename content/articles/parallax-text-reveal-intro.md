---
title: パララックスとテキストリビールを組み合わせた導入アニメーション
description: 奥行きのある背景パララックスに、見出しのテキストリビールを重ねた導入表現です。
category: パララックス系
tags:
  - GSAP
  - アニメーション
  - スクロール
  - テキスト
date: 2026年5月19日
publishedAt: 2026-05-19
readTime: 6分
viewer: playground
thumbnail: runtime
layout: tutorial
files:
  - name: IntroScene.jsx
    language: jsx
    content: |
      function IntroScene() {
        const rootRef = React.useRef(null)
        const titleRef = React.useRef(null)
        const copyRef = React.useRef(null)
        const backRef = React.useRef(null)
        const midRef = React.useRef(null)

        React.useEffect(() => {
          gsap.registerPlugin(ScrollTrigger)

          const ctx = gsap.context(() => {
            gsap.fromTo(
              titleRef.current,
              { clipPath: 'inset(0 100% 0 0)', y: 24 },
              {
                clipPath: 'inset(0 0% 0 0)',
                y: 0,
                duration: 1,
                ease: 'power3.out',
              }
            )

            gsap.fromTo(
              copyRef.current,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                ease: 'power2.out',
              }
            )

            gsap.timeline({
              scrollTrigger: {
                trigger: rootRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
              },
            })
              .to(backRef.current, { yPercent: -12, scale: 1.08, ease: 'none' }, 0)
              .to(midRef.current, { yPercent: -24, ease: 'none' }, 0)
              .to(titleRef.current, { yPercent: -18, ease: 'none' }, 0)
          }, rootRef)

          return () => ctx.revert()
        }, [])

        return (
          <div className="intro-page" ref={rootRef}>
            <section className="intro-hero">
              <div className="intro-layer intro-layer-back" ref={backRef} />
              <div className="intro-layer intro-layer-mid" ref={midRef} />
              <div className="intro-copy">
                <p className="intro-label">Parallax x Text Reveal</p>
                <h1 className="intro-title" ref={titleRef}>Depth makes the first impression.</h1>
                <p className="intro-description" ref={copyRef}>
                  背景の視差とテキストの登場タイミングを分けることで、静かなのに印象が残る導入を作れます。
                </p>
              </div>
            </section>
            <section className="intro-panel">
              <p>スクロールしながら、背景レイヤーの速度差とタイトルの抜け方を確認してください。</p>
            </section>
          </div>
        )
      }
  - name: intro.css
    language: css
    content: |
      body {
        background: #07131f;
        color: #f8fafc;
      }

      .intro-page {
        min-height: 180vh;
        background: linear-gradient(180deg, #07131f 0%, #0d1f33 60%, #dfe7ef 60%, #dfe7ef 100%);
      }

      .intro-hero {
        position: sticky;
        top: 0;
        min-height: 100vh;
        overflow: hidden;
        display: grid;
        place-items: center;
        padding: 8vw;
      }

      .intro-layer {
        position: absolute;
        inset: 0;
      }

      .intro-layer-back {
        background:
          radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.28), transparent 26%),
          radial-gradient(circle at 80% 24%, rgba(129, 140, 248, 0.24), transparent 28%),
          linear-gradient(160deg, #08111b 0%, #12273a 100%);
      }

      .intro-layer-mid {
        inset: 12% 10%;
        border-radius: 32px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
        backdrop-filter: blur(18px);
      }

      .intro-copy {
        position: relative;
        z-index: 1;
        max-width: 760px;
        text-align: center;
      }

      .intro-label {
        margin-bottom: 1rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: rgba(186, 230, 253, 0.72);
        font-size: 0.78rem;
      }

      .intro-title {
        margin: 0;
        font-size: clamp(3rem, 8vw, 6rem);
        line-height: 0.94;
        letter-spacing: -0.05em;
      }

      .intro-description {
        margin: 1.5rem auto 0;
        max-width: 34rem;
        font-size: 1.1rem;
        line-height: 1.8;
        color: rgba(226, 232, 240, 0.82);
      }

      .intro-panel {
        display: grid;
        place-items: center;
        min-height: 80vh;
        padding: 8vw;
        color: #0f172a;
      }

      .intro-panel p {
        max-width: 38rem;
        font-size: clamp(1.1rem, 2.8vw, 2rem);
        line-height: 1.6;
      }
code:
  jsx: |
    function IntroScene() {
      const rootRef = React.useRef(null)
      const titleRef = React.useRef(null)
      const copyRef = React.useRef(null)
      const backRef = React.useRef(null)
      const midRef = React.useRef(null)

      React.useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
          gsap.fromTo(
            titleRef.current,
            { clipPath: 'inset(0 100% 0 0)', y: 24 },
            {
              clipPath: 'inset(0 0% 0 0)',
              y: 0,
              duration: 1,
              ease: 'power3.out',
            }
          )

          gsap.fromTo(
            copyRef.current,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.2,
              ease: 'power2.out',
            }
          )

          gsap.timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          })
            .to(backRef.current, { yPercent: -12, scale: 1.08, ease: 'none' }, 0)
            .to(midRef.current, { yPercent: -24, ease: 'none' }, 0)
            .to(titleRef.current, { yPercent: -18, ease: 'none' }, 0)
        }, rootRef)

        return () => ctx.revert()
      }, [])

      return (
        <div className="intro-page" ref={rootRef}>
          <section className="intro-hero">
            <div className="intro-layer intro-layer-back" ref={backRef} />
            <div className="intro-layer intro-layer-mid" ref={midRef} />
            <div className="intro-copy">
              <p className="intro-label">Parallax x Text Reveal</p>
              <h1 className="intro-title" ref={titleRef}>Depth makes the first impression.</h1>
              <p className="intro-description" ref={copyRef}>
                背景の視差とテキストの登場タイミングを分けることで、静かなのに印象が残る導入を作れます。
              </p>
            </div>
          </section>
          <section className="intro-panel">
            <p>スクロールしながら、背景レイヤーの速度差とタイトルの抜け方を確認してください。</p>
          </section>
        </div>
      )
    }
  css: |
    body {
      background: #07131f;
      color: #f8fafc;
    }

    .intro-page {
      min-height: 180vh;
      background: linear-gradient(180deg, #07131f 0%, #0d1f33 60%, #dfe7ef 60%, #dfe7ef 100%);
    }

    .intro-hero {
      position: sticky;
      top: 0;
      min-height: 100vh;
      overflow: hidden;
      display: grid;
      place-items: center;
      padding: 8vw;
    }

    .intro-layer {
      position: absolute;
      inset: 0;
    }

    .intro-layer-back {
      background:
        radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.28), transparent 26%),
        radial-gradient(circle at 80% 24%, rgba(129, 140, 248, 0.24), transparent 28%),
        linear-gradient(160deg, #08111b 0%, #12273a 100%);
    }

    .intro-layer-mid {
      inset: 12% 10%;
      border-radius: 32px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
      backdrop-filter: blur(18px);
    }

    .intro-copy {
      position: relative;
      z-index: 1;
      max-width: 760px;
      text-align: center;
    }

    .intro-label {
      margin-bottom: 1rem;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: rgba(186, 230, 253, 0.72);
      font-size: 0.78rem;
    }

    .intro-title {
      margin: 0;
      font-size: clamp(3rem, 8vw, 6rem);
      line-height: 0.94;
      letter-spacing: -0.05em;
    }

    .intro-description {
      margin: 1.5rem auto 0;
      max-width: 34rem;
      font-size: 1.1rem;
      line-height: 1.8;
      color: rgba(226, 232, 240, 0.82);
    }

    .intro-panel {
      display: grid;
      place-items: center;
      min-height: 80vh;
      padding: 8vw;
      color: #0f172a;
    }

    .intro-panel p {
      max-width: 38rem;
      font-size: clamp(1.1rem, 2.8vw, 2rem);
      line-height: 1.6;
    }
---

## はじめに

背景レイヤーの視差移動とテキストリビールを組み合わせると、静かなのに深さのある導入が作れます。

## 組み合わせのポイント

- 背景はゆっくり動かす
- テキストは最初にしっかり見せる
- スクロール中はレイヤーごとに速度差を作る

## まとめ

パララックスだけでは弱い場面でも、テキストの見せ方を足すと印象を強められます。

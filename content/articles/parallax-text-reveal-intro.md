---
title: パララックスとテキストリビールを組み合わせた導入アニメーション
description: 奥行きのある背景パララックスに、見出しのテキストリビールを重ねた導入表現です。
category: パララックス系
tags:
  - GSAP
  - ScrollTrigger
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
                <p className="intro-label">テキストテキスト、、、、</p>
                <h1 className="intro-title" ref={titleRef}>JUNKBRANDING</h1>
                <p className="intro-description" ref={copyRef}>
                  テキストテキスト、、、、
                </p>
              </div>
            </section>
            <section className="intro-panel">
              <p>テキストテキスト、、、、</p>
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
              <p className="intro-label">テキストテキスト、、、、</p>
              <h1 className="intro-title" ref={titleRef}>JUNKBRANDING</h1>
              <p className="intro-description" ref={copyRef}>
                テキストテキスト、、、、
              </p>
            </div>
          </section>
          <section className="intro-panel">
            <p>テキストテキスト、、、、</p>
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

導入セクションで印象をつくりたいとき、背景だけを動かしても少し弱く見えることがあります。逆に見出しだけを大きく動かすと、今度は派手すぎて落ち着きがなくなります。そんなときは、背景と文字に別の役割を持たせるとまとまりやすくなります。

このサンプルでは、背景レイヤーはゆっくり流し、テキストは最初にしっかり見せたあとで少しずつ抜いていく構成にしています。大きな変化ではなく速度差で深さを出すので、静かなトーンのまま印象を残しやすいです。

## 組み合わせのポイント

- 背景はゆっくり動かして、ページ全体の空気感を支える役割にする
- 見出しは最初に読み切れる状態で置き、動かす前の視認性を優先する
- スクロール中は各レイヤーの速度差を小さくつけて、やりすぎない奥行きをつくる
- 補足テキストは中央にまとめて、動きの中でも読みやすさを崩さないようにする
- 明るい下層セクションへつなぐときは、色の変化も導入演出の一部として使う

## まとめ

パララックスはそれだけでも成立しますが、文字の出し方と組み合わせると導入の完成度が一段上がります。背景が空気をつくり、テキストが意味を伝える、という役割分担で考えると、落ち着いたトーンでもしっかり印象に残るセクションを作りやすくなります。

---
title: 文字分割とグラデーションを組み合わせたウェーブ見出し
description: 文字分割アニメーションとグラデーションテキストを重ねて、見出しだけで空気感を作る表現です。
category: テキスト演出系
tags:
  - テキストアニメーション
  - 文字分割アニメーション
  - グラデーションテキスト
  - テキストリビール
  - アニメーション
  - テキスト
date: 2026年5月19日
publishedAt: 2026-05-19
readTime: 5分
viewer: playground
thumbnail: runtime
layout: tutorial
files:
  - name: SplitWave.jsx
    language: jsx
    content: |
      function SplitWave() {
        const lettersRef = React.useRef([])
        const lineRef = React.useRef(null)
        const text = 'JUNKBRANDING'

        React.useEffect(() => {
          const ctx = gsap.context(() => {
            gsap.fromTo(
              lettersRef.current,
              { y: 70, rotate: 8, opacity: 0 },
              {
                y: 0,
                rotate: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.04,
                ease: 'power4.out',
              }
            )

            gsap.fromTo(
              lineRef.current,
              { scaleX: 0, transformOrigin: '0% 50%' },
              { scaleX: 1, duration: 1.1, ease: 'power3.out', delay: 0.15 }
            )

            gsap.to(lettersRef.current, {
              y: index => (index % 2 === 0 ? -6 : 6),
              duration: 2.2,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              stagger: 0.02,
              delay: 0.8,
            })
          })

          return () => ctx.revert()
        }, [])

        return (
          <section className="split-wave-stage">
            <p className="split-wave-label">Split Text + Gradient</p>
            <h1 className="split-wave-title" aria-label={text}>
              {text.split('').map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  ref={element => {
                    lettersRef.current[index] = element
                  }}
                  className="split-wave-letter"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
            <div ref={lineRef} className="split-wave-line" />
            <p className="split-wave-copy">文字が順番に立ち上がったあと、少しだけ揺れを残して表情をつけています。</p>
          </section>
        )
      }
  - name: split-wave.css
    language: css
    content: |
      body {
        display: grid;
        place-items: center;
        min-height: 100vh;
        background: radial-gradient(circle at top, rgba(14, 165, 233, 0.14), transparent 30%), #08101d;
        color: white;
      }

      .split-wave-stage {
        width: min(960px, calc(100vw - 3rem));
        text-align: center;
      }

      .split-wave-label {
        margin-bottom: 1rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: rgba(186, 230, 253, 0.76);
        font-size: 0.78rem;
      }

      .split-wave-title {
        margin: 0;
        font-size: clamp(2.8rem, 7vw, 5.8rem);
        line-height: 0.92;
        letter-spacing: -0.06em;
      }

      .split-wave-letter {
        display: inline-block;
        background: linear-gradient(135deg, #f9fafb 0%, #7dd3fc 40%, #c084fc 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .split-wave-line {
        width: min(420px, 68vw);
        height: 1px;
        margin: 1.6rem auto 0;
        background: linear-gradient(90deg, transparent, rgba(125, 211, 252, 0.9), transparent);
      }

      .split-wave-copy {
        margin: 1.4rem auto 0;
        max-width: 34rem;
        line-height: 1.8;
        color: rgba(226, 232, 240, 0.8);
      }
code:
  jsx: |
    function SplitWave() {
      const lettersRef = React.useRef([])
      const lineRef = React.useRef(null)
      const text = 'JUNKBRANDING'

      React.useEffect(() => {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            lettersRef.current,
            { y: 70, rotate: 8, opacity: 0 },
            {
              y: 0,
              rotate: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.04,
              ease: 'power4.out',
            }
          )

          gsap.fromTo(
            lineRef.current,
            { scaleX: 0, transformOrigin: '0% 50%' },
            { scaleX: 1, duration: 1.1, ease: 'power3.out', delay: 0.15 }
          )

          gsap.to(lettersRef.current, {
            y: index => (index % 2 === 0 ? -6 : 6),
            duration: 2.2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            stagger: 0.02,
            delay: 0.8,
          })
        })

        return () => ctx.revert()
      }, [])

      return (
        <section className="split-wave-stage">
          <p className="split-wave-label">Split Text + Gradient</p>
          <h1 className="split-wave-title" aria-label={text}>
            {text.split('').map((char, index) => (
              <span
                key={`${char}-${index}`}
                ref={element => {
                  lettersRef.current[index] = element
                }}
                className="split-wave-letter"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          <div ref={lineRef} className="split-wave-line" />
          <p className="split-wave-copy">文字が順番に立ち上がったあと、少しだけ揺れを残して表情をつけています。</p>
        </section>
      )
    }
  css: |
    body {
      display: grid;
      place-items: center;
      min-height: 100vh;
      background: radial-gradient(circle at top, rgba(14, 165, 233, 0.14), transparent 30%), #08101d;
      color: white;
    }

    .split-wave-stage {
      width: min(960px, calc(100vw - 3rem));
      text-align: center;
    }

    .split-wave-label {
      margin-bottom: 1rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: rgba(186, 230, 253, 0.76);
      font-size: 0.78rem;
    }

    .split-wave-title {
      margin: 0;
      font-size: clamp(2.8rem, 7vw, 5.8rem);
      line-height: 0.92;
      letter-spacing: -0.06em;
    }

    .split-wave-letter {
      display: inline-block;
      background: linear-gradient(135deg, #f9fafb 0%, #7dd3fc 40%, #c084fc 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .split-wave-line {
      width: min(420px, 68vw);
      height: 1px;
      margin: 1.6rem auto 0;
      background: linear-gradient(90deg, transparent, rgba(125, 211, 252, 0.9), transparent);
    }

    .split-wave-copy {
      margin: 1.4rem auto 0;
      max-width: 34rem;
      line-height: 1.8;
      color: rgba(226, 232, 240, 0.8);
    }
---

## はじめに

文字単位の登場アニメーションにグラデーションと緩い揺れを足すと、見出しだけで空気感を作れます。

## 組み合わせのポイント

- 最初は分割文字を順番に見せる
- 線の出現で読点の代わりになるリズムを作る
- 最後に小さなウェーブだけ残して静止しすぎないようにする

## まとめ

テキスト演出は派手さより、登場と残像の設計で印象が変わります。

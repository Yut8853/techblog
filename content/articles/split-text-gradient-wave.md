---
title: 文字分割とグラデーションを組み合わせたウェーブ見出し
description: 文字分割アニメーションとグラデーションテキストを重ねて、見出しだけで空気感を作る表現です。
category: テキスト演出系
tags:
  - GSAP
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
            <p className="split-wave-label">テキストテキスト、、、、</p>
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
            <p className="split-wave-copy">テキストテキスト、、、、</p>
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
          <p className="split-wave-label">テキストテキスト、、、、</p>
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
          <p className="split-wave-copy">テキストテキスト、、、、</p>
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

自分用メモ。

見出しは長く動かすより、最初の一瞬で印象を残す方が使いやすい。特に文量が少ない場面では、文字の出方だけで空気が決まりやすい。

このサンプルでは、順番に立ち上げたあとで弱いウェーブを残している。登場だけで終わらせず、でも騒がしくしない余韻として覚えておく。

## 組み合わせのポイント

- 最初は文字ごとに順番をつけて、読み始めるリズムをつくる
- グラデーションは派手さより面の流れを見せるために使う
- 下線の出現を区切りとして入れ、見出しのまとまりを支える
- 最後のウェーブは小さく保ち、常に動いている感じを出しすぎない
- 文字数が多い場合は、分割数に対してアニメーション速度を少し抑える

## 実装のポイント

- テキストは文字ごとに分割して、初期表示のスタッガーを細かく調整できるようにする
- グラデーションや下線は本文とは別レイヤーで持ち、演出の役割を分離する
- ウェーブは常時ループでも振れ幅を小さくし、静止に近い余韻として扱う
- 文字数が増えたときに破綻しやすいので、速度と stagger のバランスを先に見る

## まとめ

覚えておくのは、テキスト演出は強いエフェクトより順番と止まり方。立ち上がりと余韻の 2 つで十分調整できる。

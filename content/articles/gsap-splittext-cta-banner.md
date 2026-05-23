---
title: SplitText CTA Banner
description: SplitText と timeline を使って、見出しとボタンを一体で見せるヒーローバナー演出です。
category: テキスト演出系
tags:
  - GSAP
  - JavaScript
  - CSS
  - テキスト
  - UI
  - アニメーション
date: 2026年5月21日
publishedAt: 2026-05-20
readTime: 5分
viewer: playground
thumbnail: runtime
layout: tutorial
files:
  - name: Component.jsx
    language: jsx
    content: |
      function SplitTextCtaBanner() {
        const rootRef = React.useRef(null)
        const titleRef = React.useRef(null)

        React.useEffect(() => {
          gsap.registerPlugin(SplitText)

          const context = gsap.context(() => {
            const split = SplitText.create(titleRef.current, {
              type: 'lines,words',
              linesClass: 'line',
              wordsClass: 'word',
            })

            const timeline = gsap.timeline({
              defaults: {
                duration: 0.9,
                ease: 'power3.out',
              },
            })

            timeline
              .from('.banner-shell', {
                opacity: 0,
                y: 40,
                scale: 0.96,
              })
              .from(
                split.lines,
                {
                  yPercent: 110,
                  stagger: 0.12,
                },
                '-=0.45'
              )
              .from(
                '.banner-copy',
                {
                  opacity: 0,
                  y: 28,
                },
                '-=0.45'
              )
              .from(
                '.banner-actions a',
                {
                  opacity: 0,
                  y: 24,
                  stagger: 0.1,
                },
                '-=0.35'
              )
              .from(
                '.orbit',
                {
                  scale: 0.7,
                  opacity: 0,
                  stagger: 0.08,
                },
                '-=0.6'
              )

            gsap.to('.orbit-a', {
              rotate: 360,
              duration: 22,
              ease: 'none',
              repeat: -1,
            })

            gsap.to('.orbit-b', {
              rotate: -360,
              duration: 18,
              ease: 'none',
              repeat: -1,
            })

            gsap.to('.orbit-c', {
              scale: 1.08,
              opacity: 0.45,
              duration: 2.8,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            })

            return () => split.revert()
          }, rootRef)

          return () => context.revert()
        }, [])

        return (
          <section ref={rootRef} className="banner-shell">
            <div className="banner-noise" />
            <div className="banner-inner">
              <p className="banner-kicker">SplitText / Timeline</p>
              <h1 ref={titleRef} className="banner-title">MAKE MOTION FEEL EDITORIAL</h1>
              <p className="banner-copy">
                見出し、本文、CTA を別々に動かすのではなく、ひとつの流れとして設計したバナーです。
              </p>

              <div className="banner-actions">
                <a className="primary-action" href="#">Start a Project</a>
                <a className="secondary-action" href="#">See Archive</a>
              </div>

              <div className="banner-orbits" aria-hidden="true">
                <span className="orbit orbit-a"></span>
                <span className="orbit orbit-b"></span>
                <span className="orbit orbit-c"></span>
              </div>
            </div>
          </section>
        )
      }
  - name: styles.css
    language: css
    content: |
      :root {
        color-scheme: dark;
        --bg: #09090b;
        --surface: rgba(24, 24, 27, 0.7);
        --line: rgba(244, 244, 245, 0.12);
        --text: #fafafa;
        --muted: rgba(228, 228, 231, 0.72);
        --gold: #facc15;
      }

      body {
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 24px;
        background:
          radial-gradient(circle at 20% 20%, rgba(250, 204, 21, 0.16), transparent 24%),
          radial-gradient(circle at 80% 30%, rgba(244, 114, 182, 0.12), transparent 26%),
          linear-gradient(160deg, #09090b 0%, #111827 100%);
        color: var(--text);
      }

      .banner-shell {
        position: relative;
        width: min(1080px, 100%);
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 36px;
        background: linear-gradient(180deg, rgba(24, 24, 27, 0.86), rgba(9, 9, 11, 0.72));
        box-shadow: 0 28px 120px rgba(0, 0, 0, 0.38);
      }

      .banner-noise {
        position: absolute;
        inset: 0;
        opacity: 0.18;
        background-image:
          linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
        background-size: 24px 24px;
        mask-image: radial-gradient(circle at center, black, transparent 80%);
      }

      .banner-inner {
        position: relative;
        padding: clamp(2rem, 6vw, 5rem);
        min-height: 560px;
      }

      .banner-kicker {
        font-size: 0.78rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: rgba(254, 240, 138, 0.78);
      }

      .banner-title {
        max-width: 10ch;
        margin-top: 1rem;
        font-size: clamp(3rem, 8vw, 7rem);
        line-height: 0.9;
        letter-spacing: -0.08em;
      }

      .banner-title .line {
        display: block;
        overflow: hidden;
      }

      .banner-title .word {
        display: inline-block;
        background: linear-gradient(180deg, #fff7cc 0%, #ffffff 38%, #d4d4d8 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .banner-copy {
        max-width: 34rem;
        margin-top: 1.4rem;
        color: var(--muted);
        line-height: 1.8;
        font-size: clamp(1rem, 2vw, 1.1rem);
      }

      .banner-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 2rem;
      }

      .banner-actions a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 180px;
        min-height: 54px;
        padding: 0 1.25rem;
        border-radius: 999px;
        text-decoration: none;
        font-weight: 600;
      }

      .primary-action {
        background: #f4f4f5;
        color: #09090b;
      }

      .secondary-action {
        border: 1px solid rgba(244, 244, 245, 0.18);
        color: var(--text);
        background: rgba(24, 24, 27, 0.48);
      }

      .banner-orbits {
        position: absolute;
        inset: auto -60px -90px auto;
        width: 360px;
        height: 360px;
      }

      .orbit {
        position: absolute;
        border-radius: 999px;
        border: 1px solid rgba(244, 244, 245, 0.14);
      }

      .orbit-a {
        inset: 0;
      }

      .orbit-b {
        inset: 48px;
      }

      .orbit-c {
        inset: 96px;
        background: radial-gradient(circle, rgba(250, 204, 21, 0.22), transparent 70%);
      }

      @media (max-width: 720px) {
        .banner-inner {
          min-height: 520px;
        }

        .banner-orbits {
          right: -120px;
          bottom: -140px;
          transform: scale(0.82);
        }
      }
code:
  jsx: |
    function SplitTextCtaBanner() {
      const rootRef = React.useRef(null)
      const titleRef = React.useRef(null)

      React.useEffect(() => {
        gsap.registerPlugin(SplitText)

        const context = gsap.context(() => {
          const split = SplitText.create(titleRef.current, {
            type: 'lines,words',
            linesClass: 'line',
            wordsClass: 'word',
          })

          const timeline = gsap.timeline({
            defaults: {
              duration: 0.9,
              ease: 'power3.out',
            },
          })

          timeline
            .from('.banner-shell', {
              opacity: 0,
              y: 40,
              scale: 0.96,
            })
            .from(
              split.lines,
              {
                yPercent: 110,
                stagger: 0.12,
              },
              '-=0.45'
            )
            .from(
              '.banner-copy',
              {
                opacity: 0,
                y: 28,
              },
              '-=0.45'
            )
            .from(
              '.banner-actions a',
              {
                opacity: 0,
                y: 24,
                stagger: 0.1,
              },
              '-=0.35'
            )
            .from(
              '.orbit',
              {
                scale: 0.7,
                opacity: 0,
                stagger: 0.08,
              },
              '-=0.6'
            )

          gsap.to('.orbit-a', {
            rotate: 360,
            duration: 22,
            ease: 'none',
            repeat: -1,
          })

          gsap.to('.orbit-b', {
            rotate: -360,
            duration: 18,
            ease: 'none',
            repeat: -1,
          })

          gsap.to('.orbit-c', {
            scale: 1.08,
            opacity: 0.45,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })

          return () => split.revert()
        }, rootRef)

        return () => context.revert()
      }, [])

      return (
        <section ref={rootRef} className="banner-shell">
          <div className="banner-noise" />
          <div className="banner-inner">
            <p className="banner-kicker">SplitText / Timeline</p>
            <h1 ref={titleRef} className="banner-title">MAKE MOTION FEEL EDITORIAL</h1>
            <p className="banner-copy">
              見出し、本文、CTA を別々に動かすのではなく、ひとつの流れとして設計したバナーです。
            </p>

            <div className="banner-actions">
              <a className="primary-action" href="#">Start a Project</a>
              <a className="secondary-action" href="#">See Archive</a>
            </div>

            <div className="banner-orbits" aria-hidden="true">
              <span className="orbit orbit-a"></span>
              <span className="orbit orbit-b"></span>
              <span className="orbit orbit-c"></span>
            </div>
          </div>
        </section>
      )
    }
  css: |
    :root {
      color-scheme: dark;
      --bg: #09090b;
      --surface: rgba(24, 24, 27, 0.7);
      --line: rgba(244, 244, 245, 0.12);
      --text: #fafafa;
      --muted: rgba(228, 228, 231, 0.72);
      --gold: #facc15;
    }

    body {
      display: grid;
      place-items: center;
      min-height: 100vh;
      padding: 24px;
      background:
        radial-gradient(circle at 20% 20%, rgba(250, 204, 21, 0.16), transparent 24%),
        radial-gradient(circle at 80% 30%, rgba(244, 114, 182, 0.12), transparent 26%),
        linear-gradient(160deg, #09090b 0%, #111827 100%);
      color: var(--text);
    }

    .banner-shell {
      position: relative;
      width: min(1080px, 100%);
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 36px;
      background: linear-gradient(180deg, rgba(24, 24, 27, 0.86), rgba(9, 9, 11, 0.72));
      box-shadow: 0 28px 120px rgba(0, 0, 0, 0.38);
    }

    .banner-noise {
      position: absolute;
      inset: 0;
      opacity: 0.18;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
      background-size: 24px 24px;
      mask-image: radial-gradient(circle at center, black, transparent 80%);
    }

    .banner-inner {
      position: relative;
      padding: clamp(2rem, 6vw, 5rem);
      min-height: 560px;
    }

    .banner-kicker {
      font-size: 0.78rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(254, 240, 138, 0.78);
    }

    .banner-title {
      max-width: 10ch;
      margin-top: 1rem;
      font-size: clamp(3rem, 8vw, 7rem);
      line-height: 0.9;
      letter-spacing: -0.08em;
    }

    .banner-title .line {
      display: block;
      overflow: hidden;
    }

    .banner-title .word {
      display: inline-block;
      background: linear-gradient(180deg, #fff7cc 0%, #ffffff 38%, #d4d4d8 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .banner-copy {
      max-width: 34rem;
      margin-top: 1.4rem;
      color: var(--muted);
      line-height: 1.8;
      font-size: clamp(1rem, 2vw, 1.1rem);
    }

    .banner-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 2rem;
    }

    .banner-actions a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 180px;
      min-height: 54px;
      padding: 0 1.25rem;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 600;
    }

    .primary-action {
      background: #f4f4f5;
      color: #09090b;
    }

    .secondary-action {
      border: 1px solid rgba(244, 244, 245, 0.18);
      color: var(--text);
      background: rgba(24, 24, 27, 0.48);
    }

    .banner-orbits {
      position: absolute;
      inset: auto -60px -90px auto;
      width: 360px;
      height: 360px;
    }

    .orbit {
      position: absolute;
      border-radius: 999px;
      border: 1px solid rgba(244, 244, 245, 0.14);
    }

    .orbit-a {
      inset: 0;
    }

    .orbit-b {
      inset: 48px;
    }

    .orbit-c {
      inset: 96px;
      background: radial-gradient(circle, rgba(250, 204, 21, 0.22), transparent 70%);
    }

    @media (max-width: 720px) {
      .banner-inner {
        min-height: 520px;
      }

      .banner-orbits {
        right: -120px;
        bottom: -140px;
        transform: scale(0.82);
      }
    }
---

## はじめに

自分用メモ。

このバナーは見出し単体ではなく、本文と CTA までを同じ拍で出すのが肝。順番を持つ演出はやはり `timeline` にまとめた方が崩れにくい。

## 組み合わせのポイント

- SplitText の行アニメーションを主役にして、本文と CTA は少し遅らせて追従させる
- 背景の軌道は主役のタイムラインと分離して、画面の空気だけを支える役にする
- 見出しは強く、CTA は遅らせて、視線の着地点を最後に作る
- バナー全体の立ち上がりと内部要素の順番を分けて、入りの密度を整える

## 実装のポイント

- 見出しは `SplitText` で分割し、単語よりまず行単位の見え方を整える
- 初期表示は `opacity` と `transform` を中心にし、レイアウトを崩さずに立ち上げる
- CTA は本文より少し遅らせて出し、視線の着地点を明確にする
- 背景の軌道は別 tween に分け、主役のタイムラインを汚さない

## 使いどころ

使いどころのメモとしては、短い文量でも温度感を出したい冒頭ブロック向け。文言を差し替えても成立しやすいので、型として残しておく。
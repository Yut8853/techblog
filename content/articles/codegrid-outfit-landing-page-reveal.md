---
title: Outfit Landing Reveal React
description: Codegrid風のアウトフィットLPリビールを、GSAP + Reactで安全に再構築したプリローダー演出です。
category: ページ遷移・画面切り替え系
tags:
  - GSAP
  - React
  - SplitText
  - プリローダー
  - アニメーション
  - UI
  - UX
date: 2026年6月19日
publishedAt: 2026-06-19
readTime: 7分
viewer: playground
thumbnail: runtime
layout: tutorial
files:
  - name: Component.jsx
    language: jsx
    content: |
      function CodegridOutfitLandingReveal() {
        const rootRef = React.useRef(null)
        const counterRef = React.useRef(null)

        const navItems = ['Index', 'Collection', 'Material', 'Process', 'Info']
        const footerWords = ['Permanence', 'Craftsmanship', 'Expression']

        const images = [
          'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80',
        ]

        React.useEffect(() => {
          gsap.registerPlugin(CustomEase, SplitText)

          CustomEase.create('hop', '0.8, 0, 0.2, 1')
          CustomEase.create('hop2', '0.9, 0, 0.1, 1')

          const splitInstances = []
          const splitText = (selector, type, className, mask = true) => {
            const split = SplitText.create(selector, {
              type,
              [`${type}Class`]: className,
              ...(mask && { mask: type }),
            })
            splitInstances.push(split)
            return split
          }

          const context = gsap.context(() => {
            splitText('.archive-preloader-header h1', 'chars', 'char')
            splitText('.archive-nav a', 'words', 'word')
            splitText('.archive-header h1', 'chars', 'char', false)
            splitText('.archive-hero-footer p', 'words', 'word')

            const preloaderImgInitRotations = [7.5, -2.5, -10, 12.5, -5, 5]
            gsap.set('.archive-preloader-img', {
              rotate: (index) => preloaderImgInitRotations[index],
            })

            const timeline = gsap.timeline({ delay: 0.5 })

            timeline.to('.archive-preloader-img', {
              scale: 1,
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              duration: 1,
              ease: 'hop',
              stagger: 0.2,
            })

            timeline.to(
              '.archive-preloader-header h1 .char',
              {
                y: '0%',
                duration: 1,
                ease: 'hop2',
                stagger: { each: 0.125, from: 'random' },
              },
              '0.35'
            )

            timeline.to(
              '.archive-preloader-counter p',
              {
                y: '0%',
                duration: 1,
                ease: 'hop2',
                onStart: () => {
                  const counter = { value: 0 }
                  gsap.to(counter, {
                    value: 100,
                    duration: 2,
                    delay: 0.5,
                    ease: 'power2.inOut',
                    onUpdate: () => {
                      if (!counterRef.current) return
                      counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0')
                    },
                  })
                },
              },
              '<'
            )

            timeline.to(
              '.archive-preloader-counter p',
              {
                y: '-100%',
                duration: 0.75,
                ease: 'hop2',
              },
              3.25
            )

            timeline.to(
              '.archive-preloader-header h1 .char',
              {
                y: '-100%',
                duration: 0.75,
                ease: 'hop2',
                stagger: { each: 0.125, from: 'random' },
              },
              3.25
            )

            timeline.to(
              '.archive-preloader-images .archive-preloader-img',
              {
                scale: 0,
                clipPath: 'polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)',
                duration: 1,
                ease: 'hop2',
                stagger: -0.075,
              },
              3.5
            )

            timeline.to(
              '.archive-preloader',
              {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                duration: 1,
                ease: 'hop2',
              },
              4.35
            )

            timeline.to(
              '.archive-header h1 .char',
              {
                y: '0%',
                duration: 1,
                ease: 'hop',
                stagger: { each: 0.075, from: 'random' },
              },
              4.65
            )

            timeline.to(
              '.archive-nav a .word',
              {
                y: '0%',
                duration: 1,
                ease: 'hop',
                stagger: 0.075,
              },
              4.75
            )

            timeline.to(
              '.archive-hero-footer p .word',
              {
                y: '0%',
                duration: 1,
                ease: 'hop',
                stagger: 0.075,
              },
              4.75
            )
          }, rootRef)

          return () => {
            context.revert()
            splitInstances.forEach((instance) => instance.revert())
          }
        }, [])

        return (
          <section ref={rootRef} className="archive-landing">
            <div className="archive-preloader">
              <div className="archive-preloader-images" aria-hidden="true">
                {images.map((src, index) => (
                  <div className="archive-preloader-img" key={src + index}>
                    <img src={src} alt="" />
                  </div>
                ))}
              </div>

              <div className="archive-preloader-header">
                <h1>Archive</h1>

                <div className="archive-preloader-counter">
                  <p ref={counterRef}>000</p>
                </div>
              </div>
            </div>

            <nav className="archive-nav">
              <div className="archive-nav-logo">
                <a href="#">Archive</a>
              </div>

              <div className="archive-nav-links">
                {navItems.map((item) => (
                  <a href="#" key={item}>{item}</a>
                ))}
              </div>
            </nav>

            <section className="archive-hero">
              <div className="archive-header">
                <h1>Archive</h1>
              </div>

              <div className="archive-hero-footer">
                {footerWords.map((word) => (
                  <p key={word}>{word}</p>
                ))}
              </div>
            </section>
          </section>
        )
      }
  - name: styles.css
    language: css
    content: |
      @import url('https://fonts.cdnfonts.com/css/pp-neue-montreal');

      :root {
        --base-100: #ffffff;
        --base-200: #e0e2db;
        --base-300: #141414;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        overflow: hidden;
      }

      h1,
      a,
      p {
        font-family: 'PP Neue Montreal', sans-serif;
        font-weight: 500;
        letter-spacing: -0.02em;
        line-height: 1;
        text-decoration: none;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .archive-landing {
        position: relative;
        width: 100%;
        min-height: 100svh;
      }

      .archive-preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100svh;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        background-color: var(--base-300);
        color: var(--base-100);
        will-change: clip-path;
        overflow: hidden;
        z-index: 2;
      }

      .archive-preloader-images {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .archive-preloader-img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 250px;
        height: 300px;
        transform-origin: center center;
        clip-path: polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%);
        will-change: transform, clip-path;
      }

      .archive-preloader-header {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .archive-preloader-header h1 {
        text-transform: uppercase;
        font-size: clamp(2rem, 10vw, 15rem);
        line-height: 0.85;
      }

      .archive-preloader-counter {
        position: absolute;
        top: -1.5rem;
        left: calc(100% + 1.5rem);
        overflow: hidden;
      }

      .archive-preloader-counter p {
        color: var(--base-100);
        font-size: clamp(1rem, 1.5vw, 2rem);
        line-height: 0.85;
      }

      .archive-nav {
        position: fixed;
        width: 100%;
        padding: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        z-index: 1;
      }

      .archive-nav-links {
        display: flex;
        gap: 2rem;
      }

      .archive-nav a {
        color: var(--base-300);
        line-height: 1;
      }

      .archive-hero {
        position: relative;
        width: 100%;
        height: 100svh;
        background-color: var(--base-200);
        color: var(--base-300);
        overflow: hidden;
      }

      .archive-header {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        justify-content: center;
        transform: translate(-50%, -50%);
        width: 100%;
        height: max-content;
        overflow: hidden;
      }

      .archive-header h1 {
        text-transform: uppercase;
        font-size: clamp(2.5rem, 15vw, 25rem);
        line-height: 0.85;
      }

      .archive-hero-footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }

      .char,
      .word,
      .archive-preloader-counter p {
        transform: translateY(100%);
        will-change: transform;
      }

      @media (max-width: 1000px) {
        .archive-preloader-counter {
          top: -1.5rem;
          left: calc(100% + 0.5rem);
        }

        .archive-nav-links {
          flex-direction: column;
          gap: 0;
          text-align: right;
        }
      }
code:
  jsx: |
    function CodegridOutfitLandingReveal() {
      const rootRef = React.useRef(null)
      const counterRef = React.useRef(null)

      const navItems = ['Index', 'Collection', 'Material', 'Process', 'Info']
      const footerWords = ['Permanence', 'Craftsmanship', 'Expression']

      const images = [
        'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80',
      ]

      React.useEffect(() => {
        gsap.registerPlugin(CustomEase, SplitText)

        CustomEase.create('hop', '0.8, 0, 0.2, 1')
        CustomEase.create('hop2', '0.9, 0, 0.1, 1')

        const splitInstances = []
        const splitText = (selector, type, className, mask = true) => {
          const split = SplitText.create(selector, {
            type,
            [`${type}Class`]: className,
            ...(mask && { mask: type }),
          })
          splitInstances.push(split)
          return split
        }

        const context = gsap.context(() => {
          splitText('.archive-preloader-header h1', 'chars', 'char')
          splitText('.archive-nav a', 'words', 'word')
          splitText('.archive-header h1', 'chars', 'char', false)
          splitText('.archive-hero-footer p', 'words', 'word')

          const preloaderImgInitRotations = [7.5, -2.5, -10, 12.5, -5, 5]
          gsap.set('.archive-preloader-img', {
            rotate: (index) => preloaderImgInitRotations[index],
          })

          const timeline = gsap.timeline({ delay: 0.5 })

          timeline.to('.archive-preloader-img', {
            scale: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1,
            ease: 'hop',
            stagger: 0.2,
          })

          timeline.to(
            '.archive-preloader-header h1 .char',
            {
              y: '0%',
              duration: 1,
              ease: 'hop2',
              stagger: { each: 0.125, from: 'random' },
            },
            '0.35'
          )

          timeline.to(
            '.archive-preloader-counter p',
            {
              y: '0%',
              duration: 1,
              ease: 'hop2',
              onStart: () => {
                const counter = { value: 0 }
                gsap.to(counter, {
                  value: 100,
                  duration: 2,
                  delay: 0.5,
                  ease: 'power2.inOut',
                  onUpdate: () => {
                    if (!counterRef.current) return
                    counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0')
                  },
                })
              },
            },
            '<'
          )

          timeline.to(
            '.archive-preloader-counter p',
            {
              y: '-100%',
              duration: 0.75,
              ease: 'hop2',
            },
            3.25
          )

          timeline.to(
            '.archive-preloader-header h1 .char',
            {
              y: '-100%',
              duration: 0.75,
              ease: 'hop2',
              stagger: { each: 0.125, from: 'random' },
            },
            3.25
          )

          timeline.to(
            '.archive-preloader-images .archive-preloader-img',
            {
              scale: 0,
              clipPath: 'polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)',
              duration: 1,
              ease: 'hop2',
              stagger: -0.075,
            },
            3.5
          )

          timeline.to(
            '.archive-preloader',
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
              duration: 1,
              ease: 'hop2',
            },
            4.35
          )

          timeline.to(
            '.archive-header h1 .char',
            {
              y: '0%',
              duration: 1,
              ease: 'hop',
              stagger: { each: 0.075, from: 'random' },
            },
            4.65
          )

          timeline.to(
            '.archive-nav a .word',
            {
              y: '0%',
              duration: 1,
              ease: 'hop',
              stagger: 0.075,
            },
            4.75
          )

          timeline.to(
            '.archive-hero-footer p .word',
            {
              y: '0%',
              duration: 1,
              ease: 'hop',
              stagger: 0.075,
            },
            4.75
          )
        }, rootRef)

        return () => {
          context.revert()
          splitInstances.forEach((instance) => instance.revert())
        }
      }, [])

      return (
        <section ref={rootRef} className="archive-landing">
          <div className="archive-preloader">
            <div className="archive-preloader-images" aria-hidden="true">
              {images.map((src, index) => (
                <div className="archive-preloader-img" key={src + index}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>

            <div className="archive-preloader-header">
              <h1>Archive</h1>

              <div className="archive-preloader-counter">
                <p ref={counterRef}>000</p>
              </div>
            </div>
          </div>

          <nav className="archive-nav">
            <div className="archive-nav-logo">
              <a href="#">Archive</a>
            </div>

            <div className="archive-nav-links">
              {navItems.map((item) => (
                <a href="#" key={item}>{item}</a>
              ))}
            </div>
          </nav>

          <section className="archive-hero">
            <div className="archive-header">
              <h1>Archive</h1>
            </div>

            <div className="archive-hero-footer">
              {footerWords.map((word) => (
                <p key={word}>{word}</p>
              ))}
            </div>
          </section>
        </section>
      )
    }
  css: |
    @import url('https://fonts.cdnfonts.com/css/pp-neue-montreal');

    :root {
      --base-100: #ffffff;
      --base-200: #e0e2db;
      --base-300: #141414;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      overflow: hidden;
    }

    h1,
    a,
    p {
      font-family: 'PP Neue Montreal', sans-serif;
      font-weight: 500;
      letter-spacing: -0.02em;
      line-height: 1;
      text-decoration: none;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .archive-landing {
      position: relative;
      width: 100%;
      min-height: 100svh;
    }

    .archive-preloader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100svh;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      background-color: var(--base-300);
      color: var(--base-100);
      will-change: clip-path;
      overflow: hidden;
      z-index: 2;
    }

    .archive-preloader-images {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .archive-preloader-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 250px;
      height: 300px;
      transform-origin: center center;
      clip-path: polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%);
      will-change: transform, clip-path;
    }

    .archive-preloader-header {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .archive-preloader-header h1 {
      text-transform: uppercase;
      font-size: clamp(2rem, 10vw, 15rem);
      line-height: 0.85;
    }

    .archive-preloader-counter {
      position: absolute;
      top: -1.5rem;
      left: calc(100% + 1.5rem);
      overflow: hidden;
    }

    .archive-preloader-counter p {
      color: var(--base-100);
      font-size: clamp(1rem, 1.5vw, 2rem);
      line-height: 0.85;
    }

    .archive-nav {
      position: fixed;
      width: 100%;
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      z-index: 1;
    }

    .archive-nav-links {
      display: flex;
      gap: 2rem;
    }

    .archive-nav a {
      color: var(--base-300);
      line-height: 1;
    }

    .archive-hero {
      position: relative;
      width: 100%;
      height: 100svh;
      background-color: var(--base-200);
      color: var(--base-300);
      overflow: hidden;
    }

    .archive-header {
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      justify-content: center;
      transform: translate(-50%, -50%);
      width: 100%;
      height: max-content;
      overflow: hidden;
    }

    .archive-header h1 {
      text-transform: uppercase;
      font-size: clamp(2.5rem, 15vw, 25rem);
      line-height: 0.85;
    }

    .archive-hero-footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .char,
    .word,
    .archive-preloader-counter p {
      transform: translateY(100%);
      will-change: transform;
    }

    @media (max-width: 1000px) {
      .archive-preloader-counter {
        top: -1.5rem;
        left: calc(100% + 0.5rem);
      }

      .archive-nav-links {
        flex-direction: column;
        gap: 0;
        text-align: right;
      }
    }
---

## 📝 はじめに

このデモは、ファッションLPでよく使われる、
プリローダーからヒーローへ切り替える導入演出です。

複合ランディング演出記事と重複しないよう、今回は
「中央1ビジュアルの拡張」ではなく、
「画像スタック + タイポ分割 + カウンター進行」を主役にしています。

## 🎯 今回作るもの

- 主役: SplitTextで分割した文字の上下リビール
- トリガー: 初回表示
- 対象要素: プリローダー画像群、見出し文字、ナビ文字、フッターワード
- 再利用先: ブランドサイトのファーストビュー、ポートフォリオ導入、キャンペーンLP

## 🧩 コンポーネント設計

- Reactの責務: マークアップ、データ配列、ref管理
- GSAPの責務: 時間制御、stagger、counter更新、退出アニメーション
- CSSの責務: レイヤー構造、初期状態、クリップ形状、レスポンシブ調整

## 🛠️ 実装のポイント

- `gsap.context()` を使って、対象範囲をコンポーネント配下に限定
- `SplitText` のインスタンスを配列で保持して、アンマウント時に `revert()`
- カウンターはDOMを直接参照せず、`counterRef` 経由で更新
- 画像を配列レンダリングにして、静的HTMLから再利用可能なReact構成へ変更

## 🔁 カスタムしやすいパラメータ

- `preloaderImgInitRotations`: 画像ごとの初期角度
- `stagger` 値: 文字や画像の連なり速度
- `timeline` の開始オフセット: 各セクションの見せ場タイミング
- `clip-path` 形状: より直線的な開閉、または有機的なマスクへ変更可能

## ✅ まとめ

このパターンは、見た目のインパクトを保ちながら、
構造は「配列 + SplitText + timeline」に分解できるため、
実務で別ブランドに横展開しやすい導入演出です。

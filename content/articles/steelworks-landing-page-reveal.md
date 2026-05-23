---
title: Steelworks Landing Page Reveal
description: プリローダー、カード整列、中央ビジュアル拡張の流れを記事化しました。
category: ページ遷移・画面切り替え系
tags:
  - GSAP
  - CSS
  - JavaScript
  - アニメーション
  - トランジション
  - ストーリーテリング
date: 2026年5月20日
publishedAt: 2026-05-20
readTime: 8分
viewer: playground
thumbnail: runtime
layout: gallery
files:
  - name: Component.jsx
    language: jsx
    content: |
      function SteelworksLandingReveal() {
        const rootRef = React.useRef(null)
        const images = [
          '/images/steelworks-free/img-1.svg',
          '/images/steelworks-free/img-2.svg',
          '/images/steelworks-free/img-3.svg',
          '/images/steelworks-free/img-4.svg',
          '/images/steelworks-free/img-5.svg',
        ]
        const navItems = ['About', 'Work', 'Contact']

        React.useEffect(() => {
          gsap.registerPlugin(CustomEase)

          CustomEase.create('hop', '0.9, 0, 0.1, 1')
          CustomEase.create('glide', '0.8, 0, 0.2, 1')

          let isDisposed = false
          let context

          const runAnimation = () => {
            if (isDisposed || !rootRef.current) {
              return
            }

            context = gsap.context(() => {
              const introImages = gsap.utils.toArray('.intro-img')
              const introImgScale = window.innerWidth <= 768 ? 0.32 : 0.2
              const introImgGap = window.innerWidth <= 768 ? 16 : 40
              const introImgRotations = [-15, 5, -7.5, 10, -2.5]

              const introImgScaledWidth = window.innerWidth * introImgScale
              const introImgRowWidth = introImgScaledWidth * introImages.length + introImgGap * (introImages.length - 1)
              const introImgCenteredX = (window.innerWidth - introImgRowWidth) / 2
              const introImgOffScreenX = introImgCenteredX - window.innerWidth * 1.3

              introImages.forEach((img, index) => {
                const centeredX =
                  introImgCenteredX +
                  index * (introImgScaledWidth + introImgGap) +
                  introImgScaledWidth / 2 -
                  window.innerWidth / 2

                const offScreenX =
                  introImgOffScreenX +
                  index * (introImgScaledWidth + introImgGap) +
                  introImgScaledWidth / 2 -
                  window.innerWidth / 2

                gsap.set(img, {
                  scale: introImgScale,
                  x: offScreenX,
                  rotation: introImgRotations[index],
                  borderRadius: '2.5rem',
                })

                img.dataset.centeredX = String(centeredX)
              })

              const timeline = gsap.timeline({ delay: 1 })

              timeline.to('.preloader', {
                scaleX: 1,
                duration: 1.5,
                ease: 'glide',
                onComplete: () => {
                  gsap.set('.preloader', { transformOrigin: 'right' })
                },
              })

              timeline.to('.preloader', {
                scaleX: 0,
                duration: 1.25,
                ease: 'hop',
              })

              timeline.to(
                '.preloader-overlay',
                {
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                  duration: 1,
                  ease: 'hop',
                },
                '<0.75'
              )

              introImages.forEach(img => {
                timeline.to(
                  img,
                  {
                    x: parseFloat(img.dataset.centeredX || '0'),
                    duration: 1.5,
                    ease: 'glide',
                  },
                  '<0.025'
                )
              })

              timeline.to(
                '.intro-img:nth-of-type(1), .intro-img:nth-of-type(2)',
                { x: '-100vw', duration: 1.5, ease: 'glide' },
                'spread'
              )
              timeline.to(
                '.intro-img:nth-of-type(4), .intro-img:nth-of-type(5)',
                { x: '100vw', duration: 1.5, ease: 'glide' },
                'spread'
              )

              timeline.to(
                '.hero-img',
                {
                  scale: 1,
                  x: 0,
                  rotation: 0,
                  borderRadius: 0,
                  duration: 1.5,
                  ease: 'glide',
                },
                '<'
              )

              timeline.to(
                'nav a, .hero-header h1, .hero-social p, .hero-social a',
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.85,
                  stagger: 0.08,
                  ease: 'power3.out',
                },
                '<0.65'
              )
            }, rootRef)
          }

          const ready = document.fonts?.ready ?? Promise.resolve()
          ready.then(() => {
            if (!isDisposed) {
              runAnimation()
            }
          })

          return () => {
            isDisposed = true
            if (context) {
              context.revert()
            }
          }
        }, [])

        return (
          <>
            <div className="preloader-overlay">
              <div className="preloader" />
            </div>

            <div ref={rootRef}>
              <nav>
                <div className="nav-logo">
                  <a href="#">JUNK BRANDING</a>
                </div>

                <div className="nav-items">
                  {navItems.map(item => (
                    <a key={item} href="#">{item}</a>
                  ))}
                </div>
              </nav>

              <section className="hero">
                {images.map((src, index) => (
                  <div
                    key={src}
                    className={`intro-img${index === 2 ? ' hero-img' : ''}`}
                  >
                    <img src={src} alt="" />
                  </div>
                ))}

                <div className="hero-content">
                  <div className="hero-header">
                    <h1>
                      JUNKBRANDING is a highly skilled web creator based in Ibaraki. We look forward to hearing from you.
                    </h1>
                  </div>

                  <div className="hero-social">
                    <p>Say Hello</p>
                    <a href="#">hello@junkbranding.com</a>
                  </div>
                </div>
              </section>
            </div>
          </>
        )
      }
  - name: styles.css
    language: css
    content: |
      @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap");

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "DM Sans", sans-serif;
      }

      h1 {
        color: #fff;
        font-size: 3rem;
        font-weight: 400;
        letter-spacing: -1%;
        line-height: 1.1;
      }

      a,
      p {
        color: #fff;
        text-decoration: none;
        font-weight: 400;
        letter-spacing: -1%;
        display: block;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      nav {
        position: fixed;
        top: 0;
        width: 100%;
        padding: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        z-index: 2;
      }

      .nav-items {
        display: flex;
        gap: 4rem;
      }

      .preloader-overlay {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100svh;
        background-color: #0f0f0f;
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        z-index: 10;
      }

      .preloader-overlay .preloader {
        position: absolute;
        top: 0;
        width: 100%;
        height: 0.5rem;
        background-color: #fff;
        transform: scaleX(0);
        transform-origin: left;
        will-change: transform;
      }

      .hero {
        position: relative;
        width: 100%;
        height: 100svh;
        overflow: hidden;
      }

      .intro-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 0.5rem;
        transform-origin: center center;
        will-change: transform;
      }

      .hero-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100svh;
        padding: 15svh 2rem 15svh 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 2;
      }

      .hero-header {
        width: 60%;
      }

      nav a,
      .hero-header h1,
      .hero-social p,
      .hero-social a {
        opacity: 0;
        transform: translateY(40px);
      }

      @media (max-width: 1000px) {
        .nav-items {
          flex-direction: column;
          align-items: flex-end;
          gap: 0;
        }

        .hero-content {
          padding: 15svh 2rem 2rem 2rem;
        }

        .hero-header {
          width: 100%;
        }
      }
code:
  jsx: |
    function SteelworksLandingReveal() {
      const rootRef = React.useRef(null)
      const images = [
        '/images/steelworks-free/img-1.svg',
        '/images/steelworks-free/img-2.svg',
        '/images/steelworks-free/img-3.svg',
        '/images/steelworks-free/img-4.svg',
        '/images/steelworks-free/img-5.svg',
      ]
      const navItems = ['About', 'Work', 'Contact']

      React.useEffect(() => {
        gsap.registerPlugin(CustomEase)

        CustomEase.create('hop', '0.9, 0, 0.1, 1')
        CustomEase.create('glide', '0.8, 0, 0.2, 1')

        let isDisposed = false
        let context

        const runAnimation = () => {
          if (isDisposed || !rootRef.current) {
            return
          }

          context = gsap.context(() => {
            const introImages = gsap.utils.toArray('.intro-img')
            const introImgScale = window.innerWidth <= 768 ? 0.32 : 0.2
            const introImgGap = window.innerWidth <= 768 ? 16 : 40
            const introImgRotations = [-15, 5, -7.5, 10, -2.5]

            const introImgScaledWidth = window.innerWidth * introImgScale
            const introImgRowWidth = introImgScaledWidth * introImages.length + introImgGap * (introImages.length - 1)
            const introImgCenteredX = (window.innerWidth - introImgRowWidth) / 2
            const introImgOffScreenX = introImgCenteredX - window.innerWidth * 1.3

            introImages.forEach((img, index) => {
              const centeredX =
                introImgCenteredX +
                index * (introImgScaledWidth + introImgGap) +
                introImgScaledWidth / 2 -
                window.innerWidth / 2

              const offScreenX =
                introImgOffScreenX +
                index * (introImgScaledWidth + introImgGap) +
                introImgScaledWidth / 2 -
                window.innerWidth / 2

              gsap.set(img, {
                scale: introImgScale,
                x: offScreenX,
                rotation: introImgRotations[index],
                borderRadius: '2.5rem',
              })

              img.dataset.centeredX = String(centeredX)
            })

            const timeline = gsap.timeline({ delay: 1 })

            timeline.to('.preloader', {
              scaleX: 1,
              duration: 1.5,
              ease: 'glide',
              onComplete: () => {
                gsap.set('.preloader', { transformOrigin: 'right' })
              },
            })

            timeline.to('.preloader', {
              scaleX: 0,
              duration: 1.25,
              ease: 'hop',
            })

            timeline.to(
              '.preloader-overlay',
              {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                duration: 1,
                ease: 'hop',
              },
              '<0.75'
            )

            introImages.forEach(img => {
              timeline.to(
                img,
                {
                  x: parseFloat(img.dataset.centeredX || '0'),
                  duration: 1.5,
                  ease: 'glide',
                },
                '<0.025'
              )
            })

            timeline.to(
              '.intro-img:nth-of-type(1), .intro-img:nth-of-type(2)',
              { x: '-100vw', duration: 1.5, ease: 'glide' },
              'spread'
            )
            timeline.to(
              '.intro-img:nth-of-type(4), .intro-img:nth-of-type(5)',
              { x: '100vw', duration: 1.5, ease: 'glide' },
              'spread'
            )

            timeline.to(
              '.hero-img',
              {
                scale: 1,
                x: 0,
                rotation: 0,
                borderRadius: 0,
                duration: 1.5,
                ease: 'glide',
              },
              '<'
            )

            timeline.to(
              'nav a, .hero-header h1, .hero-social p, .hero-social a',
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.08,
                ease: 'power3.out',
              },
              '<0.65'
            )
          }, rootRef)
        }

        const ready = document.fonts?.ready ?? Promise.resolve()
        ready.then(() => {
          if (!isDisposed) {
            runAnimation()
          }
        })

        return () => {
          isDisposed = true
          if (context) {
            context.revert()
          }
        }
      }, [])

      return (
        <>
          <div className="preloader-overlay">
            <div className="preloader" />
          </div>

          <div ref={rootRef}>
            <nav>
              <div className="nav-logo">
                <a href="#">JUNK BRANDING</a>
              </div>

              <div className="nav-items">
                {navItems.map(item => (
                  <a key={item} href="#">{item}</a>
                ))}
              </div>
            </nav>

            <section className="hero">
              {images.map((src, index) => (
                <div
                  key={src}
                  className={`intro-img${index === 2 ? ' hero-img' : ''}`}
                >
                  <img src={src} alt="" />
                </div>
              ))}

              <div className="hero-content">
                <div className="hero-header">
                  <h1>
                    JUNKBRANDING is a highly skilled web creator based in Ibaraki. We look forward to hearing from you.
                  </h1>
                </div>

                <div className="hero-social">
                  <p>Say Hello</p>
                  <a href="#">hello@junkbranding.com</a>
                </div>
              </div>
            </section>
          </div>
        </>
      )
    }
  css: |
    @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap");

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: "DM Sans", sans-serif;
    }

    h1 {
      color: #fff;
      font-size: 3rem;
      font-weight: 400;
      letter-spacing: -1%;
      line-height: 1.1;
    }

    a,
    p {
      color: #fff;
      text-decoration: none;
      font-weight: 400;
      letter-spacing: -1%;
      display: block;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    nav {
      position: fixed;
      top: 0;
      width: 100%;
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      z-index: 2;
    }

    .nav-items {
      display: flex;
      gap: 4rem;
    }

    .preloader-overlay {
      position: fixed;
      top: 0;
      width: 100%;
      height: 100svh;
      background-color: #0f0f0f;
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
      z-index: 10;
    }

    .preloader-overlay .preloader {
      position: absolute;
      top: 0;
      width: 100%;
      height: 0.5rem;
      background-color: #fff;
      transform: scaleX(0);
      transform-origin: left;
      will-change: transform;
    }

    .hero {
      position: relative;
      width: 100%;
      height: 100svh;
      overflow: hidden;
    }

    .intro-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 0.5rem;
      transform-origin: center center;
      will-change: transform;
    }

    .hero-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100svh;
      padding: 15svh 2rem 15svh 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 2;
    }

    .hero-header {
      width: 60%;
    }

    nav a,
    .hero-header h1,
    .hero-social p,
    .hero-social a {
      opacity: 0;
      transform: translateY(40px);
    }

    @media (max-width: 1000px) {
      .nav-items {
        flex-direction: column;
        align-items: flex-end;
        gap: 0;
      }

      .hero-content {
        padding: 15svh 2rem 2rem 2rem;
      }

      .hero-header {
        width: 100%;
      }
    }
---

## はじめに

今回の自分用メモ。

このコードで見ておきたいのは、5枚の画像をただ並べることではなく、全画面の画像レイヤーをあとから「並んで見える状態」に変換している点です。最終的には中央の1枚だけを全面へ拡張して終わるので、レイアウトというよりタイムライン設計のサンプルとして覚えておく。

## 構成のポイント

- HTML は全画面レイヤーとして5枚の `.intro-img` を重ねて置く
- CSS は固定ナビゲーション、プリローダー、全面配置の土台を作る
- JavaScript は GSAP で初期位置、整列、左右退避、中央拡大を時系列で制御する

最初から横並び DOM にしていないのが重要。全画面で重ねた状態から `gsap.set()` で整列を作る方が、そのまま中央 1 枚の全面復帰までつなげやすい。

## 組み合わせのポイント

- プリローダー、整列、左右退避、中央拡大を 1 本の流れとして見せる
- 5 枚の画像は最初に束感を持たせておき、整列で秩序を作ってから崩す
- 画像演出を先に終わらせて、テキストは最後に出して焦点を守る
- 全画面レイヤーと固定ナビを重ねて、ブランド LP らしい密度を作る

## 実装のポイント

- 画像は最初から横並びにせず、全画面重ね置きから `gsap.set()` で整列位置を作る
- 到着位置と開始位置を別々に計算して、整列と退避の両方に使い回す
- 真ん中の 1 枚だけ別クラスを持たせて、最後の拡張対象を明確にする
- テキストの表示は画像タイムラインの終盤へ寄せて、視線の分散を防ぐ

## GSAP タイムラインの流れ

流れは以下の順番で整理されている。

1. プリローダーを伸ばしてから閉じる
2. 5枚の画像を画面外から中央へ集める
3. 左右4枚を外へ逃がす
4. 真ん中の `.hero-img` だけを scale `1`、rotation `0`、borderRadius `0` に戻す
5. 最後に nav とテキストを順番にフェードアップさせる

要するに、画像演出を先に終わらせてから文字を出す。この順番なら最初の視線が散りにくい。

## 画像リビールで気をつける点

- 各カードの開始位置と到着位置を別々に持っておく
- 回転角を少しずつ変えて、整列前の束感を出す
- 文字要素は最後に出して、演出の焦点を分散させない
- モバイルでは余白と画像幅がすぐ破綻するので、縮尺とギャップを早めに見直す

補足として、`introImgScale` と `introImgGap` は見た目への影響が大きい。ここがずれると整列の気持ちよさが崩れるので、画面幅ベースの計算はモバイル確認まで含めて見る。

テキストの出現タイミングも重要。行分割の手段より、いつ文字を出すかの方を優先して見る。

## まとめ

今回のコードで覚えておくことは 3 つだけ。

- 全画面レイヤーをあとから整列状態に見せる
- 左右を逃がして中央だけ残す
- テキストは最後に出して演出の焦点を守る

ブランド系 LP の最初の数秒だけ強く見せたいときの組み立てとして再利用する。

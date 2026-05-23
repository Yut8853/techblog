---
title: リップルと矢印リフトを組み合わせたCTAボタン演出
description: ホバー時のリップル拡張と矢印の持ち上がりを組み合わせて、押したくなる CTA を作る実験です。
category: ボタン・CTA系
tags:
  - GSAP
  - アニメーション
  - インタラクション
  - UI
date: 2026年5月19日
publishedAt: 2026-05-19
readTime: 4分
viewer: playground
thumbnail: runtime
layout: default
files:
  - name: CTAButton.jsx
    language: jsx
    content: |
      function CTAButton() {
        const buttonRef = React.useRef(null)
        const arrowRef = React.useRef(null)
        const rippleRef = React.useRef(null)

        const handleEnter = () => {
          gsap.timeline()
            .to(rippleRef.current, {
              scale: 1,
              opacity: 1,
              duration: 0.45,
              ease: 'power2.out',
            }, 0)
            .to(arrowRef.current, {
              x: 8,
              y: -3,
              duration: 0.35,
              ease: 'power3.out',
            }, 0)
            .to(buttonRef.current, {
              y: -4,
              duration: 0.35,
              ease: 'power3.out',
            }, 0)
        }

        const handleLeave = () => {
          gsap.timeline()
            .to(rippleRef.current, {
              scale: 0,
              opacity: 0,
              duration: 0.3,
              ease: 'power2.inOut',
            }, 0)
            .to([arrowRef.current, buttonRef.current], {
              x: 0,
              y: 0,
              duration: 0.35,
              ease: 'power3.out',
            }, 0)
        }

        return (
          <section className="cta-stage">
            <button
              ref={buttonRef}
              className="cta-button"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <span ref={rippleRef} className="cta-ripple" />
              <span className="cta-label">詳しく見る</span>
              <span ref={arrowRef} className="cta-arrow">↗</span>
            </button>
          </section>
        )
      }
  - name: cta.css
    language: css
    content: |
      body {
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: linear-gradient(180deg, #fef3c7 0%, #fff7ed 100%);
      }

      .cta-stage {
        padding: 2rem;
      }

      .cta-button {
        position: relative;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        gap: 0.9rem;
        border: 0;
        border-radius: 999px;
        padding: 1rem 1.4rem;
        background: #111827;
        color: white;
        font-size: 1rem;
        font-weight: 700;
        box-shadow: 0 18px 32px rgba(17, 24, 39, 0.18);
      }

      .cta-ripple {
        position: absolute;
        inset: -40%;
        border-radius: 999px;
        background: radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(56,189,248,0.08) 42%, transparent 70%);
        transform: scale(0);
        opacity: 0;
      }

      .cta-label,
      .cta-arrow {
        position: relative;
        z-index: 1;
      }

      .cta-arrow {
        display: inline-flex;
        width: 2rem;
        height: 2rem;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: rgba(255,255,255,0.12);
      }
code:
  jsx: |
    function CTAButton() {
      const buttonRef = React.useRef(null)
      const arrowRef = React.useRef(null)
      const rippleRef = React.useRef(null)

      const handleEnter = () => {
        gsap.timeline()
          .to(rippleRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',
          }, 0)
          .to(arrowRef.current, {
            x: 8,
            y: -3,
            duration: 0.35,
            ease: 'power3.out',
          }, 0)
          .to(buttonRef.current, {
            y: -4,
            duration: 0.35,
            ease: 'power3.out',
          }, 0)
      }

      const handleLeave = () => {
        gsap.timeline()
          .to(rippleRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          }, 0)
          .to([arrowRef.current, buttonRef.current], {
            x: 0,
            y: 0,
            duration: 0.35,
            ease: 'power3.out',
          }, 0)
      }

      return (
        <section className="cta-stage">
          <button
            ref={buttonRef}
            className="cta-button"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <span ref={rippleRef} className="cta-ripple" />
            <span className="cta-label">詳しく見る</span>
            <span ref={arrowRef} className="cta-arrow">↗</span>
          </button>
        </section>
      )
    }
  css: |
    body {
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: linear-gradient(180deg, #fef3c7 0%, #fff7ed 100%);
    }

    .cta-stage {
      padding: 2rem;
    }

    .cta-button {
      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      gap: 0.9rem;
      border: 0;
      border-radius: 999px;
      padding: 1rem 1.4rem;
      background: #111827;
      color: white;
      font-size: 1rem;
      font-weight: 700;
      box-shadow: 0 18px 32px rgba(17, 24, 39, 0.18);
    }

    .cta-ripple {
      position: absolute;
      inset: -40%;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(56,189,248,0.08) 42%, transparent 70%);
      transform: scale(0);
      opacity: 0;
    }

    .cta-label,
    .cta-arrow {
      position: relative;
      z-index: 1;
    }

    .cta-arrow {
      display: inline-flex;
      width: 2rem;
      height: 2rem;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      background: rgba(255,255,255,0.12);
    }
---

## はじめに

自分用メモ。

この CTA は大きく見せるより、反応の層を小さく重ねた方が扱いやすい。最初は静かに置いて、ホバーした瞬間だけ少し持ち上がるくらいがちょうどよさそう。

見ておきたいのは、ボタン本体、矢印、リップルを別役割で動かしている点。全部を同じテンションで動かさない方が、UI として崩れにくい。

## 組み合わせのポイント

- ボタン本体は数ピクセルだけ持ち上げて、反応したことを最初に伝える
- 矢印は本体と同時に動かさず、少し前に出すことで視線のきっかけをつくる
- リップルは面積を広げすぎず、ボタンの輪郭の中で収まるようにして品よく見せる
- 入る動きより戻る動きを少し静かにすると、ホバー解除時のバタつきが減る
- 影や背景色は演出の土台なので、アニメーションだけで目立たせようとしない

## 実装のポイント

- `buttonRef`、`arrowRef`、`rippleRef` を分けて、それぞれ別プロパティで動かす
- ホバー開始と解除を別 timeline にして、戻りのテンポを個別に調整できるようにする
- リップルは `scale` と `opacity` を中心に組み、レイアウトを動かさない
- ボタン本体と矢印は同時刻から動かしても、移動量には差をつけて役割を分ける

## まとめ

覚えておくのは、大きい一発の動きより小さい反応の積み重ねの方が CTA では使いやすいということ。読みやすさと押しやすさを崩さない範囲で足す。

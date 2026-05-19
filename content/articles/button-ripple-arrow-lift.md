---
title: リップルと矢印リフトを組み合わせたCTAボタン演出
description: ホバー時のリップル拡張と矢印の持ち上がりを組み合わせて、押したくなる CTA を作る実験です。
category: ボタン・CTA系
tags:
  - ボタンアニメーション
  - ホバーCTA
  - マグネットボタン
  - UI
  - インタラクション
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
              <span className="cta-label">Launch Campaign</span>
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
            <span className="cta-label">Launch Campaign</span>
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

CTA は少しだけ立ち上がる動きと内側の拡張を組み合わせると、押したくなる質感が出ます。

## 組み合わせのポイント

- ボタン本体は少しだけ持ち上げる
- 矢印は別レイヤーで前に出す
- リップルは広げすぎず、残しすぎない

## まとめ

ボタン演出は複雑にしすぎず、役割の違う小さな動きを足すのが安定します。
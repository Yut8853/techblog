---
title: パーティクルとグラスモーフィズムを組み合わせた背景演出
description: 背景のパーティクルアニメーションとガラス風パネルを重ねて、情報面を際立たせるビジュアル表現です。
category: 背景・ビジュアル表現系
tags:
  - 背景アニメーション
  - パーティクル
  - グラスモーフィズム
  - UI
  - アニメーション
date: 2026年5月19日
publishedAt: 2026-05-19
readTime: 5分
viewer: playground
thumbnail: runtime
layout: gallery
files:
  - name: ParticleGlass.jsx
    language: jsx
    content: |
      function ParticleGlass() {
        const particles = Array.from({ length: 14 }, (_, index) => index)

        React.useEffect(() => {
          gsap.to('.particle-dot', {
            y: index => (index % 2 === 0 ? -28 : 28),
            x: index => (index % 3 === 0 ? 14 : -14),
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.08,
          })
        }, [])

        return (
          <section className="particle-stage">
            <div className="particle-field">
              {particles.map(index => (
                <span key={index} className={`particle-dot particle-${index}`} />
              ))}
            </div>
            <div className="glass-panel">
                <p className="glass-label">テキストテキスト、、、、</p>
                <h1>JUNKBRANDING</h1>
                <p>テキストテキスト、、、、</p>
            </div>
          </section>
        )
      }
  - name: particle.css
    language: css
    content: |
      body {
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #07111f;
      }

      .particle-stage {
        position: relative;
        width: min(980px, calc(100vw - 2rem));
        min-height: 78vh;
        overflow: hidden;
        border-radius: 36px;
        background: linear-gradient(135deg, #07111f 0%, #0f172a 42%, #172554 100%);
      }

      .particle-field {
        position: absolute;
        inset: 0;
      }

      .particle-dot {
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 999px;
        background: rgba(125, 211, 252, 0.82);
        box-shadow: 0 0 20px rgba(125, 211, 252, 0.3);
      }

      .particle-0 { left: 12%; top: 18%; }
      .particle-1 { left: 22%; top: 34%; }
      .particle-2 { left: 35%; top: 24%; }
      .particle-3 { left: 46%; top: 46%; }
      .particle-4 { left: 62%; top: 21%; }
      .particle-5 { left: 74%; top: 36%; }
      .particle-6 { left: 84%; top: 18%; }
      .particle-7 { left: 18%; top: 68%; }
      .particle-8 { left: 31%; top: 72%; }
      .particle-9 { left: 48%; top: 82%; }
      .particle-10 { left: 58%; top: 64%; }
      .particle-11 { left: 72%; top: 74%; }
      .particle-12 { left: 82%; top: 58%; }
      .particle-13 { left: 66%; top: 48%; }

      .glass-panel {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: min(620px, calc(100% - 3rem));
        padding: 2rem;
        border-radius: 28px;
        background: linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.08));
        border: 1px solid rgba(255,255,255,0.16);
        backdrop-filter: blur(18px);
        color: white;
      }

      .glass-label {
        margin: 0 0 1rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        font-size: 0.78rem;
        color: rgba(191, 219, 254, 0.78);
      }

      .glass-panel h1 {
        margin: 0;
        font-size: clamp(2.8rem, 6vw, 4.8rem);
        line-height: 0.98;
        letter-spacing: -0.05em;
      }

      .glass-panel p:last-child {
        margin-top: 1.2rem;
        line-height: 1.8;
        color: rgba(226, 232, 240, 0.86);
      }
code:
  jsx: |
    function ParticleGlass() {
      const particles = Array.from({ length: 14 }, (_, index) => index)

      React.useEffect(() => {
        gsap.to('.particle-dot', {
          y: index => (index % 2 === 0 ? -28 : 28),
          x: index => (index % 3 === 0 ? 14 : -14),
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.08,
        })
      }, [])

      return (
        <section className="particle-stage">
          <div className="particle-field">
            {particles.map(index => (
              <span key={index} className={`particle-dot particle-${index}`} />
            ))}
          </div>
          <div className="glass-panel">
            <p className="glass-label">テキストテキスト、、、、</p>
            <h1>JUNKBRANDING</h1>
            <p>テキストテキスト、、、、</p>
          </div>
        </section>
      )
    }
  css: |
    body {
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #07111f;
    }

    .particle-stage {
      position: relative;
      width: min(980px, calc(100vw - 2rem));
      min-height: 78vh;
      overflow: hidden;
      border-radius: 36px;
      background: linear-gradient(135deg, #07111f 0%, #0f172a 42%, #172554 100%);
    }

    .particle-field {
      position: absolute;
      inset: 0;
    }

    .particle-dot {
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 999px;
      background: rgba(125, 211, 252, 0.82);
      box-shadow: 0 0 20px rgba(125, 211, 252, 0.3);
    }

    .particle-0 { left: 12%; top: 18%; }
    .particle-1 { left: 22%; top: 34%; }
    .particle-2 { left: 35%; top: 24%; }
    .particle-3 { left: 46%; top: 46%; }
    .particle-4 { left: 62%; top: 21%; }
    .particle-5 { left: 74%; top: 36%; }
    .particle-6 { left: 84%; top: 18%; }
    .particle-7 { left: 18%; top: 68%; }
    .particle-8 { left: 31%; top: 72%; }
    .particle-9 { left: 48%; top: 82%; }
    .particle-10 { left: 58%; top: 64%; }
    .particle-11 { left: 72%; top: 74%; }
    .particle-12 { left: 82%; top: 58%; }
    .particle-13 { left: 66%; top: 48%; }

    .glass-panel {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: min(620px, calc(100% - 3rem));
      padding: 2rem;
      border-radius: 28px;
      background: linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.08));
      border: 1px solid rgba(255,255,255,0.16);
      backdrop-filter: blur(18px);
      color: white;
    }

    .glass-label {
      margin: 0 0 1rem;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      font-size: 0.78rem;
      color: rgba(191, 219, 254, 0.78);
    }

    .glass-panel h1 {
      margin: 0;
      font-size: clamp(2.8rem, 6vw, 4.8rem);
      line-height: 0.98;
      letter-spacing: -0.05em;
    }

    .glass-panel p:last-child {
      margin-top: 1.2rem;
      line-height: 1.8;
      color: rgba(226, 232, 240, 0.86);
    }
---

## はじめに

背景は動かしつつ、読み物の本体は落ち着いて見せたいときに使いやすい組み合わせです。

## 組み合わせのポイント

- 粒子は小さく、ゆっくり漂わせる
- 情報面はガラスで固定してコントラストを作る
- 背景の色数を増やしすぎない

## まとめ

背景演出は、情報面をどれだけ静かに保つかで完成度が変わります。

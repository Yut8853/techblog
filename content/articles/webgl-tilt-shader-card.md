---
title: 3Dモーションとシェーダー風発光を組み合わせたビジュアルカード
description: 3D チルトの動きにシェーダー風の発光レイヤーを重ねて、WebGL ライクなカード表現を作る実験です。
category: 3D・WebGL寄り
tags:
  - GSAP
  - 3D
  - WebGL
  - アニメーション
  - インタラクション
date: 2026年5月19日
publishedAt: 2026-05-19
readTime: 6分
viewer: playground
thumbnail: runtime
layout: gallery
files:
  - name: ShaderCard.jsx
    language: jsx
    content: |
      function ShaderCard() {
        const cardRef = React.useRef(null)

        const handleMove = event => {
          const rect = cardRef.current.getBoundingClientRect()
          const x = event.clientX - rect.left - rect.width / 2
          const y = event.clientY - rect.top - rect.height / 2

          gsap.to(cardRef.current, {
            rotateX: -y * 0.04,
            rotateY: x * 0.04,
            duration: 0.35,
            ease: 'power2.out',
          })

          cardRef.current.style.setProperty('--glow-x', `${((x / rect.width) + 0.5) * 100}%`)
          cardRef.current.style.setProperty('--glow-y', `${((y / rect.height) + 0.5) * 100}%`)
        }

        const handleLeave = () => {
          gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power3.out',
          })
        }

        return (
          <section className="shader-stage">
            <div
              ref={cardRef}
              className="shader-card"
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >
              <div className="shader-noise" />
                <p className="shader-label">テキストテキスト、、、、</p>
                <h1>JUNKBRANDING</h1>
                <p className="shader-copy">テキストテキスト、、、、</p>
            </div>
          </section>
        )
      }
  - name: shader-card.css
    language: css
    content: |
      body {
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: radial-gradient(circle at top, rgba(56, 189, 248, 0.12), transparent 24%), #030712;
      }

      .shader-stage {
        perspective: 1200px;
      }

      .shader-card {
        --glow-x: 50%;
        --glow-y: 50%;
        position: relative;
        width: min(720px, calc(100vw - 2rem));
        min-height: 440px;
        padding: 2rem;
        border-radius: 32px;
        overflow: hidden;
        background:
          radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(56, 189, 248, 0.32), transparent 24%),
          radial-gradient(circle at 70% 20%, rgba(168, 85, 247, 0.22), transparent 28%),
          linear-gradient(160deg, #020617 0%, #111827 100%);
        border: 1px solid rgba(255,255,255,0.12);
        transform-style: preserve-3d;
        color: white;
        box-shadow: 0 30px 60px rgba(2, 6, 23, 0.5);
      }

      .shader-noise {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
        background-size: 26px 26px;
        mask-image: radial-gradient(circle at center, black 30%, transparent 90%);
      }

      .shader-label,
      .shader-card h1,
      .shader-copy {
        position: relative;
        z-index: 1;
      }

      .shader-label {
        margin: 0 0 1rem;
        letter-spacing: 0.26em;
        text-transform: uppercase;
        font-size: 0.78rem;
        color: rgba(191, 219, 254, 0.8);
      }

      .shader-card h1 {
        margin: 0;
        font-size: clamp(2.8rem, 6vw, 4.8rem);
        line-height: 0.95;
        letter-spacing: -0.05em;
      }

      .shader-copy {
        margin-top: 1.2rem;
        max-width: 32rem;
        line-height: 1.8;
        color: rgba(226, 232, 240, 0.84);
      }
code:
  jsx: |
    function ShaderCard() {
      const cardRef = React.useRef(null)

      const handleMove = event => {
        const rect = cardRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left - rect.width / 2
        const y = event.clientY - rect.top - rect.height / 2

        gsap.to(cardRef.current, {
          rotateX: -y * 0.04,
          rotateY: x * 0.04,
          duration: 0.35,
          ease: 'power2.out',
        })

        cardRef.current.style.setProperty('--glow-x', `${((x / rect.width) + 0.5) * 100}%`)
        cardRef.current.style.setProperty('--glow-y', `${((y / rect.height) + 0.5) * 100}%`)
      }

      const handleLeave = () => {
        gsap.to(cardRef.current, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power3.out',
        })
      }

      return (
        <section className="shader-stage">
          <div
            ref={cardRef}
            className="shader-card"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <div className="shader-noise" />
              <p className="shader-label">テキストテキスト、、、、</p>
              <h1>JUNKBRANDING</h1>
              <p className="shader-copy">テキストテキスト、、、、</p>
          </div>
        </section>
      )
    }
  css: |
    body {
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: radial-gradient(circle at top, rgba(56, 189, 248, 0.12), transparent 24%), #030712;
    }

    .shader-stage {
      perspective: 1200px;
    }

    .shader-card {
      --glow-x: 50%;
      --glow-y: 50%;
      position: relative;
      width: min(720px, calc(100vw - 2rem));
      min-height: 440px;
      padding: 2rem;
      border-radius: 32px;
      overflow: hidden;
      background:
        radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(56, 189, 248, 0.32), transparent 24%),
        radial-gradient(circle at 70% 20%, rgba(168, 85, 247, 0.22), transparent 28%),
        linear-gradient(160deg, #020617 0%, #111827 100%);
      border: 1px solid rgba(255,255,255,0.12);
      transform-style: preserve-3d;
      color: white;
      box-shadow: 0 30px 60px rgba(2, 6, 23, 0.5);
    }

    .shader-noise {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 26px 26px;
      mask-image: radial-gradient(circle at center, black 30%, transparent 90%);
    }

    .shader-label,
    .shader-card h1,
    .shader-copy {
      position: relative;
      z-index: 1;
    }

    .shader-label {
      margin: 0 0 1rem;
      letter-spacing: 0.26em;
      text-transform: uppercase;
      font-size: 0.78rem;
      color: rgba(191, 219, 254, 0.8);
    }

    .shader-card h1 {
      margin: 0;
      font-size: clamp(2.8rem, 6vw, 4.8rem);
      line-height: 0.95;
      letter-spacing: -0.05em;
    }

    .shader-copy {
      margin-top: 1.2rem;
      max-width: 32rem;
      line-height: 1.8;
      color: rgba(226, 232, 240, 0.84);
    }
---

## はじめに

チルトするカードはそれだけでも動きが出ますが、少し物足りなく見えることがあります。そんなときは、傾きに合わせて光の位置も一緒に変えると、表面の反応が加わって見え方に少し奥行きが出ます。

このサンプルでは、本物の WebGL を使わずに、発光とノイズの見せ方でシェーダーっぽい空気感に寄せています。UI として無理が出にくい範囲に抑えつつ、少しだけリッチに見せたいときに取り入れやすい方法です。

## 組み合わせのポイント

- 回転だけで終わらせず、光の位置も一緒に動かして面の反応を見せる
- ノイズやグリッドは主役にせず、表面情報として薄く重ねる
- チルト量は控えめにして、カードとして読める範囲を保つ
- hover 中の変化は気持ちよく、hover 解除時はすっと元に戻して操作感を軽くする
- UI で使う場合は、文字やボタンの視認性を最後まで優先する

## まとめ

WebGL 風の印象は、必ずしも本格的な描画処理がないと出せないわけではありません。面の傾き、光の追従、表面の情報量を丁寧に重ねるだけでも、それらしい質感には寄せていけます。少しリッチに見せたいけれど実装は重くしたくない場面で、検討しやすいアプローチです。

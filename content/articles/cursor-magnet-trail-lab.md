---
title: カスタムカーソルとマグネットボタンを組み合わせた追従UI
description: カスタムカーソルの追従とマグネットボタンを合わせて、触りたくなる CTA 体験を作る実験です。
category: マウス・インタラクション系
tags:
  - カスタムカーソル
  - マグネットボタン
  - ホバーアニメーション
  - インタラクション
  - UI
date: 2026年5月19日
publishedAt: 2026-05-19
readTime: 5分
viewer: playground
thumbnail: runtime
layout: default
files:
  - name: CursorMagnet.jsx
    language: jsx
    content: |
      function CursorMagnet() {
        const cursorRef = React.useRef(null)
        const buttonRef = React.useRef(null)

        React.useEffect(() => {
          const moveCursor = event => {
            gsap.to(cursorRef.current, {
              x: event.clientX,
              y: event.clientY,
              duration: 0.18,
              ease: 'power3.out',
            })
          }

          window.addEventListener('pointermove', moveCursor)
          return () => window.removeEventListener('pointermove', moveCursor)
        }, [])

        const handleMove = event => {
          const rect = buttonRef.current.getBoundingClientRect()
          const x = event.clientX - rect.left - rect.width / 2
          const y = event.clientY - rect.top - rect.height / 2

          gsap.to(buttonRef.current, {
            x: x * 0.16,
            y: y * 0.16,
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        const handleLeave = () => {
          gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 0.45,
            ease: 'power3.out',
          })
        }

        return (
          <section className="cursor-lab">
            <div ref={cursorRef} className="cursor-orb" />
            <div className="cursor-copy">
              <p className="cursor-label">テキストテキスト、、、、</p>
              <h1>JUNKBRANDING</h1>
              <p>テキストテキスト、、、、</p>
              <button
                ref={buttonRef}
                className="cursor-button"
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
              >
                詳しく見る
              </button>
            </div>
          </section>
        )
      }
  - name: cursor.css
    language: css
    content: |
      body {
        min-height: 100vh;
        background: #0a0e15;
        color: white;
        cursor: none;
      }

      .cursor-lab {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 2rem;
        background: radial-gradient(circle at center, rgba(14, 165, 233, 0.12), transparent 26%), #0a0e15;
      }

      .cursor-orb {
        position: fixed;
        left: 0;
        top: 0;
        width: 22px;
        height: 22px;
        margin-left: -11px;
        margin-top: -11px;
        border-radius: 999px;
        background: rgba(125, 211, 252, 0.85);
        box-shadow: 0 0 24px rgba(125, 211, 252, 0.5);
        pointer-events: none;
        z-index: 10;
      }

      .cursor-copy {
        max-width: 720px;
        text-align: center;
      }

      .cursor-label {
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.24em;
        color: rgba(186, 230, 253, 0.74);
        font-size: 0.8rem;
      }

      .cursor-copy h1 {
        margin: 0;
        font-size: clamp(3rem, 7vw, 5.6rem);
        line-height: 0.94;
        letter-spacing: -0.05em;
      }

      .cursor-copy p {
        margin: 1.4rem auto 0;
        max-width: 34rem;
        line-height: 1.8;
        color: rgba(226, 232, 240, 0.82);
      }

      .cursor-button {
        margin-top: 2rem;
        border: 0;
        border-radius: 999px;
        padding: 1rem 1.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
        color: #082f49;
      }
code:
  jsx: |
    function CursorMagnet() {
      const cursorRef = React.useRef(null)
      const buttonRef = React.useRef(null)

      React.useEffect(() => {
        const moveCursor = event => {
          gsap.to(cursorRef.current, {
            x: event.clientX,
            y: event.clientY,
            duration: 0.18,
            ease: 'power3.out',
          })
        }

        window.addEventListener('pointermove', moveCursor)
        return () => window.removeEventListener('pointermove', moveCursor)
      }, [])

      const handleMove = event => {
        const rect = buttonRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left - rect.width / 2
        const y = event.clientY - rect.top - rect.height / 2

        gsap.to(buttonRef.current, {
          x: x * 0.16,
          y: y * 0.16,
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      const handleLeave = () => {
        gsap.to(buttonRef.current, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: 'power3.out',
        })
      }

      return (
        <section className="cursor-lab">
          <div ref={cursorRef} className="cursor-orb" />
          <div className="cursor-copy">
            <p className="cursor-label">テキストテキスト、、、、</p>
            <h1>JUNKBRANDING</h1>
            <p>テキストテキスト、、、、</p>
            <button
              ref={buttonRef}
              className="cursor-button"
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >
              詳しく見る
            </button>
          </div>
        </section>
      )
    }
  css: |
    body {
      min-height: 100vh;
      background: #0a0e15;
      color: white;
      cursor: none;
    }

    .cursor-lab {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 2rem;
      background: radial-gradient(circle at center, rgba(14, 165, 233, 0.12), transparent 26%), #0a0e15;
    }

    .cursor-orb {
      position: fixed;
      left: 0;
      top: 0;
      width: 22px;
      height: 22px;
      margin-left: -11px;
      margin-top: -11px;
      border-radius: 999px;
      background: rgba(125, 211, 252, 0.85);
      box-shadow: 0 0 24px rgba(125, 211, 252, 0.5);
      pointer-events: none;
      z-index: 10;
    }

    .cursor-copy {
      max-width: 720px;
      text-align: center;
    }

    .cursor-label {
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.24em;
      color: rgba(186, 230, 253, 0.74);
      font-size: 0.8rem;
    }

    .cursor-copy h1 {
      margin: 0;
      font-size: clamp(3rem, 7vw, 5.6rem);
      line-height: 0.94;
      letter-spacing: -0.05em;
    }

    .cursor-copy p {
      margin: 1.4rem auto 0;
      max-width: 34rem;
      line-height: 1.8;
      color: rgba(226, 232, 240, 0.82);
    }

    .cursor-button {
      margin-top: 2rem;
      border: 0;
      border-radius: 999px;
      padding: 1rem 1.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
      color: #082f49;
    }
---

## はじめに

カーソルまわりの演出は、やりすぎると使いづらくなりますが、控えめに入れると少し触ってみたくなる空気が出ます。特に CTA のような要素では、派手さよりも「近づいたときに違和感なく反応すること」の方が見え方に効きやすいです。

このサンプルでは、遅れてついてくるカーソル表現と、近づいた分だけ少し吸い付くボタンを組み合わせています。どちらも大きくは動かさず、マウスの移動に対して少しだけ余韻が残るくらいにすると、比較的自然な触感に寄せやすいです。

## 組み合わせのポイント

- カーソルはぴったり追いかけず、わずかに遅らせて余韻をつくる
- ボタンは吸い付く量を控えめにして、意図しない操作感にならないようにする
- hover 中だけ反応を強め、離れた瞬間はすっと元に戻して切り替えを明確にする
- 戻りのイージングを柔らかくすると、実際の操作に対して違和感が出にくい
- 演出の主役はあくまでボタンなので、カーソル側を目立たせすぎない

## まとめ

マウス系の演出は、派手さよりも反応の気持ちよさを優先した方がまとまりやすいです。強く引っ張ったり大きく遅延させたりすると使いにくさが出やすいので、まずは小さな追従と小さな吸着から試して、違和感の少ないところで止めるのがよさそうです。

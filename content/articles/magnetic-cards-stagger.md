---
title: マグネットホバーとスタッガー登場を組み合わせたカードUI
description: カードの登場アニメーションに、ホバー時のマグネット挙動を組み合わせた UI 表現です。
category: カード・UIパーツ系
tags:
  - GSAP
  - UI
  - インタラクション
  - アニメーション
date: 2026年5月19日
publishedAt: 2026-05-19
readTime: 5分
viewer: playground
thumbnail: runtime
layout: default
files:
  - name: MagneticCards.jsx
    language: jsx
    content: |
      function MagneticCards() {
        const sectionRef = React.useRef(null)
        const cardsRef = React.useRef([])

        React.useEffect(() => {
          const ctx = gsap.context(() => {
            gsap.fromTo(
              cardsRef.current,
              { opacity: 0, y: 36, rotateX: -16 },
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
              }
            )
          }, sectionRef)

          return () => ctx.revert()
        }, [])

        const handleMove = (event, index) => {
          const element = cardsRef.current[index]
          if (!element) return

          const rect = element.getBoundingClientRect()
          const x = event.clientX - rect.left - rect.width / 2
          const y = event.clientY - rect.top - rect.height / 2

          gsap.to(element, {
            x: x * 0.12,
            y: y * 0.12,
            rotateX: -y * 0.03,
            rotateY: x * 0.03,
            duration: 0.35,
            ease: 'power2.out',
          })
        }

        const handleLeave = index => {
          const element = cardsRef.current[index]
          if (!element) return

          gsap.to(element, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.45,
            ease: 'power3.out',
          })
        }

        const cards = [
          { label: 'JUNKBRANDING', text: 'テキストテキスト、、、、' },
          { label: 'JUNKBRANDING', text: 'テキストテキスト、、、、' },
          { label: 'JUNKBRANDING', text: 'テキストテキスト、、、、' },
        ]

        return (
          <section className="magnetic-board" ref={sectionRef}>
            <div className="magnetic-copy">
              <p className="magnetic-label">テキストテキスト、、、、</p>
              <h1>JUNKBRANDING</h1>
            </div>
            <div className="magnetic-grid">
              {cards.map((card, index) => (
                <article
                  key={card.label}
                  ref={element => {
                    cardsRef.current[index] = element
                  }}
                  className="magnetic-card"
                  onMouseMove={event => handleMove(event, index)}
                  onMouseLeave={() => handleLeave(index)}
                >
                  <span>{card.label}</span>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>
        )
      }
  - name: cards.css
    language: css
    content: |
      body {
        background: #f6efe8;
        color: #1f2937;
      }

      .magnetic-board {
        min-height: 100vh;
        padding: 8vw;
        background:
          radial-gradient(circle at top right, rgba(249, 115, 22, 0.12), transparent 25%),
          linear-gradient(180deg, #fff8f1 0%, #f6efe8 100%);
      }

      .magnetic-copy h1 {
        margin: 0.4rem 0 0;
        font-size: clamp(2.8rem, 6vw, 4.8rem);
        line-height: 0.98;
      }

      .magnetic-label {
        font-size: 0.8rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: #b45309;
      }

      .magnetic-grid {
        display: grid;
        gap: 1.5rem;
        margin-top: 3rem;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        perspective: 1200px;
      }

      .magnetic-card {
        min-height: 280px;
        padding: 1.5rem;
        border-radius: 28px;
        background: white;
        box-shadow: 0 24px 50px rgba(15, 23, 42, 0.08);
        transform-style: preserve-3d;
        will-change: transform;
      }

      .magnetic-card span {
        display: inline-flex;
        padding: 0.35rem 0.65rem;
        border-radius: 999px;
        background: #fff1e6;
        color: #c2410c;
        font-size: 0.8rem;
        font-weight: 700;
      }

      .magnetic-card p {
        margin: 1.2rem 0 0;
        font-size: 1.1rem;
        line-height: 1.7;
      }

      @media (max-width: 900px) {
        .magnetic-grid {
          grid-template-columns: 1fr;
        }
      }
code:
  jsx: |
    function MagneticCards() {
      const sectionRef = React.useRef(null)
      const cardsRef = React.useRef([])

      React.useEffect(() => {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            cardsRef.current,
            { opacity: 0, y: 36, rotateX: -16 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
            }
          )
        }, sectionRef)

        return () => ctx.revert()
      }, [])

      const handleMove = (event, index) => {
        const element = cardsRef.current[index]
        if (!element) return

        const rect = element.getBoundingClientRect()
        const x = event.clientX - rect.left - rect.width / 2
        const y = event.clientY - rect.top - rect.height / 2

        gsap.to(element, {
          x: x * 0.12,
          y: y * 0.12,
          rotateX: -y * 0.03,
          rotateY: x * 0.03,
          duration: 0.35,
          ease: 'power2.out',
        })
      }

      const handleLeave = index => {
        const element = cardsRef.current[index]
        if (!element) return

        gsap.to(element, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.45,
          ease: 'power3.out',
        })
      }

      const cards = [
        { label: 'JUNKBRANDING', text: 'テキストテキスト、、、、' },
        { label: 'JUNKBRANDING', text: 'テキストテキスト、、、、' },
        { label: 'JUNKBRANDING', text: 'テキストテキスト、、、、' },
      ]

      return (
        <section className="magnetic-board" ref={sectionRef}>
          <div className="magnetic-copy">
            <p className="magnetic-label">テキストテキスト、、、、</p>
            <h1>JUNKBRANDING</h1>
          </div>
          <div className="magnetic-grid">
            {cards.map((card, index) => (
              <article
                key={card.label}
                ref={element => {
                  cardsRef.current[index] = element
                }}
                className="magnetic-card"
                onMouseMove={event => handleMove(event, index)}
                onMouseLeave={() => handleLeave(index)}
              >
                <span>{card.label}</span>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>
      )
    }
  css: |
    body {
      background: #f6efe8;
      color: #1f2937;
    }

    .magnetic-board {
      min-height: 100vh;
      padding: 8vw;
      background:
        radial-gradient(circle at top right, rgba(249, 115, 22, 0.12), transparent 25%),
        linear-gradient(180deg, #fff8f1 0%, #f6efe8 100%);
    }

    .magnetic-copy h1 {
      margin: 0.4rem 0 0;
      font-size: clamp(2.8rem, 6vw, 4.8rem);
      line-height: 0.98;
    }

    .magnetic-label {
      font-size: 0.8rem;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: #b45309;
    }

    .magnetic-grid {
      display: grid;
      gap: 1.5rem;
      margin-top: 3rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      perspective: 1200px;
    }

    .magnetic-card {
      min-height: 280px;
      padding: 1.5rem;
      border-radius: 28px;
      background: white;
      box-shadow: 0 24px 50px rgba(15, 23, 42, 0.08);
      transform-style: preserve-3d;
      will-change: transform;
    }

    .magnetic-card span {
      display: inline-flex;
      padding: 0.35rem 0.65rem;
      border-radius: 999px;
      background: #fff1e6;
      color: #c2410c;
      font-size: 0.8rem;
      font-weight: 700;
    }

    .magnetic-card p {
      margin: 1.2rem 0 0;
      font-size: 1.1rem;
      line-height: 1.7;
    }

    @media (max-width: 900px) {
      .magnetic-grid {
        grid-template-columns: 1fr;
      }
    }
---

## はじめに

登場アニメーションとホバーアニメーションを別の役割として設計すると、UI の印象が整います。

## 組み合わせのポイント

- 最初はスタッガーでリズムを作る
- 触れた後はマグネットで追従感を出す
- ホバー解除は素早く戻しすぎない

## まとめ

同じカードでも、登場と操作時の挙動を分けると使い心地がかなり変わります。

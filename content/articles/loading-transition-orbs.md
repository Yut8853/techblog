---
title: ローディングと画面切り替えを組み合わせたオーブ演出
description: ローディングの集約表現から、メイン画面への遷移までを一続きで見せるオーブアニメーションです。
category: ローディング系
tags:
  - GSAP
  - ローディング
  - トランジション
  - UI
date: 2026年5月19日
publishedAt: 2026-05-19
readTime: 5分
viewer: playground
thumbnail: runtime
layout: gallery
files:
  - name: OrbLoader.jsx
    language: jsx
    content: |
      function OrbLoader() {
        const [ready, setReady] = React.useState(false)
        const stageRef = React.useRef(null)
        const loaderRef = React.useRef(null)
        const panelRef = React.useRef(null)
        const orbRefs = React.useRef([])

        React.useEffect(() => {
          const ctx = gsap.context(() => {
            gsap.to(orbRefs.current, {
              y: index => (index % 2 === 0 ? -18 : 18),
              x: index => (index - 1) * 22,
              duration: 1.2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              stagger: 0.08,
            })

            gsap.delayedCall(2.2, () => {
              setReady(true)

              gsap.timeline()
                .to(loaderRef.current, {
                  opacity: 0,
                  scale: 0.9,
                  duration: 0.45,
                  ease: 'power2.inOut',
                })
                .fromTo(
                  panelRef.current,
                  { yPercent: 18, opacity: 0 },
                  { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                  '-=0.05'
                )
            })
          }, stageRef)

          return () => ctx.revert()
        }, [])

        return (
          <section className="orb-stage" ref={stageRef}>
            <div className={`orb-loader ${ready ? 'is-hidden' : ''}`} ref={loaderRef}>
              <div className="orb-cluster">
                {[0, 1, 2].map(index => (
                  <span
                    key={index}
                    ref={element => {
                      orbRefs.current[index] = element
                    }}
                    className="orb"
                  />
                ))}
              </div>
              <p>Loading the next mood...</p>
            </div>

            <div className="orb-panel" ref={panelRef}>
              <p className="orb-label">Transition x Loading</p>
              <h1>待ち時間も、世界観の一部にする。</h1>
              <p className="orb-copy">
                ローディングの粒子がまとまり、次の画面の空気感へそのまま接続されるように設計しています。
              </p>
            </div>
          </section>
        )
      }
  - name: orbs.css
    language: css
    content: |
      body {
        background: #06070b;
        color: #f8fafc;
      }

      .orb-stage {
        position: relative;
        min-height: 100vh;
        overflow: hidden;
        display: grid;
        place-items: center;
        padding: 8vw;
        background:
          radial-gradient(circle at center, rgba(14, 165, 233, 0.18), transparent 22%),
          radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.14), transparent 26%),
          #06070b;
      }

      .orb-loader,
      .orb-panel {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        text-align: center;
      }

      .orb-loader.is-hidden {
        pointer-events: none;
      }

      .orb-cluster {
        position: relative;
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .orb {
        width: 86px;
        height: 86px;
        border-radius: 999px;
        background: radial-gradient(circle at 30% 30%, #e0f2fe 0%, #38bdf8 38%, rgba(14, 165, 233, 0.18) 72%, transparent 74%);
        filter: blur(1px);
        box-shadow: 0 0 42px rgba(56, 189, 248, 0.35);
      }

      .orb-loader p {
        margin-top: 7rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(226, 232, 240, 0.7);
        font-size: 0.82rem;
      }

      .orb-panel {
        opacity: 0;
        transform: translateY(18%);
        padding: 8vw;
      }

      .orb-label {
        margin-bottom: 1rem;
        font-size: 0.8rem;
        letter-spacing: 0.26em;
        text-transform: uppercase;
        color: rgba(192, 132, 252, 0.72);
      }

      .orb-panel h1 {
        margin: 0;
        font-size: clamp(3rem, 8vw, 5.8rem);
        line-height: 0.96;
        letter-spacing: -0.05em;
      }

      .orb-copy {
        margin: 1.5rem auto 0;
        max-width: 36rem;
        font-size: 1.08rem;
        line-height: 1.8;
        color: rgba(226, 232, 240, 0.82);
      }
code:
  jsx: |
    function OrbLoader() {
      const [ready, setReady] = React.useState(false)
      const stageRef = React.useRef(null)
      const loaderRef = React.useRef(null)
      const panelRef = React.useRef(null)
      const orbRefs = React.useRef([])

      React.useEffect(() => {
        const ctx = gsap.context(() => {
          gsap.to(orbRefs.current, {
            y: index => (index % 2 === 0 ? -18 : 18),
            x: index => (index - 1) * 22,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.08,
          })

          gsap.delayedCall(2.2, () => {
            setReady(true)

            gsap.timeline()
              .to(loaderRef.current, {
                opacity: 0,
                scale: 0.9,
                duration: 0.45,
                ease: 'power2.inOut',
              })
              .fromTo(
                panelRef.current,
                { yPercent: 18, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                '-=0.05'
              )
          })
        }, stageRef)

        return () => ctx.revert()
      }, [])

      return (
        <section className="orb-stage" ref={stageRef}>
          <div className={`orb-loader ${ready ? 'is-hidden' : ''}`} ref={loaderRef}>
            <div className="orb-cluster">
              {[0, 1, 2].map(index => (
                <span
                  key={index}
                  ref={element => {
                    orbRefs.current[index] = element
                  }}
                  className="orb"
                />
              ))}
            </div>
            <p>Loading the next mood...</p>
          </div>

          <div className="orb-panel" ref={panelRef}>
            <p className="orb-label">Transition x Loading</p>
            <h1>待ち時間も、世界観の一部にする。</h1>
            <p className="orb-copy">
              ローディングの粒子がまとまり、次の画面の空気感へそのまま接続されるように設計しています。
            </p>
          </div>
        </section>
      )
    }
  css: |
    body {
      background: #06070b;
      color: #f8fafc;
    }

    .orb-stage {
      position: relative;
      min-height: 100vh;
      overflow: hidden;
      display: grid;
      place-items: center;
      padding: 8vw;
      background:
        radial-gradient(circle at center, rgba(14, 165, 233, 0.18), transparent 22%),
        radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.14), transparent 26%),
        #06070b;
    }

    .orb-loader,
    .orb-panel {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      text-align: center;
    }

    .orb-loader.is-hidden {
      pointer-events: none;
    }

    .orb-cluster {
      position: relative;
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .orb {
      width: 86px;
      height: 86px;
      border-radius: 999px;
      background: radial-gradient(circle at 30% 30%, #e0f2fe 0%, #38bdf8 38%, rgba(14, 165, 233, 0.18) 72%, transparent 74%);
      filter: blur(1px);
      box-shadow: 0 0 42px rgba(56, 189, 248, 0.35);
    }

    .orb-loader p {
      margin-top: 7rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(226, 232, 240, 0.7);
      font-size: 0.82rem;
    }

    .orb-panel {
      opacity: 0;
      transform: translateY(18%);
      padding: 8vw;
    }

    .orb-label {
      margin-bottom: 1rem;
      font-size: 0.8rem;
      letter-spacing: 0.26em;
      text-transform: uppercase;
      color: rgba(192, 132, 252, 0.72);
    }

    .orb-panel h1 {
      margin: 0;
      font-size: clamp(3rem, 8vw, 5.8rem);
      line-height: 0.96;
      letter-spacing: -0.05em;
    }

    .orb-copy {
      margin: 1.5rem auto 0;
      max-width: 36rem;
      font-size: 1.08rem;
      line-height: 1.8;
      color: rgba(226, 232, 240, 0.82);
    }
---

## はじめに

ローディングと画面切り替えを別物として扱わず、ひと続きの体験として見せるための実験です。

## 組み合わせのポイント

- 最初は待機状態をオーブの揺れで見せる
- 準備完了と同時にローダーを収束させる
- 次画面はすぐ切り替えず、余韻を持って入れる

## まとめ

ローディングと遷移を分断しないだけで、短い待ち時間でも印象を作れます。

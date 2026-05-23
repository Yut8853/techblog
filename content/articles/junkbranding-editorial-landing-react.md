---
title: JUNKBRANDING Editorial Landing
description: 静的なランディングページの構図を React のコンポーネント構成に置き換え、ブランドタイポとパネル群を一体で見せる記事です。
category: 背景・ビジュアル表現系
tags:
  - CSS
  - JavaScript
  - UI
  - UX
  - アニメーション
date: 2026年5月23日
publishedAt: 2026-05-23
readTime: 6分
viewer: playground
thumbnail: runtime
layout: gallery
files:
  - name: Component.jsx
    language: jsx
    content: |
      function JunkBrandingLanding() {
        const shellRef = React.useRef(null)
        const titleChars = 'JUNKBRANDING'.split('')
        const navItems = ['テキスト', 'テキスト', 'テキスト']
        const metrics = ['テキストテキスト、、、', 'テキストテキスト、、、', 'テキストテキスト、、、']
        const panels = [
          'テキストテキスト、、、',
          'テキストテキスト、、、',
          'テキストテキスト、、、',
        ]

        React.useEffect(() => {
          const ctx = gsap.context(() => {
            gsap.set(
              [
                '.jb-badge',
                '.jb-nav-link',
                '.jb-char',
                '.jb-copy',
                '.jb-action',
                '.jb-metric',
                '.jb-panel',
                '.jb-footer-copy',
              ],
              {
                opacity: 0,
                y: 30,
              }
            )

            gsap.set('.jb-visual-card', {
              opacity: 0,
              y: 54,
              rotate: -5,
              scale: 0.94,
            })

            gsap.set('.jb-orbit', {
              scale: 0.8,
              opacity: 0,
            })

            gsap.timeline({ defaults: { ease: 'power3.out' } })
              .to('.jb-badge', {
                opacity: 1,
                y: 0,
                duration: 0.6,
              })
              .to(
                '.jb-nav-link',
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.55,
                  stagger: 0.08,
                },
                0.08
              )
              .to(
                '.jb-char',
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.48,
                  stagger: 0.03,
                },
                0.14
              )
              .to(
                '.jb-copy',
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.08,
                },
                0.34
              )
              .to(
                '.jb-action',
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.55,
                  stagger: 0.08,
                },
                0.44
              )
              .to(
                '.jb-orbit',
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.7,
                  stagger: 0.06,
                },
                0.28
              )
              .to(
                '.jb-visual-card',
                {
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  duration: 0.8,
                  stagger: 0.12,
                },
                0.24
              )
              .to(
                '.jb-metric',
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.56,
                  stagger: 0.08,
                },
                0.56
              )
              .to(
                '.jb-panel',
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.62,
                  stagger: 0.08,
                },
                0.64
              )
              .to(
                '.jb-footer-copy',
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.55,
                },
                0.82
              )
          }, shellRef)

          return () => ctx.revert()
        }, [])

        return (
          <section ref={shellRef} className="jb-shell">
            <div className="jb-grid" aria-hidden="true" />
            <div className="jb-glow jb-glow-a" aria-hidden="true" />
            <div className="jb-glow jb-glow-b" aria-hidden="true" />

            <header className="jb-nav">
              <a className="jb-brand" href="#">JUNKBRANDING</a>
              <nav className="jb-nav-links" aria-label="primary">
                {navItems.map((item, index) => (
                  <a key={`${item}-${index}`} className="jb-nav-link" href="#">
                    {item}
                  </a>
                ))}
              </nav>
            </header>

            <div className="jb-hero">
              <div className="jb-copy-column">
                <p className="jb-badge">テキストテキスト、、、</p>

                <h1 className="jb-title" aria-label="JUNKBRANDING">
                  {titleChars.map((char, index) => (
                    <span key={`${char}-${index}`} className="jb-char">
                      {char}
                    </span>
                  ))}
                </h1>

                <p className="jb-copy">テキストテキスト、、、 テキストテキスト、、、 テキストテキスト、、、</p>
                <p className="jb-copy">テキストテキスト、、、 テキストテキスト、、、</p>

                <div className="jb-actions">
                  <a className="jb-action jb-primary" href="#">テキスト</a>
                  <a className="jb-action jb-secondary" href="#">テキスト</a>
                </div>

                <ul className="jb-metrics">
                  {metrics.map((metric, index) => (
                    <li key={`${metric}-${index}`} className="jb-metric">
                      <span>JUNKBRANDING</span>
                      <strong>JUNKBRANDING</strong>
                      <p>{metric}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="jb-visual-column">
                <div className="jb-orbit jb-orbit-a" aria-hidden="true" />
                <div className="jb-orbit jb-orbit-b" aria-hidden="true" />
                <div className="jb-orbit jb-orbit-c" aria-hidden="true" />

                <article className="jb-visual-card jb-visual-card-main">
                  <p>JUNKBRANDING</p>
                  <h2>JUNKBRANDING</h2>
                  <span>テキストテキスト、、、</span>
                </article>

                <article className="jb-visual-card jb-visual-card-side">
                  <p>JUNKBRANDING</p>
                  <h2>JUNKBRANDING</h2>
                  <span>テキストテキスト、、、</span>
                </article>

                <div className="jb-panel-stack">
                  {panels.map((panel, index) => (
                    <article key={`${panel}-${index}`} className="jb-panel">
                      <p>JUNKBRANDING</p>
                      <h3>JUNKBRANDING</h3>
                      <span>{panel}</span>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <footer className="jb-footer">
              <p className="jb-footer-copy">テキストテキスト、、、 テキストテキスト、、、 テキストテキスト、、、</p>
              <a className="jb-footer-link" href="#">JUNKBRANDING</a>
            </footer>
          </section>
        )
      }
  - name: styles.css
    language: css
    content: |
      @import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap");

      :root {
        color-scheme: dark;
        --bg: #0a0b10;
        --panel: rgba(15, 17, 24, 0.76);
        --panel-strong: rgba(23, 26, 36, 0.92);
        --line: rgba(255, 255, 255, 0.12);
        --text: #f8f4ed;
        --muted: rgba(248, 244, 237, 0.68);
        --accent: #ff855f;
        --accent-soft: rgba(255, 133, 95, 0.2);
      }

      * {
        box-sizing: border-box;
      }

      body {
        min-height: 100vh;
        margin: 0;
        padding: 20px;
        font-family: "Manrope", sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at 18% 18%, rgba(255, 133, 95, 0.2), transparent 28%),
          radial-gradient(circle at 82% 22%, rgba(255, 214, 10, 0.12), transparent 24%),
          linear-gradient(160deg, #08090d 0%, #11131a 52%, #0b0c11 100%);
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .jb-shell {
        position: relative;
        width: min(1220px, 100%);
        margin: 0 auto;
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 34px;
        background: linear-gradient(180deg, rgba(10, 11, 16, 0.94), rgba(10, 11, 16, 0.72));
        box-shadow: 0 30px 120px rgba(0, 0, 0, 0.4);
      }

      .jb-grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
        background-size: 30px 30px;
        opacity: 0.22;
        mask-image: radial-gradient(circle at center, black, transparent 84%);
      }

      .jb-glow {
        position: absolute;
        border-radius: 999px;
        filter: blur(18px);
        pointer-events: none;
      }

      .jb-glow-a {
        top: -80px;
        right: -40px;
        width: 260px;
        height: 260px;
        background: rgba(255, 133, 95, 0.18);
      }

      .jb-glow-b {
        bottom: -100px;
        left: -40px;
        width: 300px;
        height: 300px;
        background: rgba(255, 214, 10, 0.1);
      }

      .jb-nav,
      .jb-footer {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        padding: 26px 30px;
      }

      .jb-nav {
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .jb-brand,
      .jb-title,
      .jb-visual-card h2,
      .jb-panel h3,
      .jb-metric strong,
      .jb-footer-link {
        font-family: "Syne", sans-serif;
      }

      .jb-brand,
      .jb-footer-link {
        font-size: 0.95rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }

      .jb-nav-links {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 20px;
      }

      .jb-nav-link,
      .jb-footer-copy,
      .jb-copy,
      .jb-metric p,
      .jb-panel span,
      .jb-visual-card span,
      .jb-visual-card p {
        color: var(--muted);
      }

      .jb-nav-link,
      .jb-badge,
      .jb-metric span,
      .jb-panel p,
      .jb-visual-card p {
        font-size: 0.76rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
      }

      .jb-hero {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
        gap: 28px;
        padding: 34px 30px 20px;
      }

      .jb-copy-column {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 640px;
      }

      .jb-badge {
        display: inline-flex;
        align-self: flex-start;
        padding: 0.62rem 0.9rem;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.04);
        color: rgba(248, 244, 237, 0.84);
      }

      .jb-title {
        display: flex;
        flex-wrap: wrap;
        gap: 0.06em;
        max-width: 9ch;
        margin: 18px 0 0;
        font-size: clamp(4rem, 9vw, 8rem);
        line-height: 0.9;
        letter-spacing: -0.08em;
      }

      .jb-char {
        display: inline-block;
        background: linear-gradient(180deg, #fff8ef 0%, #ffcf8c 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .jb-copy {
        max-width: 34rem;
        margin: 18px 0 0;
        line-height: 1.8;
        font-size: 1rem;
      }

      .jb-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin-top: 28px;
      }

      .jb-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 170px;
        min-height: 54px;
        border-radius: 999px;
        padding: 0 1.2rem;
        font-weight: 700;
      }

      .jb-primary {
        color: #18120f;
        background: linear-gradient(135deg, #ffe6ca 0%, #ff855f 100%);
      }

      .jb-secondary {
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(255, 255, 255, 0.03);
      }

      .jb-metrics {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
        margin: auto 0 0;
        padding: 0;
        list-style: none;
      }

      .jb-metric {
        padding: 18px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(12px);
      }

      .jb-metric strong,
      .jb-panel h3,
      .jb-visual-card h2 {
        display: block;
        margin-top: 12px;
        font-size: clamp(1.2rem, 2vw, 1.8rem);
        line-height: 1;
        letter-spacing: -0.05em;
      }

      .jb-metric p {
        margin: 12px 0 0;
        line-height: 1.6;
      }

      .jb-visual-column {
        position: relative;
        min-height: 640px;
        padding: 8px 0 0;
      }

      .jb-orbit {
        position: absolute;
        inset: auto auto 90px 40px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 999px;
      }

      .jb-orbit-a {
        width: 420px;
        height: 420px;
      }

      .jb-orbit-b {
        left: 90px;
        bottom: 140px;
        width: 320px;
        height: 320px;
      }

      .jb-orbit-c {
        left: 142px;
        bottom: 192px;
        width: 220px;
        height: 220px;
      }

      .jb-visual-card {
        position: absolute;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 28px;
        background: linear-gradient(180deg, rgba(27, 30, 40, 0.94), rgba(13, 15, 22, 0.82));
        backdrop-filter: blur(16px);
        box-shadow: 0 22px 70px rgba(0, 0, 0, 0.28);
      }

      .jb-visual-card-main {
        top: 0;
        right: 20px;
        width: min(100%, 380px);
        padding: 28px;
      }

      .jb-visual-card-side {
        top: 178px;
        left: 0;
        width: min(78%, 300px);
        padding: 24px;
        background: linear-gradient(180deg, rgba(255, 133, 95, 0.16), rgba(13, 15, 22, 0.88));
      }

      .jb-visual-card span,
      .jb-panel span {
        display: block;
        margin-top: 14px;
        line-height: 1.7;
      }

      .jb-panel-stack {
        position: absolute;
        right: 0;
        bottom: 0;
        width: min(100%, 420px);
        display: grid;
        gap: 14px;
      }

      .jb-panel {
        padding: 18px 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.04);
        backdrop-filter: blur(12px);
      }

      .jb-footer {
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      .jb-footer-copy {
        max-width: 32rem;
        line-height: 1.7;
      }

      @media (max-width: 1080px) {
        .jb-hero {
          grid-template-columns: 1fr;
        }

        .jb-copy-column,
        .jb-visual-column {
          min-height: auto;
        }

        .jb-visual-column {
          padding-top: 24px;
          min-height: 720px;
        }
      }

      @media (max-width: 760px) {
        body {
          padding: 12px;
        }

        .jb-shell {
          border-radius: 24px;
        }

        .jb-nav,
        .jb-footer,
        .jb-hero {
          padding-left: 18px;
          padding-right: 18px;
        }

        .jb-nav,
        .jb-footer {
          flex-direction: column;
          align-items: flex-start;
        }

        .jb-nav-links,
        .jb-metrics {
          width: 100%;
        }

        .jb-nav-links {
          justify-content: flex-start;
        }

        .jb-title {
          font-size: clamp(3.2rem, 18vw, 5rem);
        }

        .jb-metrics {
          grid-template-columns: 1fr;
        }

        .jb-visual-column {
          min-height: 760px;
        }

        .jb-visual-card-main,
        .jb-visual-card-side,
        .jb-panel-stack {
          position: relative;
          top: auto;
          right: auto;
          left: auto;
          bottom: auto;
          width: 100%;
        }

        .jb-visual-card-side,
        .jb-panel-stack {
          margin-top: 14px;
        }

        .jb-orbit-a {
          width: 260px;
          height: 260px;
          left: 12px;
          bottom: 140px;
        }

        .jb-orbit-b {
          width: 210px;
          height: 210px;
          left: 38px;
          bottom: 164px;
        }

        .jb-orbit-c {
          width: 160px;
          height: 160px;
          left: 64px;
          bottom: 190px;
        }
      }
code:
  jsx: |
    function JunkBrandingLanding() {
      const shellRef = React.useRef(null)
      const titleChars = 'JUNKBRANDING'.split('')
      const navItems = ['テキスト', 'テキスト', 'テキスト']
      const metrics = ['テキストテキスト、、、', 'テキストテキスト、、、', 'テキストテキスト、、、']
      const panels = [
        'テキストテキスト、、、',
        'テキストテキスト、、、',
        'テキストテキスト、、、',
      ]

      React.useEffect(() => {
        const ctx = gsap.context(() => {
          gsap.set(
            [
              '.jb-badge',
              '.jb-nav-link',
              '.jb-char',
              '.jb-copy',
              '.jb-action',
              '.jb-metric',
              '.jb-panel',
              '.jb-footer-copy',
            ],
            {
              opacity: 0,
              y: 30,
            }
          )

          gsap.set('.jb-visual-card', {
            opacity: 0,
            y: 54,
            rotate: -5,
            scale: 0.94,
          })

          gsap.set('.jb-orbit', {
            scale: 0.8,
            opacity: 0,
          })

          gsap.timeline({ defaults: { ease: 'power3.out' } })
            .to('.jb-badge', {
              opacity: 1,
              y: 0,
              duration: 0.6,
            })
            .to(
              '.jb-nav-link',
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                stagger: 0.08,
              },
              0.08
            )
            .to(
              '.jb-char',
              {
                opacity: 1,
                y: 0,
                duration: 0.48,
                stagger: 0.03,
              },
              0.14
            )
            .to(
              '.jb-copy',
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
              },
              0.34
            )
            .to(
              '.jb-action',
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                stagger: 0.08,
              },
              0.44
            )
            .to(
              '.jb-orbit',
              {
                opacity: 1,
                scale: 1,
                duration: 0.7,
                stagger: 0.06,
              },
              0.28
            )
            .to(
              '.jb-visual-card',
              {
                opacity: 1,
                y: 0,
                rotate: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.12,
              },
              0.24
            )
            .to(
              '.jb-metric',
              {
                opacity: 1,
                y: 0,
                duration: 0.56,
                stagger: 0.08,
              },
              0.56
            )
            .to(
              '.jb-panel',
              {
                opacity: 1,
                y: 0,
                duration: 0.62,
                stagger: 0.08,
              },
              0.64
            )
            .to(
              '.jb-footer-copy',
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
              },
              0.82
            )
        }, shellRef)

        return () => ctx.revert()
      }, [])

      return (
        <section ref={shellRef} className="jb-shell">
          <div className="jb-grid" aria-hidden="true" />
          <div className="jb-glow jb-glow-a" aria-hidden="true" />
          <div className="jb-glow jb-glow-b" aria-hidden="true" />

          <header className="jb-nav">
            <a className="jb-brand" href="#">JUNKBRANDING</a>
            <nav className="jb-nav-links" aria-label="primary">
              {navItems.map((item, index) => (
                <a key={`${item}-${index}`} className="jb-nav-link" href="#">
                  {item}
                </a>
              ))}
            </nav>
          </header>

          <div className="jb-hero">
            <div className="jb-copy-column">
              <p className="jb-badge">テキストテキスト、、、</p>

              <h1 className="jb-title" aria-label="JUNKBRANDING">
                {titleChars.map((char, index) => (
                  <span key={`${char}-${index}`} className="jb-char">
                    {char}
                  </span>
                ))}
              </h1>

              <p className="jb-copy">テキストテキスト、、、 テキストテキスト、、、 テキストテキスト、、、</p>
              <p className="jb-copy">テキストテキスト、、、 テキストテキスト、、、</p>

              <div className="jb-actions">
                <a className="jb-action jb-primary" href="#">テキスト</a>
                <a className="jb-action jb-secondary" href="#">テキスト</a>
              </div>

              <ul className="jb-metrics">
                {metrics.map((metric, index) => (
                  <li key={`${metric}-${index}`} className="jb-metric">
                    <span>JUNKBRANDING</span>
                    <strong>JUNKBRANDING</strong>
                    <p>{metric}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="jb-visual-column">
              <div className="jb-orbit jb-orbit-a" aria-hidden="true" />
              <div className="jb-orbit jb-orbit-b" aria-hidden="true" />
              <div className="jb-orbit jb-orbit-c" aria-hidden="true" />

              <article className="jb-visual-card jb-visual-card-main">
                <p>JUNKBRANDING</p>
                <h2>JUNKBRANDING</h2>
                <span>テキストテキスト、、、</span>
              </article>

              <article className="jb-visual-card jb-visual-card-side">
                <p>JUNKBRANDING</p>
                <h2>JUNKBRANDING</h2>
                <span>テキストテキスト、、、</span>
              </article>

              <div className="jb-panel-stack">
                {panels.map((panel, index) => (
                  <article key={`${panel}-${index}`} className="jb-panel">
                    <p>JUNKBRANDING</p>
                    <h3>JUNKBRANDING</h3>
                    <span>{panel}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <footer className="jb-footer">
            <p className="jb-footer-copy">テキストテキスト、、、 テキストテキスト、、、 テキストテキスト、、、</p>
            <a className="jb-footer-link" href="#">JUNKBRANDING</a>
          </footer>
        </section>
      )
    }
  css: |
    @import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap");

    :root {
      color-scheme: dark;
      --bg: #0a0b10;
      --panel: rgba(15, 17, 24, 0.76);
      --panel-strong: rgba(23, 26, 36, 0.92);
      --line: rgba(255, 255, 255, 0.12);
      --text: #f8f4ed;
      --muted: rgba(248, 244, 237, 0.68);
      --accent: #ff855f;
      --accent-soft: rgba(255, 133, 95, 0.2);
    }

    * {
      box-sizing: border-box;
    }

    body {
      min-height: 100vh;
      margin: 0;
      padding: 20px;
      font-family: "Manrope", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at 18% 18%, rgba(255, 133, 95, 0.2), transparent 28%),
        radial-gradient(circle at 82% 22%, rgba(255, 214, 10, 0.12), transparent 24%),
        linear-gradient(160deg, #08090d 0%, #11131a 52%, #0b0c11 100%);
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .jb-shell {
      position: relative;
      width: min(1220px, 100%);
      margin: 0 auto;
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 34px;
      background: linear-gradient(180deg, rgba(10, 11, 16, 0.94), rgba(10, 11, 16, 0.72));
      box-shadow: 0 30px 120px rgba(0, 0, 0, 0.4);
    }

    .jb-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
      background-size: 30px 30px;
      opacity: 0.22;
      mask-image: radial-gradient(circle at center, black, transparent 84%);
    }

    .jb-glow {
      position: absolute;
      border-radius: 999px;
      filter: blur(18px);
      pointer-events: none;
    }

    .jb-glow-a {
      top: -80px;
      right: -40px;
      width: 260px;
      height: 260px;
      background: rgba(255, 133, 95, 0.18);
    }

    .jb-glow-b {
      bottom: -100px;
      left: -40px;
      width: 300px;
      height: 300px;
      background: rgba(255, 214, 10, 0.1);
    }

    .jb-nav,
    .jb-footer {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding: 26px 30px;
    }

    .jb-nav {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .jb-brand,
    .jb-title,
    .jb-visual-card h2,
    .jb-panel h3,
    .jb-metric strong,
    .jb-footer-link {
      font-family: "Syne", sans-serif;
    }

    .jb-brand,
    .jb-footer-link {
      font-size: 0.95rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .jb-nav-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 20px;
    }

    .jb-nav-link,
    .jb-footer-copy,
    .jb-copy,
    .jb-metric p,
    .jb-panel span,
    .jb-visual-card span,
    .jb-visual-card p {
      color: var(--muted);
    }

    .jb-nav-link,
    .jb-badge,
    .jb-metric span,
    .jb-panel p,
    .jb-visual-card p {
      font-size: 0.76rem;
      letter-spacing: 0.24em;
      text-transform: uppercase;
    }

    .jb-hero {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
      gap: 28px;
      padding: 34px 30px 20px;
    }

    .jb-copy-column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 640px;
    }

    .jb-badge {
      display: inline-flex;
      align-self: flex-start;
      padding: 0.62rem 0.9rem;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.04);
      color: rgba(248, 244, 237, 0.84);
    }

    .jb-title {
      display: flex;
      flex-wrap: wrap;
      gap: 0.06em;
      max-width: 9ch;
      margin: 18px 0 0;
      font-size: clamp(4rem, 9vw, 8rem);
      line-height: 0.9;
      letter-spacing: -0.08em;
    }

    .jb-char {
      display: inline-block;
      background: linear-gradient(180deg, #fff8ef 0%, #ffcf8c 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .jb-copy {
      max-width: 34rem;
      margin: 18px 0 0;
      line-height: 1.8;
      font-size: 1rem;
    }

    .jb-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-top: 28px;
    }

    .jb-action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 170px;
      min-height: 54px;
      border-radius: 999px;
      padding: 0 1.2rem;
      font-weight: 700;
    }

    .jb-primary {
      color: #18120f;
      background: linear-gradient(135deg, #ffe6ca 0%, #ff855f 100%);
    }

    .jb-secondary {
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: rgba(255, 255, 255, 0.03);
    }

    .jb-metrics {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      margin: auto 0 0;
      padding: 0;
      list-style: none;
    }

    .jb-metric {
      padding: 18px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(12px);
    }

    .jb-metric strong,
    .jb-panel h3,
    .jb-visual-card h2 {
      display: block;
      margin-top: 12px;
      font-size: clamp(1.2rem, 2vw, 1.8rem);
      line-height: 1;
      letter-spacing: -0.05em;
    }

    .jb-metric p {
      margin: 12px 0 0;
      line-height: 1.6;
    }

    .jb-visual-column {
      position: relative;
      min-height: 640px;
      padding: 8px 0 0;
    }

    .jb-orbit {
      position: absolute;
      inset: auto auto 90px 40px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 999px;
    }

    .jb-orbit-a {
      width: 420px;
      height: 420px;
    }

    .jb-orbit-b {
      left: 90px;
      bottom: 140px;
      width: 320px;
      height: 320px;
    }

    .jb-orbit-c {
      left: 142px;
      bottom: 192px;
      width: 220px;
      height: 220px;
    }

    .jb-visual-card {
      position: absolute;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 28px;
      background: linear-gradient(180deg, rgba(27, 30, 40, 0.94), rgba(13, 15, 22, 0.82));
      backdrop-filter: blur(16px);
      box-shadow: 0 22px 70px rgba(0, 0, 0, 0.28);
    }

    .jb-visual-card-main {
      top: 0;
      right: 20px;
      width: min(100%, 380px);
      padding: 28px;
    }

    .jb-visual-card-side {
      top: 178px;
      left: 0;
      width: min(78%, 300px);
      padding: 24px;
      background: linear-gradient(180deg, rgba(255, 133, 95, 0.16), rgba(13, 15, 22, 0.88));
    }

    .jb-visual-card span,
    .jb-panel span {
      display: block;
      margin-top: 14px;
      line-height: 1.7;
    }

    .jb-panel-stack {
      position: absolute;
      right: 0;
      bottom: 0;
      width: min(100%, 420px);
      display: grid;
      gap: 14px;
    }

    .jb-panel {
      padding: 18px 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(12px);
    }

    .jb-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .jb-footer-copy {
      max-width: 32rem;
      line-height: 1.7;
    }

    @media (max-width: 1080px) {
      .jb-hero {
        grid-template-columns: 1fr;
      }

      .jb-copy-column,
      .jb-visual-column {
        min-height: auto;
      }

      .jb-visual-column {
        padding-top: 24px;
        min-height: 720px;
      }
    }

    @media (max-width: 760px) {
      body {
        padding: 12px;
      }

      .jb-shell {
        border-radius: 24px;
      }

      .jb-nav,
      .jb-footer,
      .jb-hero {
        padding-left: 18px;
        padding-right: 18px;
      }

      .jb-nav,
      .jb-footer {
        flex-direction: column;
        align-items: flex-start;
      }

      .jb-nav-links,
      .jb-metrics {
        width: 100%;
      }

      .jb-nav-links {
        justify-content: flex-start;
      }

      .jb-title {
        font-size: clamp(3.2rem, 18vw, 5rem);
      }

      .jb-metrics {
        grid-template-columns: 1fr;
      }

      .jb-visual-column {
        min-height: 760px;
      }

      .jb-visual-card-main,
      .jb-visual-card-side,
      .jb-panel-stack {
        position: relative;
        top: auto;
        right: auto;
        left: auto;
        bottom: auto;
        width: 100%;
      }

      .jb-visual-card-side,
      .jb-panel-stack {
        margin-top: 14px;
      }

      .jb-orbit-a {
        width: 260px;
        height: 260px;
        left: 12px;
        bottom: 140px;
      }

      .jb-orbit-b {
        width: 210px;
        height: 210px;
        left: 38px;
        bottom: 164px;
      }

      .jb-orbit-c {
        width: 160px;
        height: 160px;
        left: 64px;
        bottom: 190px;
      }
    }
---

## 企画メモ

- 今回はこれ以外: preloader -> card align -> central visual expand の多段構成以外
- 今回の主役: ブランドタイポと情報パネルを同時に立ち上げるファーストビュー
- 差分: ローディング起点ではなく初期表示のスタッガー / 5枚整列ではなく左右 2 カラム / 見せ場は 1 画面内

## 実装の狙い

静的な見た目をそのまま持ち込むのではなく、配列マップでナビやパネルを組み直す形にしておく。後で差し替える前提なら、ここを React 側で管理できる方が楽。

見出しやブランドラベルは `JUNKBRANDING` に寄せて、本文は `テキストテキスト、、、` に統一。見た目の空気だけ先に残して、中身はあとで差し替える想定。

## 組み合わせのポイント

- ブランドタイポ、情報パネル、軌道オブジェクトを同時に立ち上げて 1 画面内で密度を作る
- 左側は文字、右側はカード群に分けて、役割を明確にしたまま同時進行で見せる
- ナビ、メトリクス、パネルを同じブランドトーンで揃えて、差し替え前提の雛形にする
- 初期表示だけで空気を作り、ローディングやスクロール依存にはしない

## 実装のポイント

- 繰り返し要素は配列で持ち、JSX で map して差し替えやすくする
- 初期表示アニメーションは `gsap.context()` 内に集約して、セレクタ管理を閉じる
- タイポ、カード、軌道で初期値を変えて、同じ timeline でも見え方に段差を作る
- モバイルではレイアウトを縦積みに落として、同じコンポーネントのまま崩れを防ぐ

## React化したポイント

1. 繰り返し要素は配列化して JSX 側で持つ
2. 初期表示アニメーションは `useEffect` と GSAP timeline に寄せる
3. 見た目の雰囲気は残しつつ、カードとパネルは再利用しやすくしておく
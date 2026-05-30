---
title: Infinite Parallax Loop Gallery
description: 縦方向に循環するフルスクリーン画像ギャラリーへ、ScrollTriggerのパララックスを重ねるReact実装です。
category: パララックス系
tags:
  - GSAP
  - ScrollTrigger
  - JavaScript
  - CSS
  - アニメーション
  - スクロール
  - UX
date: 2026年5月27日
publishedAt: 2026-05-27
readTime: 7分
viewer: playground
thumbnail: runtime
layout: tutorial
files:
  - name: Component.jsx
    language: jsx
    content: |
      function InfiniteParallaxGallery() {
        const rootRef = React.useRef(null)
        const scrollerRef = React.useRef(null)
        const slides = [
          {
            id: 'north',
            title: 'NORTH FIELD',
            caption: '遠景をゆっくり流して、スクロール量よりも深い移動感を作ります。',
            image: 'https://raw.githubusercontent.com/joebentaylor1995/infinite-scroll-with-parallax/main/assets/01.webp',
          },
          {
            id: 'glass',
            title: 'GLASS HORIZON',
            caption: '一画面ごとの切り替わりを保ちながら、終端を感じさせないギャラリーにします。',
            image: 'https://raw.githubusercontent.com/joebentaylor1995/infinite-scroll-with-parallax/main/assets/02.webp',
          },
          {
            id: 'signal',
            title: 'SIGNAL RIDGE',
            caption: '同じセットを複製し、中央のセットへ戻すことで自然なループに見せます。',
            image: 'https://raw.githubusercontent.com/joebentaylor1995/infinite-scroll-with-parallax/main/assets/03.webp',
          },
        ]
        const loopSlides = React.useMemo(() => [...slides, ...slides, ...slides], [])

        React.useEffect(() => {
          gsap.registerPlugin(ScrollTrigger)

          const scroller = scrollerRef.current
          if (!scroller) return undefined

          const context = gsap.context(() => {
            const panels = gsap.utils.toArray('.loop-panel')
            let cycleHeight = 0
            let frameId = 0

            function measure() {
              cycleHeight = scroller.scrollHeight / 3
            }

            function jumpToMiddleSet() {
              measure()
              scroller.scrollTop = cycleHeight
              ScrollTrigger.refresh()
            }

            function keepScrollInfinite() {
              if (!cycleHeight) return

              if (scroller.scrollTop < cycleHeight * 0.5) {
                scroller.scrollTop += cycleHeight
                ScrollTrigger.update()
              }

              if (scroller.scrollTop > cycleHeight * 1.5) {
                scroller.scrollTop -= cycleHeight
                ScrollTrigger.update()
              }
            }

            panels.forEach(panel => {
              const image = panel.querySelector('.loop-image')
              const title = panel.querySelector('.loop-title')
              const caption = panel.querySelector('.loop-caption')

              gsap.fromTo(
                image,
                { yPercent: -18, scale: 1.12 },
                {
                  yPercent: 18,
                  scale: 1.04,
                  ease: 'none',
                  scrollTrigger: {
                    scroller,
                    trigger: panel,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                }
              )

              gsap.fromTo(
                [title, caption],
                { y: 42, opacity: 0.25 },
                {
                  y: -18,
                  opacity: 1,
                  ease: 'none',
                  stagger: 0.08,
                  scrollTrigger: {
                    scroller,
                    trigger: panel,
                    start: 'top 70%',
                    end: 'center 28%',
                    scrub: true,
                  },
                }
              )
            })

            frameId = window.requestAnimationFrame(jumpToMiddleSet)
            window.addEventListener('resize', jumpToMiddleSet)
            scroller.addEventListener('scroll', keepScrollInfinite, { passive: true })

            return () => {
              window.cancelAnimationFrame(frameId)
              window.removeEventListener('resize', jumpToMiddleSet)
              scroller.removeEventListener('scroll', keepScrollInfinite)
            }
          }, rootRef)

          return () => context.revert()
        }, [])

        return (
          <main className="loop-gallery" ref={rootRef}>
            <div className="loop-chrome">
              <span>Infinite Parallax</span>
              <span>Scroll Gallery</span>
            </div>

            <div className="loop-scroller" ref={scrollerRef} aria-label="Infinite parallax image gallery">
              <div className="loop-track">
                {loopSlides.map((slide, index) => (
                  <section className="loop-panel" key={`${slide.id}-${index}`} aria-hidden={index < 3 || index > 5}>
                    <img className="loop-image" src={slide.image} alt="" />
                    <div className="loop-shade" />
                    <div className="loop-copy">
                      <p className="loop-kicker">0{(index % slides.length) + 1} / Loop</p>
                      <h1 className="loop-title">{slide.title}</h1>
                      <p className="loop-caption">{slide.caption}</p>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </main>
        )
      }
  - name: styles.css
    language: css
    content: |
      :root {
        color-scheme: dark;
        --ink: #f4f0e8;
        --muted: rgba(244, 240, 232, 0.72);
        --line: rgba(244, 240, 232, 0.18);
        --black: #050505;
        --red: #d9352a;
      }

      body {
        margin: 0;
        background: var(--black);
        color: var(--ink);
      }

      .loop-gallery {
        position: relative;
        height: 100svh;
        overflow: hidden;
        background: var(--black);
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      }

      .loop-chrome {
        position: absolute;
        inset: 0 0 auto;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem clamp(1rem, 3vw, 2rem);
        font-size: 0.78rem;
        line-height: 1.2;
        text-transform: uppercase;
        color: rgba(244, 240, 232, 0.86);
        background: linear-gradient(180deg, rgba(5, 5, 5, 0.74), rgba(5, 5, 5, 0));
        pointer-events: none;
      }

      .loop-scroller {
        height: 100svh;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: none;
        overscroll-behavior: contain;
      }

      .loop-scroller::-webkit-scrollbar {
        display: none;
      }

      .loop-track {
        position: relative;
      }

      .loop-panel {
        position: relative;
        display: grid;
        place-items: center;
        height: 100svh;
        min-height: 560px;
        overflow: hidden;
        isolation: isolate;
      }

      .loop-image {
        position: absolute;
        inset: -18% 0;
        z-index: -2;
        width: 100%;
        height: 136%;
        object-fit: cover;
        transform-origin: center;
        filter: saturate(0.96) contrast(1.04);
      }

      .loop-shade {
        position: absolute;
        inset: 0;
        z-index: -1;
        background:
          linear-gradient(90deg, rgba(5, 5, 5, 0.82), rgba(5, 5, 5, 0.12) 46%, rgba(5, 5, 5, 0.62)),
          linear-gradient(180deg, rgba(5, 5, 5, 0.34), rgba(5, 5, 5, 0.68));
      }

      .loop-copy {
        width: min(88vw, 980px);
        padding: 0 clamp(1rem, 4vw, 3rem);
      }

      .loop-kicker {
        margin: 0 0 1rem;
        color: var(--red);
        font-size: 0.82rem;
        font-weight: 700;
        line-height: 1.2;
        text-transform: uppercase;
      }

      .loop-title {
        max-width: 11ch;
        margin: 0;
        font-size: clamp(4rem, 13vw, 12rem);
        font-weight: 900;
        line-height: 0.78;
        letter-spacing: 0;
        text-transform: uppercase;
      }

      .loop-caption {
        max-width: 34rem;
        margin: 1.4rem 0 0;
        color: var(--muted);
        font-size: clamp(1rem, 2vw, 1.2rem);
        line-height: 1.8;
      }

      @media (max-width: 720px) {
        .loop-chrome {
          align-items: flex-start;
          font-size: 0.7rem;
        }

        .loop-panel {
          min-height: 520px;
          place-items: end start;
          padding-bottom: 18vh;
        }

        .loop-title {
          font-size: clamp(3.2rem, 18vw, 6rem);
          line-height: 0.84;
        }
      }
code:
  jsx: |
    function InfiniteParallaxGallery() {
      const rootRef = React.useRef(null)
      const scrollerRef = React.useRef(null)
      const slides = [
        {
          id: 'north',
          title: 'NORTH FIELD',
          caption: '遠景をゆっくり流して、スクロール量よりも深い移動感を作ります。',
          image: 'https://raw.githubusercontent.com/joebentaylor1995/infinite-scroll-with-parallax/main/assets/01.webp',
        },
        {
          id: 'glass',
          title: 'GLASS HORIZON',
          caption: '一画面ごとの切り替わりを保ちながら、終端を感じさせないギャラリーにします。',
          image: 'https://raw.githubusercontent.com/joebentaylor1995/infinite-scroll-with-parallax/main/assets/02.webp',
        },
        {
          id: 'signal',
          title: 'SIGNAL RIDGE',
          caption: '同じセットを複製し、中央のセットへ戻すことで自然なループに見せます。',
          image: 'https://raw.githubusercontent.com/joebentaylor1995/infinite-scroll-with-parallax/main/assets/03.webp',
        },
      ]
      const loopSlides = React.useMemo(() => [...slides, ...slides, ...slides], [])

      React.useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const scroller = scrollerRef.current
        if (!scroller) return undefined

        const context = gsap.context(() => {
          const panels = gsap.utils.toArray('.loop-panel')
          let cycleHeight = 0
          let frameId = 0

          function measure() {
            cycleHeight = scroller.scrollHeight / 3
          }

          function jumpToMiddleSet() {
            measure()
            scroller.scrollTop = cycleHeight
            ScrollTrigger.refresh()
          }

          function keepScrollInfinite() {
            if (!cycleHeight) return

            if (scroller.scrollTop < cycleHeight * 0.5) {
              scroller.scrollTop += cycleHeight
              ScrollTrigger.update()
            }

            if (scroller.scrollTop > cycleHeight * 1.5) {
              scroller.scrollTop -= cycleHeight
              ScrollTrigger.update()
            }
          }

          panels.forEach(panel => {
            const image = panel.querySelector('.loop-image')
            const title = panel.querySelector('.loop-title')
            const caption = panel.querySelector('.loop-caption')

            gsap.fromTo(
              image,
              { yPercent: -18, scale: 1.12 },
              {
                yPercent: 18,
                scale: 1.04,
                ease: 'none',
                scrollTrigger: {
                  scroller,
                  trigger: panel,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            )

            gsap.fromTo(
              [title, caption],
              { y: 42, opacity: 0.25 },
              {
                y: -18,
                opacity: 1,
                ease: 'none',
                stagger: 0.08,
                scrollTrigger: {
                  scroller,
                  trigger: panel,
                  start: 'top 70%',
                  end: 'center 28%',
                  scrub: true,
                },
              }
            )
          })

          frameId = window.requestAnimationFrame(jumpToMiddleSet)
          window.addEventListener('resize', jumpToMiddleSet)
          scroller.addEventListener('scroll', keepScrollInfinite, { passive: true })

          return () => {
            window.cancelAnimationFrame(frameId)
            window.removeEventListener('resize', jumpToMiddleSet)
            scroller.removeEventListener('scroll', keepScrollInfinite)
          }
        }, rootRef)

        return () => context.revert()
      }, [])

      return (
        <main className="loop-gallery" ref={rootRef}>
          <div className="loop-chrome">
            <span>Infinite Parallax</span>
            <span>Scroll Gallery</span>
          </div>

          <div className="loop-scroller" ref={scrollerRef} aria-label="Infinite parallax image gallery">
            <div className="loop-track">
              {loopSlides.map((slide, index) => (
                <section className="loop-panel" key={`${slide.id}-${index}`} aria-hidden={index < 3 || index > 5}>
                  <img className="loop-image" src={slide.image} alt="" />
                  <div className="loop-shade" />
                  <div className="loop-copy">
                    <p className="loop-kicker">0{(index % slides.length) + 1} / Loop</p>
                    <h1 className="loop-title">{slide.title}</h1>
                    <p className="loop-caption">{slide.caption}</p>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
      )
    }
  css: |
    :root {
      color-scheme: dark;
      --ink: #f4f0e8;
      --muted: rgba(244, 240, 232, 0.72);
      --line: rgba(244, 240, 232, 0.18);
      --black: #050505;
      --red: #d9352a;
    }

    body {
      margin: 0;
      background: var(--black);
      color: var(--ink);
    }

    .loop-gallery {
      position: relative;
      height: 100svh;
      overflow: hidden;
      background: var(--black);
      font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    }

    .loop-chrome {
      position: absolute;
      inset: 0 0 auto;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem clamp(1rem, 3vw, 2rem);
      font-size: 0.78rem;
      line-height: 1.2;
      text-transform: uppercase;
      color: rgba(244, 240, 232, 0.86);
      background: linear-gradient(180deg, rgba(5, 5, 5, 0.74), rgba(5, 5, 5, 0));
      pointer-events: none;
    }

    .loop-scroller {
      height: 100svh;
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-width: none;
      overscroll-behavior: contain;
    }

    .loop-scroller::-webkit-scrollbar {
      display: none;
    }

    .loop-track {
      position: relative;
    }

    .loop-panel {
      position: relative;
      display: grid;
      place-items: center;
      height: 100svh;
      min-height: 560px;
      overflow: hidden;
      isolation: isolate;
    }

    .loop-image {
      position: absolute;
      inset: -18% 0;
      z-index: -2;
      width: 100%;
      height: 136%;
      object-fit: cover;
      transform-origin: center;
      filter: saturate(0.96) contrast(1.04);
    }

    .loop-shade {
      position: absolute;
      inset: 0;
      z-index: -1;
      background:
        linear-gradient(90deg, rgba(5, 5, 5, 0.82), rgba(5, 5, 5, 0.12) 46%, rgba(5, 5, 5, 0.62)),
        linear-gradient(180deg, rgba(5, 5, 5, 0.34), rgba(5, 5, 5, 0.68));
    }

    .loop-copy {
      width: min(88vw, 980px);
      padding: 0 clamp(1rem, 4vw, 3rem);
    }

    .loop-kicker {
      margin: 0 0 1rem;
      color: var(--red);
      font-size: 0.82rem;
      font-weight: 700;
      line-height: 1.2;
      text-transform: uppercase;
    }

    .loop-title {
      max-width: 11ch;
      margin: 0;
      font-size: clamp(4rem, 13vw, 12rem);
      font-weight: 900;
      line-height: 0.78;
      letter-spacing: 0;
      text-transform: uppercase;
    }

    .loop-caption {
      max-width: 34rem;
      margin: 1.4rem 0 0;
      color: var(--muted);
      font-size: clamp(1rem, 2vw, 1.2rem);
      line-height: 1.8;
    }

    @media (max-width: 720px) {
      .loop-chrome {
        align-items: flex-start;
        font-size: 0.7rem;
      }

      .loop-panel {
        min-height: 520px;
        place-items: end start;
        padding-bottom: 18vh;
      }

      .loop-title {
        font-size: clamp(3.2rem, 18vw, 6rem);
        line-height: 0.84;
      }
    }
---

## 🎯 企画メモ（AI執筆時はここを必ず埋めること）

- **今回はこれ以外:** ピン留めしたヒーロー見出しの縮小フェード、縦スクロールで重なったカードを段階切り替え、背景と見出しを同時にずらす定番パララックス導入以外。
- **今回の主役:** フルスクリーン画像セクションを終端なく循環させるスクロールコンテナと、各画像の奥行きパララックス。
- **差分:** window全体をpinするのではなく、専用スクロール領域のscrollTopを中央セットへ戻してループ化し、見せ場を「終端が消える瞬間」に置く。

---

## 📝 はじめに

この実装は、[joebentaylor1995/infinite-scroll-with-parallax](https://github.com/joebentaylor1995/infinite-scroll-with-parallax) の Lenis + GSAP による無限スクロール表現を、記事内で試しやすい React コンポーネントへ置き換えたものです。元のデモは Lenis の `infinite: true` と `ScrollTrigger.scrollerProxy()` で滑らかな循環を作っていますが、ここでは依存を増やさず、同じスライド群を3セット並べて中央セットへ戻すことで終端を隠しています。

画像は通常のスクロール量より大きめの高さで敷き、`yPercent: -18` から `18` へ動かしています。セクション自体は一画面ずつ進むのに、画像だけが少し遅れて抜けていくため、ギャラリーの切り替わりに奥行きと余韻が生まれます。

## 🛠️ 実装のポイント

- **スクロール領域をコンポーネント内に閉じる**
  `.loop-scroller` に `height: 100svh` と `overflow-y: auto` を与え、ページ全体ではなくデモ内だけでスクロールを完結させています。これにより、記事ページの通常スクロールと干渉しにくく、ScrollTrigger 側も `scroller` にこの要素を渡すだけで管理できます。
- **3セット複製して中央セットへ戻す**
  `slides` を3回複製し、初期表示を真ん中のセットへ移動します。スクロール位置が上端側または下端側へ近づいたら、同じ見た目の位置へ `cycleHeight` 分だけ戻すため、ユーザーには連続したスクロールとして見えます。
- **React生命周期におけるコンテキスト管理**
  `gsap.context()` の中で ScrollTrigger、resize、scroll イベントをまとめ、返り値でイベントリスナーを外しています。最後に `context.revert()` を呼ぶことで、コンポーネントのアンマウント時に GSAP のインラインスタイルや ScrollTrigger もまとめて破棄できます。

## 💡 使いどころとカスタマイズ

- **最適なユースケース:** 写真家や建築、ファッション、ホテル、イベント告知など、ビジュアルを大きく見せながら「まだ続く」感覚を作りたいギャラリーに向いています。
- **調整ダイヤル（パラメーター変更のヒント）:**
  - `yPercent` を `-10` / `10` に変更すると、視差が弱まり、落ち着いたギャラリーになります。
  - `cycleHeight * 0.5` と `cycleHeight * 1.5` を `0.35` / `1.65` に寄せると、ループ補正のタイミングが端に近づき、長くスクロールできる感覚になります。

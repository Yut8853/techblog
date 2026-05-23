---
title: マスク遷移とスライド遷移を組み合わせたページ切り替え演出
description: オーバーレイのマスク拡張とコンテンツのスライドインを組み合わせた、ページ遷移風の演出です。
category: ページ遷移・画面切り替え系
tags:
  - GSAP
  - アニメーション
  - トランジション
  - UI
date: 2026年5月19日
publishedAt: 2026-05-19
readTime: 5分
viewer: playground
thumbnail: runtime
layout: gallery
files:
  - name: PageTransition.jsx
    language: jsx
    content: |
      function PageTransition() {
        const [page, setPage] = React.useState(0)
        const maskRef = React.useRef(null)
        const contentRef = React.useRef(null)

        const pages = [
          { eyebrow: 'テキストテキスト、、、、', title: 'JUNKBRANDING', copy: 'テキストテキスト、、、、', theme: 'theme-a' },
          { eyebrow: 'テキストテキスト、、、、', title: 'JUNKBRANDING', copy: 'テキストテキスト、、、、', theme: 'theme-b' },
        ]

        const handleSwitch = () => {
          const nextPage = (page + 1) % pages.length

          gsap.timeline({
            onComplete: () => setPage(nextPage),
          })
            .set(maskRef.current, { clipPath: 'circle(0% at 50% 50%)' })
            .to(maskRef.current, {
              clipPath: 'circle(150% at 50% 50%)',
              duration: 0.7,
              ease: 'power3.inOut',
            })
            .to(contentRef.current, {
              y: -24,
              opacity: 0,
              duration: 0.25,
              ease: 'power2.in',
            }, 0)
        }

        React.useEffect(() => {
          gsap.fromTo(
            contentRef.current,
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', clearProps: 'all' }
          )
          gsap.set(maskRef.current, { clipPath: 'circle(0% at 50% 50%)' })
        }, [page])

        const current = pages[page]

        return (
          <section className={`transition-stage ${current.theme}`}>
            <div ref={maskRef} className="transition-mask" />
            <div ref={contentRef} className="transition-card">
              <p className="transition-eyebrow">{current.eyebrow}</p>
              <h1>{current.title}</h1>
              <p className="transition-copy">{current.copy}</p>
              <button onClick={handleSwitch} className="transition-button">切り替える</button>
            </div>
          </section>
        )
      }
  - name: transition.css
    language: css
    content: |
      body {
        display: grid;
        place-items: center;
        min-height: 100vh;
        background: #0a0f18;
      }

      .transition-stage {
        position: relative;
        width: min(980px, calc(100vw - 2rem));
        min-height: 78vh;
        overflow: hidden;
        border-radius: 32px;
        display: grid;
        place-items: center;
      }

      .transition-stage.theme-a {
        background: linear-gradient(140deg, #0f172a 0%, #1d4ed8 100%);
      }

      .transition-stage.theme-b {
        background: linear-gradient(140deg, #111827 0%, #7c3aed 100%);
      }

      .transition-mask {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.03));
        backdrop-filter: blur(24px);
      }

      .transition-card {
        position: relative;
        z-index: 1;
        width: min(620px, calc(100% - 3rem));
        padding: 2rem;
        border-radius: 28px;
        background: rgba(7, 11, 20, 0.52);
        border: 1px solid rgba(255,255,255,0.08);
        color: white;
      }

      .transition-eyebrow {
        margin: 0 0 1rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        font-size: 0.8rem;
        color: rgba(191, 219, 254, 0.82);
      }

      .transition-card h1 {
        margin: 0;
        font-size: clamp(2.8rem, 6vw, 4.8rem);
        line-height: 0.96;
        letter-spacing: -0.05em;
      }

      .transition-copy {
        margin: 1.25rem 0 0;
        line-height: 1.8;
        color: rgba(226, 232, 240, 0.84);
      }

      .transition-button {
        margin-top: 1.5rem;
        border: 0;
        border-radius: 999px;
        padding: 0.85rem 1.3rem;
        background: white;
        color: #0f172a;
        font-weight: 700;
      }
code:
  jsx: |
    function PageTransition() {
      const [page, setPage] = React.useState(0)
      const maskRef = React.useRef(null)
      const contentRef = React.useRef(null)

      const pages = [
        { eyebrow: 'テキストテキスト、、、、', title: 'JUNKBRANDING', copy: 'テキストテキスト、、、、', theme: 'theme-a' },
        { eyebrow: 'テキストテキスト、、、、', title: 'JUNKBRANDING', copy: 'テキストテキスト、、、、', theme: 'theme-b' },
      ]

      const handleSwitch = () => {
        const nextPage = (page + 1) % pages.length

        gsap.timeline({
          onComplete: () => setPage(nextPage),
        })
          .set(maskRef.current, { clipPath: 'circle(0% at 50% 50%)' })
          .to(maskRef.current, {
            clipPath: 'circle(150% at 50% 50%)',
            duration: 0.7,
            ease: 'power3.inOut',
          })
          .to(contentRef.current, {
            y: -24,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
          }, 0)
      }

      React.useEffect(() => {
        gsap.fromTo(
          contentRef.current,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', clearProps: 'all' }
        )
        gsap.set(maskRef.current, { clipPath: 'circle(0% at 50% 50%)' })
      }, [page])

      const current = pages[page]

      return (
        <section className={`transition-stage ${current.theme}`}>
          <div ref={maskRef} className="transition-mask" />
          <div ref={contentRef} className="transition-card">
            <p className="transition-eyebrow">{current.eyebrow}</p>
            <h1>{current.title}</h1>
            <p className="transition-copy">{current.copy}</p>
            <button onClick={handleSwitch} className="transition-button">切り替える</button>
          </div>
        </section>
      )
    }
  css: |
    body {
      display: grid;
      place-items: center;
      min-height: 100vh;
      background: #0a0f18;
    }

    .transition-stage {
      position: relative;
      width: min(980px, calc(100vw - 2rem));
      min-height: 78vh;
      overflow: hidden;
      border-radius: 32px;
      display: grid;
      place-items: center;
    }

    .transition-stage.theme-a {
      background: linear-gradient(140deg, #0f172a 0%, #1d4ed8 100%);
    }

    .transition-stage.theme-b {
      background: linear-gradient(140deg, #111827 0%, #7c3aed 100%);
    }

    .transition-mask {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.03));
      backdrop-filter: blur(24px);
    }

    .transition-card {
      position: relative;
      z-index: 1;
      width: min(620px, calc(100% - 3rem));
      padding: 2rem;
      border-radius: 28px;
      background: rgba(7, 11, 20, 0.52);
      border: 1px solid rgba(255,255,255,0.08);
      color: white;
    }

    .transition-eyebrow {
      margin: 0 0 1rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      font-size: 0.8rem;
      color: rgba(191, 219, 254, 0.82);
    }

    .transition-card h1 {
      margin: 0;
      font-size: clamp(2.8rem, 6vw, 4.8rem);
      line-height: 0.96;
      letter-spacing: -0.05em;
    }

    .transition-copy {
      margin: 1.25rem 0 0;
      line-height: 1.8;
      color: rgba(226, 232, 240, 0.84);
    }

    .transition-button {
      margin-top: 1.5rem;
      border: 0;
      border-radius: 999px;
      padding: 0.85rem 1.3rem;
      background: white;
      color: #0f172a;
      font-weight: 700;
    }
---

## はじめに

自分用メモ。

ページ遷移っぽい演出は、画面を覆う動きと中身の動きを分けて考えた方が重たくなりにくい。切り替わった感覚は欲しいけれど、内容は読めるままにしておきたい。

このサンプルでは、先にマスクで空気を変えて、そのあとで中身を入れ替える順番にしている。全部を同時に処理しない方が調整しやすい。

## 組み合わせのポイント

- マスクは画面全体の切り替え役として使い、最初に雰囲気を変える
- コンテンツは少し遅れて動かし、何が切り替わったのかを目で追いやすくする
- 入る動きと抜ける動きの速度を同じにせず、流れにメリハリをつける
- カード部分の余白や背景透過を整えて、切り替え中も情報が読める状態を保つ
- 演出の長さは印象より操作感を優先し、待たされている感じを出さない

## 実装のポイント

- マスク用レイヤーとコンテンツ用レイヤーを分けて、順番を別々に制御する
- 全画面の変化は clip-path や transform で組み、面の移動として見せる
- コンテンツ側は opacity と translate を中心にして、読める状態を保ったまま動かす
- ひとつの timeline に全部を詰め込みすぎず、役割単位で区間を分けて調整する

## まとめ

覚えておくのは、ページ遷移風の演出は派手さより順番整理。何が先で何が後かを分けるだけでも、かなり自然に見えやすい。

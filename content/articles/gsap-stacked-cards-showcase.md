---
title: GSAPで作るスタックカードのスクロールショーケース
description: ScrollTriggerでカードを重ねながら切り替えていく、縦スクロール型のショーケース演出です。
category: スクロール連動
tags:
  - GSAP
  - ScrollTrigger
  - JavaScript
  - CSS
  - アニメーション
  - スクロール
date: 2026年5月21日
publishedAt: 2026-05-21
readTime: 6分
viewer: playground
thumbnail: runtime
layout: tutorial
files:
  - name: index.html
    language: html
    content: |
      <main class="stacked-showcase">
        <section class="stacked-hero">
          <p class="eyebrow">ScrollTrigger / Timeline</p>
          <h1>STACKED<br />SHOWCASE</h1>
          <p class="lead">
            複数カードを積層しながら、スクロールに合わせて主役を切り替えていく構成です。
          </p>
        </section>

        <section class="stacked-stage">
          <div class="stage-copy">
            <span class="stage-kicker">Feature Panels</span>
            <h2>縦スクロールの移動量を、そのまま視線誘導に変える</h2>
          </div>

          <div class="stacked-cards">
            <article class="stack-card card-a">
              <span class="card-index">01</span>
              <h3>Launch Story</h3>
              <p>大胆な見出しと落ち着いた補足文で、最初の一枚を基準面にします。</p>
            </article>

            <article class="stack-card card-b">
              <span class="card-index">02</span>
              <h3>Motion Layer</h3>
              <p>次のカードは少し縮小した状態から入り、切り替わりを明確に見せます。</p>
            </article>

            <article class="stack-card card-c">
              <span class="card-index">03</span>
              <h3>Final Focus</h3>
              <p>最後のカードで配色を反転させ、到達点をはっきり印象付けます。</p>
            </article>
          </div>

          <div class="progress-rail" aria-hidden="true">
            <span class="progress-fill"></span>
          </div>
        </section>

        <section class="stacked-outro">
          <p>
            ScrollTrigger の pin と scrub を組み合わせると、セクション遷移そのものを演出にできます。
          </p>
        </section>
      </main>
  - name: styles.css
    language: css
    content: |
      :root {
        color-scheme: dark;
        --bg: #06131f;
        --panel: rgba(9, 18, 32, 0.76);
        --line: rgba(148, 163, 184, 0.22);
        --text: #e5eef8;
        --muted: rgba(226, 232, 240, 0.72);
        --accent: #67e8f9;
        --accent-strong: #22d3ee;
      }

      body {
        background:
          radial-gradient(circle at top, rgba(34, 211, 238, 0.14), transparent 26%),
          linear-gradient(180deg, #020617 0%, #06131f 100%);
        color: var(--text);
      }

      .stacked-showcase {
        min-height: 260vh;
      }

      .stacked-hero,
      .stacked-outro {
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 8vw;
        text-align: center;
      }

      .stacked-hero h1 {
        margin: 0.4rem 0 0;
        font-size: clamp(3rem, 10vw, 8rem);
        line-height: 0.88;
        letter-spacing: -0.08em;
      }

      .eyebrow,
      .stage-kicker {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.78rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: rgba(165, 243, 252, 0.78);
      }

      .lead,
      .stacked-outro p {
        max-width: 42rem;
        margin: 1.3rem auto 0;
        color: var(--muted);
        line-height: 1.8;
        font-size: clamp(1rem, 2vw, 1.18rem);
      }

      .stacked-stage {
        position: relative;
        min-height: 100vh;
        padding: 8vh 7vw;
        display: grid;
        align-items: center;
        grid-template-columns: minmax(260px, 0.9fr) minmax(320px, 1.1fr);
        gap: 3rem;
      }

      .stage-copy h2 {
        margin-top: 1rem;
        font-size: clamp(2rem, 4.8vw, 4.5rem);
        line-height: 0.98;
        letter-spacing: -0.05em;
      }

      .stacked-cards {
        position: relative;
        min-height: 520px;
      }

      .stack-card {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 2rem;
        border: 1px solid var(--line);
        border-radius: 32px;
        overflow: hidden;
        backdrop-filter: blur(14px);
        box-shadow: 0 24px 80px rgba(2, 6, 23, 0.36);
        transform-origin: 50% 100%;
      }

      .stack-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(148, 163, 184, 0.02), rgba(15, 23, 42, 0.5));
      }

      .card-a {
        background: linear-gradient(160deg, rgba(14, 116, 144, 0.56), rgba(8, 47, 73, 0.9));
      }

      .card-b {
        background: linear-gradient(160deg, rgba(22, 78, 99, 0.6), rgba(17, 24, 39, 0.92));
      }

      .card-c {
        background: linear-gradient(160deg, rgba(226, 232, 240, 0.96), rgba(191, 219, 254, 0.92));
        color: #082032;
      }

      .card-index,
      .stack-card h3,
      .stack-card p {
        position: relative;
        z-index: 1;
      }

      .card-index {
        font-size: 0.8rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        opacity: 0.8;
      }

      .stack-card h3 {
        margin-top: 0.8rem;
        font-size: clamp(2rem, 4vw, 3rem);
        line-height: 1;
      }

      .stack-card p {
        max-width: 24rem;
        margin-top: 0.9rem;
        line-height: 1.75;
      }

      .progress-rail {
        position: absolute;
        left: 7vw;
        right: 7vw;
        bottom: 7vh;
        height: 2px;
        background: rgba(148, 163, 184, 0.18);
        overflow: hidden;
      }

      .progress-fill {
        display: block;
        width: 100%;
        height: 100%;
        transform-origin: 0% 50%;
        transform: scaleX(0);
        background: linear-gradient(90deg, var(--accent), var(--accent-strong));
      }

      @media (max-width: 900px) {
        .stacked-stage {
          grid-template-columns: 1fr;
        }

        .stacked-cards {
          min-height: 420px;
        }

        .progress-rail {
          position: static;
          margin-top: 1rem;
        }
      }
  - name: script.js
    language: js
    content: |
      gsap.registerPlugin(ScrollTrigger)

      const cards = gsap.utils.toArray('.stack-card')
      const progressFill = document.querySelector('.progress-fill')
      const stage = document.querySelector('.stacked-stage')

      gsap.set(cards, {
        yPercent: index => index * 8,
        scale: index => 1 - index * 0.05,
        rotate: index => index * -2,
        transformOrigin: '50% 100%',
      })

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      })

      timeline
        .to(cards[0], { yPercent: -18, scale: 0.88, rotate: -5 }, 0)
        .to(cards[1], { yPercent: 0, scale: 1, rotate: 0 }, 0)
        .to(cards[2], { yPercent: 16, scale: 0.92, rotate: -3 }, 0)
        .to(cards[1], { yPercent: -16, scale: 0.9, rotate: -4 }, 1)
        .to(cards[2], { yPercent: 0, scale: 1, rotate: 0 }, 1)
        .to(progressFill, { scaleX: 1, ease: 'none' }, 0)

      gsap.from('.stage-copy > *', {
        opacity: 0,
        y: 32,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stacked-hero',
          start: 'bottom 70%',
        },
      })
---

## はじめに

`gsap-skills` の考え方に沿って、複数ステップの切り替えは単発の `to()` を並べるより `timeline` でまとめた方が調整しやすくなります。このサンプルでは、カード3枚をひとつの流れとして管理し、スクロール位置をそのまま進行バーに変えています。

## 実装のポイント

- スクロール全体は `ScrollTrigger` を付けた `timeline` で制御する
- 各カードは `yPercent` と `scale` を中心に動かし、レイアウトの再計算を増やさない
- `pin` と `scrub` で、読ませたい区間を一度止めてから段階的に切り替える
- 進捗表示も同じタイムラインに載せて、状態の同期を崩さない

## 使いどころ

機能紹介、料金プランの違い、制作フローの可視化のように、「縦に読む」より「順番に見せる」方が向いている場面で使いやすい構成です。カード枚数を増やす場合も、同じタイムラインへ区間を足していけば管理できます。
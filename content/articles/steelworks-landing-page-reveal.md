---
title: GSAPで組む5枚構成のランディングページリビール
description: プリローダー、カード整列、中央ビジュアル拡張の流れを記事化しました。
category: ページ遷移・画面切り替え系
tags:
  - GSAP
  - CSS
  - JavaScript
  - アニメーション
  - トランジション
  - ストーリーテリング
date: 2026年5月20日
publishedAt: 2026-05-20
readTime: 8分
viewer: playground
thumbnail: runtime
layout: gallery
files:
  - name: index.html
    language: html
    content: |
      <div class="preloader-overlay">
        <div class="preloader"></div>
      </div>

      <nav>
        <div class="nav-logo">
          <a href="#">JUNK BRANDING</a>
        </div>

        <div class="nav-items">
        　<a href="#">About</a>
          <a href="#">Work</a>
          <a href="#">Contact</a>

        </div>
      </nav>

      <section class="hero">
        <div class="intro-img"><img src="/images/steelworks-free/img-1.svg" alt="" /></div>
        <div class="intro-img"><img src="/images/steelworks-free/img-2.svg" alt="" /></div>
        <div class="intro-img hero-img"><img src="/images/steelworks-free/img-3.svg" alt="" /></div>
        <div class="intro-img"><img src="/images/steelworks-free/img-4.svg" alt="" /></div>
        <div class="intro-img"><img src="/images/steelworks-free/img-5.svg" alt="" /></div>

        <div class="hero-content">
          <div class="hero-header">
            <h1>
              JUNKBRANDING is a highly skilled web creator based in Ibaraki. We look forward to hearing from you.
            </h1>
          </div>

          <div class="hero-social">
            <p>Say Hello</p>
            <a href="#">hello@junkbranding.com</a>
          </div>
        </div>
      </section>
  - name: styles.css
    language: css
    content: |
      @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap");

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "DM Sans", sans-serif;
      }

      h1 {
        color: #fff;
        font-size: 3rem;
        font-weight: 400;
        letter-spacing: -1%;
        line-height: 1.1;
      }

      a,
      p {
        color: #fff;
        text-decoration: none;
        font-weight: 400;
        letter-spacing: -1%;
        display: block;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      nav {
        position: fixed;
        top: 0;
        width: 100%;
        padding: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        z-index: 2;
      }

      .nav-items {
        display: flex;
        gap: 4rem;
      }

      .preloader-overlay {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100svh;
        background-color: #0f0f0f;
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        z-index: 10;
      }

      .preloader-overlay .preloader {
        position: absolute;
        top: 0;
        width: 100%;
        height: 0.5rem;
        background-color: #fff;
        transform: scaleX(0);
        transform-origin: left;
        will-change: transform;
      }

      .hero {
        position: relative;
        width: 100%;
        height: 100svh;
        overflow: hidden;
      }

      .intro-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 0.5rem;
        transform-origin: center center;
        will-change: transform;
      }

      .hero-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100svh;
        padding: 15svh 2rem 15svh 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 2;
      }

      .hero-header {
        width: 60%;
      }

      nav a,
      .hero-header h1,
      .hero-social p,
      .hero-social a {
        opacity: 0;
        transform: translateY(40px);
      }

      @media (max-width: 1000px) {
        .nav-items {
          flex-direction: column;
          align-items: flex-end;
          gap: 0;
        }

        .hero-content {
          padding: 15svh 2rem 2rem 2rem;
        }

        .hero-header {
          width: 100%;
        }
      }
  - name: script.js
    language: javascript
    content: |
      gsap.registerPlugin(CustomEase, SplitText)

      CustomEase.create('hop', '0.9, 0, 0.1, 1')
      CustomEase.create('glide', '0.8, 0, 0.2, 1')

      document.addEventListener('DOMContentLoaded', () => {
        document.fonts.ready.then(() => {
          const introImages = document.querySelectorAll('.intro-img')
          const introImgScale = 0.2
          const introImgGap = 40
          const introImgRotations = [-15, 5, -7.5, 10, -2.5]

          const introImgScaledWidth = window.innerWidth * introImgScale
          const introImgRowWidth = introImgScaledWidth * 5 + introImgGap * 4
          const introImgCenteredX = (window.innerWidth - introImgRowWidth) / 2
          const introImgOffScreenX = introImgCenteredX - window.innerWidth * 1.3

          introImages.forEach((img, i) => {
            const centeredX =
              introImgCenteredX +
              i * (introImgScaledWidth + introImgGap) +
              introImgScaledWidth / 2 -
              window.innerWidth / 2

            const offScreenX =
              introImgOffScreenX +
              i * (introImgScaledWidth + introImgGap) +
              introImgScaledWidth / 2 -
              window.innerWidth / 2

            gsap.set(img, {
              scale: introImgScale,
              x: offScreenX,
              rotation: introImgRotations[i],
              borderRadius: '2.5rem',
            })

            img.dataset.centeredX = centeredX
          })

          const tl = gsap.timeline({ delay: 1 })

          tl.to('.preloader', {
            scaleX: 1,
            duration: 1.5,
            ease: 'glide',
            onComplete: () => {
              gsap.set('.preloader', { transformOrigin: 'right' })
            },
          })

          tl.to('.preloader', {
            scaleX: 0,
            duration: 1.25,
            ease: 'hop',
          })

          tl.to(
            '.preloader-overlay',
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
              duration: 1,
              ease: 'hop',
            },
            '<0.75',
          )

          introImages.forEach(img => {
            tl.to(
              img,
              {
                x: parseFloat(img.dataset.centeredX),
                duration: 1.5,
                ease: 'glide',
              },
              '<0.025',
            )
          })

          tl.to(
            '.intro-img:nth-of-type(1), .intro-img:nth-of-type(2)',
            { x: '-100vw', duration: 1.5, ease: 'glide' },
            'spread',
          )
          tl.to(
            '.intro-img:nth-of-type(4), .intro-img:nth-of-type(5)',
            { x: '100vw', duration: 1.5, ease: 'glide' },
            'spread',
          )

          tl.to(
            '.hero-img',
            {
              scale: 1,
              x: 0,
              rotation: 0,
              borderRadius: 0,
              duration: 1.5,
              ease: 'glide',
            },
            '<',
          )

          tl.to(
            'nav a, .hero-header h1, .hero-social p, .hero-social a',
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.08,
              ease: 'power3.out',
            },
            '<0.65',
          )
        })
      })
---

## はじめに

今回の自分用メモ。

このコードで見ておきたいのは、5枚の画像をただ並べることではなく、全画面の画像レイヤーをあとから「並んで見える状態」に変換している点です。最終的には中央の1枚だけを全面へ拡張して終わるので、レイアウトというよりタイムライン設計のサンプルとして覚えておく。

## 構成のポイント

- HTML は全画面レイヤーとして5枚の `.intro-img` を重ねて置く
- CSS は固定ナビゲーション、プリローダー、全面配置の土台を作る
- JavaScript は GSAP で初期位置、整列、左右退避、中央拡大を時系列で制御する

最初から横並び DOM にしていないのが重要。全要素を全画面で重ねておいて、`gsap.set()` で scale と x を与えて整列状態を作るから、そのまま中央1枚の全画面復帰までつなげやすい。

## GSAP タイムラインの流れ

流れは以下の順番で整理されている。

1. プリローダーを伸ばしてから閉じる
2. 5枚の画像を画面外から中央へ集める
3. 左右4枚を外へ逃がす
4. 真ん中の `.hero-img` だけを scale `1`、rotation `0`、borderRadius `0` に戻す
5. 最後に nav とテキストを順番にフェードアップさせる

要するに、画像演出を先に終わらせてから文字を出している。この順番にしておくと、最初の視線が分散しにくい。

## 画像リビールで気をつける点

- 各カードの開始位置と到着位置を別々に持っておく
- 回転角を少しずつ変えて、整列前の束感を出す
- 文字要素は最後に出して、演出の焦点を分散させない
- モバイルでは余白と画像幅がすぐ破綻するので、縮尺とギャップを早めに見直す

補足メモとして、`introImgScale` と `introImgGap` はかなり見た目を支配する。ここが合っていないと、整列の気持ちよさがすぐ崩れる。とくに画面幅ベースで計算しているので、モバイル確認は必須。

あと、重要なのはテキストの出現タイミングで、行分割そのものは別手段でも置き換えられる。

## まとめ

今回のコードで覚えておくことは3つだけでいい。

- 全画面レイヤーをあとから整列状態に見せる
- 左右を逃がして中央だけ残す
- テキストは最後に出して演出の焦点を守る

ブランド系の LP で、最初の数秒だけ強く見せたいときの組み立てとして再利用しやすい。

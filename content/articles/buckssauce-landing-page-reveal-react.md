---
title: Buckssauce Landing Page Reveal React
description: 円形clip-pathの多層カラーリビールからフード画像を放射状に散らし、ズーム退場でSplitTextヒーローへ繋ぐランディング導入をReactへ移植しました。
category: ローディング系
tags:
  - GSAP
  - SplitText
  - CSS
  - JavaScript
  - プリローダー
  - アニメーション
date: 2026年7月10日
publishedAt: 2026-07-10
readTime: 8分
viewer: playground
thumbnail: runtime
layout: gallery
files:
  - name: Component.jsx
    language: jsx
    content: |
      // data: SVGで自己完結させるフード画像（ローカル画像に依存しない）
      const toDataImage = markup =>
        `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markup)}`

      const BURGER = toDataImage(`
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
          <rect x='40' y='120' width='120' height='30' rx='15' fill='#e2a04a'/>
          <rect x='36' y='104' width='128' height='20' rx='8' fill='#7a4a2b'/>
          <path d='M34 104 q66 18 132 0 q-4 12 -14 12 H48 q-10 0 -14 -12z' fill='#e23b2e'/>
          <path d='M32 92 q68 20 136 0 q-6 14 -18 14 H50 q-12 0 -18 -14z' fill='#6cbf3f'/>
          <path d='M40 92 q60 -60 120 0z' fill='#f2c078'/>
          <circle cx='84' cy='60' r='3.5' fill='#fff'/>
          <circle cx='112' cy='52' r='3.5' fill='#fff'/>
          <circle cx='132' cy='66' r='3.5' fill='#fff'/>
        </svg>
      `)

      const FRIES = toDataImage(`
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
          <g fill='#f2b705'>
            <rect x='70' y='40' width='12' height='90' rx='4'/>
            <rect x='88' y='30' width='12' height='100' rx='4'/>
            <rect x='106' y='38' width='12' height='92' rx='4'/>
            <rect x='124' y='48' width='12' height='82' rx='4'/>
          </g>
          <path d='M56 110 h88 l-10 60 a6 6 0 0 1 -6 5 H72 a6 6 0 0 1 -6 -5z' fill='#e01b22'/>
          <rect x='52' y='104' width='96' height='16' rx='6' fill='#f75828'/>
        </svg>
      `)

      const SHAKE = toDataImage(`
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
          <path d='M66 88 h68 l-8 78 a8 8 0 0 1 -8 7 H82 a8 8 0 0 1 -8 -7z' fill='#c49241'/>
          <rect x='60' y='78' width='80' height='16' rx='8' fill='#a9762f'/>
          <ellipse cx='100' cy='66' rx='32' ry='16' fill='#f7efe4'/>
          <path d='M74 78 q26 -30 52 0z' fill='#f7efe4'/>
          <rect x='118' y='28' width='9' height='46' rx='4' fill='#7a4a2b' transform='rotate(18 122 51)'/>
        </svg>
      `)

      const TACO = toDataImage(`
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
          <path d='M30 140 a70 70 0 0 1 140 0z' fill='#f2b705'/>
          <path d='M44 138 a56 56 0 0 1 112 0z' fill='#6cbf3f'/>
          <path d='M56 138 a44 44 0 0 1 88 0z' fill='#e23b2e'/>
          <path d='M70 138 a30 30 0 0 1 60 0z' fill='#7a4a2b'/>
          <path d='M30 140 h140 a70 70 0 0 0 -140 0z' fill='#f2c85a'/>
          <rect x='30' y='138' width='140' height='10' rx='5' fill='#d98f34'/>
        </svg>
      `)

      const PIZZA = toDataImage(`
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
          <circle cx='100' cy='100' r='84' fill='#e0a04a'/>
          <circle cx='100' cy='100' r='70' fill='#f5d9a0'/>
          <g fill='#d1382c'>
            <circle cx='78' cy='70' r='11'/>
            <circle cx='128' cy='84' r='11'/>
            <circle cx='96' cy='116' r='11'/>
            <circle cx='72' cy='128' r='9'/>
            <circle cx='138' cy='128' r='9'/>
          </g>
          <g fill='#6cbf3f'>
            <circle cx='110' cy='60' r='4'/>
            <circle cx='60' cy='96' r='4'/>
            <circle cx='120' cy='128' r='4'/>
          </g>
        </svg>
      `)

      const LOGO = toDataImage(`
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
          <circle cx='100' cy='100' r='92' fill='#f5e1bf'/>
          <circle cx='100' cy='100' r='78' fill='none' stroke='#fff' stroke-width='8'/>
          <ellipse cx='74' cy='74' rx='16' ry='22' fill='#fff'/>
          <rect x='70' y='92' width='8' height='58' rx='4' fill='#fff'/>
          <g fill='#fff'>
            <rect x='114' y='50' width='5' height='34' rx='2'/>
            <rect x='123' y='50' width='5' height='34' rx='2'/>
            <rect x='132' y='50' width='5' height='34' rx='2'/>
            <path d='M112 82 h28 v4 q0 8 -8 10 l2 54 h-16 l2 -54 q-8 -2 -8 -10z'/>
          </g>
        </svg>
      `)

      const PRELOADER_ITEMS = [BURGER, FRIES, SHAKE, TACO]

      const NAV_LINKS = ['Menu', 'Locations', 'Our Story', 'Reserve', 'FAQ', 'Order']

      // animation: プリローダーからヒーローまでを1本のtimelineで制御する
      function Demo() {
        const rootRef = React.useRef(null)

        React.useEffect(() => {
          gsap.registerPlugin(SplitText)

          const root = rootRef.current
          if (!root) return

          let context
          let cancelled = false
          const splits = []

          document.fonts.ready.then(() => {
            if (cancelled || !rootRef.current) return

            context = gsap.context(() => {
              // 分割: DOM文字列をSplitTextでアニメ可能な単位へ割る
              const navLinks = SplitText.create('.nav-items a', {
                type: 'words',
                mask: 'words',
                wordsClass: 'nav-word',
              })

              const heading = SplitText.create('.hero-header h1', {
                type: 'lines, words, chars',
                charsClass: 'char',
                wordsClass: 'word',
              })

              const footerText = SplitText.create('.hero-footer p', {
                type: 'lines',
                mask: 'lines',
                linesClass: 'footer-line',
              })

              splits.push(navLinks, heading, footerText)

              // 初期状態: ヒーロー側の要素を隠しておく
              gsap.set('.nav-logo img', { scale: 0 })
              gsap.set(navLinks.words, { yPercent: 100 })
              gsap.set(heading.chars, { y: 50, opacity: 0, scale: 0.5 })
              gsap.set(footerText.lines, { yPercent: 100 })

              // data: 各アイテムの散開先と、ズーム退場先を定義する
              const itemTargets = [
                { x: '-20vw', y: '-30vh', rotation: -20 },
                { x: '25vw', y: '-20vh', rotation: 15 },
                { x: '-32vw', y: '30vh', rotation: 12 },
                { x: '15vw', y: '25vh', rotation: -15 },
              ]

              const EXIT_DISTANCE = 3.5
              const itemExits = itemTargets.map(target => ({
                x: parseFloat(target.x) * EXIT_DISTANCE + 'vw',
                y: parseFloat(target.y) * EXIT_DISTANCE + 'vh',
                rotation: target.rotation * 2.5,
              }))

              const items = gsap.utils.toArray('.item')
              const floatingTweens = []

              const tl = gsap.timeline({ delay: 0.5 })

              // 1) 円形clip-pathを多層で開き、カラーが順に切り替わる
              tl.to('.preloader-revealer', {
                clipPath: 'circle(100% at 50% 50%)',
                duration: 1,
                stagger: 0.25,
                ease: 'power2.inOut',
              })

              tl.set('.preloader-revealer', { display: 'none' })

              // 2) フードアイテムを中央から放射状に散らし、ふわふわ浮遊させる
              items.forEach((item, i) => {
                const target = itemTargets[i]
                const image = item.querySelector('img')

                tl.to(
                  item,
                  {
                    x: target.x,
                    y: target.y,
                    scale: 1,
                    rotation: target.rotation,
                    duration: 1,
                    ease: 'power3.out',
                    onStart: () => {
                      floatingTweens[i] = gsap.to(image, {
                        y: gsap.utils.random(-15, -25),
                        duration: gsap.utils.random(1.5, 2.5),
                        ease: 'sine.inOut',
                        yoyo: true,
                        repeat: -1,
                        delay: gsap.utils.random(0, 0.5),
                      })
                    },
                  },
                  i === 0 ? '-=0.55' : '<0.075'
                )
              })

              tl.to(
                '.preloader-logo',
                { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
                '<'
              )

              tl.set('.preloader-bg', { display: 'none' })
              tl.to({}, { duration: 1 })
              tl.add(() => floatingTweens.forEach(tween => tween && tween.kill()))

              // 3) アイテムを外側へズーム退場させ、ロゴを上へ抜く
              items.forEach((item, i) => {
                const exit = itemExits[i]

                tl.to(
                  item,
                  {
                    x: exit.x,
                    y: exit.y,
                    scale: 2.5,
                    rotation: exit.rotation,
                    duration: 0.75,
                    ease: 'power2.in',
                  },
                  i === 0 ? '>' : '<0.075'
                )
              })

              tl.to(
                '.preloader-logo',
                { y: '-120vh', scale: 2.5, duration: 0.75, ease: 'power2.in' },
                '<'
              )

              // 4) ヒーローのナビ・見出し・フッター・メインビジュアルを開放する
              tl.to(
                '.nav-logo img',
                { scale: 1, duration: 0.75, ease: 'power3.out' },
                '-=0.4'
              )
              tl.to(
                navLinks.words,
                { yPercent: 0, duration: 0.75, stagger: 0.05, ease: 'power3.out' },
                '<0.1'
              )
              tl.to(
                heading.chars,
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 1.5,
                  stagger: 0.015,
                  ease: 'elastic.out(0.75, 0.25)',
                },
                '<0.15'
              )
              tl.to(
                footerText.lines,
                { yPercent: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' },
                '<0.2'
              )
              tl.to('.hero-img-bg', { scale: 1, duration: 1, ease: 'power3.out' }, '<0.1')
              tl.to('.hero-img img', { y: '-50%', duration: 1, ease: 'power3.out' }, '<0.3')

              tl.set('.preloader', { display: 'none' })
            }, rootRef)
          })

          // cleanup: SplitTextを戻し、gsap.contextで生成物をまとめて破棄する
          return () => {
            cancelled = true
            splits.forEach(split => split && split.revert())
            if (context) context.revert()
          }
        }, [])

        return (
          <div ref={rootRef} className="reveal-root">
            <div className="preloader">
              <div className="preloader-bg"></div>
              <div className="preloader-revealer preloader-revealer-1"></div>
              <div className="preloader-revealer preloader-revealer-2"></div>
              <div className="preloader-revealer preloader-revealer-3"></div>
              <div className="preloader-revealer preloader-revealer-4"></div>

              <div className="items">
                {PRELOADER_ITEMS.map((src, i) => (
                  <div key={i} className={`item item-${i + 1}`}>
                    <img src={src} alt="" />
                  </div>
                ))}
              </div>

              <div className="preloader-logo">
                <img src={LOGO} alt="" />
              </div>
            </div>

            <nav>
              <div className="nav-logo">
                <img src={LOGO} alt="" />
              </div>
              <div className="nav-items">
                {NAV_LINKS.map(label => (
                  <a key={label} href="#">
                    {label}
                  </a>
                ))}
              </div>
            </nav>

            <section className="hero">
              <div className="hero-header">
                <h1>The table you will keep coming back to every week</h1>
              </div>

              <div className="hero-img">
                <div className="hero-img-bg"></div>
                <img src={PIZZA} alt="" />
              </div>

              <div className="hero-footer">
                <p>Locally Sourced</p>
                <p>Always Welcome</p>
              </div>
            </section>
          </div>
        )
      }
  - name: styles.css
    language: css
    content: |
      @import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;800&family=Instrument+Sans:wght@500&display=swap");

      :root {
        --base-100: #f5e1bf;
        --base-200: #c49241;
        --base-300: #f75828;
        --base-400: #e01b22;
        --base-500: #17100a;
      }

      .reveal-root {
        position: relative;
        width: 100%;
        min-height: 100svh;
        overflow: hidden;
        background-color: var(--base-500);
      }

      .reveal-root h1,
      .reveal-root a,
      .reveal-root p {
        color: var(--base-100);
        text-transform: uppercase;
        line-height: 0.85;
      }

      .reveal-root h1 {
        font-family: "Barlow Condensed", sans-serif;
        font-size: clamp(3rem, 6vw, 9rem);
        font-weight: 800;
      }

      .reveal-root a {
        font-family: "Barlow Condensed", sans-serif;
        font-weight: 600;
        font-size: 1.5rem;
        text-decoration: none;
      }

      .reveal-root p {
        font-family: "Instrument Sans", sans-serif;
        font-weight: 500;
      }

      .preloader {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100svh;
        color: var(--base-100);
        overflow: hidden;
        z-index: 2;
      }

      .preloader-bg,
      .preloader-revealer {
        position: absolute;
        width: 100%;
        height: 100svh;
        transform-origin: center;
      }

      .preloader-bg {
        background-color: var(--base-500);
      }

      .preloader-revealer {
        clip-path: circle(0% at 50% 50%);
        will-change: clip-path;
      }

      .preloader-revealer-1 { background-color: var(--base-200); }
      .preloader-revealer-2 { background-color: var(--base-300); }
      .preloader-revealer-3 { background-color: var(--base-400); }
      .preloader-revealer-4 { background-color: var(--base-500); }

      .items {
        position: absolute;
        width: 100%;
        height: 100svh;
      }

      .item {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 15vw;
        aspect-ratio: 1 / 1;
        transform: translate(-50%, -50%) scale(0);
        will-change: transform;
      }

      .item img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }

      .preloader-logo {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10vw;
        min-width: 96px;
        transform: translate(-50%, -50%) scale(0.5);
        opacity: 0;
        will-change: transform, opacity;
      }

      .preloader-logo img {
        width: 100%;
        height: auto;
      }

      nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        z-index: 1;
      }

      .nav-logo img {
        width: 5rem;
        transform-origin: top left;
      }

      .nav-items {
        display: flex;
        gap: 2rem;
      }

      .hero {
        position: relative;
        width: 100%;
        height: 100svh;
        background-color: var(--base-500);
        overflow: hidden;
        z-index: 0;
      }

      .hero-header {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 55%;
        text-align: center;
      }

      .hero-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        z-index: 0;
      }

      .hero-img {
        position: absolute;
        left: 50%;
        bottom: -15%;
        transform: translateX(-50%);
        width: 35%;
        min-width: 250px;
        aspect-ratio: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .hero-img-bg {
        width: 100%;
        aspect-ratio: 1;
        background-color: var(--base-300);
        border-radius: 100%;
        transform-origin: center;
        transform: scale(0);
      }

      .hero-img img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 50%) rotate(15deg);
        transform-origin: center;
        width: 130%;
      }

      .nav-word,
      .footer-line,
      .hero-header h1 .char,
      .hero-header h1 .word {
        display: inline-block;
        will-change: transform;
      }

      @media (max-width: 1000px) {
        .nav-items {
          flex-direction: column;
          gap: 0;
          text-align: right;
        }

        .hero-header {
          width: calc(100% - 4rem);
        }

        .hero-img {
          width: 80%;
          bottom: -5%;
        }
      }
---

## 📝 はじめに

このアニメーションは、ページを開いた瞬間の「プリローダーからヒーローへの導入」を扱います。ローディングを単なる待ち時間で終わらせず、円形のカラーリビールとフードアイテムの動きで、ブランドの世界観を一気に見せる場面で役立ちます。

この記事では、見た目の派手さよりも、**どの要素をどの順番で動かすのか**、**なぜプリローダーとヒーローをレイヤーで分けるのか**、**Reactでどうやって1本のGSAP timelineを安全に片付けるのか**を重視します。元は素のHTML + module scriptだった実装を、責務を分けたReactコンポーネントへ移植しています。

## 🎯 今回作るもの

今回作るのは、ページ全体の完成演出ではなく、**開いた瞬間だけを担当する導入リビール**です。

* **主役:** 円形clip-pathの多層カラーリビール + 放射状に散るフードアイテム
* **トリガー:** page load（`document.fonts.ready` を待って開始）
* **対象要素:** リビール面 / フード画像4枚 / ロゴ / ヒーロー見出し（SplitText）
* **再利用先:** 飲食・物販系のLP、キャンペーンページ、ブランドサイトのオープニング

## 🧩 コンポーネント設計

1つの `Demo` に処理を詰め込みますが、頭の中では役割を分けて考えます。

* **Demo**

  * サンプル全体の親コンポーネント
  * `rootRef` を持ち、アニメーションの影響範囲をこのツリー内に閉じる

* **View / DOM**

  * プリローダー層（リビール面・アイテム・ロゴ）とヒーロー層（nav・見出し・フッター・メインビジュアル）を別レイヤーで組む
  * フード画像は `data:` SVGで自己完結させ、外部画像に依存しない

* **Animation**

  * `document.fonts.ready` を待ってから1本の `gsap.timeline()` を構築
  * SplitTextで文字・単語・行を分割し、順番に開放する

* **Style**

  * `z-index` でプリローダー(2) > nav(1) > hero(0) の重なりを固定
  * `clip-path: circle(...)` の初期状態や、各要素の初期 `scale` / `opacity` を用意

## 🛠️ 実装のポイント

* **DOMとCSSの設計意図**

  * プリローダーとヒーローを重ねて置き、リビール完了後に `display: none` でプリローダーを畳む
  * リビール面は4枚重ね、`--base-200〜500` の色を層ごとに変えて、円が開くたびに色が切り替わって見えるようにする
  * フード画像は `object-fit: contain` にして、SVGの余白を保ったまま散らす

* **GSAP / SplitText の責務**

  * GSAPは時間制御・順番・stagger・退場のイージングに専念する
  * SplitTextは「文字列をアニメ可能な単位へ割る」ことだけに使い、`nav` は words、`h1` は chars、`footer` は lines と、粒度を要素ごとに変える
  * `mask` オプションで、はみ出した文字を親側でクリップする

* **タイムラインとパラメータ**

  * `stagger: 0.25`（リビール面）で円が次々に開く間隔を作る
  * `'-=0.55'` や `'<0.075'` の相対ラベルで、アイテムの散開を少しずつ重ねる
  * 退場は `scale: 2.5` + `power2.in` で、画面外へ吸い込むように加速させる
  * 見出しは `elastic.out(0.75, 0.25)` で、着地に弾みを持たせる

* **Reactでのクリーンアップ**

  * `rootRef` で影響範囲を限定し、`gsap.context(fn, rootRef)` で生成物をまとめる
  * アンマウント時に `context.revert()` で全アニメーションを解除する
  * SplitTextは `context.revert()` では戻らないので、`splits` に貯めて個別に `split.revert()` する
  * `document.fonts.ready` の解決前にアンマウントされても壊れないよう、`cancelled` フラグでガードする

## 💡 使いどころとカスタマイズ

* **最適なユースケース**

  * 飲食・EC・キャンペーンLPのオープニング
  * ブランドロゴを主役にしたスプラッシュ画面
  * 「読み込み → 世界観提示 → ファーストビュー」を一続きで見せたい場面

* **調整ダイヤル**

  * `itemTargets` の `x` / `y` / `rotation` を変えると、アイテムの散らばり方が変わります。
  * `EXIT_DISTANCE` を大きくすると、退場時により遠くへ吹き飛びます。
  * リビール面の `stagger` を小さくすると、色の切り替えが素早くなります。
  * 見出しの `stagger` を大きくすると、文字が1つずつ立ち上がる印象が強くなります。
  * 浮遊 tween の `duration` と `y` を変えると、待機中のふわふわ感を調整できます。

## 🔧 発展させるなら

この導入部を土台に、段階的に足していけます。

1. まずはプリローダーの円形リビールとロゴ表示だけを動かす
2. 次にフードアイテムの散開と浮遊を足す
3. アイテムのズーム退場とヒーロー開放をつなぐ
4. SplitTextの粒度（words / chars / lines）を要素ごとに調整する
5. 必要ならLenisやScrollTriggerを足して、ヒーロー以降のスクロール演出へ接続する

最初から全部を入れず、レイヤーと責務を分けたまま1つずつ足すことで、壊れにくく再利用しやすい導入リビールになります。

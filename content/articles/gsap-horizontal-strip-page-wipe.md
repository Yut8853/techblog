---
title: GSAPで作る横帯ワイプのページ切り替え
description: 4本の横帯を時間差で伸縮させ、コンテンツの更新を自然に隠すページ遷移パーツを作ります。
category: ページ遷移・画面切り替え系
tags:
  - GSAP
  - CSS
  - JavaScript
  - アニメーション
  - トランジション
  - UX
date: 2026年8月2日
publishedAt: 2026-08-02
readTime: 6分
viewer: playground
thumbnail: runtime
layout: default
files:
  - name: Component.jsx
    language: jsx
    content: |
      const PAGES = [
        { name: 'Genesis', tone: 'genesis' },
        { name: 'Threshold', tone: 'threshold' },
        { name: 'Sanctum', tone: 'sanctum' },
      ]

      const ROW_COUNT = 4

      function useStripTransition(rootRef, onCovered) {
        const timelineRef = React.useRef(null)

        React.useEffect(() => {
          const context = gsap.context(() => {
            gsap.set('.wipe-strip', {
              scaleX: 0,
              transformOrigin: 'left center',
            })
            gsap.set('.wipe-label', { yPercent: 110 })
          }, rootRef)

          return () => {
            timelineRef.current?.kill()
            context.revert()
          }
        }, [rootRef])

        return () => {
          if (timelineRef.current?.isActive()) return

          const strips = rootRef.current.querySelectorAll('.wipe-strip')
          const label = rootRef.current.querySelector('.wipe-label')

          timelineRef.current = gsap.timeline()
            .set(rootRef.current, { pointerEvents: 'all' })
            .set(strips, { scaleX: 0, transformOrigin: 'left center' })
            .to(strips, {
              scaleX: 1,
              duration: 0.72,
              ease: 'power4.inOut',
              stagger: 0.07,
            })
            .to(label, {
              yPercent: 0,
              duration: 0.5,
              ease: 'power3.out',
            }, '-=0.32')
            .call(onCovered)
            .to(label, {
              yPercent: -110,
              duration: 0.38,
              ease: 'power3.in',
            }, '+=0.18')
            .set(strips, { transformOrigin: 'right center' })
            .to(strips, {
              scaleX: 0,
              duration: 0.72,
              ease: 'power4.inOut',
              stagger: 0.07,
            }, '-=0.18')
            .set(rootRef.current, { pointerEvents: 'none' })
        }
      }

      function HorizontalStripWipe() {
        const [pageIndex, setPageIndex] = React.useState(0)
        const overlayRef = React.useRef(null)
        const nextPage = PAGES[(pageIndex + 1) % PAGES.length]
        const playTransition = useStripTransition(overlayRef, () => {
          setPageIndex((current) => (current + 1) % PAGES.length)
        })
        const currentPage = PAGES[pageIndex]

        return (
          <main className={`wipe-demo ${currentPage.tone}`}>
            <div className="page-content">
              <p>Selected chapter</p>
              <h1>{currentPage.name}</h1>
              <button type="button" onClick={playTransition}>
                Go to {nextPage.name}
              </button>
            </div>

            <div ref={overlayRef} className="wipe-overlay" aria-hidden="true">
              {Array.from({ length: ROW_COUNT }, (_, index) => (
                <span className="wipe-strip" key={index} />
              ))}
              <div className="wipe-label-mask">
                <p className="wipe-label">Emberfall</p>
              </div>
            </div>
          </main>
        )
      }
  - name: styles.css
    language: css
    content: |
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #11100e;
        font-family: Arial, sans-serif;
      }

      button {
        font: inherit;
      }

      .wipe-demo {
        position: relative;
        display: grid;
        min-height: 100vh;
        place-items: center;
        overflow: hidden;
        color: #f1eee5;
        transition: background 0.2s linear;
      }

      .wipe-demo.genesis {
        background: linear-gradient(135deg, #352c27, #84634d);
      }

      .wipe-demo.threshold {
        background: linear-gradient(135deg, #172b30, #4a7773);
      }

      .wipe-demo.sanctum {
        background: linear-gradient(135deg, #30233b, #785d82);
      }

      .page-content {
        display: grid;
        justify-items: center;
        padding: 2rem;
        text-align: center;
      }

      .page-content p {
        margin: 0 0 0.75rem;
        font-size: 0.75rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
      }

      .page-content h1 {
        margin: 0;
        font-family: Georgia, serif;
        font-size: clamp(4rem, 15vw, 11rem);
        font-weight: 400;
        letter-spacing: -0.06em;
        line-height: 0.9;
      }

      .page-content button {
        margin-top: 2rem;
        border: 1px solid rgb(255 255 255 / 45%);
        border-radius: 999px;
        padding: 0.8rem 1.25rem;
        background: rgb(0 0 0 / 18%);
        color: inherit;
        cursor: pointer;
      }

      .wipe-overlay {
        position: fixed;
        inset: 0;
        z-index: 10;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        pointer-events: none;
      }

      .wipe-strip {
        flex: 1;
        width: 100%;
        background: #f1eee5;
        transform: scaleX(0);
        transform-origin: left center;
        will-change: transform;
      }

      .wipe-label-mask {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        overflow: hidden;
        pointer-events: none;
      }

      .wipe-label {
        margin: 0;
        color: #171512;
        font-family: Georgia, serif;
        font-size: clamp(1.5rem, 4vw, 3.5rem);
        transform: translateY(110%);
        will-change: transform;
      }
code:
  jsx: |
    const PAGES = [
      { name: 'Genesis', tone: 'genesis' },
      { name: 'Threshold', tone: 'threshold' },
      { name: 'Sanctum', tone: 'sanctum' },
    ]

    const ROW_COUNT = 4

    function useStripTransition(rootRef, onCovered) {
      const timelineRef = React.useRef(null)

      React.useEffect(() => {
        const context = gsap.context(() => {
          gsap.set('.wipe-strip', {
            scaleX: 0,
            transformOrigin: 'left center',
          })
          gsap.set('.wipe-label', { yPercent: 110 })
        }, rootRef)

        return () => {
          timelineRef.current?.kill()
          context.revert()
        }
      }, [rootRef])

      return () => {
        if (timelineRef.current?.isActive()) return

        const strips = rootRef.current.querySelectorAll('.wipe-strip')
        const label = rootRef.current.querySelector('.wipe-label')

        timelineRef.current = gsap.timeline()
          .set(rootRef.current, { pointerEvents: 'all' })
          .set(strips, { scaleX: 0, transformOrigin: 'left center' })
          .to(strips, {
            scaleX: 1,
            duration: 0.72,
            ease: 'power4.inOut',
            stagger: 0.07,
          })
          .to(label, {
            yPercent: 0,
            duration: 0.5,
            ease: 'power3.out',
          }, '-=0.32')
          .call(onCovered)
          .to(label, {
            yPercent: -110,
            duration: 0.38,
            ease: 'power3.in',
          }, '+=0.18')
          .set(strips, { transformOrigin: 'right center' })
          .to(strips, {
            scaleX: 0,
            duration: 0.72,
            ease: 'power4.inOut',
            stagger: 0.07,
          }, '-=0.18')
          .set(rootRef.current, { pointerEvents: 'none' })
      }
    }

    function HorizontalStripWipe() {
      const [pageIndex, setPageIndex] = React.useState(0)
      const overlayRef = React.useRef(null)
      const nextPage = PAGES[(pageIndex + 1) % PAGES.length]
      const playTransition = useStripTransition(overlayRef, () => {
        setPageIndex((current) => (current + 1) % PAGES.length)
      })
      const currentPage = PAGES[pageIndex]

      return (
        <main className={`wipe-demo ${currentPage.tone}`}>
          <div className="page-content">
            <p>Selected chapter</p>
            <h1>{currentPage.name}</h1>
            <button type="button" onClick={playTransition}>
              Go to {nextPage.name}
            </button>
          </div>

          <div ref={overlayRef} className="wipe-overlay" aria-hidden="true">
            {Array.from({ length: ROW_COUNT }, (_, index) => (
              <span className="wipe-strip" key={index} />
            ))}
            <div className="wipe-label-mask">
              <p className="wipe-label">Emberfall</p>
            </div>
          </div>
        </main>
      )
    }
  css: |
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: #11100e;
      font-family: Arial, sans-serif;
    }

    button {
      font: inherit;
    }

    .wipe-demo {
      position: relative;
      display: grid;
      min-height: 100vh;
      place-items: center;
      overflow: hidden;
      color: #f1eee5;
      transition: background 0.2s linear;
    }

    .wipe-demo.genesis {
      background: linear-gradient(135deg, #352c27, #84634d);
    }

    .wipe-demo.threshold {
      background: linear-gradient(135deg, #172b30, #4a7773);
    }

    .wipe-demo.sanctum {
      background: linear-gradient(135deg, #30233b, #785d82);
    }

    .page-content {
      display: grid;
      justify-items: center;
      padding: 2rem;
      text-align: center;
    }

    .page-content p {
      margin: 0 0 0.75rem;
      font-size: 0.75rem;
      letter-spacing: 0.24em;
      text-transform: uppercase;
    }

    .page-content h1 {
      margin: 0;
      font-family: Georgia, serif;
      font-size: clamp(4rem, 15vw, 11rem);
      font-weight: 400;
      letter-spacing: -0.06em;
      line-height: 0.9;
    }

    .page-content button {
      margin-top: 2rem;
      border: 1px solid rgb(255 255 255 / 45%);
      border-radius: 999px;
      padding: 0.8rem 1.25rem;
      background: rgb(0 0 0 / 18%);
      color: inherit;
      cursor: pointer;
    }

    .wipe-overlay {
      position: fixed;
      inset: 0;
      z-index: 10;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      pointer-events: none;
    }

    .wipe-strip {
      flex: 1;
      width: 100%;
      background: #f1eee5;
      transform: scaleX(0);
      transform-origin: left center;
      will-change: transform;
    }

    .wipe-label-mask {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      overflow: hidden;
      pointer-events: none;
    }

    .wipe-label {
      margin: 0;
      color: #171512;
      font-family: Georgia, serif;
      font-size: clamp(1.5rem, 4vw, 3.5rem);
      transform: translateY(110%);
      will-change: transform;
    }
---

## はじめに

ページ遷移は待ち時間を飾るだけの演出ではありません。現在の画面をいったん覆ってから内容を更新すると、利用者に「操作が受理され、次の文脈へ移った」と伝えられます。今回作るのは、4本の横帯が少しずつ遅れて画面を覆い、中央の短いラベルを見せたあと、反対側へ抜けるワイプです。

元のデモにあったナビゲーション、背景画像、SplitText、ルーター連携は扱いません。主役を横帯の `scaleX` と `transform-origin` の切り替えだけに絞り、通常のReact環境でも試せるクリックデモにします。

## 今回作るもの

- 今回はこれ以外: 円形マスク、画面全体のスライド、SplitText、実ルーターとの接続
- 今回の主役: 複数の横帯を時間差で伸縮するワイプ
- 最小単位: クリック後に画面を覆い、内容を更新してから開くオーバーレイ1枚
- 差分: 既存の円形マスク拡張ではなく横帯の `scaleX`、コンテンツのスライドではなく完全に覆われた瞬間のstate更新
- 再利用先: ブランドサイトのページ遷移、ギャラリーの作品切り替え、テーマ変更の境目
- 分離する責務: Reactは表示データ、カスタムHookはtimeline、CSSは重なりと初期状態

ボタンを押すと、横帯が左から入ります。帯が画面を覆った時点でReact stateを更新するため、背景の切り替わりは利用者から見えません。その後 `transform-origin` を右端へ変え、同じ帯を縮めて新しい画面を見せます。

## コンポーネント設計

`HorizontalStripWipe` は現在ページのstateと表示だけを担当します。アニメーションは `useStripTransition` に分け、オーバーレイが画面を覆った瞬間だけ `onCovered` を呼びます。このコールバック境界を作っておくと、後から `setPageIndex` をルーターの遷移処理へ置き換えやすくなります。

横帯は装飾なので `aria-hidden="true"` を付けています。DOMを4本に分ける理由は、疑似要素だけでは扱いにくい `stagger` を素直に適用するためです。一方、ページごとの本文を帯の中へ複製しないことで、読み上げ内容やフォーカス位置の重複を防ぎます。

## 実装のポイント

### 帯が覆った瞬間に内容を更新する

timelineの `.call(onCovered)` は、4本の帯が `scaleX: 1` になった後に置いています。画面が完全に隠れているため、state更新による背景色や見出しの変化がちらつきません。実際のルーターに接続する場合も、この位置で遷移完了を待つ設計にすると、演出とデータ更新の境界が明確です。

### transform-originで「入る方向」と「抜ける方向」を分ける

登場時は `left center` を基点にして `scaleX` を0から1へ動かします。退場前に基点を `right center` へ変えると、帯は右端へ吸い込まれるように縮みます。`x` やwidthを変えずtransformだけを動かすので、レイアウト計算を増やしにくい構成です。

### staggerは短くして一体感を残す

`stagger: 0.07` は、4本が別々に見えつつも、ひとつの画面遷移として感じられる値です。`0.15` 以上にすると最初と最後の帯の差が大きくなり、操作への反応が鈍く見えます。帯の本数を増やす場合は、総遅延が長くならないようstaggerを小さくします。

`duration: 0.72` と `power4.inOut` は、静止状態から勢いを付け、終端でしっかり止める設定です。軽いUIなら `0.5` 前後、作品サイトで余韻を持たせるなら `0.9` 前後が調整の出発点になります。

### Reactで後始末を閉じる

`gsap.context()` のスコープを `rootRef` に限定しているため、同じクラス名を持つ別コンポーネントまで選択しません。cleanupでは進行中のtimelineを `kill()` し、`context.revert()` で初期化時に加えたインラインスタイルを戻します。ページ遷移中にコンポーネントがunmountされても、古いアニメーションが残りにくくなります。

また、timelineの実行中は再クリックを無視します。連打で複数のtimelineとstate更新が重なると、表示順と帯の状態がずれるためです。オーバーレイの `pointer-events` も演出中だけ有効にし、背面UIへの誤操作を防いでいます。

## 使いどころとカスタマイズ

ブランドサイトでは帯数を3〜6本にすると、形が読み取れつつ冗長になりません。ニュースや業務UIのように速度が優先される場所では、ラベル表示を外し、durationを `0.4〜0.55`、staggerを `0.03〜0.05` にすると軽快です。

印象を変える主なダイヤルは次の4つです。

- 帯の本数: 少ないほど大胆、多いほど細かな波に見える
- `stagger`: 小さいほど一枚の面、大きいほど帯の存在が強くなる
- `transform-origin`: 左右を逆にすれば進行方向も反転する
- ラベルの滞在時間: `'+=0.18'` を伸ばすとブランド演出、短くすると機能的な遷移になる

実案件では `prefers-reduced-motion` も考慮します。動きを減らす設定ではstaggerを外し、短いフェードか即時切り替えにすると、意味を保ったまま移動量を抑えられます。

## 発展させるなら

次の段階は、`onCovered` をNext.jsなどのルーターへ接続することです。ただし、先に遷移先データの準備を始め、帯が覆った時点で画面を確定させる必要があります。通信待ちまでtimelineへ詰め込まず、「覆う」「遷移を待つ」「開く」を別の状態として管理すると保守しやすくなります。

さらに変化を付けるなら、偶数行だけ進行方向を反転する、CSSカスタムプロパティで帯ごとの色を変える、といった拡張ができます。それでも主役は横帯ワイプのまま保ち、画像アニメーションや複雑な文字分割は別コンポーネントとして追加するのが安全です。

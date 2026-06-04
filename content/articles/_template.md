---

title: 記事タイトルを入れる
description: 記事一覧や詳細冒頭に出す要約を1文で入れる
category: スクロール連動
tags:

* GSAP
* ScrollTrigger
* アニメーション
  date: 2026年5月18日
  publishedAt: 2026-05-18
  readTime: 5分
  viewer: playground
  thumbnail: runtime
  layout: default
  files:
* name: Component.jsx
  language: jsx
  content: |
  function Demo() {
  const rootRef = React.useRef(null)

  ```
  React.useEffect(() => {
    const context = gsap.context(() => {
      const items = gsap.utils.toArray(".demo-item")

      gsap.from(items, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
      })
    }, rootRef)

    return () => context.revert()
  }, [])

  return (
    <div ref={rootRef} className="demo">
      <div className="demo-item">Motion Part</div>
      <div className="demo-item">Small Component</div>
      <div className="demo-item">Reusable UI</div>
    </div>
  )
  ```

  }
* name: styles.css
  language: css
  content: |
  .demo {
  display: grid;
  gap: 12px;
  place-items: center;
  min-height: 240px;
  padding: 32px;
  }

  .demo-item {
  width: min(100%, 320px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  color: #fff;
  text-align: center;
  }
  code:
  jsx: |
  function Demo() {
  const rootRef = React.useRef(null)

  React.useEffect(() => {
  const context = gsap.context(() => {
  const items = gsap.utils.toArray(".demo-item")

  ```
    gsap.from(items, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.08,
    })
  }, rootRef)

  return () => context.revert()
  ```

  }, [])

  return ( <div ref={rootRef} className="demo"> <div className="demo-item">Motion Part</div> <div className="demo-item">Small Component</div> <div className="demo-item">Reusable UI</div> </div>
  )
  }
  css: |
  .demo {
  display: grid;
  gap: 12px;
  place-items: center;
  min-height: 240px;
  padding: 32px;
  }

  .demo-item {
  width: min(100%, 320px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  color: #fff;
  text-align: center;
  }

---

<!--
## AI執筆用 企画メモ

このコメントブロックは、AI執筆時の設計メモです。
公開本文には表示しない前提で使います。

### 重複回避

新しい記事を書く前に `content/articles/_animation-inventory.md` を確認する。

既存記事と比べて、少なくとも以下のうち2点以上を変える。

- トリガー
- 主役要素
- 動きの流れ
- 見せ場の位置

### 今回の設計

- 今回はこれ以外:
  - 既存記事の「次回避ける」を2件以上読んで、避ける表現を1行で書く

- 今回の主役:
  - この記事で一番見せる技術を1つだけ書く
  - 例: GSAPのstagger / useGSAPのcleanup / ScrollTriggerのpin / R3FのPlane表示 / shader uniform更新

- 最小単位:
  - この記事で作る最小の部品を書く
  - 例: 3つのカードを順番に表示するだけ / 1枚のPlaneに画像を貼るだけ / マウス追従する円を1つ作るだけ

- 差分:
  - 既存記事と何が違うかを書く
  - 例: セクション全体ではなく、1つのUIパーツだけに絞る

- 再利用先:
  - この部品をどこで再利用できるかを書く
  - 例: Hero / CTA / Worksカード / 記事一覧 / ローディング

- 分離する責務:
  - DOM
  - CSS
  - GSAP animation
  - R3F / WebGL
  - data / config

### 粒度ルール

この記事では、大きな完成LPや複合アニメーションを作らない。

1記事につき、主役にする技術テーマは1つだけにする。
1デモにつき、見せ場は1つだけにする。
1コンポーネントにつき、責務は1つだけにする。

禁止:
- Hero、Works、CTA、背景、ページ遷移を1記事で全部作る
- GSAP、R3F、shader、ScrollTrigger、マウス演出を全部盛りする
- DemoコンポーネントにDOM、アニメーション、データ、スタイル、WebGL処理を全部入れる
- 見た目の完成度だけを優先して、構造の説明を省く

優先:
- 小さいコンポーネント
- 再利用しやすい部品
- 調整しやすいパラメータ
- 実務でコピーして使える粒度
- GSAP / R3F / CSS の責務分離
-->

## 📝 はじめに

このアニメーションが、どのようなUI体験に役立つのかを説明します。
完成された大きな演出ではなく、実務の中で再利用しやすい小さなアニメーション部品として扱います。

この記事では、見た目の派手さよりも、**どの要素を動かすのか**、**なぜそのCSS構造が必要なのか**、**GSAPやR3Fの責務をどこまでにするのか**を重視します。

## 🎯 今回作るもの

今回作るのは、ページ全体の完成演出ではなく、特定の場面で再利用できる最小単位のアニメーションです。

* **主役:** [例: GSAPのstaggerで複数要素を順番に表示する]
* **トリガー:** [例: 初回表示 / スクロール / hover / mousemove]
* **対象要素:** [例: カード / テキスト / ボタン / 画像 / R3FのPlane]
* **再利用先:** [例: Hero、記事一覧、サービスカード、CTA、Worksセクション]

## 🧩 コンポーネント設計

このデモでは、1つのコンポーネントにすべての処理を詰め込まず、役割を分けて考えます。

* **Demo**

  * サンプル全体の親コンポーネント
  * データとレイアウトの入口

* **View / DOM**

  * HTML構造を担当
  * アニメーションしやすいclassNameやrefを用意する

* **Animation**

  * GSAPのtimeline、ScrollTrigger、mousemoveなどを担当
  * Reactでは `gsap.context()` と `context.revert()` で安全に片付ける

* **Style**

  * 見た目、余白、マスク、重なり、初期状態を担当

* **R3F / WebGL**

  * Canvas内の3D表現だけを担当
  * 通常のHTML UIとは責務を分ける

## 🛠️ 実装のポイント

* **DOMとCSSの設計意図**

  * どの要素をアニメーション対象にするのか
  * なぜそのclassNameやラッパーが必要なのか
  * GSAPを適用する前に、CSS側でどこまで下地を作るのか

* **GSAP / R3F の責務**

  * GSAPは時間制御、順番、スクロール、hover、mousemoveの制御に使う
  * R3FはCanvas内の3D表現、Plane、shader、uniform更新に限定する
  * DOM UIとWebGL表現を混ぜすぎない

* **タイムラインとパラメータ**

  * `duration`
  * `ease`
  * `stagger`
  * `delay`
  * `scrub`
  * `start`
  * `end`

  これらの値をなぜ選んだのか、変更すると印象がどう変わるのかを説明します。

* **Reactでのクリーンアップ**

  * `rootRef` を使って、アニメーションの影響範囲を限定する
  * `gsap.context()` を使って、対象要素をコンポーネント内に閉じる
  * `context.revert()` を使って、アンマウント時にアニメーションを安全に解除する

## 💡 使いどころとカスタマイズ

* **最適なユースケース**

  * [例: 記事一覧カードの登場演出]
  * [例: CTA周辺の小さな誘導]
  * [例: Worksセクションの画像表示]
  * [例: R3F背景とHTMLテキストを重ねるHero]

* **調整ダイヤル**

  * `duration` を長くすると、ゆっくり上品な印象になります。
  * `duration` を短くすると、軽快で反応の良い印象になります。
  * `stagger` を大きくすると、順番に出てくる感じが強くなります。
  * `stagger` を小さくすると、まとまりのある表示になります。
  * `ease` を変えると、動きの質感が変わります。
  * `y` や `x` の移動量を変えると、動きの主張の強さを調整できます。

## 🔧 発展させるなら

この最小部品を大きな演出に発展させる場合は、以下のように段階的に追加します。

1. まずは1つの要素だけを動かす
2. 次に複数要素へ広げる
3. 必要ならScrollTriggerを追加する
4. 必要ならhoverやmousemoveを追加する
5. 必要ならR3Fやshader表現と組み合わせる

最初から全部を入れず、1つずつ役割を足すことで、壊れにくく再利用しやすいアニメーションになります。

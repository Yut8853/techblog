---
title: 'CSS Gridで作る、内容の高さに追従する開閉パネル'
description: '高さをJavaScriptで計測せず、CSS Gridの行サイズで開閉するFAQパネル。Reactの状態とアクセシビリティを分けて設計します。'
category: 'カード・UIパーツ系'
categorySlug: 'ui-parts'
tags: ['CSS', 'UI', 'トランジション']
date: '2026年10月11日'
publishedAt: '2026-10-11'
readTime: '5分'
viewer: 'playground'
thumbnail: 'runtime'
layout: 'default'
files:
  - name: Component.jsx
    language: jsx
    content: |
      const QUESTIONS = [
        { id: 'format', title: 'どんな形式で使えますか？', text: 'ReactコンポーネントとCSSを組み合わせた部品です。FAQや設定画面など、補足情報を必要なときだけ見せる場所で使えます。' },
        { id: 'height', title: '文章が長くなっても大丈夫？', text: '開いたときの高さは本文から決まります。画面幅が狭くなって折り返しが増えても、固定の高さに合わせて文章を削る必要はありません。' },
        { id: 'motion', title: '動きを減らす設定は？', text: 'OSの動きを減らす設定が有効な場合、切り替えを即時に行います。開閉ボタンはEnterキーやSpaceキーでも操作できます。' }
      ];
      function Disclosure({ item }) {
        const [open, setOpen] = React.useState(false);
        const id = React.useId();
        return (
          <article className="disclosure" data-open={open}>
            <h2><button type="button" id={`${id}-button`} aria-expanded={open} aria-controls={`${id}-panel`} onClick={() => setOpen(value => !value)}>
              {item.title}<span className="plus" aria-hidden="true">+</span>
            </button></h2>
            <div className="panel" id={`${id}-panel`} role="region" aria-labelledby={`${id}-button`} aria-hidden={!open} ref={node => { if (node) node.inert = !open; }}>
              <div className="panel-clip"><p>{item.text}</p></div>
            </div>
          </article>
        );
      }
      function Demo() {
        return <main className="stage"><section className="lab">
          <p className="eyebrow">01 / DISCLOSURE</p>
          <p className="hint">質問を押して、回答を開いてください。</p>
          {QUESTIONS.map(item => <Disclosure key={item.id} item={item} />)}
        </section></main>;
      }
  - name: styles.css
    language: css
    content: |
      * { box-sizing: border-box; }
      body { margin: 0; background: #101820; color: #edf4ef; font-family: system-ui, sans-serif; }
      .stage { min-height: 100vh; display: grid; place-content: center; padding: clamp(20px, 5vw, 64px); }
      .lab { width: min(100%, 640px); margin: auto; }
      .eyebrow { color: #adcfb8; font-size: 12px; letter-spacing: .18em; }
      h1 { font-size: clamp(28px, 6vw, 48px); line-height: 1.2; margin: 12px 0 20px; }
      p { line-height: 1.8; }
      .hint { color: #b8c6c1; font-size: 14px; }
      button, input { font: inherit; }
      button { cursor: pointer; }
      button:focus-visible, input:focus-visible { outline: 3px solid #fcd875; outline-offset: 5px; }
      .action { border: 0; border-radius: 999px; padding: 12px 24px; background: #ccf5af; color: #17251c; min-height: 44px; }
      .controls { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-top: 24px; }
      input[type="range"] { accent-color: #ccf5af; min-height: 44px; width: 100%; }
      .disclosure { border-bottom: 1px solid #46534d; }
      .disclosure h2 { font-size: 16px; margin: 0; }
      .disclosure button { width: 100%; display: flex; gap: 20px; justify-content: space-between; align-items: center; border: 0; color: inherit; background: transparent; text-align: left; padding: 22px 0; }
      .plus { color: #ccf5af; font-size: 28px; transition: transform 280ms ease; }
      .panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 280ms ease; }
      .panel-clip { min-height: 0; overflow: hidden; }
      .panel p { margin: 0; padding: 0 0 24px; color: #c1cec6; }
      .disclosure[data-open="true"] .panel { grid-template-rows: 1fr; }
      .disclosure[data-open="true"] .plus { transform: rotate(45deg); }
      @media (prefers-reduced-motion: reduce) { .panel, .plus { transition: none; } }
code:
  jsx: |
    const QUESTIONS = [
      { id: 'format', title: 'どんな形式で使えますか？', text: 'ReactコンポーネントとCSSを組み合わせた部品です。FAQや設定画面など、補足情報を必要なときだけ見せる場所で使えます。' },
      { id: 'height', title: '文章が長くなっても大丈夫？', text: '開いたときの高さは本文から決まります。画面幅が狭くなって折り返しが増えても、固定の高さに合わせて文章を削る必要はありません。' },
      { id: 'motion', title: '動きを減らす設定は？', text: 'OSの動きを減らす設定が有効な場合、切り替えを即時に行います。開閉ボタンはEnterキーやSpaceキーでも操作できます。' }
    ];
    function Disclosure({ item }) {
      const [open, setOpen] = React.useState(false);
      const id = React.useId();
      return (
        <article className="disclosure" data-open={open}>
          <h2><button type="button" id={`${id}-button`} aria-expanded={open} aria-controls={`${id}-panel`} onClick={() => setOpen(value => !value)}>
            {item.title}<span className="plus" aria-hidden="true">+</span>
          </button></h2>
          <div className="panel" id={`${id}-panel`} role="region" aria-labelledby={`${id}-button`} aria-hidden={!open} ref={node => { if (node) node.inert = !open; }}>
            <div className="panel-clip"><p>{item.text}</p></div>
          </div>
        </article>
      );
    }
    function Demo() {
      return <main className="stage"><section className="lab">
        <p className="eyebrow">01 / DISCLOSURE</p>
        <p className="hint">質問を押して、回答を開いてください。</p>
        {QUESTIONS.map(item => <Disclosure key={item.id} item={item} />)}
      </section></main>;
    }
  css: |
    * { box-sizing: border-box; }
    body { margin: 0; background: #101820; color: #edf4ef; font-family: system-ui, sans-serif; }
    .stage { min-height: 100vh; display: grid; place-content: center; padding: clamp(20px, 5vw, 64px); }
    .lab { width: min(100%, 640px); margin: auto; }
    .eyebrow { color: #adcfb8; font-size: 12px; letter-spacing: .18em; }
    h1 { font-size: clamp(28px, 6vw, 48px); line-height: 1.2; margin: 12px 0 20px; }
    p { line-height: 1.8; }
    .hint { color: #b8c6c1; font-size: 14px; }
    button, input { font: inherit; }
    button { cursor: pointer; }
    button:focus-visible, input:focus-visible { outline: 3px solid #fcd875; outline-offset: 5px; }
    .action { border: 0; border-radius: 999px; padding: 12px 24px; background: #ccf5af; color: #17251c; min-height: 44px; }
    .controls { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-top: 24px; }
    input[type="range"] { accent-color: #ccf5af; min-height: 44px; width: 100%; }
    .disclosure { border-bottom: 1px solid #46534d; }
    .disclosure h2 { font-size: 16px; margin: 0; }
    .disclosure button { width: 100%; display: flex; gap: 20px; justify-content: space-between; align-items: center; border: 0; color: inherit; background: transparent; text-align: left; padding: 22px 0; }
    .plus { color: #ccf5af; font-size: 28px; transition: transform 280ms ease; }
    .panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 280ms ease; }
    .panel-clip { min-height: 0; overflow: hidden; }
    .panel p { margin: 0; padding: 0 0 24px; color: #c1cec6; }
    .disclosure[data-open="true"] .panel { grid-template-rows: 1fr; }
    .disclosure[data-open="true"] .plus { transform: rotate(45deg); }
    @media (prefers-reduced-motion: reduce) { .panel, .plus { transition: none; } }
---

## はじめに

FAQの答えを常に並べると、質問だけを探したい人にも長いスクロールが必要になります。開閉パネルなら、見出しを一覧しながら必要な情報を選べます。今回は内容の高さに合わせた開閉だけに絞ります。

## 今回作るもの

質問を押すと、その直下の回答が開く小さなFAQです。各項目は独立して開けます。既存のカード登場演出と比べて、トリガーを初回表示からクリックへ、主役をカードの位置から本文の高さへ変えています。画像は使わず、文字と罫線で構成するオリジナルデモです。

## コンポーネント設計

`Demo`は質問データを並べ、`Disclosure`は1項目の開閉状態を持ちます。文言は`QUESTIONS`、動く速さはCSSに分けました。項目の追加でアニメーション処理を書き足す必要はありません。

ボタンを見出しの中へ置き、`aria-expanded`で開閉状態を伝えます。`useId`によってボタンと本文を結び付けるため、同じ部品を複数配置してもIDが重なりません。

## 実装のポイント

外側の`.panel`をGrid、内側の`.panel-clip`を内容の切り抜き用にします。行サイズを`0fr`から`1fr`へ変え、内側の`min-height: 0`で内容の最小サイズによる押し広げを防ぎます。余白は内側へ置くため、閉じた外枠に余白が残りません。行サイズの指定は[MDNのgrid-template-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-rows)も参照できます。

閉じた本文には`aria-hidden`と`inert`を付けます。見えないリンクがTab移動の対象になることを防ぐ設計です。開閉ボタンは外側にあるため、閉じても操作の焦点を維持できます。Reactのバージョンによる属性の扱いの差を避けるため、refコールバックでDOMの`inert`プロパティへ真偽値を渡しています。

280msは短い補足文が開くことを認識でき、操作の待ち時間も長くしすぎない初期値です。Gridの高さ変更はレイアウト更新を伴うため、大量の項目を同時に動かす用途では負荷を確認してください。タイマーやDOMリスナーを登録していないので、明示的なcleanupは不要です。

## 使いどころとカスタマイズ

FAQ、料金の注釈、設定画面の追加項目に使えます。軽快にしたい場合は280msを180ms程度へ短くします。1つだけ開く仕様なら状態を親へ移し、選択中のIDを各項目へ渡してください。

動きを減らす設定ではtransitionを無効にします。検証時は、複数項目の開閉、320px幅での折り返し、Tab移動、Enter操作を確認してください。

## 発展させるなら

開閉状態をURLから復元すれば、特定の回答への案内に使えます。本文内から閉じる機能を追加する場合は、閉じる前に見出しボタンへフォーカスを戻す処理も合わせて設計します。

---
title: 'CSS transformで作る、なめらかな選択インジケーター'
description: 'ラジオボタンの操作性を残したまま、選択中の背景だけを横へ動かすセグメントコントロールを作ります。'
category: 'カード・UIパーツ系'
categorySlug: 'ui-parts'
tags: ['CSS', 'UI', 'インタラクション']
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
      const OPTIONS = [
        { id: 'day', label: '日', text: '今日の記録を振り返ります。' },
        { id: 'week', label: '週', text: '1週間の傾向を確認します。' },
        { id: 'month', label: '月', text: '月全体の変化を見渡します。' }
      ];
      function PeriodControl({ index, onChange }) {
        const name = React.useId();
        return <fieldset className="period-control"><legend>表示する期間</legend>
          <div className="segments" style={{ '--count': OPTIONS.length, '--index': index }}>
            <span className="indicator" aria-hidden="true" />
            {OPTIONS.map((option, position) => <label className="segment" key={option.id}>
              <input type="radio" name={name} value={option.id} checked={index === position} onChange={() => onChange(position)} />
              <span>{option.label}</span>
            </label>)}
          </div>
        </fieldset>;
      }
      function Demo() {
        const [index, setIndex] = React.useState(1);
        return <main className="stage"><section className="lab"><p className="eyebrow">04 / SELECTION</p>
          <PeriodControl index={index} onChange={setIndex} />
          <p className="period-description">{OPTIONS[index].text}</p>
          <p className="hint">項目をクリック。キーボードではTabで入り、矢印キーで選択。</p>
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
      .period-control { min-width: 0; border: 0; padding: 0; margin: 32px 0 0; }
      .period-control legend { margin-bottom: 12px; color: #b8c6c1; }
      .segments { display: grid; grid-template-columns: repeat(var(--count), minmax(0, 1fr)); position: relative; isolation: isolate; background: #283a32; border-radius: 16px; border: 6px solid #283a32; }
      .indicator { position: absolute; inset: 0 auto 0 0; width: calc(100% / var(--count)); border-radius: 10px; background: #ccf5af; transform: translateX(calc(var(--index) * 100%)); transition: transform 260ms cubic-bezier(.22, 1, .36, 1); z-index: -1; }
      .segment { position: relative; cursor: pointer; }
      .segment input { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
      .segment span { min-height: 52px; display: grid; place-items: center; border-radius: 10px; }
      .segment input:checked + span { color: #17251c; font-weight: 700; }
      .segment input:focus-visible + span { outline: 3px solid #fcd875; outline-offset: 3px; }
      .period-description { min-height: 4em; margin-top: 28px; font-size: 20px; }
      @media (prefers-reduced-motion: reduce) { .indicator { transition: none; } }
code:
  jsx: |
    const OPTIONS = [
      { id: 'day', label: '日', text: '今日の記録を振り返ります。' },
      { id: 'week', label: '週', text: '1週間の傾向を確認します。' },
      { id: 'month', label: '月', text: '月全体の変化を見渡します。' }
    ];
    function PeriodControl({ index, onChange }) {
      const name = React.useId();
      return <fieldset className="period-control"><legend>表示する期間</legend>
        <div className="segments" style={{ '--count': OPTIONS.length, '--index': index }}>
          <span className="indicator" aria-hidden="true" />
          {OPTIONS.map((option, position) => <label className="segment" key={option.id}>
            <input type="radio" name={name} value={option.id} checked={index === position} onChange={() => onChange(position)} />
            <span>{option.label}</span>
          </label>)}
        </div>
      </fieldset>;
    }
    function Demo() {
      const [index, setIndex] = React.useState(1);
      return <main className="stage"><section className="lab"><p className="eyebrow">04 / SELECTION</p>
        <PeriodControl index={index} onChange={setIndex} />
        <p className="period-description">{OPTIONS[index].text}</p>
        <p className="hint">項目をクリック。キーボードではTabで入り、矢印キーで選択。</p>
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
    .period-control { min-width: 0; border: 0; padding: 0; margin: 32px 0 0; }
    .period-control legend { margin-bottom: 12px; color: #b8c6c1; }
    .segments { display: grid; grid-template-columns: repeat(var(--count), minmax(0, 1fr)); position: relative; isolation: isolate; background: #283a32; border-radius: 16px; border: 6px solid #283a32; }
    .indicator { position: absolute; inset: 0 auto 0 0; width: calc(100% / var(--count)); border-radius: 10px; background: #ccf5af; transform: translateX(calc(var(--index) * 100%)); transition: transform 260ms cubic-bezier(.22, 1, .36, 1); z-index: -1; }
    .segment { position: relative; cursor: pointer; }
    .segment input { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
    .segment span { min-height: 52px; display: grid; place-items: center; border-radius: 10px; }
    .segment input:checked + span { color: #17251c; font-weight: 700; }
    .segment input:focus-visible + span { outline: 3px solid #fcd875; outline-offset: 3px; }
    .period-description { min-height: 4em; margin-top: 28px; font-size: 20px; }
    @media (prefers-reduced-motion: reduce) { .indicator { transition: none; } }
---

## はじめに

短い選択肢を切り替えるUIでは、現在地を明確に見せることが大切です。選択背景が次の位置へ移動すると、操作前後のつながりを示せます。今回は日・週・月の選択部品に、背景の移動だけを加えます。

## 今回作るもの

3つの期間から1つを選ぶセグメントコントロールです。既存の作品ギャラリーとは異なり、画像を差し替えず、選択位置を示す背景1枚を動かします。主役要素と動きの流れが異なる小さな部品です。背景や文字はCSSとHTMLで作っています。

## コンポーネント設計

`Demo`は選択されたインデックスを保持し、`PeriodControl`へ値と更新関数を渡します。選択肢と説明文は`OPTIONS`にまとめます。コントロール自身がデータ取得まで担当しないので、表示期間以外のフィルターにも転用できます。

選択は同じnameを持つネイティブのラジオボタンで表します。タブのような独自の矢印キー制御を追加せず、ブラウザーの操作を利用します。`fieldset`と`legend`で選択肢のまとまりにも名前を付けます。

## 実装のポイント

背景の幅を`100% / 選択肢数`とし、`translateX`を選択インデックス×100%にします。ここでの100%は移動する要素自身の幅なので、インデックスが1なら選択肢1個分だけ移動します。

外枠の6pxのborderは共通の余白です。Gridと絶対配置した背景が同じ内側領域を使うため、画面幅が変わっても位置が揃います。この計算は等幅の選択肢が前提です。

ラジオボタンを`display: none`で隠すとキーボード操作も失われます。ここでは視覚的に小さく切り抜き、フォーカス時の輪郭を隣接する文字の面へ表示します。260msの移動中も選択状態は即時更新されます。

## 使いどころとカスタマイズ

期間、表示密度、集計単位など少数の選択肢に適しています。ラベルが長くなる場合は画面幅で折り返しを確認し、無理に多くの項目を詰め込まないようにします。移動を軽く見せたい場合は260msを180msへ変更します。

動かす対象は背景1枚で、JavaScriptによる毎フレームの更新はありません。タイマーや購読がないためcleanupも不要です。Tabからの矢印キー操作、2つ以上のコンポーネントの同時配置、縮小表示で選択が判別できるかを確認してください。

## 発展させるなら

選択値を検索パラメーターへ保存すれば、絞り込み結果を共有できます。項目ごとの幅を変える場合は現在の等分計算を使わず、要素の測定とリサイズ時の更新を別の責務として追加します。

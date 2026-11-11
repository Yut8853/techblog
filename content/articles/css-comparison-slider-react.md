---
title: 'Reactとclip-pathで作る、左右比較スライダー'
description: 'ネイティブのrange入力とclip-pathを同期し、2つのビジュアルを同じ位置で比較する部品を作ります。'
category: 'マウス・インタラクション系'
categorySlug: 'interaction'
tags: ['CSS', 'インタラクション', 'UI']
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
      function Landscape({ warm = false }) {
        return <div className={`landscape ${warm ? 'warm' : 'cool'}`} aria-hidden="true"><span className="sun" /><span className="ridge back" /><span className="ridge front" /></div>;
      }
      function Comparison() {
        const [position, setPosition] = React.useState(50);
        const id = React.useId();
        return <>
          <div className="comparison" role="img" aria-label={`同じ山並みの配色比較。暖色の表示範囲${position}パーセント。`}>
            <Landscape />
            <div className="overlay" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><Landscape warm /></div>
            <span className="divider" style={{ left: `${position}%` }} aria-hidden="true"><b>↔</b></span>
          </div>
          <div className="labels" aria-hidden="true"><span>WARM / 暖色</span><span>COOL / 寒色</span></div>
          <label htmlFor={id}>暖色の表示範囲：{position}%</label>
          <input id={id} type="range" min="0" max="100" value={position} onChange={event => setPosition(Number(event.target.value))} aria-valuetext={`暖色 ${position}パーセント`} />
        </>;
      }
      function Demo() {
        return <main className="stage"><section className="lab"><p className="eyebrow">02 / COMPARISON</p><Comparison /><p className="hint">下のスライダーをドラッグ、または矢印キーで比較。</p></section></main>;
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
      .comparison { height: clamp(210px, 46vw, 340px); position: relative; overflow: hidden; border-radius: 20px; }
      .landscape, .overlay { position: absolute; inset: 0; }
      .landscape { overflow: hidden; background: linear-gradient(#254268, #a9c7cc); }
      .landscape.warm { background: linear-gradient(#894566, #ffce90); }
      .sun { position: absolute; top: 16%; left: 62%; width: 70px; height: 70px; border-radius: 50%; background: #e5f6ed; }
      .warm .sun { background: #ffe6a5; }
      .ridge { position: absolute; inset: 36% -10% -1%; clip-path: polygon(0 100%, 0 60%, 25% 8%, 45% 64%, 65% 0, 100% 70%, 100% 100%); background: #53758b; }
      .ridge.front { inset: 57% -20% -1%; background: #203c55; transform: scaleX(-1); }
      .warm .ridge { background: #ad6173; }
      .warm .ridge.front { background: #603852; }
      .divider { position: absolute; top: 0; bottom: 0; width: 2px; transform: translateX(-50%); background: white; }
      .divider b { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; color: #243a30; border-radius: 50%; padding: 10px; }
      .labels { display: flex; justify-content: space-between; margin: 16px 0 24px; color: #b8c6c1; font-size: 12px; letter-spacing: .08em; }
code:
  jsx: |
    function Landscape({ warm = false }) {
      return <div className={`landscape ${warm ? 'warm' : 'cool'}`} aria-hidden="true"><span className="sun" /><span className="ridge back" /><span className="ridge front" /></div>;
    }
    function Comparison() {
      const [position, setPosition] = React.useState(50);
      const id = React.useId();
      return <>
        <div className="comparison" role="img" aria-label={`同じ山並みの配色比較。暖色の表示範囲${position}パーセント。`}>
          <Landscape />
          <div className="overlay" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><Landscape warm /></div>
          <span className="divider" style={{ left: `${position}%` }} aria-hidden="true"><b>↔</b></span>
        </div>
        <div className="labels" aria-hidden="true"><span>WARM / 暖色</span><span>COOL / 寒色</span></div>
        <label htmlFor={id}>暖色の表示範囲：{position}%</label>
        <input id={id} type="range" min="0" max="100" value={position} onChange={event => setPosition(Number(event.target.value))} aria-valuetext={`暖色 ${position}パーセント`} />
      </>;
    }
    function Demo() {
      return <main className="stage"><section className="lab"><p className="eyebrow">02 / COMPARISON</p><Comparison /><p className="hint">下のスライダーをドラッグ、または矢印キーで比較。</p></section></main>;
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
    .comparison { height: clamp(210px, 46vw, 340px); position: relative; overflow: hidden; border-radius: 20px; }
    .landscape, .overlay { position: absolute; inset: 0; }
    .landscape { overflow: hidden; background: linear-gradient(#254268, #a9c7cc); }
    .landscape.warm { background: linear-gradient(#894566, #ffce90); }
    .sun { position: absolute; top: 16%; left: 62%; width: 70px; height: 70px; border-radius: 50%; background: #e5f6ed; }
    .warm .sun { background: #ffe6a5; }
    .ridge { position: absolute; inset: 36% -10% -1%; clip-path: polygon(0 100%, 0 60%, 25% 8%, 45% 64%, 65% 0, 100% 70%, 100% 100%); background: #53758b; }
    .ridge.front { inset: 57% -20% -1%; background: #203c55; transform: scaleX(-1); }
    .warm .ridge { background: #ad6173; }
    .warm .ridge.front { background: #603852; }
    .divider { position: absolute; top: 0; bottom: 0; width: 2px; transform: translateX(-50%); background: white; }
    .divider b { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; color: #243a30; border-radius: 50%; padding: 10px; }
    .labels { display: flex; justify-content: space-between; margin: 16px 0 24px; color: #b8c6c1; font-size: 12px; letter-spacing: .08em; }
---

## はじめに

変更前後の違いを比べるとき、画像を交互に切り替えるだけでは細部を記憶する必要があります。同じ位置に2つの状態を重ね、境界を動かすと差を直接確認できます。今回は配色の違いを比較する部品を作ります。

## 今回作るもの

下部のスライダーで、暖色の山並みが見える幅を変えます。既存のサムネイル選択式ギャラリーとは異なり、連続値の入力をトリガーに、2つの状態の境界を動かすことが見せ場です。

外部写真の読み込みに依存しないよう、山と太陽をCSSで描いています。左右の形を共通化しているため、配色の差に集中できます。表示内の矢印は境界を示す装飾で、操作は下のrange入力に集約しています。

## コンポーネント設計

`Landscape`は山並みの描画だけ、`Comparison`は比較位置の状態と入力だけを担当します。`Demo`は説明と配置を担当します。左右を別々のデータで描かず、同じ構造へ配色クラスを渡すことで位置ずれを防ぎます。

## 実装のポイント

暖色のレイヤーへ`clip-path: inset(0 右端 0 0)`を指定します。位置が30なら右側を70%切り抜き、左の30%だけを見せます。境界線の`left`も同じ状態から計算するので、見た目と入力値がずれません。

上のレイヤーの幅自体を変更すると、その中の山や写真まで縮む可能性があります。このデモはレイヤーの大きさを保ち、見える範囲だけを変えます。ドラッグへの追従を優先し、transitionによる遅れは付けていません。

ネイティブの`input type="range"`を使うと、ポインター座標の計算や独自のキーボード処理を省けます。ラベルと`aria-valuetext`で、数値が暖色の表示範囲を表すことも伝えます。独自イベントリスナーや描画ループを持たないのでcleanupは不要です。

## 使いどころとカスタマイズ

写真の補正、デザイン案、図面の改訂などに転用できます。写真へ置き換えるなら、左右の寸法と`object-position`を揃えてください。異なる位置の写真では、境界の動きより被写体のずれが目立ちます。

表示比率の初期値は50です。0、50、100の各値と、狭い画面での矢印キー操作を確認しましょう。描画負荷は画像サイズにも依存するため、巨大な原寸画像をそのまま使わないようにします。

## 発展させるなら

画像面からもドラッグできる仕様にする場合は、Pointer Captureとキャンセル処理を追加します。その場合もrange入力を残すと、キーボードで同じ結果に到達できます。

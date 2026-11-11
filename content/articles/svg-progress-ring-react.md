---
title: 'SVGで作る、数値と同期する円形プログレス'
description: 'pathLengthで円周を100に正規化し、進捗値をSVGの線と数値へ反映する小さなステータス部品です。'
category: 'ローディング系'
categorySlug: 'loading'
tags: ['SVG', 'CSS', 'UI', 'ローディング']
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
      function ProgressRing({ value }) {
        return <div className="ring" role="progressbar" aria-label="デモの進捗" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
          <svg viewBox="0 0 160 160" aria-hidden="true">
            <circle className="track" cx="80" cy="80" r="64" />
            <circle className="progress" cx="80" cy="80" r="64" pathLength="100" style={{ strokeDashoffset: 100 - value }} />
          </svg>
          <span className="ring-value" aria-hidden="true">{value}<small>%</small></span>
        </div>;
      }
      function Demo() {
        const [value, setValue] = React.useState(65);
        const id = React.useId();
        return <main className="stage"><section className="lab progress-lab">
          <p className="eyebrow">03 / PROGRESS</p>
          <ProgressRing value={value} />
          <div className="controls">{[0, 25, 65, 100].map(point => <button className="action" type="button" key={point} onClick={() => setValue(point)}>{point}%</button>)}</div>
          <label htmlFor={id}>デモの進捗値</label><input id={id} type="range" min="0" max="100" value={value} onChange={event => setValue(Number(event.target.value))} />
          <p className="hint">数値は操作用のサンプルです。通信は行いません。</p>
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
      .progress-lab { text-align: center; }
      .ring { width: min(70vw, 260px); position: relative; margin: 32px auto; }
      .ring svg { display: block; width: 100%; transform: rotate(-90deg); }
      .ring circle { fill: none; stroke-width: 9; }
      .track { stroke: #34453f; }
      .progress { stroke: #ccf5af; stroke-dasharray: 100 100; stroke-linecap: butt; transition: stroke-dashoffset 420ms cubic-bezier(.22, 1, .36, 1); }
      .ring-value { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 56px; font-variant-numeric: tabular-nums; }
      .ring-value small { font-size: 20px; margin-left: 4px; }
      .progress-lab .controls { justify-content: center; margin-bottom: 24px; }
      @media (prefers-reduced-motion: reduce) { .progress { transition: none; } }
code:
  jsx: |
    function ProgressRing({ value }) {
      return <div className="ring" role="progressbar" aria-label="デモの進捗" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
        <svg viewBox="0 0 160 160" aria-hidden="true">
          <circle className="track" cx="80" cy="80" r="64" />
          <circle className="progress" cx="80" cy="80" r="64" pathLength="100" style={{ strokeDashoffset: 100 - value }} />
        </svg>
        <span className="ring-value" aria-hidden="true">{value}<small>%</small></span>
      </div>;
    }
    function Demo() {
      const [value, setValue] = React.useState(65);
      const id = React.useId();
      return <main className="stage"><section className="lab progress-lab">
        <p className="eyebrow">03 / PROGRESS</p>
        <ProgressRing value={value} />
        <div className="controls">{[0, 25, 65, 100].map(point => <button className="action" type="button" key={point} onClick={() => setValue(point)}>{point}%</button>)}</div>
        <label htmlFor={id}>デモの進捗値</label><input id={id} type="range" min="0" max="100" value={value} onChange={event => setValue(Number(event.target.value))} />
        <p className="hint">数値は操作用のサンプルです。通信は行いません。</p>
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
    .progress-lab { text-align: center; }
    .ring { width: min(70vw, 260px); position: relative; margin: 32px auto; }
    .ring svg { display: block; width: 100%; transform: rotate(-90deg); }
    .ring circle { fill: none; stroke-width: 9; }
    .track { stroke: #34453f; }
    .progress { stroke: #ccf5af; stroke-dasharray: 100 100; stroke-linecap: butt; transition: stroke-dashoffset 420ms cubic-bezier(.22, 1, .36, 1); }
    .ring-value { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 56px; font-variant-numeric: tabular-nums; }
    .ring-value small { font-size: 20px; margin-left: 4px; }
    .progress-lab .controls { justify-content: center; margin-bottom: 24px; }
    @media (prefers-reduced-motion: reduce) { .progress { transition: none; } }
---

## はじめに

ファイルの送信や準備状況は、完了までの目安が分かるだけで待ちやすくなります。円形プログレスは小さな領域で進み具合を伝えられる部品です。ただし、進捗を測れない処理に架空の数値を付ける用途には使いません。

## 今回作るもの

ボタンやスライダーで進捗を変えると、円の線が指定値へ伸び縮みします。オーブを使った既存のローディング演出とは、トリガーが数値更新であること、主役が1本の円周であることが異なります。図形はSVGで描き、外部画像を必要としません。

## コンポーネント設計

`Demo`がサンプル値と操作UIを持ち、`ProgressRing`は受け取った値を表示します。実際の通信処理はリングの外側で管理する想定です。この分離により、アップロードでもチェックリストでも同じ表示部品を利用できます。

## 実装のポイント

円に`pathLength="100"`を指定し、線の長さを100基準として扱います。`stroke-dasharray: 100 100`で線と空白を1周ずつ用意し、`strokeDashoffset`を`100 - value`にします。値が65ならオフセットは35です。こうすると半径を変えても進捗の計算式を保てます。[MDNのpathLength](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/pathLength)に正規化の考え方が説明されています。

線の始点はSVG全体を-90度回転して上へ移します。数値はHTMLで重ねるので回転しません。0%で線端の小さな点が残らないよう、線端は`butt`を選んでいます。

420msの補間は、値が大きく変わったことを見て取るためのものです。数値と`aria-valuenow`は実際の値へ即時更新し、線だけがその値へ追いつきます。中間フレームごとの読み上げを避けるため、`aria-live`は付けていません。線の移動を減らす設定では補間も停止します。

## 使いどころとカスタマイズ

実データを渡すときは、呼び出し側で有限の数値かを確認し、0〜100へ収めます。総量が不明なら別の不定進捗表示に切り替えてください。頻繁に更新される値ならtransitionを短くして、見た目の遅れを抑えます。

このデモはタイマーを使わないためcleanupは不要です。通信へ接続した場合は、購読解除やリクエストの中断をデータ取得側で実装します。0%、100%、連続操作、動きを減らす設定を確認すれば、端点と補間の振る舞いを検証できます。

## 発展させるなら

完了時に一度だけメッセージを通知する仕組みを追加できます。通知は線のアニメーション終了ではなく、実際の処理完了を基準にしてください。

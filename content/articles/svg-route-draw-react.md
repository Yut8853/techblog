---
title: 'SVGのstroke-dashoffsetで作る、ルートの線描画'
description: '1本のSVGパスを始点から描くアニメーション。再生ボタンと動きを減らす設定を備えた、再利用しやすい線描画の実装です。'
category: '背景・ビジュアル表現系'
categorySlug: 'visual'
tags: ['SVG', 'CSS', 'アニメーション']
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
      const ROUTE = 'M 40 190 C 95 190 70 60 150 60 S 210 210 285 160 S 340 55 400 70';
      function RouteDrawing({ revision }) {
        return <svg className="route-map" viewBox="0 0 440 250" role="img" aria-label="出発点から到着点へ曲線でつながるルート">
          <path className="route-guide" d={ROUTE} />
          <path key={revision} className="route-line" d={ROUTE} pathLength="1" />
          <circle className="station" cx="40" cy="190" r="7" /><circle className="station" cx="400" cy="70" r="7" />
          <text x="24" y="222">START</text><text x="354" y="46">GOAL</text>
        </svg>;
      }
      function Demo() {
        const [revision, setRevision] = React.useState(0);
        return <main className="stage"><section className="lab"><p className="eyebrow">05 / LINE DRAWING</p>
          <RouteDrawing revision={revision} />
          <div className="controls"><button className="action" type="button" onClick={() => setRevision(value => value + 1)}>もう一度描く</button><span className="hint">1本の線を1.8秒で描画</span></div>
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
      .route-map { width: 100%; display: block; border: 1px solid #3f544a; border-radius: 24px; background: radial-gradient(circle at 50% 50%, #294839, #18291f); }
      .route-map path { fill: none; stroke-width: 4; stroke-linecap: round; }
      .route-guide { stroke: #496253; }
      .route-line { stroke: #d4f9aa; stroke-dasharray: 1 1; stroke-dashoffset: 0; animation: draw-route 1.8s ease-in-out both; }
      .station { fill: #fcd875; stroke: #18291f; stroke-width: 3; }
      .route-map text { fill: #d8e5dc; font-size: 12px; letter-spacing: 1px; }
      @keyframes draw-route { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
      @media (prefers-reduced-motion: reduce) { .route-line { animation: none; } }
code:
  jsx: |
    const ROUTE = 'M 40 190 C 95 190 70 60 150 60 S 210 210 285 160 S 340 55 400 70';
    function RouteDrawing({ revision }) {
      return <svg className="route-map" viewBox="0 0 440 250" role="img" aria-label="出発点から到着点へ曲線でつながるルート">
        <path className="route-guide" d={ROUTE} />
        <path key={revision} className="route-line" d={ROUTE} pathLength="1" />
        <circle className="station" cx="40" cy="190" r="7" /><circle className="station" cx="400" cy="70" r="7" />
        <text x="24" y="222">START</text><text x="354" y="46">GOAL</text>
      </svg>;
    }
    function Demo() {
      const [revision, setRevision] = React.useState(0);
      return <main className="stage"><section className="lab"><p className="eyebrow">05 / LINE DRAWING</p>
        <RouteDrawing revision={revision} />
        <div className="controls"><button className="action" type="button" onClick={() => setRevision(value => value + 1)}>もう一度描く</button><span className="hint">1本の線を1.8秒で描画</span></div>
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
    .route-map { width: 100%; display: block; border: 1px solid #3f544a; border-radius: 24px; background: radial-gradient(circle at 50% 50%, #294839, #18291f); }
    .route-map path { fill: none; stroke-width: 4; stroke-linecap: round; }
    .route-guide { stroke: #496253; }
    .route-line { stroke: #d4f9aa; stroke-dasharray: 1 1; stroke-dashoffset: 0; animation: draw-route 1.8s ease-in-out both; }
    .station { fill: #fcd875; stroke: #18291f; stroke-width: 3; }
    .route-map text { fill: #d8e5dc; font-size: 12px; letter-spacing: 1px; }
    @keyframes draw-route { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
    @media (prefers-reduced-motion: reduce) { .route-line { animation: none; } }
---

## はじめに

手順やつながりを伝える図では、完成した線を一度に見せるより、始点から順に描くことで読む方向を示せます。今回は地図全体の演出ではなく、1本の曲線を描く最小部品を作ります。

## 今回作るもの

出発点と到着点を結ぶオリジナルのSVGパスを描画します。初回表示と「もう一度描く」ボタンで再生します。既存の背景パーティクルとは、主役が1本の線であること、動きが繰り返し続けず到着点で止まることが異なります。

写真や地図素材は使いません。座標を自分で定義した抽象的なルートなので、特定の場所を示す地図としての意味はありません。

## コンポーネント設計

`ROUTE`が形状、`RouteDrawing`がSVGの表示、`Demo`が再生操作を担当します。時間制御はCSSのkeyframesへ任せます。常時動作するJavaScriptループを作らず、表示の範囲だけで完結させています。

## 実装のポイント

薄いガイド線と、その上を描く明るい線に同じ`d`を指定します。ガイドが残るため、描画途中でもルート全体を把握できます。主線は`pathLength="1"`で長さを正規化し、破線の線と空白をそれぞれ1にします。

`stroke-dashoffset`を1から0へ変えると、空白だった部分へ線が現れます。ここではパーセントを使わず数値を指定します。パーセントはパス全長そのものを基準にしないためです。仕様の説明は[MDNのstroke-dashoffset](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dashoffset)を参照してください。

再生時は主線の`key`だけを更新します。主線のDOMが作り直され、CSSアニメーションが先頭から始まります。ボタンのDOMは維持するので、キーボードフォーカスが失われません。クリック連打も現在の線を先頭へ戻す動作になります。

1.8秒の`ease-in-out`で始点と終点をゆっくり見せます。これは移動の説明用で、実際の距離や所要時間は表していません。均等な線の進行が必要なら`linear`に変更します。

## 使いどころとカスタマイズ

手順図、工程の接続、図解の注目線に向いています。`ROUTE`の座標を変えると形を、`stroke-width`を変えると線の強さを調整できます。`viewBox`から線や端点がはみ出さないように余白も確保してください。

CSSによる線の更新にも描画負荷はあるため、複雑なパスを大量に同時再生する場合は実機で確認します。タイマーやイベント購読がなく、明示的なcleanupは不要です。動きを減らす設定では最終状態を即時表示します。再生連打、画面縮小、動きを減らす設定を確認してください。

## 発展させるなら

閲覧領域へ入った瞬間に一度だけ再生する構成へ変更できます。その際はIntersectionObserverの処理を別のフックへ分け、アンマウント時に`disconnect()`する責務を追加します。

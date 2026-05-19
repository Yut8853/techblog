---
title: 記事タイトルを入れる
description: 記事一覧や詳細冒頭に出す要約を 1 文で入れる
category: スクロール連動
tags:
  - GSAP
  - ScrollTrigger
  - アニメーション
date: 2026年5月18日
publishedAt: 2026-05-18
readTime: 5分
viewer: playground
thumbnail: runtime
layout: default
files:
  - name: Component.jsx
    language: jsx
    content: |
      function Demo() {
        return <div className="demo">Hello</div>
      }
  - name: styles.css
    language: css
    content: |
      .demo {
        display: grid;
        place-items: center;
        min-height: 240px;
      }
code:
  jsx: |
    function Demo() {
      return <div className="demo">Hello</div>
    }
  css: |
    .demo {
      display: grid;
      place-items: center;
      min-height: 240px;
    }
---

## このファイルについて

このファイルは見本です。先頭が `_` の Markdown は記事として読み込まれません。

新しい記事を追加するときは、このファイルをコピーしてファイル名を `your-slug.md` にしてください。

## Frontmatter のルール

- `title`: 記事タイトル
- `description`: 一覧や詳細上部の説明文
- `category`: 下の「利用可能カテゴリ」から 1 つ選ぶ
- `tags`: 下の「利用可能タグ」から複数選べる
- `date`: 画面表示用の日付
- `publishedAt`: 並び替え用の ISO 日付
- `readTime`: 表示用の読了時間
- `viewer`: コードビューアー種別。現状は `playground` を使う
- `thumbnail`: サムネイル種別。現状は `runtime` を使う
- `layout`: 記事ページのレイアウト種別。現状は `default` を使う
- `files`: 記事ごとのファイル構成。複数ファイル記事はここを増やす
- `code`: コードプレビューに出したい場合だけ設定する

## 利用可能 viewer

- `playground`: 既存のプレビュー + エディタ
- `snippet`: コード表示のみ
- `split`: 複数ペイン前提
- `custom`: 個別実装を使うときの予約値

## 利用可能 thumbnail

- `runtime`: iframe で実行してサムネイル化
- `static`: 静的画像や固定プレビュー向け
- `gradient`: グラデ背景のみ
- `custom`: 個別実装を使うときの予約値

## 利用可能 layout

- `default`: 通常記事レイアウト
- `tutorial`: 手順重視レイアウト
- `gallery`: ビジュアル重視レイアウト
- `custom`: 個別実装を使うときの予約値

## 利用可能カテゴリ

- スクロール連動
- パララックス系
- カード・UIパーツ系
- テキスト演出系
- ページ遷移・画面切り替え系
- ローディング系
- マウス・インタラクション系
- 背景・ビジュアル表現系
- 3D・WebGL寄り
- ボタン・CTA系

## 利用可能タグ

- GSAP
- ScrollTrigger
- Three.js
- Framer Motion
- CSS
- JavaScript
- TypeScript
- SVG
- WebGL
- アニメーション
- トランジション
- インタラクション
- UX
- UI
- パフォーマンス
- スクロール
- テキスト
- ローディング
- 3D
- ストーリーテリング

## 本文サンプル

## 見出し2

Markdown の本文はそのまま記事詳細に表示されます。

- 箇条書き
- 箇条書き

1. 番号付きリスト
2. 番号付きリスト

```ts
const message = 'code block も使えます';
```

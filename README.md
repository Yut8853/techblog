# techblog

自分用の運用 README。
このリポジトリは、Creative Dev Blog の Next.js 版。

## 概要

- Next.js App Router ベースの技術ブログ
- 記事データは Markdown 管理
- 記事ごとにコードプレビューを表示可能
- カテゴリ、タグ、関連記事、記事詳細、問い合わせ、ポリシーページあり
- Vercel 本番デプロイ前提

## 技術スタック

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- pnpm
- gray-matter
- react-markdown
- remark-gfm

## ディレクトリの見方

- app/: ページ
- components/: 画面部品
- content/articles/: 記事 Markdown
- lib/articles.ts: 記事読み込み本体
- lib/config/: カテゴリやサイト設定
- public/: 画像などの公開アセット
- scripts/validate-content.mjs: 記事 frontmatter 検証
- .github/workflows/ci.yml: GitHub Actions CI

## 重要ファイル

- lib/articles.ts
	- Markdown を読み込んで記事オブジェクト化する本体
	- frontmatter 不足時はここで落ちる

- content/articles/_template.md
	- 新規記事追加時の雛形
	- viewer, thumbnail, layout, files, code の見本あり

- lib/config/categories.ts
	- カテゴリ定義
	- 表現タイプやカテゴリページの元データ

- lib/config/site.ts
	- プロフィール、連絡先、SNS、運営元

- components/code-playground.tsx
	- Code Viewer 本体
	- iframe でプレビュー実行

## ローカル起動

```bash
pnpm install
pnpm dev
```

本番ビルド確認:

```bash
pnpm build
```

## 記事追加手順

1. content/articles/_template.md をコピー
2. ファイル名を slug.md に変更
3. frontmatter を埋める
4. 本文を書く
5. 必要なら files と code を入れる
6. 動作確認

確認コマンド:

```bash
pnpm test:content
pnpm build
```

## frontmatter の基本ルール

必須:

- title
- description
- category
- tags
- date
- publishedAt
- readTime
- viewer
- thumbnail
- layout

任意:

- files
- code

publishedAt は YYYY-MM-DD 形式。

## コードビューア仕様

- viewer は現状 playground 前提
- code.jsx と code.css があるとプレビューが出る
- files があると今後の複数ファイル表現に対応しやすい
- Code Viewer は外側だけスクロールするよう調整済み

## 運用フロー

普段の更新:

```bash
git status
pnpm test:content
pnpm build
git add .
git commit -m "更新内容"
git push
```

## GitHub Actions

push / pull request 時に以下を実行:

1. pnpm install --frozen-lockfile
2. pnpm test:content
3. pnpm build

これで Markdown frontmatter の崩れと build エラーを早めに検出する。

## Vercel 運用メモ

- Vercel で古い失敗デプロイを見ていることがある
- Stale の失敗ログは現在の状態ではない可能性が高い
- まず GitHub の main の最新 commit を確認する
- 最新 commit が Vercel に反映されていなければ Redeploy

Vercel で build が落ちたらまず確認すること:

1. package.json に必要依存が入っているか
2. pnpm-lock.yaml が更新されているか
3. GitHub に push した commit が最新か
4. 古い stale deployment を見ていないか

## 直近でハマった点

- ローカルに入っているだけの依存は Vercel で使えない
- gray-matter, react-markdown, remark-gfm, server-only を package.json に入れる必要があった
- app/globals.css で読む tw-animate-css も依存に必要
- frontmatter の publishedAt は gray-matter で Date 扱いになることがある

## プロフィール・問い合わせ

- 問い合わせメール: hello@junkbranding.com
- X: https://x.com/junkbranding
- GitHub: https://github.com/Yut8853
- 運営元: https://junkbranding.com

## デザイン上の現状メモ

- フッターとサイドバーに運営元リンクあり
- ニュースレターと RSS は削除済み
- 記事詳細の共有は X / LINE / Facebook / Instagram
- Instagram は直接共有ではなくリンクコピー案内方式
- ブックマーク機能は削除済み

## デプロイ前チェックリスト

- pnpm test:content が通る
- pnpm build が通る
- git status が空
- 必要な画像が public 配下にある
- package.json と pnpm-lock.yaml の更新漏れがない

## 将来やる候補

- files frontmatter を Code Viewer に完全反映
- 共有 UI の見た目改善
- README にスクリーンショット追加
- 記事追加支援スクリプト作成

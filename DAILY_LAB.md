# Daily 365 Web Graphics Lab

このリポジトリは、2026-10-03 を Day 001 として、365日間毎日1本ずつ WebGL / WebGPU / GLSL / Three.js の表現実験を自動生成・検証・公開する構成です。

## 毎日の流れ

1. GitHub Actions が毎日 07:00 JST を狙って起動
2. OpenAI API がその日のテーマ、記事本文、HTML/CSS/JavaScriptを生成
3. 既存のDaily Lab記事履歴を読み、重複を避ける
4. コンテンツ検証
5. Daily Lab専用検証
6. Next.js production build
7. すべて成功した場合のみ main にcommit/push
8. Vercelがmainの更新を検知して自動デプロイ

## 事前設定

GitHub repository settings で次を追加してください。

- Actions secret: `OPENAI_API_KEY`
- Actions variable: `OPENAI_MODEL`（任意。未設定時は `gpt-6-astra`）

Vercel側では、このGitHubリポジトリの `main` ブランチをProductionに接続してください。

## 実行時刻

`.github/workflows/daily-experiment.yml` は次のcronです。

```yaml
- cron: '0 22 * * *'
```

GitHub ActionsのcronはUTCなので、22:00 UTCは翌日の07:00 JSTです。

注意: GitHubのscheduled workflowは厳密なリアルタイムジョブではなく、混雑時に数分以上遅延する可能性があります。

## 手動テスト

Actions画面から `Daily 365 Web Graphics Lab` を `workflow_dispatch` で手動実行できます。

ローカルでは:

```bash
OPENAI_API_KEY=... node scripts/generate-daily-experiment.mjs
pnpm test:content
node scripts/validate-daily-experiments.mjs
pnpm build
```

## 生成記事

生成ファイル:

```text
content/articles/daily-YYYY-MM-DD-slug.md
```

各記事に次の3ファイルをfrontmatterで保持します。

- `index.html`
- `styles.css`
- `experiment.js`

playground上で直接編集し、Runで再実行できます。

## 365日のローテーション

主軸技術は次の順で循環します。

1. Three.js
2. GLSL
3. WebGL
4. WebGPU

さらに particles / noise / distortion / ray marching / post processing / SDF / interaction など20系統の表現テーマを循環させ、AIが過去記事を参照して具体的な実験内容を変えます。

## 公開リセット

既存記事ファイルは削除しません。
公開側では2026-10-03以降の記事だけを表示する設定にするため、過去記事はGit履歴・ファイルとして残したままDaily Labをゼロから開始できます。

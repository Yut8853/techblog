# Daily 365 Web Graphics Lab

このリポジトリは、2026-10-03 を Day 001 として、365日間毎日1本ずつ WebGL / WebGPU / GLSL / Three.js の表現実験を自動生成・検証・公開する構成です。

## 毎日の流れ

1. GitHub Actions が毎日 07:00 JST を狙って起動
2. OpenAI API のWeb Searchで Awwwards / CSS Design Awards から参考事例を1件調査
3. 参考サイトのブランドや素材をコピーせず、インタラクション原理とモーション設計を抽出
4. AIが実務品質のHTML/CSS/JavaScriptデモと記事を生成
5. 別のAIレビューで visual / interaction / technical / production readiness を採点
6. 84点未満なら最大2回まで自動で作り直す
7. コンテンツ検証 + Daily Lab専用検証 + Next.js production build
8. すべて成功した場合のみ main にcommit/push
9. Vercelがmainの更新を検知して自動デプロイ

## 事前設定

GitHub repository settings で次を追加してください。

- Actions secret: `OPENAI_API_KEY`
- Actions variable: `OPENAI_MODEL`（任意。未設定時は `gpt-6-astra`）
- Actions variable: `OPENAI_RESEARCH_MODEL`（任意。参考サイト調査専用モデル）

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

さらに slider / drag distortion / scroll-driven reveal / kinetic typography / particles / post processing / 3D product showcase などを循環します。

各日、Awwwards / CSS Design Awardsからそのテーマに近い実在の受賞・掲載事例を検索し、参考URLを記事に明記します。コピーではなく、インタラクション原理・モーション設計・シェーダー技法を抽出してオリジナル実装へ再構成します。

## 公開リセット

既存記事ファイルは削除しません。
公開側では2026-10-03以降の記事だけを表示する設定にするため、過去記事はGit履歴・ファイルとして残したままDaily Labをゼロから開始できます。

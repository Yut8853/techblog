## 記事作成ショートカット

アニメーション記事を追加するときは、以下の3ファイルを参照する。

- `content/articles/_template.md`
  - 記事Markdownの雛形

- `prompts/articles/create-animation-article.md`
  - AIに記事を書かせるためのルール

- `content/articles/_animation-inventory.md`
  - 既存記事との重複回避台帳

### AIに投げる基本指示

```text
content/articles/_template.md をベースに、新しい記事Markdownを作成してください。

必ず以下を参照してください。
- prompts/article/create-animation-article.md
- content/articles/_animation-inventory.md

今回の記事テーマ：
[ここにテーマを書く]

重要：
大きな完成LPや複合アニメーションにしないでください。
1記事1テーマ、1デモ1見せ場、1コンポーネント1責務にしてください。
GSAP / R3F / CSS / DOM の責務分離を説明してください。
実務で再利用できる小さな部品として作ってください。

条件：
- category: [カテゴリ]
- tags: [タグ]
- viewer: playground
- thumbnail: runtime
- layout: default
- files と code を一致させる
- ReactでGSAPを使う場合は rootRef、gsap.context()、context.revert() を必ず入れる
- 既存記事と重複しないようにする
- 最後に _animation-inventory.md への追記案も出す

作成するファイル名：
content/articles/[slug].md
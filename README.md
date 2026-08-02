# 添付コードから記事を作る

CodePenなどのHTML / CSS / JavaScriptをAIに添付し、このリポジトリで動くReact版の記事へ変換するための手順です。

## 使い方

1. 下の「AIへの依頼文」をそのままAIへ送る。
2. `[ここに添付コードを貼る]` の位置に、元のHTML / CSS / JavaScriptを貼る。
3. 参考URL、記事タイトル、補足条件がある場合だけ入力する。空欄はAIに決めてもらう。

AIには回答文だけを作らせず、記事ファイルの作成と検証まで実行させます。

## AIへの依頼文

```text
このリポジトリに、添付コードを題材にした新しい記事を1件作成してください。
提案だけで終わらず、記事Markdownの作成と検証まで実行してください。

最初に確認するファイル:
- content/articles/_template.md
- prompts (1)/articles/create-animation-article.md
- content/articles/_animation-inventory (1).md
- content/articles/ 内の、添付コードと構成が近い既存記事2件
- scripts/validate-content.mjs

目的:
- 添付されたHTML / CSS / JavaScriptを、このブログのplaygroundで動くReactコードへ変換する
- 元デモの核となる見た目とインタラクションを残す
- 実装の考え方、React化のポイント、調整方法を日本語の記事として説明する
- 既存記事と重複しない新しい記事ファイルを content/articles/[slug].md に作る

React変換の必須条件:
- HTMLは有効なJSXへ変換し、classはclassName、forはhtmlForに直す
- DOMの直接操作だけで状態を管理せず、必要に応じてuseState、useRef、useEffectへ置き換える
- querySelectorを使う場合も対象範囲をrootRef配下へ限定する
- イベントリスナー、requestAnimationFrame、タイマー、ライブラリのインスタンスはcleanupする
- GSAPを使う場合はrootRef、gsap.context()、context.revert()を使う
- ScrollTriggerなどのプラグインは必要な登録と破棄を行う
- 同じ要素を繰り返す箇所は配列とmapへ整理し、安定したkeyを付ける
- 元コードにない過剰な機能や別の見せ場を追加しない
- デスクトップとモバイルの両方でレイアウトが破綻しないCSSにする
- ボタンのtype、画像のalt、キーボード操作など基本的なアクセシビリティを保つ
- playgroundで利用できないimportやビルド専用APIに依存しない

画像差し替えの必須条件:
- 添付コードと同じ画像、同じ画像URL、同じロゴをそのまま使わない
- 画像はデモのテーマに合う別の画像へすべて差し替える
- 複数画像が必要な場合は、内容や構図が重複しない画像を選ぶ
- 外部画像を使う場合は、安定したHTTPSの直リンクを使い、表示確認を行う
- 適切な代替画像が用意できない場合は、React内で生成するオリジナルSVGまたはCSSビジュアルを使う
- 元作品のブランド名、ロゴ、人物名、固有コピーは架空の内容へ変更する
- 意味のある画像には内容が分かるaltを付け、装飾画像はalt=""にする

記事Markdownの必須条件:
- frontmatterにtitle、description、category、tags、date、publishedAt、readTime、viewer、thumbnail、layout、files、codeを入れる
- viewerはplayground、thumbnailはruntime、layoutはdefaultにする
- categoryとtagsはリポジトリで許可された値から選ぶ
- publishedAtは作成日のYYYY-MM-DD形式にする
- filesにはComponent.jsxとstyles.cssを入れる
- files内のコードとcode.jsx / code.cssを完全に一致させる
- YAMLとして正しく解釈できるインデントにする
- slugは英小文字とハイフンで作り、既存ファイルと重複させない
- 本文だけでなくplayground上のデモが単体で成立するコードを入れる

記事本文に含める内容:
- 元コードの何を残し、React向けに何を変えたか
- コンポーネントとデータの責務
- アニメーションまたはインタラクションの仕組み
- 画像を別のものへ差し替えた意図
- 実務で再利用するときの調整箇所
- cleanupとパフォーマンス上の注意点

進め方:
1. 添付コードの主役となる表現、依存ライブラリ、画像、操作方法を整理する
2. 既存記事と比較し、重複しないslug、category、tags、記事タイトルを決める
3. React版のComponent.jsxとstyles.cssを設計する
4. すべての画像と固有のブランド表現を別のものへ変更する
5. content/articles/[slug].mdを作成する
6. filesとcodeが一致していることを確認する
7. pnpm test:contentを実行し、今回の変更が原因のエラーを修正する
8. 可能ならpnpm buildも実行し、失敗した場合は原因を報告する
9. 最後に、作成ファイル、React化した点、画像の差し替え内容、検証結果を短く報告する

判断に迷う箇所は既存記事の実装に合わせてください。
不足情報があっても、記事作成を妨げない範囲は妥当な内容を自分で決めて進めてください。

任意の指定:
- 参考URL: [空欄可]
- 希望する記事タイトル: [空欄可]
- 希望するcategory / tags: [空欄可]
- 残したい動きや見た目: [空欄可]
- その他の条件: [空欄可]

添付コード:

--- HTML ---
[ここにHTMLを貼る]

--- CSS ---
[ここにCSSを貼る]

--- JavaScript ---
[ここにJavaScriptを貼る]
```

## 添付方法の補足

コードが1ファイルだけの場合は、該当する欄だけを使えば問題ありません。
CodePenのURLも分かる場合は参考URLへ入れますが、AIが参照できない場合に備えてコード本体も添付してください。

画像ファイルを直接添付する場合でも、それを完成記事でそのまま使わせたくないときは「構図の参考のみ。公開デモでは別画像に変更」と補足します。
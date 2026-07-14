# Animation Inventory

記事化済みアニメーションの台帳です。

新しい記事を作る前に、このメモで既存の表現軸を確認し、**同一パターンの焼き直し記事を作らない**こと。

## 重複回避ルール

次の記事では、少なくとも以下のうち2点以上を変える。

- トリガー
- 主役要素
- 動きの流れ
- 見せ場の位置

見た目だけが違っても、主役モーションとトリガーが同じなら別記事にしない。

## 判定軸

新しい記事を作るときは、以下を必ず決める。

- 今回はこれ以外:
- 今回の主役:
- 最小単位:
- 差分:
- 再利用先:
- 分離する責務:

---

## 既存記事一覧

### スクロール連動

#### gsap-scroll-hero

- 主役: ヒーロー見出しと背景グロー
- 軸: pinされたヒーロー内でタイトルを縮小退避
- トリガー: scroll / pin
- 見せ場: ファーストビュー内
- 次回避ける: ピン留めしたヒーロー見出しの縮小フェード

#### gsap-stacked-cards-showcase

- 主役: 積層カード
- 軸: scrubでカードの主役が順番に入れ替わる
- トリガー: scroll / scrub
- 見せ場: カードの段階切り替え
- 次回避ける: 縦スクロールで重なったカードを段階切り替え

#### parallax-text-reveal-intro

- 主役: パララックス背景 + テキスト
- 軸: 奥行き差のある導入リビール
- トリガー: scroll
- 見せ場: 導入セクション
- 次回避ける: 背景と見出しを同時にずらす定番パララックス導入

---

### テキスト演出

#### split-text-gradient-wave

- 主役: 分割文字の見出し
- 軸: stagger登場後に弱いウェーブを継続
- トリガー: 初回表示
- 見せ場: 見出しの文字単位アニメーション
- 次回避ける: 文字ごとの順次出現 + 常時ゆらぎ

#### gsap-splittext-cta-banner

- 主役: SplitText見出しとCTA
- 軸: editorialなバナー導入 + 背景orbit
- トリガー: 初回表示
- 見せ場: CTAバナー
- 次回避ける: SplitTextの行出現にCTA遅延表示を足す構成

---

### カード・UIパーツ

#### magnetic-cards-stagger

- 主役: 3枚カード
- 軸: stagger登場 + hover magnetic
- トリガー: 初回表示 / hover
- 見せ場: カード一覧
- 次回避ける: 一覧カードが順番に現れてhoverで吸い付く構成

#### webgl-tilt-shader-card

- 主役: 単体ビジュアルカード
- 軸: 3D tilt + shader風発光
- トリガー: mousemove / hover
- 見せ場: 単体カード
- 次回避ける: 単体カードの傾きと発光追従の組み合わせ

#### generated-image-focus-cards-react

- 主役: 生成SVG画像のフォーカスカード
- 軸: React stateで選択した1枚を大きなプレビューへ差し替える
- トリガー: click / keyboard selection
- 見せ場: 選択中画像のclipPathリビール
- 次回避ける: 生成画像サムネイルから1枚を選び、プレビューだけを差し替える構成

#### studiodialect-image-gallery-react

- 主役: スタジオ作品の画像ギャラリー
- 軸: React stateでメイン画像、テキスト、サムネイル、進捗バーを同期
- トリガー: hover / focus / click
- 見せ場: 選択中作品の画像リビールとサムネイルナビ
- 次回避ける: 作品サムネイルの選択状態から画像、コピー、進捗を同時更新する構成

---

### ボタン・CTA

#### button-ripple-arrow-lift

- 主役: CTAボタン
- 軸: ripple拡張 + 矢印リフト
- トリガー: hover / click
- 見せ場: ボタン単体
- 次回避ける: ボタン面の波紋とアイコン上昇のセット

#### cursor-magnet-trail-lab

- 主役: カーソルとボタン
- 軸: custom cursor + magnetic CTA
- トリガー: mousemove / hover
- 見せ場: カーソルとCTA
- 次回避ける: カーソル追従とCTAの磁力表現のセット

---

### ローディング・画面切り替え

#### loading-transition-orbs

- 主役: オーブ群
- 軸: ローディングから画面遷移への一体演出
- トリガー: page load
- 見せ場: ローディング完了時
- 次回避ける: 球体集合がまとまってページを開く構成

#### codegrid-outfit-landing-page-reveal

- 主役: プリローダー画像スタック + SplitTextタイポ
- 軸: 画像群の連鎖表示からカウンター進行を挟み、文字要素を順に開放する
- トリガー: page load
- 見せ場: プリローダーからヒーローへの切り替え瞬間
- 次回避ける: 6枚前後の画像スタックと3桁カウンターを同時進行させる導入構成

#### masked-page-transition-showcase

- 主役: オーバーレイとコンテンツ面
- 軸: mask拡張 + slide遷移
- トリガー: page transition
- 見せ場: 画面切り替え
- 次回避ける: 全画面マスク拡張から次画面をスライドイン

---

### 背景・ビジュアル

#### particle-glass-background-shift

- 主役: 背景パーティクル + ガラス面
- 軸: 背景に運動を持たせて前面情報を浮かせる
- トリガー: 常時 / scroll
- 見せ場: 背景表現
- 次回避ける: 背景粒子とglass panelの組み合わせ

---

### 3D・WebGL寄り

#### r3f-canvas-background-basic

- 主役: Canvas背景
- 軸: R3F CanvasをDOMコンテンツの背面レイヤーとして配置する
- トリガー: 初回表示後の常時描画
- 見せ場: 1つのセクション内でCanvas背景とHTML本文を重ねる構造
- 次回避ける: 背景Canvasと前面DOMのz-index / pointer-events整理だけを主役にする構成

---

### 複合ランディング演出

#### steelworks-landing-page-reveal

- 主役: 複数セクション全体
- 軸: preloader -> card align -> central visual expand の多段構成
- トリガー: page load / scroll
- 見せ場: 複数セクションの連続演出
- 次回避ける: 5枚前後の構成を段階的に整列させるreveal

#### buckssauce-landing-page-reveal-react

- 主役: 円形clip-pathの多層カラーリビール + 放射状フードアイテム
- 軸: 円形リビールで色を切り替え -> アイテム散開・浮遊 -> ズーム退場 -> SplitTextヒーロー開放
- トリガー: page load（document.fonts.ready）
- 見せ場: 円形カラーリビールとアイテムの散開〜ズーム退場
- 次回避ける: 中央から放射状にオブジェクトを散らし、円形リビールの後にズーム退場で次画面へ抜く構成

---

## 今後追加したい候補

### GSAP基礎パーツ

- gsap-basic-stagger-list
  - 主役: リスト要素
  - 最小単位: 複数要素を順番に表示する
  - 既存との差分: 完成演出ではなくstagger単体の実用部品

- gsap-context-cleanup-basic
  - 主役: ReactでのGSAP cleanup
  - 最小単位: `gsap.context()` と `context.revert()`
  - 既存との差分: 見た目よりReact内の安全な管理に集中

- gsap-quickto-cursor-basic
  - 主役: マウス追従の円
  - 最小単位: `quickTo`で座標をなめらかに追従
  - 既存との差分: magnetic CTAではなく、追従処理単体

### ScrollTrigger基礎パーツ

- scrolltrigger-fade-section-basic
  - 主役: セクション1つ
  - 最小単位: スクロールで1回だけfade in
  - 既存との差分: pinやscrubを使わない

- scrolltrigger-pin-minimum
  - 主役: 1つの固定セクション
  - 最小単位: pinの基本構造
  - 既存との差分: ヒーロー縮小や複合演出を入れない

- scrolltrigger-scrub-progress-basic
  - 主役: 横棒の進捗
  - 最小単位: scroll量とscaleXを同期
  - 既存との差分: カード切り替えではなくprogress単体

### R3F / WebGL基礎パーツ

- r3f-canvas-background-basic
  - 主役: Canvas背景
  - 最小単位: DOMの背面にR3F Canvasを置く
  - 既存との差分: shaderや複雑な3D表現を入れない

- r3f-plane-image-basic
  - 主役: 1枚のPlane
  - 最小単位: 画像テクスチャをPlaneに貼る
  - 既存との差分: tiltや発光を入れない

- r3f-uniform-time-basic
  - 主役: shader uniform
  - 最小単位: `uTime`を`useFrame`で更新する
  - 既存との差分: 完成ビジュアルではなくuniform更新だけ

- r3f-gsap-uniform-basic
  - 主役: GSAPでuniformを動かす
  - 最小単位: `uProgress`をGSAPで0から1へ変化
  - 既存との差分: 画像遷移や複合演出にしない

## 記事アニメーション台帳

新しい記事を作る前に、このメモで既存の表現軸を確認する。

目的:

- 似た構図や同じモーションパターンの記事を連続で増やさない
- 新規記事では「何を避けるか」を先に決める
- 1記事につき主役の動きは 1 つに絞り、既存記事と差分を明文化する

## 重複回避ルール

- 既存記事と主役モーションが同じ場合は、UI の見た目だけ変えても別記事扱いにしない
- 次の記事では、少なくとも 2 点は変える
- 変える候補は「トリガー」「主役要素」「動きの流れ」「見せ場の位置」から選ぶ
- タイトルを決める前に、「これはどの記事の焼き直しではないか」を 1 行で書く

差分の例:

- トリガー: スクロール / ホバー / マウス追従 / ローディング / ページ遷移
- 主役要素: 見出し / カード / ボタン / 背景 / 画面全体 / 3D オブジェクト
- 動きの流れ: reveal / stagger / pin / mask / orbit / parallax / magnetic / ripple
- 見せ場の位置: ファーストビュー / セクション切り替え / CTA 周辺 / 背景演出

## 既存記事一覧

### スクロール連動

- gsap-scroll-hero
  - 主役: ヒーロー見出しと背景グロー
  - 軸: pin したヒーロー内でタイトルを縮小退避
  - 次回避ける: ピン留めしたヒーロー見出しの縮小フェード

- gsap-stacked-cards-showcase
  - 主役: 積層カード
  - 軸: scrub でカードの主役が順番に入れ替わる
  - 次回避ける: 縦スクロールで重なったカードを段階切り替え

- parallax-text-reveal-intro
  - 主役: パララックス背景 + テキスト
  - 軸: 奥行き差のある導入リビール
  - 次回避ける: 背景と見出しを同時にずらす定番パララックス導入

### テキスト演出

- split-text-gradient-wave
  - 主役: 分割文字の見出し
  - 軸: stagger 登場後に弱いウェーブを継続
  - 次回避ける: 文字ごとの順次出現 + 常時ゆらぎ

- gsap-splittext-cta-banner
  - 主役: SplitText 見出しと CTA
  - 軸: editorial なバナー導入 + 背景 orbit
  - 次回避ける: SplitText の行出現に CTA 遅延表示を足す構成

### カード・UI パーツ

- magnetic-cards-stagger
  - 主役: 3 枚カード
  - 軸: stagger 登場 + hover magnetic
  - 次回避ける: 一覧カードが順番に現れて hover で吸い付く構成

- webgl-tilt-shader-card
  - 主役: 単体ビジュアルカード
  - 軸: 3D tilt + shader 風発光
  - 次回避ける: 単体カードの傾きと発光追従の組み合わせ

### ボタン・CTA

- button-ripple-arrow-lift
  - 主役: CTA ボタン
  - 軸: ripple 拡張 + 矢印リフト
  - 次回避ける: ボタン面の波紋とアイコン上昇のセット

- cursor-magnet-trail-lab
  - 主役: カーソルとボタン
  - 軸: custom cursor + magnetic CTA
  - 次回避ける: カーソル追従と CTA の磁力表現のセット

### ローディング・画面切り替え

- loading-transition-orbs
  - 主役: オーブ群
  - 軸: ローディングから画面遷移への一体演出
  - 次回避ける: 球体集合がまとまってページを開く構成

- masked-page-transition-showcase
  - 主役: オーバーレイとコンテンツ面
  - 軸: mask 拡張 + slide 遷移
  - 次回避ける: 全画面マスク拡張から次画面をスライドイン

### 背景・ビジュアル

- particle-glass-background-shift
  - 主役: 背景パーティクル + ガラス面
  - 軸: 背景に運動を持たせて前面情報を浮かせる
  - 次回避ける: 背景粒子と glass panel の組み合わせ

### 複合ランディング演出

- steelworks-landing-page-reveal
  - 主役: 複数セクション全体
  - 軸: preloader -> card align -> central visual expand の多段構成
  - 次回避ける: 5 枚前後の構成を段階的に整列させる reveal

## 新規記事を考えるときのメモ

- まず既存記事の「次回避ける」を 2 件以上読む
- そのうえで「今回はこれ以外」を 1 行で決める
- 記事本文の冒頭か下書きに、差分を短く残しておく

例:

- 今回はこれ以外: pin hero / split text / magnetic card 以外
- 今回の主役: SVG path に沿った移動
- 今回の見せ場: セクション切り替えではなく、1 画面内の状態変化
---
title: R3F Canvas Background Basic
description: React Three FiberのCanvasをDOMコンテンツの背面に置くための、最小限のレイヤー構造を作ります。
category: 3D・WebGL寄り
tags:
  - Three.js
  - WebGL
  - 3D
  - UI
  - CSS
date: 2026年6月5日
publishedAt: 2026-06-05
readTime: 5分
viewer: playground
thumbnail: runtime
layout: default
files:
  - name: Component.jsx
    language: jsx
    content: |
      import { Canvas, useFrame } from '@react-three/fiber'

      const SCENE_CONFIG = {
        cameraPosition: [0, 0, 4.5],
        meshColor: '#6ee7c8',
        rotationSpeed: 0.18,
      }

      function BackgroundShape() {
        const meshRef = React.useRef(null)

        useFrame((state, delta) => {
          if (!meshRef.current) return

          meshRef.current.rotation.x += delta * SCENE_CONFIG.rotationSpeed
          meshRef.current.rotation.y += delta * SCENE_CONFIG.rotationSpeed * 0.7
          meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08
        })

        return (
          <mesh ref={meshRef} position={[1.15, -0.1, 0]} scale={1.25}>
            <torusKnotGeometry args={[0.72, 0.18, 96, 12]} />
            <meshStandardMaterial
              color={SCENE_CONFIG.meshColor}
              roughness={0.48}
              metalness={0.18}
            />
          </mesh>
        )
      }

      function CanvasBackground() {
        return (
          <div className="r3f-background-layer" aria-hidden="true">
            <Canvas
              camera={{ position: SCENE_CONFIG.cameraPosition, fov: 42 }}
              dpr={[1, 1.5]}
            >
              <color attach="background" args={['#191716']} />
              <ambientLight intensity={1.2} />
              <directionalLight position={[3, 4, 5]} intensity={2.1} />
              <BackgroundShape />
            </Canvas>
          </div>
        )
      }

      function Demo() {
        return (
          <section className="r3f-section">
            <CanvasBackground />

            <div className="r3f-content">
              <p className="r3f-label">R3F BACKGROUND</p>
              <h1>Canvasは背景に、HTMLは前面に。</h1>
              <p>
                3D表現はReact Three Fiberに任せ、見出しや本文は通常のDOMとして
                読みやすく配置します。
              </p>
              <a className="r3f-link" href="#section-background">
                Section example
              </a>
            </div>
          </section>
        )
      }
  - name: styles.css
    language: css
    content: |
      body {
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        background: #0f0e0d;
        font-family: Inter, system-ui, sans-serif;
      }

      .r3f-section {
        position: relative;
        isolation: isolate;
        width: min(980px, calc(100vw - 32px));
        min-height: 420px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 8px;
        background: #191716;
      }

      .r3f-background-layer {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
      }

      .r3f-background-layer canvas {
        display: block;
      }

      .r3f-content {
        position: relative;
        z-index: 1;
        max-width: 520px;
        padding: clamp(40px, 8vw, 88px);
        color: #fff7ed;
      }

      .r3f-label {
        margin: 0 0 18px;
        color: #6ee7c8;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0;
      }

      .r3f-content h1 {
        margin: 0;
        font-size: clamp(2.4rem, 6vw, 4.5rem);
        line-height: 1;
        letter-spacing: 0;
      }

      .r3f-content p:not(.r3f-label) {
        margin: 22px 0 0;
        max-width: 30rem;
        color: rgba(255, 247, 237, 0.76);
        font-size: 1rem;
        line-height: 1.8;
      }

      .r3f-link {
        display: inline-flex;
        align-items: center;
        min-height: 44px;
        margin-top: 28px;
        padding: 0 18px;
        border: 1px solid rgba(255, 247, 237, 0.24);
        border-radius: 8px;
        color: #fff7ed;
        text-decoration: none;
        background: rgba(255, 247, 237, 0.08);
      }

      @media (max-width: 640px) {
        .r3f-section {
          min-height: 520px;
        }

        .r3f-content {
          padding: 34px 26px;
        }
      }
code:
  jsx: |
    import { Canvas, useFrame } from '@react-three/fiber'

    const SCENE_CONFIG = {
      cameraPosition: [0, 0, 4.5],
      meshColor: '#6ee7c8',
      rotationSpeed: 0.18,
    }

    function BackgroundShape() {
      const meshRef = React.useRef(null)

      useFrame((state, delta) => {
        if (!meshRef.current) return

        meshRef.current.rotation.x += delta * SCENE_CONFIG.rotationSpeed
        meshRef.current.rotation.y += delta * SCENE_CONFIG.rotationSpeed * 0.7
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08
      })

      return (
        <mesh ref={meshRef} position={[1.15, -0.1, 0]} scale={1.25}>
          <torusKnotGeometry args={[0.72, 0.18, 96, 12]} />
          <meshStandardMaterial
            color={SCENE_CONFIG.meshColor}
            roughness={0.48}
            metalness={0.18}
          />
        </mesh>
      )
    }

    function CanvasBackground() {
      return (
        <div className="r3f-background-layer" aria-hidden="true">
          <Canvas
            camera={{ position: SCENE_CONFIG.cameraPosition, fov: 42 }}
            dpr={[1, 1.5]}
          >
            <color attach="background" args={['#191716']} />
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 4, 5]} intensity={2.1} />
            <BackgroundShape />
          </Canvas>
        </div>
      )
    }

    function Demo() {
      return (
        <section className="r3f-section">
          <CanvasBackground />

          <div className="r3f-content">
            <p className="r3f-label">R3F BACKGROUND</p>
            <h1>Canvasは背景に、HTMLは前面に。</h1>
            <p>
              3D表現はReact Three Fiberに任せ、見出しや本文は通常のDOMとして
              読みやすく配置します。
            </p>
            <a className="r3f-link" href="#section-background">
              Section example
            </a>
          </div>
        </section>
      )
    }
  css: |
    body {
      min-height: 100vh;
      margin: 0;
      display: grid;
      place-items: center;
      background: #0f0e0d;
      font-family: Inter, system-ui, sans-serif;
    }

    .r3f-section {
      position: relative;
      isolation: isolate;
      width: min(980px, calc(100vw - 32px));
      min-height: 420px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 8px;
      background: #191716;
    }

    .r3f-background-layer {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    .r3f-background-layer canvas {
      display: block;
    }

    .r3f-content {
      position: relative;
      z-index: 1;
      max-width: 520px;
      padding: clamp(40px, 8vw, 88px);
      color: #fff7ed;
    }

    .r3f-label {
      margin: 0 0 18px;
      color: #6ee7c8;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0;
    }

    .r3f-content h1 {
      margin: 0;
      font-size: clamp(2.4rem, 6vw, 4.5rem);
      line-height: 1;
      letter-spacing: 0;
    }

    .r3f-content p:not(.r3f-label) {
      margin: 22px 0 0;
      max-width: 30rem;
      color: rgba(255, 247, 237, 0.76);
      font-size: 1rem;
      line-height: 1.8;
    }

    .r3f-link {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      margin-top: 28px;
      padding: 0 18px;
      border: 1px solid rgba(255, 247, 237, 0.24);
      border-radius: 8px;
      color: #fff7ed;
      text-decoration: none;
      background: rgba(255, 247, 237, 0.08);
    }

    @media (max-width: 640px) {
      .r3f-section {
        min-height: 520px;
      }

      .r3f-content {
        padding: 34px 26px;
      }
    }

---

## 📝 はじめに

R3FのCanvasを使うと、通常のDOMだけでは作りにくい奥行きや立体感をセクション背景に足せます。

ただし、背景を作るために見出しや本文までCanvas内に入れてしまうと、テキスト選択、リンク、アクセシビリティ、レスポンシブ調整が扱いにくくなります。この記事では、**R3Fは3D表現、HTMLは情報表示**という責務分離を主役にして、1つのセクション内でCanvasを背面に敷く最小構成を作ります。

今回はこれ以外: shader、画像テクスチャ、マウス追従、ScrollTrigger、完成されたHero演出  
今回の主役: R3F CanvasをDOM背景として配置する基本構造  
最小単位: 1つのセクション内で、背面にCanvas、前面にHTMLテキストを重ねるだけ  
差分: 背景表現を作り込むのではなく、レイヤー構造と責務分離だけに絞る  
再利用先: Hero背景、導入セクション、CTA前の区切り、記事詳細の見出し背景  
分離する責務: R3F / WebGLは背景の3D表現、DOMはテキストとリンク、CSSは重なり順と余白

## 🎯 今回作るもの

作るのは、1つのセクションの背面にR3FのCanvasを置き、その上に通常のHTMLテキストを重ねる小さな部品です。

* **主役:** R3F Canvasを背景レイヤーとして配置する構造
* **トリガー:** 初回表示後の常時描画
* **対象要素:** 背景Canvas、前面のHTML見出しと本文
* **再利用先:** Hero背景、セクション背景、キャンペーン導入、記事ページのキービジュアル

ここでは3Dオブジェクトの完成度を上げることは目的にしません。背景には簡単な`torusKnotGeometry`を1つ置くだけにして、読み手が「どこがCanvasで、どこがHTMLか」を追いやすい構成にしています。

## 🧩 コンポーネント設計

このデモは、3つの役割に分けます。

* **Demo**
  セクション全体を持つ親コンポーネントです。背景Canvasと前面DOMを並べるだけにして、細かいWebGL処理は直接書きません。

* **CanvasBackground**
  Canvasを包む背景レイヤーです。`aria-hidden="true"`を付けて、装飾背景として扱います。ここにカメラ、ライト、背景色をまとめます。

* **BackgroundShape**
  Canvas内の3Dオブジェクトだけを担当します。`useFrame`で少しだけ回転させますが、DOMやCSSのことは知りません。

HTMLテキストをCanvas内に入れない理由は、情報表示としての扱いやすさを保つためです。見出しや本文、リンクは通常のDOMにしておくと、フォント、行間、折り返し、リンクのクリック、SEO、スクリーンリーダー対応をいつものCSSとHTMLの流れで調整できます。

## 🛠️ 実装のポイント

`section`には`position: relative`を付けます。これは、内側のCanvasレイヤーを`position: absolute`で配置するときの基準を作るためです。

背景レイヤーには`position: absolute`、`inset: 0`、`z-index: 0`を指定します。`inset: 0`でセクション全体を覆い、`z-index: 0`で前面DOMより後ろに置きます。Canvasはこのレイヤーの中だけで描画されるので、セクション背景として扱いやすくなります。

前面の`.r3f-content`には`position: relative`と`z-index: 1`を付けます。`z-index`は、同じ重なり文脈の中でどちらを手前に出すかを決めるための指定です。CanvasとHTMLが同じ場所に重なる場合、前面コンテンツ側にも明示的な`z-index`を持たせると、後から背景の要素を増やしても表示順が崩れにくくなります。

`.r3f-section`の`isolation: isolate`は、このセクション内の重なりを外側の要素から切り離すための保険です。ページ全体のヘッダーや他セクションに大きな`z-index`がある場合でも、この部品内の`z-index: 0`と`z-index: 1`の関係を読みやすくできます。

`pointer-events: none`は、背景Canvasがクリックやhoverを受け取らないようにするための指定です。今回のCanvasは装飾背景なので、前面のリンクやボタンの操作を邪魔しないことが大切です。逆に、Canvas側でマウス操作を受けたいデモでは、この指定を外してCanvas側にイベント処理を持たせます。

R3F側は3D表現だけに絞ります。`Canvas`は描画面、`BackgroundShape`は簡単なメッシュ、`useFrame`は背景にわずかな動きを与える処理です。前面テキストの余白や読みやすさはCSSで決めるので、Canvas内にHTMLレイアウトの責務を混ぜません。

## 🔧 使いどころとカスタマイズ

実務では、Hero背景やセクション背景にそのまま転用しやすい粒度です。ページ全体の演出として作り込む前に、この構造を1つのセクションで安定させると、後から背景だけ差し替えやすくなります。

調整ダイヤルは、次の値から触ると印象を変えやすいです。

* **セクションの高さ:** `.r3f-section`の`min-height`。Hero寄りなら`560px`以上、記事中の区切りなら`320px`前後。
* **Canvasの前後関係:** `.r3f-background-layer`の`z-index: 0`と`.r3f-content`の`z-index: 1`。背景と本文の順序を固定するための基本セット。
* **操作の受け渡し:** `.r3f-background-layer`の`pointer-events`。装飾背景なら`none`、Canvas操作が必要なら`auto`。
* **3Dの存在感:** `SCENE_CONFIG.meshColor`、`BackgroundShape`の`scale`、ライトの`intensity`。本文より目立ちすぎる場合は、スケールやライトを下げます。
* **動きの強さ:** `SCENE_CONFIG.rotationSpeed`。背景用途では`0.1〜0.25`程度に抑えると、前面の文章を読む邪魔になりにくいです。
* **画質と負荷:** `Canvas`の`dpr={[1, 1.5]}`。高精細にしすぎると負荷が上がるので、背景では上限を控えめにします。

Canvasを背景に分けると、HTML側の文章量が増えても3Dシーンを直さずに済みます。反対に、背景のメッシュやライトを変更しても、前面DOMの情報設計には触れずに済みます。この分離が、実務で使い回しやすい一番の理由です。

## 🚀 発展させるなら

次に発展させるなら、まずは背景オブジェクトの種類を変える程度に留めるのがおすすめです。`sphereGeometry`や`icosahedronGeometry`に差し替えるだけでも、セクションの印象は変わります。

その後で、画面幅に応じてメッシュ位置を変える、Canvasの背景色をテーマ変数に合わせる、前面DOMにCTAを足す、といった順番で拡張します。shader、画像テクスチャ、マウス追従、スクロール連動は魅力的ですが、まずはCanvasが背景として安全に配置されていることを確認してから足す方が、構造が崩れにくくなります。

### _animation-inventory.md に追記する台帳メモ

#### r3f-canvas-background-basic

* 主役: Canvas背景
* 軸: R3F CanvasをDOMコンテンツの背面レイヤーとして配置する
* トリガー: 初回表示後の常時描画
* 見せ場: 1つのセクション内でCanvas背景とHTML本文を重ねる構造
* 次回避ける: 背景Canvasと前面DOMのz-index / pointer-events整理だけを主役にする構成

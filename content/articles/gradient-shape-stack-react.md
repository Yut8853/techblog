---
title: Glass Bokeh WebGL Hero
description: 淡いボケとガラス質の3Dシェイプで、導入セクションに高級感と奥行きを足すWebGL背景表現です。
category: 3D・WebGL寄り
tags:
  - WebGL
  - JavaScript
  - アニメーション
  - UI
  - UX
  - 3D
  - パフォーマンス
date: 2026年5月26日
publishedAt: 2026-05-26
readTime: 5分
viewer: playground
thumbnail: runtime
layout: default
files:
  - name: Component.jsx
    language: jsx
    content: |
      const UNICORN_SDK_VERSION = '2.1.12'
      const SCENE_SRC = '/unicorn/bokeh-gradient-shape-stack.json.txt'
      
      function loadUnicornStudioSdk() {
        return new Promise((resolve, reject) => {
          if (typeof window === 'undefined') {
            reject(new Error('ブラウザ環境でのみ実行できます'))
            return
          }
      
          if (window.UnicornStudio?.init) {
            resolve(window.UnicornStudio)
            return
          }
      
          const existingScript = document.querySelector('[data-unicorn-studio-sdk="true"]')
      
          if (existingScript) {
            existingScript.addEventListener('load', () => resolve(window.UnicornStudio), { once: true })
            existingScript.addEventListener(
              'error',
              () => reject(new Error('Unicorn Studio SDK の読み込みに失敗しました')),
              { once: true }
            )
            return
          }
      
          const script = document.createElement('script')
          script.src = `https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v${UNICORN_SDK_VERSION}/dist/unicornStudio.umd.js`
          script.async = true
          script.dataset.unicornStudioSdk = 'true'
          script.onload = () => resolve(window.UnicornStudio)
          script.onerror = () => reject(new Error('Unicorn Studio SDK の読み込みに失敗しました'))
          document.body.appendChild(script)
        })
      }
      
      function Demo() {
        const sceneHostRef = React.useRef(null)
        const sceneInstanceRef = React.useRef(null)
        const [status, setStatus] = React.useState('loading')
        const [message, setMessage] = React.useState('')
      
        React.useEffect(() => {
          let isMounted = true
      
          async function initScene() {
            try {
              const UnicornStudio = await loadUnicornStudioSdk()
              const host = sceneHostRef.current
      
              if (!isMounted || !host) return
      
              sceneInstanceRef.current?.destroy?.()
              sceneInstanceRef.current = null
              host.innerHTML = ''
      
              const scenes = await UnicornStudio.init()
              const ownScene = scenes.find((scene) => {
                return scene.element === host || scene.el === host || scene.domElement === host
              })
      
              if (!isMounted) return
      
              sceneInstanceRef.current = ownScene || scenes[scenes.length - 1] || null
              setStatus('ready')
            } catch (error) {
              if (!isMounted) return
              setStatus('error')
              setMessage(error?.message || 'WebGLシーンを読み込めませんでした')
            }
          }
      
          initScene()
      
          return () => {
            isMounted = false
            sceneInstanceRef.current?.destroy?.()
            sceneInstanceRef.current = null
          }
        }, [])
      
        return (
          <section className="glass-bokeh-stage">
            <div className="glass-bokeh-shell">
              <div
                ref={sceneHostRef}
                className="glass-bokeh-scene"
                data-us-project-src={SCENE_SRC}
                data-us-scale="0.82"
                data-us-dpi="1.25"
                data-us-fps="60"
                data-us-lazyload="false"
                data-us-production="true"
                data-us-alttext="Glassy bokeh WebGL background"
                data-us-arialabel="Decorative glassy WebGL background animation"
              />
      
              <div className="glass-bokeh-veil" />
      
              <div className="hero-copy">
                <span className="hero-kicker">WEBGL VISUAL SYSTEM</span>
                <h1>淡いボケとガラス質の3Dで、導入に余白と奥行きをつくる。</h1>
                <p>
                  背景全体は静かに動かし、前面のコピーは読みやすく固定する。
                  ビジュアルの強さを演出に使いながら、主役はあくまでメッセージに残す構成です。
                </p>
      
                <div className="hero-actions" aria-label="Use cases">
                  <span>Hero</span>
                  <span>SaaS LP</span>
                  <span>Portfolio</span>
                </div>
              </div>
      
              <div className="scene-status" data-visible={status !== 'ready'}>
                {status === 'error' ? message : 'Loading WebGL scene'}
              </div>
            </div>
          </section>
        )
      }
  - name: styles.css
    language: css
    content: |
      body {
        margin: 0;
        min-height: 100vh;
        background: #eef2ff;
        color: #0f172a;
      }
      
      .glass-bokeh-stage {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: clamp(1rem, 4vw, 3rem);
        background:
          radial-gradient(circle at 16% 18%, rgba(147, 197, 253, 0.5), transparent 32%),
          radial-gradient(circle at 86% 14%, rgba(196, 181, 253, 0.42), transparent 30%),
          linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%);
      }
      
      .glass-bokeh-shell {
        position: relative;
        width: min(1120px, 100%);
        min-height: min(76vh, 720px);
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.72);
        border-radius: clamp(1.5rem, 4vw, 2.5rem);
        background: #c7d2fe;
        box-shadow:
          0 34px 90px rgba(30, 41, 59, 0.22),
          inset 0 1px 0 rgba(255, 255, 255, 0.75);
        isolation: isolate;
      }
      
      .glass-bokeh-scene {
        position: absolute;
        inset: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
      }
      
      .glass-bokeh-veil {
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background:
          linear-gradient(90deg, rgba(248, 250, 252, 0.88) 0%, rgba(248, 250, 252, 0.62) 36%, rgba(248, 250, 252, 0.16) 72%),
          radial-gradient(circle at 22% 48%, rgba(255, 255, 255, 0.78), transparent 42%),
          linear-gradient(180deg, rgba(15, 23, 42, 0) 58%, rgba(15, 23, 42, 0.22) 100%);
      }
      
      .hero-copy {
        position: relative;
        z-index: 2;
        min-height: min(76vh, 720px);
        max-width: 620px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1.25rem;
        padding: clamp(2rem, 7vw, 5rem);
      }
      
      .hero-kicker {
        width: fit-content;
        border: 1px solid rgba(79, 70, 229, 0.22);
        border-radius: 999px;
        padding: 0.45rem 0.75rem;
        background: rgba(255, 255, 255, 0.58);
        color: #4f46e5;
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        backdrop-filter: blur(16px);
      }
      
      .hero-copy h1 {
        max-width: 12ch;
        margin: 0;
        font-size: clamp(2.7rem, 7vw, 5.8rem);
        line-height: 0.94;
        letter-spacing: -0.08em;
      }
      
      .hero-copy p {
        max-width: 34rem;
        margin: 0;
        color: #475569;
        font-size: clamp(1rem, 1.8vw, 1.1rem);
        line-height: 1.9;
      }
      
      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        padding-top: 0.5rem;
      }
      
      .hero-actions span {
        border: 1px solid rgba(15, 23, 42, 0.1);
        border-radius: 999px;
        padding: 0.7rem 0.9rem;
        background: rgba(255, 255, 255, 0.62);
        color: #111827;
        font-size: 0.82rem;
        font-weight: 800;
        box-shadow: 0 10px 24px rgba(30, 41, 59, 0.08);
        backdrop-filter: blur(18px);
      }
      
      .scene-status {
        position: absolute;
        right: 1rem;
        bottom: 1rem;
        z-index: 3;
        max-width: min(28rem, calc(100% - 2rem));
        border: 1px solid rgba(15, 23, 42, 0.1);
        border-radius: 999px;
        padding: 0.65rem 0.9rem;
        background: rgba(255, 255, 255, 0.74);
        color: #475569;
        font-size: 0.8rem;
        font-weight: 700;
        box-shadow: 0 14px 34px rgba(30, 41, 59, 0.12);
        backdrop-filter: blur(18px);
        transition: opacity 0.25s ease, transform 0.25s ease;
      }
      
      .scene-status[data-visible='false'] {
        opacity: 0;
        pointer-events: none;
        transform: translateY(8px);
      }
      
      @media (max-width: 720px) {
        .glass-bokeh-shell {
          min-height: 640px;
        }
      
        .glass-bokeh-veil {
          background:
            linear-gradient(180deg, rgba(248, 250, 252, 0.92) 0%, rgba(248, 250, 252, 0.58) 58%, rgba(15, 23, 42, 0.2) 100%);
        }
      
        .hero-copy {
          min-height: 640px;
          padding: 2rem;
          justify-content: flex-start;
          padding-top: 3rem;
        }
      
        .hero-copy h1 {
          max-width: 11ch;
        }
      }
code:
  jsx: |
    const UNICORN_SDK_VERSION = '2.1.12'
    const SCENE_SRC = '/unicorn/bokeh-gradient-shape-stack.json.txt'
    
    function loadUnicornStudioSdk() {
      return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
          reject(new Error('ブラウザ環境でのみ実行できます'))
          return
        }
    
        if (window.UnicornStudio?.init) {
          resolve(window.UnicornStudio)
          return
        }
    
        const existingScript = document.querySelector('[data-unicorn-studio-sdk="true"]')
    
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve(window.UnicornStudio), { once: true })
          existingScript.addEventListener(
            'error',
            () => reject(new Error('Unicorn Studio SDK の読み込みに失敗しました')),
            { once: true }
          )
          return
        }
    
        const script = document.createElement('script')
        script.src = `https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v${UNICORN_SDK_VERSION}/dist/unicornStudio.umd.js`
        script.async = true
        script.dataset.unicornStudioSdk = 'true'
        script.onload = () => resolve(window.UnicornStudio)
        script.onerror = () => reject(new Error('Unicorn Studio SDK の読み込みに失敗しました'))
        document.body.appendChild(script)
      })
    }
    
    function Demo() {
      const sceneHostRef = React.useRef(null)
      const sceneInstanceRef = React.useRef(null)
      const [status, setStatus] = React.useState('loading')
      const [message, setMessage] = React.useState('')
    
      React.useEffect(() => {
        let isMounted = true
    
        async function initScene() {
          try {
            const UnicornStudio = await loadUnicornStudioSdk()
            const host = sceneHostRef.current
    
            if (!isMounted || !host) return
    
            sceneInstanceRef.current?.destroy?.()
            sceneInstanceRef.current = null
            host.innerHTML = ''
    
            const scenes = await UnicornStudio.init()
            const ownScene = scenes.find((scene) => {
              return scene.element === host || scene.el === host || scene.domElement === host
            })
    
            if (!isMounted) return
    
            sceneInstanceRef.current = ownScene || scenes[scenes.length - 1] || null
            setStatus('ready')
          } catch (error) {
            if (!isMounted) return
            setStatus('error')
            setMessage(error?.message || 'WebGLシーンを読み込めませんでした')
          }
        }
    
        initScene()
    
        return () => {
          isMounted = false
          sceneInstanceRef.current?.destroy?.()
          sceneInstanceRef.current = null
        }
      }, [])
    
      return (
        <section className="glass-bokeh-stage">
          <div className="glass-bokeh-shell">
            <div
              ref={sceneHostRef}
              className="glass-bokeh-scene"
              data-us-project-src={SCENE_SRC}
              data-us-scale="0.82"
              data-us-dpi="1.25"
              data-us-fps="60"
              data-us-lazyload="false"
              data-us-production="true"
              data-us-alttext="Glassy bokeh WebGL background"
              data-us-arialabel="Decorative glassy WebGL background animation"
            />
    
            <div className="glass-bokeh-veil" />
    
            <div className="hero-copy">
              <span className="hero-kicker">WEBGL VISUAL SYSTEM</span>
              <h1>淡いボケとガラス質の3Dで、導入に余白と奥行きをつくる。</h1>
              <p>
                背景全体は静かに動かし、前面のコピーは読みやすく固定する。
                ビジュアルの強さを演出に使いながら、主役はあくまでメッセージに残す構成です。
              </p>
    
              <div className="hero-actions" aria-label="Use cases">
                <span>Hero</span>
                <span>SaaS LP</span>
                <span>Portfolio</span>
              </div>
            </div>
    
            <div className="scene-status" data-visible={status !== 'ready'}>
              {status === 'error' ? message : 'Loading WebGL scene'}
            </div>
          </div>
        </section>
      )
    }
  css: |
    body {
      margin: 0;
      min-height: 100vh;
      background: #eef2ff;
      color: #0f172a;
    }
    
    .glass-bokeh-stage {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: clamp(1rem, 4vw, 3rem);
      background:
        radial-gradient(circle at 16% 18%, rgba(147, 197, 253, 0.5), transparent 32%),
        radial-gradient(circle at 86% 14%, rgba(196, 181, 253, 0.42), transparent 30%),
        linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%);
    }
    
    .glass-bokeh-shell {
      position: relative;
      width: min(1120px, 100%);
      min-height: min(76vh, 720px);
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.72);
      border-radius: clamp(1.5rem, 4vw, 2.5rem);
      background: #c7d2fe;
      box-shadow:
        0 34px 90px rgba(30, 41, 59, 0.22),
        inset 0 1px 0 rgba(255, 255, 255, 0.75);
      isolation: isolate;
    }
    
    .glass-bokeh-scene {
      position: absolute;
      inset: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    
    .glass-bokeh-veil {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background:
        linear-gradient(90deg, rgba(248, 250, 252, 0.88) 0%, rgba(248, 250, 252, 0.62) 36%, rgba(248, 250, 252, 0.16) 72%),
        radial-gradient(circle at 22% 48%, rgba(255, 255, 255, 0.78), transparent 42%),
        linear-gradient(180deg, rgba(15, 23, 42, 0) 58%, rgba(15, 23, 42, 0.22) 100%);
    }
    
    .hero-copy {
      position: relative;
      z-index: 2;
      min-height: min(76vh, 720px);
      max-width: 620px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1.25rem;
      padding: clamp(2rem, 7vw, 5rem);
    }
    
    .hero-kicker {
      width: fit-content;
      border: 1px solid rgba(79, 70, 229, 0.22);
      border-radius: 999px;
      padding: 0.45rem 0.75rem;
      background: rgba(255, 255, 255, 0.58);
      color: #4f46e5;
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      backdrop-filter: blur(16px);
    }
    
    .hero-copy h1 {
      max-width: 12ch;
      margin: 0;
      font-size: clamp(2.7rem, 7vw, 5.8rem);
      line-height: 0.94;
      letter-spacing: -0.08em;
    }
    
    .hero-copy p {
      max-width: 34rem;
      margin: 0;
      color: #475569;
      font-size: clamp(1rem, 1.8vw, 1.1rem);
      line-height: 1.9;
    }
    
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
      padding-top: 0.5rem;
    }
    
    .hero-actions span {
      border: 1px solid rgba(15, 23, 42, 0.1);
      border-radius: 999px;
      padding: 0.7rem 0.9rem;
      background: rgba(255, 255, 255, 0.62);
      color: #111827;
      font-size: 0.82rem;
      font-weight: 800;
      box-shadow: 0 10px 24px rgba(30, 41, 59, 0.08);
      backdrop-filter: blur(18px);
    }
    
    .scene-status {
      position: absolute;
      right: 1rem;
      bottom: 1rem;
      z-index: 3;
      max-width: min(28rem, calc(100% - 2rem));
      border: 1px solid rgba(15, 23, 42, 0.1);
      border-radius: 999px;
      padding: 0.65rem 0.9rem;
      background: rgba(255, 255, 255, 0.74);
      color: #475569;
      font-size: 0.8rem;
      font-weight: 700;
      box-shadow: 0 14px 34px rgba(30, 41, 59, 0.12);
      backdrop-filter: blur(18px);
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    
    .scene-status[data-visible='false'] {
      opacity: 0;
      pointer-events: none;
      transform: translateY(8px);
    }
    
    @media (max-width: 720px) {
      .glass-bokeh-shell {
        min-height: 640px;
      }
    
      .glass-bokeh-veil {
        background:
          linear-gradient(180deg, rgba(248, 250, 252, 0.92) 0%, rgba(248, 250, 252, 0.58) 58%, rgba(15, 23, 42, 0.2) 100%);
      }
    
      .hero-copy {
        min-height: 640px;
        padding: 2rem;
        justify-content: flex-start;
        padding-top: 3rem;
      }
    
      .hero-copy h1 {
        max-width: 11ch;
      }
    }
---

## 🎯 企画メモ

- **今回はこれ以外:** pinされたヒーロー見出しの縮小フェード、単体カードのtilt発光、背景粒子とglass panelの組み合わせ以外
- **今回の主役:** ガラス質の3Dシェイプと淡いボケで、ファーストビューに高級感を足すWebGL背景
- **差分:** スクロールやホバーで要素を切り替えるのではなく、常時動く背景を「空気感」として使う

## 📝 はじめに

この表現は、主張の強いアニメーションというより、ページの第一印象を底上げするための背景ビジュアルです。淡いグラデーション、柔らかいボケ、ガラスのような3Dシェイプを重ねることで、SaaSやAIツール、ポートフォリオの導入に「軽さ」と「先進感」を出せます。

ポイントは、WebGLを主役にしすぎないこと。背景はリッチに動かしつつ、前面のコピーには白いベールを重ねて、読ませたい情報のコントラストを守っています。

## 🛠️ 実装のポイント

- **WebGLは背景レイヤーとして扱う**  
  `glass-bokeh-scene` を全面に敷き、コピーやラベルは別レイヤーとして上に重ねています。WebGLそのものを見せ場にしつつ、テキストの読みやすさを崩さないためです。

- **白いベールで情報設計を整える**  
  `glass-bokeh-veil` は単なる装飾ではなく、背景の強さを抑えるためのフィルターです。左側を明るく、右側を少し透明にすることで、コピーの視認性とWebGLの見せ場を両立しています。

- **Reactでは読み込みと破棄を明確にする**  
  Unicorn StudioのSDKは `useEffect` の中で読み込み、アンマウント時に `scene.destroy()` を呼んでいます。ブログのプレビューやページ遷移で何度も表示される場合、WebGLリソースを残さないための処理です。

## 💡 使いどころとカスタマイズ

- **最適なユースケース:**  
  SaaSのファーストビュー、AI系サービスのLP、制作会社のキービジュアル、ポートフォリオの導入、プロダクト紹介ページの背景に向いています。  
  反対に、長文記事の本文背景やフォーム周辺など、集中して読む・入力する場所には強すぎる場合があります。

- **調整ダイヤル（パラメーター変更のヒント）:**
  - `data-us-scale="0.65"` に変更すると、描画負荷が下がり、見た目も少し柔らかい印象になります。
  - `data-us-dpi="1"` に変更すると、スマホや低スペック環境で安定しやすくなります。
  - `data-us-fps="30"` に変更すると、滑らかさは少し落ちますが、背景演出としては十分な場合があります。
  - `.glass-bokeh-veil` の白いグラデーションを強めると、コピーが読みやすくなります。
  - `.hero-copy h1` の `max-width` を広げると、ビジュアル感よりも情報量のあるLP向きになります。
  - `.glass-bokeh-shell` の `border-radius` を小さくすると、よりプロダクトUIっぽい硬い印象になります。

## まとめ

この表現は、派手な操作演出ではなく、ページ全体の雰囲気を作るためのWebGL背景として使うのが合っています。淡いボケとガラス質の3Dを背景に置き、前面の情報はしっかり読ませる。LPやポートフォリオで「何か作り込まれている」と最初に感じてもらいたいときに使いやすい表現です。
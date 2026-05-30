---
title: Flowmap JUNKBRANDING Mask React
description: OGLのFlowmapで歪ませたWebGL背景を、JUNKBRANDINGの白マスクで抜いて見せるReact実装です。
category: 3D・WebGL寄り
tags:
  - WebGL
  - JavaScript
  - SVG
  - CSS
  - アニメーション
  - インタラクション
  - UX
date: 2026年5月28日
publishedAt: 2026-05-28
readTime: 7分
viewer: playground
thumbnail: runtime
layout: tutorial
files:
  - name: Component.jsx
    language: jsx
    content: |
      import { fragmentShaderSource, vertexShaderSource } from './shaders.js'

      function FlowmapLogoMask() {
        const stageRef = React.useRef(null)
        const canvasHostRef = React.useRef(null)

        React.useEffect(() => {
          let renderer
          let gl
          let mesh
          let program
          let flowmap
          let animationFrame = 0
          let disposed = false
          let removePointerListeners = () => {}

          async function setup() {
            const host = canvasHostRef.current
            const stage = stageRef.current
            if (!host || !stage) return

            const loadOgl = new Function('url', 'return import(url)')
            const ogl = await loadOgl('https://esm.sh/ogl@1.0.11?bundle')
            if (disposed) return

            const imageSize = [2048, 1638]
            renderer = new ogl.Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 2) })
            gl = renderer.gl
            host.appendChild(gl.canvas)

            const mouse = new ogl.Vec2(-1)
            const velocity = new ogl.Vec2()
            const lastMouse = new ogl.Vec2()
            let aspect = 1
            let lastTime = 0

            flowmap = new ogl.Flowmap(gl, {
              falloff: 0.3,
              dissipation: 0.92,
              alpha: 0.5,
            })

            const geometry = new ogl.Geometry(gl, {
              position: {
                size: 2,
                data: new Float32Array([-1, -1, 3, -1, -1, 3]),
              },
              uv: {
                size: 2,
                data: new Float32Array([0, 0, 2, 0, 0, 2]),
              },
            })

            const texture = new ogl.Texture(gl, {
              minFilter: gl.LINEAR,
              magFilter: gl.LINEAR,
            })

            const image = new Image()
            image.crossOrigin = 'anonymous'
            image.onload = () => {
              texture.image = image
            }
            image.src = 'https://robindelaporte.fr/codepen/bg3.jpg'

            function getCoverRatio(width, height) {
              const imageAspect = imageSize[1] / imageSize[0]
              if (height / width < imageAspect) {
                return [1, height / width / imageAspect]
              }
              return [(width / height) * imageAspect, 1]
            }

            const [initialX, initialY] = getCoverRatio(stage.clientWidth, stage.clientHeight)

            program = new ogl.Program(gl, {
              vertex: vertexShaderSource,
              fragment: fragmentShaderSource,
              uniforms: {
                uTime: { value: 0 },
                tWater: { value: texture },
                tFlow: flowmap.uniform,
                res: {
                  value: new ogl.Vec4(stage.clientWidth, stage.clientHeight, initialX, initialY),
                },
                img: { value: new ogl.Vec2(imageSize[1], imageSize[0]) },
              },
            })

            mesh = new ogl.Mesh(gl, { geometry, program })

            function resize() {
              const width = Math.max(1, stage.clientWidth)
              const height = Math.max(1, stage.clientHeight)
              const [coverX, coverY] = getCoverRatio(width, height)
              renderer.setSize(width, height)
              program.uniforms.res.value = new ogl.Vec4(width, height, coverX, coverY)
              aspect = width / height
            }

            function updatePointer(event) {
              const rect = stage.getBoundingClientRect()
              const source = event.changedTouches?.[0] || event
              const x = source.clientX - rect.left
              const y = source.clientY - rect.top

              mouse.set(x / rect.width, 1 - y / rect.height)

              if (!lastTime) {
                lastTime = performance.now()
                lastMouse.set(x, y)
              }

              const now = performance.now()
              const delta = Math.max(10.4, now - lastTime)
              velocity.x = (x - lastMouse.x) / delta
              velocity.y = (y - lastMouse.y) / delta
              velocity.needsUpdate = true
              lastMouse.set(x, y)
              lastTime = now
            }

            function render(time) {
              if (disposed) return

              if (!velocity.needsUpdate) {
                mouse.set(-1)
                velocity.set(0)
              }

              velocity.needsUpdate = false
              flowmap.aspect = aspect
              flowmap.mouse.copy(mouse)
              flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1)
              flowmap.update()
              program.uniforms.uTime.value = time * 0.01
              renderer.render({ scene: mesh })
              animationFrame = window.requestAnimationFrame(render)
            }

            resize()
            window.addEventListener('resize', resize)
            stage.addEventListener('pointermove', updatePointer)
            stage.addEventListener('pointerdown', updatePointer)

            removePointerListeners = () => {
              window.removeEventListener('resize', resize)
              stage.removeEventListener('pointermove', updatePointer)
              stage.removeEventListener('pointerdown', updatePointer)
            }

            animationFrame = window.requestAnimationFrame(render)
          }

          setup()

          return () => {
            disposed = true
            window.cancelAnimationFrame(animationFrame)
            removePointerListeners()
            gl?.canvas?.remove()
            renderer = null
            gl = null
            mesh = null
            program = null
            flowmap = null
          }
        }, [])

        return (
          <section className="flowmask-stage" ref={stageRef}>
            <div className="flowmask-canvas" ref={canvasHostRef} />
            <div className="flowmask-mask" aria-hidden="true">
              <svg viewBox="0 0 1200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="JUNKBRANDING">
                <text className="flowmask-word" x="600" y="132" textAnchor="middle">
                  JUNKBRANDING
                </text>
              </svg>
            </div>
          </section>
        )
      }
  - name: shaders.js
    language: js
    content: |
      export const vertexShaderSource = `
        attribute vec2 uv;
        attribute vec2 position;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `

      export const fragmentShaderSource = `
        precision highp float;
        precision highp int;

        uniform sampler2D tWater;
        uniform sampler2D tFlow;
        uniform float uTime;
        uniform vec4 res;
        uniform vec2 img;
        varying vec2 vUv;

        void main() {
          vec3 flow = texture2D(tFlow, vUv).rgb;
          vec2 uv = 0.5 * gl_FragCoord.xy / res.xy;

          vec2 redUv = (uv - vec2(0.5)) * res.zw + vec2(0.5);
          redUv -= flow.xy * 0.18;

          vec2 greenUv = (uv - vec2(0.5)) * res.zw + vec2(0.5);
          greenUv -= flow.xy * 0.15;

          vec2 blueUv = (uv - vec2(0.5)) * res.zw + vec2(0.5);
          blueUv -= flow.xy * 0.14;

          vec3 red = texture2D(tWater, redUv).rgb;
          vec3 green = texture2D(tWater, greenUv).rgb;
          vec3 blue = texture2D(tWater, blueUv).rgb;

          gl_FragColor = vec4(red.r, green.g, blue.b, 1.0);
        }
      `
  - name: styles.css
    language: css
    content: |
      body {
        margin: 0;
        background: #000;
      }

      .flowmask-stage {
        position: relative;
        width: 100%;
        height: 100svh;
        min-height: 520px;
        overflow: hidden;
        background: #000;
        touch-action: none;
        isolation: isolate;
      }

      .flowmask-canvas,
      .flowmask-canvas canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .flowmask-canvas canvas {
        display: block;
      }

      .flowmask-mask {
        position: absolute;
        inset: 0;
        z-index: 2;
        display: grid;
        place-items: center;
        background: #fff;
        mix-blend-mode: screen;
        pointer-events: none;
      }

      .flowmask-mask svg {
        width: min(90vw, 1040px);
        height: auto;
        display: block;
      }

      .flowmask-word {
        fill: #000;
        font-family: Impact, "Arial Black", "Helvetica Neue", Arial, sans-serif;
        font-size: 138px;
        font-weight: 900;
        letter-spacing: 0;
      }

      @media (max-width: 720px) {
        .flowmask-mask svg {
          width: 150vw;
        }
      }
code:
  jsx: |
    import { fragmentShaderSource, vertexShaderSource } from './shaders.js'

    function FlowmapLogoMask() {
      const stageRef = React.useRef(null)
      const canvasHostRef = React.useRef(null)

      React.useEffect(() => {
        let renderer
        let gl
        let mesh
        let program
        let flowmap
        let animationFrame = 0
        let disposed = false
        let removePointerListeners = () => {}

        async function setup() {
          const host = canvasHostRef.current
          const stage = stageRef.current
          if (!host || !stage) return

          const loadOgl = new Function('url', 'return import(url)')
          const ogl = await loadOgl('https://esm.sh/ogl@1.0.11?bundle')
          if (disposed) return

          const imageSize = [2048, 1638]
          renderer = new ogl.Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 2) })
          gl = renderer.gl
          host.appendChild(gl.canvas)

          const mouse = new ogl.Vec2(-1)
          const velocity = new ogl.Vec2()
          const lastMouse = new ogl.Vec2()
          let aspect = 1
          let lastTime = 0

          flowmap = new ogl.Flowmap(gl, {
            falloff: 0.3,
            dissipation: 0.92,
            alpha: 0.5,
          })

          const geometry = new ogl.Geometry(gl, {
            position: {
              size: 2,
              data: new Float32Array([-1, -1, 3, -1, -1, 3]),
            },
            uv: {
              size: 2,
              data: new Float32Array([0, 0, 2, 0, 0, 2]),
            },
          })

          const texture = new ogl.Texture(gl, {
            minFilter: gl.LINEAR,
            magFilter: gl.LINEAR,
          })

          const image = new Image()
          image.crossOrigin = 'anonymous'
          image.onload = () => {
            texture.image = image
          }
          image.src = 'https://robindelaporte.fr/codepen/bg3.jpg'

          function getCoverRatio(width, height) {
            const imageAspect = imageSize[1] / imageSize[0]
            if (height / width < imageAspect) {
              return [1, height / width / imageAspect]
            }
            return [(width / height) * imageAspect, 1]
          }

          const [initialX, initialY] = getCoverRatio(stage.clientWidth, stage.clientHeight)

          program = new ogl.Program(gl, {
            vertex: vertexShaderSource,
            fragment: fragmentShaderSource,
            uniforms: {
              uTime: { value: 0 },
              tWater: { value: texture },
              tFlow: flowmap.uniform,
              res: {
                value: new ogl.Vec4(stage.clientWidth, stage.clientHeight, initialX, initialY),
              },
              img: { value: new ogl.Vec2(imageSize[1], imageSize[0]) },
            },
          })

          mesh = new ogl.Mesh(gl, { geometry, program })

          function resize() {
            const width = Math.max(1, stage.clientWidth)
            const height = Math.max(1, stage.clientHeight)
            const [coverX, coverY] = getCoverRatio(width, height)
            renderer.setSize(width, height)
            program.uniforms.res.value = new ogl.Vec4(width, height, coverX, coverY)
            aspect = width / height
          }

          function updatePointer(event) {
            const rect = stage.getBoundingClientRect()
            const source = event.changedTouches?.[0] || event
            const x = source.clientX - rect.left
            const y = source.clientY - rect.top

            mouse.set(x / rect.width, 1 - y / rect.height)

            if (!lastTime) {
              lastTime = performance.now()
              lastMouse.set(x, y)
            }

            const now = performance.now()
            const delta = Math.max(10.4, now - lastTime)
            velocity.x = (x - lastMouse.x) / delta
            velocity.y = (y - lastMouse.y) / delta
            velocity.needsUpdate = true
            lastMouse.set(x, y)
            lastTime = now
          }

          function render(time) {
            if (disposed) return

            if (!velocity.needsUpdate) {
              mouse.set(-1)
              velocity.set(0)
            }

            velocity.needsUpdate = false
            flowmap.aspect = aspect
            flowmap.mouse.copy(mouse)
            flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1)
            flowmap.update()
            program.uniforms.uTime.value = time * 0.01
            renderer.render({ scene: mesh })
            animationFrame = window.requestAnimationFrame(render)
          }

          resize()
          window.addEventListener('resize', resize)
          stage.addEventListener('pointermove', updatePointer)
          stage.addEventListener('pointerdown', updatePointer)

          removePointerListeners = () => {
            window.removeEventListener('resize', resize)
            stage.removeEventListener('pointermove', updatePointer)
            stage.removeEventListener('pointerdown', updatePointer)
          }

          animationFrame = window.requestAnimationFrame(render)
        }

        setup()

        return () => {
          disposed = true
          window.cancelAnimationFrame(animationFrame)
          removePointerListeners()
          gl?.canvas?.remove()
          renderer = null
          gl = null
          mesh = null
          program = null
          flowmap = null
        }
      }, [])

      return (
        <section className="flowmask-stage" ref={stageRef}>
          <div className="flowmask-canvas" ref={canvasHostRef} />
          <div className="flowmask-mask" aria-hidden="true">
            <svg viewBox="0 0 1200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="JUNKBRANDING">
              <text className="flowmask-word" x="600" y="132" textAnchor="middle">
                JUNKBRANDING
              </text>
            </svg>
          </div>
        </section>
      )
    }
  css: |
    body {
      margin: 0;
      background: #000;
    }

    .flowmask-stage {
      position: relative;
      width: 100%;
      height: 100svh;
      min-height: 520px;
      overflow: hidden;
      background: #000;
      touch-action: none;
      isolation: isolate;
    }

    .flowmask-canvas,
    .flowmask-canvas canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .flowmask-canvas canvas {
      display: block;
    }

    .flowmask-mask {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: grid;
      place-items: center;
      background: #fff;
      mix-blend-mode: screen;
      pointer-events: none;
    }

    .flowmask-mask svg {
      width: min(90vw, 1040px);
      height: auto;
      display: block;
    }

    .flowmask-word {
      fill: #000;
      font-family: Impact, "Arial Black", "Helvetica Neue", Arial, sans-serif;
      font-size: 138px;
      font-weight: 900;
      letter-spacing: 0;
    }

    @media (max-width: 720px) {
      .flowmask-mask svg {
        width: 150vw;
      }
    }
---

## 🎯 企画メモ（AI執筆時はここを必ず埋めること）

- **今回はこれ以外:** 背景粒子とglass panel、単体カードの傾きと発光追従、全画面マスク拡張から次画面をスライドイン以外。
- **今回の主役:** OGL Flowmapで歪ませたWebGL画像を、JUNKBRANDINGの白いブレンドマスク越しに見せる表現。
- **差分:** スクロールやカード遷移ではなく、ポインター速度をFlowmapに渡して、ロゴ内部の色収差と水面のような歪みを作る。

---

## 📝 はじめに

このデモは、貼り付けられたOGLのFlowmapコードを、JUNKBRANDINGのSVGテキストマスク付きReactコンポーネントへ分解したものです。WebGL側は `Component.jsx` の `useEffect()` で初期化し、シェーダーは `shaders.js`、見た目の固定配置とブレンドは `styles.css` に分けています。

ポイントは、キャンバス自体を直接マスクするのではなく、白背景に黒い `JUNKBRANDING` テキストを置いたレイヤーへ `mix-blend-mode: screen` を使うことです。黒い文字部分だけ下のWebGLが見え、白い部分は白として残るため、CSSだけで抜き文字のような見せ方ができます。

## 🛠️ 実装のポイント

- **React側でWebGLのライフサイクルを閉じる**
  OGLの `Renderer`、`Flowmap`、`Program`、`Mesh` は `useEffect()` 内で作成します。返り値のクリーンアップで `requestAnimationFrame`、resize、pointerイベント、生成したcanvasを破棄することで、記事プレビューを切り替えても処理が残らないようにしています。
- **シェーダーを別ファイルに分ける**
  GLSL文字列はJSX内に置くと見通しが悪くなるため、`shaders.js` に分離しています。fragment shaderではFlowmapのRGB値を使って赤、緑、青のUVを少しずつずらし、ポインターの動きに色収差を重ねています。
- **SVGテキストをマスクとして扱う**
  ロゴは `text` 要素で `JUNKBRANDING` として描画し、CSSの `.flowmask-word` で太さとサイズを管理しています。パスデータではなく文字列で管理できるため、ブランド名の変更や字間調整が簡単です。

## 💡 使いどころとカスタマイズ

- **最適なユースケース:** ブランドロゴのファーストビュー、音楽・ファッション系LP、展示会やキャンペーンサイトのキービジュアルに向いています。
- **調整ダイヤル（パラメーター変更のヒント）:**
  - `falloff` を `0.18` に変更すると、ポインター周辺だけが鋭く歪む表現になります。
  - fragment shader内の `flow.xy * 0.18` を `0.28` に上げると、色ズレと波打ちが強くなります。

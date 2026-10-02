---
title: "WebGPUで作るディストーション・スライダー"
description: "WebGPUのWGSLフラグメントシェーダーで2つのプロシージャル背景を歪ませながら切り替える、GPU駆動のスライダー表現を実装します。"
category: "WebGPUスライダー"
categorySlug: "webgpu-slider"
categoryDescription: "WebGPUとWGSLを使って、スライダーやカルーセルの切り替え表現をGPU上で描画する実験をまとめるカテゴリーです。"
tags:
  - "WebGPU"
  - "WGSL"
  - "スライダー"
  - "ディストーション"
  - "シェーダー"
  - "Daily Lab"
date: "2026年10月3日"
publishedAt: 2026-10-03
readTime: "7分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 1
focus: "WebGPU"
concept: "WGSLで2つのプロシージャルシーンを歪ませながら補間するスライダー"
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage">
        <canvas class="gpu-canvas" aria-label="WebGPU slider demo"></canvas>

        <div class="slider-ui">
          <div>
            <p class="eyebrow">DAY 001 / WEBGPU</p>
            <h1>GPU DISTORTION SLIDER</h1>
            <p class="caption">
              WGSL上で2つのプロシージャルシーンを生成し、
              切り替え時だけUVを波打たせています。
            </p>
          </div>

          <div class="controls" aria-label="Slide controls">
            <button type="button" data-slide="0" aria-pressed="true">01</button>
            <button type="button" data-slide="1" aria-pressed="false">02</button>
          </div>

          <p class="status" role="status"></p>
        </div>
      </section>
  - name: styles.css
    language: css
    content: |
      :root {
        color-scheme: dark;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        background: #050608;
        color: #f7f7f3;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      }

      .daily-stage {
        position: relative;
        min-height: 100vh;
        overflow: hidden;
        background: #050608;
      }

      .gpu-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
      }

      .slider-ui {
        position: relative;
        z-index: 1;
        min-height: 100vh;
        display: grid;
        grid-template-rows: 1fr auto;
        align-items: end;
        gap: 2rem;
        padding: clamp(1.25rem, 4vw, 4rem);
        pointer-events: none;
      }

      .slider-ui > div:first-child {
        max-width: 820px;
      }

      .eyebrow {
        margin: 0 0 1rem;
        font-size: 0.72rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        opacity: 0.72;
      }

      h1 {
        margin: 0;
        max-width: 10ch;
        font-size: clamp(3rem, 10vw, 8.5rem);
        line-height: 0.84;
        letter-spacing: -0.06em;
      }

      .caption {
        max-width: 38rem;
        margin: 1.5rem 0 0;
        font-size: clamp(0.9rem, 1.4vw, 1.05rem);
        line-height: 1.8;
        color: rgba(255, 255, 255, 0.72);
      }

      .controls {
        display: flex;
        gap: 0.75rem;
        pointer-events: auto;
      }

      .controls button {
        width: 3rem;
        height: 3rem;
        border: 1px solid rgba(255, 255, 255, 0.28);
        border-radius: 999px;
        background: rgba(7, 8, 10, 0.38);
        color: #fff;
        font: inherit;
        font-size: 0.82rem;
        backdrop-filter: blur(14px);
        cursor: pointer;
        transition:
          background 180ms ease,
          color 180ms ease,
          transform 180ms ease;
      }

      .controls button:hover {
        transform: translateY(-2px);
      }

      .controls button[aria-pressed="true"] {
        background: #fff;
        color: #050608;
      }

      .status {
        position: absolute;
        inset: auto 1rem 1rem auto;
        max-width: min(28rem, calc(100% - 2rem));
        margin: 0;
        padding: 0.75rem 1rem;
        border-radius: 999px;
        background: rgba(5, 6, 8, 0.72);
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.75rem;
        backdrop-filter: blur(12px);
      }

      .status:empty {
        display: none;
      }

      @media (max-width: 640px) {
        .slider-ui {
          align-content: end;
          grid-template-rows: auto auto;
          min-height: 100svh;
          padding-bottom: 2rem;
        }

        h1 {
          font-size: clamp(3.2rem, 18vw, 5.6rem);
        }
      }
  - name: experiment.js
    language: javascript
    content: |
      const canvas = document.querySelector('.gpu-canvas')
      const status = document.querySelector('.status')
      const buttons = [...document.querySelectorAll('[data-slide]')]

      let device
      let context
      let pipeline
      let uniformBuffer
      let bindGroup
      let frameId = 0
      let destroyed = false

      let currentSlide = 0
      let targetSlide = 0
      let mixValue = 0
      let lastTime = performance.now()

      const shader = `
      struct Uniforms {
        resolution: vec2f,
        time: f32,
        mixValue: f32,
        currentSlide: f32,
        targetSlide: f32,
      }

      @group(0) @binding(0)
      var<uniform> uniforms: Uniforms;

      fn hash(p: vec2f) -> f32 {
        let h = dot(p, vec2f(127.1, 311.7));
        return fract(sin(h) * 43758.5453123);
      }

      fn noise(p: vec2f) -> f32 {
        let i = floor(p);
        let f = fract(p);
        let u = f * f * (3.0 - 2.0 * f);

        return mix(
          mix(hash(i), hash(i + vec2f(1.0, 0.0)), u.x),
          mix(hash(i + vec2f(0.0, 1.0)), hash(i + vec2f(1.0, 1.0)), u.x),
          u.y
        );
      }

      fn paletteA(uv: vec2f, t: f32) -> vec3f {
        let p = uv - 0.5;
        let r = length(p);
        let ring = sin(r * 24.0 - t * 1.6);
        let glow = exp(-3.0 * r);
        return vec3f(
          0.08 + glow * 0.16,
          0.22 + 0.12 * ring,
          0.56 + glow * 0.32
        );
      }

      fn paletteB(uv: vec2f, t: f32) -> vec3f {
        let p = uv * 3.2;
        let n = noise(p + vec2f(t * 0.08, -t * 0.05));
        let bands = 0.5 + 0.5 * sin((uv.y + n * 0.34) * 18.0);
        return vec3f(
          0.72 + bands * 0.2,
          0.12 + n * 0.18,
          0.18 + (1.0 - bands) * 0.18
        );
      }

      @vertex
      fn vsMain(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4f {
        var positions = array<vec2f, 3>(
          vec2f(-1.0, -3.0),
          vec2f(-1.0, 1.0),
          vec2f(3.0, 1.0)
        );

        return vec4f(positions[vertexIndex], 0.0, 1.0);
      }

      @fragment
      fn fsMain(@builtin(position) position: vec4f) -> @location(0) vec4f {
        let resolution = max(uniforms.resolution, vec2f(1.0));
        var uv = position.xy / resolution;
        uv.y = 1.0 - uv.y;

        let aspect = resolution.x / resolution.y;
        var centered = uv - 0.5;
        centered.x *= aspect;

        let transition = smoothstep(0.0, 1.0, uniforms.mixValue);
        let wave = sin((uv.y * 10.0) + uniforms.time * 1.8) * 0.018;
        let displacement = (1.0 - abs(transition * 2.0 - 1.0)) * wave;

        let uvA = uv + vec2f(displacement, 0.0);
        let uvB = uv - vec2f(displacement, 0.0);

        let a = paletteA(uvA, uniforms.time);
        let b = paletteB(uvB, uniforms.time);

        let fromColor = select(a, b, uniforms.currentSlide > 0.5);
        let toColor = select(a, b, uniforms.targetSlide > 0.5);

        let vignette = smoothstep(1.2, 0.2, length(centered));
        let color = mix(fromColor, toColor, transition) * (0.56 + vignette * 0.52);

        return vec4f(color, 1.0);
      }
      `

      function setStatus(message) {
        status.textContent = message
      }

      function updateButtons() {
        buttons.forEach(button => {
          const active = Number(button.dataset.slide) === targetSlide
          button.setAttribute('aria-pressed', String(active))
        })
      }

      function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const width = Math.max(1, Math.floor(canvas.clientWidth * dpr))
        const height = Math.max(1, Math.floor(canvas.clientHeight * dpr))

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width
          canvas.height = height
        }
      }

      async function init() {
        if (!('gpu' in navigator)) {
          setStatus('このブラウザではWebGPUを利用できません。WebGPU対応ブラウザでお試しください。')
          return
        }

        const adapter = await navigator.gpu.requestAdapter()

        if (!adapter) {
          setStatus('WebGPUアダプターを取得できませんでした。')
          return
        }

        device = await adapter.requestDevice()
        context = canvas.getContext('webgpu')

        if (!context) {
          setStatus('WebGPU canvas contextを初期化できませんでした。')
          return
        }

        const format = navigator.gpu.getPreferredCanvasFormat()

        context.configure({
          device,
          format,
          alphaMode: 'premultiplied',
        })

        const module = device.createShaderModule({ code: shader })

        pipeline = device.createRenderPipeline({
          layout: 'auto',
          vertex: {
            module,
            entryPoint: 'vsMain',
          },
          fragment: {
            module,
            entryPoint: 'fsMain',
            targets: [{ format }],
          },
          primitive: {
            topology: 'triangle-list',
          },
        })

        uniformBuffer = device.createBuffer({
          size: 32,
          usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        })

        bindGroup = device.createBindGroup({
          layout: pipeline.getBindGroupLayout(0),
          entries: [
            {
              binding: 0,
              resource: {
                buffer: uniformBuffer,
              },
            },
          ],
        })

        buttons.forEach(button => {
          button.addEventListener('click', handleSlideClick)
        })

        window.addEventListener('resize', resizeCanvas)
        window.addEventListener('pagehide', cleanup)

        resizeCanvas()
        frameId = requestAnimationFrame(render)
      }

      function handleSlideClick(event) {
        const next = Number(event.currentTarget.dataset.slide)

        if (next === targetSlide) return

        currentSlide = mixValue > 0.5 ? targetSlide : currentSlide
        targetSlide = next
        mixValue = 0
        updateButtons()
      }

      function render(now) {
        if (destroyed || !device || !pipeline || !context) return

        resizeCanvas()

        const delta = Math.min((now - lastTime) / 1000, 0.05)
        lastTime = now

        if (currentSlide !== targetSlide) {
          mixValue = Math.min(1, mixValue + delta * 1.35)

          if (mixValue >= 1) {
            currentSlide = targetSlide
            mixValue = 0
          }
        }

        const data = new Float32Array([
          canvas.width,
          canvas.height,
          now / 1000,
          currentSlide === targetSlide ? 0 : mixValue,
          currentSlide,
          targetSlide,
          0,
          0,
        ])

        device.queue.writeBuffer(uniformBuffer, 0, data)

        const encoder = device.createCommandEncoder()
        const view = context.getCurrentTexture().createView()
        const pass = encoder.beginRenderPass({
          colorAttachments: [
            {
              view,
              loadOp: 'clear',
              storeOp: 'store',
              clearValue: { r: 0.02, g: 0.02, b: 0.025, a: 1 },
            },
          ],
        })

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, bindGroup)
        pass.draw(3)
        pass.end()

        device.queue.submit([encoder.finish()])
        frameId = requestAnimationFrame(render)
      }

      function cleanup() {
        destroyed = true
        cancelAnimationFrame(frameId)
        window.removeEventListener('resize', resizeCanvas)
        window.removeEventListener('pagehide', cleanup)

        buttons.forEach(button => {
          button.removeEventListener('click', handleSlideClick)
        })

        uniformBuffer?.destroy()
      }

      init().catch(error => {
        console.error(error)
        setStatus('WebGPUデモの初期化中にエラーが発生しました。')
      })
---

# Day 001 — WebGPUで作るディストーション・スライダー

> 主軸: **WebGPU** / カテゴリー: **WebGPUスライダー**

## 今回の表現

今回作るのは、2つのスライドを単純なフェードではなく、**切り替え中だけUVを横方向へ歪ませるWebGPUスライダー**です。

画像を読み込む代わりに、2つの背景をWGSL内でプロシージャル生成しています。これにより外部素材なしで、シェーダーの役割だけを確認できます。

## 仕組み

描画は全画面三角形1枚です。

フラグメントシェーダー側で各ピクセルのUVを計算し、スライドAとスライドBの色をそれぞれ生成しています。

切り替え時は `mixValue` を0から1へ進め、その途中だけサイン波による変位を加えます。

これによって、フェードだけよりも「面が流れる」ような切り替えになります。

## コードの要点

JavaScript側で毎フレーム更新するのは、次の値だけです。

- canvasの解像度
- 経過時間
- 現在のスライド
- 次のスライド
- 切り替え進行度

実際の色生成と歪みはGPU側で処理します。

## 調整ポイント

印象を変えるときは、WGSL内の次の値を触ると分かりやすいです。

- `uv.y * 10.0` : 波の細かさ
- `uniforms.time * 1.8` : 波の速さ
- `0.018` : 歪み量
- JavaScript側の `delta * 1.35` : スライド切り替え速度

## パフォーマンスと後片付け

WebGPUではcanvas解像度を必要以上に上げるとGPU負荷が増えます。

このデモではdevicePixelRatioを最大2に抑えています。

また、`pagehide` でrequestAnimationFrame、resizeイベント、ボタンクリックイベントを解除し、uniformBufferも破棄しています。

## 次に試せる発展

次はプロシージャル背景ではなく、実際の画像テクスチャを2枚渡して同じディストーションを適用すると、実用的なヒーロースライダーに発展できます。

さらにポインター速度をuniformとして渡せば、ユーザー操作に応じて歪み量が変化するスライダーにもできます。

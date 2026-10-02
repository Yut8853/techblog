---
title: "Three.jsで作るドラッグ・ディストーション作品スライダー"
description: "Awwwards / CSS Design Awardsの受賞系インタラクションを研究し、ドラッグ・慣性・シェーダーディストーションを組み合わせた実務向けWorksスライダーとして再構築します。"
category: "WebGLスライダー"
categorySlug: "webgl-slider"
categoryDescription: "Three.js / WebGL / GLSLを使い、作品一覧・ブランドサイト・キャンペーンページ向けのスライダーやギャラリー遷移を実装するカテゴリーです。"
tags:
  - "Three.js"
  - "WebGL"
  - "GLSL"
  - "スライダー"
  - "ドラッグ"
  - "ディストーション"
  - "Daily Lab"
date: "2026年10月3日"
publishedAt: 2026-10-03
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 1
focus: "Three.js"
concept: "作品カードをドラッグすると、移動速度に応じてシェーダーが水平方向へ歪み、スナップ時に次作品へ収束するWebGLスライダー"
referenceTitle: "Slider drag and drop with distortion from Studio DOT / Smooothy"
referenceUrl: "https://www.awwwards.com/inspiration/slider-drag-and-drop-with-distortion-studio-dot-2"
referencePlatform: "Awwwards / CSS Design Awards"
qualityScore: 88
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage">
        <div class="webgl-layer" aria-hidden="true"></div>

        <header class="site-header">
          <a class="brand" href="#" aria-label="Home">NØRTH/FORM</a>
          <div class="header-meta">
            <span>SELECTED WORKS</span>
            <span>2026</span>
          </div>
        </header>

        <div class="slider-shell">
          <div class="slider-copy" aria-live="polite">
            <p class="kicker">DIGITAL / EXPERIENCE</p>
            <div class="title-mask">
              <h1 class="project-title">MONOLITH</h1>
            </div>
            <p class="project-meta">ART DIRECTION · WEBGL · 01</p>
          </div>

          <div class="interaction-hint">
            <span class="hint-line"></span>
            <span>DRAG / SCROLL</span>
          </div>

          <div class="counter" aria-hidden="true">
            <span class="current-index">01</span>
            <span class="divider"></span>
            <span class="total-index">04</span>
          </div>

          <nav class="slider-nav" aria-label="Project slider">
            <button class="nav-button prev" type="button" aria-label="Previous project">
              <span>←</span>
            </button>
            <button class="nav-button next" type="button" aria-label="Next project">
              <span>→</span>
            </button>
          </nav>
        </div>

        <div class="fallback-message" hidden>
          このブラウザではWebGLを利用できません。
        </div>
      </section>
  - name: styles.css
    language: css
    content: |
      :root {
        color-scheme: dark;
        --bg: #080808;
        --fg: #f2efe9;
        --muted: rgba(242, 239, 233, 0.58);
        --line: rgba(242, 239, 233, 0.18);
      }

      * {
        box-sizing: border-box;
      }

      html,
      body {
        min-height: 100%;
      }

      body {
        margin: 0;
        background: var(--bg);
        color: var(--fg);
        font-family: Arial, Helvetica, sans-serif;
        overflow: hidden;
      }

      button,
      a {
        color: inherit;
      }

      .daily-stage {
        position: relative;
        min-height: 100vh;
        min-height: 100svh;
        overflow: hidden;
        background:
          radial-gradient(circle at 50% 50%, rgba(255,255,255,.025), transparent 36%),
          #080808;
      }

      .webgl-layer {
        position: absolute;
        inset: 0;
      }

      .webgl-layer canvas {
        display: block;
        width: 100%;
        height: 100%;
      }

      .site-header {
        position: absolute;
        z-index: 5;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px 28px;
        font-size: 11px;
        letter-spacing: .12em;
        pointer-events: none;
      }

      .brand {
        text-decoration: none;
        font-weight: 700;
        pointer-events: auto;
      }

      .header-meta {
        display: flex;
        gap: 28px;
        color: var(--muted);
      }

      .slider-shell {
        position: relative;
        z-index: 4;
        min-height: 100vh;
        min-height: 100svh;
        pointer-events: none;
      }

      .slider-copy {
        position: absolute;
        left: clamp(22px, 6vw, 88px);
        bottom: clamp(108px, 16vh, 176px);
        width: min(68vw, 820px);
      }

      .kicker {
        margin: 0 0 16px;
        color: var(--muted);
        font-size: 10px;
        letter-spacing: .22em;
      }

      .title-mask {
        overflow: hidden;
      }

      .project-title {
        margin: 0;
        font-size: clamp(54px, 10.5vw, 168px);
        line-height: .82;
        letter-spacing: -.065em;
        font-weight: 700;
        text-transform: uppercase;
        transform-origin: left bottom;
      }

      .project-meta {
        margin: 18px 0 0;
        font-size: 11px;
        letter-spacing: .14em;
        color: rgba(242,239,233,.72);
      }

      .interaction-hint {
        position: absolute;
        left: clamp(22px, 6vw, 88px);
        bottom: 36px;
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--muted);
        font-size: 10px;
        letter-spacing: .16em;
      }

      .hint-line {
        width: 42px;
        height: 1px;
        background: var(--line);
      }

      .counter {
        position: absolute;
        right: clamp(22px, 5vw, 72px);
        bottom: 38px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 10px;
        letter-spacing: .16em;
        color: var(--muted);
      }

      .counter .divider {
        width: 36px;
        height: 1px;
        background: var(--line);
      }

      .current-index {
        color: var(--fg);
      }

      .slider-nav {
        position: absolute;
        right: clamp(22px, 5vw, 72px);
        top: 50%;
        display: flex;
        gap: 10px;
        transform: translateY(-50%);
        pointer-events: auto;
      }

      .nav-button {
        width: 46px;
        height: 46px;
        display: grid;
        place-items: center;
        border: 1px solid var(--line);
        border-radius: 50%;
        background: rgba(8,8,8,.24);
        backdrop-filter: blur(10px);
        cursor: pointer;
        transition:
          transform .2s ease,
          background .2s ease,
          border-color .2s ease;
      }

      .nav-button:hover {
        transform: scale(1.06);
        background: rgba(242,239,233,.08);
        border-color: rgba(242,239,233,.38);
      }

      .fallback-message {
        position: absolute;
        inset: 0;
        z-index: 20;
        display: grid;
        place-items: center;
        padding: 24px;
        background: #080808;
        color: var(--muted);
        text-align: center;
      }

      @media (max-width: 760px) {
        .site-header {
          padding: 18px;
        }

        .header-meta span:first-child {
          display: none;
        }

        .slider-copy {
          left: 18px;
          bottom: 120px;
          width: calc(100vw - 36px);
        }

        .project-title {
          font-size: clamp(48px, 18vw, 88px);
        }

        .project-meta {
          max-width: 70vw;
          line-height: 1.6;
        }

        .slider-nav {
          right: 18px;
          top: auto;
          bottom: 22px;
        }

        .counter {
          right: auto;
          left: 18px;
          bottom: 28px;
        }

        .interaction-hint {
          display: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .nav-button {
          transition: none;
        }
      }
  - name: experiment.js
    language: javascript
    content: |
      import * as THREE from 'three'

      const root = document.querySelector('.daily-stage')
      const mount = document.querySelector('.webgl-layer')
      const titleEl = document.querySelector('.project-title')
      const metaEl = document.querySelector('.project-meta')
      const indexEl = document.querySelector('.current-index')
      const prevButton = document.querySelector('.prev')
      const nextButton = document.querySelector('.next')
      const fallback = document.querySelector('.fallback-message')

      const PROJECTS = [
        {
          title: 'MONOLITH',
          meta: 'ART DIRECTION · WEBGL · 01',
          colors: ['#d6ff00', '#161616', '#5c6f00'],
          label: 'FORM / 01',
          seed: 1.12,
        },
        {
          title: 'VOLTAGE',
          meta: 'IDENTITY · MOTION · 02',
          colors: ['#ff4a1f', '#100b09', '#692111'],
          label: 'SYSTEM / 02',
          seed: 2.37,
        },
        {
          title: 'ORBITAL',
          meta: 'CAMPAIGN · EXPERIENCE · 03',
          colors: ['#7b6cff', '#0a0a12', '#29205e'],
          label: 'SPACE / 03',
          seed: 3.73,
        },
        {
          title: 'TIDELINE',
          meta: 'DIGITAL PRODUCT · 04',
          colors: ['#8cf0ff', '#071012', '#1d5b65'],
          label: 'FLOW / 04',
          seed: 4.91,
        },
      ]

      const state = {
        width: 1,
        height: 1,
        dpr: 1,
        current: 0,
        target: 0,
        position: 0,
        targetPosition: 0,
        velocity: 0,
        dragStartX: 0,
        dragStartPosition: 0,
        dragging: false,
        lastPointerX: 0,
        lastPointerTime: 0,
        transition: 0,
        direction: 1,
        destroyed: false,
        raf: 0,
      }

      let renderer
      let scene
      let camera
      let mesh
      let material
      let geometry
      let resizeObserver
      let previousTexture
      let nextTexture

      const clock = new THREE.Clock()

      function createPosterTexture(project, index) {
        const canvas = document.createElement('canvas')
        canvas.width = 1600
        canvas.height = 1100

        const ctx = canvas.getContext('2d')
        const [accent, dark, secondary] = project.colors

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, dark)
        gradient.addColorStop(0.52, secondary)
        gradient.addColorStop(1, '#050505')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.save()
        ctx.globalCompositeOperation = 'screen'

        for (let i = 0; i < 24; i += 1) {
          const x = ((i * 173 + project.seed * 211) % canvas.width)
          const y = ((i * 281 + project.seed * 97) % canvas.height)
          const radius = 90 + ((i * 47) % 250)

          const radial = ctx.createRadialGradient(x, y, 0, x, y, radius)
          radial.addColorStop(0, accent + 'b0')
          radial.addColorStop(1, accent + '00')
          ctx.fillStyle = radial
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()

        ctx.strokeStyle = 'rgba(255,255,255,.10)'
        ctx.lineWidth = 2

        for (let y = 80; y < canvas.height; y += 86) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }

        ctx.save()
        ctx.translate(canvas.width * 0.5, canvas.height * 0.52)
        ctx.rotate(-0.12 + index * 0.025)
        ctx.fillStyle = accent
        ctx.font = '700 230px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.globalAlpha = 0.88
        ctx.fillText(project.label, 0, 0)
        ctx.restore()

        ctx.fillStyle = 'rgba(255,255,255,.72)'
        ctx.font = '700 30px Arial'
        ctx.fillText('NORTH FORM ARCHIVE', 54, 68)

        ctx.fillStyle = 'rgba(255,255,255,.46)'
        ctx.font = '20px Arial'
        ctx.fillText('EXPERIMENTAL DIGITAL SERIES', 54, 103)

        const texture = new THREE.CanvasTexture(canvas)
        texture.colorSpace = THREE.SRGBColorSpace
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter

        return texture
      }

      const textures = PROJECTS.map(createPosterTexture)

      const vertexShader = `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `

      const fragmentShader = `
        precision highp float;

        varying vec2 vUv;

        uniform sampler2D uTextureA;
        uniform sampler2D uTextureB;
        uniform float uProgress;
        uniform float uVelocity;
        uniform float uDirection;
        uniform float uTime;
        uniform vec2 uResolution;

        float ease(float t) {
          return t * t * (3.0 - 2.0 * t);
        }

        vec2 coverUv(vec2 uv, vec2 resolution, vec2 textureSize) {
          float screenRatio = resolution.x / resolution.y;
          float imageRatio = textureSize.x / textureSize.y;
          vec2 ratio = vec2(
            min(screenRatio / imageRatio, 1.0),
            min(imageRatio / screenRatio, 1.0)
          );

          return uv * ratio + (1.0 - ratio) * 0.5;
        }

        void main() {
          float p = ease(clamp(uProgress, 0.0, 1.0));
          vec2 uv = vUv;

          float wave =
            sin((uv.y * 10.0) + uTime * 1.6) *
            (0.012 + abs(uVelocity) * 0.00075);

          float bend =
            sin(uv.y * 3.14159265) *
            (0.10 + min(abs(uVelocity) * 0.006, 0.16));

          float travel = (1.0 - abs(p * 2.0 - 1.0));

          vec2 uvA = uv;
          vec2 uvB = uv;

          uvA.x += (bend + wave) * travel * uDirection;
          uvB.x -= (bend * 0.75 - wave) * travel * uDirection;

          uvA.x += p * 0.08 * uDirection;
          uvB.x -= (1.0 - p) * 0.08 * uDirection;

          vec4 colorA = texture2D(uTextureA, uvA);
          vec4 colorB = texture2D(uTextureB, uvB);

          float mask = smoothstep(
            p - 0.28,
            p + 0.28,
            uv.x + wave * 2.0
          );

          if (uDirection < 0.0) {
            mask = 1.0 - smoothstep(
              (1.0 - p) - 0.28,
              (1.0 - p) + 0.28,
              uv.x + wave * 2.0
            );
          }

          vec3 color = mix(colorA.rgb, colorB.rgb, mask);
          float grain = fract(sin(dot(uv * uResolution + uTime, vec2(12.9898, 78.233))) * 43758.5453);
          color += (grain - 0.5) * 0.022;

          gl_FragColor = vec4(color, 1.0);
        }
      `

      function initThree() {
        try {
          renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          })
        } catch (error) {
          console.error(error)
          fallback.hidden = false
          return false
        }

        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.setClearColor(0x080808, 1)

        scene = new THREE.Scene()
        camera = new THREE.Camera()

        geometry = new THREE.PlaneGeometry(2, 2)

        material = new THREE.ShaderMaterial({
          uniforms: {
            uTextureA: { value: textures[0] },
            uTextureB: { value: textures[1] },
            uProgress: { value: 0 },
            uVelocity: { value: 0 },
            uDirection: { value: 1 },
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(1, 1) },
          },
          vertexShader,
          fragmentShader,
        })

        mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
        mount.appendChild(renderer.domElement)

        return true
      }

      function clampIndex(index) {
        const length = PROJECTS.length
        return ((index % length) + length) % length
      }

      function setTexturePair(fromIndex, toIndex) {
        previousTexture = textures[clampIndex(fromIndex)]
        nextTexture = textures[clampIndex(toIndex)]

        material.uniforms.uTextureA.value = previousTexture
        material.uniforms.uTextureB.value = nextTexture
      }

      function animateText(direction) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (reduced) {
          updateProjectCopy()
          return
        }

        titleEl.animate(
          [
            { transform: 'translateY(0%) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${direction > 0 ? '-115%' : '115%'}) rotate(${direction > 0 ? '-2deg' : '2deg'})`, opacity: 0 },
          ],
          {
            duration: 260,
            easing: 'cubic-bezier(.55,0,.1,1)',
            fill: 'forwards',
          }
        ).finished.then(() => {
          updateProjectCopy()

          titleEl.animate(
            [
              { transform: `translateY(${direction > 0 ? '115%' : '-115%'}) rotate(${direction > 0 ? '2deg' : '-2deg'})`, opacity: 0 },
              { transform: 'translateY(0%) rotate(0deg)', opacity: 1 },
            ],
            {
              duration: 520,
              easing: 'cubic-bezier(.16,1,.3,1)',
              fill: 'forwards',
            }
          )
        })
      }

      function updateProjectCopy() {
        const project = PROJECTS[state.target]
        titleEl.textContent = project.title
        metaEl.textContent = project.meta
        indexEl.textContent = String(state.target + 1).padStart(2, '0')
      }

      function goTo(index) {
        const next = clampIndex(index)

        if (next === state.target) return

        const direction =
          next === clampIndex(state.target + 1) ? 1 : -1

        state.direction = direction
        state.current = state.target
        state.target = next
        state.transition = 0

        setTexturePair(state.current, state.target)
        animateText(direction)
      }

      function next() {
        goTo(state.target + 1)
      }

      function prev() {
        goTo(state.target - 1)
      }

      function onPointerDown(event) {
        state.dragging = true
        state.dragStartX = event.clientX
        state.dragStartPosition = state.position
        state.lastPointerX = event.clientX
        state.lastPointerTime = performance.now()
        root.setPointerCapture?.(event.pointerId)
      }

      function onPointerMove(event) {
        if (!state.dragging) return

        const now = performance.now()
        const dx = event.clientX - state.dragStartX
        const elapsed = Math.max(16, now - state.lastPointerTime)
        const frameDx = event.clientX - state.lastPointerX

        state.position = state.dragStartPosition + dx
        state.velocity = frameDx / elapsed * 16
        state.lastPointerX = event.clientX
        state.lastPointerTime = now
      }

      function onPointerUp(event) {
        if (!state.dragging) return

        state.dragging = false
        root.releasePointerCapture?.(event.pointerId)

        const distance = event.clientX - state.dragStartX
        const threshold = Math.min(120, state.width * 0.16)

        if (Math.abs(distance) > threshold || Math.abs(state.velocity) > 8) {
          if (distance < 0 || state.velocity < -8) {
            next()
          } else {
            prev()
          }
        }

        state.targetPosition = 0
      }

      function onWheel(event) {
        event.preventDefault()

        if (Math.abs(event.deltaY) < 8 && Math.abs(event.deltaX) < 8) return

        const dominant = Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY

        if (dominant > 0) {
          next()
        } else {
          prev()
        }
      }

      function onKeyDown(event) {
        if (event.key === 'ArrowRight') next()
        if (event.key === 'ArrowLeft') prev()
      }

      function resize() {
        const rect = root.getBoundingClientRect()
        state.width = Math.max(1, rect.width)
        state.height = Math.max(1, rect.height)
        state.dpr = Math.min(window.devicePixelRatio || 1, 1.75)

        renderer.setPixelRatio(state.dpr)
        renderer.setSize(state.width, state.height, false)
        material.uniforms.uResolution.value.set(
          state.width * state.dpr,
          state.height * state.dpr
        )
      }

      function render() {
        if (state.destroyed) return

        const dt = Math.min(clock.getDelta(), 0.05)
        const elapsed = clock.elapsedTime

        if (!state.dragging) {
          state.position += (state.targetPosition - state.position) * Math.min(1, dt * 9)
          state.velocity *= Math.pow(0.08, dt)
        }

        if (state.current !== state.target) {
          state.transition = Math.min(1, state.transition + dt * 1.55)

          if (state.transition >= 1) {
            state.current = state.target
            state.transition = 0
            setTexturePair(state.current, clampIndex(state.current + state.direction))
          }
        }

        const dragEnergy = Math.min(Math.abs(state.velocity) / 24, 1)
        const dragOffset = Math.min(Math.abs(state.position) / Math.max(state.width, 1), 0.18)

        material.uniforms.uProgress.value =
          state.current === state.target
            ? Math.min(dragOffset * 2.1, 0.2)
            : state.transition

        material.uniforms.uVelocity.value =
          state.velocity + dragEnergy * 14

        material.uniforms.uDirection.value =
          state.current === state.target
            ? (state.position <= 0 ? 1 : -1)
            : state.direction

        material.uniforms.uTime.value = elapsed

        renderer.render(scene, camera)
        state.raf = requestAnimationFrame(render)
      }

      function cleanup() {
        state.destroyed = true
        cancelAnimationFrame(state.raf)

        root.removeEventListener('pointerdown', onPointerDown)
        root.removeEventListener('pointermove', onPointerMove)
        root.removeEventListener('pointerup', onPointerUp)
        root.removeEventListener('pointercancel', onPointerUp)
        root.removeEventListener('wheel', onWheel)
        window.removeEventListener('keydown', onKeyDown)
        window.removeEventListener('pagehide', cleanup)

        prevButton.removeEventListener('click', prev)
        nextButton.removeEventListener('click', next)

        resizeObserver?.disconnect()

        textures.forEach(texture => texture.dispose())
        geometry?.dispose()
        material?.dispose()
        renderer?.dispose()
        renderer?.domElement?.remove()
      }

      function boot() {
        const ok = initThree()

        if (!ok) return

        setTexturePair(0, 1)
        updateProjectCopy()

        root.addEventListener('pointerdown', onPointerDown)
        root.addEventListener('pointermove', onPointerMove)
        root.addEventListener('pointerup', onPointerUp)
        root.addEventListener('pointercancel', onPointerUp)
        root.addEventListener('wheel', onWheel, { passive: false })
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('pagehide', cleanup)

        prevButton.addEventListener('click', prev)
        nextButton.addEventListener('click', next)

        resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(root)

        resize()
        render()
      }

      boot()
---

# Day 001 — Three.jsで作るドラッグ・ディストーション作品スライダー

> **Reference study:** [Slider drag and drop with distortion from Studio DOT](https://www.awwwards.com/inspiration/slider-drag-and-drop-with-distortion-studio-dot-2) / Awwwards  
> 併せて、CSS Design AwardsのSmooothyのような「WebGL前提のスライダー/カルーセル」という考え方も参考にしています。

参考元のブランド、写真、コピー、レイアウトをそのまま再現するのではなく、**ドラッグで作品を送る操作感、切り替え速度に連動するディストーション、作品情報のタイポグラフィ遷移**を抽出し、オリジナルのWorksスライダーとして組み直しています。

## 参考にした表現

受賞系のWebGLスライダーで重要なのは、単に画像が横へ動くことではありません。

- ドラッグ中の速度が画面の歪みに反映される
- 指を離したあとに慣性が残る
- 次の作品へ切り替わる瞬間だけシェーダーの変形量が大きくなる
- タイトルやカウンターも同じタイミングで遷移する
- 画面全体をひとつのインタラクションとして設計する

この5点を今回の主役にしています。

## 完成形

Works、Campaign、Brand Siteのファーストビューにそのまま転用できるよう、フルスクリーンの作品スライダーにしました。

操作は次の4つです。

- Pointer drag
- Mouse wheel / trackpad
- 前後ボタン
- Arrow key

画像素材は使わず、Three.jsのCanvasTextureで4種類のオリジナルポスターを生成しています。

## 実装設計

通常のDOMスライダーでは、画像そのものをtranslateXします。

今回は画面いっぱいのPlaneを1枚だけ描画し、フラグメントシェーダーへ2枚のTextureを渡しています。

JavaScript側の責務は、

- 現在の作品
- 次の作品
- ドラッグ速度
- 遷移進行度
- 入力処理

までです。

画像の切り替え方と歪みはGPU側へ閉じています。

## シェーダー / レンダリング

GLSL側では、遷移中だけUVへ水平方向のbendとwaveを追加しています。

特に重要なのが `uVelocity` です。

ドラッグが速いと変形量が増え、ゆっくり動かすと歪みも弱くなります。

この「入力速度 → シェーダーパラメータ」の変換が、単なるカルーセルとWebGLスライダーの大きな差になります。

## 実務での使いどころ

この構成は次の案件に転用しやすいです。

- 制作会社 / デザインスタジオのWorks
- ファッションブランドのLookbook
- 新商品キャンペーン
- ホテル / 不動産のビジュアルギャラリー
- アーティスト / 写真家のポートフォリオ

実案件ではCanvasTexture部分だけCMS画像や動画テクスチャへ置き換えられます。

## 調整パラメータ

最初に触るなら以下です。

- `dt * 1.55`: スライド遷移速度
- `0.10`: bend量
- `0.012`: waveの基準量
- `uVelocity * 0.00075`: 操作速度が歪みに与える強さ
- `1.75`: devicePixelRatio上限

派手さを増やすより、まずbend量を小さくして質感を調整する方が実務では使いやすいです。

## パフォーマンスとアクセシビリティ

描画は全画面Plane 1枚なので、3Dオブジェクトを大量に置く構成より軽量です。

一方で高DPI端末では負荷が上がるため、devicePixelRatioは1.75までに制限しています。

さらに、

- ResizeObserver
- pagehide cleanup
- texture / geometry / material / renderer dispose
- keyboard navigation
- prefers-reduced-motion

を考慮しています。

このあたりまで含めて、初めて「実案件へ持っていけるWebGL部品」として扱いやすくなります。

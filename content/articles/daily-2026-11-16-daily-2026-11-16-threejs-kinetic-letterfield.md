---
title: "Three.jsで作る、余白に張力を与えるキネティックタイポグラフィ"
description: "文字をドラッグで曲げ、符号付き張力と二軸の変形中心を保持するThree.js製Hero。静的SVGとCanvasの共通組版、正しいUV変換、非ドラッグ操作、再マウント時の状態同期まで設計します。"
category: "Three.jsキネティックタイポグラフィ"
categorySlug: "threejs-kinetic-typography"
categoryDescription: "Three.jsとシェーダーで文字の形状をインタラクティブに変形し、ブランドHeroやキャンペーンの見出しに展開するキネティックタイポグラフィ。"
tags:
  - "Three.js"
  - "Kinetic Typography"
  - "GLSL"
  - "CanvasTexture"
  - "ブランドHero"
  - "アクセシビリティ"
  - "Daily Lab"
date: "2026年11月16日"
publishedAt: "2026-11-16"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 45
focus: "Three.js"
concept: "HOLD SPACE：整った文字を、触れる張力の場へ。静的SVGとWebGLで同じ組版を共有し、横ドラッグの一時的な力と、符号付き張力・二軸中心位置の保持操作を分離した、オリジナルの可変タイポグラフィHero。"
referenceTitle: "TBWAHAKUHODO Corporate Website — SHIFTBRAIN Inc."
referenceUrl: "https://www.cssdesignawards.com/sites/tbwahakuhodo/49947/"
referencePlatform: "CSS Design Awards"
qualityScore: 88
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" aria-label="インタラクティブ・タイポグラフィ">
        <header class="type-top">
          <div class="type-brand">SPACE PRACTICE</div>
          <div class="type-edition">TYPE SYSTEM / 045—365</div>
        </header>
        <div class="type-intro">
          <div>
            <p class="type-tag">EXPERIMENT 045 / ELASTIC LETTERFIELD</p>
            <h1 class="sr-only type-title">HOLD SPACE — 余白に、張力を。</h1>
            <h2 class="type-subtitle" aria-hidden="true">余白に、張力を。</h2>
          </div>
          <p>整えること。揺さぶること。<br>そのあいだに、言葉の新しいかたちがある。</p>
        </div>
        <div class="type-field">
          <div class="type-static" aria-hidden="true">
            <svg viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <g font-family="Arial, sans-serif" font-size="440" font-weight="900" text-anchor="middle">
                <text x="800" y="452" textLength="1360" lengthAdjust="spacingAndGlyphs">HOLD</text>
                <text x="800" y="870" textLength="1360" lengthAdjust="spacingAndGlyphs">SPACE</text>
              </g>
            </svg>
          </div>
          <div class="type-mount" aria-hidden="true" hidden></div>
          <span class="field-note top" aria-hidden="true">FIG. 01 / A FIELD OF POSSIBILITIES</span>
          <span class="field-note bottom" aria-hidden="true">RESTING LETTERFORM</span>
          <span class="register r1" aria-hidden="true"></span>
          <span class="register r2" aria-hidden="true"></span>
          <span class="register r3" aria-hidden="true"></span>
          <span class="register r4" aria-hidden="true"></span>
          <div class="strain-readout" aria-hidden="true"><span>STRAIN <b class="strain-number">000</b></span><span class="strain-bar"><i class="strain-fill"></i></span></div>
        </div>
        <div class="type-controls">
          <div class="control-heading">
            <p class="type-status" role="status" aria-live="polite">静止表示。対応環境では文字面のドラッグと保持コントロールを利用できます。</p>
            <button class="type-reset" type="button" disabled>RESET ↗</button>
          </div>
          <div class="control-grid">
            <label class="range-group">
              <span class="control-label"><span>保持する張力</span><span class="control-value value-strain" aria-hidden="true">0%</span></span>
              <input class="type-range range-strain" type="range" min="-100" max="100" value="0" step="1" aria-label="保持する張力（マイナス100から100パーセント）" disabled>
              <span class="range-ends" aria-hidden="true"><span>−100 / REVERSE</span><span>+100 / FORWARD</span></span>
            </label>
            <label class="range-group">
              <span class="control-label"><span>中心・横位置</span><span class="control-value value-x" aria-hidden="true">50%</span></span>
              <input class="type-range range-x" type="range" min="0" max="100" value="50" step="1" aria-label="保持する変形中心の横位置（左端0、右端100パーセント）" disabled>
              <span class="range-ends" aria-hidden="true"><span>0 / LEFT</span><span>100 / RIGHT</span></span>
            </label>
            <label class="range-group">
              <span class="control-label"><span>中心・縦位置</span><span class="control-value value-y" aria-hidden="true">50%</span></span>
              <input class="type-range range-y" type="range" min="0" max="100" value="50" step="1" aria-label="保持する変形中心の縦位置（下端0、上端100パーセント）" disabled>
              <span class="range-ends" aria-hidden="true"><span>0 / BOTTOM</span><span>100 / TOP</span></span>
            </label>
          </div>
        </div>
        <footer class="type-footer"><span>STRUCTURE IS A STARTING POINT.</span><span>THREE.JS / 2026.11.16</span></footer>
      </section>
  - name: styles.css
    language: css
    content: |
      .daily-stage {
        --paper: #edf0e8;
        --field: #dce3d8;
        --ink: #162b2c;
        --muted: #52635c;
        --acid: #d4f36c;
        color: var(--ink);
        background: var(--paper);
        font-family: Arial, 'Helvetica Neue', sans-serif;
        max-width: 1440px;
        margin: 0 auto;
        border: 1px solid var(--ink);
        isolation: isolate;
      }
      .daily-stage, .daily-stage * { box-sizing: border-box; }
      .daily-stage [hidden] { display: none !important; }
      .daily-stage button, .daily-stage input { font: inherit; }
      .daily-stage .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
      .daily-stage .type-top { display: flex; justify-content: space-between; align-items: center; padding: 22px 30px; border-bottom: 1px solid var(--ink); gap: 18px; }
      .daily-stage .type-brand { font-size: 13px; font-weight: 900; letter-spacing: -.04em; }
      .daily-stage .type-brand::before { content: ''; display: inline-block; width: 10px; height: 10px; background: var(--ink); margin-right: 10px; }
      .daily-stage .type-edition, .daily-stage .type-tag, .daily-stage .field-note, .daily-stage .type-footer, .daily-stage .control-label, .daily-stage .strain-readout { font-family: 'Courier New', monospace; font-size: 11px; letter-spacing: .06em; }
      .daily-stage .type-intro { padding: 30px 30px 26px; display: flex; align-items: end; justify-content: space-between; gap: 24px; }
      .daily-stage .type-tag { margin: 0 0 12px; color: var(--muted); }
      .daily-stage .type-intro h2 { font-size: clamp(22px, 3vw, 38px); font-weight: 500; line-height: 1.35; letter-spacing: -.045em; margin: 0; }
      .daily-stage .type-intro > p { max-width: 280px; font-size: 12px; line-height: 1.8; margin: 0; color: var(--muted); }
      .daily-stage .type-field { position: relative; height: clamp(380px, 53vw, 650px); overflow: hidden; background-color: var(--field); background-image: linear-gradient(#162b2c12 1px, transparent 1px), linear-gradient(90deg, #162b2c12 1px, transparent 1px); background-size: 8.3333% 12.5%; border-block: 1px solid var(--ink); touch-action: pan-y; user-select: none; container-type: size; }
      .daily-stage.is-ready .type-field { cursor: ew-resize; }
      .daily-stage.is-dragging .type-field { cursor: grabbing; }
      .daily-stage .type-field::before, .daily-stage .type-field::after { content: ''; position: absolute; pointer-events: none; z-index: 2; }
      .daily-stage .type-field::before { inset: 50% 0 auto; height: 1px; background: #162b2c28; }
      .daily-stage .type-field::after { inset: 0 auto 0 50%; width: 1px; background: #162b2c28; }
      .daily-stage .type-mount, .daily-stage .type-static { position: absolute; inset: 0; pointer-events: none; }
      .daily-stage .type-mount canvas { display: block; width: 100%; height: 100%; }
      .daily-stage .type-static svg { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); display: block; width: 81.92771%; height: auto; width: min(81.92771cqw, 119.29825cqh); aspect-ratio: 1.6; overflow: visible; fill: var(--ink); }
      .daily-stage .field-note { position: absolute; z-index: 3; pointer-events: none; text-transform: uppercase; font-size: 10px; }
      .daily-stage .field-note.top { top: 22px; left: 24px; }
      .daily-stage .field-note.bottom { bottom: 22px; left: 24px; }
      .daily-stage .strain-readout { position: absolute; z-index: 3; bottom: 22px; right: 24px; display: flex; align-items: center; gap: 10px; font-variant-numeric: tabular-nums; pointer-events: none; }
      .daily-stage .strain-bar { width: 56px; height: 4px; background: #162b2c26; overflow: hidden; }
      .daily-stage .strain-fill { display: block; width: 100%; height: 100%; background: var(--ink); transform: scaleX(0); transform-origin: left; }
      .daily-stage .register { position: absolute; z-index: 3; width: 12px; height: 12px; pointer-events: none; }
      .daily-stage .register::before, .daily-stage .register::after { content: ''; position: absolute; background: var(--ink); }
      .daily-stage .register::before { width: 12px; height: 1px; top: 6px; }
      .daily-stage .register::after { height: 12px; width: 1px; left: 6px; }
      .daily-stage .r1 { top: 8px; left: 8px; }
      .daily-stage .r2 { top: 8px; right: 8px; }
      .daily-stage .r3 { bottom: 8px; left: 8px; }
      .daily-stage .r4 { bottom: 8px; right: 8px; }
      .daily-stage .type-controls { padding: 22px 30px 24px; }
      .daily-stage .control-heading { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-bottom: 22px; }
      .daily-stage .type-status { font-size: 12px; line-height: 1.8; margin: 0; max-width: 620px; color: var(--muted); }
      .daily-stage .control-grid { display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 30px; }
      .daily-stage .range-group { display: block; min-width: 0; }
      .daily-stage .control-label { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 4px; letter-spacing: .02em; }
      .daily-stage .control-value { font-variant-numeric: tabular-nums; }
      .daily-stage .type-range { display: block; width: 100%; min-height: 44px; margin: 0; accent-color: var(--ink); cursor: pointer; }
      .daily-stage .range-ends { display: flex; justify-content: space-between; color: var(--muted); font: 10px 'Courier New', monospace; letter-spacing: .04em; }
      .daily-stage .type-reset { flex: 0 0 auto; background: transparent; border: 1px solid var(--ink); color: var(--ink); min-height: 44px; padding: 0 22px; font-size: 11px; letter-spacing: .08em; cursor: pointer; transition: background .18s, color .18s; }
      .daily-stage .type-reset:hover:not(:disabled) { background: var(--ink); color: var(--paper); }
      .daily-stage :focus-visible { outline: 3px solid #a13c21; outline-offset: 5px; }
      .daily-stage :disabled { opacity: .45; cursor: not-allowed; }
      .daily-stage .type-footer { display: flex; justify-content: space-between; gap: 16px; padding: 13px 30px; background: var(--acid); border-top: 1px solid var(--ink); font-size: 10px; }
      @media (max-width: 640px) {
        .daily-stage .type-top { padding: 18px; }
        .daily-stage .type-edition { font-size: 9px; }
        .daily-stage .type-intro { padding: 24px 18px; display: block; }
        .daily-stage .type-intro > p { margin-top: 14px; max-width: none; }
        .daily-stage .type-field { height: 390px; }
        .daily-stage .field-note.top { top: 24px; left: 18px; font-size: 9px; }
        .daily-stage .field-note.bottom { bottom: 48px; left: 18px; font-size: 9px; }
        .daily-stage .strain-readout { bottom: 24px; right: 18px; }
        .daily-stage .type-controls { padding: 20px 18px; }
        .daily-stage .control-heading { gap: 16px; align-items: start; }
        .daily-stage .control-grid { grid-template-columns: 1fr; gap: 20px; }
        .daily-stage .range-group + .range-group { padding-top: 16px; border-top: 1px solid #162b2c24; }
        .daily-stage .type-reset { padding-inline: 14px; }
        .daily-stage .type-footer { padding: 12px 18px; flex-wrap: wrap; line-height: 1.6; }
      }
      @media (prefers-reduced-motion: reduce) { .daily-stage * { transition: none !important; } }
  - name: experiment.js
    language: javascript
    content: |
      const CONFIG = Object.freeze({
        // 二段組の短いコピー。非JS時の初期コピーはHTMLにも記述する。
        words: ['HOLD', 'SPACE'], subtitle: '余白に、張力を。',
        layout: {
          width: 1600, height: 1000, textWidth: 1360,
          fontFamily: 'Arial, sans-serif', fontSize: 440, fontWeight: 900,
          baselines: [452, 870]
        },
        planeWidth: 3.4, planeHeight: 2.125,
        minViewHeight: 2.85, minViewWidth: 4.15,
        maxDpr: 1.75, segmentsX: 96, segmentsY: 56,
        dragGain: 2.6, followRate: 11, releaseRate: 7,
        maxStrain: 0.82, localRadius: 13
      });
      
      export function mountLetterfield(root) {
        root.dailyDestroy?.();
        const $ = selector => root.querySelector(selector);
        const field = $('.type-field'), mount = $('.type-mount');
        const fallback = $('.type-static'), svg = fallback.querySelector('svg');
        const reset = $('.type-reset'), status = $('.type-status');
        const note = $('.field-note.bottom'), number = $('.strain-number');
        const fill = $('.strain-fill');
        const controls = {
          strain: { input: $('.range-strain'), label: $('.value-strain') },
          x: { input: $('.range-x'), label: $('.value-x') },
          y: { input: $('.range-y'), label: $('.value-y') }
        };
        const motion = matchMedia('(prefers-reduced-motion: reduce)');
        const abort = new AbortController();
        const listen = (node, type, fn, options = {}) => node.addEventListener(type, fn, { ...options, signal: abort.signal });
        const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
        let disposed = false, paused = false, generation = 0;
        let gpu = null, raf = 0, lastTime = 0;
        let view = { width: CONFIG.minViewWidth, height: CONFIG.minViewHeight };
        let base = 0, centerX = 0.5, centerY = 0.5;
        let pull = 0, strain = 0, gesture = null;
        let px = 0.5, py = 0.5, tx = 0.5, ty = 0.5;
      
        const vertexShader = `
          uniform float uStrain;
          uniform vec2 uPoint;
          uniform float uRadius;
          varying vec2 vUv;
          varying float vFold;
          void main() {
            vUv = uv;
            vec2 d = uv - uPoint;
            vec2 localDistance = d * vec2(1.0, 0.85);
            float local = exp(-dot(localDistance, localDistance) * uRadius);
            float wave = sin(uv.x * 6.283185 - uPoint.x * 1.5);
            vec3 p = position;
            p.x += uStrain * ((uv.y - 0.5) * 0.38 + d.x * local * 0.45);
            p.y += uStrain * (wave * 0.16 + local * (uv.y - 0.5) * 0.13);
            p.z += uStrain * (wave * 0.42 + local * 0.22);
            p.y += p.z * 0.3;
            vFold = uStrain * (cos(uv.x * 6.283185 - uPoint.x * 1.5) + local * 0.35);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `;
        const fragmentShader = `
          uniform sampler2D uMap;
          uniform vec3 uInk;
          uniform vec3 uHot;
          varying vec2 vUv;
          varying float vFold;
          void main() {
            float alpha = texture2D(uMap, vUv).a;
            if (alpha < 0.005) discard;
            float ridge = smoothstep(0.35, 0.95, abs(vFold));
            vec3 color = mix(uInk, uHot, ridge * 0.86);
            color *= 1.0 + vFold * 0.07;
            gl_FragColor = vec4(color, alpha);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `;
      
        function syncTypography() {
          const l = CONFIG.layout;
          const ns = 'http://www.w3.org/2000/svg';
          $('.type-title').textContent = `${CONFIG.words.join(' ')} — ${CONFIG.subtitle}`;
          $('.type-subtitle').textContent = CONFIG.subtitle;
          svg.setAttribute('viewBox', `0 0 ${l.width} ${l.height}`);
          const group = document.createElementNS(ns, 'g');
          group.setAttribute('font-family', l.fontFamily);
          group.setAttribute('font-size', String(l.fontSize));
          group.setAttribute('font-weight', String(l.fontWeight));
          group.setAttribute('text-anchor', 'middle');
          CONFIG.words.forEach((word, index) => {
            const text = document.createElementNS(ns, 'text');
            text.setAttribute('x', String(l.width / 2));
            text.setAttribute('y', String(l.baselines[index]));
            text.setAttribute('textLength', String(l.textWidth));
            text.setAttribute('lengthAdjust', 'spacingAndGlyphs');
            text.textContent = word;
            group.append(text);
          });
          svg.replaceChildren(group);
        }
      
        function syncControls() {
          const values = { strain: Math.round(base * 100), x: Math.round(centerX * 100), y: Math.round(centerY * 100) };
          Object.entries(controls).forEach(([key, control]) => {
            const value = values[key];
            control.input.value = String(value);
            control.label.textContent = `${value > 0 && key === 'strain' ? '+' : ''}${value}%`;
            control.input.setAttribute('aria-valuetext', `${value}パーセント`);
          });
        }
      
        function updateReadout() {
          const signed = Math.round(strain / CONFIG.maxStrain * 100);
          number.textContent = `${signed < 0 ? '−' : signed > 0 ? '+' : ''}${String(Math.abs(signed)).padStart(3, '0')}`;
          fill.style.transform = `scaleX(${Math.abs(strain) / CONFIG.maxStrain})`;
        }
      
        function stop() {
          cancelAnimationFrame(raf);
          raf = 0;
          lastTime = 0;
        }
      
        function clearGesture() {
          const id = gesture?.id;
          gesture = null;
          pull = 0;
          tx = centerX;
          ty = centerY;
          root.classList.remove('is-dragging');
          if (id !== undefined && field.hasPointerCapture(id)) field.releasePointerCapture(id);
        }
      
        // 再マウント・静止モードではsnap=true。RESETは補間を残す。
        function resetState(snap = false) {
          clearGesture();
          base = 0;
          centerX = centerY = tx = ty = 0.5;
          syncControls();
          if (snap) {
            strain = pull = 0;
            px = py = 0.5;
            updateReadout();
          }
        }
      
        function staticMode(message) {
          resetState(true);
          root.classList.remove('is-ready');
          fallback.hidden = false;
          mount.hidden = true;
          Object.values(controls).forEach(control => { control.input.disabled = true; });
          reset.disabled = true;
          note.textContent = 'RESTING LETTERFORM';
          status.textContent = message;
        }
      
        function releaseGPU() {
          stop();
          clearGesture();
          const g = gpu;
          gpu = null;
          if (!g) return;
          const canvas = g.renderer?.domElement;
          if (canvas && g.lost) canvas.removeEventListener('webglcontextlost', g.lost);
          g.geometry?.dispose();
          g.material?.dispose();
          g.texture?.dispose();
          g.scene?.clear();
          g.renderer?.dispose();
          g.renderer?.forceContextLoss();
          canvas?.remove();
        }
      
        function fail(message) {
          generation++;
          releaseGPU();
          staticMode(message);
        }
      
        function measure() {
          if (disposed) return;
          // client寸法は罫線を除いた描画領域。SVGとWebGLで同じfitを使う。
          const width = field.clientWidth, height = field.clientHeight;
          if (!width || !height) return;
          const aspect = width / height;
          view.height = Math.max(CONFIG.minViewHeight, CONFIG.minViewWidth / aspect);
          view.width = view.height * aspect;
          svg.style.width = `${width * CONFIG.planeWidth / view.width}px`;
          svg.style.height = `${height * CONFIG.planeHeight / view.height}px`;
          const g = gpu;
          if (!g?.camera) return;
          try {
            g.camera.left = -view.width / 2;
            g.camera.right = view.width / 2;
            g.camera.top = view.height / 2;
            g.camera.bottom = -view.height / 2;
            g.camera.updateProjectionMatrix();
            g.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CONFIG.maxDpr));
            g.renderer.setSize(width, height, false);
            wake();
          } catch (error) {
            fail('描画領域を更新できないため、静止表示に切り替えました。');
          }
        }
      
        function wake() {
          if (disposed || paused || document.hidden || !gpu?.ready || raf) return;
          raf = requestAnimationFrame(frame);
        }
      
        function frame(time) {
          raf = 0;
          const g = gpu;
          if (!g?.ready || disposed || paused || document.hidden) return;
          const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 1 / 60;
          lastTime = time;
          const target = clamp(base + pull, -1, 1) * CONFIG.maxStrain;
          const rate = gesture?.active ? CONFIG.followRate : CONFIG.releaseRate;
          const k = 1 - Math.exp(-rate * dt);
          strain += (target - strain) * k;
          px += (tx - px) * k;
          py += (ty - py) * k;
          const settled = Math.abs(target - strain) + Math.abs(tx - px) + Math.abs(ty - py) < 0.0003;
          if (settled) { strain = target; px = tx; py = ty; }
          g.material.uniforms.uStrain.value = strain;
          g.material.uniforms.uPoint.value.set(px, py);
          try {
            g.renderer.render(g.scene, g.camera);
            if (g.shaderFailed) throw new Error('Shader failure');
          } catch (error) {
            fail('描画を継続できないため、静止表示に切り替えました。');
            return;
          }
          updateReadout();
          if (!settled) wake();
          else lastTime = 0;
        }
      
        async function initialize() {
          const token = ++generation;
          releaseGPU();
          staticMode(motion.matches
            ? '動きを減らす設定に合わせて、静止表示にしています。'
            : '静止表示。インタラクティブ表示を準備しています。');
          measure();
          if (motion.matches || disposed) return;
          try {
            const THREE = await import('three');
            if (disposed || token !== generation || motion.matches) return;
            const g = { ready: false, shaderFailed: false };
            gpu = g;
            g.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
            g.renderer.setClearColor(0x000000, 0);
            g.renderer.outputColorSpace = THREE.SRGBColorSpace;
            g.renderer.domElement.setAttribute('aria-hidden', 'true');
            g.lost = event => {
              event.preventDefault();
              fail('グラフィックス接続が失われたため静止表示です。再読み込みで再試行できます。');
            };
            g.renderer.domElement.addEventListener('webglcontextlost', g.lost);
            mount.append(g.renderer.domElement);
            g.scene = new THREE.Scene();
            g.camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 0.1, 20);
            g.camera.position.z = 6;
      
            const l = CONFIG.layout;
            const canvas = document.createElement('canvas');
            canvas.width = l.width;
            canvas.height = l.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Canvas 2D unavailable');
            ctx.fillStyle = '#ffffff';
            ctx.font = `${l.fontWeight} ${l.fontSize}px ${l.fontFamily}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            CONFIG.words.forEach((word, index) => {
              const width = ctx.measureText(word).width;
              ctx.save();
              ctx.translate(l.width / 2, l.baselines[index]);
              ctx.scale(l.textWidth / Math.max(width, 1), 1);
              ctx.fillText(word, 0, 0);
              ctx.restore();
            });
            g.texture = new THREE.CanvasTexture(canvas);
            g.texture.minFilter = THREE.LinearMipmapLinearFilter;
            g.texture.magFilter = THREE.LinearFilter;
            g.texture.anisotropy = Math.min(4, g.renderer.capabilities.getMaxAnisotropy());
            g.geometry = new THREE.PlaneGeometry(CONFIG.planeWidth, CONFIG.planeHeight, CONFIG.segmentsX, CONFIG.segmentsY);
            g.material = new THREE.ShaderMaterial({
              transparent: true, depthWrite: false, side: THREE.DoubleSide,
              uniforms: {
                uMap: { value: g.texture }, uStrain: { value: strain },
                uPoint: { value: new THREE.Vector2(px, py) },
                uRadius: { value: CONFIG.localRadius },
                uInk: { value: new THREE.Color('#162b2c') },
                uHot: { value: new THREE.Color('#b44629') }
              }, vertexShader, fragmentShader
            });
            const mesh = new THREE.Mesh(g.geometry, g.material);
            mesh.frustumCulled = false;
            g.scene.add(mesh);
            measure();
            if (gpu !== g || disposed || token !== generation) return;
            g.renderer.debug.checkShaderErrors = true;
            g.renderer.debug.onShaderError = () => { g.shaderFailed = true; };
            g.renderer.compile(g.scene, g.camera);
            g.renderer.render(g.scene, g.camera);
            if (g.shaderFailed || g.renderer.getContext().isContextLost()) throw new Error('GPU initialization failed');
            if (disposed || token !== generation || gpu !== g) return;
            g.ready = true;
            fallback.hidden = true;
            mount.hidden = false;
            root.classList.add('is-ready');
            Object.values(controls).forEach(control => { control.input.disabled = false; });
            reset.disabled = false;
            note.textContent = 'DRAG / RELEASE TO HELD STATE';
            status.textContent = '横ドラッグは一時的な変形。下の3つの操作で張力と中心を保持できます。矢印キーやトラックのタップにも対応。';
            wake();
          } catch (error) {
            if (!disposed && token === generation) fail('この環境では静止表示です。文字とメッセージはそのままご覧いただけます。');
          }
        }
      
        function setPoint(event) {
          const rect = field.getBoundingClientRect();
          // CSSによる拡縮にも配慮し、罫線を除いたフィールド座標へ戻す。
          const scaleX = rect.width / Math.max(1, field.offsetWidth);
          const scaleY = rect.height / Math.max(1, field.offsetHeight);
          const localX = (event.clientX - rect.left) / Math.max(0.001, scaleX) - field.clientLeft;
          const localY = (event.clientY - rect.top) / Math.max(0.001, scaleY) - field.clientTop;
          const s = localX / Math.max(1, field.clientWidth);
          const t = 1 - localY / Math.max(1, field.clientHeight);
          const camera = gpu?.camera;
          const cameraWidth = camera ? camera.right - camera.left : view.width;
          const cameraHeight = camera ? camera.top - camera.bottom : view.height;
          // 静止平面のローカルUV。面外は最寄りの端へクランプする。
          tx = clamp(0.5 + (s - 0.5) * cameraWidth / CONFIG.planeWidth, 0, 1);
          ty = clamp(0.5 + (t - 0.5) * cameraHeight / CONFIG.planeHeight, 0, 1);
        }
      
        listen(field, 'pointerdown', event => {
          if (!gpu?.ready || gesture || !event.isPrimary || event.button !== 0) return;
          const rect = field.getBoundingClientRect();
          gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, width: rect.width, active: false };
        });
        listen(field, 'pointermove', event => {
          if (!gpu?.ready || !gesture || event.pointerId !== gesture.id) return;
          const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
          if (!gesture.active) {
            if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { clearGesture(); wake(); return; }
            if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
            gesture.active = true;
            field.setPointerCapture(event.pointerId);
            root.classList.add('is-dragging');
          }
          setPoint(event);
          pull = clamp(dx / Math.max(1, gesture.width) * CONFIG.dragGain, -1, 1);
          wake();
        });
        const end = event => {
          if (gesture?.id === event.pointerId) { clearGesture(); wake(); }
        };
        listen(window, 'pointerup', end);
        listen(window, 'pointercancel', end);
        listen(field, 'lostpointercapture', end);
        listen(field, 'pointerleave', () => {
          if (gesture && !gesture.active) { clearGesture(); wake(); }
        });
        listen(window, 'blur', () => { clearGesture(); wake(); });
      
        Object.values(controls).forEach(control => {
          listen(control.input, 'input', () => {
            if (!gpu?.ready) return;
            base = clamp(Number(controls.strain.input.value) / 100, -1, 1);
            centerX = clamp(Number(controls.x.input.value) / 100, 0, 1);
            centerY = clamp(Number(controls.y.input.value) / 100, 0, 1);
            // 保持UIを操作した場合は、一時ドラッグより保持値を優先する。
            clearGesture();
            syncControls();
            wake();
          });
        });
        listen(reset, 'click', () => { resetState(false); wake(); });
        listen(motion, 'change', () => { initialize(); });
        listen(document, 'visibilitychange', () => {
          if (document.hidden) { clearGesture(); stop(); }
          else { measure(); wake(); }
        });
        listen(window, 'resize', measure, { passive: true });
        const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
        observer?.observe(field);
        listen(window, 'pagehide', event => {
          if (event.persisted) { paused = true; clearGesture(); stop(); }
          else destroy();
        });
        listen(window, 'pageshow', () => { paused = false; measure(); wake(); });
        listen(root, 'daily:destroy', destroy);
      
        function destroy() {
          if (disposed) return;
          disposed = true;
          generation++;
          abort.abort();
          observer?.disconnect();
          releaseGPU();
          staticMode('静止表示。インタラクティブ表示は終了しています。');
          if (root.dailyDestroy === destroy) delete root.dailyDestroy;
        }
      
        root.dailyDestroy = destroy;
        syncTypography();
        initialize();
        return destroy;
      }
      
      const root = document.querySelector('.daily-stage');
      if (root) mountLetterfield(root);
      
---

# Day 045 — Three.jsで作る、余白に張力を与えるキネティックタイポグラフィ

> **Reference study:** [TBWAHAKUHODO Corporate Website — SHIFTBRAIN Inc.](https://www.cssdesignawards.com/sites/tbwahakuhodo/49947/) / CSS Design Awards  
> **主軸:** Three.js / **品質レビュー:** 88/100

可視グリッドと変化する文字の対比を、静止時の可読性と操作時の張力として再解釈しました。独自コピー、セージ系配色、共通組版の静的SVG、ドラッグと符号付き張力・二軸中心位置の保持UIへ再構成しています。元サイトのThree.js採用は未確認で、本作のCanvasTextureとシェーダー構成は独自設計です。受賞情報は提供資料に基づきます。

# Day 045 / 365 — Three.js × Kinetic Typography

公開日：2026-11-16

## 参考にした表現

参考：**TBWAHAKUHODO Corporate Website — SHIFTBRAIN Inc.**  
掲載：CSS Design Awards  
URL：https://www.cssdesignawards.com/sites/tbwahakuhodo/49947/

提供資料では、Special Kudos、2026年8月14日、審査員スコア7.93/10とされています。この回答内では掲載情報を再確認していません。元サイトのThree.js採用、内部実装、実機性能についても断定しません。

研究対象は、可視グリッドと変化する文字の関係です。規則的な基準線があると、文字の変形が単なる揺れではなく「構造に対して加えられた力」として読めます。また、可読状態を基準として残すことで、変形状態がブランドの別人格ではなく、同じ言葉の可変性として成立します。これは提供資料の表現特徴から得た設計上の解釈であり、参考サイトの操作仕様を検証した記述ではありません。

本作では、この対比を**整える／揺さぶる**という独自のメッセージに翻訳しました。元のブランド、コピー、素材、特徴的な構図は使用していません。

## 完成形

**HOLD SPACE — 余白に、張力を。**

セージ色の計測面、インク色の二段組タイポグラフィ、四隅の登録マーク、ライム色のフッターを組み合わせたブランドHeroです。

文字面の横ドラッグは一時的な力です。手を離すと、保持コントロールで指定した張力と変形中心へ戻ります。保持張力が0なら、輪郭が整った読みやすい状態へ復元します。

下部には次の3つのネイティブrangeを置きます。

- **保持する張力**：−100〜100%。逆方向の変形も指定できます。
- **中心・横位置**：左端0〜右端100%。
- **中心・縦位置**：下端0〜上端100%。

これらはキーボードでも操作でき、ポインターでトラックをクリック／タップして値を指定することもできます。ドラッグしなくても、符号付き張力と変形中心を設定できます。ただし、ドラッグ中の連続軌跡そのものを再現する操作ではありません。

保持値と一時入力を分離することで、文字は触れる表現であると同時に、任意の状態を構成できる可変ポスターになります。リンクやCTAは変形面の外へ配置する設計です。

## 実装設計

### 文字の共通仕様

`CONFIG.words`を見出しデータの正とし、マウント時に読み上げ用h1、静的SVG、CanvasTextureへ反映します。二段組を前提とするため、コピー変更時も短い2語を指定してください。

HTMLにはJavaScriptなしでも表示できる初期SVGを含めています。JavaScriptでコピーを変更すると三者は同期しますが、**JavaScriptを実行しない環境のコピーも変更する場合は、HTMLの初期h1とSVGテキストも更新してください**。実案件では同じCMSデータからHTMLと設定を出力すると管理を一本化できます。

静的表示はHTML内のインラインSVGです。Canvasと同じ1600×1000の座標系、フォント、文字幅1360、ベースライン452／870を使います。SVGの`textLength`とCanvasの水平スケールによって、どちらも各単語を同じ幅へ揃えます。

さらに、カメラの表示範囲から算出した文字平面の表示幅・高さをSVGにも適用します。静止表示からWebGLへ切り替わっても、文字幅、行位置、レスポンシブ時の占有率が別仕様になりません。SVGとテクスチャ描画のアンチエイリアス差まで完全一致を保証するものではありません。

### 入力座標の変換

フィールド内の座標をそのままUVにはしません。左から右へ`s`、下から上へ`t`として、静止平面のUVへ変換します。

```text
u = 0.5 + (s - 0.5) × cameraWidth / planeWidth
v = 0.5 + (t - 0.5) × cameraHeight / planeHeight
```

カメラの表示範囲と3.4×2.125の文字平面を同時に考慮するため、中央以外や縦長画面でも、入力と局所変形の基準座標が揃います。

本作の中心指定は**変形前の文字面を基準とするUV**です。変形後の輪郭に対するレイキャストではありません。文字面の外側から操作した場合は、UVを0〜1へ制限して最寄りの面端を使用します。文字の透明部分でも操作できます。

### 状態とライフサイクル

保持張力・保持中心・一時的なドラッグ入力・描画中の補間値を分離します。初期化は`resetState()`に集約し、再マウント時には内部値、range値、ラベル、描画値をすべてゼロ張力／中央へ揃えます。動きを減らす設定への切り替えや描画失敗でも、この静止状態へ揃えます。

通常のRESET操作だけは描画値を即座に変更せず、目標値を初期状態へ戻して滑らかに復元します。

横移動の閾値と方向優位性でドラッグを確定し、縦移動はページスクロールへ渡します。`pointercancel`、キャプチャ喪失、ウィンドウのフォーカス喪失でも一時入力を解除します。

章切り替え、History API、スクロールの乗っ取りは使用しません。

## シェーダー/レンダリング

文字テクスチャを、96×56に分割した平面へ貼ります。頂点シェーダーは以下を重ねます。

1. 上下で方向が異なるせん断。
2. 横方向を横切る低周波の曲げ。
3. 指定したUVを中心とする局所的な伸長。

Z変位の一部をYへ投影する2.5D表現です。物理的な布シミュレーションではありません。フラグメントシェーダーでは稜線付近だけを朱色へ寄せ、力の集中を伝えます。全面の2色フェードではなく、文字の輪郭変化が主役です。

時間依存の自動揺れは入れません。入力と描画値の差が収束したらRAFを停止し、張力0では文字を正確な静止平面へ戻します。

WebGLの初回コンパイル・描画でエラーを検出しなかった場合にのみ、静的SVGを隠します。Three.jsはバンドラーで解決してください。想定する導入例は`npm install three@0.170.0`で、JavaScript欄はES moduleとして実行します。モジュールを解決できない場合も静止表示を維持します。

## 実務での使いどころ

- ブランドの「構造と自由」を伝えるマニフェストHero。
- 展覧会や音楽イベントの可変ポスター。
- 短い商品名を主役にしたキャンペーン。
- デザインスタジオのタイポグラフィ・ディレクション紹介。

変形はメッセージの可変性を表す操作として設計し、単なる常時アニメーションにはしません。文章、法的表示、重要なナビゲーションには適用せず、意味を担うHTMLと通常の操作UIを残します。

## 調整パラメータ

| CONFIG | 初期値 | 用途 |
| --- | --- | --- |
| `words` | HOLD / SPACE | 共通の二段見出し |
| `layout` | 1600×1000 | SVGとCanvasの共通組版 |
| `planeWidth / planeHeight` | 3.4 / 2.125 | 文字面のワールド寸法 |
| `minViewHeight / minViewWidth` | 2.85 / 4.15 | 余白と画面占有率 |
| `maxDpr` | 1.75 | 描画解像度の上限 |
| `segmentsX / segmentsY` | 96 / 56 | 変形の細かさ |
| `dragGain` | 2.6 | 横ドラッグの感度 |
| `followRate / releaseRate` | 11 / 7 | 追従／復元速度 |
| `maxStrain` | 0.82 | 最大変形量 |
| `localRadius` | 13 | 局所変形の減衰。大きいほど狭い |

文字面の縦横比は、組版座標の縦横比と揃えてください。変形量を増やす場合はカメラ余白も調整します。色はCSS変数と`uInk`・`uHot`をセットで変更します。

## パフォーマンスとアクセシビリティ

- 1メッシュ、1マテリアル。外部画像、外部フォント、ポストプロセスは使用しません。
- DPR制限とResizeObserverを実装。静的SVGも同じ寸法計算へ追従します。
- 補間収束後と非表示タブではRAFを停止します。
- reduced-motion時はGPUを起動せず、静的SVGを表示します。設定変更にも追従します。
- WebGL非対応、モジュール読込失敗、検出できたシェーダーエラー、コンテキストロストでは静止表示へ戻します。
- 視覚用SVGとCanvasは`aria-hidden`。共通コピーから更新したh1を読み上げ対象にします。
- 操作はラベル付きのネイティブrange。描画中の数値を毎フレーム読み上げません。
- `hidden`はCSSで`display: none !important`を保証します。
- アンマウント時は`root.dailyDestroy()`または`daily:destroy`イベントを使用します。RAF、イベント、Observer、テクスチャ、ジオメトリ、マテリアル、レンダラーを解放します。
- BFCacheへ移る際はRAFを停止し、復帰時に寸法を更新します。

**ブラウザ・実機・性能検証は未実施です。** 公開前には、Chrome／Firefox／Safariでの初回描画、iOS Safariでの横ドラッグと縦スクロール、320px幅、200%ズーム、最大変形時の輪郭、SVGからCanvasへの切り替え、キーボードとタップ操作を確認してください。

特に、画面左右の文字を指したときの変形中心、保持値を変更した後の破棄・再マウント、コピー変更後のh1／SVG／Canvasの一致を確認します。続いて、OSの動きを減らす設定変更、BFCache復帰、コンテキストロスト、連続マウント時の資源解放、初期化コストと操作中のフレーム時間を対象端末で計測してください。

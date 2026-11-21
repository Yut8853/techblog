---
title: "WebGLで作る、色が地形になるプロシージャルサーフェス"
description: "ドメインワープと地層状の陰影で、色を編集できる地形へ変えるWebGL Hero。密度・うねりの調整、静的SVGへの退避、Canvas交換による再マウント、読み上げ通知の分離まで設計します。"
category: "WebGLプロシージャルサーフェスHero"
categorySlug: "webgl-procedural-surface-hero"
categoryDescription: "ノイズ、座標変形、陰影を組み合わせた生成表面を、ブランドのHeroや素材調整UIへ組み込むWebGL表現。"
tags:
  - "WebGL"
  - "Three.js"
  - "GLSL"
  - "Procedural Surface"
  - "ドメインワープ"
  - "ブランドHero"
  - "Daily Lab"
date: "2026年11月22日"
publishedAt: "2026-11-22"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 51
focus: "WebGL"
concept: "色彩を堆積した地形として扱う、架空のマテリアル・エディション。ドメインワープによる大きな流れと密度調整できる細かな層を分離し、表面の性格そのものを編集するWebGL Hero。再マウント時のCanvas交換と通知経路の分離まで設計する。"
referenceTitle: "FullCircle — custom gradient shader / Owls Department"
referenceUrl: "https://www.cssdesignawards.com/sites/fullcircle/45528/"
referencePlatform: "CSS Design Awards"
qualityScore: 87
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" aria-label="STRATA 色の地形スタディ">
        <header class="st-top">
          <div class="st-wordmark">STRATA</div>
          <p>CHROMATIC TERRAIN<br>FIELD EDITION / 051</p>
        </header>
        <div class="st-main">
          <div class="st-copy">
            <p class="st-eyebrow">PROCEDURAL SURFACE — VOL. 01</p>
            <h1>色は、<br>地形になる。</h1>
            <p class="st-intro">流れが重なり、色に稜線が生まれる。<br>密度とうねりを調整して、<br>まだ名前のない表面を探る。</p>
            <p class="st-edition">NO IMAGE. ONLY A FIELD.</p>
          </div>
          <figure>
            <div class="st-surface">
              <svg class="st-fallback" viewBox="0 0 700 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="700" height="640" fill="#173a43"/>
                <path d="M-90 520C80 180 290 650 410 290S700 30 810 110" fill="none" stroke="#456e6b" stroke-width="350"/>
                <path d="M-90 520C80 180 290 650 410 290S700 30 810 110" fill="none" stroke="#a0aa8d" stroke-width="239"/>
                <path d="M-90 520C80 180 290 650 410 290S700 30 810 110" fill="none" stroke="#e4d4a9" stroke-width="154"/>
                <path d="M-90 520C80 180 290 650 410 290S700 30 810 110" fill="none" stroke="#c7895d" stroke-width="88"/>
                <path d="M-90 520C80 180 290 650 410 290S700 30 810 110" fill="none" stroke="#8e5946" stroke-width="35"/>
                <g fill="none" stroke="#f5e5bf" opacity=".33" stroke-width="1.5">
                  <path d="M-80 410C90 130 270 550 350 260S640-20 760 50"/>
                  <path d="M-80 432C90 152 275 570 365 270S655-5 770 65"/>
                  <path d="M-80 454C90 174 280 590 380 280S670 10 780 80"/>
                  <path d="M-80 560C100 210 310 700 455 320S750 60 820 150"/>
                  <path d="M-80 582C100 232 320 720 470 330S765 75 830 165"/>
                  <path d="M-80 604C100 254 330 740 485 340S780 90 840 180"/>
                </g>
              </svg>
              <canvas class="st-canvas" aria-hidden="true" hidden></canvas>
              <div class="st-overlay" aria-hidden="true"><span>S / 001<br>SEDIMENT STUDY</span><span class="st-cross">+</span></div>
            </div>
            <figcaption><span>FIG. 01 / GENERATED TOPOGRAPHY</span><span class="st-mode">STATIC PREVIEW</span></figcaption>
          </figure>
        </div>
        <div class="st-controls" role="group" aria-label="表面の造形パラメータ">
          <div class="st-control">
            <div class="st-control-head"><label><span>01</span>層の密度</label><output class="st-density-value" aria-live="off">7.2</output></div>
            <input class="st-density" type="range" min="3" max="12" step="0.1" value="7.2" aria-label="層の密度" disabled>
          </div>
          <div class="st-control">
            <div class="st-control-head"><label><span>02</span>地形のうねり</label><output class="st-warp-value" aria-live="off">48%</output></div>
            <input class="st-warp" type="range" min="0" max="1" step="0.01" value="0.48" aria-label="地形のうねり" disabled>
          </div>
          <div class="st-actions">
            <button class="st-pause" type="button" disabled>動きを停止</button>
            <button class="st-reset" type="button" disabled>初期の地形へ</button>
          </div>
        </div>
        <footer class="st-bottom">
          <p class="st-status" role="status">静的な代替図版を表示しています。形状調整にはJavaScriptとWebGLが必要です。</p>
          <p class="st-date">2026.11.22 / DAY 051 — 365</p>
        </footer>
      </section>
  - name: styles.css
    language: css
    content: |
      .daily-stage{--paper:#eee9dc;--muted:#b9bbb0;--line:rgba(238,233,220,.19);--accent:#f1be86;background:#111e20;color:var(--paper);padding:30px clamp(20px,4.5vw,76px) 24px;font-family:Arial,'Noto Sans JP',sans-serif;box-sizing:border-box;isolation:isolate}.daily-stage *{box-sizing:border-box}.daily-stage [hidden]{display:none!important}.daily-stage button,.daily-stage input{font:inherit}.daily-stage button{color:inherit}.daily-stage .st-top{display:flex;justify-content:space-between;align-items:center;gap:24px;padding-bottom:25px;border-bottom:1px solid var(--line)}.daily-stage .st-wordmark{font-size:23px;font-weight:700;letter-spacing:.2em}.daily-stage .st-top p{margin:0;text-align:right;font:12px/1.7 monospace;letter-spacing:.08em;color:var(--muted)}.daily-stage .st-main{display:grid;grid-template-columns:minmax(250px,.8fr) minmax(0,1.5fr);gap:clamp(28px,5vw,80px);align-items:center;padding:40px 0}.daily-stage .st-copy{min-width:0}.daily-stage .st-eyebrow{font:12px/1.8 monospace;letter-spacing:.1em;color:var(--accent);margin:0 0 32px}.daily-stage h1{font-family:Georgia,'Yu Mincho','Hiragino Mincho ProN',serif;font-weight:400;font-size:clamp(40px,4.6vw,76px);line-height:1.3;letter-spacing:-.045em;margin:0 0 25px}.daily-stage .st-intro{max-width:29em;font-size:14px;line-height:2.1;color:#cbd0c4;margin:0}.daily-stage .st-edition{display:flex;align-items:center;gap:15px;margin:36px 0 0;font:12px/1.7 monospace;letter-spacing:.06em;color:var(--muted)}.daily-stage .st-edition:before{content:'';flex:0 0 32px;height:1px;background:var(--accent)}.daily-stage figure{margin:0;min-width:0}.daily-stage .st-surface{position:relative;aspect-ratio:1.16;overflow:hidden;background:#17363c;border:1px solid rgba(238,233,220,.23);border-radius:45% 45% 3px 3px}.daily-stage .st-surface:after{content:'';position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 70px #001c2540}.daily-stage .st-canvas,.daily-stage .st-fallback{display:block;position:absolute;width:100%;height:100%;inset:0}.daily-stage .st-overlay{position:absolute;z-index:1;bottom:18px;left:20px;right:20px;display:flex;justify-content:space-between;align-items:center;color:#fff3d8;font:12px/1.5 monospace;letter-spacing:.08em;text-shadow:0 1px 8px #000;pointer-events:none}.daily-stage .st-cross{font-size:28px;font-weight:300}.daily-stage figcaption{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px 14px;margin-top:14px;color:var(--muted);font:12px/1.7 monospace;letter-spacing:.03em}.daily-stage .st-mode{color:var(--accent)}.daily-stage .st-controls{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto;gap:32px;align-items:center;border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:25px 0}.daily-stage .st-control-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 12px;margin-bottom:10px}.daily-stage label{font-size:13px;line-height:1.7;letter-spacing:.03em}.daily-stage label span{font:12px monospace;color:var(--muted);margin-right:10px}.daily-stage output{font:14px monospace;color:var(--accent);font-variant-numeric:tabular-nums}.daily-stage input[type=range]{display:block;width:100%;height:36px;margin:0;accent-color:var(--accent);cursor:ew-resize}.daily-stage input:disabled{opacity:.35;cursor:not-allowed}.daily-stage .st-actions{display:flex;flex-direction:column;gap:9px;min-width:165px}.daily-stage button{border:1px solid var(--line);background:transparent;padding:11px 16px;font-size:13px;line-height:1.6;cursor:pointer;min-height:44px;transition:background .2s,border-color .2s}.daily-stage button:hover:not(:disabled){background:#ffffff0b;border-color:var(--accent)}.daily-stage button:disabled{opacity:.45;cursor:not-allowed}.daily-stage .st-reset{border-color:transparent;color:var(--muted)}.daily-stage :focus-visible{outline:2px solid var(--accent);outline-offset:5px}.daily-stage .st-bottom{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 24px;padding-top:18px}.daily-stage .st-status{margin:0;max-width:640px;font-size:12px;line-height:1.9;color:var(--muted)}.daily-stage .st-date{margin:0;font:12px/1.9 monospace;color:var(--muted);letter-spacing:.03em}@media(min-width:1500px){.daily-stage .st-main{max-width:1380px;margin:auto}.daily-stage .st-surface{max-height:650px}}@media(max-width:760px){.daily-stage{padding:22px 20px}.daily-stage .st-top{padding-bottom:18px;flex-wrap:wrap;gap:12px}.daily-stage .st-wordmark{font-size:20px}.daily-stage .st-top p{text-align:left}.daily-stage .st-main{grid-template-columns:1fr;padding:28px 0;gap:26px}.daily-stage .st-eyebrow{margin-bottom:16px}.daily-stage h1{font-size:clamp(42px,9vw,64px);margin-bottom:17px}.daily-stage h1 br{display:none}.daily-stage .st-intro{max-width:36em}.daily-stage .st-edition{margin-top:18px}.daily-stage .st-surface{aspect-ratio:1.12;max-height:560px}.daily-stage .st-controls{grid-template-columns:1fr;gap:23px;padding:22px 0}.daily-stage .st-actions{display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:10px;min-width:0}.daily-stage .st-bottom{flex-direction:column;gap:10px}.daily-stage .st-overlay{left:16px;right:16px}}@media(prefers-reduced-motion:reduce){.daily-stage button{transition:none}}
  - name: experiment.js
    language: javascript
    content: |
      export function mountStrata(root) {
        // Dispose the previous owner before replacing its canvas.
        root.__strataDispose?.();
        const CONFIG = { maxDPR: 1.5, maxPixels: 1500000, damping: 8, drift: 0.09, density: 7.2, warp: 0.48 };
        const $ = (s) => root.querySelector(s);
        const previousCanvas = $('.st-canvas');
        // cloneNode copies attributes, NOT the drawing context or event listeners.
        // Never initialize a new renderer on a canvas whose context was force-lost.
        const canvas = previousCanvas.cloneNode(false);
        canvas.hidden = true;
        previousCanvas.replaceWith(canvas);
        const surface = $('.st-surface');
        const fallback = $('.st-fallback');
        const density = $('.st-density');
        const warp = $('.st-warp');
        const densityValue = $('.st-density-value');
        const warpValue = $('.st-warp-value');
        const pause = $('.st-pause');
        const reset = $('.st-reset');
        const status = $('.st-status');
        const mode = $('.st-mode');
        const controls = [density, warp, pause, reset];
        const abort = new AbortController();
        const media = matchMedia('(prefers-reduced-motion: reduce)');
        let reduced = media.matches;
        let paused = false;
        let destroyed = false;
        let gpu = false;
        let visible = true;
        let suspended = false;
        let raf = 0;
        let last = 0;
        let sizeDirty = true;
        let elapsed = 0;
        let renderer, geometry, material, scene, camera, uniforms;
        let shaderFailed = false;
        const target = { density: CONFIG.density, warp: CONFIG.warp, x: 0.5, y: 0.5, probe: 0 };
        const on = (el, type, fn, options = {}) => el.addEventListener(type, fn, { ...options, signal: abort.signal });
      
        const uid = 'strata-' + Math.random().toString(36).slice(2, 10);
        [density, warp].forEach((input, i) => {
          input.id = uid + '-' + i;
          const control = input.closest('.st-control');
          control.querySelector('label').htmlFor = input.id;
          const output = control.querySelector('output');
          output.htmlFor = input.id;
          // output has an implicit status role. Suppress duplicate live updates.
          output.setAttribute('aria-live', 'off');
        });
      
        function syncValues() {
          density.value = String(target.density);
          warp.value = String(target.warp);
          densityValue.value = target.density.toFixed(1);
          warpValue.value = Math.round(target.warp * 100) + '%';
          density.setAttribute('aria-valuetext', target.density.toFixed(1));
          warp.setAttribute('aria-valuetext', Math.round(target.warp * 100) + 'パーセント');
          // Do not update the status live region for continuous range input.
        }
        function syncMode() {
          if (!gpu) return;
          mode.textContent = reduced || paused ? 'STILL / EDITABLE' : 'LIVE SURFACE';
          pause.disabled = reduced;
          pause.textContent = reduced ? '動きを抑制中' : paused ? '動きを再開' : '動きを停止';
          status.textContent = reduced
            ? '動きを減らす設定に合わせて静止表示。スライダーと矢印キーで形状を調整できます。'
            : paused
              ? '自動運動を停止しています。スライダーと矢印キーによる形状調整は利用できます。'
              : 'スライダーと矢印キーで地形を調整。表面にポインターを重ねると、局所的に層が広がります。';
        }
        function stop() {
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
          last = 0;
        }
        function canDraw() {
          return gpu && !destroyed && visible && !document.hidden && !suspended;
        }
        function requestDraw() {
          if (canDraw() && !raf) raf = requestAnimationFrame(frame);
        }
        function resizeGPU() {
          const rect = surface.getBoundingClientRect();
          const w = Math.max(1, Math.round(rect.width));
          const h = Math.max(1, Math.round(rect.height));
          const dpr = Math.min(window.devicePixelRatio || 1, CONFIG.maxDPR, Math.sqrt(CONFIG.maxPixels / (w * h)));
          renderer.setPixelRatio(dpr);
          renderer.setSize(w, h, false);
          renderer.getDrawingBufferSize(uniforms.uResolution.value);
          sizeDirty = false;
        }
        function updateUniforms(dt, immediate) {
          const a = immediate ? 1 : 1 - Math.exp(-CONFIG.damping * dt);
          const mix = (v, t) => v + (t - v) * a;
          uniforms.uDensity.value = mix(uniforms.uDensity.value, target.density);
          uniforms.uWarp.value = mix(uniforms.uWarp.value, target.warp);
          uniforms.uPointer.value.x = mix(uniforms.uPointer.value.x, target.x);
          uniforms.uPointer.value.y = mix(uniforms.uPointer.value.y, target.y);
          uniforms.uProbe.value = mix(uniforms.uProbe.value, reduced || paused ? 0 : target.probe);
          uniforms.uTime.value = elapsed;
        }
        function frame(now) {
          raf = 0;
          if (!canDraw()) { last = 0; return; }
          const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
          last = now;
          try {
            if (sizeDirty) resizeGPU();
            const moving = !reduced && !paused;
            if (moving) elapsed += dt * CONFIG.drift;
            updateUniforms(dt, !moving);
            renderer.render(scene, camera);
            if (shaderFailed || renderer.getContext().isContextLost()) throw new Error('WebGL render unavailable');
            if (moving) requestDraw();
            else last = 0;
          } catch (error) { fail(); }
        }
        function releaseGPU() {
          // Clear ownership before generating any asynchronous context-loss event.
          gpu = false;
          stop();
          geometry?.dispose();
          material?.dispose();
          scene?.clear();
          if (renderer) {
            renderer.dispose();
            renderer.forceContextLoss();
          }
          renderer = geometry = material = scene = camera = uniforms = null;
        }
        function fail() {
          if (destroyed) return;
          releaseGPU();
          canvas.hidden = true;
          fallback.hidden = false;
          controls.forEach((el) => { el.disabled = true; });
          mode.textContent = 'STATIC EDITION';
          pause.textContent = '静止版を表示中';
          status.textContent = 'WebGLを利用できないため、静的な代替図版を表示しています。形状調整は無効です。再読み込みで再試行できます。';
        }
      
        on(density, 'input', () => {
          target.density = Number(density.value);
          syncValues();
          requestDraw();
        });
        on(warp, 'input', () => {
          target.warp = Number(warp.value);
          syncValues();
          requestDraw();
        });
        on(pause, 'click', () => {
          if (!gpu || reduced) return;
          paused = !paused;
          target.probe = 0;
          stop();
          syncMode();
          requestDraw();
        });
        on(reset, 'click', () => {
          target.density = CONFIG.density;
          target.warp = CONFIG.warp;
          target.probe = 0;
          syncValues();
          requestDraw();
        });
        on(surface, 'pointermove', (event) => {
          if (!gpu || reduced || paused || event.pointerType === 'touch') return;
          const rect = surface.getBoundingClientRect();
          target.x = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width)));
          target.y = 1 - Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)));
          target.probe = 1;
          requestDraw();
        }, { passive: true });
        const leave = () => { target.probe = 0; requestDraw(); };
        on(surface, 'pointerleave', leave);
        on(surface, 'pointercancel', leave);
        on(canvas, 'webglcontextlost', (event) => {
          event.preventDefault();
          if (gpu && !destroyed) fail();
        });
        on(document, 'visibilitychange', () => {
          if (document.hidden) { target.probe = 0; stop(); }
          else { sizeDirty = true; requestDraw(); }
        });
        on(window, 'resize', () => { sizeDirty = true; requestDraw(); }, { passive: true });
        const motionChange = () => {
          if (destroyed) return;
          reduced = media.matches;
          target.probe = 0;
          stop();
          syncMode();
          requestDraw();
        };
        media.addEventListener('change', motionChange);
        const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => {
          if (destroyed) return;
          sizeDirty = true;
          requestDraw();
        }) : null;
        ro?.observe(surface);
        const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver((entries) => {
          if (destroyed) return;
          visible = entries[0].isIntersecting;
          if (visible) requestDraw();
          else { target.probe = 0; stop(); }
        }, { threshold: 0 }) : null;
        io?.observe(surface);
        on(window, 'pagehide', (event) => {
          if (event.persisted) { suspended = true; stop(); }
          else destroy();
        });
        on(window, 'pageshow', () => {
          suspended = false;
          sizeDirty = true;
          requestDraw();
        });
        on(root, 'daily:destroy', destroy);
      
        function destroy() {
          if (destroyed) return;
          destroyed = true;
          // Detach listeners before forceContextLoss; a new mount gets a new canvas.
          abort.abort();
          media.removeEventListener('change', motionChange);
          ro?.disconnect();
          io?.disconnect();
          releaseGPU();
          canvas.hidden = true;
          fallback.hidden = false;
          controls.forEach((el) => { el.disabled = true; });
          mode.textContent = 'STATIC PREVIEW';
          pause.textContent = '動きを停止';
          status.textContent = '静的な代替図版を表示しています。形状調整は停止しています。';
          if (root.__strataDispose === destroy) delete root.__strataDispose;
        }
        root.__strataDispose = destroy;
        syncValues();
        controls.forEach((el) => { el.disabled = true; });
        fallback.hidden = false;
        mode.textContent = 'STATIC PREVIEW';
        pause.textContent = '動きを停止';
        // Loading copy exists only after JavaScript has actually started.
        status.textContent = '静止プレビューを表示しています。WebGLを準備中です。';
      
        const vertexShader = `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `;
        const fragmentShader = `
          precision highp float;
          varying vec2 vUv;
          uniform vec2 uResolution;
          uniform vec2 uPointer;
          uniform float uTime;
          uniform float uDensity;
          uniform float uWarp;
          uniform float uProbe;
      
          float hash(vec2 p) {
            vec3 p3 = fract(vec3(p.xyx) * 0.1031);
            p3 += dot(p3, p3.yzx + 33.33);
            return fract((p3.x + p3.y) * p3.z);
          }
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 s = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), s.x),
                       mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), s.x), s.y);
          }
          float fbm(vec2 p) {
            float sum = 0.0;
            float amp = 0.57;
            mat2 turn = mat2(0.8, -0.6, 0.6, 0.8);
            for (int i = 0; i < 3; i++) {
              sum += amp * noise(p);
              p = turn * p * 2.07 + 7.3;
              amp *= 0.48;
            }
            return sum;
          }
          vec3 palette(float t) {
            vec3 ink = vec3(0.045, 0.18, 0.22);
            vec3 sage = vec3(0.32, 0.51, 0.46);
            vec3 sand = vec3(0.91, 0.83, 0.63);
            vec3 copper = vec3(0.70, 0.35, 0.22);
            vec3 c = mix(ink, sage, smoothstep(0.08, 0.42, t));
            c = mix(c, sand, smoothstep(0.38, 0.73, t));
            return mix(c, copper, smoothstep(0.76, 0.98, t));
          }
          void main() {
            float aspect = uResolution.x / uResolution.y;
            vec2 p = (vUv - 0.5) * vec2(aspect, 1.0) * 2.6;
            vec2 pointer = (uPointer - 0.5) * vec2(aspect, 1.0) * 2.6;
            vec2 delta = p - pointer;
            float influence = exp(-dot(delta, delta) * 3.8) * uProbe;
            p += delta * influence * 0.22;
            p.x += p.y * 0.32;
            vec2 drift = vec2(uTime * 0.19, -uTime * 0.13);
            vec2 q = vec2(fbm(p * 1.25 + drift), fbm(p * 1.3 + 8.7 - drift));
            p += (q - 0.5) * (0.25 + uWarp * 1.8);
            float n = fbm(p * 1.55 + q + drift * 0.5);
            float flow = p.y * 0.82 + p.x * 0.58
                       + sin(p.x * 1.65 + n * 2.5) * 0.48 + n * 0.7;
            float phase = flow * uDensity * 2.5;
            float strata = sin(phase);
            float h = flow * 0.10 + strata * 0.035 + n * 0.11;
            vec3 normal = normalize(vec3(-dFdx(h) * uResolution.x * 0.24,
                                         -dFdy(h) * uResolution.y * 0.24, 1.0));
            vec3 light = normalize(vec3(-0.45, 0.65, 1.2));
            float diffuse = max(dot(normal, light), 0.0);
            vec3 halfVector = normalize(light + vec3(0.0, 0.0, 1.0));
            float spec = pow(max(dot(normal, halfVector), 0.0), 30.0);
            float t = 0.5 + 0.5 * sin(flow * 1.68 + n * 0.4);
            vec3 color = palette(t);
            float line = 1.0 - smoothstep(0.025, 0.12 + fwidth(phase) * 0.4, abs(strata));
            color *= 0.70 + diffuse * 0.39;
            color *= 1.0 - line * 0.19;
            color += vec3(1.0, 0.83, 0.62) * spec * 0.15;
            float vignette = 1.0 - smoothstep(0.25, 0.95, length((vUv - 0.5) * vec2(1.0, 0.8)));
            color *= 0.83 + vignette * 0.17;
            color += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
            gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
          }
        `;
      
        async function boot() {
          try {
            const THREE = await import('three');
            // A previous mount may finish importing after it has been destroyed.
            if (destroyed) return;
            renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'low-power' });
            renderer.debug.checkShaderErrors = true;
            renderer.debug.onShaderError = () => { shaderFailed = true; };
            renderer.setClearColor(0x17363c, 1);
            scene = new THREE.Scene();
            camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            uniforms = {
              uResolution: { value: new THREE.Vector2(1, 1) },
              uPointer: { value: new THREE.Vector2(0.5, 0.5) },
              uTime: { value: 0 },
              uDensity: { value: target.density },
              uWarp: { value: target.warp },
              uProbe: { value: 0 }
            };
            geometry = new THREE.PlaneGeometry(2, 2);
            material = new THREE.ShaderMaterial({
              uniforms, vertexShader, fragmentShader,
              depthTest: false, depthWrite: false, toneMapped: false
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.frustumCulled = false;
            scene.add(mesh);
            resizeGPU();
            renderer.compile(scene, camera);
            renderer.render(scene, camera);
            if (shaderFailed || renderer.getContext().isContextLost()) throw new Error('Shader initialization failed');
            gpu = true;
            fallback.hidden = true;
            canvas.hidden = false;
            controls.forEach((el) => { el.disabled = false; });
            syncMode();
            requestDraw();
          } catch (error) {
            if (!destroyed) fail();
          }
        }
        boot();
        return destroy;
      }
      
      const root = document.querySelector('.daily-stage');
      if (root) mountStrata(root);
      
---

# Day 051 — WebGLで作る、色が地形になるプロシージャルサーフェス

> **Reference study:** [FullCircle — custom gradient shader / Owls Department](https://www.cssdesignawards.com/sites/fullcircle/45528/) / CSS Design Awards  
> **主軸:** WebGL / **品質レビュー:** 87/100

カスタムグラデーションを連続生成される表面として扱い、コンテンツ操作へ統合する原理を参考にした。元サイトのアルゴリズムや入力設計は特定せず、独自の地層パレット、密度・うねりの編集、局所変形、アーチ状展示面へ再構築。商用サイト全体の体験ではなく、素材エディターへの限定的な再解釈である。

# 色を背景ではなく、操作できる地形にする

2026-11-22 — Day 051 / 365  
主軸技術：WebGL / Procedural Surface

## 参考にした表現

参考は、Owls Departmentによる **FullCircle — custom gradient shader**。Broadwickが共同制作としてクレジットされている、[CSS Design Awardsの掲載ページ](https://www.cssdesignawards.com/sites/fullcircle/45528/)です。提供された掲載情報では、2024年5月4日のSpecial Kudos、評価7.90/10、WebGLタグが示されています。

研究対象は、グラデーションを固定画像ではなく、生成され続ける表面として扱い、コンテンツ操作と共存させる考え方です。掲載情報から元サイトのノイズ関数や入力マッピング、性能、アクセシビリティ実装までは判断できません。本作のドメインワープ、地層表現、編集UIは独自の実装仮説です。

商用サイト全体のギャラリー体験を再現するのではなく、その原理を架空の素材エディターへ限定して再解釈しています。ブランド、コピー、画像、ロゴ、固有のグラデーション構図は使用していません。

## 完成形

**STRATA / Chromatic terrain** は、色の堆積を調整する架空のマテリアル・エディションです。

暗い青緑の地に明朝の見出しを置き、右側のアーチ状展示面に青緑・砂・銅の生成表面を配置。「層の密度」と「地形のうねり」が、細かな稜線と大きな流れを別々に変えます。色だけでなく、法線、反射、層境界まで変化する設計です。

- rangeをドラッグ、またはフォーカスして矢印キーで調整。
- マウスポインター付近では表面が局所的に押し広げられる。
- 「動きを停止」で自動運動とポインター変形を止め、形状編集は継続。
- 「初期の地形へ」は造形パラメータだけを戻し、停止設定を変更しない。
- モバイルでは説明、展示面、操作を縦に配置。独自のタッチドラッグでページスクロールを奪わない。

補助情報は原則12px以上、説明本文は14px、操作ラベルは13pxへ引き上げています。小さな文字で密度を作るのではなく、罫線、余白、字間で編集的な階層を保ちます。

## 実装設計

Three.js、正投影カメラ、一枚のPlaneGeometry、ShaderMaterialを使用します。文章はHTML、表面生成はWebGLに分離し、描画結果にかかわらず見出しや操作説明を読める構造にします。

通常時はuniformを指数減衰で追従させ、停止中とreduced-motion時は入力値を即時反映します。章や本文の切り替え、History APIは使用しません。

### 初期表示と失敗時

初期HTMLには独自SVGと「静的な代替図版を表示しています。形状調整にはJavaScriptとWebGLが必要です。」という説明を用意します。JavaScript不動作時にも、準備中のまま放置されたように見えません。「WebGLを準備中」はJavaScriptが開始した時点だけで設定します。

依存読み込み、シェーダーのコンパイル、初回描画が成功した後にCanvasへ切り替えます。非対応、読み込み失敗、シェーダーエラー、コンテキスト喪失ではSVGへ退避し、操作を無効化します。SVGは同じ美術方向の静的代替であり、GLSL結果の完全な再現ではありません。

### 再マウントとコンテキストの所有権

`mountStrata(root)`をES moduleから公開しています。同じルートへ再マウントするときは、まず旧インスタンスを破棄し、続いて旧Canvasを新しいCanvas要素へ交換します。新Rendererは必ず新Canvasから生成します。

旧インスタンスは、イベントを解除してからRendererの破棄とコンテキスト強制喪失を行います。遅延して届く旧コンテキストの喪失イベントは旧Canvasを対象とし、新Canvasに登録したリスナーへは届きません。非同期importが破棄後に完了しても、`destroyed`チェックでGPU生成を中断します。

SPAで撤去する際は、`mountStrata()`の戻り値を呼ぶか、ルートへ`daily:destroy`イベントを送ります。DOMから取り除くだけでは破棄通知にならないため、ホスト側のアンマウント処理へ組み込んでください。BFCacheへ入る場合は破棄せず一時停止し、復帰時に描画条件を再評価します。

`three`はビルド環境またはimport mapで解決してください。Three.js r170を想定したAPI構成で、実案件では採用バージョンを固定して確認します。外部画像やテクスチャは不要です。

## シェーダー/レンダリング

### 大きな地形と細かな層を分離する

補間付きvalue noiseを3オクターブ合成し、二つのノイズ場で座標を歪ませます。「地形のうねり」はこのドメインワープの強さを操作します。

歪んだ座標から連続的な流れを作り、多段パレットへ写像。層密度は別の周期成分に作用するため、大きな色面を残したまま稜線だけを増減できます。

### 色面を表面にする

流れと周期成分から仮想的な高さを作り、`dFdx` / `dFdy`で画面上の勾配を評価します。描画解像度で補正した疑似法線から拡散光と反射を計算し、等高線状の暗い筋と微小なディザを加えます。

層の線幅には`fwidth`を用いた補正を入れていますが、最大密度でのエイリアシングをあらゆる端末で防ぐ保証ではありません。実機で確認し、必要なら密度上限を下げます。

パレットは画面出力用に直接組み立てた色であり、物理ベースの色管理や実測素材の再現ではありません。RenderTargetやポストプロセスを使わない1パス構成です。

## 実務での使いどころ

- 素材・建材ブランドで、表面性状を説明するHero。
- 展示や音楽キャンペーンの、密度や流れを主題とするキービジュアル。
- 生成グラフィックの方向性を比較するブランド内ツール。

本作の数値は造形パラメータです。粗さ、硬度、製造条件などの物性値ではありません。商品に接続する場合は、入力と商品情報の関係を別途定義します。

## 調整パラメータ

| パラメータ | 初期値 | 役割 |
| --- | --- | --- |
| `CONFIG.maxDPR` | 1.5 | 描画倍率の上限 |
| `CONFIG.maxPixels` | 1,500,000 | 概算描画ピクセル予算 |
| `CONFIG.damping` | 8 | 操作値とポインターの追従速度 |
| `CONFIG.drift` | 0.09 | 自動的な地形移動の速度 |
| `CONFIG.density` | 7.2 | 層の初期密度 |
| `CONFIG.warp` | 0.48 | 初期の座標歪み |
| GLSLの`palette()` | 4色 | ブランドパレットの適用箇所 |
| GLSLの反射指数 | 30 | 光沢の鋭さ |

色だけでなく、展示面の縦横比、見出しの占有率、層の細かさを一緒に調整すると、媒体ごとの展開に一貫性を作れます。

## パフォーマンスとアクセシビリティ

- DPR上限とピクセル予算を併用し、大画面での解像度増加を制限。
- ResizeObserverの通知を次の描画へ集約。
- 画面外、非表示タブ、BFCache滞在中は継続RAFを停止。
- 停止中とreduced-motion時は入力・リサイズ時だけ描画。
- reduced-motionではポインター変形も無効化し、形状編集を残す。
- ラベルをrangeに関連付け、操作値はネイティブrangeと`aria-valuetext`で伝える。
- 数値表示の`output`には`aria-live="off"`を明示し、暗黙のライブリージョンによる重複通知を抑える。
- `.st-status`の`role="status"`は維持し、起動、停止、失敗などの状態説明に使用。range操作ごとには更新しない。
- CanvasとSVGは装飾扱いにし、操作の意味をHTMLで説明。
- `[hidden]`には`display: none !important`を指定し、GPUと代替図版の二重表示を防止。
- 破棄時はRAF、イベント、Observer、Geometry、Material、Renderer、コンテキストを解放。

`aria-live="off"`は、フォーカスしたrange自身の値通知まで止めるものではありません。視覚的な数値表示と操作対象からの通知を分離する指定であり、実際の読み上げ挙動は支援技術との組み合わせで確認します。

### 未検証事項と確認手順

この回答ではブラウザ、実機、支援技術、GPU性能の検証は行っていません。公開前に以下を確認してください。

1. 採用するThree.jsバージョンでChrome、Safari、Firefoxの初回描画とシェーダー診断を確認。
2. 同一ルートでマウントと破棄を繰り返し、Canvasの要素参照が毎回変わること、新インスタンスが描画を継続すること、コンテキスト数が増え続けないことを確認。
3. 旧Canvasへの遅延した`webglcontextlost`が新表示へ影響しないことを確認。依存読み込み中の破棄・再マウントも試す。
4. JavaScript無効時、依存読み込み失敗時、WebGL無効時、`WEBGL_lose_context`による喪失時の図版と状態説明を確認。
5. VoiceOverとSafari、NVDAとFirefoxまたはChromeで、rangeの値通知、outputからの重複通知の有無、状態説明の通知を確認。
6. iOS SafariとAndroid Chromeで縦横回転、タッチ操作、ページスクロール、200%文字拡大時の折り返しを確認。
7. 最大密度での減衰の体感、色面と陰影の階層、稜線のちらつきを確認。低性能端末ではGPU時間を計測し、ピクセル予算やノイズ段数を調整。
8. 画面外、非表示タブ、停止中のRAF停止、BFCache復帰、起動後のreduced-motion変更を確認。

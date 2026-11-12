---
title: "GLSLで作る、張力を保持するドラッグ・ディストーション"
description: "ドラッグの距離で張力を保持し、速度で局所的な伸びを生むGLSL素材探索UI。Three.js r170のシェーダー診断、初回描画の成功判定、静止画と操作表示の整合まで実装します。"
category: "GLSLマテリアルコントローラー"
categorySlug: "glsl-material-controller"
categoryDescription: "GLSLの連続的な画像変形を、素材の質感や状態を探索するドラッグ・キーボード操作UIとして設計するデザインスタディ。"
tags:
  - "GLSL"
  - "drag distortion"
  - "Three.js"
  - "CanvasTexture"
  - "マテリアルUI"
  - "アクセシビリティ"
  - "Daily Lab"
date: "2026年11月13日"
publishedAt: "2026-11-13"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 42
focus: "GLSL"
concept: "生成した環状マテリアルを、保持される張力と一過性の局所伸長で探索するGLSLインターフェース。ドラッグの距離・方向・速度を意味のある視覚変換へ分離し、初期化から静止画への退避まで表示と操作の状態を一致させる。"
referenceTitle: "See What Eye See: Simulator — Built Kindly."
referenceUrl: "https://www.cssdesignawards.com/sites/see-what-eye-see-simulator/50152/"
referencePlatform: "CSS Design Awards"
qualityScore: 85
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" data-state="static" aria-labelledby="tf-title">
        <header class="tf-top">
          <div class="tf-mark"><i aria-hidden="true"></i>FORM / 042</div>
          <div class="tf-edition">MATERIAL OBSERVATIONS<br>13 NOV 2026 — GLSL STUDY</div>
        </header>
        <div class="tf-main">
          <div class="tf-editorial">
            <p class="tf-eyebrow tf-mono">EXPERIMENT 042 / DRAG DISTORTION</p>
            <h1 id="tf-title">Tension,<br><em>held in<br>light.</em></h1>
            <p class="tf-intro">触れる距離が、かたちになる。<br>左右に引いて、光の層に張力を。<br>手を離すと、選んだ余韻だけが残る。</p>
            <dl class="tf-spec">
              <div><dt>OBJECT</dt><dd>生成された環状マテリアル</dd></div>
              <div><dt>VARIABLE</dt><dd>張力 / 0–100%</dd></div>
              <div><dt>BEHAVIOUR</dt><dd>保持 + 局所的な減衰</dd></div>
            </dl>
            <div class="tf-index" aria-hidden="true">042<small>/ 365 STUDIES</small></div>
          </div>
          <div class="tf-field" role="group" aria-labelledby="tf-field-title" aria-describedby="tf-field-description">
            <h2 id="tf-field-title" class="tf-sr">環状マテリアルの観察面</h2>
            <p id="tf-field-description" class="tf-sr">金属的な光の層が重なる環状の抽象造形。現在は変形のない静止画です。</p>
            <div class="tf-fallback" aria-hidden="true">
              <svg viewBox="0 0 1440 1120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" focusable="false">
                <defs>
                  <radialGradient id="tf-bg"><stop stop-color="#46544c"/><stop offset="1" stop-color="#151e1e"/></radialGradient>
                  <linearGradient id="tf-metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f1e7c9"/><stop offset=".28" stop-color="#818b72"/><stop offset=".52" stop-color="#d4ae7a"/><stop offset=".75" stop-color="#384b42"/><stop offset="1" stop-color="#ccc9a9"/></linearGradient>
                </defs>
                <rect width="1440" height="1120" fill="url(#tf-bg)"/>
                <g transform="translate(720 550) rotate(-24)" fill="none" stroke="url(#tf-metal)">
                  <ellipse rx="452" ry="365" stroke-width="28"/><ellipse rx="419" ry="336" stroke-width="25"/><ellipse rx="388" ry="308" stroke-width="24"/><ellipse rx="358" ry="282" stroke-width="23"/><ellipse rx="329" ry="257" stroke-width="22"/><ellipse rx="302" ry="234" stroke-width="21"/><ellipse rx="276" ry="212" stroke-width="20"/><ellipse rx="251" ry="191" stroke-width="19"/><ellipse rx="227" ry="171" stroke-width="18"/><ellipse rx="204" ry="152" stroke-width="17"/><ellipse rx="182" ry="134" stroke-width="16"/>
                </g>
              </svg>
            </div>
            <div class="tf-field-top tf-mono" aria-hidden="true"><span><i class="tf-live-dot"></i>STRAIN FIELD / 01</span><span data-mode-badge>STATIC / ORIGINAL</span></div>
            <span class="tf-cross" aria-hidden="true"></span>
            <div class="tf-readout" aria-hidden="true" hidden><span>APPLIED TENSION</span><div class="tf-value"><b data-value>28</b><small>%</small></div></div>
            <div class="tf-field-note tf-mono" aria-hidden="true" hidden>← DRAG TO EXPLORE →<br>RELEASE TO HOLD</div>
            <div class="tf-static-note" aria-hidden="true"><span>ORIGINAL MATERIAL</span><strong data-static-label>変形なし / 静止画</strong></div>
          </div>
        </div>
        <div class="tf-controls">
          <div class="tf-control-title"><label for="tf-tension">張力を調整</label><p id="tf-help">静止画表示中は操作できません。</p></div>
          <div class="tf-range-wrap">
            <input id="tf-tension" class="tf-range" type="range" min="0" max="100" step="1" value="28" aria-describedby="tf-help tf-status" disabled>
            <div class="tf-ticks" aria-hidden="true"><span>00 / RELAXED</span><span>50</span><span>100 / STRETCHED</span></div>
          </div>
          <button class="tf-reset" type="button" disabled>RESET ↗</button>
        </div>
        <footer class="tf-bottom">
          <p id="tf-status" class="tf-status" role="status" aria-atomic="true">静止画プレビュー。インタラクションにはJavaScriptとWebGLが必要です。</p>
          <span class="tf-mono">ONE OBJECT. MANY STATES.</span>
        </footer>
      </section>
  - name: styles.css
    language: css
    content: |
      .daily-stage{--paper:#edeae2;--ink:#242823;--muted:#62665e;--accent:#ad3e24;--amount:28%;box-sizing:border-box;background:var(--paper);color:var(--ink);font-family:Arial,'Noto Sans JP',sans-serif;padding:26px clamp(18px,4vw,64px) 24px;max-width:1600px;margin:auto}.daily-stage *{box-sizing:border-box}.daily-stage [hidden]{display:none!important}.daily-stage button,.daily-stage input{font:inherit}.tf-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}.tf-top{display:flex;align-items:center;justify-content:space-between;padding-bottom:20px;border-bottom:1px solid #24282335;gap:20px}.tf-mark{font-size:15px;font-weight:800;letter-spacing:.12em}.tf-mark i{display:inline-block;width:9px;height:9px;background:var(--accent);margin-right:10px}.tf-edition,.tf-mono{font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:11px;letter-spacing:.08em;line-height:1.6}.tf-edition{text-align:right;color:var(--muted)}.tf-main{display:grid;grid-template-columns:minmax(240px,.72fr) minmax(0,1.65fr);gap:clamp(24px,4vw,64px);padding:30px 0}.tf-editorial{display:flex;flex-direction:column;align-items:flex-start;padding:9px 0}.tf-eyebrow{color:var(--accent);margin:0 0 30px}.tf-editorial h1{font-size:clamp(46px,5.3vw,79px);font-weight:500;line-height:.97;letter-spacing:-.065em;margin:0 0 28px}.tf-editorial h1 em{font-family:Georgia,serif;font-weight:400;letter-spacing:-.07em}.tf-intro{font-size:13px;line-height:2.1;max-width:28em;margin:0;color:#54594f}.tf-spec{margin:36px 0 0;padding-top:18px;border-top:1px solid #24282335;width:100%;max-width:290px}.tf-spec div{display:flex;justify-content:space-between;gap:12px;font-size:11px;line-height:2.3}.tf-spec dt{color:var(--muted)}.tf-spec dd{margin:0;text-align:right}.tf-index{margin-top:auto;padding-top:36px;font-family:Georgia,serif;font-style:italic;font-size:48px;letter-spacing:-.07em;color:#72766a}.tf-index small{font-family:ui-monospace,monospace;font-style:normal;font-size:11px;letter-spacing:.05em;vertical-align:middle;margin-left:12px}.tf-field{position:relative;isolation:isolate;min-width:0;min-height:430px;aspect-ratio:1.23;background:#171e1e;overflow:hidden;color:#f0eee4;touch-action:pan-y;user-select:none;cursor:default}.tf-field.is-ready{cursor:grab}.tf-field.is-dragging{cursor:grabbing}.tf-fallback,.tf-gpu{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.tf-fallback>svg,.tf-fallback>canvas{display:block;width:100%;height:100%;object-fit:cover}.tf-gpu{display:none}.is-ready .tf-gpu{display:block}.is-ready .tf-fallback{visibility:hidden}.tf-field:after{content:'';position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,#0d191c85,transparent 23%,transparent 68%,#0d191ca6)}.tf-field-top{position:absolute;z-index:2;top:23px;left:24px;right:24px;display:flex;justify-content:space-between;gap:12px;color:#e1e5da;pointer-events:none}.tf-live-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#a8b0a1;vertical-align:middle;margin-right:7px}.is-ready .tf-live-dot{background:#e29166}.tf-readout{position:absolute;bottom:24px;left:24px;z-index:2;pointer-events:none}.tf-readout>span{display:block;font-size:11px;letter-spacing:.11em;color:#d8decf}.tf-value{font-family:ui-monospace,monospace;font-size:51px;line-height:1.15;font-weight:400;letter-spacing:-.09em}.tf-value small{font-size:14px;margin-left:7px;letter-spacing:0}.tf-field-note{position:absolute;bottom:29px;right:24px;z-index:2;text-align:right;line-height:1.8;color:#e1e5da;font-size:11px;letter-spacing:.04em;pointer-events:none}.tf-static-note{position:absolute;z-index:2;bottom:24px;left:24px;right:24px;pointer-events:none}.tf-static-note span{display:block;color:#d8decf;font-size:11px;margin-bottom:7px;letter-spacing:.1em}.tf-static-note strong{font-size:15px;font-weight:400;letter-spacing:.04em}.tf-cross{position:absolute;top:50%;right:24px;width:11px;height:11px;opacity:.55;z-index:2;pointer-events:none}.tf-cross:before,.tf-cross:after{content:'';position:absolute;background:#dde1d1}.tf-cross:before{width:11px;height:1px;top:5px}.tf-cross:after{width:1px;height:11px;left:5px}.tf-controls{display:grid;grid-template-columns:195px minmax(0,1fr) 100px;align-items:center;gap:30px;padding:23px 0;border-top:1px solid #24282335;border-bottom:1px solid #24282335}.tf-control-title label{display:block;font-size:14px;margin-bottom:7px}.tf-control-title p{margin:0;color:var(--muted);font-size:12px;line-height:1.6}.tf-range-wrap{min-width:0}.tf-range{display:block;width:100%;height:44px;margin:0;appearance:none;-webkit-appearance:none;background:transparent;cursor:ew-resize}.tf-range::-webkit-slider-runnable-track{height:2px;background:linear-gradient(to right,var(--accent) 0 var(--amount),#b7b9af var(--amount) 100%)}.tf-range::-moz-range-track{height:2px;background:#b7b9af}.tf-range::-moz-range-progress{height:2px;background:var(--accent)}.tf-range::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--accent);border:4px solid var(--paper);box-shadow:0 0 0 1px var(--accent);margin-top:-8px}.tf-range::-moz-range-thumb{width:10px;height:10px;border-radius:50%;background:var(--accent);border:4px solid var(--paper);box-shadow:0 0 0 1px var(--accent)}.tf-range:focus-visible{outline:2px solid var(--accent);outline-offset:5px}.tf-range:disabled{cursor:not-allowed;opacity:.4}.tf-ticks{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);font-family:ui-monospace,monospace;gap:8px}.tf-reset{min-height:44px;padding:9px 12px;border:1px solid #787e6e;background:transparent;color:var(--ink);font-size:12px;letter-spacing:.04em;cursor:pointer}.tf-reset:hover:not(:disabled){background:var(--ink);color:var(--paper)}.tf-reset:focus-visible{outline:2px solid var(--accent);outline-offset:4px}.tf-reset:disabled{opacity:.4;cursor:not-allowed}.tf-bottom{display:flex;justify-content:space-between;gap:20px;margin-top:18px;align-items:flex-start}.tf-status{margin:0;font-size:12px;line-height:1.8;color:var(--muted)}.tf-bottom>.tf-mono{white-space:nowrap;color:var(--muted)}@media(min-width:1200px){.tf-field{max-height:660px}}@media(max-width:760px){.daily-stage{padding:18px 18px 22px}.tf-top{padding-bottom:15px}.tf-edition{font-size:11px;letter-spacing:0}.tf-main{grid-template-columns:1fr;gap:22px;padding:24px 0}.tf-editorial{display:grid;grid-template-columns:1fr 1fr;column-gap:20px;padding:0}.tf-eyebrow{grid-column:1/-1;margin-bottom:16px}.tf-editorial h1{font-size:49px;margin:0}.tf-intro{align-self:center;font-size:12px;line-height:1.9}.tf-spec,.tf-index{display:none}.tf-field{aspect-ratio:1.08;min-height:350px}.tf-field-top{top:18px;left:18px;right:18px;font-size:11px;letter-spacing:0;flex-wrap:wrap}.tf-readout{left:18px;bottom:18px}.tf-value{font-size:43px}.tf-field-note{right:18px;bottom:22px;font-size:11px;letter-spacing:0}.tf-static-note{left:18px;right:18px;bottom:20px}.tf-controls{grid-template-columns:1fr auto;gap:14px 22px;padding:18px 0}.tf-control-title{grid-column:1}.tf-range-wrap{grid-column:1/-1;grid-row:2}.tf-reset{grid-column:2;grid-row:1;min-width:88px}.tf-bottom{gap:12px;flex-wrap:wrap}}@media(max-width:400px){.tf-editorial{grid-template-columns:1fr}.tf-editorial h1{margin-bottom:18px}.tf-field{min-height:350px}.tf-top{align-items:flex-start}.tf-mark{font-size:13px}.tf-readout>span{max-width:100px;line-height:1.5}.tf-field-note{max-width:155px}.tf-ticks{font-size:11px;letter-spacing:-.03em}}@media(prefers-reduced-motion:reduce){.daily-stage *{scroll-behavior:auto}}
  - name: experiment.js
    language: javascript
    content: |
      // ES module. Dependency must be pinned to three@0.170.0 (r170).
      const root = document.querySelector('.daily-stage');
      if (!root) throw new Error('daily-stage is required');
      const field = root.querySelector('.tf-field');
      const fallback = root.querySelector('.tf-fallback');
      const range = root.querySelector('.tf-range');
      const reset = root.querySelector('.tf-reset');
      const value = root.querySelector('[data-value]');
      const status = root.querySelector('.tf-status');
      const help = root.querySelector('#tf-help');
      const description = root.querySelector('#tf-field-description');
      const readout = root.querySelector('.tf-readout');
      const gestureNote = root.querySelector('.tf-field-note');
      const staticNote = root.querySelector('.tf-static-note');
      const staticLabel = root.querySelector('[data-static-label]');
      const badge = root.querySelector('[data-mode-badge]');
      
      // Production tuning: distance, response, resolution, distortion.
      const CONFIG = Object.freeze({ initial: 0.28, dragSpan: 0.8, follow: 12, velocityDecay: 14, dprCap: 1.65, maxPixels: 2400000, warp: 1, local: 0.055, radius: 0.24 });
      const aborter = new AbortController();
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      let reduced = media.matches;
      let mode = 'static', dead = false, suspended = false, inView = true;
      let renderer, scene, camera, geometry, material, texture, artwork;
      let sizeObserver, visibilityObserver;
      let raf = 0, lastTime = 0, drag = null;
      let rendering = false, pendingFailure = null;
      let target = CONFIG.initial, kick = 0;
      let measuredWidth = 0, measuredHeight = 0;
      const pointer = { x: 0.5, y: 0.5 };
      const view = { amount: target, velocity: 0, x: 0.5, y: 0.5 };
      const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
      const listen = (node, type, handler, options = {}) => node.addEventListener(type, handler, { ...options, signal: aborter.signal });
      
      function setMode(next, message = '') {
        mode = next;
        const interactive = next === 'ready';
        root.dataset.state = next;
        field.classList.toggle('is-ready', interactive);
        if (!interactive) field.classList.remove('is-dragging');
        readout.hidden = gestureNote.hidden = !interactive;
        staticNote.hidden = interactive;
        range.disabled = reset.disabled = !interactive;
        badge.textContent = { loading: 'GPU / PREPARING', ready: 'LIVE / MATERIAL', static: 'STATIC / ORIGINAL', ended: 'SESSION / ENDED' }[next];
        staticLabel.textContent = next === 'loading' ? '変形なし / GPU準備中' : next === 'ended' ? '変形なし / 操作終了' : '変形なし / 静止画';
        help.textContent = interactive ? '左右ドラッグ / 矢印キーで微調整' : next === 'loading' ? 'GPUの準備中は操作できません。' : next === 'ended' ? '操作は終了しました。' : '静止画表示中は操作できません。';
        description.textContent = interactive
          ? '金属的な光の層が重なる環状の抽象造形。左右ドラッグで張力を変更し、手を離すと保持します。下の張力スライダーでも同じ操作ができます。物理的な測定値ではありません。'
          : '金属的な光の層が重なる環状の抽象造形。現在は変形のない静止画で、張力は適用されていません。';
        status.textContent = message || (interactive
          ? reduced ? '低モーション：追従・速度演出を停止。張力は操作時に即時反映します。' : '左右にドラッグして張力を保持。下のスライダーはキーボードでも操作できます。'
          : next === 'loading' ? '静止画プレビュー / GPUを初期化しています。' : next === 'ended' ? '静止画表示：インタラクションは終了しました。' : '変形のないオリジナル静止画を表示しています。');
      }
      
      function makeArtwork() {
        const canvas = document.createElement('canvas');
        canvas.width = 1440;
        canvas.height = 1120;
        const c = canvas.getContext('2d');
        if (!c) throw new Error('Canvas 2D unavailable');
        const w = canvas.width, h = canvas.height;
        const bg = c.createRadialGradient(w * 0.48, h * 0.4, 20, w * 0.52, h * 0.5, w * 0.65);
        bg.addColorStop(0, '#425047');
        bg.addColorStop(0.5, '#242f2b');
        bg.addColorStop(1, '#111b1d');
        c.fillStyle = bg;
        c.fillRect(0, 0, w, h);
        c.strokeStyle = 'rgba(219,228,206,0.045)';
        c.lineWidth = 1;
        for (let x = 40; x < w; x += 80) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); }
        for (let y = 0; y < h; y += 80) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
        c.save();
        c.translate(w * 0.51, h * 0.49);
        c.rotate(-0.31);
        const layers = 76;
        for (let i = 0; i < layers; i++) {
          const t = i / (layers - 1);
          const rx = 495 - t * 335, ry = 382 - t * 269;
          const cx = 52 * Math.sin(t * 2.5), cy = 20 * t;
          c.beginPath();
          for (let j = 0; j <= 220; j++) {
            const a = j / 220 * Math.PI * 2;
            const r = 1 + 0.055 * Math.cos(a * 3 + t * 2.7) + 0.025 * Math.sin(a * 5 - t * 3);
            const x = cx + Math.cos(a) * rx * r;
            const y = cy + Math.sin(a) * ry * r;
            if (j === 0) c.moveTo(x, y); else c.lineTo(x, y);
          }
          c.closePath();
          const band = 0.5 + 0.5 * Math.cos(t * Math.PI * 11);
          const sheen = c.createLinearGradient(-400, -360, 330, 340);
          sheen.addColorStop(0, `hsl(43, 27%, ${69 + band * 16}%)`);
          sheen.addColorStop(0.24, `hsl(56, 12%, ${34 + band * 20}%)`);
          sheen.addColorStop(0.43, `hsl(38, 33%, ${57 + band * 20}%)`);
          sheen.addColorStop(0.56, `hsl(146, 11%, ${16 + band * 13}%)`);
          sheen.addColorStop(0.78, `hsl(50, 20%, ${49 + band * 22}%)`);
          sheen.addColorStop(1, '#344a43');
          c.fillStyle = i === layers - 1 ? '#182522' : sheen;
          c.fill();
          c.strokeStyle = i % 3 === 0 ? 'rgba(249,239,198,0.4)' : 'rgba(16,29,27,0.38)';
          c.lineWidth = 0.85;
          c.stroke();
        }
        c.restore();
        let seed = 42;
        const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
        c.fillStyle = 'rgba(234,229,206,0.045)';
        for (let i = 0; i < 24000; i++) c.fillRect(random() * w, random() * h, 1, 1);
        canvas.setAttribute('aria-hidden', 'true');
        return canvas;
      }
      
      function setTarget(next) {
        const integer = Math.round(clamp(next, 0, 1) * 100);
        target = integer / 100;
        range.value = String(integer);
        range.setAttribute('aria-valuetext', `${integer}%の張力`);
        value.textContent = String(integer).padStart(2, '0');
        root.style.setProperty('--amount', `${integer}%`);
        schedule();
      }
      function cancelFrame() {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        lastTime = 0;
      }
      function schedule() {
        if (dead || mode !== 'ready' || suspended || !inView || document.hidden || raf) return;
        raf = requestAnimationFrame(draw);
      }
      
      // No GPU disposal from shader diagnostics or from inside renderer.render().
      // This wrapper is the single render entry point, including the initial frame.
      function renderChecked() {
        const activeRenderer = renderer;
        if (!activeRenderer || dead) return false;
        rendering = true;
        try {
          activeRenderer.render(scene, camera);
          if (activeRenderer.getContext().isContextLost() && !pendingFailure) {
            pendingFailure = { message: 'GPU接続が失われたため、変形のない静止画を表示しています。' };
          }
        } catch (error) {
          pendingFailure ||= { message: '描画を継続できないため、変形のない静止画を表示しています。', error };
        } finally {
          rendering = false;
        }
        // render() has now returned, including its internal error-reporting path.
        if (pendingFailure) {
          const failure = pendingFailure;
          pendingFailure = null;
          console.error('[Tension Field] GPU rendering stopped.', failure);
          fail(failure.message);
          return false;
        }
        return true;
      }
      function draw(now) {
        raf = 0;
        if (dead || mode !== 'ready' || suspended || !inView || document.hidden) return;
        const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60;
        lastTime = now;
        if (reduced) {
          view.amount = target;
          view.velocity = kick = 0;
          view.x = pointer.x;
          view.y = pointer.y;
        } else {
          view.amount += (target - view.amount) * (1 - Math.exp(-CONFIG.follow * dt));
          view.velocity += (kick - view.velocity) * (1 - Math.exp(-18 * dt));
          view.x += (pointer.x - view.x) * (1 - Math.exp(-16 * dt));
          view.y += (pointer.y - view.y) * (1 - Math.exp(-16 * dt));
          kick *= Math.exp(-CONFIG.velocityDecay * dt);
        }
        const moving = !reduced && (Math.abs(view.amount - target) > 0.0002 || Math.abs(view.velocity) > 0.0002 || Math.abs(kick) > 0.0002 || Math.abs(pointer.x - view.x) + Math.abs(pointer.y - view.y) > 0.0002);
        if (!moving) {
          view.amount = target;
          view.velocity = kick = 0;
          view.x = pointer.x;
          view.y = pointer.y;
        }
        material.uniforms.uAmount.value = view.amount;
        material.uniforms.uVelocity.value = view.velocity;
        material.uniforms.uPointer.value.set(view.x, view.y);
        if (!renderChecked()) return;
        if (moving) schedule(); else lastTime = 0;
      }
      function resizeGPU() {
        const rect = field.getBoundingClientRect();
        const w = Math.max(1, Math.round(rect.width));
        const h = Math.max(1, Math.round(rect.height));
        if (w !== measuredWidth || h !== measuredHeight) finishDrag();
        measuredWidth = w;
        measuredHeight = h;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CONFIG.dprCap, Math.sqrt(CONFIG.maxPixels / (w * h))));
        renderer.setSize(w, h, false);
        material.uniforms.uAspect.value = w / h;
      }
      function resize() {
        if (dead || mode !== 'ready' || !renderer) return;
        try { resizeGPU(); schedule(); }
        catch (error) {
          console.error('[Tension Field] Resize failed.', error);
          fail('描画サイズを更新できないため、変形のない静止画を表示しています。');
        }
      }
      function finishDrag() {
        const previous = drag;
        drag = null;
        if (previous) {
          try { if (field.hasPointerCapture(previous.id)) field.releasePointerCapture(previous.id); } catch {}
        }
        kick = 0;
        field.classList.remove('is-dragging');
        schedule();
      }
      function position(event) {
        const r = field.getBoundingClientRect();
        pointer.x = clamp((event.clientX - r.left) / Math.max(1, r.width), 0, 1);
        pointer.y = clamp(1 - (event.clientY - r.top) / Math.max(1, r.height), 0, 1);
      }
      listen(field, 'pointerdown', event => {
        if (dead || mode !== 'ready' || !event.isPrimary || event.button !== 0) return;
        finishDrag();
        drag = { id: event.pointerId, x: event.clientX, y: event.clientY, previousX: event.clientX, previousTime: event.timeStamp, initial: target, width: Math.max(1, field.getBoundingClientRect().width), locked: false };
        position(event);
        try { field.setPointerCapture(event.pointerId); } catch {}
      });
      listen(field, 'pointermove', event => {
        if (!drag || event.pointerId !== drag.id || mode !== 'ready') return;
        const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
        if (!drag.locked) {
          if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { finishDrag(); return; }
          if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy) * 1.15) return;
          drag.locked = true;
          field.classList.add('is-dragging');
        }
        const seconds = Math.max(0.008, (event.timeStamp - drag.previousTime) / 1000);
        kick = reduced ? 0 : clamp((event.clientX - drag.previousX) / (drag.width * seconds), -2, 2);
        drag.previousX = event.clientX;
        drag.previousTime = event.timeStamp;
        position(event);
        setTarget(drag.initial + dx / (drag.width * CONFIG.dragSpan));
      });
      for (const type of ['pointerup', 'pointercancel']) {
        listen(window, type, event => { if (drag && event.pointerId === drag.id) finishDrag(); });
      }
      listen(field, 'lostpointercapture', event => { if (drag && event.pointerId === drag.id) finishDrag(); });
      listen(window, 'blur', finishDrag);
      listen(range, 'input', () => {
        if (mode !== 'ready') return;
        finishDrag();
        setTarget(Number(range.value) / 100);
      });
      listen(reset, 'click', () => {
        if (mode !== 'ready') return;
        finishDrag();
        pointer.x = pointer.y = 0.5;
        setTarget(CONFIG.initial);
      });
      listen(media, 'change', event => {
        reduced = event.matches;
        kick = 0;
        if (mode === 'ready') { setMode('ready'); schedule(); }
      });
      listen(window, 'resize', resize, { passive: true });
      listen(document, 'visibilitychange', () => {
        if (document.hidden) { finishDrag(); cancelFrame(); }
        else { resize(); schedule(); }
      });
      listen(window, 'pagehide', event => {
        if (event.persisted) { suspended = true; finishDrag(); cancelFrame(); }
        else destroy();
      });
      listen(window, 'pageshow', () => { suspended = false; resize(); schedule(); });
      listen(root, 'daily:destroy', destroy);
      
      function disconnectObservers() {
        sizeObserver?.disconnect();
        visibilityObserver?.disconnect();
        sizeObserver = visibilityObserver = null;
      }
      function releaseGPU() {
        cancelFrame();
        disconnectObservers();
        const oldRenderer = renderer;
        renderer = null;
        // Clearing ownership first makes deliberate context-loss events harmless.
        if (oldRenderer) oldRenderer.debug.onShaderError = null;
        scene?.clear();
        geometry?.dispose();
        material?.dispose();
        texture?.dispose();
        if (oldRenderer) {
          oldRenderer.dispose();
          oldRenderer.forceContextLoss();
          oldRenderer.domElement.remove();
        }
        scene = camera = geometry = material = texture = null;
        pendingFailure = null;
      }
      function fail(message) {
        if (dead) return;
        // Also protects future call sites from disposing during render().
        if (rendering) { pendingFailure ||= { message }; return; }
        setMode('static', message);
        finishDrag();
        releaseGPU();
      }
      export function destroy() {
        if (dead) return;
        dead = true;
        setMode('ended');
        finishDrag();
        aborter.abort();
        releaseGPU();
        artwork = null;
        // The DOM-owned generated canvas remains as the intentional static image.
      }
      
      async function init() {
        setMode('loading');
        try {
          artwork = makeArtwork();
          fallback.replaceChildren(artwork);
          const THREE = await import('three');
          if (dead) return;
          if (THREE.REVISION !== '170') throw new Error(`Expected three@0.170.0, received r${THREE.REVISION}`);
          renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' });
          const ownedRenderer = renderer;
          renderer.debug.checkShaderErrors = true;
          renderer.debug.onShaderError = (gl, program, vertexShader, fragmentShader) => {
            // r170 supplies real WebGL objects here. Record only; do not dispose/throw.
            pendingFailure ||= { message: 'シェーダーを初期化できないため、変形のない静止画を表示しています。' };
            try {
              pendingFailure.diagnostics = {
                program: gl.getProgramInfoLog(program),
                vertex: gl.getShaderInfoLog(vertexShader),
                fragment: gl.getShaderInfoLog(fragmentShader)
              };
            } catch (error) { pendingFailure.diagnosticError = String(error); }
          };
          renderer.outputColorSpace = THREE.SRGBColorSpace;
          renderer.setClearColor(0x17201d, 1);
          renderer.domElement.className = 'tf-gpu';
          renderer.domElement.setAttribute('aria-hidden', 'true');
          field.insertBefore(renderer.domElement, field.firstChild);
          listen(renderer.domElement, 'webglcontextlost', event => {
            event.preventDefault();
            if (dead || renderer !== ownedRenderer) return;
            const message = 'GPU接続が失われたため、変形のない静止画を表示しています。再読み込みで再試行できます。';
            if (rendering) pendingFailure ||= { message };
            else fail(message);
          });
          texture = new THREE.CanvasTexture(artwork);
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
          scene = new THREE.Scene();
          camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
          camera.position.z = 1;
          geometry = new THREE.PlaneGeometry(2, 2);
          material = new THREE.ShaderMaterial({
            depthTest: false,
            depthWrite: false,
            uniforms: {
              uMap: { value: texture },
              uAspect: { value: 1 },
              uImageAspect: { value: artwork.width / artwork.height },
              uAmount: { value: target },
              uVelocity: { value: 0 },
              uPointer: { value: new THREE.Vector2(0.5, 0.5) },
              uWarp: { value: CONFIG.warp },
              uLocal: { value: CONFIG.local },
              uRadius: { value: CONFIG.radius }
            },
            vertexShader: `
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              precision highp float;
              varying vec2 vUv;
              uniform sampler2D uMap;
              uniform float uAspect, uImageAspect, uAmount, uVelocity;
              uniform float uWarp, uLocal, uRadius;
              uniform vec2 uPointer;
              void main() {
                vec2 cover = vec2(1.0);
                if (uAspect > uImageAspect) cover.y = uImageAspect / uAspect;
                else cover.x = uAspect / uImageAspect;
                vec2 uv = (vUv - 0.5) * cover + 0.5;
                vec2 centered = uv - vec2(0.51, 0.51);
                float envelope = exp(-dot(centered, centered) * 9.0);
                float amount = uAmount * uWarp;
                float angle = amount * 0.36 * envelope;
                float cs = cos(angle), sn = sin(angle);
                vec2 q = mat2(cs, -sn, sn, cs) * centered;
                q *= vec2(1.0 - 0.15 * amount * envelope, 1.0 + 0.10 * amount * envelope);
                uv = q + vec2(0.51, 0.51);
                uv.x += sin(uv.y * 14.0 + uv.x * 5.0) * 0.034 * amount * envelope;
                uv.y += sin(uv.x * 12.0 - uv.y * 3.0) * 0.014 * amount * envelope;
                vec2 distanceToPointer = (vUv - uPointer) * vec2(uAspect, 1.0);
                float radius = max(uRadius, 0.001);
                float localFalloff = exp(-dot(distanceToPointer, distanceToPointer) / (radius * radius));
                // Backward sampling makes visible material follow the drag direction.
                float pull = uVelocity * uLocal * localFalloff * (0.45 + 0.55 * uAmount);
                uv.x -= pull * cover.x;
                uv.y += pull * distanceToPointer.y * 0.65;
                uv = clamp(uv, vec2(0.002), vec2(0.998));
                gl_FragColor = vec4(texture2D(uMap, uv).rgb, 1.0);
                #include <tonemapping_fragment>
                #include <colorspace_fragment>
              }
            `
          });
          scene.add(new THREE.Mesh(geometry, material));
          resizeGPU();
          // First render compiles/links the material while the original stays visible.
          // Only success unlocks interaction. There is no material.program access.
          if (!renderChecked()) return;
          setMode('ready');
          if ('ResizeObserver' in window) {
            sizeObserver = new ResizeObserver(resize);
            sizeObserver.observe(field);
          }
          if ('IntersectionObserver' in window) {
            visibilityObserver = new IntersectionObserver(entries => {
              if (dead || mode !== 'ready') return;
              inView = entries[0].isIntersecting;
              if (inView) schedule();
              else { finishDrag(); cancelFrame(); }
            });
            visibilityObserver.observe(field);
          }
          setTarget(target);
        } catch (error) {
          if (!dead) {
            console.error('[Tension Field] Initialization failed.', error);
            fail('GPUを初期化できないため、変形のないオリジナル静止画を表示しています。');
          }
        }
      }
      setTarget(CONFIG.initial);
      init();
---

# Day 042 — GLSLで作る、張力を保持するドラッグ・ディストーション

> **Reference study:** [See What Eye See: Simulator — Built Kindly.](https://www.cssdesignawards.com/sites/see-what-eye-see-simulator/50152/) / CSS Design Awards  
> **主軸:** GLSL / **品質レビュー:** 85/100

提供されたCSS Design Awards掲載情報から、ドラッグの進行量と視覚変換を結び付ける原則を参照。詳細アルゴリズムや実装コードは未確認です。医療体験・ブランド・固有素材は再現せず、独自生成した環状素材、保持される張力、速度による局所伸長へ再構成しました。

# Day 042 / 365 — TENSION FIELD

公開日：2026-11-13  
主軸技術：GLSL / Drag Distortion

## 参考にした表現

参考元は **See What Eye See: Simulator — Built Kindly.**。掲載プラットフォームは [CSS Design Awards](https://www.cssdesignawards.com/sites/see-what-eye-see-simulator/50152/) です。

提供された掲載情報から研究対象にしたのは、**ジェスチャーの進行量が視覚変換の意味を担う**という設計です。掲載情報はドラッグとWebGLの使用を示していますが、具体的なGLSLや変形アルゴリズムは確認できません。本作の局所UV変位は独自の実装仮説です。

ブランド、文章、医療的なシミュレーション、固有素材は使用しません。Canvasで生成する環状マテリアルを、ひとつの連続量「張力」で探索するインターフェースへ再構成しています。

## 完成形

クリーム色の編集面と、深い墨色の観察面を対置。セリフ体の見出し、等幅の計測表示、赤褐色の操作アクセントで、素材研究の紙面を構成します。

- 右へドラッグすると張力が増え、左へドラッグすると減ります。
- 距離で決めた張力は、手を離した後も保持されます。
- 移動方向と速度は、ポインター付近の一過性の伸びに割り当てます。
- リリース後は局所的な伸びだけが減衰します。
- 同じ値をネイティブrangeからキーボードでも操作できます。

作品や章を切り替えるスライダーではなく、ひとつの素材状態を連続的に探索するUIです。境界で本文が切り替わる処理やHistory APIはありません。

前版の紙面と生成素材は維持し、初期化・シェーダー検査・静止画表示の整合を修正しました。補助文字も原則11px以上とし、主操作の説明は12px以上を確保しています。

## 実装設計

### 実行環境

依存するThree.jsは **npm `three@0.170.0` / r170** に固定します。Viteなど、`import('three')`を解決する環境でJavaScriptをES moduleとして読み込んでください。依存指定にはキャレットを付けず、ロックファイルも管理します。コードでも`THREE.REVISION`を確認し、異なる版では静止画へ移行します。

HTML・CSSは初期表示から成立します。JavaScriptが無効な場合も独自SVGが残り、無効なドラッグ指示や適用張力を表示しません。JavaScript起動後は、Canvasで生成した詳細な素材へ置き換えます。

### 状態と入力

状態は「操作の目標値」「GPUへ渡す表示値」「一過性の速度」に分離。表示の追従が操作値を書き換えることはありません。

UI状態は`setMode()`に集約しています。

| 状態 | 観察面 | 操作 |
| --- | --- | --- |
| loading | 無変形のプレビュー、準備中表示 | 無効 |
| ready | 初回描画を確認したGPU画像、張力、ドラッグ案内 | 有効 |
| static | 無変形の静止画、停止理由 | 無効 |
| ended | 無変形の静止画、終了表示 | 無効 |

静止画では数値とドラッグ案内を`hidden`にし、代わりに「変形なし」を表示します。CSSで`[hidden]`の非表示を保証しています。失敗前の張力が、無変形の画像へ適用されているようには見せません。

横方向の閾値を超えた場合だけドラッグを確定し、`touch-action: pan-y`で縦スクロールを残します。`pointercancel`、キャプチャ喪失、ウィンドウの非アクティブ化、タブ非表示でドラッグを終了します。入力中のresizeでもドラッグを終了し、古い幅での計算を継続しません。

観察面は`role="group"`とし、見出し・説明を`aria-labelledby`と`aria-describedby`で関連付けています。操作の代替は、独立したラベルを持つネイティブrangeです。

## シェーダー/レンダリング

元画像は、76層の輪郭と固定シードの粒子から生成するCanvasTextureです。外部画像やモデルは読み込みません。

cover座標を作ってから、次の二段階でUVを変形します。

1. **持続する変形**：張力に比例する中心回りの捻り、異方的な伸縮、弱い波状偏位。
2. **一過性の変形**：ポインターからの距離で減衰する、符号付き速度による局所伸長。

局所効果の距離場は画面のアスペクト比で補正します。逆向きにUVをサンプリングすることで、画像の見かけの移動をジェスチャー方向へ合わせます。テクスチャ参照はフラグメントごとに1回です。

### シェーダー検査と初回描画

前版の`material.program`参照と、それを渡す`getProgramParameter()`呼び出しは削除しました。Three.js内部の非公開プロパティは使いません。

r170の`renderer.debug.checkShaderErrors`を有効にし、`renderer.debug.onShaderError`で、コールバックへ渡される有効なプログラム・シェーダーの診断ログを取得します。コールバック内では**失敗の記録だけ**を行い、throwやGPU破棄を行いません。

初回も更新時も`renderChecked()`を通します。`renderer.render()`から戻った後に、例外・シェーダー失敗・コンテキスト喪失を判定し、失敗時には静止画へ移行してGPUを解放します。成功した初回描画の後だけ、`is-ready`の付与とrange・resetの有効化を行います。

この検査はプログラムのコンパイル／リンク失敗を扱うもので、見た目の正しさや性能を保証するテストではありません。

## 実務での使いどころ

- 素材の柔らかさや張りを印象として伝えるブランドHero
- 音・香り・光などの連続量を探索するキャンペーン
- プロダクトの質感に触れる素材紹介
- 作品詳細に「鑑賞するための操作軸」を加えるWorksページ

物理シミュレーションではありません。材料強度などの実測性能を表す場合は、データとの対応付けと表現上の注記が必要です。

## 調整パラメータ

| パラメータ | 役割 |
| --- | --- |
| `CONFIG.initial` | 初期張力。0〜1 |
| `CONFIG.dragSpan` | 全域の操作に必要な横移動距離。観察面幅に対する比率 |
| `CONFIG.follow` | 表示値の追従速度 |
| `CONFIG.velocityDecay` | 一過性の速度入力の減衰 |
| `CONFIG.dprCap` | DPR上限 |
| `CONFIG.maxPixels` | 描画バッファの画素数上限 |
| `CONFIG.warp` | 持続変形の倍率 |
| `CONFIG.local` | 速度による局所変形の強さ |
| `CONFIG.radius` | 局所変形の影響半径 |

配色・輪郭・層数は`makeArtwork()`に集約しています。変形を強くする場合は、輪郭の読みやすさと画像端の引き伸ばしを確認してください。

## パフォーマンスとアクセシビリティ

DPRは最大1.65、描画バッファは約240万画素を上限にします。補間が収束したらRAFを停止し、非表示タブや画面外でも停止します。ResizeObserverとwindow resizeでサイズを更新します。

低モーション設定では追従補間と速度による伸長を停止し、明示操作による張力変更だけを即時描画します。設定の実行中変更にも対応します。

rangeにはラベル、数値の読み上げ、説明、フォーカス表示を用意しています。装飾用の巨大数値は読み上げ対象外です。毎フレームの値をライブリージョンへ流しません。状態が切り替わったときだけ理由を通知します。

SPAで取り外す前には、ルートへ`daily:destroy`を送るか、モジュールの`destroy()`を呼びます。RAF、イベント、ResizeObserver、IntersectionObserver、Geometry、Material、Texture、Rendererを解放します。生成Canvasは意図的な静止画として残り、ルートを削除すれば一緒に破棄されます。

### 未検証項目と確認手順

この回答ではブラウザ実行・実機性能・支援技術の検証を行っていません。導入前に次を確認してください。

1. `three@0.170.0`で起動し、初回描画後だけ操作が有効になること。
2. 開発用コピーでGLSLへ構文エラーを入れ、診断ログと静止画への移行を確認すること。render実行中にdisposeが呼ばれないことも確認します。
3. import失敗・版不一致・WebGL無効・コンテキスト喪失・destroyの各状態で、張力数値とドラッグ案内が消えること。
4. Chrome・Firefox・Safariで、方向、追従、リリース後の減衰、保持される操作値を確認すること。
5. iOS・Androidで縦スクロール、横ドラッグ、pointercancel、画面回転を確認すること。
6. Tab・矢印キー・Home / Endで操作し、観察面とrangeの説明をスクリーンリーダーで確認すること。
7. 低モーション設定を実行中に変更し、速度演出と補間が停止すること。
8. 色空間、縮小時の細い層のエイリアシング、UV端の伸び、狭幅での文字の収まりを確認すること。
9. 操作後・画面外でのRAF停止、BFCache復帰、反復mount / destroy時のリソース増加をDevToolsで確認すること。

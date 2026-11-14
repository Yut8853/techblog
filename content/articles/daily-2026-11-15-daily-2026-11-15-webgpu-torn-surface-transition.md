---
title: "WebGPUで作る、裂け目から現れる素材の風景"
description: "生成静物を裂け目・折り返し・接触影でつなぐWebGPU画像トランジション。途中停止できる進捗操作、再初期化時の状態同期、狭幅レイアウトと静的フォールバックまで設計します。"
category: "WebGPU画像トランジション"
categorySlug: "webgpu-image-transition"
categoryDescription: "WebGPUとWGSLで画像の境界・変位・陰影を制御し、素材比較やHeroの切り替えへ組み込むインタラクティブ表現。"
tags:
  - "WebGPU"
  - "WGSL"
  - "Image Transition"
  - "生成ビジュアル"
  - "マテリアル比較"
  - "アクセシビリティ"
  - "Daily Lab"
date: "2026年11月15日"
publishedAt: "2026-11-15"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 44
focus: "WebGPU"
concept: "二つの生成静物を、裂け目・折り返し・接触影を持つ一枚の表面として比較する素材アーカイブ。WebGPUの画像変位を途中で止められる操作へ組み込み、進捗の意味と選択状態を表示モード間で統一する。"
referenceTitle: "Tomasz — 2D-to-3D paper-tear transition / Tomasz Szmajda"
referenceUrl: "https://www.cssdesignawards.com/sites/tomasz/49278/"
referencePlatform: "CSS Design Awards"
qualityScore: 87
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" aria-label="After Surface 素材の比較スタディ">
        <header class="ds-top"><span><i class="ds-mark" aria-hidden="true"></i>AFTER SURFACE / MATERIAL ARCHIVE</span><span>044 — 365</span></header>
        <div class="ds-heading"><h1>AFTER<span>/ SURFACE</span></h1><p>裂け目の、その先。<br>二つの静物を、一枚の表面から探る。<br>INTERACTIVE MATERIAL STUDY — 2026</p></div>
        <div class="ds-layout">
          <div class="ds-main">
            <div class="ds-visual" role="img" aria-label="砂色のアーチ彫刻と青い環状彫刻。下のスライダーで二つの生成画像を切り替え、途中の状態も比較できます。">
              <div class="ds-fallback" aria-hidden="true"><canvas class="ds-image-a" width="1200" height="900"></canvas><canvas class="ds-image-b" width="1200" height="900"></canvas></div>
              <canvas class="ds-gpu" aria-hidden="true" hidden></canvas>
              <div class="ds-annotation" aria-hidden="true"><span>PLATE / 01—02</span><span>GENERATED STILL LIFE</span></div><div class="ds-cross" aria-hidden="true"></div>
              <div class="ds-annotation bottom" aria-hidden="true"><span>FORM, LIGHT & FIBRE</span><span>ORIGINAL ART / 2026</span></div>
            </div>
            <div class="ds-controls">
              <div class="ds-control-head"><label for="ds-tear-progress">TRANSITION / 切り替え進捗</label><output for="ds-tear-progress" aria-live="off">000%</output></div>
              <input class="ds-range" id="ds-tear-progress" type="range" min="0" max="100" step="1" value="0" aria-valuetext="切り替え進捗 0パーセント" aria-describedby="ds-range-help">
              <div class="ds-control-labels" aria-hidden="true"><span>01 — OCHRE MASS</span><span>DRAG / ← →</span><span>02 — BLUE VOID</span></div>
              <p class="ds-sr" id="ds-range-help">0パーセントでOchre mass、100パーセントでBlue voidへ切り替わります。数値は切り替えの進捗で、画像の露出面積ではありません。</p>
            </div>
          </div>
          <aside class="ds-side" aria-label="素材の選択">
            <p class="ds-eyebrow">SURFACE INDEX / TWO STUDIES</p><h2>形を見せる。<br>余白を残す。</h2><p class="ds-intro">砂の温度と、青の静けさ。<br>輪郭をほどきながら、もう一つの風景へ。</p>
            <button class="ds-choice" type="button" data-index="0" aria-pressed="true"><small>01</small><span><strong>Ochre mass</strong><em>砂色 / 密度と重力</em></span><i class="ds-dot" aria-hidden="true"></i></button>
            <button class="ds-choice" type="button" data-index="1" aria-pressed="false"><small>02</small><span><strong>Blue void</strong><em>群青 / 空洞と光</em></span><i class="ds-dot" aria-hidden="true"></i></button>
            <div class="ds-tech"><span class="ds-mode">GENERATED CANVAS / PREPARING</span><span>NO EXTERNAL ASSETS<br>2026.11.15 / DAY 044</span></div>
          </aside>
        </div>
        <footer class="ds-footer"><span>INDEPENDENT DESIGN STUDY</span><span>AN EXPERIMENT IN REVEALING.</span></footer>
        <p class="ds-sr ds-live" role="status" aria-live="polite" aria-atomic="true"></p>
        <noscript><p>この比較スタディの画像生成と操作にはJavaScriptが必要です。</p></noscript>
      </section>
  - name: styles.css
    language: css
    content: |
      .daily-stage{--paper:#eeeae1;--ink:#252820;--line:#cacbc0;--accent:#b94325;background:var(--paper);color:var(--ink);padding:28px clamp(20px,5vw,80px) 24px;font-family:Arial,'Noto Sans JP',sans-serif;box-sizing:border-box;min-height:100svh}.daily-stage *{box-sizing:border-box}.daily-stage [hidden]{display:none!important}.ds-top,.ds-footer{display:flex;justify-content:space-between;gap:20px;font:11px/1.6 monospace;letter-spacing:.1em}.ds-top{padding-bottom:18px;border-bottom:1px solid var(--line)}.ds-mark{display:inline-block;width:9px;height:9px;background:var(--accent);margin-right:10px}.ds-heading{container-type:inline-size;display:flex;align-items:flex-end;justify-content:space-between;gap:28px;padding:36px 0 30px}.ds-heading h1{margin:0;font-size:clamp(48px,7.5vw,112px);font-weight:500;line-height:.9;letter-spacing:-.065em}.ds-heading h1 span{display:block;margin-left:.58em;white-space:nowrap}.ds-heading p{max-width:240px;margin:0;font-size:12px;line-height:1.9}.ds-layout{display:grid;grid-template-columns:minmax(0,1fr) 240px;gap:30px}.ds-main{min-width:0}.ds-visual{position:relative;aspect-ratio:4/3;overflow:hidden;background:#d4c6b4;isolation:isolate}.ds-fallback,.ds-gpu{position:absolute;inset:0;width:100%;height:100%}.ds-fallback canvas{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.ds-image-b{opacity:0}.ds-gpu{z-index:1;display:block}.ds-annotation{position:absolute;z-index:2;inset:18px 18px auto;display:flex;justify-content:space-between;gap:15px;color:#fff;font:10px/1.6 monospace;letter-spacing:.08em;mix-blend-mode:difference;pointer-events:none}.ds-annotation.bottom{inset:auto 18px 18px}.ds-cross{position:absolute;z-index:2;left:50%;top:50%;width:16px;height:16px;transform:translate(-50%,-50%);opacity:.35;mix-blend-mode:difference;pointer-events:none}.ds-cross:before,.ds-cross:after{content:'';position:absolute;background:white}.ds-cross:before{width:16px;height:1px;top:8px}.ds-cross:after{height:16px;width:1px;left:8px}.ds-side{display:flex;flex-direction:column;min-width:0}.ds-eyebrow{font:11px/1.6 monospace;letter-spacing:.1em;margin:0 0 20px}.ds-side h2{font-size:27px;line-height:1.4;font-weight:400;letter-spacing:-.04em;margin:0 0 20px}.ds-intro{font-size:12px;line-height:1.9;margin:0 0 30px;color:#62665b}.ds-choice{appearance:none;border:0;border-top:1px solid var(--line);background:transparent;text-align:left;color:inherit;padding:18px 0;width:100%;cursor:pointer;display:grid;grid-template-columns:28px minmax(0,1fr) 12px;gap:8px;align-items:start;transition:color .2s,background .2s}.ds-choice small{font:11px/1.7 monospace}.ds-choice strong{display:block;font-size:16px;font-weight:500;letter-spacing:-.02em}.ds-choice em{display:block;font-size:11px;line-height:1.6;font-style:normal;margin-top:7px;color:#62665b}.ds-choice .ds-dot{width:7px;height:7px;margin-top:5px;border:1px solid currentColor;border-radius:50%;transition:background .2s}.ds-choice[aria-pressed='true']{color:var(--accent)}.ds-choice[aria-pressed='true'] .ds-dot{background:currentColor}.ds-choice:hover{background:#e4e1d7}.ds-choice:focus-visible,.ds-range:focus-visible{outline:2px solid var(--accent);outline-offset:5px}.ds-tech{margin-top:auto;padding-top:30px;font:10px/1.8 monospace;letter-spacing:.04em;color:#62665b;overflow-wrap:anywhere}.ds-mode{display:block;color:var(--ink)}.ds-controls{padding:18px 0 25px}.ds-control-head{display:flex;align-items:center;justify-content:space-between;gap:15px;font:11px/1.5 monospace;letter-spacing:.04em}.ds-control-head output{font-size:15px;font-variant-numeric:tabular-nums}.ds-range{display:block;appearance:none;-webkit-appearance:none;background:transparent;width:100%;height:44px;margin:3px 0;cursor:ew-resize;accent-color:var(--ink);touch-action:pan-y}.ds-range::-webkit-slider-runnable-track{height:2px;background:var(--line)}.ds-range::-moz-range-track{height:2px;background:var(--line)}.ds-range::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:32px;height:32px;background:var(--ink);border:7px solid var(--paper);border-radius:50%;margin-top:-15px;box-shadow:0 0 0 1px var(--ink)}.ds-range::-moz-range-thumb{box-sizing:border-box;width:32px;height:32px;background:var(--ink);border:7px solid var(--paper);border-radius:50%;box-shadow:0 0 0 1px var(--ink)}.ds-control-labels{display:flex;justify-content:space-between;gap:16px;color:#62665b;font:10px/1.6 monospace;letter-spacing:.04em}.ds-footer{border-top:1px solid var(--line);padding-top:16px;color:#606658}.ds-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.ds-choice:disabled,.ds-range:disabled{cursor:default;opacity:.65}@media(min-width:1500px){.ds-layout{grid-template-columns:minmax(0,1fr) 290px}.ds-visual{aspect-ratio:16/10}}@media(max-width:800px){.daily-stage{padding-top:20px}.ds-heading{padding-top:30px;align-items:flex-start}.ds-heading p{max-width:170px;font-size:11px}.ds-layout{grid-template-columns:1fr;gap:4px}.ds-visual{aspect-ratio:4/3}.ds-side{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0 18px}.ds-side .ds-eyebrow,.ds-side h2,.ds-intro{display:none}.ds-tech{grid-column:1/-1;padding:10px 0 20px;margin:0;display:flex;justify-content:space-between;gap:16px}.ds-tech>span{max-width:50%}.ds-controls{padding-bottom:16px}.ds-choice{padding:15px 0}.ds-footer{font-size:10px}}@media(max-width:600px){.ds-heading{display:block}.ds-heading h1{font-size:clamp(34px,11vw,66px);font-size:clamp(34px,14cqi,66px)}.ds-heading p{max-width:none;margin-top:22px;font-size:11px}.ds-heading p br{display:none}}@media(max-width:480px){.ds-top{font-size:10px;gap:14px}.ds-top>span:last-child{flex-shrink:0}.ds-heading h1{font-size:clamp(30px,10vw,48px);font-size:clamp(30px,14cqi,58px)}.ds-choice{grid-template-columns:20px minmax(0,1fr) 8px;gap:4px}.ds-choice strong{font-size:14px}.ds-choice em{font-size:10px}.ds-control-labels{flex-wrap:wrap;gap:4px 12px}.ds-control-labels span:nth-child(2){order:3;flex-basis:100%;text-align:center}.ds-control-labels span:last-child{margin-left:auto}.ds-annotation{inset:12px 12px auto;gap:12px;font-size:10px;letter-spacing:0}.ds-annotation.bottom{inset:auto 12px 12px}.ds-annotation span:last-child{text-align:right;max-width:48%}.ds-footer span:last-child{max-width:120px;text-align:right}}@media(prefers-reduced-motion:reduce){.daily-stage *{transition:none!important}}
  - name: experiment.js
    language: javascript
    content: |
      const root = document.querySelector('.daily-stage');
      if (!root) throw new Error('Missing .daily-stage');
      root.destroyDailyStudy?.();
      
      // ES module. One instance per page; no external dependencies.
      // Production tuning: resolution, response, material and selection hysteresis.
      const PARAMS = { dprCap: 1.75, maxPixels: 2400000, response: 12, curlWidth: 0.065, roughness: 0.022, commitLow: 0.36, commitHigh: 0.64 };
      const $ = s => root.querySelector(s);
      const visual = $('.ds-visual');
      const canvas = $('.ds-gpu');
      const images = [$('.ds-image-a'), $('.ds-image-b')];
      const range = $('.ds-range');
      const output = $('output');
      const mode = $('.ds-mode');
      const live = $('.ds-live');
      const buttons = [...root.querySelectorAll('.ds-choice')];
      const motion = matchMedia('(prefers-reduced-motion: reduce)');
      const events = new AbortController();
      const on = (el, type, fn) => el.addEventListener(type, fn, { signal: events.signal });
      let disposed = false, epoch = 0, gpu = null, raf = 0, lastTime = 0;
      let progress = 0, target = 0, selected = 0;
      const uniformData = new Float32Array(4);
      
      function paintArtwork(c, blue) {
        const x = c.getContext('2d');
        if (!x) throw new Error('Canvas 2D unavailable');
        const w = c.width, h = c.height;
        x.clearRect(0, 0, w, h);
        let seed = blue ? 91 : 23;
        const rnd = () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; };
        const bg = x.createLinearGradient(0, 0, w, h);
        bg.addColorStop(0, blue ? '#9db9c5' : '#eee0c9');
        bg.addColorStop(1, blue ? '#344e69' : '#b9a086');
        x.fillStyle = bg; x.fillRect(0, 0, w, h);
        x.fillStyle = blue ? '#698496' : '#cebca0'; x.fillRect(0, 650, w, 250);
        x.strokeStyle = blue ? '#8ba3ad' : '#e0cdb0'; x.lineWidth = 1;
        x.beginPath(); x.moveTo(0, 650); x.lineTo(w, 650); x.stroke();
        // Long cast shadow and soft contact shadow.
        x.save(); x.filter = 'blur(22px)'; x.fillStyle = blue ? '#172f4c66' : '#5c3c2855';
        x.beginPath(); x.ellipse(675, 739, 330, 46, -0.08, 0, Math.PI * 2); x.fill(); x.restore();
        x.save(); x.filter = 'blur(4px)'; x.fillStyle = '#17202744';
        x.beginPath(); x.ellipse(591, 730, 202, 13, 0, 0, Math.PI * 2); x.fill(); x.restore();
        if (!blue) {
          // Independent arch geometry, with a recessed inner wall.
          const arch = (dx, dy) => {
            x.beginPath(); x.moveTo(354 + dx, 726 + dy); x.lineTo(354 + dx, 377 + dy);
            x.bezierCurveTo(354 + dx, 104 + dy, 807 + dx, 104 + dy, 807 + dx, 377 + dy);
            x.lineTo(807 + dx, 726 + dy); x.closePath();
            x.moveTo(500 + dx, 727 + dy); x.lineTo(500 + dx, 398 + dy);
            x.bezierCurveTo(500 + dx, 282 + dy, 661 + dx, 282 + dy, 661 + dx, 398 + dy);
            x.lineTo(661 + dx, 727 + dy); x.closePath();
          };
          arch(43, -21); x.fillStyle = '#77543b'; x.fill('evenodd');
          const material = x.createLinearGradient(350, 170, 820, 730);
          material.addColorStop(0, '#e6b982'); material.addColorStop(0.4, '#bf8757'); material.addColorStop(1, '#8a593b');
          arch(0, 0); x.fillStyle = material; x.fill('evenodd');
          x.save(); arch(0, 0); x.clip('evenodd');
          for (let i = 0; i < 6500; i++) { const a = rnd(), b = rnd(); x.fillStyle = i % 2 ? '#fff0d31a' : '#43251015'; x.fillRect(340 + a * 490, 170 + b * 560, 1 + rnd() * 3, 1 + rnd() * 2); }
          x.strokeStyle = '#f7dab455'; x.lineWidth = 2; x.beginPath(); x.moveTo(355, 725); x.lineTo(355, 377); x.bezierCurveTo(355, 105, 807, 105, 807, 377); x.stroke(); x.restore();
          x.fillStyle = '#7c5840'; x.fillRect(863, 650, 68, 80); x.fillStyle = '#d3ac7e'; x.beginPath(); x.moveTo(863, 650); x.lineTo(890, 631); x.lineTo(958, 631); x.lineTo(931, 650); x.fill(); x.fillStyle = '#a4774e'; x.beginPath(); x.moveTo(931, 650); x.lineTo(958, 631); x.lineTo(958, 711); x.lineTo(931, 730); x.fill();
        } else {
          const ring = (dx, dy) => { x.beginPath(); x.ellipse(592 + dx, 443 + dy, 243, 280, -0.17, 0, Math.PI * 2); x.ellipse(592 + dx, 443 + dy, 130, 165, -0.17, 0, Math.PI * 2); };
          ring(30, -5); x.fillStyle = '#142e52'; x.fill('evenodd');
          const material = x.createLinearGradient(360, 170, 820, 735);
          material.addColorStop(0, '#6c9cbc'); material.addColorStop(0.35, '#2e6596'); material.addColorStop(0.7, '#1c4675'); material.addColorStop(1, '#0e294d');
          ring(0, 0); x.fillStyle = material; x.fill('evenodd');
          x.save(); ring(0, 0); x.clip('evenodd');
          for (let i = 0; i < 4500; i++) { x.fillStyle = i % 2 ? '#dbf6ff17' : '#0c183c20'; x.fillRect(330 + rnd() * 530, 140 + rnd() * 600, 1.5, 1.5); }
          x.strokeStyle = '#b2e1ea55'; x.lineWidth = 2; x.beginPath(); x.ellipse(592, 443, 241, 278, -0.17, Math.PI * 0.85, Math.PI * 1.9); x.stroke(); x.restore();
          const orb = x.createRadialGradient(560, 425, 5, 589, 452, 63); orb.addColorStop(0, '#f1e2ba'); orb.addColorStop(1, '#b6a37b');
          x.fillStyle = orb; x.beginPath(); x.arc(589, 452, 61, 0, Math.PI * 2); x.fill();
          x.fillStyle = '#b5b9a7'; x.fillRect(278, 701, 104, 29); x.fillStyle = '#d1d0b9'; x.beginPath(); x.moveTo(278, 701); x.lineTo(306, 685); x.lineTo(410, 685); x.lineTo(382, 701); x.fill();
        }
        // Reproducible fine grain, no external images or runtime randomness.
        for (let i = 0; i < 15000; i++) { x.fillStyle = i % 2 ? '#ffffff08' : '#00000007'; x.fillRect(rnd() * w, rnd() * h, 1.2, 1.2); }
      }
      
      const shader = `
      struct Uniforms { state: vec4<f32> }
      @group(0) @binding(0) var<uniform> u: Uniforms;
      @group(0) @binding(1) var imageSampler: sampler;
      @group(0) @binding(2) var imageA: texture_2d<f32>;
      @group(0) @binding(3) var imageB: texture_2d<f32>;
      struct VertexOutput { @builtin(position) position: vec4<f32>, @location(0) uv: vec2<f32> }
      @vertex fn vs(@builtin(vertex_index) i: u32) -> VertexOutput {
        var positions = array<vec2<f32>, 3>(vec2<f32>(-1.0,-1.0), vec2<f32>(3.0,-1.0), vec2<f32>(-1.0,3.0));
        let p = positions[i];
        var o: VertexOutput;
        o.position = vec4<f32>(p,0.0,1.0);
        o.uv = vec2<f32>(p.x * 0.5 + 0.5, 0.5 - p.y * 0.5);
        return o;
      }
      fn cover(uv: vec2<f32>) -> vec2<f32> {
        let ratio = u.state.y / (4.0 / 3.0);
        let scale = vec2<f32>(min(ratio,1.0), min(1.0 / ratio,1.0));
        return (uv - vec2<f32>(0.5)) * scale + vec2<f32>(0.5);
      }
      @fragment fn fs(v: VertexOutput) -> @location(0) vec4<f32> {
        let uv = v.uv;
        let p = clamp(u.state.x,0.0,1.0);
        let envelope = sin(p * 3.14159265);
        let fibre = sin(uv.y * 19.0 + 0.6) * 0.62 + sin(uv.y * 57.0 + 1.8) * 0.24 + sin(uv.y * 173.0) * 0.10 + sin(uv.y * 431.0) * 0.04;
        // p is transition progress, NOT exposed image area.
        let boundary = mix(-0.16,1.16,p) + fibre * u.state.w * envelope;
        let d = uv.x - boundary;
        let width = u.state.z * (0.45 + 0.55 * envelope);
        let curl = 1.0 - smoothstep(0.0,width,d);
        let warped = uv + vec2<f32>(width * curl * curl * 1.65, sin(uv.y * 19.0) * curl * envelope * 0.002);
        var front = textureSample(imageA,imageSampler,cover(warped)).rgb;
        let back = textureSample(imageB,imageSampler,cover(uv)).rgb;
        // Screen-space roll approximation: displaced image, paper reverse, ridge light.
        front *= 1.0 - 0.27 * sin(curl * 3.14159265);
        let reverse = 1.0 - smoothstep(width * 0.08,width * 0.43,d);
        let paper = vec3<f32>(0.91,0.865,0.76) * (0.74 + 0.26 * smoothstep(0.0,width * 0.3,d));
        front = mix(front,paper,reverse * 0.92);
        front += vec3<f32>(0.15,0.14,0.11) * exp(-pow((d - width * 0.33) / (width * 0.10),2.0));
        let shadow = exp(-abs(d) / (width * 0.57)) * 0.25 * envelope;
        let underneath = back * (1.0 - shadow);
        let aa = max(fwidth(d),0.0007);
        let mask = smoothstep(-aa,aa,d);
        return vec4<f32>(mix(underneath,front,mask),1.0);
      }`;
      
      function drop(g) {
        if (!g || g.dead) return;
        g.dead = true;
        g.device.removeEventListener('uncapturederror', g.onError);
        if (g.configured) { try { g.context.unconfigure(); } catch {} }
        g.textures.forEach(t => t.destroy());
        g.buffer?.destroy();
        g.device.destroy();
      }
      function releaseGPU() {
        epoch++;
        const old = gpu; gpu = null;
        canvas.hidden = true;
        drop(old);
      }
      function fallback(label) {
        releaseGPU();
        mode.textContent = label;
        schedule();
      }
      function resize() {
        const rect = visual.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const limit = gpu?.device.limits.maxTextureDimension2D || 4096;
        const scale = Math.min(window.devicePixelRatio || 1, PARAMS.dprCap, Math.sqrt(PARAMS.maxPixels / (rect.width * rect.height)), limit / rect.width, limit / rect.height);
        const w = Math.max(1, Math.floor(rect.width * scale));
        const h = Math.max(1, Math.floor(rect.height * scale));
        if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
        schedule();
      }
      function draw(g) {
        uniformData.set([progress, canvas.width / canvas.height, PARAMS.curlWidth, PARAMS.roughness]);
        g.device.queue.writeBuffer(g.buffer, 0, uniformData);
        const encoder = g.device.createCommandEncoder();
        const pass = encoder.beginRenderPass({ colorAttachments: [{ view: g.context.getCurrentTexture().createView(), loadOp: 'clear', storeOp: 'store', clearValue: { r: 0.8, g: 0.77, b: 0.7, a: 1 } }] });
        pass.setPipeline(g.pipeline); pass.setBindGroup(0, g.bindGroup); pass.draw(3); pass.end();
        g.device.queue.submit([encoder.finish()]);
      }
      async function startGPU() {
        if (disposed) return;
        if (motion.matches) { mode.textContent = 'STATIC BLEND / REDUCED MOTION'; return; }
        if (!navigator.gpu) { mode.textContent = 'CANVAS BLEND / WEBGPU UNAVAILABLE'; return; }
        const ticket = ++epoch;
        const current = () => !disposed && ticket === epoch && !motion.matches;
        let g = null;
        mode.textContent = 'WEBGPU / INITIALIZING';
        try {
          const adapter = await navigator.gpu.requestAdapter({ powerPreference: 'low-power' });
          if (!current()) return;
          if (!adapter) throw new Error('No adapter');
          const device = await adapter.requestDevice();
          if (!current()) { device.destroy(); return; }
          g = { device, textures: [], ready: false, configured: false, dead: false };
          gpu = g;
          g.onError = () => { if (gpu === g && !disposed) fallback('CANVAS BLEND / GPU ERROR'); };
          device.addEventListener('uncapturederror', g.onError);
          device.lost.then(() => { if (gpu === g && !disposed) fallback('CANVAS BLEND / DEVICE LOST'); });
          device.pushErrorScope('validation');
          const module = device.createShaderModule({ code: shader });
          const format = navigator.gpu.getPreferredCanvasFormat();
          g.pipeline = await device.createRenderPipelineAsync({ layout: 'auto', vertex: { module, entryPoint: 'vs' }, fragment: { module, entryPoint: 'fs', targets: [{ format }] }, primitive: { topology: 'triangle-list' } });
          if (!current()) { drop(g); return; }
          g.buffer = device.createBuffer({ size: 16, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
          for (const source of images) {
            // Register each allocation immediately so partial initialization is disposable.
            const texture = device.createTexture({ size: [source.width, source.height], format: 'rgba8unorm', usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT });
            g.textures.push(texture);
            device.queue.copyExternalImageToTexture({ source }, { texture }, [source.width, source.height]);
          }
          const sampler = device.createSampler({ minFilter: 'linear', magFilter: 'linear', addressModeU: 'clamp-to-edge', addressModeV: 'clamp-to-edge' });
          g.bindGroup = device.createBindGroup({ layout: g.pipeline.getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer: g.buffer } }, { binding: 1, resource: sampler }, { binding: 2, resource: g.textures[0].createView() }, { binding: 3, resource: g.textures[1].createView() }] });
          g.context = canvas.getContext('webgpu');
          if (!g.context) throw new Error('No WebGPU canvas context');
          g.context.configure({ device, format, alphaMode: 'opaque' }); g.configured = true;
          resize(); draw(g);
          const validationError = await device.popErrorScope();
          if (!current()) { drop(g); return; }
          if (validationError) throw validationError;
          // Draw the latest interaction state before exposing the GPU canvas.
          draw(g); g.ready = true; canvas.hidden = false;
          mode.textContent = 'WEBGPU / PROCEDURAL TEAR';
          schedule();
        } catch (error) {
          if (current()) { fallback('CANVAS BLEND / GPU UNAVAILABLE'); console.warn('After Surface: fallback enabled.', error); }
          else drop(g);
        }
      }
      
      // Display synchronization is independent of selection-change detection.
      // Initial/reinitialization sync must not be skipped by commit()'s early return.
      function syncSelection(announce = false) {
        buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(i === selected)));
        live.textContent = announce
          ? (selected ? '02 Blue void を選択しました。' : '01 Ochre mass を選択しました。')
          : '';
      }
      function syncProgressControl() {
        const percent = Math.round(target * 100);
        range.value = String(percent);
        output.value = `${String(percent).padStart(3, '0')}%`;
        range.setAttribute('aria-valuetext', `切り替え進捗 ${percent}パーセント`);
      }
      function resetUI() {
        progress = 0;
        target = 0;
        selected = 0;
        lastTime = 0;
        canvas.hidden = true;
        images[0].style.opacity = '1';
        images[1].style.opacity = '0';
        range.disabled = false;
        buttons.forEach(b => { b.disabled = false; });
        output.setAttribute('aria-live', 'off');
        syncProgressControl();
        syncSelection(false);
        mode.textContent = 'GENERATED CANVAS / PREPARING';
      }
      function commit() {
        const next = progress >= PARAMS.commitHigh ? 1 : progress <= PARAMS.commitLow ? 0 : selected;
        if (next === selected) return;
        selected = next;
        syncSelection(true);
      }
      function tick(time) {
        raf = 0;
        if (disposed || document.hidden) return;
        const dt = Math.min(0.05, lastTime ? (time - lastTime) / 1000 : 1 / 60); lastTime = time;
        progress = motion.matches ? target : progress + (target - progress) * (1 - Math.exp(-PARAMS.response * dt));
        const settled = Math.abs(target - progress) < 0.0004;
        if (settled) progress = target;
        images[1].style.opacity = String(progress);
        if (gpu?.ready) { try { draw(gpu); } catch { fallback('CANVAS BLEND / RENDER ERROR'); } }
        if (settled) { commit(); lastTime = 0; } else schedule();
      }
      function schedule() { if (!disposed && !document.hidden && !raf) raf = requestAnimationFrame(tick); }
      function setTarget(value) {
        if (disposed) return;
        target = Math.max(0, Math.min(1, value));
        syncProgressControl();
        schedule();
      }
      
      on(range, 'input', () => setTarget(Number(range.value) / 100));
      buttons.forEach((b, i) => on(b, 'click', () => setTarget(i)));
      on(motion, 'change', () => { releaseGPU(); lastTime = 0; schedule(); startGPU(); });
      on(window, 'resize', resize);
      on(document, 'visibilitychange', () => {
        if (document.hidden) { cancelAnimationFrame(raf); raf = 0; lastTime = 0; }
        else { resize(); schedule(); }
      });
      const observer = new ResizeObserver(resize);
      observer.observe(visual);
      function destroy() {
        if (disposed) return;
        disposed = true;
        cancelAnimationFrame(raf); raf = 0;
        events.abort(); observer.disconnect(); releaseGPU();
        images[1].style.opacity = String(progress);
        range.disabled = true; buttons.forEach(b => { b.disabled = true; });
        live.textContent = '';
        mode.textContent = 'STATIC / STUDY DISPOSED';
        if (root.destroyDailyStudy === destroy) delete root.destroyDailyStudy;
      }
      root.destroyDailyStudy = destroy;
      on(root, 'daily:destroy', destroy);
      on(window, 'pagehide', event => { if (!event.persisted) destroy(); });
      
      // Explicitly reset every UI projection, including state left by an old instance.
      resetUI();
      try {
        paintArtwork(images[0], false);
        paintArtwork(images[1], true);
        resize();
        startGPU();
      } catch (error) {
        destroy();
        mode.textContent = 'CANVAS 2D UNAVAILABLE';
        live.textContent = '画像を生成できませんでした。';
        console.warn('After Surface: artwork initialization failed.', error);
      }
      
---

# Day 044 — WebGPUで作る、裂け目から現れる素材の風景

> **Reference study:** [Tomasz — 2D-to-3D paper-tear transition / Tomasz Szmajda](https://www.cssdesignawards.com/sites/tomasz/49278/) / CSS Design Awards  
> **主軸:** WebGPU / **品質レビュー:** 87/100

提供された掲載情報にある、紙の破れが2Dから3Dへ移る動きと表面変形の考え方を参考にした。元サイトのWebGL・GSAPと今回のWebGPUを区別し、独自生成静物、比較用進捗操作、独立した輪郭、WGSLのスクリーンスペースカールへ再構成。画像間の切り替えは独自解釈であり、頂点変形や物理的破断の再現ではない。掲載情報と実機性能の独立検証は行っていない。

# Day 044 / 365 — WebGPUで作る、裂け目から現れる素材の風景

公開日: 2026-11-15

## 参考にした表現

参考元は、CSS Design Awards掲載の **Tomasz — 2D-to-3D paper-tear transition / Tomasz Szmajda** です。

- 参考URL: https://www.cssdesignawards.com/sites/tomasz/49278/
- 掲載プラットフォーム: CSS Design Awards

提供されたリサーチでは、平面から立体へ移行する紙の破れ、GSAP、WebGLが紹介されています。参考にするのは、画像を単純に消すのではなく、表面の変形と陰影によって次の内容を出現させる考え方です。元サイトがWebGPUを使用しているという意味ではありません。二つの画像を比較する構成も、今回の独自解釈です。

ブランド、画像、コピー、破れの輪郭は流用していません。Canvas 2Dで生成した二つの抽象静物と、独自の編集レイアウトで再構成しています。掲載情報の独立した再確認や、参考サイトの実機性能検証は行っていません。

## 完成形

「AFTER / SURFACE」という架空の編集テーマで、砂色のアーチと青い環状彫刻を比較します。

下部のスライダーを動かすと、繊維を思わせる不規則な境界が横切り、表面が巻き上がったように次の静物が現れます。切断面の明るさ、折り返しの裏面色、下の画像へ落ちる影を、一つの進捗値で動かします。途中で止めて、二つの素材が同居する構図も保持できます。

操作値は、全モードで **「切り替え進捗」** と定義します。0%はOchre mass、100%はBlue voidへの到達位置です。Blue voidが占める面積や不透明度を表す値ではありません。WebGPUでは進捗が境界・変位・陰影を駆動し、代替表示では同じ進捗を画像ブレンドへ渡します。途中の見え方は異なりますが、操作の始点と終点は共通です。

数値とrangeはユーザーが指定した目標進捗を示し、通常時の画像は短い追従でそこへ収束します。カードは端点を指定するボタンです。ネイティブrangeの矢印キー、Home、Endでも操作できます。

## 実装設計

Three.jsを介さず、ブラウザのWebGPU APIとWGSLを直接使用します。HTML、CSSを配置し、JavaScriptを `type="module"` で読み込んでください。外部ライブラリ、画像ファイル、通信処理は不要です。WebGPUには対応環境とHTTPSまたはlocalhostなどのセキュアコンテキストが必要です。

この実装は **ページ内一インスタンス** を前提としています。ルート取得とラベル用IDが固定のため、複数配置する場合はルートを受け取る初期化関数とインスタンス固有IDへ変更してください。

状態は、操作が指示する `target`、描画中の `progress`、確定した素材番号 `selected` に分離しています。途中で操作を反転しても、アニメーションを積み増さず現在位置から追従します。

素材番号は描画が収束した時点で、0.64以上なら次、0.36以下なら前へ更新します。中央の不感帯では直前の選択を保持します。見出しと作品説明は常時表示し、カードの色と選択点だけを短く遷移させます。本文の入れ替えやHistory APIは使用しません。

### 再初期化時の表示同期

既存インスタンスを破棄した後、`resetUI()` で内部状態だけでなく、全カードの `aria-pressed`、range、output、両画像のopacity、GPUキャンバスの表示状態、通知内容を明示的に初期化します。選択表示の更新を `syncSelection()` に分離し、`commit()` の早期returnに初期同期を依存させていません。

これにより、Blue voidを選択してから同じDOM上で再初期化しても、Ochre massの初期画像とカード状態が一致します。再初期化ではライブ通知を空にし、過去の選択通知も残しません。

非同期GPU初期化には世代番号を付けます。破棄やモーション設定変更によって無効になった初期化処理は、GPUキャンバスを再表示しません。

## シェーダー/レンダリング

Canvas 2Dで生成した1200×900の画像をGPUTextureへ転送し、フルスクリーン三角形に描画します。

WGSLでは、複数周波数の正弦波から裂け目の輪郭を作ります。境界までの距離から、前景UVの変位、紙の裏面色、稜線のハイライト、背景側の接触影を計算します。境界には `fwidth()` を利用したアンチエイリアスを入れています。

始点と終点では境界を画面外へ逃がし、二つの画像を完全に切り替えます。この余白と輪郭の凹凸があるため、進捗と露出面積は線形対応しません。操作値を「表示量」と呼ばないのは、このレンダリング上の性質を正しく伝えるためです。

カールは **フラグメントシェーダーによるスクリーンスペース近似** です。頂点変形、実際の紙の厚み、物理的な破断を再現するものではありません。参考の立体的な驚きをそのまま再現するのではなく、正面主体のHeroで比較操作を阻害しない、控えめな表面の奥行きへ翻訳しています。

画角変更時はWGSLのcover計算と、代替Canvasの `object-fit: cover` を対応させています。

## 実務での使いどころ

- 素材ブランドの仕上げ比較
- 建築・インテリアのコンセプト切り替え
- キャンペーンの新旧ビジュアル紹介
- 二つの主力作品を見せるポートフォリオHero

裂け目を途中で保持できるため、自動再生だけの演出ではなく、比較と探索を含むUIに向いています。ただし、厳密な面積比較が必要な分析ツールには適しません。

実画像へ変更する場合は、両画像のデコード完了を待ってGPUへ転送し、権利確認、代替説明、縦横比の統一も行ってください。

## 調整パラメータ

- `dprCap`: 描画密度の上限。初期値1.75。
- `maxPixels`: 描画面積の上限。初期値240万画素。
- `response`: 目標への追従速度。大きいほど速く収束します。
- `curlWidth`: 画面幅に対する折り返し帯の幅。
- `roughness`: 裂け目の凹凸量。
- `commitLow / commitHigh`: 素材選択の確定境界。

輪郭の周波数はWGSL、静物の形と色は `paintArtwork()` にまとめています。凹凸を増やしすぎると紙より液体に見えやすいため、小さい値から調整します。

狭幅の見出しは固定58pxではなく、見出しコンテナの幅を参照する `cqi` で縮小します。未対応環境にはvwベースの指定を先に置きます。600px以下では説明を見出しの下へ移し、320px幅でも字下げを含めて収まるように設計しています。補助文字も可能な範囲で10〜11pxへ引き上げています。

## パフォーマンスとアクセシビリティ

描画は初期化、操作、サイズ変更時に予約し、収束後はrequestAnimationFrameを停止します。DPR、総画素数、GPUの最大テクスチャ寸法で解像度を制限します。タブが非表示になった場合もRAFを停止します。

WebGPU非対応、初期化失敗、デバイス喪失時は、同じ生成画像を重ねたCanvas表示へ切り替えます。`prefers-reduced-motion` が有効な場合はGPUを起動せず、時間方向の追従を止めて操作位置に対応する静的ブレンドを表示します。

通知の役割を次のように分けています。

- range: ネイティブ操作と `aria-valuetext` による「切り替え進捗」の通知。
- output: 視覚的な数値表示。`aria-live="off"` とし、更新を独立したライブ通知にしない。
- `.ds-live`: 確定素材が変わったときだけ通知。
- カード: `aria-pressed` で確定した選択を提示。

GPUキャンバスと代替画像は支援技術から隠し、ビジュアル領域全体に説明を付けます。フォーカス表示を設け、hidden属性には明示的な非表示ルールを適用しています。

アンマウント時はルートの `destroyDailyStudy()` を呼ぶか、`daily:destroy` イベントを送ってください。RAF、DOMイベント、ResizeObserver、GPUBuffer、GPUTexture、GPUDevice、WebGPUコンテキストを片付けます。

### 未検証項目と確認手順

このコードの実ブラウザ・実機動作、読み上げ、フレームレート、メモリ使用量は未検証です。公開前に以下を確認してください。

1. 320px、375px、480pxおよび文字拡大時に、見出しの字下げ込みで横方向のはみ出しがないことを確認する。
2. Blue void確定後に `destroyDailyStudy()` を実行し、同じDOMでモジュールを再実行する。カード、range、output、画像、通知が初期状態へ揃うことを確認する。
3. WebGPU対応環境でシェーダー受理、初回描画、両端の完全切り替え、画像転送時の色再現、裂け目の見え方を確認する。
4. 急な反転と途中停止で追従の体感を確認し、タッチ操作と縦スクロールが両立するかを実機で確かめる。
5. キーボードとスクリーンリーダーで「切り替え進捗」が読まれ、outputの数値が重複通知されず、確定時の通知量が適切か確認する。
6. WebGPU非対応、初期化失敗、デバイス喪失、reduced-motion変更で表示と操作が維持されることを確認する。
7. 初期化中の破棄、連続操作中のリサイズ、同じDOMへの再初期化を繰り返し、GPUリソースとイベントが残らないことを確認する。
8. 対象端末でGPU負荷を計測し、`dprCap` と `maxPixels` を案件の性能予算へ合わせる。

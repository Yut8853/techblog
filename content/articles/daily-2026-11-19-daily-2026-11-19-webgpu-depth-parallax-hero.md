---
title: "WebGPUで作る、石の開口を覗く深度パララックスHero"
description: "三つの石質フレームを異なる深度に重ね、視点と素材選択を連動させるWebGPU製Hero。WGSLの解析的な面描画、減衰カメラ、オンデマンド描画、起動診断と静的SVGへの退避まで設計します。"
category: "WebGPU深度パララックスHero"
categorySlug: "webgpu-depth-parallax-hero"
categoryDescription: "WebGPUの透視投影と深度別レンダリングを、ブランドのHeroや作品探索に結び付ける空間パララックス表現。"
tags:
  - "WebGPU"
  - "WGSL"
  - "Depth Parallax"
  - "ブランドHero"
  - "生成マテリアル"
  - "アクセシビリティ"
  - "Daily Lab"
date: "2026年11月19日"
publishedAt: "2026-11-19"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 48
focus: "WebGPU"
concept: "石の開口部を三つの深度へ配置した素材アーカイブ。視点による遮蔽の変化と、深度選択による輪郭・カメラ前進・HTML情報の連動を、ネイティブWebGPUで構成する。"
referenceTitle: "Swell.Interactive — Uni Agency."
referenceUrl: "https://www.cssdesignawards.com/sites/swell-interactive/44823/"
referencePlatform: "CSS Design Awards"
qualityScore: 86
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" data-index="0" data-gpu="loading" aria-label="STRATA 素材と奥行きのデザインスタディ">
        <header class="ds-header">
          <div class="ds-brand"><span aria-hidden="true">≋</span>STRATA / FIELD NOTES</div>
          <div class="ds-edition">048 / 365<br>19 NOVEMBER 2026</div>
        </header>
        <div class="ds-visual" aria-hidden="true">
          <svg class="ds-fallback" viewBox="0 0 800 700" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="ds48-stone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d3cbb3"/><stop offset=".45" stop-color="#939c87"/><stop offset="1" stop-color="#424f43"/></linearGradient>
              <radialGradient id="ds48-haze"><stop stop-color="#718064" stop-opacity=".2"/><stop offset="1" stop-color="#171d1c" stop-opacity="0"/></radialGradient>
            </defs>
            <ellipse cx="430" cy="370" rx="350" ry="330" fill="url(#ds48-haze)"/>
            <g class="ds-band-2" transform="translate(435 347) rotate(7)">
              <path class="ds-stone" fill="url(#ds48-stone)" fill-rule="evenodd" opacity=".5" d="M0-115A80 115 0 1 1 0 115A80 115 0 1 1 0-115ZM0-78A54 78 0 1 0 0 78A54 78 0 1 0 0-78Z"/>
              <ellipse class="ds-outline" rx="80" ry="115"/>
            </g>
            <g class="ds-band-1" transform="translate(415 350) rotate(-12)">
              <path class="ds-stone" fill="url(#ds48-stone)" fill-rule="evenodd" opacity=".75" d="M0-195A137 195 0 1 1 0 195A137 195 0 1 1 0-195ZM0-139A96 139 0 1 0 0 139A96 139 0 1 0 0-139Z"/>
              <ellipse class="ds-outline" rx="137" ry="195"/>
            </g>
            <g class="ds-band-0" transform="translate(380 350) rotate(12)">
              <path class="ds-stone" fill="url(#ds48-stone)" fill-rule="evenodd" d="M0-290A214 290 0 1 1 0 290A214 290 0 1 1 0-290ZM0-211A150 211 0 1 0 0 211A150 211 0 1 0 0-211Z"/>
              <ellipse class="ds-outline" rx="214" ry="290"/>
            </g>
          </svg>
          <canvas class="ds-canvas"></canvas>
          <div class="ds-visual-caption">AN EXERCISE IN DISTANCE<br>THREE PLANES / ONE VIEWPOINT</div>
        </div>
        <div class="ds-intro">
          <p class="ds-eyebrow">MATERIAL ATLAS — VOL. 03</p>
          <h1>Between<br><em>layers.</em></h1>
          <p class="ds-lead">距離が変わると、素材は変わる。<br>三つの開口を通して、<br>表面から余白の奥へ。</p>
        </div>
        <div class="ds-info" aria-live="polite" aria-atomic="true">
          <div class="ds-info-top"><span class="ds-number">01 / SURFACE</span><h2>触れる距離</h2></div>
          <p class="ds-detail">削り跡と稜線。手前の石肌が、奥に続く空間の輪郭を決める。</p>
        </div>
        <footer class="ds-footer">
          <nav class="ds-depths" aria-label="観察する深度">
            <button type="button" class="ds-depth" data-depth="0" aria-pressed="true"><span>01 / NEAR</span><strong>表面を観る</strong></button>
            <button type="button" class="ds-depth" data-depth="1" aria-pressed="false"><span>02 / MIDDLE</span><strong>重なりを観る</strong></button>
            <button type="button" class="ds-depth" data-depth="2" aria-pressed="false"><span>03 / FAR</span><strong>余白を観る</strong></button>
          </nav>
          <div class="ds-tools">
            <label><span class="ds-view-label"><span>視点</span><span aria-hidden="true">← &nbsp; →</span></span><input class="ds-view" type="range" min="-100" max="100" value="0" step="1" aria-label="左右の視点" disabled></label>
            <button type="button" class="ds-pause" aria-pressed="false" disabled>視差を停止</button>
          </div>
          <div class="ds-bottom"><span class="ds-mode" role="status">静的プレビュー / GPUを準備中</span><p class="ds-footnote">MOVE TO REVEAL THE SPACE BETWEEN.</p><a href="#ds48-context">展示の考え方 ↗</a></div>
        </footer>
      </section>
      <section class="ds-context" id="ds48-context" aria-labelledby="ds48-context-title"><h2 id="ds48-context-title">面ではなく、間を設計する。</h2><p>同じ素材でも、近くでは痕跡が、遠くでは輪郭が見えてくる。この展示は三つの深度を重ね、素材そのものと、素材がつくる余白を観察するための架空のアーカイブです。</p></section>
  - name: styles.css
    language: css
    content: |
      .daily-stage{--ink:#efeadc;--muted:#a6a598;--accent:#d4e68a;position:relative;isolation:isolate;min-height:780px;overflow:hidden;background:#171d1c;color:var(--ink);font-family:Arial,'Hiragino Kaku Gothic ProN',Meiryo,sans-serif;border:1px solid #414840;box-sizing:border-box}.daily-stage *{box-sizing:border-box}.daily-stage [hidden]{display:none!important}.daily-stage button,.daily-stage input,.daily-stage a{-webkit-tap-highlight-color:transparent}.daily-stage button{font:inherit;color:inherit}.daily-stage button:focus-visible,.daily-stage a:focus-visible,.daily-stage input:focus-visible{outline:2px solid var(--accent);outline-offset:6px}.ds-header{position:relative;z-index:3;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:27px 36px;border-bottom:1px solid #e9ecd51a}.ds-brand{font-size:13px;letter-spacing:.18em;font-weight:700}.ds-brand span{display:inline-block;margin-right:15px;color:var(--accent);font-size:21px}.ds-edition,.ds-eyebrow,.ds-mode,.ds-number,.ds-footnote{font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:10px;letter-spacing:.13em;line-height:1.6}.ds-edition{color:var(--muted)}.ds-visual{position:absolute;inset:65px 0 120px 28%;pointer-events:none}.ds-canvas,.ds-fallback{position:absolute;inset:0;width:100%;height:100%;display:block}.ds-canvas{pointer-events:auto;opacity:0;touch-action:pan-y;transition:none}.daily-stage[data-gpu='ready'] .ds-canvas{opacity:1}.ds-fallback{color:#bcb39d}.ds-fallback .ds-stone{stroke:#9b9987;stroke-width:1}.ds-fallback .ds-outline{fill:none;stroke:var(--accent);stroke-width:1.5;opacity:0;transition:opacity .3s}.daily-stage[data-index='0'] .ds-band-0 .ds-outline,.daily-stage[data-index='1'] .ds-band-1 .ds-outline,.daily-stage[data-index='2'] .ds-band-2 .ds-outline{opacity:.95}.ds-visual-caption{position:absolute;right:36px;top:26px;text-align:right;color:#b4b9a7;z-index:1;pointer-events:none;font:10px/1.7 ui-monospace,monospace;letter-spacing:.13em}.ds-intro{position:relative;z-index:2;width:47%;padding:80px 0 28px 52px;pointer-events:none}.ds-eyebrow{color:var(--accent);margin:0 0 25px}.ds-intro h1{font-family:Georgia,'Times New Roman',serif;font-size:clamp(68px,8.1vw,116px);font-weight:400;letter-spacing:-.065em;line-height:.86;margin:0 0 30px}.ds-intro h1 em{font-weight:400;color:#a9b89b}.ds-lead{font-size:12px;line-height:1.95;color:#b9bcae;max-width:260px;margin:0}.ds-info{position:relative;z-index:2;margin:24px 0 174px 52px;width:280px;min-height:120px;border-top:1px solid #e9ecd52b;padding-top:17px}.ds-info-top{display:flex;align-items:center;gap:14px}.ds-number{color:var(--accent)}.ds-info h2{font-size:17px;font-weight:400;letter-spacing:.02em;margin:0}.ds-detail{font-size:12px;line-height:1.9;color:#bec1b4;margin:12px 0 0}.ds-info.is-changing{animation:ds-reveal .35s ease both}.ds-footer{position:absolute;z-index:4;left:36px;right:36px;bottom:26px;display:grid;grid-template-columns:1.3fr 1fr;gap:26px 40px;align-items:end;border-top:1px solid #e9ecd52b;padding-top:20px}.ds-depths{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.ds-depth{background:#202723d9;border:1px solid #66715a75;border-radius:0;text-align:left;cursor:pointer;min-height:63px;padding:10px 12px;transition:background .25s,border-color .25s}.ds-depth span{display:block;font:10px/1.6 ui-monospace,monospace;color:#b1b6a5;letter-spacing:.08em}.ds-depth strong{display:block;font-size:12px;font-weight:400;margin-top:4px}.ds-depth:hover{border-color:#b8c3a1}.ds-depth[aria-pressed='true']{background:#d4e68a;color:#18201b;border-color:#d4e68a}.ds-depth[aria-pressed='true'] span{color:#3b482c}.ds-tools{display:grid;grid-template-columns:1fr auto;gap:12px 20px;align-items:center}.ds-tools label{min-width:0}.ds-view-label{font-size:11px;letter-spacing:.08em;display:flex;justify-content:space-between;color:#bfc6b5}.ds-view{width:100%;accent-color:var(--accent);height:28px;margin:5px 0 0;cursor:ew-resize}.ds-view:disabled{opacity:.35;cursor:default}.ds-pause{font-size:10px!important;padding:10px 12px;min-height:44px;border:1px solid #63705b;background:transparent;cursor:pointer;white-space:nowrap}.ds-pause:disabled{opacity:.6;cursor:default}.ds-bottom{grid-column:1/-1;display:flex;justify-content:space-between;gap:16px;align-items:center}.ds-mode{color:#a8b69a;letter-spacing:.07em}.ds-bottom a{color:#cbd1be;font-size:11px;text-underline-offset:4px;flex-shrink:0}.ds-footnote{margin:0;color:#8e9a87}.ds-context{background:#202622;padding:32px 36px;color:#bec6b5;border-top:1px solid #45513e;font:12px/2 Arial,sans-serif}.ds-context h2{font-size:15px;color:#e8eddd;font-weight:400;margin:0 0 10px}.ds-context p{margin:0;max-width:650px}@keyframes ds-reveal{from{opacity:.35;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}@media(min-width:1400px){.ds-intro{padding-top:100px}.daily-stage{min-height:850px}}@media(max-width:760px){.daily-stage{min-height:1000px}.ds-header{padding:20px}.ds-brand{font-size:10px}.ds-brand span{margin-right:8px}.ds-edition{font-size:8px;max-width:100px;text-align:right}.ds-visual{inset:76px 0 auto;height:410px}.ds-visual-caption{top:13px;right:20px;font-size:8px}.ds-intro{width:100%;padding:425px 24px 0;display:grid;grid-template-columns:1fr 1fr;gap:14px 18px;align-items:end}.ds-eyebrow{grid-column:1/-1;margin:0;font-size:9px}.ds-intro h1{font-size:65px;margin:0}.ds-lead{font-size:11px;line-height:1.8;max-width:190px}.ds-info{margin:25px 24px 250px;width:auto;min-height:100px}.ds-detail{max-width:440px}.ds-footer{left:24px;right:24px;bottom:24px;grid-template-columns:1fr;gap:19px}.ds-depth{padding:10px 9px;min-height:60px}.ds-depth strong{font-size:11px}.ds-tools{gap:10px 24px}.ds-bottom{gap:12px;align-items:start}.ds-mode{font-size:9px;max-width:190px}.ds-footnote{display:none}.ds-context{padding:26px 24px}}@media(max-width:360px){.ds-intro h1{font-size:55px}.ds-lead{font-size:10px}.ds-depth span{font-size:9px}}@media(prefers-reduced-motion:reduce){.daily-stage *{animation:none!important;transition:none!important}}
  - name: experiment.js
    language: javascript
    content: |
      export {};
      
      const root = document.querySelector('.daily-stage');
      if (root) {
        root.depthParallaxDispose?.();
        // Production tuning: resolution, response time, travel and viewpoint limits.
        const CONFIG = Object.freeze({ maxDPR: 1.5, maxPixels: 1400000, dampingMs: 170, travelStep: 0.66, pointerX: 0.64, pointerY: 0.3 });
        const canvas = root.querySelector('.ds-canvas');
        const visual = root.querySelector('.ds-visual');
        const fallback = root.querySelector('.ds-fallback');
        const mode = root.querySelector('.ds-mode');
        const range = root.querySelector('.ds-view');
        const pauseButton = root.querySelector('.ds-pause');
        const buttons = [...root.querySelectorAll('[data-depth]')];
        const info = root.querySelector('.ds-info');
        const records = [
          ['01 / SURFACE', '触れる距離', '削り跡と稜線。手前の石肌が、奥に続く空間の輪郭を決める。'],
          ['02 / INTERVAL', '重なりの距離', 'ずれた開口が視線を導く。視点を変えると、二つの面の間にある空気が見えてくる。'],
          ['03 / SILENCE', '余白の距離', '遠くなるほど輪郭は静かになる。最後の開口の向こうに、何も置かないための空間。']
        ];
        const abort = new AbortController();
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        const fine = matchMedia('(hover: hover) and (pointer: fine)');
        let selected = Math.max(0, Math.min(2, Math.round(Number(root.dataset.index) || 0)));
        let paused = false, dead = false, ready = false, inView = true;
        let raf = 0, previous = 0, gpu = null, failure = '';
        let context = null;
        const target = { x: 0, y: 0, travel: selected * CONFIG.travelStep };
        const current = { ...target };
        const uniformData = new Float32Array(8);
        const on = (node, name, handler, options = {}) => node.addEventListener(name, handler, { ...options, signal: abort.signal });
        const motionAllowed = () => ready && !paused && !reduced.matches;
      
        function syncControls() {
          range.disabled = !motionAllowed();
          pauseButton.disabled = !ready || reduced.matches;
          pauseButton.setAttribute('aria-pressed', String(paused || reduced.matches));
          pauseButton.textContent = reduced.matches ? 'モーション低減' : paused ? '視差を再生' : '視差を停止';
          mode.textContent = ready ? (reduced.matches ? 'WEBGPU / モーション低減' : paused ? 'WEBGPU / 視差停止中' : 'WEBGPU / 視点を動かして観察') : (failure || '静的プレビュー / GPUを準備中');
        }
      
        function select(index, animate = true) {
          selected = index;
          root.dataset.index = String(index);
          buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
          const record = records[index];
          info.querySelector('.ds-number').textContent = record[0];
          info.querySelector('h2').textContent = record[1];
          info.querySelector('.ds-detail').textContent = record[2];
          info.classList.remove('is-changing');
          if (animate && !reduced.matches && !paused) { void info.offsetWidth; info.classList.add('is-changing'); }
          target.travel = index * CONFIG.travelStep;
          invalidate();
        }
      
        function stopFrame() { cancelAnimationFrame(raf); raf = 0; previous = 0; }
        function invalidate() {
          if (!dead && ready && inView && !document.hidden && !raf) raf = requestAnimationFrame(frame);
        }
        function frame(time) {
          raf = 0;
          if (dead || !ready || !inView || document.hidden) return;
          const dt = previous ? Math.min(time - previous, 50) : 16;
          previous = time;
          const alpha = motionAllowed() ? 1 - Math.exp(-dt / CONFIG.dampingMs) : 1;
          let unsettled = false;
          for (const key of ['x', 'y', 'travel']) {
            const desired = key === 'travel' ? target.travel : motionAllowed() ? target[key] : 0;
            current[key] += (desired - current[key]) * alpha;
            if (Math.abs(desired - current[key]) < 0.0005) current[key] = desired;
            else unsettled = true;
          }
          try { draw(); } catch (error) { fail('静的表示 / 描画を継続できません', error, 'render'); return; }
          if (unsettled) invalidate(); else previous = 0;
        }
      
        function resize() {
          if (dead) return;
          const rect = visual.getBoundingClientRect();
          const width = Math.max(1, rect.width), height = Math.max(1, rect.height);
          const limit = gpu?.device.limits.maxTextureDimension2D || 4096;
          const scale = Math.min(devicePixelRatio || 1, CONFIG.maxDPR, Math.sqrt(CONFIG.maxPixels / (width * height)), limit / width, limit / height);
          const w = Math.max(1, Math.floor(width * scale)), h = Math.max(1, Math.floor(height * scale));
          if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
          invalidate();
        }
      
        function releaseGPU() {
          ready = false;
          stopFrame();
          const old = gpu;
          gpu = null;
          try { context?.unconfigure(); } catch (_) {}
          context = null;
          if (old) { old.buffer?.destroy(); old.device.destroy(); }
        }
        function diagnose(phase, error) {
          // Keep the original object: GPUValidationError, DOMException, or device loss info.
          console.error(`[STRATA / WebGPU / ${phase}]`, error);
          root.dispatchEvent(new CustomEvent('depth-parallax-error', {
            bubbles: true,
            detail: { phase, error }
          }));
        }
        function fail(message, error, phase = 'initialize') {
          if (dead) return;
          failure = message;
          // Restore the artwork before reporting to any application-level listeners.
          fallback.hidden = false;
          root.dataset.gpu = 'fallback';
          releaseGPU();
          syncControls();
          if (error) diagnose(phase, error);
        }
        function draw() {
          if (!gpu || !context) return;
          uniformData.set([canvas.width, canvas.height, current.x, current.y, current.travel, selected, 0, 0]);
          gpu.device.queue.writeBuffer(gpu.buffer, 0, uniformData);
          const encoder = gpu.device.createCommandEncoder({ label: 'STRATA frame encoder' });
          const pass = encoder.beginRenderPass({ colorAttachments: [{ view: context.getCurrentTexture().createView(), clearValue: { r: 0.09, g: 0.11, b: 0.1, a: 1 }, loadOp: 'clear', storeOp: 'store' }] });
          pass.setPipeline(gpu.pipeline);
          pass.setBindGroup(0, gpu.bindGroup);
          pass.draw(3);
          pass.end();
          gpu.device.queue.submit([encoder.finish()]);
        }
      
        const shader = `
      struct Uniforms { viewport: vec4f, state: vec4f }
      @group(0) @binding(0) var<uniform> u: Uniforms;
      struct VertexOut { @builtin(position) position: vec4f }
      @vertex fn vs(@builtin(vertex_index) index: u32) -> VertexOut {
        var points = array<vec2f, 3>(vec2f(-1.0,-1.0), vec2f(3.0,-1.0), vec2f(-1.0,3.0));
        var out: VertexOut;
        out.position = vec4f(points[index],0.0,1.0);
        return out;
      }
      fn hash(p: vec2f) -> f32 { return fract(sin(dot(p,vec2f(127.1,311.7))) * 43758.5453); }
      fn noise(p: vec2f) -> f32 {
        let i = floor(p); let f = fract(p); let t = f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2f(1.0,0.0)),t.x),mix(hash(i+vec2f(0.0,1.0)),hash(i+vec2f(1.0,1.0)),t.x),t.y);
      }
      @fragment fn fs(@builtin(position) position: vec4f) -> @location(0) vec4f {
        let resolution = u.viewport.xy;
        var uv = position.xy / resolution * 2.0 - 1.0;
        uv.y = -uv.y;
        let aspect = resolution.x / resolution.y;
        let bg = vec3f(0.09,0.114,0.106);
        let halo = exp(-dot(uv*vec2f(0.85,1.0),uv*vec2f(0.85,1.0))*1.8);
        var color = bg + vec3f(0.035,0.046,0.025)*halo;
        let origin = vec3f(u.viewport.zw,6.5-u.state.x);
        let direction = normalize(vec3f(uv.x*aspect*0.58,uv.y*0.58,-1.0));
        let light = normalize(vec3f(-0.65,0.8,0.7));
        // Far-to-near compositing: three depth bands, four thickness sections each.
        for (var band: i32 = 2; band >= 0; band = band-1) {
          let k = f32(band);
          let theta = select(select(0.18,-0.23,band==1),0.12,band==2);
          let turn = select(select(-0.14,0.17,band==1),-0.08,band==2);
          let normal = vec3f(sin(theta),0.0,cos(theta));
          let tangent = vec3f(cos(theta),0.0,-sin(theta));
          let vertical = vec3f(0.0,1.0,0.0);
          let axisX = tangent*cos(turn)+vertical*sin(turn);
          let axisY = -tangent*sin(turn)+vertical*cos(turn);
          let axes = vec2f(2.25-k*0.43,2.9-k*0.52);
          let center = vec3f((k-1.0)*0.12,k*0.025,-k*2.0);
          let selectionWeight = 1.0-step(0.1,abs(k-u.state.y));
          for (var section: i32 = 3; section >= 0; section = section-1) {
            let s = f32(section)/3.0;
            let plane = center-normal*s*0.22;
            let denom = dot(direction,normal);
            let distance = dot(plane-origin,normal)/denom;
            let point = origin + direction*distance-plane;
            let local = vec2f(dot(point,axisX),dot(point,axisY));
            let q = local/axes;
            let angle = atan2(q.y,q.x);
            let ripple = 0.018*sin(angle*3.0+k)+0.009*cos(angle*7.0-k);
            let radius = length(q)+ripple;
            let inner = 0.70-s*0.025;
            let outer = 0.98+s*0.02;
            let aa = max(0.0007,abs(distance)*1.5/(resolution.y*axes.y));
            let coverage = smoothstep(inner-aa,inner+aa,radius)*(1.0-smoothstep(outer-aa,outer+aa,radius));
            if (coverage>0.0 && distance>0.0) {
              let edgeOut = 1.0-smoothstep(0.0,0.055,outer-radius);
              let edgeIn = 1.0-smoothstep(0.0,0.05,radius-inner);
              let radial = normalize(axisX*q.x+axisY*q.y);
              let bevelNormal = normalize(normal+radial*(edgeOut-edgeIn)*0.85);
              let lighting = 0.42+0.58*max(0.0,dot(bevelNormal,light));
              let coarse = noise(local*3.2+vec2f(k*11.0));
              let grain = noise(local*65.0);
              let veins = pow(0.5+0.5*sin(radius*190.0+coarse*7.0),14.0);
              let stone = mix(vec3f(0.48,0.52,0.43),vec3f(0.77,0.71,0.58),coarse*0.72+0.2);
              var surface = stone*lighting*(0.91+grain*0.12-veins*0.07);
              surface *= 1.0-edgeIn*0.15;
              surface *= 1.0-s*0.22;
              let line = (1.0-smoothstep(aa,aa*2.5,abs(radius-(outer-0.012))))*selectionWeight;
              surface = mix(surface,vec3f(0.81,0.9,0.52),line*0.8);
              let fog = clamp(1.0-exp(-max(0.0,distance-4.5)*0.075),0.0,0.55);
              surface = mix(surface,bg+vec3f(0.025,0.035,0.02),fog);
              color = mix(color,surface,coverage);
            }
          }
        }
        let vignette = 1.0-0.12*smoothstep(0.45,1.45,length(uv));
        color *= vignette;
        color += (hash(position.xy)-0.5)*0.006;
        return vec4f(clamp(color,vec3f(0.0),vec3f(1.0)),1.0);
      }`;
      
        async function initialize() {
          if (!navigator.gpu || !isSecureContext) { fail('静的表示 / WebGPU非対応環境'); return; }
          let acquired = null;
          let phase = 'adapter';
          try {
            const adapter = await navigator.gpu.requestAdapter({ powerPreference: 'low-power' });
            if (dead) return;
            if (!adapter) throw new Error('WebGPU adapter was not available.');
            phase = 'device';
            acquired = await adapter.requestDevice();
            if (dead) { acquired.destroy(); return; }
            const device = acquired;
            gpu = { device, buffer: null, pipeline: null, bindGroup: null };
            device.lost.then(lossInfo => {
              if (!dead && gpu?.device === device) fail('静的表示 / GPU接続が終了しました', lossInfo, 'device-lost');
            });
            on(device, 'uncapturederror', event => {
              if (!dead && gpu?.device === device) fail('静的表示 / GPUエラー', event.error, 'uncaptured-gpu-error');
            });
            phase = 'configure';
            context = canvas.getContext('webgpu');
            if (!context) throw new Error('WebGPU canvas context was not available.');
            device.pushErrorScope('validation');
            const format = navigator.gpu.getPreferredCanvasFormat();
            context.configure({ device, format, alphaMode: 'opaque' });
            phase = 'shader-compilation';
            const module = device.createShaderModule({ label: 'STRATA depth planes WGSL', code: shader });
            const compilationInfo = await module.getCompilationInfo();
            if (dead || gpu?.device !== device) return;
            const shaderErrors = compilationInfo.messages.filter(message => message.type === 'error');
            if (shaderErrors.length) {
              const error = new Error(shaderErrors.map(message => `WGSL ${message.lineNum}:${message.linePos} ${message.message}`).join('\n'));
              error.name = 'StrataShaderCompilationError';
              error.compilationInfo = compilationInfo;
              throw error;
            }
            phase = 'pipeline';
            const pipeline = await device.createRenderPipelineAsync({
              label: 'STRATA depth parallax pipeline',
              layout: 'auto',
              vertex: { module, entryPoint: 'vs' },
              fragment: { module, entryPoint: 'fs', targets: [{ format }] },
              primitive: { topology: 'triangle-list' }
            });
            if (dead || gpu?.device !== device) return;
            phase = 'resources';
            const buffer = device.createBuffer({ label: 'STRATA viewpoint uniforms', size: 32, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
            gpu.buffer = buffer;
            gpu.pipeline = pipeline;
            gpu.bindGroup = device.createBindGroup({ layout: pipeline.getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer } }] });
            const setupError = await device.popErrorScope();
            if (dead || gpu?.device !== device) return;
            if (setupError) throw setupError;
            resize();
            current.travel = target.travel;
            phase = 'first-frame';
            device.pushErrorScope('validation');
            // One validation draw is intentional even when offscreen or the tab is hidden.
            // Subsequent requestAnimationFrame work is strictly visibility-gated.
            draw();
            await device.queue.onSubmittedWorkDone();
            const firstFrameError = await device.popErrorScope();
            if (dead || gpu?.device !== device) return;
            if (firstFrameError) throw firstFrameError;
            ready = true;
            // Atomic visual handoff: CSS has no canvas opacity transition.
            root.dataset.gpu = 'ready';
            fallback.hidden = true;
            syncControls();
            invalidate();
          } catch (error) {
            // A dispose or an earlier device-loss handler may already own teardown.
            if (acquired && gpu?.device !== acquired) {
              acquired.destroy();
              return;
            }
            if (!dead) fail('静的表示 / WebGPUを開始できません', error, phase);
          }
        }
      
        buttons.forEach((button, i) => on(button, 'click', () => { if (i !== selected) select(i); }));
        on(range, 'input', () => {
          if (!motionAllowed()) return;
          target.x = Number(range.value)/100*CONFIG.pointerX;
          target.y = 0;
          invalidate();
        });
        on(canvas, 'pointermove', event => {
          if (!motionAllowed() || !fine.matches || event.pointerType === 'touch') return;
          const rect = canvas.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const x = Math.max(-1, Math.min(1, (event.clientX-rect.left)/rect.width*2-1));
          const y = Math.max(-1, Math.min(1, (event.clientY-rect.top)/rect.height*2-1));
          target.x = x*CONFIG.pointerX;
          target.y = -y*CONFIG.pointerY;
          range.value = String(Math.round(x*100));
          invalidate();
        }, { passive: true });
        on(canvas, 'pointerleave', () => { target.x = 0; target.y = 0; range.value = '0'; invalidate(); });
        on(pauseButton, 'click', () => {
          paused = !paused;
          target.x = 0; target.y = 0; range.value = '0';
          info.classList.remove('is-changing');
          syncControls(); invalidate();
        });
        on(reduced, 'change', () => {
          target.x = 0; target.y = 0; range.value = '0';
          info.classList.remove('is-changing');
          syncControls(); invalidate();
        });
        on(document, 'visibilitychange', () => { if (document.hidden) stopFrame(); else { resize(); invalidate(); } });
        on(window, 'resize', resize, { passive: true });
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(visual);
        const intersectionObserver = new IntersectionObserver(entries => {
          inView = entries[0].isIntersecting;
          if (inView) invalidate(); else stopFrame();
        }, { threshold: 0 });
        intersectionObserver.observe(root);
        const dispose = () => {
          if (dead) return;
          dead = true;
          abort.abort();
          resizeObserver.disconnect();
          intersectionObserver.disconnect();
          fallback.hidden = false;
          root.dataset.gpu = 'fallback';
          releaseGPU();
          info.classList.remove('is-changing');
          failure = '静的表示 / セッション終了';
          syncControls();
          if (root.depthParallaxDispose === dispose) delete root.depthParallaxDispose;
        };
        root.depthParallaxDispose = dispose;
        on(window, 'pagehide', event => { if (event.persisted) stopFrame(); else dispose(); });
        on(window, 'pageshow', () => { resize(); invalidate(); });
        fallback.hidden = false;
        root.dataset.gpu = 'loading';
        range.value = '0';
        select(selected, false);
        syncControls();
        resize();
        initialize();
      }
---

# Day 048 — WebGPUで作る、石の開口を覗く深度パララックスHero

> **Reference study:** [Swell.Interactive — Uni Agency.](https://www.cssdesignawards.com/sites/swell-interactive/44823/) / CSS Design Awards  
> **主軸:** WebGPU / **品質レビュー:** 86/100

CSSDAの掲載情報にある3D・parallax表現から、視点に対する深度別の応答を研究対象にしました。実サイトの具体的なカメラ制御や情報導線は未確認です。海中世界や固有素材を使用せず、生成石質フレームと素材アーカイブUIへ再構成しています。参考の掲載技術はWebGLで、本作のみWebGPUを採用します。

# Day 048 / 365 — WebGPU × Depth Parallax

公開日：2026-11-19

## 参考にした表現

参考はCSS Design Awards掲載の **[Swell.Interactive — Uni Agency.](https://www.cssdesignawards.com/sites/swell-interactive/44823/)**。提供された掲載情報では、2024年1月15日のWebsite of the Dayとして紹介され、3Dの世界観とanimated / parallax / WebGLの分類が示されています。

研究対象は、視点の変化に対して手前・中間・奥の見え方が異なるという**深度応答の原理**です。実サイトのカメラ制御や操作導線を実機で比較分析したものではありません。また、参考に記載されている技術はWebGLであり、WebGPUは本スタディの実装対象です。

海中の造形、ブランド、文章、素材、構図は流用せず、石の開口部を重ねた架空の素材アーカイブ「STRATA / FIELD NOTES」へ再構成しています。

## 完成形

暗い展示空間に、三つの石質フレームを異なる深度で配置します。視点を左右に動かすと開口部の重なりが変わり、深度を選ぶと、輪郭の強調・カメラの前進・HTMLの説明が連動します。

- マウスポインター：鑑賞領域内で小さな視差を発生。
- 視点スライダー：タッチとキーボードでも左右の視点を操作。
- 深度ボタン：表面・重なり・余白の観察対象を選択。
- 視差停止ボタン：横方向の視点を正面へ戻し、以降の補間を停止。

視差停止中でも深度選択は利用でき、カメラの前進位置は即時に切り替わります。GPU非対応時はオリジナルSVGを表示し、深度選択と説明文の更新を維持します。モバイルでは鑑賞領域を上段、編集情報と操作を下段に配置します。

### 今回の修正

WGSLで予約されている識別子`active`を`selectionWeight`へ変更し、輪郭計算側も統一しました。これは静的に特定されたコンパイル阻害要因の修正であり、実機での動作確認完了を意味しません。

GPUへの切り替えはフェードではなく**同一JavaScriptタスク内での即時切り替え**です。初回描画の検証完了後にCanvasを表示し、SVGを隠します。Canvasのopacity遷移を削除したため、SVGだけ先に消えて作品が一時的に薄くなる切り替えを避けています。

## 実装設計

依存ライブラリを使わず、ネイティブWebGPUで実装します。HTMLとCSSを配置し、JavaScriptは`type="module"`で読み込んでください。WebGPUにはHTTPSまたはlocalhostなどのセキュアコンテキストと対応ブラウザが必要です。このコードはページ内の一つの`.daily-stage`を初期化します。

画面全体を覆う三角形を一枚描画し、フラグメント側で透視投影の視線と各深度の面を交差させます。面ごとに位置・大きさ・向きが異なるので、単一の背景画像を平行移動する表現ではありません。

選択インデックスを唯一の状態源とし、明示的なボタン操作で説明と選択輪郭を確定します。連続した視点移動から章を判定しないため、境界付近の往復による本文のちらつきはありません。本文には短い出現アニメーションを設け、モーション低減時と視差停止中には省略します。History APIは使用しません。

### 起動判定と診断

SVGはGPU起動中も表示します。WGSLの`getCompilationInfo()`、パイプライン生成、validation error scope、最初の送信処理を通過した後にGPU表示へ切り替えます。初期化失敗・デバイス喪失・検出可能な描画エラーではSVGへ退避します。

利用者向けの状態文は簡潔に保ち、開発者向けには`console.error`へ元の例外やGPUエラーオブジェクトを出力します。併せてルートから`depth-parallax-error`イベントを発行し、`event.detail.phase`と`event.detail.error`で原因を取得できます。コンパイルエラーには行・列・メッセージと元のコンパイル情報を添付します。この診断経路は外部送信を行いません。

## シェーダー/レンダリング

### 深度を持つ解析的な面

三つの深度帯にローカル座標系を設定します。視線と面の交点をローカル座標へ変換し、楕円半径と角度から開口部を生成します。角度に応じた半径変調で、完全な工業製品ではない削り跡を作ります。

厚みは半径を少しずつ変えた四枚の断面で近似します。実メッシュや物理的に正確なレイトレーシングではなく、制限された視点移動を前提とした2.5D表現です。深度帯を奥から手前へ合成するため、大きな回り込みや面同士の交差を伴う配置には向きません。

### 石質と選択輪郭

ローカル座標のノイズと等高線状の模様を組み合わせ、外部画像を使わずに石質を生成します。内外の縁に擬似的な面取りの明暗を与え、選択中の深度だけに黄緑の細い輪郭線を表示します。

選択判定は`selectionWeight`で保持します。線幅は交差距離と描画解像度に応じて調整しますが、石質模様と輪郭のエイリアシングは対象GPUで確認が必要です。

### 距離による減衰

視線の交差距離に応じて背景色へ近づけ、遠景ほどコントラストを落とします。ポインターによる横移動と、深度選択による前進が、遮蔽関係と距離による見え方を変化させます。

## 実務での使いどころ

- 建材・工芸・素材ブランドのHero。
- 三つの事業領域を深度で示すブランドサイト。
- 展示の前景・中景・背景を観察するオンライン図録。
- 商品構造を段階的に説明するキャンペーン。

情報と操作はHTMLに置き、Canvasの成功に依存させません。実案件では「展示の考え方」のリンク先を詳細ページへ置き換えられます。大きく回り込む商品観察が必要なら、UI状態設計を残し、解析的な断面を実メッシュへ置き換えるのが適切です。

## 調整パラメータ

| パラメータ | 用途 |
| --- | --- |
| `CONFIG.maxDPR` | 描画密度上限。初期値1.5 |
| `CONFIG.maxPixels` | 最大画素数。初期値140万 |
| `CONFIG.dampingMs` | 視点の追従時間。初期値170ms |
| `CONFIG.travelStep` | 深度選択ごとの前進量 |
| `CONFIG.pointerX / pointerY` | 横・縦の視点可動域 |
| WGSLの`axes / center` | 楕円寸法・深度間隔・配置 |
| WGSLの`inner / outer` | 開口率と厚みの近似 |
| WGSLの`fog` | 遠景のコントラスト減衰 |

可動域を広げると断面による近似が目立ちます。視点の最大変位で、手前の開口が奥のフレームを隠しすぎないか確認してください。

## パフォーマンスとアクセシビリティ

通常の描画はオンデマンドです。操作・リサイズ・復帰時に要求し、減衰が収束したらRAFを停止します。画面外と非表示タブでは通常のRAFを停止します。**例外として、初期化時の検証用描画を一度、可視状態にかかわらず実行します。** 起動時のシェーダー生成と検証処理まで可視性で保留する実装ではありません。

最大140万画素で12断面を評価するため、画素数制限があっても軽量とは断定できません。対象端末でGPUフレーム時間を測り、必要なら`maxPixels`を下げてください。

`prefers-reduced-motion`ではポインター視差と補間を無効化し、深度選択だけを即時反映します。ネイティブのボタンとスライダーにフォーカス表示、押下状態、読み上げ用の選択結果を設けます。CanvasとSVGは装飾として読み上げ対象から外し、内容はHTMLで説明します。SVGの`hidden`には`display:none!important`を保証しています。

破棄は`document.querySelector('.daily-stage').depthParallaxDispose()`で行います。RAF、イベント、Observer、GPUBuffer、GPUDevice、Canvas設定を解放します。SPAではDOMを外す直前に呼び出してください。同じルートでの再初期化時も前回のインスタンスを破棄します。

### 未検証項目と確認手順

ブラウザ実行・実機計測は未実施です。本番導入前に次を確認してください。

1. 対象WebGPU環境でWGSLコンパイルとパイプライン生成を確認し、`WEBGPU`表示と有効な視点スライダーを確認する。
2. 開発用コピーでシェーダーに構文エラーを入れ、SVG退避と、コンソールの行・列・元のエラー情報を確認する。
3. GPU準備完了時に、SVGからCanvasへの切り替えで薄暗い中間状態が出ないことを確認する。
4. 視点の最大変位、連続した深度選択、スライダーの矢印キー操作、タッチ操作を確認する。
5. OSのモーション低減設定を表示中に変更し、補間とポインター視差が停止することを確認する。
6. 320px幅、横向き、200%ズームで、文字・フレーム・操作領域の密度と重なりを確認する。
7. 対象GPUでフレーム時間、遠景の判読性、石質と輪郭のエイリアシングを確認する。
8. デバイス喪失時のSVG退避、BFCache復帰、SPAでの破棄と再マウント、読み上げとフォーカスを確認する。

参考：CSS Design Awards — [Swell.Interactive — Uni Agency.](https://www.cssdesignawards.com/sites/swell-interactive/44823/)

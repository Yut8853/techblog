---
title: "Three.jsで作る、煙の境界で素材を切り替えるMaterial Atlas"
description: "二つの生成レリーフを煙状のシェーダーマスクで比較するThree.js製素材アーカイブ。キーボードでの中間位置保持、明示的な確定とキャンセル、Canvasフォールバックまで設計します。"
category: "WebGLスライダー"
categorySlug: "webgl-slider"
categoryDescription: "Three.jsとカスタムシェーダーによって画像の境界を設計し、作品や素材の比較・選択に接続するWebGLスライダー。"
tags:
  - "Three.js"
  - "GLSL"
  - "shader masking"
  - "CanvasTexture"
  - "マテリアル探索"
  - "アクセシビリティ"
  - "Daily Lab"
date: "2026年11月20日"
publishedAt: "2026-11-20"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 49
focus: "Three.js"
concept: "煙を装飾ではなく素材選択の境界として扱うMaterial Atlas。独自生成の彫刻的レリーフを進捗固定のノイズマスクで切り替え、ポインターでは離して確定、キーボードでは比較位置を保持して明示的に確定する。"
referenceTitle: "Mask transition with smoke effect — Gucci Zumi"
referenceUrl: "https://www.awwwards.com/inspiration/mask-transition-with-smoke-effect-gucci-zumi"
referencePlatform: "Awwwards — curated interaction element"
qualityScore: 88
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" aria-labelledby="atlas-title">
        <header class="masthead">
          <div class="wordmark">VEIL<span class="sr-only"> Material Atlas</span></div>
          <div class="edition">Independent material studies<br>049 / 365 — 20 NOV 2026</div>
        </header>
        <div class="atlas-grid">
          <figure>
            <div class="art-window" role="img" aria-label="石灰質の生成レリーフ。編集パネルで素材を比較・選択できます。">
              <div class="fallback" aria-hidden="true">
                <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="1000" height="1000" fill="#c7cec2"/><g transform="translate(500 500) rotate(-24)" fill="none" stroke="#e6e2ca"><ellipse rx="310" ry="260" stroke-width="110"/><ellipse rx="215" ry="175" stroke-width="46"/><ellipse rx="150" ry="118" stroke-width="32"/></g></svg>
              </div>
              <span class="art-label">GENERATIVE RELIEF / PLATE 049</span>
              <span class="art-scale" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
            </div>
            <figcaption><span>Procedural objects. No external imagery.</span><span class="render-mode">STATIC PLATE</span></figcaption>
          </figure>
          <div class="editorial">
            <div class="section-index eyebrow">Field notes / Surface archive</div>
            <h1 id="atlas-title">Between<br>the layers.</h1>
            <p class="intro">輪郭がほどける、その途中へ。<br>二つの素材を、煙の境界で読み替える。</p>
            <div class="material-panels">
              <article class="material-panel is-active" data-panel="0" aria-hidden="false">
                <span class="material-code">01 / MINERAL SERIES</span>
                <h2>Calcareous</h2>
                <p>堆積する白、削られた稜線。石灰質の層を思わせる、静かで乾いたレリーフ。</p>
                <dl class="specs"><div><dt>FINISH</dt><dd>Chalk / matte</dd></div><div><dt>CHARACTER</dt><dd>Soft / stratified</dd></div></dl>
              </article>
              <article class="material-panel" data-panel="1" aria-hidden="true">
                <span class="material-code">02 / FIRED SERIES</span>
                <h2>Ferric</h2>
                <p>熱を抱えた赤、深く落ちる陰影。焼成と酸化を思わせる、密度のあるレリーフ。</p>
                <dl class="specs"><div><dt>FINISH</dt><dd>Oxide / satin</dd></div><div><dt>CHARACTER</dt><dd>Warm / compressed</dd></div></dl>
              </article>
            </div>
            <div class="selectors" role="group" aria-label="素材を直接選択">
              <button type="button" data-select="0" aria-pressed="true" disabled><span class="swatch" aria-hidden="true"></span>01 — Chalk</button>
              <button type="button" data-select="1" aria-pressed="false" disabled><span class="swatch oxide" aria-hidden="true"></span>02 — Oxide</button>
            </div>
            <div class="scrub">
              <div class="scrub-heading"><label for="veil-progress">MOVE THE BOUNDARY</label><output for="veil-progress" class="progress-readout" aria-live="off">000%</output></div>
              <input id="veil-progress" type="range" min="0" max="1000" step="10" value="0" aria-describedby="veil-help" aria-keyshortcuts="Enter Escape" disabled>
              <p id="veil-help" class="scrub-help">ドラッグは離して確定。矢印キーは1%ずつ比較し、位置を保持。Enterで確定、Escapeで最後の選択へ。中央42〜58%での確定は、最後の選択に戻ります。</p>
              <div class="scrub-actions">
                <button type="button" data-action="confirm" disabled>この位置で確定 <span aria-hidden="true">↵</span></button>
                <button type="button" data-action="cancel" disabled>選択に戻す</button>
              </div>
            </div>
            <p class="sr-only" role="status" aria-live="polite" aria-atomic="true"></p>
          </div>
        </div>
        <footer class="atlas-footer micro"><span>Material Atlas — Volume 01</span><span>Shape generated / Surface imagined</span></footer>
      </section>
  - name: styles.css
    language: css
    content: |
      .daily-stage{--paper:#eeeee6;--ink:#232923;--muted:#596354;--line:#c0c7b9;position:relative;max-width:1600px;margin:auto;background:var(--paper);color:var(--ink);font-family:Arial,'Noto Sans JP',sans-serif;padding:26px clamp(18px,4vw,64px) 22px;box-sizing:border-box}.daily-stage *{box-sizing:border-box}.daily-stage [hidden]{display:none!important}.daily-stage button,.daily-stage input{font:inherit}.daily-stage .masthead{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);padding-bottom:20px;gap:20px}.daily-stage .wordmark{font-size:24px;font-weight:700;letter-spacing:.22em}.daily-stage .eyebrow,.daily-stage .edition,.daily-stage .micro{font-size:11px;line-height:1.6;letter-spacing:.12em;text-transform:uppercase}.daily-stage .edition{text-align:right;color:var(--muted)}.daily-stage .atlas-grid{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(300px,.85fr);gap:clamp(24px,4vw,64px);padding:32px 0}.daily-stage figure{margin:0;min-width:0}.daily-stage .art-window{position:relative;isolation:isolate;overflow:hidden;width:100%;height:clamp(460px,55vw,790px);background:#c7cec2}.daily-stage .fallback,.daily-stage .fallback>canvas,.daily-stage .fallback>svg,.daily-stage .gpu-canvas{position:absolute;inset:0;width:100%;height:100%;display:block}.daily-stage .fallback>canvas{object-fit:cover}.daily-stage .gpu-canvas{z-index:1}.daily-stage .art-label{position:absolute;z-index:2;left:20px;top:20px;padding:8px 10px;background:rgba(238,238,230,.9);font-size:11px;letter-spacing:.1em;color:#232923}.daily-stage .art-scale{position:absolute;z-index:2;bottom:18px;right:18px;display:flex;gap:4px;padding:8px;background:rgba(238,238,230,.9)}.daily-stage .art-scale i{display:block;width:20px;height:3px;background:#232923}.daily-stage .art-scale i:nth-child(even){background:#929c8d}.daily-stage figcaption{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 12px;margin-top:12px;color:var(--muted);font-size:11px;line-height:1.6;letter-spacing:.03em}.daily-stage .editorial{display:flex;flex-direction:column;padding:10px 0 0;min-width:0}.daily-stage .section-index{display:flex;align-items:center;gap:12px;color:var(--muted);margin-bottom:28px}.daily-stage .section-index:before{content:'';width:26px;height:1px;background:currentColor;flex:none}.daily-stage h1{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:clamp(48px,5.4vw,84px);line-height:.96;letter-spacing:-.055em;margin:0 0 24px}.daily-stage .intro{font-size:14px;line-height:1.9;max-width:32em;color:var(--muted);margin:0 0 30px}.daily-stage .material-panels{display:grid;border-top:1px solid var(--line);padding-top:24px;margin-top:auto}.daily-stage .material-panel{grid-area:1/1;opacity:0;visibility:hidden;transform:translateY(6px);transition:opacity .24s,transform .24s,visibility .24s}.daily-stage .material-panel.is-active{opacity:1;visibility:visible;transform:none}.daily-stage .material-code{font-size:11px;letter-spacing:.12em;color:var(--muted)}.daily-stage h2{font-family:Georgia,serif;font-size:36px;letter-spacing:-.035em;font-weight:400;margin:10px 0}.daily-stage .material-panel p{font-size:14px;line-height:1.9;margin:0;max-width:31em}.daily-stage .specs{display:flex;flex-wrap:wrap;gap:12px 24px;margin:20px 0 0;font-size:12px;line-height:1.8}.daily-stage .specs dt{color:var(--muted);font-size:11px;letter-spacing:.06em}.daily-stage .specs dd{margin:0}.daily-stage .selectors{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:24px}.daily-stage .selectors button{min-height:48px;text-align:left;background:transparent;border:1px solid var(--line);padding:12px;color:var(--ink);cursor:pointer;display:flex;align-items:center;gap:9px;font-size:13px;transition:background .2s,color .2s}.daily-stage .selectors button[aria-pressed='true']{background:var(--ink);color:var(--paper);border-color:var(--ink)}.daily-stage .swatch{width:13px;height:13px;border-radius:50%;background:#d9d8bd;border:1px solid #ffffff55;flex:none}.daily-stage .swatch.oxide{background:#b95b38}.daily-stage .scrub{border-top:1px solid var(--line);padding-top:20px;margin-top:24px}.daily-stage .scrub-heading{display:flex;justify-content:space-between;align-items:baseline;gap:12px;font-size:12px;letter-spacing:.08em}.daily-stage .progress-readout{font-variant-numeric:tabular-nums;white-space:nowrap}.daily-stage input[type='range']{display:block;width:100%;height:44px;margin:6px 0;appearance:none;-webkit-appearance:none;background:transparent;cursor:ew-resize;accent-color:var(--ink);touch-action:pan-y}.daily-stage input[type='range']::-webkit-slider-runnable-track{height:2px;background:#899780}.daily-stage input[type='range']::-moz-range-track{height:2px;background:#899780}.daily-stage input[type='range']::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:22px;height:22px;border:5px solid var(--paper);outline:1px solid var(--ink);border-radius:50%;background:var(--ink);margin-top:-10px}.daily-stage input[type='range']::-moz-range-thumb{width:12px;height:12px;border:5px solid var(--paper);outline:1px solid var(--ink);border-radius:50%;background:var(--ink)}.daily-stage .scrub-help{font-size:12px;line-height:1.85;color:var(--muted);margin:0}.daily-stage .scrub-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.daily-stage .scrub-actions button{min-height:44px;padding:10px 12px;font-size:13px;line-height:1.5;border:1px solid var(--ink);background:transparent;color:var(--ink);cursor:pointer}.daily-stage .scrub-actions button[data-action='confirm']{background:var(--ink);color:var(--paper)}.daily-stage button:focus-visible,.daily-stage input:focus-visible{outline:2px solid #a84124;outline-offset:5px}.daily-stage button:disabled,.daily-stage input:disabled{opacity:.45;cursor:default}.daily-stage .atlas-footer{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 16px;border-top:1px solid var(--line);padding-top:18px;color:var(--muted)}.daily-stage .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@media(hover:hover){.daily-stage button:not(:disabled):hover{border-color:#a84124}}@media(max-width:760px){.daily-stage{padding-top:18px}.daily-stage .atlas-grid{grid-template-columns:1fr;gap:28px;padding-top:22px}.daily-stage .art-window{height:clamp(340px,110vw,560px)}.daily-stage .editorial{padding:0}.daily-stage .section-index{margin-bottom:18px}.daily-stage h1{font-size:58px}.daily-stage .intro{margin-bottom:24px}.daily-stage .material-panels{margin-top:0}.daily-stage .edition{font-size:11px;letter-spacing:.04em}.daily-stage .selectors button{min-height:50px}}@media(prefers-reduced-motion:reduce){.daily-stage *{transition:none!important}}
  - name: experiment.js
    language: javascript
    content: |
      // ES module. Dependency: three@0.170.0, resolved by the host bundler/import map.
      const root = document.querySelector('.daily-stage');
      if (root) mountAtlas(root);
      
      function mountAtlas(root) {
        root.dailyDestroy?.();
        // Production controls: milliseconds, normalized UV units, capped drawing resolution.
        const CONFIG = { duration: 1100, reducedDuration: 140, feather: 0.065, distortion: 0.027, noiseScale: 3.8, dpr: 1.6, textureSize: 1024, low: 0.42, high: 0.58 };
        const $ = (s) => root.querySelector(s);
        const art = $('.art-window'), fallback = $('.fallback'), range = $('input[type=range]');
        const buttons = [...root.querySelectorAll('[data-select]')];
        const actions = [...root.querySelectorAll('[data-action]')];
        const controls = [...buttons, ...actions, range];
        const panels = [...root.querySelectorAll('[data-panel]')];
        const status = $('[role=status]'), mode = $('.render-mode'), output = $('.progress-readout');
        const media = matchMedia('(prefers-reduced-motion: reduce)');
        const events = new AbortController();
        let dead = false, p = 0, selected = 0, animation = null, raf = 0, gpu = null, bootId = 0;
        let gpuFailed = false, previousTime = 0, activePointer = null;
        const plates = [makePlate(0), makePlate(1)];
        plates.forEach((canvas) => { canvas.setAttribute('aria-hidden', 'true'); fallback.append(canvas); });
        fallback.hidden = false;
        controls.forEach((control) => { control.disabled = false; });
      
        function makePlate(index) {
          const canvas = document.createElement('canvas');
          canvas.width = canvas.height = CONFIG.textureSize;
          const c = canvas.getContext('2d');
          const scale = CONFIG.textureSize / 1000;
          c.scale(scale, scale);
          let seed = index ? 82731 : 41937;
          const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
          const bg = c.createLinearGradient(0, 0, 900, 1000);
          bg.addColorStop(0, index ? '#555048' : '#e0e3d6');
          bg.addColorStop(1, index ? '#242725' : '#a9b6a5');
          c.fillStyle = bg; c.fillRect(0, 0, 1000, 1000);
          c.save(); c.translate(535, 735); c.scale(1, 0.28);
          const shadow = c.createRadialGradient(0, 0, 20, 0, 0, 370);
          shadow.addColorStop(0, '#101c18a8'); shadow.addColorStop(1, '#101c1800');
          c.fillStyle = shadow; c.fillRect(-400, -400, 800, 800); c.restore();
          c.save(); c.translate(index ? 495 : 510, index ? 480 : 475); c.rotate(index ? 0.30 : -0.33);
          const contour = (radius, depth, ox, oy) => {
            c.beginPath();
            for (let j = 0; j <= 160; j++) {
              const a = j / 160 * Math.PI * 2;
              const wave = 1 + 0.035 * Math.sin(a * 3 + depth * 0.08) + 0.018 * Math.cos(a * 7 - depth * 0.1);
              const x = ox + Math.cos(a) * radius * wave;
              const y = oy + Math.sin(a) * radius * (index ? 0.82 : 0.91) * wave;
              j ? c.lineTo(x, y) : c.moveTo(x, y);
            }
            c.closePath();
          };
          // Offset contours and baked shadows form original sculptural reliefs.
          for (let k = 0; k < 30; k++) {
            const r = 335 - k * 8.4;
            const ox = Math.sin(k * 0.12) * (index ? 31 : -25);
            const oy = k * 1.35;
            const light = index ? 61 - k * 0.95 : 89 - k * 1.36;
            const fill = c.createLinearGradient(-250, -290, 240, 310);
            fill.addColorStop(0, `hsl(${index ? 25 : 49} ${index ? 54 : 19}% ${light}%)`);
            fill.addColorStop(0.45, `hsl(${index ? 17 : 51} ${index ? 48 : 17}% ${light - 8}%)`);
            fill.addColorStop(1, `hsl(${index ? 12 : 66} ${index ? 35 : 12}% ${Math.max(12, light - 39)}%)`);
            contour(r, k, ox, oy);
            c.shadowColor = index ? '#1a0e0b99' : '#27312670'; c.shadowBlur = 9; c.shadowOffsetY = 6;
            c.fillStyle = fill; c.fill(); c.shadowBlur = 0; c.shadowOffsetY = 0;
            c.strokeStyle = index ? '#f3bc802e' : '#fff9d74a'; c.lineWidth = 1.3; c.stroke();
          }
          contour(78, 30, Math.sin(3.6) * (index ? 31 : -25), 42);
          c.fillStyle = index ? '#271914' : '#424b3d'; c.fill();
          c.restore();
          // Deterministic grain; generated once per mount, not in the animation loop.
          for (let j = 0; j < 26000; j++) {
            c.fillStyle = random() > 0.5 ? 'rgba(255,250,230,0.055)' : 'rgba(10,20,12,0.045)';
            const size = random() * 1.4 + 0.4;
            c.fillRect(random() * 1000, random() * 1000, size, size);
          }
          return canvas;
        }
      
        function syncProgress() {
          range.value = String(Math.round(p * 1000));
          const percent = Math.round(p * 100);
          const label = `${String(percent).padStart(3, '0')}%`;
          if (output.value !== label) output.value = label;
          // The visual output is aria-live=off; this is the range's value, not a live announcement.
          const valueText = `比較位置 ${percent}パーセント。0はChalk、100はOxide`;
          if (range.getAttribute('aria-valuetext') !== valueText) range.setAttribute('aria-valuetext', valueText);
          plates[1].style.opacity = String(p);
        }
        function commit(index, announce = true) {
          const changed = selected !== index;
          selected = index;
          panels.forEach((panel, i) => {
            panel.classList.toggle('is-active', i === index);
            panel.setAttribute('aria-hidden', String(i !== index));
          });
          buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(i === index)));
          art.setAttribute('aria-label', index ? '選択素材 Ferric。赤銅色の層が重なる生成レリーフ。' : '選択素材 Calcareous。石灰質の層が重なる生成レリーフ。');
          if (changed && announce) status.textContent = `${index ? '02 Ferric' : '01 Calcareous'}を選択しました。`;
        }
        function markComparing() {
          art.setAttribute('aria-label', '素材を比較中。石灰質と赤銅色の生成レリーフを重ねています。確定素材の説明は編集パネルに表示しています。');
        }
        function pauseAnimation() {
          animation = null;
          previousTime = 0;
        }
        function preview(value) {
          pauseAnimation();
          p = Math.max(0, Math.min(1, value));
          markComparing();
          syncProgress();
          schedule();
        }
        function releasePointer() {
          const id = activePointer;
          activePointer = null;
          if (id !== null) {
            try { if (range.hasPointerCapture(id)) range.releasePointerCapture(id); } catch { /* Already released. */ }
          }
        }
        // All explicit completion/cancellation paths share one state decision.
        // Cancel always means the last COMMITTED material, not an intermediate frame.
        function settle(intent, index) {
          if (dead) return;
          releasePointer();
          const destination = intent === 'cancel' ? selected
            : intent === 'select' ? index
            : p > CONFIG.high ? 1 : p < CONFIG.low ? 0 : selected;
          go(destination);
        }
        function schedule() {
          if (!dead && !document.hidden && !raf) raf = requestAnimationFrame(frame);
        }
        function frame(now) {
          raf = 0;
          if (dead) return;
          if (animation) {
            const dt = previousTime ? Math.min(now - previousTime, 50) : 0;
            previousTime = now;
            animation.elapsed += dt;
            const t = Math.min(1, animation.elapsed / animation.duration);
            const eased = media.matches ? t : t * t * (3 - 2 * t);
            p = animation.from + (animation.to - animation.from) * eased;
            if (t === 1) {
              const destination = animation.to;
              p = destination; animation = null; previousTime = 0;
              commit(destination);
            }
          }
          syncProgress();
          drawGPU();
          if (animation) schedule();
        }
        function go(index) {
          if (Math.abs(p - index) < 0.00001) {
            pauseAnimation(); p = index; commit(index); syncProgress(); schedule(); return;
          }
          markComparing();
          animation = { from: p, to: index, elapsed: 0, duration: media.matches ? CONFIG.reducedDuration : CONFIG.duration * Math.max(0.35, Math.abs(index - p)) };
          previousTime = 0;
          schedule();
        }
      
        // INPUT changes only the preview. Deliberately no change -> settle binding:
        // browsers may emit change on EVERY keyboard increment.
        range.addEventListener('input', () => preview(Number(range.value) / 1000), { signal: events.signal });
        range.addEventListener('pointerdown', (event) => {
          if (!event.isPrimary || event.button !== 0 || activePointer !== null) return;
          pauseAnimation();
          activePointer = event.pointerId;
          try { range.setPointerCapture(event.pointerId); } catch { /* Window listeners remain a backup. */ }
        }, { signal: events.signal });
        window.addEventListener('pointerup', (event) => {
          if (event.pointerId === activePointer) settle('confirm');
        }, { signal: events.signal, capture: true });
        window.addEventListener('pointercancel', (event) => {
          if (event.pointerId === activePointer) settle('cancel');
        }, { signal: events.signal, capture: true });
        range.addEventListener('lostpointercapture', (event) => {
          if (event.pointerId === activePointer) settle('cancel');
        }, { signal: events.signal });
        window.addEventListener('blur', () => {
          if (activePointer !== null) settle('cancel');
        }, { signal: events.signal });
        const adjustmentKeys = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown']);
        range.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === 'Escape') {
            event.preventDefault();
            if (!event.repeat) settle(event.key === 'Enter' ? 'confirm' : 'cancel');
          } else if (adjustmentKeys.has(event.key)) {
            // Keep native range semantics, but stop any previous automatic transition.
            releasePointer();
            pauseAnimation();
          }
        }, { signal: events.signal });
        // No keyup/blur snap: keyboard and assistive-technology edits stay at their preview position.
        buttons.forEach((b, i) => b.addEventListener('click', () => settle('select', i), { signal: events.signal }));
        actions.forEach((b) => b.addEventListener('click', () => settle(b.dataset.action), { signal: events.signal }));
      
        const vertexShader = `varying vec2 vUv;
          void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }`;
        const fragmentShader = `
          uniform sampler2D uA; uniform sampler2D uB;
          uniform float uProgress, uAspect, uFeather, uDistortion, uScale;
          varying vec2 vUv;
          float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
          float noise(vec2 p){
            vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
            return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
          }
          float fbm(vec2 p){
            float n=0.0,a=0.5;
            mat2 r=mat2(0.8,-0.6,0.6,0.8);
            for(int i=0;i<4;i++){n+=a*noise(p);p=r*p*2.03+4.7;a*=0.5;}
            return n;
          }
          vec2 cover(vec2 uv){
            vec2 scale=vec2(min(uAspect,1.0),min(1.0/uAspect,1.0));
            return (uv-0.5)*scale+0.5;
          }
          void main(){
            vec2 uv=cover(vUv);
            vec3 color;
            if(uProgress<=0.0){color=texture2D(uA,uv).rgb;}
            else if(uProgress>=1.0){color=texture2D(uB,uv).rgb;}
            else {
              vec2 q=vec2(vUv.x*uAspect,vUv.y)*uScale;
              float phase=uProgress*1.8;
              vec2 warp=vec2(fbm(q+vec2(phase,0.0)),fbm(q+vec2(6.8,-phase)))-0.5;
              float billow=fbm(q+warp*2.8+vec2(-phase,phase*0.3));
              float field=vUv.x*0.8+0.1+(billow-0.45)*0.38+warp.y*0.12;
              float threshold=mix(-0.3,1.3,uProgress);
              float mask=1.0-smoothstep(threshold-uFeather,threshold+uFeather,field);
              float edge=4.0*mask*(1.0-mask);
              vec2 drift=warp*uDistortion*edge*sin(uProgress*3.14159265);
              vec3 a=texture2D(uA,clamp(uv+drift,0.001,0.999)).rgb;
              vec3 b=texture2D(uB,clamp(uv-drift*0.7,0.001,0.999)).rgb;
              color=mix(a,b,mask);
            }
            gl_FragColor=vec4(color,1.0);
            #include <colorspace_fragment>
          }`;
      
        function disposeGPU() {
          if (!gpu) return;
          const g = gpu; gpu = null;
          g.renderer.domElement.removeEventListener('webglcontextlost', g.onLost);
          g.geometry?.dispose(); g.material?.dispose();
          g.textures.forEach((texture) => texture.dispose());
          g.scene?.clear(); g.renderer.dispose(); g.renderer.forceContextLoss();
          g.renderer.domElement.remove();
        }
        function useFallback() {
          fallback.hidden = false;
          mode.textContent = media.matches ? 'REDUCED MOTION / CANVAS' : 'CANVAS / SOFT BLEND';
        }
        function failGPU() {
          gpuFailed = true; ++bootId; disposeGPU(); useFallback(); schedule();
        }
        function resizeGPU() {
          if (!gpu) return;
          const rect = art.getBoundingClientRect();
          const w = Math.max(1, Math.round(rect.width)), h = Math.max(1, Math.round(rect.height));
          gpu.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CONFIG.dpr));
          gpu.renderer.setSize(w, h, false);
          gpu.material.uniforms.uAspect.value = w / h;
        }
        function drawGPU() {
          if (!gpu) return;
          const g = gpu;
          try {
            g.material.uniforms.uProgress.value = p;
            g.renderer.render(g.scene, g.camera);
            if (g.shaderFailed || g.renderer.getContext().isContextLost()) throw new Error('GPU draw unavailable');
            fallback.hidden = true;
            mode.textContent = 'WEBGL / MASK FIELD';
          } catch { failGPU(); }
        }
        async function startGPU() {
          if (dead || media.matches || gpuFailed || gpu) return;
          const id = ++bootId;
          try {
            const THREE = await import('three');
            if (dead || id !== bootId || media.matches) return;
            const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' });
            gpu = { renderer, textures: [], geometry: null, material: null, scene: null, camera: null, shaderFailed: false, onLost: null };
            const g = gpu;
            renderer.outputColorSpace = THREE.SRGBColorSpace;
            renderer.debug.checkShaderErrors = true;
            renderer.debug.onShaderError = () => { g.shaderFailed = true; };
            g.onLost = (event) => { event.preventDefault(); if (!dead && gpu === g) failGPU(); };
            renderer.domElement.addEventListener('webglcontextlost', g.onLost);
            renderer.domElement.className = 'gpu-canvas';
            renderer.domElement.setAttribute('aria-hidden', 'true');
            plates.forEach((canvas) => {
              const texture = new THREE.CanvasTexture(canvas);
              texture.colorSpace = THREE.SRGBColorSpace;
              texture.minFilter = THREE.LinearFilter; texture.magFilter = THREE.LinearFilter;
              texture.generateMipmaps = false;
              g.textures.push(texture);
            });
            g.geometry = new THREE.PlaneGeometry(2, 2);
            g.material = new THREE.ShaderMaterial({
              depthTest: false, depthWrite: false, toneMapped: false,
              uniforms: {
                uA: { value: g.textures[0] }, uB: { value: g.textures[1] },
                uProgress: { value: p }, uAspect: { value: 1 },
                uFeather: { value: CONFIG.feather }, uDistortion: { value: CONFIG.distortion }, uScale: { value: CONFIG.noiseScale }
              }, vertexShader, fragmentShader
            });
            g.scene = new THREE.Scene();
            g.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
            g.camera.position.z = 1;
            const mesh = new THREE.Mesh(g.geometry, g.material); mesh.frustumCulled = false;
            g.scene.add(mesh);
            art.append(renderer.domElement);
            resizeGPU(); drawGPU();
          } catch {
            if (!dead && id === bootId) failGPU();
          }
        }
        const resize = () => {
          if (dead) return;
          try { resizeGPU(); } catch { failGPU(); }
          schedule();
        };
        const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
        observer?.observe(art);
        window.addEventListener('resize', resize, { signal: events.signal, passive: true });
        const onMotionChange = () => {
          ++bootId;
          if (media.matches) {
            disposeGPU(); useFallback();
            if (animation) go(animation.to);
          } else { useFallback(); startGPU(); }
          schedule();
        };
        media.addEventListener('change', onMotionChange);
        document.addEventListener('visibilitychange', () => {
          previousTime = 0;
          if (document.hidden) {
            if (activePointer !== null) settle('cancel');
            cancelAnimationFrame(raf); raf = 0;
          } else schedule();
        }, { signal: events.signal });
        window.addEventListener('pagehide', (event) => {
          if (!event.persisted) destroy();
          else {
            if (activePointer !== null) settle('cancel');
            cancelAnimationFrame(raf); raf = 0; previousTime = 0;
          }
        }, { signal: events.signal });
        window.addEventListener('pageshow', () => schedule(), { signal: events.signal });
        function destroy() {
          if (dead) return;
          dead = true; ++bootId; cancelAnimationFrame(raf); raf = 0; animation = null;
          events.abort(); releasePointer(); observer?.disconnect(); media.removeEventListener('change', onMotionChange);
          disposeGPU();
          // Restore the surviving static SVG and its matching editorial state.
          p = 0; commit(0, false); syncProgress(); status.textContent = '';
          plates.forEach((canvas) => { canvas.remove(); canvas.width = canvas.height = 1; });
          fallback.hidden = false; mode.textContent = 'STATIC PLATE';
          controls.forEach((control) => { control.disabled = true; });
          if (root.dailyDestroy === destroy) delete root.dailyDestroy;
        }
        root.dailyDestroy = destroy;
        status.textContent = '';
        commit(0, false); syncProgress(); useFallback(); startGPU();
      }
      
---

# Day 049 — Three.jsで作る、煙の境界で素材を切り替えるMaterial Atlas

> **Reference study:** [Mask transition with smoke effect — Gucci Zumi](https://www.awwwards.com/inspiration/mask-transition-with-smoke-effect-gucci-zumi) / Awwwards — curated interaction element  
> **主軸:** Three.js / **品質レビュー:** 88/100

不規則で柔らかな煙状境界による画像切り替えを参照。原作の素材や構図は使用せず、生成レリーフと編集パネルを備えた素材比較UIへ再構成した。煙の位相を進捗に固定し、キーボードでは比較位置を保持する。Three.js実装は独自設計で、原作のソース解析結果ではない。

# Three.jsで作る、煙の境界で素材を切り替えるMaterial Atlas

2026-11-20公開 · Day 049 / 365

## 参考にした表現

参考は、Awwwardsのキュレーション要素 [Mask transition with smoke effect — Gucci Zumi](https://www.awwwards.com/inspiration/mask-transition-with-smoke-effect-gucci-zumi)。画面全体を薄くするのではなく、不規則で柔らかな境界が画像を切り替える原理を研究対象にしています。

提供された参考情報では、元プロジェクトの技術表記はPixiJS／WebGL／GLSLです。本作はThree.jsによる独自の再解釈であり、原作のソースコードを解析したものではありません。ブランド、商品、イラスト、原文コピー、固有のレイアウトは使用していません。

## 完成形

架空の素材アーカイブ「VEIL / Material Atlas」。石灰質と赤銅色の彫刻的レリーフをCanvasで生成し、左に作品、右に素材の説明と操作を置きます。モバイルでは作品、説明、操作の順に積みます。

**編集パネル内のスライダー**で、煙の境界を途中まで動かして比較できます。確定済みの素材と探索中の進捗は別の状態です。探索中に本文は切り替わらず、確定アニメーションが端点に到達してから本文と選択状態を更新します。

### 操作の仕様

- **ポインター／タッチ：** スライダーを動かして比較し、離すと確定します。42〜58%のデッドバンド内では、最後に確定した素材へ戻ります。
- **キーボード：** 矢印キーで1%ずつ比較します。キーを離しても中間位置を保持します。Enterまたは「この位置で確定」で端点へ移動します。Home／Endも標準rangeの操作として使用できます。
- **キャンセル：** スライダー上のEscape、または「選択に戻す」で、最後に確定した素材へ戻ります。遷移の途中を新しい確定状態にはしません。
- **素材ボタン：** 指定した素材へ直接移動します。移動中でも別の素材を選び直せます。
- **タッチの縦スクロールなどによるpointercancel：** その探索を取り消し、最後に確定した素材へ戻します。

スライダーからTabで移動しても比較位置を保持します。フォーカス移動を素材選択として扱わないため、確定ボタンへ移動してから実行できます。

## 実装設計

### 依存関係と配置

このコードは **Three.js 0.170.0（r170）** を対象にします。Viteなど、bare importを解決できる既存のビルド環境で次のように固定してください。

```sh
npm install --save-exact three@0.170.0
```

`package.json`の該当部分は次の形です。

```json
{
  "dependencies": {
    "three": "0.170.0"
  }
}
```

HTMLをページへ、CSSをスタイルシートへ、JavaScriptを`atlas.js`へ配置し、HTMLの後から`<script type="module" src="/src/atlas.js"></script>`で読み込みます。このパスはVite構成の例です。ビルドを使わない配信では、別途import mapによる`three`の解決が必要です。依存の更新時は、色空間チャンクとシェーダー診断を再確認してください。

### 入力と確定を分ける

`input`は進捗の更新だけを担当します。`change`には確定処理を登録しません。ブラウザによって矢印キーの各ステップで`change`が発火しても、比較位置を端点へ戻さない構成です。

ポインター終了、Enter、明示的な確定、キャンセル、素材ボタンは、共通の`settle()`に集約します。`selected`は最後に確定した素材、`p`は探索中を含む表示進捗です。`selected`を更新するのは端点到達時だけです。

pointer captureとpointer IDで、一つの操作の開始・終了を対応させます。キャンセル、予期しないcapture喪失、操作中のウィンドウ非アクティブ化では、最後の確定素材へ戻します。縦スクロールを妨げる`preventDefault()`はポインター操作に使用していません。

### 表示と寿命

Canvas画像は同期生成してからCanvasTextureへ渡すため、外部画像のロード待ちはありません。GPUの初回描画が成立するまでは生成Canvasを表示し、import失敗、シェーダー診断エラー、コンテキスト喪失時も同じ進捗のCanvasへ退避します。

History APIは使用しません。比較・確定操作はブラウザ履歴を増やさず、戻る操作を占有しません。

## シェーダー/レンダリング

全面を覆うPlaneGeometryに2枚のCanvasTextureを渡します。FBMでノイズ座標を歪ませ、別のFBMを重ねて方向性のあるスカラーフィールドを生成。進捗を閾値へ変換し、`smoothstep`で柔らかなマスクを作ります。

`4m(1-m)`を使い、UV変位を境界付近だけに限定します。静止している領域は揺らさず、新しい素材が露出する場所だけが流れる設計です。進捗0と1は明示的に分岐し、変位なしの元画像を返します。

煙の位相は時間ではなく進捗に結びつけます。同じ位置なら同じ境界を再現でき、逆操作でも不連続に飛びません。キーボードで比較位置を保持したときも、煙だけが勝手に動き続けることはありません。

正方形画像を`cover`で表示し、Canvas側は`object-fit: cover`で対応します。CanvasTextureにはsRGBを指定し、シェーダー出力にも色空間変換を適用します。実際の端点色一致は導入先ブラウザで確認してください。

## 実務での使いどころ

素材メーカーの仕上げ比較、建築スタジオの作品Hero、ブランドサイトの季節切り替え、アートディレクションのBefore／Afterに向いています。画像を切り替える演出が、そのまま素材を選ぶUIになります。

実画像へ置き換える場合は、両画像のdecode完了を待ち、画像ごとのアスペクト比をuniformへ渡してください。今回の生成画像は同じ正方形なので、共通のcover処理を使っています。細部の厳密な比較が目的なら、煙状マスクだけでなく通常の分割比較も併設するのが適切です。

## 調整パラメータ

| パラメータ | 初期値 | 用途 |
| --- | --- | --- |
| `duration` | 1100ms | 通常の確定遷移 |
| `reducedDuration` | 140ms | reduced-motion時の短いクロスフェード |
| `feather` | 0.065 | 境界の柔らかさ |
| `distortion` | 0.027 | 境界付近のUV変位 |
| `noiseScale` | 3.8 | 煙の粒度 |
| `dpr` | 最大1.6 | 描画解像度の上限 |
| `textureSize` | 1024 | 生成画像の一辺 |
| `low / high` | 0.42 / 0.58 | 確定時のデッドバンド |
| rangeの`step` | 10 / 1000 | キーボードの1%刻み |

大きく見せたい場合でも、まず`distortion`ではなく`noiseScale`と`feather`から調整します。変位を増やしすぎると、素材を読むためのUIから画像を歪める演出へ目的が変わってしまいます。

## パフォーマンスとアクセシビリティ

通常は操作・遷移・リサイズ時だけ描画し、非表示タブではRAFを停止します。ただし、**1メッシュだから軽いとは限りません**。遷移中は各フラグメントで4オクターブのFBMを3回評価します。高DPRの広い表示領域ではフィルレートが支配的になり得ます。また、2枚のCanvas生成はメインスレッドで同期実行するため、初期化時間も計測対象です。

`prefers-reduced-motion`ではGPU演出を使わず、Canvasの短いクロスフェードへ変更します。設定変更も監視します。キーボード探索ではCanvasの混合位置も保持できます。

進捗の視覚表示である`output`には`aria-live="off"`を設定します。探索値はrangeの`aria-valuetext`、確定結果は専用ライブリージョンで伝えます。進捗表示を毎フレーム更新することと、確定結果を通知することを分離しています。実際の読み上げ挙動は支援技術との組み合わせで確認してください。

本文は14px、操作ラベルは13pxを基本にし、細かな管理情報は11〜12pxとしています。フォーカスリングを維持し、ボタン・スライダーの操作領域は44px以上確保します。

SPAで撤去するときは、ルート要素の`dailyDestroy()`を呼び出してください。再実行時も先に既存インスタンスを破棄します。RAF、イベント、ResizeObserver、Geometry、Material、Texture、Renderer、生成Canvasを解放し、静的SVGと初期の本文へ戻します。

### 未検証項目と確認手順

この回答内ではブラウザ・実機・性能の実測は行っていません。導入時は以下を確認してください。

1. Chrome、Safari、Firefoxでシェーダーのコンパイル、端点の色、Canvasとのcover位置を確認する。
2. 矢印キーをゆっくり繰り返し、キーを離しても中間位置を保持することを確認する。Enterで確定し、Escapeで最後の確定素材へ戻ることも確認する。
3. Tabでスライダーから確定ボタンへ移動しても、比較位置が変わらないことを確認する。
4. 実機タッチでドラッグの追従、縦スクロール、pointercancel後の復帰を確認する。320px幅と760px前後では組版と文字の読みやすさも確認する。
5. 素材ボタンの連打、遷移中の逆操作、途中キャンセルで、最終画像・本文・`aria-pressed`が一致することを確認する。
6. NVDAやVoiceOverで、進捗の視覚表示が継続的な通知を発生させず、rangeの値と確定通知を区別できることを確認する。
7. reduced-motionを実行中に変更し、GPUとCanvasが重複表示されないことを確認する。
8. import失敗とコンテキスト喪失を再現し、Canvasで比較・確定操作を続けられることを確認する。
9. 初期Canvas生成時間とモバイルのフレーム時間を計測する。必要に応じてDPR、画像解像度、FBMのオクターブ数を下げる。
10. 再マウントと破棄を繰り返し、イベントとGPUリソースが増加しないことを確認する。

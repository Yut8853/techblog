---
title: "Three.jsで作る、造形を採集する無限ギャラリー"
description: "生成版画を探索するThree.js無限ギャラリー。CSS px基準の登場変位、論理セルに固定したメッシュ割り当て、再マウント可能なサムネイル管理で、登場中も途切れない探索を設計します。"
category: "Three.js無限ギャラリー"
categorySlug: "threejs-infinite-gallery"
categoryDescription: "有限のThree.jsメッシュを論理セルへ割り当て、終わりのない作品探索とアクセシブルなHTML索引を一体化するギャラリー表現。"
tags:
  - "Three.js"
  - "Infinite Gallery"
  - "GLSL"
  - "CanvasTexture"
  - "ドラッグ"
  - "アクセシビリティ"
  - "Daily Lab"
date: "2026年11月24日"
publishedAt: "2026-11-24"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 53
focus: "Three.js"
concept: "紙の粒子と異なる輪郭を持つ六つの生成版画を、深緑の無限フィールドで採集する作品索引。論理セルに固定したメッシュ割り当てと登場時間により、リビール中も探索を中断せず、HTMLの選択状態と結びます。"
referenceTitle: "Loading infinite grid — Half of Eight"
referenceUrl: "https://www.awwwards.com/inspiration/loading-infinite-grid-half-of-eight"
referencePlatform: "Awwwards Elements"
qualityScore: 88
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" aria-labelledby="fg-title">
        <header class="fg-top"><span>FIELDNOTES / VISUAL INDEX</span><span>053 — 365 / 2026.11.24</span></header>
        <div class="fg-heading">
          <h1 id="fg-title">Off the<span>finite.</span></h1>
          <p class="fg-intro">終わりのない、造形の採集。<br>輪郭と余白を、好きな方向へ辿る。<small>6 ORIGINAL STUDIES / REPEATING FIELD</small></p>
        </div>
        <div class="fg-field" tabindex="0" role="region" aria-label="無限作品フィールド" aria-describedby="fg-help" hidden>
          <span class="fg-corner" aria-hidden="true">OPEN FIELD / DRAG TO EXPLORE</span>
          <span class="fg-cross" aria-hidden="true"></span>
        </div>
        <div class="fg-toolbar">
          <p class="fg-help" id="fg-help">静的一覧：作品ボタンで詳細を選択できます。</p>
          <div class="fg-tools" role="group" aria-label="フィールドの移動" hidden>
            <button type="button" data-move="left" aria-label="左へ探索">←</button><button type="button" data-move="up" aria-label="上へ探索">↑</button><button type="button" data-move="down" aria-label="下へ探索">↓</button><button type="button" data-move="right" aria-label="右へ探索">→</button><button type="button" data-move="home" aria-label="原点へ戻る">原点</button>
          </div>
        </div>
        <div class="fg-bottom">
          <article class="fg-detail" aria-labelledby="fg-work-title"><p class="fg-kicker">SELECTED STUDY / <span class="fg-number">01</span></p><h2 id="fg-work-title">Orbital sediment</h2><p class="fg-description">繰り返す楕円が沈殿し、一つの輪郭をつくる。苔色の紙に記録した軌道の習作。</p></article>
          <ol class="fg-index" aria-label="全六作品の索引">
            <li><button type="button" data-work="0" aria-pressed="true"><span class="fg-thumb" aria-hidden="true"></span>01 / Orbital sediment</button></li>
            <li><button type="button" data-work="1" aria-pressed="false"><span class="fg-thumb" aria-hidden="true"></span>02 / Soft monument</button></li>
            <li><button type="button" data-work="2" aria-pressed="false"><span class="fg-thumb" aria-hidden="true"></span>03 / Tidal notation</button></li>
            <li><button type="button" data-work="3" aria-pressed="false"><span class="fg-thumb" aria-hidden="true"></span>04 / Hollow interval</button></li>
            <li><button type="button" data-work="4" aria-pressed="false"><span class="fg-thumb" aria-hidden="true"></span>05 / Copper weather</button></li>
            <li><button type="button" data-work="5" aria-pressed="false"><span class="fg-thumb" aria-hidden="true"></span>06 / Quiet register</button></li>
          </ol>
        </div>
        <p class="fg-sr fg-live" aria-live="polite" aria-atomic="true"></p>
        <footer class="fg-footer"><span>PROCEDURAL PRINTS — NO EXTERNAL IMAGES</span><span>FINITE WORKS. INFINITE ARRANGEMENT.</span></footer>
      </section>
  - name: styles.css
    language: css
    content: |
      .daily-stage{--paper:#eeeadd;--ink:#20362f;--acid:#dae897;--line:rgba(32,54,47,.24);color:var(--ink);background:var(--paper);font-family:Arial,'Noto Sans JP',sans-serif;padding:24px clamp(16px,4vw,64px) 30px;box-sizing:border-box}.daily-stage *{box-sizing:border-box}.daily-stage [hidden]{display:none!important}.daily-stage button{font:inherit;color:inherit}.daily-stage button:focus-visible,.daily-stage [tabindex]:focus-visible{outline:3px solid #b86a36;outline-offset:4px}.daily-stage .fg-top{display:flex;justify-content:space-between;gap:16px;border-bottom:1px solid var(--line);padding-bottom:17px;font-size:10px;font-weight:700;letter-spacing:.13em}.daily-stage .fg-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:30px;padding:28px 0}.daily-stage h1{font-size:clamp(56px,8.8vw,126px);line-height:.83;letter-spacing:-.075em;font-weight:500;margin:0}.daily-stage h1 span{display:block;margin-left:11vw}.daily-stage .fg-intro{max-width:260px;margin:0 0 3px;font-size:12px;line-height:1.9}.daily-stage .fg-intro small{display:block;margin-top:14px;font-size:10px;letter-spacing:.1em}.daily-stage .fg-field{height:clamp(380px,57vw,630px);position:relative;overflow:hidden;background:#20362f;isolation:isolate;touch-action:pan-y pinch-zoom;cursor:grab;user-select:none}.daily-stage .fg-field.is-dragging{cursor:grabbing}.daily-stage .fg-field canvas{position:absolute;inset:0;width:100%;height:100%;display:block}.daily-stage .fg-corner{position:absolute;z-index:1;pointer-events:none;color:#e9eed7;font-size:10px;letter-spacing:.12em;top:18px;left:18px;background:#20362fe0;padding:7px 9px}.daily-stage .fg-cross{position:absolute;left:50%;top:50%;width:16px;height:16px;transform:translate(-50%,-50%);pointer-events:none;opacity:.7;z-index:1}.daily-stage .fg-cross:before,.daily-stage .fg-cross:after{content:'';position:absolute;background:var(--acid)}.daily-stage .fg-cross:before{left:7px;top:0;width:1px;height:16px}.daily-stage .fg-cross:after{left:0;top:7px;height:1px;width:16px}.daily-stage .fg-toolbar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:13px 0;border-bottom:1px solid var(--line)}.daily-stage .fg-help{font-size:11px;margin:0;line-height:1.7}.daily-stage .fg-tools{display:flex;gap:6px;flex-shrink:0}.daily-stage .fg-tools button{border:1px solid var(--line);background:transparent;min-width:44px;height:44px;padding:0 10px;cursor:pointer}.daily-stage .fg-tools button:hover{background:var(--ink);color:var(--paper)}.daily-stage .fg-bottom{display:grid;grid-template-columns:1fr 1fr;gap:32px;padding-top:24px}.daily-stage .fg-detail{align-self:start}.daily-stage .fg-kicker{font-size:10px;letter-spacing:.16em;margin:0 0 14px}.daily-stage h2{font-weight:500;letter-spacing:-.04em;font-size:clamp(27px,3vw,42px);margin:0 0 10px}.daily-stage .fg-description{font-size:12px;line-height:1.9;max-width:440px;margin:0}.daily-stage .fg-index{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.daily-stage .fg-index button{width:100%;height:100%;text-align:left;border:1px solid var(--line);padding:8px;background:transparent;cursor:pointer;font-size:10px;line-height:1.5;min-height:44px}.daily-stage .fg-index button[aria-pressed=true]{background:var(--ink);color:var(--paper);border-color:var(--ink)}.daily-stage .fg-index button:hover{border-color:var(--ink)}.daily-stage .fg-thumb{display:block;position:relative;aspect-ratio:4/5;overflow:hidden;margin-bottom:9px;background:#c4c1a6}.daily-stage .fg-thumb:before{content:'';position:absolute;inset:16% 12%;border:20px double #345044;border-radius:48% 48% 22% 22%;transform:rotate(-23deg);box-shadow:8px 11px 0 #ad633e}.daily-stage .fg-index li:nth-child(2n) .fg-thumb{background:#dec5ad}.daily-stage .fg-index li:nth-child(3n) .fg-thumb{background:#a5b3b6}.daily-stage .fg-thumb canvas{position:absolute;inset:0;width:100%;height:100%;display:block}.daily-stage.is-gpu .fg-thumb{display:none}.daily-stage.is-gpu .fg-index button{padding:12px 9px}.daily-stage .fg-footer{display:flex;justify-content:space-between;gap:20px;font-size:9px;letter-spacing:.11em;margin-top:28px;color:#55665b}.daily-stage .fg-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}@media(max-width:680px){.daily-stage{padding-top:18px}.daily-stage .fg-top{font-size:8px;letter-spacing:.08em}.daily-stage .fg-heading{display:block;padding:26px 0 23px}.daily-stage h1 span{margin-left:15vw}.daily-stage .fg-intro{margin:22px 0 0;max-width:none;font-size:11px}.daily-stage .fg-intro small{margin-top:6px}.daily-stage .fg-field{height:440px}.daily-stage .fg-toolbar{align-items:flex-start;flex-direction:column;gap:10px}.daily-stage .fg-tools{width:100%}.daily-stage .fg-tools button{flex:1}.daily-stage .fg-bottom{grid-template-columns:1fr;gap:22px}.daily-stage .fg-index{gap:7px}.daily-stage .fg-footer{font-size:8px}}@media(prefers-reduced-motion:reduce){.daily-stage *{scroll-behavior:auto!important}}
  - name: experiment.js
    language: javascript
    content: |
      import * as THREE from 'three';
      
      export function mountInfiniteGallery(root) {
        if (!root) return () => {};
        // One live instance per root. The previous instance keeps only its static prints.
        root.dispatchEvent(new Event('daily:destroy'));
      
        // Distances: CSS px. Durations: seconds. Texture coordinates: 384 × 480 design units.
        const CONFIG = {
          dpr: 1.6, follow: 10, intro: 0.9, stagger: 0.055, maxDelay: 0.45,
          liftPx: 22, bend: 0.012, maxBendPx: 10, gap: 28, overscan: 4,
          textureWidth: 384, textureHeight: 480
        };
        const works = [
          ['Orbital sediment', '繰り返す楕円が沈殿し、一つの輪郭をつくる。苔色の紙に記録した軌道の習作。'],
          ['Soft monument', '段状の層を積み上げた、小さな記念碑。重さと浮遊の間にある形を探る。'],
          ['Tidal notation', '引いては戻る線を、青灰色の面に刻む。潮の時間を図形へ置き換えた記譜。'],
          ['Hollow interval', '空洞を中心に、輪郭だけを重ねる。描かれていない場所を観察するための習作。'],
          ['Copper weather', '銅色の面に放射する、風の通り道。線の密度が光の方向を示す。'],
          ['Quiet register', '淡い紙と深い影の対話。矩形の微細なずれを保存した、静かな造形の記録。']
        ];
        const field = root.querySelector('.fg-field');
        const tools = root.querySelector('.fg-tools');
        const help = root.querySelector('.fg-help');
        const buttons = [...root.querySelectorAll('[data-work]')];
        const title = root.querySelector('#fg-work-title');
        const description = root.querySelector('.fg-description');
        const number = root.querySelector('.fg-number');
        const live = root.querySelector('.fg-live');
        const detail = root.querySelector('.fg-detail');
        const motion = matchMedia('(prefers-reduced-motion: reduce)');
        const events = new AbortController();
        const on = (el, type, fn, options = {}) => el.addEventListener(type, fn, { ...options, signal: events.signal });
        const mod = (a, b) => ((a % b) + b) % b;
        let disposed = false, renderer = null, scene = null, camera = null, geometry = null;
        let textures = [], tiles = [], gpuEvents = null, raf = 0, animation = null;
        let selected = Math.max(0, buttons.findIndex(b => b.getAttribute('aria-pressed') === 'true'));
        let width = 1, height = 1, cardW = 1, cardH = 1, stepX = 1, stepY = 1, cols = 0, rows = 0;
        let lastTime = 0, introStart = 0, introC = 0, introR = 0;
        let suspended = false, dragging = null, resizePending = false, shaderFailed = false, artworkOK = true;
        const current = { x: 0, y: 0 }, target = { x: 0, y: 0 };
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
      
        // DOM owns exactly one print canvas per thumbnail. GPU textures merely reference it.
        const artwork = works.map((_, id) => {
          const holder = buttons[id].querySelector('.fg-thumb');
          const canvas = holder.querySelector('canvas[data-fg-print]') || document.createElement('canvas');
          canvas.dataset.fgPrint = String(id);
          canvas.setAttribute('aria-hidden', 'true');
          makePrint(canvas, id);
          holder.replaceChildren(canvas);
          return canvas;
        });
      
        function makePrint(canvas, id) {
          canvas.width = CONFIG.textureWidth;
          canvas.height = CONFIG.textureHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) { artworkOK = false; return; }
          // Reset by width/height assignment, then map the entire design to the chosen resolution.
          ctx.setTransform(canvas.width / 384, 0, 0, canvas.height / 480, 0, 0);
          const palettes = [
            ['#c5c7ac','#243e34','#b56843'], ['#dfc1a6','#6a4035','#ede3c9'],
            ['#a7b9bb','#293c50','#d4dbb8'], ['#e6dfc4','#394b3e','#b5815c'],
            ['#ae6548','#392f2c','#e3b87e'], ['#d3d0c5','#3e4846','#a9ad78']
          ];
          const [paper, ink, accent] = palettes[id];
          ctx.fillStyle = paper; ctx.fillRect(0, 0, 384, 480);
          let seed = 103 + id * 721;
          const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
          ctx.fillStyle = ink;
          for (let n = 0; n < 2600; n++) {
            ctx.globalAlpha = random() * 0.13;
            ctx.fillRect(random() * 384, random() * 480, 1, 1);
          }
          ctx.globalAlpha = 0.18; ctx.strokeStyle = ink; ctx.lineWidth = 0.6;
          for (let x = 24; x < 384; x += 28) {
            ctx.beginPath(); ctx.moveTo(x, 45); ctx.lineTo(x, 420); ctx.stroke();
          }
          ctx.globalAlpha = 1;
          ctx.save(); ctx.translate(192, 232);
          ctx.strokeStyle = ink; ctx.lineWidth = 1.3;
          if (id === 0) {
            ctx.rotate(-0.34);
            ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(76, -95, 37, 0, Math.PI * 2); ctx.fill();
            for (let j = 75; j >= 0; j--) {
              const t = j / 75;
              ctx.beginPath();
              ctx.ellipse(Math.sin(t * 3.8) * 21, (t - 0.5) * 119, 54 + Math.sin(t * Math.PI) * 63, 29 + Math.sin(t * Math.PI) * 26, 0, 0, Math.PI * 2);
              ctx.fillStyle = j % 3 === 0 ? accent : paper; ctx.fill(); ctx.stroke();
            }
          } else if (id === 1) {
            ctx.rotate(-0.12);
            for (let j = 0; j < 33; j++) {
              const w = 72 + j * 4.2, y = -132 + j * 7.2;
              ctx.beginPath(); ctx.moveTo(-w / 2, y); ctx.lineTo(w / 2, y - 17);
              ctx.lineTo(w / 2 + 18, y + 13); ctx.lineTo(-w / 2 + 18, y + 30); ctx.closePath();
              ctx.fillStyle = j % 4 === 0 ? accent : paper; ctx.fill(); ctx.stroke();
            }
          } else if (id === 2) {
            ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(57, -66, 78, 0, Math.PI * 2); ctx.fill();
            for (let j = 0; j < 57; j++) {
              ctx.beginPath();
              for (let k = 0; k <= 60; k++) {
                const x = -140 + k * 4.6;
                const y = -110 + j * 4.3 + Math.sin(k * 0.10 + j * 0.055) * 23 + Math.sin(k * 0.22) * 7;
                if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
              }
              ctx.stroke();
            }
          } else if (id === 3) {
            ctx.rotate(0.31);
            ctx.fillStyle = accent; ctx.fillRect(-106, 66, 210, 38);
            for (let j = 0; j < 43; j++) {
              ctx.beginPath(); ctx.ellipse(0, 0, 47 + j * 1.65, 65 + j * 2.1, 0, 0, Math.PI * 2); ctx.stroke();
            }
          } else if (id === 4) {
            ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(-49, 51, 62, 0, Math.PI * 2); ctx.fill();
            for (let j = 0; j < 85; j++) {
              const a = -2.75 + j / 84 * 3.75;
              const length = 139 + Math.sin(j * 0.08) * 24;
              ctx.beginPath(); ctx.moveTo(-29 + Math.cos(a) * 32, 42 + Math.sin(a) * 32);
              ctx.quadraticCurveTo(Math.cos(a) * length * 0.7, Math.sin(a) * length * 0.65, Math.cos(a) * length, Math.sin(a) * length);
              ctx.stroke();
            }
          } else {
            ctx.rotate(-0.17);
            for (let j = 0; j < 13; j++) {
              const x = -96 + Math.sin(j * 0.8) * 19, y = -127 + j * 19;
              ctx.fillStyle = j % 3 === 0 ? accent : paper;
              ctx.fillRect(x, y, 181, 32); ctx.strokeRect(x, y, 181, 32);
              for (let k = 1; k < 5; k++) {
                ctx.beginPath(); ctx.moveTo(x, y + k * 5); ctx.lineTo(x + 181, y + k * 5); ctx.stroke();
              }
            }
          }
          ctx.restore();
          ctx.strokeStyle = ink; ctx.lineWidth = 0.7;
          ctx.beginPath(); ctx.moveTo(24, 433); ctx.lineTo(360, 433); ctx.stroke();
          ctx.fillStyle = ink; ctx.font = '10px monospace';
          ctx.fillText('FIG. ' + String(id + 1).padStart(2, '0') + ' / FIELD STUDY', 24, 24);
          ctx.font = '9px monospace'; ctx.fillText('GENERATED PRINT / 2026', 24, 452);
          for (let i = 0; i < 13; i++) ctx.fillRect(295 + i * 5, 445, 1, i % 3 === 0 ? 10 : 5);
        }
      
        const vertex = `
          varying vec2 vUv;
          uniform float uReveal;
          uniform float uLiftPx;
          uniform float uCardHeight;
          uniform vec2 uVelocity;
          void main(){
            vUv = uv;
            vec3 p = position;
            p.xy *= mix(0.90, 1.0, uReveal);
            // Geometry is 1 × 1. Divide CSS pixels BEFORE mesh.scale is applied.
            p.y += (1.0-uReveal) * uLiftPx / uCardHeight;
            float arch = sin(uv.x*3.14159265)*sin(uv.y*3.14159265);
            p.xy += uVelocity*arch;
            gl_Position = projectionMatrix*modelViewMatrix*vec4(p,1.0);
          }`;
        const fragment = `
          uniform sampler2D uMap;
          uniform float uReveal;
          uniform float uSelected;
          varying vec2 vUv;
          void main(){
            vec4 color = texture2D(uMap, vUv);
            float edge = min(min(vUv.x,1.0-vUv.x),min(vUv.y,1.0-vUv.y));
            float border = 1.0-smoothstep(0.009,0.014,edge);
            color.rgb = mix(color.rgb, vec3(0.70,0.82,0.34), border*uSelected);
            float mask = 1.0-smoothstep(uReveal*1.3-0.3,uReveal*1.3,vUv.y);
            gl_FragColor = vec4(color.rgb, mask*uReveal);
            #include <colorspace_fragment>
          }`;
      
        function select(id, announce = true) {
          const changed = id !== selected;
          selected = id;
          buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(i === id)));
          title.textContent = works[id][0]; description.textContent = works[id][1];
          number.textContent = String(id + 1).padStart(2, '0');
          if (announce) live.textContent = `${id + 1} / 6、${works[id][0]}を選択`;
          animation?.cancel(); animation = null;
          if (changed && !motion.matches && detail.animate) {
            animation = detail.animate([
              { opacity: 0.4, transform: 'translateY(5px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ], { duration: 230, easing: 'ease-out' });
          }
          wake();
        }
      
        function boot() {
          if (disposed || motion.matches || renderer || !artworkOK) return;
          try {
            renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true, powerPreference: 'low-power' });
            renderer.setClearColor('#20362f'); renderer.outputColorSpace = THREE.SRGBColorSpace;
            shaderFailed = false;
            renderer.debug.checkShaderErrors = true;
            renderer.debug.onShaderError = () => { shaderFailed = true; };
            scene = new THREE.Scene();
            camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 20); camera.position.z = 10;
            geometry = new THREE.PlaneGeometry(1, 1, 16, 16);
            textures = artwork.map(canvas => {
              const tex = new THREE.CanvasTexture(canvas); tex.colorSpace = THREE.SRGBColorSpace; return tex;
            });
            field.prepend(renderer.domElement); renderer.domElement.setAttribute('aria-hidden', 'true');
            field.hidden = false;
            gpuEvents = new AbortController();
            renderer.domElement.addEventListener('webglcontextlost', e => {
              e.preventDefault(); fallback('描画を停止しました。作品一覧から選択できます。');
            }, { signal: gpuEvents.signal });
            sizeGPU();
            introStart = performance.now();
            introC = -current.x / stepX; introR = -current.y / stepY;
            layout(introStart, 0, 0);
            renderer.compile(scene, camera); renderer.render(scene, camera);
            if (shaderFailed || renderer.getContext().isContextLost()) throw new Error('WebGL initialization failed');
            root.classList.add('is-gpu'); tools.hidden = false;
            help.textContent = 'ドラッグ / タップで選択。矢印で移動、Enterで中央を選択。タッチは横ドラッグ。';
            wake();
          } catch {
            fallback('静的一覧：作品ボタンで詳細を選択できます。');
          }
        }
      
        function sizeGPU() {
          if (!renderer) return;
          resizePending = false;
          width = Math.max(1, field.clientWidth); height = Math.max(1, field.clientHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CONFIG.dpr));
          renderer.setSize(width, height, false);
          camera.left = -width / 2; camera.right = width / 2;
          camera.top = height / 2; camera.bottom = -height / 2; camera.updateProjectionMatrix();
          cardW = width < 600 ? Math.min(172, width * 0.49) : Math.min(240, width * 0.205);
          cardH = cardW * 1.25;
          stepX = cardW + (width < 600 ? 18 : CONFIG.gap);
          stepY = cardH + (width < 600 ? 20 : CONFIG.gap);
          const nextCols = Math.ceil(width / stepX) + CONFIG.overscan;
          const nextRows = Math.ceil(height / stepY) + CONFIG.overscan;
          if (nextCols !== cols || nextRows !== rows) {
            tiles.forEach(tile => { scene.remove(tile); tile.material.dispose(); });
            tiles = []; cols = nextCols; rows = nextRows;
            for (let i = 0; i < cols * rows; i++) {
              const material = new THREE.ShaderMaterial({
                vertexShader: vertex, fragmentShader: fragment,
                transparent: true, depthTest: false, depthWrite: false,
                uniforms: {
                  uMap: { value: textures[0] }, uReveal: { value: 0 }, uSelected: { value: 0 },
                  uVelocity: { value: new THREE.Vector2() },
                  uLiftPx: { value: CONFIG.liftPx }, uCardHeight: { value: cardH }
                }
              });
              const tile = new THREE.Mesh(geometry, material);
              tile.userData = { c: null, r: null, id: 0 };
              scene.add(tile); tiles.push(tile);
            }
          }
        }
      
        function layout(now, vx, vy) {
          const startC = Math.floor(-current.x / stepX) - Math.floor(cols / 2);
          const startR = Math.floor(-current.y / stepY) - Math.floor(rows / 2);
          const elapsed = (now - introStart) / 1000;
          const bendX = THREE.MathUtils.clamp(vx * CONFIG.bend, -CONFIG.maxBendPx, CONFIG.maxBendPx) / cardW;
          const bendY = THREE.MathUtils.clamp(vy * CONFIG.bend, -CONFIG.maxBendPx, CONFIG.maxBendPx) / cardH;
          for (let r = startR; r < startR + rows; r++) {
            for (let c = startC; c < startC + cols; c++) {
              // The overlapping logical cells retain their mesh when the window moves.
              const tile = tiles[mod(r, rows) * cols + mod(c, cols)];
              const id = mod(c * 5 + r * 3 + Math.floor(r / 2), works.length);
              tile.userData.c = c; tile.userData.r = r; tile.userData.id = id;
              tile.position.set(c * stepX + current.x, r * stepY + current.y, 0);
              tile.scale.set(cardW, cardH, 1);
              // Delay belongs to the logical cell, NEVER to a reusable pool slot.
              const delay = Math.min(CONFIG.maxDelay, Math.hypot(c - introC, r - introR) * CONFIG.stagger);
              const t = THREE.MathUtils.clamp((elapsed - delay) / CONFIG.intro, 0, 1);
              const u = tile.material.uniforms;
              u.uReveal.value = t * t * (3 - 2 * t);
              u.uCardHeight.value = cardH;
              u.uMap.value = textures[id]; u.uSelected.value = id === selected ? 1 : 0;
              u.uVelocity.value.set(bendX, bendY);
            }
          }
        }
      
        function wake() {
          if (!disposed && renderer && !raf && !document.hidden && !suspended) raf = requestAnimationFrame(frame);
        }
        function frame(now) {
          raf = 0;
          if (!renderer || disposed || document.hidden || suspended) return;
          try {
            if (resizePending) sizeGPU();
            const dt = Math.min(0.05, Math.max(0.001, (now - (lastTime || now - 16)) / 1000));
            lastTime = now;
            const oldX = current.x, oldY = current.y, a = 1 - Math.exp(-CONFIG.follow * dt);
            current.x += (target.x - current.x) * a; current.y += (target.y - current.y) * a;
            const moving = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.08;
            if (!moving) { current.x = target.x; current.y = target.y; }
            layout(now, moving ? (current.x - oldX) / dt : 0, moving ? (current.y - oldY) / dt : 0);
            renderer.render(scene, camera);
            if (shaderFailed) throw new Error('Shader compilation failed');
            if (moving || now - introStart < (CONFIG.intro + CONFIG.maxDelay) * 1000) wake();
            else lastTime = 0;
          } catch {
            fallback('静的一覧へ切り替えました。作品ボタンで選択できます。');
          }
        }
        function requestResize() { if (renderer) { resizePending = true; wake(); } }
      
        function move(direction) {
          if (!renderer) return;
          if (direction === 'home') { target.x = 0; target.y = 0; }
          else if (direction === 'left') target.x += stepX;
          else if (direction === 'right') target.x -= stepX;
          else if (direction === 'up') target.y -= stepY;
          else if (direction === 'down') target.y += stepY;
          wake();
        }
        function endDrag() {
          const previous = dragging; dragging = null;
          field.classList.remove('is-dragging');
          if (previous && field.hasPointerCapture(previous.id)) field.releasePointerCapture(previous.id);
        }
        on(field, 'pointerdown', e => {
          if (!e.isPrimary) { endDrag(); return; }
          if (!renderer || e.button !== 0 || dragging) return;
          field.focus({ preventScroll: true });
          dragging = {
            id: e.pointerId, x: e.clientX, y: e.clientY, originX: e.clientX, originY: e.clientY,
            distance: 0, touch: e.pointerType === 'touch', locked: e.pointerType !== 'touch'
          };
          field.setPointerCapture(e.pointerId);
          if (dragging.locked) field.classList.add('is-dragging');
        });
        on(field, 'pointermove', e => {
          if (!dragging || e.pointerId !== dragging.id) return;
          const totalX = e.clientX - dragging.originX, totalY = e.clientY - dragging.originY;
          dragging.distance = Math.max(dragging.distance, Math.hypot(totalX, totalY));
          if (dragging.touch && !dragging.locked) {
            if (dragging.distance < 7) return;
            if (Math.abs(totalY) >= Math.abs(totalX)) { endDrag(); return; }
            dragging.locked = true; field.classList.add('is-dragging');
          }
          target.x += e.clientX - dragging.x;
          if (!dragging.touch) target.y -= e.clientY - dragging.y;
          dragging.x = e.clientX; dragging.y = e.clientY; wake();
        });
        on(field, 'pointerup', e => {
          if (!dragging || e.pointerId !== dragging.id) return;
          const distance = Math.max(dragging.distance, Math.hypot(e.clientX - dragging.originX, e.clientY - dragging.originY));
          endDrag();
          if (distance >= 7 || !renderer) return;
          const rect = field.getBoundingClientRect();
          pointer.set((e.clientX - rect.left) / rect.width * 2 - 1, 1 - (e.clientY - rect.top) / rect.height * 2);
          scene.updateMatrixWorld(true); camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          const hit = raycaster.intersectObjects(tiles, false).find(h => h.object.material.uniforms.uReveal.value > 0.95);
          if (hit) select(hit.object.userData.id);
        });
        on(field, 'pointercancel', endDrag); on(field, 'lostpointercapture', endDrag);
        on(window, 'blur', endDrag);
        on(field, 'keydown', e => {
          if (e.target !== field || !renderer || e.altKey || e.ctrlKey || e.metaKey) return;
          const directions = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down', Home: 'home' };
          if (directions[e.key]) { e.preventDefault(); move(directions[e.key]); }
          else if (e.key === 'Enter') {
            e.preventDefault();
            const center = tiles.reduce((best, tile) => !best || tile.position.lengthSq() < best.position.lengthSq() ? tile : best, null);
            if (center) select(center.userData.id);
          }
        });
        buttons.forEach((button, id) => on(button, 'click', () => select(id)));
        root.querySelectorAll('[data-move]').forEach(button => on(button, 'click', () => move(button.dataset.move)));
      
        function stopGPU() {
          cancelAnimationFrame(raf); raf = 0; lastTime = 0; resizePending = false;
          gpuEvents?.abort(); gpuEvents = null; endDrag();
          tiles.forEach(tile => tile.material.dispose()); tiles = [];
          geometry?.dispose(); geometry = null;
          textures.forEach(texture => texture.dispose()); textures = [];
          if (renderer) { renderer.dispose(); renderer.domElement.remove(); renderer = null; }
          scene?.clear(); scene = null; camera = null; cols = 0; rows = 0;
        }
        function fallback(message) {
          const fieldFocused = document.activeElement === field || tools.contains(document.activeElement);
          stopGPU(); root.classList.remove('is-gpu'); field.hidden = true; tools.hidden = true;
          help.textContent = message;
          if (!disposed) live.textContent = message;
          if (fieldFocused) buttons[selected].focus({ preventScroll: true });
        }
        on(motion, 'change', () => {
          animation?.cancel(); animation = null;
          if (motion.matches) fallback('動きを抑えた静的一覧。作品ボタンで詳細を選択できます。');
          else boot();
        });
        const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(requestResize);
        observer?.observe(field);
        on(window, 'resize', requestResize);
        on(document, 'visibilitychange', () => {
          if (document.hidden) { cancelAnimationFrame(raf); raf = 0; lastTime = 0; endDrag(); }
          else wake();
        });
        on(window, 'pagehide', e => {
          if (!e.persisted) destroy();
          else { suspended = true; cancelAnimationFrame(raf); raf = 0; lastTime = 0; endDrag(); }
        });
        on(window, 'pageshow', () => { suspended = false; lastTime = 0; requestResize(); });
        on(root, 'daily:destroy', destroy);
        function destroy() {
          if (disposed) return;
          disposed = true; events.abort(); observer?.disconnect(); animation?.cancel(); animation = null;
          fallback('静的一覧：作品名を確認できます。');
          live.textContent = '';
          // Keep exactly six DOM-owned prints for the static view and the next mount.
        }
      
        root.classList.remove('is-gpu'); field.hidden = true; tools.hidden = true;
        help.textContent = '静的一覧：作品ボタンで詳細を選択できます。';
        select(selected, false);
        if (motion.matches) help.textContent = '動きを抑えた静的一覧。作品ボタンで詳細を選択できます。';
        else boot();
        return destroy;
      }
      
      const stage = document.querySelector('.daily-stage');
      if (stage) mountInfiniteGallery(stage);
      
---

# Day 053 — Three.jsで作る、造形を採集する無限ギャラリー

> **Reference study:** [Loading infinite grid — Half of Eight](https://www.awwwards.com/inspiration/loading-infinite-grid-half-of-eight) / Awwwards Elements  
> **主軸:** Three.js / **品質レビュー:** 88/100

無限グリッドの登場で配置空間を伝え、そのまま探索へつなぐ原理を参考にしました。深緑のフィールド、六種の独自生成版画、常設HTML索引へ再構成しています。参考元のThree.js採用や内部アルゴリズムは未確認であり、論理セルへの剰余割り当てとCSS px基準のリビールは本スタディ独自の設計です。

# Day 053 / 365 — Three.js × Infinite Gallery

公開日：2026-11-24

## 参考にした表現

参考は、Awwwards Elements掲載の **Loading infinite grid — Half of Eight** です。

参照URL：https://www.awwwards.com/inspiration/loading-infinite-grid-half-of-eight

作品が並んだ結果だけではなく、登場によって空間の広がりを伝え、そのまま探索へつなぐ原理を研究しました。提供されたリサーチではWebGLの使用が明示されています。一方、Three.jsの採用、タイルの再配置方法、シェーダーの内部構成は確認されていません。以下は参考元の実装解説ではなく、Three.jsを使った独自の再構築です。

参考元のブランド、文章、画像、CGI、オーバーレイは使用していません。

## 完成形

**OFF THE FINITE — 終わりのない、造形の採集。**

深緑の探索領域に、Canvasで生成した六つの版画を配置します。楕円の堆積、段状の記念碑、波の記譜、空洞、放射する線、ずれた矩形という異なる輪郭を持たせ、色だけに頼らず作品を区別します。

中央付近からカードが小さく持ち上がって現れ、ドラッグで配置空間を探索できます。移動速度はカードのわずかな反りとして返し、タップすると選択枠とHTMLの作品情報が連動します。

無限なのは作品数ではなく配置空間です。六作品が繰り返されることを画面にも明記します。方向ボタン、キーボード、常設HTML索引を併設し、ドラッグを必須にしていません。

## 実装設計

### 論理セルとプールの対応を固定する

正投影カメラと有限のメッシュプールを使用します。必要な列数・行数は表示サイズから算出し、周囲に余剰セルを確保します。

論理座標を `c, r` とすると、担当するプールスロットは次で決定します。

`slot = mod(r, rows) * cols + mod(c, cols)`

表示範囲が一セル移動しても、範囲に残る論理セルは同じメッシュを使い続けます。通常の探索では、余剰領域の外へ抜けたセルのスロットだけが、反対側の画面外セルを担当します。開始列を全スロットへ一律に加える方式とは異なり、境界通過で画面内の担当メッシュを総入れ替えしません。

登場ディレイもプールの配列番号ではなく、起動時の中心と論理セルの距離から計算します。リサイズでプールを作り直した場合も、同じ論理セルの登場進行度は同じ時刻から求めます。登場中にドラッグしても、別スロットのディレイへ乗り換えることはありません。

作品IDも論理座標から決定するため、同じ場所へ戻れば同じ作品が現れます。

### 移動と選択を分ける

目標位置と表示位置を分離し、時間基準の指数減衰で追従させます。これは放した速度で長距離を滑走させるモデルではなく、入力の終点へ短く収束する設計です。

作品の確定はタップ、Enter、HTML索引だけで行います。中央セルの境界判定による自動切り替えは行わず、往復時の本文のちらつきを避けます。詳細パネルの短いアニメーションは、次の選択で前のものをキャンセルします。History APIは使いません。

### 同一DOMへの再マウント

`mountInfiniteGallery(root)` は、開始時に既存インスタンスへ `daily:destroy` を送ります。旧イベントとGPUリソースを解放してから、新しいインスタンスを構築します。

生成サムネイルは各 `.fg-thumb` が一枚だけ所有します。再マウント時には既存の生成Canvasを再利用し、`replaceChildren(canvas)` で古い重複要素も除去します。破棄時は静的表示のために六枚を残しますが、マウント回数に応じてCanvasが増えることはありません。選択中の作品もHTMLの状態から引き継ぎます。

## シェーダー/レンダリング

### CSS pxとローカル座標を混同しない

共有ジオメトリは1×1で、メッシュのスケールをカードのCSS px寸法へ設定します。したがって、頂点シェーダー内で22をそのまま加算すると、その変位までカード高倍されます。

本実装では、登場の持ち上がりを次のように正規化します。

`p.y += (1.0 - uReveal) * uLiftPx / uCardHeight;`

これにより、カード高が変わっても最大変位は `CONFIG.liftPx` の22 CSS pxです。速度による反りもカード幅・高さで正規化し、各軸の最大変位を10 CSS pxに制限します。

フラグメントシェーダーは下からのリビール、透明度、選択枠を担当します。ポストプロセスや外部画像は使用しません。

### 生成画像の解像度を独立させる

図版の設計座標は384×480に固定し、Canvasの実ピクセル数に合わせて2Dコンテキストをスケーリングします。`textureWidth` と `textureHeight` を変更しても構図が切れたり余白が生じたりせず、同じ版画を別解像度で生成できます。通常は4:5の比率を維持して調整します。

六枚のCanvasTextureと一つのPlaneGeometryを共有します。レイキャストは変形前の平面を使うため、登場中のタップ選択はリビールがほぼ完了したカードに限定します。小さな反りによる見た目と判定の差は残るため、大変形へ変更する場合はCPU側の変形判定やGPUピッキングが必要です。

## 実務での使いどころ

制作会社のWorks、素材ライブラリー、アートイベントの出展作品索引、キャンペーンのビジュアルアーカイブに向いています。探索はWebGL、作品名と説明はHTMLという役割分担なので、詳細ページへのリンクやCMSの作品情報へ接続しやすい構成です。

本実装は六つの生成図版を共有するスタディです。大量の実画像へ置き換える場合は、表示近傍のロード管理、解像度別配信、エラー表示、テクスチャの退避を別途設計してください。

## 調整パラメータ

| パラメータ | 用途 |
| --- | --- |
| `CONFIG.dpr` | 描画ピクセル比の上限。初期値1.6 |
| `CONFIG.follow` | 目標位置への追従速度 |
| `CONFIG.intro` | 各カードの登場時間。秒単位 |
| `CONFIG.stagger / maxDelay` | 論理セル間の登場時間差と上限 |
| `CONFIG.liftPx` | 登場時の持ち上がり。CSS px単位 |
| `CONFIG.bend / maxBendPx` | 速度から反りへの変換と各軸の上限 |
| `CONFIG.gap / overscan` | カード間隔と余剰セル数 |
| `CONFIG.textureWidth / textureHeight` | 共有図版の生成解像度 |

384×480、RGBA、六枚のベースレベルは合計約4.2 MiBです。ミップマップ、Canvas側の保持領域、ドライバーの追加確保は含まない概算です。

## パフォーマンスとアクセシビリティ

静止後はrequestAnimationFrameを停止し、入力・選択・リサイズで再開します。リサイズ通知は描画フレームへ集約します。非表示タブでは停止し、BFCacheへの退避時も描画を止めます。

キーボードではフィールドにフォーカスして矢印で移動、Enterで中央付近の作品を選択、Homeで原点へ戻れます。方向ボタンとHTML索引は44px以上の操作領域を確保します。移動中に作品名を読み上げ続けず、明示選択時だけ通知します。

タッチは横方向を探索に使い、縦方向はページスクロールへ譲ります。初動の方向判定に加え、`touch-action: pan-y pinch-zoom` を指定します。ホイールは横取りしません。

`prefers-reduced-motion` ではGPUを起動せず、生成図版付きの静的一覧にします。設定変更、検出できた描画・シェーダーエラー、コンテキスト喪失時も同じ一覧へ退避します。フォーカスが非表示になる操作領域にある場合は、選択作品のHTMLボタンへ移します。JavaScriptが動かない場合はCSSの代替図版と作品名が残ります。

破棄は、返却された関数またはルートへの `daily:destroy` イベントで実行します。RAF、イベント、ResizeObserver、詳細アニメーション、マテリアル、ジオメトリ、テクスチャ、レンダラーを解放します。

### 組み込みと確認手順

JavaScriptはES moduleです。ビルド環境で `three` を解決してください。HTML、CSS、JavaScriptをそれぞれ配置すると、最初の `.daily-stage` に自動マウントします。SPAでは公開関数 `mountInfiniteGallery(root)` を利用できます。

実ブラウザー、実機、GPU性能の検証はこの回答内では行っていません。導入時は以下を確認してください。

1. 登場直後に上下左右へドラッグし、セル境界で同じ作品の透明度や位置が跳ばないこと。
2. 登場変位がカード寸法によらず最大22 CSS pxになっていること。
3. 320px幅から横長画面まで、余剰タイルの再配置が画面内へ露出しないこと。
4. 解像度を192×240、768×960へ変更し、同じ構図になること。
5. 同じルートで破棄と再マウントを繰り返し、サムネイルCanvasが常に六枚であること。
6. iOS / Androidで縦スクロール、横ドラッグ、ピンチズームが共存すること。
7. キーボードと読み上げ環境で全作品を選択でき、フォールバック後もフォーカスが見えること。
8. reduced-motionの変更、コンテキスト喪失、BFCache復帰が適切に処理されること。
9. 長距離移動、連続リサイズ、対象GPUでのフレーム時間・メモリ・細線の見え方を計測すること。

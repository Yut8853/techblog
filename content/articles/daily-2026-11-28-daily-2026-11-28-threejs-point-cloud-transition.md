---
title: "Three.jsで作る、形の記憶をつなぐポイントクラウド・スライダー"
description: "器・帆・螺旋の生成点群を、分散と再集合でつなぐThree.js製Worksスライダー。割り込み遷移、本文の完了同期、GPUと静的SVGの排他的表示、破棄時の状態正規化まで設計します。"
category: "WebGLスライダー"
categorySlug: "webgl-slider"
categoryDescription: "Three.jsとカスタムシェーダーで、作品の選択状態と視覚的なトランジションを結びつける実務向けWebGLスライダー。"
tags:
  - "Three.js"
  - "ポイントクラウド"
  - "GLSL"
  - "WebGLスライダー"
  - "プロシージャル造形"
  - "アクセシビリティ"
  - "Daily Lab"
date: "2026年11月28日"
publishedAt: "2026-11-28"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 57
focus: "Three.js"
concept: "同じ粒子が造形の記憶を持ち運ぶ、三作品のエディトリアル・スライダー。分散から輪郭の認識、再集合の完了までを設計し、作品本文の確定と結びつける。GPUと静的SVGは排他的に表示し、割り込みや破棄でも視覚と選択状態を一致させる。"
referenceTitle: "ishikawa.co — Walkable Atlas / Hidekazu Ishikawa"
referenceUrl: "https://www.cssdesignawards.com/sites/ishikawa-co-walkable-atlas/49836/"
referencePlatform: "CSS Design Awards"
qualityScore: 88
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" aria-label="FORM FIELD 造形研究">
        <header class="pc-top"><span class="pc-mark">FORM / FIELD</span><span>INDEPENDENT FORM STUDIES<br>057 — 28 NOV 2026</span></header>
        <div class="pc-layout">
          <div class="pc-editorial">
            <p class="pc-kicker">Three states. One continuous matter.</p>
            <h1 class="pc-title">Matter,<br> <em>recomposed.</em></h1>
            <p class="pc-intro">形は消えるのではなく、次の構造へ。<br>同じ点の集まりから生まれる、三つの造形研究。</p>
            <section class="pc-panel" aria-label="表示中の造形" aria-busy="false">
              <div class="pc-panel-top"><span class="pc-number">01 / 03</span><h2>VESSEL — 包む</h2></div>
              <p class="pc-description">縦の稜線が空洞を囲む。器の輪郭を、面ではなく密度として読み直す。</p>
            </section>
          </div>
          <figure class="pc-figure" aria-label="点群による造形プレビュー">
            <div class="pc-figure-head"><span>SPECIMEN / <span class="pc-specimen">01</span></span><span class="pc-density">PROCEDURAL POINT STUDY</span></div>
            <div class="pc-view" aria-hidden="true">
              <svg class="pc-static" viewBox="-2 -2 4 4" xmlns="http://www.w3.org/2000/svg" focusable="false">
                <g fill="none" stroke="#e6b18b" stroke-width=".015" stroke-dasharray=".012 .04" transform="rotate(-12)">
                  <ellipse cy="-1" rx=".68" ry=".23"/><ellipse cy="-.75" rx=".75" ry=".26"/><ellipse cy="-.5" rx=".8" ry=".28"/><ellipse cy="-.25" rx=".83" ry=".3"/><ellipse cy="0" rx=".84" ry=".31"/><ellipse cy=".25" rx=".83" ry=".3"/><ellipse cy=".5" rx=".8" ry=".28"/><ellipse cy=".75" rx=".75" ry=".26"/><ellipse cy="1" rx=".68" ry=".23"/>
                </g>
              </svg>
              <span class="pc-axis">Y / STRUCTURAL MEMORY</span>
            </div>
            <figcaption class="pc-figure-foot"><span class="pc-state">01 / ASSEMBLED</span><span class="pc-meter" aria-hidden="true"><span></span></span><span class="pc-mode">STATIC PREVIEW</span></figcaption>
          </figure>
        </div>
        <nav class="pc-navigation" aria-label="造形を選択。枠は選択先、下線は表示確定">
          <button type="button" class="pc-choice" data-form="0" aria-pressed="true" aria-current="true" disabled><span class="pc-choice-index">01</span><span><span class="pc-choice-title">VESSEL</span><span class="pc-choice-sub">包む / Enclosure</span></span><span class="pc-choice-arrow" aria-hidden="true">↗</span></button>
          <button type="button" class="pc-choice" data-form="1" aria-pressed="false" disabled><span class="pc-choice-index">02</span><span><span class="pc-choice-title">SAIL</span><span class="pc-choice-sub">張る / Tension</span></span><span class="pc-choice-arrow" aria-hidden="true">↗</span></button>
          <button type="button" class="pc-choice" data-form="2" aria-pressed="false" disabled><span class="pc-choice-index">03</span><span><span class="pc-choice-title">COIL</span><span class="pc-choice-sub">連なる / Continuity</span></span><span class="pc-choice-arrow" aria-hidden="true">↗</span></button>
        </nav>
        <footer class="pc-bottom"><span class="pc-help">STATIC PREVIEW</span><span>枠：選択先 / 下線：表示確定</span><span>GENERATED GEOMETRY / NO IMAGE ASSETS</span></footer>
        <p class="pc-sr pc-live" role="status" aria-live="polite" aria-atomic="true"></p>
      </section>
  - name: styles.css
    language: css
    content: |
      .daily-stage{--pc-bg:#102521;--pc-ink:#f0eee4;--pc-muted:#a8b9af;--pc-line:rgba(217,234,218,.19);--pc-accent:#efad83;box-sizing:border-box;position:relative;isolation:isolate;background:var(--pc-bg);color:var(--pc-ink);padding:26px clamp(20px,4.5vw,76px) 24px;font-family:Arial,'Helvetica Neue','Noto Sans JP',sans-serif;overflow:hidden}.daily-stage *{box-sizing:border-box}.daily-stage [hidden]{display:none!important}.daily-stage button{font:inherit}.pc-top{display:flex;align-items:center;justify-content:space-between;gap:20px;padding-bottom:21px;border-bottom:1px solid var(--pc-line);font-size:11px;letter-spacing:.14em}.pc-mark{font-size:14px;font-weight:700;letter-spacing:.08em}.pc-top span:last-child{color:var(--pc-muted);text-align:right}.pc-layout{display:grid;grid-template-columns:minmax(280px,.8fr) minmax(0,1.2fr);gap:clamp(28px,5vw,90px);align-items:center;padding:44px 0 30px}.pc-editorial{min-width:0}.pc-kicker{margin:0 0 22px;color:var(--pc-accent);font-size:10px;line-height:1.7;letter-spacing:.17em;text-transform:uppercase}.pc-title{font-size:clamp(48px,6.4vw,100px);font-weight:500;line-height:.98;letter-spacing:-.065em;margin:0 0 30px;overflow-wrap:anywhere}.pc-title em{font-family:Georgia,'Times New Roman',serif;font-weight:400;letter-spacing:-.06em;color:var(--pc-accent)}.pc-intro{max-width:30em;font-size:13px;line-height:1.9;color:var(--pc-muted);margin:0}.pc-panel{margin-top:42px;padding-top:20px;border-top:1px solid var(--pc-line);max-width:390px;min-height:148px}.pc-panel-top{display:flex;align-items:baseline;flex-wrap:wrap;gap:10px 16px}.pc-number{font:11px monospace;color:var(--pc-accent)}.pc-panel h2{font-size:20px;font-weight:400;letter-spacing:.04em;margin:0}.pc-panel p{font-size:13px;line-height:1.85;color:var(--pc-muted);margin:13px 0 0}.pc-figure{margin:0;min-width:0}.pc-figure-head,.pc-figure-foot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px 14px;color:var(--pc-muted);font:10px/1.5 monospace;letter-spacing:.05em}.pc-figure-head{padding:0 0 10px;border-bottom:1px solid var(--pc-line)}.pc-view{position:relative;width:100%;aspect-ratio:1/1;min-height:310px;background:radial-gradient(ellipse at 50% 45%,rgba(126,153,128,.09),transparent 67%);overflow:hidden}.pc-view::before{content:'';position:absolute;inset:12%;border:1px solid rgba(217,234,218,.08);border-radius:50%;pointer-events:none}.pc-view::after{content:'+';position:absolute;left:12px;top:50%;color:#789086;font:18px monospace;pointer-events:none}.pc-static,.pc-canvas{position:absolute;inset:0;display:block;width:100%;height:100%}.pc-canvas{pointer-events:none}.pc-axis{position:absolute;right:9px;bottom:20px;color:#8fa79a;font:9px monospace;letter-spacing:.08em;writing-mode:vertical-rl}.pc-figure-foot{align-items:center;padding-top:11px;border-top:1px solid var(--pc-line)}.pc-meter{height:2px;background:rgba(217,234,218,.15);width:70px;flex:none;overflow:hidden}.pc-meter span{display:block;width:100%;height:100%;background:var(--pc-accent);transform:scaleX(1);transform-origin:left}.pc-navigation{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:8px}.pc-choice{appearance:none;position:relative;display:flex;align-items:center;gap:18px;min-height:88px;text-align:left;color:var(--pc-ink);border:1px solid var(--pc-line);background:transparent;padding:18px 22px;cursor:pointer;transition:background .18s,border-color .18s}.pc-choice:not(:disabled):hover{background:rgba(220,234,218,.05);border-color:#91a498}.pc-choice[aria-pressed='true']{border-color:var(--pc-accent);background:rgba(239,173,131,.06)}.pc-choice[aria-current='true']::after{content:'';position:absolute;bottom:-1px;left:22px;width:34px;height:3px;background:var(--pc-accent)}.pc-choice:focus-visible{outline:2px solid #f9d5ba;outline-offset:4px}.pc-choice:disabled{cursor:default}.pc-choice:disabled .pc-choice-arrow{opacity:.3}.pc-choice-index{color:var(--pc-accent);font:11px monospace}.pc-choice-title{display:block;font-size:15px;letter-spacing:.11em;overflow-wrap:anywhere}.pc-choice-sub{display:block;margin-top:7px;color:var(--pc-muted);font-size:11px;line-height:1.5}.pc-choice-arrow{margin-left:auto;color:var(--pc-accent);font-size:19px}.pc-bottom{display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px 20px;margin-top:22px;color:var(--pc-muted);font:10px/1.7 monospace;letter-spacing:.03em}.pc-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}@media(min-width:1500px){.pc-layout{max-width:1480px;margin:auto}.pc-view{max-height:700px}}@media(max-width:760px){.daily-stage{padding:22px 20px}.pc-top{font-size:9px}.pc-layout{grid-template-columns:1fr;gap:24px;padding-top:30px}.pc-title{font-size:clamp(46px,11.5vw,78px);margin-bottom:20px}.pc-title br{display:none}.pc-intro{max-width:36em}.pc-panel{margin-top:24px;max-width:none;min-height:115px}.pc-view{aspect-ratio:1.15;min-height:280px}.pc-navigation{gap:7px}.pc-choice{padding:15px 10px;min-height:98px;display:block}.pc-choice-index{display:block;margin-bottom:9px}.pc-choice-title{font-size:12px}.pc-choice-sub{font-size:10px}.pc-choice-arrow{display:none}.pc-choice[aria-current='true']::after{left:10px}.pc-bottom{font-size:10px}.pc-figure-head,.pc-figure-foot{font-size:10px}.pc-kicker{margin-bottom:16px}}@media(prefers-reduced-motion:reduce){.daily-stage *{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
  - name: experiment.js
    language: javascript
    content: |
      const mounted = new WeakMap();
      
      export function mountPointStudy(root) {
        mounted.get(root)?.();
        // 実務用パラメータ。点数変更後は再マウント。
        // duration > 0、0 <= stagger < 1 を維持する。
        const CONFIG = Object.freeze({
          desktopPoints: 18000, compactPoints: 8000, staticPoints: 1100,
          duration: 1.35, stagger: 0.22, scatter: 0.62,
          pointSize: 2.25, dprCap: 1.75,
          slowFrameMs: 27, slowSamples: 22, minPoints: 3600
        });
        const records = [
          { name: 'VESSEL', title: 'VESSEL — 包む', text: '縦の稜線が空洞を囲む。器の輪郭を、面ではなく密度として読み直す。' },
          { name: 'SAIL', title: 'SAIL — 張る', text: '二つの方向へ引かれた曲面。点と点の距離が、目に見えない張力を浮かび上がらせる。' },
          { name: 'COIL', title: 'COIL — 連なる', text: '途切れず上昇する一枚の帯。回転と間隔の反復から、構造のリズムが生まれる。' }
        ];
        const $ = s => root.querySelector(s);
        const view = $('.pc-view'), svg = $('.pc-static'), panel = $('.pc-panel');
        const title = panel.querySelector('h2'), description = $('.pc-description');
        const number = $('.pc-number'), specimen = $('.pc-specimen');
        const status = $('.pc-state'), mode = $('.pc-mode'), density = $('.pc-density');
        const bar = $('.pc-meter span'), live = $('.pc-live'), help = $('.pc-help');
        const buttons = [...root.querySelectorAll('[data-form]')];
        const media = matchMedia('(prefers-reduced-motion: reduce)');
        const abort = new AbortController();
        const listen = (el, type, fn) => el.addEventListener(type, fn, { signal: abort.signal });
        let alive = true, generation = 0, gpu = null, raf = 0, lastTime = 0;
        let intersecting = true, pagePaused = false, resizeDirty = true;
        let requested = 0, settled = 0, progress = 1, moving = false, textAnimation = null;
        let slowCount = 0, frameTotal = 0, frameCount = 0;
        let staticIndex = -1;
        const compact = view.clientWidth < 550 || (navigator.hardwareConcurrency || 8) <= 4;
        const count = compact ? CONFIG.compactPoints : CONFIG.desktopPoints;
        const staticCount = Math.min(count, CONFIG.staticPoints);
        const seeds = new Float32Array(count);
        const forms = Array.from({ length: 3 }, () => new Float32Array(count * 3));
        let rng = 57057;
        function random() {
          rng = (Math.imul(rng, 1664525) + 1013904223) >>> 0;
          return rng / 4294967296;
        }
        function rotate(x, y, z) {
          const cy = Math.cos(-0.55), sy = Math.sin(-0.55);
          const cx = Math.cos(0.32), sx = Math.sin(0.32);
          const xx = x * cy + z * sy, zz = -x * sy + z * cy;
          return [xx, y * cx - zz * sx, y * sx + zz * cx];
        }
        for (let i = 0; i < count; i++) {
          const u = random(), v = random(), a = u * Math.PI * 2;
          seeds[i] = random();
          const radius = 0.64 + 0.18 * Math.sin(v * Math.PI) + 0.055 * Math.cos(a * 24);
          forms[0].set(rotate(radius * Math.cos(a), (v - 0.5) * 2.35, radius * Math.sin(a)), i * 3);
          const sx = (u - 0.5) * 2.65, sz = (v - 0.5) * 2.1;
          const sy = 0.46 * (sx * sx - sz * sz) + 0.06 * Math.sin(v * 34);
          forms[1].set(rotate(sx, sy, sz), i * 3);
          const angle = u * Math.PI * 5.2;
          const r = 0.48 + v * 0.48 + u * 0.2;
          forms[2].set(rotate(r * Math.cos(angle), (u - 0.5) * 2.15 + 0.08 * (v - 0.5), r * Math.sin(angle)), i * 3);
        }
        const pad = n => String(n + 1).padStart(2, '0');
        const staticDensity = `${staticCount.toLocaleString('en-US')} / STATIC POINTS`;
        function dimensions() {
          const box = view.getBoundingClientRect();
          const w = Math.max(1, box.width), h = Math.max(1, box.height), aspect = w / h;
          return { w, h, worldW: 3.8 * Math.max(1, aspect), worldH: 3.8 * Math.max(1, 1 / aspect) };
        }
        function fitStatic() {
          const d = dimensions();
          svg.setAttribute('viewBox', `${-d.worldW / 2} ${-d.worldH / 2} ${d.worldW} ${d.worldH}`);
        }
        function drawStatic(index) {
          // 最後に生成したSVGは保持。GPU表示中にはこの関数を呼ばない。
          if (staticIndex === index) {
            fitStatic();
            return;
          }
          const fragment = document.createDocumentFragment();
          const positions = forms[index];
          for (let i = 0; i < staticCount; i++) {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            const k = i * 3;
            circle.setAttribute('cx', positions[k].toFixed(4));
            circle.setAttribute('cy', (-positions[k + 1]).toFixed(4));
            circle.setAttribute('r', (0.008 + seeds[i] * 0.005).toFixed(4));
            circle.setAttribute('fill', seeds[i] > 0.65 ? '#f1d9b3' : '#d99b75');
            circle.setAttribute('opacity', String(Math.max(0.28, Math.min(0.95, 0.58 + positions[k + 2] * 0.22))));
            fragment.append(circle);
          }
          svg.replaceChildren(fragment);
          staticIndex = index;
          fitStatic();
        }
        function syncButtons() {
          buttons.forEach((button, i) => {
            button.setAttribute('aria-pressed', String(i === requested));
            if (i === settled) button.setAttribute('aria-current', 'true');
            else button.removeAttribute('aria-current');
          });
        }
        function commit(index, announce = true) {
          const changed = settled !== index;
          settled = index;
          title.textContent = records[index].title;
          description.textContent = records[index].text;
          number.textContent = `${pad(index)} / 03`;
          specimen.textContent = pad(index);
          status.textContent = `${pad(index)} / ASSEMBLED`;
          panel.setAttribute('aria-busy', 'false');
          bar.style.transform = 'scaleX(1)';
          syncButtons();
          // GPUの完了処理ではSVGを更新しない。静的経路だけ生成・表示する。
          if (!gpu) {
            drawStatic(index);
            svg.toggleAttribute('hidden', false);
          }
          textAnimation?.cancel();
          textAnimation = null;
          if (alive && changed && !media.matches && panel.animate) {
            textAnimation = panel.animate([
              { opacity: 0.2, transform: 'translateY(5px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ], { duration: 180, easing: 'ease-out' });
          }
          if (announce && changed) live.textContent = `${pad(index)} ${records[index].name}、表示しました。`;
        }
        function stopFrame() {
          cancelAnimationFrame(raf);
          raf = 0;
          lastTime = 0;
        }
        function canDraw() { return alive && gpu && intersecting && !document.hidden && !pagePaused; }
        function kick() {
          if (!raf && canDraw()) raf = requestAnimationFrame(frame);
        }
        function releaseGPU() {
          stopFrame();
          const g = gpu;
          gpu = null;
          if (!g) return;
          // SVGはここでは再表示しない。呼び出し側のcommitで正しい形を用意してから表示。
          g.canvas?.toggleAttribute('hidden', true);
          if (g.canvas && g.onLost) g.canvas.removeEventListener('webglcontextlost', g.onLost);
          g.geometry?.dispose();
          g.material?.dispose();
          g.scene?.clear();
          if (g.renderer) {
            g.renderer.dispose();
            g.renderer.forceContextLoss();
          }
          g.canvas?.remove();
        }
        function useStatic(label) {
          generation++;
          releaseGPU();
          moving = false;
          progress = 1;
          // 障害・軽減設定では最後の選択先を即時確定する。
          commit(requested);
          mode.textContent = label;
          density.textContent = staticDensity;
        }
        function resizeGPU() {
          if (!gpu) return;
          const d = dimensions(), g = gpu;
          const ratio = Math.min(window.devicePixelRatio || 1, CONFIG.dprCap);
          g.renderer.setPixelRatio(ratio);
          g.renderer.setSize(d.w, d.h, false);
          g.camera.left = -d.worldW / 2;
          g.camera.right = d.worldW / 2;
          g.camera.top = d.worldH / 2;
          g.camera.bottom = -d.worldH / 2;
          g.camera.updateProjectionMatrix();
          g.material.uniforms.uDpr.value = ratio;
          resizeDirty = false;
        }
        // 割り込み時のみCPU評価。頂点シェーダーと同じ式を維持する。
        function bakeCurrent() {
          const from = gpu.geometry.getAttribute('aFrom');
          const to = gpu.geometry.getAttribute('aTo');
          const p = gpu.material.uniforms.uProgress.value;
          for (let i = 0; i < count; i++) {
            const seed = seeds[i];
            const t = Math.max(0, Math.min(1, (p - seed * CONFIG.stagger) / (1 - CONFIG.stagger)));
            const e = t * t * (3 - 2 * t);
            const amplitude = Math.sin(Math.PI * e) * CONFIG.scatter;
            const k = i * 3;
            from.array[k] += (to.array[k] - from.array[k]) * e + Math.sin(seed * 53.1) * amplitude;
            from.array[k + 1] += (to.array[k + 1] - from.array[k + 1]) * e + Math.cos(seed * 37.7) * amplitude;
            from.array[k + 2] += (to.array[k + 2] - from.array[k + 2]) * e + Math.sin(seed * 71.3) * amplitude;
          }
          from.needsUpdate = true;
        }
        function select(index) {
          if (!alive || index === requested) return;
          requested = index;
          syncButtons();
          if (!gpu || media.matches) {
            moving = false;
            progress = 1;
            commit(index);
            return;
          }
          bakeCurrent();
          const target = gpu.geometry.getAttribute('aTo');
          target.array.set(forms[index]);
          target.needsUpdate = true;
          progress = 0;
          gpu.material.uniforms.uProgress.value = 0;
          moving = true;
          lastTime = 0;
          textAnimation?.cancel();
          textAnimation = null;
          panel.setAttribute('aria-busy', 'true');
          status.textContent = `RECOMPOSING → ${pad(index)}`;
          bar.style.transform = 'scaleX(0)';
          kick();
        }
        function frame(time) {
          raf = 0;
          if (!canDraw()) { lastTime = 0; return; }
          const elapsed = lastTime ? time - lastTime : 0;
          lastTime = time;
          const dt = Math.min(elapsed / 1000, 0.04);
          try {
            if (resizeDirty) resizeGPU();
            if (moving) {
              progress = Math.min(1, progress + dt / CONFIG.duration);
              gpu.material.uniforms.uProgress.value = progress;
              bar.style.transform = `scaleX(${progress})`;
              if (elapsed > 0) {
                frameTotal += elapsed;
                frameCount++;
                if (frameCount >= CONFIG.slowSamples) {
                  slowCount = frameTotal / frameCount > CONFIG.slowFrameMs ? slowCount + 1 : 0;
                  frameCount = 0;
                  frameTotal = 0;
                  if (slowCount && gpu.drawCount > CONFIG.minPoints) {
                    gpu.drawCount = Math.max(CONFIG.minPoints, Math.floor(gpu.drawCount * 0.72));
                    gpu.geometry.setDrawRange(0, gpu.drawCount);
                    density.textContent = `${gpu.drawCount.toLocaleString('en-US')} / ADAPTIVE POINTS`;
                    slowCount = 0;
                  }
                }
              }
            }
            gpu.renderer.render(gpu.scene, gpu.camera);
            if (gpu.failed || gpu.renderer.getContext().isContextLost()) throw new Error('Render unavailable');
            if (moving && progress === 1) {
              moving = false;
              commit(requested);
            }
            if (moving) kick();
            else lastTime = 0;
          } catch {
            useStatic('STATIC / GPU UNAVAILABLE');
          }
        }
        const vertexShader = `
          attribute vec3 aFrom;
          attribute vec3 aTo;
          attribute float aSeed;
          uniform float uProgress;
          uniform float uStagger;
          uniform float uScatter;
          uniform float uSize;
          uniform float uDpr;
          varying float vSeed;
          varying float vDepth;
          void main() {
            float t = clamp((uProgress - aSeed * uStagger) / (1.0 - uStagger), 0.0, 1.0);
            float e = t * t * (3.0 - 2.0 * t);
            vec3 direction = vec3(sin(aSeed * 53.1), cos(aSeed * 37.7), sin(aSeed * 71.3));
            vec3 p = mix(aFrom, aTo, e) + direction * uScatter * sin(3.14159265359 * e);
            vSeed = aSeed;
            vDepth = clamp(0.5 + p.z * 0.24, 0.0, 1.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = uSize * uDpr * mix(0.72, 1.32, aSeed) * mix(0.86, 1.12, vDepth);
          }
        `;
        const fragmentShader = `
          precision highp float;
          varying float vSeed;
          varying float vDepth;
          void main() {
            float r = length(gl_PointCoord - vec2(0.5)) * 2.0;
            if (r > 1.0) discard;
            float edge = 1.0 - smoothstep(0.25, 1.0, r);
            vec3 copper = vec3(0.69, 0.38, 0.24);
            vec3 ivory = vec3(0.98, 0.85, 0.65);
            vec3 color = mix(copper, ivory, clamp(vDepth * 0.62 + vSeed * 0.42, 0.0, 1.0));
            float alpha = edge * mix(0.32, 0.85, vDepth);
            gl_FragColor = vec4(color, alpha);
          }
        `;
        async function startGPU() {
          if (!alive || media.matches || gpu) return;
          const token = ++generation;
          mode.textContent = 'STATIC / PREPARING GPU';
          try {
            const THREE = await import('three');
            if (!alive || token !== generation || media.matches) return;
            const g = { renderer: null, geometry: null, material: null, scene: null, canvas: null, onLost: null, failed: false, drawCount: count };
            gpu = g;
            g.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
            g.canvas = g.renderer.domElement;
            g.canvas.className = 'pc-canvas';
            g.canvas.toggleAttribute('hidden', true);
            g.canvas.setAttribute('aria-hidden', 'true');
            view.append(g.canvas);
            g.renderer.setClearColor(0x000000, 0);
            g.renderer.debug.checkShaderErrors = true;
            g.renderer.debug.onShaderError = () => { g.failed = true; };
            g.onLost = event => {
              event.preventDefault();
              if (alive && gpu === g) useStatic('STATIC / CONTEXT LOST');
            };
            g.canvas.addEventListener('webglcontextlost', g.onLost);
            g.geometry = new THREE.BufferGeometry();
            g.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(forms[requested]), 3));
            g.geometry.setAttribute('aFrom', new THREE.BufferAttribute(new Float32Array(forms[requested]), 3).setUsage(THREE.DynamicDrawUsage));
            g.geometry.setAttribute('aTo', new THREE.BufferAttribute(new Float32Array(forms[requested]), 3).setUsage(THREE.DynamicDrawUsage));
            g.geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
            g.geometry.setDrawRange(0, count);
            g.material = new THREE.ShaderMaterial({
              vertexShader, fragmentShader, transparent: true, depthWrite: false, depthTest: false,
              uniforms: {
                uProgress: { value: 1 }, uStagger: { value: CONFIG.stagger },
                uScatter: { value: CONFIG.scatter }, uSize: { value: CONFIG.pointSize }, uDpr: { value: 1 }
              }
            });
            g.scene = new THREE.Scene();
            g.camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 20);
            g.camera.position.z = 6;
            const points = new THREE.Points(g.geometry, g.material);
            points.frustumCulled = false;
            g.scene.add(points);
            resizeGPU();
            g.renderer.compile(g.scene, g.camera);
            g.renderer.render(g.scene, g.camera);
            if (g.failed || g.renderer.getContext().isContextLost()) throw new Error('GPU startup failed');
            progress = 1;
            moving = false;
            frameCount = frameTotal = slowCount = 0;
            // SVGElement.hiddenには依存せず、CSSが参照する属性を明示的に操作。
            // 同一タスク内で切り替え、SVGとCanvasの二重表示を避ける。
            svg.toggleAttribute('hidden', true);
            g.canvas.toggleAttribute('hidden', false);
            density.textContent = `${count.toLocaleString('en-US')} / POINTS`;
            mode.textContent = 'GPU / LIVE GEOMETRY';
          } catch {
            if (alive && token === generation) useStatic('STATIC / GPU UNAVAILABLE');
          }
        }
        buttons.forEach((button, index) => {
          button.disabled = false;
          listen(button, 'click', () => select(index));
        });
        help.textContent = 'SELECT A FORM · TAB + ENTER';
        function resize() {
          fitStatic();
          resizeDirty = true;
          kick();
        }
        const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
        resizeObserver?.observe(view);
        listen(window, 'resize', resize);
        const intersectionObserver = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(entries => {
          intersecting = entries[0].isIntersecting;
          if (intersecting) kick(); else stopFrame();
        }, { threshold: 0 }) : null;
        intersectionObserver?.observe(root);
        listen(document, 'visibilitychange', () => {
          if (document.hidden) stopFrame(); else kick();
        });
        listen(media, 'change', () => {
          if (media.matches) {
            useStatic('STATIC / REDUCED MOTION');
            textAnimation?.cancel();
            textAnimation = null;
          } else startGPU();
        });
        listen(window, 'pagehide', event => {
          if (event.persisted) { pagePaused = true; stopFrame(); }
          else destroy();
        });
        listen(window, 'pageshow', () => { pagePaused = false; resizeDirty = true; kick(); });
        function destroy() {
          if (!alive) return;
          alive = false;
          generation++;
          abort.abort();
          resizeObserver?.disconnect();
          intersectionObserver?.disconnect();
          textAnimation?.cancel();
          textAnimation = null;
          releaseGPU();
          // 破棄は選択要求を取消し、最後の表示確定へ戻す。
          requested = settled;
          moving = false;
          progress = 1;
          commit(settled, false); // SVG、本文、進捗、syncButtonsを同じ確定状態へ。
          buttons.forEach(button => { button.disabled = true; });
          live.textContent = '';
          help.textContent = 'STATIC PREVIEW / INTERACTION ENDED';
          mode.textContent = 'STATIC PREVIEW';
          density.textContent = staticDensity;
          mounted.delete(root);
        }
        listen(root, 'daily:destroy', destroy);
        mounted.set(root, destroy);
        live.textContent = '';
        commit(0, false);
        density.textContent = staticDensity;
        if (media.matches) mode.textContent = 'STATIC / REDUCED MOTION';
        else startGPU();
        return destroy;
      }
      
      document.querySelectorAll('.daily-stage').forEach(root => {
        if (root.querySelector('.pc-view')) mountPointStudy(root);
      });
---

# Day 057 — Three.jsで作る、形の記憶をつなぐポイントクラウド・スライダー

> **Reference study:** [ishikawa.co — Walkable Atlas / Hidekazu Ishikawa](https://www.cssdesignawards.com/sites/ishikawa-co-walkable-atlas/49836/) / CSS Design Awards  
> **主軸:** Three.js / **品質レビュー:** 88/100

提示されたCSSDA掲載情報から、粒子の分散・再集合で情報構造の切り替えを伝える原理を参照。原サイトの実動作や技術スタックは未確認。六つの世界やアトラス構図は再現せず、独自生成の器・帆・螺旋、終盤の輪郭回復、本文の完了同期を持つ三作品のスライダーへ再構成した。

# Three.jsで作る、形の記憶をつなぐポイントクラウド・スライダー

2026-11-28公開 / Day 057 of 365

## 参考にした表現

参考は、Hidekazu Ishikawaによる **ishikawa.co — Walkable Atlas**。参照先は [CSS Design Awardsの掲載ページ](https://www.cssdesignawards.com/sites/ishikawa-co-walkable-atlas/49836/) です。

提示された参考情報から、「メディア世界が粒子として展開し、まとまりのある構造へ戻る」という原理を抽出しました。研究対象は粒子の多さではなく、分散と再集合によって情報の切り替わりを伝えることです。原サイトの実動作、レンダリング技術、遷移曲線はこの回答では確認していません。以下のThree.js実装は独自の設計です。

## 完成形

**FORM / FIELD** は、三つの造形研究を紹介するWorksスライダーです。深緑の観測面に、銅色の点群で「器」「帆」「螺旋」を描きます。画像・動画・3Dモデル・外部フォントは使用しません。

下部のボタンを選ぶと、同じ粒子群が輪郭をほどき、次の形へ再集合します。作品本文は、最後に選ばれた形が完成した時点で更新されます。遷移中に別の形を選んだ場合も、最初の形に巻き戻らず、描画済みの位置から新しい目的地へ向かいます。

ボタンの枠は選択要求、下線は表示確定です。TabとEnter／Spaceで操作でき、表示完了だけをライブ領域で通知します。進捗バーは新しい選択ごとの組み直し時間を示すため、割り込み時にはゼロから再開します。

GPU表示中は静的SVGを完全に非表示にします。静止した旧形状を透明Canvasの背後へ残さず、「一つの点群が変化する」という体験を維持する設計です。

## 実装設計

### 選択要求と表示確定

`requested` は最後に選ばれた形、`settled` は本文まで表示を確定した形です。本文・作品番号・確定下線は遷移完了時だけ更新します。途中の座標から章を推測しないため、境界付近の往復で本文がちらつきません。

割り込み時だけ `bakeCurrent()` がシェーダーと同じ式をCPUで評価し、最後に描画した座標を次の出発点へ焼き込みます。位置は連続しますが、速度の連続性までは保証しません。連打した場合の停止感や再加速は実機で確認する項目です。

### 表示レイヤーの排他制御

SVGの表示切り替えには、プロパティ代入ではなく `svg.toggleAttribute('hidden', true/false)` を使います。CSSの `.daily-stage [hidden] { display: none !important; }` と組み合わせ、SVGElementでも明示的な属性操作によって非表示を保証します。Canvasも同じ属性操作に統一しています。

GPUは非表示のCanvasでコンパイルと初回描画を行います。成功を確認してからSVGを隠し、Canvasを表示します。GPU失敗・コンテキスト喪失・モーション軽減への変更では、Canvasを撤去し、選択先を確定して対応するSVGを表示します。

GPU表示中の `commit()` はSVGを生成しません。静的経路へ戻るときに必要な形だけを生成し、直近のSVG形状はインデックスで再利用します。これにより、GPUトランジション完了時の不要な1,100要素の生成・置換を避けます。

### 破棄後も状態を揃える

`mountPointStudy(root)` は破棄関数を返します。SPAのアンマウント時に呼ぶか、ルートへ `daily:destroy` を送ってください。

破棄時は未完了の選択要求を取り消し、`requested = settled` に戻します。そのうえで本文・ボタンの `aria-pressed` と `aria-current`・静的造形・進捗バーを同じ確定状態へ揃えます。DOMを残す場合も、未完了の選択だけが残ることはありません。破棄後の操作ボタンは無効化し、再マウント時に再び有効化します。

History APIは使用しません。Three.jsを解決できるES module環境が必要です。`import('three')` の読み込み失敗時も静的表示と作品選択を維持します。案件側でThree.jsのバージョンを固定してください。

## シェーダー/レンダリング

三つの生成造形を同数の位置配列として用意し、出発点 `aFrom`、目的地 `aTo`、固定seed `aSeed` をGPUへ渡します。通常フレームは進捗uniformのみ更新します。

粒子ごとの進捗と位置は次の式です。

```text
t = clamp((progress − seed × stagger) / (1 − stagger), 0, 1)
e = t² × (3 − 2t)
position = mix(source, destination, e)
         + direction × scatter × sin(πe)
```

分散方向は固定seedから生成します。分散係数は端点でゼロになり、粒子ごとの遅延も終端までに解消されます。時間依存ノイズを加え続けないため、完成形は静止して観察できます。

### 認識できる時間を残す

初期値では `duration = 1.35` 秒、`stagger = 0.22`、`scatter = 0.62` です。最も遅い粒子も約0.30秒までに動き始めます。前半から中盤では旧輪郭をほどき、後半に次の輪郭を読み取る時間を残します。

全体進捗90%では、最も遅い粒子でも補間係数 `e` は約0.955です。目的地までの補間上の残差は約4.5%以下、分散の係数は約0.087以下になります。終盤約0.14秒は、残るずれを収束させる区間です。本文は形が読み取れそうな時点で先行更新せず、全粒子の遷移が終わってから確定します。

これは式から分かる設計上の目安であり、人が形を認識できる時刻の実測値ではありません。`scatter` を大きくすると輪郭の回復が遅く感じられ、`stagger` を大きくすると旧形状と新形状が混在する時間が長くなります。三つの形の判別性と併せて調整してください。

造形は稜線を持つ器、張力を表す曲面、幅のある螺旋帯です。共通の回転を座標に焼き込み、正投影で比較します。フラグメントシェーダーでは点を柔らかな円に切り抜き、深度とseedで銅色からアイボリーへ変化させます。ブルームや外部画像には依存しません。

## 実務での使いどころ

- 建築・工芸・研究開発のWorks紹介
- 三つの価値や工程を示すブランドHero
- 「素材→構造→製品」を伝えるキャンペーン
- 製品系列の違いを輪郭で比較する導入部

モデルを実素材へ置き換える場合は、同数の点を採集するだけでなく、点同士の対応順序も設計します。無関係な頂点順を接続すると交差が増え、比較の意味が弱くなるためです。

## 調整パラメータ

| パラメータ | 初期値 | 意図 |
| --- | --- | --- |
| `desktopPoints` | 18,000 | 大画面の輪郭密度 |
| `compactPoints` | 8,000 | 狭幅・少コア環境の初期負荷 |
| `staticPoints` | 1,100 | 静的SVGの密度 |
| `duration` | 1.35秒 | 分散・認識・収束に使う時間 |
| `stagger` | 0.22 | 粒子ごとの開始時間差 |
| `scatter` | 0.62 | 中間状態の分散量 |
| `pointSize` | 2.25 CSS px | 点の基準サイズ |
| `dprCap` | 1.75 | 高密度画面の負荷上限 |
| `slowFrameMs` | 27ms | 点数縮退の判定目安 |

`duration` は正数、`stagger` は0以上1未満で使います。点数変更後は再マウントしてください。低速フレームが続く場合は `drawRange` を段階的に縮小します。これはrAF間隔に基づくヒューリスティックで、GPU時間の実測ではありません。

## パフォーマンスとアクセシビリティ

描画は初期表示・遷移・リサイズなど必要なときだけ行い、完成形でrAFを継続しません。画面外やバックグラウンドでは描画を止め、復帰時の大きな時間差を進捗へ加算しません。

`prefers-reduced-motion` が有効な場合はGPUを起動せず、同じ生成座標から作るSVGを表示します。設定変更も監視します。CanvasとSVGは読み上げ対象から外し、見出し・本文・操作は通常のHTMLとして提供します。ページスクロールやピンチズームは妨げません。

破棄時にはrAF、イベント、Observer、本文のWeb Animation、Geometry、Material、Rendererを解放します。遷移途中の破棄でも、表示状態を最後の確定形へ正規化します。BFCacheへ退避するときは破棄せず停止し、復帰時に再開します。

### 導入前の確認手順

この回答ではブラウザ・実機・性能検証を実施していません。導入前に以下を確認してください。

1. GPU起動後、SVGに実際の `hidden` 属性が付き、計算済み `display` が `none` になっていること。
2. 遷移中に旧形状の静止点群が残らないこと。完了時にSVGの子要素が再生成されないこと。
3. 選択を連打し、位置の跳躍、速度変化、1.35秒の体感を確認すること。
4. 遷移途中で破棄し、SVG・本文・選択ボタン・進捗が最後の確定形へ揃い、ボタンが無効化されること。再マウント後は操作できること。
5. WebGL無効化、モジュール読み込み失敗、コンテキスト喪失、OSのモーション軽減変更で静的表示へ正しく退避すること。
6. Safari／Chrome／Firefoxと実機で、造形の判別性、透明合成、点のコントラストを確認すること。
7. 320px幅、200%文字拡大、縦横回転で見出しや補助文字、ボタンが欠けないこと。
8. Tab操作とスクリーンリーダーで、選択要求・表示確定・完了通知を理解できること。
9. フレーム時間、点数縮退の効果、GPUメモリ、BFCache復帰、再マウント時のリソース解放を測定すること。

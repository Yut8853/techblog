---
title: "GLSLで作る、奥行きを結ぶパーティクルフィールド"
description: "粒子の分散・集合を作品選択へ結びつけるGLSL製Worksインデックス。斜め投影のねじれ帯、停止設定の保持、GPUとSVGの排他的表示、静的退避時の操作状態まで設計します。"
category: "GLSLパーティクルナビゲーション"
categorySlug: "glsl-particle-navigation"
categoryDescription: "GLSLによる粒子の分散・集合・保持を作品選択と結びつけ、閲覧状態を立体的な構造として伝えるWorks向けインタラクション。"
tags:
  - "GLSL"
  - "Three.js"
  - "パーティクル"
  - "Works"
  - "静的フォールバック"
  - "アクセシビリティ"
  - "Daily Lab"
date: "2026年11月17日"
publishedAt: "2026-11-17"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 46
focus: "GLSL"
concept: "散在した点を、斜めに投影したねじれ帯へ結ぶ単一作品のWorksインデックス。集合を閲覧状態へ対応させ、GPU表示と静的観測図を排他的に切り替えながら、停止指定と作品選択を維持する。"
referenceTitle: "Well, Dots, Lines, Planes. — Seunghyuk Kim"
referenceUrl: "https://www.cssdesignawards.com/sites/well-dots-lines-planes/50078/"
referencePlatform: "CSS Design Awards"
qualityScore: 88
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" data-mode="field" data-motion="running" data-still="true" aria-label="Tidal Aperture プロジェクトインデックス">
        <header class="df-top">
          <div class="df-brand"><span aria-hidden="true"></span>INTERVAL / ATLAS</div>
          <div class="df-edition">FIELD NOTES — 046<br>17 NOV 2026 / DIGITAL STUDY</div>
        </header>
        <div class="df-main">
          <div class="df-copy">
            <p class="df-kicker">ONE FIELD. ONE POSSIBLE FORM.</p>
            <h1><span>Field of</span><span><em>relation.</em></span></h1>
            <div class="df-panels">
              <div class="df-panel df-panel-field" aria-hidden="false">
                <h2>00 — UNBOUND / 未分化の風景</h2>
                <p>まだ、輪郭を持たない点の集まり。<br>ひとつの観測を開くと、散らばった関係が<br>ゆっくりと形を結びます。</p>
              </div>
              <div class="df-panel df-panel-study" aria-hidden="true">
                <h2>01 — TIDAL APERTURE / 潮の観測器</h2>
                <p>変化の中心に、静かな空洞を残す。<br>潮の周期をねじれた帯として読み替えた、<br>架空の環境観測プロジェクト。</p>
              </div>
            </div>
          </div>
          <div class="df-view" aria-label="選択状態を示す生成ビジュアル">
            <div class="df-coordinate">SPECIMEN 01 / OBLIQUE PROJECTION</div>
            <div class="df-ghost" aria-hidden="true">01</div>
            <svg class="df-fallback" viewBox="-2 -2 4 4" aria-hidden="true" focusable="false">
              <g class="df-fallback-field"><path d="M-1.4 -.8L1.4 .9M-1.1 1L1.2 -1M-1.5 .2L1.5 -.2" fill="none" stroke="#a9c5b6" stroke-width=".015" stroke-dasharray=".002 .15" stroke-linecap="round"/></g>
              <g class="df-fallback-study"></g>
            </svg>
            <div class="df-view-label"><strong>RELATIONAL LANDSCAPE</strong><span class="df-render-label">STATIC / GENERATIVE DIAGRAM</span></div>
            <div class="df-state" aria-hidden="true"><output class="df-percent">000%</output><span>FORMATION</span></div>
            <div class="df-progress-track" aria-hidden="true"><div class="df-progress-bar"></div></div>
          </div>
        </div>
        <div class="df-controls">
          <p class="df-hint">点を結ぶ、ほどく。<br>ボタンを選択 / Tab → Enterでも操作できます。</p>
          <div class="df-buttons" role="group" aria-label="観測状態の選択">
            <button class="df-button" type="button" data-select="0" aria-pressed="true" disabled><span>00 / FIELD</span><b aria-hidden="true">↙</b></button>
            <button class="df-button" type="button" data-select="1" aria-pressed="false" disabled><span>01 / OPEN STUDY</span><b aria-hidden="true">↗</b></button>
          </div>
          <div class="df-motion-row">
            <p class="df-motion-note" id="df-motion-note-046" role="status" aria-live="polite">静的表示中です。操作の準備を待っています。</p>
            <button class="df-motion" type="button" aria-pressed="true" aria-disabled="true" aria-describedby="df-motion-note-046" disabled><span class="df-motion-icon" aria-hidden="true">—</span><span class="df-motion-text">静的表示中</span></button>
          </div>
        </div>
        <footer class="df-footer"><span>INDEPENDENT OBSERVATIONS<br>ART × ENVIRONMENT × COMPUTATION</span><span>GLSL / PARTICLE FIELD<br>046 — 365</span></footer>
        <p class="df-sr df-status" role="status" aria-live="polite">フィールドを表示しています。</p>
      </section>
  - name: styles.css
    language: css
    content: |
      .daily-stage{--bg:#101a1b;--ink:#eee9db;--muted:#a4b6af;--accent:#d5bb8e;position:relative;isolation:isolate;overflow:hidden;background:var(--bg);color:var(--ink);font-family:Arial,'Noto Sans JP',sans-serif;padding:28px clamp(22px,4vw,68px) 22px;box-sizing:border-box;min-height:760px}.daily-stage *{box-sizing:border-box}.daily-stage [hidden]{display:none!important}.daily-stage button{font:inherit}.daily-stage::before{content:'';pointer-events:none;position:absolute;inset:0;z-index:-1;background:radial-gradient(ellipse at 72% 40%,#223b393d,transparent 65%)}.df-top,.df-footer{display:flex;justify-content:space-between;align-items:center;gap:20px}.df-top{padding-bottom:22px;border-bottom:1px solid #d9e3d124}.df-brand{font-size:13px;letter-spacing:.17em;font-weight:700}.df-brand span{display:inline-block;width:8px;height:8px;border:1px solid var(--accent);transform:rotate(45deg);margin-right:12px}.df-edition,.df-kicker,.df-coordinate,.df-view-label,.df-footer{font:10px/1.6 monospace;letter-spacing:.12em;text-transform:uppercase}.df-edition{color:var(--muted);text-align:right}.df-main{display:grid;grid-template-columns:minmax(270px,.85fr) minmax(0,1.35fr);gap:30px;align-items:center;min-height:570px;padding:40px 0 25px}.df-copy{position:relative;z-index:2}.df-kicker{color:var(--accent);margin:0 0 24px}.df-copy h1{font-size:clamp(60px,6.6vw,108px);line-height:.88;letter-spacing:-.065em;font-weight:400;margin:0 0 29px}.df-copy h1 em{font-family:Georgia,serif;font-weight:400;color:#b8c9bf}.df-copy h1 span{display:block}.df-panels{display:grid;max-width:370px;min-height:160px}.df-panel{grid-area:1/1;opacity:0;transform:translateY(9px);transition:opacity .4s,transform .55s;pointer-events:none}.df-panel h2{font:12px/1.5 monospace;letter-spacing:.06em;color:var(--accent);margin:0 0 12px}.df-panel p{font-size:12px;line-height:1.95;color:#bdc9c3;margin:0}.daily-stage[data-mode='field'] .df-panel-field,.daily-stage[data-mode='study'] .df-panel-study{opacity:1;transform:translateY(0);pointer-events:auto}.df-view{position:relative;height:510px;min-width:0;border:1px solid #d9e3d126;border-radius:50% 50% 3px 3px;background:radial-gradient(ellipse,#49675c16,transparent 70%);overflow:hidden}.df-view::after{content:'';position:absolute;inset:18px;pointer-events:none;border-bottom:1px solid #d9e3d11c}.df-view-label{position:absolute;left:24px;bottom:23px;z-index:2;color:var(--muted);pointer-events:none;font-size:9px}.df-view-label strong{display:block;color:var(--ink);font-weight:400;margin-bottom:4px}.df-coordinate{position:absolute;top:25px;left:50%;transform:translateX(-50%);z-index:2;color:var(--muted);white-space:nowrap}.df-ghost{position:absolute;inset:0;display:grid;place-items:center;font:400 clamp(160px,23vw,340px)/1 Georgia,serif;color:#c4d9ca06;pointer-events:none}.df-canvas,.df-fallback{position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none}.df-fallback-field,.df-fallback-study{display:none}.daily-stage[data-mode='field'] .df-fallback-field,.daily-stage[data-mode='study'] .df-fallback-study{display:block}.df-state{position:absolute;right:24px;bottom:25px;text-align:right;z-index:2;font:10px/1.7 monospace;color:var(--accent);letter-spacing:.07em;pointer-events:none}.df-state span{display:block;color:var(--muted);font-size:9px}.df-controls{display:grid;grid-template-columns:minmax(150px,.85fr) minmax(0,1.35fr);gap:18px 30px;border-top:1px solid #d9e3d124;padding:21px 0 24px;align-items:start}.df-hint{margin:0;font-size:11px;line-height:1.8;color:var(--muted)}.df-buttons{display:grid;grid-template-columns:1fr 1fr;gap:10px}.df-button{appearance:none;text-align:left;background:transparent;border:1px solid #d9e3d139;color:var(--muted);padding:16px 17px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:11px!important;letter-spacing:.08em;min-height:52px;transition:background .25s,color .25s,border-color .25s}.df-button[aria-pressed='true']{background:var(--ink);color:var(--bg);border-color:var(--ink)}.df-button:hover:not(:disabled){border-color:var(--accent)}.daily-stage button:focus-visible{outline:2px solid var(--accent);outline-offset:5px}.daily-stage button:disabled{cursor:default;opacity:.5}.df-button b{font-weight:400;font-size:17px}.df-motion-row{grid-column:1/-1;display:flex;justify-content:flex-end;align-items:center;gap:12px 18px;flex-wrap:wrap}.df-motion-note{margin:0;font-size:11px;line-height:1.6;color:var(--muted);max-width:520px}.df-motion{display:inline-flex;align-items:center;gap:9px;background:transparent;color:var(--ink);border:1px solid #d9e3d139;padding:10px 14px;min-height:44px;font-size:11px!important;cursor:pointer}.df-motion[aria-pressed='true']{border-color:var(--accent);color:var(--accent)}.df-motion[aria-disabled='true']{cursor:default;border-style:dashed;color:var(--muted)}.df-motion-icon{font:14px/1 monospace}.df-footer{border-top:1px solid #d9e3d124;padding-top:17px;color:var(--muted);font-size:9px}.df-progress-track{position:absolute;bottom:0;left:0;right:0;height:2px;background:#b9cdb711;z-index:3}.df-progress-bar{height:100%;background:var(--accent);transform:scaleX(0);transform-origin:left}.df-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.daily-stage[data-still='true'] .df-panel,.daily-stage[data-still='true'] button{transition:none}@media(min-width:1500px){.daily-stage{max-width:1800px;margin:auto}.df-main{min-height:650px}.df-view{height:580px}}@media(max-width:760px){.daily-stage{padding:21px 21px 18px;min-height:0}.df-top{padding-bottom:17px}.df-edition{font-size:9px;letter-spacing:.04em}.df-main{grid-template-columns:1fr;gap:24px;padding-top:30px;min-height:0}.df-copy h1{font-size:clamp(54px,13vw,86px);margin-bottom:20px}.df-copy h1 span{display:inline}.df-copy h1 span+span::before{content:' '}.df-kicker{margin-bottom:17px;font-size:9px}.df-panels{max-width:480px;min-height:128px}.df-panel p{font-size:12px;line-height:1.9}.df-view{height:390px;border-radius:46% 46% 3px 3px}.df-controls{grid-template-columns:1fr;gap:15px;padding:17px 0 22px}.df-hint br{display:none}.df-button{padding:15px 12px;font-size:10px!important}.df-motion-row{justify-content:space-between}.df-motion-note{font-size:10px;flex:1 1 150px}.df-footer{font-size:9px;letter-spacing:.03em;align-items:flex-start}.df-view-label{left:18px;font-size:8px;letter-spacing:.04em}.df-state{right:18px}.df-coordinate{font-size:9px;letter-spacing:.05em}.df-ghost{font-size:230px}}@media(max-width:360px){.df-view{height:350px}.df-brand{font-size:10px}.df-buttons{gap:7px}.df-button{letter-spacing:0}.df-edition{font-size:8px}.df-footer{font-size:8px}}@media(prefers-reduced-motion:reduce){.daily-stage *{transition:none!important}}
  - name: experiment.js
    language: javascript
    content: |
      const root = document.querySelector('.daily-stage');
      if (root) {
        root.dailyDestroy?.();
        const CONFIG = {
          desktopParticles: 11000, compactParticles: 6200, staticParticles: 1400,
          maxDpr: 1.75, response: 4.6, repulsion: 0.14,
          ribbonWidth: 0.34, tilt: [0.64, -0.38, -0.28], depthRange: 1.6,
          lineSegments: 84, fieldWidth: 5.8
        };
        const $ = selector => root.querySelector(selector);
        const view = $('.df-view'), fallback = $('.df-fallback');
        const renderLabel = $('.df-render-label'), percent = $('.df-percent');
        const bar = $('.df-progress-bar'), status = $('.df-status');
        const motionButton = $('.df-motion'), motionText = $('.df-motion-text');
        const motionIcon = $('.df-motion-icon'), motionNote = $('.df-motion-note');
        const buttons = [...root.querySelectorAll('[data-select]')];
        const panels = [...root.querySelectorAll('.df-panel')];
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        const events = new AbortController();
        let dead = false, generation = 0, gpu = null, gpuReady = false, raf = 0;
        let preparing = false;
        let desired = root.dataset.mode === 'study' ? 1 : 0, current = desired;
        let userPaused = root.dataset.motion === 'paused';
        let last = 0, elapsed = 0, notified = -1, shownPercent = -1;
        let onScreen = !('IntersectionObserver' in window);
        let resizeObserver = null, intersectionObserver = null;
        let halfWidth = 2, halfHeight = 2, pixelHeight = 500;
        let svgWidth = 0, svgHeight = 0;
        const pointer = { x: 0, y: 0, active: 0 };
        const smoothPointer = { x: 0, y: 0, active: 0 };
        const still = () => userPaused || reduced.matches;
        const visible = () => onScreen && !document.hidden;
        const animated = () => !dead && gpuReady && !!gpu && visible() && !still();
        const clamp = value => Math.max(0, Math.min(1, value));
        const smoothstep = (a, b, value) => {
          const t = clamp((value - a) / (b - a));
          return t * t * (3 - 2 * t);
        };
      
        // SVGではhiddenプロパティに依存しない。両表示を同じ関数で排他制御する。
        function setFallbackVisible(show) {
          const canvas = view.querySelector('.df-canvas');
          if (show) {
            canvas?.toggleAttribute('hidden', true);
            fallback.toggleAttribute('hidden', false);
          } else {
            fallback.toggleAttribute('hidden', true);
            canvas?.toggleAttribute('hidden', false);
          }
          root.dataset.renderer = show ? 'static' : 'gpu';
        }
      
        // CPUのSVGとGPUのmat3へ、同じX → Y → Z回転の基底を渡す。
        function orient(p) {
          const [ax, ay, az] = CONFIG.tilt;
          let [x, y, z] = p;
          [y, z] = [y * Math.cos(ax) - z * Math.sin(ax), y * Math.sin(ax) + z * Math.cos(ax)];
          [x, z] = [x * Math.cos(ay) + z * Math.sin(ay), -x * Math.sin(ay) + z * Math.cos(ay)];
          return [x * Math.cos(az) - y * Math.sin(az), x * Math.sin(az) + y * Math.cos(az), z];
        }
        function target(t, width) {
          const twist = t + 0.4 * Math.sin(2 * t);
          const radial = 1.2 + 0.07 * Math.cos(3 * t) + width * CONFIG.ribbonWidth * Math.cos(twist);
          return [radial * Math.cos(t), radial * Math.sin(t) * 0.9,
            0.38 * Math.sin(2 * t) + width * CONFIG.ribbonWidth * Math.sin(twist)];
        }
        const compact = view.clientWidth < 520 || matchMedia('(pointer: coarse)').matches;
        const count = compact ? CONFIG.compactParticles : CONFIG.desktopParticles;
        const positions = new Float32Array(count * 3);
        const targets = new Float32Array(count * 3);
        const seeds = new Float32Array(count * 3);
        let randomState = 46117;
        function random() {
          randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0;
          return randomState / 4294967296;
        }
        for (let i = 0; i < count; i++) {
          const k = i * 3;
          positions.set([(random() - 0.5) * CONFIG.fieldWidth, (random() - 0.5) * 4.2, (random() - 0.5) * 2.2], k);
          targets.set(target(random() * Math.PI * 2, random() * 2 - 1), k);
          seeds.set([random(), random(), random()], k);
        }
        const lp = [], lt = [], ls = [];
        for (let i = 0; i < CONFIG.lineSegments; i++) {
          if (i % 4 === 3) continue;
          for (const j of [i, i + 1]) {
            const p = target(j / CONFIG.lineSegments * Math.PI * 2, 0);
            lt.push(...p);
            lp.push(p[0] * 1.85, p[1] * 1.7, p[2]);
            ls.push(0.35, 0.5, 0.5);
          }
        }
      
        // import前に代替図を生成。resizeでは既存ノードの投影だけ更新する。
        const NS = 'http://www.w3.org/2000/svg';
        const svgDots = [], svgLines = [];
        function node(name, attributes) {
          const element = document.createElementNS(NS, name);
          for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
          return element;
        }
        function createStaticDiagram() {
          const groups = [$('.df-fallback-field'), $('.df-fallback-study')];
          groups.forEach((group, mode) => {
            group.replaceChildren();
            const fragment = document.createDocumentFragment();
            if (mode === 1) {
              for (let k = 0; k < lt.length; k += 6) {
                const a = orient(lt.slice(k, k + 3));
                const b = orient(lt.slice(k + 3, k + 6));
                const depth = smoothstep(-CONFIG.depthRange, CONFIG.depthRange, (a[2] + b[2]) / 2);
                const line = node('path', {
                  d: `M${a[0]} ${-a[1]}L${b[0]} ${-b[1]}`,
                  stroke: '#bda87a', fill: 'none', opacity: 0.08 + depth * 0.23
                });
                svgLines.push(line);
                fragment.append(line);
              }
            }
            const sampleCount = Math.min(CONFIG.staticParticles, count);
            const data = mode ? targets : positions;
            for (let j = 0; j < sampleCount; j++) {
              const k = Math.floor(j * count / sampleCount) * 3;
              const p = orient([data[k], data[k + 1], data[k + 2]]);
              const depth = smoothstep(-CONFIG.depthRange, CONFIG.depthRange, p[2]);
              const warm = mode * smoothstep(0.79, 1, seeds[k]) * 0.6;
              const shade = 0.38 + depth * 0.67;
              const cool = [0.28 + 0.35 * seeds[k + 2], 0.46 + 0.31 * seeds[k + 2], 0.43 + 0.23 * seeds[k + 2]];
              const amber = [0.79, 0.66, 0.43];
              const rgb = cool.map((c, channel) => Math.round(clamp((c * (1 - warm) + amber[channel] * warm) * shade) * 255));
              const opacity = (0.27 + seeds[k + 2] * 0.45) * (mode ? 1 : 0.72) * (0.35 + depth * 0.65);
              const size = (1.15 + seeds[k + 2] * 1.6) * (0.74 + depth * 0.52);
              const circle = node('circle', { cx: p[0], cy: -p[1], fill: `rgb(${rgb.join(',')})`, opacity: Math.min(1, opacity * 1.5) });
              svgDots.push({ circle, size });
              fragment.append(circle);
            }
            group.append(fragment);
          });
        }
        function fitStatic(width, height) {
          if (width === svgWidth && height === svgHeight) return;
          svgWidth = width; svgHeight = height;
          fallback.setAttribute('viewBox', `${-halfWidth} ${-halfHeight} ${halfWidth * 2} ${halfHeight * 2}`);
          const units = halfHeight * 2 / height;
          svgDots.forEach(({ circle, size }) => circle.setAttribute('r', String(size * units * 0.43)));
          svgLines.forEach(line => line.setAttribute('stroke-width', String(units * 0.8)));
        }
        function resetPointer() {
          for (const key of ['x', 'y', 'active']) pointer[key] = smoothPointer[key] = 0;
        }
        function paintProgress() {
          const value = Math.round(current * 100);
          if (value === shownPercent) return;
          shownPercent = value;
          percent.textContent = String(value).padStart(3, '0') + '%';
          bar.style.transform = `scaleX(${value / 100})`;
        }
        function announce() {
          if (notified === desired) return;
          notified = desired;
          status.textContent = desired ? 'Tidal Apertureを表示しています。FIELDで分散状態に戻せます。' : 'フィールドを表示しています。OPEN STUDYで作品を開けます。';
        }
        function updateMotionUI() {
          const unavailable = !gpuReady;
          const effectiveStill = unavailable || still();
          const locked = unavailable || reduced.matches;
          const saved = userPaused ? '停止' : '再生';
          root.dataset.motion = userPaused ? 'paused' : 'running';
          root.dataset.still = String(effectiveStill);
          motionButton.setAttribute('aria-pressed', String(effectiveStill));
          motionButton.setAttribute('aria-disabled', String(locked));
          let text;
          if (reduced.matches) {
            motionIcon.textContent = '—';
            motionText.textContent = '動きは停止中';
            text = `OSのモーション軽減設定により静止中です。保存中の設定：${saved}。作品選択は利用できます。`;
          } else if (unavailable) {
            motionIcon.textContent = '—';
            motionText.textContent = preparing ? '描画を準備中' : '静的表示中';
            text = preparing
              ? `GPU描画を準備中です。停止／再開は準備完了後に利用できます。保存中の設定：${saved}。`
              : `静的表示のため停止／再開は利用できません。保存中の設定：${saved}。作品選択は利用できます。`;
          } else {
            motionIcon.textContent = userPaused ? '▷' : 'Ⅱ';
            motionText.textContent = userPaused ? '動きを再開' : '動きを停止';
            text = userPaused ? '静止中 — 作品選択は即時に反映されます。' : '静止中も作品を選択できます。';
            renderLabel.textContent = `${userPaused ? 'STILL' : 'LIVE'} / ${count.toLocaleString('en-US')} PARTICLES`;
          }
          if (motionNote.textContent !== text) motionNote.textContent = text;
        }
        function cancelLoop() {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        function stopGPU() {
          generation++;
          cancelLoop();
          gpuReady = false;
          preparing = false;
          setFallbackVisible(true);
          const previous = gpu;
          gpu = null;
          previous?.dispose();
        }
        function useStatic(label) {
          stopGPU();
          renderLabel.textContent = label;
          current = desired;
          resetPointer();
          paintProgress();
          announce();
          updateMotionUI();
        }
        function draw() {
          if (dead || !gpuReady || !gpu || !visible()) return;
          try {
            gpu.render(elapsed, current, smoothPointer, still());
          } catch (error) {
            console.warn('Particle field switched to static mode.', error);
            useStatic('STATIC / RENDER UNAVAILABLE');
          }
        }
        function resume() {
          if (!animated() || raf) return;
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
        function refresh() {
          if (animated()) resume();
          else { cancelLoop(); draw(); }
        }
        function frame(now) {
          raf = 0;
          if (!animated()) return;
          const dt = Math.min(Math.max((now - last) / 1000, 0), 0.05);
          last = now;
          elapsed += dt;
          current += (desired - current) * (1 - Math.exp(-CONFIG.response * dt));
          if (Math.abs(desired - current) < 0.001) current = desired;
          const follow = 1 - Math.exp(-8 * dt);
          for (const key of ['x', 'y', 'active']) smoothPointer[key] += (pointer[key] - smoothPointer[key]) * follow;
          paintProgress();
          if (current === desired) announce();
          draw();
          if (animated()) raf = requestAnimationFrame(frame);
        }
        function select(value) {
          if (value !== desired) notified = -1;
          desired = value;
          root.dataset.mode = value ? 'study' : 'field';
          buttons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.select) === value)));
          panels.forEach((panel, i) => panel.setAttribute('aria-hidden', String(i !== value)));
          if (!gpuReady || still() || !visible()) {
            current = desired;
            paintProgress();
            announce();
          }
          refresh();
        }
        function resize() {
          if (dead) return;
          const width = Math.max(1, view.clientWidth);
          const height = Math.max(1, view.clientHeight);
          pixelHeight = height;
          const aspect = width / height;
          halfHeight = Math.max(1.9, 1.76 / aspect);
          halfWidth = halfHeight * aspect;
          fitStatic(width, height);
          try { gpu?.resize?.(width, height, halfWidth, halfHeight); }
          catch (error) { useStatic('STATIC / RESIZE UNAVAILABLE'); }
          refresh();
        }
      
        buttons.forEach(button => {
          button.disabled = false;
          button.addEventListener('click', () => select(Number(button.dataset.select)), { signal: events.signal });
        });
        motionButton.disabled = false;
        motionButton.addEventListener('click', () => {
          // aria-disabledは自動ではクリックを阻止しないため、能力判定でもガードする。
          if (dead || reduced.matches || !gpuReady) return;
          userPaused = !userPaused;
          resetPointer();
          if (userPaused) {
            current = desired;
            paintProgress();
            announce();
          }
          updateMotionUI();
          refresh();
        }, { signal: events.signal });
        view.addEventListener('pointermove', event => {
          if (event.pointerType === 'touch' || still() || !gpuReady || !visible()) return;
          const rect = view.getBoundingClientRect();
          pointer.x = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
          pointer.y = 1 - ((event.clientY - rect.top) / Math.max(1, rect.height)) * 2;
          pointer.active = 1;
        }, { signal: events.signal, passive: true });
        view.addEventListener('pointerleave', () => { pointer.active = 0; }, { signal: events.signal });
        view.addEventListener('pointercancel', () => { pointer.active = 0; }, { signal: events.signal });
        document.addEventListener('visibilitychange', () => {
          resetPointer();
          if (document.hidden) cancelLoop(); else refresh();
        }, { signal: events.signal });
        window.addEventListener('resize', resize, { signal: events.signal, passive: true });
      
        const vertexShader = `
          attribute vec3 aTarget;
          attribute vec3 aSeed;
          uniform mat3 uOrientation;
          uniform float uTime;
          uniform float uMix;
          uniform float uMotion;
          uniform float uDpr;
          uniform float uPointMax;
          uniform float uDepthRange;
          uniform vec2 uPointer;
          uniform float uHover;
          uniform float uRepulsion;
          varying vec3 vTint;
          varying float vAlpha;
          varying float vDepth;
          void main() {
            float phase = aSeed.x * 6.2831853;
            float formed = smoothstep(aSeed.y * 0.18, 0.8 + aSeed.y * 0.2, uMix);
            vec3 p = mix(position, aTarget, formed);
            vec3 flow = vec3(
              sin(uTime * 0.25 + position.y * 1.7 + phase),
              cos(uTime * 0.21 + position.x * 1.2 + phase),
              sin(uTime * 0.19 + phase)
            );
            p += flow * mix(0.20, 0.012, formed) * uMotion;
            p = uOrientation * p;
            vec2 delta = p.xy - uPointer;
            float influence = exp(-dot(delta, delta) * 2.6) * uHover;
            p.xy += delta / max(length(delta), 0.08) * influence * uRepulsion * (1.0 - formed * 0.7);
            vDepth = smoothstep(-uDepthRange, uDepthRange, p.z);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = min(uPointMax, uDpr * (1.15 + aSeed.z * 1.6) * mix(0.74, 1.26, vDepth));
            vec3 cool = mix(vec3(0.28, 0.46, 0.43), vec3(0.63, 0.77, 0.66), aSeed.z);
            vec3 tint = mix(cool, vec3(0.79, 0.66, 0.43), formed * smoothstep(0.79, 1.0, aSeed.x) * 0.6);
            vTint = tint * mix(0.38, 1.05, vDepth);
            vAlpha = mix(0.27, 0.72, aSeed.z) * mix(0.72, 1.0, formed) * mix(0.35, 1.0, vDepth);
          }
        `;
        const fragmentShader = `
          varying vec3 vTint;
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            float alpha = (1.0 - smoothstep(0.08, 0.5, d)) * vAlpha;
            if (alpha < 0.008) discard;
            gl_FragColor = vec4(vTint, alpha);
          }
        `;
        const lineFragment = `
          uniform float uMix;
          varying float vDepth;
          void main() {
            float alpha = smoothstep(0.58, 0.94, uMix) * mix(0.08, 0.31, vDepth);
            gl_FragColor = vec4(vec3(0.74, 0.66, 0.48) * mix(0.5, 1.0, vDepth), alpha);
          }
        `;
      
        async function boot() {
          stopGPU();
          const ticket = generation;
          resetPointer();
          current = desired;
          paintProgress();
          if (dead) return;
          if (reduced.matches) {
            renderLabel.textContent = 'STATIC / REDUCED MOTION';
            updateMotionUI();
            announce();
            return;
          }
          preparing = true;
          renderLabel.textContent = 'STATIC / PREPARING FIELD';
          updateMotionUI();
          let THREE;
          try { THREE = await import('three'); }
          catch (error) {
            if (!dead && ticket === generation) useStatic('STATIC / MODULE UNAVAILABLE');
            return;
          }
          if (dead || ticket !== generation) return;
          let renderer, scene, disposed = false;
          const resources = [];
          const own = resource => { resources.push(resource); return resource; };
          const instance = {
            render: null, resize: null,
            dispose() {
              if (disposed) return;
              disposed = true;
              if (renderer) renderer.domElement.removeEventListener('webglcontextlost', onLost);
              resources.forEach(resource => resource.dispose());
              scene?.clear();
              if (renderer) {
                renderer.dispose();
                renderer.forceContextLoss();
                renderer.domElement.remove();
              }
            }
          };
          function onLost(event) {
            event.preventDefault();
            if (!dead && gpu === instance) useStatic('STATIC / CONTEXT LOST');
          }
          gpu = instance;
          try {
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
            renderer.setClearColor(0x000000, 0);
            renderer.domElement.className = 'df-canvas';
            renderer.domElement.setAttribute('aria-hidden', 'true');
            renderer.domElement.addEventListener('webglcontextlost', onLost);
            view.insertBefore(renderer.domElement, fallback);
            // 初回描画の診断が完了するまではCanvasを表示しない。
            setFallbackVisible(true);
            let shaderFailed = false;
            renderer.debug.checkShaderErrors = true;
            renderer.debug.onShaderError = () => { shaderFailed = true; };
            scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 20);
            camera.position.z = 6;
            const gl = renderer.getContext();
            const maxPoint = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)[1];
            const orientation = new THREE.Matrix3().fromArray([
              ...orient([1, 0, 0]), ...orient([0, 1, 0]), ...orient([0, 0, 1])
            ]);
            const uniforms = {
              uOrientation: { value: orientation },
              uTime: { value: elapsed }, uMix: { value: current },
              uMotion: { value: still() ? 0 : 1 }, uDpr: { value: 1 },
              uPointMax: { value: maxPoint }, uDepthRange: { value: CONFIG.depthRange },
              uPointer: { value: new THREE.Vector2() }, uHover: { value: 0 },
              uRepulsion: { value: CONFIG.repulsion }
            };
            function geometryFrom(p, t, s) {
              const geometry = own(new THREE.BufferGeometry());
              geometry.setAttribute('position', new THREE.BufferAttribute(p, 3));
              geometry.setAttribute('aTarget', new THREE.BufferAttribute(t, 3));
              geometry.setAttribute('aSeed', new THREE.BufferAttribute(s, 3));
              return geometry;
            }
            const materialSettings = {
              uniforms, vertexShader, transparent: true,
              depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending
            };
            const pointMaterial = own(new THREE.ShaderMaterial({ ...materialSettings, fragmentShader }));
            const points = new THREE.Points(geometryFrom(positions, targets, seeds), pointMaterial);
            points.frustumCulled = false;
            scene.add(points);
            const lineMaterial = own(new THREE.ShaderMaterial({ ...materialSettings, fragmentShader: lineFragment }));
            const lines = new THREE.LineSegments(geometryFrom(new Float32Array(lp), new Float32Array(lt), new Float32Array(ls)), lineMaterial);
            lines.frustumCulled = false;
            scene.add(lines);
            instance.resize = (width, height, hw, hh) => {
              if (disposed) return;
              camera.left = -hw; camera.right = hw;
              camera.top = hh; camera.bottom = -hh;
              camera.updateProjectionMatrix();
              renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CONFIG.maxDpr));
              uniforms.uDpr.value = renderer.getPixelRatio();
              renderer.setSize(width, height, false);
            };
            instance.render = (time, mix, mouse, paused) => {
              if (disposed) return;
              uniforms.uTime.value = time;
              uniforms.uMix.value = mix;
              uniforms.uMotion.value = paused ? 0 : 1;
              uniforms.uPointer.value.set(mouse.x * halfWidth, mouse.y * halfHeight);
              uniforms.uHover.value = paused ? 0 : mouse.active;
              renderer.render(scene, camera);
              if (shaderFailed) throw new Error('Shader compilation or linking failed.');
              if (gl.isContextLost()) throw new Error('WebGL context lost.');
            };
            instance.resize(Math.max(1, view.clientWidth), pixelHeight, halfWidth, halfHeight);
            // 非表示のCanvasでも診断用に1回描画。連続RAFは可視条件を満たす時だけ開始。
            instance.render(elapsed, current, smoothPointer, still());
            if (disposed || gpu !== instance || dead || ticket !== generation) return;
            gpuReady = true;
            preparing = false;
            // SVGを隠すのは初回描画成功後のこの経路のみ。
            setFallbackVisible(false);
            updateMotionUI();
            refresh();
          } catch (error) {
            console.warn('Particle field initialization unavailable.', error);
            if (gpu === instance) useStatic('STATIC / WEBGL UNAVAILABLE');
            else instance.dispose();
          }
        }
      
        function motionChanged() {
          if (!dead) boot();
        }
        reduced.addEventListener('change', motionChanged);
        function destroy() {
          if (dead) return;
          dead = true;
          events.abort();
          reduced.removeEventListener('change', motionChanged);
          resizeObserver?.disconnect();
          intersectionObserver?.disconnect();
          stopGPU();
          renderLabel.textContent = 'STATIC / GENERATIVE DIAGRAM';
          current = desired;
          paintProgress();
          updateMotionUI();
          buttons.forEach(button => { button.disabled = true; });
          motionButton.disabled = true;
          motionNote.textContent = '表示を終了しました。再初期化まで操作は利用できません。';
          if (root.dailyDestroy === destroy) delete root.dailyDestroy;
        }
        root.dailyDestroy = destroy;
        window.addEventListener('pagehide', event => {
          if (event.persisted) useStatic('STATIC / PAUSED');
          else destroy();
        }, { signal: events.signal });
        window.addEventListener('pageshow', event => {
          if (event.persisted && !dead) { resize(); boot(); }
        }, { signal: events.signal });
      
        setFallbackVisible(true);
        createStaticDiagram();
        resize();
        if ('ResizeObserver' in window) {
          resizeObserver = new ResizeObserver(resize);
          resizeObserver.observe(view);
        }
        if ('IntersectionObserver' in window) {
          intersectionObserver = new IntersectionObserver(entries => {
            if (dead) return;
            const entry = entries[entries.length - 1];
            const next = entry.isIntersecting && entry.intersectionRatio > 0;
            if (next === onScreen) return;
            onScreen = next;
            resetPointer();
            if (!onScreen) cancelLoop(); else refresh();
          }, { threshold: 0 });
          intersectionObserver.observe(view);
        }
        updateMotionUI();
        select(desired);
        boot();
      }
      export {};
      
---

# Day 046 — GLSLで作る、奥行きを結ぶパーティクルフィールド

> **Reference study:** [Well, Dots, Lines, Planes. — Seunghyuk Kim](https://www.cssdesignawards.com/sites/well-dots-lines-planes/50078/) / CSS Design Awards  
> **主軸:** GLSL / **品質レビュー:** 88/100

分散・形成・保持・解散を閲覧状態へ対応させる原則を参考にしました。名称、文章、配色、構図、帯幅までねじれる形状、斜め投影、停止操作は独自設計です。GLSL／Three.js採用は参考元で確認しておらず、今回のコードは独自の実装仮説です。

# GLSLで作る、奥行きを結ぶパーティクルフィールド

2026-11-17 · Day 046 / 365

## 参考にした表現

参考元は **Well, Dots, Lines, Planes. — Seunghyuk Kim**。掲載プラットフォームは **CSS Design Awards** です。

https://www.cssdesignawards.com/sites/well-dots-lines-planes/50078/

提供されたリサーチから研究したのは、分散した粒子を作品の構造へ集め、再び解くことで閲覧状態を伝える設計です。「形成が選択を示し、保持が閲覧を支え、解散が探索への復帰になる」という原則を抽出しました。

掲載情報におけるWebGLの記載と、今回のGLSL／Three.jsによる実装仮説は区別しています。参考サイトの内部コード、性能、アクセシビリティは確認していません。掲載ページの再閲覧や受賞情報の独立検証も行っていません。

## 完成形

架空の環境観測プロジェクト **Tidal Aperture** を開く、単一作品のWorksインデックスです。アイボリーの編集的な見出しに、青緑の点群とアンバーの構造線を組み合わせています。

- **OPEN STUDY**：散在した粒子が、空洞を囲むねじれた帯へ集合します。
- **FIELD**：同じ点群を解き、分散状態へ戻します。
- **動きを停止**：形成率を選択状態へ確定し、揺れとポインター反発を除いた静止画にします。停止中も作品選択は即時に反映されます。
- **動きを再開**：現在の作品選択を保って連続描画を再開します。
- **静的表示中**：GPUが利用できない場合の表示です。停止／再開操作は無効化し、以前の再生設定を保持していることを説明します。作品選択は引き続き利用できます。

ボタンはマウス、タッチ、キーボードで操作できます。ポインター反発は補助的な反応であり、作品を開くための必須操作ではありません。

## 実装設計

### 選択とアニメーションを分ける

`desired` は確定済みの選択、`current` は描画上の形成率です。本文とボタンは明示的な選択に追従し、GPUの形成率を本文の切り替え条件にしません。途中で逆操作した場合は現在値から指数追従します。本文は同一グリッド内でクロスフェードし、高さの跳ねを防ぎます。

本文の切り替えに連続値の閾値を使わないため、境界付近の往復によるちらつきは発生させません。History APIは使用していません。

### 利用者の設定と表示能力を分ける

`userPaused` は利用者の停止指定、`gpuReady` は初回描画を通過したGPU表示の利用可否です。GPU用インスタンスが存在するだけでは、操作可能とは判定しません。

停止指定は `data-motion` に保持します。GPUの再生成、OS設定の変更、同じルートでの再初期化でも失いません。OSのモーション軽減が有効な間は静的表示を優先します。

停止ボタンの `aria-pressed` は実際に静止しているかを示します。OS設定による停止中、初期化中、GPU退避中は `aria-disabled="true"` とし、クリック処理でも操作を拒否します。フォーカスは維持し、`aria-describedby` で無効化理由と保存中の設定を説明します。静的表示中に「動きを再開」と表示して、動かない操作を案内することはありません。

### SVGとGPUを排他的に表示する

表示切り替えを `setFallbackVisible()` に集約します。SVGはHTMLElementの `hidden` プロパティを前提にせず、`toggleAttribute('hidden', ...)` で属性を明示的に操作します。CSSの `.daily-stage [hidden]{display:none!important}` が、SVGとCanvasのどちらにも適用されます。

初期化中はSVGを表示し、Canvasを非表示にします。初回の `renderer.render()` が終了し、シェーダーエラーとコンテキスト喪失が検出されなかった場合だけ、SVGへhidden属性を付け、Canvasから除去します。静的退避と破棄では逆の操作を行います。

これにより、形成途中のGPU描画にSVGの完成形が重なることを防ぎます。CanvasをCSSで隠している間も起動診断用の描画は実行します。ただし、この診断は実機での見栄えや性能を保証するものではありません。

SPAから取り外す場合は `root.dailyDestroy()` を呼んでください。非同期importには世代チェックを設け、破棄後にGPUが復活することを防ぎます。

## シェーダー/レンダリング

### 投影して初めて見えるねじれ

`target()` は角度 `t` と帯幅 `width` から点を生成します。帯幅方向の変位を `cos(twist)` と `sin(twist)` で径方向・奥行き方向へ分配し、一周すると幅方向の軸も一回転する帯を作ります。

さらにX・Y・Zの順にモデル回転を適用します。正投影カメラ自体は正面にありますが、頂点シェーダーの `uOrientation` が形状を傾けるため、元のz座標が画面上のx・yにも影響します。

回転後のzを正規化した `vDepth` によって、近い粒子は大きく、明るく、濃く、遠い粒子は小さく、暗く、薄くします。構造線も同じ深度係数を参照します。

加算合成を用いるため、不透明な帯による物理的遮蔽ではありません。後方の点も透けて見える観測図として、投影された輪郭、帯幅の変化、深度によるサイズ・明度・不透明度の差で前後を伝えます。

### GPUに保持する状態

点ごとに分散座標、目標座標、乱数シードを一度転送します。形成遅延、座標補間、三角関数による流れ、反発は頂点シェーダーで処理します。フラグメントシェーダーでは `gl_PointCoord` から柔らかな円形を描きます。疎な線は同じ頂点変形を共有し、形成後半だけ現れます。

停止時は `uMotion = 0`、`uHover = 0` にします。途中の揺れを凍結するのではなく、選択された状態の基準形へ整え、一度描いてRAFを停止します。

### ライブとSVGの輪郭を揃える

静的SVGは、ライブ用に生成した座標配列を間引き、同じ `orient()` と正投影範囲で投影します。形成状態では同じ帯、分散状態では同じフィールドを描きます。線の座標も共通です。

SVGでは点数を減らし、ソフトな点と加算合成を近似しています。ピクセル単位の一致ではありませんが、輪郭、傾き、空洞、前後の濃淡を共通化しています。リサイズ時は投影範囲と点半径を更新します。

## 実務での使いどころ

研究開発プロジェクトの入口、ブランドの活動紹介、単一作品を丁寧に開くWorks導入部に適しています。粒子の集合が選択状態そのものを表すため、背景装飾とは役割が異なります。

詳細ページを接続する場合は、本文に通常のリンクを追加してください。形成完了をリンク利用の必須条件にせず、停止中や静的表示でも同じ情報へ到達できる設計を維持します。非表示パネルにリンクを追加する際は、`inert` 等によるフォーカス制御も追加してください。

## 調整パラメータ

| パラメータ | 初期値 | 役割 |
| --- | --- | --- |
| `desktopParticles` | 11000 | 広幅環境の粒子数 |
| `compactParticles` | 6200 | 狭幅・粗いポインター環境の粒子数 |
| `staticParticles` | 1400 | SVGの各状態に表示する点数上限 |
| `maxDpr` | 1.75 | GPU描画のDPR上限 |
| `response` | 4.6 | 形成・解散の追従速度 |
| `repulsion` | 0.14 | ポインター反発量 |
| `ribbonWidth` | 0.34 | 帯の半幅 |
| `tilt` | [0.64, -0.38, -0.28] | X・Y・Z順のモデル回転、ラジアン |
| `depthRange` | 1.6 | 深度による濃淡の正規化範囲 |
| `lineSegments` | 84 | 疎な中心線の分割数 |

粒子数は起動時の幅と入力特性で決めます。実測フレームレートに応じた動的LODではありません。リサイズでは点群を再生成しません。

## パフォーマンスとアクセシビリティ

連続描画の停止条件を分けています。

1. **タブ非表示**：RAFを停止します。復帰時に時刻をリセットし、非表示だった時間を加算しません。
2. **画面外**：IntersectionObserverで展示領域を監視し、領域が外れたらRAFを停止します。Observerがない環境では他の停止条件を適用します。
3. **利用者による停止**：形成率を選択状態へ確定し、揺れと反発を除いて一度描画します。選択変更とリサイズでは単発描画を行います。
4. **OSのモーション軽減**：WebGLを破棄し、共通投影による静的SVGを表示します。利用者の停止指定は変更しません。
5. **GPU利用不可**：SVGへ排他的に退避し、停止／再開を無効化します。作品選択と状態説明は機能を維持します。

画面外または非表示中に明示的な選択があった場合は、形成率を終端へ確定します。見えていない選択変更を復帰後に再演しません。

ボタンはネイティブbuttonを使用します。形成率は毎フレーム読み上げず、選択状態の完了だけを通知します。モーションの状態説明は別の短いライブ領域です。

import失敗、初期化失敗、シェーダーエラー、コンテキスト喪失時は静的表示へ退避します。コンテキスト喪失直後の自動再試行は行いません。cleanupではRAF、イベント、ResizeObserver、IntersectionObserver、Geometry、Material、Rendererを解放します。

### 組み込みと確認手順

JavaScriptはES moduleとして読み込み、`three` をホスト側のバンドラーまたはimport mapで解決してください。Three.jsのバージョンは案件側で固定してください。画像、外部モデル、通信APIは使用していません。

ブラウザ・実機・性能検証は未実施です。公開前には次を確認してください。

- GPU起動前・成功後・退避後について、ElementsパネルでSVGとCanvasのhidden属性が排他的であることを確認する。
- GPU成功後にOPEN STUDYを選び、途中の形成率でSVGの完成形が重ならないことを確認する。
- 形成途中で反転し、追従速度、本文、押下状態、読み上げ通知の整合を確認する。
- 停止・再開時の形状変化と、停止中の選択・リサイズで連続RAFが再開しないことを確認する。
- 停止 → OS軽減ON → OFF、同じルートの再初期化で、保存された停止指定が戻ることを確認する。
- import失敗とコンテキスト喪失を再現し、静的表示の説明、停止／再開の無効化、作品選択の継続を確認する。
- 画面外と別タブでRAFが止まり、復帰時に時間差が加算されないことをPerformanceパネルで確認する。
- Safari／Chrome／Firefox、iOS／Androidで、点サイズ、輝度、深度の判別性、GPU負荷を確認する。
- ライブ停止状態とSVGのスクリーンショットで、空洞・傾き・輪郭の対応を確認する。
- 320px幅、200%ズーム、キーボード操作で、補助ラベルの収まりとボタン・説明への到達を確認する。
- SPAのマウント／破棄、BFCache復帰で、資源解放、状態保持、表示の排他性を確認する。

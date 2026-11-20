---
title: "GLSLで作る、触れた速度が残るポストプロセスHero"
description: "入力速度を変位場へ蓄積し、生成レリーフに屈折と色収差を残すGLSL製Hero。強さ調整と原画比較に加え、SVGとの排他的表示、BFCache復帰、リサイズ集約まで設計します。"
category: "GLSLポストプロセスHero"
categorySlug: "glsl-post-processing-hero"
categoryDescription: "生成シーンや画像をオフスクリーンで描画し、GLSLの変位場・色収差・合成処理を、Heroの入力応答や比較UIへ結びつける表現。"
tags:
  - "GLSL"
  - "Post Processing"
  - "Three.js"
  - "Ping-pong Buffer"
  - "インタラクティブHero"
  - "アクセシビリティ"
  - "Daily Lab"
date: "2026年11月21日"
publishedAt: "2026-11-21"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 50
focus: "GLSL"
concept: "生成した銅色レリーフを、入力速度の余韻を比較検討するモーション・プルーフへ変える。低解像度の変位場から局所屈折・色収差・計測線を生み、強さ調整と原画比較をUIの中心にする。静的図版とGPU描画の排他的表示、復帰、リサイズまで一貫した状態として扱う。"
referenceTitle: "Reactive cursor interaction — Lusion v3."
referenceUrl: "https://www.awwwards.com/inspiration/reactive-cursor-interaction"
referencePlatform: "Awwwards — Elements"
qualityScore: 86
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" data-study="afterform" data-display="static" aria-label="AFTERFORM モーション・プルーフ">
        <header class="af-header">
          <div class="af-brand"><span class="af-mark" aria-hidden="true"></span>AFTERFORM</div>
          <span>FIELD STUDY — 050 / 365</span>
          <time datetime="2026-11-21">21 NOV 2026</time>
        </header>
        <div class="af-layout">
          <div class="af-copy">
            <p class="af-eyebrow">POST PROCESS / MOTION PROOF</p>
            <h1>Motion,<br>held in<br><em>matter.</em></h1>
            <p class="af-intro">触れた速度を、面の記憶へ。<br>銅色のレリーフに残る屈折と余韻を、<br>あなたの感覚で調整してください。</p>
            <div class="af-controls">
              <label class="af-range-label" for="af050-strength">残像の強さ <output for="af050-strength" data-strength-value>65 / 100</output></label>
              <input id="af050-strength" data-strength type="range" min="0" max="100" value="65" disabled>
              <div class="af-buttons">
                <button class="af-button af-primary" data-demo type="button" disabled>応答を試す ↗</button>
                <button class="af-button" data-compare type="button" aria-pressed="false" disabled>原画と比較</button>
              </div>
              <div class="af-foot-controls">
                <button class="af-pause" data-pause type="button" aria-pressed="false" disabled>動きを停止</button>
                <span class="af-mode" data-mode role="status" aria-live="polite" aria-atomic="true">静止版を表示中</span>
              </div>
            </div>
          </div>
          <figure class="af-figure">
            <div class="af-surface" role="img" aria-label="銅色の同心レリーフを描いた静的な代替図版。現在は動きません。">
              <svg class="af-fallback" viewBox="0 0 600 650" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
                <g stroke="#3e493d" fill="none" stroke-width="1" opacity=".45"><path d="M0 130H600M0 260H600M0 390H600M0 520H600M120 0V650M240 0V650M360 0V650M480 0V650"/><path d="M300 70V580M60 325H540" stroke-dasharray="2 6"/></g>
                <g transform="translate(300 325) rotate(-16)" fill="none">
                  <g stroke="#553a2b" stroke-width="14"><ellipse rx="205" ry="243"/><ellipse rx="186" ry="220"/><ellipse rx="167" ry="197"/><ellipse rx="148" ry="174"/><ellipse rx="129" ry="151"/><ellipse rx="110" ry="128"/><ellipse rx="91" ry="105"/><ellipse rx="72" ry="82"/><ellipse rx="53" ry="59"/><ellipse rx="34" ry="36"/></g>
                  <g transform="translate(-2 -3)" stroke="#bd7f51" stroke-width="7"><ellipse rx="205" ry="243"/><ellipse rx="186" ry="220"/><ellipse rx="167" ry="197"/><ellipse rx="148" ry="174"/><ellipse rx="129" ry="151"/><ellipse rx="110" ry="128"/><ellipse rx="91" ry="105"/><ellipse rx="72" ry="82"/><ellipse rx="53" ry="59"/><ellipse rx="34" ry="36"/></g>
                  <g transform="translate(-4 -5)" stroke="#e7bd85" stroke-width="1.5" opacity=".8"><ellipse rx="205" ry="243"/><ellipse rx="186" ry="220"/><ellipse rx="167" ry="197"/><ellipse rx="148" ry="174"/><ellipse rx="129" ry="151"/><ellipse rx="110" ry="128"/><ellipse rx="91" ry="105"/><ellipse rx="72" ry="82"/><ellipse rx="53" ry="59"/><ellipse rx="34" ry="36"/></g>
                </g>
              </svg>
              <div class="af-plate-top" aria-hidden="true"><span>SPECIMEN 050 / Cu</span><span>RELIEF — SERIES A</span></div>
              <i class="af-cross one" aria-hidden="true"></i><i class="af-cross two" aria-hidden="true"></i>
              <div class="af-plate-bottom" aria-hidden="true"><span data-plate>STATIC EDITION</span><span>GENERATED / NO IMAGE ASSETS</span></div>
            </div>
            <figcaption><span data-instruction>静止版を表示しています。動的な操作は利用できません。</span><span>01 — CONCENTRIC MEMORY</span></figcaption>
          </figure>
        </div>
        <footer class="af-footer">
          <p><strong>01 / INPUT BECOMES FORM</strong>速度を受け取り、局所的な残像に変換。</p>
          <p><strong>02 / RETURN TO NEUTRAL</strong>入力が止まると、元の静けさへ。</p>
          <span class="af-edition">GLSL / POST PROCESSING</span>
        </footer>
      </section>
  - name: styles.css
    language: css
    content: |
      .daily-stage[data-study='afterform']{--af-bg:#151a18;--af-ink:#efeade;--af-muted:#a5afa5;--af-line:#384039;--af-accent:#d0ed99;position:relative;isolation:isolate;overflow:hidden;background:var(--af-bg);color:var(--af-ink);font-family:Arial,'Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif;padding:26px clamp(20px,4vw,64px) 24px;box-sizing:border-box}.daily-stage[data-study='afterform'] *{box-sizing:border-box}.daily-stage[data-study='afterform'] [hidden]{display:none!important}.af-header{display:flex;justify-content:space-between;gap:20px;align-items:center;padding-bottom:25px;border-bottom:1px solid var(--af-line);font-size:11px;letter-spacing:.14em}.af-brand{font-weight:700;font-size:15px;letter-spacing:.03em;display:flex;align-items:center;gap:12px}.af-mark{width:18px;height:18px;border:1px solid var(--af-accent);border-radius:50%;box-shadow:inset 5px 0 var(--af-accent)}.af-header time{color:var(--af-muted)}.af-layout{display:grid;grid-template-columns:minmax(260px,.85fr) minmax(0,1.25fr);gap:clamp(24px,4vw,70px);padding:42px 0 30px;align-items:center}.af-eyebrow{font:10px/1.5 monospace;letter-spacing:.16em;color:var(--af-accent);margin:0 0 27px}.af-copy h1{font-size:clamp(56px,6.6vw,106px);line-height:.94;letter-spacing:-.065em;font-weight:400;margin:0 0 28px}.af-copy h1 em{font-style:normal;color:var(--af-accent)}.af-intro{max-width:340px;font-size:13px;line-height:1.95;color:var(--af-muted);margin:0 0 32px}.af-controls{max-width:355px;padding-top:20px;border-top:1px solid var(--af-line)}.af-range-label{display:flex;align-items:center;justify-content:space-between;font-size:11px;letter-spacing:.04em;margin-bottom:14px}.af-range-label output{font:11px monospace;color:var(--af-accent)}.af-controls input[type='range']{width:100%;height:26px;margin:0 0 18px;accent-color:var(--af-accent);cursor:pointer}.af-buttons{display:grid;grid-template-columns:1fr 1fr;gap:8px}.af-button{font:inherit;font-size:11px;letter-spacing:.04em;border:1px solid #53604f;background:transparent;color:var(--af-ink);padding:13px 10px;min-height:44px;border-radius:2px;cursor:pointer;transition:background .2s,color .2s,border-color .2s}.af-button.af-primary{background:var(--af-accent);border-color:var(--af-accent);color:#192116}.af-button:hover:not(:disabled){background:#e5f5c5;color:#192116;border-color:#e5f5c5}.af-button[aria-pressed='true']{border-color:var(--af-accent);color:var(--af-accent);background:#293127}.af-button:disabled,.af-controls input:disabled{opacity:.42;cursor:default}.daily-stage[data-study='afterform'] :focus-visible{outline:2px solid var(--af-accent);outline-offset:5px}.af-foot-controls{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:16px}.af-pause{border:0;border-bottom:1px solid #65705f;padding:5px 0;min-height:44px;background:transparent;color:var(--af-muted);font-family:inherit;font-size:11px;cursor:pointer}.af-pause:disabled{opacity:.5;cursor:default}.af-mode{font:10px/1.5 monospace;color:var(--af-muted);text-align:right}.af-figure{margin:0;min-width:0}.af-surface{position:relative;height:clamp(420px,43vw,650px);overflow:hidden;background:#171e1a;border:1px solid var(--af-line);touch-action:pan-y;cursor:default}.daily-stage[data-display='live'] .af-surface{cursor:crosshair}.af-surface canvas,.af-fallback{position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none}.af-fallback{background:#171e1a}.af-plate-top,.af-plate-bottom{position:absolute;left:20px;right:20px;display:flex;justify-content:space-between;gap:12px;font:9px/1.5 monospace;letter-spacing:.12em;pointer-events:none;color:#b7bfae}.af-plate-top{top:18px}.af-plate-bottom{bottom:18px}.af-plate-top span:first-child{color:var(--af-accent)}.af-cross{position:absolute;width:12px;height:12px;pointer-events:none}.af-cross:before,.af-cross:after{content:'';position:absolute;background:#7b8575}.af-cross:before{height:1px;width:12px;top:5px}.af-cross:after{width:1px;height:12px;left:5px}.af-cross.one{top:52px;left:18px}.af-cross.two{right:18px;bottom:52px}.af-figure figcaption{display:flex;gap:16px;justify-content:space-between;margin-top:12px;color:var(--af-muted);font-size:10px;line-height:1.7;min-height:34px}.af-figure figcaption span:last-child{font-family:monospace;white-space:nowrap}.af-footer{display:grid;grid-template-columns:1fr 1fr auto;gap:24px;border-top:1px solid var(--af-line);padding-top:20px;color:var(--af-muted);font-size:10px;line-height:1.8}.af-footer strong{display:block;font:10px/1.8 monospace;letter-spacing:.12em;color:var(--af-ink);margin-bottom:4px}.af-footer p{margin:0}.af-edition{align-self:end;font-family:monospace;color:var(--af-accent)}@media(min-width:1500px){.af-layout{max-width:1450px;margin:auto}}@media(max-width:760px){.af-header{font-size:9px;padding-bottom:18px}.af-header time{display:none}.af-layout{grid-template-columns:1fr;padding-top:28px;gap:28px}.af-copy{display:grid;grid-template-columns:1fr 1fr;gap:0 20px}.af-eyebrow{grid-column:1/-1;margin-bottom:20px}.af-copy h1{font-size:clamp(55px,11vw,78px);margin-bottom:18px}.af-intro{align-self:end;font-size:11px;line-height:1.85;margin-bottom:20px}.af-controls{grid-column:1/-1;max-width:none}.af-surface{height:clamp(350px,95vw,510px)}.af-figure figcaption{font-size:9px}.af-footer{grid-template-columns:1fr 1fr;gap:14px}.af-edition{grid-column:1/-1}}@media(max-width:380px){.af-copy{display:block}.af-copy h1{font-size:68px}.af-intro{max-width:280px}.af-plate-top,.af-plate-bottom{left:12px;right:12px;font-size:8px}.af-figure figcaption{flex-direction:column;gap:3px}}@media(prefers-reduced-motion:reduce){.daily-stage[data-study='afterform'] *{transition:none!important}}
  - name: experiment.js
    language: javascript
    content: |
      const root = document.querySelector('.daily-stage[data-study="afterform"]');
      if (root) {
        root.dispatchEvent(new Event('daily:destroy'));
        const $ = selector => root.querySelector(selector);
        const surface = $('.af-surface'), fallback = $('.af-fallback');
        const range = $('[data-strength]'), output = $('[data-strength-value]');
        const demoButton = $('[data-demo]'), compareButton = $('[data-compare]');
        const pauseButton = $('[data-pause]'), mode = $('[data-mode]');
        const plate = $('[data-plate]'), instruction = $('[data-instruction]');
        // Production controls: seconds and normalized UV distances.
        const CONFIG = {
          dprCap: 1.75, pixelBudget: 1600000, fieldLongSide: 192,
          follow: 20, radius: 0.105, decay: 2.5, displacement: 0.075,
          dispersion: 0.0022, settleSeconds: 2.8, demoSeconds: 1.2,
          maxVelocity: 2.8
        };
        const abort = new AbortController();
        const listen = (el, type, fn, options = {}) => el.addEventListener(type, fn, { ...options, signal: abort.signal });
        const media = matchMedia('(prefers-reduced-motion: reduce)');
        let dead = false, suspended = false, failed = false, ready = false;
        let paused = false, compare = false, visible = true, reduced = media.matches;
        let epoch = 0, loadingTicket = 0;
        let raf = 0, resizeRAF = 0, resizeDirty = true, sizeKey = '';
        let lastTime = 0, lastActivity = -100, demoStart = -1, tracked = false;
        let renderer, T, scene, camera, quad, source, fieldA, fieldB;
        let sourceMat, fieldMat, postMat, target, smooth, previous, velocity;
        let shaderError = false;
        const owned = [];
        const own = resource => { owned.push(resource); return resource; };
        range.value = '65'; output.value = '65 / 100';
      
        const canRender = () => ready && !paused && !reduced && !dead && !suspended && !failed;
        const canAnimate = () => canRender() && visible && !document.hidden;
        const stop = () => { cancelAnimationFrame(raf); raf = 0; lastTime = 0; };
      
        // The only presentation authority. Use attributes for SVG, not HTMLElement.hidden.
        function syncUI() {
          const active = canRender();
          if (renderer) renderer.domElement.toggleAttribute('hidden', !active);
          if (dead) fallback.removeAttribute('hidden');
          else fallback.toggleAttribute('hidden', active);
          root.dataset.display = active ? (compare ? 'source' : 'live') : 'static';
          range.disabled = demoButton.disabled = compareButton.disabled = !active;
          pauseButton.disabled = !ready || reduced || suspended || failed || dead;
          pauseButton.textContent = paused ? '動きを再開' : '動きを停止';
          pauseButton.setAttribute('aria-pressed', String(paused));
          compareButton.setAttribute('aria-pressed', String(compare));
          compareButton.textContent = compare ? '効果に戻る' : '原画と比較';
      
          let status = '静止版を表示中';
          let help = '静止版を表示しています。動的な操作は利用できません。';
          let label = '銅色の同心レリーフを描いた静的な代替図版。現在は動きません。';
          if (!dead) {
            if (reduced) {
              status = '低減設定 / 静止版';
              help = '動きを減らす設定に合わせ、静的な代替図版を表示しています。';
            } else if (failed) {
              status = '静止版 / GPU利用不可';
              help = '描画機能を利用できないため、静的な代替図版を表示しています。';
            } else if (suspended) {
              status = '待機中 / 静止版';
              help = 'ページの復帰後に描画機能を準備します。';
            } else if (paused && ready) {
              status = '停止中 / 静止版';
              help = '動きを停止しています。「動きを再開」で操作できます。';
            } else if (active) {
              status = compare ? '原画 / SOURCE' : '応答中 / LIVE FIELD';
              help = compare ? '処理前の原画です。「効果に戻る」で屈折を確認できます。' : '面をなぞる、または「応答を試す」を選択。';
              label = compare ? '銅色の同心レリーフ。ポストプロセスを適用していない原画。' : '銅色の同心レリーフ。なぞった場所に屈折が残り、ゆっくり収束します。';
            } else if (loadingTicket) {
              status = '準備中 / 静止版';
              help = '描画機能を準備しています。現在は静的な代替図版です。';
            }
          }
          if (mode.textContent !== status) mode.textContent = status;
          instruction.textContent = help;
          surface.setAttribute('aria-label', label);
          plate.textContent = active ? (compare ? 'SOURCE / UNPROCESSED' : 'POINTER / VELOCITY FIELD') : 'STATIC EDITION';
        }
      
        function releaseGPU() {
          // Invalidate any pending import before releasing resources.
          epoch++; loadingTicket = 0;
          stop(); cancelAnimationFrame(resizeRAF); resizeRAF = 0;
          ready = false; demoStart = -1; tracked = false;
          lastActivity = -100; sizeKey = ''; resizeDirty = true;
          if (renderer) renderer.domElement.removeEventListener('webglcontextlost', contextLost);
          for (const resource of owned.splice(0)) resource.dispose();
          if (renderer) {
            renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
          }
          renderer = null; scene = camera = quad = null;
          source = fieldA = fieldB = sourceMat = fieldMat = postMat = null;
        }
        function fail(error) {
          if (dead) return;
          failed = true;
          console.warn('AFTERFORM: static edition enabled.', error);
          releaseGPU(); syncUI();
        }
        function contextLost(event) {
          event.preventDefault(); fail(new Error('WebGL context lost'));
        }
        function safely(fn) {
          if (dead) return;
          try { fn(); } catch (error) { fail(error); }
        }
        function pass(material, destination) {
          quad.material = material;
          renderer.setRenderTarget(destination);
          renderer.render(scene, camera);
          if (shaderError) throw new Error('Shader compilation or linking failed');
        }
        function clearFields() {
          renderer.setClearColor(new T.Color(128 / 255, 128 / 255, 0), 1);
          renderer.setRenderTarget(fieldA); renderer.clear();
          renderer.setRenderTarget(fieldB); renderer.clear();
          renderer.setRenderTarget(null);
        }
        function drawPost() {
          postMat.uniforms.uField.value = fieldA.texture;
          postMat.uniforms.uStrength.value = Number(range.value) / 100;
          postMat.uniforms.uCompare.value = compare ? 1 : 0;
          pass(postMat, null);
        }
        function resetField(draw = true) {
          stop(); demoStart = -1; tracked = false; lastActivity = -100;
          if (!ready) return;
          clearFields(); previous.copy(smooth); target.copy(smooth); velocity.set(0, 0);
          if (draw) drawPost();
        }
      
        // Both resize sources enter this queue. Unchanged dimensions never regenerate Source.
        function applyResize(force = false) {
          if (!ready) return;
          resizeDirty = false;
          const w = Math.max(1, surface.clientWidth);
          const h = Math.max(1, surface.clientHeight);
          const dpr = Math.min(window.devicePixelRatio || 1, CONFIG.dprCap, Math.sqrt(CONFIG.pixelBudget / (w * h)));
          const key = w + ':' + h + ':' + dpr;
          if (!force && key === sizeKey) return;
          renderer.setPixelRatio(dpr); renderer.setSize(w, h, false);
          const size = renderer.getDrawingBufferSize(new T.Vector2());
          source.setSize(size.x, size.y);
          const aspect = w / h;
          const fw = Math.max(32, Math.round(CONFIG.fieldLongSide * Math.min(1, aspect)));
          const fh = Math.max(32, Math.round(CONFIG.fieldLongSide * Math.min(1, 1 / aspect)));
          fieldA.setSize(fw, fh); fieldB.setSize(fw, fh);
          sourceMat.uniforms.uAspect.value = aspect;
          fieldMat.uniforms.uAspect.value = aspect;
          postMat.uniforms.uAspect.value = aspect;
          pass(sourceMat, source); resetField();
          sizeKey = key;
        }
        function scheduleResize() {
          resizeDirty = true;
          if (!ready || dead || suspended || document.hidden || !visible || resizeRAF) return;
          resizeRAF = requestAnimationFrame(() => {
            resizeRAF = 0;
            if (ready && !dead && !suspended && !document.hidden && visible) safely(() => applyResize());
          });
        }
        function cancelResize() { cancelAnimationFrame(resizeRAF); resizeRAF = 0; }
        function wake() {
          if (!canAnimate() || raf) return;
          raf = requestAnimationFrame(frame);
        }
        function frame(ms) {
          raf = 0;
          if (!canAnimate()) { lastTime = 0; return; }
          try {
            const seconds = ms / 1000;
            const dt = lastTime ? Math.min(0.033, Math.max(0.001, seconds - lastTime)) : 1 / 60;
            lastTime = seconds;
            if (demoStart >= 0) {
              const p = Math.min(1, (seconds - demoStart) / CONFIG.demoSeconds);
              target.set(0.22 + p * 0.56, 0.50 + Math.sin(p * Math.PI * 2) * 0.19);
              lastActivity = seconds;
              if (p >= 1) demoStart = -1;
            }
            previous.copy(smooth);
            smooth.lerp(target, 1 - Math.exp(-CONFIG.follow * dt));
            velocity.copy(smooth).sub(previous).divideScalar(dt);
            if (velocity.length() > CONFIG.maxVelocity) velocity.setLength(CONFIG.maxVelocity);
            fieldMat.uniforms.uPrevious.value = fieldA.texture;
            fieldMat.uniforms.uDt.value = dt;
            pass(fieldMat, fieldB);
            [fieldA, fieldB] = [fieldB, fieldA];
            drawPost();
            if (seconds - lastActivity < CONFIG.settleSeconds || demoStart >= 0) wake();
            else {
              clearFields(); drawPost(); lastTime = 0; tracked = false;
            }
          } catch (error) { fail(error); }
        }
        function point(event, first = false) {
          if (!canAnimate() || !event.isPrimary) return;
          if (event.pointerType === 'touch' && event.type === 'pointermove' && !event.buttons) return;
          const rect = surface.getBoundingClientRect();
          const x = (event.clientX - rect.left - surface.clientLeft) / Math.max(1, surface.clientWidth);
          const y = 1 - (event.clientY - rect.top - surface.clientTop) / Math.max(1, surface.clientHeight);
          target.set(Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y)));
          if (!tracked || first || demoStart >= 0) {
            smooth.copy(target); previous.copy(target);
          }
          tracked = true; demoStart = -1;
          lastActivity = performance.now() / 1000; wake();
        }
        listen(surface, 'pointerdown', event => point(event, true), { passive: true });
        listen(surface, 'pointermove', event => point(event), { passive: true });
        for (const type of ['pointerleave', 'pointercancel', 'pointerup']) {
          listen(surface, type, event => { if (event.isPrimary) tracked = false; });
        }
        listen(demoButton, 'click', () => {
          if (!canAnimate()) return;
          safely(() => {
            // A neutral field makes repeated strength comparisons reproducible.
            resetField(false); compare = false; syncUI();
            target.set(0.22, 0.5); smooth.copy(target); previous.copy(target);
            demoStart = performance.now() / 1000; lastActivity = demoStart; wake();
          });
        });
        listen(compareButton, 'click', () => {
          if (!canRender()) return;
          compare = !compare; syncUI(); safely(drawPost);
        });
        listen(range, 'input', () => {
          output.value = range.value + ' / 100';
          if (canRender()) safely(drawPost);
        });
        listen(pauseButton, 'click', () => {
          if (!ready || reduced || suspended || dead) return;
          paused = !paused;
          safely(() => resetField(!paused)); syncUI();
          if (!paused) scheduleResize();
        });
        listen(media, 'change', () => {
          reduced = media.matches;
          if (reduced) releaseGPU();
          syncUI();
          if (!reduced) init();
        });
        listen(document, 'visibilitychange', () => {
          if (document.hidden) {
            cancelResize(); safely(() => resetField(false));
          } else if (!suspended) {
            if (ready) {
              scheduleResize();
              if (canRender()) safely(drawPost);
            } else init();
          }
        });
        const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleResize) : null;
        resizeObserver?.observe(surface);
        listen(window, 'resize', scheduleResize, { passive: true });
        const intersection = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(entries => {
          visible = entries[0].isIntersecting;
          if (!visible) {
            cancelResize(); safely(() => resetField(false));
          } else if (ready) {
            if (resizeDirty) scheduleResize();
            if (canRender()) safely(drawPost);
          }
        }, { threshold: 0 }) : null;
        intersection?.observe(surface);
      
        function destroy() {
          if (dead) return;
          dead = true; abort.abort();
          resizeObserver?.disconnect(); intersection?.disconnect();
          releaseGPU(); syncUI();
        }
        listen(root, 'daily:destroy', destroy);
        listen(window, 'pagehide', event => {
          if (!event.persisted) { destroy(); return; }
          suspended = true;
          // Keep listeners and UI choices for BFCache, but own no GPU resources.
          releaseGPU(); syncUI();
        });
        listen(window, 'pageshow', event => {
          if (!event.persisted || dead) return;
          suspended = false; reduced = media.matches;
          syncUI(); init();
        });
      
        async function init() {
          if (loadingTicket || ready || dead || suspended || failed || reduced) return;
          const ticket = ++epoch;
          loadingTicket = ticket; syncUI();
          try {
            const THREE = await import('three');
            if (ticket !== epoch || dead || suspended || reduced) return;
            T = THREE; shaderError = false;
            renderer = new T.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' });
            // Presentation is synchronized before insertion, so even partial setup stays hidden.
            syncUI();
            renderer.domElement.setAttribute('aria-hidden', 'true');
            renderer.domElement.addEventListener('webglcontextlost', contextLost);
            surface.prepend(renderer.domElement);
            renderer.debug.checkShaderErrors = true;
            renderer.debug.onShaderError = () => { shaderError = true; };
            renderer.autoClear = true; renderer.toneMapping = T.NoToneMapping;
            scene = new T.Scene();
            camera = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            const geometry = own(new T.PlaneGeometry(2, 2));
            const vertex = `varying vec2 vUv;
              void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`;
            const shape = `
              vec2 metric(vec2 uv,float aspect){
                vec2 p=(uv-.5)*vec2(aspect,1.0);
                p/=min(aspect,1.0);
                p=mat2(.970,-.243,.243,.970)*p;
                return p*vec2(1.10,.86);
              }
              float relief(vec2 p){
                float r=length(p);float a=atan(p.y,p.x);
                return r-.012*cos(a*5.0+r*18.0);
              }
              float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
            `;
            function material(fragment, uniforms) {
              return own(new T.ShaderMaterial({
                vertexShader: vertex, fragmentShader: fragment, uniforms,
                depthTest: false, depthWrite: false, blending: T.NoBlending
              }));
            }
            function targetRT() {
              return own(new T.WebGLRenderTarget(1, 1, {
                type: T.UnsignedByteType, format: T.RGBAFormat,
                minFilter: T.LinearFilter, magFilter: T.LinearFilter,
                depthBuffer: false, stencilBuffer: false, generateMipmaps: false
              }));
            }
            source = targetRT(); fieldA = targetRT(); fieldB = targetRT();
            target = new T.Vector2(.5, .5); smooth = target.clone();
            previous = target.clone(); velocity = new T.Vector2();
            sourceMat = material(`precision highp float;
              varying vec2 vUv;uniform float uAspect;
              ${shape}
              void main(){
                vec2 p=metric(vUv,uAspect);float d=relief(p);float r=length(p);
                vec2 grid=abs(fract((vUv-.5)*vec2(uAspect,1.0)*12.0+.5)-.5);
                float gridLine=1.0-smoothstep(.008,.020,min(grid.x,grid.y));
                vec3 bg=vec3(.078,.108,.087)+.018*exp(-r*2.0)+gridLine*.013;
                float phase=d*182.0;float ridge=.5+.5*sin(phase);
                float band=smoothstep(.08,.38,ridge);
                vec2 radial=p/max(r,.0001);
                vec3 normal=normalize(vec3(radial*cos(phase)*1.9,.85));
                vec3 light=normalize(vec3(-.6,.8,1.2));
                float diffuse=max(dot(normal,light),0.0);
                float spec=pow(max(dot(normal,normalize(light+vec3(0.,0.,1.))),0.0),32.0);
                vec3 copper=vec3(.66,.35,.18)*(.32+diffuse*.9)+vec3(.60,.48,.29)*spec*.65;
                copper=mix(vec3(.13,.105,.07),copper,band);
                copper*=.76+.24*smoothstep(.02,.22,d);
                float aa=max(fwidth(d),.0005);
                float mask=smoothstep(.044-aa,.044+aa,d)*(1.0-smoothstep(.363-aa,.363+aa,d));
                float shadow=(1.0-smoothstep(.365,.40,d))*.30;
                bg*=1.0-shadow;
                vec3 color=mix(bg,copper,mask);
                color+=(hash(vUv*vec2(913.7,701.3))-.5)*.012;
                gl_FragColor=vec4(color,1.0);
              }`, { uAspect: { value: 1 } });
            fieldMat = material(`precision highp float;
              varying vec2 vUv;
              uniform sampler2D uPrevious;
              uniform vec2 uPoint,uVelocity;
              uniform float uDt,uAspect,uRadius,uDecay;
              const float N=128.0/255.0;
              void main(){
                vec3 old=texture2D(uPrevious,vUv).rgb;
                vec2 back=clamp(vUv-(old.rg-N)*uDt*.6,vec2(.001),vec2(.999));
                vec3 advected=texture2D(uPrevious,back).rgb;
                vec2 value=(advected.rg-N)*exp(-uDecay*uDt);
                value=sign(value)*max(abs(value)-vec2(uDt*.075),vec2(0.0));
                float energy=max(0.0,advected.b*exp(-uDecay*uDt)-uDt*.12);
                vec2 delta=(vUv-uPoint)*vec2(uAspect,1.0);
                float influence=exp(-dot(delta,delta)/(uRadius*uRadius));
                float speed=length(uVelocity);
                value+=uVelocity*influence*uDt*4.2;
                energy+=speed*influence*uDt*9.0;
                gl_FragColor=vec4(vec2(N)+clamp(value,vec2(-.48),vec2(.48)),clamp(energy,0.0,1.0),1.0);
              }`, {
                uPrevious: { value: fieldA.texture }, uPoint: { value: smooth },
                uVelocity: { value: velocity }, uDt: { value: 1 / 60 },
                uAspect: { value: 1 }, uRadius: { value: CONFIG.radius },
                uDecay: { value: CONFIG.decay }
              });
            postMat = material(`precision highp float;
              varying vec2 vUv;
              uniform sampler2D uScene,uField;
              uniform float uStrength,uCompare,uAspect,uDisplacement,uDispersion;
              ${shape}
              vec2 safeUV(vec2 p){return clamp(p,vec2(.002),vec2(.998));}
              void main(){
                vec3 field=texture2D(uField,vUv).rgb;
                float amount=uStrength*(1.0-uCompare);
                vec2 offset=(field.rg-128.0/255.0)*uDisplacement*amount;
                vec2 uv=safeUV(vUv-offset);
                float energy=field.b*amount;
                vec2 direction=offset/max(length(offset),.00001);
                vec2 split=direction*uDispersion*energy;
                vec3 color=vec3(texture2D(uScene,safeUV(uv+split)).r,texture2D(uScene,uv).g,texture2D(uScene,safeUV(uv-split)).b);
                vec2 p=metric(uv,uAspect);float d=relief(p);
                float contour=abs(sin(d*182.0));
                float line=1.0-smoothstep(.03,.10,contour);
                vec2 g=abs(fract(p*24.0+.5)-.5);
                float grid=1.0-smoothstep(.008,.026,min(g.x,g.y));
                float inside=smoothstep(.035,.055,d)*(1.0-smoothstep(.36,.38,d));
                float ink=(line*.65+grid*.22)*inside*energy;
                color=mix(color,vec3(.77,.94,.64),ink*.42);
                gl_FragColor=vec4(color,1.0);
              }`, {
                uScene: { value: source.texture }, uField: { value: fieldA.texture },
                uAspect: { value: 1 }, uStrength: { value: Number(range.value) / 100 },
                uCompare: { value: compare ? 1 : 0 },
                uDisplacement: { value: CONFIG.displacement }, uDispersion: { value: CONFIG.dispersion }
              });
            quad = new T.Mesh(geometry, sourceMat); quad.frustumCulled = false; scene.add(quad);
            ready = true;
            // Keep the Canvas hidden until every pass has been exercised successfully.
            applyResize(true);
            fieldMat.uniforms.uPrevious.value = fieldA.texture;
            pass(fieldMat, fieldB);
            clearFields(); drawPost();
            const gl = renderer.getContext();
            if (gl.isContextLost() || gl.getError() !== gl.NO_ERROR) throw new Error('Initial GPU draw failed');
            syncUI();
          } catch (error) {
            if (ticket === epoch && !dead && !suspended) fail(error);
          } finally {
            if (loadingTicket === ticket) {
              loadingTicket = 0;
              if (!dead) syncUI();
            }
          }
        }
        syncUI(); init();
      }
---

# Day 050 — GLSLで作る、触れた速度が残るポストプロセスHero

> **Reference study:** [Reactive cursor interaction — Lusion v3.](https://www.awwwards.com/inspiration/reactive-cursor-interaction) / Awwwards — Elements  
> **主軸:** GLSL / **品質レビュー:** 86/100

カーソルへの追従、局所的な影響範囲、停止後の収束を研究対象にしました。元サイトの内部実装は未確認で、GLSLポストプロセスとping-pong変位場は独自の実装仮説です。生成した銅色レリーフ、応答量の比較UI、計測プレート風の構成へ再設計し、素材・コピー・構図は複製していません。

# Day 050 / 365 — 残像を設計するGLSLポストプロセス

公開日: 2026-11-21  
主軸技術: GLSL / Post Processing

## 参考にした表現

参考は、Awwwards — Elementsの「Reactive cursor interaction — Lusion v3.」です。

https://www.awwwards.com/inspiration/reactive-cursor-interaction

研究対象は、カーソルへの追従、影響の局所性、入力が止まった後の収束です。参考元がping-pongバッファやGLSLポストプロセスを採用していると断定するものではありません。以下のレンダリング構成は、これらの原理を再構築するための独自の実装仮説です。

ブランド、コピー、映像、固有の作品や構図は使用していません。数式から生成する銅色の積層レリーフと、応答量を比較検討できる「モーション・プルーフ」へ転換しました。

## 完成形

**AFTERFORM / Motion proof**は、素材の印象をインタラクションで検討するHeroです。

面をなぞると、その場所にだけ屈折、控えめなRGB分離、細い計測線が現れます。強さを調整し、「原画と比較」で処理前の図版へ切り替えられます。「応答を試す」は一定の軌道を再生するため、キーボード利用者も操作でき、強さの比較にも使えます。

見出し、本文、操作UIはWebGLの外です。映像を変形しても、重要な情報やフォーカスリングは歪みません。モバイルでは縦スクロールを優先し、ドラッグ操作を必須にしません。

## 実装設計

描画を三段階に分離しています。

1. **Source**：オリジナルの金属レリーフをRenderTargetへ生成。実際の寸法または描画解像度が変わったときだけ更新します。
2. **Field**：低解像度の二つのRenderTargetを交互に読み書きし、速度から生じる変位と活動量を蓄積します。
3. **Composite**：SourceのUVを変位場でずらし、活動域にだけ色収差と計測線を加えます。

ポインターは指数追従し、その差分から速度を算出します。速度の上限と再進入時の座標同期を設け、離れた場所から不自然に引き伸ばされる挙動を抑えます。収束後は場を中立値にクリアし、RAFを停止します。比較操作は表示パスのみを変更し、本文やURLは変更しません。

### 表示状態を一か所で管理する

`syncUI()`が、CanvasとSVGの排他的表示、ボタンの有効状態、押下状態、状態通知、図版のアクセシブル名、操作案内をまとめて更新します。

| 状態 | 表示 | 操作 |
| --- | --- | --- |
| 初期化中 | 静的SVG | 待機 |
| GPU稼働 | Canvas | 強さ・比較・デモ・停止 |
| 原画比較 | CanvasのSource | 効果に戻る操作が可能 |
| ユーザー停止 | 静的SVG | 再開のみ |
| 動きの低減設定 | 静的SVG | 動的操作を無効化 |
| GPUエラー・破棄 | 静的SVG | 動的操作を無効化 |

SVGにはHTML要素の`hidden`プロパティ代入を使わず、`toggleAttribute('hidden', active)`を使用します。破棄時は同じ表示管理関数から`removeAttribute('hidden')`を実行します。CSSの`[hidden]{display:none!important}`と合わせ、SVGがCanvasを覆い続ける問題を防ぎます。

初回はSource・Field・Compositeの描画とエラー確認が終わるまでCanvasを公開しません。静止版では「なぞると反応する」という説明も残さず、表示状態に合わせた案内に切り替えます。

### 復帰とリサイズ

`pagehide`の`persisted`がtrueならGPU資源だけを解放し、イベントとObserverを保持します。`pageshow`で再初期化し、強さ、原画比較、ユーザー停止の選択を引き継ぎます。変位場は中立状態から再開します。非persistedの離脱と`daily:destroy`ではすべて破棄します。

非同期importには世代番号を付け、停止・低減設定・破棄の前に始まった初期化が、後からGPUを復活させないようにしています。

ResizeObserverとwindowのresize通知は共通の予約処理へ集約します。次のRAFで寸法と実効DPRを確認し、前回と同じならSourceやRenderTargetを更新しません。連続通知を受けても同一フレームの再生成は一度です。

## シェーダー/レンダリング

Sourceは、極座標でわずかに変形させた同心帯です。周期関数から擬似法線を作り、拡散光、狭いハイライト、溝の暗部を重ねます。単純な色の補間ではなく、稜線と加工痕によって素材を読ませる設計です。

FieldはRGBA8です。R/Gに符号付き変位、Bに活動量を保存します。中立値には8bitで正確に表せる`128 / 255`を使い、移流、指数減衰、微小値の減算を行います。厳密な流体計算ではなく、応答感を調整しやすい残像モデルです。低速入力では量子化の影響が出る可能性があり、実機での確認が必要です。

CompositeのRGB分離は活動量に比例します。画面全体を常時色収差で覆わず、触れた範囲だけがわずかに光学的な性質を変えるようにします。影響距離はアスペクト比を補正するため、横長でも作用範囲が横へ伸びません。

このコードの生成色は表示用の値として直接出力しており、最終シェーダーに追加のトーンマッピングや色空間変換チャンクを挿入していません。実画像へ置換するときは、入力テクスチャの色空間と最終出力変換を一組で設計してください。

## 実務での使いどころ

- 金属加工や工芸のブランドHero
- 素材感を主役にしたキャンペーンのキービジュアル
- 静止画に触覚的な反応を加えるWorks導入部
- クライアントと応答量を比較するモーション検討ツール

Sourceの生成工程を差し替えれば、同じ変位場を別のオリジナル画像へ適用できます。ただしロゴ、本文、ナビゲーションはDOM側に残します。

## 調整パラメータ

| パラメータ | 初期値 | 意図 |
| --- | --- | --- |
| `follow` | 20 / 秒 | 約50msの時定数で、重い引きずりより「硬い面が少し遅れて応える」印象へ |
| `radius` | 0.105 | 図版の高さ基準。中心からこの距離で入力重みが約37%になり、レリーフ全体を崩さず複数の稜線へ作用 |
| `decay` | 2.5 / 秒 | 指数部分の半減期は約0.28秒。長い煙ではなく、短い素材の記憶を作る |
| `displacement` | 0.075 | 稜線が分離しすぎないUV変位の倍率 |
| `dispersion` | 0.0022 | 活動域に限定した色収差の幅 |
| `fieldLongSide` | 192px | 入力場の滑らかさと負荷の折り合い |
| `settleSeconds` | 2.8秒 | 最後の入力から完全クリアするまでの上限 |
| `dprCap` / `pixelBudget` | 1.75 / 160万 | 出力解像度の上限 |

`follow`と`decay`は参考元の測定値ではなく、この素材のための設計値です。追従を速くしても残像は場に残るため、カーソルの遅れと素材の余韻を別々に調整できます。実際の減衰には移流と量子化対策も加わり、表の半減期と完全には一致しません。

## パフォーマンスとアクセシビリティ

変位場は長辺192px、CanvasはDPRと総ピクセル数の両方で制限します。静止、画面外、ページ非表示ではアニメーションRAFを停止します。Sourceは入力ごとに再生成しません。

`prefers-reduced-motion: reduce`ではGPUを初期化せず、設定が途中で有効になった場合もGPU資源を解放します。import失敗、初回描画エラー、コンテキスト喪失でも静的SVGへ退避します。SVGはシェーダー画像の完全な複製ではなく、積層レリーフという方向性を保った代替図版です。

操作はネイティブのrangeとbuttonで提供します。タッチ領域は`touch-action: pan-y`とし、縦スクロールを奪いません。フォーカス表示、比較・停止の押下状態、状態通知をDOMで提供します。

SPAで取り外す前に、ルートへ`daily:destroy`イベントを送ってください。二種類のRAF、イベント、Observer、RenderTarget、Material、Geometry、Rendererを破棄します。同じルートで再実行した場合も前のインスタンスを破棄します。

### 組み込みと確認手順

HTML・CSSを配置し、JavaScriptをES moduleとして実行します。`three`を解決できるバンドラーまたはimport mapが必要です。Three.js r170以降のAPIを想定しています。

ブラウザ・実機・性能検証はこの回答内では実施していません。公開前に以下を確認してください。

1. 初期化、GPU稼働、比較、停止、低減設定、エラー、破棄の各状態で、CanvasとSVGの可視表示が必ず一方だけになること。
2. Chrome・Safari・Firefoxで、初回描画、金属の稜線、色収差、低速入力時のRGBA8階調を確認すること。
3. iOS・Androidで、縦スクロール、pointercancel、狭幅時の文字密度、デモボタンの操作を確認すること。
4. BFCacheへ保存される遷移で往復し、再初期化と強さ・比較・停止状態の復元を確認すること。BFCacheへの保存自体はブラウザ条件に依存します。
5. コンテキスト喪失、import失敗、初期化待ち中の破棄、OS低減設定変更、SPA再マウントを確認すること。
6. 連続リサイズ時のSource生成回数、端末別GPU時間、メモリ解放、支援技術での案内を測定・確認すること。

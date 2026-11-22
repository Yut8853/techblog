---
title: "WebGPUで作る、素材と視点を選ぶ3Dサウンドオブジェクト"
description: "独自生成した音響オブジェクトを、仕上げ・回転・詳細視点で比較するWebGPUショーケース。TSLの粗さ表現、静止SVGへの退避、品質縮退後の再描画、標準ピンチズームとの共存まで設計します。"
category: "WebGPUプロダクトショーケース"
categorySlug: "webgpu-product-showcase"
categoryDescription: "WebGPUによる立体描画を素材・仕様・観察視点の選択へ接続する、商品紹介とコンフィギュレーター向けの表現。"
tags:
  - "WebGPU"
  - "Three.js"
  - "TSL"
  - "3Dプロダクト"
  - "コンフィギュレーター"
  - "アクセシビリティ"
  - "Daily Lab"
date: "2026年11月23日"
publishedAt: "2026-11-23"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 52
focus: "WebGPU"
concept: "素材の選択と立体の観察を結びつける、架空の卓上サウンドオブジェクトのWebGPUショーケース。色を変更しても視点を保ち、非対称な操作部を回転と詳細視点で確認できる。GPUと静止SVGの排他的表示、狭幅の構図、品質縮退後の再描画、標準ピンチズームとの共存まで商品体験として設計する。"
referenceTitle: "Rimowa Unique — BETC Digital Studio."
referenceUrl: "https://cssdesignawards.com/sites/rimowa-unique/36215/"
referencePlatform: "CSS Design Awards"
qualityScore: 88
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" data-mode="static" aria-label="SONE 01 プロダクトスタディ">
        <header class="ps-header"><div class="ps-wordmark">SONE / 01</div><div class="ps-edition">OBJECT STUDIES — 052<br>23 NOV 2026 / INDEPENDENT CONCEPT</div></header>
        <div class="ps-intro"><div><p class="ps-kicker">A DESKTOP SOUND OBJECT</p><h1>Sound,<br><span>given shape.</span></h1></div><p>音を置く。素材を選ぶ。<br>指先で回して、暮らしに馴染む<br>ひとつの輪郭を見つける。</p></div>
        <div class="ps-workspace">
          <div class="ps-view" tabindex="-1" role="group" aria-label="製品の静止プレビュー">
            <div class="ps-ghost" aria-hidden="true">01</div>
            <div class="ps-index" aria-hidden="true">FIG. 01<br>RADIAL ENCLOSURE</div>
            <svg class="ps-static" viewBox="220 60 360 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Chalk仕上げの卓上サウンドオブジェクト。静止プレビュー。">
              <defs>
                <linearGradient id="sone-shell-052" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".32"/><stop offset=".3" stop-color="#fff" stop-opacity=".25"/><stop offset=".65" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
                <pattern id="sone-ribs-052" width="9" height="10" patternUnits="userSpaceOnUse"><path d="M2 0V10" stroke="#161e18" stroke-width="3" stroke-opacity=".72"/></pattern>
                <radialGradient id="sone-shadow-052"><stop stop-color="#273125" stop-opacity=".27"/><stop offset="1" stop-color="#273125" stop-opacity="0"/></radialGradient>
              </defs>
              <ellipse cx="407" cy="477" rx="205" ry="52" fill="url(#sone-shadow-052)"/>
              <ellipse cx="400" cy="461" rx="166" ry="48" fill="#c6ccbd"/>
              <ellipse cx="400" cy="455" rx="166" ry="45" fill="#dce0d3"/>
              <path d="M322 401V433C322 470 478 470 478 433V401Z" fill="#434a42"/>
              <ellipse cx="400" cy="401" rx="78" ry="26" fill="#626a60"/>
              <path d="M291 212V399C291 451 509 451 509 399V212Z" fill="currentColor"/>
              <path d="M291 225V389C291 437 509 437 509 389V225Z" fill="url(#sone-ribs-052)"/>
              <path d="M291 212V399C291 451 509 451 509 399V212Z" fill="url(#sone-shell-052)"/>
              <ellipse cx="400" cy="212" rx="109" ry="38" fill="currentColor" stroke="#6a7366" stroke-width="2"/>
              <ellipse cx="400" cy="211" rx="97" ry="31" fill="#ffffff" fill-opacity=".15"/>
              <ellipse cx="400" cy="209" rx="43" ry="15" fill="#353e33"/>
              <path d="M364 192V205C364 222 436 222 436 205V192Z" fill="#8a9283"/>
              <ellipse cx="400" cy="192" rx="36" ry="12" fill="#bec5b4"/>
              <path d="M400 182V190" stroke="#333c30" stroke-width="3"/>
              <rect x="375" y="365" width="31" height="22" rx="3" fill="#293227"/>
              <path d="M384 376H396" stroke="#ee7941" stroke-width="3" stroke-linecap="round"/>
            </svg>
            <div class="ps-view-footer"><span data-help>STATIC MATERIAL PREVIEW</span><span>Ø 148 / H 192 MM</span></div>
          </div>
          <aside class="ps-panel" aria-label="製品の仕様と表示">
            <fieldset data-finish-field><legend class="ps-label">01 / FINISH</legend><div class="ps-selected"><strong data-finish-name>Chalk</strong><span data-finish-code>F–01 / LIGHT MINERAL</span></div><div class="ps-finishes">
              <label class="ps-swatch" style="--swatch:#c8c6b9"><input type="radio" name="sone-finish" value="0" checked aria-label="Chalk、明るいミネラル色"><span class="ps-chip" aria-hidden="true"></span><span>Chalk</span></label>
              <label class="ps-swatch" style="--swatch:#51594e"><input type="radio" name="sone-finish" value="1" aria-label="Cinder、深いチャコール色"><span class="ps-chip" aria-hidden="true"></span><span>Cinder</span></label>
              <label class="ps-swatch" style="--swatch:#879477"><input type="radio" name="sone-finish" value="2" aria-label="Moss、落ち着いた緑色"><span class="ps-chip" aria-hidden="true"></span><span>Moss</span></label>
            </div><p class="ps-note">マット仕上げのラジアルシェル。<br>色は画面上のイメージです。</p></fieldset>
            <div><div class="ps-label">02 / PERSPECTIVE</div><div class="ps-view-buttons"><button type="button" data-view="0" aria-pressed="true" disabled>全体</button><button type="button" data-view="1" aria-pressed="false" disabled>ダイヤル</button></div><p class="ps-note" data-view-note>静止表示では仕上げのみ選択できます。</p></div>
            <div><div class="ps-label">03 / ROTATION</div><div class="ps-turn"><button type="button" data-turn="-1" aria-label="左へ回転" disabled>←</button><button type="button" data-turn="0" disabled>正面に戻す</button><button type="button" data-turn="1" aria-label="右へ回転" disabled>→</button></div></div>
            <dl class="ps-specs"><dt>ENCLOSURE</dt><dd>64 radial ribs</dd><dt>CONTROL</dt><dd>Top dial</dd><dt>EDITION</dt><dd>Concept / 2026</dd></dl>
            <div class="ps-summary"><span class="ps-dot" aria-hidden="true"></span><span data-mode-label>STATIC PREVIEW</span></div>
          </aside>
        </div>
        <footer class="ps-bottom"><p>INDEPENDENT PRODUCT STUDY<br>素材を確かめるための、小さな展示室。</p><p>架空製品・寸法はコンセプト設定<br>NO EXTERNAL MODELS / PROCEDURAL GEOMETRY</p></footer>
        <p class="ps-sr" role="status" aria-live="polite" data-status>静止プレビューを表示しています。</p>
      </section>
  - name: styles.css
    language: css
    content: |
      .daily-stage{--paper:#eeede7;--ink:#232923;--muted:#62685e;--line:#c8ccc1;--accent:#ab3b20;--finish:#c8c6b9;box-sizing:border-box;background:var(--paper);color:var(--ink);font-family:Arial,'Hiragino Kaku Gothic ProN',Meiryo,sans-serif;padding:28px clamp(18px,4vw,64px);max-width:1600px;margin:auto}.daily-stage *{box-sizing:border-box}.daily-stage [hidden]{display:none!important}.daily-stage button,.daily-stage input{font:inherit}.daily-stage button{color:inherit}.daily-stage :focus-visible{outline:3px solid var(--accent);outline-offset:5px}.ps-header{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);padding-bottom:22px;gap:20px}.ps-wordmark{font-size:18px;font-weight:800;letter-spacing:.18em}.ps-edition,.ps-kicker,.ps-index,.ps-label{font:11px/1.6 ui-monospace,SFMono-Regular,Consolas,monospace;letter-spacing:.1em}.ps-edition{text-align:right}.ps-intro{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;padding:36px 0 28px}.ps-kicker{color:var(--accent);margin:0 0 12px}.ps-intro h1{font-size:clamp(44px,6.7vw,98px);font-weight:500;line-height:.94;letter-spacing:-.065em;margin:0}.ps-intro h1 span{font-family:Georgia,serif;font-style:italic;font-weight:400}.ps-intro p:last-child{max-width:270px;margin:0;font-size:13px;line-height:1.95;color:var(--muted)}.ps-workspace{display:grid;grid-template-columns:minmax(0,1fr) 286px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.ps-view{position:relative;min-width:0;height:clamp(430px,46vw,620px);overflow:hidden;isolation:isolate;touch-action:pan-y pinch-zoom;background:radial-gradient(ellipse at 48% 45%,#fffdf5 0%,#e7e8df 68%,#dfe2d7 100%)}.ps-view[data-active='true']{cursor:grab}.ps-view[data-dragging='true']{cursor:grabbing}.ps-view:focus-visible{outline-offset:-5px}.ps-view canvas,.ps-static{position:absolute;inset:0;width:100%;height:100%;display:block}.ps-view canvas{z-index:2;pointer-events:none}.ps-static{z-index:1;color:var(--finish);pointer-events:none}.ps-ghost{position:absolute;bottom:-.13em;left:.025em;font-size:clamp(180px,28vw,420px);line-height:1;font-weight:600;letter-spacing:-.09em;color:#d1d6c8;pointer-events:none;z-index:0}.ps-index{position:absolute;top:22px;left:24px;z-index:3;color:#4c5849;pointer-events:none}.ps-view-footer{position:absolute;bottom:20px;left:24px;right:24px;z-index:3;display:flex;justify-content:space-between;gap:14px;font:10px/1.6 ui-monospace,monospace;letter-spacing:.06em;color:#43503f;pointer-events:none}.ps-panel{padding:26px 0 24px 26px;display:flex;flex-direction:column;gap:27px;border-left:1px solid var(--line)}.ps-panel fieldset{border:0;padding:0;margin:0;min-width:0}.ps-panel legend{padding:0;margin-bottom:16px}.ps-label{color:var(--muted)}.ps-selected{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px;gap:8px}.ps-selected strong{font-size:22px;font-weight:500;letter-spacing:-.03em}.ps-selected span{font:10px ui-monospace,monospace;color:var(--muted)}.ps-finishes{display:flex;gap:12px}.ps-swatch{display:grid;justify-items:center;gap:8px;position:relative;font-size:10px;cursor:pointer}.ps-swatch input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}.ps-chip{width:51px;height:45px;background:var(--swatch);border:1px solid #59615255;display:block;position:relative}.ps-swatch input:checked+.ps-chip:after{content:'';position:absolute;inset:-5px;border:1px solid var(--ink)}.ps-swatch input:focus-visible+.ps-chip{outline:3px solid var(--accent);outline-offset:6px}.ps-swatch:has(input:disabled){opacity:.5}.ps-note{font-size:11px;line-height:1.8;color:var(--muted);margin:16px 0 0;min-height:40px}.ps-view-buttons{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:12px}.ps-view-buttons button,.ps-turn button{border:1px solid #a9b09f;background:transparent;min-height:44px;cursor:pointer;font-size:12px;padding:10px}.ps-view-buttons button[aria-pressed='true']{color:#f6f4e9;background:var(--ink);border-color:var(--ink)}.ps-view-buttons button:disabled,.ps-turn button:disabled{opacity:.4;cursor:not-allowed}.ps-turn{display:grid;grid-template-columns:44px 1fr 44px;gap:7px;margin-top:10px}.ps-turn button:first-child,.ps-turn button:last-child{font-size:19px}.ps-specs{margin:0;padding-top:18px;border-top:1px solid var(--line);display:grid;grid-template-columns:1fr auto;gap:9px;font-size:11px;color:var(--muted)}.ps-specs dt,.ps-specs dd{margin:0}.ps-specs dd{color:var(--ink)}.ps-summary{margin-top:auto;display:flex;align-items:center;gap:8px;font:10px/1.5 ui-monospace,monospace;letter-spacing:.05em}.ps-dot{width:6px;height:6px;border-radius:50%;background:var(--accent)}.daily-stage[data-mode='gpu'] .ps-dot{background:#426043}.ps-bottom{display:flex;justify-content:space-between;gap:24px;padding-top:17px;font-size:10px;line-height:1.8;color:var(--muted)}.ps-bottom p{margin:0}.ps-bottom p:last-child{text-align:right}.ps-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}@media(hover:hover){.ps-turn button:not(:disabled):hover,.ps-view-buttons button:not(:disabled):not([aria-pressed='true']):hover{background:#dce0d4}}@media(max-width:760px){.daily-stage{padding:20px 18px}.ps-header{padding-bottom:17px}.ps-edition{font-size:9px}.ps-intro{align-items:flex-start;padding:28px 0 24px;gap:20px}.ps-intro h1{font-size:clamp(42px,9vw,66px)}.ps-intro p:last-child{font-size:11px;max-width:165px}.ps-workspace{grid-template-columns:1fr}.ps-view{height:440px}.ps-panel{padding:23px 0;border-left:0;border-top:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr;gap:23px}.ps-panel fieldset{grid-row:span 2}.ps-chip{width:43px;height:42px}.ps-finishes{gap:10px}.ps-selected{display:block}.ps-selected span{display:block;margin-top:6px}.ps-specs{grid-column:1/-1}.ps-summary{grid-column:1/-1}.ps-ghost{font-size:260px}.ps-bottom{font-size:9px}.ps-view-footer,.ps-index{left:16px;right:16px}}@media(max-width:430px){.ps-intro{display:block}.ps-intro p:last-child{max-width:100%;margin-top:20px}.ps-view{height:390px}.ps-panel{grid-template-columns:1fr}.ps-panel fieldset{grid-row:auto}.ps-finishes{gap:20px}.ps-chip{width:62px}.ps-selected{display:flex}.ps-view-footer{font-size:9px}.ps-bottom{display:block}.ps-bottom p:last-child{text-align:left;margin-top:8px}}@media(prefers-reduced-motion:reduce){.daily-stage *{scroll-behavior:auto!important}}
  - name: experiment.js
    language: javascript
    content: |
      const mounted = new WeakMap();
      let instanceId = 0;
      
      export function mountProduct(root) {
        mounted.get(root)?.();
        const $ = (selector) => root.querySelector(selector);
        const $$ = (selector) => [...root.querySelectorAll(selector)];
        const viewport = $('.ps-view');
        const fallback = $('.ps-static');
        const status = $('[data-status]');
        const modeLabel = $('[data-mode-label]');
        const finishField = $('[data-finish-field]');
        const radios = $$('input[type=radio]');
        const viewButtons = $$('[data-view]');
        const turnButtons = $$('[data-turn]');
        const abort = new AbortController();
        const media = matchMedia('(prefers-reduced-motion: reduce)');
        const uid = `sone-${++instanceId}`;
        radios.forEach((input) => { input.name = `${uid}-finish`; });
        // 再マウントでもIDが伸び続けないよう、元のIDを保存する。
        fallback.querySelectorAll('[id]').forEach((node) => {
          const old = node.id;
          const base = node.dataset.baseId || old;
          node.dataset.baseId = base;
          const next = `${uid}-${base}`;
          fallback.querySelectorAll('[fill]').forEach((item) => {
            if (item.getAttribute('fill') === `url(#${old})`) item.setAttribute('fill', `url(#${next})`);
          });
          node.id = next;
        });
      
        const CONFIG = {
          dprCap: 1.75, mobileDprCap: 1.5, tau: 0.18,
          dragGain: 0.008, rotationStep: Math.PI / 8, ribCount: 64,
          slowFrameMs: 26, qualityWindow: 45,
          longFrameMs: 150, longFrameLimit: 3, qualityStep: 0.25,
          staticHeight: 500, staticMinWidth: 360, staticCenterX: 400, staticTop: 60
        };
        const finishes = [
          { name: 'Chalk', color: '#c8c6b9', code: 'F–01 / LIGHT MINERAL' },
          { name: 'Cinder', color: '#51594e', code: 'F–02 / DEEP CHARCOAL' },
          { name: 'Moss', color: '#879477', code: 'F–03 / SOFT BOTANICAL' }
        ];
        const views = [
          { position: [3.3, 2.25, 5.2], focus: [0, -0.08, 0], note: '全体の輪郭と、リブの奥行きを確認。' },
          { position: [2.2, 2.6, 3.4], focus: [0, 0.66, 0], note: 'ダイヤルの指標と、天面の仕上げを確認。' }
        ];
        let finishIndex = Math.max(0, radios.findIndex((el) => el.checked));
        let viewIndex = 0;
        let yaw = -0.45, targetYaw = yaw;
        let dead = false, ready = false, reduced = media.matches;
        let inView = true, suspended = false;
        let raf = 0, last = 0, samples = 0, sumMs = 0, longFrames = 0;
        let dpr = Math.min(devicePixelRatio || 1, innerWidth < 760 ? CONFIG.mobileDprCap : CONFIG.dprCap);
        let renderer = null, scene = null, camera = null, product = null;
        let finishUniform = null, targetColor = null;
        let targetCamera = null, targetFocus = null, focus = null;
        let removeDeviceListener = () => {};
        let drag = null;
        const geometries = new Set(), materials = new Set(), textures = new Set(), instances = new Set();
        const on = (element, type, handler, options = {}) => element.addEventListener(type, handler, { ...options, signal: abort.signal });
      
        function announce(text) { status.textContent = text; }
      
        // SVGSVGElementのhiddenプロパティには依存しない。
        // 初期化・成功・退避・破棄の全経路で、この属性操作だけを使う。
        function setPreviewVisibility(gpuVisible) {
          fallback.toggleAttribute('hidden', gpuVisible);
          renderer?.domElement.toggleAttribute('hidden', !gpuVisible);
          root.dataset.mode = gpuVisible ? 'gpu' : 'static';
        }
      
        function syncFinish(notify = false) {
          const finish = finishes[finishIndex];
          radios.forEach((el, index) => { el.checked = index === finishIndex; });
          root.style.setProperty('--finish', finish.color);
          $('[data-finish-name]').textContent = finish.name;
          $('[data-finish-code]').textContent = finish.code;
          fallback.setAttribute('aria-label', `${finish.name}仕上げの卓上サウンドオブジェクト。静止プレビュー。`);
          if (targetColor) targetColor.set(finish.color);
          if (notify) announce(`${finish.name}を選択しました。${ready ? '' : '静止プレビューに反映しました。'}`);
          requestDraw();
        }
      
        function setAvailability(active) {
          viewButtons.forEach((el) => { el.disabled = !active; });
          turnButtons.forEach((el) => { el.disabled = !active; });
          viewport.tabIndex = active ? 0 : -1;
          viewport.dataset.active = String(active);
          viewport.setAttribute('aria-label', active ? '3D製品ビュー。横ドラッグ、左右矢印で回転。Homeで正面へ。' : '製品の静止プレビュー');
          $('[data-help]').textContent = active ? 'DRAG TO INSPECT / ← → / HOME' : 'STATIC MATERIAL PREVIEW';
        }
      
        function resetQualityWindow() { samples = 0; sumMs = 0; longFrames = 0; }
        function resetTiming() { last = 0; resetQualityWindow(); }
        function stopFrame() { cancelAnimationFrame(raf); raf = 0; resetTiming(); }
        function endDrag() {
          const current = drag;
          drag = null;
          viewport.dataset.dragging = 'false';
          if (current && viewport.hasPointerCapture(current.id)) viewport.releasePointerCapture(current.id);
        }
        function safeDispose(value) {
          try { value?.dispose(); } catch { /* 初期化失敗時にもDOM表示を復旧する */ }
        }
        function stopGPU() {
          stopFrame();
          endDrag();
          setPreviewVisibility(false);
          removeDeviceListener();
          removeDeviceListener = () => {};
          const old = renderer;
          renderer = null;
          ready = false;
          scene?.clear();
          instances.forEach(safeDispose);
          geometries.forEach(safeDispose);
          materials.forEach(safeDispose);
          textures.forEach(safeDispose);
          instances.clear(); geometries.clear(); materials.clear(); textures.clear();
          safeDispose(old);
          old?.domElement.remove();
          scene = camera = product = finishUniform = targetColor = null;
          targetCamera = targetFocus = focus = null;
        }
        function useFallback(message) {
          if (dead) return;
          const active = document.activeElement;
          const transferFocus = active === viewport || viewButtons.includes(active) || turnButtons.includes(active);
          stopGPU();
          modeLabel.textContent = 'STATIC PREVIEW';
          setAvailability(false);
          viewIndex = 0;
          viewButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.view === '0')));
          $('[data-view-note]').textContent = '静止表示では仕上げのみ選択できます。';
          resize();
          if (transferFocus && root.isConnected) radios[finishIndex].focus({ preventScroll: true });
          announce(message);
        }
      
        function requestDraw() {
          if (!dead && renderer && !raf && !document.hidden && inView && !suspended) raf = requestAnimationFrame(draw);
        }
        function updateCameraTargets() {
          if (!camera) return;
          const view = views[viewIndex];
          targetFocus.fromArray(view.focus);
          const fit = Math.max(1, 0.88 / camera.aspect);
          targetCamera.fromArray(view.position).sub(targetFocus).multiplyScalar(fit).add(targetFocus);
        }
        function resizeStatic(width, height) {
          // 縦方向の占有率を基準にし、狭幅で800単位全体を縮小しない。
          const boxWidth = Math.max(CONFIG.staticMinWidth, CONFIG.staticHeight * width / height);
          fallback.setAttribute('viewBox', `${CONFIG.staticCenterX - boxWidth / 2} ${CONFIG.staticTop} ${boxWidth} ${CONFIG.staticHeight}`);
        }
        function resize() {
          if (dead) return;
          const width = Math.max(1, viewport.clientWidth);
          const height = Math.max(1, viewport.clientHeight);
          // GPU初期化前・失敗後でも必ず静止構図を更新する。
          resizeStatic(width, height);
          if (!renderer || !camera) return;
          const cap = innerWidth < 760 ? CONFIG.mobileDprCap : CONFIG.dprCap;
          dpr = Math.min(dpr, devicePixelRatio || 1, cap);
          try {
            renderer.setPixelRatio(dpr);
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            updateCameraTargets();
            requestDraw();
          } catch {
            useFallback('表示サイズを更新できないため、静止プレビューへ切り替えました。');
          }
        }
      
        function assessQuality(gap) {
          // draw()のrender前にだけ呼ぶ。バッファ変更後の未描画停止を防ぐ。
          // last=0の初回/アイドル復帰はサンプルにしない。
          if (gap <= 0) return;
          // 150ms以上も平均に含める。深刻な遅延を除外しない。
          samples++;
          sumMs += gap;
          longFrames = gap >= CONFIG.longFrameMs ? longFrames + 1 : 0;
          const urgent = longFrames >= CONFIG.longFrameLimit;
          const windowComplete = samples >= CONFIG.qualityWindow;
          if (!urgent && !windowComplete) return;
          if ((urgent || sumMs / samples > CONFIG.slowFrameMs) && dpr > 1) {
            dpr = Math.max(1, dpr - CONFIG.qualityStep);
            renderer.setPixelRatio(dpr);
          }
          resetQualityWindow();
        }
      
        function draw(time) {
          raf = 0;
          if (dead || !renderer || !inView || document.hidden || suspended) { resetTiming(); return; }
          const gap = last ? time - last : 0;
          // モーションの積分だけをクランプし、品質判定には生のgapを渡す。
          const dt = gap ? Math.min(gap / 1000, 0.05) : 1 / 60;
          last = time;
          const alpha = reduced ? 1 : 1 - Math.exp(-dt / CONFIG.tau);
          yaw += (targetYaw - yaw) * alpha;
          product.rotation.y = yaw;
          camera.position.lerp(targetCamera, alpha);
          focus.lerp(targetFocus, alpha);
          camera.lookAt(focus);
          finishUniform.value.lerp(targetColor, alpha);
          try {
            // 必須の順序: 品質判定 → バッファ更新 → 描画 → 収束判定。
            // このフレームでmoving=falseになっても、新しいバッファへ描いてから止める。
            assessQuality(gap);
            renderer.render(scene, camera);
            if (!ready) {
              ready = true;
              setPreviewVisibility(true);
              modeLabel.textContent = 'WEBGPU / INTERACTIVE';
              setAvailability(true);
              $('[data-view-note]').textContent = views[viewIndex].note;
              announce('3Dビューの準備ができました。仕上げ、視点、回転を操作できます。');
            }
          } catch {
            useFallback('3D描画を継続できないため、静止プレビューへ切り替えました。');
            return;
          }
          const color = finishUniform.value;
          const colorError = Math.abs(color.r - targetColor.r) + Math.abs(color.g - targetColor.g) + Math.abs(color.b - targetColor.b);
          const moving = Math.abs(targetYaw - yaw) > 0.0005 || camera.position.distanceToSquared(targetCamera) > 0.000001 || focus.distanceToSquared(targetFocus) > 0.000001 || colorError > 0.001;
          if (moving) requestDraw();
          else resetTiming();
        }
      
        function selectView(index) {
          if (!ready) return;
          viewIndex = index;
          viewButtons.forEach((button) => button.setAttribute('aria-pressed', String(Number(button.dataset.view) === index)));
          $('[data-view-note]').textContent = views[index].note;
          updateCameraTargets();
          announce(index ? 'ダイヤルを見る視点を選択しました。' : '全体を見る視点を選択しました。');
          requestDraw();
        }
        function turn(direction) {
          if (!ready) return;
          if (direction === 0) {
            const home = -0.45;
            targetYaw = yaw + Math.atan2(Math.sin(home - yaw), Math.cos(home - yaw));
          } else targetYaw += direction * CONFIG.rotationStep;
          requestDraw();
        }
      
        finishField.disabled = false;
        setPreviewVisibility(false);
        modeLabel.textContent = 'PREPARING WEBGPU';
        setAvailability(false);
        viewButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.view === '0')));
        $('[data-view-note]').textContent = '静止表示では仕上げのみ選択できます。';
        syncFinish();
        resize();
        radios.forEach((input, index) => on(input, 'change', () => {
          if (input.checked) { finishIndex = index; syncFinish(true); }
        }));
        viewButtons.forEach((button) => on(button, 'click', () => selectView(Number(button.dataset.view))));
        turnButtons.forEach((button) => on(button, 'click', () => turn(Number(button.dataset.turn))));
        on(viewport, 'keydown', (event) => {
          if (!ready) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Home') {
            event.preventDefault();
            turn(event.key === 'Home' ? 0 : event.key === 'ArrowLeft' ? -1 : 1);
          }
        });
        on(viewport, 'pointerdown', (event) => {
          if (!ready || drag || !event.isPrimary || event.button !== 0) return;
          drag = { id: event.pointerId, x: event.clientX, y: event.clientY, start: targetYaw, active: false };
        });
        on(viewport, 'pointermove', (event) => {
          if (!drag || drag.id !== event.pointerId || !ready) return;
          const dx = event.clientX - drag.x;
          const dy = event.clientY - drag.y;
          if (!drag.active) {
            if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { endDrag(); return; }
            if (Math.abs(dx) < 7 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
            drag.active = true;
            viewport.setPointerCapture(event.pointerId);
            viewport.dataset.dragging = 'true';
          }
          targetYaw = drag.start + dx * CONFIG.dragGain;
          requestDraw();
        });
        on(window, 'pointerup', (event) => { if (drag?.id === event.pointerId) endDrag(); });
        // CSSはpan-y pinch-zoom。標準スクロール/ピンチへの移行を妨げず、
        // ブラウザがpointercancelを送ったら通常終了と同じ経路でcaptureを解除する。
        on(window, 'pointercancel', (event) => { if (drag?.id === event.pointerId) endDrag(); });
        on(viewport, 'lostpointercapture', () => { drag = null; viewport.dataset.dragging = 'false'; });
        on(window, 'blur', endDrag);
        on(media, 'change', () => { reduced = media.matches; requestDraw(); });
        on(document, 'visibilitychange', () => {
          endDrag();
          if (document.hidden) stopFrame(); else requestDraw();
        });
        on(window, 'resize', resize, { passive: true });
        const ro = new ResizeObserver(resize);
        ro.observe(viewport);
        const io = new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting;
          if (inView) requestDraw(); else { endDrag(); stopFrame(); }
        });
        io.observe(viewport);
      
        function cleanup() {
          if (dead) return;
          dead = true;
          abort.abort();
          ro.disconnect();
          io.disconnect();
          stopGPU();
          setAvailability(false);
          viewButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.view === '0')));
          $('[data-view-note]').textContent = '静止プレビュー。操作は停止しています。';
          finishField.disabled = true;
          modeLabel.textContent = 'PREVIEW STOPPED';
          if (mounted.get(root) === cleanup) mounted.delete(root);
        }
        mounted.set(root, cleanup);
        on(window, 'pagehide', (event) => {
          if (event.persisted) { suspended = true; endDrag(); stopFrame(); }
          else cleanup();
        });
        on(window, 'pageshow', () => { suspended = false; resize(); requestDraw(); });
      
        async function initialize() {
          if (!isSecureContext || !navigator.gpu) {
            useFallback('この環境ではWebGPUを使用できません。静止プレビューで仕上げを選択できます。');
            return;
          }
          let pending = null;
          try {
            const [T, N] = await Promise.all([import('three/webgpu'), import('three/tsl')]);
            if (dead) return;
            pending = new T.WebGPURenderer({ alpha: true, antialias: true });
            await pending.init();
            if (dead) { safeDispose(pending); return; }
            if (!pending.backend.isWebGPUBackend) throw new Error('WebGPU backend unavailable');
            renderer = pending;
            renderer.setPixelRatio(dpr);
            renderer.setClearColor(0x000000, 0);
            renderer.toneMapping = T.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.18;
            renderer.outputColorSpace = T.SRGBColorSpace;
            renderer.domElement.setAttribute('aria-hidden', 'true');
            setPreviewVisibility(false);
            viewport.append(renderer.domElement);
            scene = new T.Scene();
            camera = new T.PerspectiveCamera(34, 1, 0.1, 50);
            targetCamera = new T.Vector3();
            targetFocus = new T.Vector3();
            focus = new T.Vector3();
            targetColor = new T.Color(finishes[finishIndex].color);
            finishUniform = N.uniform(targetColor.clone());
            const ownGeometry = (geometry) => { geometries.add(geometry); return geometry; };
            const ownMaterial = (material) => { materials.add(material); return material; };
            const shell = ownMaterial(new T.MeshStandardNodeMaterial({ metalness: 0.38, roughness: 0.48 }));
            shell.colorNode = finishUniform;
            const grain = N.sin(N.positionLocal.x.mul(87)).mul(N.sin(N.positionLocal.y.mul(93))).mul(N.sin(N.positionLocal.z.mul(79)));
            shell.roughnessNode = N.float(0.48).add(grain.mul(0.065));
            const dark = ownMaterial(new T.MeshStandardMaterial({ color: '#252e25', roughness: 0.76, metalness: 0.1 }));
            const core = ownMaterial(new T.MeshStandardMaterial({ color: '#182019', roughness: 0.98 }));
            const metal = ownMaterial(new T.MeshStandardMaterial({ color: '#a4ad98', metalness: 0.65, roughness: 0.34 }));
            const led = ownMaterial(new T.MeshStandardMaterial({ color: '#f48345', emissive: '#ed591f', emissiveIntensity: 0.9, roughness: 0.4 }));
            product = new T.Group();
            scene.add(product);
            function mesh(geometry, material, parent, x = 0, y = 0, z = 0) {
              const object = new T.Mesh(ownGeometry(geometry), material);
              object.position.set(x, y, z);
              parent.add(object);
              return object;
            }
            function cylinder(topRadius, bottomRadius, height, y, material) {
              return mesh(new T.CylinderGeometry(topRadius, bottomRadius, height, 64), material, product, 0, y, 0);
            }
            cylinder(0.61, 0.64, 0.37, -1.12, dark);
            cylinder(0.79, 0.79, 0.13, -0.84, shell);
            cylinder(0.735, 0.735, 1.53, 0, core);
            cylinder(0.79, 0.79, 0.13, 0.83, shell);
            cylinder(0.745, 0.745, 0.025, 0.91, shell);
            const ribGeometry = ownGeometry(new T.CylinderGeometry(0.014, 0.014, 1.54, 6));
            const ribs = new T.InstancedMesh(ribGeometry, shell, CONFIG.ribCount);
            instances.add(ribs);
            const matrix = new T.Matrix4();
            for (let index = 0; index < CONFIG.ribCount; index++) {
              const angle = index / CONFIG.ribCount * Math.PI * 2;
              matrix.makeTranslation(Math.sin(angle) * 0.774, 0, Math.cos(angle) * 0.774);
              ribs.setMatrixAt(index, matrix);
            }
            ribs.instanceMatrix.needsUpdate = true;
            product.add(ribs);
            const collar = mesh(new T.TorusGeometry(0.32, 0.028, 12, 64), dark, product, 0, 0.94, 0);
            collar.rotation.x = Math.PI / 2;
            cylinder(0.265, 0.265, 0.145, 1.0, metal);
            cylinder(0.265, 0.265, 0.018, 1.08, shell);
            mesh(new T.BoxGeometry(0.023, 0.008, 0.09), dark, product, 0, 1.094, 0.176);
            mesh(new T.BoxGeometry(0.27, 0.19, 0.06), dark, product, 0, -0.55, 0.785);
            mesh(new T.BoxGeometry(0.11, 0.018, 0.012), led, product, 0, -0.55, 0.823);
            mesh(new T.BoxGeometry(0.34, 0.16, 0.065), dark, product, 0, -0.56, -0.785);
            mesh(new T.BoxGeometry(0.14, 0.045, 0.009), core, product, 0, -0.56, -0.824);
            const plinthMaterial = ownMaterial(new T.MeshStandardMaterial({ color: '#cbd2c0', roughness: 0.94 }));
            mesh(new T.CylinderGeometry(1.43, 1.43, 0.065, 96), plinthMaterial, scene, 0, -1.34, 0);
            const shadowCanvas = document.createElement('canvas');
            shadowCanvas.width = shadowCanvas.height = 128;
            const context = shadowCanvas.getContext('2d');
            if (!context) throw new Error('Canvas2D unavailable');
            const gradient = context.createRadialGradient(64, 64, 4, 64, 64, 64);
            gradient.addColorStop(0, 'rgba(23,35,20,.38)');
            gradient.addColorStop(0.45, 'rgba(23,35,20,.16)');
            gradient.addColorStop(1, 'rgba(23,35,20,0)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, 128, 128);
            const shadowTexture = new T.CanvasTexture(shadowCanvas);
            shadowTexture.colorSpace = T.SRGBColorSpace;
            textures.add(shadowTexture);
            const shadowMaterial = ownMaterial(new T.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false, toneMapped: false }));
            const shadow = mesh(new T.PlaneGeometry(2.7, 2.7), shadowMaterial, scene, 0, -1.303, 0);
            shadow.rotation.x = -Math.PI / 2;
            scene.add(new T.HemisphereLight('#f7f4e4', '#64715b', 2.1));
            function light(color, intensity, position) {
              const source = new T.DirectionalLight(color, intensity);
              source.position.fromArray(position);
              scene.add(source);
            }
            light('#fff7e4', 4.1, [-3, 6, 4]);
            light('#e1e9ef', 2.8, [4, 3, -3]);
            light('#ffffff', 1.1, [-3, 0, -2]);
            // Three.js r180のバックエンド参照。更新時にはAPIを再確認する。
            const device = renderer.backend.device;
            const activeRenderer = renderer;
            if (device) {
              const handleError = () => {
                if (!dead && renderer === activeRenderer) useFallback('GPUエラーのため静止プレビューへ切り替えました。');
              };
              device.addEventListener('uncapturederror', handleError);
              removeDeviceListener = () => device.removeEventListener('uncapturederror', handleError);
              device.lost.then(() => {
                if (!dead && renderer === activeRenderer) useFallback('GPU接続が失われたため静止プレビューへ切り替えました。');
              });
            }
            resize();
            if (!renderer || dead) return;
            camera.position.copy(targetCamera);
            focus.copy(targetFocus);
            product.rotation.y = yaw;
            requestDraw();
          } catch {
            if (pending && pending !== renderer) safeDispose(pending);
            if (!dead) useFallback('WebGPUを開始できませんでした。静止プレビューで仕上げを選択できます。');
          }
        }
        initialize();
        return cleanup;
      }
      
      document.querySelectorAll('.daily-stage').forEach((root) => mountProduct(root));
---

# Day 052 — WebGPUで作る、素材と視点を選ぶ3Dサウンドオブジェクト

> **Reference study:** [Rimowa Unique — BETC Digital Studio.](https://cssdesignawards.com/sites/rimowa-unique/36215/) / CSS Design Awards  
> **主軸:** WebGPU / **品質レビュー:** 88/100

提示されたCSSDA掲載情報を起点に、商品観察と仕様選択を結ぶ原理を参照。参考サイトの具体的挙動は実操作で検証していない。選択状態の多重表示、比較時の視点維持、目的のある回転へ展開し、架空の音響製品と独自の展示構成に再構築した。掲載上のWebGL・AA準拠と、今回のWebGPU実装・未検証の適合性を区別している。

# WebGPUで作る、素材と視点を選ぶ3Dサウンドオブジェクト

2026年11月23日公開 · Day 052 / 365

## 参考にした表現

参考元は **Rimowa Unique — BETC Digital Studio.**、掲載先は[CSS Design Awards](https://cssdesignawards.com/sites/rimowa-unique/36215/)です。提示された掲載情報では、2019年12月12日のWebsite of the Day、審査員スコア8.07/10とされています。

研究の起点は、**商品を観察する行為と、仕様を決める行為を結びつける3Dコンフィギュレーター**です。参考研究の根拠は提示された掲載情報に限定しています。参考サイトを実操作して、カメラ遷移やドラッグの挙動を検証した分析ではありません。

掲載側によるWebGL、AA準拠、EC統合という説明も、今回の独立した検証結果ではありません。特に、参考元がWebGPUを採用していたという意味ではありません。

今回はコンフィギュレーターの原理を、次の独自設計へ展開します。

1. **選択を二重に伝える**：選択枠、仕上げ名、コード、立体の色を同じ状態から更新する。
2. **比較条件を維持する**：色を変更しても角度やカメラをリセットしない。同じ照明・同じ視点で比較する。
3. **観察に目的を持たせる**：前面インジケーター、背面ポート、天面ダイヤルを設け、回転と詳細視点に役割を与える。
4. **機能制限を明示する**：静止表示では仕上げを選べる一方、回転・視点操作は無効化する。

参考元のブランド、コピー、画像、モデル、スーツケースの特徴的な形状は使用していません。架空の卓上音響オブジェクト「SONE / 01」と、その展示空間を独自に構成しています。

## 完成形

大きな見出し、淡い展示面、細い罫線の仕様パネルで構成するプロダクトショーケースです。64本のリブを持つ円筒型オブジェクトに、3種類のマット仕上げを適用できます。

- **仕上げ**：Chalk / Cinder / Moss。共有uniformの色を補間する。
- **観察**：水平ドラッグ、回転ボタン、左右矢印で回転する。Homeまたは正面ボタンで最短角度から戻す。
- **視点**：全体とダイヤルを切り替え、カメラ位置と注視点を一緒に移動する。
- **静止表示**：WebGPUが使えなくても、独自SVGで仕上げを選択できる。

自動回転はありません。操作の追従が収束すると描画を止め、落ち着いて製品を比較できるようにします。

## 実装設計

### 実行環境

HTML、CSS、JavaScriptを配置し、JavaScriptはES moduleとして実行します。npmの **three@0.180.0** をViteなどで解決する構成です。

```sh
npm install three@0.180.0
```

`three/webgpu` と `three/tsl` は同じバージョンへ解決してください。WebGPUにはHTTPSまたはlocalhostなどのセキュアコンテキストと、対応ブラウザ・GPUが必要です。外部モデル、画像、HDR、アプリケーションからの通信処理は使用しません。

### 表示の切り替えを一元化する

`setPreviewVisibility()` がSVGとCanvasのhidden属性を `toggleAttribute()` で操作します。SVGの `hidden` プロパティへの代入には依存しません。

初期化、GPU描画成功、エラー退避、cleanupの全経路でこの関数を通り、CSSの `.daily-stage [hidden]{display:none!important}` と組み合わせます。初回の描画呼び出しが成功するまではSVGを残し、後からGPUエラーが通知された場合も静止表示へ戻します。

### 狭幅の静止構図

初期SVGのviewBoxは `220 60 360 500`。JavaScriptがなくても、製品周辺を大きく切り取ります。マウント後は展示領域の実寸から横幅を求め、縦方向の500単位を基準に構図を維持します。

320px画面で展示幅が284px、高さが390pxの場合、viewBoxの横幅は計算上約364単位です。製品は高さ約220px台を占める見積もりになります。これは座標からの計算であり、実機での視覚比較を済ませた値ではありません。

`resize()` はGPU初期化前や失敗後もSVGの構図を更新します。

### 状態とライフサイクル

仕上げ、目標角度、視点プリセットを中心に制御します。仕上げ変更は角度や視点を変更しません。初期化待ちに選択した色も、GPUモデル生成時に読み直します。

視点はボタン操作で確定するため、スクロール境界による往復や本文のちらつきはありません。History APIも使用しません。

`mountProduct(root)` は破棄関数を返します。同じ要素への再マウントでは旧インスタンスを破棄します。SPAではアンマウント時に戻り値を呼んでください。rAF、イベント、Observer、Geometry、Material、Texture、InstancedMesh、Rendererを解放し、初期化待ちの破棄、BFCacheの一時停止と復帰、GPUロストも扱います。

## シェーダー/レンダリング

WebGPURendererとMeshStandardNodeMaterialを使い、TSLからWebGPU用シェーダーを構築します。GLSLのShaderMaterialをWebGPUへ流用する構成ではありません。

仕上げ色は共有uniformです。ローカル座標から作る微細な周期信号をroughnessへ加え、反射の均一さを抑えます。実素材を測定した物理モデルではなく、軽量な展示用表現です。微細な模様のちらつきは実機確認が必要です。

64本のリブはInstancedMeshへまとめます。照明は半球光と3方向の平行光。接地影はCanvasTextureで生成した固定の疑似影であり、動的シャドウやレイトレーシングではありません。

初期化後に実バックエンドを確認し、WebGPUでなければSVGへ退避します。デバイス監視には固定バージョンの `renderer.backend.device` を使うため、Three.js更新時に再確認してください。

### 品質縮退と描画停止の順序

今回の重要な修正は、描画バッファを変更する品質制御と、オンデマンド描画の接続です。

`draw()` の順序を次のようにしています。

1. 操作状態を補間する。
2. `assessQuality(gap)` で必要ならDPRを下げる。
3. **変更後の描画バッファへ `renderer.render(scene, camera)` を実行する。**
4. 初回表示を確定し、最後に補間の収束を判定する。

品質縮退と補間の収束が同じフレームに重なっても、**バッファ変更後に少なくとも一度renderを呼んでから停止する**構造です。描画後にDPRを変更して、そのまま停止する経路はありません。品質変更または描画で例外が発生した場合は、SVGへ退避します。

## 実務での使いどころ

音響機器や家電の商品詳細、素材比較を中心とするブランドHero、少数仕様のプレオーダー、工業製品のキャンペーンに向いています。

販売へ接続する場合は仕上げキーをSKUへ対応させ、注文内容・価格・在庫と同じ状態を参照させます。本例には販売機能はありません。製品名、寸法、仕様は架空の設定です。画面上の色を現物の色保証として扱わない注意書きも残しています。

## 調整パラメータ

| パラメータ | 初期値 | 役割 |
|---|---:|---|
| `dprCap` | 1.75 | デスクトップの描画密度上限 |
| `mobileDprCap` | 1.5 | 狭幅の描画密度上限 |
| `tau` | 0.18秒 | 色・角度・カメラの追従時間 |
| `dragGain` | 0.008 | ドラッグ1pxあたりの角度 |
| `rotationStep` | π/8 | ボタン・矢印キーの回転量 |
| `ribCount` | 64 | リブの本数 |
| `slowFrameMs` | 26ms | 通常の品質縮退判定 |
| `qualityWindow` | 45 | 通常判定のサンプル数 |
| `longFrameMs` | 150ms | 深刻な遅延とみなす間隔 |
| `longFrameLimit` | 3回 | 長時間フレームの連続判定 |
| `qualityStep` | 0.25 | 一度に下げるDPR |
| `staticHeight` | 500 | SVG構図の基準高さ |
| `staticMinWidth` | 360 | SVG構図の最小幅 |

仕上げは `finishes`、構図は `views` を調整します。

連続描画中の正のrAF間隔は、**150ms以上も平均へ加算**します。150ms以上が3回連続した場合は、45サンプルを待たず縮退します。DPRは1.0まで下げ、自動的には上げ直しません。

アイドル、画面外、非表示タブ、BFCache退避では時刻と品質カウンターをリセットします。停止していた時間を低FPSとして数える処理と、描画中の深刻な遅延を検出する処理は分離されています。なお、rAF間隔はGPU時間そのものではなく、CPU負荷なども含む保守的な指標です。

## パフォーマンスとアクセシビリティ

- 収束時、画面外、非表示タブでは描画を停止する。
- reduced-motionでは補間せず、操作結果を即時反映する。
- 仕上げはネイティブラジオ、視点と回転はネイティブボタンとする。
- ドラッグを使わずに、すべての観察操作を実行できる。
- 展示領域は **`touch-action: pan-y pinch-zoom`** とし、縦スクロールとブラウザ標準のピンチズームを許可する。
- ブラウザがピンチやスクロールを引き継いで `pointercancel` を発生させた場合は、既存の `endDrag()` でドラッグ状態とpointer captureを解除する。
- 読み上げ通知は仕上げ・視点の確定と表示モード変更時に限定する。
- GPU退避時に無効化される操作へフォーカスがある場合は、選択中の仕上げへ移す。
- 静止プレビューの代替説明にも仕上げ名を反映する。

ページ側のviewport設定でもズームを禁止しないでください。参考元の掲載上のAA準拠は、本実装の適合性を保証するものではありません。

### 未検証項目と確認手順

本回答ではブラウザ・実機・性能の実測は行っていません。公開前に次を確認してください。

1. **品質縮退と収束の同時発生**：開発用に品質判定の窓を短くし、追従の最終フレームでDPRが下がる条件を作る。`setPixelRatio → render → 停止` の順をデバッガで確認し、停止後も製品が表示されることを確認する。確認後は本番値へ戻す。
2. **長時間フレーム**：連続描画中に150ms以上の遅延を3回発生させ、縮退することを確認する。アイドル後の初回フレームでは縮退しないことも確認する。
3. **タッチと拡大**：実機で展示領域からピンチを開始し、ブラウザ標準ズームが働くことを確認する。回転中のピンチ移行、pointercancel後の再ドラッグ、縦スクロールとの競合も確認する。
4. **表示の排他性**：初回GPU描画後はCanvasのみ、初期化失敗・GPUロスト・cleanup後はSVGのみになることを確認する。
5. **レスポンシブ**：320px幅、端末回転、200%拡大で商品占有率、詳細視点のクロップ、文字の折返し、注記との干渉を確認する。
6. **ライフサイクル**：起動待ちの仕上げ変更、連続視点切り替え、reduced-motionの動的変更、タブ復帰、BFCache復帰、SPAの反復マウントを確認する。
7. **材質と負荷**：仕上げ間の視認性、roughness変調のちらつき、GPU時間、メモリを対象端末で確認・測定する。
8. **支援技術**：キーボードとスクリーンリーダーで、操作方法、選択状態、表示制限、エラー退避時のフォーカスを確認する。

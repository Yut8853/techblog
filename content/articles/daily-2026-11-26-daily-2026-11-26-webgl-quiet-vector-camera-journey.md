---
title: "WebGLで作る、視線を記録する20秒のカメラジャーニー"
description: "三つの空間を20秒で巡るWebGLカメラジャーニー。角度判定と一致する二重照準、停止でリセットされる注視計測、暗部での環境交換、文字拡大に対応する通常フローレイアウトを実装します。"
category: "WebGLカメラジャーニー"
categorySlug: "webgl-camera-journey"
categoryDescription: "演出されたカメラ軌道とユーザーの視線操作を組み合わせ、移動・注視・場面接続を体験の中心に据えるWebGL表現。"
tags:
  - "WebGL"
  - "Three.js"
  - "Camera Choreography"
  - "GLSL"
  - "インタラクティブ映像"
  - "アクセシビリティ"
  - "Daily Lab"
date: "2026年11月26日"
publishedAt: "2026-11-26"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 55
focus: "WebGL"
concept: "演出された移動と操作可能な視線を分離する、20秒の建築的ジャーニー。角度と一致する二重照準で抽象的な観測体を記録し、暗い回廊で三つの空間を連続させる。"
referenceTitle: "Peugeot Catch the Dragon — dpdk"
referenceUrl: "https://www.cssdesignawards.com/blog/case-study-peugeot-catch-the-dragon-by-dpdk/269/"
referencePlatform: "CSS Design Awards"
qualityScore: 87
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" data-mode="static" data-locked="false" data-captured="false" aria-label="Quiet Vector：静けさの座標">
        <header class="q-header"><div class="q-brand">QUIET VECTOR<small>SPATIAL OBSERVATION / STUDY 055</small></div><div class="q-edition">26 NOV 2026<br>20 SECONDS · THREE SPACES</div></header>
        <div class="q-title"><p class="q-kicker">A JOURNEY IN ATTENTION</p><h1>Less noise.<br><em>More distance.</em></h1><p class="q-sub">静けさの座標 — 視線で記録する旅</p></div>
        <div class="q-visual">
          <div class="q-view" role="region" aria-label="観測ビュー">
            <div class="q-mount" aria-hidden="true"></div>
            <div class="q-fallback" role="img" aria-label="暗い列柱の向こうに、琥珀色の輪が浮かぶ観測室の静止図">
              <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="q-sky" x2="0" y2="1"><stop stop-color="#0b171b"/><stop offset="1" stop-color="#42605b"/></linearGradient><linearGradient id="q-stone"><stop stop-color="#172a2d"/><stop offset=".75" stop-color="#45615b"/><stop offset="1" stop-color="#75847a"/></linearGradient><radialGradient id="q-glow"><stop stop-color="#d4b583" stop-opacity=".23"/><stop offset="1" stop-color="#d4b583" stop-opacity="0"/></radialGradient></defs>
                <path fill="url(#q-sky)" d="M0 0h1400v900H0z"/><ellipse cx="760" cy="440" rx="350" ry="340" fill="url(#q-glow)"/><path d="M0 610L760 480 1400 610V900H0Z" fill="#142b2d"/>
                <g fill="url(#q-stone)"><path d="M40 0h150v740L40 800z"/><path d="M310 70h85v585l-85 32z"/><path d="M475 195h52v402l-52 18z"/><path d="M590 285h34v273l-34 12z"/><path d="M1290 0h110v800l-110-60z"/><path d="M1120 70h78v617l-78-32z"/><path d="M1000 195h49v420l-49-18z"/><path d="M921 285h30v285l-30-12z"/></g>
                <g stroke="#b7c1a9" stroke-opacity=".14" fill="none"><path d="M0 900L760 480 250 900M530 900L760 480 810 900M1100 900L760 480 1400 900"/><path d="M0 720h1400M0 800h1400M140 635h1120M380 575h710"/></g>
                <g fill="none" stroke="#e4b782"><circle cx="760" cy="446" r="57" stroke-width="2"/><ellipse cx="760" cy="446" rx="22" ry="57" transform="rotate(-30 760 446)"/><circle cx="760" cy="446" r="7" fill="#e4b782"/></g>
              </svg>
            </div>
            <div class="q-veil" aria-hidden="true"></div>
          </div>
          <div class="q-view-label" aria-hidden="true">FIELD VIEW / DIRECTED TRAVEL<br>DRAG TO LOOK</div>
          <div class="q-reticle" aria-hidden="true"><i class="q-entry"></i><i class="q-exit"></i><svg class="q-progress" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" pathLength="100"/></svg><i class="q-cross"></i><span class="q-reticle-label">FRAME THE SIGNAL</span></div>
        </div>
        <div class="q-bottom">
          <div class="q-story"><div class="q-chapter"><span class="q-chapter-index">STILL EDITION / 01—03</span><h2 tabindex="-1">三つの空間を、静かに読む。</h2><p class="q-copy">列柱、回廊、観測室。奥行きと視線のための空間研究。</p></div><p class="q-reading" aria-hidden="true">観測体は最後の空間に現れます。</p></div>
          <ol class="q-static-notes"><li><strong>01 / 列柱庭</strong>反復する垂直線が、移動の距離を刻む。</li><li><strong>02 / 遮光回廊</strong>暗がりの中で、次の風景へ接続する。</li><li><strong>03 / 観測室</strong>琥珀色の輪の中央を、視線で捉える。</li></ol>
          <div class="q-rail" aria-hidden="true"><i><b></b></i><i><b></b></i><i><b></b></i></div>
          <div class="q-timeline" aria-hidden="true"><span>01 COLONNADE</span><span>02 PASSAGE</span><span>03 OBSERVATORY</span><time>00.0 / 20.0</time></div>
          <div class="q-controls"><button type="button" class="q-play" disabled>旅をはじめる</button><button type="button" class="q-replay" disabled>最初から</button><button type="button" class="q-assist" disabled>照準を補助</button><p class="q-help" id="q-instructions">ドラッグ / 矢印キーで視線を操作。輪の中央の光点を内円へ入れ、外円から出さず0.7秒。停止すると注視時間はリセットされます。</p></div>
        </div>
        <p class="q-sr q-live" role="status" aria-live="polite" aria-atomic="true"></p>
      </section>
  - name: styles.css
    language: css
    content: |
      .daily-stage{--paper:#ecebdf;--muted:#b0bdb7;--accent:#edb77e;position:relative;isolation:isolate;background:#0d191b;color:var(--paper);font-family:Arial,'Noto Sans JP',sans-serif;width:100%;min-width:0;padding:0 clamp(18px,4vw,64px) 28px;box-sizing:border-box}.daily-stage *{box-sizing:border-box}.daily-stage [hidden]{display:none!important}.daily-stage button{font:inherit}.daily-stage .q-header{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:20px;padding:28px 0;border-bottom:1px solid #a9b7a72d}.daily-stage .q-brand{font-size:.8rem;letter-spacing:.2em;font-weight:700;overflow-wrap:anywhere}.daily-stage .q-brand small{display:block;color:var(--muted);font-size:.6rem;letter-spacing:.12em;margin-top:9px;font-weight:400;line-height:1.8}.daily-stage .q-edition{font:.65rem/1.9 monospace;color:var(--muted)}.daily-stage .q-title{padding:34px 0 32px;min-width:0}.daily-stage .q-kicker{font:.65rem/1.7 monospace;letter-spacing:.16em;color:var(--accent);margin:0 0 18px}.daily-stage h1{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:clamp(2.5rem,7.6vw,6.5rem);line-height:1.05;letter-spacing:-.06em;margin:0;overflow-wrap:anywhere}.daily-stage h1 em{font-weight:400}.daily-stage .q-sub{font-size:.75rem;line-height:1.9;letter-spacing:.1em;color:var(--muted);margin:18px 0 0}.daily-stage .q-visual{position:relative;height:clamp(340px,52svh,620px);background:#142629;border:1px solid #a9b7a72d;overflow:hidden;--enter-radius:30px;--exit-radius:46px;--progress-size:110px}.daily-stage .q-view{position:absolute;inset:0;outline:none;touch-action:pan-y pinch-zoom;cursor:grab}.daily-stage .q-view:active{cursor:grabbing}.daily-stage .q-view:focus-visible{outline:2px solid var(--accent);outline-offset:-6px}.daily-stage .q-mount,.daily-stage canvas,.daily-stage .q-fallback,.daily-stage .q-veil{position:absolute;inset:0;width:100%;height:100%}.daily-stage canvas{display:block}.daily-stage .q-fallback svg{display:block;width:100%;height:100%}.daily-stage .q-veil{background:#050909;opacity:0;pointer-events:none}.daily-stage .q-view-label{position:absolute;left:18px;top:16px;pointer-events:none;color:#d1d8c8;font:.6rem/1.7 monospace;letter-spacing:.12em;text-shadow:0 1px 6px #000}.daily-stage .q-reticle{position:absolute;left:50%;top:50%;width:0;height:0;pointer-events:none;color:var(--paper)}.daily-stage .q-entry,.daily-stage .q-exit,.daily-stage .q-progress{position:absolute;left:0;top:0;transform:translate(-50%,-50%);border-radius:50%}.daily-stage .q-entry{width:calc(var(--enter-radius)*2);height:calc(var(--enter-radius)*2);border:1px solid #e2e6d7b3}.daily-stage .q-exit{width:calc(var(--exit-radius)*2);height:calc(var(--exit-radius)*2);border:1px dashed #e2e6d75e}.daily-stage .q-progress{width:var(--progress-size);height:var(--progress-size);overflow:visible;transform:translate(-50%,-50%) rotate(-90deg)}.daily-stage .q-progress circle{fill:none;stroke:var(--accent);stroke-width:2;vector-effect:non-scaling-stroke;stroke-linecap:round;stroke-dasharray:0 100}.daily-stage .q-cross{position:absolute;left:-5px;top:-5px;width:10px;height:10px}.daily-stage .q-cross:before,.daily-stage .q-cross:after{content:'';position:absolute;background:#f4e6cb;left:50%;top:50%;transform:translate(-50%,-50%)}.daily-stage .q-cross:before{width:10px;height:1px}.daily-stage .q-cross:after{height:10px;width:1px}.daily-stage .q-reticle-label{position:absolute;top:calc(var(--exit-radius) + 22px);left:0;transform:translateX(-50%);width:220px;max-width:75vw;text-align:center;font:.6rem/1.8 monospace;letter-spacing:.08em;text-shadow:0 1px 5px #000;color:var(--paper)}.daily-stage[data-locked='true'] .q-entry{border-color:var(--accent);box-shadow:0 0 18px #edb77e24}.daily-stage[data-captured='true'] .q-exit{border-color:#edb77e99;border-style:solid}.daily-stage .q-bottom{padding-top:26px;min-width:0}.daily-stage .q-story{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:20px;margin-bottom:26px;align-items:end}.daily-stage .q-chapter{min-width:0}.daily-stage .q-chapter.reveal{animation:q-reveal .4s ease-out}.daily-stage .q-chapter-index{color:var(--accent);font:.65rem/1.8 monospace;letter-spacing:.12em}.daily-stage h2{font-size:1.35rem;line-height:1.6;font-weight:400;letter-spacing:.04em;margin:10px 0;overflow-wrap:anywhere}.daily-stage h2:focus-visible{outline:2px solid var(--accent);outline-offset:5px}.daily-stage .q-copy{font-size:.8rem;line-height:1.95;color:var(--muted);margin:0;overflow-wrap:anywhere}.daily-stage .q-reading{font:.72rem/1.9 monospace;color:var(--accent);margin:0;min-height:3.8em;overflow-wrap:anywhere;max-width:32em;justify-self:end}.daily-stage .q-rail{display:grid;grid-template-columns:7fr 4fr 9fr;gap:5px;height:2px;margin-bottom:12px}.daily-stage .q-rail i{display:block;background:#dae2d329;position:relative;overflow:hidden}.daily-stage .q-rail b{position:absolute;inset:0;background:var(--accent);transform:scaleX(0);transform-origin:left}.daily-stage .q-timeline{display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between;font:.6rem/1.8 monospace;letter-spacing:.08em;color:var(--muted);margin-bottom:22px}.daily-stage .q-controls{display:flex;align-items:center;gap:9px;flex-wrap:wrap}.daily-stage button{min-height:44px;max-width:100%;padding:12px 17px;color:var(--paper);background:#142224;border:1px solid #899b956e;border-radius:2px;font-size:.75rem;line-height:1.6;letter-spacing:.04em;cursor:pointer;overflow-wrap:anywhere}.daily-stage .q-play{background:var(--paper);color:#102023;border-color:var(--paper);min-width:min(145px,100%)}.daily-stage button:hover:not(:disabled){border-color:var(--accent)}.daily-stage button:focus-visible{outline:2px solid var(--accent);outline-offset:4px}.daily-stage button:disabled{opacity:.45;cursor:default}.daily-stage .q-help{flex:1 1 260px;margin:0 0 0 auto;color:var(--muted);font-size:.7rem;line-height:1.9}.daily-stage .q-static-notes{display:none;gap:20px;grid-template-columns:repeat(3,minmax(0,1fr));margin:0;padding:0;list-style:none}.daily-stage .q-static-notes li{font-size:.8rem;line-height:1.9;border-top:1px solid #acb7a74d;padding-top:14px;color:var(--muted);overflow-wrap:anywhere}.daily-stage .q-static-notes strong{display:block;color:var(--paper);font-weight:400;margin-bottom:6px}.daily-stage[data-mode='static'] .q-static-notes{display:grid}.daily-stage[data-mode='static'] .q-reticle,.daily-stage[data-mode='static'] .q-rail,.daily-stage[data-mode='static'] .q-timeline,.daily-stage[data-mode='static'] .q-controls,.daily-stage[data-mode='static'] .q-reading,.daily-stage[data-mode='static'] .q-view-label{display:none}.daily-stage[data-mode='static'] .q-view{cursor:default}.daily-stage .q-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}@keyframes q-reveal{from{opacity:.2;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}@media(max-width:640px){.daily-stage .q-header{padding:22px 0;gap:16px}.daily-stage .q-title{padding:28px 0}.daily-stage h1{font-size:clamp(2.2rem,10.5vw,4.2rem)}.daily-stage .q-visual{height:400px}.daily-stage .q-reading{justify-self:start}.daily-stage .q-static-notes{grid-template-columns:1fr}.daily-stage .q-help{flex-basis:100%;margin:6px 0 0}.daily-stage .q-edition{font-size:.6rem}}@media(prefers-reduced-motion:reduce){.daily-stage .q-chapter.reveal{animation:none}}
  - name: experiment.js
    language: javascript
    content: |
      const root = document.querySelector('.daily-stage');
      if (root) {
        root.__quietVectorDispose?.();
        mount(root);
      }
      
      function mount(root) {
        // Timing changes must also be checked against the physical tunnel placement.
        const C = {
          duration: 20, fov: 56, damping: 9, yaw: .42, pitch: .24,
          enter: 4, exit: 6, hold: .7, maxDpr: 1.6, maxPixels: 1800000,
          time: { passage: 7, close: 8, blackIn: 8.6, swap: 9, blackOut: 9.4, open: 10, room: 11, observeIn: 12, observeOut: 18, targetOut: 19 }
        };
        const $ = s => root.querySelector(s);
        const ui = {
          view: $('.q-view'), visual: $('.q-visual'), slot: $('.q-mount'), fallback: $('.q-fallback'), veil: $('.q-veil'),
          play: $('.q-play'), replay: $('.q-replay'), assist: $('.q-assist'), live: $('.q-live'), reading: $('.q-reading'),
          chapter: $('.q-chapter'), index: $('.q-chapter-index'), heading: $('h2'), copy: $('.q-copy'),
          clock: $('time'), reticle: $('.q-reticle-label'), progress: $('.q-progress circle'), bars: [...root.querySelectorAll('.q-rail b')]
        };
        const chapters = [
          ['01 / COLONNADE', '距離は、反復から生まれる。', '列柱の間を進みます。ドラッグや矢印キーで、視線だけを動かせます。'],
          ['02 / PASSAGE', '暗がりを、継ぎ目にする。', '移動は途切れず、風景だけが静かに入れ替わります。'],
          ['03 / OBSERVATORY', '見つめることで、記録する。', '輪の中央の光点を内円へ。外円から出さず0.7秒保つと観測を記録します。']
        ];
        const mq = matchMedia('(prefers-reduced-motion: reduce)');
        const off = [], geometries = new Set(), materials = new Set(), cache = new Map();
        const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
        const smooth = (a, b, x) => { const t = clamp((x-a)/(b-a), 0, 1); return t*t*(3-2*t); };
        const radians = d => d * Math.PI / 180;
        let dead = false, ready = false, suspended = false, raf = 0, last = 0, ro, renderer, canvas, shaderFailed = false;
        let playing = false, elapsed = 0, captured = false, locked = false, held = 0, assisting = false;
        let yaw = 0, pitch = 0, wantYaw = 0, wantPitch = 0, drag = null;
        let renderFrame = null, chapterID = -1, hint = '右へ', blackout = 0, notice = '', noticeID = 0;
      
        // All repeated UI updates pass through an equality guard.
        function put(key, value, write) { if (cache.get(key) === value) return; cache.set(key, value); write(value); }
        function text(key, node, value) { put(key, value, v => { node.textContent = v; }); }
        function disabled(key, node, value) { put(key, value, v => { node.disabled = v; }); }
        function announce(message) { notice = message; noticeID++; }
        function on(target, type, fn, options) {
          target.addEventListener(type, fn, options);
          off.push(() => target.removeEventListener(type, fn, options));
        }
        function releaseDrag() {
          if (!drag) return;
          const id = drag.id; drag = null;
          try { if (ui.view.hasPointerCapture(id)) ui.view.releasePointerCapture(id); } catch {}
        }
        function destroy() {
          if (dead) return;
          dead = true; ready = false; playing = false;
          cancelAnimationFrame(raf); raf = 0; renderFrame = null;
          off.splice(0).forEach(f => f()); ro?.disconnect(); releaseDrag();
          geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
          geometries.clear(); materials.clear();
          renderer?.dispose(); renderer?.forceContextLoss(); canvas?.remove();
          if (root.__quietVectorDispose === dispose) delete root.__quietVectorDispose;
        }
        function staticUI(message) {
          const active = document.activeElement;
          const transferFocus = active === ui.view || active === ui.play || active === ui.replay || active === ui.assist;
          root.dataset.mode = 'static'; root.dataset.locked = 'false'; root.dataset.captured = 'false';
          ui.fallback.hidden = false; ui.veil.style.opacity = '0';
          ui.play.disabled = ui.replay.disabled = ui.assist.disabled = true;
          ui.chapter.classList.remove('reveal');
          ui.index.textContent = 'STILL EDITION / 01—03'; ui.heading.textContent = '三つの空間を、静かに読む。'; ui.copy.textContent = message;
          ui.view.removeAttribute('tabindex'); ui.view.removeAttribute('aria-describedby');
          cache.clear();
          if (transferFocus) ui.heading.focus({ preventScroll: true });
        }
        function dispose() { destroy(); staticUI('列柱、回廊、観測室。奥行きと視線のための空間研究。'); }
        function fail(message) { destroy(); staticUI(message); ui.live.textContent = message; }
        root.__quietVectorDispose = dispose;
        staticUI('列柱、回廊、観測室。奥行きと視線のための空間研究。');
        if (mq.matches) { staticUI('動きを抑える設定に合わせ、三つの空間を静止図で表示しています。'); return; }
      
        function syncUI() {
          if (!ready || dead) return;
          const id = elapsed < C.time.passage ? 0 : elapsed < C.time.room ? 1 : 2;
          if (chapterID !== id) {
            chapterID = id;
            text('chapterIndex', ui.index, chapters[id][0]); text('heading', ui.heading, chapters[id][1]); text('copy', ui.copy, chapters[id][2]);
            ui.chapter.classList.remove('reveal'); void ui.chapter.offsetWidth; ui.chapter.classList.add('reveal');
            announce(chapters[id][0] + '。' + chapters[id][1]);
          }
          const observing = elapsed >= C.time.observeIn && elapsed <= C.time.observeOut;
          const percent = captured ? 100 : Math.min(100, Math.floor(held / C.hold * 100));
          const playLabel = playing ? '一時停止' : elapsed >= C.duration ? 'もう一度旅をする' : elapsed > 0 ? '旅を再開' : '旅をはじめる';
          text('playText', ui.play, playLabel);
          text('assistText', ui.assist, captured ? '観測を記録済み' : assisting && observing ? '照準を追従中' : '照準を補助');
          disabled('playDisabled', ui.play, false); disabled('replayDisabled', ui.replay, false);
          disabled('assistDisabled', ui.assist, !playing || !observing || captured);
          let reading, label;
          if (captured) { reading = 'OBSERVATION SAVED / 観測を記録しました'; label = 'RECORDED / 100%'; }
          else if (observing && !playing) { reading = 'PAUSED / 注視時間はリセットされました。再開後に計測します。'; label = 'PAUSED / 0%'; }
          else if (observing) {
            reading = locked ? 'HOLD / 外円から出さずに保持 · ' + percent + '%' : '視線を' + hint + '。中央の光点を内円へ / 照準補助も利用できます。';
            label = locked ? 'HOLD / ' + percent + '%' : 'INNER 4° / OUTER 6°';
          } else { reading = elapsed > C.time.observeOut ? 'NOT RECORDED / もう一度、視線の旅へ。' : '観測体は最後の空間に現れます。'; label = 'FRAME THE SIGNAL'; }
          text('reading', ui.reading, reading); text('reticleLabel', ui.reticle, label);
          put('locked', String(locked || captured), v => { root.dataset.locked = v; });
          put('captured', String(captured), v => { root.dataset.captured = v; });
          put('holdProgress', percent, v => { ui.progress.style.strokeDasharray = v + ' 100'; });
          text('clock', ui.clock, elapsed.toFixed(1).padStart(4, '0') + ' / ' + C.duration.toFixed(1));
          const ranges = [[0,C.time.passage],[C.time.passage,C.time.room],[C.time.room,C.duration]];
          ranges.forEach(([a,b], i) => {
            const progress = clamp((elapsed-a)/(b-a),0,1).toFixed(4);
            put('bar'+i, progress, v => { ui.bars[i].style.transform = 'scaleX('+v+')'; });
          });
          put('blackout', blackout.toFixed(4), v => { ui.veil.style.opacity = v; });
          put('notice', noticeID, () => { ui.live.textContent = notice; });
        }
        function request() {
          if (dead || raf || suspended || document.hidden || !renderFrame) return;
          last = 0; raf = requestAnimationFrame(tick);
        }
        function tick(now) {
          raf = 0;
          if (dead || suspended || document.hidden) { last = 0; return; }
          const dt = last ? Math.min((now-last)/1000,.05) : 0; last = now;
          try { renderFrame(dt); syncUI(); }
          catch { fail('描画を続けられないため、静止版を表示しています。'); return; }
          if (shaderFailed) { fail('シェーダーを利用できないため、静止版を表示しています。'); return; }
          const settling = Math.abs(yaw-wantYaw)+Math.abs(pitch-wantPitch) > .0001;
          if (!dead && !document.hidden && !suspended && (playing || settling)) raf = requestAnimationFrame(tick);
          else last = 0;
        }
        function pause() {
          if (dead) return;
          const wasPlaying = playing;
          playing = false; held = 0; releaseDrag();
          cancelAnimationFrame(raf); raf = 0; last = 0;
          if (wasPlaying) announce('一時停止しました。未完了の注視時間はリセットされます。');
          syncUI();
        }
        function reset() {
          elapsed = held = blackout = 0; captured = locked = assisting = false;
          yaw = pitch = wantYaw = wantPitch = 0; chapterID = -1; releaseDrag();
        }
        on(mq, 'change', e => { if (e.matches) fail('動きを抑える設定に合わせ、静止版へ切り替えました。'); });
        on(window, 'pagehide', e => { if (e.persisted) { suspended = true; pause(); } else destroy(); });
        on(window, 'pageshow', () => { suspended = false; if (!dead) request(); });
        on(document, 'visibilitychange', () => { if (document.hidden) pause(); else request(); });
      
        async function init() {
          try {
            const T = await import('three');
            if (dead) return;
            renderer = new T.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
            canvas = renderer.domElement; canvas.hidden = true; ui.slot.append(canvas);
            renderer.outputColorSpace = T.SRGBColorSpace;
            renderer.debug.onShaderError = () => { shaderFailed = true; };
            on(canvas, 'webglcontextlost', e => { e.preventDefault(); fail('WebGLの接続が失われたため、静止版を表示しています。'); });
            const scene = new T.Scene(), camera = new T.PerspectiveCamera(C.fov,1,.1,150);
            const early = new T.Group(), late = new T.Group(); scene.add(early,late);
            const fogA = new T.Color('#193034'), fogB = new T.Color('#314943');
            const geo = g => { geometries.add(g); return g; };
            const mat = m => { materials.add(m); return m; };
            const box = geo(new T.BoxGeometry(1,1,1));
            const plane = geo(new T.PlaneGeometry(180,220));
            const ring = geo(new T.TorusGeometry(1,.018,8,96));
            const shader = (color,fog,density=.037) => mat(new T.ShaderMaterial({
              uniforms: { uColor: { value: new T.Color(color) }, uFog: { value: fog }, uDensity: { value: density } },
              vertexShader: `varying vec3 vWorld; varying vec3 vNormal; varying float vDepth;
                void main(){vec4 w=modelMatrix*vec4(position,1.0);vWorld=w.xyz;
                vec3 vn=normalize(normalMatrix*normal);vNormal=vec3(dot(viewMatrix[0].xyz,vn),dot(viewMatrix[1].xyz,vn),dot(viewMatrix[2].xyz,vn));
                vec4 mv=viewMatrix*w;vDepth=-mv.z;gl_Position=projectionMatrix*mv;}`,
              fragmentShader: `uniform vec3 uColor;uniform vec3 uFog;uniform float uDensity;
                varying vec3 vWorld;varying vec3 vNormal;varying float vDepth;
                void main(){vec3 n=normalize(vNormal);float light=.30+.70*max(dot(n,normalize(vec3(-.45,.85,.3))),0.0);
                float phase=vWorld.y*18.0+vWorld.x*.7+vWorld.z*.15;float aa=1.0-smoothstep(.2,1.5,fwidth(phase));
                float grain=1.0+.045*sin(phase)*aa;float seam=1.0-abs(sin(vWorld.z*.55));float lines=smoothstep(.985,1.0,seam);
                vec3 col=uColor*light*grain+vec3(.065,.08,.065)*lines*abs(n.y);
                float fog=1.0-exp(-pow(max(vDepth,0.0)*uDensity,1.45));gl_FragColor=vec4(mix(col,uFog,fog),1.0);
                #include <tonemapping_fragment>
                #include <colorspace_fragment>
                }`
            }));
            const stoneA=shader('#729087',fogA), stoneB=shader('#a4ac91',fogB);
            const floorA=shader('#294d4c',fogA), floorB=shader('#45645b',fogB);
            const dark=shader('#111d1d',new T.Color('#050909'),.07);
            const gold=mat(new T.MeshBasicMaterial({color:'#edb77e'}));
            const dullGold=shader('#ae9467',fogB);
            function mesh(group,geometry,material,x,y,z,sx=1,sy=1,sz=1) {
              const m=new T.Mesh(geometry,material);m.position.set(x,y,z);m.scale.set(sx,sy,sz);group.add(m);return m;
            }
            for(const [group,material] of [[early,floorA],[late,floorB]]) {
              const f=mesh(group,plane,material,0,-.3,-65);f.rotation.x=-Math.PI/2;
            }
            for(let i=0;i<11;i++) {
              const z=-i*5-3,height=13+Math.sin(i*.7)*4;
              for(const side of [-1,1]) mesh(early,box,stoneA,side*(7.5+Math.sin(i*.6)),height/2,z,1.3,height,2.2);
              if(i%3===0)mesh(early,box,stoneA,0,height,z,17,.5,2.2);
            }
            for(let i=0;i<16;i++)for(const side of [-1,1]) {
              const m=mesh(late,box,stoneB,side*(10+Math.sin(i*.5)*2),5,-55-i*5,.7,10,2.5);m.rotation.y=side*.25;
            }
            for(let i=0;i<4;i++) {
              mesh(late,ring,dullGold,0,5,-68-i*18,10,10,10);
              mesh(late,ring,stoneB,0,5,-68.5-i*18,10.6,10.6,10.6);
            }
            const tubeGeo=geo(new T.CylinderGeometry(6,6,20,48,1,true));dark.side=T.BackSide;
            const tube=mesh(scene,tubeGeo,dark,0,2,-45);tube.rotation.x=Math.PI/2;
            const ribMat=shader('#34403a',new T.Color('#050909'),.085);
            for(let i=0;i<11;i++)mesh(scene,ring,ribMat,0,2,-35-i*2,5.96,5.96,5.96);
            const target=new T.Group();scene.add(target);
            const core=geo(new T.IcosahedronGeometry(.11,1));mesh(target,core,gold,0,0,0);
            const r1=mesh(target,ring,gold,0,0,0,.65,.65,.65);
            const r2=mesh(target,ring,gold,0,0,0,.65,.65,.65);r2.rotation.y=1.05;r2.rotation.z=.4;
            const path=new T.CatmullRomCurve3([
              new T.Vector3(-2,2,0),new T.Vector3(0,2.3,-20),new T.Vector3(1,2,-40),
              new T.Vector3(0,2.4,-60),new T.Vector3(-2,2.8,-80),new T.Vector3(0,3,-100)
            ]);
            const targetPoints=[];
            for(let i=0;i<=10;i++) {
              const p=path.getPointAt(i/10);p.z-=12;p.x+=2.8+Math.sin(i*.4);p.y+=.4;targetPoints.push(p);
            }
            const targetPath=new T.CatmullRomCurve3(targetPoints);
            const tangent=new T.Vector3(),look=new T.Vector3(),direction=new T.Vector3(),forward=new T.Vector3(),local=new T.Vector3(),projected=new T.Vector3();
            const base=new T.Quaternion(),inverse=new T.Quaternion(),offset=new T.Quaternion(),euler=new T.Euler(0,0,0,'YXZ');
            const enterDot=Math.cos(radians(C.enter)),exitDot=Math.cos(radians(C.exit));
            let previousW=0,previousH=0,previousDpr=0;
            function resize() {
              if(dead)return;
              const w=Math.max(1,ui.view.clientWidth),h=Math.max(1,ui.view.clientHeight);
              const dpr=Math.min(devicePixelRatio||1,C.maxDpr,Math.sqrt(C.maxPixels/(w*h)));
              if(w===previousW&&h===previousH&&dpr===previousDpr)return;
              previousW=w;previousH=h;previousDpr=dpr;
              renderer.setPixelRatio(dpr);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
              // Perspective angle -> CSS pixels, independent of renderer pixel ratio.
              const focal=h/(2*Math.tan(radians(camera.getEffectiveFOV())/2));
              const inner=focal*Math.tan(radians(C.enter)),outer=focal*Math.tan(radians(C.exit));
              ui.visual.style.setProperty('--enter-radius',inner+'px');
              ui.visual.style.setProperty('--exit-radius',outer+'px');
              ui.visual.style.setProperty('--progress-size',((outer+9)*2/.96)+'px');
              request();
            }
            renderFrame=dt=>{
              if(playing)elapsed=Math.min(C.duration,elapsed+dt);
              const t=elapsed/C.duration,switched=elapsed>=C.time.swap;
              early.visible=!switched;late.visible=switched;scene.background=switched?fogB:fogA;
              blackout=smooth(C.time.close,C.time.blackIn,elapsed)*(1-smooth(C.time.blackOut,C.time.open,elapsed));
              path.getPointAt(t,camera.position);path.getTangentAt(t,tangent);look.copy(camera.position).add(tangent);
              camera.up.set(0,1,0);camera.lookAt(look);base.copy(camera.quaternion);
              targetPath.getPointAt(t,target.position);target.visible=elapsed>=C.time.room&&elapsed<=C.time.targetOut;
              r1.rotation.z=t*1.4;r2.rotation.y=1.05+t*.5;
              const windowOpen=elapsed>=C.time.observeIn&&elapsed<=C.time.observeOut;
              if(assisting&&windowOpen&&!captured) {
                inverse.copy(base).invert();local.copy(target.position).sub(camera.position).applyQuaternion(inverse);
                wantYaw=clamp(Math.atan2(-local.x,-local.z),-C.yaw,C.yaw);
                wantPitch=clamp(Math.atan2(local.y,Math.hypot(local.x,local.z)),-C.pitch,C.pitch);
              }
              if(!windowOpen)assisting=false;
              const k=1-Math.exp(-C.damping*dt);yaw+=(wantYaw-yaw)*k;pitch+=(wantPitch-pitch)*k;
              euler.set(pitch,yaw,0,'YXZ');offset.setFromEuler(euler);camera.quaternion.copy(base).multiply(offset);camera.updateMatrixWorld();
              direction.copy(target.position).sub(camera.position).normalize();camera.getWorldDirection(forward);
              locked=windowOpen&&forward.dot(direction)>=(locked?exitDot:enterDot);
              // Release is NOT gated by playback. Pause always resets unfinished dwell.
              if(!captured) {
                if(!locked||!playing)held=0;
                else held+=dt;
                if(held>=C.hold) { captured=true;assisting=false;announce('観測を記録しました。旅はそのまま続きます。'); }
              }
              if(windowOpen&&!captured&&!locked) {
                projected.copy(target.position).project(camera);
                hint=Math.abs(projected.x)>.08?(projected.x>0?'右へ':'左へ'):(projected.y>0?'上へ':'下へ');
              }
              if(elapsed>=C.duration&&playing) {
                playing=false;
                if(!captured)held=0;
                announce(captured?'旅が完了しました。観測記録は保持されています。':'旅が完了しました。最初から再挑戦できます。');
              }
              renderer.render(scene,camera);
            };
            on(ui.play,'click',()=>{
              if(playing){pause();return;}
              if(elapsed>=C.duration)reset();
              playing=true;announce('旅を開始します。');syncUI();request();
            });
            on(ui.replay,'click',()=>{reset();playing=true;syncUI();request();});
            on(ui.assist,'click',()=>{assisting=true;announce('照準補助を開始しました。');syncUI();request();});
            on(ui.view,'pointerdown',e=>{
              if(!e.isPrimary||e.button!==0)return;
              drag={id:e.pointerId,x:e.clientX,y:e.clientY};assisting=false;
              ui.view.focus({preventScroll:true});ui.view.setPointerCapture(e.pointerId);syncUI();
            });
            on(ui.view,'pointermove',e=>{
              if(!drag||drag.id!==e.pointerId)return;
              wantYaw=clamp(wantYaw-(e.clientX-drag.x)*.0025,-C.yaw,C.yaw);
              wantPitch=clamp(wantPitch+(e.clientY-drag.y)*.002,-C.pitch,C.pitch);
              drag.x=e.clientX;drag.y=e.clientY;request();
            });
            const end=e=>{if(drag?.id===e.pointerId)releaseDrag();};
            on(ui.view,'pointerup',end);on(ui.view,'pointercancel',end);on(ui.view,'lostpointercapture',()=>{drag=null;});
            on(ui.view,'keydown',e=>{
              if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;
              e.preventDefault();assisting=false;
              if(e.key==='ArrowLeft')wantYaw+=.035;if(e.key==='ArrowRight')wantYaw-=.035;
              if(e.key==='ArrowUp')wantPitch+=.025;if(e.key==='ArrowDown')wantPitch-=.025;
              wantYaw=clamp(wantYaw,-C.yaw,C.yaw);wantPitch=clamp(wantPitch,-C.pitch,C.pitch);syncUI();request();
            });
            resize();renderFrame(0);
            if(shaderFailed||renderer.getContext().isContextLost())throw new Error('WebGL startup failed');
            if(dead)return;
            ready=true;root.dataset.mode='live';ui.fallback.hidden=true;canvas.hidden=false;
            ui.view.tabIndex=0;ui.view.setAttribute('aria-describedby','q-instructions');
            if('ResizeObserver' in window){ro=new ResizeObserver(resize);ro.observe(ui.view);}
            on(window,'resize',resize);syncUI();request();
          } catch { if(!dead)fail('WebGLを利用できないため、静止図と空間の説明を表示しています。'); }
        }
        init();
      }
      
---

# Day 055 — WebGLで作る、視線を記録する20秒のカメラジャーニー

> **Reference study:** [Peugeot Catch the Dragon — dpdk](https://www.cssdesignawards.com/blog/case-study-peugeot-catch-the-dragon-by-dpdk/269/) / CSS Design Awards  
> **主軸:** WebGL / **品質レビュー:** 87/100

演出された移動とユーザー視線の分離、対象へのフレーミングを目的にする原理、暗い通路による連続的な接続を研究しました。列柱・回廊・観測室、抽象的な観測体、角度と一致する二重照準へ独自に再構成し、元作品のブランド・素材・レイアウトは使用していません。

# Day 055 / 365 — WebGL × Camera Choreography

公開日：2026-11-26

## 参考にした表現

参考は **Peugeot Catch the Dragon — dpdk**。CSS Design Awardsに2015年12月23日公開された、制作者によるケーススタディです。

参考URL：https://www.cssdesignawards.com/blog/case-study-peugeot-catch-the-dragon-by-dpdk/269/

研究対象は、演出された移動とユーザーが動かす視線の分離です。対象をフレームに収めること自体を目的にすると、カメラは装飾ではなく操作系になります。時系列の演出設計、環境の連続性、暗い通路による場面接続も着想源です。

以下は独自のThree.js実装です。参考作品の実装スタックや現在の互換性を検証したものではありません。車両、竜、ブランド素材、映像、原文コピーは使用していません。

## 完成形

**QUIET VECTOR / 静けさの座標**。列柱庭、遮光回廊、観測室を20秒の有効再生時間で巡ります。移動はボタン操作で開始し、ドラッグまたは矢印キーで視線を調整します。

- 0〜7秒：反復する列柱で移動距離を感じる。
- 7〜11秒：遮光回廊へ入り、完全遮光中の9秒地点で環境を交換する。
- 11〜20秒：観測室へ抜け、12〜18秒の間に琥珀色の観測体を記録する。

観測のルールは、**観測体の中央の光点を内円へ入れ、外円から出さずに0.7秒保つ**こと。内円は捕捉開始の4度、点線の外円は解除境界の6度です。その外側にある細い円弧が注視進捗を表します。停止すると未完了の注視時間はゼロになり、再開後に計測し直します。

照準補助はカメラを対象へ追従させる機能で、成功フラグを直接変更しません。記録できなくても旅は完走できます。

## 実装設計

### カメラ位置と視線の分離

位置と基準方向を`CatmullRomCurve3`から取得し、その基準姿勢へローカルのyaw・pitchを合成します。入力による姿勢は`1 - exp(-damping × dt)`で追従します。観測体は別のスプライン上を移動します。

### 見た目と判定を同じ角度から作る

内積による捕捉角度は4度、解除角度は6度です。CSS上の円の半径も同じ角度から計算します。

`radiusPx = viewHeight / 2 × tan(angle) / tan(verticalFov / 2)`

このカメラは対称な透視投影で、判定基準は対象の中心です。そのため角度の円錐は画面上の円として表せます。リサイズ時にはカメラのアスペクト比と両方の照準半径を更新します。DPRではなくCSSピクセルのビュー高さを使う点が重要です。

### 注視時間の状態遷移

未記録時は、`!locked || !playing`で必ず`held = 0`にします。解除処理は再生中の条件の外に置き、停止操作自体でも即座にゼロへ戻します。停止中に視線を外し、再び合わせてから再開しても、停止前の時間を合算できません。

内円へ入った後は外円まで許容するヒステリシスがあります。内円を少し出るだけで進捗を失うことはありません。観測成功後の記録は、最初から再生するまで保持します。

### 描画とDOM反映の分離

`renderFrame()`は時間、姿勢、観測判定、GPU描画を担当します。`syncUI()`は状態から表示を導出し、キャッシュ付きの`put()`を通して差分だけをDOMへ反映します。

ボタン文言、disabled、reading、dataset、章本文は同値なら変更しません。進捗は整数パーセント、時計は0.1秒単位です。遮光とタイムラインには連続値が必要ですが、こちらも同値のスタイル設定は避けます。

章は単調増加する再生時刻から確定するため境界往復がありません。章変更時だけ短い登場遷移を適用します。スクラブとHistory APIは使用せず、ブラウザの戻る操作を独自の履歴で上書きしません。

### 情報が伸びるレイアウト

ヘッダー、見出し、独立した観測ビュー、下部情報を通常フローに配置しています。絶対配置は観測ビュー内部のCanvas・照準・遮光レイヤーだけです。

セクションに固定高を設定せず、見出しには可変サイズと緊急改行を設けています。下部情報は折り返し可能なGridとFlexで構成し、静止版の説明は狭幅で縦積みになります。文字が増えたときはセクション全体が伸びます。

## シェーダー/レンダリング

柱、床、回廊、観測体はすべて生成ジオメトリです。共有形状と独自`ShaderMaterial`で構成し、外部画像やモデルを読み込みません。

フラグメントシェーダーでは、ワールド座標由来の細かな縞、方向性の陰影、距離フォグを合成します。縞には微分値を使った減衰を入れ、遠方の細線が強く残ることを抑えています。

遮光回廊は実際の円筒形状とリブを持ちます。8〜8.6秒で遮光を閉じ、8.6〜9.4秒は完全な不透明状態を維持します。その中央で環境グループと背景を交換し、10秒までに開きます。カメラ位置と基準方向は連続したままです。

シャドウマップ、ブルーム、多段ポストプロセスは使わず、暗い建築と琥珀色の細線の輝度差を主役にしています。

## 実務での使いどころ

- 建築・空間ブランドのHeroで、移動と視線を代表空間への導線にする。
- キャンペーンで、一度だけの発見を短い映像的体験へ組み込む。
- プロダクト公開で、暗部をまたいだ全景のリビールを作る。
- 展示サイトで、視点合わせを任意の観測記録として利用する。

購入導線や必須情報を捕捉成功のみに依存させないでください。本作でも未記録で完走でき、静止版には三つの空間の説明を残しています。

## 調整パラメータ

| 定数 | 初期値 | 用途 |
| --- | --- | --- |
| `duration` | 20秒 | 有効再生時間 |
| `fov` | 56度 | 垂直画角。照準半径にも連動 |
| `enter / exit` | 4 / 6度 | 捕捉開始と解除境界 |
| `hold` | 0.7秒 | 観測完了までの連続注視時間 |
| `damping` | 9 | 視線の追従速度 |
| `yaw / pitch` | 0.42 / 0.24 rad | 手動視線の可動範囲 |
| `maxDpr` | 1.6 | ピクセル密度上限 |
| `maxPixels` | 1,800,000 | 描画バッファ面積の目安 |

時刻は`C.time`にまとめています。時間構成を変える際は、回廊の空間的位置とスプライン上の通過時刻も一緒に調整してください。

## パフォーマンスとアクセシビリティ

JavaScriptはES moduleとして読み込み、プロジェクト側で`three`を解決してください。Three.js r170相当のAPIを前提とした記述です。依存バージョンは導入側で固定してください。

停止中は視線の減衰が収まるとRAFを止め、入力・リサイズ時に再描画します。タブ非表示とBFCacheへの退避では停止し、自動再開しません。再生時間はフレーム間隔を最大0.05秒に制限した有効時間で、低FPSや非表示時間を飛び越えて進めない設計です。

reduced-motion、初期化失敗、シェーダーエラー、コンテキストロストでは独自SVGと文章へ退避します。`[hidden]`の非表示をCSSで保証しています。動作中に静止版へ切り替え、操作中の要素が非表示になる場合は説明見出しへフォーカスを移します。静止版から動画版へ戻す場合は再マウントまたは再読み込みが必要です。

モバイルは`touch-action: pan-y pinch-zoom`で縦スクロールと拡大を優先します。横ドラッグが主操作で、縦方向の調整には矢印キーまたは照準補助も利用できます。センサー権限は要求しません。読み上げ通知は章変更、操作、成功、完了などの離散イベントに限定します。

破棄時はRAF、イベント、ResizeObserver、Pointer Capture、ジオメトリ、マテリアル、レンダラー、生成Canvasを解放します。SPAではアンマウント時にルートの`__quietVectorDispose()`を呼んでください。非同期import完了前に破棄された場合もGPUを初期化しません。

### 未検証項目の確認手順

この回答ではブラウザ・実機・性能検証を実施していません。導入時は次を確認してください。

1. 捕捉途中で停止し、視線を外して再捕捉・再開する。進捗がゼロから始まることを確認する。
2. 異なるビュー高さ、DPR、画面回転で、対象中心の内円進入・外円退出と判定が一致することを確認する。
3. 320px相当の幅と200〜400%拡大、文字のみ拡大で、見出し・操作・静止版の説明が欠けず、通常フローで伸びることを確認する。
4. iOS／Androidで横ドラッグ、縦スクロール、ピンチズーム、照準補助の収束を確認する。
5. Chrome、Safari、Firefoxでシェーダー、暗部階調、移動中の構図、9秒地点の交換を確認する。
6. WebGL無効化、コンテキストロスト、reduced-motion変更、キーボードと読み上げで静止版への退避を確認する。
7. Performance／DOM変更ブレークポイントで、同値のボタンやreadingが書き換わらず、停止後にRAFが収束することを確認する。
8. 再マウント、BFCache、タブ切り替えでリソースとイベントが重複しないことを確認する。

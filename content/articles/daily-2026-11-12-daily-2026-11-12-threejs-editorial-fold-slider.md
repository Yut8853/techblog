---
title: "Three.jsで作る、紙の稜線をめくるエディトリアルスライダー"
description: "生成静物を紙の折り目のようなリビールでつなぐThree.js製エディトリアルスライダー。非同期GPU起動とドラッグの整合、直近速度による確定、画像不足時の表示まで設計します。"
category: "WebGLスライダー"
categorySlug: "webgl-slider"
categoryDescription: "Three.jsとGLSLで作品画像の連続性と編集情報を同期させ、操作・遷移・静止画表示まで一体で設計するWebGLスライダー。"
tags:
  - "Three.js"
  - "GLSL"
  - "Editorial Slider"
  - "CanvasTexture"
  - "ドラッグ"
  - "アクセシビリティ"
  - "Daily Lab"
date: "2026年11月12日"
publishedAt: "2026-11-12"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 41
focus: "Three.js"
concept: "素材研究誌を一枚ずつ読み進めるThree.jsエディトリアルスライダー。独自生成した建築的静物を折り目状のリビールでつなぎ、画像の可逆的な進捗と情報の確定を分離する。非同期GPU起動、静止画操作、画像不足まで同じ閲覧体験として設計する。"
referenceTitle: "Manifest Portfolio Website — ClaPat."
referenceUrl: "https://cssdesignawards.com/sites/manifest-portfolio-website/43795/"
referencePlatform: "CSS Design Awards"
qualityScore: 87
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" id="fieldnote-041" tabindex="0" role="region" aria-roledescription="カルーセル" aria-label="FIELDNOTE 素材研究アーカイブ" aria-describedby="fn-help">
        <header class="fn-top">
          <div class="fn-brand">FIELDNOTE<span>INDEPENDENT MATERIAL STUDIES</span></div>
          <div class="fn-edition">VOL. 041 / 365<br><time datetime="2026-11-12">12 NOVEMBER 2026</time></div>
        </header>
        <div class="fn-visual" aria-hidden="true">
          <div class="fn-fallback"><div class="fn-art-slot"><div class="fn-static-sculpture"></div></div></div>
        </div>
        <div class="fn-rail">SELECTED STUDIES — 2026</div>
        <span class="fn-mode">静止画モード</span>
        <div class="fn-copy">
          <div class="fn-kicker"><span class="fn-topic">01 / SPATIAL STUDY</span><span class="fn-material">LIMESTONE · LIGHT</span></div>
          <h1 class="fn-title"><span>The shape</span><span>of quiet.</span></h1>
          <p class="fn-desc">光が通り抜ける余白を、ひとつの素材として。静けさの輪郭を探る空間研究。</p>
        </div>
        <div class="fn-caption"><b class="fn-art-name">Plate 01 — An opening</b><span>ORIGINAL GENERATIVE STILL LIFE</span></div>
        <footer class="fn-bottom">
          <p class="fn-instructions" id="fn-help"><strong>DRAG TO EXPLORE</strong><span>横ドラッグ / ← → キー / 番号で選択</span></p>
          <nav class="fn-pages" aria-label="作品を選択">
            <button type="button" class="fn-page" data-index="0" aria-label="01 The shape of quiet." aria-current="true">01</button>
            <button type="button" class="fn-page" data-index="1" aria-label="02 Matter in motion." aria-current="false">02</button>
            <button type="button" class="fn-page" data-index="2" aria-label="03 A slower horizon." aria-current="false">03</button>
          </nav>
          <div class="fn-controls"><span class="fn-count">01 / 03</span><button class="fn-arrow" type="button" data-step="-1" aria-label="前の作品">←</button><button class="fn-arrow" type="button" data-step="1" aria-label="次の作品">→</button></div>
        </footer>
        <div class="fn-meter" aria-hidden="true"><span></span></div>
        <p class="fn-sr fn-status" aria-live="polite" aria-atomic="true"></p>
        <noscript><p class="fn-noscript">作品の切り替えにはJavaScriptが必要です。現在はPlate 01の簡易図を表示しています。</p></noscript>
      </section>
  - name: styles.css
    language: css
    content: |
      .daily-stage{--ink:#111b1b;--paper:#eee8db;--muted:#c1c3b6;--line:rgba(238,232,219,.25);position:relative;isolation:isolate;overflow:hidden;min-height:820px;height:min(980px,100svh);background:var(--ink);color:var(--paper);font-family:Arial,'Helvetica Neue',sans-serif;box-sizing:border-box}.daily-stage *{box-sizing:border-box}.daily-stage [hidden]{display:none!important}.daily-stage button{font:inherit;color:inherit;cursor:pointer}.daily-stage button:focus-visible,.daily-stage:focus-visible{outline:2px solid #e0ba83;outline-offset:5px}.daily-stage button[aria-disabled=true]{cursor:wait}.fn-top{position:absolute;z-index:4;top:32px;left:4.5%;right:4.5%;display:flex;justify-content:space-between;align-items:center;gap:20px;padding-bottom:22px;border-bottom:1px solid var(--line)}.fn-brand{font-size:19px;font-weight:700;letter-spacing:.16em}.fn-brand span{display:inline-block;font-weight:400;font-size:10px;letter-spacing:.1em;margin-left:16px;color:var(--muted)}.fn-edition{font-size:11px;letter-spacing:.12em;text-align:right;line-height:1.7}.fn-visual{position:absolute;inset:9% -2% 0 24%;touch-action:pan-y;cursor:grab;overflow:hidden;user-select:none}.fn-visual:active{cursor:grabbing}.fn-visual>canvas,.fn-fallback,.fn-art-slot,.fn-art-slot>canvas{position:absolute;width:100%;height:100%;inset:0;display:block}.fn-art-slot>canvas{object-fit:cover}.fn-visual:after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,#111b1b 0%,transparent 24%),linear-gradient(0deg,#111b1b 1%,transparent 25%,transparent 84%,#111b1b 100%)}.fn-fallback{background:radial-gradient(ellipse at 60% 35%,#52605b,#111b1b 70%)}.fn-static-sculpture{position:absolute;left:30%;top:20%;width:45%;height:52%;border:54px solid #b8aa8d;border-bottom:0;border-radius:50% 50% 0 0;transform:skewY(-6deg);box-shadow:25px 10px 0 #605b4d}.fn-missing{position:absolute;top:26%;left:38%;right:8%;padding:32px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);font-size:14px;line-height:1.8;color:var(--paper)}.fn-missing span{display:block;font:italic 48px Georgia,serif;margin-bottom:16px}.fn-rail{position:absolute;z-index:2;left:4.5%;top:135px;display:flex;gap:14px;align-items:center;font-size:11px;letter-spacing:.15em;color:var(--muted)}.fn-rail:before{content:'';height:6px;width:6px;border-radius:50%;background:#d9af78}.fn-copy{position:absolute;z-index:3;left:4.5%;top:29%;width:68%;pointer-events:none}.fn-copy.is-entering{animation:fn-enter 360ms ease-out both}@keyframes fn-enter{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.fn-kicker{font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#e2c69d;display:flex;flex-wrap:wrap;gap:10px 25px;align-items:center;margin-bottom:25px;line-height:1.6}.fn-kicker span:last-child{color:var(--muted)}.fn-title{font-family:Georgia,'Times New Roman',serif;font-size:clamp(74px,8.6vw,138px);font-weight:400;letter-spacing:-.065em;line-height:.94;margin:0;max-width:850px;text-wrap:balance}.fn-title span{display:block}.fn-desc{max-width:340px;margin:28px 0 0;color:#d9d8cc;font-size:14px;line-height:1.9;letter-spacing:.025em}.fn-caption{position:absolute;z-index:2;right:4.5%;bottom:170px;font-family:Georgia,serif;font-size:14px;color:#c5c3b8;text-align:right}.fn-caption b{font-weight:400}.fn-caption span{display:block;margin-top:9px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:.14em;color:#abb5ab}.fn-bottom{position:absolute;z-index:4;left:4.5%;right:4.5%;bottom:30px;border-top:1px solid var(--line);padding-top:20px;display:grid;grid-template-columns:1fr auto 1fr;gap:24px;align-items:center}.fn-instructions{font-size:12px;line-height:1.8;color:var(--muted);margin:0}.fn-instructions strong{display:block;font-weight:400;color:var(--paper);letter-spacing:.13em;margin-bottom:3px}.fn-pages{display:flex;gap:7px}.fn-page{position:relative;background:none;border:0;min-width:50px;min-height:48px;font-size:13px!important;letter-spacing:.1em;color:#b0bbae!important}.fn-page:after{content:'';position:absolute;height:1px;left:10px;right:10px;bottom:5px;transform:scaleX(0);background:var(--paper);transition:transform .3s}.fn-page[aria-current=true]{color:var(--paper)!important}.fn-page[aria-current=true]:after{transform:scaleX(1)}.fn-controls{display:flex;gap:10px;justify-content:flex-end;align-items:center}.fn-count{font-size:12px;letter-spacing:.1em;color:var(--muted);margin-right:12px;font-variant-numeric:tabular-nums}.fn-arrow{width:48px;height:48px;flex-shrink:0;border:1px solid var(--line);border-radius:50%;background:transparent;font-size:20px!important;transition:background .2s,border-color .2s}.fn-arrow:hover{background:rgba(238,232,219,.09);border-color:#bbb6a6}.fn-meter{position:absolute;z-index:4;bottom:0;left:0;height:2px;width:100%;background:rgba(238,232,219,.07)}.fn-meter span{display:block;width:100%;height:100%;background:#d8b485;transform:scaleX(0);transform-origin:left}.fn-mode{position:absolute;z-index:4;right:4.5%;top:120px;font-size:12px;color:var(--muted);border:1px solid var(--line);padding:7px 9px;background:#111b1bcc}.fn-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.fn-noscript{position:absolute;z-index:5;top:175px;left:4.5%;font-size:12px}@media(max-width:1000px){.fn-brand span{display:none}.fn-bottom{grid-template-columns:1fr auto;gap:14px}.fn-instructions{grid-column:1/-1;display:flex;flex-wrap:wrap;justify-content:space-between;gap:4px 16px}.fn-caption{bottom:205px}.fn-count{display:none}.fn-copy{top:27%}.fn-title{font-size:clamp(68px,10vw,100px)}}@media(max-width:760px){.daily-stage{height:auto;min-height:100svh;padding:24px 6% 0;display:flex;flex-direction:column}.fn-top{position:relative;inset:auto;padding-bottom:18px;gap:12px}.fn-brand{font-size:16px}.fn-edition{font-size:10px;letter-spacing:.04em}.fn-rail{position:relative;inset:auto;margin-top:22px;font-size:10px;letter-spacing:.09em}.fn-mode{top:132px;right:6%;max-width:88%;font-size:12px;padding:6px 9px}.fn-visual{inset:80px -20% auto -4%;height:660px}.fn-visual:after{background:linear-gradient(0deg,#111b1b 0%,transparent 50%,transparent 86%,#111b1b 100%),linear-gradient(90deg,rgba(17,27,27,.38),transparent 55%)}.fn-copy{position:relative;inset:auto;width:100%;margin-top:270px}.fn-title{font-size:clamp(52px,12.2vw,92px);line-height:.96;letter-spacing:-.055em}.fn-kicker{font-size:12px;margin-bottom:18px;gap:5px 16px;max-width:95%}.fn-desc{font-size:14px;line-height:1.85;max-width:340px;margin-top:22px;text-shadow:0 1px 14px #111b1b}.fn-caption{display:none}.fn-bottom{position:relative;inset:auto;margin-top:32px;padding:18px 0 24px;gap:16px 8px;grid-template-columns:1fr auto}.fn-instructions{display:block;font-size:12px}.fn-instructions strong{font-size:12px;margin-bottom:4px}.fn-pages{gap:0}.fn-page{min-width:44px;min-height:44px}.fn-arrow{width:44px;height:44px}.fn-controls{gap:8px}.fn-missing{left:26%;top:23%;right:20%}.fn-noscript{top:175px;left:6%;right:6%}}@media(prefers-reduced-motion:reduce){.daily-stage *{transition:none!important;animation:none!important}}
  - name: experiment.js
    language: javascript
    content: |
      const root = document.querySelector('#fieldnote-041');
      if (root) {
        const CONFIG = {
          duration: 980, commitAt: 0.24, flickMin: 0.045, flickSpeed: 0.48,
          velocityWindow: 90, dragGain: 1.15, distortion: 0.065,
          parallax: 0.012, maxDpr: 1.75, textureWidth: 1024, textureHeight: 1152
        };
        const items = [
          { title: ['The shape', 'of quiet.'], topic: 'SPATIAL STUDY', material: 'LIMESTONE · LIGHT', description: '光が通り抜ける余白を、ひとつの素材として。静けさの輪郭を探る空間研究。', plate: 'An opening' },
          { title: ['Matter', 'in motion.'], topic: 'FOLDING STUDY', material: 'PAPER · TENSION', description: '折る、重ねる、ほどく。薄い面の連なりから、まだ見たことのない風景を立ち上げる。', plate: 'A folded field' },
          { title: ['A slower', 'horizon.'], topic: 'LANDSCAPE STUDY', material: 'SEDIMENT · TIME', description: '積もる時間に耳を澄ます。幾重にも重なる輪郭が、遠い地平線の記憶を描き出す。', plate: 'Layers of time' }
        ];
        const $ = selector => root.querySelector(selector);
        const visual = $('.fn-visual'), fallback = $('.fn-fallback'), slot = $('.fn-art-slot');
        const copy = $('.fn-copy'), meter = $('.fn-meter span'), mode = $('.fn-mode');
        const buttons = [...root.querySelectorAll('button')];
        const pages = [...root.querySelectorAll('[data-index]')];
        const ac = new AbortController();
        const on = (el, name, fn, options = {}) => el.addEventListener(name, fn, { ...options, signal: ac.signal });
        const mq = matchMedia('(prefers-reduced-motion: reduce)');
        const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
        const wrap = n => (n % items.length + items.length) % items.length;
        const number = n => String(n + 1).padStart(2, '0');
        const smooth = t => t * t * (3 - 2 * t);
        let reduced = mq.matches, destroyed = false, suspended = false;
        let current = 0, pending = 0, progress = 0, busy = false;
        let drag = null, animation = null, raf = 0, lastTime = 0;
        let initSequence = 0, loading = false, readyThree = null;
        let gpu = false, renderer = null, scene = null, camera = null;
        let geometry = null, material = null, textures = [];
        let pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      
        // Deterministic original still-life paintings; no image requests.
        function makeArt(index) {
          const c = document.createElement('canvas');
          c.width = CONFIG.textureWidth; c.height = CONFIG.textureHeight;
          c.setAttribute('aria-hidden', 'true');
          const ctx = c.getContext('2d');
          if (!ctx) throw new Error('Canvas 2D unavailable');
          ctx.scale(c.width / 1000, c.height / 1125);
          const palettes = [
            ['#111b1b', '#526057', '#d7c6a5', '#756c59'],
            ['#111b1b', '#665047', '#df9a72', '#693d2f'],
            ['#111b1b', '#405758', '#acc7bd', '#405b56']
          ];
          const [base, glow, light, dark] = palettes[index];
          ctx.fillStyle = base; ctx.fillRect(0, 0, 1000, 1125);
          const atmosphere = ctx.createRadialGradient(570, 440, 20, 550, 500, 650);
          atmosphere.addColorStop(0, glow); atmosphere.addColorStop(1, base);
          ctx.fillStyle = atmosphere; ctx.fillRect(0, 0, 1000, 1125);
          ctx.fillStyle = 'rgba(4,12,12,.38)';
          ctx.beginPath(); ctx.ellipse(560, 825, 330, 53, -.12, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = 'rgba(220,224,202,.12)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(65, 840); ctx.lineTo(950, 680); ctx.stroke();
          if (index === 0) {
            const arch = (dx, dy) => {
              ctx.beginPath(); ctx.moveTo(285 + dx, 780 + dy); ctx.lineTo(285 + dx, 440 + dy);
              ctx.bezierCurveTo(285 + dx, 165 + dy, 745 + dx, 165 + dy, 745 + dx, 440 + dy);
              ctx.lineTo(745 + dx, 780 + dy); ctx.lineTo(621 + dx, 780 + dy); ctx.lineTo(621 + dx, 440 + dy);
              ctx.bezierCurveTo(621 + dx, 307 + dy, 409 + dx, 307 + dy, 409 + dx, 440 + dy);
              ctx.lineTo(409 + dx, 780 + dy); ctx.closePath();
            };
            for (let z = 70; z >= 0; z -= 2) {
              arch(z, -z * .36); ctx.fillStyle = z ? dark : light; ctx.fill();
            }
            arch(0, 0); ctx.save(); ctx.clip();
            const stone = ctx.createLinearGradient(260, 260, 760, 770);
            stone.addColorStop(0, 'rgba(255,250,227,.32)');
            stone.addColorStop(.48, 'rgba(60,47,27,.02)');
            stone.addColorStop(1, 'rgba(41,37,22,.28)');
            ctx.fillStyle = stone; ctx.fillRect(200, 160, 620, 680);
            ctx.strokeStyle = 'rgba(76,66,42,.11)';
            for (let j = 0; j < 31; j++) {
              ctx.beginPath(); ctx.moveTo(240 + j * 20, 200); ctx.lineTo(300 + j * 20, 800); ctx.stroke();
            }
            ctx.restore(); arch(0, 0); ctx.strokeStyle = 'rgba(255,242,207,.35)'; ctx.stroke();
          } else if (index === 1) {
            const polygon = points => {
              ctx.beginPath(); points.forEach(([x, y], j) => j ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath();
            };
            for (let k = 12; k >= 0; k--) {
              const dx = k * 6, dy = -k * 10;
              polygon([[230+dx,740+dy],[390+dx,310+dy],[550+dx,550+dy],[775+dx,350+dy],[700+dx,795+dy]]);
              ctx.fillStyle = k ? dark : light; ctx.fill();
              ctx.strokeStyle = 'rgba(244,180,133,.32)'; ctx.stroke();
            }
            polygon([[230,740],[390,310],[550,550],[440,790]]);
            ctx.fillStyle = '#e7ad85'; ctx.fill();
            polygon([[440,790],[550,550],[775,350],[700,795]]);
            const fold = ctx.createLinearGradient(470, 600, 780, 650);
            fold.addColorStop(0, '#714b3b'); fold.addColorStop(.6, '#cb835c'); fold.addColorStop(1, '#efbd94');
            ctx.fillStyle = fold; ctx.fill();
            ctx.beginPath(); ctx.moveTo(390,310); ctx.lineTo(550,550); ctx.lineTo(440,790);
            ctx.strokeStyle = '#f7c9a2'; ctx.lineWidth = 2; ctx.stroke();
          } else {
            for (let k = 46; k >= 0; k--) {
              const t = k / 46, radius = 72 + Math.sin(t * Math.PI * .88) * 215;
              const x = 520 + Math.sin(t * 4.3) * 38, y = 300 + k * 10.5;
              ctx.beginPath(); ctx.ellipse(x, y, radius, radius * .27, -.14, 0, Math.PI * 2);
              ctx.fillStyle = k % 3 === 0 ? dark : light; ctx.fill();
              ctx.strokeStyle = 'rgba(12,32,29,.45)'; ctx.lineWidth = 2; ctx.stroke();
              ctx.beginPath(); ctx.ellipse(x, y - 2, radius - 3, radius * .265, -.14, Math.PI, Math.PI * 2);
              ctx.strokeStyle = 'rgba(231,247,223,.5)'; ctx.lineWidth = 1; ctx.stroke();
            }
          }
          let seed = 41 + index * 97;
          const rand = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
          for (let k = 0; k < 14000; k++) {
            ctx.fillStyle = k % 2 ? 'rgba(255,248,217,.035)' : 'rgba(0,8,7,.045)';
            ctx.fillRect(rand() * 1000, rand() * 1125, 1.2, 1.2);
          }
          return c;
        }
        // Preserve item indices even if only one painting fails.
        const canvases = items.map((_, index) => {
          try { return makeArt(index); } catch { return null; }
        });
      
        function showStatic() {
          fallback.hidden = false; mode.hidden = false;
          slot.replaceChildren(); // Never retain a different item's visual.
          const art = canvases[current];
          if (art) {
            slot.append(art);
            mode.textContent = reduced ? '動きを抑えた表示' : '静止画モード';
          } else {
            const message = document.createElement('div'); message.className = 'fn-missing';
            const label = document.createElement('span'); label.textContent = `Plate ${number(current)}`;
            message.append(label, document.createTextNode('画像を表示できません'));
            slot.append(message);
            mode.textContent = `${number(current)} — 画像を表示できません`;
          }
        }
        function updateContent(announce = true) {
          const item = items[current];
          $('.fn-title').replaceChildren(...item.title.map(line => {
            const span = document.createElement('span'); span.textContent = line; return span;
          }));
          $('.fn-topic').textContent = `${number(current)} / ${item.topic}`;
          $('.fn-material').textContent = item.material;
          $('.fn-desc').textContent = item.description;
          $('.fn-art-name').textContent = `Plate ${number(current)} — ${item.plate}`;
          $('.fn-count').textContent = `${number(current)} / 03`;
          pages.forEach((button, i) => button.setAttribute('aria-current', String(i === current)));
          if (!gpu) showStatic();
          if (announce) $('.fn-status').textContent = `作品 ${current + 1} / 3：${item.title.join(' ')}${canvases[current] ? '' : '。画像を表示できません。'}`;
        }
        function setBusy(value) {
          busy = value; copy.setAttribute('aria-busy', String(value));
          buttons.forEach(button => button.setAttribute('aria-disabled', String(value)));
        }
        function setProgress(value) {
          progress = clamp(value);
          if (material) material.uniforms.uProgress.value = progress;
          // Direct manipulation: no CSS transition on these properties.
          copy.style.opacity = String(1 - smooth(clamp(progress / .24)));
          copy.style.transform = `translateY(${-8 * clamp(progress / .24)}px)`;
          meter.style.transform = `scaleX(${progress})`;
        }
        function finish(commit, animateEntry = true) {
          const changed = commit && current !== pending;
          if (commit) current = pending;
          pending = current; animation = null;
          if (material) {
            material.uniforms.uFrom.value = textures[current];
            material.uniforms.uTo.value = textures[current];
          }
          if (changed) updateContent();
          copy.classList.remove('is-entering');
          setProgress(0); setBusy(false);
          if (commit && animateEntry && !reduced) copy.classList.add('is-entering');
        }
        function begin(index, direction) {
          pending = index; setBusy(true); copy.classList.remove('is-entering');
          material.uniforms.uFrom.value = textures[current];
          material.uniforms.uTo.value = textures[pending];
          material.uniforms.uDirection.value = direction;
          meter.style.transformOrigin = direction > 0 ? 'left' : 'right';
          setProgress(0);
        }
        function settle(commit) {
          const end = commit ? 1 : 0;
          animation = {
            from: progress, to: end, start: performance.now(),
            duration: Math.max(180, CONFIG.duration * Math.abs(end - progress)), commit
          };
          wake();
        }
        function navigate(index, direction) {
          if (destroyed || busy || drag) return;
          index = wrap(index);
          if (index === current) return;
          if (!gpu) { current = pending = index; updateContent(); return; }
          begin(index, direction); settle(true);
        }
        function wake() {
          if (!raf && gpu && !destroyed && !suspended && !document.hidden) raf = requestAnimationFrame(tick);
        }
        function tick(now) {
          raf = 0;
          if (!gpu || destroyed || suspended || document.hidden) return;
          const dt = lastTime ? Math.min(50, now - lastTime) : 16.7; lastTime = now;
          if (animation) {
            const a = animation, t = clamp((now - a.start) / a.duration);
            setProgress(a.from + (a.to - a.from) * smooth(t));
            if (t === 1) finish(a.commit);
          }
          const ease = 1 - Math.exp(-dt / 105);
          pointer.x += (pointer.tx - pointer.x) * ease;
          pointer.y += (pointer.ty - pointer.y) * ease;
          material.uniforms.uPointer.value.set(pointer.x, pointer.y);
          try { renderer.render(scene, camera); }
          catch { stopGPU(); showStatic(); return; }
          if (animation || Math.abs(pointer.x - pointer.tx) + Math.abs(pointer.y - pointer.ty) > .0003) wake();
        }
        function sizeRenderer() {
          const { width, height } = visual.getBoundingClientRect();
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CONFIG.maxDpr));
          renderer.setSize(Math.max(1, width), Math.max(1, height), false);
          material.uniforms.uSize.value.set(Math.max(1, width), Math.max(1, height));
        }
        function resize() {
          if (!gpu) return;
          // A resize changes the coordinate system: cancel any active gesture first.
          cancelGesture(false); sizeRenderer(); wake();
        }
        function releaseDrag() {
          const old = drag; drag = null;
          if (old && visual.hasPointerCapture(old.id)) visual.releasePointerCapture(old.id);
          return old;
        }
        function cancelGesture(animated = true) {
          const old = releaseDrag();
          if (old?.active && gpu && busy) {
            if (animated) settle(false); else finish(false, false);
          }
          pointer.tx = pointer.ty = 0;
        }
        function stopGPU() {
          initSequence++; loading = false; readyThree = null;
          cancelAnimationFrame(raf); raf = 0; lastTime = 0;
          releaseDrag();
          if (busy) finish(false, false);
          else { pending = current; animation = null; setProgress(0); }
          copy.classList.remove('is-entering');
          gpu = false;
          if (renderer) {
            renderer.domElement.removeEventListener('webglcontextlost', contextLost);
            renderer.domElement.remove();
          }
          textures.forEach(texture => texture.dispose()); textures = [];
          geometry?.dispose(); material?.dispose();
          renderer?.dispose(); renderer?.forceContextLoss();
          renderer = scene = camera = geometry = material = null;
          pointer = { x: 0, y: 0, tx: 0, ty: 0 };
        }
        function contextLost(event) {
          event.preventDefault(); stopGPU(); showStatic();
        }
      
        // The import may finish at any time. Publishing GPU mode is a separate,
        // synchronous transition that is only permitted between gestures.
        async function initialize() {
          if (destroyed || reduced || gpu || loading || readyThree || !canvases.every(Boolean)) return;
          const sequence = ++initSequence; loading = true;
          try {
            const THREE = await import('three');
            if (destroyed || reduced || sequence !== initSequence) return;
            loading = false; readyThree = THREE; activateGPU();
          } catch {
            if (!destroyed && sequence === initSequence) {
              loading = false; readyThree = null; showStatic();
            }
          }
        }
        function activateGPU() {
          if (!readyThree || gpu || destroyed || reduced || drag || busy || suspended || document.hidden) return;
          if (!root.isConnected) { destroy(); return; }
          const THREE = readyThree; readyThree = null;
          // No await below: inputs cannot observe the partially constructed renderer.
          pending = current; animation = null; setProgress(0); setBusy(false);
          try {
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
            renderer.outputColorSpace = THREE.SRGBColorSpace;
            renderer.setClearColor(0x111b1b, 1);
            renderer.domElement.setAttribute('aria-hidden', 'true');
            renderer.domElement.addEventListener('webglcontextlost', contextLost);
            visual.prepend(renderer.domElement);
            // Push individually so partial allocation failures can also be disposed.
            for (const canvas of canvases) {
              const texture = new THREE.CanvasTexture(canvas); textures.push(texture);
              texture.colorSpace = THREE.SRGBColorSpace;
              texture.minFilter = texture.magFilter = THREE.LinearFilter;
              texture.generateMipmaps = false;
            }
            scene = new THREE.Scene();
            camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 2); camera.position.z = 1;
            geometry = new THREE.PlaneGeometry(2, 2);
            material = new THREE.ShaderMaterial({
              depthTest: false, depthWrite: false, toneMapped: false,
              uniforms: {
                uFrom: { value: textures[current] }, uTo: { value: textures[current] },
                uProgress: { value: 0 }, uDirection: { value: 1 },
                uSize: { value: new THREE.Vector2(1, 1) }, uPointer: { value: new THREE.Vector2() },
                uAspect: { value: CONFIG.textureWidth / CONFIG.textureHeight },
                uDistortion: { value: CONFIG.distortion }, uParallax: { value: CONFIG.parallax }
              },
              vertexShader: `varying vec2 vUv;
                void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }`,
              fragmentShader: `precision highp float;
                varying vec2 vUv;
                uniform sampler2D uFrom, uTo;
                uniform float uProgress, uDirection, uAspect, uDistortion, uParallax;
                uniform vec2 uSize, uPointer;
                vec2 cover(vec2 uv){
                  float a=uSize.x/uSize.y;
                  vec2 scale=a>uAspect?vec2(1.0,uAspect/a):vec2(a/uAspect,1.0);
                  return (uv-0.5)*scale*0.96+0.5+uPointer*uParallax;
                }
                void main(){
                  float p=uProgress;
                  float envelope=sin(p*3.14159265);
                  float travel=uDirection>0.0?vUv.x:1.0-vUv.x;
                  float edge=mix(-0.15,1.15,p)+sin(vUv.y*5.0+p*2.0)*0.026*envelope;
                  float distanceToEdge=travel-edge;
                  float fold=exp(-pow(distanceToEdge*10.0,2.0))*envelope;
                  vec2 shift=vec2(uDirection*uDistortion*fold,cos(vUv.y*7.0+p)*fold*0.012);
                  vec4 outgoing=texture2D(uFrom,cover(vUv+shift));
                  vec4 incoming=texture2D(uTo,cover(vUv-shift*0.75));
                  float reveal=1.0-smoothstep(-0.028,0.028,distanceToEdge);
                  vec3 color=mix(outgoing.rgb,incoming.rgb,reveal);
                  float crease=exp(-pow((distanceToEdge+0.02)*62.0,2.0))*envelope;
                  color*=1.0-0.19*fold;
                  color+=crease*0.035;
                  gl_FragColor=vec4(color,1.0);
                  #include <colorspace_fragment>
                }`
            });
            scene.add(new THREE.Mesh(geometry, material));
            sizeRenderer(); renderer.compile(scene, camera); renderer.render(scene, camera);
            if (renderer.getContext().isContextLost() || renderer.info.programs?.some(program => program.diagnostics?.runnable === false)) {
              throw new Error('Renderer unavailable');
            }
            gpu = true; // Commit the mode only after a successful first render.
            fallback.hidden = true; mode.hidden = true; wake();
          } catch {
            stopGPU(); showStatic();
          }
        }
      
        function signedProgress(d) {
          return clamp(-d.dx * d.direction / Math.max(1, d.width) * CONFIG.dragGain);
        }
        function sample(d, x, time) {
          const previous = d.samples[d.samples.length - 1];
          const delta = x - previous.x;
          const sign = Math.sign(delta);
          // Start a new velocity segment on reversal, rather than averaging a return
          // motion together with a preceding fast outward motion.
          if (sign && d.sampleSign && sign !== d.sampleSign) d.samples = [previous];
          if (sign) d.sampleSign = sign;
          d.samples.push({ x, t: time });
          d.samples = d.samples.filter(point => point.t >= time - CONFIG.velocityWindow);
          if (d.samples.length > 64) d.samples.splice(0, d.samples.length - 64);
          d.dx = x - d.x;
        }
        function recentVelocity(d) {
          const first = d.samples[0], last = d.samples[d.samples.length - 1];
          const dt = last.t - first.t;
          return dt >= 8 ? (last.x - first.x) / dt : 0;
        }
        function shouldCommit(d, cancelled) {
          if (cancelled) return false;
          const p = signedProgress(d);
          const speed = -recentVelocity(d) * d.direction;
          return p >= CONFIG.commitAt || (p > CONFIG.flickMin && speed > CONFIG.flickSpeed);
        }
        function endDrag(event, cancelled = false) {
          if (!drag || drag.id !== event.pointerId) return;
          if (!cancelled) sample(drag, event.clientX, performance.now());
          const d = releaseDrag();
          pointer.tx = pointer.ty = 0;
          if (d.active) {
            const commit = shouldCommit(d, cancelled);
            if (gpu) { setProgress(signedProgress(d)); settle(commit); }
            else if (commit) navigate(current + d.direction, d.direction);
          }
          // In static mode, resolve the gesture and current item before promotion.
          activateGPU(); wake();
        }
      
        pages.forEach(button => on(button, 'click', () => {
          const index = Number(button.dataset.index); navigate(index, index >= current ? 1 : -1);
        }));
        root.querySelectorAll('[data-step]').forEach(button => on(button, 'click', () => {
          const step = Number(button.dataset.step); navigate(current + step, step);
        }));
        on(root, 'keydown', event => {
          if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input,textarea,select,[contenteditable]')) return;
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault(); if (event.repeat) return;
          if (event.key === 'Home') navigate(0, -1);
          else if (event.key === 'End') navigate(items.length - 1, 1);
          else { const step = event.key === 'ArrowRight' ? 1 : -1; navigate(current + step, step); }
        });
        on(visual, 'pointerdown', event => {
          if (!event.isPrimary || event.button !== 0 || busy || drag || destroyed) return;
          const time = performance.now();
          drag = {
            id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0,
            width: visual.clientWidth, active: false, direction: 1,
            sampleSign: 0, samples: [{ x: event.clientX, t: time }]
          };
        });
        on(visual, 'pointermove', event => {
          if (event.pointerType !== 'touch' && gpu) {
            const r = visual.getBoundingClientRect();
            pointer.tx = clamp((event.clientX - r.left) / Math.max(1, r.width)) - .5;
            pointer.ty = .5 - clamp((event.clientY - r.top) / Math.max(1, r.height)); wake();
          }
          if (!drag || drag.id !== event.pointerId) return;
          sample(drag, event.clientX, performance.now());
          const dx = drag.dx, dy = event.clientY - drag.y;
          if (!drag.active) {
            if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
              releaseDrag(); activateGPU(); return;
            }
            if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
            drag.active = true; drag.direction = dx < 0 ? 1 : -1;
            visual.setPointerCapture(event.pointerId);
            if (gpu) begin(wrap(current + drag.direction), drag.direction);
          }
          if (gpu) { setProgress(signedProgress(drag)); wake(); }
        });
        on(window, 'pointerup', event => endDrag(event));
        on(window, 'pointercancel', event => endDrag(event, true));
        on(visual, 'lostpointercapture', event => {
          if (drag?.id === event.pointerId) endDrag(event, true);
        });
        on(visual, 'pointerleave', () => {
          if (drag && !drag.active) { releaseDrag(); activateGPU(); }
          if (!drag) { pointer.tx = pointer.ty = 0; wake(); }
        });
        on(window, 'blur', () => { cancelGesture(); activateGPU(); wake(); });
        on(copy, 'animationend', () => copy.classList.remove('is-entering'));
        on(mq, 'change', event => {
          reduced = event.matches;
          if (reduced) { stopGPU(); showStatic(); }
          else initialize();
        });
        const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
        observer?.observe(visual);
        on(window, 'resize', () => {
          cancelGesture(false); resize(); activateGPU();
        }, { passive: true });
        on(document, 'visibilitychange', () => {
          if (document.hidden) {
            cancelGesture(false); cancelAnimationFrame(raf); raf = 0; lastTime = 0;
          } else { activateGPU(); wake(); }
        });
        on(window, 'pagehide', event => {
          if (event.persisted) {
            suspended = true; cancelGesture(false); cancelAnimationFrame(raf); raf = 0;
          } else destroy();
        });
        on(window, 'pageshow', () => {
          suspended = false; lastTime = 0; resize(); activateGPU(); wake();
        });
        on(root, 'daily:destroy', destroy);
        function destroy() {
          if (destroyed) return;
          destroyed = true; ac.abort(); observer?.disconnect(); stopGPU(); showStatic();
          buttons.forEach(button => { button.disabled = true; });
          // Keep only the currently displayed static canvas attached to the DOM.
          canvases.forEach(canvas => {
            if (canvas && !slot.contains(canvas)) canvas.width = canvas.height = 1;
          });
          canvases.length = 0;
        }
        updateContent(false); initialize();
      }
      
---

# Day 041 — Three.jsで作る、紙の稜線をめくるエディトリアルスライダー

> **Reference study:** [Manifest Portfolio Website — ClaPat.](https://cssdesignawards.com/sites/manifest-portfolio-website/43795/) / CSS Design Awards  
> **主軸:** Three.js / **品質レビュー:** 87/100

提供リサーチで確認されたカスタムスライダー、全画面アニメーション、WebGLタグを出発点に、作品面と編集情報の関係を研究。具体的な速度曲線や実装方式は紹介ページから確認できないため断定しない。生成静物、素材研究誌の誌面、折り目状GLSL、非同期起動と入力の状態管理は独自設計。Three.js採用を参考サイトの事実として扱わない。

# Day 041 / 365 — FIELDNOTE / 紙の稜線

公開日：2026-11-12  
主軸技術：Three.js  
表現系統：Editorial Slider

## 参考にした表現

参考はCSS Design Awards掲載の[Manifest Portfolio Website — ClaPat.](https://cssdesignawards.com/sites/manifest-portfolio-website/43795/)です。提供されたリサーチでは、カスタムスライダー、フルスクリーンアニメーション、WebGLタグが確認されています。

研究対象は、作品をカードではなく大きな編集面として扱うこと、画像の連続性を保つこと、作品情報と切り替えの時間を一体で設計することです。ただし、紹介ページだけから実際のイージング、情報切り替えのタイミング、シェーダーの方式までは判断できません。実サイトの遷移を計測・実機観察した分析としては扱っていません。

本作の980msの遷移、折り目状の局所変位、確定後に更新する本文、Three.jsの採用はすべて独自の設計です。ブランド、コピー、画像、固有のレイアウトは複製せず、架空の素材研究誌「FIELDNOTE」へ翻訳しました。

## 完成形

インク色の誌面に大きなセリフ体の見出しを重ね、三つの生成静物を閲覧します。

1. **The shape of quiet.** — 光を通す石のアーチ。
2. **Matter in motion.** — 折りと厚みを持つ紙の構造。
3. **A slower horizon.** — 時間を積層した地形。

画像はCanvas 2Dで生成するオリジナル素材です。横ドラッグでは、紙の稜線のような境界が画面を横断します。番号、前後ボタン、左右キー、Home / Endでも操作できます。ホイール操作は奪わず、タッチ領域には`touch-action: pan-y`を指定しています。

操作説明と素材情報は12px以上とし、号数などの非操作情報だけを小さくしています。モバイルでは見出しとフッターを通常フローへ戻し、本文の増加でコンテナ自体が伸びる構成です。

## 実装設計

### 表示確定と遷移候補を分ける

`current`は確定済み作品、`pending`は遷移先です。ドラッグ中は本文を差し替えず、遷移完了時だけ見出し、素材情報、ページ番号、ライブ通知を更新します。キャンセル時は同じ作品へ戻ります。遷移中の追加操作は受け付けません。

本文の追従にCSS transitionを重ねると、指と文字の動きに二重の遅延が生じます。そのため進捗に連動する退場は直接更新し、確定後の入場だけを短いCSSアニメーションにしています。

### 非同期GPU起動を入力から分離する

`import('three')`が完了しても、ドラッグ中・遷移中・非表示中にはGPUへ切り替えません。ライブラリを`readyThree`へ保留し、入力終了後の`activateGPU()`で起動します。

静止画ドラッグが確定する場合は、まず静止画側の`current`を更新し、その作品をGPUの両テクスチャへ設定します。キャンセルなら元の作品から起動します。GPU構築は同期処理内で行い、初回描画と診断の後にだけ`gpu = true`を公開します。途中のpointermoveが、未初期化のGPU状態を使うことはありません。

### 移動方向と直近速度を共通化する

初動で方向を固定し、以後の進捗は`-dx × direction / width × dragGain`から求めます。開始位置を越えて反対側へ戻した場合は進捗が0となり、静止画・GPUのどちらでもキャンセルします。

速度は押下からの平均ではなく、直近90msのポインター位置から計算します。移動方向が反転した時点で速度サンプルを区切り、リリース位置もサンプルに含めます。移動を止めて90ms以上待てば速度は0です。逆方向へ戻す操作では、フリック速度が確定方向に対して負になります。

両モード共通の確定条件は、**進捗が0.24以上**、または**進捗が0.045より大きく、確定方向への直近速度が0.48px/msを超えること**です。十分な距離まで進んでいる場合は、軽く戻しても距離条件で確定します。必ず取り消したい場合はしきい値より手前へ戻します。pointercancelは距離に関係なく取り消します。

### 画像不足を隠さない

生成処理は作品ごとに独立して実行します。一枚が失敗しても残りは閲覧できます。静止画はPNG化せず、生成Canvasをそのまま表示するため、データURL生成や画像デコードの負荷・競合を避けています。

`showStatic()`は最初に旧要素を取り除きます。対象Canvasがない場合は、その作品番号付きの「画像を表示できません」を表示します。前作品の画像や全作品共通のアーチを代用しません。一枚でも欠ける場合はGPUを起動せず、静止画ナビゲーションを維持します。

## シェーダー/レンダリング

正投影カメラと一枚のPlaneGeometryを使い、現在画像と遷移先画像を同時にサンプリングします。方向付きのリビールマスクに加え、境界付近だけへUV変位と陰影を適用します。

変位の包絡には`sin(progress × π)`を使うため、開始と完了の画像は歪みません。単なる二色フェードではなく、画像の局所的な圧縮と展開によって切り替えを表現します。微小なポインターパララックスも同じ画像面に適用します。

cover計算でアスペクト比を維持し、CanvasTextureをsRGBとして指定します。シェーダー末尾の`colorspace_fragment`で出力色空間へ変換します。ホスト側で解決するThree.jsのバージョンを固定し、色とシェーダーのコンパイルを確認してください。

## 実務での使いどころ

建築のWorks、素材メーカーのコレクション、ホテルの季節特集、キャンペーンのメインビジュアルに向いています。作品ごとに大きな誌面を与え、情報と画像を一緒に読ませたい場面向けです。

JavaScriptはES moduleとして読み込み、ホストのバンドラーまたはimport mapで`three`を解決してください。ライブラリの解決に失敗しても、静止画とHTMLの操作は残ります。

SPAで外すときはルートへ`daily:destroy`イベントを送ります。RAF、イベント、ResizeObserver、Texture、Material、Geometry、Rendererを解放します。通常離脱でも同じ処理を行い、BFCacheへの退避時だけは破棄せず停止します。History APIは使わないため、作品の変更でブラウザの戻る履歴は増えません。

作品数が増える場合は、全件Canvas生成から現在・前後作品のキャッシュへ変更してください。CMS画像へ差し替える場合も、画像準備完了を入力状態と独立させる設計を維持します。

## 調整パラメータ

| パラメータ | 初期値 | 用途 |
| --- | --- | --- |
| `duration` | 980ms | 全区間の遷移時間 |
| `commitAt` | 0.24 | 距離による確定条件 |
| `flickMin` | 0.045 | フリックを認める最低進捗 |
| `flickSpeed` | 0.48px/ms | 直近速度の確定条件 |
| `velocityWindow` | 90ms | 速度サンプルの時間窓 |
| `dragGain` | 1.15 | ドラッグ距離の感度 |
| `distortion` | 0.065 | 折り目の局所UV変位 |
| `parallax` | 0.012 | ポインター追従量 |
| `maxDpr` | 1.75 | 描画解像度の上限 |
| `textureWidth / textureHeight` | 1024 / 1152 | 生成素材の解像度 |

## パフォーマンスとアクセシビリティ

静止中はRAFを停止し、遷移、入力、パララックスの収束時だけ描画します。MSAAとミップマップを無効にし、DPRを制限しています。生成ノイズは初回だけ描き込みます。

`prefers-reduced-motion`ではGPUを起動せず、作品を即時切り替えます。設定が途中で変わった場合はドラッグと遷移を取り消し、GPUリソースを解放します。WebGL初期化失敗、シェーダー診断エラー、コンテキスト喪失でも静止画へ退避します。

ボタンには44px以上の操作領域、ラベル、フォーカス表示を設けています。現在位置は`aria-current`、変更は確定時だけ`aria-live`で通知します。ドラッグは必須ではありません。`hidden`属性には`display: none !important`を保証しています。

**ブラウザ・実機・性能検証は本回答では実施していません。** 導入時の確認手順は次のとおりです。

1. Three.jsのimportを遅延させ、静止画ドラッグ中に完了させる。リリース前にGPUへ切り替わらず、確定作品から起動することを確認する。
2. 両モードで開始位置を越えて戻す、速く動かして停止する、長押し後にフリックする、逆向きへ戻す操作を比較する。
3. `makeArt(1)`だけを意図的に失敗させ、02に旧画像が残らず、01と03は引き続き表示できることを確認する。
4. iOS / Androidで横ドラッグ、縦スクロール、pointercancel、回転を確認する。見出しの追従とリリース後の入場も観察する。
5. Chromium / Firefox / Safariでシェーダー、色空間、コンテキスト喪失、BFCache復帰を確認する。
6. 文字200%拡大、狭い画面、横長画面で重なり・トリミング・補助情報の判読性を確認する。
7. キーボード、スクリーンリーダー、動きを減らす設定の途中変更を確認する。
8. 対象端末でCanvas生成時間、フレーム時間、GPUメモリを測り、DPRと生成解像度を調整する。

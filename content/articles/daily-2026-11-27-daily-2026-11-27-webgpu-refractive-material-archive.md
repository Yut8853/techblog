---
title: "WebGPUで作る、光の厚みを読む屈折マテリアル・アーカイブ"
description: "円環・細線・帯の生成版画を透明立体に封入し、視角・全厚・原画比較で光路を観察するWebGPUショーケース。WGSLの体積屈折、SVGとの排他的表示、非同期初期化の世代分離、狭幅でも扱える操作UIを実装します。"
category: "WebGPU屈折マテリアルショーケース"
categorySlug: "webgpu-refractive-material-showcase"
categoryDescription: "WebGPUによる屈折・反射・厚み表現を、視角や素材パラメータを比較できる実務向けインターフェースとして設計するカテゴリ。"
tags:
  - "WebGPU"
  - "WGSL"
  - "屈折マテリアル"
  - "レイマーチング"
  - "マテリアル比較"
  - "プロシージャルアート"
  - "Daily Lab"
date: "2026年11月27日"
publishedAt: "2026-11-27"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 56
focus: "WebGPU"
concept: "ガラスを装飾ではなく、画像の読み方を変える比較インターフェースにする。生成版画の円環・細線・帯を透明立体に封入し、視角・全厚・原画比較によって、形状と光路と可読性の関係を観察する。"
referenceTitle: "Vitrine – Vol.02 — Tomoya Okada."
referenceUrl: "https://www.cssdesignawards.com/sites/vitrine-vol-02/50666/"
referencePlatform: "CSS Design Awards"
qualityScore: 86
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" aria-label="光学マテリアル・アーカイブ">
        <header class="oa-top">
          <div class="oa-wordmark"><span class="oa-mark" aria-hidden="true"></span> OPTICAL / ARCHIVE</div>
          <div class="oa-edition">DAY 056 — MATERIAL STUDIES<br><time datetime="2026-11-27">27 NOV 2026</time></div>
        </header>
        <div class="oa-layout">
          <div class="oa-intro">
            <p class="oa-kicker">STUDY 056 / REFRACTIVE VOLUME</p>
            <h1>光の厚みを、<br>読む。</h1>
            <p class="oa-deck">同じ図形も、通過する素材で表情を変える。円環の圧縮、細線のずれ、帯の読みやすさ。視角と厚みから、透明の構造を観察する。</p>
            <dl class="oa-spec">
              <div><dt>収蔵作品</dt><dd>円環と帯 / No. 056</dd></div>
              <div><dt>素材モデル</dt><dd>Rounded optical solid</dd></div>
              <div><dt>生成方法</dt><dd>Procedural print / WGSL</dd></div>
            </dl>
            <p class="oa-note"><span>↗</span>視角を変えると、輪郭と像は<br>異なる速度で移動する。</p>
          </div>
          <figure class="oa-study">
            <div class="oa-view">
              <canvas hidden aria-hidden="true"></canvas>
              <svg class="oa-fallback" viewBox="0 0 700 620" role="img" aria-label="透明な角丸立体に収めた朱色の円環と緑の帯。静止表示用の代替イメージ">
                <rect width="700" height="620" fill="#182b28"/>
                <ellipse cx="350" cy="536" rx="173" ry="23" fill="#10201e"/>
                <path d="M216 98 Q216 75 240 70 L451 86 Q480 88 487 112 L487 499 Q487 521 461 528 L236 512 Q211 510 210 484Z" fill="#29433c" stroke="#819b82"/>
                <path d="M239 91 L455 106 Q466 107 467 123 L467 485 Q467 503 449 502 L239 486 Q226 485 226 470 L226 111 Q226 93 239 91Z" fill="#dce3c7" fill-opacity=".12" stroke="#b8cfb0"/>
                <g transform="matrix(1 .065 0 1 0 -22)">
                  <rect x="250" y="142" width="192" height="328" fill="#e6e3ca"/>
                  <path d="M250 172H442 M250 202H442 M250 232H442 M250 262H442 M250 292H442 M250 322H442 M250 352H442 M250 382H442 M250 412H442 M250 442H442" stroke="#bec6ad" stroke-width="1"/>
                  <ellipse cx="346" cy="274" rx="86" ry="108" fill="#c66b45"/>
                  <g fill="none" stroke="#442f24" stroke-width="2">
                    <ellipse cx="346" cy="274" rx="76" ry="96"/><ellipse cx="346" cy="274" rx="65" ry="83"/><ellipse cx="346" cy="274" rx="54" ry="69"/><ellipse cx="346" cy="274" rx="43" ry="55"/><ellipse cx="346" cy="274" rx="32" ry="41"/><ellipse cx="346" cy="274" rx="21" ry="27"/>
                  </g>
                  <path d="M250 352 Q297 295 345 355 T442 355 L442 398 Q394 436 345 394 T250 396Z" fill="#8da680"/>
                  <path d="M250 365 Q297 308 345 368 T442 368 M250 376 Q297 319 345 379 T442 379 M250 387 Q297 330 345 390 T442 390" fill="none" stroke="#334d3b" stroke-width="2"/>
                  <path d="M262 454H316 M262 460H292" stroke="#334d3b" stroke-width="2"/>
                </g>
                <path d="M222 113V470 Q223 491 242 493 M238 81L449 97" fill="none" stroke="#e1efd0" stroke-width="3" opacity=".65"/>
                <path d="M478 127V483" stroke="#9ebea6" stroke-width="7" opacity=".3"/>
              </svg>
              <span class="oa-view-label">056 / ENCLOSED PRINT</span>
              <span class="oa-view-corner" data-view-mode>STATIC PLATE</span>
              <span class="oa-cross" aria-hidden="true">+</span>
            </div>
            <figcaption class="oa-caption"><p>視角で圧縮を、全厚で像のずれを観察。</p><p>ORIGINAL GENERATED ARTWORK</p></figcaption>
            <div class="oa-controls">
              <div class="oa-control">
                <label><span>視角 / Yaw</span><output data-angle-output aria-live="off">18°</output><input data-angle type="range" min="-35" max="35" step="1" value="18" disabled aria-label="視角、度"></label>
              </div>
              <div class="oa-control">
                <label><span>全厚 / Depth</span><output data-depth-output aria-live="off">0.56 u</output><input data-depth type="range" min="0.36" max="0.84" step="0.02" value="0.56" disabled aria-label="ガラスの全厚、相対単位" aria-valuetext="全厚 0.56 相対単位"></label>
              </div>
              <div class="oa-actions"><button type="button" data-compare aria-pressed="false" disabled>原画と比較</button><button type="button" data-reset disabled>視角・全厚をリセット</button></div>
              <p class="oa-status" role="status" aria-live="polite">現在は静止イメージです。対応環境ではWebGPUによる観察を開始します。</p>
            </div>
          </figure>
        </div>
        <footer class="oa-bottom"><span>LIGHT / VOLUME / LEGIBILITY</span><span>透明度ではなく、光路をデザインする。</span></footer>
      </section>
  - name: styles.css
    language: css
    content: |
      [hidden]{display:none!important}
      .daily-stage{--paper:#ebe9df;--ink:#242c28;--muted:#59635b;--line:#c9cec1;box-sizing:border-box;background:var(--paper);color:var(--ink);font-family:Arial,'Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif;padding:26px clamp(18px,4vw,64px) 28px;max-width:1800px;margin:auto}
      .daily-stage *{box-sizing:border-box}
      .daily-stage button,.daily-stage input{font:inherit}
      .oa-top{display:flex;justify-content:space-between;gap:20px;align-items:center;border-bottom:1px solid var(--line);padding-bottom:20px;font-size:12px;letter-spacing:.1em;line-height:1.7}
      .oa-wordmark{display:flex;align-items:center;gap:12px;font-weight:700}
      .oa-mark{flex:none;width:22px;height:28px;border:1px solid currentColor;border-radius:8px;transform:skewY(-12deg);box-shadow:5px 2px 0 -1px var(--paper),5px 2px 0 0 currentColor}
      .oa-edition{text-align:right;color:var(--muted)}
      .oa-layout{display:grid;grid-template-columns:minmax(220px,.72fr) minmax(0,1.6fr);gap:clamp(26px,5vw,80px);padding:40px 0 28px}
      .oa-intro{display:flex;flex-direction:column;align-items:flex-start;min-width:0;padding:12px 0}
      .oa-kicker{font-size:12px;letter-spacing:.13em;margin:0 0 28px;color:var(--muted);line-height:1.8}
      .oa-intro h1{font-family:'Yu Mincho','Hiragino Mincho ProN',serif;font-size:clamp(36px,4.4vw,68px);font-weight:500;line-height:1.35;letter-spacing:-.055em;margin:0 0 22px}
      .oa-deck{font-size:14px;line-height:2;max-width:28em;color:var(--muted);margin:0}
      .oa-spec{width:100%;margin:40px 0 28px;font-size:12px;line-height:1.7}
      .oa-spec div{display:flex;justify-content:space-between;gap:15px;border-top:1px solid var(--line);padding:12px 0}
      .oa-spec dt{color:var(--muted)}
      .oa-spec dd{margin:0;font-variant-numeric:tabular-nums;text-align:right;overflow-wrap:anywhere}
      .oa-note{margin:auto 0 0;display:flex;gap:12px;align-items:baseline;font-size:12px;line-height:1.8;color:var(--muted)}
      .oa-note span{font-family:Georgia,serif;font-size:42px;line-height:1;color:var(--ink)}
      .oa-study{min-width:0;margin:0}
      .oa-view{position:relative;isolation:isolate;aspect-ratio:1.18;background:#182b28;border-radius:3px;overflow:hidden;min-height:300px}
      .oa-view canvas,.oa-fallback{position:absolute;inset:0;width:100%;height:100%;display:block}
      .oa-view-label{position:absolute;z-index:2;top:20px;left:20px;color:#d8e2c7;font-size:11px;letter-spacing:.1em;pointer-events:none}
      .oa-view-corner{position:absolute;z-index:2;right:20px;bottom:18px;color:#d8e2c7;font-size:11px;letter-spacing:.08em;pointer-events:none}
      .oa-cross{position:absolute;bottom:18px;left:20px;color:#d8e2c7;font-size:19px;line-height:1;pointer-events:none}
      .oa-caption{display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px 16px;font-size:12px;line-height:1.8;padding:12px 0 18px;color:var(--muted)}
      .oa-caption p{margin:0}
      .oa-controls{border-top:1px solid var(--line);padding-top:18px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 26px}
      .oa-control{min-width:0}
      .oa-control label{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:5px 12px;align-items:baseline;font-size:12px;line-height:1.8}
      .oa-control output{font-size:13px;font-variant-numeric:tabular-nums;white-space:nowrap}
      .oa-control input{grid-column:1/-1;display:block;min-width:0;width:100%;height:44px;accent-color:#315548;margin:0;cursor:ew-resize}
      .oa-actions{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:9px}
      .daily-stage button{border:1px solid #a5ad9e;background:transparent;color:var(--ink);padding:11px 17px;min-height:44px;border-radius:2px;font-size:12px;line-height:1.6;cursor:pointer;transition:background .18s,color .18s}
      .daily-stage button[aria-pressed='true']{background:var(--ink);color:var(--paper);border-color:var(--ink)}
      .daily-stage button:not(:disabled):hover{background:#d5ddc9}
      .daily-stage button[aria-pressed='true']:not(:disabled):hover{background:#395046}
      .daily-stage :focus-visible{outline:3px solid #8a5738;outline-offset:4px}
      .daily-stage :disabled{opacity:.5;cursor:not-allowed}
      .oa-status{grid-column:1/-1;font-size:12px;line-height:1.8;color:var(--muted);margin:0;min-height:3.6em}
      .oa-bottom{display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px 20px;border-top:1px solid var(--line);padding-top:18px;font-size:12px;line-height:1.8;color:var(--muted);letter-spacing:.04em}
      @media(max-width:760px){.daily-stage{padding:20px 18px}.oa-layout{grid-template-columns:1fr;padding-top:28px;gap:24px}.oa-intro{padding:0}.oa-kicker{margin-bottom:16px}.oa-intro h1{font-size:44px;margin-bottom:14px}.oa-deck{max-width:38em}.oa-spec{margin:24px 0 0}.oa-note{display:none}.oa-view{aspect-ratio:1;min-height:280px}.oa-top{align-items:flex-start;flex-wrap:wrap;font-size:11px}.oa-edition{margin-left:auto}}
      @media(max-width:480px){.oa-controls{grid-template-columns:minmax(0,1fr);gap:14px}.oa-view-label{left:14px;font-size:10px}.oa-view-corner{right:14px;font-size:10px}.oa-top{letter-spacing:.04em}.oa-actions button{flex:1 1 160px}}
      @media(prefers-reduced-motion:reduce){.daily-stage button{transition:none}}
  - name: experiment.js
    language: javascript
    content: |
      const CONFIG = Object.freeze({
        dprCap: 1.5, renderScale: 0.85, maxPixels: 640000,
        damping: 12, entrySteps: 72, exitSteps: 44,
        ior: 1.47, dispersion: 0.006,
        initialAngle: 18, initialFullDepth: 0.56
      });
      
      const shader = /* wgsl */`
      struct Params {
        resolution: vec2f,
        angle: f32,
        depth: f32,
        compare: f32,
        pad0: f32,
        pad1: f32,
        pad2: f32,
      };
      @group(0) @binding(0) var<uniform> u: Params;
      
      @vertex fn vs(@builtin(vertex_index) index: u32) -> @builtin(position) vec4f {
        let vertices = array<vec2f, 3>(vec2f(-1.0,-1.0), vec2f(3.0,-1.0), vec2f(-1.0,3.0));
        return vec4f(vertices[index], 0.0, 1.0);
      }
      fn rx(p: vec3f, a: f32) -> vec3f {
        return vec3f(p.x, cos(a)*p.y-sin(a)*p.z, sin(a)*p.y+cos(a)*p.z);
      }
      fn ry(p: vec3f, a: f32) -> vec3f {
        return vec3f(cos(a)*p.x+sin(a)*p.z, p.y, -sin(a)*p.x+cos(a)*p.z);
      }
      fn local(p: vec3f) -> vec3f { return rx(ry(p, -u.angle), 0.10); }
      fn shape(p: vec3f) -> f32 {
        let radius = 0.10;
        let q = abs(p) - (vec3f(0.73,0.93,u.depth)-vec3f(radius));
        return length(max(q,vec3f(0.0))) + min(max(q.x,max(q.y,q.z)),0.0)-radius;
      }
      fn normal(p: vec3f) -> vec3f {
        let e = 0.0015;
        return normalize(vec3f(
          shape(p+vec3f(e,0,0))-shape(p-vec3f(e,0,0)),
          shape(p+vec3f(0,e,0))-shape(p-vec3f(0,e,0)),
          shape(p+vec3f(0,0,e))-shape(p-vec3f(0,0,e))
        ));
      }
      fn environment(d: vec3f) -> vec3f {
        let sky = mix(vec3f(0.09,0.16,0.14),vec3f(0.48,0.59,0.47),clamp(d.y*0.5+0.5,0.0,1.0));
        let softbox = exp(-pow((d.x+d.z*0.5)*9.0,2.0))*smoothstep(-0.4,0.6,d.y);
        let side = exp(-pow((d.x-0.85)*12.0,2.0))*0.25;
        return sky + vec3f(0.65,0.68,0.52)*softbox + vec3f(side);
      }
      fn art(p: vec2f) -> vec3f {
        var c = vec3f(0.89,0.88,0.77);
        let guides = 1.0-smoothstep(0.025,0.055,abs(fract((p.y+1.0)*8.0)-0.5));
        c = mix(c,vec3f(0.66,0.71,0.59),guides*0.4);
        let radius = length(vec2f(p.x,(p.y-0.17)*0.82));
        let disk = 1.0-smoothstep(0.82,0.83,radius);
        let rings = 1.0-smoothstep(0.08,0.16,abs(fract(radius*10.0)-0.5));
        let orange = mix(vec3f(0.77,0.39,0.24),vec3f(0.28,0.20,0.15),rings*0.9);
        c = mix(c,orange,disk);
        let wave = -0.45+0.13*sin(p.x*4.1+0.6);
        let ribbon = 1.0-smoothstep(0.16,0.17,abs(p.y-wave));
        let ribbonLines = 1.0-smoothstep(0.07,0.15,abs(fract((p.y-wave)*20.0)-0.5));
        c = mix(c,mix(vec3f(0.55,0.66,0.46),vec3f(0.18,0.29,0.21),ribbonLines*0.8),ribbon);
        let rule = (1.0-smoothstep(0.005,0.013,abs(p.y+0.88)))*(1.0-smoothstep(-0.35,-0.32,p.x))*smoothstep(-0.9,-0.88,p.x);
        return mix(c,vec3f(0.19,0.29,0.22),rule);
      }
      fn printRay(origin: vec3f, direction: vec3f) -> vec4f {
        if (abs(direction.z)<0.0001) { return vec4f(0.0); }
        let t = (-u.depth*0.30-origin.z)/direction.z;
        if (t<=0.0) { return vec4f(0.0); }
        let p = (origin+direction*t).xy/vec2f(0.57,0.75);
        let alpha = 1.0-smoothstep(0.993,1.0,max(abs(p.x),abs(p.y)));
        return vec4f(art(p),alpha);
      }
      @fragment fn fs(@builtin(position) pixel: vec4f) -> @location(0) vec4f {
        var uv = pixel.xy/u.resolution*2.0-1.0;
        uv.y = -uv.y;
        uv.x *= u.resolution.x/u.resolution.y;
        let vignette = exp(-dot(uv,uv)*0.70);
        var background = mix(vec3f(0.065,0.12,0.105),vec3f(0.16,0.23,0.19),vignette);
        let shadow = exp(-pow(uv.x/0.56,2.0)-pow((uv.y+0.84)/0.075,2.0));
        background *= 1.0-shadow*0.46;
        let ro = local(vec3f(0.0,0.0,3.6));
        let rd = local(normalize(vec3f(uv*1.20,-3.3)));
        if (u.compare>0.5) {
          let original = printRay(ro,rd);
          return vec4f(mix(background,original.rgb,original.a),1.0);
        }
        var t = 0.0;
        var hit = false;
        for (var i=0; i<${CONFIG.entrySteps}; i=i+1) {
          let distance = shape(ro+rd*t);
          if (distance<0.001) { hit=true; break; }
          t += max(distance*0.85,0.001);
          if (t>7.0) { break; }
        }
        if (!hit) { return vec4f(background,1.0); }
        let p = ro+rd*t;
        let n = normal(p);
        let ior = ${CONFIG.ior};
        let central = refract(rd,n,1.0/ior);
        let inside = p+central*0.004;
        var travel = 0.0;
        for (var i=0; i<${CONFIG.exitSteps}; i=i+1) {
          let distance = shape(inside+central*travel);
          if (distance>-0.001) { break; }
          travel += max(-distance*0.85,0.001);
        }
        let exitPoint = inside+central*travel;
        let exitNormal = normal(exitPoint);
        var outgoing = refract(central,-exitNormal,ior);
        if (dot(outgoing,outgoing)<0.001) { outgoing=reflect(central,-exitNormal); }
        let red = printRay(p,refract(rd,n,1.0/(ior-${CONFIG.dispersion})));
        let green = printRay(p,central);
        let blue = printRay(p,refract(rd,n,1.0/(ior+${CONFIG.dispersion})));
        let transmission = mix(environment(outgoing),vec3f(red.r,green.g,blue.b),vec3f(red.a,green.a,blue.a));
        let attenuation = exp(-vec3f(0.16,0.035,0.075)*(travel+0.004));
        let fresnel = 0.036+0.964*pow(1.0-clamp(dot(-rd,n),0.0,1.0),5.0);
        let reflection = environment(reflect(rd,n));
        var color = mix(transmission*attenuation,reflection,fresnel);
        let highlight = pow(max(dot(reflect(rd,n),normalize(vec3f(-0.7,1.0,1.1))),0.0),70.0);
        color += vec3f(0.35,0.38,0.29)*highlight;
        return vec4f(clamp(color,vec3f(0.0),vec3f(1.0)),1.0);
      }
      `;
      
      const mounts = new WeakMap();
      const radians = degrees => degrees * Math.PI / 180;
      // SVGにも属性として確実に反映する。HTMLElement.hiddenには依存しない。
      function setHidden(element, hidden) {
        if (hidden) element.setAttribute('hidden', '');
        else element.removeAttribute('hidden');
      }
      
      export function mountOpticalArchive(root) {
        mounts.get(root)?.();
        const canvas = root.querySelector('canvas');
        const fallback = root.querySelector('.oa-fallback');
        const view = root.querySelector('.oa-view');
        const angleInput = root.querySelector('[data-angle]');
        const depthInput = root.querySelector('[data-depth]');
        const angleOutput = root.querySelector('[data-angle-output]');
        const depthOutput = root.querySelector('[data-depth-output]');
        const compareButton = root.querySelector('[data-compare]');
        const resetButton = root.querySelector('[data-reset]');
        const mode = root.querySelector('[data-view-mode]');
        const status = root.querySelector('.oa-status');
        const controls = [angleInput, depthInput, compareButton, resetButton];
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        const events = new AbortController();
        let session = null;
        let dead = false, suspended = false, active = false;
        let frame = 0, lastTime = 0;
        let targetAngle = radians(CONFIG.initialAngle), currentAngle = targetAngle;
        let targetDepth = CONFIG.initialFullDepth / 2, currentDepth = targetDepth;
        let compare = false;
        const values = new Float32Array(8);
        const on = (target, type, fn) => target.addEventListener(type, fn, {signal: events.signal});
        const isCurrent = s => session === s && !s.disposed && !dead && !suspended;
      
        function labels() {
          const degrees = Number(angleInput.value);
          const fullDepth = Number(depthInput.value).toFixed(2);
          angleOutput.textContent = `${Math.round(degrees)}°`;
          angleInput.setAttribute('aria-valuetext', `${Math.round(degrees)} 度`);
          depthOutput.textContent = `${fullDepth} u`;
          depthInput.setAttribute('aria-valuetext', `全厚 ${fullDepth} 相対単位`);
          compareButton.setAttribute('aria-pressed', String(compare));
          compareButton.textContent = compare ? 'ガラス表示に戻す' : '原画と比較';
          mode.textContent = active ? (compare ? '01 / ORIGINAL PRINT' : '02 / REFRACTED PRINT') : 'STATIC PLATE';
        }
        function defaults() {
          angleInput.value = String(CONFIG.initialAngle);
          depthInput.value = String(CONFIG.initialFullDepth);
          currentAngle = targetAngle = radians(CONFIG.initialAngle);
          currentDepth = targetDepth = CONFIG.initialFullDepth / 2;
          compare = false;
          labels();
        }
        function cancelFrame() {
          cancelAnimationFrame(frame);
          frame = 0;
          lastTime = 0;
        }
        // 呼び出し時点の所有物だけを解放する。遅延した非同期完了からは呼ばない。
        function releaseSession(s) {
          if (!s || s.disposed) return;
          s.disposed = true;
          s.events.abort();
          try { s.context?.unconfigure(); } catch (_) {}
          s.buffer?.destroy();
          s.device?.destroy();
          s.buffer = null;
          s.device = null;
          s.context = null;
          s.pipeline = null;
          s.group = null;
        }
        function stopGPU() {
          const previous = session;
          session = null; // lost通知や古いPromiseより先に所有権を無効化する。
          active = false;
          cancelFrame();
          releaseSession(previous);
        }
        function staticView(message) {
          setHidden(canvas, true);
          setHidden(fallback, false);
          controls.forEach(control => { control.disabled = true; });
          defaults();
          status.textContent = message;
        }
        function fail(s, message) {
          if (!isCurrent(s)) return;
          stopGPU();
          staticView(message);
        }
        function sizeCanvas(s) {
          const rect = view.getBoundingClientRect();
          const ratio = Math.min(window.devicePixelRatio || 1, CONFIG.dprCap) * CONFIG.renderScale;
          let w = Math.max(1, Math.round(rect.width * ratio));
          let h = Math.max(1, Math.round(rect.height * ratio));
          const limit = s.device.limits.maxTextureDimension2D;
          const scale = Math.min(1, Math.sqrt(CONFIG.maxPixels / (w * h)), limit / w, limit / h);
          w = Math.max(1, Math.floor(w * scale));
          h = Math.max(1, Math.floor(h * scale));
          if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
          }
        }
        function draw(s) {
          if (!isCurrent(s)) return;
          sizeCanvas(s);
          values[0] = canvas.width;
          values[1] = canvas.height;
          values[2] = currentAngle;
          values[3] = currentDepth;
          values[4] = compare ? 1 : 0;
          s.device.queue.writeBuffer(s.buffer, 0, values);
          const encoder = s.device.createCommandEncoder();
          const pass = encoder.beginRenderPass({colorAttachments: [{
            view: s.context.getCurrentTexture().createView(),
            clearValue: {r: 0.07, g: 0.12, b: 0.10, a: 1},
            loadOp: 'clear', storeOp: 'store'
          }]});
          pass.setPipeline(s.pipeline);
          pass.setBindGroup(0, s.group);
          pass.draw(3);
          pass.end();
          s.device.queue.submit([encoder.finish()]);
        }
        function requestFrame() {
          if (dead || suspended || !active || document.hidden || frame) return;
          frame = requestAnimationFrame(tick);
        }
        function tick(time) {
          frame = 0;
          const s = session;
          if (!s || !isCurrent(s) || !active || document.hidden) return;
          const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 1 / 60;
          lastTime = time;
          const k = 1 - Math.exp(-CONFIG.damping * dt);
          currentAngle += (targetAngle - currentAngle) * k;
          currentDepth += (targetDepth - currentDepth) * k;
          const moving = Math.abs(targetAngle - currentAngle) > 0.0001 || Math.abs(targetDepth - currentDepth) > 0.0001;
          if (!moving) {
            currentAngle = targetAngle;
            currentDepth = targetDepth;
          }
          try { draw(s); }
          catch (_) {
            fail(s, '描画を継続できないため、静止イメージに切り替えました。');
            return;
          }
          if (moving) requestFrame();
          else lastTime = 0;
        }
      
        async function start() {
          stopGPU();
          if (dead || suspended) return;
          staticView('WebGPUを準備しています。現在は静止イメージです。');
          if (reduced.matches) {
            staticView('動きを減らす設定に合わせ、静止イメージを表示しています。操作は停止中です。');
            return;
          }
          if (!window.isSecureContext || !navigator.gpu) {
            staticView('この環境ではWebGPUを利用できません。静止イメージを表示しています。');
            return;
          }
      
          // GPUリソースは世代固有のオブジェクトだけが保持する。
          const s = {
            disposed: false, events: new AbortController(),
            device: null, context: null, buffer: null, pipeline: null, group: null
          };
          session = s;
          try {
            const adapter = await navigator.gpu.requestAdapter({powerPreference: 'low-power'});
            if (!isCurrent(s)) return;
            if (!adapter) throw new Error('No adapter');
      
            const ownDevice = await adapter.requestDevice();
            if (!isCurrent(s)) {
              ownDevice.destroy();
              return;
            }
            s.device = ownDevice;
            ownDevice.addEventListener('uncapturederror', () => {
              fail(s, 'GPUエラーのため、静止イメージに切り替えました。');
            }, {signal: s.events.signal});
            ownDevice.lost.then(() => {
              fail(s, 'GPU接続が失われたため、静止イメージに切り替えました。');
            });
      
            const ownContext = canvas.getContext('webgpu');
            if (!ownContext) throw new Error('No WebGPU context');
            s.context = ownContext;
            const format = navigator.gpu.getPreferredCanvasFormat();
            ownContext.configure({device: ownDevice, format, alphaMode: 'opaque'});
            ownDevice.pushErrorScope('validation');
            const shaderModule = ownDevice.createShaderModule({code: shader});
            const info = await shaderModule.getCompilationInfo();
            if (!isCurrent(s)) return;
            if (info.messages.some(message => message.type === 'error')) {
              throw new Error('WGSL compilation failed');
            }
      
            // 共有変数への await 代入を避け、現行世代と確認してから格納する。
            const ownPipeline = await ownDevice.createRenderPipelineAsync({
              layout: 'auto',
              vertex: {module: shaderModule, entryPoint: 'vs'},
              fragment: {module: shaderModule, entryPoint: 'fs', targets: [{format}]},
              primitive: {topology: 'triangle-list'}
            });
            if (!isCurrent(s)) return;
            s.pipeline = ownPipeline;
      
            const ownBuffer = ownDevice.createBuffer({
              size: 32, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
            });
            s.buffer = ownBuffer;
            const ownGroup = ownDevice.createBindGroup({
              layout: ownPipeline.getBindGroupLayout(0),
              entries: [{binding: 0, resource: {buffer: ownBuffer}}]
            });
            s.group = ownGroup;
            draw(s);
            const validation = await ownDevice.popErrorScope();
            if (!isCurrent(s)) return;
            if (validation) throw new Error(validation.message);
            await ownDevice.queue.onSubmittedWorkDone();
            if (!isCurrent(s)) return;
      
            active = true;
            // SVGはHTMLElement.hiddenに依存せず、必ず属性を付けて退避する。
            setHidden(fallback, true);
            setHidden(canvas, false);
            controls.forEach(control => { control.disabled = false; });
            labels();
            status.textContent = '視角と全厚を操作できます。矢印キーにも対応。原画比較は同じ視角を保持します。';
            requestFrame();
          } catch (_) {
            // 古い初期化の失敗は現行のGPU・DOM状態に触れない。
            fail(s, 'WebGPUを開始できませんでした。静止イメージを表示しています。');
          }
        }
      
        on(angleInput, 'input', () => {
          if (!active) return;
          targetAngle = radians(Number(angleInput.value));
          labels();
          requestFrame();
        });
        on(depthInput, 'input', () => {
          if (!active) return;
          // 公開値は全厚。半厚への変換はGPUへ渡す内部状態だけで行う。
          targetDepth = Number(depthInput.value) / 2;
          labels();
          requestFrame();
        });
        on(compareButton, 'click', () => {
          if (!active) return;
          compare = !compare;
          labels();
          requestFrame();
        });
        on(resetButton, 'click', () => {
          if (!active) return;
          angleInput.value = String(CONFIG.initialAngle);
          depthInput.value = String(CONFIG.initialFullDepth);
          targetAngle = radians(CONFIG.initialAngle);
          targetDepth = CONFIG.initialFullDepth / 2;
          compare = false;
          labels();
          requestFrame();
        });
        on(reduced, 'change', () => { if (!suspended) void start(); });
        on(document, 'visibilitychange', () => {
          if (document.hidden) cancelFrame();
          else requestFrame();
        });
        on(window, 'resize', requestFrame);
        on(window, 'pagehide', () => {
          suspended = true;
          stopGPU();
          staticView('静止イメージを表示しています。');
        });
        on(window, 'pageshow', () => {
          if (suspended && !dead) {
            suspended = false;
            void start();
          }
        });
        const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(requestFrame) : null;
        observer?.observe(view);
      
        function destroy() {
          if (dead) return;
          dead = true;
          events.abort();
          observer?.disconnect();
          stopGPU();
          staticView('静止イメージを表示しています。');
          if (mounts.get(root) === destroy) mounts.delete(root);
        }
        mounts.set(root, destroy);
        void start();
        return destroy;
      }
      
      const root = document.querySelector('.daily-stage');
      export const disposeOpticalArchive = root ? mountOpticalArchive(root) : () => {};
      
---

# Day 056 — WebGPUで作る、光の厚みを読む屈折マテリアル・アーカイブ

> **Reference study:** [Vitrine – Vol.02 — Tomoya Okada.](https://www.cssdesignawards.com/sites/vitrine-vol-02/50666/) / CSS Design Awards  
> **主軸:** WebGPU / **品質レビュー:** 86/100

画像を屈折するガラスの内部に置く素材体験を参考に、独自の円環・細線・帯の版画と、視角・全厚・原画比較UIへ再構成した。円環の圧縮、細線のずれ、帯の可読性を観察対象とし、ブランド、素材、文章、固有レイアウトは使用していない。参考元のWebGPU利用や具体的な操作仕様は未確認で、本作のWGSL実装は独立した提案。

# Day 056 / 365 — WebGPU × Refractive Material

公開日：2026-11-27

## 参考にした表現

参考は、CSS Design Awards掲載の **Vitrine – Vol.02 — Tomoya Okada.** です。

- 参考URL：https://www.cssdesignawards.com/sites/vitrine-vol-02/50666/
- プラットフォーム：CSS Design Awards
- 研究対象：画像を屈折するガラスの内部に置き、素材を通して鑑賞させる体験

掲載情報から参考元のWebGPU使用は確認できません。本作は素材表現を研究対象とする独立したWebGPU実装です。参考元のシェーダー、操作仕様、内部構造をリバースエンジニアリングしたものではありません。

## 完成形

**OPTICAL / ARCHIVE 056** は、独自生成した版画を角丸の透明立体に封入する素材ショーケースです。紙色の編集領域と深緑の観察領域を分け、必須情報はHTML、素材の理解はGPU描画が担います。

観察対象には、それぞれ役割を持たせています。

- **円環の圧縮**：視角を変え、輪郭の移動と内部像の圧縮が異なることを観察します。
- **細線のずれ**：厚みを変え、光路長に応じた位置のずれと、控えめな色分散を観察します。
- **帯の可読性**：太い形状が読み取れる状態と、細部が素材に干渉される状態を比較します。

「原画と比較」は視角と版画の位置を保持したままガラスを外します。単なる回転による見え方の変化と、素材による屈折を切り分ける操作です。比較は明示的なボタン操作に限定し、スクロール位置などの境界判定でモードが往復する構造は作っていません。

視角・全厚はネイティブrangeで編集します。ポインター、タッチ、キーボードが同じ状態を操作でき、独自ドラッグでページのスクロールを奪いません。

## 実装設計

Three.jsを介さず、WebGPU APIとWGSLで実装します。外部画像、依存ライブラリ、ネットワーク取得は不要です。HTMLとCSSを設置し、JavaScriptは `type="module"` で読み込んでください。WebGPUにはHTTPSまたはlocalhostなどのセキュアコンテキストが必要です。

描画対象はフルスクリーン三角形です。フラグメント側で角丸直方体と内部の版画平面を評価します。操作の目標値と描画値を分け、時間差分ベースの指数減衰で追従させ、収束するとrequestAnimationFrameを止めます。

### GPUと静止画の排他的な表示

起動中・非対応時・動きを減らす設定では静止SVGを表示します。表示切替はSVGでも確実に属性が変わるよう、`setAttribute('hidden', '')` と `removeAttribute('hidden')` に統一しています。CSSの `[hidden]{display:none!important}` と組み合わせ、GPU起動後にSVGがcanvasを覆う状態を防ぎます。

シェーダー診断、パイプライン生成、初回描画のvalidation scope、送信済みGPU処理の完了を確認してからcanvasへ切り替えます。これは初期化経路の確認であり、見た目や性能の実機検証を代替するものではありません。

静止SVGは同じ版画モチーフによる代替イメージで、WGSLの出力を保存したスクリーンショットではありません。静止表示中は操作を無効化し、値を初期状態へ戻します。

### 非同期初期化の所有権

初期化のたびにセッションを作り、device、buffer、context、pipeline、bind group、GPUイベントをそのセッションに保持します。

`createRenderPipelineAsync()` の結果はローカル変数で受け取り、セッションが現行であることを確認してから格納します。デバイス取得後も同様に確認し、遅れて取得された古いデバイスはその場で破棄します。古い初期化が、現在のpipelineや表示状態を書き換えることはありません。

停止時は先に現行セッションへの参照を切り、その時点で所有しているリソースを同期的に解放します。古い非同期処理の完了時に共有canvasのcontextを再びunconfigureしない構造です。

`mountOpticalArchive(root)` は破棄関数を返します。同じルートへの再マウント時には前のインスタンスを破棄します。SPAから取り除く場合は返された関数、または単一設置用の `disposeOpticalArchive()` を呼んでください。pagehideでGPUを解放し、BFCacheからのpageshowでは初期状態から再起動します。

### 操作部のレイアウト

ラベルを明示的な2列Gridとし、名称とoutputを1行目、rangeを次の全幅行に配置します。inputがラベル内にあるため、ネイティブのラベル関連付けも維持します。狭幅では操作グループを1列に変更します。

厚みは画面、入力の数値、読み上げ名、`aria-valuetext` のすべてを**全厚**に統一しました。シェーダー用の半厚への変換はJavaScript内部だけで行います。`u` は相対単位であり、実物のミリメートルではありません。

## シェーダー/レンダリング

### 入射面と厚み

角丸直方体のSDFに対してレイマーチし、入射位置を求めます。法線はSDFの中心差分です。全厚を変更すると実際に奥行きが変わり、単なる透明度の変更ではない像の変化が生まれます。

### ガラス内部の像

空気からガラスへの方向を `refract` で計算し、内部の版画平面と交差させます。円環、細線、帯はWGSLの関数で生成します。RGBごとに屈折率を少しずらし、輪郭に小さな分散を与えます。各色の版画マスクも個別に合成し、版画の端で色ごとの交差状態を反映します。

### 出射・反射・吸収

中央波長のレイでガラス内部の出口まで進み、出射方向から簡易スタジオ環境を評価します。入射面にはSchlick近似によるFresnel反射を加え、内部の光路長に応じて吸収を与えます。

これはアートディレクション用の単一透過経路モデルです。多重内部反射、コースティクス、厳密なスペクトル積分は計算しません。全反射時には反射方向の環境色で近似します。吸収もガラス内の全経路に対する簡易モデルで、内部版画までの光路を厳密に分離していません。色は表示向けに調整しており、測光用途の物理レンダラーではありません。

別の低解像度屈折パスは設けず、描画全体の解像度を制限します。版画は関数評価なので、画像テクスチャや追加のオフスクリーンバッファは不要です。

## 実務での使いどころ

- 透明パッケージや素材のキャンペーンHero
- 印刷物を素材越しに見せるWorks詳細
- 厚みと見え方を比較する素材ブランドの提案
- 可読性と光学的変形を対比するアートディレクション資料

商品名、価格、CTAなどの必須情報は屈折させずHTML側に残します。実画像へ置き換える場合は `art()` をテクスチャ参照へ変更し、画像の権利、比率、色空間、ロード失敗時の表示を別途設計します。

## 調整パラメータ

| パラメータ | 役割 |
| --- | --- |
| `CONFIG.dprCap` | DPR上限。初期値1.5 |
| `CONFIG.renderScale` | 描画解像度の係数。初期値0.85 |
| `CONFIG.maxPixels` | 総ピクセル予算。初期値640,000 |
| `CONFIG.damping` | 視角・厚みの追従速度 |
| `CONFIG.entrySteps` / `exitSteps` | 入射面・出口探索の最大反復数 |
| `CONFIG.ior` | 基準屈折率。初期値1.47 |
| `CONFIG.dispersion` | RGBの屈折率差。初期値0.006 |
| rangeの `min` / `max` / `step` | 操作範囲と刻み。厚みは全厚で指定 |

視角・厚みの範囲を大きく変える場合は、版画が立体内に収まるか、探索が収束するか、細線が破綻しないかを再確認します。現在は固定のピクセル予算であり、実測GPU時間による自動品質調整は実装していません。

## パフォーマンスとアクセシビリティ

- DPR、総ピクセル数、GPUの最大テクスチャ寸法を制限します。
- 操作・リサイズ・復帰時だけ描画し、収束時と非表示タブでは予約フレームを止めます。
- `prefers-reduced-motion: reduce` ではGPUを起動せず、静止SVGを表示します。設定の動的変更にも対応します。
- canvasは読み上げ対象から外し、説明、操作ラベル、値、比較状態をHTMLで提供します。
- 出力値は読み上げライブ領域にせず、操作ごとの過剰な通知を避けます。起動・退避状態は別のstatusで通知します。
- ボタンは44px以上の高さとフォーカス表示を備え、モバイルでもrangeの行幅を確保します。
- 破棄時にはrequestAnimationFrame、イベント、ResizeObserver、uniform buffer、GPUCanvasContext、GPUDeviceを解放します。pipelineとbind groupにはdestroy APIがないため参照を切ります。

**検証状況：ブラウザ・実機・GPU性能の実測は、この回答内では実施していません。** 公開前に以下を確認してください。

1. GPU起動成功時にSVGへhidden属性が付き、canvasと同時に表示されないこと。
2. 視角・全厚・原画比較が描画へ反映されること。円環の圧縮、細線のずれ、帯の可読性を確認すること。
3. 初期化中にreduced-motionを連続変更し、pagehide／pageshowや再マウントを挟んでも古いpipelineが現行状態を上書きしないこと。
4. 320px、375px、横向き、200%文字拡大でラベルとrangeが重ならないこと。
5. Tab、矢印、Home、End、タッチ、スクリーンリーダーで操作し、「全厚」の値と読み上げが一致すること。
6. デバイス喪失、非対応環境、バックグラウンド復帰、BFCache往復で静止表示とUI状態が整合すること。
7. モバイルGPUでフレーム時間を測り、視角端の探索、細線のエイリアシング、比較切替の見やすさを確認すること。必要に応じてピクセル予算や探索回数を調整すること。

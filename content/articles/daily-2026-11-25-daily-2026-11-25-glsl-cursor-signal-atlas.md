---
title: "GLSLで作る、カーソルが輪郭を読み解くシグナル・アトラス"
description: "カーソル周辺の粒子が輪郭へ整列するGLSL製観測アーカイブ。選択地点の完全整列、海岸・林冠・鉱物の固有形状、GPUとSVGの共通輪郭、表示モードに一致する操作案内まで設計します。"
category: "GLSLパーティクルナビゲーション"
categorySlug: "glsl-particle-navigation"
categoryDescription: "GLSLで生成・変形する粒子場を、作品や情報の探索、選択、現在位置のフィードバックへ結びつけるナビゲーション表現。"
tags:
  - "GLSL"
  - "カーソルインタラクション"
  - "パーティクル"
  - "Three.js"
  - "情報探索"
  - "アクセシビリティ"
  - "Daily Lab"
date: "2026年11月25日"
publishedAt: "2026-11-25"
readTime: "10分"
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: 54
focus: "GLSL"
concept: "ポインターを局所的な解像レンズとして扱う、三地点の観測アーカイブ。開いた海岸線、葉状の林冠、偏心する鉱物層を独自生成し、近接による探索と明示選択による完全整列を分離する。GPU粒子と静的SVGは同一の輪郭点列を共有し、停止しても探索対象の同一性を保つ。"
referenceTitle: "BAM! — cursor-responsive particle field"
referenceUrl: "https://www.cssdesignawards.com/sites/bam/49792/"
referencePlatform: "CSS Design Awards"
qualityScore: 88
files:
  - name: index.html
    language: html
    content: |
      <section class="daily-stage" aria-label="Signal Atlas：地形の観測アーカイブ">
        <header class="atlas-top">
          <div class="atlas-wordmark">SIGNAL ATLAS</div>
          <div class="atlas-edition">FIELD STUDY 054 / 365<br>25 NOVEMBER 2026</div>
        </header>
        <div class="atlas-heading">
          <h1>SIGNAL<span>in the quiet.</span></h1>
          <p class="atlas-intro"><strong>ノイズの先に、輪郭がある。</strong>触れる場所から秩序が立ち上がる。<br>三つの地形をめぐる、架空の観測アーカイブ。</p>
        </div>
        <figure class="atlas-field" aria-label="三地点の探索マップ" aria-describedby="atlas-help-054">
          <div class="atlas-static" aria-hidden="true">
            <svg class="atlas-island atlas-one is-current" viewBox="-1.7 -1.7 3.4 3.4" focusable="false"></svg>
            <svg class="atlas-island atlas-two" viewBox="-1.7 -1.7 3.4 3.4" focusable="false"></svg>
            <svg class="atlas-island atlas-three" viewBox="-1.7 -1.7 3.4 3.4" focusable="false"></svg>
          </div>
          <div class="atlas-field-meta">PROCEDURAL LANDSCAPES<br>THREE POINTS OF ATTENTION</div>
          <div class="atlas-mode">STATIC FIELD</div>
          <button type="button" class="atlas-station atlas-one" aria-pressed="true" aria-controls="atlas-record-054-0" aria-label="01 / TIDAL — 海岸、流れの境界を選択"><b>01 / TIDAL</b><span aria-hidden="true">+</span></button>
          <button type="button" class="atlas-station atlas-two" aria-pressed="false" aria-controls="atlas-record-054-1" aria-label="02 / CANOPY — 林冠、透過する層を選択"><b>02 / CANOPY</b><span aria-hidden="true">+</span></button>
          <button type="button" class="atlas-station atlas-three" aria-pressed="false" aria-controls="atlas-record-054-2" aria-label="03 / MINERAL — 鉱物、堆積の記憶を選択"><b>03 / MINERAL</b><span aria-hidden="true">+</span></button>
          <figcaption class="atlas-field-caption"><span>DISORDER → LOCAL ORDER → READING</span><span>GENERATED MATTER / NO IMAGE SOURCE</span></figcaption>
        </figure>
        <div class="atlas-toolbar">
          <p id="atlas-help-054" class="atlas-instruction">静止図版：番号を選んで、三つの記録を読む。</p>
          <button class="atlas-motion" type="button" disabled>静止表示</button>
        </div>
        <div class="atlas-records">
          <article class="atlas-record is-current" id="atlas-record-054-0" aria-labelledby="atlas-title-054-0">
            <div class="atlas-record-no" aria-hidden="true">01</div>
            <div><h2 id="atlas-title-054-0">流れの境界</h2><p>閉じきらない弧が、流れの通り道を残す。繰り返すうねりと開口を、海岸の輪郭が更新され続ける関係として描く。</p></div>
            <dl><div><dt>FIELD</dt><dd>TIDAL / 海岸</dd></div><div><dt>STRUCTURE</dt><dd>OPEN CONTOUR</dd></div><div><dt>STUDY</dt><dd>周期と開口</dd></div></dl>
          </article>
          <article class="atlas-record" id="atlas-record-054-1" aria-labelledby="atlas-title-054-1" aria-hidden="true" inert>
            <div class="atlas-record-no" aria-hidden="true">02</div>
            <div><h2 id="atlas-title-054-1">透過する層</h2><p>葉のような膨らみが、少しずつ向きを変えて重なる。林冠を抜ける光のように、局所的な整列が奥の層構造を見せる。</p></div>
            <dl><div><dt>FIELD</dt><dd>CANOPY / 林冠</dd></div><div><dt>STRUCTURE</dt><dd>LOBED LAYERS</dd></div><div><dt>STUDY</dt><dd>重なりと透過</dd></div></dl>
          </article>
          <article class="atlas-record" id="atlas-record-054-2" aria-labelledby="atlas-title-054-2" aria-hidden="true" inert>
            <div class="atlas-record-no" aria-hidden="true">03</div>
            <div><h2 id="atlas-title-054-2">堆積の記憶</h2><p>直線の稜線と、中心からずれた内層。成長方向のわずかな偏りを、鉱物の断面を思わせる六角の積層に記録する。</p></div>
            <dl><div><dt>FIELD</dt><dd>MINERAL / 鉱物</dd></div><div><dt>STRUCTURE</dt><dd>ECCENTRIC FACETS</dd></div><div><dt>STUDY</dt><dd>稜線と蓄積</dd></div></dl>
          </article>
        </div>
        <div class="atlas-sr atlas-status" role="status" aria-live="polite" aria-atomic="true"></div>
        <footer class="atlas-bottom"><span>INDEPENDENT FIELD NOTES — 2026</span><span>架空の観測記録 / ORIGINAL GENERATIVE STUDY</span></footer>
      </section>
  - name: styles.css
    language: css
    content: |
      .daily-stage{--paper:#eeeae1;--ink:#263831;--muted:#59675e;--line:#c7cbc0;--accent:#a34428;box-sizing:border-box;background:var(--paper);color:var(--ink);padding:26px clamp(18px,4vw,64px) 22px;font-family:Arial,'Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif;max-width:1600px;margin:auto}.daily-stage *{box-sizing:border-box}.daily-stage [hidden]{display:none!important}.daily-stage button{font:inherit;color:inherit}.daily-stage button:focus-visible{outline:3px solid var(--accent);outline-offset:5px}.atlas-top,.atlas-bottom{display:flex;justify-content:space-between;align-items:center;gap:20px;font:10px/1.6 ui-monospace,monospace;letter-spacing:.1em}.atlas-wordmark{font-size:12px;font-weight:700;letter-spacing:.18em}.atlas-edition{color:var(--muted)}.atlas-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:28px;margin:52px 0 30px}.atlas-heading h1{margin:0;font-size:clamp(58px,8.8vw,132px);font-weight:500;line-height:.84;letter-spacing:-.075em}.atlas-heading h1 span{display:block;margin-left:clamp(36px,6vw,94px);font-family:Georgia,serif;font-style:italic;font-weight:400;letter-spacing:-.065em}.atlas-intro{max-width:250px;font-size:12px;line-height:1.9;margin:0 0 2px}.atlas-intro strong{display:block;font-size:14px;font-weight:500;margin-bottom:8px}.atlas-field{--x1:20%;--y1:50%;--x2:50%;--y2:50%;--x3:80%;--y3:50%;position:relative;height:clamp(360px,36vw,490px);margin:0;isolation:isolate;border-top:1px solid var(--line);border-bottom:1px solid var(--line);touch-action:pan-y pinch-zoom;overflow:hidden;background-image:linear-gradient(to right,#26383108 1px,transparent 1px),linear-gradient(to bottom,#26383108 1px,transparent 1px);background-size:48px 48px}.atlas-field:after{content:'';position:absolute;inset:16px;border:1px solid #26383110;pointer-events:none;z-index:2}.atlas-field canvas{display:block;position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none}.atlas-field-meta{position:absolute;left:24px;top:18px;z-index:3;font:10px/1.6 ui-monospace,monospace;letter-spacing:.08em;color:var(--muted);pointer-events:none}.atlas-mode{position:absolute;right:24px;top:20px;z-index:3;display:flex;align-items:center;gap:7px;font:10px/1.4 ui-monospace,monospace;letter-spacing:.08em}.atlas-mode:before{content:'';width:5px;height:5px;border-radius:50%;background:var(--accent)}.atlas-field-caption{position:absolute;bottom:17px;left:24px;right:24px;display:flex;justify-content:space-between;gap:12px;z-index:3;font:10px/1.5 ui-monospace,monospace;letter-spacing:.04em;color:var(--muted);pointer-events:none}.atlas-station,.atlas-island{position:absolute;left:var(--x);top:var(--y);transform:translate(-50%,-50%)}.atlas-one{--x:var(--x1);--y:var(--y1)}.atlas-two{--x:var(--x2);--y:var(--y2)}.atlas-three{--x:var(--x3);--y:var(--y3)}.atlas-station{z-index:4;display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:46px;min-width:122px;padding:11px 13px;border:1px solid #aeb7a9;background:#eeeae1ed;cursor:pointer;transition:color .2s,border-color .2s,background .2s;box-shadow:0 2px 16px #eeeae17a}.atlas-station b{font:10px/1.4 ui-monospace,monospace;letter-spacing:.02em;font-weight:400}.atlas-station span{font:17px/1 ui-monospace,monospace}.atlas-station:hover{border-color:var(--accent)}.atlas-station[aria-pressed='true']{color:var(--paper);background:var(--ink);border-color:var(--ink)}.atlas-static{position:absolute;inset:0;z-index:0;pointer-events:none}.atlas-island{width:30%;height:auto;overflow:visible;color:#596e5e;opacity:.55;transition:color .28s,opacity .28s}.atlas-island.is-current{color:var(--accent);opacity:.9}.atlas-island path{fill:none;stroke:currentColor;stroke-width:.0045;stroke-linejoin:round;stroke-linecap:round}.atlas-toolbar{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:16px 0;border-bottom:1px solid var(--line)}.atlas-instruction{font-size:11px;line-height:1.7;margin:0;color:var(--muted)}.atlas-motion{background:none;border:0;border-bottom:1px solid var(--ink);padding:10px 0;min-height:44px;font-size:11px!important;cursor:pointer;white-space:nowrap}.atlas-motion:disabled{color:var(--muted);border-color:var(--line);cursor:default}.atlas-records{display:grid;min-height:188px}.atlas-record{grid-area:1/1;display:grid;grid-template-columns:80px 1fr minmax(200px,.6fr);gap:28px;padding:30px 0;opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .28s,transform .28s,visibility 0s .28s;pointer-events:none}.atlas-record.is-current{opacity:1;visibility:visible;transform:none;transition-delay:0s;pointer-events:auto}.atlas-record-no{font:italic 42px/1 Georgia,serif;color:var(--accent)}.atlas-record h2{font-size:20px;font-weight:500;letter-spacing:-.04em;margin:0 0 11px}.atlas-record p{font-size:12px;line-height:1.9;max-width:470px;margin:0;color:var(--muted)}.atlas-record dl{margin:0;font:10px/1.6 ui-monospace,monospace}.atlas-record dl div{display:flex;justify-content:space-between;gap:20px;padding:8px 0;border-bottom:1px solid var(--line)}.atlas-record dt{color:var(--muted)}.atlas-record dd{margin:0;text-align:right}.atlas-bottom{border-top:1px solid var(--line);padding-top:14px;color:var(--muted);font-size:10px}.atlas-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}@media(max-width:700px){.daily-stage{padding-top:18px}.atlas-edition{max-width:145px;text-align:right;font-size:9px}.atlas-heading{display:block;margin:42px 0 24px}.atlas-heading h1{font-size:clamp(57px,15vw,105px)}.atlas-heading h1 span{margin-left:32px}.atlas-intro{margin-top:24px;max-width:none;font-size:11px}.atlas-intro strong{display:inline;margin-right:10px;font-size:12px}.atlas-field{height:450px;--x1:26%;--y1:33%;--x2:74%;--y2:33%;--x3:50%;--y3:73%}.atlas-field-meta{left:16px;font-size:9px;letter-spacing:0}.atlas-mode{right:16px;font-size:9px;letter-spacing:0}.atlas-field:after{inset:10px}.atlas-station{min-width:106px;padding:11px 9px;gap:8px}.atlas-station b{font-size:10px;letter-spacing:0}.atlas-field-caption{left:16px;right:16px;font-size:9px}.atlas-field-caption span:last-child{display:none}.atlas-toolbar{gap:14px;align-items:center}.atlas-instruction{font-size:11px;max-width:230px}.atlas-motion{white-space:normal;max-width:130px;flex-shrink:0}.atlas-record{grid-template-columns:42px 1fr;gap:16px;padding:25px 0}.atlas-record-no{font-size:32px}.atlas-record h2{font-size:18px}.atlas-record dl{grid-column:2}.atlas-records{min-height:265px}.atlas-bottom{font-size:9px;align-items:flex-start}.atlas-bottom span:last-child{text-align:right}}@media(prefers-reduced-motion:reduce){.daily-stage *{transition:none!important;animation:none!important}}
  - name: experiment.js
    language: javascript
    content: |
      const root = document.querySelector('.daily-stage');
      if (root) {
        root.signalAtlasDestroy?.();
      
        // Production controls: samples must be divisible by mobileStride.
        const CFG = Object.freeze({
          layers: 30, samples: 192, mobileStride: 2, dprMax: 1.6,
          pointerTau: .11, selectionTau: .28, lensRadius: .95,
          scatter: .52, drift: .045, selectedFlow: .006,
          freeFlow: .12, pointSize: 2.0
        });
        const field = root.querySelector('.atlas-field');
        const fallback = root.querySelector('.atlas-static');
        const stations = [...root.querySelectorAll('.atlas-station')];
        const panels = [...root.querySelectorAll('.atlas-record')];
        const islands = [...root.querySelectorAll('.atlas-island')];
        const motion = root.querySelector('.atlas-motion');
        const mode = root.querySelector('.atlas-mode');
        const help = root.querySelector('.atlas-instruction');
        const status = root.querySelector('.atlas-status');
        const media = matchMedia('(prefers-reduced-motion: reduce)');
        const narrow = matchMedia('(max-width: 700px)');
        const events = new AbortController();
        const on = (target, type, fn, options = {}) => target.addEventListener(type, fn, { ...options, signal: events.signal });
        const names = ['流れの境界', '透過する層', '堆積の記憶'];
        const centers = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
        let selected = Math.max(0, stations.findIndex(b => b.getAttribute('aria-pressed') === 'true'));
        let disposed = false, paused = false, failed = false, visible = true, pageSuspended = false;
        let gpu = null, epoch = 0, raf = 0, last = 0, needsResize = true;
        let width = 1, height = 1, radius = 100;
        let targetX = 0, targetY = 0, pointerX = 0, pointerY = 0, presenceTarget = 0;
        let pointerInitialized = false, focusIndex = -1;
      
        // Single source of truth for GPU rest positions AND static SVG paths.
        const MINERAL_VERTICES = [[1.04,.10],[.49,.94],[-.57,.81],[-1.02,-.11],[-.38,-.88],[.66,-.72]];
        function contourPoint(id, layer, u) {
          const t = layer / (CFG.layers - 1);
          if (id === 0) {
            // Open, tidal arcs: a common mouth and repeated wave fronts.
            const a = Math.PI * (.18 + 1.64 * u);
            const r = .22 + .78 * t;
            const w = 1 + .065 * Math.sin(a * 5 + .4) + .025 * Math.cos(a * 9);
            return [r * w * Math.cos(a) + .13 * t * t, .78 * r * w * Math.sin(a) + .035 * r * Math.sin(a * 3)];
          }
          if (id === 1) {
            // Closed, leaf-like lobes; nested layers have a restrained twist.
            const a = Math.PI * 2 * u;
            const r = .17 + .83 * t;
            const w = 1 + .12 * Math.cos(a * 5) + .035 * Math.sin(a * 9);
            const turn = a + .14 * t;
            return [r * w * Math.cos(turn), .9 * r * w * Math.sin(turn) + .04 * (1 - t)];
          }
          // Mineral strata: straight facets with eccentric inner layers.
          const s = Math.min(u, 1) * MINERAL_VERTICES.length;
          const n = Math.floor(s) % MINERAL_VERTICES.length;
          const f = s - Math.floor(s);
          const a = MINERAL_VERTICES[n];
          const b = MINERAL_VERTICES[(n + 1) % MINERAL_VERTICES.length];
          const r = .17 + .83 * t;
          const offset = (1 - t) * (1 - t);
          return [r * (a[0] + (b[0] - a[0]) * f) + .14 * offset, r * (a[1] + (b[1] - a[1]) * f) - .09 * offset];
        }
        function buildContours() {
          return Array.from({ length: 3 }, (_, id) => Array.from({ length: CFG.layers }, (_, layer) => {
            const row = new Float32Array((CFG.samples + 1) * 2);
            for (let j = 0; j <= CFG.samples; j++) {
              const p = contourPoint(id, layer, j / CFG.samples);
              row[j * 2] = p[0]; row[j * 2 + 1] = p[1];
            }
            return row;
          }));
        }
        const contours = buildContours();
        function buildStatic() {
          const ns = 'http://www.w3.org/2000/svg';
          islands.forEach((svg, id) => {
            const group = document.createElementNS(ns, 'g');
            // SVG is top-down; shader positions are bottom-up.
            group.setAttribute('transform', 'scale(1 -1)');
            contours[id].forEach(row => {
              const path = document.createElementNS(ns, 'path');
              let d = '';
              for (let j = 0; j <= CFG.samples; j++) {
                d += `${j === 0 ? 'M' : 'L'}${row[j * 2].toFixed(6)} ${row[j * 2 + 1].toFixed(6)} `;
              }
              if (id !== 0) d += 'Z';
              path.setAttribute('d', d);
              group.append(path);
            });
            svg.replaceChildren(group);
          });
        }
      
        const vertexShader = `
          attribute vec4 aData;
          uniform vec2 uSize;
          uniform vec2 uCenters[3];
          uniform vec3 uWeights;
          uniform vec2 uPointer;
          uniform vec2 uVelocity;
          uniform float uPresence;
          uniform float uTime;
          uniform float uRadius;
          uniform float uLens;
          uniform float uScatter;
          uniform float uDrift;
          uniform float uSelectedFlow;
          uniform float uFreeFlow;
          uniform float uDpr;
          uniform float uPointSize;
          varying float vOrder;
          varying float vAlpha;
          void main() {
            int id = int(aData.w + .5);
            vec2 center = uCenters[id];
            float seed = aData.z;
            float selected = clamp(uWeights[id], 0.0, 1.0);
            vec2 ordered = position.xy * uRadius;
            vec2 drift = vec2(sin(uTime * .23 + seed * 31.0), cos(uTime * .19 + seed * 23.0)) * uRadius * uDrift;
            vec2 scatter = aData.xy * uRadius * uScatter;
            // Evaluate proximity at rest positions, so the lens does not chase its own deformation.
            vec2 delta = center + ordered - uPointer;
            float range = max(1.0, uRadius * uLens);
            float nearPointer = exp(-dot(delta, delta) / (range * range)) * uPresence;
            float speed = clamp(length(uVelocity) / 1.5, 0.0, 1.0);
            float explored = clamp(.06 + nearPointer * (.94 - speed * .2), 0.0, 1.0);
            // Independent selection lock: selected == 1 means zero residual scatter.
            float order = 1.0 - (1.0 - explored) * (1.0 - selected);
            vec2 pos = ordered + (scatter + drift) * (1.0 - order);
            vec2 tangent = vec2(-delta.y, delta.x) / max(length(delta), 1.0);
            vec2 flow = uVelocity / max(length(uVelocity), 1.0) + tangent * .5;
            flow /= max(length(flow), 1.0);
            // Transient velocity is separate from alignment. Selected displacement <= .006 * radius.
            pos += flow * uRadius * nearPointer * speed * mix(uFreeFlow, uSelectedFlow, selected);
            vec2 screen = center + pos;
            gl_Position = vec4(screen / uSize * 2.0 - 1.0, 0.0, 1.0);
            gl_PointSize = uDpr * uPointSize * mix(.7, 1.2, seed) * (1.0 + nearPointer * .12);
            vOrder = order;
            vAlpha = (.38 + seed * .38) * (.7 + order * .3);
          }
        `;
        const fragmentShader = `
          precision highp float;
          varying float vOrder;
          varying float vAlpha;
          void main() {
            float r = length(gl_PointCoord - .5) * 2.0;
            if (r > 1.0) discard;
            float alpha = (1.0 - smoothstep(.25, 1.0, r)) * vAlpha;
            vec3 ink = vec3(.15, .22, .19);
            vec3 rust = vec3(.64, .26, .15);
            vec3 color = mix(ink, rust, smoothstep(.40, .98, vOrder));
            gl_FragColor = vec4(color, alpha);
          }
        `;
      
        function createGeometry(T, stride) {
          const columns = CFG.samples / stride + 1;
          const count = 3 * CFG.layers * columns;
          const positions = new Float32Array(count * 3);
          const data = new Float32Array(count * 4);
          let seed = 54025, index = 0;
          const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
          contours.forEach((layers, id) => layers.forEach(row => {
            for (let j = 0; j <= CFG.samples; j += stride) {
              positions[index * 3] = row[j * 2];
              positions[index * 3 + 1] = row[j * 2 + 1];
              const angle = random() * Math.PI * 2;
              const spread = Math.sqrt(random());
              data[index * 4] = Math.cos(angle) * spread;
              data[index * 4 + 1] = Math.sin(angle) * spread;
              data[index * 4 + 2] = random();
              data[index * 4 + 3] = id;
              index++;
            }
          }));
          const geometry = new T.BufferGeometry();
          geometry.setAttribute('position', new T.BufferAttribute(positions, 3));
          geometry.setAttribute('aData', new T.BufferAttribute(data, 4));
          return geometry;
        }
      
        function syncMode() {
          const live = Boolean(gpu?.ready);
          motion.disabled = media.matches || failed;
          motion.textContent = failed ? '静止表示 / GPU利用不可' : media.matches ? '静止表示 / 動きを減らす設定' : paused ? '動きを再開' : live ? '動きを止める' : '起動を中止';
          mode.textContent = live ? 'LIVE FIELD' : 'STATIC FIELD';
          help.textContent = live
            ? 'ポインターで輪郭を探る。番号を選ぶと、その輪郭と記録が残ります。'
            : '静止図版：番号をクリック、タップ、またはキーボードで選んで記録を読む。';
        }
        function select(index, announce = true) {
          const changed = selected !== index;
          selected = index;
          stations.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
          panels.forEach((panel, i) => {
            const active = i === index;
            panel.classList.toggle('is-current', active);
            panel.toggleAttribute('inert', !active);
            if (active) panel.removeAttribute('aria-hidden'); else panel.setAttribute('aria-hidden', 'true');
          });
          islands.forEach((island, i) => island.classList.toggle('is-current', i === index));
          if (announce && changed) status.textContent = `${index + 1} / 3、${names[index]}を選択しました。`;
        }
        function measure() {
          const bounds = field.getBoundingClientRect();
          const left = bounds.left + field.clientLeft;
          const top = bounds.top + field.clientTop;
          const oldWidth = width, oldHeight = height;
          width = Math.max(1, field.clientWidth);
          height = Math.max(1, field.clientHeight);
          stations.forEach((button, i) => {
            const r = button.getBoundingClientRect();
            centers[i].x = r.left + r.width / 2 - left;
            centers[i].y = top + height - (r.top + r.height / 2);
          });
          radius = narrow.matches ? Math.min(width * .205, height * .20) : Math.min(width * .127, height * .33);
          islands.forEach(svg => {
            // viewBox spans 3.4 units: one contour unit is exactly uRadius CSS pixels.
            svg.style.width = `${radius * 3.4}px`;
            svg.style.height = `${radius * 3.4}px`;
          });
          if (pointerInitialized && (width !== oldWidth || height !== oldHeight)) {
            targetX *= width / oldWidth; pointerX *= width / oldWidth;
            targetY *= height / oldHeight; pointerY *= height / oldHeight;
          }
          if (!pointerInitialized || focusIndex >= 0) {
            const c = centers[focusIndex >= 0 ? focusIndex : selected];
            targetX = c.x; targetY = c.y;
            if (!pointerInitialized) { pointerX = targetX; pointerY = targetY; pointerInitialized = true; }
          }
          if (gpu?.renderer) {
            const dpr = Math.min(window.devicePixelRatio || 1, CFG.dprMax);
            gpu.renderer.setPixelRatio(dpr);
            gpu.renderer.setSize(width, height, false);
            gpu.uniforms.uSize.value.set(width, height);
            gpu.uniforms.uDpr.value = dpr;
            gpu.uniforms.uRadius.value = radius;
            centers.forEach((c, i) => gpu.uniforms.uCenters.value[i].set(c.x, c.y));
            gpu.dpr = dpr;
          }
          needsResize = false;
        }
        function stop() {
          if (raf) cancelAnimationFrame(raf);
          raf = 0; last = 0;
        }
        function canRun() {
          return !disposed && gpu?.ready && visible && !document.hidden && !pageSuspended;
        }
        function start() {
          if (canRun() && !raf) raf = requestAnimationFrame(frame);
        }
        function frame(now) {
          raf = 0;
          if (!canRun()) { last = 0; return; }
          const dt = last ? Math.min((now - last) / 1000, .034) : 1 / 60;
          last = now;
          try {
            if (needsResize || gpu.dpr !== Math.min(window.devicePixelRatio || 1, CFG.dprMax)) measure();
            const u = gpu.uniforms;
            const a = 1 - Math.exp(-dt / CFG.pointerTau);
            const oldX = pointerX, oldY = pointerY;
            pointerX += (targetX - pointerX) * a;
            pointerY += (targetY - pointerY) * a;
            u.uPointer.value.set(pointerX, pointerY);
            u.uVelocity.value.set((pointerX - oldX) / dt / 1000, (pointerY - oldY) / dt / 1000).clampLength(0, 1.5);
            u.uPresence.value += (presenceTarget - u.uPresence.value) * a;
            if (Math.abs(presenceTarget - u.uPresence.value) < .0001) u.uPresence.value = presenceTarget;
            const k = 1 - Math.exp(-dt / CFG.selectionTau);
            for (let i = 0; i < 3; i++) {
              const target = i === selected ? 1 : 0;
              let weight = u.uWeights.value.getComponent(i);
              weight += (target - weight) * k;
              // Exact endpoint: no indefinitely remaining selected scatter.
              if (Math.abs(target - weight) < .0001) weight = target;
              u.uWeights.value.setComponent(i, weight);
            }
            u.uTime.value += dt;
            gpu.renderer.render(gpu.scene, gpu.camera);
            start();
          } catch (error) { fail(error); }
        }
        function releaseGPU() {
          epoch++;
          stop();
          const old = gpu;
          gpu = null;
          fallback.hidden = false;
          if (old) {
            old.contextEvents?.abort();
            old.points?.removeFromParent();
            old.geometry?.dispose();
            old.material?.dispose();
            old.renderer?.dispose();
            old.renderer?.forceContextLoss();
            old.canvas?.remove();
          }
        }
        function fail(error) {
          if (disposed) return;
          console.warn('Signal Atlas: static fallback.', error);
          failed = true;
          releaseGPU();
          syncMode();
        }
        async function initGPU() {
          if (disposed || paused || media.matches || failed || gpu) return;
          const ticket = ++epoch;
          try {
            const T = await import('three');
            if (disposed || ticket !== epoch || paused || media.matches || failed) return;
            const bundle = { ready: false, contextEvents: new AbortController() };
            gpu = bundle;
            bundle.canvas = document.createElement('canvas');
            bundle.canvas.setAttribute('aria-hidden', 'true');
            bundle.canvas.hidden = true;
            field.prepend(bundle.canvas);
            bundle.canvas.addEventListener('webglcontextlost', event => {
              event.preventDefault();
              fail(new Error('WebGL context lost'));
            }, { signal: bundle.contextEvents.signal });
            bundle.renderer = new T.WebGLRenderer({ canvas: bundle.canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
            bundle.renderer.setClearColor(0x000000, 0);
            let shaderFailed = false;
            bundle.renderer.debug.checkShaderErrors = true;
            bundle.renderer.debug.onShaderError = () => { shaderFailed = true; };
            bundle.scene = new T.Scene();
            bundle.camera = new T.OrthographicCamera(-1, 1, 1, -1, .1, 10);
            bundle.camera.position.z = 1;
            bundle.uniforms = {
              uSize: { value: new T.Vector2(1, 1) },
              uCenters: { value: [new T.Vector2(), new T.Vector2(), new T.Vector2()] },
              uWeights: { value: new T.Vector3(selected === 0 ? 1 : 0, selected === 1 ? 1 : 0, selected === 2 ? 1 : 0) },
              uPointer: { value: new T.Vector2() }, uVelocity: { value: new T.Vector2() },
              uPresence: { value: 0 }, uTime: { value: 0 }, uRadius: { value: radius },
              uLens: { value: CFG.lensRadius }, uScatter: { value: CFG.scatter }, uDrift: { value: CFG.drift },
              uSelectedFlow: { value: CFG.selectedFlow }, uFreeFlow: { value: CFG.freeFlow },
              uDpr: { value: 1 }, uPointSize: { value: CFG.pointSize }
            };
            bundle.geometry = createGeometry(T, narrow.matches ? CFG.mobileStride : 1);
            bundle.material = new T.ShaderMaterial({ uniforms: bundle.uniforms, vertexShader, fragmentShader, transparent: true, depthTest: false, depthWrite: false });
            bundle.points = new T.Points(bundle.geometry, bundle.material);
            bundle.points.frustumCulled = false;
            bundle.scene.add(bundle.points);
            measure();
            pointerX = targetX; pointerY = targetY;
            bundle.uniforms.uPointer.value.set(pointerX, pointerY);
            bundle.renderer.render(bundle.scene, bundle.camera);
            const gl = bundle.renderer.getContext();
            if (shaderFailed || gl.isContextLost() || gl.getError() !== gl.NO_ERROR) throw new Error('First render failed');
            bundle.ready = true;
            bundle.canvas.hidden = false;
            fallback.hidden = true;
            syncMode();
            start();
          } catch (error) {
            if (!disposed && ticket === epoch) fail(error);
          }
        }
        function aimAt(index) {
          focusIndex = index;
          measure();
          targetX = centers[index].x; targetY = centers[index].y; presenceTarget = 1;
        }
        function pointer(event) {
          if (!event.isPrimary) return;
          focusIndex = -1;
          if (needsResize) measure();
          const r = field.getBoundingClientRect();
          targetX = event.clientX - r.left - field.clientLeft;
          targetY = r.top + field.clientTop + height - event.clientY;
          presenceTarget = 1;
        }
        function clearPointer() {
          const index = stations.findIndex(button => button === document.activeElement && button.matches(':focus-visible'));
          if (index >= 0) aimAt(index);
          else { presenceTarget = 0; focusIndex = -1; }
        }
        function touchEnded(event) {
          if (event.pointerType !== 'mouse') {
            // Touch focus is not a permanently active exploration lens.
            presenceTarget = 0; focusIndex = -1;
          }
        }
        on(field, 'pointermove', pointer, { passive: true });
        on(field, 'pointerdown', pointer, { passive: true });
        on(field, 'pointerleave', clearPointer, { passive: true });
        on(field, 'pointercancel', () => { presenceTarget = 0; focusIndex = -1; }, { passive: true });
        on(window, 'pointerup', touchEnded, { passive: true });
        on(window, 'blur', () => { presenceTarget = 0; focusIndex = -1; });
        stations.forEach((button, i) => {
          on(button, 'click', () => select(i));
          on(button, 'focus', () => { if (button.matches(':focus-visible')) aimAt(i); });
          on(button, 'blur', () => { focusIndex = -1; presenceTarget = 0; });
          on(button, 'keydown', event => {
            let next = i;
            if (event.key === 'ArrowRight') next = (i + 1) % 3;
            else if (event.key === 'ArrowLeft') next = (i + 2) % 3;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = 2;
            else return;
            event.preventDefault();
            stations[next].focus();
            aimAt(next);
            select(next);
          });
        });
        on(motion, 'click', () => {
          if (media.matches || failed) return;
          paused = !paused;
          if (paused) releaseGPU(); else initGPU();
          syncMode();
        });
        on(media, 'change', () => {
          if (media.matches) releaseGPU(); else if (!paused && !failed) initGPU();
          syncMode();
        });
        on(document, 'visibilitychange', () => {
          if (document.hidden) { presenceTarget = 0; stop(); }
          else { needsResize = true; start(); }
        });
        function resized() {
          needsResize = true;
          // SVG also needs a correct radius while no animation frame is running.
          if (!gpu?.ready || !canRun()) measure();
        }
        on(window, 'resize', resized, { passive: true });
        const resizeObserver = new ResizeObserver(resized);
        resizeObserver.observe(field);
        const intersectionObserver = new IntersectionObserver(entries => {
          visible = entries[0].isIntersecting;
          if (visible) { needsResize = true; start(); } else stop();
        }, { threshold: 0 });
        intersectionObserver.observe(field);
        on(window, 'pagehide', event => {
          if (event.persisted) { pageSuspended = true; stop(); } else destroy();
        });
        on(window, 'pageshow', () => {
          pageSuspended = false; needsResize = true;
          if (!gpu?.ready) measure();
          start();
        });
        function destroy() {
          if (disposed) return;
          disposed = true;
          events.abort();
          resizeObserver.disconnect();
          intersectionObserver.disconnect();
          releaseGPU();
          motion.disabled = true;
          motion.textContent = '静止表示';
          mode.textContent = 'STATIC FIELD';
          help.textContent = '静止図版：観測アーカイブの輪郭。';
          if (root.signalAtlasDestroy === destroy) delete root.signalAtlasDestroy;
        }
        root.signalAtlasDestroy = destroy;
        buildStatic();
        select(selected, false);
        measure();
        syncMode();
        initGPU();
      }
      
---

# Day 054 — GLSLで作る、カーソルが輪郭を読み解くシグナル・アトラス

> **Reference study:** [BAM! — cursor-responsive particle field](https://www.cssdesignawards.com/sites/bam/49792/) / CSS Design Awards  
> **主軸:** GLSL / **品質レビュー:** 88/100

ユーザー提供のCSS Design Awards掲載情報をもとに、カーソルが環境的な粒子群へ意味を与える原理を参考にした。独自の海岸・林冠・鉱物の形状と観測記録へ展開し、選択時の完全整列とGPU／SVG共通輪郭を実装。参考元のブランド、ロゴ、素材、固有構図は使用せず、元サイトのGLSL実装や性能は未確認。

# Day 054 / 365 — GLSL × Cursor Interaction

公開日：2026-11-25

## 参考にした表現

参考は、CSS Design Awards掲載の[BAM! — cursor-responsive particle field](https://www.cssdesignawards.com/sites/bam/49792/)です。環境的な粒子群を、カーソル入力によって意味のある応答へ変える設計原理を研究対象にしています。

参考元の情報はユーザー提供の掲載情報に基づきます。元サイトのシェーダー、粒子の状態管理、端末別性能は確認していません。本作の解析的な粒子変形は独自の実装であり、元実装の再現ではありません。ブランド、ロゴ、コピー、画像、固有の粒子構図も使用していません。

## 完成形

**SIGNAL ATLAS**は、架空の地形観測アーカイブです。紙色の画面上に三つの粒子地形を配置し、近接による探索と明示操作による記録選択を分離しています。

- **TIDAL／海岸**：開いた弧と周期的なうねり。水際を閉じた境界ではなく、流れの通り道として描きます。
- **CANOPY／林冠**：五つの葉状の膨らみを持つ閉じた層。層ごとの小さな回転で、重なりを表します。
- **MINERAL／鉱物**：不均一な六角形と偏心する内層。直線的な稜線で堆積の方向性を表します。

ポインターを近づけると、その周辺の粒子が輪郭へ整列します。素早く動かすと局所的な流れが生まれ、ゆっくり探ると構造が読み取りやすくなります。番号をクリック、タップ、またはキーボードで選ぶと、その地点の輪郭全体が整列します。

**選択済み地点は、ポインターを離しても完全な整列状態へ収束します。** 選択保持を近接効果の加算にせず、最終整列率を決める独立した要素にしました。速度による一時的な揺らぎも別計算で、選択地点では地形半径の0.6%以内に制限しています。

停止時は、探索していたものと同じ地点別データから生成したSVGへ切り替わります。粒子の散乱状態まで固定するのではなく、同じ輪郭・同じ層数を静的な線として提示します。

## 実装設計

### HTMLを状態の正本にする

選択状態は三つのネイティブボタンと一つのインデックスで管理します。近接だけでは本文を変更せず、明示操作でのみ切り替えます。そのため、地点間の境界を往復しても本文がちらつきません。

本文は同じグリッド領域で短くクロスフェードします。非選択パネルには`inert`と`aria-hidden`を設定します。ボタンのアクセシブルネームは、可視ラベルの「01 / TIDAL」などをそのまま含め、音声操作でも可視文字を指定できます。

Tab、Enter、Spaceに加え、左右キー、Home、Endでも操作できます。キーボードフォーカスは対応地点に探索レンズを合わせます。History APIは使用しません。

### 輪郭データを一度だけ生成する

`contourPoint()`で地点ごとの形状を定義し、`buildContours()`で30層の点列へ変換します。

同じ点列を以下の二つで共有します。

1. GPU粒子の静止位置。
2. 静的SVGのパス。

モバイルでは点列を一つおきに使用しますが、層の数と基準形状は変えません。SVGは全点列を使います。表示半径と配置も共通の`measure()`で更新するため、停止・再開で地形の輪郭やスケールが別物になりません。

### 実際の表示モードに合わせて案内する

`syncMode()`はモード表示、停止ボタン、探索案内をまとめて更新します。GPU起動中、手動停止、動きを減らす設定、GPU失敗時には「番号を選んで記録を読む」と案内し、利用できないカーソル探索を促しません。

JavaScriptはES moduleとして読み込みます。`three`を解決できるバンドラーまたはimport mapが必要です。Three.jsのバージョンは公開プロジェクト側で固定してください。importに失敗しても、SVG生成とHTMLの選択操作は先に初期化されています。

SPAではアンマウント時に`root.signalAtlasDestroy()`を呼びます。同じルートへ再マウントするときも、前のインスタンスを先に破棄します。

## シェーダー/レンダリング

頂点シェーダーは、輪郭上の静止位置、決定的な散乱属性、ポインター位置・速度、選択ウェイトを受け取ります。

近接による整列率を`explored`、選択ウェイトを`selected`とすると、最終整列率は次の形です。

```glsl
float order = 1.0 - (1.0 - explored) * (1.0 - selected);
```

`selected = 1`なら、ポインターの位置や速度にかかわらず`order = 1`です。散乱と漂流は`1.0 - order`を掛けて適用するため、選択が収束した地点には残留散乱がありません。CPU側では十分近づいた選択ウェイトを正確な0または1へスナップさせます。

速度応答はこの整列率と分離した、小さな位置変位です。非選択地点では流れを大きく見せ、選択地点では上限を地形半径の0.6%に抑えます。入力速度と近接量が収束すると、その変位も消えます。

フラグメントシェーダーは点をソフトな円盤として描き、整列した部分を深緑から錆色へ変化させます。通常描画は一つのPointsと一つのShaderMaterialです。画像、テクスチャ、ポストプロセスは使いません。

これは粒子ごとの速度を保存する物理シミュレーションではありません。解析的な変形と入力の時間補間によって、復元する動きを作っています。永続的な尾や粒子間相互作用が必要な案件では、状態テクスチャとping-pong更新へ拡張できます。

初回描画時はシェーダーエラー通知とWebGLエラーを確認し、成功後にだけSVGを隠します。起動診断は失敗検出の補助であり、表示品質や対応環境を保証するものではありません。

## 実務での使いどころ

- 三つのサービス領域を探索するブランドサイトのHero。
- 素材、地形、研究領域の違いを形態で伝えるWorksインデックス。
- 「探ると構造が見える」体験を中心にしたキャンペーン。

実案件では、見出しだけでなく輪郭生成式も情報の意味へ合わせます。柔らかさ、開放性、積層、結晶性などを形に反映すると、粒子演出が情報設計の一部になります。

## 調整パラメータ

| パラメータ | 初期値 | 役割 |
| --- | --- | --- |
| `layers` | 30 | 全モード共通の輪郭層数 |
| `samples` | 192 | 一層の区間数。モバイル間引き用に偶数を使用 |
| `mobileStride` | 2 | 狭幅起動時の粒子間引き |
| `dprMax` | 1.6 | 描画解像度の上限 |
| `pointerTau` | 0.11秒 | 入力の追従と近接の減衰 |
| `selectionTau` | 0.28秒 | 選択地点の整列速度 |
| `lensRadius` | 0.95 | 地形半径に対する探索範囲 |
| `scatter` | 0.52 | 非選択地点の散乱量 |
| `drift` | 0.045 | 環境的な漂流量 |
| `selectedFlow` | 0.006 | 選択地点の速度変位上限／半径 |
| `freeFlow` | 0.12 | 非選択地点の速度変位上限／半径 |
| `pointSize` | 2.0 CSS px | 点の基準サイズ |

粒子数は通常17,370点、狭幅起動時8,730点です。リサイズでは属性を再生成せず、中心座標・半径・描画サイズを更新します。形状変更は`contourPoint()`、鉱物の稜線変更は`MINERAL_VERTICES`で行います。

## パフォーマンスとアクセシビリティ

DPR上限、ResizeObserver、画面外停止、非表示タブ停止、BFCache復帰を考慮しています。手動停止と`prefers-reduced-motion`ではGPUリソースを解放し、共通輪郭のSVGへ移行します。OS設定を実行中に変更した場合も反映します。

WebGL非対応、import失敗、初回描画失敗、コンテキスト喪失でもHTMLによる記録選択は維持します。`[hidden]`の表示抑止をCSSで保証し、GPUとSVGが意図せず重ならないようにしています。

Canvasは読み上げ対象にしません。選択状態はボタンの`aria-pressed`と短いライブ通知で伝えます。タッチでは番号のタップだけで全記録を閲覧でき、ドラッグを要求しません。縦スクロールとピンチズームも抑止しません。

破棄時にはrequestAnimationFrame、イベント、Observer、Geometry、Material、Renderer、Canvasを解放します。非永続のページ離脱では破棄し、BFCacheへの退避ではフレームを停止します。

### 公開前の確認手順

この回答ではブラウザ・実機・性能検証は実施していません。以下は公開前に行う確認項目です。

1. 対象Three.jsバージョンとChrome／Safari／Firefoxで、シェーダー起動と粒子の判読性を確認する。
2. 各地点を選んでポインターとフォーカスを外し、輪郭が散乱せず収束することを確認する。
3. 停止・再開を繰り返し、三地点それぞれの層数、輪郭、中心、縮尺が対応していることを確認する。
4. iOS／Androidで追従、タッチ終了後の収束、縦スクロール、ピンチズームを確認する。
5. キーボード、音声操作、スクリーンリーダーで可視ラベル、選択状態、通知を確認する。
6. OSの動きを減らす設定、import失敗、コンテキスト喪失時に、静的図版と案内文が一致することを確認する。
7. BFCache復帰とSPAのマウント・破棄を繰り返し、Canvas数、イベント、GPUメモリーが増え続けないことを確認する。
8. 対象端末でGPU時間とフレーム時間を計測し、粒子数、DPR、補助文字のサイズを調整する。

---
title: Bokeh Gradient WebGL Hero
description: 淡いボケ、円形アクセント、ゆるいライン模様で、導入セクションに奥行きを足すWebGL背景表現です。
category: 3D・WebGL寄り
tags:
  - WebGL
  - JavaScript
  - アニメーション
  - UI
  - UX
  - 3D
  - パフォーマンス
date: 2026年5月26日
publishedAt: 2026-05-26
readTime: 5分
viewer: playground
thumbnail: runtime
layout: default
files:
  - name: Component.jsx
    language: jsx
    content: |
      import { createBokehProgram } from './webgl/createBokehProgram.js'
      
      function Demo() {
        const canvasRef = React.useRef(null)
        const mouseRef = React.useRef({ x: 0.5, y: 0.5 })
        const [status, setStatus] = React.useState('loading')
        const [message, setMessage] = React.useState('')
      
        React.useEffect(() => {
          const canvas = canvasRef.current
          let isMounted = true
          let frameId = 0
          let resizeObserver
      
          try {
            if (!canvas) {
              throw new Error('Canvasを初期化できませんでした')
            }
      
            const gl = canvas.getContext('webgl', {
              alpha: false,
              antialias: true,
              powerPreference: 'high-performance',
            })
      
            if (!gl) {
              throw new Error('WebGLを利用できません')
            }
      
            const program = createBokehProgram(gl)
            const positionBuffer = gl.createBuffer()
            const positionLocation = gl.getAttribLocation(program, 'a_position')
            const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
            const timeLocation = gl.getUniformLocation(program, 'u_time')
            const mouseLocation = gl.getUniformLocation(program, 'u_mouse')
      
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array([-1, -1, 3, -1, -1, 3]),
              gl.STATIC_DRAW
            )
      
            function resize() {
              const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
              const width = Math.max(1, Math.floor(canvas.clientWidth * ratio))
              const height = Math.max(1, Math.floor(canvas.clientHeight * ratio))
      
              if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width
                canvas.height = height
                gl.viewport(0, 0, width, height)
              }
            }
      
            function render(now) {
              resize()
              gl.useProgram(program)
              gl.enableVertexAttribArray(positionLocation)
              gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
              gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
              gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
              gl.uniform1f(timeLocation, now * 0.001)
              gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y)
              gl.drawArrays(gl.TRIANGLES, 0, 3)
              frameId = window.requestAnimationFrame(render)
            }
      
            resizeObserver = new ResizeObserver(resize)
            resizeObserver.observe(canvas)
            frameId = window.requestAnimationFrame(render)
      
            if (isMounted) {
              setStatus('ready')
            }
          } catch (error) {
            if (isMounted) {
              setStatus('error')
              setMessage(error?.message || 'WebGLシーンを読み込めませんでした')
            }
          }
      
          return () => {
            isMounted = false
            window.cancelAnimationFrame(frameId)
            resizeObserver?.disconnect()
          }
        }, [])
      
        function handlePointerMove(event) {
          const rect = event.currentTarget.getBoundingClientRect()
          mouseRef.current = {
            x: (event.clientX - rect.left) / rect.width,
            y: 1 - (event.clientY - rect.top) / rect.height,
          }
        }
      
        function handlePointerLeave() {
          mouseRef.current = { x: 0.5, y: 0.5 }
        }
      
        return (
          <section className="bokeh-gradient-stage">
            <div className="bokeh-gradient-shell">
              <canvas
                ref={canvasRef}
                className="bokeh-gradient-scene"
                aria-label="Decorative WebGL background animation"
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
              />
      
              <div className="bokeh-gradient-veil" />
      
              <div className="hero-copy">
                <h1>JUNK</h1>
              </div>
      
              <div className="scene-status" data-visible={status !== 'ready'}>
                {status === 'error' ? message : 'Loading WebGL scene'}
              </div>
            </div>
          </section>
        )
      }
      
  - name: webgl/createBokehProgram.js
    language: js
    content: |
      import { vertexShaderSource } from '../shaders/vertexShader.js'
      import { fragmentShaderSource } from '../shaders/fragmentShader.js'
      
      function createShader(gl, type, source) {
        const shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
      
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          throw new Error(gl.getShaderInfoLog(shader) || 'Shader compile failed')
        }
      
        return shader
      }
      
      export function createBokehProgram(gl) {
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
        const program = gl.createProgram()
      
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
      
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          throw new Error(gl.getProgramInfoLog(program) || 'Program link failed')
        }
      
        return program
      }
  - name: shaders/vertexShader.js
    language: js
    content: |
      export const vertexShaderSource = `
        attribute vec2 a_position;
        varying vec2 v_uv;
      
        void main() {
          v_uv = a_position * 0.5 + 0.5;
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `
  - name: shaders/fragmentShader.js
    language: js
    content: |
      export const fragmentShaderSource = `
      precision highp float;
      
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      
      const float PI = 3.14159265359;
      
      mat2 rotate2d(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
      }
      
      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }
      
      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
      
        float n000 = hash(i.xy + vec2(17.0, 29.0) * i.z);
        float n100 = hash(i.xy + vec2(1.0, 0.0) + vec2(17.0, 29.0) * i.z);
        float n010 = hash(i.xy + vec2(0.0, 1.0) + vec2(17.0, 29.0) * i.z);
        float n110 = hash(i.xy + vec2(1.0, 1.0) + vec2(17.0, 29.0) * i.z);
        float n001 = hash(i.xy + vec2(17.0, 29.0) * (i.z + 1.0));
        float n101 = hash(i.xy + vec2(1.0, 0.0) + vec2(17.0, 29.0) * (i.z + 1.0));
        float n011 = hash(i.xy + vec2(0.0, 1.0) + vec2(17.0, 29.0) * (i.z + 1.0));
        float n111 = hash(i.xy + vec2(1.0, 1.0) + vec2(17.0, 29.0) * (i.z + 1.0));
      
        float nx00 = mix(n000, n100, f.x);
        float nx10 = mix(n010, n110, f.x);
        float nx01 = mix(n001, n101, f.x);
        float nx11 = mix(n011, n111, f.x);
        float nxy0 = mix(nx00, nx10, f.y);
        float nxy1 = mix(nx01, nx11, f.y);
        return mix(nxy0, nxy1, f.z);
      }
      
      float ellipseMask(vec2 uv, vec2 center, vec2 radius, float rotation) {
        vec2 p = (uv - center) * rotate2d(rotation);
        p /= radius;
        return 1.0 - smoothstep(0.82, 1.0, dot(p, p));
      }
      
      float circleMask(vec2 uv, vec2 center, float radius) {
        float d = distance(uv, center);
        return 1.0 - smoothstep(radius * 0.92, radius, d);
      }
      
      vec3 gradientColor(float x) {
        x = clamp(x, 0.0, 1.0);
        vec3 c0 = vec3(0.686, 0.725, 1.0);
        vec3 c1 = vec3(0.702, 0.753, 0.996);
        vec3 c2 = vec3(0.929, 0.941, 1.0);
        vec3 c3 = vec3(0.855, 0.969, 1.0);
      
        if (x < 0.30) return mix(c0, c1, smoothstep(0.044, 0.30, x));
        if (x < 0.653) return mix(c1, c2, smoothstep(0.30, 0.653, x));
        return mix(c2, c3, smoothstep(0.653, 1.0, x));
      }
      
      float linePattern(vec2 uv, float density, float width, float phase) {
        float wave = sin((uv.x * density + phase) * PI);
        return 1.0 - smoothstep(width, width + 0.08, abs(wave));
      }
      
      vec3 environmentMap(vec3 dir) {
        dir = normalize(dir);
        vec2 envUv = vec2(atan(dir.z, dir.x) / (2.0 * PI) + 0.5, asin(clamp(dir.y, -1.0, 1.0)) / PI + 0.5);
        vec2 p = envUv;
        float n = noise(vec3(p * 4.0, u_time * 0.06));
        vec2 rotated = rotate2d(n * 1.6 - 0.8) * (p - 0.5);
      
        vec3 color = gradientColor(p.x * 0.75 + p.y * 0.25);
        color = mix(color, vec3(0.965, 0.985, 1.0), smoothstep(0.2, 0.95, p.y) * 0.26);
      
        float creamCircle = circleMask(vec2(p.x * 1.6, p.y), vec2(0.9, 0.32), 0.24);
        color = 1.0 - (1.0 - color) * (1.0 - vec3(1.0, 0.925, 0.839) * creamCircle * 0.68);
      
        float blueLine = linePattern(rotated + vec2(0.18, 0.0), 16.0, 0.035, 0.08);
        float warmLine = linePattern(rotated.yx + vec2(-0.12, 0.0), 11.0, 0.03, 0.42);
        float lineWindow = smoothstep(0.08, 0.42, p.x) * (1.0 - smoothstep(0.9, 1.0, p.x));
        color += vec3(0.12, 0.44, 1.0) * blueLine * lineWindow * 0.32;
        color += vec3(1.0, 0.72, 0.34) * warmLine * lineWindow * 0.22;
      
        float glowA = ellipseMask(vec2(p.x * 1.6, p.y), vec2(0.34, 0.66), vec2(0.5, 0.34), 0.2);
        float glowB = ellipseMask(vec2(p.x * 1.6, p.y), vec2(1.22, 0.58), vec2(0.48, 0.36), -0.2);
        color += vec3(0.2, 0.4, 1.0) * glowA * 0.12;
        color += vec3(0.48, 0.95, 1.0) * glowB * 0.13;
      
        return color;
      }
      
      vec3 backgroundColor(vec2 uv) {
        vec2 ndc = uv * 2.0 - 1.0;
        ndc.x *= u_resolution.x / u_resolution.y;
        vec3 dir = normalize(vec3(ndc * 0.95, -1.25));
        return environmentMap(dir);
      }
      
      float sphereHit(vec3 ro, vec3 rd, vec3 center, float radius) {
        vec3 oc = ro - center;
        float b = dot(oc, rd);
        float c = dot(oc, oc) - radius * radius;
        float h = b * b - c;
        if (h < 0.0) return -1.0;
        h = sqrt(h);
        float t = -b - h;
        if (t > 0.0) return t;
        return -b + h;
      }
      
      float shapeHit(vec3 ro, vec3 rd, out vec3 center, out float radius) {
        vec2 mouse = (u_mouse - 0.5) * vec2(0.12, -0.08);
        vec3 c0 = vec3(0.52 + mouse.x, 0.08 + mouse.y, 0.02);
        vec3 c1 = vec3(0.33 + mouse.x, -0.18 + mouse.y, 0.04);
        vec3 c2 = vec3(0.72 + mouse.x, 0.27 + mouse.y, -0.02);
        float r0 = 0.48;
        float r1 = 0.28;
        float r2 = 0.22;
      
        float t0 = sphereHit(ro, rd, c0, r0);
        float t1 = sphereHit(ro, rd, c1, r1);
        float t2 = sphereHit(ro, rd, c2, r2);
        float t = 999.0;
        center = c0;
        radius = r0;
      
        if (t0 > 0.0 && t0 < t) { t = t0; center = c0; radius = r0; }
        if (t1 > 0.0 && t1 < t) { t = t1; center = c1; radius = r1; }
        if (t2 > 0.0 && t2 < t) { t = t2; center = c2; radius = r2; }
      
        if (t > 998.0) return -1.0;
        return t;
      }
      
      vec3 renderShape(vec2 uv, vec3 bg) {
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;
        vec3 ro = vec3(0.0, 0.0, 2.55);
        vec3 rd = normalize(vec3(p * 0.92, -1.72));
      
        vec3 center;
        float radius;
        float hitT = shapeHit(ro, rd, center, radius);
        if (hitT < 0.0) return bg;
      
        vec3 hitPos = ro + rd * hitT;
        vec3 normal = normalize(hitPos - center);
        float surfaceNoise = noise(hitPos * 9.0 + vec3(u_time * 0.16));
        normal = normalize(normal + vec3(surfaceNoise - 0.5, noise(hitPos.yzx * 8.0) - 0.5, noise(hitPos.zxy * 8.0) - 0.5) * 0.18);
      
        vec3 reflectDir = reflect(rd, normal);
        vec3 refractR = refract(rd, normal, 0.78);
        vec3 refractG = refract(rd, normal, 0.80);
        vec3 refractB = refract(rd, normal, 0.82);
      
        vec3 reflected = environmentMap(reflectDir);
        vec3 refracted = vec3(
          environmentMap(refractR).r,
          environmentMap(refractG).g,
          environmentMap(refractB).b
        );
      
        float fresnel = 0.08 + 1.85 * pow(1.0 + dot(rd, normal), 2.4);
        fresnel = clamp(fresnel, 0.0, 1.0);
        vec3 light = normalize(vec3(-0.4, 0.72, 0.55));
        float spec = pow(max(dot(reflect(rd, normal), light), 0.0), 72.0);
        float rim = pow(1.0 - max(dot(-rd, normal), 0.0), 2.0);
      
        vec3 shapeColor = mix(refracted, reflected, fresnel);
        shapeColor = mix(shapeColor, vec3(0.82, 0.93, 1.0), 0.08);
        shapeColor += vec3(1.0) * spec * 0.95;
        shapeColor += vec3(0.7, 0.92, 1.0) * rim * 0.58;
        shapeColor += vec3(1.0, 0.74, 0.36) * pow(rim, 2.4) * 0.16;
      
        float silhouette = smoothstep(0.0, radius, length(hitPos - center));
        float alpha = 0.82 + silhouette * 0.12;
        return mix(bg, shapeColor, alpha);
      }
      
      float bokehDisc(vec2 uv, vec2 center, float radius, float softness) {
        float d = distance(uv, center);
        return 1.0 - smoothstep(radius - softness, radius, d);
      }
      
      void main() {
        vec2 uv = v_uv;
        vec3 color = backgroundColor(uv);
        color = renderShape(uv, color);
      
        vec2 bokehOrigin = vec2(0.472, 0.489) + (u_mouse - 0.5) * 0.075;
        float bokeh = 0.0;
        bokeh += bokehDisc(uv, bokehOrigin + vec2(-0.18, 0.12), 0.085, 0.07);
        bokeh += bokehDisc(uv, bokehOrigin + vec2(0.28, -0.16), 0.115, 0.09);
        bokeh += bokehDisc(uv, bokehOrigin + vec2(0.38, 0.18), 0.06, 0.05);
        bokeh += bokehDisc(uv, bokehOrigin + vec2(-0.34, -0.2), 0.045, 0.04);
        color += vec3(1.0, 0.97, 0.9) * bokeh * 0.13;
      
        float vignette = 1.0 - smoothstep(0.18, 0.92, distance((uv - vec2(0.479, 0.508)) * vec2(0.5 * u_resolution.x / u_resolution.y, 0.5), vec2(0.0)));
        color = mix(color * 0.68, color, vignette);
      
        float grain = hash(gl_FragCoord.xy + floor(u_time * 18.0));
        color = mix(color, min(color, vec3(grain)), 0.045);
      
        gl_FragColor = vec4(color, 1.0);
      }
      `
  - name: styles.css
    language: css
    content: |
      body {
        margin: 0;
        min-height: 100vh;
        background: #eef2ff;
        color: #0f172a;
      }
      
      .bokeh-gradient-stage {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: clamp(1rem, 4vw, 3rem);
        background:
          radial-gradient(circle at 16% 18%, rgba(147, 197, 253, 0.5), transparent 32%),
          radial-gradient(circle at 86% 14%, rgba(196, 181, 253, 0.42), transparent 30%),
          linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%);
      }
      
      .bokeh-gradient-shell {
        position: relative;
        width: min(1120px, 100%);
        min-height: min(76vh, 720px);
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.72);
        border-radius: clamp(1.5rem, 4vw, 2.5rem);
        background: #c7d2fe;
        box-shadow:
          0 34px 90px rgba(30, 41, 59, 0.22),
          inset 0 1px 0 rgba(255, 255, 255, 0.75);
        isolation: isolate;
      }
      
      .bokeh-gradient-scene {
        position: absolute;
        inset: 0;
        z-index: 0;
        display: block;
        width: 100%;
        height: 100%;
      }
      
      .bokeh-gradient-veil {
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background:
          linear-gradient(90deg, rgba(248, 250, 252, 0.8) 0%, rgba(248, 250, 252, 0.42) 36%, rgba(248, 250, 252, 0.04) 72%),
          radial-gradient(circle at 22% 48%, rgba(255, 255, 255, 0.62), transparent 42%),
          linear-gradient(180deg, rgba(15, 23, 42, 0) 58%, rgba(15, 23, 42, 0.22) 100%);
      }
      
      .hero-copy {
        position: relative;
        z-index: 2;
        min-height: min(76vh, 720px);
        max-width: 620px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1.25rem;
        padding: clamp(2rem, 7vw, 5rem);
      }
      
      .hero-kicker {
        width: fit-content;
        border: 1px solid rgba(79, 70, 229, 0.22);
        border-radius: 999px;
        padding: 0.45rem 0.75rem;
        background: rgba(255, 255, 255, 0.58);
        color: #4f46e5;
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        backdrop-filter: blur(16px);
      }
      
      .hero-copy h1 {
        max-width: 12ch;
        margin: 0;
        font-size: clamp(2.7rem, 7vw, 5.8rem);
        line-height: 0.94;
        letter-spacing: 0;
      }
      
      .hero-copy p {
        max-width: 34rem;
        margin: 0;
        color: #475569;
        font-size: clamp(1rem, 1.8vw, 1.1rem);
        line-height: 1.9;
      }
      
      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        padding-top: 0.5rem;
      }
      
      .hero-actions span {
        border: 1px solid rgba(15, 23, 42, 0.1);
        border-radius: 999px;
        padding: 0.7rem 0.9rem;
        background: rgba(255, 255, 255, 0.62);
        color: #111827;
        font-size: 0.82rem;
        font-weight: 800;
        box-shadow: 0 10px 24px rgba(30, 41, 59, 0.08);
        backdrop-filter: blur(18px);
      }
      
      .scene-status {
        position: absolute;
        right: 1rem;
        bottom: 1rem;
        z-index: 3;
        max-width: min(28rem, calc(100% - 2rem));
        border: 1px solid rgba(15, 23, 42, 0.1);
        border-radius: 999px;
        padding: 0.65rem 0.9rem;
        background: rgba(255, 255, 255, 0.74);
        color: #475569;
        font-size: 0.8rem;
        font-weight: 700;
        box-shadow: 0 14px 34px rgba(30, 41, 59, 0.12);
        backdrop-filter: blur(18px);
        transition: opacity 0.25s ease, transform 0.25s ease;
      }
      
      .scene-status[data-visible='false'] {
        opacity: 0;
        pointer-events: none;
        transform: translateY(8px);
      }
      
      @media (max-width: 720px) {
        .bokeh-gradient-shell {
          min-height: 640px;
        }
      
        .bokeh-gradient-veil {
          background:
            linear-gradient(180deg, rgba(248, 250, 252, 0.82) 0%, rgba(248, 250, 252, 0.4) 58%, rgba(15, 23, 42, 0.18) 100%);
        }
      
        .hero-copy {
          min-height: 640px;
          padding: 2rem;
          justify-content: flex-start;
          padding-top: 3rem;
        }
      
        .hero-copy h1 {
          max-width: 11ch;
        }
      }
      
code:
  jsx: |
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
    
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `
    
    const fragmentShaderSource = `
    precision highp float;
    
    varying vec2 v_uv;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    
    const float PI = 3.14159265359;
    
    mat2 rotate2d(float angle) {
      float s = sin(angle);
      float c = cos(angle);
      return mat2(c, -s, s, c);
    }
    
    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }
    
    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
    
      float n000 = hash(i.xy + vec2(17.0, 29.0) * i.z);
      float n100 = hash(i.xy + vec2(1.0, 0.0) + vec2(17.0, 29.0) * i.z);
      float n010 = hash(i.xy + vec2(0.0, 1.0) + vec2(17.0, 29.0) * i.z);
      float n110 = hash(i.xy + vec2(1.0, 1.0) + vec2(17.0, 29.0) * i.z);
      float n001 = hash(i.xy + vec2(17.0, 29.0) * (i.z + 1.0));
      float n101 = hash(i.xy + vec2(1.0, 0.0) + vec2(17.0, 29.0) * (i.z + 1.0));
      float n011 = hash(i.xy + vec2(0.0, 1.0) + vec2(17.0, 29.0) * (i.z + 1.0));
      float n111 = hash(i.xy + vec2(1.0, 1.0) + vec2(17.0, 29.0) * (i.z + 1.0));
    
      float nx00 = mix(n000, n100, f.x);
      float nx10 = mix(n010, n110, f.x);
      float nx01 = mix(n001, n101, f.x);
      float nx11 = mix(n011, n111, f.x);
      float nxy0 = mix(nx00, nx10, f.y);
      float nxy1 = mix(nx01, nx11, f.y);
      return mix(nxy0, nxy1, f.z);
    }
    
    float ellipseMask(vec2 uv, vec2 center, vec2 radius, float rotation) {
      vec2 p = (uv - center) * rotate2d(rotation);
      p /= radius;
      return 1.0 - smoothstep(0.82, 1.0, dot(p, p));
    }
      
    float circleMask(vec2 uv, vec2 center, float radius) {
      float d = distance(uv, center);
      return 1.0 - smoothstep(radius * 0.92, radius, d);
    }
    
    vec3 gradientColor(float x) {
      x = clamp(x, 0.0, 1.0);
      vec3 c0 = vec3(0.686, 0.725, 1.0);
      vec3 c1 = vec3(0.702, 0.753, 0.996);
      vec3 c2 = vec3(0.929, 0.941, 1.0);
      vec3 c3 = vec3(0.855, 0.969, 1.0);
    
      if (x < 0.30) return mix(c0, c1, smoothstep(0.044, 0.30, x));
      if (x < 0.653) return mix(c1, c2, smoothstep(0.30, 0.653, x));
      return mix(c2, c3, smoothstep(0.653, 1.0, x));
    }
    
    float linePattern(vec2 uv, float density, float width, float phase) {
      float wave = sin((uv.x * density + phase) * PI);
      return 1.0 - smoothstep(width, width + 0.08, abs(wave));
    }
    
    vec3 environmentMap(vec3 dir) {
      dir = normalize(dir);
      vec2 envUv = vec2(atan(dir.z, dir.x) / (2.0 * PI) + 0.5, asin(clamp(dir.y, -1.0, 1.0)) / PI + 0.5);
      vec2 p = envUv;
      float n = noise(vec3(p * 4.0, u_time * 0.06));
      vec2 rotated = rotate2d(n * 1.6 - 0.8) * (p - 0.5);
    
      vec3 color = gradientColor(p.x * 0.75 + p.y * 0.25);
      color = mix(color, vec3(0.965, 0.985, 1.0), smoothstep(0.2, 0.95, p.y) * 0.26);
    
      float creamCircle = circleMask(vec2(p.x * 1.6, p.y), vec2(0.9, 0.32), 0.24);
      color = 1.0 - (1.0 - color) * (1.0 - vec3(1.0, 0.925, 0.839) * creamCircle * 0.68);
    
      float blueLine = linePattern(rotated + vec2(0.18, 0.0), 16.0, 0.035, 0.08);
      float warmLine = linePattern(rotated.yx + vec2(-0.12, 0.0), 11.0, 0.03, 0.42);
      float lineWindow = smoothstep(0.08, 0.42, p.x) * (1.0 - smoothstep(0.9, 1.0, p.x));
      color += vec3(0.12, 0.44, 1.0) * blueLine * lineWindow * 0.32;
      color += vec3(1.0, 0.72, 0.34) * warmLine * lineWindow * 0.22;
    
      float glowA = ellipseMask(vec2(p.x * 1.6, p.y), vec2(0.34, 0.66), vec2(0.5, 0.34), 0.2);
      float glowB = ellipseMask(vec2(p.x * 1.6, p.y), vec2(1.22, 0.58), vec2(0.48, 0.36), -0.2);
      color += vec3(0.2, 0.4, 1.0) * glowA * 0.12;
      color += vec3(0.48, 0.95, 1.0) * glowB * 0.13;
    
      return color;
    }
    
    vec3 backgroundColor(vec2 uv) {
      vec2 ndc = uv * 2.0 - 1.0;
      ndc.x *= u_resolution.x / u_resolution.y;
      vec3 dir = normalize(vec3(ndc * 0.95, -1.25));
      return environmentMap(dir);
    }
    
    float sphereHit(vec3 ro, vec3 rd, vec3 center, float radius) {
      vec3 oc = ro - center;
      float b = dot(oc, rd);
      float c = dot(oc, oc) - radius * radius;
      float h = b * b - c;
      if (h < 0.0) return -1.0;
      h = sqrt(h);
      float t = -b - h;
      if (t > 0.0) return t;
      return -b + h;
    }
    
    float shapeHit(vec3 ro, vec3 rd, out vec3 center, out float radius) {
      vec2 mouse = (u_mouse - 0.5) * vec2(0.12, -0.08);
      vec3 c0 = vec3(0.52 + mouse.x, 0.08 + mouse.y, 0.02);
      vec3 c1 = vec3(0.33 + mouse.x, -0.18 + mouse.y, 0.04);
      vec3 c2 = vec3(0.72 + mouse.x, 0.27 + mouse.y, -0.02);
      float r0 = 0.48;
      float r1 = 0.28;
      float r2 = 0.22;
    
      float t0 = sphereHit(ro, rd, c0, r0);
      float t1 = sphereHit(ro, rd, c1, r1);
      float t2 = sphereHit(ro, rd, c2, r2);
      float t = 999.0;
      center = c0;
      radius = r0;
    
      if (t0 > 0.0 && t0 < t) { t = t0; center = c0; radius = r0; }
      if (t1 > 0.0 && t1 < t) { t = t1; center = c1; radius = r1; }
      if (t2 > 0.0 && t2 < t) { t = t2; center = c2; radius = r2; }
    
      if (t > 998.0) return -1.0;
      return t;
    }
    
    vec3 renderShape(vec2 uv, vec3 bg) {
      vec2 p = uv * 2.0 - 1.0;
      p.x *= u_resolution.x / u_resolution.y;
      vec3 ro = vec3(0.0, 0.0, 2.55);
      vec3 rd = normalize(vec3(p * 0.92, -1.72));
    
      vec3 center;
      float radius;
      float hitT = shapeHit(ro, rd, center, radius);
      if (hitT < 0.0) return bg;
    
      vec3 hitPos = ro + rd * hitT;
      vec3 normal = normalize(hitPos - center);
      float surfaceNoise = noise(hitPos * 9.0 + vec3(u_time * 0.16));
      normal = normalize(normal + vec3(surfaceNoise - 0.5, noise(hitPos.yzx * 8.0) - 0.5, noise(hitPos.zxy * 8.0) - 0.5) * 0.18);
    
      vec3 reflectDir = reflect(rd, normal);
      vec3 refractR = refract(rd, normal, 0.78);
      vec3 refractG = refract(rd, normal, 0.80);
      vec3 refractB = refract(rd, normal, 0.82);
    
      vec3 reflected = environmentMap(reflectDir);
      vec3 refracted = vec3(
        environmentMap(refractR).r,
        environmentMap(refractG).g,
        environmentMap(refractB).b
      );
    
      float fresnel = 0.08 + 1.85 * pow(1.0 + dot(rd, normal), 2.4);
      fresnel = clamp(fresnel, 0.0, 1.0);
      vec3 light = normalize(vec3(-0.4, 0.72, 0.55));
      float spec = pow(max(dot(reflect(rd, normal), light), 0.0), 72.0);
      float rim = pow(1.0 - max(dot(-rd, normal), 0.0), 2.0);
    
      vec3 shapeColor = mix(refracted, reflected, fresnel);
      shapeColor = mix(shapeColor, vec3(0.82, 0.93, 1.0), 0.08);
      shapeColor += vec3(1.0) * spec * 0.95;
      shapeColor += vec3(0.7, 0.92, 1.0) * rim * 0.58;
      shapeColor += vec3(1.0, 0.74, 0.36) * pow(rim, 2.4) * 0.16;
    
      float silhouette = smoothstep(0.0, radius, length(hitPos - center));
      float alpha = 0.82 + silhouette * 0.12;
      return mix(bg, shapeColor, alpha);
    }
    
    float bokehDisc(vec2 uv, vec2 center, float radius, float softness) {
      float d = distance(uv, center);
      return 1.0 - smoothstep(radius - softness, radius, d);
    }
    
    void main() {
      vec2 uv = v_uv;
      vec3 color = backgroundColor(uv);
      color = renderShape(uv, color);
    
      vec2 bokehOrigin = vec2(0.472, 0.489) + (u_mouse - 0.5) * 0.075;
      float bokeh = 0.0;
      bokeh += bokehDisc(uv, bokehOrigin + vec2(-0.18, 0.12), 0.085, 0.07);
      bokeh += bokehDisc(uv, bokehOrigin + vec2(0.28, -0.16), 0.115, 0.09);
      bokeh += bokehDisc(uv, bokehOrigin + vec2(0.38, 0.18), 0.06, 0.05);
      bokeh += bokehDisc(uv, bokehOrigin + vec2(-0.34, -0.2), 0.045, 0.04);
      color += vec3(1.0, 0.97, 0.9) * bokeh * 0.13;
    
      float vignette = 1.0 - smoothstep(0.18, 0.92, distance((uv - vec2(0.479, 0.508)) * vec2(0.5 * u_resolution.x / u_resolution.y, 0.5), vec2(0.0)));
      color = mix(color * 0.68, color, vignette);
    
      float grain = hash(gl_FragCoord.xy + floor(u_time * 18.0));
      color = mix(color, min(color, vec3(grain)), 0.045);
    
      gl_FragColor = vec4(color, 1.0);
    }
    `
    
    function createShader(gl, type, source) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
    
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || 'Shader compile failed')
      }
    
      return shader
    }
    
    function createProgram(gl) {
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
      const program = gl.createProgram()
    
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)
    
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'Program link failed')
      }
    
      return program
    }
    
    function Demo() {
      const canvasRef = React.useRef(null)
      const mouseRef = React.useRef({ x: 0.5, y: 0.5 })
      const [status, setStatus] = React.useState('loading')
      const [message, setMessage] = React.useState('')
    
      React.useEffect(() => {
        const canvas = canvasRef.current
        let isMounted = true
        let frameId = 0
        let resizeObserver
    
        try {
          if (!canvas) {
            throw new Error('Canvasを初期化できませんでした')
          }
    
          const gl = canvas.getContext('webgl', {
            alpha: false,
            antialias: true,
            powerPreference: 'high-performance',
          })
    
          if (!gl) {
            throw new Error('WebGLを利用できません')
          }
    
          const program = createProgram(gl)
          const positionBuffer = gl.createBuffer()
          const positionLocation = gl.getAttribLocation(program, 'a_position')
          const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
          const timeLocation = gl.getUniformLocation(program, 'u_time')
          const mouseLocation = gl.getUniformLocation(program, 'u_mouse')
    
          gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
          gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 3, -1, -1, 3]),
            gl.STATIC_DRAW
          )
    
          function resize() {
            const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
            const width = Math.max(1, Math.floor(canvas.clientWidth * ratio))
            const height = Math.max(1, Math.floor(canvas.clientHeight * ratio))
    
            if (canvas.width !== width || canvas.height !== height) {
              canvas.width = width
              canvas.height = height
              gl.viewport(0, 0, width, height)
            }
          }
    
          function render(now) {
            resize()
            gl.useProgram(program)
            gl.enableVertexAttribArray(positionLocation)
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
            gl.uniform1f(timeLocation, now * 0.001)
            gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
            frameId = window.requestAnimationFrame(render)
          }
    
          resizeObserver = new ResizeObserver(resize)
          resizeObserver.observe(canvas)
          frameId = window.requestAnimationFrame(render)
    
          if (isMounted) {
            setStatus('ready')
          }
        } catch (error) {
          if (isMounted) {
            setStatus('error')
            setMessage(error?.message || 'WebGLシーンを読み込めませんでした')
          }
        }
    
        return () => {
          isMounted = false
          window.cancelAnimationFrame(frameId)
          resizeObserver?.disconnect()
        }
      }, [])
    
      function handlePointerMove(event) {
        const rect = event.currentTarget.getBoundingClientRect()
        mouseRef.current = {
          x: (event.clientX - rect.left) / rect.width,
          y: 1 - (event.clientY - rect.top) / rect.height,
        }
      }
    
      function handlePointerLeave() {
        mouseRef.current = { x: 0.5, y: 0.5 }
      }
    
      return (
        <section className="bokeh-gradient-stage">
          <div className="bokeh-gradient-shell">
            <canvas
              ref={canvasRef}
              className="bokeh-gradient-scene"
              aria-label="Decorative WebGL background animation"
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            />
    
            <div className="bokeh-gradient-veil" />
    
            <div className="hero-copy">
              <h1>JUNK</h1>
            </div>
    
            <div className="scene-status" data-visible={status !== 'ready'}>
              {status === 'error' ? message : 'Loading WebGL scene'}
            </div>
          </div>
        </section>
      )
    }
  css: |
    body {
      margin: 0;
      min-height: 100vh;
      background: #eef2ff;
      color: #0f172a;
    }
    
    .bokeh-gradient-stage {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: clamp(1rem, 4vw, 3rem);
      background:
        radial-gradient(circle at 16% 18%, rgba(147, 197, 253, 0.5), transparent 32%),
        radial-gradient(circle at 86% 14%, rgba(196, 181, 253, 0.42), transparent 30%),
        linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%);
    }
    
    .bokeh-gradient-shell {
      position: relative;
      width: min(1120px, 100%);
      min-height: min(76vh, 720px);
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.72);
      border-radius: clamp(1.5rem, 4vw, 2.5rem);
      background: #c7d2fe;
      box-shadow:
        0 34px 90px rgba(30, 41, 59, 0.22),
        inset 0 1px 0 rgba(255, 255, 255, 0.75);
      isolation: isolate;
    }
    
    .bokeh-gradient-scene {
      position: absolute;
      inset: 0;
      z-index: 0;
      display: block;
      width: 100%;
      height: 100%;
    }
    
    .bokeh-gradient-veil {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background:
        linear-gradient(90deg, rgba(248, 250, 252, 0.8) 0%, rgba(248, 250, 252, 0.42) 36%, rgba(248, 250, 252, 0.04) 72%),
        radial-gradient(circle at 22% 48%, rgba(255, 255, 255, 0.62), transparent 42%),
        linear-gradient(180deg, rgba(15, 23, 42, 0) 58%, rgba(15, 23, 42, 0.22) 100%);
    }
    
    .hero-copy {
      position: relative;
      z-index: 2;
      min-height: min(76vh, 720px);
      max-width: 620px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1.25rem;
      padding: clamp(2rem, 7vw, 5rem);
    }
    
    .hero-kicker {
      width: fit-content;
      border: 1px solid rgba(79, 70, 229, 0.22);
      border-radius: 999px;
      padding: 0.45rem 0.75rem;
      background: rgba(255, 255, 255, 0.58);
      color: #4f46e5;
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      backdrop-filter: blur(16px);
    }
    
    .hero-copy h1 {
      max-width: 12ch;
      margin: 0;
      font-size: clamp(2.7rem, 7vw, 5.8rem);
      line-height: 0.94;
      letter-spacing: 0;
    }
    
    .hero-copy p {
      max-width: 34rem;
      margin: 0;
      color: #475569;
      font-size: clamp(1rem, 1.8vw, 1.1rem);
      line-height: 1.9;
    }
    
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
      padding-top: 0.5rem;
    }
    
    .hero-actions span {
      border: 1px solid rgba(15, 23, 42, 0.1);
      border-radius: 999px;
      padding: 0.7rem 0.9rem;
      background: rgba(255, 255, 255, 0.62);
      color: #111827;
      font-size: 0.82rem;
      font-weight: 800;
      box-shadow: 0 10px 24px rgba(30, 41, 59, 0.08);
      backdrop-filter: blur(18px);
    }
    
    .scene-status {
      position: absolute;
      right: 1rem;
      bottom: 1rem;
      z-index: 3;
      max-width: min(28rem, calc(100% - 2rem));
      border: 1px solid rgba(15, 23, 42, 0.1);
      border-radius: 999px;
      padding: 0.65rem 0.9rem;
      background: rgba(255, 255, 255, 0.74);
      color: #475569;
      font-size: 0.8rem;
      font-weight: 700;
      box-shadow: 0 14px 34px rgba(30, 41, 59, 0.12);
      backdrop-filter: blur(18px);
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    
    .scene-status[data-visible='false'] {
      opacity: 0;
      pointer-events: none;
      transform: translateY(8px);
    }
    
    @media (max-width: 720px) {
      .bokeh-gradient-shell {
        min-height: 640px;
      }
    
      .bokeh-gradient-veil {
        background:
          linear-gradient(180deg, rgba(248, 250, 252, 0.82) 0%, rgba(248, 250, 252, 0.4) 58%, rgba(15, 23, 42, 0.18) 100%);
      }
    
      .hero-copy {
        min-height: 640px;
        padding: 2rem;
        justify-content: flex-start;
        padding-top: 3rem;
      }
    
      .hero-copy h1 {
        max-width: 11ch;
      }
    }
---

## はじめに

自分用メモ。

ファーストビューの背景は、主張を強くしすぎると文字が読みにくくなる。淡いグラデーション、円形アクセント、少しだけ動くラインを重ねるくらいが扱いやすい。

このサンプルでは、WebGLを背景として敷き、前面の文字はDOMで分けている。背景は雰囲気を作る役、文字は読ませる役として分けておく。

## WebGL背景の基本

ここで見ておくのは、1枚のcanvasで複数の背景要素をまとめて扱える点。CSSだけのグラデーションより、線の揺れや淡い粒感を足しやすい。

- ファーストビューに少し奥行きを付けたい
- 背景にゆるい動きを入れたい
- 画像ではなくコードで色や形を調整したい
- 文字の読みやすさはDOM側で保ちたい

## 組み合わせのポイント

- 背景、円形アクセント、ライン模様、ボケを別の役割として考える
- 動きは強くしすぎず、背景全体が少し呼吸するくらいに抑える
- 前面の `JUNK` はWebGLに描かず、通常のHTMLとして重ねる
- 白いベールを挟んで、背景の強さと文字の読みやすさを調整する

## 実装のポイント

1. `Component.jsx` はcanvasの初期化、リサイズ、マウス位置、描画ループだけを見る
2. `createBokehProgram.js` はshader programを作る処理だけに分ける
3. `fragmentShader.js` では背景色、円形アクセント、ライン、ボケ、grainをまとめて描く
4. `styles.css` ではcanvas、ベール、文字の重なり順だけを整える

## まとめ

覚えておくのは、背景表現は作り込みより分担。WebGLは雰囲気、CSSは読みやすさ、HTMLは情報を担当する。そこを分けておくと、見た目の調整もしやすい。

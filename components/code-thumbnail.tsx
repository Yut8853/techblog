'use client';

import { useEffect, useRef } from 'react';
import type { ArticleCode, ArticleFile } from '@/lib/articles/types';
import {
  buildCodeFiles,
  bundleReactFiles,
  collectStyleCode,
  extractComponentName,
  getFileExtension,
} from '@/lib/playground-preview';

type PreviewMode = 'thumbnail' | 'player';

interface CodeThumbnailProps {
  code?: ArticleCode;
  files?: ArticleFile[];
  fallbackClass?: string;
  mode?: PreviewMode;
  className?: string;
  title?: string;
  reloadToken?: number;
}

function getPreviewShellStyles(mode: PreviewMode): string {
  if (mode === 'player') {
    return `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { min-height: 100%; }
      body {
        font-family: system-ui, -apple-system, sans-serif;
        overflow-x: hidden;
        overflow-y: auto !important;
        overscroll-behavior: contain;
        background: #020617;
      }
    `;
  }

  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      min-height: 100%;
      overflow: hidden;
    }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      overflow: hidden;
    }
  `;
}

function getPlaybackScript(mode: PreviewMode): string {
  if (mode !== 'player') {
    return '';
  }

  return `
    <script>
      (function () {
        const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));

        async function replayScrollPreview() {
          const scroller = document.scrollingElement || document.documentElement;
          scroller.scrollTo({ top: 0, left: 0, behavior: 'auto' });

          if (window.ScrollTrigger) {
            try {
              window.ScrollTrigger.refresh();
            } catch (error) {
              console.warn(error);
            }
          }

          await wait(320);

          const maxScroll = Math.max(0, scroller.scrollHeight - window.innerHeight);
          if (maxScroll < 64) {
            return;
          }

          const firstStop = Math.min(
            maxScroll,
            Math.max(window.innerHeight * 0.7, maxScroll * 0.45)
          );

          scroller.scrollTo({ top: firstStop, behavior: 'smooth' });
          await wait(1600);

          if (maxScroll > firstStop + 48) {
            scroller.scrollTo({ top: maxScroll, behavior: 'smooth' });
            await wait(1800);
          }

          scroller.scrollTo({ top: 0, behavior: 'smooth' });
        }

        window.addEventListener('load', () => {
          window.setTimeout(() => {
            void replayScrollPreview();
          }, 220);
        });
      })();
    </script>
  `;
}

function generateReactPreviewHTML(
  codeFiles: Record<string, string>,
  cssCode: string,
  baseOrigin: string,
  mode: PreviewMode
): string {
  const usesReactThreeFiber = Object.values(codeFiles).some(source =>
    source.includes('@react-three/fiber')
  );
  const bundle = bundleReactFiles(codeFiles);
  const bundledCode = bundle?.bundledCode || 'function Component() { return null }';
  const componentName = extractComponentName(
    bundle?.entryCode || 'function Component() { return null }'
  );

  const loopWrapper = mode === 'thumbnail'
    ? `
    function ThumbnailWrapper() {
      const [key, setKey] = React.useState(0);
      
      React.useEffect(() => {
        const interval = setInterval(() => {
          setKey(k => k + 1);
        }, 4000);
        return () => clearInterval(interval);
      }, []);
      
      return <${componentName} key={key} />;
    }
  `
    : '';

  const rootComponent = mode === 'thumbnail'
    ? 'ThumbnailWrapper'
    : componentName;
  const runtimeSource = `${bundledCode}\n\n${loopWrapper}\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(React.createElement(${rootComponent}));`;
  const reactRuntimeScripts = usesReactThreeFiber
    ? ''
    : `
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
`;
  const runtimeScript = usesReactThreeFiber
    ? `
  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18.3.1",
        "react-dom": "https://esm.sh/react-dom@18.3.1",
        "react-dom/client": "https://esm.sh/react-dom@18.3.1/client",
        "three": "https://esm.sh/three@0.160.0",
        "@react-three/fiber": "https://esm.sh/@react-three/fiber@8.17.10?external=react,react-dom,three"
      }
    }
  </script>
  <script type="module">
    async function bootPreview() {
      try {
        const reactModule = await import('react');
        const React = reactModule.default || reactModule;
        const { createRoot } = await import('react-dom/client');
        const { Canvas, useFrame } = await import('@react-three/fiber');
        const ReactDOM = { createRoot };

        window.React = React;
        window.ReactDOM = ReactDOM;
        window.Canvas = Canvas;
        window.useFrame = useFrame;

        const source = ${JSON.stringify(runtimeSource)};
        const transpiled = window.ts.transpileModule(source, {
          compilerOptions: {
            jsx: window.ts.JsxEmit.React,
            target: window.ts.ScriptTarget.ES2019,
            module: window.ts.ModuleKind.None,
          },
          fileName: 'preview.tsx',
          reportDiagnostics: false,
        }).outputText;

        eval(transpiled);
      } catch (error) {
        console.error(error);
        document.getElementById('root').innerHTML =
          '<div class="preview-error">R3F preview could not be loaded.</div>';
      }
    }

    bootPreview();
  </script>
`
    : `
  <script>
    const source = ${JSON.stringify(runtimeSource)};
    const transpiled = window.ts.transpileModule(source, {
      compilerOptions: {
        jsx: window.ts.JsxEmit.React,
        target: window.ts.ScriptTarget.ES2019,
        module: window.ts.ModuleKind.None,
      },
      fileName: 'preview.tsx',
      reportDiagnostics: false,
    }).outputText;

    try {
      window.eval(transpiled);
    } catch (error) {
      console.error(error);
    }
  </script>
`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="${baseOrigin}/">
  ${reactRuntimeScripts}
  <script src="https://unpkg.com/gsap@3/dist/gsap.min.js"></script>
  <script src="https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script src="https://unpkg.com/gsap@3/dist/CustomEase.min.js"></script>
  <script src="https://unpkg.com/gsap@3/dist/SplitText.min.js"></script>
  <script src="https://unpkg.com/typescript@5/lib/typescript.js"></script>
  <style>
    ${getPreviewShellStyles(mode)}
    .preview-error {
      display: grid;
      min-height: 100vh;
      place-items: center;
      padding: 24px;
      color: rgba(255, 247, 237, 0.78);
      background: #191716;
      font: 600 14px/1.5 system-ui, sans-serif;
      text-align: center;
    }
    ${cssCode}
  </style>
</head>
<body>
  <div id="root"></div>
  ${runtimeScript}
  ${getPlaybackScript(mode)}
</body>
</html>
`;
}

function generateHtmlPreviewHTML(
  htmlCode: string,
  cssCode: string,
  jsCode: string,
  baseOrigin: string,
  mode: PreviewMode
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="${baseOrigin}/">
  <script src="https://unpkg.com/gsap@3/dist/gsap.min.js"></script>
  <script src="https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script src="https://unpkg.com/gsap@3/dist/CustomEase.min.js"></script>
  <script src="https://unpkg.com/gsap@3/dist/SplitText.min.js"></script>
  <style>
    ${getPreviewShellStyles(mode)}
    ${cssCode}
  </style>
</head>
<body>
  ${htmlCode}
  <script>
    ${jsCode}
  </script>
  ${getPlaybackScript(mode)}
</body>
</html>
`;
}

function generatePreviewHTML(
  codeFiles: Record<string, string>,
  baseOrigin: string,
  mode: PreviewMode
): string | null {
  const entries = Object.entries(codeFiles);
  const htmlEntry = entries.find(([fileName]) =>
    ['html', 'htm'].includes(getFileExtension(fileName))
  );
  const cssCode = collectStyleCode(codeFiles);

  if (htmlEntry) {
    const jsCode = entries
      .filter(([fileName]) => ['js', 'mjs'].includes(getFileExtension(fileName)))
      .map(([, content]) => content)
      .join('\n\n');

    return generateHtmlPreviewHTML(
      htmlEntry[1],
      cssCode,
      jsCode,
      baseOrigin,
      mode
    );
  }

  const reactEntry = entries.find(([fileName]) =>
    ['jsx', 'tsx', 'js', 'ts'].includes(getFileExtension(fileName))
  );

  if (!reactEntry) {
    return null;
  }

  return generateReactPreviewHTML(codeFiles, cssCode, baseOrigin, mode);
}

export function CodeThumbnail({
  code,
  files,
  fallbackClass,
  mode = 'thumbnail',
  className,
  title = 'Code Preview Thumbnail',
  reloadToken = 0,
}: CodeThumbnailProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const codeFiles = buildCodeFiles(code, files);
  const hasPreview = Object.keys(codeFiles).length > 0;

  useEffect(() => {
    if (!iframeRef.current || !hasPreview) return;

    const html = generatePreviewHTML(codeFiles, window.location.origin, mode);
    if (!html) return;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;

    return () => URL.revokeObjectURL(url);
  }, [codeFiles, hasPreview, mode, reloadToken]);

  if (!hasPreview) {
    return (
      <div
        className={`${className || 'h-full w-full'} block ${fallbackClass || 'bg-linear-to-br from-slate-800 via-slate-900 to-slate-950'}`}
      />
    );
  }

  return (
    <iframe
      ref={iframeRef}
      className={`${className || 'h-full w-full'} block border-0 ${mode === 'thumbnail' ? 'pointer-events-none' : ''}`}
      title={title}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}

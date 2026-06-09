'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import type { ArticleCode, ArticleFile } from '@/lib/articles/types';
import {
  buildCodeFiles,
  buildFileStructure,
  bundleReactFiles,
  collectStyleCode,
  extractComponentName,
  getFileExtension,
  getPreferredFileName,
  type FileNode,
} from '@/lib/playground-preview';

interface CodePlaygroundProps {
  code?: ArticleCode;
  files?: ArticleFile[];
}

const defaultCode: ArticleCode = {
  jsx: `function Hero() {
  return (
    <div className="hero">
      <h1 className="hero-title">JUNKBRANDING</h1>
      <p className="hero-subtitle">テキストテキスト、、、、</p>
    </div>
  )
}`,
  css: `.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: white;
  text-align: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.8;
  margin-top: 1rem;
}`,
};

const defaultFiles: ArticleFile[] = [
  { name: 'Component.jsx', language: 'jsx', content: defaultCode.jsx },
  { name: 'styles.css', language: 'css', content: defaultCode.css },
];

function FileTreeItem({
  node,
  depth = 0,
  selectedFile,
  onSelectFile,
}: {
  node: FileNode;
  depth?: number;
  selectedFile: string;
  onSelectFile: (path: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const paddingLeft = depth * 16 + 8;

  if (node.type === 'folder') {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center gap-1 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          style={{ paddingLeft }}
        >
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <Folder className="h-4 w-4 text-accent" />
          <span>{node.name}</span>
        </button>
        {isOpen && node.children && (
          <div>
            {node.children.map(child => (
              <FileTreeItem
                key={child.name}
                node={child}
                depth={depth + 1}
                selectedFile={selectedFile}
                onSelectFile={onSelectFile}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const getFileIcon = (name: string) => {
    const extension = getFileExtension(name);

    if (extension === 'html') {
      return <File className="h-4 w-4 text-orange-400" />;
    }

    if (extension === 'js' || extension === 'mjs' || extension === 'ts') {
      return <File className="h-4 w-4 text-yellow-400" />;
    }

    if (extension === 'jsx' || extension === 'tsx') {
      return <File className="h-4 w-4 text-blue-500" />;
    }

    if (extension === 'css' || extension === 'scss') {
      return <File className="h-4 w-4 text-pink-500" />;
    }

    return <File className="h-4 w-4" />;
  };

  const isSelected = node.path === selectedFile;

  return (
    <button
      onClick={() => node.path && onSelectFile(node.path)}
      className={`flex w-full cursor-pointer items-center gap-1 py-1 text-sm transition-colors ${
        isSelected
          ? 'bg-muted font-medium text-foreground'
          : 'text-muted-foreground hover:text-foreground'
      }`}
      style={{ paddingLeft: paddingLeft + 20 }}
    >
      {getFileIcon(node.name)}
      <span>{node.name}</span>
    </button>
  );
}

function generateReactPreviewHTML(
  codeFiles: Record<string, string>,
  cssCode: string,
  baseOrigin: string
): string {
  const usesReactThreeFiber = Object.values(codeFiles).some(source =>
    source.includes('@react-three/fiber')
  );
  const bundle = bundleReactFiles(codeFiles);
  const bundledCode = bundle?.bundledCode || defaultCode.jsx;
  const componentName = extractComponentName(bundle?.entryCode || defaultCode.jsx);
  const runtimeSource = `${bundledCode}\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(React.createElement(${componentName}));`;
  const r3fRuntimeSource = `import React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport * as THREE from 'three';\nimport * as ReactThreeFiber from '@react-three/fiber';\nconst ReactDOM = { createRoot };\nconst { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } = React;\nconst { Canvas, createPortal, extend, useFrame, useGraph, useLoader, useThree } = ReactThreeFiber;\nconst { BoxGeometry, BufferAttribute, BufferGeometry, CanvasTexture, Color, Clock, DoubleSide, Float32BufferAttribute, Group, IcosahedronGeometry, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, Points, PointsMaterial, ShaderMaterial, SphereGeometry, TextureLoader, TorusKnotGeometry, Vector2, Vector3 } = THREE;\n${runtimeSource}`;
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
        "react/jsx-runtime": "https://esm.sh/react@18.3.1/jsx-runtime",
        "react-dom": "https://esm.sh/react-dom@18.3.1",
        "react-dom/client": "https://esm.sh/react-dom@18.3.1/client",
        "react-dom/server": "https://esm.sh/react-dom@18.3.1/server",
        "three": "https://esm.sh/three@0.160.0",
        "@react-three/fiber": "https://esm.sh/@react-three/fiber@8.17.10?external=react,react-dom,three"
      }
    }
  </script>
  <script type="module">
    function showPreviewError(error) {
      console.error(error);
      const message = error instanceof Error ? error.message : String(error);
      const root = document.getElementById('root');
      root.innerHTML = '<div class="preview-error"></div>';
      root.firstElementChild.textContent = message
        ? 'R3F preview could not be loaded: ' + message
        : 'R3F preview could not be loaded.';
    }

    async function bootPreview() {
      let moduleUrl;

      try {
        const source = ${JSON.stringify(r3fRuntimeSource)};
        const transpiled = window.ts.transpileModule(source, {
          compilerOptions: {
            jsx: window.ts.JsxEmit.React,
            target: window.ts.ScriptTarget.ES2020,
            module: window.ts.ModuleKind.ES2020,
          },
          fileName: 'preview.tsx',
          reportDiagnostics: false,
        }).outputText;

        moduleUrl = URL.createObjectURL(
          new Blob([transpiled], { type: 'text/javascript' })
        );
        await import(moduleUrl);
      } catch (error) {
        showPreviewError(error);
      } finally {
        if (moduleUrl) {
          URL.revokeObjectURL(moduleUrl);
        }
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
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { min-height: 100%; }
    body { font-family: system-ui, -apple-system, sans-serif; }
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
</body>
</html>
`;
}

function generateHtmlPreviewHTML(
  htmlCode: string,
  cssCode: string,
  jsCode: string,
  baseOrigin: string
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
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { min-height: 100%; }
    body { font-family: system-ui, -apple-system, sans-serif; }
    ${cssCode}
  </style>
</head>
<body>
  ${htmlCode}
  <script>
    ${jsCode}
  </script>
</body>
</html>
`;
}

function generatePreviewHTML(
  codeFiles: Record<string, string>,
  baseOrigin: string
): string {
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

    return generateHtmlPreviewHTML(htmlEntry[1], cssCode, jsCode, baseOrigin);
  }

  return generateReactPreviewHTML(codeFiles, cssCode, baseOrigin);
}

export function CodePlayground({ code, files }: CodePlaygroundProps) {
  const initialCodeFiles = (() => {
    const filesMap = buildCodeFiles(code, files);
    if (Object.keys(filesMap).length > 0) {
      return filesMap;
    }

    return Object.fromEntries(defaultFiles.map(file => [file.name, file.content]));
  })();
  const [codeFiles, setCodeFiles] = useState(initialCodeFiles);
  const [selectedFile, setSelectedFile] = useState(
    getPreferredFileName(Object.keys(initialCodeFiles))
  );
  const [previewKey, setPreviewKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const tabs = Object.keys(codeFiles);
  const currentCode = codeFiles[selectedFile as keyof typeof codeFiles] || '';
  const fileTree = buildFileStructure(tabs);

  useEffect(() => {
    const nextCodeFiles = (() => {
      const filesMap = buildCodeFiles(code, files);
      if (Object.keys(filesMap).length > 0) {
        return filesMap;
      }

      return Object.fromEntries(defaultFiles.map(file => [file.name, file.content]));
    })();
    setCodeFiles(nextCodeFiles);
    setSelectedFile(getPreferredFileName(Object.keys(nextCodeFiles)));
    setPreviewKey(prev => prev + 1);
  }, [code, files]);

  const updatePreview = useCallback(() => {
    if (!iframeRef.current) return;

    const html = generatePreviewHTML(codeFiles, window.location.origin);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;

    return () => URL.revokeObjectURL(url);
  }, [codeFiles]);

  const resizeTextarea = useCallback(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = '0px';
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      320
    )}px`;
  }, []);

  useEffect(() => {
    const cleanup = updatePreview();
    return cleanup;
  }, [updatePreview, previewKey]);

  useEffect(() => {
    resizeTextarea();
  }, [currentCode, selectedFile, resizeTextarea]);

  const handleCodeChange = (newCode: string) => {
    setCodeFiles(prev => ({
      ...prev,
      [selectedFile]: newCode,
    }));
  };

  const handleRunCode = () => {
    setPreviewKey(prev => prev + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue =
        currentCode.substring(0, start) + '  ' + currentCode.substring(end);
      handleCodeChange(newValue);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }

    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleRunCode();
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-slate-900">
        <iframe
          ref={iframeRef}
          className="block h-full w-full border-0"
          title="Code Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Folder className="h-4 w-4" />
            <span>構成 / File Structure</span>
          </div>
          <div className="mt-4">
            {fileTree.map(node => (
              <FileTreeItem
                key={node.name}
                node={node}
                selectedFile={selectedFile}
                onSelectFile={setSelectedFile}
              />
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-[#1e1e1e]">
          <div className="flex items-center justify-between border-b border-[#333] px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white/60">{'</>'}</span>
              <span className="text-sm font-medium text-white">Code Viewer</span>
            </div>
            <button
              onClick={handleRunCode}
              className="rounded-md bg-sky-400 px-3 py-1 text-xs font-semibold text-slate-950 transition-colors hover:bg-sky-300"
            >
              Run
            </button>
          </div>

          <div className="flex overflow-x-auto border-b border-[#333]">
            {tabs.map(fileName => (
              <button
                key={fileName}
                onClick={() => setSelectedFile(fileName)}
                className={`whitespace-nowrap border-b-2 px-4 py-2 text-sm transition-colors ${
                  selectedFile === fileName
                    ? 'border-accent text-accent'
                    : 'border-transparent text-white/60 hover:text-white/80'
                }`}
              >
                {fileName}
              </button>
            ))}
          </div>

          <div className="relative max-h-80 overflow-auto">
            <div className="flex">
              <div className="sticky left-0 select-none bg-[#1e1e1e] py-4 pl-4 pr-2 text-right font-mono text-sm text-white/30">
                {currentCode.split('\n').map((_, i) => (
                  <div key={i} className="leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>
              <textarea
                ref={textareaRef}
                value={currentCode}
                onChange={e => handleCodeChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-80 flex-1 resize-none overflow-hidden bg-transparent p-4 pl-2 font-mono text-sm leading-6 text-white/90 outline-none"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

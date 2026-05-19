'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import type { ArticleCode } from '@/lib/articles/types';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path?: string;
  children?: FileNode[];
}

interface CodePlaygroundProps {
  code?: ArticleCode;
}

const defaultFileStructure: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        type: 'folder',
        children: [
          { name: 'Component.jsx', type: 'file', path: 'Component.jsx' },
        ],
      },
      {
        name: 'styles',
        type: 'folder',
        children: [{ name: 'styles.css', type: 'file', path: 'styles.css' }],
      },
    ],
  },
];

const defaultCode: ArticleCode = {
  jsx: `function Hero() {
  return (
    <div className="hero">
      <h1 className="hero-title">流れに合わせて、印象を立ち上げる。</h1>
      <p className="hero-subtitle">スクロールに合わせて見出しと背景の動きをずらし、導入にゆっくりリズムをつくります。</p>
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

// JSXコードから最初の関数コンポーネント名を抽出
function extractComponentName(jsxCode: string): string {
  const match = jsxCode.match(/function\s+(\w+)\s*\(/);
  return match ? match[1] : 'App';
}

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
          className="flex w-full items-center gap-1 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
    if (name.endsWith('.jsx') || name.endsWith('.tsx')) {
      return <File className="h-4 w-4 text-blue-500" />;
    }
    if (name.endsWith('.ts')) {
      return <File className="h-4 w-4 text-blue-600" />;
    }
    if (name.endsWith('.scss') || name.endsWith('.css')) {
      return <File className="h-4 w-4 text-pink-500" />;
    }
    return <File className="h-4 w-4" />;
  };

  const isSelected = node.path === selectedFile;

  return (
    <button
      onClick={() => node.path && onSelectFile(node.path)}
      className={`flex w-full items-center gap-1 py-1 text-sm transition-colors cursor-pointer ${
        isSelected
          ? 'text-accent font-medium bg-accent/10'
          : 'text-muted-foreground hover:text-foreground'
      }`}
      style={{ paddingLeft: paddingLeft + 20 }}
    >
      {getFileIcon(node.name)}
      <span>{node.name}</span>
    </button>
  );
}

function generatePreviewHTML(jsxCode: string, cssCode: string): string {
  const componentName = extractComponentName(jsxCode);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/gsap@3/dist/gsap.min.js"></script>
  <script src="https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { min-height: 100%; }
    body { font-family: system-ui, -apple-system, sans-serif; }
    ${cssCode}
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    ${jsxCode}
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<${componentName} />);
  </script>
</body>
</html>
`;
}

export function CodePlayground({ code }: CodePlaygroundProps) {
  const initialCode = code || defaultCode;
  const [codeFiles, setCodeFiles] = useState({
    'Component.jsx': initialCode.jsx,
    'styles.css': initialCode.css,
  });
  const [selectedFile, setSelectedFile] = useState('Component.jsx');
  const [previewKey, setPreviewKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const tabs = Object.keys(codeFiles);
  const currentCode = codeFiles[selectedFile as keyof typeof codeFiles] || '';

  const updatePreview = useCallback(() => {
    if (!iframeRef.current) return;

    const jsxCode = codeFiles['Component.jsx'] || '';
    const cssCode = codeFiles['styles.css'] || '';
    const html = generatePreviewHTML(jsxCode, cssCode);

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
      {/* Preview */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-slate-900">
        <iframe
          ref={iframeRef}
          className="h-full w-full border-0"
          title="Code Preview"
          sandbox="allow-scripts"
        />
      </div>

      {/* Code Editor */}
      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        {/* File Structure */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Folder className="h-4 w-4" />
            <span>構成 / File Structure</span>
          </div>
          <div className="mt-4">
            {defaultFileStructure.map(node => (
              <FileTreeItem
                key={node.name}
                node={node}
                selectedFile={selectedFile}
                onSelectFile={setSelectedFile}
              />
            ))}
          </div>
        </div>

        {/* Code Viewer */}
        <div className="rounded-xl border border-border bg-[#1e1e1e] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#333] px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white/60">{'</>'}</span>
              <span className="text-sm font-medium text-white">
                Code Viewer
              </span>
            </div>
            <button
              onClick={handleRunCode}
              className="rounded-md bg-accent px-3 py-1 text-xs font-medium text-white hover:bg-accent/80 transition-colors"
            >
              Run
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#333] overflow-x-auto">
            {tabs.map(fileName => (
              <button
                key={fileName}
                onClick={() => setSelectedFile(fileName)}
                className={`px-4 py-2 text-sm whitespace-nowrap border-b-2 transition-colors ${
                  selectedFile === fileName
                    ? 'border-accent text-accent'
                    : 'border-transparent text-white/60 hover:text-white/80'
                }`}
              >
                {fileName}
              </button>
            ))}
          </div>

          {/* Code Editor */}
          <div className="relative max-h-80 overflow-auto">
            <div className="flex">
              {/* Line Numbers */}
              <div className="sticky left-0 select-none bg-[#1e1e1e] py-4 pl-4 pr-2 text-right text-sm font-mono text-white/30">
                {currentCode.split('\n').map((_, i) => (
                  <div key={i} className="leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>
              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={currentCode}
                onChange={e => handleCodeChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-80 flex-1 resize-none overflow-hidden bg-transparent p-4 pl-2 font-mono text-sm text-white/90 leading-6 outline-none"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

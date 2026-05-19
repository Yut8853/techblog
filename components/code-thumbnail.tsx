'use client';

import { useEffect, useRef } from 'react';
import type { ArticleCode } from '@/lib/articles/types';

interface CodeThumbnailProps {
  code?: ArticleCode;
  fallbackClass?: string;
}

// JSXコードから最初の関数コンポーネント名を抽出
function extractComponentName(jsxCode: string): string {
  const match = jsxCode.match(/function\s+(\w+)\s*\(/);
  return match ? match[1] : 'App';
}

function generatePreviewHTML(jsxCode: string, cssCode: string): string {
  const componentName = extractComponentName(jsxCode);

  // アニメーションを自動ループさせるためのラッパー
  const loopWrapper = `
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
  `;

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
    body { font-family: system-ui, -apple-system, sans-serif; overflow: hidden; }
    ${cssCode}
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    ${jsxCode}
    
    ${loopWrapper}
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<ThumbnailWrapper />);
  </script>
</body>
</html>
`;
}

export function CodeThumbnail({ code, fallbackClass }: CodeThumbnailProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current || !code) return;

    const html = generatePreviewHTML(code.jsx, code.css);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;

    return () => URL.revokeObjectURL(url);
  }, [code]);

  if (!code) {
    return (
      <div
        className={`w-full h-full ${fallbackClass || 'bg-linear-to-br from-slate-800 via-slate-900 to-slate-950'}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3/4 w-3/4 rounded-lg border border-white/10 bg-linear-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm" />
        </div>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full border-0 pointer-events-none"
      title="Code Preview Thumbnail"
      sandbox="allow-scripts"
    />
  );
}

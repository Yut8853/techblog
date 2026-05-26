import type { ArticleCode, ArticleFile } from '@/lib/articles/types';

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path?: string;
  children?: FileNode[];
}

const SCRIPT_EXTENSIONS = ['js', 'jsx', 'ts', 'tsx'];
const STYLE_EXTENSIONS = ['css', 'scss'];

export function getFileExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

export function buildCodeFiles(
  code?: ArticleCode,
  files?: ArticleFile[]
): Record<string, string> {
  if (files && files.length > 0) {
    return Object.fromEntries(files.map(file => [file.name, file.content]));
  }

  if (code) {
    return {
      'Component.jsx': code.jsx,
      'styles.css': code.css,
    };
  }

  return {};
}

export function buildFileStructure(fileNames: string[]): FileNode[] {
  const root: FileNode = {
    name: 'project',
    type: 'folder',
    children: [],
  };

  for (const filePath of fileNames) {
    const segments = filePath.split('/').filter(Boolean);
    let current = root;

    segments.forEach((segment, index) => {
      const isFile = index === segments.length - 1;
      const type: FileNode['type'] = isFile ? 'file' : 'folder';
      let node = current.children?.find(
        child => child.name === segment && child.type === type
      );

      if (!node) {
        node = {
          name: segment,
          type,
          path: isFile ? filePath : undefined,
          children: isFile ? undefined : [],
        };
        current.children?.push(node);
      }

      current = node;
    });
  }

  const sortNodes = (nodes: FileNode[]): FileNode[] =>
    [...nodes]
      .sort((left, right) => {
        if (left.type !== right.type) {
          return left.type === 'folder' ? -1 : 1;
        }

        return left.name.localeCompare(right.name);
      })
      .map(node => ({
        ...node,
        children: node.children ? sortNodes(node.children) : undefined,
      }));

  return sortNodes(root.children || []);
}

export function getPreferredFileName(fileNames: string[]): string {
  const preferred = [
    'Component.tsx',
    'Component.jsx',
    'Component.ts',
    'Component.js',
  ];

  for (const candidate of preferred) {
    const exact = fileNames.find(fileName => fileName === candidate);
    if (exact) {
      return exact;
    }
  }

  const nested = fileNames.find(fileName =>
    /(^|\/)Component\.(tsx|jsx|ts|js)$/.test(fileName)
  );

  return nested || fileNames[0] || 'Component.jsx';
}

function normalizeImportPath(fromFile: string, importPath: string): string[] {
  const fromSegments = fromFile.split('/');
  fromSegments.pop();

  const resolvedSegments = [...fromSegments];
  for (const segment of importPath.split('/')) {
    if (!segment || segment === '.') {
      continue;
    }

    if (segment === '..') {
      resolvedSegments.pop();
      continue;
    }

    resolvedSegments.push(segment);
  }

  const resolved = resolvedSegments.join('/');

  return [
    resolved,
    `${resolved}.ts`,
    `${resolved}.tsx`,
    `${resolved}.js`,
    `${resolved}.jsx`,
  ];
}

function extractRelativeImports(source: string, fromFile: string): string[] {
  return Array.from(
    source.matchAll(/import\s+(?:[^'";]+?from\s+)?['"](.+?)['"];?/g)
  )
    .map(match => match[1])
    .filter(importPath => importPath.startsWith('.'))
    .flatMap(importPath => normalizeImportPath(fromFile, importPath));
}

function stripModuleSyntax(source: string): string {
  return source
    .replace(/^[ \t]*import\s+(?:[^'";]+?from\s+)?['"].+?['"];?\s*$/gm, '')
    .replace(/^[ \t]*export\s+default\s+/gm, '')
    .replace(/^[ \t]*export\s+(?=(function|const|let|var|class|type|interface))/gm, '')
    .replace(/^[ \t]*export\s*\{[^}]+\};?\s*$/gm, '')
    .trim();
}

export function extractComponentName(source: string): string {
  const preferredNames = ['Demo', 'App', 'Component', 'Hero'];

  for (const name of preferredNames) {
    const preferredFunction = new RegExp(`function\\s+${name}\\s*\\(`);
    if (preferredFunction.test(source)) {
      return name;
    }

    const preferredConst = new RegExp(
      `const\\s+${name}\\s*=\\s*(?:\\(|React\\.|forwardRef|memo)`
    );
    if (preferredConst.test(source)) {
      return name;
    }
  }

  const functionMatch = source.match(/function\s+(\w+)\s*\(/);
  if (functionMatch) {
    return functionMatch[1];
  }

  const constMatch = source.match(/const\s+(\w+)\s*=\s*(?:\(|React\.|forwardRef|memo)/);
  if (constMatch) {
    return constMatch[1];
  }

  return 'Component';
}

export function bundleReactFiles(codeFiles: Record<string, string>): {
  bundledCode: string;
  entryCode: string;
} | null {
  const scriptFiles = Object.keys(codeFiles).filter(fileName =>
    SCRIPT_EXTENSIONS.includes(getFileExtension(fileName))
  );

  if (scriptFiles.length === 0) {
    return null;
  }

  const available = new Set(scriptFiles);
  const ordered: string[] = [];
  const visited = new Set<string>();
  const entryFile = getPreferredFileName(scriptFiles);

  const visit = (fileName: string) => {
    if (visited.has(fileName) || !available.has(fileName)) {
      return;
    }

    visited.add(fileName);

    extractRelativeImports(codeFiles[fileName] || '', fileName).forEach(candidate => {
      if (available.has(candidate)) {
        visit(candidate);
      }
    });

    ordered.push(fileName);
  };

  visit(entryFile);
  scriptFiles.forEach(fileName => visit(fileName));

  return {
    bundledCode: ordered
      .map(fileName => `// ${fileName}\n${stripModuleSyntax(codeFiles[fileName] || '')}`)
      .filter(Boolean)
      .join('\n\n'),
    entryCode: stripModuleSyntax(codeFiles[entryFile] || ''),
  };
}

export function collectStyleCode(codeFiles: Record<string, string>): string {
  return Object.entries(codeFiles)
    .filter(([fileName]) => STYLE_EXTENSIONS.includes(getFileExtension(fileName)))
    .map(([, content]) => content)
    .join('\n\n');
}

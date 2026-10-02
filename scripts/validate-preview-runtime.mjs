import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { spawnSync } from 'node:child_process';
import os from 'node:os';

const root = process.cwd();
const articleDir = path.join(root, 'content', 'articles');
const playgroundPath = path.join(root, 'components', 'code-playground.tsx');
const thumbnailPath = path.join(root, 'components', 'code-thumbnail.tsx');

const errors = [];

function assertRuntimeFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');

  if (!source.includes('"three": "https://esm.sh/three@0.180.0"')) {
    errors.push(`${path.relative(root, filePath)}: Three.js import map is missing`);
  }

  if (!source.includes('<script type="module">')) {
    errors.push(`${path.relative(root, filePath)}: ES module script runtime is missing`);
  }

  if (/try\s*\{\s*\$\{jsCode\}/s.test(source)) {
    errors.push(`${path.relative(root, filePath)}: jsCode is still wrapped inside try{}, which breaks static imports`);
  }
}

assertRuntimeFile(playgroundPath);
assertRuntimeFile(thumbnailPath);

const dailyFiles = fs
  .readdirSync(articleDir)
  .filter(name => /^daily-\d{4}-\d{2}-\d{2}-.+\.md$/.test(name));

for (const fileName of dailyFiles) {
  const source = fs.readFileSync(path.join(articleDir, fileName), 'utf8');
  const { data } = matter(source);
  const files = Array.isArray(data.files) ? data.files : [];
  const experiment = files.find(file => file?.name === 'experiment.js');

  if (!experiment?.content) {
    errors.push(`${fileName}: experiment.js is missing`);
    continue;
  }

  const tempPath = path.join(os.tmpdir(), `techblog-${process.pid}-${fileName}.mjs`);
  fs.writeFileSync(tempPath, String(experiment.content), 'utf8');

  const result = spawnSync(process.execPath, ['--check', tempPath], {
    encoding: 'utf8',
  });

  fs.rmSync(tempPath, { force: true });

  if (result.status !== 0) {
    errors.push(
      `${fileName}: experiment.js module syntax failed\n${result.stderr || result.stdout}`
    );
  }
}

if (errors.length) {
  console.error('Preview runtime validation failed:');
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Preview runtime validation OK: ${dailyFiles.length} Daily Lab article(s)`);

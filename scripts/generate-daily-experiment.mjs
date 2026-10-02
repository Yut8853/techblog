import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, 'content', 'articles');
const SERIES_START = '2026-10-03';
const SERIES_LENGTH = 365;
const MODEL = process.env.OPENAI_MODEL || 'gpt-5.1';
const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  throw new Error('OPENAI_API_KEY is not set.');
}

const FOCUS_ROTATION = ['Three.js', 'GLSL', 'WebGL', 'WebGPU'];
const TECHNIQUE_ROTATION = [
  'particles',
  'noise',
  'distortion',
  'ray marching',
  'post processing',
  'fluid-like motion',
  'image transition',
  'typography',
  'point cloud',
  'instancing',
  'procedural geometry',
  'lighting',
  'reflection and refraction',
  'scroll interaction',
  'mouse interaction',
  'camera motion',
  'feedback effect',
  'signed distance fields',
  'compute-style animation',
  'shader pattern',
];

function tokyoDateParts() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));

  return {
    iso: `${values.year}-${values.month}-${values.day}`,
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
  };
}

function daysBetween(startIso, endIso) {
  const [sy, sm, sd] = startIso.split('-').map(Number);
  const [ey, em, ed] = endIso.split('-').map(Number);
  const start = Date.UTC(sy, sm - 1, sd);
  const end = Date.UTC(ey, em - 1, ed);
  return Math.floor((end - start) / 86400000);
}

function japaneseDate({ year, month, day }) {
  return `${year}年${month}月${day}日`;
}

function readHistory() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter(name => /^daily-\d{4}-\d{2}-\d{2}-.+\.md$/.test(name))
    .map(name => {
      const source = fs.readFileSync(path.join(ARTICLES_DIR, name), 'utf8');
      const parsed = matter(source);
      return {
        slug: name.replace(/\.md$/, ''),
        title: parsed.data.title || '',
        description: parsed.data.description || '',
        focus: parsed.data.focus || '',
        day: Number(parsed.data.day || 0),
        publishedAt: String(parsed.data.publishedAt || ''),
      };
    })
    .sort((a, b) => a.day - b.day);
}

function outputText(response) {
  const text = response?.output
    ?.flatMap(item => item?.content || [])
    ?.find(item => item?.type === 'output_text')?.text;

  if (!text) {
    throw new Error('OpenAI response did not contain output_text.');
  }

  return text;
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function block(value, spaces) {
  const pad = ' '.repeat(spaces);
  return String(value)
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => `${pad}${line}`)
    .join('\n');
}

function uniqueTags(tags, focus) {
  return [...new Set([focus, ...tags, 'Daily Lab', 'アニメーション'])].slice(0, 7);
}

function ensureSafeExperiment(article) {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  if (!slugPattern.test(article.slug)) {
    throw new Error(`Invalid slug: ${article.slug}`);
  }

  if (!article.title || article.title.length < 8) {
    throw new Error('Title is too short.');
  }

  if (!article.description || article.description.length < 30) {
    throw new Error('Description is too short.');
  }

  for (const field of ['html', 'css', 'javascript', 'body_markdown']) {
    if (!article[field] || !String(article[field]).trim()) {
      throw new Error(`${field} is empty.`);
    }
  }

  if (!article.html.includes('daily-stage')) {
    throw new Error('HTML must include a .daily-stage root.');
  }

  const forbidden = [
    /document\.cookie/i,
    /localStorage/i,
    /sessionStorage/i,
    /XMLHttpRequest/i,
    /WebSocket\s*\(/i,
    /fetch\s*\(/i,
    /eval\s*\(/i,
    /new\s+Function\s*\(/i,
  ];

  for (const pattern of forbidden) {
    if (pattern.test(article.javascript)) {
      throw new Error(`Forbidden JavaScript pattern: ${pattern}`);
    }
  }

  const imports = [...article.javascript.matchAll(/from\s+['"]([^'"]+)['"]/g)]
    .map(match => match[1]);

  for (const source of imports) {
    if (
      source !== 'three' &&
      !source.startsWith('three/') &&
      source !== 'three/webgpu' &&
      source !== 'three/tsl'
    ) {
      throw new Error(`Unsupported import source: ${source}`);
    }
  }
}

async function generateArticle({ today, dayNumber, focus, technique, history }) {
  const recentHistory = history.slice(-80);

  const schema = {
    type: 'object',
    additionalProperties: false,
    required: [
      'slug',
      'title',
      'description',
      'tags',
      'concept',
      'html',
      'css',
      'javascript',
      'body_markdown',
    ],
    properties: {
      slug: {
        type: 'string',
        pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
      },
      title: { type: 'string' },
      description: { type: 'string' },
      tags: {
        type: 'array',
        minItems: 2,
        maxItems: 5,
        items: { type: 'string' },
      },
      concept: { type: 'string' },
      html: { type: 'string' },
      css: { type: 'string' },
      javascript: { type: 'string' },
      body_markdown: { type: 'string' },
    },
  };

  const instructions = [
    'あなたはWebグラフィックス専門のシニアクリエイティブデベロッパーです。',
    '365日続くDaily Web Graphics Labの記事と、実際にブラウザで動くデモを1本生成してください。',
    '出力は指定JSON Schemaに厳密に従ってください。',
    '',
    '重要ルール:',
    '- 日本語で執筆する。',
    '- 1記事1テーマ。見せ場を1つに絞る。',
    '- 毎回、前回までと視覚表現・アルゴリズム・インタラクションのうち最低2点を変える。',
    '- デモは画像や動画など外部素材に依存せず、原則としてプロシージャル生成する。',
    '- HTMLには必ず class="daily-stage" のルート要素を1つ置く。',
    '- JavaScriptはES moduleとして実行される。',
    '- Three.js利用時のimportは "three" または "three/..." のみ。',
    '- WebGPUを扱う場合は navigator.gpu 非対応ブラウザ向けの説明表示を必ず用意する。',
    '- requestAnimationFrameやイベントリスナーを使う場合は pagehide で停止・解除するcleanupを実装する。',
    '- CSSはレスポンシブ対応し、canvasはコンテナからはみ出さない。',
    '- fetch、WebSocket、localStorage、cookie、eval、新しいFunctionは禁止。',
    '- 誇張した性能主張や未検証のベンチマークを書かない。',
    '- 記事本文は「今回の表現」「仕組み」「コードの要点」「調整ポイント」「パフォーマンスと後片付け」「次に試せる発展」を含める。',
    '- body_markdownにはfrontmatterを書かない。',
    '- slugは英小文字とハイフンのみ。',
  ].join('\n');

  const prompt = [
    `公開日: ${today.iso}`,
    `Day: ${String(dayNumber).padStart(3, '0')} / 365`,
    `主軸技術: ${focus}`,
    `今回の表現系統: ${technique}`,
    '',
    '直近の公開履歴:',
    JSON.stringify(recentHistory, null, 2),
    '',
    '上記履歴と重複を避け、実際に触って面白い1デモを企画・実装してください。',
    '単なる回転する立方体や色が変わるだけの初歩例は避けてください。',
    'ただし複雑さのための複雑さにはせず、記事1本で理解できる最小構成にしてください。',
  ].join('\n');

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      instructions,
      input: prompt,
      text: {
        format: {
          type: 'json_schema',
          name: 'daily_web_graphics_experiment',
          strict: true,
          schema,
        },
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${body}`);
  }

  const json = await response.json();
  return JSON.parse(outputText(json));
}

function renderMarkdown(article, meta) {
  const tags = uniqueTags(article.tags, meta.focus);

  return `---
title: ${yamlString(article.title)}
description: ${yamlString(article.description)}
category: ${yamlString('3D・WebGL寄り')}
tags:
${tags.map(tag => `  - ${yamlString(tag)}`).join('\n')}
date: ${yamlString(japaneseDate(meta.today))}
publishedAt: ${meta.today.iso}
readTime: ${yamlString('7分')}
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: ${meta.dayNumber}
focus: ${yamlString(meta.focus)}
concept: ${yamlString(article.concept)}
files:
  - name: index.html
    language: html
    content: |
${block(article.html, 6)}
  - name: styles.css
    language: css
    content: |
${block(article.css, 6)}
  - name: experiment.js
    language: javascript
    content: |
${block(article.javascript, 6)}
---

# Day ${String(meta.dayNumber).padStart(3, '0')} — ${article.title}

> 主軸: **${meta.focus}** / テーマ: **${meta.technique}**

${article.body_markdown.trim()}
`;
}

const today = tokyoDateParts();
const dayNumber = daysBetween(SERIES_START, today.iso) + 1;

if (dayNumber < 1) {
  console.log(`Series has not started yet. Start date: ${SERIES_START}`);
  process.exit(0);
}

if (dayNumber > SERIES_LENGTH) {
  console.log('The 365-day series is complete.');
  process.exit(0);
}

const existingToday = fs.existsSync(ARTICLES_DIR)
  ? fs.readdirSync(ARTICLES_DIR).find(name => name.startsWith(`daily-${today.iso}-`))
  : null;

if (existingToday) {
  console.log(`Today's article already exists: ${existingToday}`);
  process.exit(0);
}

const history = readHistory();
const focus = FOCUS_ROTATION[(dayNumber - 1) % FOCUS_ROTATION.length];
const technique = TECHNIQUE_ROTATION[(dayNumber - 1) % TECHNIQUE_ROTATION.length];

const article = await generateArticle({
  today,
  dayNumber,
  focus,
  technique,
  history,
});

ensureSafeExperiment(article);

fs.mkdirSync(ARTICLES_DIR, { recursive: true });

const filename = `daily-${today.iso}-${article.slug}.md`;
const outputPath = path.join(ARTICLES_DIR, filename);

fs.writeFileSync(
  outputPath,
  renderMarkdown(article, {
    today,
    dayNumber,
    focus,
    technique,
  }),
  'utf8'
);

console.log(`Generated Day ${dayNumber}: ${outputPath}`);

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, 'content', 'articles');
const SERIES_START = '2026-10-03';
const SERIES_LENGTH = 365;
const MODEL = process.env.OPENAI_MODEL || 'gpt-6-astra';
const RESEARCH_MODEL = process.env.OPENAI_RESEARCH_MODEL || MODEL;
const API_KEY = process.env.OPENAI_API_KEY;
const MAX_REVISIONS = 2;
const QUALITY_THRESHOLD = 84;

if (!API_KEY) {
  throw new Error('OPENAI_API_KEY is not set.');
}

const FOCUS_ROTATION = ['Three.js', 'GLSL', 'WebGL', 'WebGPU'];

const TECHNIQUE_ROTATION = [
  'editorial slider',
  'drag distortion',
  'scroll-driven reveal',
  'image transition',
  'kinetic typography',
  'particle field',
  'fluid distortion',
  'depth parallax',
  'shader masking',
  'post processing',
  'procedural surface',
  '3D product showcase',
  'infinite gallery',
  'cursor interaction',
  'camera choreography',
  'refractive material',
  'point cloud transition',
  'noise displacement',
  'SDF composition',
  'immersive navigation',
];

const REFERENCE_DOMAINS = [
  'awwwards.com',
  'cssdesignawards.com',
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
  return Math.floor(
    (Date.UTC(ey, em - 1, ed) - Date.UTC(sy, sm - 1, sd)) / 86400000
  );
}

function japaneseDate({ year, month, day }) {
  return `${year}年${month}月${day}日`;
}

function readHistory() {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

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
        category: parsed.data.category || '',
        categorySlug: parsed.data.categorySlug || '',
        referenceTitle: parsed.data.referenceTitle || '',
        referenceUrl: parsed.data.referenceUrl || '',
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

async function callResponses(body) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${detail}`);
  }

  return response.json();
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
  return [...new Set([focus, ...tags, 'Daily Lab'])].slice(0, 8);
}

function articleSchema() {
  return {
    type: 'object',
    additionalProperties: false,
    required: [
      'slug',
      'title',
      'description',
      'category_name',
      'category_slug',
      'category_description',
      'tags',
      'concept',
      'reference_title',
      'reference_url',
      'reference_platform',
      'reference_notes',
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
      category_name: { type: 'string' },
      category_slug: {
        type: 'string',
        pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
      },
      category_description: { type: 'string' },
      tags: {
        type: 'array',
        minItems: 3,
        maxItems: 7,
        items: { type: 'string' },
      },
      concept: { type: 'string' },
      reference_title: { type: 'string' },
      reference_url: { type: 'string' },
      reference_platform: { type: 'string' },
      reference_notes: { type: 'string' },
      html: { type: 'string' },
      css: { type: 'string' },
      javascript: { type: 'string' },
      body_markdown: { type: 'string' },
    },
  };
}

function critiqueSchema() {
  return {
    type: 'object',
    additionalProperties: false,
    required: [
      'score',
      'pass',
      'visual_quality',
      'interaction_quality',
      'technical_quality',
      'production_readiness',
      'reference_study_quality',
      'critical_issues',
      'revision_brief',
    ],
    properties: {
      score: {
        type: 'integer',
        minimum: 0,
        maximum: 100,
      },
      pass: { type: 'boolean' },
      visual_quality: { type: 'string' },
      interaction_quality: { type: 'string' },
      technical_quality: { type: 'string' },
      production_readiness: { type: 'string' },
      reference_study_quality: { type: 'string' },
      critical_issues: {
        type: 'array',
        items: { type: 'string' },
      },
      revision_brief: { type: 'string' },
    },
  };
}

async function researchReference({ focus, technique, dayNumber, history }) {
  const usedReferences = history
    .filter(item => item.referenceUrl)
    .slice(-120)
    .map(item => ({
      title: item.referenceTitle,
      url: item.referenceUrl,
    }));

  const prompt = [
    'Find one strong award-winning or editorially curated web reference for a professional creative-development study.',
    `Primary technology: ${focus}`,
    `Target expression: ${technique}`,
    `Day: ${dayNumber}/365`,
    '',
    'Search Awwwards and CSS Design Awards only.',
    'Prioritize a specific site or specific showcased element that clearly demonstrates WebGL, WebGPU, Three.js, GLSL, shader transitions, 3D motion, or sophisticated interactive motion.',
    'Avoid references already used recently when possible.',
    '',
    'Recently used references:',
    JSON.stringify(usedReferences, null, 2),
    '',
    'Return a concise research memo with:',
    '1. reference title',
    '2. exact source URL',
    '3. platform',
    '4. what interaction or motion technique is worth studying',
    '5. what makes it production-grade',
    '6. what must NOT be copied: branding, text, images, logos, distinctive artwork',
    '7. an implementation hypothesis using Three.js / WebGL / WebGPU / GLSL',
  ].join('\n');

  const response = await callResponses({
    model: RESEARCH_MODEL,
    tools: [
      {
        type: 'web_search',
        filters: {
          allowed_domains: REFERENCE_DOMAINS,
        },
      },
    ],
    tool_choice: 'required',
    input: prompt,
  });

  return outputText(response);
}

async function generateArticle({
  today,
  dayNumber,
  focus,
  technique,
  history,
  researchMemo,
  revisionBrief = '',
  previousArticle = null,
}) {
  const recentHistory = history.slice(-80);

  const instructions = [
    'あなたはAwwwards / CSS Design Awards級の実装を日常的に担当するシニア・クリエイティブデベロッパーです。',
    '目的は「学習用サンプル」ではなく、実案件のHero、Works、Campaign、Brand Siteに転用できる品質のWeb表現を作ることです。',
    '受賞サイトのブランドや素材を複製するのではなく、インタラクション原理、モーション設計、空間構成、シェーダー技法を研究してオリジナル表現へ再構築してください。',
    '出力は指定JSON Schemaに厳密に従ってください。',
    '',
    '品質基準:',
    '- 一目で「サンプルコード」ではなく完成されたデザインスタディに見えること。',
    '- 余白、タイポグラフィ、レイヤー、色、コントラスト、UI状態まで設計すること。',
    '- 主役のWebGL/WebGPU/Three.js/GLSL表現が装飾ではなく、UI体験そのものに関与すること。',
    '- hoverだけ、回転する立方体だけ、単純なグラデーションだけ、2色フェードだけは禁止。',
    '- desktopだけでなくmobileでも成立させること。',
    '- pointer / wheel / drag / scroll / keyboardのうち、その表現に適した操作を最低1つ実装すること。',
    '- requestAnimationFrame、イベント、GPU/Three.jsリソースは必ずcleanupすること。',
    '- devicePixelRatio上限、resize、reduced-motionまたは非対応環境へのフォールバックを考慮すること。',
    '- 実務で調整するパラメータがコードから分かること。',
    '- 外部ブランド名、ロゴ、原文コピー、受賞サイト固有の画像・動画・3Dモデルは使用しないこと。',
    '- 参考元と同一レイアウトをピクセル単位でコピーしないこと。',
    '- 画像が必要ならCSS/SVG/CanvasTexture等でオリジナルのビジュアルを生成すること。',
    '',
    '記事ルール:',
    '- 日本語で執筆する。',
    '- 参考元をreference_title / reference_url / reference_platformで明示する。',
    '- reference_notesには、参考にした要素とオリジナル化した点を簡潔に書く。',
    '- 本文に「参考にした表現」「完成形」「実装設計」「シェーダー/レンダリング」「実務での使いどころ」「調整パラメータ」「パフォーマンスとアクセシビリティ」を含める。',
    '- category_nameは「WebGLスライダー」「Three.jsプロダクト演出」のように技術×用途で具体化する。',
    '- 既存履歴に近いcategory_slugがある場合は再利用する。',
    '- HTMLには class="daily-stage" のルート要素を必ず置く。',
    '- JavaScriptはES moduleで動作すること。',
    '- Three.js importは "three" または "three/..." のみ。',
    '- fetch / WebSocket / localStorage / cookie / eval / new Functionは禁止。',
  ].join('\n');

  const promptParts = [
    `公開日: ${today.iso}`,
    `Day: ${String(dayNumber).padStart(3, '0')} / 365`,
    `主軸技術: ${focus}`,
    `今回の表現系統: ${technique}`,
    '',
    '## Award reference research',
    researchMemo,
    '',
    '## Recent article history',
    JSON.stringify(recentHistory, null, 2),
  ];

  if (previousArticle && revisionBrief) {
    promptParts.push(
      '',
      '## Previous generated version',
      JSON.stringify(previousArticle, null, 2),
      '',
      '## Mandatory revision brief',
      revisionBrief,
      '',
      '前版の弱点を必ず解消し、コード量を減らすために品質を落とさないでください。'
    );
  } else {
    promptParts.push(
      '',
      '上記の参考表現を、ブランドや素材をコピーせず、実務で使えるオリジナルのデザインスタディとして再構築してください。'
    );
  }

  const response = await callResponses({
    model: MODEL,
    instructions,
    input: promptParts.join('\n'),
    text: {
      format: {
        type: 'json_schema',
        name: 'award_reference_web_experiment',
        strict: true,
        schema: articleSchema(),
      },
    },
  });

  return JSON.parse(outputText(response));
}

async function critiqueArticle({ article, researchMemo, focus, technique }) {
  const response = await callResponses({
    model: MODEL,
    instructions: [
      'あなたは受託制作会社のCreative Director兼Lead Creative Developerです。',
      '提出されたデモが実案件の提案・実装に耐えるか厳しくレビューしてください。',
      '教材として動くかではなく、実務品質かどうかを判定します。',
      '',
      '採点観点:',
      '- Visual composition: 余白、タイポ、色、階層、画面密度',
      '- Interaction: 操作の必然性、滑らかさ、状態遷移、触って気持ちよいか',
      '- Technical depth: GPU/Three.js/GLSLが本当に主役か',
      '- Production readiness: responsive、cleanup、performance、fallback、accessibility',
      '- Reference study: 参考元の強みを抽出しつつコピーではなく独自化できているか',
      '',
      `合格目安は総合${QUALITY_THRESHOLD}点以上。凡庸なデモは70点未満にしてください。`,
    ].join('\n'),
    input: [
      `Focus: ${focus}`,
      `Technique: ${technique}`,
      '',
      'Reference research:',
      researchMemo,
      '',
      'Generated article:',
      JSON.stringify(article, null, 2),
    ].join('\n'),
    text: {
      format: {
        type: 'json_schema',
        name: 'creative_quality_review',
        strict: true,
        schema: critiqueSchema(),
      },
    },
  });

  return JSON.parse(outputText(response));
}

function ensureSafeExperiment(article) {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  if (!slugPattern.test(article.slug)) {
    throw new Error(`Invalid slug: ${article.slug}`);
  }

  if (!slugPattern.test(article.category_slug)) {
    throw new Error(`Invalid category slug: ${article.category_slug}`);
  }

  if (!/^https:\/\//.test(article.reference_url)) {
    throw new Error('reference_url must be an https URL.');
  }

  for (const field of [
    'title',
    'description',
    'category_name',
    'category_description',
    'concept',
    'reference_title',
    'reference_platform',
    'reference_notes',
    'html',
    'css',
    'javascript',
    'body_markdown',
  ]) {
    if (!String(article[field] || '').trim()) {
      throw new Error(`${field} is empty.`);
    }
  }

  if (!article.html.includes('daily-stage')) {
    throw new Error('HTML must include a .daily-stage root.');
  }

  if (article.javascript.length < 2500) {
    throw new Error('JavaScript is too small for a production-grade graphics study.');
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

function renderMarkdown(article, meta, critique) {
  const tags = uniqueTags(article.tags, meta.focus);

  return `---
title: ${yamlString(article.title)}
description: ${yamlString(article.description)}
category: ${yamlString(article.category_name)}
categorySlug: ${yamlString(article.category_slug)}
categoryDescription: ${yamlString(article.category_description)}
tags:
${tags.map(tag => `  - ${yamlString(tag)}`).join('\n')}
date: ${yamlString(japaneseDate(meta.today))}
publishedAt: ${meta.today.iso}
readTime: ${yamlString('10分')}
viewer: playground
thumbnail: runtime
layout: tutorial
dailyLab: true
day: ${meta.dayNumber}
focus: ${yamlString(meta.focus)}
concept: ${yamlString(article.concept)}
referenceTitle: ${yamlString(article.reference_title)}
referenceUrl: ${yamlString(article.reference_url)}
referencePlatform: ${yamlString(article.reference_platform)}
qualityScore: ${critique.score}
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

> **Reference study:** [${article.reference_title}](${article.reference_url}) / ${article.reference_platform}  
> **主軸:** ${meta.focus} / **品質レビュー:** ${critique.score}/100

${article.reference_notes}

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

console.log(`Researching award reference for Day ${dayNumber}...`);
const researchMemo = await researchReference({
  focus,
  technique,
  dayNumber,
  history,
});

let article = await generateArticle({
  today,
  dayNumber,
  focus,
  technique,
  history,
  researchMemo,
});

ensureSafeExperiment(article);

let critique = await critiqueArticle({
  article,
  researchMemo,
  focus,
  technique,
});

for (
  let revision = 0;
  revision < MAX_REVISIONS &&
  (!critique.pass || critique.score < QUALITY_THRESHOLD);
  revision += 1
) {
  console.log(
    `Quality gate failed (${critique.score}/100). Revision ${revision + 1}/${MAX_REVISIONS}...`
  );

  article = await generateArticle({
    today,
    dayNumber,
    focus,
    technique,
    history,
    researchMemo,
    revisionBrief: critique.revision_brief,
    previousArticle: article,
  });

  ensureSafeExperiment(article);

  critique = await critiqueArticle({
    article,
    researchMemo,
    focus,
    technique,
  });
}

if (!critique.pass || critique.score < QUALITY_THRESHOLD) {
  throw new Error(
    `Creative quality gate failed after revisions: ${critique.score}/100 - ${critique.revision_brief}`
  );
}

fs.mkdirSync(ARTICLES_DIR, { recursive: true });

const filename = `daily-${today.iso}-${article.slug}.md`;
const outputPath = path.join(ARTICLES_DIR, filename);

fs.writeFileSync(
  outputPath,
  renderMarkdown(
    article,
    {
      today,
      dayNumber,
      focus,
      technique,
    },
    critique
  ),
  'utf8'
);

console.log(
  `Generated Day ${dayNumber}: ${outputPath} (quality ${critique.score}/100)`
);

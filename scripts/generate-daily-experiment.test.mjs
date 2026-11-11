import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const script = fileURLToPath(new URL('./generate-daily-experiment.mjs', import.meta.url));
const article = {
  slug: 'test-study', title: 'Test', description: 'Test',
  category_name: 'Test', category_slug: 'test', category_description: 'Test',
  tags: ['test'], concept: 'Test', reference_title: 'Reference',
  reference_url: 'https://www.awwwards.com/', reference_platform: 'Awwwards',
  reference_notes: 'Test', html: '<div class="daily-stage"></div>',
  css: '.daily-stage { color: black; }', javascript: '// test code\n'.repeat(250),
  body_markdown: '## Test\nTest article.',
};
const critique = {
  score: 78, pass: false,
  visual_quality: 'Test', interaction_quality: 'Test', technical_quality: 'Test',
  production_readiness: 'Test', reference_study_quality: 'Test',
  critical_issues: ['unique issue: updateHistory runs on every frame'],
  revision_brief: 'Move history updates to chapter changes.',
};

for (const passes of [false, true]) {
  test(`generator ${passes ? 'publishes a passing revision' : 'rejects low quality'} and preserves diagnostics`, () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'daily-lab-test-'));
    try {
      const preload = path.join(root, 'mock.mjs');
      fs.writeFileSync(preload, `
        import fs from 'node:fs';
        const NativeDate = Date;
        globalThis.Date = class extends NativeDate {
          constructor(...args) { super(...(args.length ? args : ['2026-11-11T00:00:00Z'])); }
        };
        let reviews = 0;
        const requests = [];
        globalThis.fetch = async (_url, options) => {
          const body = JSON.parse(options.body);
          requests.push(body);
          fs.writeFileSync('requests.json', JSON.stringify(requests));
          let result = 'Research memo';
          const name = body.text?.format?.name;
          if (name === 'award_reference_web_experiment') result = JSON.stringify(${JSON.stringify(article)});
          if (name === 'creative_quality_review') {
            reviews += 1;
            const critique = ${JSON.stringify(critique)};
            if (${passes} && reviews === 3) { critique.score = 88; critique.pass = true; critique.critical_issues = []; }
            result = JSON.stringify(critique);
          }
          return Response.json({ id: 'resp_test', status: 'completed', output: [{ content: [{ type: 'output_text', text: result }] }] });
        };
      `);
      const result = spawnSync(process.execPath, ['--import', preload, script], {
        cwd: root,
        env: { ...process.env, OPENAI_API_KEY: 'test-key' },
        encoding: 'utf8', timeout: 10_000,
      });
      assert.equal(result.status, passes ? 0 : 1, result.stderr);
      const reports = path.join(root, 'artifacts', 'daily-lab');
      for (let revision = 0; revision <= 2; revision += 1) {
        assert.deepEqual(JSON.parse(fs.readFileSync(path.join(reports, `candidate-${revision}.json`))), article);
        assert.ok(fs.existsSync(path.join(reports, `review-${revision}.json`)));
      }
      const requests = JSON.parse(fs.readFileSync(path.join(root, 'requests.json')));
      assert.equal(requests.length, 7);
      assert.ok(requests[3].input.includes(critique.critical_issues[0]));
      assert.ok(requests[4].input.includes(critique.critical_issues[0]));
      const articlesDir = path.join(root, 'content', 'articles');
      if (passes) {
        const names = fs.readdirSync(articlesDir);
        assert.equal(names.length, 1);
        assert.match(fs.readFileSync(path.join(articlesDir, names[0]), 'utf8'), /qualityScore: 88/);
      } else {
        assert.match(result.stderr, /Creative quality gate failed after revisions: 78\/100/);
        assert.equal(fs.existsSync(articlesDir), false);
      }
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
}

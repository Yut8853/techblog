import assert from 'node:assert/strict';
import test from 'node:test';
import { callResponses } from './openai-responses.mjs';

const defaults = {
  apiKey: 'test-key',
  label: 'test-stage',
  sleep: async () => {},
  logger: { log() {}, warn() {} },
};

test('retries connection failures and body read failures', async () => {
  for (const bodyFailure of [false, true]) {
    let calls = 0;
    const result = await callResponses({}, {
      ...defaults,
      fetchImpl: async () => {
        calls += 1;
        if (calls === 2) return Response.json({ output: 'ok' });
        const fail = () => { throw new TypeError('fetch failed', { cause: { code: 'ECONNRESET' } }); };
        if (bodyFailure) return { ok: true, json: fail };
        return fail();
      },
    });
    assert.deepEqual(result, { output: 'ok' });
    assert.equal(calls, 2);
  }
});

test('deadline covers both initial fetch and response body; stops after two attempts', async () => {
  // AbortSignal.timeout is unref'ed; keep the test process alive while waiting.
  const keepAlive = setInterval(() => {}, 1000);
  try {
    for (const bodyFailure of [false, true]) {
      let calls = 0;
      await assert.rejects(callResponses({}, {
        ...defaults,
        timeoutMs: 10,
        fetchImpl: async (_url, { signal }) => {
          calls += 1;
          const wait = () => new Promise((resolve, reject) => {
            signal.addEventListener('abort', () => reject(signal.reason), { once: true });
          });
          return bodyFailure ? { ok: true, json: wait } : wait();
        },
      }), /test-stage.*attempt 2\/2.*TimeoutError/);
      assert.equal(calls, 2);
    }
  } finally {
    clearInterval(keepAlive);
  }
});

test('retries transient HTTP errors but fails immediately for authentication errors', async () => {
  for (const status of [408, 409, 429, 500, 503, 401]) {
    let calls = 0;
    await assert.rejects(callResponses({}, {
      ...defaults,
      fetchImpl: async () => {
        calls += 1;
        return new Response('error', { status });
      },
    }), new RegExp(`OpenAI API error ${status}`));
    assert.equal(calls, status === 401 ? 1 : 2);
  }
});

test('invalid JSON does not trigger another paid generation', async () => {
  let calls = 0;
  await assert.rejects(callResponses({}, {
    ...defaults,
    fetchImpl: async () => {
      calls += 1;
      return new Response('not json');
    },
  }), /SyntaxError/);
  assert.equal(calls, 1);
});

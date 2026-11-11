import assert from 'node:assert/strict';
import test from 'node:test';
import { requestJson as callResponses, callResponses as backgroundResponse } from './openai-responses.mjs';

const defaults = {
  apiKey: 'test-key',
  label: 'test-stage',
  sleep: async () => {},
  logger: { log() {}, warn() {} },
};

test('background generation can exceed 120s; a failed poll retrieves the same ID', async () => {
  let clock = 0;
  const requests = [];
  const results = [
    { id: 'resp_test', status: 'queued' },
    { id: 'resp_test', status: 'in_progress' },
    new TypeError('fetch failed'),
    { id: 'resp_test', status: 'completed', output: ['done'] },
  ];
  const result = await backgroundResponse({ model: 'test-model' }, {
    ...defaults,
    now: () => clock,
    pollIntervalMs: 90_000,
    sleep: async ms => { clock += ms; },
    fetchImpl: async (url, options) => {
      requests.push({ url, ...options });
      const result = results.shift();
      if (result instanceof Error) throw result;
      return Response.json(result);
    },
  });
  assert.equal(result.status, 'completed');
  assert.ok(clock > 120_000);
  assert.equal(requests.filter(r => r.method === 'POST').length, 1);
  assert.deepEqual(JSON.parse(requests[0].body), { model: 'test-model', background: true, store: true });
  for (const request of requests.slice(1)) {
    assert.equal(request.url, 'https://api.openai.com/v1/responses/resp_test');
    assert.equal(request.method, 'GET');
    assert.equal(request.body, undefined);
  }
});

test('generation deadline cancels the pending response without resubmitting', async () => {
  let clock = 0;
  const requests = [];
  await assert.rejects(backgroundResponse({}, {
    ...defaults,
    generationTimeoutMs: 100,
    now: () => clock,
    sleep: async ms => { clock += ms; },
    fetchImpl: async (url, options) => {
      requests.push({ url, ...options });
      return Response.json({ id: 'resp_test', status: url.endsWith('/cancel') ? 'cancelled' : 'queued' });
    },
  }), /generation deadline exceeded/);
  assert.equal(clock, 100);
  assert.equal(requests.length, 2);
  assert.ok(requests[1].url.endsWith('/resp_test/cancel'));
});

test('terminal failures and incomplete output are rejected', async () => {
  for (const status of ['failed', 'cancelled', 'incomplete']) {
    await assert.rejects(backgroundResponse({}, {
      ...defaults,
      fetchImpl: async () => Response.json({ id: 'resp_test', status, incomplete_details: { reason: 'max_output_tokens' } }),
    }), new RegExp(`resp_test: ${status}`));
  }
});

test('ambiguous background creation failure is never resubmitted', async () => {
  let calls = 0;
  await assert.rejects(backgroundResponse({}, {
    ...defaults,
    fetchImpl: async () => { calls += 1; throw new TypeError('fetch failed'); },
  }), /fetch failed/);
  assert.equal(calls, 1);
});

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

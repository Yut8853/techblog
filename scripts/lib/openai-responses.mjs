const RESPONSES_URL = 'https://api.openai.com/v1/responses';

export async function callResponses(body, {
  generationTimeoutMs = 600_000,
  pollIntervalMs = 15_000,
  now = Date.now,
  sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),
  logger = console,
  ...options
}) {
  const started = now();
  const deadline = started + generationTimeoutMs;
  const requestOptions = { ...options, now, sleep, logger, deadline };
  // Do not resubmit an ambiguous creation failure: the server may already
  // have started it. Once an ID is known, retry only retrieval of that ID.
  let response = await requestJson({ ...body, background: true, store: true }, {
    ...requestOptions,
    maxAttempts: 1,
  });
  const id = response.id;
  if (typeof id !== 'string' || !id) {
    throw new Error(`[${options.label}] background response has no ID`);
  }
  const url = `${RESPONSES_URL}/${encodeURIComponent(id)}`;
  const pending = () => ['queued', 'in_progress'].includes(response.status);

  try {
    while (pending()) {
      logger.log(`[${options.label}] ${id}: ${response.status} (${((now() - started) / 1000).toFixed(1)}s elapsed)`);
      if (now() >= deadline) throw new Error(`[${options.label}] generation deadline exceeded (${generationTimeoutMs / 1000}s)`);
      await sleep(Math.min(pollIntervalMs, deadline - now()));
      response = await requestJson(undefined, { ...requestOptions, url, method: 'GET' });
    }
    if (response.status !== 'completed') {
      throw new Error(`[${options.label}] ${id}: ${response.status}: ${JSON.stringify(response.error || response.incomplete_details || {})}`);
    }
    logger.log(`[${options.label}] generation completed in ${((now() - started) / 1000).toFixed(1)}s`);
    return response;
  } catch (error) {
    if (pending()) {
      // The last poll can be stale when the deadline expires. Give cleanup
      // requests their own short deadlines, never restart the generation.
      const recoveryOptions = {
        ...requestOptions,
        deadline: Infinity,
        timeoutMs: 10_000,
        maxAttempts: 1,
      };
      const retrieveLatest = async () => {
        try {
          response = await requestJson(undefined, { ...recoveryOptions, url, method: 'GET' });
        } catch (retrieveError) {
          logger.warn(`[${options.label}] could not retrieve final state for ${id}: ${retrieveError.message}`);
        }
      };
      const recovered = () => {
        logger.log(`[${options.label}] recovered completed response ${id} after ${((now() - started) / 1000).toFixed(1)}s`);
        return response;
      };

      await retrieveLatest();
      if (response.status === 'completed') return recovered();
      if (!pending()) throw error;

      try {
        response = await requestJson(undefined, {
          ...recoveryOptions,
          url: `${url}/cancel`,
          method: 'POST',
        });
      } catch (cancelError) {
        logger.warn(`[${options.label}] could not cancel ${id}: ${cancelError.message}`);
        // Completion may race cancellation (including HTTP 400 "completed").
        // Only a retrieved completed response can turn this into success.
        await retrieveLatest();
      }
      if (response.status === 'completed') return recovered();
    }
    throw error;
  }
}

export async function requestJson(body, {
  apiKey,
  label,
  timeoutMs = 120_000,
  fetchImpl = fetch,
  sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),
  logger = console,
  url = 'https://api.openai.com/v1/responses',
  method = 'POST',
  maxAttempts = 2,
  deadline = Infinity,
  now = Date.now,
}) {

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const started = now();
    const remaining = Math.floor(deadline - started);
    if (remaining <= 0) throw new Error(`[${label}] generation deadline exceeded`);
    const requestTimeout = Math.min(timeoutMs, remaining);
    let retryable = true;
    logger.log(`[${label}] attempt ${attempt}/${maxAttempts} (timeout ${requestTimeout / 1000}s)`);

    try {
      const response = await fetchImpl(url, {
        method,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(requestTimeout),
      });

      if (!response.ok) {
        retryable = [408, 409, 429].includes(response.status) || response.status >= 500;
        const detail = await response.text();
        throw new Error(`OpenAI API error ${response.status}: ${detail}`);
      }

      // Keep body consumption inside the retry boundary: headers may arrive
      // before a connection fails or the request deadline expires.
      const result = await response.json();
      logger.log(`[${label}] completed in ${((now() - started) / 1000).toFixed(1)}s`);
      return result;
    } catch (error) {
      const reason = [error.name, error.message, error.cause?.code].filter(Boolean).join(': ');
      const detail = `[${label}] attempt ${attempt}/${maxAttempts} failed after ${((now() - started) / 1000).toFixed(1)}s: ${reason}`;
      if (!retryable || error instanceof SyntaxError || attempt === maxAttempts) {
        throw new Error(detail, { cause: error });
      }
      logger.warn(`${detail}; retrying in 2s.`);
      await sleep(Math.min(2000, Math.max(0, deadline - now())));
    }
  }
}

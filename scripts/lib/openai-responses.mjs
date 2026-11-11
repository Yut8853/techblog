export async function callResponses(body, {
  apiKey,
  label,
  timeoutMs = 120_000,
  fetchImpl = fetch,
  sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),
  logger = console,
}) {
  const maxAttempts = 2;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const started = Date.now();
    let retryable = true;
    logger.log(`[${label}] attempt ${attempt}/${maxAttempts} (timeout ${timeoutMs / 1000}s)`);

    try {
      const response = await fetchImpl('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(timeoutMs),
      });

      if (!response.ok) {
        retryable = [408, 409, 429].includes(response.status) || response.status >= 500;
        const detail = await response.text();
        throw new Error(`OpenAI API error ${response.status}: ${detail}`);
      }

      // Keep body consumption inside the retry boundary: headers may arrive
      // before a connection fails or the request deadline expires.
      const result = await response.json();
      logger.log(`[${label}] completed in ${((Date.now() - started) / 1000).toFixed(1)}s`);
      return result;
    } catch (error) {
      const reason = [error.name, error.message, error.cause?.code].filter(Boolean).join(': ');
      const detail = `[${label}] attempt ${attempt}/${maxAttempts} failed after ${((Date.now() - started) / 1000).toFixed(1)}s: ${reason}`;
      if (!retryable || error instanceof SyntaxError || attempt === maxAttempts) {
        throw new Error(detail, { cause: error });
      }
      logger.warn(`${detail}; retrying in 2s.`);
      await sleep(2000);
    }
  }
}

import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

const validation = z
  .object({
    page: z.coerce.number().min(0).max(10).optional().default(0),
  })
  .strict();

const inMemoryRateLimiter = new Map<string, number>();
const period = 2_000;

export const scenarioRateLimit: FastifyPluginCallback = (fastify, _, done) => {
  const handler = async function (
    req: FastifyRequest<{
      Params: { code: string };
      Querystring: { format?: string };
    }>,
    res: FastifyReply
  ) {
    const val = validation.safeParse({ ...req.query, ...req.params });
    if (val.error) {
      await res
        .status(400)
        .send({ error: { code: 'invalid_payload', message: val.error } });
      return;
    }

    if (val.data.page === 0) {
      return res.status(200).type('text/html').send(`<!DOCTYPE html>
<html>
  <body>
    <h1>Homepage</h1>
    <a href="/scenario/rateLimit?page=1">Page</a>
    <a href="/scenario/rateLimit?page=2">Page</a>
    <a href="/scenario/rateLimit?page=3">Page</a>
    <a href="/scenario/rateLimit?page=4">Page</a>
    <a href="/scenario/rateLimit?page=5">Page</a>
  </body>
</html>`);
    }

    const ip = req.ips?.join(',') || req.ip;
    const lastReq = inMemoryRateLimiter.get(ip);
    const now = Date.now();
    if (lastReq && lastReq + period >= now) {
      return res
        .status(429)
        .type('text/html')
        .header('x-ratelimit-limit', 0)
        .header('x-ratelimit-remaining', 0)
        .header(
          'X-RateLimit-Reset',
          Math.round((period - (now - lastReq)) / 1000)
        )
        .send('Rate limited');
    }

    inMemoryRateLimiter.set(ip, now);

    return res.status(200).type('text/html').send(`<!DOCTYPE html>
        <html>
          <body>
            <h1>Page ${val.data.page}</h1>
          </body>
        </html>`);
  };

  fastify.get('/', handler);

  done();
};

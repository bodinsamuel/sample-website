import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

const validation = z
  .object({
    succeedAfter: z.coerce.number().min(1).max(20),
  })
  .strict();

const inMemoryRateLimiter = new Map<string, number>();

export const scenarioRateLimitUntil200: FastifyPluginCallback = (
  fastify,
  _,
  done
) => {
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

    const ip = req.ips?.join(',') || req.ip;
    const numReq = inMemoryRateLimiter.get(ip) || 1;
    inMemoryRateLimiter.set(ip, numReq + 1);
    if (numReq < val.data.succeedAfter) {
      return res
        .status(429)
        .type('text/html')
        .header('x-ratelimit-limit', 0)
        .header('x-ratelimit-remaining', 0)
        .header('X-RateLimit-Reset', 1)
        .send('Rate limited');
    }

    inMemoryRateLimiter.delete(ip);
    return res.status(200).type('text/html').send(`<!DOCTYPE html>
        <html>
          <body>
            <h1>Page ${numReq}</h1>
          </body>
        </html>`);
  };

  fastify.get('/', handler);

  done();
};

import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { formatQueryParams, formatRes } from '../common/format.js';

const validation = z.object({
  format: formatQueryParams.shape.format,
}); // not strict on purpose

export const echo: FastifyPluginCallback = (fastify, _, done) => {
  const handler = async function (
    req: FastifyRequest<{
      Querystring: { format?: string };
    }>,
    res: FastifyReply
  ) {
    const val = validation.safeParse(req.query);
    if (val.error) {
      await res
        .status(400)
        .send({ error: { code: 'invalid_payload', message: val.error } });
      return;
    }

    const body = {
      date: new Date(),
      headers: req.headers,
      body: req.body || null,
      querystring: req.query,
      ip: req.ips,
    };

    await formatRes({
      res: res.status(200),
      format: val.data.format,
      content: body,
    });
  };

  fastify.get('/', handler);
  fastify.post('/', handler);
  fastify.put('/', handler);
  fastify.patch('/', handler);
  fastify.delete('/', handler);

  done();
};

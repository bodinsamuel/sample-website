import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { outputStatus } from './utils.js';

const validation = z
  .object({
    format: z.enum(['json', 'html', 'xml']).default('json'),
    code: z.coerce.number(),
  })
  .strict();

export const statusCode: FastifyPluginCallback = (fastify, _, done) => {
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

    await outputStatus({ res, ...val.data });
  };

  fastify.get('/', handler);
  fastify.post('/', handler);
  fastify.put('/', handler);
  fastify.patch('/', handler);
  fastify.delete('/', handler);

  done();
};

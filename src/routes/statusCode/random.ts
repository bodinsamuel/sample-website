import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { outputStatus, statusCodes } from './utils.js';

const validation = z
  .object({
    format: z.enum(['json', 'html', 'xml']).default('json').optional(),
  })
  .strict();

export const random: FastifyPluginCallback = (fastify, _, done) => {
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

    const rand = statusCodes[Math.floor(Math.random() * statusCodes.length)];
    await outputStatus({ res, code: rand, ...val.data });
  };

  fastify.get('/', handler);
  fastify.post('/', handler);
  fastify.put('/', handler);
  fastify.patch('/', handler);
  fastify.delete('/', handler);

  done();
};

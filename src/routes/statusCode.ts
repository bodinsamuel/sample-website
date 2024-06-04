import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { formatRes } from '../common/format.js';

const validation = z.object({
  format: z.enum(['json', 'html', 'xml']).default('json'),
  code: z.coerce.number(),
});

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
      await res.status(400).send({ error: 'invalid_payload' });
      return;
    }

    const data = val.data;
    if (data.code === 204) {
      await res.status(data.code).send();
      return;
    } else if (
      data.code === 301 ||
      data.code === 302 ||
      data.code === 303 ||
      data.code === 307 ||
      data.code === 308
    ) {
      await res
        .status(data.code)
        .header('Location', '/0/statusCode/200')
        .send();
    }

    await formatRes(res.status(data.code), data.format, {
      statusCode: data.code,
    });
  };

  fastify.get('/:code', handler);
  fastify.post('/:code', handler);
  fastify.put('/:code', handler);
  fastify.patch('/:code', handler);
  fastify.delete('/:code', handler);

  done();
};

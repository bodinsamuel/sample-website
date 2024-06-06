import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { formatRes } from '../../common/format.js';

const validation = z
  .object({
    format: z.enum(['json', 'html', 'xml']).default('json'),
  })
  .strict();

function enforceEncoding(req: FastifyRequest<any>, _: any, next: () => void) {
  req.headers['accept-encoding'] = 'deflate';
  next();
}

export const compressionDeflate: FastifyPluginCallback = (fastify, _, done) => {
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

    await formatRes({
      res: res.status(200),
      format: val.data.format,
      content: { message: 'Hello World deflate' },
      autoType: false,
    });
  };

  fastify.get('/', { preHandler: [enforceEncoding] }, handler);
  fastify.post('/', { preHandler: [enforceEncoding] }, handler);
  fastify.put('/', { preHandler: [enforceEncoding] }, handler);
  fastify.patch('/', { preHandler: [enforceEncoding] }, handler);
  fastify.delete('/', { preHandler: [enforceEncoding] }, handler);

  done();
};

import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';

import { formatQueryParams, formatRes } from '../common/format.js';
import { list } from '../list.js';

export const root: FastifyPluginCallback = (fastify, _, done) => {
  const handler = async function (
    req: FastifyRequest<{
      Querystring: { format?: string };
    }>,
    res: FastifyReply
  ) {
    const val = formatQueryParams.safeParse(req.query);
    if (val.error) {
      await res
        .status(400)
        .send({ error: { code: 'invalid_payload', message: val.error } });
      return;
    }

    await formatRes({
      res,
      format: val.data.format,
      content: list,
    });
  };

  fastify.get('/', handler);

  done();
};

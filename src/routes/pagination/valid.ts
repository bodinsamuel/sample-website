import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { formatQueryParams } from '../../common/format.js';

const validation = formatQueryParams
  .extend({
    page: z.coerce.number().min(0).optional().default(0),
  })
  .strict();

export const paginationValid: FastifyPluginCallback = (fastify, _, done) => {
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

    if (val.data.page <= 2) {
      return res.status(200).type('html').send(`<!DOCTYPE html>
<html>
  <body>
    <h1>Current page: ${val.data.page}</h1>
    <a href="/pagination/valid">Page 0</a>
    <a href="/pagination/valid?page=1">Page 1</a>
    <a href="/pagination/valid?page=2">Page 2</a>
  </body>
</html>`);
    }
    return res.status(400).type('html').send(`<!DOCTYPE html>
<html>
  <body>
    404
  </body>
</html>`);
  };

  fastify.get('/', handler);

  done();
};

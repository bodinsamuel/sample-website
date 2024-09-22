import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';

export const redirectInfinite: FastifyPluginCallback = (fastify, _, done) => {
  const handler = async function (
    req: FastifyRequest<{
      Params: { code: string };
      Querystring: { format?: string };
    }>,
    res: FastifyReply
  ) {
    await res.redirect('/statusCode/redirect.infinite');
  };

  fastify.get('/', handler);

  done();
};

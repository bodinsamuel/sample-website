import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';

export const redirectBroken: FastifyPluginCallback = (fastify, _, done) => {
  const handler = async function (
    req: FastifyRequest<{
      Params: { code: string };
      Querystring: { format?: string };
    }>,
    res: FastifyReply
  ) {
    await res.redirect('/statusCode/404');
  };

  fastify.get('/', handler);

  done();
};

import { FastifyPluginCallback } from 'fastify';

export const statusCode: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get<{ Params: { code: string } }>(
    '/:code',
    async function (req, res) {
      const code = parseInt(req.params.code, 10);
      if (code < 100 || code > 561) {
        await res.status(400).send({ code: 'invalid_status_code' });
        return;
      }

      await res.status(code).send({ statusCode: code });
    }
  );
  done();
};

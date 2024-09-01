import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';

import { formatQueryParams, formatRes } from '../common/format.js';

export const list = {
  general: [
    {
      path: '/echo/',
      desc: 'Output your HTTP call details',
    },
  ],
  statusCode: [
    {
      path: '/statusCode/random/',
      desc: 'Get a random HTTP code',
    },
    {
      path: '/statusCode/:code/',
      desc: 'Get the specified HTTP code',
    },
  ],
  compression: [
    {
      path: '/compression/brotly/',
      desc: 'Get a page compressed with brotly',
    },
    {
      path: '/compression/gzip/',
      desc: 'Get a page compressed with gzip',
    },
    {
      path: '/compression/deflate/',
      desc: 'Get a page compressed with deflate',
    },
  ],
  json: [
    { path: '/json/valid.json' },
    { path: '/json/broken.json' },
    { path: '/json/invalid.json' },
  ],
  html: [
    { path: '/html/all_tags.html' },
    { path: '/html/valid.html' },
    { path: '/html/broken.html' },
    { path: '/html/js/redirect.html' },
    { path: '/html/json-ld/newsarticle.html' },
    { path: '/html/json-ld/organization.html' },
    { path: '/html/meta/canonical_absolute.html' },
    { path: '/html/meta/canonical_nodomain.html' },
    { path: '/html/meta/canonical_relative.html' },
    { path: '/html/meta/http_equiv.html' },
    { path: '/html/meta/link_nofollow.html' },
    { path: '/html/meta/robots_nofollow.html' },
    { path: '/html/meta/robots_noindex.html' },
  ],
  robots_txt: [
    { path: '/robots_txt/index.html' },
    { path: '/robots_txt/no_index.html' },
  ],
  csv: [{ path: '/csv/valid.csv' }, { path: '/csv/broken.csv' }],
};

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

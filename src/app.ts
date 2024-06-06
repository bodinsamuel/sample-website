import path from 'node:path';

import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import staticFiles from '@fastify/static';
import rawBody from 'fastify-raw-body';
import compress from '@fastify/compress';
import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyServerOptions,
} from 'fastify';

import { routes } from './routes/routes.js';
import { dirname } from './env.js';

export default async (f: FastifyInstance, opts: FastifyPluginOptions) => {
  f.addHook('onRequest', (req, _res, done) => {
    console.log(`#${req.id} <- ${req.method} ${req.url}`);
    done();
  });
  f.addHook('onResponse', (_, res, done) => {
    console.log(`#${res.request.id} -> ${res.statusCode}`);
    done();
  });

  await f.register(cors, {
    origin: ['http://localhost:3000', 'https://vercel.specfy.io'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  f.setErrorHandler(async function (error, _req, res) {
    console.error(error instanceof Error ? error.message : error);

    await res.status(500).send({
      error: {
        code: 'server_error',
        message: 'This is an actual server error',
      },
    });
  });

  f.setNotFoundHandler(async function (req, res) {
    await res.status(404).send({
      error: {
        code: '404_not_found',
        message: 'This endpoint does not exists',
      },
    });
  });

  await f.register(staticFiles, {
    root: path.join(dirname, '../public'),
    prefix: '/',
  });

  await f.register(rawBody, {
    field: 'rawBody',
    global: false,
    encoding: 'utf8',
    runFirst: true,
  });

  await f.register(compress, { global: true, threshold: 1 });

  f.removeAllContentTypeParsers();
  f.addContentTypeParser(
    'application/json',
    { parseAs: 'string', bodyLimit: 10971520 },
    function (_req, body, done) {
      try {
        done(null, JSON.parse(body as string));
      } catch (err: unknown) {
        done(new Error('failed to parse json'), undefined);
      }
    }
  );

  await f.register(rateLimit, {
    global: true,
    max: 2000,
    ban: 10,
    timeWindow: 60 * 5 * 1000,
    hook: 'preHandler',
    cache: 10000,
    allowList: [],
    continueExceeding: true,
    skipOnError: true,
    addHeadersOnExceeding: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
    },
    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
      'retry-after': true,
    },
    keyGenerator: (req) => {
      return req.ip;
    },
  });

  await routes(f, opts);
};

export const options: FastifyServerOptions = {
  // logger: l.child({ svc: 'api' }),
  trustProxy: true,
  logger: false,
};

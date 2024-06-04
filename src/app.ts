import path from 'node:path';

import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import staticFiles from '@fastify/static';

import rawBody from 'fastify-raw-body';

import { routes } from './routes/routes.js';
import './types/auth.js';

import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyServerOptions,
} from 'fastify';
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

  f.setErrorHandler(function (error, _req, res) {
    console.error(error instanceof Error ? error.message : error);

    res.status(500).send({ code: 'server_error'});
  });

  f.setNotFoundHandler(function (req, res) {
    res.status(404).send({ code: '404_not_found'});
  });

  await f.register(staticFiles, {
    root: path.join(dirname, '..', 'api/src/public'),
    prefix: '/',
  });

  await f.register(rawBody, {
    field: 'rawBody',
    global: false,
    encoding: 'utf8',
    runFirst: true,
  });

  f.removeAllContentTypeParsers();
  f.addContentTypeParser(
    'application/json',
    { parseAs: 'string', bodyLimit: 10971520 },
    function (_req, body, done) {
      try {
        const json = JSON.parse(body as string);
        done(null, json);
      } catch (err: unknown) {
        (err as any).statusCode = 400;
        done(err as any, undefined);
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

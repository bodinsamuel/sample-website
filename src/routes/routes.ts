import { FastifyPluginAsync } from 'fastify';

import { statusCode } from './statusCode/get.js';
import { echo } from './echo.js';
import { random } from './statusCode/random.js';
import { compressionBrotly } from './compression/brotly.js';
import { compressionGzip } from './compression/gzip.js';
import { compressionDeflate } from './compression/deflate.js';

export const routes: FastifyPluginAsync = async (f) => {
  // --- Global
  await f.register(echo, { prefix: '/echo' });

  // --- Status Code
  await f.register(random, { prefix: '/statusCode/random' });
  await f.register(statusCode, { prefix: '/statusCode/:code' });

  // --- Compression
  await f.register(compressionBrotly, { prefix: '/compression/brotly' });
  await f.register(compressionGzip, { prefix: '/compression/gzip' });
  await f.register(compressionDeflate, { prefix: '/compression/deflate' });
};

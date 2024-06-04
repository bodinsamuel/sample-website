import { FastifyPluginAsync } from 'fastify';
import { statusCode } from './statusCode.js';

export const routes: FastifyPluginAsync = async (f) => {
  await f.register(statusCode, { prefix: '/0/statusCode' });
};

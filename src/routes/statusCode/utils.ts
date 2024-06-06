import { FastifyReply } from 'fastify';
import { getReasonPhrase } from 'http-status-codes';

import { OutputFormat, formatRes } from '../../common/format.js';

export async function outputStatus({
  res,
  code,
  format,
}: {
  res: FastifyReply;
  code: number;
  format?: OutputFormat;
}) {
  if (code === 204) {
    await res.status(code).send();
    return;
  } else if (
    code === 301 ||
    code === 302 ||
    code === 303 ||
    code === 307 ||
    code === 308
  ) {
    await res
      .status(code)
      .header('Location', '/0/statusCode/200')
      .send(getReasonPhrase(code));
  }

  await formatRes({
    res: res.status(code),
    format,
    content: {
      statusCode: code,
      reason: getReasonPhrase(code),
    },
  });
}

export const statusCodes = [
  202, 502, 400, 409, 100, 201, 417, 424, 403, 504, 410, 505, 418, 419, 507,
  500, 411, 423, 420, 405, 301, 302, 207, 300, 511, 204, 203, 406, 404, 501,
  304, 200, 206, 402, 308, 412, 428, 102, 103, 426, 407, 431, 408, 413, 414,
  416, 205, 303, 503, 101, 307, 429, 401, 451, 422, 415, 305, 421,
];

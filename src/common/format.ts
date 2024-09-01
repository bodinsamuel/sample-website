/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { FastifyReply } from 'fastify';
import { z } from 'zod';

export type OutputFormat = 'html' | 'json' | 'xml';

export const formatQueryParams = z
  .object({
    format: z.enum(['json', 'html', 'xml']).optional().default('json'),
  })
  .strict();

export async function formatRes({
  res,
  format = 'json',
  autoType = true,
  content,
}: {
  res: FastifyReply;
  format?: OutputFormat;
  autoType?: boolean;
  content: unknown;
}) {
  if (format === 'html') {
    await res
      .status(200)
      .type(autoType ? 'html' : 'text/plain')
      .send(formatMessage('html', content));
  } else if (format === 'json') {
    await res
      .status(200)
      .type(autoType ? 'json' : 'text/plain')
      .send(formatMessage('json', content));
  } else if (format === 'xml') {
    await res
      .status(200)
      .type(autoType ? 'application/xml' : 'text/plain')
      .send(formatMessage('xml', content));
  }
}

function formatMessage(format: OutputFormat, content: unknown): string {
  if (format === 'html') {
    return `<html><head></head><body><div>${JSON.stringify(content, null, 2)}</div></body></html>`;
  } else if (format === 'json') {
    return JSON.stringify(content);
  } else if (format === 'xml') {
    return `<?xml version='1.0' encoding='utf-8'?>
    <Response>
      <Content>${JSON.stringify(content)}</Content>
    </Response>`;
  }

  return '';
}

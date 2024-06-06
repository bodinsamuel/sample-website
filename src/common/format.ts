/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { FastifyReply } from 'fastify';

export type OutputFormat = 'html' | 'json' | 'xml';

export async function formatRes({
  res,
  format = 'json',
  content,
}: {
  res: FastifyReply;
  format?: OutputFormat;
  content: unknown;
}) {
  if (format === 'html') {
    await res
      .type('html')
      .send(
        `<html><head></head><body><div>${JSON.stringify(content, null, 2)}</div></body></html>`
      );
  } else if (format === 'json') {
    await res.send(content);
  } else if (format === 'xml') {
    await res.type('application/xml')
      .send(`<?xml version='1.0' encoding='utf-8'?>
    <Response>
      <Content>${JSON.stringify(content)}</Content>
    </Response>`);
  }
}

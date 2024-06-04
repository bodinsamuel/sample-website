import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const HOSTNAME = process.env['HOSTNAME'] || 'http://localhost:3000';
export const PORT = process.env['PORT']
  ? parseInt(process.env['PORT'], 10)
  : 3000;

export const filename = fileURLToPath(import.meta.url);
export const dirname = path.dirname(path.join(filename, '..'));

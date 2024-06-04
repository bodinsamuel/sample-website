export const HOSTNAME = process.env['HOSTNAME'] || 'http://localhost:3000';
export const PORT = process.env['PORT']
  ? parseInt(process.env['PORT'], 10)
  : 3000;

export const dirname = import.meta.dirname;

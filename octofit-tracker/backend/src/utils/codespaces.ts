import type { Request } from 'express';

export function getApiBaseUrl(req?: Request): string {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  if (req?.protocol && req.get('host')) {
    return `${req.protocol}://${req.get('host')}`;
  }

  return 'http://localhost:8000';
}

import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png' };
http.createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return;
    }
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const parts = pathname.split('/');
    if (parts.some(p => p.startsWith('.')) || !(/\/$/.test(pathname) || /\.(html|css|js|png)$/.test(pathname))) {
      res.writeHead(404); res.end('Not found'); return;
    }
    let path = resolve(root, '.' + pathname);
    if (path !== resolve(root) && !path.startsWith(root.endsWith(sep) ? root : root + sep)) {
      res.writeHead(404); res.end('Not found'); return;
    }
    if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
    const bytes = await readFile(path);
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(req.method === 'HEAD' ? undefined : bytes);
  } catch {
    res.writeHead(404); res.end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`Clinic: http://127.0.0.1:${port}/\nMarketing: http://127.0.0.1:${port}/studio/`));

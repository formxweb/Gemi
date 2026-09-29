// Builds nothing — run after `npm run build`. Serves dist/ and checks:
// internal links + #anchors resolve, no console errors / failed requests, charter form produces a WhatsApp brief.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = join(root, p);
  try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html'); } catch { f = join(root, '404.html'); res.statusCode = 404; }
  try { res.setHeader('content-type', types[extname(f)] || 'application/octet-stream'); res.end(await readFile(f)); } catch { res.statusCode = 404; res.end(); }
}).listen(4399);
const base = 'http://127.0.0.1:4399';
const pages = ['/', '/tr/', '/yachts/denden-istanbul/', '/tr/yachts/denden-istanbul/', '/private-charter/', '/tr/private-charter/'];
const launch = process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {};
const browser = await chromium.launch(launch);
let problems = 0;
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  for (const path of pages) {
    const page = await browser.newPage({ viewport: vp });
    const errs = [];
    page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    page.on('pageerror', (e) => errs.push(e.message));
    page.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } });
    await page.waitForLoadState('networkidle');
    const broken = await page.evaluate(async () => {
      const out = [];
      const imgs = [...document.images].filter((i) => i.complete && i.naturalWidth === 0);
      imgs.forEach((i) => out.push('broken image ' + i.currentSrc));
      for (const a of document.querySelectorAll('a[href]')) {
        const u = new URL(a.getAttribute('href'), location.href);
        if (u.origin !== location.origin) continue;
        const r = await fetch(u.pathname);
        if (!r.ok) { out.push('dead link ' + u.pathname); continue; }
        if (u.hash) {
          const html = await r.text();
          if (!html.includes(`id="${u.hash.slice(1)}"`)) out.push('missing anchor ' + u.pathname + u.hash);
        }
      }
      return [...new Set(out)];
    });
    const all = [...errs, ...broken];
    problems += all.length;
    console.log(`${vp.width}px ${path} → ${all.length ? all.join(' | ') : 'ok'}`);
    await page.close();
  }
}
// Charter form → WhatsApp brief
const page = await browser.newPage();
await page.goto(base + '/private-charter/?yacht=denden-istanbul&guests=21%E2%80%9340&occasion=Celebrations');
await page.evaluate(() => { window.__opened = null; window.open = (u) => { window.__opened = u; }; });
await page.fill('#c-date', '2026-10-17');
await page.fill('#c-name', 'Test Guest');
await page.fill('#c-phone', '+90 555 000 00 00');
await page.click('.ch__submit button');
const opened = await page.evaluate(() => window.__opened);
console.log('charter → ' + (opened ? decodeURIComponent(opened).replace(/\n/g, ' / ') : 'NOT OPENED'));
if (!opened) problems++;
await browser.close();
server.close();
process.exit(problems ? 1 : 0);

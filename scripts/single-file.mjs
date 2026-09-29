// Packs the built site (dist/) into ONE self-contained HTML file that opens with a double-click:
// every page (EN + TR), styles, fonts, scripts and images are embedded; links are handled in-page.
// Usage: npm run build && node scripts/single-file.mjs [out.html]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const out = process.argv[2] || join(dist, '..', 'dist-single', 'Denden-Luxury-Yachts.html');
const MAX_W = 1600; // largest embedded image width

const routes = ['/', '/tr/', '/yachts/denden-istanbul/', '/tr/yachts/denden-istanbul/', '/private-charter/', '/tr/private-charter/'];
const read = (p) => readFileSync(join(dist, p));
const b64 = (p, type) => `data:${type};base64,${read(p).toString('base64')}`;

const images = {}; // key -> data URI
const styles = new Set();
const scripts = new Set();
const pages = {};

for (const route of routes) {
  const html = read(join(route, 'index.html')).toString();
  const lang = html.match(/<html lang="([^"]+)"/)[1];
  const title = html.match(/<title>([^<]*)<\/title>/)[1];
  const navStart = html.match(/<body data-nav-start="([^"]+)"/)[1];
  for (const m of html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)) styles.add(m[1]);
  for (const m of html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)) scripts.add(m[1]);

  let body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1];
  body = body.replace(/<script[\s\S]*?<\/script>/g, '');
  body = body.replace(/<picture>([\s\S]*?)<\/picture>/g, (_, inner) => {
    const webp = inner.match(/<source srcset="([^"]+)" type="image\/webp"/)[1]
      .split(',').map((s) => s.trim().split(' ')).map(([u, w]) => ({ u, w: parseInt(w) }));
    const pick = webp.filter((c) => c.w <= MAX_W).pop() || webp[0];
    const key = pick.u.split('/').pop().split('.')[0];
    if (!images[key]) images[key] = b64(pick.u, 'image/webp');
    const img = inner.match(/<img ([^>]*)>/)[1]
      .replace(/\s(src|srcset|sizes|fetchpriority)="[^"]*"/g, '');
    return `<img data-k="${key}" ${img}>`;
  });
  pages[route] = { lang, title, navStart, body };
}

// Styles: concatenate, embed Latin fonts, drop unused subsets.
let css = [...styles].map((h) => read(h).toString()).join('\n');
css = css.replace(/@font-face\{[^}]*vietnamese[^}]*\}/g, '');
css = css.replace(/url\((\/_astro\/[^)]+\.woff2)\)/g, (_, u) => `url(${b64(u, 'font/woff2')})`);
css += '\n.frame>img{display:block;width:100%;height:100%;object-fit:cover}';

const pageScripts = [...scripts].map((s) => s.replace('new URLSearchParams(location.search)', 'new URLSearchParams(window.__q||location.search)'));

const router = `
const PAGES=${JSON.stringify(Object.fromEntries(Object.entries(pages).map(([k, v]) => [k, { lang: v.lang, title: v.title, nav: v.navStart }])))};
const IMG=JSON.parse(document.getElementById('img-data').textContent);
const app=document.getElementById('app');
let current=null;
const norm=(p)=>p.endsWith('/')?p:p+'/';
function go(url,push=true){
  const u=new URL(url,'https://denden.local');
  let path=norm(u.pathname); if(!PAGES[path]) path='/';
  const fresh=path!==current||u.search;
  window.__q=u.search;
  if(fresh){
    if(current) document.dispatchEvent(new Event('astro:before-swap'));
    app.replaceChildren(document.getElementById('p:'+path).content.cloneNode(true));
    for(const img of app.querySelectorAll('img[data-k]')) img.src=IMG[img.dataset.k];
    const pg=PAGES[path];
    document.body.dataset.navStart=pg.nav; document.documentElement.lang=pg.lang; document.title=pg.title;
    current=path; window.scrollTo(0,0);
    document.dispatchEvent(new Event('astro:page-load'));
  }
  if(u.hash){const el=document.getElementById(decodeURIComponent(u.hash.slice(1))); if(el) setTimeout(()=>el.scrollIntoView({behavior:fresh?'auto':'smooth'}),fresh?60:0);}
  if(push) history.pushState(null,'','#'+path+u.search+u.hash);
}
document.addEventListener('click',(e)=>{
  const a=e.target.closest('a[href]'); if(!a) return;
  const href=a.getAttribute('href');
  if(a.target==='_blank'||/^(https?:|tel:|mailto:)/.test(href)) return;
  e.preventDefault();
  go(href.startsWith('#')?current+href:href);
});
document.addEventListener('submit',(e)=>{
  const f=e.target, action=f.getAttribute('action'); if(!action) return;
  e.preventDefault(); go(action+'?'+new URLSearchParams(new FormData(f)).toString());
},true);
window.addEventListener('popstate',()=>go(location.hash.slice(1)||'/',false));
go(location.hash.slice(1)||'/',false);
`;

const favicon = b64('/favicon.svg', 'image/svg+xml');
const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${pages['/'].title}</title>
<meta name="theme-color" content="#101311">
<link rel="icon" href="${favicon}">
<style>${css}</style>
${routes.map((r) => `<template id="p:${r}">${pages[r].body}</template>`).join('\n')}
</head>
<body data-nav-start="dark">
<div id="app"></div>
<script type="application/json" id="img-data">${JSON.stringify(images)}</script>
${pageScripts.map((s) => `<script type="module">${s}</script>`).join('\n')}
<script type="module">${router}</script>
</body>
</html>`;

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, doc);
console.log(`${out} — ${(doc.length / 1024 / 1024).toFixed(1)} MB, ${Object.keys(images).length} images, ${routes.length} pages`);

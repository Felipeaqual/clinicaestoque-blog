import { readdirSync, renameSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = '.vercel/output';
const STATIC_DIR = join(OUTPUT_DIR, 'static');
const BLOG_DIR = join(STATIC_DIR, 'blog');
const CONFIG_PATH = join(OUTPUT_DIR, 'config.json');
const BASE = '/blog';

if (!existsSync(STATIC_DIR)) {
  console.error(`[patch-vercel-output] ${STATIC_DIR} nao existe. astro build rodou?`);
  process.exit(1);
}

if (!existsSync(BLOG_DIR)) {
  mkdirSync(BLOG_DIR, { recursive: true });
}

for (const item of readdirSync(STATIC_DIR)) {
  if (item === 'blog') continue;
  renameSync(join(STATIC_DIR, item), join(BLOG_DIR, item));
}

const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));

config.routes = config.routes.map((route) => {
  if (route.src === '^/_astro(?:/(.*))$') {
    return { ...route, src: `^${BASE}/_astro(?:/(.*))$` };
  }
  if (route.src === '^/.*$' && route.dest === '/404.html') {
    return { ...route, dest: `${BASE}/404.html` };
  }
  return route;
});

writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + '\n');

console.log(`[patch-vercel-output] moveu arquivos para ${BASE}/ e ajustou ${CONFIG_PATH}`);

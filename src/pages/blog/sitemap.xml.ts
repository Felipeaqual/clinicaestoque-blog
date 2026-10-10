import { getCollection } from 'astro:content';
import { site, urlAbsoluta } from '../../config/site';
import type { APIContext } from 'astro';

function escapar(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET(_context: APIContext) {
  const posts = (await getCollection('posts', ({ data }) => data.publicado === true)).sort(
    (a, b) => b.data.dataPublicacao.getTime() - a.data.dataPublicacao.getTime(),
  );

  const porPagina = site.postsPorPagina;
  const totalPaginas = Math.max(1, Math.ceil(posts.length / porPagina));

  const ultimaModGeral =
    posts.length === 0
      ? new Date()
      : posts.reduce((acc: Date, p) => {
          const d = p.data.dataAtualizacao ?? p.data.dataPublicacao;
          return d.getTime() > acc.getTime() ? d : acc;
        }, new Date(0));

  type Entry = { loc: string; lastmod: Date };
  const entries: Entry[] = [];

  entries.push({ loc: urlAbsoluta('/'), lastmod: ultimaModGeral });

  for (let p = 2; p <= totalPaginas; p++) {
    entries.push({ loc: urlAbsoluta(`/pagina/${p}/`), lastmod: ultimaModGeral });
  }

  for (const post of posts) {
    entries.push({
      loc: urlAbsoluta(`/${post.id}/`),
      lastmod: post.data.dataAtualizacao ?? post.data.dataPublicacao,
    });
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map(
        (e) =>
          `  <url>\n` +
          `    <loc>${escapar(e.loc)}</loc>\n` +
          `    <lastmod>${e.lastmod.toISOString()}</lastmod>\n` +
          `  </url>`,
      )
      .join('\n') +
    `\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

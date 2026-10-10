import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site, urlAbsoluta } from '../../config/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', ({ data }) => data.publicado === true)).sort(
    (a, b) => b.data.dataPublicacao.getTime() - a.data.dataPublicacao.getTime(),
  );

  return rss({
    title: `${site.nome}`,
    description: site.descricao,
    site: urlAbsoluta('/'),
    items: posts.map((post) => ({
      title: post.data.titulo,
      description: post.data.descricaoGoogle,
      link: urlAbsoluta(`/${post.id}/`),
      pubDate: post.data.dataPublicacao,
    })),
    customData: `<language>pt-BR</language>`,
    trailingSlash: true,
  });
}

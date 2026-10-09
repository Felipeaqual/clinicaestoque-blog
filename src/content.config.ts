import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      descricaoGoogle: z.string(),
      imagemCapa: image(),
      imagemCapaAlt: z.string(),
      dataPublicacao: z.coerce.date(),
      dataAtualizacao: z.coerce.date().optional(),
      autor: z.string(),
      publicado: z.boolean().default(false),
    }),
});

const autores = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/autores' }),
  schema: ({ image }) =>
    z.object({
      nome: z.string(),
      foto: image(),
    }),
});

export const collections = { posts, autores };

import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://clinicaestoque.com.br',
  trailingSlash: 'always',
  output: 'static',
  adapter: vercel({
    imageService: false,
    webAnalytics: { enabled: false },
  }),
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
    assets: 'blog/_astro',
  },
  integrations: [react(), keystatic(), markdoc()],
  devToolbar: { enabled: false },
  vite: {
    build: {
      chunkSizeWarningLimit: 3000,
    },
  },
  env: {
    schema: {
      PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      KEYSTATIC_GITHUB_CLIENT_ID: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      KEYSTATIC_GITHUB_CLIENT_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      KEYSTATIC_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
});

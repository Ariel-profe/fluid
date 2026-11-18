import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://fluidsoluciones.com',
  image: {
    domains: ['images.unsplash.com'],
  },
  prefetch: true,
  integrations: [sitemap(), mdx()],
  experimental: {
    clientPrerender: true,
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@company': path.resolve(rootDir, 'data'),
        '@lib': path.resolve(rootDir, 'lib'),
      },
    },
  },
});

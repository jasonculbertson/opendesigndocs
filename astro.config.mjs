import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [
    mdx({
      components: {
        'img': 'astro/components/Image.astro'
      }
    }),
    tailwind(),
    react()
  ],
  renderers: ['@astrojs/renderer-preact'],
  vite: {
    envPrefix: 'SUPABASE_',
    build: {
      sourcemap: true
    },
    server: {
      hmr: {
        overlay: false
      }
    }
  }
});
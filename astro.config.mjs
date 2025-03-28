import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    speedInsights: {
      enabled: true
    },
    imageService: true,
    edgeMiddleware: true // Enable edge middleware for API functionality
  }),
  integrations: [
    mdx({
      components: {
        'img': 'astro/components/Image.astro'
      }
    }),
    tailwind(),
    react()
  ],
  vite: {
    envPrefix: 'SUPABASE_'
  }
});
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    analytics: true,
    imageService: true,
    devImageService: 'sharp',
    imagesConfig: {
      sizes: [640, 750, 828, 1080, 1200, 1920],
      domains: [],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60,
    },
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
    ssr: {
      noExternal: ['@heroicons/*', 'lucide-react']
    }
  }
});
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
    functionPerRoute: false, // Bundle all routes into a single function
    maxDuration: 60, // Set max duration to 60 seconds
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
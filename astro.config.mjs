import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import clerk from '@clerk/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    // Vercel Web Analytics - tracks page views, performance, and user interactions
    webAnalytics: {
      enabled: true
    },
    // Vercel Speed Insights - measures Core Web Vitals and performance metrics
    speedInsights: {
      enabled: true
    },
    imageService: true
  }),
  integrations: [
    mdx({
      components: {
        'img': 'astro/components/Image.astro'
      }
    }),
    tailwind(),
    react(),
    clerk()
  ],
  // Removing the vite config that restricts env prefix
});
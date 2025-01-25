import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: true,
    speedInsights: true,
    functionPerRoute: false,
    maxDuration: 10,
    includeFiles: [
      'node_modules/react/**/*',
      'node_modules/react-dom/**/*'
    ],
    devMode: false, // Ensure Vercel adapter generates config
    buildOutput: {
      serverBuild: true,
      clientBuild: true,
      config: true
    }
  }),
  integrations: [react(), mdx(), tailwind()],
  vite: {
    ssr: {
      noExternal: ['react', 'react-dom', '@heroicons/*', 'lucide-react']
    },
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  }
});
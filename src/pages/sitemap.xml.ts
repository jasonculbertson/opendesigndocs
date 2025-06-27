import type { APIRoute } from 'astro';

const pages = [
  '/',
  '/docs/levels/levels-titles',
  '/docs/manager',
  '/docs/manager/day-1/30-60-90-plan',
  '/docs/manager/day-1/leadership-blueprint',
  '/docs/manager/week-1-2/getting-to-know-you',
  '/docs/manager/month-1/designer-levels-titles',
  '/docs/manager/month-1/level-competencies',
  '/docs/manager/quarter-1/self-evaluation',
  '/docs/manager/quarter-1/short-term-growth-exercise',
  '/docs/manager/quarter-2/individual-assessment',
  '/docs/manager/quarter-2/long-term-goals',
  '/docs/manager/departure/transition-plan',
  '/docs/design-team',
  '/docs/design-team/design-sprint',
  '/docs/design-team/t-shirt-sizing',
  '/docs/product-team',
  '/docs/product-team/one-pagers',
  '/docs/product-team/product-spec',
  '/docs/product-team/project-kickoff-meeting',
  '/docs/videos/interviews',
  '/docs/videos/case-studies',
];

export const GET: APIRoute = async () => {
  const siteUrl = 'https://opendesigndocs.com';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map((page) => `
    <url>
      <loc>${siteUrl}${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>${page === '' ? '1.0' : '0.7'}</priority>
    </url>
  `).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};

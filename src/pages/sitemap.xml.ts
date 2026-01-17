import type { APIRoute } from 'astro';

// All pages on the site organized by section
const pages = [
  // Homepage
  '/',
  
  // Levels & Titles
  '/docs/levels/levels-titles',
  '/docs/levels/reviews',
  
  // Level Competencies
  '/docs/levels/level-competencies',
  '/docs/levels/level-competencies/product-designer',
  '/docs/levels/level-competencies/content-designer',
  '/docs/levels/level-competencies/user-researcher',
  '/docs/levels/level-competencies/design-ops',
  '/docs/levels/level-competencies/graphic-designer',
  '/docs/levels/level-competencies/copywriter',
  '/docs/levels/level-competencies/photographer',
  '/docs/levels/level-competencies/manager',
  
  // Job Descriptions - Index Pages
  '/docs/levels/job-descriptions/product-designer',
  '/docs/levels/job-descriptions/content-designer',
  '/docs/levels/job-descriptions/user-researcher',
  '/docs/levels/job-descriptions/design-ops',
  '/docs/levels/job-descriptions/graphic-designer',
  '/docs/levels/job-descriptions/copywriter',
  
  // Job Descriptions - Product Designer
  '/docs/levels/job-descriptions/product-designer/designer-1',
  '/docs/levels/job-descriptions/product-designer/designer-2',
  '/docs/levels/job-descriptions/product-designer/senior-designer',
  '/docs/levels/job-descriptions/product-designer/staff-designer',
  '/docs/levels/job-descriptions/product-designer/lead-designer',
  '/docs/levels/job-descriptions/product-designer/principal-designer',
  
  // Job Descriptions - Content Designer
  '/docs/levels/job-descriptions/content-designer/designer-1',
  '/docs/levels/job-descriptions/content-designer/designer-2',
  '/docs/levels/job-descriptions/content-designer/senior-designer',
  '/docs/levels/job-descriptions/content-designer/staff-designer',
  '/docs/levels/job-descriptions/content-designer/lead-designer',
  '/docs/levels/job-descriptions/content-designer/principal-designer',
  
  // Job Descriptions - User Researcher
  '/docs/levels/job-descriptions/user-researcher/researcher-1',
  '/docs/levels/job-descriptions/user-researcher/researcher-2',
  '/docs/levels/job-descriptions/user-researcher/senior-researcher',
  '/docs/levels/job-descriptions/user-researcher/staff-researcher',
  '/docs/levels/job-descriptions/user-researcher/lead-researcher',
  '/docs/levels/job-descriptions/user-researcher/principal-researcher',
  
  // Job Descriptions - Design Ops
  '/docs/levels/job-descriptions/design-ops/design-ops-1',
  '/docs/levels/job-descriptions/design-ops/design-ops-2',
  '/docs/levels/job-descriptions/design-ops/senior-design-ops',
  '/docs/levels/job-descriptions/design-ops/staff-design-ops',
  '/docs/levels/job-descriptions/design-ops/lead-design-ops',
  '/docs/levels/job-descriptions/design-ops/principal-design-ops',
  
  // Job Descriptions - Graphic Designer
  '/docs/levels/job-descriptions/graphic-designer/junior-designer',
  '/docs/levels/job-descriptions/graphic-designer/designer',
  '/docs/levels/job-descriptions/graphic-designer/senior-designer',
  '/docs/levels/job-descriptions/graphic-designer/art-director',
  '/docs/levels/job-descriptions/graphic-designer/sr-art-director',
  '/docs/levels/job-descriptions/graphic-designer/associate-creative-director',
  
  // Job Descriptions - Copywriter
  '/docs/levels/job-descriptions/copywriter/junior-copywriter',
  '/docs/levels/job-descriptions/copywriter/copywriter',
  '/docs/levels/job-descriptions/copywriter/sr-copywriter',
  '/docs/levels/job-descriptions/copywriter/copy-director',
  '/docs/levels/job-descriptions/copywriter/sr-copy-director',
  '/docs/levels/job-descriptions/copywriter/associate-creative-director',
  
  // Interview Panels - Index Pages
  '/docs/levels/interview-panels/product-design',
  '/docs/levels/interview-panels/product-designer',
  '/docs/levels/interview-panels/content-designer',
  '/docs/levels/interview-panels/user-researcher',
  '/docs/levels/interview-panels/design-ops-manager',
  '/docs/levels/interview-panels/graphic-designer',
  '/docs/levels/interview-panels/copywriter',
  
  // Interview Panels - Product Designer
  '/docs/levels/interview-panels/product-designer/designer-1',
  '/docs/levels/interview-panels/product-designer/designer-2',
  '/docs/levels/interview-panels/product-designer/senior-designer',
  '/docs/levels/interview-panels/product-designer/staff-designer',
  '/docs/levels/interview-panels/product-designer/lead-designer',
  '/docs/levels/interview-panels/product-designer/principal-designer',
  
  // Interview Panels - Content Designer
  '/docs/levels/interview-panels/content-designer/designer-1',
  '/docs/levels/interview-panels/content-designer/designer-2',
  '/docs/levels/interview-panels/content-designer/senior-designer',
  '/docs/levels/interview-panels/content-designer/staff-designer',
  '/docs/levels/interview-panels/content-designer/lead-designer',
  '/docs/levels/interview-panels/content-designer/principal-designer',
  
  // Interview Panels - User Researcher
  '/docs/levels/interview-panels/user-researcher/researcher-1',
  '/docs/levels/interview-panels/user-researcher/researcher-2',
  '/docs/levels/interview-panels/user-researcher/senior-researcher',
  '/docs/levels/interview-panels/user-researcher/staff-researcher',
  '/docs/levels/interview-panels/user-researcher/lead-researcher',
  '/docs/levels/interview-panels/user-researcher/principal-researcher',
  
  // Interview Panels - Design Ops
  '/docs/levels/interview-panels/design-ops-manager/design-ops-1',
  '/docs/levels/interview-panels/design-ops-manager/design-ops-2',
  '/docs/levels/interview-panels/design-ops-manager/senior-design-ops',
  '/docs/levels/interview-panels/design-ops-manager/staff-design-ops',
  '/docs/levels/interview-panels/design-ops-manager/lead-design-ops',
  '/docs/levels/interview-panels/design-ops-manager/principal-design-ops',
  
  // Interview Panels - Graphic Designer
  '/docs/levels/interview-panels/graphic-designer/junior-designer',
  '/docs/levels/interview-panels/graphic-designer/designer',
  '/docs/levels/interview-panels/graphic-designer/senior-designer',
  '/docs/levels/interview-panels/graphic-designer/art-director',
  '/docs/levels/interview-panels/graphic-designer/senior-art-director',
  '/docs/levels/interview-panels/graphic-designer/associate-creative-director',
  
  // Interview Panels - Copywriter
  '/docs/levels/interview-panels/copywriter/junior-copywriter',
  '/docs/levels/interview-panels/copywriter/copywriter',
  '/docs/levels/interview-panels/copywriter/senior-copywriter',
  '/docs/levels/interview-panels/copywriter/copy-director',
  '/docs/levels/interview-panels/copywriter/senior-copy-director',
  '/docs/levels/interview-panels/copywriter/associate-creative-director',
  
  // Manager Resources
  '/docs/manager',
  '/docs/manager/leadership-blueprint',
  '/docs/manager/day-1/30-60-90-plan',
  '/docs/manager/week-1-2/getting-to-know-you',
  '/docs/manager/month-1/designer-levels-titles',
  '/docs/manager/month-1/level-competencies',
  '/docs/manager/quarter-1/self-evaluation',
  '/docs/manager/quarter-1/short-term-growth-exercise',
  '/docs/manager/quarter-2/individual-assessment',
  '/docs/manager/quarter-2/long-term-goals',
  '/docs/manager/departure/transition-plan',
  
  // Design Team
  '/docs/design-team',
  '/docs/design-team/design-sprint',
  '/docs/design-team/t-shirt-sizing',
  
  // Product Team
  '/docs/product-team',
  '/docs/product-team/one-pagers',
  '/docs/product-team/product-spec',
  '/docs/product-team/project-kickoff-meeting',
  
  // Videos
  '/docs/videos/interviews',
  '/docs/videos/case-studies',
  
  // AI Tools
  '/docs/reviews-ai',
  
  // Recruiters
  '/docs/recruiters',
  
  // Bookmarks
  '/docs/bookmarks',
  
  // Legal
  '/legal/privacy',
  '/legal/terms',
];

export const GET: APIRoute = async () => {
  const siteUrl = 'https://opendesigndocs.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map((page) => `
    <url>
      <loc>${siteUrl}${page}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>${page === '/' ? 'daily' : 'weekly'}</changefreq>
      <priority>${page === '/' ? '1.0' : page.includes('level-competencies') || page.includes('job-descriptions') ? '0.8' : '0.7'}</priority>
    </url>
  `).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};

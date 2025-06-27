export function shouldShowSubstack(pathname: string): boolean {
  // Remove trailing slash for consistent comparison
  const normalizedPath = pathname.replace(/\/$/, '');

  // Explicit list of pages that should show the Substack embed
  const pagesWithSubstack = [
    // Levels section
    '/docs/levels/levels-titles',
    
    // Job Descriptions - Main pages
    '/docs/levels/job-descriptions/ux-designer',
    '/docs/levels/job-descriptions/ux-researcher',
    '/docs/levels/job-descriptions/design-ops',
    '/docs/levels/job-descriptions/graphic-designer',
    '/docs/levels/job-descriptions/copywriter',
    
    // Videos section
    '/docs/videos/interviews',
    '/docs/videos/case-studies',
    
    // Team section
    '/docs/design-team/t-shirt-sizing',
    '/docs/design-team/design-sprint',
    '/docs/product-team/one-pagers',
    '/docs/product-team/product-spec',
    '/docs/product-team/project-kickoff-meeting',
    '/docs/team/recruiting/interview-panels',
    
    // Leadership section
    '/docs/manager/day-1/leadership-blueprint',
    '/docs/manager/day-1/30-60-90-plan',
    '/docs/manager/week-1-2/getting-to-know-you',
    '/docs/manager/month-1/designer-levels-titles',
    '/docs/manager/month-1/level-competencies/researcher',
    '/docs/manager/month-1/level-competencies/photographer',
    '/docs/manager/month-1/level-competencies/ic1',
    '/docs/manager/month-1/level-competencies/content-designer',
    '/docs/manager/month-1/level-competencies/product-designer',
    '/docs/manager/month-1/level-competencies/manager',
    '/docs/manager/month-1/level-competencies/design-ops',
    '/docs/manager/month-1/level-competencies/copywriter',
    '/docs/manager/month-1/level-competencies/graphic-designer',
    '/docs/manager/quarter-1/self-evaluation',
    '/docs/manager/quarter-1/short-term-growth-exercise',
    '/docs/manager/quarter-2/individual-assessment',
    '/docs/manager/quarter-2/long-term-goals',
    '/docs/manager/departure/transition-plan',

    // Job Descriptions - UX Writer
    '/docs/team/recruiting/job-descriptions-jds/ux-writer/writer-1',
    '/docs/team/recruiting/job-descriptions-jds/ux-writer/writer-2',
    '/docs/team/recruiting/job-descriptions-jds/ux-writer/senior-writer',
    '/docs/team/recruiting/job-descriptions-jds/ux-writer/lead-writer',
    '/docs/team/recruiting/job-descriptions-jds/ux-writer/staff-writer',
    '/docs/team/recruiting/job-descriptions-jds/ux-writer/principal-writer',

    // Job Descriptions - UX Researcher
    '/docs/team/recruiting/job-descriptions-jds/ux-researcher/researcher-1',
    '/docs/team/recruiting/job-descriptions-jds/ux-researcher/researcher-2',
    '/docs/team/recruiting/job-descriptions-jds/ux-researcher/senior-researcher',
    '/docs/team/recruiting/job-descriptions-jds/ux-researcher/lead-researcher',
    '/docs/team/recruiting/job-descriptions-jds/ux-researcher/staff-researcher',
    '/docs/team/recruiting/job-descriptions-jds/ux-researcher/principal-researcher',

    // Job Descriptions - Design Ops
    '/docs/team/recruiting/job-descriptions-jds/design-ops/design-ops-1',
    '/docs/team/recruiting/job-descriptions-jds/design-ops/design-ops-2',
    '/docs/team/recruiting/job-descriptions-jds/design-ops/senior-design-ops',
    '/docs/team/recruiting/job-descriptions-jds/design-ops/lead-design-ops',
    '/docs/team/recruiting/job-descriptions-jds/design-ops/staff-design-ops',
    '/docs/team/recruiting/job-descriptions-jds/design-ops/principal-design-ops',

    // Job Descriptions - Graphic Designer
    '/docs/team/recruiting/job-descriptions-jds/graphic-designer/junior-designer',
    '/docs/team/recruiting/job-descriptions-jds/graphic-designer/graphic-designer',
    '/docs/team/recruiting/job-descriptions-jds/graphic-designer/senior-designer',
    '/docs/team/recruiting/job-descriptions-jds/graphic-designer/art-director',
    '/docs/team/recruiting/job-descriptions-jds/graphic-designer/associate-creative-director',
    '/docs/team/recruiting/job-descriptions-jds/graphic-designer/creative-director',

    // Job Descriptions - Copywriter
    '/docs/team/recruiting/job-descriptions-jds/copywriter/junior-copywriter',
    '/docs/team/recruiting/job-descriptions-jds/copywriter/copywriter',
    '/docs/team/recruiting/job-descriptions-jds/copywriter/senior-copywriter',
    '/docs/team/recruiting/job-descriptions-jds/copywriter/lead-copywriter',
    '/docs/team/recruiting/job-descriptions-jds/copywriter/associate-creative-director',
    '/docs/team/recruiting/job-descriptions-jds/copywriter/creative-director'
  ];

  return pagesWithSubstack.includes(normalizedPath);
}

// Leadership docs paths (now manager)
export const leadershipPaths = [
  '/docs/manager/day-1/leadership-blueprint',
  '/docs/manager/day-1/30-60-90-plan',
  '/docs/manager/week-1-2/getting-to-know-you',
  '/docs/manager/month-1/designer-levels-titles',
  '/docs/manager/month-1/level-competencies/researcher',
  '/docs/manager/month-1/level-competencies/photographer',
  '/docs/manager/month-1/level-competencies/ic1',
  '/docs/manager/month-1/level-competencies/content-designer',
  '/docs/manager/month-1/level-competencies/product-designer',
  '/docs/manager/month-1/level-competencies/manager',
  '/docs/manager/month-1/level-competencies/design-ops',
  '/docs/manager/month-1/level-competencies/copywriter',
  '/docs/manager/month-1/level-competencies/graphic-designer',
  '/docs/manager/quarter-1/self-evaluation',
  '/docs/manager/quarter-1/short-term-growth-exercise',
  '/docs/manager/quarter-2/individual-assessment',
  '/docs/manager/quarter-2/long-term-goals',
  '/docs/manager/departure/transition-plan',
];

// Team docs paths (now design-team and product-team)
export const teamPaths = [
  '/docs/design-team/t-shirt-sizing',
  '/docs/design-team/design-sprint',
  '/docs/product-team/one-pagers',
  '/docs/product-team/product-spec',
  '/docs/product-team/project-kickoff-meeting',
];



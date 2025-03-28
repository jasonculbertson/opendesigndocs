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
    '/docs/team/design/t-shirt-sizing',
    '/docs/team/design/design-sprint',
    '/docs/team/product/one-pagers',
    '/docs/team/product/product-spec',
    '/docs/team/product/project-kickoff-meeting',
    '/docs/team/recruiting/interview-panels',
    
    // Leadership section
    '/docs/leadership/day-1/leadership-blueprint',
    '/docs/leadership/day-1/30-60-90-plan',
    '/docs/leadership/week-1-2/getting-to-know-you',
    '/docs/leadership/month-1/designer-levels-titles',
    '/docs/leadership/month-1/level-competencies/researcher',
    '/docs/leadership/month-1/level-competencies/photographer',
    '/docs/leadership/month-1/level-competencies/ic1',
    '/docs/leadership/month-1/level-competencies/content-designer',
    '/docs/leadership/month-1/level-competencies/product-designer',
    '/docs/leadership/month-1/level-competencies/manager',
    '/docs/leadership/month-1/level-competencies/design-ops',
    '/docs/leadership/month-1/level-competencies/copywriter',
    '/docs/leadership/month-1/level-competencies/graphic-designer',
    '/docs/leadership/quarter-1/self-evaluation',
    '/docs/leadership/quarter-1/short-term-growth-exercise',
    '/docs/leadership/quarter-2/individual-assessment',
    '/docs/leadership/quarter-2/long-term-goals',
    '/docs/leadership/departure/transition-plan',

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

export function shouldShowContentGate(pathname: string): boolean {
  // Remove trailing slash for consistent comparison
  const normalizedPath = pathname.replace(/\/$/, '');

  // Explicit list of pages that should show the ContentGate
  const pagesWithContentGate = [
     // Levels section
     '/docs/levels/levels-titles',
     
     // Job Descriptions - UX Designer
     '/docs/levels/job-descriptions/ux-designer/designer-1',
     '/docs/levels/job-descriptions/ux-designer/designer-2',
     '/docs/levels/job-descriptions/ux-designer/senior-designer',
     '/docs/levels/job-descriptions/ux-designer/lead-designer',
     '/docs/levels/job-descriptions/ux-designer/staff-designer',
     '/docs/levels/job-descriptions/ux-designer/principal-designer',

     // Job Descriptions - UX Researcher
     '/docs/levels/job-descriptions/ux-researcher/researcher-1',
     '/docs/levels/job-descriptions/ux-researcher/researcher-2',
     '/docs/levels/job-descriptions/ux-researcher/senior-researcher',
     '/docs/levels/job-descriptions/ux-researcher/lead-researcher',
     '/docs/levels/job-descriptions/ux-researcher/staff-researcher',
     '/docs/levels/job-descriptions/ux-researcher/principal-researcher',

     // Job Descriptions - Design Ops
     '/docs/levels/job-descriptions/design-ops/design-ops-1',
     '/docs/levels/job-descriptions/design-ops/design-ops-2',
     '/docs/levels/job-descriptions/design-ops/senior-design-ops',
     '/docs/levels/job-descriptions/design-ops/lead-design-ops',
     '/docs/levels/job-descriptions/design-ops/staff-design-ops',
     '/docs/levels/job-descriptions/design-ops/principal-design-ops',

     // Job Descriptions - Graphic Designer
     '/docs/levels/job-descriptions/graphic-designer/junior-designer',
     '/docs/levels/job-descriptions/graphic-designer/graphic-designer',
     '/docs/levels/job-descriptions/graphic-designer/senior-designer',
     '/docs/levels/job-descriptions/graphic-designer/art-director',
     '/docs/levels/job-descriptions/graphic-designer/associate-creative-director',
     '/docs/levels/job-descriptions/graphic-designer/creative-director',

     // Job Descriptions - Copywriter
     '/docs/levels/job-descriptions/copywriter/junior-copywriter',
     '/docs/levels/job-descriptions/copywriter/copywriter',
     '/docs/levels/job-descriptions/copywriter/senior-copywriter',
     '/docs/levels/job-descriptions/copywriter/lead-copywriter',
     '/docs/levels/job-descriptions/copywriter/associate-creative-director',
     '/docs/levels/job-descriptions/copywriter/creative-director',
     
     // Interview Panels - Content Designer
     '/docs/levels/interview-panels/content-designer/designer-1',
     '/docs/levels/interview-panels/content-designer/designer-2',
     '/docs/levels/interview-panels/content-designer/senior-designer',
     '/docs/levels/interview-panels/content-designer/lead-designer',
     '/docs/levels/interview-panels/content-designer/staff-designer',
     '/docs/levels/interview-panels/content-designer/principal-designer',
     
     // Interview Panels - Copywriter
     '/docs/levels/interview-panels/copywriter/junior-copywriter',
     '/docs/levels/interview-panels/copywriter/copywriter',
     '/docs/levels/interview-panels/copywriter/senior-copywriter',
     '/docs/levels/interview-panels/copywriter/lead-copywriter',
     '/docs/levels/interview-panels/copywriter/associate-creative-director',
     '/docs/levels/interview-panels/copywriter/creative-director',
     
     // Interview Panels - Design Ops
     '/docs/levels/interview-panels/design-ops/design-ops-1',
     '/docs/levels/interview-panels/design-ops/design-ops-2',
     '/docs/levels/interview-panels/design-ops/senior-design-ops',
     '/docs/levels/interview-panels/design-ops/lead-design-ops',
     '/docs/levels/interview-panels/design-ops/staff-design-ops',
     '/docs/levels/interview-panels/design-ops/principal-design-ops',
     
     // Interview Panels - Graphic Designer
     '/docs/levels/interview-panels/graphic-designer/junior-designer',
     '/docs/levels/interview-panels/graphic-designer/graphic-designer',
     '/docs/levels/interview-panels/graphic-designer/senior-designer',
     '/docs/levels/interview-panels/graphic-designer/art-director',
     '/docs/levels/interview-panels/graphic-designer/associate-creative-director',
     '/docs/levels/interview-panels/graphic-designer/creative-director',
     
     // Interview Panels - Product Designer
     '/docs/levels/interview-panels/product-designer/designer-1',
     '/docs/levels/interview-panels/product-designer/designer-2',
     '/docs/levels/interview-panels/product-designer/senior-designer',
     '/docs/levels/interview-panels/product-designer/lead-designer',
     '/docs/levels/interview-panels/product-designer/staff-designer',
     '/docs/levels/interview-panels/product-designer/principal-designer',
     
     // Interview Panels - UX Researcher
     '/docs/levels/interview-panels/ux-researcher/researcher-1',
     '/docs/levels/interview-panels/ux-researcher/researcher-2',
     '/docs/levels/interview-panels/ux-researcher/senior-researcher',
     '/docs/levels/interview-panels/ux-researcher/lead-researcher',
     '/docs/levels/interview-panels/ux-researcher/staff-researcher',
     '/docs/levels/interview-panels/ux-researcher/principal-researcher',
     
     // Videos section
     '/docs/videos/interviews',
     '/docs/videos/case-studies',
     
     // Team section
     '/docs/team/design/t-shirt-sizing',
     '/docs/team/design/design-sprint',
     '/docs/team/product/one-pagers',
     '/docs/team/product/product-spec',
     '/docs/team/product/project-kickoff-meeting',
     '/docs/team/recruiting/interview-panels',
     
     // Leadership section
     '/docs/leadership/day-1/leadership-blueprint',
     '/docs/leadership/day-1/30-60-90-plan',
     '/docs/leadership/week-1-2/getting-to-know-you',
     '/docs/leadership/month-1/designer-levels-titles',
     '/docs/leadership/month-1/level-competencies/researcher',
     '/docs/leadership/month-1/level-competencies/photographer',
     '/docs/leadership/month-1/level-competencies/ic1',
     '/docs/leadership/month-1/level-competencies/content-designer',
     '/docs/leadership/month-1/level-competencies/product-designer',
     '/docs/leadership/month-1/level-competencies/manager',
     '/docs/leadership/month-1/level-competencies/design-ops',
     '/docs/leadership/month-1/level-competencies/copywriter',
     '/docs/leadership/month-1/level-competencies/graphic-designer',
     '/docs/leadership/quarter-1/self-evaluation',
     '/docs/leadership/quarter-1/short-term-growth-exercise',
     '/docs/leadership/quarter-2/individual-assessment',
     '/docs/leadership/quarter-2/long-term-goals',
     '/docs/leadership/departure/transition-plan',
 
     // Job Descriptions - UX Designer
     '/docs/team/recruiting/job-descriptions-jds/ux-designer/designer-1',
     '/docs/team/recruiting/job-descriptions-jds/ux-designer/designer-2',
     '/docs/team/recruiting/job-descriptions-jds/ux-designer/senior-designer',
     '/docs/team/recruiting/job-descriptions-jds/ux-designer/lead-designer',
     '/docs/team/recruiting/job-descriptions-jds/ux-designer/staff-designer',
     '/docs/team/recruiting/job-descriptions-jds/ux-designer/principal-designer',

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

  return pagesWithContentGate.includes(normalizedPath);
}

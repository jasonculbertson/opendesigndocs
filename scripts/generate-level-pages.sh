#!/bin/bash

# Level Competencies child pages
COMPETENCY_PAGES=("content-designer" "copywriter" "design-ops" "graphic-designer" "ic1" "manager" "photographer" "product-designer" "researcher")
for page in "${COMPETENCY_PAGES[@]}"; do
  cat > "src/pages/docs/levels/level-competencies/$page.astro" << EOL
---
import { getEntry } from 'astro:content';
import CompetencyLayout from '../../../../layouts/CompetencyLayout.astro';

const entry = await getEntry('docs', 'levels/level-competencies/$page');
const { Content } = await entry.render();

const breadcrumbs = [
  { text: 'Level Competencies', href: '/docs/levels/level-competencies' }
];

const frontmatter = {
  title: entry.data.title,
  ...entry.data
};
---

<CompetencyLayout frontmatter={frontmatter} breadcrumbs={breadcrumbs}>
  <Content />
</CompetencyLayout>
EOL
done

# Job Descriptions child pages
mkdir -p src/pages/docs/levels/job-descriptions
JD_PAGES=("product-designer" "content-designer" "ux-researcher" "design-ops" "graphic-designer" "copywriter" "ux-designer")
for page in "${JD_PAGES[@]}"; do
  cat > "src/pages/docs/levels/job-descriptions/$page.astro" << EOL
---
import { getEntry } from 'astro:content';
import Layout from '../../../../layouts/Layout.astro';

const entry = await getEntry('docs', 'levels/job-descriptions/$page');
const { Content } = await entry.render();

const breadcrumbs = [
  { text: 'Job Descriptions', href: '/docs/levels/job-descriptions' }
];
---

<Layout title={entry.data.title}>
  <main class="py-8 px-4 sm:px-6 lg:px-8">
    <article class="max-w-[680px] mx-auto">
      <nav class="flex mb-8" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          {breadcrumbs.map((crumb, index) => (
            <li class="flex items-center">
              {index > 0 && <span class="mx-2 text-gray-400">/</span>}
              <a href={crumb.href} class="text-sm text-gray-600 hover:text-gray-900">
                {crumb.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div class="mb-12">
        <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">{entry.data.title}</h1>
      </div>

      <Content />
    </article>
  </main>
</Layout>
EOL
done

# Interview Panels child pages
mkdir -p src/pages/docs/levels/interview-panels
PANEL_PAGES=("product-design" "content-design")
for page in "${PANEL_PAGES[@]}"; do
  cat > "src/pages/docs/levels/interview-panels/$page.astro" << EOL
---
import { getEntry } from 'astro:content';
import Layout from '../../../../layouts/Layout.astro';

const entry = await getEntry('docs', 'levels/interview-panels/$page');
const { Content } = await entry.render();

const breadcrumbs = [
  { text: 'Interview Panels', href: '/docs/levels/interview-panels' }
];
---

<Layout title={entry.data.title}>
  <main class="py-8 px-4 sm:px-6 lg:px-8">
    <article class="max-w-[680px] mx-auto">
      <nav class="flex mb-8" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          {breadcrumbs.map((crumb, index) => (
            <li class="flex items-center">
              {index > 0 && <span class="mx-2 text-gray-400">/</span>}
              <a href={crumb.href} class="text-sm text-gray-600 hover:text-gray-900">
                {crumb.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div class="mb-12">
        <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">{entry.data.title}</h1>
      </div>

      <Content />
    </article>
  </main>
</Layout>
EOL
done

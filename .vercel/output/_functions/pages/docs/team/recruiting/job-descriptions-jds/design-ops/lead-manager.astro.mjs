/* empty css                                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { C as ContentGate, $ as $$Layout } from '../../../../../../chunks/Layout_Y6JSbGsr.mjs';
export { r as renderers } from '../../../../../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbs = [
    { text: "Recruiting Team", href: "/docs/team/recruiting" },
    { text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" },
    { text: "Design Ops", href: "/docs/team/recruiting/job-descriptions-jds/design-ops" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Lead Design Ops Manager" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="relative min-h-screen"> <div class="py-8"> <div class="mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="prose prose-blue max-w-none"> <h1>Lead Design Ops Manager</h1> <h2>Role Overview</h2> <p>As a Lead Design Ops Manager, you will be responsible for leading and scaling design operations initiatives across multiple teams or product areas. You will drive operational excellence, establish best practices, and mentor other design ops managers while working closely with design leadership to align operations with strategic goals.</p> <h2>Key Responsibilities</h2> <ul> <li>Lead and mentor a team of Design Ops Managers, providing guidance, feedback, and career development support</li> <li>Develop and implement scalable operational frameworks and processes across multiple design teams</li> <li>Partner with design leadership to align operational strategies with business objectives</li> <li>Drive continuous improvement in design operations efficiency and effectiveness</li> <li>Establish and maintain relationships with key stakeholders across the organization</li> <li>Lead complex, cross-functional design operations initiatives</li> </ul> <h2>Required Skills</h2> <ul> <li>7+ years of experience in design operations or related field</li> <li>Proven track record of leading and scaling design operations</li> <li>Strong leadership and mentoring abilities</li> <li>Excellence in project and program management</li> <li>Deep understanding of design processes and tools</li> <li>Outstanding communication and stakeholder management skills</li> </ul> <h2>Impact</h2> <p>Lead Design Ops Managers are expected to have significant impact across multiple teams or product areas. They should demonstrate the ability to:</p> <ul> <li>Drive operational excellence and efficiency at scale</li> <li>Develop and implement strategic initiatives that advance design operations</li> <li>Build and lead high-performing teams</li> <li>Influence design and business strategy through operational insights</li> </ul> </div> </div> </div> </main> ` })} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops/lead-manager/index.astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops/lead-manager/index.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/design-ops/lead-manager";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

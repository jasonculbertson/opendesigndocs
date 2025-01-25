/* empty css                                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { C as ContentGate, $ as $$Layout } from '../../../../../../chunks/Layout_B1mFOIGo.mjs';
export { renderers } from '../../../../../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbs = [
    { text: "Recruiting Team", href: "/docs/team/recruiting" },
    { text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" },
    { text: "Design Ops", href: "/docs/team/recruiting/job-descriptions-jds/design-ops" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Design Operations Manager II" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="relative min-h-screen"> <div class="py-8"> <div class="mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="prose max-w-none prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:text-indigo-700"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px] mb-6">Design Ops Manager II</h1> <h2 class="text-xl font-semibold mt-8 mb-4">About [Company Name]</h2> <p>Add a bit about your company here.</p> <h2 class="text-xl font-semibold mt-8 mb-4">Role Overview</h2> <p>As a Design Ops Manager II at [Company Name], you will be responsible for managing design operations and processes. This mid-level management position requires demonstrated success in design operations and the ability to lead key initiatives.</p> <h2 class="text-xl font-semibold mt-8 mb-4">What You'll Do</h2> <ul> <li>Manage design team operations and workflows</li> <li>Maintain and improve design tools and resources</li> <li>Create and maintain design process documentation</li> <li>Lead design team activities and meetings</li> <li>Track and analyze design team metrics and KPIs</li> <li>Develop and implement onboarding programs</li> </ul> <h2 class="text-xl font-semibold mt-8 mb-4">What You'll Need</h2> <ul> <li>4+ years of experience in design operations or related field</li> <li>Strong organizational and project management skills</li> <li>Experience managing design tools and processes</li> <li>Excellent communication and leadership skills</li> <li>Proven track record of successful design ops initiatives</li> <li>Bachelor's degree in Design, Business, or related field (or equivalent experience)</li> </ul> <h2 class="text-xl font-semibold mt-8 mb-4">Benefits</h2> <ul> <li>Competitive salary and equity package</li> <li>Health, dental, and vision insurance</li> <li>Flexible work hours and location</li> <li>Professional development opportunities</li> <li>Generous vacation policy</li> </ul> </div> </div> </div> </main> ` })} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops/manager-2/index.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops/manager-2/index.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/design-ops/manager-2";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

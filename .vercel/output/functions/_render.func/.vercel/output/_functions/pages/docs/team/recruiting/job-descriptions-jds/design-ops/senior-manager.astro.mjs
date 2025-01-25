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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sr. Design Operations Manager" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="relative min-h-screen"> <div class="py-8"> <div class="mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="prose max-w-none prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:text-indigo-700"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px] mb-6">Sr. Design Operations Manager</h1> <h2 class="text-xl font-semibold mt-8 mb-4">About [Company Name]</h2> <p>Add a bit about your company here.</p> <h2 class="text-xl font-semibold mt-8 mb-4">Role Overview</h2> <p>As a Senior Design Ops Manager at [Company Name], you will be responsible for leading design operations and strategic initiatives. This senior-level position requires proven success in design operations management and the ability to drive organizational change.</p> <h2 class="text-xl font-semibold mt-8 mb-4">What You'll Do</h2> <ul> <li>Lead and optimize design team operations</li> <li>Develop and implement design ops strategy</li> <li>Drive process improvements and best practices</li> <li>Manage design operations budget and resources</li> <li>Build and maintain stakeholder relationships</li> <li>Mentor junior design ops managers</li> </ul> <h2 class="text-xl font-semibold mt-8 mb-4">What You'll Need</h2> <ul> <li>6+ years of experience in design operations or related field</li> <li>Proven track record of leading design ops initiatives</li> <li>Strong strategic thinking and problem-solving skills</li> <li>Experience managing budgets and resources</li> <li>Excellent leadership and communication skills</li> <li>Bachelor's degree in Design, Business, or related field (or equivalent experience)</li> </ul> <h2 class="text-xl font-semibold mt-8 mb-4">Benefits</h2> <ul> <li>Competitive salary and equity package</li> <li>Health, dental, and vision insurance</li> <li>Flexible work hours and location</li> <li>Professional development opportunities</li> <li>Generous vacation policy</li> </ul> </div> </div> </div> </main> ` })} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops/senior-manager/index.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops/senior-manager/index.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/design-ops/senior-manager";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

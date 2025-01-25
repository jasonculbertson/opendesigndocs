/* empty css                                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { C as ContentGate, $ as $$Layout } from '../../../../../../chunks/Layout_Y6JSbGsr.mjs';
export { r as renderers } from '../../../../../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$SeniorDesigner = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbs = [
    { text: "Recruiting Team", href: "/docs/team/recruiting" },
    { text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" },
    { text: "UX Designer", href: "/docs/team/recruiting/job-descriptions-jds/ux-designer" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Senior Designer" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="relative min-h-screen"> <div class="py-8"> <div class="mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> ${index < breadcrumbs.length - 1 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} </li>`)} </ol> </nav> <div class="prose max-w-none prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:text-indigo-700"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px] mb-6">Senior Designer</h1> <h2 class="text-xl font-semibold mt-8 mb-4">About [Company Name]</h2> <p>Add a bit about your company here.</p> <h2 class="text-xl font-semibold mt-8 mb-4">Role Overview</h2> <p>As a Senior UX Designer at [Company Name], you will be responsible for leading the design of complex features and products while mentoring junior designers. You'll work closely with product managers, engineers, and other stakeholders to deliver exceptional user experiences that align with business goals and user needs.</p> <h2 class="text-xl font-semibold mt-8 mb-4">What You'll Do</h2> <ul> <li>Lead the design of complex features and products from concept to launch</li> <li>Mentor junior designers and provide constructive feedback on their work</li> <li>Collaborate with product managers to define product strategy and requirements</li> <li>Conduct and analyze user research to inform design decisions</li> <li>Create high-fidelity prototypes and design specifications</li> <li>Present design solutions to stakeholders and defend design decisions</li> <li>Contribute to the design system and establish design patterns</li> </ul> <h2 class="text-xl font-semibold mt-8 mb-4">What We're Looking For</h2> <ul> <li>5+ years of experience in product design</li> <li>Strong portfolio demonstrating end-to-end product design</li> <li>Experience mentoring junior designers</li> <li>Excellent communication and presentation skills</li> <li>Strong understanding of user-centered design principles</li> <li>Proficiency in design tools (Figma, Sketch, etc.)</li> <li>Experience with design systems and pattern libraries</li> <li>Bachelor's degree in Design, HCI, or related field (or equivalent experience)</li> </ul> <h2 class="text-xl font-semibold mt-8 mb-4">Why Join [Company Name]</h2> <ul> <li>Opportunity to shape the future of [industry/product]</li> <li>Competitive salary and equity package</li> <li>Comprehensive health benefits</li> <li>Flexible work arrangements</li> <li>Professional development budget</li> <li>Collaborative and inclusive work environment</li> </ul> <p class="text-sm text-gray-600">[Company Name] is committed to providing a competitive compensation package. Our cash compensation amount for this role is targeted at $X-$X in X area. Final offer amounts are determined by multiple factors, including candidate expertise and the scope of the role.</p> </div> </div> </div> </main> ` })} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-designer/senior-designer.astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-designer/senior-designer.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/ux-designer/senior-designer";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SeniorDesigner,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

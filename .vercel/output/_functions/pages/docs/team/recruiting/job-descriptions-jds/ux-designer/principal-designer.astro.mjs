/* empty css                                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { C as ContentGate, $ as $$Layout } from '../../../../../../chunks/Layout_Y6JSbGsr.mjs';
export { r as renderers } from '../../../../../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$PrincipalDesigner = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbs = [
    { text: "Recruiting Team", href: "/docs/team/recruiting" },
    { text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" },
    { text: "UX Designer", href: "/docs/team/recruiting/job-descriptions-jds/ux-designer" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Principal Designer" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="relative min-h-screen"> <div class="py-8"> <div class="mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> ${index < breadcrumbs.length - 1 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} </li>`)} </ol> </nav> <div class="prose max-w-none prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:text-indigo-700"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px] mb-6">Principal Designer</h1> <h2 class="text-xl font-semibold mt-8 mb-4">About [Company Name]</h2> <p>Add a bit about your company here.</p> <h2 class="text-xl font-semibold mt-8 mb-4">Role Overview</h2> <p>As a Principal Designer at [Company Name], you will be a key strategic leader responsible for shaping the future of our product design organization. You'll drive design excellence across multiple teams, mentor senior designers, and work closely with executive leadership to align design strategy with business objectives.</p> <h2 class="text-xl font-semibold mt-8 mb-4">What You'll Do</h2> <ul> <li>Drive design strategy and vision at the organizational level</li> <li>Lead and mentor design managers and senior designers</li> <li>Establish design principles and frameworks</li> <li>Partner with executive leadership on product strategy</li> <li>Drive innovation in design practices</li> <li>Build and scale high-performing design teams</li> </ul> <h2 class="text-xl font-semibold mt-8 mb-4">What We're Looking For</h2> <ul> <li>12+ years of product design experience</li> <li>5+ years of design leadership experience</li> <li>Track record of building successful design organizations</li> <li>Strong portfolio demonstrating strategic impact</li> <li>Experience working with executive stakeholders</li> <li>Deep understanding of product strategy</li> </ul> <h2 class="text-xl font-semibold mt-8 mb-4">Why Join [Company Name]</h2> <ul> <li>Shape the future of design at a growing company</li> <li>Competitive salary and equity package</li> <li>Comprehensive health benefits</li> <li>Flexible work arrangements</li> <li>Professional development opportunities</li> <li>Influence on company strategy</li> </ul> <p class="text-sm text-gray-600">[Company Name] is committed to providing a competitive compensation package. Our cash compensation amount for this role is targeted at $X-$X in X area.</p> </div> </div> </div> </main> ` })} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-designer/principal-designer.astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-designer/principal-designer.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/ux-designer/principal-designer";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PrincipalDesigner,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

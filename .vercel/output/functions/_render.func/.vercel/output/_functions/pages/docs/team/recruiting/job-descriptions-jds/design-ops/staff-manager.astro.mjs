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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Staff Design Ops Manager" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="relative min-h-screen"> <div class="py-8"> <div class="mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="prose prose-blue max-w-none"> <h1>Staff Design Ops Manager</h1> <h2>Role Overview</h2> <p>As a Staff Design Ops Manager, you will be responsible for driving strategic design operations initiatives across the organization. You will establish and evolve operational frameworks, lead complex cross-functional programs, and serve as a key advisor to design and business leadership.</p> <h2>Key Responsibilities</h2> <ul> <li>Define and implement organization-wide design operations strategy and vision</li> <li>Lead complex, high-impact operational initiatives that span multiple teams and departments</li> <li>Develop scalable frameworks and processes that enhance design team effectiveness</li> <li>Serve as a strategic advisor to design and business leadership</li> <li>Drive operational excellence and efficiency at scale</li> <li>Mentor and guide other design operations managers</li> </ul> <h2>Required Skills</h2> <ul> <li>10+ years of experience in design operations or related field</li> <li>Proven track record of leading strategic operational initiatives</li> <li>Excellence in organizational design and change management</li> <li>Strong business acumen and strategic thinking</li> <li>Outstanding leadership and influence skills</li> <li>Deep understanding of design processes, tools, and methodologies</li> </ul> <h2>Impact</h2> <p>Staff Design Ops Managers are expected to have organization-wide impact. They should demonstrate the ability to:</p> <ul> <li>Drive strategic operational initiatives that transform design effectiveness</li> <li>Influence organizational strategy through operational expertise</li> <li>Build and scale operational frameworks across the organization</li> <li>Lead through influence and mentor other design operations leaders</li> </ul> </div> </div> </div> </main> ` })} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops/staff-manager/index.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops/staff-manager/index.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/design-ops/staff-manager";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

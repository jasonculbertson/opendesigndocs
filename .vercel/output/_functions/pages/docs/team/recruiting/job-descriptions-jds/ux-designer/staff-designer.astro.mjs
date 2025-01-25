/* empty css                                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { C as ContentGate, $ as $$Layout } from '../../../../../../chunks/Layout_Y6JSbGsr.mjs';
export { r as renderers } from '../../../../../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$StaffDesigner = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbs = [
    { text: "Recruiting Team", href: "/docs/team/recruiting" },
    { text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" },
    { text: "UX Designer", href: "/docs/team/recruiting/job-descriptions-jds/ux-designer" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Staff UX Designer" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> ${index < breadcrumbs.length - 1 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} </li>`)} </ol> </nav> <div class="prose max-w-none"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px] mb-6">Staff UX Designer</h1> <h2 class="text-xl font-semibold mt-8 mb-4">About [Company Name]</h2> <p>Add a bit about your company here.</p> <h2 class="text-xl font-semibold mt-8 mb-4">Role Overview</h2> <p>As a Staff UX Designer at [Company Name], you will lead and contribute to the design of complex and high-impact product areas. This role requires an extensive understanding of user experience principles, strong leadership capabilities, and the ability to collaborate effectively with cross-functional teams. You will help shape and drive the design vision while ensuring the delivery of cohesive and user-centric solutions.</p> <h2 class="text-xl font-semibold mt-8 mb-4">What You'll Do</h2> <ul> <li>Lead the design process for large-scale product areas, developing innovative and user-centric solutions.</li> <li>Mentor and guide other designers, fostering professional growth and maintaining high standards.</li> <li>Conduct user research, usability testing, and data analysis to inform design decisions.</li> <li>Create detailed wireframes, user flows, prototypes, and high-fidelity mockups.</li> <li>Collaborate closely with product managers, engineers, and stakeholders to ensure cohesive user experiences.</li> <li>Develop and maintain design systems and style guides to ensure consistency across products.</li> </ul> <h2 class="text-xl font-semibold mt-8 mb-4">What We're Looking For</h2> <ul> <li>Bachelor's or Master's degree in Design, HCI, or a related field, or equivalent practical experience.</li> <li>10-15 years of experience in digital product design with a strong portfolio showcasing leadership in design projects.</li> <li>Expertise in one core area of design (e.g., visual design) and strong skills in two others (e.g., interaction design, prototyping).</li> <li>Excellent communication and presentation skills, capable of articulating design decisions clearly.</li> <li>Proficiency in design and prototyping tools such as Figma, Sketch, or Adobe Creative Suite.</li> <li>Strong leadership skills and a passion for user-centered design.</li> </ul> <h2 class="text-xl font-semibold mt-8 mb-4">Why Join [Company Name]</h2> <ul> <li>Be part of a rapidly growing company that's shaping the future of how people connect online.</li> <li>Contribute to a product that impacts millions of users worldwide, driving innovation in digital experiences.</li> <li>Enjoy a collaborative, inclusive, and creative work environment that values diversity and fosters professional growth.</li> <li>Benefit from a competitive compensation package, flexible work arrangements, and a commitment to work-life balance.</li> </ul> <p class="text-sm text-gray-600">[Company Name] is committed to providing a competitive compensation package. Our cash compensation amount for this role is targeted at $X-$X in X area. Final offer amounts are determined by multiple factors, including candidate expertise, the scope of role and level, and may vary from the amounts listed above.</p> </div> </article> </main> ` })} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-designer/staff-designer.astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-designer/staff-designer.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/ux-designer/staff-designer";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$StaffDesigner,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

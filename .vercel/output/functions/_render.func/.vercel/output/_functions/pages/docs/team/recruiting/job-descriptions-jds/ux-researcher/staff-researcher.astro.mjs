/* empty css                                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../../../../chunks/Layout_B1mFOIGo.mjs';
export { renderers } from '../../../../../../renderers.mjs';

const $$StaffResearcher = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbs = [
    { text: "Recruiting Team", href: "/docs/team/recruiting" },
    { text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" },
    { text: "UX Researcher", href: "/docs/team/recruiting/job-descriptions-jds/ux-researcher" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Staff Researcher" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="prose dark:prose-invert max-w-none"> <h1>Staff UX Researcher</h1> <h2>About [Company Name]</h2> <p>Add a bit about your company here.</p> <h2>Role Overview</h2> <p>As a Staff UX Researcher at [Company Name], you will be responsible for producing high-quality research that enhances our user experience and aligns with our strategic goals. This role requires a deep understanding of research methodologies, the ability to lead research initiatives, and a collaborative approach to working with cross-functional teams.</p> <h2>What You'll Do</h2> <ul> <li>Lead research projects that inform the design and development of user-centric products.</li> <li>Conduct and oversee usability testing, field studies, and other research activities.</li> <li>Analyze and synthesize research findings to generate actionable insights.</li> <li>Collaborate with designers, product managers, and other stakeholders to integrate research insights into product development.</li> <li>Mentor other researchers and ensure high standards of research quality.</li> <li>Maintain and update research documentation and processes.</li> </ul> <h2>What We're Looking For</h2> <ul> <li>Bachelor's or Master's degree in HCI, Psychology, Sociology, or a related field, or equivalent practical experience.</li> <li>10-15 years of experience in UX research with a strong portfolio.</li> <li>Expertise in research methodologies and data analysis.</li> <li>Excellent communication and presentation skills.</li> <li>Proficiency in research tools and software.</li> <li>Strong leadership skills and a collaborative approach.</li> </ul> <h2>Why Join [Company Name]</h2> <ul> <li>Be part of a rapidly growing company that's shaping the future of how people connect online.</li> <li>Contribute to a product that impacts millions of users worldwide, driving innovation in digital experiences.</li> <li>Enjoy a collaborative, inclusive, and creative work environment that values diversity and fosters professional growth.</li> <li>Benefit from a competitive compensation package, flexible work arrangements, and a commitment to work-life balance.</li> </ul> <p class="text-sm text-gray-600">[Company Name] is committed to providing a competitive compensation package. Our cash compensation amount for this role is targeted at $X-$X in X area. Final offer amounts are determined by multiple factors, including candidate expertise, the scope of role and level, and may vary from the amounts listed above.</p> </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-researcher/staff-researcher.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-researcher/staff-researcher.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/ux-researcher/staff-researcher";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$StaffResearcher,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

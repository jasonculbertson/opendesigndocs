/* empty css                                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../../../../chunks/Layout_B1mFOIGo.mjs';
export { renderers } from '../../../../../../renderers.mjs';

const $$StaffWriter = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbs = [
    { text: "Recruiting Team", href: "/docs/team/recruiting" },
    { text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" },
    { text: "UX Writer", href: "/docs/team/recruiting/job-descriptions-jds/ux-writer" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Staff Writer" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="prose dark:prose-invert max-w-none"> <h1>Staff Writer</h1> <h2>About [Company Name]</h2> <p>Add a bit about your company here.</p> <h2>Role Overview</h2> <p>As a Staff Writer at [Company Name], you will be responsible for producing high-quality content that enhances our user experience and aligns with our brand voice. This role requires a deep understanding of writing for digital platforms, the ability to lead content initiatives, and a collaborative approach to working with cross-functional teams.</p> <h2>What You'll Do</h2> <ul> <li>Lead content creation and strategy for key projects and initiatives.</li> <li>Produce and edit content for web, mobile, and other digital platforms.</li> <li>Help conduct comprehensive research to inform and support content development.</li> <li>Mentor and guide more junior writers, ensuring consistency and quality.</li> <li>Collaborate with designers, product managers, and other stakeholders to ensure cohesive user experiences.</li> <li>Develop and maintain content style guides and documentation.</li> </ul> <h2>What We're Looking For</h2> <ul> <li>Bachelor's degree in English, Communications, Journalism, or a related field, or equivalent practical experience.</li> <li>10-15 years of experience in content writing with a strong portfolio.</li> <li>Expertise in content strategy and writing for digital platforms.</li> <li>Excellent communication and presentation skills.</li> <li>Knowledge in SEO principles and best practices.</li> <li>Strong leadership skills and a collaborative approach.</li> </ul> <h2>Why Join [Company Name]</h2> <ul> <li>Be part of a rapidly growing company that's shaping the future of how people connect online.</li> <li>Contribute to a product that impacts millions of users worldwide, driving innovation in digital experiences.</li> <li>Enjoy a collaborative, inclusive, and creative work environment that values diversity and fosters professional growth.</li> <li>Benefit from a competitive compensation package, flexible work arrangements, and a commitment to work-life balance.</li> </ul> <p class="text-sm text-gray-600">[Company Name] is committed to providing a competitive compensation package. Our cash compensation amount for this role is targeted at $X-$X in X area. Final offer amounts are determined by multiple factors, including candidate expertise, the scope of role and level, and may vary from the amounts listed above.</p> </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-writer/staff-writer.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-writer/staff-writer.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/ux-writer/staff-writer";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$StaffWriter,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

/* empty css                                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../../../../chunks/Layout_B1mFOIGo.mjs';
export { renderers } from '../../../../../../renderers.mjs';

const $$PrincipalDesignOps = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbs = [
    { text: "Recruiting Team", href: "/docs/team/recruiting" },
    { text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" },
    { text: "Design Ops", href: "/docs/team/recruiting/job-descriptions-jds/design-ops" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Principal Design Ops" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="prose dark:prose-invert max-w-none"> <h1>Principal Design Ops</h1> <h2>About [Company Name]</h2> <p>Add a bit about your company here.</p> <h2>Role Overview</h2> <p>As a Principal DesignOps at [Company Name], you will lead and shape the design operations strategy across our platforms. This senior role requires extensive expertise in design operations, strategic thinking, and the ability to drive innovation. You will work closely with cross-functional teams to ensure that operational insights inform and guide our product development and design decisions.</p> <h2>What You'll Do</h2> <ul> <li>Define and drive the design operations strategy across major product areas.</li> <li>Lead and oversee complex operational projects, ensuring high standards of quality.</li> <li>Conduct and guide operational research to gather deep insights into processes and systems.</li> <li>Analyze and synthesize operational data to generate strategic insights.</li> <li>Present operational insights to senior stakeholders and influence strategic decisions.</li> <li>Mentor and guide senior DesignOps team members, fostering a culture of excellence and continuous improvement.</li> </ul> <h2>What We're Looking For</h2> <ul> <li>Bachelor's or Master's degree in Design, Business Administration, or a related field, or equivalent practical experience.</li> <li>15–20 years of experience in design operations with a strong portfolio showcasing leadership in innovative projects.</li> <li>Expertise in a wide range of operational methods and data analysis techniques.</li> <li>Excellent communication and presentation skills, capable of articulating complex operational insights and strategies.</li> <li>Proficiency in advanced design tools and project management software.</li> <li>Strong leadership skills and a strategic mindset, with the ability to influence senior stakeholders and drive change.</li> </ul> <h2>Why Join [Company Name]</h2> <ul> <li>Be part of a rapidly growing company that's shaping the future of how people connect online.</li> <li>Contribute to a product that impacts millions of users worldwide, driving innovation in digital experiences.</li> <li>Enjoy a collaborative, inclusive, and creative work environment that values diversity and fosters professional growth.</li> <li>Benefit from a competitive compensation package, flexible work arrangements, and a commitment to work-life balance.</li> </ul> <p class="text-sm text-gray-600">[Company Name] is committed to providing a competitive compensation package. Our cash compensation amount for this role is targeted at $X-$X in X area. Final offer amounts are determined by multiple factors, including candidate expertise, the scope of role and level, and may vary from the amounts listed above.</p> </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops/principal-design-ops.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops/principal-design-ops.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/design-ops/principal-design-ops";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PrincipalDesignOps,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

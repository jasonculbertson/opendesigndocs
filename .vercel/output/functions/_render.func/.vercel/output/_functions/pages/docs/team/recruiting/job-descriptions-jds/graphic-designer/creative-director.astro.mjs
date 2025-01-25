/* empty css                                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../../../../chunks/Layout_B1mFOIGo.mjs';
export { renderers } from '../../../../../../renderers.mjs';

const $$CreativeDirector = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbs = [
    { text: "Recruiting Team", href: "/docs/team/recruiting" },
    { text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" },
    { text: "Graphic Designer", href: "/docs/team/recruiting/job-descriptions-jds/graphic-designer" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Creative Director" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="prose dark:prose-invert max-w-none"> <h1>Creative Director</h1> <h2>About [Company Name]</h2> <p>Add a bit about your company here.</p> <h2>Role Overview</h2> <p>As a Creative Director at [Company Name], you will be the visionary behind our brand's visual and creative direction. This role involves setting and maintaining the highest creative standards across all design projects. You will collaborate closely with cross-functional teams to ensure a cohesive and impactful user experience. Your leadership will inspire and guide the design team to produce innovative and compelling visual content.</p> <h2>What You'll Do</h2> <ul> <li>Define and articulate a creative vision that aligns with [Company's] brand and business goals.</li> <li>Develop and maintain brand identity standards, style guides, and experience principles.</li> <li>Lead and oversee major design projects, ensuring high-quality creative output.</li> <li>Collaborate with marketing managers, marketing teams, and other stakeholders to drive cohesive and impactful creative strategies.</li> <li>Mentor and inspire the design team, fostering a culture of creativity and excellence.</li> <li>Stay updated with the latest design trends, tools, and technologies, and apply these insights to enhance [Company's} creative processes.</li> </ul> <h2>What We're Looking For</h2> <ul> <li>Bachelor's or Master's degree in Graphic Design, Visual Arts, or a related field, or equivalent practical experience.</li> <li>15+ years of experience in creative roles, with a strong portfolio showcasing leadership in innovative projects.</li> <li>Expertise in brand identity, visual design, and user experience.</li> <li>Excellent communication and presentation skills, capable of articulating creative concepts and strategies.</li> <li>Strong leadership and mentorship skills, with a track record of building and leading high-performing creative teams.</li> <li>Ability to work collaboratively with cross-functional teams and influence senior stakeholders.</li> </ul> <h2>Why Join [Company Name]</h2> <ul> <li>Be part of a rapidly growing company that's shaping the future of how people connect online.</li> <li>Contribute to a product that impacts millions of users worldwide, driving innovation in digital experiences.</li> <li>Enjoy a collaborative, inclusive, and creative work environment that values diversity and fosters professional growth.</li> <li>Benefit from a competitive compensation package, flexible work arrangements, and a commitment to work-life balance.</li> </ul> <p class="text-sm text-gray-600">[Company Name] is committed to providing a competitive compensation package. Our cash compensation amount for this role is targeted at $X-$X in X area. Final offer amounts are determined by multiple factors, including candidate expertise, the scope of role and level, and may vary from the amounts listed above.</p> </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/graphic-designer/creative-director.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/graphic-designer/creative-director.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/graphic-designer/creative-director";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CreativeDirector,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

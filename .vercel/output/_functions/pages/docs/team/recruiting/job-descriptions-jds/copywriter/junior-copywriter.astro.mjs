/* empty css                                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../../../../chunks/Layout_Y6JSbGsr.mjs';
export { r as renderers } from '../../../../../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$JuniorCopywriter = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbs = [
    { text: "Recruiting Team", href: "/docs/team/recruiting" },
    { text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" },
    { text: "Copywriter", href: "/docs/team/recruiting/job-descriptions-jds/copywriter" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Jr Copywriter" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="prose dark:prose-invert max-w-none"> <h1>Jr Copywriter</h1> <h2>About [Company Name]</h2> <p>Add a bit about your company here.</p> <h2>Role Overview</h2> <p>As a Junior Copywriter at [Company Name], you will assist in creating engaging and clear content that aligns with our brand voice and enhances the user experience. This entry-level position is perfect for individuals passionate about writing and eager to develop their skills in a collaborative environment.</p> <h2>What You'll Do</h2> <ul> <li>Write and edit content for web, mobile, and other digital platforms.</li> <li>Collaborate with senior writers and other team members on various projects.</li> <li>Maintain consistency with brand voice and style guidelines.</li> <li>Participate in content brainstorming sessions and team meetings.</li> <li>Stay updated with the latest writing and content trends.</li> </ul> <h2>What We're Looking For</h2> <ul> <li>Bachelor's degree in English, Communications, Journalism, or a related field, or equivalent practical experience.</li> <li>Solid writing and editing skills.</li> <li>Proficiency in writing tools such as Microsoft Word and Google Docs.</li> <li>Good communication and collaboration skills.</li> <li>Ability to work within established processes and follow direction from senior team members.</li> </ul> <h2>Why Join [Company Name]</h2> <ul> <li>Be part of a rapidly growing company that's shaping the future of how people connect online.</li> <li>Contribute to a product that impacts millions of users worldwide, driving innovation in digital experiences.</li> <li>Enjoy a collaborative, inclusive, and creative work environment that values diversity and fosters professional growth.</li> <li>Benefit from a competitive compensation package, flexible work arrangements, and a commitment to work-life balance.</li> </ul> <p class="text-sm text-gray-600">[Company Name] is committed to providing a competitive compensation package. Our cash compensation amount for this role is targeted at $X-$X in X area. Final offer amounts are determined by multiple factors, including candidate expertise, the scope of role and level, and may vary from the amounts listed above.</p> </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/copywriter/junior-copywriter.astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/copywriter/junior-copywriter.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/copywriter/junior-copywriter";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$JuniorCopywriter,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

/* empty css                                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { a as getEntry } from '../../../../../../chunks/_astro_content_DMupkL1M.mjs';
import { C as ContentGate, $ as $$Layout } from '../../../../../../chunks/Layout_B1mFOIGo.mjs';
export { renderers } from '../../../../../../renderers.mjs';

const $$Writer1 = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "team/recruiting/job-descriptions-jds/content-designer/writer-1");
  await entry.render();
  const title = entry.data.title;
  const breadcrumbs = [
    { text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" },
    { text: "Content Designer", href: "/docs/team/recruiting/job-descriptions-jds/content-designer" },
    { text: "Writer I", href: "/docs/team/recruiting/job-descriptions-jds/content-designer/writer-1" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="relative min-h-screen"> <div class="py-8 px-4 sm:px-6 lg:px-8"> <div class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="prose max-w-none prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:text-indigo-700"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px] mb-6">${title}</h1> <h2 class="text-xl font-semibold mt-8 mb-4">About [Company Name]</h2> <p>Add a bit about your company here.</p> <h2 class="text-xl font-semibold mt-8 mb-4">Role Overview</h2> <p>As a Writer I at [Company Name], you will be responsible for creating clear, concise, and engaging content that enhances the user experience across our products and platforms. This entry-level position is ideal for someone who is passionate about writing, has a strong grasp of UX principles, and is eager to learn and grow in a collaborative environment.</p> <h2 class="text-xl font-semibold mt-8 mb-4">What You'll Do</h2> <ul> <li>Write clear, concise, and user-friendly content for product interfaces</li> <li>Collaborate with designers and product managers to ensure content meets user needs</li> <li>Help maintain content style guides and documentation</li> <li>Participate in user research to understand content effectiveness</li> <li>Review and edit content for clarity, consistency, and brand voice</li> <li>Support content strategy initiatives</li> </ul> <h2 class="text-xl font-semibold mt-8 mb-4">What You'll Need</h2> <ul> <li>0-2 years of experience in UX writing, content design, or related field</li> <li>Strong writing and editing skills with attention to detail</li> <li>Basic understanding of UX design principles</li> <li>Ability to work collaboratively in a team environment</li> <li>Experience with content management systems and design tools</li> <li>Bachelor's degree in English, Communications, or related field (or equivalent experience)</li> </ul> <h2 class="text-xl font-semibold mt-8 mb-4">Benefits</h2> <ul> <li>Competitive salary and equity package</li> <li>Health, dental, and vision insurance</li> <li>Flexible work hours and location</li> <li>Professional development opportunities</li> <li>Generous vacation policy</li> </ul> </div> </div> </div> </main> ` })} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/content-designer/writer-1.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/content-designer/writer-1.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/content-designer/writer-1";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Writer1,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

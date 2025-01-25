/* empty css                                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { C as ContentGate, $ as $$Layout } from '../../../../../../chunks/Layout_B1mFOIGo.mjs';
export { renderers } from '../../../../../../renderers.mjs';

const $$Designer2 = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbs = [
    { text: "Recruiting Team", href: "/docs/team/recruiting" },
    { text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" },
    { text: "UX Designer", href: "/docs/team/recruiting/job-descriptions-jds/ux-designer" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Designer II" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="relative min-h-screen"> <div class="py-8"> <div class="mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> ${index < breadcrumbs.length - 1 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} </li>`)} </ol> </nav> <div class="prose max-w-none prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:text-indigo-700"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px] mb-6">Designer II</h1> <h2 class="text-xl font-semibold mt-8 mb-4">About [Company Name]</h2> <p>Add a bit about your company here.</p> <h2 class="text-xl font-semibold mt-8 mb-4">Role Overview</h2> <p>As a UX Designer II at [Company Name], you will deepen your craft and contribute to the development of user-centric digital experiences. With your growing expertise, you will handle broader feature-level responsibilities and actively contribute to design discussions and decisions. This role is ideal for someone with 2–5 years of experience who is ready to take on more complex design challenges and collaborate with cross-functional teams.</p> <h2 class="text-xl font-semibold mt-8 mb-4">What You'll Do</h2> <ul> <li>Execute design solutions for specific product capabilities and features (e.g., shopping cart).</li> <li>Participate in user research, usability testing, and data analysis to inform design decisions.</li> <li>Create wireframes, user flows, prototypes, and high-fidelity mockups to communicate design concepts.</li> <li>Work within established design processes and collaborate closely with team leads.</li> <li>Actively contribute to cross-functional meetings, offering insights and feedback on design-related matters.</li> </ul> <h2 class="text-xl font-semibold mt-8 mb-4">What We're Looking For</h2> <ul> <li>Bachelor's degree in Design, HCI, or a related field, or equivalent practical experience.</li> <li>2–5 years of experience in digital product design, with contributions to shipped projects.</li> <li>A portfolio showcasing your contributions to various design projects, emphasizing your growing expertise.</li> <li>Strong skills in two core areas of design (e.g., visual design, interaction design) and capability in two others (e.g., prototyping, information architecture).</li> <li>Excellent communication and presentation skills, capable of articulating design decisions and rationale clearly.</li> <li>Proficiency in design and prototyping tools such as Figma, Origami, or Adobe Creative Suite.</li> </ul> <h2 class="text-xl font-semibold mt-8 mb-4">Why Join [Company Name]</h2> <ul> <li>Be part of a rapidly growing company that's shaping the future of how people connect online.</li> <li>Contribute to a product that impacts millions of users worldwide, driving innovation in digital experiences.</li> <li>Enjoy a collaborative, inclusive, and creative work environment that values diversity and fosters professional growth.</li> <li>Benefit from a competitive compensation package, flexible work arrangements, and a commitment to work-life balance.</li> </ul> <p class="text-sm text-gray-600">[Company Name] is committed to providing a competitive compensation package. Our cash compensation amount for this role is targeted at $X-$X in X area. Final offer amounts are determined by multiple factors, including candidate expertise, the scope of role and level, and may vary from the amounts listed above.</p> </div> </div> </div> </main> ` })} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-designer/designer-2.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-designer/designer-2.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/ux-designer/designer-2";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Designer2,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

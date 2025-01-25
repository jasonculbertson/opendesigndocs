/* empty css                                        */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../chunks/Layout_Y6JSbGsr.mjs';
import { $ as $$Card } from '../../../chunks/Card_aHuNCa9A.mjs';
export { r as renderers } from '../../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const resources = [
    {
      title: "Self Evaluation",
      description: "Use the Level Competencies for self-assessment and growth planning",
      href: "/docs/leadership/quarter-1/self-evaluation",
      image: "\u{1F4DD}"
    },
    {
      title: "Short-Term Growth Exercise",
      description: "Set and achieve quarterly goals for professional development",
      href: "/docs/leadership/quarter-1/short-term-growth-exercise",
      image: "\u{1F3AF}"
    }
  ];
  const title = "Quarter 1";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <div class="mb-8"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">${title}</h1> </div> <div class="grid grid-cols-1 gap-4"> ${resources.map((resource) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...resource })}`)} </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/quarter-1/index.astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/quarter-1/index.astro";
const $$url = "/docs/leadership/quarter-1";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

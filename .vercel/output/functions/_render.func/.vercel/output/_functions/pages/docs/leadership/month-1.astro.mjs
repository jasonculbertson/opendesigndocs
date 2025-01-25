/* empty css                                        */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../chunks/Layout_B1mFOIGo.mjs';
import { $ as $$Card } from '../../../chunks/Card_BAkaDri_.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const resources = [
    {
      title: "Design Team Levels / Titles",
      description: "Clarify roles within the team",
      href: "/docs/leadership/month-1/designer-levels-titles",
      image: "\u{1F4CA}"
    },
    {
      title: "Level Competencies",
      description: "Establish skill expectations and growth paths",
      href: "/docs/leadership/month-1/level-competencies",
      image: "\u{1F3AF}"
    }
  ];
  const title = "Month 1";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <div class="mb-8"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">${title}</h1> </div> <div class="grid grid-cols-1 gap-4"> ${resources.map((resource) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...resource })}`)} </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/month-1/index.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/month-1/index.astro";
const $$url = "/docs/leadership/month-1";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

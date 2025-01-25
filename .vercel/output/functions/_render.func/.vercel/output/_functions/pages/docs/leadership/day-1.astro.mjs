/* empty css                                        */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../chunks/Layout_B1mFOIGo.mjs';
import { $ as $$Card } from '../../../chunks/Card_BAkaDri_.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const resources = [
    {
      title: "Leadership Blueprint",
      description: "Define your leadership style and vision for your team",
      href: "/docs/leadership/day-1/leadership-blueprint",
      image: "\u{1F3AF}"
    },
    {
      title: "30/60/90 Day Plan",
      description: "Set clear, achievable goals for your first three months",
      href: "/docs/leadership/day-1/30-60-90-plan",
      image: "\u{1F4C5}"
    }
  ];
  const title = "Day 1";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto px-4 sm:px-0"> <div class="mb-8"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">${title}</h1> </div> <div class="grid grid-cols-1 gap-4"> ${resources.map((resource) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...resource })}`)} </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/day-1/index.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/day-1/index.astro";
const $$url = "/docs/leadership/day-1";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

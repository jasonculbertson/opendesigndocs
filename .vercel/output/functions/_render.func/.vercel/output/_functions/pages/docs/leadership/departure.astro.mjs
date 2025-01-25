/* empty css                                        */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../chunks/Layout_B1mFOIGo.mjs';
import { $ as $$Card } from '../../../chunks/Card_BAkaDri_.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const resources = [
    {
      title: "Transition Plan",
      description: "Create a comprehensive plan for transitioning responsibilities",
      href: "/docs/leadership/departure/transition-plan",
      image: "\u{1F4CB}"
    }
  ];
  const title = "Departure";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="py-8 px-4 sm:px-6 lg:px-8"> <div class="max-w-[680px] mx-auto"> <div class="mb-8"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">${title}</h1> </div> <div class="grid grid-cols-1 gap-4"> ${resources.map((resource) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...resource })}`)} </div> </div> </div> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/departure/index.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/departure/index.astro";
const $$url = "/docs/leadership/departure";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

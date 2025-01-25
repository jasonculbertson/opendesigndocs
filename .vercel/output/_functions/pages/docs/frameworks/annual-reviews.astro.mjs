/* empty css                                        */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { a as getEntry } from '../../../chunks/_astro_content_BJV_w-Ei.mjs';
import { $ as $$Layout, C as ContentGate } from '../../../chunks/Layout_Y6JSbGsr.mjs';
export { r as renderers } from '../../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "leadership/quarter-2/individual-assessment");
  const { Content } = await entry.render();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": entry.data.title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="relative min-h-screen"> <div class="py-8 px-4 sm:px-6 lg:px-8"> <div class="max-w-[680px] mx-auto"> <div class="prose max-w-none prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:text-indigo-700"> ${renderComponent($$result3, "Content", Content, {})} </div> </div> </div> </main> ` })} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/frameworks/annual-reviews/index.astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/frameworks/annual-reviews/index.astro";
const $$url = "/docs/frameworks/annual-reviews";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

/* empty css                                           */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { a as getEntry } from '../../../../chunks/_astro_content_DMupkL1M.mjs';
import { $ as $$Layout, C as ContentGate } from '../../../../chunks/Layout_B1mFOIGo.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$DesignerLevelsTitles = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "leadership/month-1/designer-levels-titles");
  const { Content } = await entry.render();
  const breadcrumbs = [
    { text: "Month 1", href: "/docs/leadership/month-1" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": entry.data.title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="relative min-h-screen"> <div class="py-8 px-4 sm:px-6 lg:px-8"> <div class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb) => renderTemplate`<li> <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="prose max-w-none prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:text-indigo-700"> ${renderComponent($$result3, "Content", Content, {})} </div> </div> </div> </main> ` })} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/month-1/designer-levels-titles.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/month-1/designer-levels-titles.astro";
const $$url = "/docs/leadership/month-1/designer-levels-titles";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$DesignerLevelsTitles,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

/* empty css                                              */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { a as getEntry } from '../../../../../chunks/_astro_content_8fVFpeqL.mjs';
import { C as ContentGate, $ as $$Layout } from '../../../../../chunks/Layout_B1mFOIGo.mjs';
export { renderers } from '../../../../../renderers.mjs';

const $$Designer1 = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "frameworks/job-descriptions/graphic-designer/designer-1");
  const { Content } = await entry.render();
  const title = "Graphic Designer I";
  const breadcrumbs = [
    { text: "Job Descriptions", href: "/docs/frameworks/job-descriptions" },
    { text: "Graphic Designer", href: "/docs/frameworks/job-descriptions/graphic-designer" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="relative min-h-screen"> <div class="py-8 px-4 sm:px-6 lg:px-8"> <div class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="prose prose-blue max-w-none"> ${renderComponent($$result3, "Content", Content, {})} </div> </div> </div> </main> ` })} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/frameworks/job-descriptions/graphic-designer/designer-1.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/frameworks/job-descriptions/graphic-designer/designer-1.astro";
const $$url = "/docs/frameworks/job-descriptions/graphic-designer/designer-1";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Designer1,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

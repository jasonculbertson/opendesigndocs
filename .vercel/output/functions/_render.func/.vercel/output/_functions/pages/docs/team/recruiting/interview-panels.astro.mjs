/* empty css                                           */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { a as getEntry } from '../../../../chunks/_astro_content_DMupkL1M.mjs';
import { $ as $$Layout } from '../../../../chunks/Layout_B1mFOIGo.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "team/recruiting/interview-panels");
  const { Content } = await entry.render();
  const title = entry.data.title;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <div class="prose max-w-none"> ${renderComponent($$result2, "Content", Content, {})} </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/interview-panels/index.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/interview-panels/index.astro";
const $$url = "/docs/team/recruiting/interview-panels";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

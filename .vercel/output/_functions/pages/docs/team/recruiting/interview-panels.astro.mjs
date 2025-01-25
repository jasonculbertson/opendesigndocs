/* empty css                                           */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../../../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { a as getEntry } from '../../../../chunks/_astro_content_BJV_w-Ei.mjs';
import { $ as $$Layout } from '../../../../chunks/Layout_Y6JSbGsr.mjs';
export { r as renderers } from '../../../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "team/recruiting/interview-panels");
  const { Content } = await entry.render();
  const title = entry.data.title;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <div class="prose max-w-none"> ${renderComponent($$result2, "Content", Content, {})} </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/interview-panels/index.astro", undefined);

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

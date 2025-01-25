/* empty css                                  */
import { c as createComponent, r as renderTemplate, b as createAstro } from '../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import 'clsx';
export { r as renderers } from '../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  if (Astro2.request.url.endsWith("/")) {
    return Astro2.redirect("/home");
  }
  return renderTemplate`<meta http-equiv="refresh" content="0;url=/home">`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/index.astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

/* empty css                                     */
import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../chunks/_astro_content_BJV_w-Ei.mjs';
import { $ as $$Layout } from '../../chunks/Layout_Y6JSbGsr.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$Astro = createAstro();
const prerender = true;
async function getStaticPaths() {
  const docs = await getCollection("docs");
  return docs.map((entry) => {
    const slug = entry.slug.replace(/\/index$/, "");
    return {
      params: { slug },
      props: { entry }
    };
  });
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { entry } = Astro2.props;
  const { Content } = await entry.render();
  const currentPath = Astro2.url.pathname;
  const urlSegments = currentPath.split("/").filter(Boolean);
  const showBreadcrumbs = urlSegments[0] === "docs" && urlSegments[1] === "frameworks" && (urlSegments[2] === "job-descriptions" || urlSegments[2] === "level-competencies") && urlSegments.length === 5;
  const breadcrumbs = showBreadcrumbs ? [
    {
      text: urlSegments[2] === "job-descriptions" ? "Job Descriptions" : "Level Competencies".replace("level", "Level"),
      href: `/docs/frameworks/${urlSegments[2]}`
    },
    {
      text: urlSegments[3].split("-").map((word) => {
        if (word.toLowerCase() === "ux") return "UX";
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(" "),
      href: `/docs/frameworks/${urlSegments[2]}/${urlSegments[3]}`
    }
  ] : [];
  if (!Content) {
    return Astro2.redirect("/404");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": entry.data.title, "showBackButton": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-10"> <article class="max-w-[680px]"> ${breadcrumbs.length > 0 && renderTemplate`<nav class="flex mb-8" aria-label="Breadcrumb"> <ol class="flex items-center space-x-2"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav>`} <div class="prose prose-slate max-w-none"> ${renderComponent($$result2, "Content", Content, {})} </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/[...slug].astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/[...slug].astro";
const $$url = "/docs/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

/* empty css                                           */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { a as getEntry } from '../../../../chunks/_astro_content_BJV_w-Ei.mjs';
import { $ as $$Layout } from '../../../../chunks/Layout_Y6JSbGsr.mjs';
import { $ as $$Card } from '../../../../chunks/Card_aHuNCa9A.mjs';
export { r as renderers } from '../../../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$JobDescriptionsJds = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "team/recruiting/job-descriptions-jds");
  await entry.render();
  const breadcrumbs = [
    { text: "Recruiting Team", href: "/docs/team/recruiting" }
  ];
  const productRoles = [
    {
      title: "Product Designer",
      description: "Product Designer job description template",
      href: "/docs/team/recruiting/job-descriptions-jds/product-designer",
      image: "\u{1F3A8}"
    },
    {
      title: "Content Designer",
      description: "Content Designer job description template",
      href: "/docs/team/recruiting/job-descriptions-jds/content-designer",
      image: "\u270D\uFE0F"
    },
    {
      title: "UX Researcher",
      description: "UX Researcher job description template",
      href: "/docs/team/recruiting/job-descriptions-jds/ux-researcher",
      image: "\u{1F50D}"
    },
    {
      title: "Design Ops",
      description: "Design Operations job description template",
      href: "/docs/team/recruiting/job-descriptions-jds/design-ops",
      image: "\u2699\uFE0F"
    }
  ];
  const creativeRoles = [
    {
      title: "Graphic Designer",
      description: "Graphic Designer job description template",
      href: "/docs/team/recruiting/job-descriptions-jds/graphic-designer",
      image: "\u{1F3A8}"
    },
    {
      title: "Copywriter",
      description: "Copywriter job description template",
      href: "/docs/team/recruiting/job-descriptions-jds/copywriter",
      image: "\u270D\uFE0F"
    }
  ];
  const title = "Job Descriptions";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto px-4 sm:px-0"> <nav class="flex mb-8" aria-label="Breadcrumb"> <ol class="flex items-center space-x-2"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="mb-8"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">${title}</h1> </div> <div class="space-y-8"> <section> <h2 class="text-[20px] font-semibold text-[#1a1f36] mb-4">Product Roles</h2> <div class="grid grid-cols-1 gap-4"> ${productRoles.map((role) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...role })}`)} </div> </section> <section> <h2 class="text-[20px] font-semibold text-[#1a1f36] mb-4">Creative Roles</h2> <div class="grid grid-cols-1 gap-4"> ${creativeRoles.map((role) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...role })}`)} </div> </section> </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds.astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$JobDescriptionsJds,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

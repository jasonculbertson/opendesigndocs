/* empty css                                           */
import { c as createComponent, r as renderTemplate, d as renderComponent } from '../../../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { a as getEntry } from '../../../../chunks/_astro_content_BJV_w-Ei.mjs';
import { $ as $$CompetencyLayout } from '../../../../chunks/CompetencyLayout_B_puTHL1.mjs';
export { r as renderers } from '../../../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$Researcher = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "leadership/month-1/level-competencies/researcher");
  const { Content } = await entry.render();
  const breadcrumbs = [
    { text: "Level Competencies", href: "/docs/frameworks/level-competencies" }
  ];
  const frontmatter = {
    title: entry.data.title,
    ...entry.data
  };
  return renderTemplate`${renderComponent($$result, "CompetencyLayout", $$CompetencyLayout, { "frontmatter": frontmatter, "breadcrumbs": breadcrumbs }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/frameworks/level-competencies/researcher.astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/frameworks/level-competencies/researcher.astro";
const $$url = "/docs/frameworks/level-competencies/researcher";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Researcher,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

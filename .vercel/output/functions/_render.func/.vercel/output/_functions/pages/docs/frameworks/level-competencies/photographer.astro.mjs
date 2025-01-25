/* empty css                                           */
import { c as createComponent, r as renderTemplate, d as renderComponent } from '../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { a as getEntry } from '../../../../chunks/_astro_content_DMupkL1M.mjs';
import { $ as $$CompetencyLayout } from '../../../../chunks/CompetencyLayout_DfQ8Xet6.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Photographer = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "leadership/month-1/level-competencies/photographer");
  const { Content } = await entry.render();
  const breadcrumbs = [
    { text: "Level Competencies", href: "/docs/frameworks/level-competencies" }
  ];
  const frontmatter = {
    title: entry.data.title,
    ...entry.data
  };
  return renderTemplate`${renderComponent($$result, "CompetencyLayout", $$CompetencyLayout, { "frontmatter": frontmatter, "breadcrumbs": breadcrumbs }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/frameworks/level-competencies/photographer.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/frameworks/level-competencies/photographer.astro";
const $$url = "/docs/frameworks/level-competencies/photographer";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Photographer,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

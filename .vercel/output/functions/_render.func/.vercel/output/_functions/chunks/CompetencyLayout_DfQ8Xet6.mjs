import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead, a as addAttribute, e as renderSlot } from './astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { $ as $$Layout, C as ContentGate } from './Layout_B1mFOIGo.mjs';

const $$Astro = createAstro();
const $$CompetencyLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CompetencyLayout;
  const { frontmatter, breadcrumbs } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": frontmatter.title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} ${crumb.href ? renderTemplate`<a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a>` : renderTemplate`<span class="text-sm text-gray-900">${crumb.text}</span>`} </li>`)} </ol> </nav> <div class="prose prose-blue max-w-none"> ${renderSlot($$result3, $$slots["default"])} </div> </article> </main> ` })} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/layouts/CompetencyLayout.astro", void 0);

export { $$CompetencyLayout as $ };

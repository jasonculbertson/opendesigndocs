/* empty css                                           */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { a as getEntry } from '../../../../chunks/_astro_content_8fVFpeqL.mjs';
import { $ as $$Layout } from '../../../../chunks/Layout_B1mFOIGo.mjs';
import { $ as $$Card } from '../../../../chunks/Card_BAkaDri_.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$LevelCompetencies = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "leadership/month-1/level-competencies");
  await entry.render();
  const breadcrumbs = [
    { text: "Month 1", href: "/docs/leadership/month-1" }
  ];
  const productRoles = [
    {
      title: "Product Designer",
      description: "Skills and expectations for product designers at each level",
      href: "/docs/leadership/month-1/level-competencies/product-designer",
      image: "\u{1F3A8}"
    },
    {
      title: "Content Designer",
      description: "Skills and expectations for content designers at each level",
      href: "/docs/leadership/month-1/level-competencies/content-designer",
      image: "\u270D\uFE0F"
    },
    {
      title: "UX Researcher",
      description: "Skills and expectations for researchers at each level",
      href: "/docs/leadership/month-1/level-competencies/researcher",
      image: "\u{1F50D}"
    },
    {
      title: "Design Ops",
      description: "Skills and expectations for design operations at each level",
      href: "/docs/leadership/month-1/level-competencies/design-ops",
      image: "\u2699\uFE0F"
    }
  ];
  const creativeRoles = [
    {
      title: "Graphic Designer",
      description: "Skills and expectations for graphic designers at each level",
      href: "/docs/leadership/month-1/level-competencies/graphic-designer",
      image: "\u{1F3A8}"
    },
    {
      title: "Copywriter",
      description: "Skills and expectations for copywriters at each level",
      href: "/docs/leadership/month-1/level-competencies/copywriter",
      image: "\u270D\uFE0F"
    },
    {
      title: "Photographer",
      description: "Level competencies for photographers",
      href: "/docs/leadership/month-1/level-competencies/photographer",
      image: "\u{1F4F8}"
    }
  ];
  const managerRoles = [
    {
      title: "UX Manager",
      description: "Skills and expectations for design managers at each level",
      href: "/docs/leadership/month-1/level-competencies/manager",
      image: "\u{1F465}"
    }
  ];
  const title = "Level Competencies";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto px-4 sm:px-0"> <nav class="flex mb-8" aria-label="Breadcrumb"> <ol class="flex items-center space-x-2"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="mb-8"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">${title}</h1> </div> <div class="space-y-8"> <section> <h2 class="text-[20px] font-semibold text-[#1a1f36] mb-4">Product Roles</h2> <div class="grid grid-cols-1 gap-4"> ${productRoles.map((role) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...role })}`)} </div> </section> <section> <h2 class="text-[20px] font-semibold text-[#1a1f36] mb-4">Creative Roles</h2> <div class="grid grid-cols-1 gap-4"> ${creativeRoles.map((role) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...role })}`)} </div> </section> <section> <h2 class="text-[20px] font-semibold text-[#1a1f36] mb-4">Manager Roles</h2> <div class="grid grid-cols-1 gap-4"> ${managerRoles.map((role) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...role })}`)} </div> </section> </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/month-1/level-competencies.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/month-1/level-competencies.astro";
const $$url = "/docs/leadership/month-1/level-competencies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$LevelCompetencies,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

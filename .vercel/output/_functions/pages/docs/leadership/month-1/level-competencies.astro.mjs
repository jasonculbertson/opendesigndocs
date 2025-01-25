/* empty css                                           */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../../chunks/Layout_Y6JSbGsr.mjs';
import { $ as $$Card } from '../../../../chunks/Card_aHuNCa9A.mjs';
export { r as renderers } from '../../../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const title = "Level Competencies";
  const breadcrumbs = [
    { text: "Month 1", href: "/docs/month-1" }
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
      title: "Design Manager",
      description: "Skills and expectations for design managers at each level",
      href: "/docs/leadership/month-1/level-competencies/manager",
      image: "\u{1F465}"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb) => renderTemplate`<li> <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="mb-8"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">${title}</h1> </div> <div class="space-y-12"> <section> <h2 class="text-xl font-semibold text-[#1a1f36] mb-6">Product Roles</h2> <div class="grid grid-cols-1 gap-4"> ${productRoles.map((role) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...role })}`)} </div> </section> <section> <h2 class="text-xl font-semibold text-[#1a1f36] mb-6">Creative Role Competencies</h2> <div class="grid grid-cols-1 gap-4"> ${creativeRoles.map((role) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...role })}`)} </div> </section> <section> <h2 class="text-xl font-semibold text-[#1a1f36] mb-6">Manager Role Competencies</h2> <div class="grid grid-cols-1 gap-4"> ${managerRoles.map((role) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...role })}`)} </div> </section> </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/month-1/level-competencies/index.astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/month-1/level-competencies/index.astro";
const $$url = "/docs/leadership/month-1/level-competencies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

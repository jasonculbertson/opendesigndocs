/* empty css                                              */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { a as getEntry } from '../../../../../chunks/_astro_content_DMupkL1M.mjs';
import { $ as $$Layout } from '../../../../../chunks/Layout_B1mFOIGo.mjs';
import { $ as $$Card } from '../../../../../chunks/Card_BAkaDri_.mjs';
export { renderers } from '../../../../../renderers.mjs';

const $$DesignOps = createComponent(async ($$result, $$props, $$slots) => {
  await getEntry("docs", "team/recruiting/job-descriptions-jds/design-ops");
  const title = "Design Operations";
  const breadcrumbs = [
    { text: "Recruiting Team", href: "/docs/team/recruiting" },
    { text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" }
  ];
  const designOpsLevels = [
    {
      title: "Design Ops Manager I",
      description: "Skills and expectations for L1 design ops managers",
      href: "/docs/team/recruiting/job-descriptions-jds/design-ops/manager-1",
      image: "\u{1F331}"
    },
    {
      title: "Design Ops Manager II",
      description: "Skills and expectations for L2 design ops managers",
      href: "/docs/team/recruiting/job-descriptions-jds/design-ops/manager-2",
      image: "\u26A1"
    },
    {
      title: "Sr. Design Ops Manager",
      description: "Skills and expectations for L3 design ops managers",
      href: "/docs/team/recruiting/job-descriptions-jds/design-ops/senior-manager",
      image: "\u{1F680}"
    },
    {
      title: "Lead Design Ops Manager",
      description: "Skills and expectations for L4 design ops managers",
      href: "/docs/team/recruiting/job-descriptions-jds/design-ops/lead-manager",
      image: "\u{1F465}"
    },
    {
      title: "Staff Design Ops Manager",
      description: "Skills and expectations for L5 design ops managers",
      href: "/docs/team/recruiting/job-descriptions-jds/design-ops/staff-manager",
      image: "\u2B50"
    },
    {
      title: "Principal Design Ops Manager",
      description: "Skills and expectations for L6 design ops managers",
      href: "/docs/team/recruiting/job-descriptions-jds/design-ops/principal-manager",
      image: "\u{1F3AF}"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="mb-8"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">${title}</h1> </div> <div class="grid grid-cols-1 gap-4"> ${designOpsLevels.map((level) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...level })}`)} </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops.astro";
const $$url = "/docs/team/recruiting/job-descriptions-jds/design-ops";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$DesignOps,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

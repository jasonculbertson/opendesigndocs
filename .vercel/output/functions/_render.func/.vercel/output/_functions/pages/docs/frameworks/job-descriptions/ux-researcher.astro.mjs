/* empty css                                           */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { a as getEntry } from '../../../../chunks/_astro_content_8fVFpeqL.mjs';
import { $ as $$Layout } from '../../../../chunks/Layout_B1mFOIGo.mjs';
import { $ as $$Card } from '../../../../chunks/Card_BAkaDri_.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$UxResearcher = createComponent(async ($$result, $$props, $$slots) => {
  await getEntry("docs", "frameworks/job-descriptions/ux-researcher");
  const title = "UX Researcher";
  const breadcrumbs = [
    { text: "Job Descriptions", href: "/docs/frameworks/job-descriptions" }
  ];
  const researcherLevels = [
    {
      title: "Researcher I",
      description: "Skills and expectations for entry-level researchers",
      href: "/docs/frameworks/job-descriptions/ux-researcher/researcher-1",
      image: "\u{1F331}"
    },
    {
      title: "Researcher II",
      description: "Skills and expectations for mid-level researchers",
      href: "/docs/frameworks/job-descriptions/ux-researcher/researcher-2",
      image: "\u26A1"
    },
    {
      title: "Sr. Researcher",
      description: "Skills and expectations for senior researchers",
      href: "/docs/frameworks/job-descriptions/ux-researcher/senior-researcher",
      image: "\u{1F680}"
    },
    {
      title: "Lead Researcher",
      description: "Skills and expectations for lead researchers",
      href: "/docs/frameworks/job-descriptions/ux-researcher/lead-researcher",
      image: "\u{1F465}"
    },
    {
      title: "Staff Researcher",
      description: "Skills and expectations for staff researchers",
      href: "/docs/frameworks/job-descriptions/ux-researcher/staff-researcher",
      image: "\u2B50"
    },
    {
      title: "Principal Researcher",
      description: "Skills and expectations for principal researchers",
      href: "/docs/frameworks/job-descriptions/ux-researcher/principal-researcher",
      image: "\u{1F3AF}"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="mb-8"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">${title}</h1> </div> <div class="grid grid-cols-1 gap-4"> ${researcherLevels.map((level) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...level })}`)} </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/frameworks/job-descriptions/ux-researcher.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/frameworks/job-descriptions/ux-researcher.astro";
const $$url = "/docs/frameworks/job-descriptions/ux-researcher";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$UxResearcher,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

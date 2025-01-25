/* empty css                                           */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../chunks/astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { a as getEntry } from '../../../../chunks/_astro_content_8fVFpeqL.mjs';
import { $ as $$Layout } from '../../../../chunks/Layout_B1mFOIGo.mjs';
import { $ as $$Card } from '../../../../chunks/Card_BAkaDri_.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Copywriter = createComponent(async ($$result, $$props, $$slots) => {
  await getEntry("docs", "frameworks/job-descriptions/copywriter");
  const title = "Copywriter";
  const breadcrumbs = [
    { text: "Job Descriptions", href: "/docs/frameworks/job-descriptions" }
  ];
  const copywriterLevels = [
    {
      title: "Copywriter I",
      description: "Skills and expectations for entry-level copywriters",
      href: "/docs/frameworks/job-descriptions/copywriter/copywriter-1",
      image: "\u{1F331}"
    },
    {
      title: "Copywriter II",
      description: "Skills and expectations for mid-level copywriters",
      href: "/docs/frameworks/job-descriptions/copywriter/copywriter-2",
      image: "\u26A1"
    },
    {
      title: "Sr. Copywriter",
      description: "Skills and expectations for senior copywriters",
      href: "/docs/frameworks/job-descriptions/copywriter/senior-copywriter",
      image: "\u{1F680}"
    },
    {
      title: "Lead Copywriter",
      description: "Skills and expectations for lead copywriters",
      href: "/docs/frameworks/job-descriptions/copywriter/lead-copywriter",
      image: "\u{1F465}"
    },
    {
      title: "Staff Copywriter",
      description: "Skills and expectations for staff copywriters",
      href: "/docs/frameworks/job-descriptions/copywriter/staff-copywriter",
      image: "\u2B50"
    },
    {
      title: "Principal Copywriter",
      description: "Skills and expectations for principal copywriters",
      href: "/docs/frameworks/job-descriptions/copywriter/principal-copywriter",
      image: "\u{1F3AF}"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="mb-8"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">${title}</h1> </div> <div class="grid grid-cols-1 gap-4"> ${copywriterLevels.map((level) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...level })}`)} </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/frameworks/job-descriptions/copywriter.astro", void 0);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/frameworks/job-descriptions/copywriter.astro";
const $$url = "/docs/frameworks/job-descriptions/copywriter";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Copywriter,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

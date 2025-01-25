/* empty css                                           */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { a as getEntry } from '../../../../chunks/_astro_content_BJV_w-Ei.mjs';
import { C as ContentGate, $ as $$Layout } from '../../../../chunks/Layout_Y6JSbGsr.mjs';
import { $ as $$Card } from '../../../../chunks/Card_aHuNCa9A.mjs';
export { r as renderers } from '../../../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$UxWriter = createComponent(async ($$result, $$props, $$slots) => {
  await getEntry("docs", "frameworks/job-descriptions/ux-writer");
  const title = "UX Writer";
  const breadcrumbs = [
    { text: "Job Descriptions", href: "/docs/frameworks/job-descriptions" }
  ];
  const writerLevels = [
    {
      title: "Writer I",
      description: "Skills and expectations for entry-level writers",
      href: "/docs/frameworks/job-descriptions/ux-writer/writer-1",
      image: "\u{1F331}"
    },
    {
      title: "Writer II",
      description: "Skills and expectations for mid-level writers",
      href: "/docs/frameworks/job-descriptions/ux-writer/writer-2",
      image: "\u26A1"
    },
    {
      title: "Sr. Writer",
      description: "Skills and expectations for senior writers",
      href: "/docs/frameworks/job-descriptions/ux-writer/senior-writer",
      image: "\u{1F680}"
    },
    {
      title: "Lead Writer",
      description: "Skills and expectations for lead writers",
      href: "/docs/frameworks/job-descriptions/ux-writer/lead-writer",
      image: "\u{1F465}"
    },
    {
      title: "Staff Writer",
      description: "Skills and expectations for staff writers",
      href: "/docs/frameworks/job-descriptions/ux-writer/staff-writer",
      image: "\u2B50"
    },
    {
      title: "Principal Writer",
      description: "Skills and expectations for principal writers",
      href: "/docs/frameworks/job-descriptions/ux-writer/principal-writer",
      image: "\u{1F3AF}"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="py-8 px-4 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto"> <nav class="flex mb-2" aria-label="Breadcrumb"> <ol class="flex items-center"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-gray-400">/</span>`} <a${addAttribute(crumb.href, "href")} class="text-sm text-gray-600 hover:text-gray-900"> ${crumb.text} </a> </li>`)} </ol> </nav> <div class="mb-8"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">${title}</h1> </div> <div class="grid grid-cols-1 gap-4"> ${writerLevels.map((level) => renderTemplate`${renderComponent($$result3, "Card", $$Card, { ...level })}`)} </div> </article> </main> ` })} ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/frameworks/job-descriptions/ux-writer.astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/frameworks/job-descriptions/ux-writer.astro";
const $$url = "/docs/frameworks/job-descriptions/ux-writer";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$UxWriter,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

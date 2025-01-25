/* empty css                                        */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../chunks/Layout_Y6JSbGsr.mjs';
import { $ as $$VideoCard } from '../../../chunks/VideoCard_DeNjw--N.mjs';
export { r as renderers } from '../../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const $$Interviews = createComponent(($$result, $$props, $$slots) => {
  const videos = [
    {
      title: "From designer to founder \u2014 Masoud Ardestani on building Rapha and making hiring human.",
      timestamp: "November 30, 2023",
      duration: "56:16",
      thumbnailUrl: "https://img.youtube.com/vi/SpGlXrvzQeE/maxresdefault.jpg",
      href: "https://www.youtube.com/watch?v=SpGlXrvzQeE"
    }
  ];
  const title = "Design Leadership Interviews";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="py-8 sm:px-6 lg:px-8"> <article class="max-w-[680px] mx-auto px-4 sm:px-0"> <div class="mb-8"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">${title}</h1> <p class="mt-2 text-[15px] text-[#3c4257]">Learn from experienced design leaders through in-depth interviews.</p> </div> <div class="grid grid-cols-1 gap-4"> ${videos.map((video) => renderTemplate`${renderComponent($$result2, "VideoCard", $$VideoCard, { ...video })}`)} </div> </article> </main> ` })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/videos/interviews.astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/videos/interviews.astro";
const $$url = "/docs/videos/interviews";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Interviews,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

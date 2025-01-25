/* empty css                                        */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, u as unescapeHTML } from '../../../chunks/astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { $ as $$Layout, C as ContentGate } from '../../../chunks/Layout_Y6JSbGsr.mjs';
import { $ as $$VideoCard } from '../../../chunks/VideoCard_DeNjw--N.mjs';
export { r as renderers } from '../../../chunks/_@astro-renderers_B0sv4yBb.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$CaseStudies = createComponent(($$result, $$props, $$slots) => {
  const videos = [
    {
      title: "Case Study Review - Joshua McKenzie, Sr. Product Designer",
      timestamp: "January 6, 2024",
      duration: "41:39",
      thumbnailUrl: "https://img.youtube.com/vi/eJ7ZRUGdUCk/maxresdefault.jpg",
      href: "https://youtu.be/eJ7ZRUGdUCk"
    }
  ];
  const [featuredVideo, ...otherVideos] = videos;
  const title = "Design Case Studies";
  const description = "Watch in-depth design case studies from experienced product designers. Learn from real-world projects, design decisions, and outcomes that shape successful products.";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": videos.map((video, index) => ({
      "@type": "VideoObject",
      "position": index + 1,
      "name": video.title,
      "description": description,
      "thumbnailUrl": video.thumbnailUrl,
      "uploadDate": video.timestamp,
      "duration": video.duration,
      "url": video.href
    }))
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "type": "video", "image": videos[0].thumbnailUrl }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> ", '<main class="py-8 sm:px-6 lg:px-8"> ', " </main> "])), unescapeHTML(JSON.stringify(structuredData)), maybeRenderHead(), renderComponent($$result2, "ContentGate", ContentGate, { "client:load": true, "threshold": 40, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <article class="max-w-[680px] mx-auto px-4 sm:px-0"> <div class="mb-8"> <h1 class="text-[32px] font-semibold text-[#1a1f36] tracking-[-0.4px]">${title}</h1> <p class="mt-2 text-[15px] text-[#3c4257]">Explore real-world design projects and their outcomes through detailed case studies.</p> </div> <!-- Featured Video --> <div class="mb-8"> ${renderComponent($$result3, "VideoCard", $$VideoCard, { ...featuredVideo })} </div> <!-- Other Videos Grid --> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> ${otherVideos.map((video) => renderTemplate`${renderComponent($$result3, "VideoCard", $$VideoCard, { ...video })}`)} </div> </article> ` })) })}`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/videos/case-studies.astro", undefined);

const $$file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/videos/case-studies.astro";
const $$url = "/docs/videos/case-studies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CaseStudies,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

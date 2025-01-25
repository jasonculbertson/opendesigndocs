import { c as createComponent, r as renderTemplate, a as addAttribute, m as maybeRenderHead, b as createAstro } from './astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw) }));
var _a;
const $$Astro = createAstro();
const $$VideoCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VideoCard;
  const {
    title,
    timestamp,
    duration,
    thumbnailUrl,
    isDraft = false,
    href,
    description = ""
  } = Astro2.props;
  function getYouTubeVideoId(url) {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  const videoId = getYouTubeVideoId(href);
  return renderTemplate(_a || (_a = __template(["", '<article class="group relative rounded-xl overflow-hidden bg-white border border-[#e5e7eb] hover:border-[#d1d5db] transition-colors" itemscope itemtype="http://schema.org/VideoObject"> <meta itemprop="uploadDate"', '> <meta itemprop="duration"', '> <meta itemprop="thumbnailUrl"', '> <meta itemprop="description"', "> ", ' <div class="aspect-video relative overflow-hidden"> <div', ' class="relative cursor-pointer"> <img', "", ' class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" itemprop="thumbnail" loading="lazy"> ', ' <div class="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-[13px] font-medium" aria-label="Video duration"> ', " </div> ", " </div> <div", ' class="hidden absolute inset-0"> <!-- YouTube player will be loaded here --> </div> </div> <div class="p-4"> <h3 class="font-medium text-[15px] leading-snug text-[#1a1f36]" itemprop="name"> ', ' </h3> <p class="mt-1 text-[13px] text-[#3c4257]"> <time', ">", "</time> </p> </div> </article> <script>\n  function loadYouTubeVideo(videoId) {\n    const thumbnailEl = document.getElementById(`thumbnail-${videoId}`);\n    const playerEl = document.getElementById(`player-${videoId}`);\n    \n    if (thumbnailEl && playerEl) {\n      thumbnailEl.style.display = 'none';\n      playerEl.style.display = 'block';\n      \n      const iframe = document.createElement('iframe');\n      iframe.width = '100%';\n      iframe.height = '100%';\n      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;\n      iframe.title = 'YouTube video player';\n      iframe.frameBorder = '0';\n      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';\n      iframe.allowFullscreen = true;\n      iframe.style.position = 'absolute';\n      iframe.style.inset = '0';\n      \n      playerEl.appendChild(iframe);\n    }\n  }\n<\/script>"], ["", '<article class="group relative rounded-xl overflow-hidden bg-white border border-[#e5e7eb] hover:border-[#d1d5db] transition-colors" itemscope itemtype="http://schema.org/VideoObject"> <meta itemprop="uploadDate"', '> <meta itemprop="duration"', '> <meta itemprop="thumbnailUrl"', '> <meta itemprop="description"', "> ", ' <div class="aspect-video relative overflow-hidden"> <div', ' class="relative cursor-pointer"> <img', "", ' class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" itemprop="thumbnail" loading="lazy"> ', ' <div class="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-[13px] font-medium" aria-label="Video duration"> ', " </div> ", " </div> <div", ' class="hidden absolute inset-0"> <!-- YouTube player will be loaded here --> </div> </div> <div class="p-4"> <h3 class="font-medium text-[15px] leading-snug text-[#1a1f36]" itemprop="name"> ', ' </h3> <p class="mt-1 text-[13px] text-[#3c4257]"> <time', ">", "</time> </p> </div> </article> <script>\n  function loadYouTubeVideo(videoId) {\n    const thumbnailEl = document.getElementById(\\`thumbnail-\\${videoId}\\`);\n    const playerEl = document.getElementById(\\`player-\\${videoId}\\`);\n    \n    if (thumbnailEl && playerEl) {\n      thumbnailEl.style.display = 'none';\n      playerEl.style.display = 'block';\n      \n      const iframe = document.createElement('iframe');\n      iframe.width = '100%';\n      iframe.height = '100%';\n      iframe.src = \\`https://www.youtube.com/embed/\\${videoId}?autoplay=1\\`;\n      iframe.title = 'YouTube video player';\n      iframe.frameBorder = '0';\n      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';\n      iframe.allowFullscreen = true;\n      iframe.style.position = 'absolute';\n      iframe.style.inset = '0';\n      \n      playerEl.appendChild(iframe);\n    }\n  }\n<\/script>"])), maybeRenderHead(), addAttribute(timestamp, "content"), addAttribute(duration, "content"), addAttribute(thumbnailUrl, "content"), addAttribute(description, "content"), href && renderTemplate`<meta itemprop="embedUrl"${addAttribute(`https://www.youtube.com/embed/${videoId}`, "content")}>`, addAttribute(`thumbnail-${videoId}`, "id"), addAttribute(thumbnailUrl, "src"), addAttribute(`Thumbnail for ${title}`, "alt"), videoId && renderTemplate`<button class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"${addAttribute(`loadYouTubeVideo('${videoId}')`, "onclick")}${addAttribute(`Play video: ${title}`, "aria-label")}> <div class="w-16 h-16 flex items-center justify-center rounded-full bg-white/90 group-hover:bg-white transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> <path d="M8 5v14l11-7z"></path> </svg> </div> </button>`, duration, isDraft && renderTemplate`<div class="absolute top-3 right-3 px-3 py-1 bg-[#f97316] rounded-lg text-white text-[13px] font-medium" aria-label="New content">
New
</div>`, addAttribute(`player-${videoId}`, "id"), href ? renderTemplate`<a${addAttribute(href, "href")} class="hover:underline" target="_blank" rel="noopener noreferrer"> ${title} </a>` : title, addAttribute(new Date(timestamp).toISOString(), "datetime"), timestamp);
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/VideoCard.astro", undefined);

export { $$VideoCard as $ };

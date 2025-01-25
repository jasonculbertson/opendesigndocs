import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as createAstro } from './astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Card;
  const { title, description, href, image } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} class="block group no-underline hover:no-underline"> <div class="gradient-card"> <div class="flex items-center"> <div class="flex-shrink-0 text-2xl mr-3 sm:mr-4 text-gray-700"> ${image} </div> <div> <h3 class="text-[15px] font-semibold text-[#1a1f36] leading-none mb-1.5"> ${title} </h3> <p class="text-[13px] text-[#3c4257] leading-none">${description}</p> </div> </div> </div> </a>`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/Card.astro", undefined);

export { $$Card as $ };

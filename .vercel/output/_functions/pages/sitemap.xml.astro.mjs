export { r as renderers } from '../chunks/_@astro-renderers_B0sv4yBb.mjs';

const pages = [
  "",
  "/docs/leadership/day-1",
  "/docs/leadership/day-1/30-60-90-plan",
  "/docs/videos/case-studies",
  "/docs/videos/interviews"
];
const GET = async () => {
  const siteUrl = "https://opendesigndocs.com";
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map((page) => `
    <url>
      <loc>${siteUrl}${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>${page === "" ? "1.0" : "0.7"}</priority>
    </url>
  `).join("")}
</urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

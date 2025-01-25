import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, d as renderComponent, b as createAstro, e as renderSlot, g as renderHead } from './astro/server_Cz1lq_8W.mjs';
import 'kleur/colors';
import { $ as $$ViewTransitions } from './ViewTransitions_UeRPKSVV.mjs';
import { a as reactExports } from './_@astro-renderers_B0sv4yBb.mjs';
/* empty css                        */

/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      ...rest
    }, ref) => {
      return reactExports.createElement(
        "svg",
        {
          ref,
          ...defaultAttributes,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
          className: ["lucide", `lucide-${toKebabCase(iconName)}`, className].join(" "),
          ...rest
        },
        [
          ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
          ...Array.isArray(children) ? children : [children]
        ]
      );
    }
  );
  Component.displayName = `${iconName}`;
  return Component;
};

/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Box = createLucideIcon("Box", [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
]);

/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Calendar = createLucideIcon("Calendar", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
]);

/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ChevronRight = createLucideIcon("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);

/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Clock = createLucideIcon("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);

/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const FileText = createLucideIcon("FileText", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);

/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const LogOut = createLucideIcon("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);

/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Palette = createLucideIcon("Palette", [
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  [
    "path",
    {
      d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
      key: "12rzf8"
    }
  ]
]);

/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Rocket = createLucideIcon("Rocket", [
  [
    "path",
    {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      key: "m3kijz"
    }
  ],
  [
    "path",
    {
      d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
      key: "1fmvmk"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", key: "1f8sc4" }],
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }]
]);

/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Target = createLucideIcon("Target", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
]);

/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const UserPlus = createLucideIcon("UserPlus", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
]);

/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Users = createLucideIcon("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);

const $$Astro$2 = createAstro();
const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const { currentPath = "/" } = Astro2.props;
  const links = [
    {
      header: "Manager Docs",
      items: [
        {
          name: "Day 1",
          href: "/docs/leadership/day-1",
          icon: Clock
        },
        {
          name: "Week 1-2",
          href: "/docs/leadership/week-1-2",
          icon: Users
        },
        {
          name: "Month 1",
          href: "/docs/leadership/month-1",
          icon: Calendar
        },
        {
          name: "Quarter 1",
          href: "/docs/leadership/quarter-1",
          icon: Target
        },
        {
          name: "Quarter 2",
          href: "/docs/leadership/quarter-2",
          icon: Rocket
        },
        {
          name: "Departure",
          href: "/docs/leadership/departure",
          icon: LogOut
        }
      ]
    },
    {
      header: "LEVELS FRAMEWORK",
      items: [
        {
          name: "Competencies",
          href: "/docs/frameworks/level-competencies",
          icon: Target
        },
        {
          name: "Reviews",
          href: "/docs/frameworks/annual-reviews",
          icon: Calendar
        },
        {
          name: "Job Descriptions",
          href: "/docs/frameworks/job-descriptions",
          icon: FileText
        },
        {
          name: "Interview Questions",
          href: "/docs/frameworks/interview-questions",
          icon: Users
        }
      ]
    },
    {
      header: "Team Docs",
      items: [
        {
          name: "Design",
          href: "/docs/team/design",
          icon: Palette
        },
        {
          name: "Product",
          href: "/docs/team/product",
          icon: Box
        },
        {
          name: "Recruiting",
          href: "/docs/team/recruiting",
          icon: UserPlus
        }
      ]
    },
    ...[]
  ];
  return renderTemplate`${maybeRenderHead()}<aside id="sidebar" class="fixed top-0 left-0 bottom-0 z-50 w-[280px] lg:w-[250px] bg-[#f9f9f9] backdrop-blur-md shadow-xl lg:shadow-none lg:border-r border-[#e5e5e5] overflow-y-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out"> <nav class="p-4 h-full flex flex-col"> <div class="hidden lg:flex items-center gap-2 mb-8"> <a href="/docs/leadership/day-1" class="flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect> <line x1="3" y1="9" x2="21" y2="9"></line> <line x1="9" y1="21" x2="9" y2="9"></line> </svg> <span class="text-[15px] font-medium text-gray-900 leading-none">Open Design Docs</span> </a> </div> <div class="flex-1"> ${links.map((section) => renderTemplate`<div class="mb-8"> <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2"> ${section.header} </h2> <ul class="space-y-[2px]"> ${section.items.map((item) => {
    const isActive = currentPath?.startsWith(item.href) ?? false;
    return renderTemplate`<li> <a${addAttribute(item.href, "href")}${addAttribute(`flex items-center gap-2 px-2 py-2 text-[14px] rounded-lg transition-colors duration-150
                      ${isActive ? "bg-indigo-50 text-indigo-600 font-medium" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`, "class")}> ${renderComponent($$result, "item.icon", item.icon, { "className": "w-[18px] h-[18px] flex-shrink-0" })} <span>${item.name}</span> ${isActive && renderTemplate`${renderComponent($$result, "ChevronRight", ChevronRight, { "className": "w-4 h-4 ml-auto text-indigo-600" })}`} </a> </li>`;
  })} </ul> </div>`)} </div> <div class="mb-0 lg:mb-0 lg:fixed lg:bottom-0 lg:left-0 lg:w-[250px] px-2 lg:px-4 pb-4"> <a href="https://linkedin.com/in/jasonculbertson" target="_blank" class="block mx-auto lg:w-fit px-4 py-2 text-[11px] text-gray-500 rounded-lg bg-gradient-to-r from-white to-gray-50 hover:to-gray-100 border border-gray-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
Made with ❤️ by Jason Culbertson
</a> </div> </nav> </aside>`;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/Sidebar.astro", undefined);

function shouldShowSubstack(pathname) {
  const normalizedPath = pathname.replace(/\/$/, "");
  const pagesWithSubstack = [
    // Videos section
    "/docs/videos/interviews",
    "/docs/videos/case-studies",
    // Team section
    "/docs/team/design/t-shirt-sizing",
    "/docs/team/design/design-sprint",
    "/docs/team/product/one-pagers",
    "/docs/team/product/product-spec",
    "/docs/team/product/project-kickoff-meeting",
    "/docs/team/recruiting/interview-panels",
    // Leadership section
    "/docs/leadership/day-1/leadership-blueprint",
    "/docs/leadership/day-1/30-60-90-plan",
    "/docs/leadership/week-1-2/getting-to-know-you",
    "/docs/leadership/month-1/designer-levels-titles",
    "/docs/leadership/month-1/level-competencies/researcher",
    "/docs/leadership/month-1/level-competencies/photographer",
    "/docs/leadership/month-1/level-competencies/ic1",
    "/docs/leadership/month-1/level-competencies/content-designer",
    "/docs/leadership/month-1/level-competencies/product-designer",
    "/docs/leadership/month-1/level-competencies/manager",
    "/docs/leadership/month-1/level-competencies/design-ops",
    "/docs/leadership/month-1/level-competencies/copywriter",
    "/docs/leadership/month-1/level-competencies/graphic-designer",
    "/docs/leadership/quarter-1/self-evaluation",
    "/docs/leadership/quarter-1/short-term-growth-exercise",
    "/docs/leadership/quarter-2/individual-assessment",
    "/docs/leadership/quarter-2/long-term-goals",
    "/docs/leadership/departure/transition-plan",
    // Job Descriptions - UX Writer
    "/docs/team/recruiting/job-descriptions-jds/ux-writer/writer-1",
    "/docs/team/recruiting/job-descriptions-jds/ux-writer/writer-2",
    "/docs/team/recruiting/job-descriptions-jds/ux-writer/senior-writer",
    "/docs/team/recruiting/job-descriptions-jds/ux-writer/lead-writer",
    "/docs/team/recruiting/job-descriptions-jds/ux-writer/staff-writer",
    "/docs/team/recruiting/job-descriptions-jds/ux-writer/principal-writer",
    // Job Descriptions - UX Researcher
    "/docs/team/recruiting/job-descriptions-jds/ux-researcher/researcher-1",
    "/docs/team/recruiting/job-descriptions-jds/ux-researcher/researcher-2",
    "/docs/team/recruiting/job-descriptions-jds/ux-researcher/senior-researcher",
    "/docs/team/recruiting/job-descriptions-jds/ux-researcher/lead-researcher",
    "/docs/team/recruiting/job-descriptions-jds/ux-researcher/staff-researcher",
    "/docs/team/recruiting/job-descriptions-jds/ux-researcher/principal-researcher",
    // Job Descriptions - Design Ops
    "/docs/team/recruiting/job-descriptions-jds/design-ops/design-ops-1",
    "/docs/team/recruiting/job-descriptions-jds/design-ops/design-ops-2",
    "/docs/team/recruiting/job-descriptions-jds/design-ops/senior-design-ops",
    "/docs/team/recruiting/job-descriptions-jds/design-ops/lead-design-ops",
    "/docs/team/recruiting/job-descriptions-jds/design-ops/staff-design-ops",
    "/docs/team/recruiting/job-descriptions-jds/design-ops/principal-design-ops",
    // Job Descriptions - Graphic Designer
    "/docs/team/recruiting/job-descriptions-jds/graphic-designer/junior-designer",
    "/docs/team/recruiting/job-descriptions-jds/graphic-designer/graphic-designer",
    "/docs/team/recruiting/job-descriptions-jds/graphic-designer/senior-designer",
    "/docs/team/recruiting/job-descriptions-jds/graphic-designer/art-director",
    "/docs/team/recruiting/job-descriptions-jds/graphic-designer/associate-creative-director",
    "/docs/team/recruiting/job-descriptions-jds/graphic-designer/creative-director",
    // Job Descriptions - Copywriter
    "/docs/team/recruiting/job-descriptions-jds/copywriter/junior-copywriter",
    "/docs/team/recruiting/job-descriptions-jds/copywriter/copywriter",
    "/docs/team/recruiting/job-descriptions-jds/copywriter/senior-copywriter",
    "/docs/team/recruiting/job-descriptions-jds/copywriter/lead-copywriter",
    "/docs/team/recruiting/job-descriptions-jds/copywriter/associate-creative-director",
    "/docs/team/recruiting/job-descriptions-jds/copywriter/creative-director"
  ];
  return pagesWithSubstack.includes(normalizedPath);
}
function shouldShowContentGate(pathname) {
  const normalizedPath = pathname.replace(/\/$/, "");
  const pagesWithContentGate = [
    // Videos section
    "/docs/videos/interviews",
    "/docs/videos/case-studies",
    // Team section
    "/docs/team/design/t-shirt-sizing",
    "/docs/team/design/design-sprint",
    "/docs/team/product/one-pagers",
    "/docs/team/product/product-spec",
    "/docs/team/product/project-kickoff-meeting",
    "/docs/team/recruiting/interview-panels",
    // Leadership section
    "/docs/leadership/day-1/leadership-blueprint",
    "/docs/leadership/day-1/30-60-90-plan",
    "/docs/leadership/week-1-2/getting-to-know-you",
    "/docs/leadership/month-1/designer-levels-titles",
    "/docs/leadership/month-1/level-competencies/researcher",
    "/docs/leadership/month-1/level-competencies/photographer",
    "/docs/leadership/month-1/level-competencies/ic1",
    "/docs/leadership/month-1/level-competencies/content-designer",
    "/docs/leadership/month-1/level-competencies/product-designer",
    "/docs/leadership/month-1/level-competencies/manager",
    "/docs/leadership/month-1/level-competencies/design-ops",
    "/docs/leadership/month-1/level-competencies/copywriter",
    "/docs/leadership/month-1/level-competencies/graphic-designer",
    "/docs/leadership/quarter-1/self-evaluation",
    "/docs/leadership/quarter-1/short-term-growth-exercise",
    "/docs/leadership/quarter-2/individual-assessment",
    "/docs/leadership/quarter-2/long-term-goals",
    "/docs/leadership/departure/transition-plan",
    // Job Descriptions - UX Designer
    "/docs/team/recruiting/job-descriptions-jds/ux-designer/designer-1",
    "/docs/team/recruiting/job-descriptions-jds/ux-designer/designer-2",
    "/docs/team/recruiting/job-descriptions-jds/ux-designer/senior-designer",
    "/docs/team/recruiting/job-descriptions-jds/ux-designer/lead-designer",
    "/docs/team/recruiting/job-descriptions-jds/ux-designer/staff-designer",
    "/docs/team/recruiting/job-descriptions-jds/ux-designer/principal-designer",
    // Job Descriptions - UX Writer
    "/docs/team/recruiting/job-descriptions-jds/ux-writer/writer-1",
    "/docs/team/recruiting/job-descriptions-jds/ux-writer/writer-2",
    "/docs/team/recruiting/job-descriptions-jds/ux-writer/senior-writer",
    "/docs/team/recruiting/job-descriptions-jds/ux-writer/lead-writer",
    "/docs/team/recruiting/job-descriptions-jds/ux-writer/staff-writer",
    "/docs/team/recruiting/job-descriptions-jds/ux-writer/principal-writer",
    // Job Descriptions - UX Researcher
    "/docs/team/recruiting/job-descriptions-jds/ux-researcher/researcher-1",
    "/docs/team/recruiting/job-descriptions-jds/ux-researcher/researcher-2",
    "/docs/team/recruiting/job-descriptions-jds/ux-researcher/senior-researcher",
    "/docs/team/recruiting/job-descriptions-jds/ux-researcher/lead-researcher",
    "/docs/team/recruiting/job-descriptions-jds/ux-researcher/staff-researcher",
    "/docs/team/recruiting/job-descriptions-jds/ux-researcher/principal-researcher",
    // Job Descriptions - Design Ops
    "/docs/team/recruiting/job-descriptions-jds/design-ops/design-ops-1",
    "/docs/team/recruiting/job-descriptions-jds/design-ops/design-ops-2",
    "/docs/team/recruiting/job-descriptions-jds/design-ops/senior-design-ops",
    "/docs/team/recruiting/job-descriptions-jds/design-ops/lead-design-ops",
    "/docs/team/recruiting/job-descriptions-jds/design-ops/staff-design-ops",
    "/docs/team/recruiting/job-descriptions-jds/design-ops/principal-design-ops",
    // Job Descriptions - Graphic Designer
    "/docs/team/recruiting/job-descriptions-jds/graphic-designer/junior-designer",
    "/docs/team/recruiting/job-descriptions-jds/graphic-designer/graphic-designer",
    "/docs/team/recruiting/job-descriptions-jds/graphic-designer/senior-designer",
    "/docs/team/recruiting/job-descriptions-jds/graphic-designer/art-director",
    "/docs/team/recruiting/job-descriptions-jds/graphic-designer/associate-creative-director",
    "/docs/team/recruiting/job-descriptions-jds/graphic-designer/creative-director",
    // Job Descriptions - Copywriter
    "/docs/team/recruiting/job-descriptions-jds/copywriter/junior-copywriter",
    "/docs/team/recruiting/job-descriptions-jds/copywriter/copywriter",
    "/docs/team/recruiting/job-descriptions-jds/copywriter/senior-copywriter",
    "/docs/team/recruiting/job-descriptions-jds/copywriter/lead-copywriter",
    "/docs/team/recruiting/job-descriptions-jds/copywriter/associate-creative-director",
    "/docs/team/recruiting/job-descriptions-jds/copywriter/creative-director"
  ];
  return pagesWithContentGate.includes(normalizedPath);
}

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production_min;

function requireReactJsxRuntime_production_min () {
	if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
	hasRequiredReactJsxRuntime_production_min = 1;
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
	function q(c,a,g){var b,d={},e=null,h=null;undefined!==g&&(e=""+g);undefined!==a.key&&(e=""+a.key);undefined!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) undefined===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
	return reactJsxRuntime_production_min;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;

	if (process.env.NODE_ENV !== "production") {
	  (function() {

	var React = reactExports;

	// ATTENTION
	// When adding new symbols to this file,
	// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
	// The Symbol used to tag the ReactElement-like types.
	var REACT_ELEMENT_TYPE = Symbol.for('react.element');
	var REACT_PORTAL_TYPE = Symbol.for('react.portal');
	var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
	var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
	var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
	var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
	var REACT_CONTEXT_TYPE = Symbol.for('react.context');
	var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
	var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
	var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
	var REACT_MEMO_TYPE = Symbol.for('react.memo');
	var REACT_LAZY_TYPE = Symbol.for('react.lazy');
	var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';
	function getIteratorFn(maybeIterable) {
	  if (maybeIterable === null || typeof maybeIterable !== 'object') {
	    return null;
	  }

	  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

	  if (typeof maybeIterator === 'function') {
	    return maybeIterator;
	  }

	  return null;
	}

	var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

	function error(format) {
	  {
	    {
	      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      printWarning('error', format, args);
	    }
	  }
	}

	function printWarning(level, format, args) {
	  // When changing this logic, you might want to also
	  // update consoleWithStackDev.www.js as well.
	  {
	    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
	    var stack = ReactDebugCurrentFrame.getStackAddendum();

	    if (stack !== '') {
	      format += '%s';
	      args = args.concat([stack]);
	    } // eslint-disable-next-line react-internal/safe-string-coercion


	    var argsWithFormat = args.map(function (item) {
	      return String(item);
	    }); // Careful: RN currently depends on this prefix

	    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
	    // breaks IE9: https://github.com/facebook/react/issues/13610
	    // eslint-disable-next-line react-internal/no-production-logging

	    Function.prototype.apply.call(console[level], console, argsWithFormat);
	  }
	}

	// -----------------------------------------------------------------------------

	var enableScopeAPI = false; // Experimental Create Event Handle API.
	var enableCacheElement = false;
	var enableTransitionTracing = false; // No known bugs, but needs performance testing

	var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
	// stuff. Intended to enable React core members to more easily debug scheduling
	// issues in DEV builds.

	var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

	var REACT_MODULE_REFERENCE;

	{
	  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
	}

	function isValidElementType(type) {
	  if (typeof type === 'string' || typeof type === 'function') {
	    return true;
	  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


	  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
	    return true;
	  }

	  if (typeof type === 'object' && type !== null) {
	    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
	    // types supported by any Flight configuration anywhere since
	    // we don't know which Flight build this will end up being used
	    // with.
	    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
	      return true;
	    }
	  }

	  return false;
	}

	function getWrappedName(outerType, innerType, wrapperName) {
	  var displayName = outerType.displayName;

	  if (displayName) {
	    return displayName;
	  }

	  var functionName = innerType.displayName || innerType.name || '';
	  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
	} // Keep in sync with react-reconciler/getComponentNameFromFiber


	function getContextName(type) {
	  return type.displayName || 'Context';
	} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


	function getComponentNameFromType(type) {
	  if (type == null) {
	    // Host root, text node or just invalid type.
	    return null;
	  }

	  {
	    if (typeof type.tag === 'number') {
	      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
	    }
	  }

	  if (typeof type === 'function') {
	    return type.displayName || type.name || null;
	  }

	  if (typeof type === 'string') {
	    return type;
	  }

	  switch (type) {
	    case REACT_FRAGMENT_TYPE:
	      return 'Fragment';

	    case REACT_PORTAL_TYPE:
	      return 'Portal';

	    case REACT_PROFILER_TYPE:
	      return 'Profiler';

	    case REACT_STRICT_MODE_TYPE:
	      return 'StrictMode';

	    case REACT_SUSPENSE_TYPE:
	      return 'Suspense';

	    case REACT_SUSPENSE_LIST_TYPE:
	      return 'SuspenseList';

	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_CONTEXT_TYPE:
	        var context = type;
	        return getContextName(context) + '.Consumer';

	      case REACT_PROVIDER_TYPE:
	        var provider = type;
	        return getContextName(provider._context) + '.Provider';

	      case REACT_FORWARD_REF_TYPE:
	        return getWrappedName(type, type.render, 'ForwardRef');

	      case REACT_MEMO_TYPE:
	        var outerName = type.displayName || null;

	        if (outerName !== null) {
	          return outerName;
	        }

	        return getComponentNameFromType(type.type) || 'Memo';

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            return getComponentNameFromType(init(payload));
	          } catch (x) {
	            return null;
	          }
	        }

	      // eslint-disable-next-line no-fallthrough
	    }
	  }

	  return null;
	}

	var assign = Object.assign;

	// Helpers to patch console.logs to avoid logging during side-effect free
	// replaying on render function. This currently only patches the object
	// lazily which won't cover if the log function was extracted eagerly.
	// We could also eagerly patch the method.
	var disabledDepth = 0;
	var prevLog;
	var prevInfo;
	var prevWarn;
	var prevError;
	var prevGroup;
	var prevGroupCollapsed;
	var prevGroupEnd;

	function disabledLog() {}

	disabledLog.__reactDisabledLog = true;
	function disableLogs() {
	  {
	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      prevLog = console.log;
	      prevInfo = console.info;
	      prevWarn = console.warn;
	      prevError = console.error;
	      prevGroup = console.group;
	      prevGroupCollapsed = console.groupCollapsed;
	      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

	      var props = {
	        configurable: true,
	        enumerable: true,
	        value: disabledLog,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        info: props,
	        log: props,
	        warn: props,
	        error: props,
	        group: props,
	        groupCollapsed: props,
	        groupEnd: props
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    disabledDepth++;
	  }
	}
	function reenableLogs() {
	  {
	    disabledDepth--;

	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      var props = {
	        configurable: true,
	        enumerable: true,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        log: assign({}, props, {
	          value: prevLog
	        }),
	        info: assign({}, props, {
	          value: prevInfo
	        }),
	        warn: assign({}, props, {
	          value: prevWarn
	        }),
	        error: assign({}, props, {
	          value: prevError
	        }),
	        group: assign({}, props, {
	          value: prevGroup
	        }),
	        groupCollapsed: assign({}, props, {
	          value: prevGroupCollapsed
	        }),
	        groupEnd: assign({}, props, {
	          value: prevGroupEnd
	        })
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    if (disabledDepth < 0) {
	      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
	    }
	  }
	}

	var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
	var prefix;
	function describeBuiltInComponentFrame(name, source, ownerFn) {
	  {
	    if (prefix === undefined) {
	      // Extract the VM specific prefix used by each line.
	      try {
	        throw Error();
	      } catch (x) {
	        var match = x.stack.trim().match(/\n( *(at )?)/);
	        prefix = match && match[1] || '';
	      }
	    } // We use the prefix to ensure our stacks line up with native stack frames.


	    return '\n' + prefix + name;
	  }
	}
	var reentry = false;
	var componentFrameCache;

	{
	  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
	  componentFrameCache = new PossiblyWeakMap();
	}

	function describeNativeComponentFrame(fn, construct) {
	  // If something asked for a stack inside a fake render, it should get ignored.
	  if ( !fn || reentry) {
	    return '';
	  }

	  {
	    var frame = componentFrameCache.get(fn);

	    if (frame !== undefined) {
	      return frame;
	    }
	  }

	  var control;
	  reentry = true;
	  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

	  Error.prepareStackTrace = undefined;
	  var previousDispatcher;

	  {
	    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
	    // for warnings.

	    ReactCurrentDispatcher.current = null;
	    disableLogs();
	  }

	  try {
	    // This should throw.
	    if (construct) {
	      // Something should be setting the props in the constructor.
	      var Fake = function () {
	        throw Error();
	      }; // $FlowFixMe


	      Object.defineProperty(Fake.prototype, 'props', {
	        set: function () {
	          // We use a throwing setter instead of frozen or non-writable props
	          // because that won't throw in a non-strict mode function.
	          throw Error();
	        }
	      });

	      if (typeof Reflect === 'object' && Reflect.construct) {
	        // We construct a different control for this case to include any extra
	        // frames added by the construct call.
	        try {
	          Reflect.construct(Fake, []);
	        } catch (x) {
	          control = x;
	        }

	        Reflect.construct(fn, [], Fake);
	      } else {
	        try {
	          Fake.call();
	        } catch (x) {
	          control = x;
	        }

	        fn.call(Fake.prototype);
	      }
	    } else {
	      try {
	        throw Error();
	      } catch (x) {
	        control = x;
	      }

	      fn();
	    }
	  } catch (sample) {
	    // This is inlined manually because closure doesn't do it for us.
	    if (sample && control && typeof sample.stack === 'string') {
	      // This extracts the first frame from the sample that isn't also in the control.
	      // Skipping one frame that we assume is the frame that calls the two.
	      var sampleLines = sample.stack.split('\n');
	      var controlLines = control.stack.split('\n');
	      var s = sampleLines.length - 1;
	      var c = controlLines.length - 1;

	      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
	        // We expect at least one stack frame to be shared.
	        // Typically this will be the root most one. However, stack frames may be
	        // cut off due to maximum stack limits. In this case, one maybe cut off
	        // earlier than the other. We assume that the sample is longer or the same
	        // and there for cut off earlier. So we should find the root most frame in
	        // the sample somewhere in the control.
	        c--;
	      }

	      for (; s >= 1 && c >= 0; s--, c--) {
	        // Next we find the first one that isn't the same which should be the
	        // frame that called our sample function and the control.
	        if (sampleLines[s] !== controlLines[c]) {
	          // In V8, the first line is describing the message but other VMs don't.
	          // If we're about to return the first line, and the control is also on the same
	          // line, that's a pretty good indicator that our sample threw at same line as
	          // the control. I.e. before we entered the sample frame. So we ignore this result.
	          // This can happen if you passed a class to function component, or non-function.
	          if (s !== 1 || c !== 1) {
	            do {
	              s--;
	              c--; // We may still have similar intermediate frames from the construct call.
	              // The next one that isn't the same should be our match though.

	              if (c < 0 || sampleLines[s] !== controlLines[c]) {
	                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
	                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
	                // but we have a user-provided "displayName"
	                // splice it in to make the stack more readable.


	                if (fn.displayName && _frame.includes('<anonymous>')) {
	                  _frame = _frame.replace('<anonymous>', fn.displayName);
	                }

	                {
	                  if (typeof fn === 'function') {
	                    componentFrameCache.set(fn, _frame);
	                  }
	                } // Return the line we found.


	                return _frame;
	              }
	            } while (s >= 1 && c >= 0);
	          }

	          break;
	        }
	      }
	    }
	  } finally {
	    reentry = false;

	    {
	      ReactCurrentDispatcher.current = previousDispatcher;
	      reenableLogs();
	    }

	    Error.prepareStackTrace = previousPrepareStackTrace;
	  } // Fallback to just using the name if we couldn't make it throw.


	  var name = fn ? fn.displayName || fn.name : '';
	  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

	  {
	    if (typeof fn === 'function') {
	      componentFrameCache.set(fn, syntheticFrame);
	    }
	  }

	  return syntheticFrame;
	}
	function describeFunctionComponentFrame(fn, source, ownerFn) {
	  {
	    return describeNativeComponentFrame(fn, false);
	  }
	}

	function shouldConstruct(Component) {
	  var prototype = Component.prototype;
	  return !!(prototype && prototype.isReactComponent);
	}

	function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

	  if (type == null) {
	    return '';
	  }

	  if (typeof type === 'function') {
	    {
	      return describeNativeComponentFrame(type, shouldConstruct(type));
	    }
	  }

	  if (typeof type === 'string') {
	    return describeBuiltInComponentFrame(type);
	  }

	  switch (type) {
	    case REACT_SUSPENSE_TYPE:
	      return describeBuiltInComponentFrame('Suspense');

	    case REACT_SUSPENSE_LIST_TYPE:
	      return describeBuiltInComponentFrame('SuspenseList');
	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        return describeFunctionComponentFrame(type.render);

	      case REACT_MEMO_TYPE:
	        // Memo may contain any component type so we recursively resolve it.
	        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            // Lazy may contain any component type so we recursively resolve it.
	            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
	          } catch (x) {}
	        }
	    }
	  }

	  return '';
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var loggedTypeFailures = {};
	var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame.setExtraStackFrame(null);
	    }
	  }
	}

	function checkPropTypes(typeSpecs, values, location, componentName, element) {
	  {
	    // $FlowFixMe This is okay but Flow doesn't know it.
	    var has = Function.call.bind(hasOwnProperty);

	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error$1 = undefined; // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.

	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            // eslint-disable-next-line react-internal/prod-error-codes
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }

	          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
	        } catch (ex) {
	          error$1 = ex;
	        }

	        if (error$1 && !(error$1 instanceof Error)) {
	          setCurrentlyValidatingElement(element);

	          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

	          setCurrentlyValidatingElement(null);
	        }

	        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error$1.message] = true;
	          setCurrentlyValidatingElement(element);

	          error('Failed %s type: %s', location, error$1.message);

	          setCurrentlyValidatingElement(null);
	        }
	      }
	    }
	  }
	}

	var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

	function isArray(a) {
	  return isArrayImpl(a);
	}

	/*
	 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
	 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
	 *
	 * The functions in this module will throw an easier-to-understand,
	 * easier-to-debug exception with a clear errors message message explaining the
	 * problem. (Instead of a confusing exception thrown inside the implementation
	 * of the `value` object).
	 */
	// $FlowFixMe only called in DEV, so void return is not possible.
	function typeName(value) {
	  {
	    // toStringTag is needed for namespaced types like Temporal.Instant
	    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
	    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
	    return type;
	  }
	} // $FlowFixMe only called in DEV, so void return is not possible.


	function willCoercionThrow(value) {
	  {
	    try {
	      testStringCoercion(value);
	      return false;
	    } catch (e) {
	      return true;
	    }
	  }
	}

	function testStringCoercion(value) {
	  // If you ended up here by following an exception call stack, here's what's
	  // happened: you supplied an object or symbol value to React (as a prop, key,
	  // DOM attribute, CSS property, string ref, etc.) and when React tried to
	  // coerce it to a string using `'' + value`, an exception was thrown.
	  //
	  // The most common types that will cause this exception are `Symbol` instances
	  // and Temporal objects like `Temporal.Instant`. But any object that has a
	  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
	  // exception. (Library authors do this to prevent users from using built-in
	  // numeric operators like `+` or comparison operators like `>=` because custom
	  // methods are needed to perform accurate arithmetic or comparison.)
	  //
	  // To fix the problem, coerce this object or symbol value to a string before
	  // passing it to React. The most reliable way is usually `String(value)`.
	  //
	  // To find which value is throwing, check the browser or debugger console.
	  // Before this exception was thrown, there should be `console.error` output
	  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
	  // problem and how that type was used: key, atrribute, input value prop, etc.
	  // In most cases, this console output also shows the component and its
	  // ancestor components where the exception happened.
	  //
	  // eslint-disable-next-line react-internal/safe-string-coercion
	  return '' + value;
	}
	function checkKeyStringCoercion(value) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}

	var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};
	var specialPropKeyWarningShown;
	var specialPropRefWarningShown;

	function hasValidRef(config) {
	  {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.ref !== undefined;
	}

	function hasValidKey(config) {
	  {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.key !== undefined;
	}

	function warnIfStringRefCannotBeAutoConverted(config, self) {
	  {
	    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self) ;
	  }
	}

	function defineKeyPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingKey = function () {
	      if (!specialPropKeyWarningShown) {
	        specialPropKeyWarningShown = true;

	        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingKey.isReactWarning = true;
	    Object.defineProperty(props, 'key', {
	      get: warnAboutAccessingKey,
	      configurable: true
	    });
	  }
	}

	function defineRefPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingRef = function () {
	      if (!specialPropRefWarningShown) {
	        specialPropRefWarningShown = true;

	        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingRef.isReactWarning = true;
	    Object.defineProperty(props, 'ref', {
	      get: warnAboutAccessingRef,
	      configurable: true
	    });
	  }
	}
	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, instanceof check
	 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} props
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} owner
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @internal
	 */


	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allows us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,
	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,
	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.

	    Object.defineProperty(element._store, 'validated', {
	      configurable: false,
	      enumerable: false,
	      writable: true,
	      value: false
	    }); // self and source are DEV only properties.

	    Object.defineProperty(element, '_self', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: self
	    }); // Two elements created in two different places should be considered
	    // equal for testing purposes and therefore we hide it from enumeration.

	    Object.defineProperty(element, '_source', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: source
	    });

	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};
	/**
	 * https://github.com/reactjs/rfcs/pull/107
	 * @param {*} type
	 * @param {object} props
	 * @param {string} key
	 */

	function jsxDEV(type, config, maybeKey, source, self) {
	  {
	    var propName; // Reserved names are extracted

	    var props = {};
	    var key = null;
	    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
	    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
	    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
	    // but as an intermediary step, we will use jsxDEV for everything except
	    // <div {...props} key="Hi" />, because we aren't currently able to tell if
	    // key is explicitly declared to be undefined or not.

	    if (maybeKey !== undefined) {
	      {
	        checkKeyStringCoercion(maybeKey);
	      }

	      key = '' + maybeKey;
	    }

	    if (hasValidKey(config)) {
	      {
	        checkKeyStringCoercion(config.key);
	      }

	      key = '' + config.key;
	    }

	    if (hasValidRef(config)) {
	      ref = config.ref;
	      warnIfStringRefCannotBeAutoConverted(config, self);
	    } // Remaining properties are added to a new props object


	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    } // Resolve default props


	    if (type && type.defaultProps) {
	      var defaultProps = type.defaultProps;

	      for (propName in defaultProps) {
	        if (props[propName] === undefined) {
	          props[propName] = defaultProps[propName];
	        }
	      }
	    }

	    if (key || ref) {
	      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

	      if (key) {
	        defineKeyPropWarningGetter(props, displayName);
	      }

	      if (ref) {
	        defineRefPropWarningGetter(props, displayName);
	      }
	    }

	    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	  }
	}

	var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
	var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement$1(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
	    }
	  }
	}

	var propTypesMisspellWarningShown;

	{
	  propTypesMisspellWarningShown = false;
	}
	/**
	 * Verifies the object is a ReactElement.
	 * See https://reactjs.org/docs/react-api.html#isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a ReactElement.
	 * @final
	 */


	function isValidElement(object) {
	  {
	    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	  }
	}

	function getDeclarationErrorAddendum() {
	  {
	    if (ReactCurrentOwner$1.current) {
	      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

	      if (name) {
	        return '\n\nCheck the render method of `' + name + '`.';
	      }
	    }

	    return '';
	  }
	}

	function getSourceInfoErrorAddendum(source) {
	  {

	    return '';
	  }
	}
	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */


	var ownerHasKeyUseWarning = {};

	function getCurrentComponentErrorInfo(parentType) {
	  {
	    var info = getDeclarationErrorAddendum();

	    if (!info) {
	      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

	      if (parentName) {
	        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
	      }
	    }

	    return info;
	  }
	}
	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */


	function validateExplicitKey(element, parentType) {
	  {
	    if (!element._store || element._store.validated || element.key != null) {
	      return;
	    }

	    element._store.validated = true;
	    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

	    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
	      return;
	    }

	    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
	    // property, it may be the creator of the child that's responsible for
	    // assigning it a key.

	    var childOwner = '';

	    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
	      // Give the component that originally created this child.
	      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
	    }

	    setCurrentlyValidatingElement$1(element);

	    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

	    setCurrentlyValidatingElement$1(null);
	  }
	}
	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */


	function validateChildKeys(node, parentType) {
	  {
	    if (typeof node !== 'object') {
	      return;
	    }

	    if (isArray(node)) {
	      for (var i = 0; i < node.length; i++) {
	        var child = node[i];

	        if (isValidElement(child)) {
	          validateExplicitKey(child, parentType);
	        }
	      }
	    } else if (isValidElement(node)) {
	      // This element was passed in a valid location.
	      if (node._store) {
	        node._store.validated = true;
	      }
	    } else if (node) {
	      var iteratorFn = getIteratorFn(node);

	      if (typeof iteratorFn === 'function') {
	        // Entry iterators used to provide implicit keys,
	        // but now we print a separate warning for them later.
	        if (iteratorFn !== node.entries) {
	          var iterator = iteratorFn.call(node);
	          var step;

	          while (!(step = iterator.next()).done) {
	            if (isValidElement(step.value)) {
	              validateExplicitKey(step.value, parentType);
	            }
	          }
	        }
	      }
	    }
	  }
	}
	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */


	function validatePropTypes(element) {
	  {
	    var type = element.type;

	    if (type === null || type === undefined || typeof type === 'string') {
	      return;
	    }

	    var propTypes;

	    if (typeof type === 'function') {
	      propTypes = type.propTypes;
	    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
	    // Inner props are checked in the reconciler.
	    type.$$typeof === REACT_MEMO_TYPE)) {
	      propTypes = type.propTypes;
	    } else {
	      return;
	    }

	    if (propTypes) {
	      // Intentionally inside to avoid triggering lazy initializers:
	      var name = getComponentNameFromType(type);
	      checkPropTypes(propTypes, element.props, 'prop', name, element);
	    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
	      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

	      var _name = getComponentNameFromType(type);

	      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
	    }

	    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
	      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
	    }
	  }
	}
	/**
	 * Given a fragment, validate that it can only be provided with fragment props
	 * @param {ReactElement} fragment
	 */


	function validateFragmentProps(fragment) {
	  {
	    var keys = Object.keys(fragment.props);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];

	      if (key !== 'children' && key !== 'key') {
	        setCurrentlyValidatingElement$1(fragment);

	        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

	        setCurrentlyValidatingElement$1(null);
	        break;
	      }
	    }

	    if (fragment.ref !== null) {
	      setCurrentlyValidatingElement$1(fragment);

	      error('Invalid attribute `ref` supplied to `React.Fragment`.');

	      setCurrentlyValidatingElement$1(null);
	    }
	  }
	}

	var didWarnAboutKeySpread = {};
	function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
	  {
	    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.

	    if (!validType) {
	      var info = '';

	      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
	      }

	      var sourceInfo = getSourceInfoErrorAddendum();

	      if (sourceInfo) {
	        info += sourceInfo;
	      } else {
	        info += getDeclarationErrorAddendum();
	      }

	      var typeString;

	      if (type === null) {
	        typeString = 'null';
	      } else if (isArray(type)) {
	        typeString = 'array';
	      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
	        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
	        info = ' Did you accidentally export a JSX literal instead of a component?';
	      } else {
	        typeString = typeof type;
	      }

	      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
	    }

	    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.

	    if (element == null) {
	      return element;
	    } // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)


	    if (validType) {
	      var children = props.children;

	      if (children !== undefined) {
	        if (isStaticChildren) {
	          if (isArray(children)) {
	            for (var i = 0; i < children.length; i++) {
	              validateChildKeys(children[i], type);
	            }

	            if (Object.freeze) {
	              Object.freeze(children);
	            }
	          } else {
	            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
	          }
	        } else {
	          validateChildKeys(children, type);
	        }
	      }
	    }

	    {
	      if (hasOwnProperty.call(props, 'key')) {
	        var componentName = getComponentNameFromType(type);
	        var keys = Object.keys(props).filter(function (k) {
	          return k !== 'key';
	        });
	        var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

	        if (!didWarnAboutKeySpread[componentName + beforeExample]) {
	          var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

	          error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

	          didWarnAboutKeySpread[componentName + beforeExample] = true;
	        }
	      }
	    }

	    if (type === REACT_FRAGMENT_TYPE) {
	      validateFragmentProps(element);
	    } else {
	      validatePropTypes(element);
	    }

	    return element;
	  }
	} // These two functions exist to still get child warnings in dev
	// even with the prod transform. This means that jsxDEV is purely
	// opt-in behavior for better messages but that we won't stop
	// giving you warnings if you use production apis.

	function jsxWithValidationStatic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, true);
	  }
	}
	function jsxWithValidationDynamic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, false);
	  }
	}

	var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
	// for now we can ship identical prod functions

	var jsxs =  jsxWithValidationStatic ;

	reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_development.jsx = jsx;
	reactJsxRuntime_development.jsxs = jsxs;
	  })();
	}
	return reactJsxRuntime_development;
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = requireReactJsxRuntime_production_min();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}

var jsxRuntimeExports = jsxRuntime.exports;

const commonTypos = {
  "gmail.con": "gmail.com",
  "gmail.co": "gmail.com",
  "gmai.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmail.comm": "gmail.com",
  "gmail.om": "gmail.com",
  "hotmail.con": "hotmail.com",
  "hotmail.co": "hotmail.com",
  "hotmal.com": "hotmail.com",
  "yahoo.con": "yahoo.com",
  "yahoo.co": "yahoo.com",
  "yaho.com": "yahoo.com",
  "outloo.com": "outlook.com",
  "outlook.con": "outlook.com"
};
const disposableDomains = [
  "tempmail.com",
  "temp-mail.org",
  "guerrillamail.com",
  "disposablemail.com",
  "mailinator.com",
  "temporary-mail.net",
  "10minutemail.com",
  "throwawaymail.com",
  "yopmail.com",
  "tempmail.net"
];
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: "Please enter a valid email address"
    };
  }
  const [localPart, domain] = email.toLowerCase().split("@");
  if (disposableDomains.includes(domain)) {
    return {
      isValid: false,
      error: "Please use a non-disposable email address"
    };
  }
  const correctedDomain = commonTypos[domain];
  if (correctedDomain) {
    const correctedEmail = `${localPart}@${correctedDomain}`;
    return {
      isValid: true,
      correctedEmail,
      error: `Did you mean ${correctedEmail}?`
    };
  }
  if (localPart.length < 2) {
    return {
      isValid: false,
      error: "Email username is too short"
    };
  }
  if (email.includes("..")) {
    return {
      isValid: false,
      error: "Email cannot contain consecutive dots"
    };
  }
  if (email.length > 254) {
    return {
      isValid: false,
      error: "Email address is too long"
    };
  }
  return {
    isValid: true
  };
}

function CheckCircleIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/reactExports.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/reactExports.createElement("path", {
    fillRule: "evenodd",
    d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = /*#__PURE__*/ reactExports.forwardRef(CheckCircleIcon);

function EmailOverlay({ onSuccess }) {
  const [email, setEmail] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [showSuccess, setShowSuccess] = reactExports.useState(false);
  const [marketingOptIn, setMarketingOptIn] = reactExports.useState(true);
  const handleSubmit = reactExports.useCallback(async (e) => {
    e.preventDefault();
    setError(null);
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setError(validation.error || "Invalid email");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/email-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, marketingOptIn })
      });
      const data = await response.json();
      if (data.success) {
        setShowSuccess(true);
        onSuccess();
      } else {
        setError(data.error || "Failed to subscribe");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setError(err instanceof Error ? err.message : "Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [email, marketingOptIn, onSuccess]);
  if (showSuccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[32px] font-bold mb-2 font-['Fraunces'] text-gray-900", children: "Thank you!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-600", children: "You're all set! The content will be visible in a moment." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[32px] font-bold mb-2 font-['Fraunces'] text-gray-900", children: "Get unlimited free access" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-600 mb-6", children: "Essential resources for design leaders" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            value: email,
            onChange: (e) => {
              setEmail(e.target.value);
              setError(null);
            },
            disabled: isSubmitting,
            placeholder: "Your email",
            className: "w-full max-w-sm mx-auto px-6 py-3 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800 block disabled:opacity-50 disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center space-x-2 mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "marketingOptIn",
              checked: marketingOptIn,
              onChange: (e) => setMarketingOptIn(e.target.checked),
              className: "h-4 w-4 text-black border-gray-300 rounded focus:ring-black accent-black"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "marketingOptIn", className: "text-sm text-gray-600", children: "I agree to receive updates on new resources" })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-sm mt-2", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "relative w-full max-w-sm mx-auto bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors text-lg font-medium block disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `transition-opacity duration-200 ${isSubmitting ? "opacity-0" : "opacity-100"}`, children: "Continue reading" }),
              isSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "animate-spin h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2 text-[15px] text-gray-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-green-600 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Leadership guides and templates" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-green-600 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Exclusive design case studies" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-green-600 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Regular updates with new content" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 pb-16 text-sm text-gray-400", children: "We respect your privacy. No spam, ever. Unsubscribe anytime." })
    ] })
  ] });
}

function ContentGate({ children }) {
  const [isClient, setIsClient] = reactExports.useState(false);
  const [isSubscribed, setIsSubscribed] = reactExports.useState(false);
  const [isHiding, setIsHiding] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setIsClient(true);
    const subscribed = localStorage.getItem("emailSubscribed") === "true";
    setIsSubscribed(subscribed);
  }, []);
  const handleSuccess = reactExports.useCallback(() => {
    setIsHiding(true);
    setTimeout(() => {
      localStorage.setItem("emailSubscribed", "true");
      setIsSubscribed(true);
      setIsHiding(false);
    }, 1500);
  }, []);
  reactExports.useCallback(() => {
    localStorage.removeItem("emailSubscribed");
    setIsSubscribed(false);
    setIsHiding(false);
  }, []);
  if (!isClient) {
    return null;
  }
  if (isSubscribed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      children,
      false
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "relative transition-opacity duration-500",
        style: {
          maxHeight: "1000px",
          overflow: "hidden",
          mask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 900px, rgba(0,0,0,0) 1000px)",
          WebkitMask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 900px, rgba(0,0,0,0) 1000px)"
        },
        children
      }
    ),
    !isSubscribed && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `absolute bottom-0 left-0 right-0 transition-all duration-500 ${isHiding ? "opacity-0 transform translate-y-full" : "opacity-100"}`,
        style: {
          width: "100%",
          zIndex: 50,
          background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100px, rgba(255,255,255,1) 100%)",
          paddingTop: "100px"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[680px] mx-auto pt-4 px-4 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmailOverlay, { onSuccess: handleSuccess, isHiding }) }) })
      }
    ),
    false
  ] });
}

const $$Astro$1 = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} `;
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/node_modules/@vercel/analytics/dist/astro/index.astro", undefined);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Open Design Docs - A comprehensive resource for design leadership and management",
    image = "/og-image.jpg",
    type = "website"
  } = Astro2.props;
  const path = Astro2.url.pathname;
  shouldShowSubstack(path);
  const showContentGate = shouldShowContentGate(path);
  const siteUrl = "https://opendesigndocs.com";
  const canonicalURL = new URL(path, siteUrl).toString();
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="canonical"', "><!-- Primary Meta Tags --><title>", ' | Open Design Docs</title><meta name="title"', '><meta name="description"', '><!-- Open Graph / Facebook --><meta property="og:type"', '><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><meta name="generator"', ">", "", '</head> <body> <div class="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center px-4"> <a href="/docs/leadership/day-1" class="flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect> <line x1="3" y1="9" x2="21" y2="9"></line> <line x1="9" y1="21" x2="9" y2="9"></line> </svg> <span class="text-[15px] font-medium text-gray-900 leading-none">Open Design Docs</span> </a> <button id="mobile-menu-button" class="ml-auto p-2 text-gray-700 -mr-2" aria-label="Toggle menu"> <div class="relative w-6 h-6"> <!-- Close icon (X) --> <svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-0 w-6 h-6 opacity-0 transform rotate-0 transition-all duration-300" id="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line> </svg> <!-- Menu icon (hamburger) --> <svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-0 w-6 h-6 opacity-100 transform rotate-0 transition-all duration-300" id="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <line x1="3" y1="12" x2="21" y2="12"></line> <line x1="3" y1="6" x2="21" y2="6"></line> <line x1="3" y1="18" x2="21" y2="18"></line> </svg> </div> </button> </div> <div class="flex min-h-screen"> ', ' <main class="flex-1 lg:pl-[250px]"> <div class="pt-20 lg:pt-8"> <div class="max-w-[900px] mx-auto px-4 lg:px-0"> <div class="relative max-w-[680px] mx-auto"> ', " </div> </div> </div> </main> </div> ", " <script>\n      function setupMobileMenu() {\n        const mobileMenuButton = document.getElementById('mobile-menu-button');\n        const sidebar = document.getElementById('sidebar');\n        const menuIcon = document.getElementById('menu-icon');\n        const closeIcon = document.getElementById('close-icon');\n        const body = document.body;\n\n        function openMenu() {\n          sidebar?.classList.remove('-translate-x-full');\n          body.style.overflow = 'hidden';\n          menuIcon?.classList.remove('opacity-100', 'rotate-0');\n          menuIcon?.classList.add('opacity-0', 'rotate-180');\n          closeIcon?.classList.remove('opacity-0', '-rotate-180');\n          closeIcon?.classList.add('opacity-100', 'rotate-0');\n        }\n\n        function closeMenu() {\n          sidebar?.classList.add('-translate-x-full');\n          body.style.overflow = '';\n          menuIcon?.classList.remove('opacity-0', 'rotate-180');\n          menuIcon?.classList.add('opacity-100', 'rotate-0');\n          closeIcon?.classList.remove('opacity-100', 'rotate-0');\n          closeIcon?.classList.add('opacity-0', '-rotate-180');\n        }\n\n        mobileMenuButton?.addEventListener('click', (e) => {\n          e.stopPropagation();\n          if (sidebar?.classList.contains('-translate-x-full')) {\n            openMenu();\n          } else {\n            closeMenu();\n          }\n        });\n\n        // Close sidebar when clicking outside on mobile\n        document.addEventListener('click', (e) => {\n          if (window.innerWidth > 1024) return;\n          \n          const isClickInsideSidebar = sidebar?.contains(e.target);\n          const isClickOnMenuButton = mobileMenuButton?.contains(e.target);\n          \n          if (!isClickInsideSidebar && !isClickOnMenuButton && !sidebar?.classList.contains('-translate-x-full')) {\n            closeMenu();\n          }\n        });\n\n        // Handle window resize\n        window.addEventListener('resize', () => {\n          if (window.innerWidth > 1024) {\n            body.style.overflow = '';\n          }\n        });\n      }\n\n      // Setup on initial load\n      setupMobileMenu();\n\n      // Setup again after view transitions\n      document.addEventListener('astro:page-load', () => {\n        setupMobileMenu();\n      });\n    <\/script> </body> </html>"])), addAttribute(canonicalURL, "href"), title, addAttribute(`${title} | Open Design Docs`, "content"), addAttribute(description, "content"), addAttribute(type, "content"), addAttribute(canonicalURL, "content"), addAttribute(`${title} | Open Design Docs`, "content"), addAttribute(description, "content"), addAttribute(new URL(image, siteUrl).toString(), "content"), addAttribute(canonicalURL, "content"), addAttribute(`${title} | Open Design Docs`, "content"), addAttribute(description, "content"), addAttribute(new URL(image, siteUrl).toString(), "content"), addAttribute(Astro2.generator, "content"), renderComponent($$result, "ViewTransitions", $$ViewTransitions, {}), renderHead(), renderComponent($$result, "Sidebar", $$Sidebar, { "id": "sidebar", "currentPath": path }), showContentGate ? renderTemplate`${renderComponent($$result, "ContentGate", ContentGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/ContentGate", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}` : renderTemplate`${renderSlot($$result, $$slots["default"])}`, renderComponent($$result, "Analytics", $$Index, {}));
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/layouts/Layout.astro", undefined);

export { $$Layout as $, ContentGate as C };

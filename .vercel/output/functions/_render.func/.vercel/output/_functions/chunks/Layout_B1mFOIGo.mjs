import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, d as renderComponent, b as createAstro, e as renderSlot, g as renderHead } from './astro/server_MZTBIW0G.mjs';
import 'kleur/colors';
import { $ as $$ViewTransitions } from './ViewTransitions_CJg_G68j.mjs';
import * as React from 'react';
import { forwardRef, createElement, useState, useCallback, useEffect } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
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
  const Component = forwardRef(
    ({
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      ...rest
    }, ref) => {
      return createElement(
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
          ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
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
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/components/Sidebar.astro", void 0);

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
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = /*#__PURE__*/ React.forwardRef(CheckCircleIcon);

function EmailOverlay({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const handleSubmit = useCallback(async (e) => {
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
    return /* @__PURE__ */ jsxs("div", { className: "text-center py-8 animate-fade-in", children: [
      /* @__PURE__ */ jsx(ForwardRef, { className: "h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce" }),
      /* @__PURE__ */ jsx("h2", { className: "text-[32px] font-bold mb-2 font-['Fraunces'] text-gray-900", children: "Thank you!" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600", children: "You're all set! The content will be visible in a moment." })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-[32px] font-bold mb-2 font-['Fraunces'] text-gray-900", children: "Get unlimited free access" }),
    /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-6", children: "Essential resources for design leaders" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
        /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 mt-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "marketingOptIn",
              checked: marketingOptIn,
              onChange: (e) => setMarketingOptIn(e.target.checked),
              className: "h-4 w-4 text-black border-gray-300 rounded focus:ring-black accent-black"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "marketingOptIn", className: "text-sm text-gray-600", children: "I agree to receive updates on new resources" })
        ] }),
        error && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-2", children: error }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "relative w-full max-w-sm mx-auto bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors text-lg font-medium block disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden",
            children: [
              /* @__PURE__ */ jsx("span", { className: `transition-opacity duration-200 ${isSubmitting ? "opacity-0" : "opacity-100"}`, children: "Continue reading" }),
              isSubmitting && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-2 text-[15px] text-gray-500", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-green-600 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
          /* @__PURE__ */ jsx("span", { children: "Leadership guides and templates" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-green-600 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
          /* @__PURE__ */ jsx("span", { children: "Exclusive design case studies" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-green-600 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
          /* @__PURE__ */ jsx("span", { children: "Regular updates with new content" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 pb-16 text-sm text-gray-400", children: "We respect your privacy. No spam, ever. Unsubscribe anytime." })
    ] })
  ] });
}

function ContentGate({ children }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  useEffect(() => {
    const subscribed = localStorage.getItem("emailSubscribed") === "true";
    setIsSubscribed(subscribed);
  }, []);
  const handleSuccess = useCallback(() => {
    setIsHiding(true);
    setTimeout(() => {
      localStorage.setItem("emailSubscribed", "true");
      setIsSubscribed(true);
      setIsHiding(false);
    }, 1500);
  }, []);
  useCallback(() => {
    localStorage.removeItem("emailSubscribed");
    setIsSubscribed(false);
    setIsHiding(false);
  }, []);
  if (isSubscribed) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      children,
      false
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
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
    !isSubscribed && /* @__PURE__ */ jsx(
      "div",
      {
        className: `absolute bottom-0 left-0 right-0 transition-all duration-500 ${isHiding ? "opacity-0 transform translate-y-full" : "opacity-100"}`,
        style: {
          width: "100%",
          zIndex: 50,
          background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100px, rgba(255,255,255,1) 100%)",
          paddingTop: "100px"
        },
        children: /* @__PURE__ */ jsx("div", { className: "bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-[680px] mx-auto pt-4 px-4 pb-8", children: /* @__PURE__ */ jsx(EmailOverlay, { onSuccess: handleSuccess }) }) })
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
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);

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
}, "/Users/jasonculbertson/Documents/GitHub/opendesign/src/layouts/Layout.astro", void 0);

export { $$Layout as $, ContentGate as C };

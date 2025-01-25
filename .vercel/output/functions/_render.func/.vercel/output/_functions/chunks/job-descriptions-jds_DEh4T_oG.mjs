import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_MZTBIW0G.mjs';
import { $ as $$Image } from './_astro_assets_CmUtqGhC.mjs';
import 'clsx';

const frontmatter = {
  "title": "Job Description Templates",
  "description": "Standardized job descriptions for seamless hiring",
  "author": "OpenDesign Team",
  "date": "2024-03-20T00:00:00.000Z",
  "category": "Recruiting",
  "tags": ["hiring", "job-descriptions", "recruiting"]
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "job-description-templates",
    "text": "Job Description Templates"
  }, {
    "depth": 2,
    "slug": "product-role-jds",
    "text": "Product Role JDs"
  }, {
    "depth": 2,
    "slug": "creative-role-jds",
    "text": "Creative Role JDs"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    h2: "h2",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "job-description-templates",
      children: "Job Description Templates"
    }), "\n", createVNode("div", {
      class: "gradient-panel",
      children: createVNode("p", {
        class: "text-[17px] leading-7 text-[#1a1f36]",
        children: createVNode(_components.p, {
          children: ["Well-crafted job descriptions are essential for attracting the right talent and setting clear expectations. These templates provide a consistent framework for creating effective JDs based on our ", createVNode("a", {
            href: "/docs/leadership/month-1/level-competencies",
            children: "Level Competencies"
          }), "."]
        })
      })
    }), "\n", createVNode(_components.h2, {
      id: "product-role-jds",
      children: "Product Role JDs"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Product Designer: Lead product design efforts and create intuitive user experiences"
      }), "\n", createVNode(_components.li, {
        children: "Content Designer: Craft clear, engaging copy for product interfaces and experiences"
      }), "\n", createVNode(_components.li, {
        children: "UX Researcher: Gather insights to inform product decisions and user needs"
      }), "\n", createVNode(_components.li, {
        children: "Design Ops: Enhance design workflows and manage team operations efficiently"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "creative-role-jds",
      children: "Creative Role JDs"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Graphic Designer: Design stunning visuals and branding materials"
      }), "\n", createVNode(_components.li, {
        children: "Copywriter: Write compelling content to captivate and engage your audience"
      }), "\n"]
    })]
  });
}
function MDXContent(props = {}) {
  const {
    wrapper: MDXLayout
  } = props.components || {};
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
const url = "src/content/docs/team/recruiting/job-descriptions-jds.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

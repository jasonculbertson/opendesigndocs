import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_Cz1lq_8W.mjs';
import { $ as $$Image } from './_astro_assets_Dbp-32AF.mjs';
import 'clsx';

const frontmatter = {
  "title": "Design Operations",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "design-operations-job-descriptions",
    "text": "Design Operations Job Descriptions"
  }, {
    "depth": 2,
    "slug": "role-overview",
    "text": "Role Overview"
  }, {
    "depth": 2,
    "slug": "available-job-descriptions",
    "text": "Available Job Descriptions"
  }, {
    "depth": 3,
    "slug": "entry-level",
    "text": "Entry Level"
  }, {
    "depth": 3,
    "slug": "senior-level",
    "text": "Senior Level"
  }, {
    "depth": 3,
    "slug": "staff-level",
    "text": "Staff Level"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "design-operations-job-descriptions",
      children: "Design Operations Job Descriptions"
    }), "\n", createVNode(_components.p, {
      children: "We provide comprehensive job descriptions for Design Operations roles at various levels, from entry-level to principal positions. Each description outlines the key responsibilities, required skills, and expectations for the role."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "Design Operations professionals at [Company Name] are responsible for optimizing and scaling design practices, tools, and processes. They work to improve the efficiency and effectiveness of the design organization through systematic improvements to workflows, tools, and cross-functional collaboration."
    }), "\n", createVNode(_components.h2, {
      id: "available-job-descriptions",
      children: "Available Job Descriptions"
    }), "\n", createVNode(_components.h3, {
      id: "entry-level",
      children: "Entry Level"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Design Ops Coordinator"
        }), ": Entry-level position for those starting their Design Ops career"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Design Ops Specialist"
        }), ": Mid-level position for specialists with some experience"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "senior-level",
      children: "Senior Level"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Senior Design Ops"
        }), ": For experienced professionals leading Design Ops initiatives"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Lead Design Ops"
        }), ": For professionals leading teams and major projects"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "staff-level",
      children: "Staff Level"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Staff Design Ops"
        }), ": For highly experienced professionals driving Design Ops strategy"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Principal Design Ops"
        }), ": For top-level professionals shaping organizational direction"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Click on each level to view the detailed job description and requirements."
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
const url = "src/content/docs/frameworks/job-descriptions/design-ops/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/design-ops/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/design-ops/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

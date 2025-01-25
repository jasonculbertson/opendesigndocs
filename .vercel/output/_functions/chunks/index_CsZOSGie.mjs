import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_Cz1lq_8W.mjs';
import { $ as $$Image } from './_astro_assets_Dbp-32AF.mjs';
import 'clsx';

const frontmatter = {
  "title": "Graphic Designer",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "graphic-designer-job-descriptions",
    "text": "Graphic Designer Job Descriptions"
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
      id: "graphic-designer-job-descriptions",
      children: "Graphic Designer Job Descriptions"
    }), "\n", createVNode(_components.p, {
      children: "We provide comprehensive job descriptions for Graphic Designers at various levels, from entry-level to principal positions. Each description outlines the key responsibilities, required skills, and expectations for the role."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "Graphic Designers at [Company Name] are responsible for creating visually compelling designs that communicate our brand message effectively across various mediums. They work closely with marketing, product teams, and other stakeholders to create cohesive visual experiences that align with our brand strategy."
    }), "\n", createVNode(_components.h2, {
      id: "available-job-descriptions",
      children: "Available Job Descriptions"
    }), "\n", createVNode(_components.h3, {
      id: "entry-level",
      children: "Entry Level"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Designer I"
        }), ": Entry-level position for those starting their graphic design career"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Designer II"
        }), ": Mid-level position for designers with some experience"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "senior-level",
      children: "Senior Level"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Senior Designer"
        }), ": For experienced designers leading design initiatives"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Lead Designer"
        }), ": For designers leading teams and major projects"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "staff-level",
      children: "Staff Level"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Staff Designer"
        }), ": For highly experienced designers driving design strategy"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Principal Designer"
        }), ": For top-level designers shaping organizational direction"]
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
const url = "src/content/docs/frameworks/job-descriptions/graphic-designer/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/graphic-designer/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/graphic-designer/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_MZTBIW0G.mjs';
import { $ as $$Image } from './_astro_assets_C5-oC_0B.mjs';
import 'clsx';

const frontmatter = {
  "title": "UX Writer",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "ux-writer-job-descriptions",
    "text": "UX Writer Job Descriptions"
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
      id: "ux-writer-job-descriptions",
      children: "UX Writer Job Descriptions"
    }), "\n", createVNode(_components.p, {
      children: "We provide comprehensive job descriptions for UX Writers at various levels, from entry-level to principal positions. Each description outlines the key responsibilities, required skills, and expectations for the role."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "UX Writers at [Company Name] are responsible for creating clear, concise, and engaging content that enhances the user experience across our products and platforms. They work closely with designers, product managers, and other stakeholders to ensure our content meets user needs and business goals."
    }), "\n", createVNode(_components.h2, {
      id: "available-job-descriptions",
      children: "Available Job Descriptions"
    }), "\n", createVNode(_components.h3, {
      id: "entry-level",
      children: "Entry Level"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Writer I"
        }), ": Entry-level position for those starting their UX writing career"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Writer II"
        }), ": Mid-level position for writers with some experience"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "senior-level",
      children: "Senior Level"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Senior Writer"
        }), ": For experienced writers leading content initiatives"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Lead Writer"
        }), ": For writers leading teams and major projects"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "staff-level",
      children: "Staff Level"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Staff Writer"
        }), ": For highly experienced writers driving content strategy"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Principal Writer"
        }), ": For top-level writers shaping organizational direction"]
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
const url = "src/content/docs/team/recruiting/job-descriptions-jds/content-designer/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/content-designer/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/content-designer/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

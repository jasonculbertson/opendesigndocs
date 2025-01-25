import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_Cz1lq_8W.mjs';
import { $ as $$Image } from './_astro_assets_Dbp-32AF.mjs';
import 'clsx';

const frontmatter = {
  "title": "Individual Assessment",
  "description": "Compare and contrast assessments for growth planning",
  "author": "OpenDesign Team",
  "date": "2024-03-20T00:00:00.000Z",
  "category": "Career Development",
  "tags": ["assessment", "growth", "evaluation"]
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "individual-assessment",
    "text": "Individual Assessment"
  }, {
    "depth": 2,
    "slug": "using-the-framework",
    "text": "Using the Framework"
  }, {
    "depth": 3,
    "slug": "step-1-individual-assessment",
    "text": "Step 1: Individual-Assessment"
  }, {
    "depth": 3,
    "slug": "step-2-gap-analysis",
    "text": "Step 2: Gap Analysis"
  }, {
    "depth": 3,
    "slug": "step-3-action-planning",
    "text": "Step 3: Action Planning"
  }, {
    "depth": 2,
    "slug": "best-practices",
    "text": "Best Practices"
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
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "individual-assessment",
      children: "Individual Assessment"
    }), "\n", createVNode("div", {
      class: "gradient-panel",
      children: createVNode("p", {
        class: "text-[17px] leading-7 text-[#1a1f36]",
        children: createVNode(_components.p, {
          children: ["Regular assessment of individual performance and growth is crucial for career development. Similar to the self-evalution, I utilize the ", createVNode("a", {
            href: "/docs/leadership/month-1/level-competencies",
            children: "Level Competencies"
          }), " to evaluate and discuss any necessary steps to help them grow their skills."]
        })
      })
    }), "\n", createVNode(_components.h2, {
      id: "using-the-framework",
      children: "Using the Framework"
    }), "\n", createVNode(_components.h3, {
      id: "step-1-individual-assessment",
      children: "Step 1: Individual-Assessment"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Review each competency"
      }), "\n", createVNode(_components.li, {
        children: "Rate the current level as not meeting, meeting, or exceeding"
      }), "\n", createVNode(_components.li, {
        children: "Provide specific examples"
      }), "\n", createVNode(_components.li, {
        children: "Note areas for improvement"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "step-2-gap-analysis",
      children: "Step 2: Gap Analysis"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Identify skill gaps"
      }), "\n", createVNode(_components.li, {
        children: "Prioritize development areas"
      }), "\n", createVNode(_components.li, {
        children: "Set realistic goals"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "step-3-action-planning",
      children: "Step 3: Action Planning"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Create specific action items"
      }), "\n", createVNode(_components.li, {
        children: "Set timelines"
      }), "\n", createVNode(_components.li, {
        children: "Define success metrics"
      }), "\n", createVNode(_components.li, {
        children: "Identify resources needed"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "best-practices",
      children: "Best Practices"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Be honest and objective"
      }), "\n", createVNode(_components.li, {
        children: "Use specific examples"
      }), "\n", createVNode(_components.li, {
        children: "Focus on growth opportunities"
      }), "\n", createVNode(_components.li, {
        children: "Seek feedback from others"
      }), "\n", createVNode(_components.li, {
        children: "Update regularly"
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
const url = "src/content/docs/leadership/quarter-2/individual-assessment.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/leadership/quarter-2/individual-assessment.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/leadership/quarter-2/individual-assessment.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

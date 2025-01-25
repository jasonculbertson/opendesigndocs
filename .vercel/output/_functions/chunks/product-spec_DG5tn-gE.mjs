import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_Cz1lq_8W.mjs';
import { $ as $$Image } from './_astro_assets_Dbp-32AF.mjs';
import 'clsx';

const frontmatter = {
  "title": "Product Spec",
  "description": "Clearly outline product requirements and expectations",
  "author": "OpenDesign Team",
  "date": "2024-03-20T00:00:00.000Z",
  "category": "Product",
  "tags": ["product", "requirements", "documentation"]
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "product-spec",
    "text": "Product Spec"
  }, {
    "depth": 2,
    "slug": "problem-overview",
    "text": "Problem Overview"
  }, {
    "depth": 2,
    "slug": "high-level-approach",
    "text": "High-Level Approach"
  }, {
    "depth": 2,
    "slug": "goals-and-success",
    "text": "Goals and Success"
  }, {
    "depth": 2,
    "slug": "deliverables-and-constraints",
    "text": "Deliverables and Constraints"
  }, {
    "depth": 2,
    "slug": "target-audience",
    "text": "Target Audience"
  }, {
    "depth": 2,
    "slug": "project-timeline",
    "text": "Project Timeline"
  }, {
    "depth": 2,
    "slug": "additional-resources-and-stakeholders",
    "text": "Additional Resources and Stakeholders"
  }, {
    "depth": 2,
    "slug": "problem-alignment-approval",
    "text": "Problem Alignment Approval"
  }, {
    "depth": 2,
    "slug": "solution-alignment",
    "text": "Solution Alignment"
  }, {
    "depth": 3,
    "slug": "key-features",
    "text": "Key Features"
  }, {
    "depth": 3,
    "slug": "key-flows",
    "text": "Key Flows"
  }, {
    "depth": 3,
    "slug": "open-issues-or-decisions",
    "text": "Open Issues or Decisions"
  }, {
    "depth": 2,
    "slug": "launch-plan",
    "text": "Launch Plan"
  }, {
    "depth": 2,
    "slug": "solution-alignment-approval",
    "text": "Solution Alignment Approval"
  }, {
    "depth": 2,
    "slug": "appendix",
    "text": "Appendix"
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
      id: "product-spec",
      children: "Product Spec"
    }), "\n", createVNode("div", {
      class: "gradient-panel",
      children: createVNode("p", {
        class: "text-[17px] leading-7 text-[#1a1f36]",
        children: createVNode(_components.p, {
          children: "A well-written product specification is crucial for aligning teams and ensuring successful product development. This document should be completed prior to project kickoff and aligned cross-functionally."
        })
      })
    }), "\n", createVNode(_components.h2, {
      id: "problem-overview",
      children: "Problem Overview"
    }), "\n", createVNode(_components.p, {
      children: "Describe the problem (or opportunity) you\u2019re trying to solve."
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Why does this matter to our customers and business?"
      }), "\n", createVNode(_components.li, {
        children: "What business needs, research, or customer feedback, if any, led to this project?"
      }), "\n", createVNode(_components.li, {
        children: "Do any previous projects relate to this one and, if so, how did they go and what did your team learn?"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "high-level-approach",
      children: "High-Level Approach"
    }), "\n", createVNode(_components.p, {
      children: "Briefly describe how the team might solve the problem. This should be enough for the reader to imagine possible solution directions and get a rough sense of the project\u2019s scope. For example, if the problem is \u201Cdiscoverability of new features,\u201D the approach might be \u201Ca notification center for relevant features.\u201D"
    }), "\n", createVNode(_components.h2, {
      id: "goals-and-success",
      children: "Goals and Success"
    }), "\n", createVNode(_components.p, {
      children: "Outline high-level goals, ideally in priority order and not too many. Include measurable (metrics) and immeasurable (feelings) goals. Keep it concise."
    }), "\n", createVNode(_components.h2, {
      id: "deliverables-and-constraints",
      children: "Deliverables and Constraints"
    }), "\n", createVNode(_components.p, {
      children: "List the deliverables that need to be handed off to engineering. Note any constraints the team should be aware of before starting the project. This could include Figma files, prototypes, animations, or illustrations."
    }), "\n", createVNode(_components.h2, {
      id: "target-audience",
      children: "Target Audience"
    }), "\n", createVNode(_components.p, {
      children: "Describe the target audience or persona critical for project success. Are there any insights into relevant audience demographics to produce the best work possible? Defining your target audience early can also prevent scope creep."
    }), "\n", createVNode(_components.h2, {
      id: "project-timeline",
      children: "Project Timeline"
    }), "\n", createVNode(_components.p, {
      children: "A project timeline gives the team a clear idea of key dates and important milestones. The timeline should include:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Kickoff"
      }), "\n", createVNode(_components.li, {
        children: "Wireframe review (if necessary per t-shirt sizing)"
      }), "\n", createVNode(_components.li, {
        children: "Product review (for medium to large projects)"
      }), "\n", createVNode(_components.li, {
        children: "Design review"
      }), "\n", createVNode(_components.li, {
        children: "Handoff"
      }), "\n", createVNode(_components.li, {
        children: "QA"
      }), "\n", createVNode(_components.li, {
        children: "Launch"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "additional-resources-and-stakeholders",
      children: "Additional Resources and Stakeholders"
    }), "\n", createVNode(_components.p, {
      children: "Link any relevant documentation your team might need. Include any stakeholders from other squads that need to be involved in the project. Consider whether these stakeholders should be at the project kickoff as well."
    }), "\n", createVNode(_components.p, {
      children: "Please bring this to Product Review prior to proceeding for all medium or large-sized projects."
    }), "\n", createVNode(_components.h2, {
      id: "problem-alignment-approval",
      children: "Problem Alignment Approval"
    }), "\n", createVNode(_components.p, {
      children: "List any Shipping Dept member who needs to approve the Problem Alignment. This could be a manager, cross-team PM, or executive. Each person will check their name off once they have approved."
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Name 1"
      }), "\n", createVNode(_components.li, {
        children: "Name 2"
      }), "\n", createVNode(_components.li, {
        children: "Name 3"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "solution-alignment",
      children: "Solution Alignment"
    }), "\n", createVNode(_components.h3, {
      id: "key-features",
      children: "Key Features"
    }), "\n", createVNode(_components.p, {
      children: "Provide an overview of what we\u2019re building. List features, with priorities if relevant. Discuss what you\u2019re not building (or saving for a future release) if relevant."
    }), "\n", createVNode(_components.h3, {
      id: "key-flows",
      children: "Key Flows"
    }), "\n", createVNode(_components.p, {
      children: "Show the end-to-end experience for customers. This could be written prose, a flow diagram, screenshots, or design explorations. This will become more specific over time. Embed the Figma file here, not just links."
    }), "\n", createVNode(_components.h3, {
      id: "open-issues-or-decisions",
      children: "Open Issues or Decisions"
    }), "\n", createVNode(_components.p, {
      children: "Keep track of open issues or key decisions here. Document these so people know the discussions have happened and there\u2019s strong awareness of the tradeoffs."
    }), "\n", createVNode(_components.h2, {
      id: "launch-plan",
      children: "Launch Plan"
    }), "\n", createVNode(_components.p, {
      children: "Define the phases (if necessary) that will get this product to market, the purpose of each phase, and the criteria to move on to the next one. Highlight risks and dependencies that can affect timelines or progress (and ideally contingency plans). Below is a table of example phases."
    }), "\n", createVNode(_components.h2, {
      id: "solution-alignment-approval",
      children: "Solution Alignment Approval"
    }), "\n", createVNode(_components.p, {
      children: "List any Shipping Dept member who needs to approve the Solution Alignment. This could be a manager, cross-team PM, or executive. Each person will check their name off once they have approved."
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Name 1"
      }), "\n", createVNode(_components.li, {
        children: "Name 2"
      }), "\n", createVNode(_components.li, {
        children: "Name 3"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "appendix",
      children: "Appendix"
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
const url = "src/content/docs/team/product/product-spec.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/product/product-spec.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/product/product-spec.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

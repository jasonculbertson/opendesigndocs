import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_MZTBIW0G.mjs';
import { $ as $$Image } from './_astro_assets_C5-oC_0B.mjs';
import 'clsx';

const frontmatter = {
  "title": "Long-term Goals",
  "description": "Develop a strategic roadmap for career development",
  "author": "OpenDesign Team",
  "date": "2024-03-20T00:00:00.000Z",
  "category": "Career Development",
  "tags": ["goals", "career-planning", "strategy"]
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "long-term-goals",
    "text": "Long-term Goals"
  }, {
    "depth": 3,
    "slug": "motivation",
    "text": "Motivation"
  }, {
    "depth": 3,
    "slug": "values",
    "text": "Values"
  }, {
    "depth": 3,
    "slug": "long-term-career-milestones",
    "text": "Long-term Career Milestones"
  }, {
    "depth": 3,
    "slug": "current-strengths",
    "text": "Current Strengths"
  }, {
    "depth": 3,
    "slug": "current-weaknesses",
    "text": "Current Weaknesses"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    h3: "h3",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "long-term-goals",
      children: "Long-term Goals"
    }), "\n", createVNode("div", {
      class: "gradient-panel",
      children: [createVNode("p", {
        class: "text-[17px] leading-7 text-[#1a1f36]",
        children: createVNode(_components.p, {
          children: "This exercise is designed to support your career development by helping you identify your core motivations, values, and long-term career goals."
        })
      }), createVNode("p", {
        class: "text-[17px] leading-7 text-[#1a1f36] mt-4",
        children: createVNode(_components.p, {
          children: "These goals are not meant to be \u201Cgraded\u201D but to guide coaching conversations with your manager. The aim is to set inspiring, challenging goals that provide direction. Think of this as a self-management tool to keep yourself accountable."
        })
      })]
    }), "\n", createVNode(_components.h3, {
      id: "motivation",
      children: "Motivation"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["What drives you? What makes you want to come to work each day?\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "What types of work have felt meaningful to you?"
          }), "\n", createVNode(_components.li, {
            children: "Are there common themes in those types of work?"
          }), "\n", createVNode(_components.li, {
            children: "What types of work give you energy? What types drain you?"
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "values",
      children: "Values"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["What principles drive your decision-making?\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Example 1: Short reason why"
          }), "\n", createVNode(_components.li, {
            children: "Example 2: Short reason why"
          }), "\n", createVNode(_components.li, {
            children: "Example 3: Short reason why"
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "long-term-career-milestones",
      children: "Long-term Career Milestones"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "How might you measure or imagine your purpose and mastery?"
      }), "\n", createVNode(_components.li, {
        children: ["How will you know if you\u2019ve been living your values?\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Example 1: Short reason why"
          }), "\n", createVNode(_components.li, {
            children: "Example 2: Short reason why"
          }), "\n", createVNode(_components.li, {
            children: "Example 3: Short reason why"
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "current-strengths",
      children: "Current Strengths"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["What are your top strengths? How do you apply them?\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Example 1: Short reason why"
          }), "\n", createVNode(_components.li, {
            children: "Example 2: Short reason why"
          }), "\n", createVNode(_components.li, {
            children: "Example 3: Short reason why"
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "current-weaknesses",
      children: "Current Weaknesses"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["What are your top weaknesses? How might you address them?\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Example 1: Short reason why"
          }), "\n", createVNode(_components.li, {
            children: "Example 2: Short reason why"
          }), "\n", createVNode(_components.li, {
            children: "Example 3: Short reason why"
          }), "\n"]
        }), "\n"]
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
const url = "src/content/docs/leadership/quarter-2/long-term-goals.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/leadership/quarter-2/long-term-goals.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/leadership/quarter-2/long-term-goals.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_MZTBIW0G.mjs';
import { $ as $$Image } from './_astro_assets_CmUtqGhC.mjs';
import 'clsx';

const frontmatter = {
  "title": "Transition Plan",
  "description": "Create a comprehensive handover plan",
  "author": "OpenDesign Team",
  "date": "2024-03-20T00:00:00.000Z",
  "category": "Leadership",
  "tags": ["transition", "handover", "management"]
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "transition-plan",
    "text": "Transition Plan"
  }, {
    "depth": 2,
    "slug": "team-overview",
    "text": "Team overview"
  }, {
    "depth": 2,
    "slug": "rituals",
    "text": "Rituals"
  }, {
    "depth": 2,
    "slug": "projects",
    "text": "Projects"
  }, {
    "depth": 2,
    "slug": "future-needs",
    "text": "Future needs"
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
      id: "transition-plan",
      children: "Transition Plan"
    }), "\n", createVNode("div", {
      class: "gradient-panel",
      children: createVNode("p", {
        class: "text-[17px] leading-7 text-[#1a1f36]",
        children: createVNode(_components.p, {
          children: "To prepare for my upcoming departure, this job transition plan outlines my standard duties, outstanding projects, current team members and more information to assist my successor."
        })
      })
    }), "\n", createVNode(_components.h2, {
      id: "team-overview",
      children: "Team overview"
    }), "\n", createVNode(_components.p, {
      children: "UX team:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["IC (level)\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Description of IC designer. Strengths, areas of growth, etc."
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Leadership team:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["XYZ (PM)\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Description of PM. Strengths, areas of growth, etc."
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["XYZ(Eng)\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Description of Eng. Strengths, areas of growth, etc."
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["XYZ (DS)\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Description of DS. Strengths, areas of growth, etc."
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "rituals",
      children: "Rituals"
    }), "\n", createVNode(_components.p, {
      children: "Weekly meetings:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "X Meeting"
      }), "\n", createVNode(_components.li, {
        children: "Y Meeting"
      }), "\n", createVNode(_components.li, {
        children: "Z Meeting"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Slack channels (public):"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "X channel"
      }), "\n", createVNode(_components.li, {
        children: "Y channel"
      }), "\n", createVNode(_components.li, {
        children: "Z channel"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Slack channels (private):"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "X channel"
      }), "\n", createVNode(_components.li, {
        children: "Y channel"
      }), "\n", createVNode(_components.li, {
        children: "Z channel"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "projects",
      children: "Projects"
    }), "\n", createVNode(_components.p, {
      children: "XYZ Project"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Description of project:\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Mission"
          }), "\n", createVNode(_components.li, {
            children: "Vision"
          }), "\n", createVNode(_components.li, {
            children: "Status"
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: "Documents"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "future-needs",
      children: "Future needs"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["XYZ IC\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: ["Overview\n", createVNode(_components.ul, {
              children: ["\n", createVNode(_components.li, {
                children: "What looking for"
              }), "\n", createVNode(_components.li, {
                children: "Why?"
              }), "\n"]
            }), "\n"]
          }), "\n", createVNode(_components.li, {
            children: "Status"
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
const url = "src/content/docs/leadership/departure/transition-plan.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/leadership/departure/transition-plan.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/leadership/departure/transition-plan.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

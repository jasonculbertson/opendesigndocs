import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_MZTBIW0G.mjs';
import { $ as $$Image } from './_astro_assets_C5-oC_0B.mjs';
import 'clsx';

const frontmatter = {
  "title": "Junior Designer (IC1) Competencies",
  "description": "Competencies for entry-level designers",
  "author": "OpenDesign Team",
  "date": "2024-03-20T00:00:00.000Z",
  "category": "IC Level",
  "tags": ["career-development", "junior-designer", "IC1"]
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "junior-designer-ic1-competencies",
    "text": "Junior Designer (IC1) Competencies"
  }, {
    "depth": 2,
    "slug": "core-skills",
    "text": "Core Skills"
  }, {
    "depth": 3,
    "slug": "design-craft",
    "text": "Design Craft"
  }, {
    "depth": 3,
    "slug": "technical-skills",
    "text": "Technical Skills"
  }, {
    "depth": 3,
    "slug": "collaboration",
    "text": "Collaboration"
  }, {
    "depth": 2,
    "slug": "expected-behaviors",
    "text": "Expected Behaviors"
  }, {
    "depth": 3,
    "slug": "ownership",
    "text": "Ownership"
  }, {
    "depth": 3,
    "slug": "growth-mindset",
    "text": "Growth Mindset"
  }, {
    "depth": 3,
    "slug": "communication",
    "text": "Communication"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    li: "li",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "junior-designer-ic1-competencies",
      children: "Junior Designer (IC1) Competencies"
    }), "\n", createVNode(_components.h2, {
      id: "core-skills",
      children: "Core Skills"
    }), "\n", createVNode(_components.h3, {
      id: "design-craft",
      children: "Design Craft"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Basic understanding of design principles"
      }), "\n", createVNode(_components.li, {
        children: "Proficiency with design tools"
      }), "\n", createVNode(_components.li, {
        children: "Ability to create simple user interfaces"
      }), "\n", createVNode(_components.li, {
        children: "Understanding of typography and color theory"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "technical-skills",
      children: "Technical Skills"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Basic HTML/CSS knowledge"
      }), "\n", createVNode(_components.li, {
        children: "Understanding of responsive design"
      }), "\n", createVNode(_components.li, {
        children: "Familiarity with design systems"
      }), "\n", createVNode(_components.li, {
        children: "Version control basics"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "collaboration",
      children: "Collaboration"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Clear communication"
      }), "\n", createVNode(_components.li, {
        children: "Receptive to feedback"
      }), "\n", createVNode(_components.li, {
        children: "Works well with guidance"
      }), "\n", createVNode(_components.li, {
        children: "Team-oriented mindset"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "expected-behaviors",
      children: "Expected Behaviors"
    }), "\n", createVNode(_components.h3, {
      id: "ownership",
      children: "Ownership"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Takes responsibility for assigned tasks"
      }), "\n", createVNode(_components.li, {
        children: "Asks questions when unclear"
      }), "\n", createVNode(_components.li, {
        children: "Meets deadlines"
      }), "\n", createVNode(_components.li, {
        children: "Maintains organized files"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "growth-mindset",
      children: "Growth Mindset"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Eager to learn"
      }), "\n", createVNode(_components.li, {
        children: "Seeks feedback"
      }), "\n", createVNode(_components.li, {
        children: "Applies learnings"
      }), "\n", createVNode(_components.li, {
        children: "Shows initiative"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "communication",
      children: "Communication"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Clear status updates"
      }), "\n", createVNode(_components.li, {
        children: "Active in team meetings"
      }), "\n", createVNode(_components.li, {
        children: "Documents work"
      }), "\n", createVNode(_components.li, {
        children: "Asks for help when needed"
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
const url = "src/content/docs/leadership/month-1/level-competencies/ic1.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/leadership/month-1/level-competencies/ic1.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/leadership/month-1/level-competencies/ic1.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

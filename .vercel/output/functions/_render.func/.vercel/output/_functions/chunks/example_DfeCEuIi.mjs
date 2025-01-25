import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_MZTBIW0G.mjs';
import { $ as $$Image } from './_astro_assets_CmUtqGhC.mjs';
import 'clsx';

const frontmatter = {
  "title": "Getting Started with Design Systems",
  "description": "Learn the fundamentals of creating and maintaining a design system",
  "author": "John Doe",
  "date": "2024-03-20T00:00:00.000Z",
  "category": "Design Systems",
  "tags": ["design-systems", "ui-design", "documentation"]
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "getting-started-with-design-systems",
    "text": "Getting Started with Design Systems"
  }, {
    "depth": 2,
    "slug": "why-design-systems-matter",
    "text": "Why Design Systems Matter"
  }, {
    "depth": 2,
    "slug": "key-components",
    "text": "Key Components"
  }, {
    "depth": 3,
    "slug": "design-tokens",
    "text": "Design Tokens"
  }, {
    "depth": 3,
    "slug": "component-library",
    "text": "Component Library"
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
    ol: "ol",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "getting-started-with-design-systems",
      children: "Getting Started with Design Systems"
    }), "\n", createVNode(_components.p, {
      children: "A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications."
    }), "\n", createVNode(_components.h2, {
      id: "why-design-systems-matter",
      children: "Why Design Systems Matter"
    }), "\n", createVNode(_components.p, {
      children: "Design systems help teams build better products faster by:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Ensuring consistency across products"
      }), "\n", createVNode(_components.li, {
        children: "Reducing design debt"
      }), "\n", createVNode(_components.li, {
        children: "Speeding up the development process"
      }), "\n", createVNode(_components.li, {
        children: "Improving collaboration between designers and developers"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "key-components",
      children: "Key Components"
    }), "\n", createVNode(_components.h3, {
      id: "design-tokens",
      children: "Design Tokens"
    }), "\n", createVNode(_components.p, {
      children: "Design tokens are the smallest building blocks of a design system. They include:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Colors"
      }), "\n", createVNode(_components.li, {
        children: "Typography"
      }), "\n", createVNode(_components.li, {
        children: "Spacing"
      }), "\n", createVNode(_components.li, {
        children: "Shadows"
      }), "\n", createVNode(_components.li, {
        children: "Border radii"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "component-library",
      children: "Component Library"
    }), "\n", createVNode(_components.p, {
      children: "A well-structured component library should include:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Basic elements (buttons, inputs, etc.)"
      }), "\n", createVNode(_components.li, {
        children: "Complex components (cards, modals, etc.)"
      }), "\n", createVNode(_components.li, {
        children: "Patterns (forms, navigation, etc.)"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "best-practices",
      children: "Best Practices"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Document everything"
      }), "\n", createVNode(_components.li, {
        children: "Version your system"
      }), "\n", createVNode(_components.li, {
        children: "Get stakeholder buy-in"
      }), "\n", createVNode(_components.li, {
        children: "Plan for maintenance"
      }), "\n", createVNode(_components.li, {
        children: "Test thoroughly"
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
const url = "src/content/docs/example.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/example.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/example.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

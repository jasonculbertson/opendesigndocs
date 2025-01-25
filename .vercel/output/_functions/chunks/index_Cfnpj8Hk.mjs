import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_Cz1lq_8W.mjs';
import { $ as $$Image } from './_astro_assets_Dbp-32AF.mjs';
import 'clsx';

const frontmatter = {
  "title": "Interview Questions",
  "description": "How to structure interview questions",
  "author": "OpenDesign Team",
  "date": "2024-03-20T00:00:00.000Z",
  "category": "UX Design",
  "tags": ["recruiting", "interviews", "hiring"]
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "interview-questions---coming-soon",
    "text": "Interview Questions - Coming Soon"
  }, {
    "depth": 2,
    "slug": "interview-structure",
    "text": "Interview Structure"
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
      id: "interview-questions---coming-soon",
      children: "Interview Questions - Coming Soon"
    }), "\n", createVNode("div", {
      class: "gradient-panel",
      children: createVNode("p", {
        class: "text-[17px] leading-7 text-[#1a1f36]",
        children: createVNode(_components.p, {
          children: "This comprehensive guide for conducting effective panel interviews is currently under development. Check back soon for:"
        })
      })
    }), "\n", createVNode(_components.h2, {
      id: "interview-structure",
      children: "Interview Structure"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Panel composition"
      }), "\n", createVNode(_components.li, {
        children: "Time allocation"
      }), "\n", createVNode(_components.li, {
        children: "Question flow"
      }), "\n", createVNode(_components.li, {
        children: "Evaluation criteria"
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
const url = "src/content/docs/frameworks/interview-questions/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/interview-questions/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/interview-questions/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

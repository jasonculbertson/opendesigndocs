import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_MZTBIW0G.mjs';
import { $ as $$Image } from './_astro_assets_CmUtqGhC.mjs';
import 'clsx';

const frontmatter = {
  "title": "Designer II",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "designer-ii",
    "text": "Designer II"
  }, {
    "depth": 2,
    "slug": "about-company-name",
    "text": "About [Company Name]"
  }, {
    "depth": 2,
    "slug": "role-overview",
    "text": "Role Overview"
  }, {
    "depth": 2,
    "slug": "what-youll-do",
    "text": "What You\u2019ll Do"
  }, {
    "depth": 2,
    "slug": "what-youll-need",
    "text": "What You\u2019ll Need"
  }, {
    "depth": 2,
    "slug": "benefits",
    "text": "Benefits"
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
      id: "designer-ii",
      children: "Designer II"
    }), "\n", createVNode(_components.h2, {
      id: "about-company-name",
      children: "About [Company Name]"
    }), "\n", createVNode(_components.p, {
      children: "Add a bit about your company here."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "As a Designer II at [Company Name], you will play a key role in shaping the voice and content strategy of our products. You\u2019ll work independently on complex writing projects while collaborating with cross-functional teams to create exceptional user experiences through clear, compelling content."
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-do",
      children: "What You\u2019ll Do"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Lead content creation for product features and user flows"
      }), "\n", createVNode(_components.li, {
        children: "Develop and maintain content guidelines and documentation"
      }), "\n", createVNode(_components.li, {
        children: "Conduct content audits and make recommendations for improvements"
      }), "\n", createVNode(_components.li, {
        children: "Work closely with design and product teams to ensure content aligns with user needs"
      }), "\n", createVNode(_components.li, {
        children: "Mentor junior writers and provide constructive feedback"
      }), "\n", createVNode(_components.li, {
        children: "Participate in user research and incorporate findings into content decisions"
      }), "\n", createVNode(_components.li, {
        children: "Contribute to content strategy initiatives and process improvements"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-need",
      children: "What You\u2019ll Need"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "2-4 years of experience in UX writing, content design, or related field"
      }), "\n", createVNode(_components.li, {
        children: "Strong portfolio demonstrating experience with product content"
      }), "\n", createVNode(_components.li, {
        children: "Excellent writing, editing, and proofreading skills"
      }), "\n", createVNode(_components.li, {
        children: "Deep understanding of UX design principles and content strategy"
      }), "\n", createVNode(_components.li, {
        children: "Experience with content management systems and design tools"
      }), "\n", createVNode(_components.li, {
        children: "Strong analytical and problem-solving abilities"
      }), "\n", createVNode(_components.li, {
        children: "Bachelor\u2019s degree in English, Communications, or related field (or equivalent experience)"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "benefits",
      children: "Benefits"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Competitive salary and equity package"
      }), "\n", createVNode(_components.li, {
        children: "Health, dental, and vision insurance"
      }), "\n", createVNode(_components.li, {
        children: "Flexible work hours and location"
      }), "\n", createVNode(_components.li, {
        children: "Professional development opportunities"
      }), "\n", createVNode(_components.li, {
        children: "Generous vacation policy"
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
const url = "src/content/docs/frameworks/job-descriptions/content-designer/designer-2/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/content-designer/designer-2/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/content-designer/designer-2/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_MZTBIW0G.mjs';
import { $ as $$Image } from './_astro_assets_CmUtqGhC.mjs';
import 'clsx';

const frontmatter = {
  "title": "Copywriter I",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "copywriter-i",
    "text": "Copywriter I"
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
      id: "copywriter-i",
      children: "Copywriter I"
    }), "\n", createVNode(_components.h2, {
      id: "about-company-name",
      children: "About [Company Name]"
    }), "\n", createVNode(_components.p, {
      children: "Add a bit about your company here."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "As a Copywriter I at [Company Name], you will create engaging content for various marketing channels. This entry-level position is ideal for someone who is passionate about writing, has a strong grasp of marketing principles, and is eager to learn and grow in a collaborative environment."
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-do",
      children: "What You\u2019ll Do"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Write clear, compelling copy for marketing materials"
      }), "\n", createVNode(_components.li, {
        children: "Create content for social media platforms"
      }), "\n", createVNode(_components.li, {
        children: "Support email marketing campaigns"
      }), "\n", createVNode(_components.li, {
        children: "Help maintain brand voice consistency"
      }), "\n", createVNode(_components.li, {
        children: "Assist in content calendar management"
      }), "\n", createVNode(_components.li, {
        children: "Collaborate with marketing and design teams"
      }), "\n", createVNode(_components.li, {
        children: "Participate in content reviews"
      }), "\n", createVNode(_components.li, {
        children: "Support content documentation efforts"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-need",
      children: "What You\u2019ll Need"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "0-2 years of experience in copywriting or content creation"
      }), "\n", createVNode(_components.li, {
        children: "Strong writing and editing skills"
      }), "\n", createVNode(_components.li, {
        children: "Basic understanding of marketing principles"
      }), "\n", createVNode(_components.li, {
        children: "Familiarity with SEO best practices"
      }), "\n", createVNode(_components.li, {
        children: "Attention to detail and ability to meet deadlines"
      }), "\n", createVNode(_components.li, {
        children: "Experience with content management systems"
      }), "\n", createVNode(_components.li, {
        children: "Bachelor\u2019s degree in English, Marketing, or related field (or equivalent experience)"
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
const url = "src/content/docs/frameworks/job-descriptions/copywriter/copywriter-1/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/copywriter/copywriter-1/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/copywriter/copywriter-1/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

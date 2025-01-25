import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_Cz1lq_8W.mjs';
import { $ as $$Image } from './_astro_assets_Dbp-32AF.mjs';
import 'clsx';

const frontmatter = {
  "title": "Copywriter II",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "copywriter-ii",
    "text": "Copywriter II"
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
      id: "copywriter-ii",
      children: "Copywriter II"
    }), "\n", createVNode(_components.h2, {
      id: "about-company-name",
      children: "About [Company Name]"
    }), "\n", createVNode(_components.p, {
      children: "Add a bit about your company here."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "As a Copywriter II at [Company Name], you will play a key role in developing marketing content across multiple channels. You\u2019ll work independently on complex writing projects while collaborating with cross-functional teams to create compelling, on-brand messaging."
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-do",
      children: "What You\u2019ll Do"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Lead copywriting projects from concept to completion"
      }), "\n", createVNode(_components.li, {
        children: "Create comprehensive marketing campaigns"
      }), "\n", createVNode(_components.li, {
        children: "Develop brand messaging guidelines"
      }), "\n", createVNode(_components.li, {
        children: "Write long-form content (blogs, articles, whitepapers)"
      }), "\n", createVNode(_components.li, {
        children: "Optimize content for SEO and engagement"
      }), "\n", createVNode(_components.li, {
        children: "Mentor junior copywriters"
      }), "\n", createVNode(_components.li, {
        children: "Collaborate with marketing and design teams"
      }), "\n", createVNode(_components.li, {
        children: "Contribute to content strategy development"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-need",
      children: "What You\u2019ll Need"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "2-4 years of experience in copywriting"
      }), "\n", createVNode(_components.li, {
        children: "Strong portfolio demonstrating versatile writing skills"
      }), "\n", createVNode(_components.li, {
        children: "Experience with various content types and channels"
      }), "\n", createVNode(_components.li, {
        children: "Strong understanding of marketing principles"
      }), "\n", createVNode(_components.li, {
        children: "Advanced SEO knowledge"
      }), "\n", createVNode(_components.li, {
        children: "Strong project management abilities"
      }), "\n", createVNode(_components.li, {
        children: "Experience with analytics and content performance"
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
const url = "src/content/docs/frameworks/job-descriptions/copywriter/copywriter-2/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/copywriter/copywriter-2/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/copywriter/copywriter-2/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

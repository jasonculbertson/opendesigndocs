import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_Cz1lq_8W.mjs';
import { $ as $$Image } from './_astro_assets_Dbp-32AF.mjs';
import 'clsx';

const frontmatter = {
  "title": "Lead Copywriter",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "lead-copywriter",
    "text": "Lead Copywriter"
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
      id: "lead-copywriter",
      children: "Lead Copywriter"
    }), "\n", createVNode(_components.h2, {
      id: "about-company-name",
      children: "About [Company Name]"
    }), "\n", createVNode(_components.p, {
      children: "Add a bit about your company here."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "As a Lead Copywriter at [Company Name], you will be responsible for leading our copywriting team and driving our overall content strategy. You\u2019ll manage a team of writers, collaborate with senior leadership, and ensure messaging excellence across all brand touchpoints."
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-do",
      children: "What You\u2019ll Do"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Lead and manage a team of copywriters"
      }), "\n", createVNode(_components.li, {
        children: "Set content vision and messaging strategy"
      }), "\n", createVNode(_components.li, {
        children: "Drive content excellence and process improvements"
      }), "\n", createVNode(_components.li, {
        children: "Partner with marketing and brand leadership"
      }), "\n", createVNode(_components.li, {
        children: "Define and track content quality metrics"
      }), "\n", createVNode(_components.li, {
        children: "Lead hiring and professional development"
      }), "\n", createVNode(_components.li, {
        children: "Manage content resources and budget"
      }), "\n", createVNode(_components.li, {
        children: "Drive content innovation and best practices"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-need",
      children: "What You\u2019ll Need"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "7+ years of experience in copywriting"
      }), "\n", createVNode(_components.li, {
        children: "2+ years of people management experience"
      }), "\n", createVNode(_components.li, {
        children: "Proven track record of building and leading content teams"
      }), "\n", createVNode(_components.li, {
        children: "Excellence in content strategy and brand messaging"
      }), "\n", createVNode(_components.li, {
        children: "Experience with content operations and process improvement"
      }), "\n", createVNode(_components.li, {
        children: "Strong leadership and communication skills"
      }), "\n", createVNode(_components.li, {
        children: "History of driving content innovation"
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
const url = "src/content/docs/frameworks/job-descriptions/copywriter/lead-copywriter/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/copywriter/lead-copywriter/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/copywriter/lead-copywriter/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

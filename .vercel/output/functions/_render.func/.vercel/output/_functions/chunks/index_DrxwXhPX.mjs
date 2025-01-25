import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_MZTBIW0G.mjs';
import { $ as $$Image } from './_astro_assets_C5-oC_0B.mjs';
import 'clsx';

const frontmatter = {
  "title": "Lead Designer",
  "date": "2024-01-01T00:00:00.000Z",
  "breadcrumbs": [{
    "text": "Recruiting Team",
    "href": "/docs/team/recruiting"
  }, {
    "text": "Job Descriptions",
    "href": "/docs/team/recruiting/job-descriptions-jds"
  }, {
    "text": "Content Designer",
    "href": "/docs/team/recruiting/job-descriptions-jds/content-designer"
  }]
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "lead-designer",
    "text": "Lead Designer"
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
      id: "lead-designer",
      children: "Lead Designer"
    }), "\n", createVNode(_components.h2, {
      id: "about-company-name",
      children: "About [Company Name]"
    }), "\n", createVNode(_components.p, {
      children: "Add a bit about your company here."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "As a Designer I at [Company Name], you will be responsible for creating clear, concise, and engaging content that enhances the user experience across our products and platforms. This entry-level position is ideal for someone who is passionate about writing, has a strong grasp of UX principles, and is eager to learn and grow in a collaborative environment."
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-do",
      children: "What You\u2019ll Do"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Write clear, concise, and user-friendly content for product interfaces"
      }), "\n", createVNode(_components.li, {
        children: "Collaborate with designers and product managers to ensure content meets user needs"
      }), "\n", createVNode(_components.li, {
        children: "Help maintain content style guides and documentation"
      }), "\n", createVNode(_components.li, {
        children: "Participate in user research to understand content effectiveness"
      }), "\n", createVNode(_components.li, {
        children: "Review and edit content for clarity, consistency, and brand voice"
      }), "\n", createVNode(_components.li, {
        children: "Support content strategy initiatives"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-need",
      children: "What You\u2019ll Need"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "0-2 years of experience in UX writing, content design, or related field"
      }), "\n", createVNode(_components.li, {
        children: "Strong writing and editing skills with attention to detail"
      }), "\n", createVNode(_components.li, {
        children: "Basic understanding of UX design principles"
      }), "\n", createVNode(_components.li, {
        children: "Ability to work collaboratively in a team environment"
      }), "\n", createVNode(_components.li, {
        children: "Experience with content management systems and design tools"
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
const url = "src/content/docs/team/recruiting/job-descriptions-jds/content-designer/lead-designer/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/content-designer/lead-designer/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/content-designer/lead-designer/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

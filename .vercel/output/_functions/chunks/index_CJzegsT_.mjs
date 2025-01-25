import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_Cz1lq_8W.mjs';
import { $ as $$Image } from './_astro_assets_Dbp-32AF.mjs';
import 'clsx';

const frontmatter = {
  "title": "Design Ops Manager II",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "design-ops-manager-ii",
    "text": "Design Ops Manager II"
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
      id: "design-ops-manager-ii",
      children: "Design Ops Manager II"
    }), "\n", createVNode(_components.h2, {
      id: "about-company-name",
      children: "About [Company Name]"
    }), "\n", createVNode(_components.p, {
      children: "Add a bit about your company here."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "As a Design Ops Manager II at [Company Name], you will play a key role in optimizing design workflows and processes. You\u2019ll work independently on operational initiatives while collaborating with design teams to improve efficiency and effectiveness."
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-do",
      children: "What You\u2019ll Do"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Implement and maintain design tools and processes"
      }), "\n", createVNode(_components.li, {
        children: "Develop and document operational workflows"
      }), "\n", createVNode(_components.li, {
        children: "Manage design resource allocation and planning"
      }), "\n", createVNode(_components.li, {
        children: "Lead design team onboarding programs"
      }), "\n", createVNode(_components.li, {
        children: "Create and maintain design documentation"
      }), "\n", createVNode(_components.li, {
        children: "Analyze and report on design team metrics"
      }), "\n", createVNode(_components.li, {
        children: "Coordinate cross-functional design initiatives"
      }), "\n", createVNode(_components.li, {
        children: "Support design system operations"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-need",
      children: "What You\u2019ll Need"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "2-4 years of experience in design operations or related field"
      }), "\n", createVNode(_components.li, {
        children: "Strong project management and process improvement skills"
      }), "\n", createVNode(_components.li, {
        children: "Experience with design tools and systems"
      }), "\n", createVNode(_components.li, {
        children: "Proven track record of improving team efficiency"
      }), "\n", createVNode(_components.li, {
        children: "Strong analytical and problem-solving abilities"
      }), "\n", createVNode(_components.li, {
        children: "Excellence in documentation and communication"
      }), "\n", createVNode(_components.li, {
        children: "Bachelor\u2019s degree in Design, Business, or related field (or equivalent experience)"
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
const url = "src/content/docs/frameworks/job-descriptions/design-ops/manager-2/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/design-ops/manager-2/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/design-ops/manager-2/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

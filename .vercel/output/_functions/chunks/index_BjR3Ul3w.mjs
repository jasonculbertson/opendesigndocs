import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_Cz1lq_8W.mjs';
import { $ as $$Image } from './_astro_assets_Dbp-32AF.mjs';
import 'clsx';

const frontmatter = {
  "title": "Design Ops Manager I",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "design-ops-manager-i",
    "text": "Design Ops Manager I"
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
      id: "design-ops-manager-i",
      children: "Design Ops Manager I"
    }), "\n", createVNode(_components.h2, {
      id: "about-company-name",
      children: "About [Company Name]"
    }), "\n", createVNode(_components.p, {
      children: "Add a bit about your company here."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "As a Design Ops Manager I at [Company Name], you will support the design organization by managing day-to-day operations, tools, and processes. This entry-level position is ideal for someone who is organized, detail-oriented, and passionate about improving design team efficiency."
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-do",
      children: "What You\u2019ll Do"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Manage design team tools and resources"
      }), "\n", createVNode(_components.li, {
        children: "Coordinate design team meetings and events"
      }), "\n", createVNode(_components.li, {
        children: "Maintain design documentation and asset libraries"
      }), "\n", createVNode(_components.li, {
        children: "Support onboarding of new design team members"
      }), "\n", createVNode(_components.li, {
        children: "Help track and report on design team metrics"
      }), "\n", createVNode(_components.li, {
        children: "Assist with design system maintenance"
      }), "\n", createVNode(_components.li, {
        children: "Support cross-functional collaboration"
      }), "\n", createVNode(_components.li, {
        children: "Help organize design critiques and reviews"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-need",
      children: "What You\u2019ll Need"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "0-2 years of experience in design operations or related field"
      }), "\n", createVNode(_components.li, {
        children: "Strong organizational and project management skills"
      }), "\n", createVNode(_components.li, {
        children: "Familiarity with design tools and processes"
      }), "\n", createVNode(_components.li, {
        children: "Excellent communication and documentation abilities"
      }), "\n", createVNode(_components.li, {
        children: "Basic understanding of design workflows"
      }), "\n", createVNode(_components.li, {
        children: "Experience with productivity and collaboration tools"
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
const url = "src/content/docs/frameworks/job-descriptions/design-ops/manager-1/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/design-ops/manager-1/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/design-ops/manager-1/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_Cz1lq_8W.mjs';
import { $ as $$Image } from './_astro_assets_Dbp-32AF.mjs';
import 'clsx';

const frontmatter = {
  "title": "Lead Design Ops Manager",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "lead-design-ops-manager",
    "text": "Lead Design Ops Manager"
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
      id: "lead-design-ops-manager",
      children: "Lead Design Ops Manager"
    }), "\n", createVNode(_components.h2, {
      id: "about-company-name",
      children: "About [Company Name]"
    }), "\n", createVNode(_components.p, {
      children: "Add a bit about your company here."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "As a Lead Design Ops Manager professional at [Company Name], you will be responsible for leading our design operations team and driving our overall operational strategy. You\u2019ll manage a team of Design Ops professionals, collaborate with senior leadership, and ensure operational excellence across the design organization."
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-do",
      children: "What You\u2019ll Do"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Lead and manage a team of Design Ops professionals"
      }), "\n", createVNode(_components.li, {
        children: "Set operational vision and strategy aligned with design goals"
      }), "\n", createVNode(_components.li, {
        children: "Drive operational excellence and process improvements"
      }), "\n", createVNode(_components.li, {
        children: "Partner with design and product leadership"
      }), "\n", createVNode(_components.li, {
        children: "Define and track operational success metrics"
      }), "\n", createVNode(_components.li, {
        children: "Lead hiring and professional development for the Design Ops team"
      }), "\n", createVNode(_components.li, {
        children: "Manage budget and resource allocation"
      }), "\n", createVNode(_components.li, {
        children: "Drive operational innovation and best practices"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-need",
      children: "What You\u2019ll Need"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "7+ years of experience in design operations or related field"
      }), "\n", createVNode(_components.li, {
        children: "2+ years of people management experience"
      }), "\n", createVNode(_components.li, {
        children: "Proven track record of building and leading successful operations teams"
      }), "\n", createVNode(_components.li, {
        children: "Deep expertise in design tools and processes"
      }), "\n", createVNode(_components.li, {
        children: "Experience with budget management and vendor relations"
      }), "\n", createVNode(_components.li, {
        children: "Strong leadership and communication skills"
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
const url = "src/content/docs/frameworks/job-descriptions/design-ops/lead-manager/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/design-ops/lead-manager/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/design-ops/lead-manager/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

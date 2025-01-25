import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_MZTBIW0G.mjs';
import { $ as $$Image } from './_astro_assets_C5-oC_0B.mjs';
import 'clsx';

const frontmatter = {
  "title": "Staff Design Ops Manager",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "staff-design-ops-manager",
    "text": "Staff Design Ops Manager"
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
      id: "staff-design-ops-manager",
      children: "Staff Design Ops Manager"
    }), "\n", createVNode(_components.h2, {
      id: "about-company-name",
      children: "About [Company Name]"
    }), "\n", createVNode(_components.p, {
      children: "Add a bit about your company here."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "As a Staff Design Ops Manager professional at [Company Name], you will be a principal technical leader in design operations, driving operational strategy and innovation across the organization. You\u2019ll tackle our most complex operational challenges, lead cross-functional initiatives, and help shape the future of our design operations practice."
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-do",
      children: "What You\u2019ll Do"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Drive operational strategy and innovation across multiple design teams"
      }), "\n", createVNode(_components.li, {
        children: "Lead complex, multi-team operational initiatives"
      }), "\n", createVNode(_components.li, {
        children: "Develop advanced operational frameworks and methodologies"
      }), "\n", createVNode(_components.li, {
        children: "Provide technical leadership and mentorship across Design Ops teams"
      }), "\n", createVNode(_components.li, {
        children: "Partner with senior leadership on strategic decisions"
      }), "\n", createVNode(_components.li, {
        children: "Lead experimentation in operational practices"
      }), "\n", createVNode(_components.li, {
        children: "Drive organizational change through operational excellence"
      }), "\n", createVNode(_components.li, {
        children: "Contribute to industry thought leadership"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-need",
      children: "What You\u2019ll Need"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "8+ years of experience in design operations or related field"
      }), "\n", createVNode(_components.li, {
        children: "Proven track record of leading complex operational initiatives"
      }), "\n", createVNode(_components.li, {
        children: "Deep expertise in design operations and process improvement"
      }), "\n", createVNode(_components.li, {
        children: "Experience leading and influencing at the organizational level"
      }), "\n", createVNode(_components.li, {
        children: "Strong technical leadership and mentorship abilities"
      }), "\n", createVNode(_components.li, {
        children: "History of driving innovation in operational practices"
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
const url = "src/content/docs/frameworks/job-descriptions/design-ops/staff-manager/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/design-ops/staff-manager/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/design-ops/staff-manager/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

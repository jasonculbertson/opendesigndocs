import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_MZTBIW0G.mjs';
import { $ as $$Image } from './_astro_assets_CmUtqGhC.mjs';
import 'clsx';

const frontmatter = {
  "title": "Sr. Designer",
  "date": "2024-01-01T00:00:00.000Z",
  "breadcrumbs": [{
    "text": "Recruiting Team",
    "href": "/docs/team/recruiting"
  }, {
    "text": "Job Descriptions",
    "href": "/docs/team/recruiting/job-descriptions-jds"
  }, {
    "text": "Product Designer",
    "href": "/docs/team/recruiting/job-descriptions-jds/product-designer"
  }]
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "sr-designer",
    "text": "Sr. Designer"
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
      id: "sr-designer",
      children: "Sr. Designer"
    }), "\n", createVNode(_components.h2, {
      id: "about-company-name",
      children: "About [Company Name]"
    }), "\n", createVNode(_components.p, {
      children: "Add a bit about your company here."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "As a Designer I at [Company Name], you will be responsible for creating intuitive and engaging user experiences for our products. This entry-level position is designed for individuals who are passionate about design, eager to learn, and ready to contribute to our dynamic team."
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-do",
      children: "What You\u2019ll Do"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Create user flows, wireframes, and high-fidelity designs"
      }), "\n", createVNode(_components.li, {
        children: "Participate in user research and usability testing"
      }), "\n", createVNode(_components.li, {
        children: "Collaborate with product managers and engineers"
      }), "\n", createVNode(_components.li, {
        children: "Contribute to our design system"
      }), "\n", createVNode(_components.li, {
        children: "Present design work and incorporate feedback"
      }), "\n", createVNode(_components.li, {
        children: "Support design documentation efforts"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-need",
      children: "What You\u2019ll Need"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "0-2 years of experience in UX/UI design"
      }), "\n", createVNode(_components.li, {
        children: "Strong portfolio demonstrating user-centered design thinking"
      }), "\n", createVNode(_components.li, {
        children: "Proficiency in design tools (Figma, Sketch, etc.)"
      }), "\n", createVNode(_components.li, {
        children: "Basic understanding of user research methods"
      }), "\n", createVNode(_components.li, {
        children: "Strong communication and collaboration skills"
      }), "\n", createVNode(_components.li, {
        children: "Bachelor\u2019s degree in Design, HCI, or related field (or equivalent experience)"
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
const url = "src/content/docs/team/recruiting/job-descriptions-jds/product-designer/senior-designer/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/product-designer/senior-designer/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/product-designer/senior-designer/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

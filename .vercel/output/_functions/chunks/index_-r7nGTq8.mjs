import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_Cz1lq_8W.mjs';
import { $ as $$Image } from './_astro_assets_Dbp-32AF.mjs';
import 'clsx';

const frontmatter = {
  "title": "Principal Designer",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "principal-designer",
    "text": "Principal Designer"
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
      id: "principal-designer",
      children: "Principal Designer"
    }), "\n", createVNode(_components.h2, {
      id: "about-company-name",
      children: "About [Company Name]"
    }), "\n", createVNode(_components.p, {
      children: "Add a bit about your company here."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "As a Principal Designer at [Company Name], you will be the highest level of individual contributor in our design organization, responsible for setting the vision and direction for visual design across the company. You\u2019ll drive innovation, shape brand strategy, and be a recognized thought leader in the design community."
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-do",
      children: "What You\u2019ll Do"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Set the long-term vision for visual design across the organization"
      }), "\n", createVNode(_components.li, {
        children: "Drive design innovation that influences the industry"
      }), "\n", createVNode(_components.li, {
        children: "Lead strategic initiatives that impact brand perception"
      }), "\n", createVNode(_components.li, {
        children: "Provide executive-level guidance on design strategy"
      }), "\n", createVNode(_components.li, {
        children: "Mentor and develop senior design leaders"
      }), "\n", createVNode(_components.li, {
        children: "Drive organizational transformation through design"
      }), "\n", createVNode(_components.li, {
        children: "Represent [Company Name] in industry events"
      }), "\n", createVNode(_components.li, {
        children: "Shape the future of visual design in the industry"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-need",
      children: "What You\u2019ll Need"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "10+ years of experience in graphic design"
      }), "\n", createVNode(_components.li, {
        children: "Recognized thought leadership in visual design"
      }), "\n", createVNode(_components.li, {
        children: "Track record of driving industry-leading design innovation"
      }), "\n", createVNode(_components.li, {
        children: "Experience influencing executive-level decisions"
      }), "\n", createVNode(_components.li, {
        children: "History of building and scaling design organizations"
      }), "\n", createVNode(_components.li, {
        children: "Deep expertise in all aspects of visual design"
      }), "\n", createVNode(_components.li, {
        children: "Strong strategic planning and execution abilities"
      }), "\n", createVNode(_components.li, {
        children: "Bachelor\u2019s degree in Graphic Design or related field (or equivalent experience)"
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
const url = "src/content/docs/frameworks/job-descriptions/graphic-designer/principal-designer/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/graphic-designer/principal-designer/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/graphic-designer/principal-designer/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

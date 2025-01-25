import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_MZTBIW0G.mjs';
import { $ as $$Image } from './_astro_assets_C5-oC_0B.mjs';
import 'clsx';

const frontmatter = {
  "title": "Senior Researcher",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "senior-researcher",
    "text": "Senior Researcher"
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
      id: "senior-researcher",
      children: "Senior Researcher"
    }), "\n", createVNode(_components.h2, {
      id: "about-company-name",
      children: "About [Company Name]"
    }), "\n", createVNode(_components.p, {
      children: "Add a bit about your company here."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "As a Senior Researcher at [Company Name], you will be a key leader in shaping our research strategy and practice. You\u2019ll drive major research initiatives, mentor junior researchers, and work closely with product leadership to ensure research insights drive product decisions."
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-do",
      children: "What You\u2019ll Do"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Lead research strategy for major product initiatives"
      }), "\n", createVNode(_components.li, {
        children: "Design and execute complex research studies"
      }), "\n", createVNode(_components.li, {
        children: "Develop and document research methodologies"
      }), "\n", createVNode(_components.li, {
        children: "Mentor and provide guidance to junior researchers"
      }), "\n", createVNode(_components.li, {
        children: "Drive improvements to our research practice"
      }), "\n", createVNode(_components.li, {
        children: "Collaborate with product and design leadership"
      }), "\n", createVNode(_components.li, {
        children: "Advocate for research best practices"
      }), "\n", createVNode(_components.li, {
        children: "Contribute to hiring and team growth"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-need",
      children: "What You\u2019ll Need"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "5+ years of experience in UX research"
      }), "\n", createVNode(_components.li, {
        children: "Proven track record of leading successful research initiatives"
      }), "\n", createVNode(_components.li, {
        children: "Deep expertise in multiple research methodologies"
      }), "\n", createVNode(_components.li, {
        children: "Experience mentoring junior researchers"
      }), "\n", createVNode(_components.li, {
        children: "Strong project management and communication skills"
      }), "\n", createVNode(_components.li, {
        children: "History of influencing product strategy through research"
      }), "\n", createVNode(_components.li, {
        children: "Advanced data analysis and synthesis skills"
      }), "\n", createVNode(_components.li, {
        children: "Bachelor\u2019s degree in HCI, Psychology, or related field (or equivalent experience)"
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
const url = "src/content/docs/frameworks/job-descriptions/ux-researcher/senior-researcher/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/ux-researcher/senior-researcher/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/ux-researcher/senior-researcher/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

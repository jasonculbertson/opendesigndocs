import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_Cz1lq_8W.mjs';
import { $ as $$Image } from './_astro_assets_Dbp-32AF.mjs';
import 'clsx';

const frontmatter = {
  "title": "Researcher II",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "researcher-ii",
    "text": "Researcher II"
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
      id: "researcher-ii",
      children: "Researcher II"
    }), "\n", createVNode(_components.h2, {
      id: "about-company-name",
      children: "About [Company Name]"
    }), "\n", createVNode(_components.p, {
      children: "Add a bit about your company here."
    }), "\n", createVNode(_components.h2, {
      id: "role-overview",
      children: "Role Overview"
    }), "\n", createVNode(_components.p, {
      children: "As a Researcher II at [Company Name], you will independently plan and execute research studies that inform product decisions. You\u2019ll work closely with product teams to identify research needs and translate findings into actionable insights."
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-do",
      children: "What You\u2019ll Do"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Plan and conduct various types of user research studies"
      }), "\n", createVNode(_components.li, {
        children: "Lead research sessions and moderate user interviews"
      }), "\n", createVNode(_components.li, {
        children: "Analyze complex data sets and synthesize findings"
      }), "\n", createVNode(_components.li, {
        children: "Create comprehensive research reports and presentations"
      }), "\n", createVNode(_components.li, {
        children: "Develop research protocols and methodologies"
      }), "\n", createVNode(_components.li, {
        children: "Mentor junior researchers"
      }), "\n", createVNode(_components.li, {
        children: "Collaborate with cross-functional teams"
      }), "\n", createVNode(_components.li, {
        children: "Contribute to research best practices"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-need",
      children: "What You\u2019ll Need"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "2-4 years of experience in UX research"
      }), "\n", createVNode(_components.li, {
        children: "Strong expertise in qualitative and quantitative research methods"
      }), "\n", createVNode(_components.li, {
        children: "Experience with research tools and analysis software"
      }), "\n", createVNode(_components.li, {
        children: "Excellent data analysis and synthesis skills"
      }), "\n", createVNode(_components.li, {
        children: "Strong project management abilities"
      }), "\n", createVNode(_components.li, {
        children: "Proven track record of impacting product decisions through research"
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
const url = "src/content/docs/frameworks/job-descriptions/ux-researcher/researcher-2/index.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/ux-researcher/researcher-2/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/frameworks/job-descriptions/ux-researcher/researcher-2/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

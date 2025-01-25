import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_MZTBIW0G.mjs';
import { $ as $$Image } from './_astro_assets_CmUtqGhC.mjs';
import 'clsx';

const frontmatter = {
  "title": "Getting to Know You",
  "description": "Build rapport with your team through structured 1:1s",
  "author": "OpenDesign Team",
  "date": "2024-03-20T00:00:00.000Z",
  "category": "Leadership",
  "tags": ["1:1s", "team-building", "management"]
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "getting-to-know-you",
    "text": "Getting to Know You"
  }, {
    "depth": 2,
    "slug": "personal-goals--values",
    "text": "Personal Goals & Values"
  }, {
    "depth": 2,
    "slug": "work-preferences--motivation",
    "text": "Work Preferences & Motivation"
  }, {
    "depth": 2,
    "slug": "career-development",
    "text": "Career Development"
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
      id: "getting-to-know-you",
      children: "Getting to Know You"
    }), "\n", createVNode("div", {
      class: "gradient-panel",
      children: [createVNode("p", {
        class: "text-[17px] leading-7 text-[#1a1f36]",
        children: createVNode(_components.p, {
          children: "Within the first couple of weeks, I do 1:1s with each team member to learn about them. I follow this Q&A document and save it to refer to later."
        })
      }), createVNode("p", {
        class: "text-[17px] leading-7 text-[#1a1f36]",
        children: createVNode(_components.p, {
          children: "These are a list of questions that I ask each designer on the team in order to learn more about them as well as understand how I can best support them. I typically go over these questions within the first few 1:1s."
        })
      })]
    }), "\n", createVNode(_components.h2, {
      id: "personal-goals--values",
      children: "Personal Goals & Values"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "What is most important to you in life? (what are your personal priorities)"
      }), "\n", createVNode(_components.li, {
        children: "What kind of person do you aspire to become?"
      }), "\n", createVNode(_components.li, {
        children: "What are your career goals and aspirations?"
      }), "\n", createVNode(_components.li, {
        children: "Are you satisfied with your current career position? Why or why not?"
      }), "\n", createVNode(_components.li, {
        children: "How do you feel about your current career path and trajectory?"
      }), "\n", createVNode(_components.li, {
        children: "What generally motivates you?"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "work-preferences--motivation",
      children: "Work Preferences & Motivation"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "What keeps you engaged and motivated at work?"
      }), "\n", createVNode(_components.li, {
        children: "When have you felt the most inspired at work? Why?"
      }), "\n", createVNode(_components.li, {
        children: "When did you produce your best work? What contributed to that?"
      }), "\n", createVNode(_components.li, {
        children: "What are your unique qualities?"
      }), "\n", createVNode(_components.li, {
        children: "What are your strengths?"
      }), "\n", createVNode(_components.li, {
        children: "Which skills would you like to develop further?"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "career-development",
      children: "Career Development"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "What have you enjoyed the most about your previous roles or companies?"
      }), "\n", createVNode(_components.li, {
        children: "How would you describe your ideal position, and why?"
      }), "\n", createVNode(_components.li, {
        children: "What do you need to be successful in your role?"
      }), "\n", createVNode(_components.li, {
        children: "How would you describe your ideal work environment, and why?"
      }), "\n", createVNode(_components.li, {
        children: "What worked well and what didn\u2019t with your previous manager?"
      }), "\n", createVNode(_components.li, {
        children: "What type of feedback do you prefer?"
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
const url = "src/content/docs/leadership/week-1-2/getting-to-know-you.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/leadership/week-1-2/getting-to-know-you.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/leadership/week-1-2/getting-to-know-you.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

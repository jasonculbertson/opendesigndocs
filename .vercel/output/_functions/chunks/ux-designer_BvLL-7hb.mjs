import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_Cz1lq_8W.mjs';
import { $ as $$Image } from './_astro_assets_Dbp-32AF.mjs';
import 'clsx';

const frontmatter = {
  "title": "Product Designer",
  "date": "2024-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "product-designer",
    "text": "Product Designer"
  }, {
    "depth": 2,
    "slug": "about-the-role",
    "text": "About the Role"
  }, {
    "depth": 2,
    "slug": "key-responsibilities",
    "text": "Key Responsibilities"
  }, {
    "depth": 2,
    "slug": "requirements",
    "text": "Requirements"
  }, {
    "depth": 2,
    "slug": "preferred-qualifications",
    "text": "Preferred Qualifications"
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
      id: "product-designer",
      children: "Product Designer"
    }), "\n", createVNode(_components.p, {
      children: "We are seeking a talented UX Designer to join our team and help create exceptional user experiences for our products. As a Product Designer, you will work closely with product managers, engineers, and other designers to deliver intuitive and engaging solutions that meet user needs and business goals."
    }), "\n", createVNode(_components.h2, {
      id: "about-the-role",
      children: "About the Role"
    }), "\n", createVNode(_components.p, {
      children: "You will be responsible for driving the user experience of our products from conception to launch. Working with cross-functional teams, you\u2019ll help define product strategy, conduct user research, create wireframes and prototypes, and deliver high-fidelity designs."
    }), "\n", createVNode(_components.h2, {
      id: "key-responsibilities",
      children: "Key Responsibilities"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Lead the Product design process for assigned projects, from research and conceptualization through implementation"
      }), "\n", createVNode(_components.li, {
        children: "Create user flows, wireframes, prototypes, and high-fidelity designs"
      }), "\n", createVNode(_components.li, {
        children: "Conduct user research and usability testing to inform design decisions"
      }), "\n", createVNode(_components.li, {
        children: "Collaborate with product managers to define requirements and success metrics"
      }), "\n", createVNode(_components.li, {
        children: "Work closely with engineers to ensure high-quality implementation"
      }), "\n", createVNode(_components.li, {
        children: "Present design work to stakeholders and incorporate feedback"
      }), "\n", createVNode(_components.li, {
        children: "Help maintain and evolve our design system"
      }), "\n", createVNode(_components.li, {
        children: "Mentor junior designers and contribute to team growth"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "requirements",
      children: "Requirements"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "5+ years of experience in Product design"
      }), "\n", createVNode(_components.li, {
        children: "Strong portfolio demonstrating end-to-end design process"
      }), "\n", createVNode(_components.li, {
        children: "Experience with modern design tools (Figma, Sketch, etc.)"
      }), "\n", createVNode(_components.li, {
        children: "Excellent communication and presentation skills"
      }), "\n", createVNode(_components.li, {
        children: "Experience conducting user research and usability testing"
      }), "\n", createVNode(_components.li, {
        children: "Understanding of web and mobile design principles"
      }), "\n", createVNode(_components.li, {
        children: "Ability to work effectively in a fast-paced environment"
      }), "\n", createVNode(_components.li, {
        children: "Bachelor\u2019s degree in Design, HCI, or related field (or equivalent experience)"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "preferred-qualifications",
      children: "Preferred Qualifications"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Experience in B2B or enterprise software"
      }), "\n", createVNode(_components.li, {
        children: "Knowledge of HTML, CSS, and basic front-end development"
      }), "\n", createVNode(_components.li, {
        children: "Experience with design systems"
      }), "\n", createVNode(_components.li, {
        children: "Background in service design or systems thinking"
      }), "\n", createVNode(_components.li, {
        children: "Experience mentoring other designers"
      }), "\n", createVNode(_components.li, {
        children: "Contributions to design community through writing or speaking"
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
const url = "src/content/docs/team/recruiting/job-descriptions-jds/ux-designer.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/ux-designer.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/ux-designer.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

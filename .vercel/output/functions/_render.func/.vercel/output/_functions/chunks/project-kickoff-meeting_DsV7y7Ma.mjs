import { _ as __astro_tag_component__, F as Fragment, f as createVNode } from './astro/server_MZTBIW0G.mjs';
import { $ as $$Image } from './_astro_assets_CmUtqGhC.mjs';
import 'clsx';

const frontmatter = {
  "title": "Project Kickoff Meeting",
  "description": "Ensure all stakeholders are aligned from the start",
  "author": "OpenDesign Team",
  "date": "2024-03-20T00:00:00.000Z",
  "category": "Product",
  "tags": ["meetings", "project-management", "collaboration"]
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "project-kickoff-meeting",
    "text": "Project Kickoff Meeting"
  }, {
    "depth": 2,
    "slug": "meeting-structure",
    "text": "Meeting Structure"
  }, {
    "depth": 2,
    "slug": "make-time-for-questions",
    "text": "Make time for questions"
  }, {
    "depth": 2,
    "slug": "after-the-kickoff-meeting",
    "text": "After the kickoff meeting"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    h2: "h2",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "project-kickoff-meeting",
      children: "Project Kickoff Meeting"
    }), "\n", createVNode("div", {
      class: "gradient-panel",
      children: createVNode("p", {
        class: "text-[17px] leading-7 text-[#1a1f36]",
        children: createVNode(_components.p, {
          children: ["The kickoff meeting sets the foundation for project success by aligning all stakeholders on goals, expectations, and approach. Prior to the kickoff, make sure you have created a ", createVNode("a", {
            href: "/docs/team/product/one-pagers",
            children: "one pager"
          }), "."]
        })
      })
    }), "\n", createVNode(_components.h2, {
      id: "meeting-structure",
      children: "Meeting Structure"
    }), "\n", createVNode(_components.p, {
      children: "When you host a kickoff meeting, you\u2019ll outline your project purpose, goals, plan, and more\u2014while also making time for team members to ask questions and clarify any next steps. At the end of a kickoff meeting, the entire team should have a shared understanding about what you\u2019re working on, why, and how the work will be accomplished."
    }), "\n", createVNode(_components.h2, {
      id: "make-time-for-questions",
      children: "Make time for questions"
    }), "\n", createVNode(_components.p, {
      children: "After the kickoff, your project team may have questions about something you presented, like the scope of the project or certain task expectations. Make sure to leave plenty of time at the end of the kickoff meeting to answer any questions. Remember: the goal of the project kickoff is for everyone to leave the meeting on the same page and ready to get started."
    }), "\n", createVNode(_components.h2, {
      id: "after-the-kickoff-meeting",
      children: "After the kickoff meeting"
    }), "\n", createVNode(_components.p, {
      children: "Once the project kickoff meeting has completed, the best way to maintain alignment and clarity after your project kickoff is to maintain a central source of truth and collaboration. The project spec should be the singular document in Notion that is maintained as the source of truth for the project. In addition, Jira should be used as the project management tool used for work, status updates, and messages."
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
const url = "src/content/docs/team/product/project-kickoff-meeting.mdx";
const file = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/product/project-kickoff-meeting.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/product/project-kickoff-meeting.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

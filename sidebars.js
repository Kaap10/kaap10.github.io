// @ts-check

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Core Python',
      collapsed: false,
      items: ['core-python'],
    },
    {
      type: 'category',
      label: 'Flask',
      collapsed: false,
      items: ['Development/Python Full Stack/Flask'],
    },
  ],
};

export default sidebars;

// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Vardhman's Wiki",
  tagline: 'My personal knowledge base',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://kaap10.github.io',
  baseUrl: '/',

  organizationName: 'kaap10',
  projectName: 'kaap10.github.io',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/notes',   // 👈 notes available at /notes
          editUrl: 'https://github.com/kaap10/kaap10.github.io/tree/main/',
        },
        blog: false,            // 👈 blog disable, wiki pe focus
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,  // 👈 dark/light auto
      },
      navbar: {
        title: "Vardhman's Wiki",
        logo: {
          alt: 'Vardhman Profile',
          src: 'img/profile-logo.png',
        },
        items: [
          {
            to: '/notes/About Me',
            position: 'left',
            label: 'About Me',
          },
          {
            to: '/notes/intro',
            position: 'left',
            label: 'Notes',
          },
          {
            href: 'https://github.com/kaap10',
            label: 'GitHub',
            position: 'right',
          },          {
            href: 'http://www.linkedin.com/in/vardhman-gupta',
            label: 'LinkedIn',
            position: 'right',
          },
          {
            href: 'https://leetcode.com/Kap10/',
            label: 'LeetCode',
            position: 'right',
          },        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Vardhman. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
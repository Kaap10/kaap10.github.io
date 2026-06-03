// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VG / Wiki',
  tagline: 'Notes on engineering & systems',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
    // Rspack dev + CSS HMR can panic on Windows (cssExtractHmr module graph).
    // Keep Webpack for dev/build; other faster.* flags still follow v4 defaults.
    faster: {
      rspackBundler: false,
      rspackPersistentCache: false,
    },
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    },
  ],

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
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/notes',
          editUrl: 'https://github.com/kaap10/kaap10.github.io/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: false,
        disableSwitch: false,
      },
      navbar: {
        hideOnScroll: false,
        items: [
          { to: '/', label: 'VG', position: 'left' },
          { to: '/notes/intro', label: 'Notes', position: 'left' },
          { to: '/notes/About Me', label: 'About', position: 'left' },
          { href: 'https://github.com/kaap10', label: 'GitHub', position: 'right' },
          {
            href: 'https://linkedin.com/in/vardhman-gupta',
            label: 'LinkedIn',
            position: 'right',
          },
          {
            href: 'https://leetcode.com/Kap10/',
            label: 'LeetCode',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        copyright: 'kaap10 — built with Docusaurus',
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
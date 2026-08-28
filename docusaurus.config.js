// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Vardhman Gupta',
  tagline: 'AI/ML, full-stack systems, and technical blogs',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
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
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
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
  onBrokenAnchors: 'warn',

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
          routeBasePath: '/blogs',
          editUrl: 'https://github.com/kaap10/kaap10.github.io/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    function excalidrawWebpackOverridePlugin() {
      return {
        name: 'excalidraw-webpack-override',
        configureWebpack() {
          return {
            module: {
              rules: [
                {
                  test: /\.m?js$/,
                  resolve: {
                    fullySpecified: false,
                  },
                },
              ],
            },
          };
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
        disableSwitch: false,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      algolia: {
        appId: 'UDQRCP1VN5',
        apiKey: '7ddec2e0a469b9f55b21e649b0f676ee',
        indexName: 'my_wiki_index',
        contextualSearch: true,
        replaceSearchResultPathname: {
          from: /\/(?:notes|docs)\//,
          to: '/blogs/',
        },
      },
      navbar: {
        title: 'Vardhman Gupta',
        hideOnScroll: false,
        items: [
          { to: '/blogs/intro', label: 'Blogs', position: 'left' },
          { to: '/board', label: 'Board', position: 'left' },
          { type: 'search', position: 'right' },
          {
            href: 'https://github.com/kaap10',
            position: 'right',
            html: '<svg viewBox="0 0 24 24" width="19" height="19" style="fill: currentColor;"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>',
            'aria-label': 'GitHub repository',
          },
          {
            href: 'https://linkedin.com/in/vardhman-gupta',
            position: 'right',
            html: '<svg viewBox="0 0 24 24" width="19" height="19" style="fill: currentColor;"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>',
            'aria-label': 'LinkedIn profile',
          },
          {
            href: 'https://leetcode.com/u/kap10/',
            position: 'right',
            html: '<img src="/img/leetcode.png" width="19" height="19" alt="LeetCode" style="display: inline-block; vertical-align: middle; object-fit: contain;" />',
            'aria-label': 'LeetCode profile',
          },
          {
            href: 'https://medium.com/@kap10',
            position: 'right',
            html: '<img src="/img/medium.png" width="19" height="19" alt="Medium" style="display: inline-block; vertical-align: middle; object-fit: contain; border-radius: 4px;" />',
            'aria-label': 'Medium profile',
          },
        ],
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

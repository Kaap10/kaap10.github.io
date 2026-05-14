# VG / Wiki

A polished editorial knowledge base built with Docusaurus 3, optimized for technical notes, system design, algorithms, and software engineering concepts.

## Project Summary

This site is designed to present a curated collection of technical notes in a clean, distraction-free format. The homepage and documentation styling use a refined editorial minimalism approach with sharp typography, subtle borders, and clear content hierarchy.

## Tech Stack

- **Docusaurus 3** - static documentation site generator
- **React 18** - UI framework
- **Google Fonts** - Instrument Serif and DM Mono
- **GitHub Pages** - hosting
- **npm** - dependency management

## Main Features

- Minimal editorial design with light and dark mode support
- Structured docs categories for DSA, System Design, AI/ML, Development, Core Subjects, and B.Tech Subjects
- Simple top navigation and focused landing page
- Sharp borders and clean typography with no gradients
- Documentation pages styled for readability and technical reference

## Project Structure

```
├── docs/                         # Markdown documentation
│   ├── AIML/
│   ├── DSA/
│   ├── Development/
│   ├── System Design/
│   ├── Core Subjects/
│   └── B.Tech Subjects/
├── src/
│   ├── css/
│   │   └── custom.css           # Global styling
│   ├── pages/
│   │   ├── index.js              # Homepage
│   │   └── index.module.css      # Homepage styles
├── docusaurus.config.js          # Site configuration
├── sidebars.js                   # Sidebar structure
├── package.json                  # Scripts and dependencies
└── README.md                     # Project documentation
```

## Quick Start

```bash
npm install
npm start
```

Open `http://localhost:3000` to preview the site locally.

## Build & Deploy

```bash
npm run build
npm run deploy
```

## Notes

- The homepage is fully rebuilt in `src/pages/index.js` with custom editorial layout.
- Global theme and site styling are managed in `src/css/custom.css`.
- The site uses no strong color accents, no gradients, and only subtle borders for separators.

## GitHub Pages

The project deploys to GitHub Pages from the `gh-pages` branch. Pushes to `main` trigger the deployment workflow when configured.

## Contact

- GitHub: https://github.com/kaap10
- Live site: https://kaap10.github.io
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

# Vardhman Gupta — Personal Portfolio & Technical Blog

[![Live Site](https://img.shields.io/badge/Live-kaap10.github.io-FF4D4F?style=flat&logo=github)](https://kaap10.github.io/)

A personal portfolio and technical knowledge base built with [Docusaurus v3](https://docusaurus.io/). Features a clean editorial design, an interactive whiteboard, and curated technical blogs.

## 🌐 Live Site

**https://kaap10.github.io/**

## ✨ Features

- **Home Page** — Editorial portfolio with projects, technical toolkit, and blog links
- **Blogs** (`/blogs`) — Technical documentation and notes (Flask, backend architecture)
- **Board** (`/board`) — Interactive whiteboard powered by [Excalidraw](https://excalidraw.com/), with localStorage persistence
- **Floating Navbar** — Cylindrical pill-style nav on home/board; classic full-width header on blogs
- **Dark/Light Theme** — Custom dark-first design system with Geist + JetBrains Mono typography
- **Algolia Search** — Full-text search across all blog content

## 🛠️ Tech Stack

- [Docusaurus v3.10.1](https://docusaurus.io/)
- React 19
- Excalidraw (board feature)
- Algolia DocSearch
- GitHub Pages (deployment via GitHub Actions)

## 🚀 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run start -- --no-open

# Build for production
npm run build

# Serve production build locally
npm run serve
```

## 📁 Project Structure

```
my-wiki/
├── docs/                         # Blog content (Docusaurus docs)
│   └── Development/
│       └── Python Full Stack/
│           └── Flask.md          # Flask & Backend Architecture
├── src/
│   ├── components/
│   │   └── ExcalidrawBoard/      # Interactive whiteboard component
│   ├── css/
│   │   └── custom.css            # Global design system & theme
│   ├── pages/
│   │   ├── index.js              # Home page
│   │   ├── index.module.css      # Home page styles
│   │   └── board.js              # Whiteboard page
│   └── theme/
│       └── Root.js               # Docusaurus root wrapper
├── static/
│   ├── img/                      # Favicons, social icons
│   └── Vardhman_Gupta (Resume).pdf
├── docusaurus.config.js
├── sidebars.js
└── package.json
```

## 🚢 Deployment

Automatically deployed to GitHub Pages via GitHub Actions on every push to `main`.

See [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

---

Built by [Vardhman Gupta](https://kaap10.github.io/) · [GitHub](https://github.com/kaap10) · [LinkedIn](https://linkedin.com/in/vardhman-gupta)

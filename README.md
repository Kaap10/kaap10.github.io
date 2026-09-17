# Vardhman Gupta | Portfolio

> A high-performance personal developer workstation, technical wiki, and engineering portfolio built with Docusaurus, React, and Supabase.

[![Live Site](https://img.shields.io/badge/Live_Site-kaap10.github.io-FF4D4F?style=flat-square&logo=googlechrome&logoColor=white)](https://kaap10.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

---

## Overview

This repository powers **[kaap10.github.io](https://kaap10.github.io)** — an integrated developer ecosystem combining portfolio showcase, technical documentation, and full-stack productivity tools:

- **Workstation Terminal (`/`)**: Interactive Unix-like CLI shell with GPU particle background, tab autocompletion, and 35+ commands.
- **Engineering Portfolio (`/portfolio`)**: Minimalist bio, credentials, and career showcase with instant `Ctrl+K` discovery.
- **Developer Workspace (`/workspace`)**: Central hub connecting all development tools and productivity suites:
  - **Architecture Whiteboard (`/board`)**: Infinite vector diagramming canvas powered by Excalidraw with cloud sync.
  - **Productivity Tracker (`/tracker`)**: Cloud-synchronized task board, goals & nested milestones, daily habits matrix, and focus timer.
  - **Developer Notebook (`/notebook`)**: Private distraction-free Markdown notepad with multi-column stacks, auto-save, and scoped fullscreen mode.
  - **Quick Scratchpad (`Ctrl+J`)**: Floating slide-over Markdown drawer.
- **Projects Matrix (`/projects`)**: Production systems and repositories catalog spanning AI agents, distributed systems, and tools.
- **Open Source Hub (`/opensource`)**: Telemetry and guides for packages like `build-with-ai` and `dynavec`.
- **Engineering Blogs (`/blogs`)**: Computer Science, System Design, and Backend Engineering knowledge base.

---

## Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, Docusaurus 3.10, Webpack 5 |
| **Styling & Icons** | CSS Modules, Dark Theme Design System, Lucide Icons |
| **Backend & Cloud DB** | Supabase (PostgreSQL 15, Auth, Row-Level Security) |
| **Canvas & Visuals** | Excalidraw, HTML5 Canvas 2D Particles |
| **Search & Markdown** | MDX v3, Prism React Renderer, Algolia DocSearch |

---

## Keyboard Shortcuts

| Shortcut | Scope | Action |
| :--- | :--- | :--- |
| `Ctrl + K` / `Cmd + K` | Global | Open Global Command Palette & Quick Navigation |
| `Ctrl + J` / `Cmd + J` | Workspace | Toggle Quick Markdown Scratchpad Drawer |
| `[` or `Ctrl + \` | Tracker / Notebook | Toggle Sidebars |
| `Tab` | Terminal (`/`) | Autocomplete shell commands and paths |
| `Esc` | Global | Close active modal, drawer, or palette |

---

## Quickstart & Local Setup

### Prerequisites
- Node.js `>= 20.0.0`
- npm `>= 10.0.0`

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/Kaap10/kaap10.github.io.git
cd kaap10.github.io

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

Developed with precision by **[Vardhman Gupta](https://github.com/Kaap10)**.

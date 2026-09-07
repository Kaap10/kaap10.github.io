# Vardhman Gupta | Portfolio
# Vardhman Gupta | Developer Ecosystem & Digital Workstation

> An integrated digital workstation, knowledge wiki, and portfolio built for daily software engineering, system design, and AI explorations.
> An integrated digital workstation, interactive terminal operating environment, technical knowledge wiki, and engineering portfolio built for systems architecture, AI workflows, and high-performance developer tooling.

---

## About Me
## Overview

I'm **Vardhman Gupta** - an AI & Systems Engineer focused on agentic workflows, distributed platforms, and high-performance developer tooling. This repository serves as my personal workstation, technical documentation wiki, and interactive portfolio showcasing open source packages, fullstack systems, and live engineering utilities.
This repository powers **[kaap10.github.io](https://kaap10.github.io)** - a unified developer platform created by **Vardhman Gupta** (AI & Systems Engineer). It brings together:

- **Live Site:** [kaap10.github.io](https://kaap10.github.io)
- **Interactive Workstation Terminal (`/`)**: A native browser-based Unix-like shell inside an isolated MacBook Pro canvas with GPU-accelerated constellation particle dynamics and volumetric organic smoke layers.
- **Engineering Portfolio (`/portfolio`)**: A minimalist, high-density showcase of distributed platforms, open source packages, and production systems architecture.
- **Open Source Packages (`/opensource`)**: Detailed technical breakdowns, package telemetry, and architecture specs for developer tools (`build-with-ai`, `dynavec`).
- **Production Projects Matrix (`/projects`)**: Categorized project matrix spanning AI/LLM agent frameworks, low-latency microservices, full-stack platforms, and developer utilities.
- **Engineering Workstation Hub (`/tools`)**: Central launcher for live engineering utilities, formatters, and sandboxes.
- **Architecture Whiteboard (`/board`)**: Infinite visual canvas powered by Excalidraw for sketching system architectures, data flows, and design diagrams with export capabilities.
- **Productivity & Sprint Tracker (`/tracker`)**: A full-stack productivity suite featuring 9 modular views (Dashboard, Focus Timer, Goals & Milestones, Kanban Tasks, Habit Streaks, Activity Graph, Weekly Reviews, Telemetry Stats, and Distraction-Free Markdown Notebook).
- **Global Micro-UIs**: Cross-cutting floating tools injected globally via `src/theme/Root.js`, including the **Global Scratchpad (`Ctrl+J` / `Cmd+J`)**, **Spotlight Command Palette (`Ctrl+K` / `Cmd+K` / `Ctrl+H`)**, and **Floating Focus Pill & Document Picture-in-Picture (PiP)**.
- **Technical Documentation & Knowledge Wiki (`/blogs`)**: Computer Science, System Design, and Backend Engineering knowledge base equipped with Algolia DocSearch.

---

## Live Links & Profile

- **Production Site:** [kaap10.github.io](https://kaap10.github.io)
- **GitHub:** [@Kaap10](https://github.com/Kaap10)
- **LinkedIn:** [linkedin.com/in/vardhman-gupta](https://linkedin.com/in/vardhman-gupta)
- **LeetCode:** [leetcode.com/u/kap10](https://leetcode.com/u/kap10/)
- **Medium:** [medium.com/@kap10](https://medium.com/@kap10)
- **Email:** [vardhmangupta2004@gmail.com](mailto:vardhmangupta2004@gmail.com)

---

## System Architecture

```mermaid
graph TD
    classDef client fill:#18181B,stroke:#FF4D4F,stroke-width:2px,color:#F4F4F5
    classDef route fill:#27272A,stroke:#52525B,stroke-width:1px,color:#FAFAFA
    classDef comp fill:#1C1917,stroke:#F59E0B,stroke-width:1px,color:#E4E4E7
    classDef storage fill:#09090B,stroke:#3B82F6,stroke-width:1.5px,color:#93C5FD
    classDef client fill:#121216,stroke:#FF4D4F,stroke-width:2px,color:#F4F4F5
    classDef route fill:#1A1A22,stroke:#52525B,stroke-width:1px,color:#FAFAFA
    classDef comp fill:#18181E,stroke:#F59E0B,stroke-width:1px,color:#E4E4E7
    classDef storage fill:#0D0D11,stroke:#3B82F6,stroke-width:1.5px,color:#93C5FD
    classDef portal fill:#18181E,stroke:#10B981,stroke-width:1px,color:#6EE7B7

    Client["kaap10.github.io (Docusaurus v3 Core)"]:::client
    Client["kaap10.github.io (Docusaurus 3.10 + React 19 Core)"]:::client

    subgraph Routes ["Navigation & Route Clusters"]
        R1["/ (Homepage & Showcase)"]:::route
        R2["/opensource (dynavec & build-with-ai)"]:::route
        R3["/projects (7 Flagship Systems)"]:::route
        R4["/tools (Live Engineering Suite)"]:::route
        R5["/blogs (Knowledge & Technical Articles)"]:::route
    subgraph RootInjection ["Global Root Inversion Layer (src/theme/Root.js)"]
        G1["Global Timer Widget (Floating Pill & PiP Portal)"]:::portal
        G2["Global Command Palette (Spotlight Ctrl+K / Ctrl+H)"]:::portal
        G3["Global Scratchpad (Markdown Drawer Ctrl+J)"]:::portal
    end

    subgraph BlogTools ["Blog-Scoped Interactive Tools"]
        T1["Algolia / Local Search (Ctrl+K)"]:::comp
        T2["Quick Floating Scratchpad (Ctrl+J)"]:::comp
    subgraph StaticAndContentRoutes ["Static, MDX & Interactive Routes"]
        R1["/ (Interactive Terminal Workstation & Particles)"]:::route
        R2["/portfolio (Engineering Portfolio & Credentials)"]:::route
        R3["/projects (7 Flagship Systems & Repositories)"]:::route
        R4["/opensource (build-with-ai & dynavec Hub)"]:::route
        R5["/tools (Developer Utilities Suite)"]:::route
        R6["/board (Interactive System Whiteboard)"]:::route
        R7["/blogs (Technical Articles & System Design Wiki)"]:::route
    end

    subgraph Workstation ["Engineering Workstation Tools"]
        W1["Life & Sprint Tracker (Supabase Auth/DB)"]:::comp
        W2["System Architecture Whiteboard"]:::comp
        W3["Markdown Live Pad & Formatter"]:::comp
        W4["Global Spotlight Palette"]:::comp
    subgraph TrackerSPA ["Dynamic Tracker Application (/tracker)"]
        T1["Dashboard & Quick Actions"]:::comp
        T2["Focus Timer Engine (Wall-Clock Delta Math)"]:::comp
        T3["Goals & Nested Milestones"]:::comp
        T4["Kanban Sprint Tasks"]:::comp
        T5["Daily Habits & Streak Calculus"]:::comp
        T6["Markdown Notebook (0ms Buffer + Debounced Cloud Sync)"]:::comp
        T7["Activity Graph & Recharts Analytics"]:::comp
        T8["Weekly & Monthly Reviews"]:::comp
    end

    subgraph DataLayer ["Data & Persistence Layer"]
        S1[(Supabase PostgreSQL)]:::storage
        S2[(IndexedDB & LocalStorage)]:::storage
        S3[(Static Markdown & MDX Engine)]:::storage
    subgraph PersistenceLayer ["Persistence & Synchronization Mesh"]
        P1[(Supabase PostgreSQL 15 with Row-Level Security)]:::storage
        P2[(Browser LocalStorage & Cross-Tab Storage Events)]:::storage
        P3[(Static Bundles, Webpack Chunks & Algolia Index)]:::storage
    end

    Client --> Routes
    R5 -.-> BlogTools
    R4 --> Workstation
    W1 --> S1
    W2 & W3 & T2 --> S2
    R1 & R2 & R3 & R5 --> S3
    Client --> RootInjection
    Client --> StaticAndContentRoutes
    Client --> TrackerSPA

    TrackerSPA --> P1
    TrackerSPA --> P2
    RootInjection --> P2
    StaticAndContentRoutes --> P3
```

---

## Features
## Key Features Breakdown

- **Personal Knowledge Wiki & Blogs**: In-depth articles covering AI orchestration, distributed backend systems, and frontend performance, equipped with scoped **Instant Search (`Ctrl+K`)** and a **Quick Scratchpad (`Ctrl+J`)**.
- **Open Source Tooling (`/opensource`)**: Dedicated showcase for developer utilities including `dynavec` (dynamic vector DB client) and `build-with-ai` (agent template accelerator).
- **Flagship Project Showcase (`/projects`)**: Interactive project matrix spanning AI platforms, fullstack apps, and autonomous agents (Karya, AuraNow, Code with Buddy, IncidentFlow, Terminal Agent, Agent Bench, Model Router).
- **Living Engineering Workstation (`/tools`)**: Integrated suite featuring a customizable architecture whiteboard, Supabase-backed goal/task tracker, live markdown workspace, and spotlight search.
- **Ultra-Responsive Dark UI**: Performance-optimized design with seamless dark/light modes, keyboard shortcuts, and responsive grid layouts.
### 1. Interactive Workstation Terminal (`/`)
- Isolated MacBook Pro device canvas with stationary chassis and zero hover elevation.
- GPU-accelerated canvas constellation network (`particles.js` architecture) with proximity links and interactive mouse repulse/connect dynamics.
- Volumetric organic smoke layers rendered on deep dark ambient canvas (`#0d0d11`).
- Native Unix-like CLI shell supporting 35+ commands:
  - **Navigation:** `portfolio`, `projects`, `tools`, `opensource`, `board`, `tracker`, `blogs`, `resume`, `explore <target>`
  - **Natural Phrases:** `explore project`, `explore tools`, `explore portfolio`, `explore opensource`, `explore board`, `explore tracker`
  - **Inspection:** `ls`, `cat <file>`, `pwd`, `whoami`, `neofetch`, `fastfetch`, `uname -a`, `date`, `uptime`
  - **Direct File Commands:** `about.txt`, `skills.json`, `contact.sh`, `resume.pdf` with clickable URLs/mail links
  - **Utilities:** `clear`, `history`, `echo`, `git status`, `git log`, `curl <url>`, `top`, `sudo <cmd>`, `scratchpad`
  - **Social:** `github`, `linkedin`, `email`
  - **Autocompletion & History:** Tab autocompletion for commands and files, up/down history navigation.
  - **100% Reliable New-Tab Redirection:** All navigation targets and suggestion chips open cleanly in a new browser tab (`_blank`).

### 2. Engineering Portfolio (`/portfolio`)
- Minimalist, distraction-free architecture overview and career history.
- Direct links to experience credentials, projects catalog, and active repositories.
- Fast, accessible layout with zero clutter.

### 3. Open Source Tooling Hub (`/opensource`)
- **`build-with-ai`**: Enterprise boilerplate and accelerator for autonomous agent orchestration, tool-calling pipelines, and production RAG workflows.
- **`dynavec`**: Dynamic client library for high-throughput vector database ingestion, metadata filtering, and semantic similarity search.
- Includes installation guides, MIT licensing info, and NPM package statistics.

### 4. Production Projects Showcase (`/projects`)
- Interactive project matrix with filtering across categories: *All*, *AI / ML*, *Fullstack*, *Systems / Distributed*, *Cloud & DevOps*, and *Open Source*.
- Detailed project cards with live demo links, source code repositories, and technical tags.

### 5. System Architecture Whiteboard (`/board`)
- Integrated visual sketching whiteboard powered by Excalidraw.
- Rich toolset: rectangles, ellipses, diamonds, arrows, lines, freehand draw, text, sticky notes, and color themes.
- Canvas controls: infinite canvas, grid mode, zoom/pan navigation, undo/redo, and PNG/SVG/clipboard export.

### 6. Productivity & Sprint Tracker (`/tracker`)
- **Hybrid Data Model**: Operates fully offline with zero setup using `localStorage`, with optional cloud sync to Supabase PostgreSQL 15 protected by Row-Level Security (RLS).
- **Focus Timer**: Wall-clock delta engine (`Date.now() - startedAt`) impervious to browser tab throttling; renders as an in-page floating pill, mini widget, full expanded window, or Document Picture-in-Picture (PiP) desktop window.
- **Markdown Notebook (`/tracker?tab=notebook`)**: Zero-keystroke-lag markdown editor with local component buffering, 400ms debounced auto-saving, multi-notebook collections, pinned notes, and tag filtering.
- **Goals & Milestones**: Multi-level strategic goal decomposition with progress calculations and milestone timelines.
- **Tasks**: Priority-tagged task board with subtask checklist support.
- **Habits**: Daily habit matrix with temporal streak calculus and idempotent logging.
- **Activity Graph**: GitHub-style heatmap tracking lifetime focus sessions and productivity distribution.
- **Reviews**: Weekly and monthly retrospectives with structured prompt templates.

### 7. Technical Knowledge Wiki & Blogs (`/blogs`)
- Comprehensive guides and revision notes on Computer Science, System Design, Python, DBMS, OOPs, Data Warehousing, and Modern Web Development.
- Instant search indexing powered by Algolia DocSearch (`Ctrl+K`).
- Auto-collapsing hierarchical sidebars and reading time estimation.

### 8. Engineering Tools Suite (`/tools`)
- Consolidated hub for developer utilities, architectural canvases, and productivity tools:
  - **Whiteboard (`/board`)**: Infinite vector diagramming canvas.
  - **Productivity Tracker (`/tracker`)**: Focus Pomodoro, task priority board, and habits engine.
  - **Notebook & Notepad (`/tracker?tab=notebook`)**: Zero-lag markdown note taking with auto-save.
  - **Blogs Scratchpad (`/blogs` | `Ctrl+J`)**: Multi-sheet markdown slide-over drawer.
  - **Spotlight Command Palette (`Ctrl+H`)**: Global fuzzy search and instant action runner.
  - **Workstation Terminal (`/`)**: Interactive Unix-like terminal shell and particle workspace.

---

## Techstack
## Technology Stack

| Domain | Technologies & Libraries |
| :--- | :--- |
| **Framework & Core** | React 18, Docusaurus 3, Webpack 5, Node.js |
| **Language & Typing** | JavaScript (ESNext), TypeScript, Python, SQL |
| **Styling & UI** | CSS Modules, Custom Design System, Lucide Icons, Mermaid.js |
| **Backend & Database** | Supabase (PostgreSQL, Auth, RLS), REST APIs, IndexedDB |
| **Search & AI** | Algolia DocSearch, Local Search Engine, Vector Embeddings |
| **Deployment & CI/CD** | GitHub Pages, GitHub Actions, Vercel |
| Domain | Technologies & Libraries | Version / Source |
| :--- | :--- | :--- |
| **Framework & Engine** | React, Docusaurus Classic Preset, Webpack 5 | React 19.x, Docusaurus 3.10.x |
| **Languages** | JavaScript (ESNext), TypeScript, Python, SQL | Node.js >= 22.0.0 |
| **Styling & UI** | CSS Modules, Custom Design Tokens, Lucide Icons | Scoped CSS, `lucide-react` |
| **Data Visualization** | Recharts | 3.10.x |
| **Architecture Sketching** | Excalidraw Canvas | 0.18.x |
| **Backend & Cloud DB** | Supabase (PostgreSQL 15, GoTrue Auth, PostgREST, RLS) | `@supabase/supabase-js` 2.x |
| **Search Engine** | Algolia DocSearch, Client Auto-indexer | `search-insights` |
| **Markdown / MDX** | MDX v3, Prism React Renderer | Dracula / GitHub Themes |
| **Native Web APIs** | Document Picture-in-Picture, Canvas 2D, StorageEvent | W3C Standard APIs |

---

## Keyboard Shortcuts Reference

| Shortcut | Scope | Action |
| :--- | :--- | :--- |
| `Ctrl + J` / `Cmd + J` | Global | Toggle Global Floating Scratchpad drawer |
| `Ctrl + K` / `Cmd + K` | Global | Open Global Command Palette / Spotlight search |
| `Ctrl + H` | Global | Open Global Command Palette |
| `Tab` | Terminal (`/`) | Autocomplete commands and file names |
| `Up / Down Arrow` | Terminal (`/`) | Navigate command history buffer |
| `[` or `Ctrl + \` | Tracker (`/tracker`) | Toggle Tracker sidebar collapse |
| `Esc` | Modals / Palette | Dismiss active modal or overlay |

---

## Local Development & Setup

### Prerequisites
- **Node.js**: `v22.0.0` or higher
- **Package Manager**: `npm` (v10+ recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/Kaap10/kaap10.github.io.git
cd kaap10.github.io
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration (Optional)
The application includes default Supabase credentials for testing and guest access. To use your own Supabase instance:
```bash
# Create .env file (optional)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-publishable-anon-key
```

### 4. Start Local Development Server
```bash
npm start
```
The application will launch at `http://localhost:3000`.

### 5. Build for Production
```bash
npm run build
```
Static assets will be compiled into the `build/` directory with exit code `0`.

### 6. Test Production Build Locally
```bash
npm run serve
```
Serves the generated static files at `http://localhost:3000`.

---

## Project Structure

```
kaap10.github.io/
├── docs/                             # Technical blogs & CS documentation (MDX)
│   ├── B.Tech Subjects/              # Academic & core computer science notes
│   ├── Core Subjects/                # DBMS, OOPs, OS, and System Design
│   ├── Development/                  # Full-stack guides and Python tutorials
│   └── intro.md                      # Wiki introduction
├── src/
│   ├── components/
│   │   ├── Common/                   # Global Command Palette, Icons, Scratchpad
│   │   ├── ExcalidrawBoard/          # Excalidraw architecture whiteboard wrapper
│   │   └── Tracker/                  # Tracker SPA core engine
│   │       ├── components/           # Views: Dashboard, Focus, Goals, Tasks, Habits,
│   │       │                         # Notebook, Calendar, Reviews, Stats, Resources
│   │       ├── context/              # AuthContext & TrackerContext state providers
│   │       ├── services/             # Supabase client & Insights heuristic engine
│   │       └── styles/               # Scoped CSS modules for tracker UI
│   ├── css/
│   │   └── custom.css                # Global design system & theme variables
│   ├── pages/
│   │   ├── index.js                  # Workstation Terminal & Particle Canvas (/)
│   │   ├── index.module.css          # Terminal UI & Laptop device styling
│   │   ├── portfolio.js              # Minimalist Engineering Portfolio (/portfolio)
│   │   ├── projects.js               # Categorized Projects Matrix (/projects)
│   │   ├── opensource.js             # Open Source Packages Hub (/opensource)
│   │   ├── tools.js                  # Developer Tools & Utilities (/tools)
│   │   ├── board.js                  # System Design Whiteboard (/board)
│   │   └── tracker.js                # Full Productivity Tracker (/tracker)
│   └── theme/
│       ├── Root.js                   # Global root injection (Widgets, Palette, Pad)
│       ├── Navbar/index.js           # Header navbar wrapper (Hidden on root `/`)
│       ├── Footer/index.js           # Footer wrapper (Hidden on root `/`)
│       └── SearchBar/index.js        # Blog-scoped Algolia search trigger
├── static/                           # Static assets, fonts, icons, and diagrams
├── docusaurus.config.js              # Docusaurus site configuration
├── sidebars.js                       # Documentation sidebar navigation hierarchy
├── package.json                      # Dependencies and build scripts
└── README.md                         # Project documentation
```

---

## Design Principles

- **Zero Emojis**: Crisp, clean typography paired exclusively with vector SVG iconography (`lucide-react`).
- **Performance First**: Zero unnecessary runtime re-renders, canvas particle optimizations, and debounced persistence.
- **Offline Resilient**: Functions seamlessly without an internet connection using local storage and browser event meshes.
- **Keyboard Driven**: Power-user shortcuts for instant navigation, quick-capture scratchpads, and CLI commands.

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

Developed with precision by **[Vardhman Gupta](https://github.com/Kaap10)**.

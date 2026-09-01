# Vardhman Gupta — Developer Ecosystem & Portfolio

[![Deploy to GitHub Pages](https://github.com/kaap10/kaap10.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/kaap10/kaap10.github.io/actions/workflows/deploy.yml)
[![Docusaurus v3](https://img.shields.io/badge/Docusaurus-v3.10.1-3ECC5F?logo=docusaurus)](https://docusaurus.io/)
[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20RLS-3ECF8E?logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Personal portfolio, computer science knowledge base, interactive architectural whiteboard, and full-stack productivity operating system with multi-tenant cloud persistence.

**Live Site:** [https://kaap10.github.io/](https://kaap10.github.io/)

---

## Overview

This repository houses an integrated developer ecosystem built on a hybrid **Static Site Generation (SSG) and Dynamic Single Page Application (SPA)** architecture. It consolidates engineering documentation, system design sketching, portfolio showcases, and daily execution workflows into a single cohesive platform.

```
+----------------------------------------------------------------------------------------------------+
|                                    KAAP10 DEVELOPER ECOSYSTEM                                      |
+----------------------------------------------------------------------------------------------------+
|  [Portfolio]       |  [Projects]       |  [Blogs & Wiki]   |  [Tools Hub]      |  [Global Layer]   |
|  /                 |  /projects        |  /blogs/intro     |  /tools           |  theme/Root.js    |
|  • Minimal hero    |  • 4 Systems      |  • 100+ Articles  |  • Board (/board) |  • Command Palette|
|  • Core skills     |  • Tech badges    |  • DSA, Systems   |  • Tracker App    |  • Scratchpad     |
|  • Garden tools    |  • GitHub links   |  • Algolia Search |  • PiP Capsule    |  • Floating Timer |
+----------------------------------------------------------------------------------------------------+
```

---

## Key Features

### 1. Portfolio & Dynamic Projects Showcase
- **Home (`/`)**: Minimal editorial layout introducing background in AI/ML and distributed systems, core competencies, and featured tools.
- **Projects Showcase (`/projects`)**: Dedicated directory highlighting 4 production-grade systems (**Guru-G**, **AuraNow**, **Code With Buddy**, **AegisAI**) with domain filtering (`All`, `AI / ML`, `Full-Stack`, `Security`), architectural highlights, and source code links.

### 2. Engineering Wiki & Knowledge Base (`/blogs/intro`)
- 100+ structured engineering guides covering Data Structures & Algorithms, System Design, Database Management Systems (DBMS), Machine Learning, OOPs, and Full-Stack Web Development.
- Sub-millisecond full-text document discovery powered by **Algolia DocSearch**.

### 3. Developer Tools Suite (`/tools`)
- **Interactive Whiteboard (`/board`)**: Architectural sketching canvas powered by `@excalidraw/excalidraw` with local drawing persistence.
- **Global Quick Scratchpad (`Ctrl+J` / `Cmd+J`)**: Floating multi-sheet Markdown drawer with live syntax preview toggle, code copy, and `.md` file export.
- **Global Command Palette (`Ctrl+H` / `Cmd+H` / `Ctrl+K`)**: Keyboard-first spotlight search for instant route switching, action triggers, and timer sessions.

### 4. Personal Productivity OS (`/tracker`)
- **Dashboard**: Real-time overview of daily deliverables, active goal progress, and habit consistency.
- **Tasks Pipeline**: Priority triage (`High`, `Medium`, `Low`), due date scheduling, and nested JSONB checklist items with optimistic state toggling.
- **Goals & Milestones**: Multi-tiered roadmap decomposing high-level objectives into hierarchical milestone trees with automated percentage rollups.
- **Deep Work Focus Timer**: Wall-clock delta engine (`requestAnimationFrame` + `Date.now()`) with 25m, 50m, 90m intervals, continuous stopwatch, and draggable floating widget.
- **Document Picture-in-Picture (PiP)**: Chrome 116+ OS-level detached always-on-top timer window via `window.documentPictureInPicture`.
- **Habits Engine**: Atomic habit tracking with streak calculus engine computing current and lifetime best streaks.
- **Productivity Calendar**: Visual monthly and weekly grid plotting tasks, active milestones, and logged deep work sessions.
- **Resource Vault**: Bookmarking library with category filters (`GitHub`, `YouTube`, `PDF`, `Course`, `Book`, `Website`) and markdown notes.
- **Telemetry & Heatmap**: 52-week GitHub-style contribution graph and interactive Recharts velocity bars and focus duration area curves.
- **Cadence Retrospectives**: Weekly and monthly structured reviews with automated metric rollups and PostgreSQL UPSERT idempotency.
- **Zero-Cost Insights Engine**: Deterministic client-side heuristic engine discovering peak productivity days and overdue pacing with $0 API overhead.

---

## Technology Stack

| Layer | Technologies |
|---|---|
| **Framework & SSG** | Docusaurus v3.10.1, React 19, Webpack 5 |
| **Styling & Theming** | CSS Modules, CSS Custom Variables (`--vg-*`), Dark Mode |
| **Cloud Backend & DB** | Supabase, PostgreSQL 15, PostgREST API Gateway |
| **Authentication & Security**| Supabase GoTrue Auth (JWT), PostgreSQL Row Level Security (RLS) |
| **Canvas & Sketching** | Excalidraw v0.18.1 |
| **Visualizations & Charts** | Recharts v3.10.1 |
| **Search Engine** | Algolia DocSearch |
| **Native Web APIs** | Document Picture-in-Picture API, Web Storage API, `requestAnimationFrame` |
| **Hosting & CI/CD** | GitHub Pages, GitHub Actions |

---

## Getting Started

### Prerequisites
- Node.js `>= 20.0.0`
- npm `>= 10.0.0`

### Installation & Local Run
```bash
# 1. Clone repository
git clone https://github.com/Kaap10/kaap10.github.io.git
cd kaap10.github.io

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start local development server
npm run start

# Application will be accessible at http://localhost:3000
```

### Production Build & Preview
```bash
# Build optimized static bundle
npm run build

# Preview production build locally
npm run serve
```

---

## Database Configuration (Supabase)

To enable cloud synchronization for the Productivity OS:

1. Create a project at [supabase.com](https://supabase.com/).
2. Run the database schemas located in `supabase/`:
   ```sql
   -- Run schema migrations
   supabase/schema.sql
   ```
3. Connect your Supabase project URL and public anon key in `src/components/Tracker/services/supabase.js`.
4. All database tables strictly enforce Row Level Security (`auth.uid() = user_id`) to ensure complete user isolation.

---

## Repository Structure

```
.
├── docs/                             # Engineering wiki articles (MDX)
│   ├── DSA/                          # Data structures and algorithms
│   ├── System Design/                # Distributed systems architectures
│   ├── DBMS/                         # Database internals and SQL
│   └── ...                           # Machine learning, OOPs, etc.
├── src/
│   ├── components/
│   │   ├── Common/                   # GlobalCommandPalette, GlobalScratchpad, GlobalIcons
│   │   ├── ExcalidrawBoard/          # Whiteboard canvas integration
│   │   └── Tracker/                  # Productivity OS application
│   │       ├── components/           # Views: Dashboard, Tasks, Focus, Habits, Progress...
│   │       ├── context/              # AuthContext and TrackerContext
│   │       ├── services/             # Supabase client and insightsEngine
│   │       └── styles/               # Modular CSS system
│   ├── css/                          # Global theme tokens and typography
│   ├── pages/                        # Routes: /, /projects, /tools, /board, /tracker
│   └── theme/                        # Root.js (Global UI injection layer)
├── static/                           # Static assets, PDFs, and favicon
├── supabase/                         # PostgreSQL SQL schemas and migrations
└── docusaurus.config.js              # Core Docusaurus site configuration
```

---

## Shortcuts Reference

| Shortcut | Action | Description |
|---|---|---|
| `Ctrl+H` / `Cmd+H` | Spotlight Command Palette | Search and jump anywhere instantly |
| `Ctrl+J` / `Cmd+J` | Quick Scratchpad | Open global multi-sheet markdown notepad |
| `Ctrl+K` / `Cmd+K` | Command Palette (Alt) | Secondary spotlight trigger |

---

## Author

**Vardhman Gupta**  
AI Engineer · Systems Builder · Lifelong Learner  
- Website: [kaap10.github.io](https://kaap10.github.io/)  
- GitHub: [@kaap10](https://github.com/kaap10)  
- LinkedIn: [linkedin.com/in/vardhman-gupta](https://linkedin.com/in/vardhman-gupta)  
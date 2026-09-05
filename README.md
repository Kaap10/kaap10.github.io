# Vardhman Gupta — Developer Ecosystem & Portfolio

[![Deploy to GitHub Pages](https://github.com/kaap10/kaap10.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/kaap10/kaap10.github.io/actions/workflows/deploy.yml)
[![Docusaurus v3](https://img.shields.io/badge/Docusaurus-v3.10.1-3ECC5F?logo=docusaurus)](https://docusaurus.io/)
[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20RLS-3ECF8E?logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Personal portfolio, computer science technical blogs, interactive architectural whiteboard, and full-stack productivity operating system with multi-tenant cloud persistence.

**Live Site:** [https://kaap10.github.io/](https://kaap10.github.io/)

---

## Overview

This repository houses an integrated developer ecosystem built on a hybrid **Static Site Generation (SSG) and Dynamic Single Page Application (SPA)** architecture. It consolidates engineering documentation, system design sketching, portfolio showcases, and daily execution workflows into a single cohesive platform.

```
+----------------------------------------------------------------------------------------------------+
|                                    KAAP10 DEVELOPER ECOSYSTEM                                      |
+----------------------------------------------------------------------------------------------------+
|  [Portfolio]       |  [Projects]       |  [Tool Kit]       |  [Technical Blogs]|  [Global Layer]   |
|  /                 |  /projects        |  /tools           |  /blogs/intro     |  theme/Root.js    |
|  • Minimal hero    |  • 7 Systems      |  • Whiteboard     |  • 100+ Articles  |  • Command Palette|
|  • Quick CTAs      |  • Tier-1 Showcase|  • Tracker App    |  • DSA, Systems   |  • Scratchpad     |
|  • Techstack grid  |  • GitHub links   |  • Notebook       |  • Algolia Search |  • Floating Timer |
+----------------------------------------------------------------------------------------------------+
```

---

## Key Features

### 1. Portfolio & Dynamic Projects Showcase
- **Home (`/`)**: Minimal editorial layout featuring AI Engineer header, direct CTAs (`Explore Project`, `Explore Tools`, `Resume`), Tier-1 Featured Projects (**Terminal Agent**, **IncidentFlow**, **Karya**, **Model Router**), interactive Tool Kit, dedicated Technical Blogs, and structured 5-domain Techstack.
- **Projects Showcase (`/projects`)**: Dedicated directory highlighting 7 production-grade systems (**Terminal Agent**, **IncidentFlow**, **Karya**, **Code with Buddy**, **Agent Bench**, **Model Router**, **Auranow**) with category filtering (`All (7)`, `Featured (3)`, `AI & Agents (4)`, `Full-Stack (3)`), architecture highlights, metric chips, recruiter callouts, and expandable deep-dive panels.

### 2. Tool Kit & Productivity Suite (`/tools`)
- **Whiteboard (`/board`)**: Architectural sketching canvas powered by `@excalidraw/excalidraw` with local drawing persistence.
- **Tracker (`/tracker`)**: Full-stack productivity operating system with Pomodoro deep work, atomic habits, goals roadmap, and activity heatmap.
- **Notebook & Notepad (`/tracker?tab=notebook`)**: Distraction-free personal notepad with multi-notebook collections, zero typing lag (local state buffering + 400ms debounced auto-save), tag filtering, word/character counter, and `.txt` export.
- **Global Quick Scratchpad (`Ctrl+J` / `Cmd+J`)**: Floating quick-capture scratchpad with multi-sheet tabs, live syntax preview toggle, code copy, and `.md` file export.
- **Global Command Palette (`Ctrl+K` / `Cmd+K` / `Ctrl+H`)**: Keyboard-first spotlight search for instant route switching, system tools, and timer sessions.

### 3. Technical Blogs (`/blogs/intro`)
- 100+ structured engineering guides covering Data Structures & Algorithms, System Design, Database Management Systems (DBMS), Machine Learning, OOPs, and Full-Stack Web Development.
- Sub-millisecond full-text document discovery powered by **Algolia DocSearch**.

### 4. Tracker Deep Dive (`/tracker`)
- **Dashboard**: Real-time overview of daily deliverables, active goal progress, and habit consistency.
- **Tasks Pipeline**: Priority triage (`High`, `Medium`, `Low`), due date scheduling, and nested JSONB checklist items with optimistic state toggling.
- **Goals & Milestones**: Multi-tiered roadmap decomposing high-level objectives into hierarchical milestone trees with automated percentage rollups.
- **Deep Work Focus Timer**: Wall-clock delta engine (`requestAnimationFrame` + `Date.now()`) with 25m, 50m, 90m intervals, continuous stopwatch, and draggable floating widget.
- **Document Picture-in-Picture (PiP)**: Chrome 116+ OS-level detached always-on-top timer window via `window.documentPictureInPicture`.
- **Habits Engine**: Atomic habit tracking with streak calculus engine computing current and lifetime best streaks.
- **Resource Library**: Bookmarking library with category filters (`GitHub`, `YouTube`, `PDF`, `Course`, `Book`, `Website`) and notes.
- **Notebook Workspace**: Fixed-viewport locked layout with independent internal scrolling and local-first Supabase persistence.
- **Collapsible Sidebar**: Desktop collapsible navigation sidebar with persistent state and `[` / `Ctrl+\` keyboard shortcut.
- **Telemetry & Heatmap**: 52-week GitHub-style contribution graph, interactive Recharts velocity bars, and focus duration area curves.
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

To enable cloud synchronization for the Tracker:

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
│   │   └── Tracker/                  # Tracker application
│   │       ├── components/           # Views: Dashboard, Tasks, Focus, Habits, Notebook...
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
| `Ctrl+K` / `Cmd+K` | Spotlight Command Palette | Search and jump anywhere instantly |
| `Ctrl+H` / `Cmd+H` | Command Palette (Alt) | Secondary spotlight trigger |
| `Ctrl+J` / `Cmd+J` | Quick Scratchpad | Open global floating markdown notepad |
| `[` or `Ctrl+\` | Toggle Tracker Sidebar | Collapse or expand sidebar in Tracker |

---

## Author

**Vardhman Gupta**  
AI Engineer · Systems Builder · Lifelong Learner  
- Website: [kaap10.github.io](https://kaap10.github.io/)  
- GitHub: [@kaap10](https://github.com/kaap10)  
- LinkedIn: [linkedin.com/in/vardhman-gupta](https://linkedin.com/in/vardhman-gupta)  
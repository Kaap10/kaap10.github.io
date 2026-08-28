# Vardhman Gupta

Personal portfolio, technical blog, interactive whiteboard, and productivity OS.

Live: [https://kaap10.github.io/](https://kaap10.github.io/)

---

## Features

- **Portfolio** (`/`) — Technical projects, skills, experience, and publications.
- **Blogs** (`/blogs`) — In-depth engineering articles and technical notes.
- **Board** (`/board`) — Interactive canvas powered by Excalidraw with local persistence.
- **Tracker** (`/tracker`) — Personal productivity OS with Supabase cloud persistence:
  - Task management with recurring cycles and milestone linkage
  - Strategic goals and milestone roadmap hierarchy
  - Deep work focus timer (Pomodoro and Stopwatch)
  - Daily habit tracking with streak consistency engine
  - Productivity calendar aggregating tasks, milestones, and sessions
  - Knowledge vault with reading status and persistent notes
  - 52-week activity heatmap and Recharts velocity charts
  - Weekly and monthly retrospectives
  - Command palette (`Cmd+K` / `Ctrl+K`) global search

---

## Tech Stack

- **Framework**: Docusaurus v3
- **Frontend**: React 19, CSS Modules
- **Charts & Visualizations**: Recharts
- **Icons**: Lucide React
- **Whiteboard**: Excalidraw
- **Backend & Database**: Supabase (PostgreSQL, Row Level Security, Auth)
- **Deployment**: GitHub Pages via GitHub Actions

---

## Getting Started

### Prerequisites

- Node.js >= 20.0
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Kaap10/kaap10.github.io.git
cd kaap10.github.io

# Install dependencies
npm install --legacy-peer-deps

# Start local development server
npm run start

# Build for production
npm run build

# Preview production build locally
npm run serve
```

---

## Database Setup

To enable cloud persistence for the Tracker:

1. Create a project on [Supabase](https://supabase.com/).
2. Run the SQL schema files located in `supabase/`:
   - `supabase/schema.sql` (initial schema and V2 migrations)
3. Connect credentials through the UI or environment variables.

---

## Directory Structure

```
.
├── docs/                     # Technical documentation and blog posts
├── src/
│   ├── components/
│   │   ├── ExcalidrawBoard/  # Interactive canvas component
│   │   └── Tracker/          # Tracker V2 application
│   │       ├── components/   # Views, modals, charts, and common UI
│   │       ├── context/      # Auth and tracker state providers
│   │       ├── services/     # Supabase client and heuristics
│   │       └── styles/       # Modular CSS system
│   ├── css/                  # Global styles and design tokens
│   └── pages/                # Route entry pages (/, /board, /tracker)
├── supabase/                 # PostgreSQL schemas and migrations
├── static/                   # Static assets, resume, images
└── docusaurus.config.js      # Docusaurus site configuration
```

---

## Deployment

Pushes to the `main` branch automatically build and deploy the static bundle to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).

---

## Author

- **Vardhman Gupta** — [Website](https://kaap10.github.io/) · [GitHub](https://github.com/kaap10) · [LinkedIn](https://linkedin.com/in/vardhman-gupta)

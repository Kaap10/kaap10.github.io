# Vardhman Gupta | Portfolio

> An integrated digital workstation, knowledge wiki, and portfolio built for daily software engineering, system design, and AI explorations.

---

## About Me

I'm **Vardhman Gupta** — an AI & Systems Engineer focused on agentic workflows, distributed platforms, and high-performance developer tooling. This repository serves as my personal workstation, technical documentation wiki, and interactive portfolio showcasing open source packages, fullstack systems, and live engineering utilities.

- **Live Site:** [kaap10.github.io](https://kaap10.github.io)
- **GitHub:** [@Kaap10](https://github.com/Kaap10)
- **LinkedIn:** [vardhman-gupta](https://linkedin.com/in/vardhman-gupta)
- **Contact:** [vardhmangupta108@gmail.com](mailto:vardhmangupta108@gmail.com)

---

## Architecture

```mermaid
graph TD
    classDef client fill:#18181B,stroke:#FF4D4F,stroke-width:2px,color:#F4F4F5
    classDef route fill:#27272A,stroke:#52525B,stroke-width:1px,color:#FAFAFA
    classDef comp fill:#1C1917,stroke:#F59E0B,stroke-width:1px,color:#E4E4E7
    classDef storage fill:#09090B,stroke:#3B82F6,stroke-width:1.5px,color:#93C5FD

    Client["kaap10.github.io (Docusaurus v3 Core)"]:::client

    subgraph Routes ["Navigation & Route Clusters"]
        R1["/ (Homepage & Showcase)"]:::route
        R2["/opensource (dynavec & build-with-ai)"]:::route
        R3["/projects (7 Flagship Systems)"]:::route
        R4["/tools (Live Engineering Suite)"]:::route
        R5["/blogs (Knowledge & Technical Articles)"]:::route
    end

    subgraph BlogTools ["Blog-Scoped Interactive Tools"]
        T1["Algolia / Local Search (Ctrl+K)"]:::comp
        T2["Quick Floating Scratchpad (Ctrl+J)"]:::comp
    end

    subgraph Workstation ["Engineering Workstation Tools"]
        W1["Life & Sprint Tracker (Supabase Auth/DB)"]:::comp
        W2["System Architecture Whiteboard"]:::comp
        W3["Markdown Live Pad & Formatter"]:::comp
        W4["Global Spotlight Palette"]:::comp
    end

    subgraph DataLayer ["Data & Persistence Layer"]
        S1[(Supabase PostgreSQL)]:::storage
        S2[(IndexedDB & LocalStorage)]:::storage
        S3[(Static Markdown & MDX Engine)]:::storage
    end

    Client --> Routes
    R5 -.-> BlogTools
    R4 --> Workstation
    W1 --> S1
    W2 & W3 & T2 --> S2
    R1 & R2 & R3 & R5 --> S3
```

---

## Features

- **Personal Knowledge Wiki & Blogs**: In-depth articles covering AI orchestration, distributed backend systems, and frontend performance, equipped with scoped **Instant Search (`Ctrl+K`)** and a **Quick Scratchpad (`Ctrl+J`)**.
- **Open Source Tooling (`/opensource`)**: Dedicated showcase for developer utilities including `dynavec` (dynamic vector DB client) and `build-with-ai` (agent template accelerator).
- **Flagship Project Showcase (`/projects`)**: Interactive project matrix spanning AI platforms, fullstack apps, and autonomous agents (Karya, AuraNow, Code with Buddy, IncidentFlow, Terminal Agent, Agent Bench, Model Router).
- **Living Engineering Workstation (`/tools`)**: Integrated suite featuring a customizable architecture whiteboard, Supabase-backed goal/task tracker, live markdown workspace, and spotlight search.
- **Ultra-Responsive Dark UI**: Performance-optimized design with seamless dark/light modes, keyboard shortcuts, and responsive grid layouts.

---

## Techstack

| Domain | Technologies & Libraries |
| :--- | :--- |
| **Framework & Core** | React 18, Docusaurus 3, Webpack 5, Node.js |
| **Language & Typing** | JavaScript (ESNext), TypeScript, Python, SQL |
| **Styling & UI** | CSS Modules, Custom Design System, Lucide Icons, Mermaid.js |
| **Backend & Database** | Supabase (PostgreSQL, Auth, RLS), REST APIs, IndexedDB |
| **Search & AI** | Algolia DocSearch, Local Search Engine, Vector Embeddings |
| **Deployment & CI/CD** | GitHub Pages, GitHub Actions, Vercel |

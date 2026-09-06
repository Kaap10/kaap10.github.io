# Vardhman Gupta â€” Developer Ecosystem & Portfolio

[![Deploy to GitHub Pages](https://github.com/kaap10/kaap10.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/kaap10/kaap10.github.io/actions/workflows/deploy.yml)
[![Docusaurus v3](https://img.shields.io/badge/Docusaurus-v3.10.1-3EGC5F?logo=docusaurus)](https://docusaurus.io/)
[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20RLS-3ECF8E?logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

>
 Personal portfolio, computer science technical blogs, open-source tooling, interactive whiteboard, and full-stack productivity operating system with multi-tenant cloud persistence.
**Live Site:** [https://kaap10.github.io/](https://kaap10.github.io/)

---

## Overview

This repository houses an integrated developer ecosystem built on a hybrid **Static Site Generation (SSG) and Dynamic Single Page Application (SPA)** architecture. It consolidates engineering documentation, system design sketching, open-source repositories, project showcases, and daily execution workflows into a single cohesive platform.

```
+----------------------------------------------------------------------------------------------------------+
|                                    KAAP10 DEVELOPER ECOSYSTEM                                    |
+----------------------------------------------------------------------------------------------------------+
|  [Portfolio]       |  [Projects]       |  [Open Source]    |  [Tool Kit]       |  [Technical Blogs]           |
|  /                 |  /projects        |  /opensource      |  /tools           |  /blogs/intro                |
|  â€¢ Minimal hero    |  â€¢ 7 Core Systems |  â€¢ build-with-ai  |  â€¢ Whiteboard     |  â€¢ 100+ Articles             |
|  â€¢ Open Source Hub |  â€¢ AI, Fullstack  |  â€¢ dynavec (5 PRs)|  â€¢ Tracker App    |  â€¢ Core Python, DSG,          |
|  â€¢ Techstack grid  |  â€¢ Architecture   |  â€¢ Deep Dives     |  â€¢ Notebook       |  â€¢ Algolia Search & Notes    |
+----------------------------------------------------------------------------------------------------------+
```

---

## Key Features

### 1. Portfolio & Flagship Projects (`/projects`)
- **Home (`/`)`**: Minimal editorial layout featuring AI Engineer profile, Open Source showcase (**build-with-ai**, **dynavec**), flagship systems (**Karya**, **AuraNow**, **Code with Buddy**, **IncidentFlow**, **Terminal Agent**, **Agent Bench**, **Model Router**), interactive Tool Kit, and 5-domain Techstack.
- **Projects Directory (`/projects`)**: Dedicated catalog highlighting 7 production-grade systems with category filters (**`*All (7)**`, **`AI (2)*``, **`Fullstack (2)*``, **`Agents (3)*``), architecture highlights, metric chips, recruiter callouts, and expandable deep-dive panels:
  1. **01 Â· Karya (AI)**: Offline-first multilingual AI education platform with quantized 1.5B on-device LLM inference (llama.cpp) and RAG across 22 Indian languages + English.
  2. **02 Â· AuraNow (AI)**: AI-powered YouTube video comment intelligence platform clustering discussions into hierarchical RAPTER topic trees with UMAP and IDBSCAN.
  3. **03 Â· Code with Buddy (Fullstack)**: Real-time collaborative code editor with WebSocket state synchronization and Judge0 remote multi-language compilation.
  4. **04 Â· IncidentFlow (Fullstack)**: Mission-critical incident management system with idempotent Celery SLA monitoring, RBAC, and mandatory postmortems.
  5. **e4 Â· Terminal Agent (Agents)**: Verify-first autonomous coding agent with sandboxed CLI test execution and 12-category SQLite rollback checkpoints.
  6. **e5 Â· Agent Bench (Agents)**: Command-line benchmarking harness for AI coding agents across 40+ tasks using deterministic rule-based evaluation.
  7. **07 Â· Model Router (Agents)**: Intelligent LLM proxy gateway analyzing prompt complexity to optimize API inference costs by 40â€’70%.

3## 2. Dedicated Open Source Hub (`/opensource`)
- **`build-with-ai` (Creator & Maintainer)**: Open-source, zero-API developer CLI that guides engineers through 10â€“23 phase structured software workflows (`npx build-with-ai`) with local-first context persistence (`.buildwithai/context.json`).
- **`dynavec` (Core Contributor)**: Serverless hybrid vector database on DynamoDB and AWS S3 with 5 merged PRs spanning Python 3.9 compatibility, ingestion SHA-256 deduplication, and large-batch retrieval regression suites.

### 3. Technical Blogs & Interactive Reading (`/blogs/intro`)
- 100+ structured engineering articles covering Core Python, Data Structures & Algorithms, System Design, Database Internals (DBMS), Machine Learning, and OOPs.
- sub-millisecond Search**: Full-text document search powered by **Algolia DocSearch**, scoped exclusively to `/blogs`  routes.
- **Slide-Over Quick Scratchpad (`Ctrl+J`)**: Dedicated multi-sheet markdown notepad active while reading technical blogs with instant copy and `.md` export.

### 4. Tool Kit & Productivity Suite (`/tools`)
- **Whiteboard (`/board`)**: Infinite architectural sketching canvas powered by `Y^Ø[Y˜]ËÙ^Ø[Y˜]ØÚ]ØØ[˜]Ú[™È\œÚ\İ[˜ÙK‚‹H
Š•˜XÚÙ\ˆ
İ˜XÚÙ\˜
JŠˆÛÛœÛÛY]YK\[\ˆ›ÙXİ]š]HİZ]H˜XÚÙYHİ\X˜\ÙN‚ˆH
Š‘\Ú›Ø\™
Šˆ™X[][YHİ™\šY]ÈÙˆZ[H[]™\˜X›\ËXİ]™HÛØ[›ÙÜ™\ÜË[™Xš]ÛÛœÚ\İ[˜ŞK‚ˆH
Š•\ÚÜÈ\[[™JŠˆš[Üš]HšXYÙH
YÚYY][XİØ
KYH]HØÚY[[™Ë[™™\İY”ÓÓˆÚXÚÛ\İ][\Ë‚ˆH
Š‘ÛØ[È	ˆZ[\İÛ™\ÊŠˆ][K]Y\™Y›ØYX\]\›Z[š[™ÈYÚ[]™[Øš™Xİ]™\È[ÈY\˜\˜ÚXØ[Z[\İÛ™H™Y\ÈÚ]]]ÛX]Y›Û\Ë‚ˆH
Š‘Y\ÛÜšÈ›Øİ\È[Y\ŠŠˆØ[XÛØÚÈ[H[™Ú[™H
™\]Y\İ[š[X][Û‘œ˜[YX
È]K››İÊ
X
HÚ][KÍLHÛ[ÙÜ›È[\˜[È[™›Ø][™ÈTØ\İ[K‚ˆH
Š‘Øİ[Y[Xİ\™KZ[‹TXİ\™H
T
JŠˆÚ›ÛYHLMŠÈÔË[]™[]XÚY[Ø^\Ë[Û‹]Ü[Y\ˆÚ[™İÈšXHÙ][Ë™Øİ[Y[Xİ\™R[”Xİ\™X‚ˆH
Š’Xš]È[™Ú[™JŠˆ]ÛZXÈXš]˜XÚÚ[™ÈÚ]İ™XZÈØ[İ[\È[™Ú[™HÛÛ\][™Èİ\œ™[[™Y™][YHİ™XZÜË‚ˆH
Š•[[Y]H	ˆX]X\
ŠˆL‹]ÙYZÈÚ]X‹\İ[HÛÛšX][ÛˆÜ˜\[™[\˜Xİ]™H™XÚ\È™[ØÚ]Hİ\™\Ë‚ˆH
Š“›İX›ÛÚÈÛÜšÜÜXÙH
İ˜XÚÙ\İX[›İX›ÛÚØ
JŠˆ\İ˜Xİ[Û‹Yœ™YH\œÛÛ˜[›İ\YÚ]][K[›İX›ÛÚÈÛÛXİ[ÛœË™\›È\[™ÈYËYÈš[\š[™Ë[™^Ü‚‚‹KKB‚ˆÈÈXÚ›ÛÙŞHİXÚÂ‚Ÿ^Y\ˆXÚ›ÛÙÚY\ÈŸKK_KK_ŠŸ
Š‘œ˜[Y]ÛÜšÈ	ˆÔÑÊŠˆØİ\Ø]\\ÈŒËŒLŒK™XXİNKÙXœXÚÈHŸ
Š”İ[[™È	ˆ[Z[™ÊŠˆÔÔÈ[Ù[\ËÔÔÈİ\İÛH˜\šXX›\È
K]™ËJ˜
K\šÈ[ÙHŸ
ŠÛİY˜XÚÙ[™	ˆŠŠˆİ\X˜\ÙKÜİÜ™TÔSMKÜİÔ‘TÕTHØ]]Ø^HŸ
Š]][XØ][Ûˆ	ˆÙXİ\š]JŠŸİ\X˜\ÙHÛÕYH]]
•Õ
KÜİÜ™TÔS›İÈ]™[ÙXİ\š]H
“ÊHŸ
ŠØ[˜\È	ˆÚÙ]Ú[™ÊŠˆ^Ø[Y˜]ÈŒŒNŒHŸ
Š•š\İX[^˜][ÛœÈ	ˆÚ\ÊŠˆ™XÚ\ÈŒËŒLŒHŸ
Š”ÙX\˜Ú[™Ú[™JŠˆ[ÛÛXHØÔÙX\˜Ú
ØÛÜYÈØ›ÙÜØ
HŸ
Š“˜]]™HÙXˆT\ÊŠˆØİ[Y[Xİ\™KZ[‹TXİ\™HTKÙXˆİÜ˜YÙHTK™\]Y\İ[š[X][Û‘œ˜[YXŠŸ
Š’Üİ[™È	ˆÒKĞÑ
ŠˆÚ]XˆYÙ\ËÚ]XˆXİ[ÛœÈ‚‹KKB‚ˆÈÈÙ][™Èİ\Y‚ˆÈÈÈ™\™\]Z\Ú]\Â‹H›ÙKšœÈHŒŒŒ‹HœHHLŒŒ‚ˆÈÈÈ[œİ[][Ûˆ	ˆØØ[[‚˜˜\ÚˆÈKˆÛÛ™H™\ÜÚ]ÜB™Ú]ÛÛ™HÎ‹ËÙÚ]X‹˜ÛÛKÒØX\LÚØX\L™Ú]X‹š[Ë™Ú]˜ÙØX\L™Ú]X‹š[Â‚ˆÈ‹ˆ[œİ[\[™[˜ÚY\Â›œH[œİ[K[YØXŞK\Y\‹Y\Â‚ˆÈËˆİ\ØØ[]™[ÜY[Ù\™\‚›œH[ˆİ\‚ˆÈ\XØ][ÛˆÚ[™HXØÙ\ÜÚX›H]‹ËÛØØ[ÜİŒÌ˜‚ˆÈÈÈ›ÙXİ[ÛˆZ[	ˆ™]šY]Â˜˜\ÚˆÈZ[Ü[Z^™Yİ]XÈ[™B›œH[ˆZ[‚ˆÈ™]šY]È›ÙXİ[ÛˆZ[ØØ[B›œH[ˆÙ\™B˜‚‹KKB‚ˆÈÈ]X˜\ÙHÛÛ™šYİ\˜][Ûˆ
İ\X˜\ÙJB‚•È[˜X›HÛİYŞ[˜Ú›Ûš^˜][Ûˆ›ÜˆH˜XÚÙ\‚‚ŒKˆÜ™X]HH›Ú™Xİ]Üİ\X˜\ÙK˜ÛÛWJÎ‹ËÜİ\X˜\ÙK˜ÛÛKÊBŒ‹ˆ[ˆH]X˜\ÙHØÚ[X\ÈØØ]Y[ˆİ\X˜\ÙKØ‚ˆÜ[ˆKH[ˆØÚ[XHZYÜ˜][ÛœÂˆİ\X˜\ÙKÜØÚ[XKœÜ[ˆŒËˆÛÛ›™Xİ[İ\ˆİ\X˜\ÙH›Ú™XİT“[™X›XÈ[›ÛˆÙ^H[ˆØİ\Ø]\\Ë˜ÛÛ™šYËšœØÜˆ™[˜‚ˆ[]X˜\ÙHX›\ÈİšXİH[™›Ü˜ÙH›İÈ]™[ÙXİ\š]H
]]ZY

HH\Ù\—ÚY
HÈ[œİ\™HÛÛ\]H\Ù\ˆ\ÛÛ][Û‹‚‚‹KKB‚ˆÈÈ™\ÜÚ]ÜHİXİ\™B‚˜‹‚¸¥%8¥  docs/                              # Technical wiki articles (MDX)
Ô—   â”â”€ DSA/                          # Data structures and algorithms
Ô—   â”â”€ Python/                      # Core Python syntax, execution, GIL
”—   â”â”€ System Design/                # Distributed systems architectures
Ô—   â”œâ”€ DBMS/                        # Database internals andÔQ
Ô—   â”â”€ src/
â””â”€   â”â”€ components/
Ô—   â””â”€   â”â”€ Common/                   # GlobalCommandPalette, GlobalScratchpad, GlobalIcons
â””â”€   â””â”€   â”â”€ ExcalidrawBoard/          # Whiteboard canvas integration
â”“â”€   â”“â”€   â”œâ”€ Tracker/                  # Tracker application (Tasks, Goals, Focus, Habits, Notebook)
Ô—   â”â”€ css/                          # Global theme tokens and typography
â”“â”€   â”œâ”€ pages,                       # Routes: /, /projects, /opensource, /tools, /board, /tracker
Ô—   â”œâ”€ theme/                         # Theme wrappers: Root.js, SearchBar/index.js
â””â”€ static/                          # Static assets and favicon
â”“â”€ supabase/                         # PostgreSQL SQL schemas and migrations
â”œâ”€ docusaurus.config.js              # Core Docusaurus site configuration
```

---

## Shortcuts Reference

| Shortcut | Action | Description |
|---|---|---|
*| `Ctrl+K` / `Cmd+K` | Spotlight Command Palette | Search and jump anywhere instantly |
| `Ctrl+H` / `Cmd+H` | Command Palette (Alt) | Secondary spotlight trigger |
| `Ctrl+J` / `Cmd+J` | Quick Scratchpad | Open slide-over markdown notepad (active in `/blogs`) |
*| `[` or `Ctrl+\` | Toggle Tracker Sidebar | Collapse or expand sidebar in Tracker |

---

## Author

Š–ardhman Gupta**  
AI Engineer Â· Systems Builder Â· Lifelong Learner  
- Website: [kaap10.github.io](https://kaap10.github.io/)  
- GitHub: [@kaap10](https://github.com/kaap10)  
- LinkedIn: [linkedin.com/in/vardhman-gupta](https://linkedin.com/in/vardhman-gupta)  

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Copy, 
  Check, 
  Star, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Database, 
  Smartphone, 
  Globe, 
  Server, 
  Bot, 
  Puzzle, 
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Code2,
  FileCode,
  FolderTree,
  Sliders,
  CircleDot,
  GitPullRequest,
  Tag,
  Filter,
  PlusCircle,
  Package
} from 'lucide-react';
import styles from './build-with-ai.module.css';

/* ==========================================================================
   Data: 7 Production Blueprints
   ========================================================================== */
const BLUEPRINTS = [
  {
    id: 'fullstack-web',
    title: 'Full-Stack Web Application',
    stepCount: 23,
    icon: Globe,
    desc: 'End-to-end modern web monolith or hybrid architecture with robust auth, relational schema, automated tests, and CI/CD.',
    techStack: ['Next.js / Vite', 'Tailwind CSS', 'Prisma / Drizzle', 'PostgreSQL', 'NextAuth', 'Stripe', 'Jest / Playwright', 'Vercel'],
    phases: [
      {
        num: 'Phase 01',
        title: 'Discovery & Schema Architecture',
        steps: 'Steps 1 to 6',
        items: ['System requirements & user journeys', 'Relational database schema modeling', 'API route contracts & status codes']
      },
      {
        num: 'Phase 02',
        title: 'Scaffolding & Authentication',
        steps: 'Steps 7 to 12',
        items: ['Project initialization & linting', 'Database migration & ORM client setup', 'Session auth & role-based middleware']
      },
      {
        num: 'Phase 03',
        title: 'Core Features & State Engine',
        steps: 'Steps 13 to 18',
        items: ['Server actions & data fetching hooks', 'Interactive UI components & forms', 'Stripe payment webhooks & billing']
      },
      {
        num: 'Phase 04',
        title: 'Testing, Hardening & CI/CD',
        steps: 'Steps 19 to 23',
        items: ['Unit tests for services & edge cases', 'End-to-end Playwright user flows', 'Production Docker & Vercel deployment']
      }
    ]
  },
  {
    id: 'saas-mvp',
    title: 'Modern SaaS MVP',
    stepCount: 15,
    icon: Sparkles,
    desc: 'High-velocity SaaS template optimized to launch in hours with Supabase auth, Stripe recurring billing, and transactional email.',
    techStack: ['Next.js 14 App Router', 'Supabase Auth', 'Supabase PostgreSQL (RLS)', 'Stripe Subscriptions', 'Resend Email', 'PostHog Analytics', 'Vercel'],
    phases: [
      {
        num: 'Phase 01',
        title: 'Architecture & Foundation',
        steps: 'Steps 1 to 4',
        items: ['Product requirements & data dictionary', 'Supabase project & Row-Level Security', 'Next.js App Router initialization']
      },
      {
        num: 'Phase 02',
        title: 'Auth & Subscription Billing',
        steps: 'Steps 5 to 8',
        items: ['Magic link / OAuth authentication flow', 'Stripe customer portal & webhooks', 'Protected member dashboards']
      },
      {
        num: 'Phase 03',
        title: 'Core SaaS Workflow',
        steps: 'Steps 9 to 12',
        items: ['Main application feature set', 'Transactional email triggers via Resend', 'Usage limits & tiered gating']
      },
      {
        num: 'Phase 04',
        title: 'Analytics & Launch',
        steps: 'Steps 13 to 15',
        items: ['PostHog telemetry integration', 'SEO metadata & social preview cards', 'Production deployment & smoke tests']
      }
    ]
  },
  {
    id: 'rest-api',
    title: 'Backend REST API Service',
    stepCount: 10,
    icon: Server,
    desc: 'Production-ready, type-safe backend microservice with request validation, JWT authentication, structured logging, and Docker containerization.',
    techStack: ['Node.js', 'Fastify / Express', 'PostgreSQL', 'Zod Validation', 'JWT Auth', 'Pino Logging', 'Docker', 'GitHub Actions'],
    phases: [
      {
        num: 'Phase 01',
        title: 'Contract & Data Modeling',
        steps: 'Steps 1 to 3',
        items: ['OpenAPI 3.0 specification & schema design', 'PostgreSQL table definitions & indexes', 'Configuration & env variable validator']
      },
      {
        num: 'Phase 02',
        title: 'Core Service Architecture',
        steps: 'Steps 4 to 7',
        items: ['Fastify server & plugin registration', 'Zod request/response validation layer', 'JWT authentication middleware & guards', 'Controller, service & repository modules']
      },
      {
        num: 'Phase 03',
        title: 'Testing & Containerization',
        steps: 'Steps 8 to 10',
        items: ['Integration test suite with supertest', 'Multi-stage Dockerfile build', 'CI pipeline for automated test execution']
      }
    ]
  },
  {
    id: 'mobile-app',
    title: 'Cross-Platform Mobile App',
    stepCount: 15,
    icon: Smartphone,
    desc: 'Modern cross-platform mobile application powered by React Native and Expo Router with native device integrations.',
    techStack: ['React Native', 'Expo Router', 'NativeWind (Tailwind)', 'SecureStore', 'TanStack Query', 'EAS Build', 'App Store / Play Store'],
    phases: [
      {
        num: 'Phase 01',
        title: 'Mobile Architecture',
        steps: 'Steps 1 to 4',
        items: ['App navigation tree & deep links', 'Expo Router file-based setup', 'NativeWind design system tokens']
      },
      {
        num: 'Phase 02',
        title: 'Authentication & Local State',
        steps: 'Steps 5 to 8',
        items: ['Biometric & SecureStore token storage', 'TanStack Query caching layer', 'Offline-first network synchronizer']
      },
      {
        num: 'Phase 03',
        title: 'Native Features & Polish',
        steps: 'Steps 9 to 12',
        items: ['Camera, haptics, and push notifications', 'Animated gesture transitions', 'Smooth dark/light theme switching']
      },
      {
        num: 'Phase 04',
        title: 'EAS Build & Store Release',
        steps: 'Steps 13 to 15',
        items: ['App icons & splash asset generation', 'EAS credentials & build configurations', 'Production submission pipeline']
      }
    ]
  },
  {
    id: 'flutter-app',
    title: 'Flutter Mobile Application',
    stepCount: 16,
    icon: Smartphone,
    desc: 'Enterprise Clean Architecture Flutter application with Riverpod/BLoC state management, robust networking, and automated CI.',
    techStack: ['Flutter 3.x', 'Dart', 'Clean Architecture', 'Riverpod / BLoC', 'Dio Client', 'Hive / SQLite', 'Fastlane CI'],
    phases: [
      {
        num: 'Phase 01',
        title: 'Domain & Architecture',
        steps: 'Steps 1 to 4',
        items: ['Domain entities & use case contracts', 'Folder structure & dependency injection', 'Theme styling & typography scales']
      },
      {
        num: 'Phase 02',
        title: 'Data & Networking Layer',
        steps: 'Steps 5 to 8',
        items: ['Dio HTTP client with auth interceptors', 'Freezed data models & JSON serialization', 'Hive local cache & offline repository']
      },
      {
        num: 'Phase 03',
        title: 'Presentation & State',
        steps: 'Steps 9 to 13',
        items: ['Riverpod state providers & listeners', 'Responsive screen layouts & custom widgets', 'Error handling & retry mechanisms']
      },
      {
        num: 'Phase 04',
        title: 'Testing & Automation',
        steps: 'Steps 14 to 16',
        items: ['Unit tests for domain use cases', 'Widget testing for key screen interactions', 'Fastlane automated release scripts']
      }
    ]
  },
  {
    id: 'chrome-ext',
    title: 'Chrome Browser Extension',
    stepCount: 12,
    icon: Puzzle,
    desc: 'Manifest V3 Chrome extension with isolated content scripts, shadow DOM UI injection, background service workers, and storage sync.',
    techStack: ['Manifest V3', 'Vite', 'React', 'Shadow DOM', 'Chrome Storage API', 'CRX Build', 'Web Store Release'],
    phases: [
      {
        num: 'Phase 01',
        title: 'Manifest & Build Config',
        steps: 'Steps 1 to 3',
        items: ['Manifest V3 permissions & host matching', 'Vite multi-entry bundling setup', 'TypeScript interfaces for messaging']
      },
      {
        num: 'Phase 02',
        title: 'Core Extension Modules',
        steps: 'Steps 4 to 8',
        items: ['Background service worker lifecycle', 'Content script DOM listeners & observers', 'Shadow DOM isolated UI container', 'Popup quick-action menu interface']
      },
      {
        num: 'Phase 03',
        title: 'Sync & Distribution',
        steps: 'Steps 9 to 12',
        items: ['Chrome Storage sync & options page', 'Cross-browser compatibility checks', 'ZIP packaging & Web Store submission']
      }
    ]
  },
  {
    id: 'ai-agent',
    title: 'AI Agent & RAG Pipeline',
    stepCount: 14,
    icon: Bot,
    desc: 'Autonomous agent and Retrieval-Augmented Generation (RAG) system with vector search, document chunking, dynamic tool execution, and streaming responses.',
    techStack: ['LangChain / LlamaIndex', 'Vector DB (Pinecone/Qdrant)', 'FastAPI / Express', 'OpenAI / Anthropic / Ollama', 'SSE Streaming UI'],
    phases: [
      {
        num: 'Phase 01',
        title: 'Pipeline Architecture',
        steps: 'Steps 1 to 4',
        items: ['Agent tools & capability specifications', 'Document ingestion & chunking strategy', 'Vector database index configuration']
      },
      {
        num: 'Phase 02',
        title: 'Embeddings & Retrieval Engine',
        steps: 'Steps 5 to 8',
        items: ['Embedding pipeline & batch indexer', 'Hybrid semantic + keyword search filter', 'Context window optimization & ranking']
      },
      {
        num: 'Phase 03',
        title: 'Tool Calling & Agent Loop',
        steps: 'Steps 9 to 12',
        items: ['Structured function calling schema', 'ReAct decision loop with fallback handlers', 'Conversation memory & session caching']
      },
      {
        num: 'Phase 04',
        title: 'API Gateway & Deployment',
        steps: 'Steps 13 to 14',
        items: ['Server-Sent Events (SSE) streaming API', 'Docker multi-stage runtime deployment']
      }
    ]
  }
];

/* ==========================================================================
   Data: 5-Stage Closed Architectural Loop
   ========================================================================== */
const ARCHITECTURAL_LOOP_STAGES = [
  {
    num: 1,
    title: 'Select Blueprint & Initialize Project',
    desc: 'Developer picks a battle-tested blueprint. The CLI initializes local-first storage inside `.buildwithai/context.json` without cloud telemetry.',
    role: 'CLI Initializer',
    payload: `$ npx build-with-ai init
? Select Blueprint: Modern SaaS MVP (15 Steps)
? Project Name: my-saas-platform
[OK] Created .buildwithai/context.json
[OK] Initialized Phase 01: Architecture & Foundation`
  },
  {
    num: 2,
    title: 'CLI Injects Memory & Generates Prompt',
    desc: 'The prompt engine pulls architectural decisions from earlier steps and constructs a complete, context-aware prompt with zero context drift.',
    role: 'Prompt Engine',
    payload: `[PHASE 01: STEP 3/15]
Target: Setup PostgreSQL schema & Row-Level Security
Injected Architectural Context:
- Framework: Next.js 14 (App Router)
- Database: Supabase PostgreSQL (RLS Enabled)
- Auth: Supabase Auth with Cookie Sessions`
  },
  {
    num: 3,
    title: 'AI Model Generates Disciplined Code',
    desc: 'The AI produces targeted, single-responsibility code, schema migrations, or configurations that strictly adhere to earlier project constraints.',
    role: 'AI Model Generation',
    payload: `// schema.prisma
model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  createdAt DateTime @default(now())
  users     User[]

  @@index([slug])
}`
  },
  {
    num: 4,
    title: 'Code Saved & Decisions Recorded',
    desc: 'Developer verifies code on disk and confirms the step in the CLI with `done`. Any new architectural choices are captured.',
    role: 'Developer Verification',
    payload: `$ npx build-with-ai done
? Did you verify the schema migration? Yes
? Record technical decisions:
  · ORM: Prisma v5
  · Primary Keys: CUID
[OK] Recorded to .buildwithai/context.json`
  },
  {
    num: 5,
    title: 'Local Memory Updated For Next Step',
    desc: 'Choices persist in `.buildwithai/context.json`. Downstream steps (e.g. Step 5: Auth Middleware) automatically inherit these values.',
    role: 'Persistent Local State',
    payload: `// .buildwithai/context.json
{
  "project": "my-saas-app",
  "template": "saas-mvp",
  "current_step": 5,
  "decisions": {
    "database": "PostgreSQL",
    "orm": "Prisma v5",
    "primary_keys": "CUID",
    "auth": "NextAuth",
    "hosting": "Vercel"
  }
}`
  }
];

/* ==========================================================================
   Data: Core Engineering Highlights
   ========================================================================== */
const ENGINEERING_HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: 'Zero API & 100% Local Privacy',
    desc: 'Requires no API keys, cloud accounts, or telemetry. All templates, progress, and architectural decisions live locally inside your project folder.'
  },
  {
    icon: Cpu,
    title: 'Dynamic Context Interpolation',
    desc: 'Uses regex template resolvers to dynamically interpolate decisions across prompts. Downstream steps always remember choices made in upstream phases.'
  },
  {
    icon: Copy,
    title: 'Cross-Platform Clipboard Sync',
    desc: 'Gracefully synchronizes generated prompts with macOS pbcopy, Linux xclip/wl-copy, and Windows clip.exe, with headless CI fallbacks.'
  },
  {
    icon: FileCode,
    title: 'Deterministic Doc Generator',
    desc: 'Automatically compiles production-ready README.md, full BUILD_LOG.md, and CONTEXT.md documentation files as you advance through project milestones.'
  },
  {
    icon: CheckCircle2,
    title: 'Non-Destructive Safety Guarantee',
    desc: 'Never deletes, overwrites, or executes destructive modifications against your source code. You remain in 100% control of file writes.'
  },
  {
    icon: Layers,
    title: 'Extensible Blueprint Engine',
    desc: 'Supports custom organizational blueprints loaded via local JSON files or HTTPS URLs, enabling engineering teams to standardize custom software workflows.'
  }
];

/* ==========================================================================
   Data: CLI Commands Reference
   ========================================================================== */
const CLI_COMMANDS = [
  { 
    cmd: 'npx build-with-ai', 
    category: 'Setup', 
    desc: 'Launches interactive setup wizard to select blueprints, models, and configure project parameters' 
  },
  { 
    cmd: 'build-with-ai next', 
    category: 'Workflow', 
    desc: 'Generates and copies the next sequential phase prompt to clipboard with interpolated context' 
  },
  { 
    cmd: 'build-with-ai status', 
    category: 'Inspection', 
    desc: 'Displays ASCII progress bar, active phase, and completed steps checklist across the project' 
  },
  { 
    cmd: 'build-with-ai done', 
    category: 'Workflow', 
    desc: 'Marks current step complete, prompts for key technical choices, and updates context.json' 
  },
  { 
    cmd: 'build-with-ai context', 
    category: 'State Store', 
    desc: 'Prints the live JSON architectural decision store and active parameters in the terminal' 
  },
  { 
    cmd: 'build-with-ai list', 
    category: 'Blueprints', 
    desc: 'Lists all 7 built-in production templates with step counts, descriptions, and prerequisites' 
  },
  { 
    cmd: 'build-with-ai export', 
    category: 'Artifacts', 
    desc: 'Generates README.md, BUILD_LOG.md, and CONTEXT.md documentation from session history' 
  }
];

/* ==========================================================================
   Data: Active Issues & Community Roadmap
   ========================================================================== */
const ACTIVE_ISSUES = [
  {
    number: 42,
    title: 'Add ESLint and automated code formatting check to CI pipeline',
    type: 'issue',
    category: 'enhancement',
    labels: [
      { name: 'ci', color: '#0e8a16' },
      { name: 'dx', color: '#0052cc' }
    ],
    desc: 'Set up a lightweight ESLint configuration and npm run lint command to enforce code quality, catch syntax issues, and verify consistent formatting in GitHub Actions CI.',
    url: 'https://github.com/Kaap10/build-with-ai/issues/42'
  },
  {
    number: 41,
    title: 'Add project progress metrics and timestamps to the status command',
    type: 'issue',
    category: 'good-first-issue',
    labels: [
      { name: 'enhancement', color: '#a2eeef' },
      { name: 'good first issue', color: '#7057ff' }
    ],
    desc: 'Enrich the status dashboard with elapsed project time calculation, last updated relative timestamps, recorded decisions count, and export readiness indicator.',
    url: 'https://github.com/Kaap10/build-with-ai/issues/41'
  },
  {
    number: 40,
    title: 'Add history inspect command to view previous step logs',
    type: 'issue',
    category: 'good-first-issue',
    labels: [
      { name: 'enhancement', color: '#a2eeef' },
      { name: 'good first issue', color: '#7057ff' }
    ],
    desc: 'Add CLI command build-with-ai history to inspect recorded AI summaries and step history files directly from terminal without opening history folder.',
    url: 'https://github.com/Kaap10/build-with-ai/issues/40'
  },
  {
    number: 39,
    title: 'Add search and json options to the list command',
    type: 'issue',
    category: 'good-first-issue',
    labels: [
      { name: 'enhancement', color: '#a2eeef' },
      { name: 'good first issue', color: '#7057ff' }
    ],
    desc: 'Improve blueprint discovery by adding keyword search filtering and machine-readable JSON array output for external automation.',
    url: 'https://github.com/Kaap10/build-with-ai/issues/39'
  },
  {
    number: 38,
    title: 'Add unit test coverage for contextBuilder dot-notation edge cases',
    type: 'issue',
    category: 'good-first-issue',
    labels: [
      { name: 'good first issue', color: '#7057ff' },
      { name: 'tests', color: '#1f6feb' }
    ],
    desc: 'Dedicated unit test suite in test-flow.js to rigorously verify getByPath, setByPath, and flattenObject against complex deeply nested structures.',
    url: 'https://github.com/Kaap10/build-with-ai/issues/38'
  },
  {
    number: 37,
    title: 'Add Python FastAPI & Microservices workflow template',
    type: 'issue',
    category: 'templates',
    labels: [
      { name: 'good first issue', color: '#7057ff' },
      { name: 'templates', color: '#5319e7' }
    ],
    desc: 'Create fastapi-backend template guiding developers through building scalable, production-grade Python backend services with FastAPI, Pydantic v2, and async SQLAlchemy.',
    url: 'https://github.com/Kaap10/build-with-ai/issues/37'
  },
  {
    number: 36,
    title: 'Implement atomic file writing for state and context persistence',
    type: 'issue',
    category: 'enhancement',
    labels: [
      { name: 'enhancement', color: '#a2eeef' },
      { name: 'reliability', color: '#fbca04' }
    ],
    desc: 'Prevent state file corruption if a terminal session is abruptly killed midway through a save by writing to a temporary file and performing an atomic rename.',
    url: 'https://github.com/Kaap10/build-with-ai/issues/36'
  },
  {
    number: 35,
    title: 'Add custom out-dir option to the export command',
    type: 'issue',
    category: 'good-first-issue',
    labels: [
      { name: 'enhancement', color: '#a2eeef' },
      { name: 'good first issue', color: '#7057ff' }
    ],
    desc: 'Allow export command to write generated project documentation (README.md, BUILD_LOG.md, and CONTEXT.md) to a custom output directory.',
    url: 'https://github.com/Kaap10/build-with-ai/issues/35'
  },
  {
    number: 34,
    title: 'Add an Electron Desktop App workflow template',
    type: 'issue',
    category: 'templates',
    labels: [
      { name: 'good first issue', color: '#7057ff' },
      { name: 'templates', color: '#5319e7' }
    ],
    desc: 'Create electron-app template covering the end-to-end SDLC for desktop applications built with Electron, React, TypeScript, and local SQLite.',
    url: 'https://github.com/Kaap10/build-with-ai/issues/34'
  },
  {
    number: 33,
    title: 'Add no-copy flag and environment variable support to next command',
    type: 'issue',
    category: 'good-first-issue',
    labels: [
      { name: 'enhancement', color: '#a2eeef' },
      { name: 'good first issue', color: '#7057ff' }
    ],
    desc: 'Allow developers running in headless, CI/CD, or SSH environments to suppress automatic clipboard copy operations via no-copy flag or environment variable.',
    url: 'https://github.com/Kaap10/build-with-ai/issues/33'
  },
  {
    number: 29,
    title: 'Feature export dry run',
    type: 'pr',
    category: 'enhancement',
    labels: [
      { name: 'pull request', color: '#8957e5' }
    ],
    desc: 'CLI export preview mode enabling developers to inspect rendered markdown output without touching disk.',
    url: 'https://github.com/Kaap10/build-with-ai/pull/29'
  },
  {
    number: 21,
    title: 'Add a Node.js version to the CI matrix',
    type: 'issue',
    category: 'good-first-issue',
    labels: [
      { name: 'good first issue', color: '#7057ff' },
      { name: 'ci', color: '#0e8a16' }
    ],
    desc: 'Expand GitHub Actions matrix across Node 18, 20, and 22 LTS releases to ensure cross-platform compatibility.',
    url: 'https://github.com/Kaap10/build-with-ai/issues/21'
  },
  {
    number: 18,
    title: 'Document non-interactive JSON usage',
    type: 'issue',
    category: 'good-first-issue',
    labels: [
      { name: 'documentation', color: '#0075ca' },
      { name: 'good first issue', color: '#7057ff' }
    ],
    desc: 'Comprehensive CLI guide and documentation for automated AI subagent and non-interactive script piping.',
    url: 'https://github.com/Kaap10/build-with-ai/issues/18'
  },
  {
    number: 17,
    title: 'Add a Discord bot workflow template',
    type: 'issue',
    category: 'templates',
    labels: [
      { name: 'good first issue', color: '#7057ff' },
      { name: 'templates', color: '#5319e7' }
    ],
    desc: 'Production-ready Discord bot template with discord.js v14, slash commands registration, and event listeners.',
    url: 'https://github.com/Kaap10/build-with-ai/issues/17'
  }
];

const ISSUE_FILTERS = [
  { id: 'all', label: 'All Issues' },
  { id: 'good-first-issue', label: 'Good First Issue' },
  { id: 'templates', label: 'Templates' },
  { id: 'enhancement', label: 'Enhancements & DX' }
];

export default function BuildWithAiPage() {
  const [activeTab, setActiveTab] = useState('fullstack-web');
  const [activeLoopStep, setActiveLoopStep] = useState(1);
  const [copiedToast, setCopiedToast] = useState('');
  const [issueFilter, setIssueFilter] = useState('all');
  
  // Terminal Simulator State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    {
      type: 'banner',
      content: `  ██████╗ ██╗   ██╗██╗██╗     ██████╗ 
  ██╔══██╗██║   ██║██║██║     ██╔══██╗
  ██████╔╝██║   ██║██║██║     ██║  ██║
  ██╔══██╗██║   ██║██║██║     ██║  ██║
  ██████╔╝╚██████╔╝██║███████╗██████╔╝
  ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ 
  build-with-ai v1.4.0 · Zero API Software Architect CLI
  Type 'help' to see commands, or 'next' to generate prompt.`
    },
    {
      type: 'text',
      content: `Active Blueprint: Modern SaaS MVP (15 Steps)\nProgress: [████████░░░░░░░░] Step 5/15 (33% Complete)\nPhase: Phase 02 · Auth & Subscription Billing`
    }
  ]);

  const terminalBodyRef = useRef(null);
  const terminalInputRef = useRef(null);

  const copyToClipboard = (text, label) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedToast(label);
      setTimeout(() => setCopiedToast(''), 3000);
    }
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newOutputs = [{ type: 'command', content: terminalInput }];

    switch (cmd) {
      case 'npx build-with-ai':
      case 'build-with-ai':
      case 'init':
        newOutputs.push({
          type: 'banner',
          content: `  build-with-ai v1.4.0
  Project: my-saas-platform
  Template: Modern SaaS MVP (15 Steps)
  Status: Initialized in .buildwithai/`
        });
        newOutputs.push({
          type: 'success',
          content: `[OK] Loaded .buildwithai/context.json\n[OK] Phase 01 completed (Steps 1 to 4)\nNext Step: Step 5 · Supabase Auth & Session Middleware`
        });
        break;

      case 'next':
        newOutputs.push({
          type: 'step_prompt',
          header: 'STEP 5 / 15: Supabase Auth & Role-Based Middleware',
          prompt: `[PHASE 02: AUTH & BILLING - STEP 5/15]
Target: Setup Supabase Auth with PKCE flow and Next.js middleware
Injected Architectural Context:
- Framework: Next.js 14 (App Router)
- Database: Supabase PostgreSQL (RLS Enabled)
- Auth Strategy: Supabase Auth with Cookie Sessions

Instructions:
1. Create utils/supabase/server.ts and utils/supabase/client.ts using @supabase/ssr.
2. Implement middleware.ts to refresh session tokens and protect /dashboard routes.
3. Handle OAuth redirects cleanly in app/auth/callback/route.ts.`
        });
        break;

      case 'status':
        newOutputs.push({
          type: 'text',
          content: `Project: my-saas-platform
Blueprint: Modern SaaS MVP (15 Steps)
Progress: [████████░░░░░░░░] Step 5 of 15 (33% Complete)

Phases Overview:
[OK] Phase 01: Architecture & Foundation (Steps 1 to 4)
[>>] Phase 02: Auth & Subscription Billing (Steps 5 to 8) - ACTIVE
[  ] Phase 03: Core SaaS Workflow (Steps 9 to 12)
[  ] Phase 04: Analytics & Launch (Steps 13 to 15)`
        });
        break;

      case 'context':
        newOutputs.push({
          type: 'text',
          content: JSON.stringify({
            "$schema": "https://build-with-ai.dev/schemas/context.v1.json",
            "project_name": "my-saas-platform",
            "blueprint": "saas-mvp",
            "current_step": 5,
            "decisions": {
              "framework": "Next.js 14 (App Router)",
              "language": "TypeScript",
              "database": "Supabase PostgreSQL",
              "rls_enabled": true,
              "auth": "Supabase SSR Auth",
              "styling": "Tailwind CSS",
              "billing": "Stripe Subscriptions",
              "email": "Resend API",
              "deployment": "Vercel"
            }
          }, null, 2)
        });
        break;

      case 'list':
      case 'blueprints':
      case 'templates':
        newOutputs.push({
          type: 'text',
          content: `Available Production Blueprints:
1. fullstack-web  · Full-Stack Web Application (23 Steps)
2. saas-mvp       · Modern SaaS MVP (15 Steps) [ACTIVE]
3. rest-api       · Backend REST API Service (10 Steps)
4. mobile-app     · React Native & Expo Mobile App (15 Steps)
5. flutter-app    · Clean Architecture Flutter App (16 Steps)
6. chrome-ext     · Manifest V3 Chrome Extension (12 Steps)
7. ai-agent       · AI Agent & RAG Vector Pipeline (14 Steps)

Run 'build-with-ai template <name>' to switch.`
        });
        break;

      case 'done':
        newOutputs.push({
          type: 'success',
          content: `[OK] Step 5 marked as completed!\n[OK] Decisions saved to .buildwithai/context.json\n[OK] Advanced to Step 6: Stripe Customer Portal & Webhook Engine.\nRun 'next' to generate the Step 6 prompt.`
        });
        break;

      case 'export':
        newOutputs.push({
          type: 'success',
          content: `[OK] Generated docs/README.md\n[OK] Generated docs/BUILD_LOG.md (5 completed steps with audit trails)\n[OK] Generated docs/CONTEXT.md (live technical decision store)`
        });
        break;

      case 'help':
        newOutputs.push({
          type: 'text',
          content: `build-with-ai CLI Commands:
  next      · Generate and copy next phase prompt to clipboard
  status    · View progress bar and completed steps checklist
  context   · Inspect .buildwithai/context.json technical choices
  done      · Mark current step complete and record decisions
  list      · Display all 7 production workflow blueprints
  export    · Export README, BUILD_LOG, and CONTEXT documentation
  clear     · Clear terminal history buffer`
        });
        break;

      case 'clear':
      case 'cls':
        setTerminalHistory([]);
        setTerminalInput('');
        return;

      default:
        newOutputs.push({
          type: 'text',
          content: `command not recognized: '${cmd}'. Type 'help' to see available commands.`
        });
        break;
    }

    setTerminalHistory(prev => [...prev, ...newOutputs]);
    setTerminalInput('');
  };

  const activeBlueprintData = BLUEPRINTS.find(b => b.id === activeTab) || BLUEPRINTS[0];
  const activeLoopData = ARCHITECTURAL_LOOP_STAGES.find(s => s.num === activeLoopStep) || ARCHITECTURAL_LOOP_STAGES[0];

  const filteredIssues = useMemo(() => {
    if (issueFilter === 'all') return ACTIVE_ISSUES;
    if (issueFilter === 'good-first-issue') return ACTIVE_ISSUES.filter(i => i.labels.some(l => l.name === 'good first issue'));
    if (issueFilter === 'templates') return ACTIVE_ISSUES.filter(i => i.category === 'templates' || i.labels.some(l => l.name === 'templates'));
    if (issueFilter === 'enhancement') return ACTIVE_ISSUES.filter(i => i.category === 'enhancement' || i.labels.some(l => l.name === 'enhancement' || l.name === 'dx'));
    return ACTIVE_ISSUES;
  }, [issueFilter]);

  const filterCounts = useMemo(() => {
    return {
      'all': ACTIVE_ISSUES.length,
      'good-first-issue': ACTIVE_ISSUES.filter(i => i.labels.some(l => l.name === 'good first issue')).length,
      'templates': ACTIVE_ISSUES.filter(i => i.category === 'templates' || i.labels.some(l => l.name === 'templates')).length,
      'enhancement': ACTIVE_ISSUES.filter(i => i.category === 'enhancement' || i.labels.some(l => l.name === 'enhancement' || l.name === 'dx')).length
    };
  }, []);

  return (
    <Layout
      title="build-with-ai | Zero-API Software Architect CLI"
      description="The Zero-API Software Architect CLI for building full-stack applications with any AI assistant. Open source, local-first memory, and non-destructive."
    >
      <main className={styles.pageContainer}>
        {/* Background Atmospheric Glows */}
        <div className={styles.bgGlowWrapper} aria-hidden="true">
          <div className={styles.heroGlowTop} />
          <div className={styles.heroGlowSecondary} />
          <div className={styles.gridOverlay} />
        </div>

        <div className={styles.contentWrapper}>
          
          {/* =================================================================
             1. Hero Section
             ================================================================= */}
          <section className={styles.heroSection}>
            <div className={styles.badgeRow}>
              <a 
                href="https://www.npmjs.com/package/build-with-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.npmBadge}
                title="View build-with-ai on npm (626 downloads)"
              >
                <span className={styles.badgeDot} />
                <Package size={14} />
                <span>npm: build-with-ai</span>
                <span className={styles.downloadsBadgePill}>626 downloads</span>
                <ExternalLink size={12} className={styles.badgeExtIcon} />
              </a>
              <span className={styles.licenseBadge}>
                <ShieldCheck size={13} />
                <span>Apache 2.0 Open Source</span>
              </span>
            </div>

            <h1 className={styles.heroHeadline}>
              Build full-stack software with any AI.<br />
              <span className={styles.gradientText}>Disciplined, deterministic, zero context drift.</span>
            </h1>

            <p className={styles.heroSubheadline}>
              A local-first CLI orchestrator that generates context-aware prompts, preserves architectural memory, and eliminates AI drift with zero API keys.
            </p>

            <div className={styles.ctaGroup}>
              <button 
                type="button" 
                className={styles.copyCommandBtn}
                onClick={() => copyToClipboard('npx build-with-ai', 'Copied "npx build-with-ai" to clipboard!')}
                title="Click to copy command"
              >
                <span className={styles.promptSymbol}>$</span>
                <span>npx build-with-ai</span>
                <span className={styles.copyIconWrap}>
                  <Copy size={15} />
                </span>
              </button>

              <a 
                href="https://github.com/Kaap10/build-with-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <span>View on GitHub</span>
                <span className={styles.starPill}>
                  <Star size={12} fill="currentColor" />
                  <span>Star</span>
                </span>
                <ArrowRight size={15} />
              </a>

              <a 
                href="https://www.npmjs.com/package/build-with-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.secondaryBtn}
                title="View on npm registry"
              >
                <Package size={15} />
                <span>npm Package</span>
              </a>
            </div>

            {/* Key Credibility Metrics Ticker */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>626+</div>
                <div className={styles.metricLabel}>NPM Package Downloads</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>Zero API</div>
                <div className={styles.metricLabel}>100% Local and Free</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>7 Blueprints</div>
                <div className={styles.metricLabel}>Production Workflows</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>100% CI</div>
                <div className={styles.metricLabel}>Ubuntu, macOS and Windows</div>
              </div>
            </div>
          </section>

          {/* =================================================================
             2. Interactive Terminal Simulator
             ================================================================= */}
          <section className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Interactive Simulation</span>
              <h2 className={styles.sectionTitle}>Test Drive the CLI in Your Browser</h2>
              <p className={styles.sectionSubtitle}>
                Experience how build-with-ai guides your project step by step without requiring API keys or cloud dependencies.
              </p>
            </div>

            <div className={styles.terminalSimulatorCard}>
              <div className={styles.terminalTopBar}>
                <div className={styles.windowDots}>
                  <div className={`${styles.dot} ${styles.dotRed}`} />
                  <div className={`${styles.dot} ${styles.dotYellow}`} />
                  <div className={`${styles.dot} ${styles.dotGreen}`} />
                </div>
                <div className={styles.terminalTitle}>
                  <Terminal size={13} />
                  <span>build-with-ai · bash · 80x24</span>
                </div>
                <div className={styles.terminalActions}>
                  <button 
                    type="button" 
                    className={styles.terminalClearBtn}
                    onClick={() => setTerminalHistory([])}
                    title="Clear terminal"
                  >
                    <RotateCcw size={12} />
                    <span>Clear</span>
                  </button>
                </div>
              </div>

              {/* Terminal Body Screen */}
              <div className={styles.terminalBody} ref={terminalBodyRef}>
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className={styles.terminalOutputLine}>
                    {item.type === 'banner' && (
                      <pre className={styles.cliOutputBanner}>{item.content}</pre>
                    )}
                    
                    {item.type === 'text' && (
                      <div className={styles.cliOutputText}>
                        {item.content}
                      </div>
                    )}

                    {item.type === 'command' && (
                      <div className={styles.cliPromptEcho}>
                        <span className={styles.cliPromptSign}>$</span>
                        <span>{item.content}</span>
                      </div>
                    )}

                    {item.type === 'success' && (
                      <div className={styles.cliOutputSuccess}>
                        {item.content}
                      </div>
                    )}

                    {item.type === 'step_prompt' && (
                      <div className={styles.cliOutputStepPrompt}>
                        <div className={styles.cliOutputHeader}>
                          <span>{item.header}</span>
                          <button 
                            type="button"
                            className={styles.copyStepInlineBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(item.prompt, 'Copied Step Prompt!');
                            }}
                          >
                            <Copy size={11} />
                            <span>Copy Prompt</span>
                          </button>
                        </div>
                        <pre className={styles.stepPromptPre}>
                          {item.prompt}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}

                {/* Input line */}
                <form onSubmit={handleTerminalSubmit} className={styles.terminalInputRow}>
                  <span className={styles.cliPromptSign}>$</span>
                  <input
                    ref={terminalInputRef}
                    type="text"
                    className={styles.terminalInput}
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type command: 'next', 'status', 'context', 'list', 'help'..."
                    spellCheck="false"
                    autoComplete="off"
                  />
                </form>
              </div>

              {/* Quick Command Chips */}
              <div className={styles.quickCommandBar}>
                <span className={styles.quickLabel}>Try:</span>
                <button type="button" className={styles.cmdChip} onClick={() => { setTerminalInput('next'); }}>next</button>
                <button type="button" className={styles.cmdChip} onClick={() => { setTerminalInput('status'); }}>status</button>
                <button type="button" className={styles.cmdChip} onClick={() => { setTerminalInput('context'); }}>context</button>
                <button type="button" className={styles.cmdChip} onClick={() => { setTerminalInput('list'); }}>list</button>
                <button type="button" className={styles.cmdChip} onClick={() => { setTerminalInput('done'); }}>done</button>
                <button type="button" className={styles.cmdChip} onClick={() => { setTerminalInput('export'); }}>export</button>
                <button type="button" className={styles.cmdChip} onClick={() => { setTerminalInput('help'); }}>help</button>
              </div>
            </div>
          </section>

          {/* =================================================================
             3. The 5-Stage Closed Architectural Loop
             ================================================================= */}
          <section className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>System Architecture</span>
              <h2 className={styles.sectionTitle}>The 5-Stage Closed Engineering Loop</h2>
              <p className={styles.sectionSubtitle}>
                How build-with-ai preserves state across multiple chat sessions and prevents the AI from forgetting earlier architectural decisions.
              </p>
            </div>

            <div className={styles.loopFlowContainer}>
              {/* Timeline Steps */}
              <div className={styles.stepsTimeline}>
                {ARCHITECTURAL_LOOP_STAGES.map((s) => (
                  <div 
                    key={s.num}
                    className={`${styles.flowStepCard} ${activeLoopStep === s.num ? styles.flowStepCardActive : ''}`}
                    onClick={() => setActiveLoopStep(s.num)}
                  >
                    <div className={styles.flowStepNum}>{s.num}</div>
                    <div className={styles.flowStepContent}>
                      <div className={styles.flowStepTitle}>{s.title}</div>
                      <div className={styles.flowStepDesc}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detail Card for Active Stage */}
              <div className={styles.flowDetailCard}>
                <div>
                  <div className={styles.flowDetailHeader}>
                    <div className={styles.flowDetailTitle}>
                      <Code2 size={18} color="#FF4D4F" />
                      <span>Stage {activeLoopData.num}: {activeLoopData.role}</span>
                    </div>
                    <span className={`${styles.sideBadge} ${styles.activeStageBadge}`}>
                      Active Stage
                    </span>
                  </div>

                  <p className={styles.flowDetailDesc}>
                    {activeLoopData.desc}
                  </p>
                </div>

                <div>
                  <div className={styles.flowPayloadLabel}>
                    Payload / Contract Data:
                  </div>
                  <pre className={styles.codePayload}>
                    {activeLoopData.payload}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
             4. 7 Production Workflow Blueprints (Tabbed Showcase)
             ================================================================= */}
          <section id="blueprints" className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Production Templates</span>
              <h2 className={styles.sectionTitle}>7 Built-in Architectural Blueprints</h2>
              <p className={styles.sectionSubtitle}>
                Battle-tested phased workflows for full-stack apps, SaaS MVPs, REST APIs, mobile apps, extensions, and AI pipelines.
              </p>
            </div>

            <div className={styles.blueprintsContainer}>
              {/* Tab Selector */}
              <div className={styles.blueprintTabs}>
                {BLUEPRINTS.map((b) => {
                  const TabIcon = b.icon;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      className={`${styles.tabBtn} ${activeTab === b.id ? styles.tabBtnActive : ''}`}
                      onClick={() => setActiveTab(b.id)}
                    >
                      <TabIcon size={16} />
                      <span>{b.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Blueprint Display */}
              <div className={styles.blueprintDisplayCard}>
                <div className={styles.blueprintTop}>
                  <div className={styles.blueprintHeading}>
                    <div className={styles.blueprintTitleRow}>
                      <h3 className={styles.blueprintTitle}>{activeBlueprintData.title}</h3>
                      <span className={styles.stepBadge}>
                        <CheckCircle2 size={13} />
                        <span>{activeBlueprintData.stepCount} Phased Steps</span>
                      </span>
                    </div>
                    <p className={styles.blueprintDesc}>{activeBlueprintData.desc}</p>
                  </div>

                  <div className={styles.techStackWrap}>
                    {activeBlueprintData.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Phases Breakdown Grid */}
                <div className={styles.phasesGrid}>
                  {activeBlueprintData.phases.map((phase, pIdx) => (
                    <div key={pIdx} className={styles.phaseCard}>
                      <div className={styles.phaseHeader}>
                        <span className={styles.phaseNum}>{phase.num}</span>
                        <span className={styles.phaseStepCount}>{phase.steps}</span>
                      </div>
                      <div className={styles.phaseTitle}>{phase.title}</div>
                      <ul className={styles.phaseStepsList}>
                        {phase.items.map((item, iIdx) => (
                          <li key={iIdx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
             5. Dynamic Context Interpolation Visualizer
             ================================================================= */}
          <section className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Prompt Intelligence</span>
              <h2 className={styles.sectionTitle}>Dynamic Context Interpolation Engine</h2>
              <p className={styles.sectionSubtitle}>
                See how build-with-ai substitutes template placeholders with concrete architectural decisions stored in context.json.
              </p>
            </div>

            <div className={styles.interpolatorCard}>
              {/* Raw Template */}
              <div className={styles.interpolatorSide}>
                <div className={styles.sideHeader}>
                  <span className={styles.sideTitle}>Raw Prompt Template (blueprint.json)</span>
                  <span className={`${styles.sideBadge} ${styles.badgeRaw}`}>Template Tokens</span>
                </div>
                <div className={styles.promptPreviewBox}>
                  <code>
                    Target: Generate Data Access &amp; API Routes<br /><br />
                    Database Provider: <span className={styles.highlightVar}>{"{{decisions.database}}"}</span><br />
                    ORM / Query Engine: <span className={styles.highlightVar}>{"{{decisions.orm}}"}</span><br />
                    Authentication Layer: <span className={styles.highlightVar}>{"{{decisions.auth}}"}</span><br />
                    Frontend Framework: <span className={styles.highlightVar}>{"{{decisions.framework}}"}</span><br /><br />
                    Generate CRUD handlers with error schemas and validate session permissions using <span className={styles.highlightVar}>{"{{decisions.auth}}"}</span>.
                  </code>
                </div>
              </div>

              {/* Resolved Prompt */}
              <div className={styles.interpolatorSide}>
                <div className={styles.sideHeader}>
                  <span className={styles.sideTitle}>Resolved Prompt (Sent to AI)</span>
                  <span className={`${styles.sideBadge} ${styles.badgeResolved}`}>Auto-Injected</span>
                </div>
                <div className={styles.promptPreviewBox}>
                  <code>
                    Target: Generate Data Access &amp; API Routes<br /><br />
                    Database Provider: <span className={styles.highlightVal}>Supabase PostgreSQL</span><br />
                    ORM / Query Engine: <span className={styles.highlightVal}>Prisma v5 (CUID Keys)</span><br />
                    Authentication Layer: <span className={styles.highlightVal}>Supabase SSR Auth</span><br />
                    Frontend Framework: <span className={styles.highlightVal}>Next.js 14 App Router</span><br /><br />
                    Generate CRUD handlers with error schemas and validate session permissions using <span className={styles.highlightVal}>Supabase SSR Auth</span>.
                  </code>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
             6. Core Engineering Highlights
             ================================================================= */}
          <section className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Core Engineering</span>
              <h2 className={styles.sectionTitle}>Engineered for Developers Who Value Quality</h2>
              <p className={styles.sectionSubtitle}>
                Built from the ground up with local-first reliability, complete data sovereignty, and deterministic output.
              </p>
            </div>

            <div className={styles.highlightsGrid}>
              {ENGINEERING_HIGHLIGHTS.map((h, idx) => {
                const HighlightIcon = h.icon;
                return (
                  <div key={idx} className={styles.featureCard}>
                    <div className={styles.featureIconWrap}>
                      <HighlightIcon size={20} />
                    </div>
                    <h3 className={styles.featureCardTitle}>{h.title}</h3>
                    <p className={styles.featureCardDesc}>{h.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* =================================================================
             7. CLI Commands Reference Table
             ================================================================= */}
          <section className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>CLI Reference</span>
              <h2 className={styles.sectionTitle}>Command-Line Interface</h2>
              <p className={styles.sectionSubtitle}>
                A clean, intuitive command set designed to fit into any modern developer terminal.
              </p>
            </div>

            <div className={styles.cliRefContainer}>
              <div className={styles.cliRefHeader}>
                <div className={styles.cliRefHeaderTitle}>
                  <Terminal size={15} color="#FF4D4F" />
                  <span>Standard CLI Command Set</span>
                </div>
                <div className={styles.cliRefHeaderHint}>
                  Run from any project root
                </div>
              </div>

              <div className={styles.cliRowsList}>
                {CLI_COMMANDS.map((c, idx) => (
                  <div key={idx} className={styles.cliRowItem}>
                    <div className={styles.cliCmdBox}>
                      <span className={styles.promptSymbol}>$</span>
                      <span>{c.cmd}</span>
                    </div>

                    <div>
                      <span className={styles.cliCategoryBadge}>{c.category}</span>
                    </div>

                    <p className={styles.cliDescText}>{c.desc}</p>

                    <button
                      type="button"
                      className={styles.cliCopyBtn}
                      onClick={() => copyToClipboard(c.cmd, `Copied "${c.cmd}" to clipboard!`)}
                      title={`Copy ${c.cmd}`}
                    >
                      <Copy size={12} />
                      <span>Copy</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================================
             8. Active Issues & Community Roadmap
             ================================================================= */}
          <section className={styles.sectionBlock}>
            <div className={styles.issuesHeaderWrap}>
              <div>
                <span className={styles.sectionEyebrow}>Open Source Roadmap</span>
                <h2 className={styles.sectionTitle}>Active Issues &amp; Contributions</h2>
                <p className={styles.sectionSubtitle}>
                  Help shape the future of build-with-ai. Pick a good first issue, propose new templates, or contribute core features.
                </p>
              </div>

              <div className={styles.issuesFilterBar}>
                {ISSUE_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`${styles.issueFilterBtn} ${issueFilter === f.id ? styles.issueFilterBtnActive : ''}`}
                    onClick={() => setIssueFilter(f.id)}
                  >
                    <span>{f.label}</span>
                    <span className={styles.issueFilterCount}>{filterCounts[f.id] || 0}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.issuesGrid}>
              {filteredIssues.map((issue) => {
                const isPR = issue.type === 'pr';
                return (
                  <a
                    key={issue.number}
                    href={issue.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.issueCard}
                  >
                    <div className={styles.issueCardHeader}>
                      <span className={styles.issueNumberBadge}>
                        {isPR ? (
                          <GitPullRequest size={15} className={styles.prTypeIcon} />
                        ) : (
                          <CircleDot size={15} className={styles.issueTypeIcon} />
                        )}
                        <span>#{issue.number}</span>
                      </span>

                      <ExternalLink size={15} className={styles.issueExternalIcon} />
                    </div>

                    <h3 className={styles.issueCardTitle}>{issue.title}</h3>
                    <p className={styles.issueCardDesc}>{issue.desc}</p>

                    <div className={styles.issueLabelsList}>
                      {issue.labels.map((l, lIdx) => {
                        const tagColor = l.color === '#a2eeef' ? '#7EE7F0' : (l.color === '#fbca04' ? '#FDE047' : l.color);
                        return (
                          <span
                            key={lIdx}
                            className={styles.issueLabelTag}
                            style={{
                              borderColor: `${l.color}50`,
                              backgroundColor: `${l.color}15`,
                              color: tagColor
                            }}
                          >
                            {l.name}
                          </span>
                        );
                      })}
                    </div>
                  </a>
                );
              })}
            </div>

            <div className={styles.issuesFooterActions}>
              <div className={styles.issuesCountSummary}>
                <span>Showing</span>
                <span className={styles.issuesCountHighlight}>{filteredIssues.length}</span>
                <span>of</span>
                <span className={styles.issuesCountHighlight}>{ACTIVE_ISSUES.length}</span>
                <span>active roadmap items</span>
              </div>

              <div className={styles.issuesActionBtns}>
                <a
                  href="https://github.com/Kaap10/build-with-ai/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.copyCommandBtn}
                >
                  <PlusCircle size={15} />
                  <span>Submit New Issue</span>
                </a>

                <a
                  href="https://github.com/Kaap10/build-with-ai/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryBtn}
                >
                  <span>View All on GitHub</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </section>

          {/* =================================================================
             9. Bottom CTA Card & Creator Credits
             ================================================================= */}
          <section className={styles.sectionBlock}>
            <div className={styles.bottomCtaCard}>
              <h2 className={styles.bottomCtaTitle}>Ready to build your next project with AI?</h2>
              <p className={styles.bottomCtaDesc}>
                No credit card, no sign-ups, no API keys. Run a single command in your terminal and start engineering with discipline.
              </p>

              <div className={styles.ctaGroup}>
                <button 
                  type="button" 
                  className={styles.copyCommandBtn}
                  onClick={() => copyToClipboard('npx build-with-ai', 'Copied "npx build-with-ai" to clipboard!')}
                >
                  <span className={styles.promptSymbol}>$</span>
                  <span>npx build-with-ai</span>
                  <span className={styles.copyIconWrap}>
                    <Copy size={15} />
                  </span>
                </button>

                <a 
                  href="https://github.com/Kaap10/build-with-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.primaryBtn}
                >
                  <span>View Repository</span>
                  <ExternalLink size={15} />
                </a>

                <a 
                  href="https://www.npmjs.com/package/build-with-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.secondaryBtn}
                  title="View build-with-ai on npm"
                >
                  <Package size={15} />
                  <span>NPM Package</span>
                </a>
              </div>

              <div className={styles.creatorCredits}>
                <span>Created &amp; Maintained by</span>
                <a href="https://github.com/Kaap10" target="_blank" rel="noopener noreferrer" className={styles.creatorLink}>
                  Vardhman Gupta (Kaap10)
                </a>
                <span>·</span>
                <a href="https://www.npmjs.com/package/build-with-ai" target="_blank" rel="noopener noreferrer" className={styles.creatorLink}>
                  npm: build-with-ai
                </a>
                <span>· Apache 2.0 Open Source</span>
              </div>
            </div>
          </section>

        </div>

        {/* Global Toast Notification */}
        {copiedToast && (
          <div className={styles.toastNotification}>
            <Check size={16} color="#4ADE80" />
            <span>{copiedToast}</span>
          </div>
        )}
      </main>
    </Layout>
  );
}

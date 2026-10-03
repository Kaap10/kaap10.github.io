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
  { id: 'web-app', title: 'Full-Stack Web Application', stepCount: 23, icon: Globe, desc: 'End-to-end modern web monolith or hybrid architecture with robust auth, relational schema, automated tests, and CI/CD.', techStack: ['Next.js / React', 'Tailwind CSS', 'Prisma ORM', 'PostgreSQL'], phases: [] },
  { id: 'saas-mvp', title: 'Modern SaaS MVP', stepCount: 15, icon: Sparkles, desc: 'High-velocity SaaS template optimized to launch in hours with Supabase auth, Stripe recurring billing, and transactional email.', techStack: ['Next.js 14 App Router', 'Supabase', 'Stripe', 'Resend Email'], phases: [] },
  { id: 'rest-api', title: 'Backend REST API Service', stepCount: 10, icon: Server, desc: 'Production-ready, type-safe backend microservice with request validation, JWT authentication, structured logging, and Docker containerization.', techStack: ['Node.js', 'Fastify / Express', 'PostgreSQL', 'Zod'], phases: [] },
  { id: 'fastapi-backend', title: 'Python FastAPI Microservices', stepCount: 12, icon: Server, desc: 'Scalable Python backend services with FastAPI, Pydantic v2, and async SQLAlchemy.', techStack: ['Python 3.11+', 'FastAPI', 'Pydantic v2', 'Async SQLAlchemy 2.0', 'Alembic'], phases: [] },
  { id: 'mobile-app', title: 'Cross-Platform Mobile App', stepCount: 15, icon: Smartphone, desc: 'Modern cross-platform mobile application powered by React Native and Expo Router with native device integrations.', techStack: ['React Native', 'Expo Router', 'NativeWind', 'EAS Build'], phases: [] },
  { id: 'flutter-app', title: 'Flutter Mobile Application', stepCount: 16, icon: Smartphone, desc: 'Enterprise Clean Architecture Flutter application with Riverpod/BLoC state management, robust networking, and automated CI.', techStack: ['Flutter 3.x', 'Dart', 'Riverpod / BLoC', 'Clean Architecture'], phases: [] },
  { id: 'electron-app', title: 'Electron Desktop Application', stepCount: 12, icon: Layers, desc: 'End-to-end SDLC for desktop applications built with Electron, React, TypeScript, and local SQLite.', techStack: ['Electron', 'Vite', 'React', 'IPC Handlers', 'electron-builder'], phases: [] },
  { id: 'chrome-extension', title: 'Chrome Browser Extension', stepCount: 12, icon: Puzzle, desc: 'Manifest V3 Chrome extension with isolated content scripts, shadow DOM UI injection, background service workers, and storage sync.', techStack: ['Manifest V3', 'Vite', 'React', 'Shadow DOM'], phases: [] },
  { id: 'ai-agent', title: 'AI Agent & RAG Pipeline', stepCount: 14, icon: Bot, desc: 'Autonomous agent and Retrieval-Augmented Generation (RAG) system with vector search, document chunking, dynamic tool execution, and streaming responses.', techStack: ['LangChain / LlamaIndex', 'Vector DB', 'FastAPI / Express'], phases: [] },
  { id: 'ai-orchestration', title: 'AI Orchestration & Multi-Agent', stepCount: 14, icon: Bot, desc: 'Complex AI orchestration workflows for multi-agent autonomous systems.', techStack: ['LangGraph / CrewAI', 'AutoGen', 'Vector DB', 'Telemetry'], phases: [] },
  { id: 'discord-bot', title: 'Discord Bot Workflow', stepCount: 12, icon: Terminal, desc: 'Production-ready Discord bot template with discord.js v14, slash commands registration, and event listeners.', techStack: ['Node.js', 'discord.js v14', 'Slash Commands', 'SQLite / PostgreSQL'], phases: [] }
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
  { cmd: 'npx build-with-ai', category: 'Setup', desc: 'Interactive launcher displaying active status or starting initialization.' },
  { cmd: 'npx build-with-ai init', category: 'Setup', desc: 'Start setup wizard (template selection, experience level, project concept).' },
  { cmd: 'npx build-with-ai init --template <path|url>', category: 'Setup', desc: 'Load a custom template from a local file path or remote HTTPS URL.' },
  { cmd: 'npx build-with-ai next', category: 'Workflow', desc: 'Generate and copy the prompt for the current step.' },
  { cmd: 'npx build-with-ai next --no-copy', category: 'Workflow', desc: 'Generate the step prompt without accessing the system clipboard.' },
  { cmd: 'npx build-with-ai next --raw', category: 'Workflow', desc: 'Output only the raw prompt string for scripting and CLI piping.' },
  { cmd: 'npx build-with-ai next --json', category: 'Workflow', desc: 'Output complete step metadata as structured JSON.' },
  { cmd: 'npx build-with-ai done', category: 'Workflow', desc: 'Record decisions, archive step logs, and advance to the next step.' },
  { cmd: 'npx build-with-ai back', category: 'Workflow', desc: 'Step back to the previous step without removing recorded context.' },
  { cmd: 'npx build-with-ai jump [step]', category: 'Workflow', desc: 'Navigate directly to a specific step number.' },
  { cmd: 'npx build-with-ai context [key]', category: 'State Store', desc: 'Inspect recorded decisions or retrieve a specific dot-notation path.' },
  { cmd: 'npx build-with-ai set <key> <value>', category: 'State Store', desc: 'Update a decision in context.json from the command line.' },
  { cmd: 'npx build-with-ai status [--json]', category: 'Inspection', desc: 'Display project progress bar, step list, and recorded decisions.' },
  { cmd: 'npx build-with-ai history [step] [--json]', category: 'Inspection', desc: 'Display archived AI responses and step logs.' },
  { cmd: 'npx build-with-ai resume', category: 'Inspection', desc: 'Overview dashboard summarizing active step and next action.' },
  { cmd: 'npx build-with-ai export [--out-dir <dir>]', category: 'Artifacts', desc: 'Generate README.md, BUILD_LOG.md, and CONTEXT.md.' },
  { cmd: 'npx build-with-ai list [-s <query>] [--json]', category: 'Blueprints', desc: 'List and search available templates with step counts.' },
  { cmd: 'npx build-with-ai reset', category: 'Maintenance', desc: 'Remove .buildwithai/ state while leaving project source code intact.' }
];



export default function BuildWithAiPage() {
  const [activeTab, setActiveTab] = useState('fullstack-web');
  const [activeLoopStep, setActiveLoopStep] = useState(1);
  const [copiedToast, setCopiedToast] = useState('');
  
  
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
  list      · Display all 11 production workflow blueprints
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
              <h2 className={styles.sectionTitle}>11 Built-in Architectural Blueprints</h2>
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
                  {activeBlueprintData.phases && activeBlueprintData.phases.map((phase, pIdx) => (
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

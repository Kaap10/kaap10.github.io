import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
  ArrowLeft,
  ArrowUpRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Terminal, 
  Gauge,
  Cpu,
  ShieldCheck,
  Package,
  Sparkles,
  Globe,
  Users,
  Download,
  GitFork,
  ArrowRight,
  Code
} from 'lucide-react';
import styles from './dynavec.module.css';
import openStyles from '../opensource.module.css';

const IconGithub = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const PICADOLABS_PROJECTS = [
  // 01. build-with-ai
  {
    id: 'build-with-ai',
    index: '01',
    roleTag: 'Founder & Maintainer',
    icon: Terminal,
    title: 'build-with-ai',
    headline: 'Zero-API Developer CLI & AI Workflow Engine',
    cardDescription:
      'Open-source developer CLI guiding engineers through structured development phases with zero-API overhead and persistent local context across any AI model.',
    license: 'Apache 2.0',
    downloads: '1.2k+ Downloads',
    contributors: '24 Contributors',
    releases: 'v1.4.0 (3 Releases)',
    forks: '24 Forks',
    installCmd: 'npm install -g build-with-ai',
    packageUrl: 'https://www.npmjs.com/package/build-with-ai',
    packageType: 'npm',
    techStack: ['Node.js', 'JavaScript', 'CLI Engine', 'MCP Server', 'Prompt Engineering'],
    highlights: [
      {
        label: 'Local-First Memory',
        text: 'Preserves architectural choices across sessions (.buildwithai/context.json) to eliminate AI context drift.'
      },
      {
        label: 'Workflow Blueprints',
        text: '11 production templates spanning SaaS MVPs, REST APIs, FastAPI, Expo, Electron, Discord Bots, AI Agents/RAG, and Chrome extensions.'
      },
      {
        label: 'Interpolation Engine',
        text: 'Dynamic prompt variable injection with strict prerequisite checks and automated clipboard sync.'
      }
    ],
    github: 'https://github.com/PicadoLabs/build-with-ai',
    npm: 'https://www.npmjs.com/package/build-with-ai',
    showcaseUrl: '/build-with-ai',
    tags: ['Open Source', 'Node.js', 'CLI', 'Developer Tools', 'AI'],
    details: {
      description:
        'build-with-ai is an open-source, zero-API developer CLI that guides engineers through structured, end-to-end software development phases using any AI model (ChatGPT, Claude, Cursor, Gemini, local LLMs).\n\nIt features a local-first memory architecture (.buildwithai/context.json) that preserves technical choices across sessions and dynamically injects dependencies to eliminate AI context drift and hallucinations.\n\nThe system includes an extensible prompt interpolation engine with prerequisite validation (requires/writes), automated clipboard synchronization, and deterministic documentation generation (README, BUILD_LOG, CONTEXT.md).\n\nShipped with 11 production workflow templates spanning SaaS MVPs, REST APIs, FastAPI, React Native (Expo), Electron, Discord Bots, AI Agent & RAG Pipelines, and Chrome Extensions, with custom JSON/HTTPS template loading support. Published as an open-source npm package (npx build-with-ai) with 100% test coverage, a multi-OS CI pipeline (Ubuntu, macOS, Windows), and zero external cloud or telemetry dependencies.',
      allTech: ['Node.js', 'JavaScript', 'CLI', 'JSON', 'Markdown', 'Git', 'Prompt Engineering', 'MCP'],
      fullHighlights: [
        'Built an open-source, zero-API developer CLI that guides engineers through structured, end-to-end software development phases using any AI model (ChatGPT, Claude, Cursor, Gemini, local LLMs)',
        'Designed a local-first memory architecture (.buildwithai/context.json) that preserves technical choices across sessions and dynamically injects dependencies to eliminate AI context drift and hallucinations',
        'Implemented an extensible prompt interpolation engine with prerequisite validation (requires/writes), automated clipboard synchronization, and deterministic documentation generation (README, BUILD_LOG, CONTEXT.md)',
        'Shipped 11 production workflow templates spanning SaaS MVPs, REST APIs, FastAPI, React Native (Expo), Electron, Discord Bots, AI Agent & RAG Pipelines, and Chrome Extensions, with custom JSON/HTTPS template loading support',
        'Published as an open-source npm package (npm i -g build-with-ai) with 1,273+ downloads, 24 community contributors, and 24 forks on GitHub under Apache-2.0',
      ],
      metricsDetail: 'npm install -g build-with-ai · 1,273+ Downloads · 24 Contributors · 24 Forks · 100% Test Coverage · Apache 2.0 License',
    },
  },

  // 02. AI Model Router
  {
    id: 'ai-model-router',
    index: '02',
    roleTag: 'Founder & Maintainer',
    icon: Cpu,
    title: 'AI Model Router',
    headline: 'Adaptive LLM selection proxy designed to optimize inference costs through intelligent routing.',
    cardDescription:
      'Sub-3ms Pareto Traffic Control Room UI with Thompson Sampling RL auto-tuning, dynamically optimizing cost, latency, and quality across OpenAI, Anthropic, Gemini, and local models.',
    license: 'Apache 2.0',
    downloads: '3.4k+ Downloads',
    contributors: '11 Contributors',
    releases: 'v1.2.0 (2 Releases)',
    forks: '12 Forks',
    installCmd: 'pip install model-router-cli',
    packageUrl: 'https://github.com/PicadoLabs/ai-model-router/releases',
    packageType: 'pip',
    techStack: ['Python', 'FastAPI', 'Thompson Sampling RL', 'ONNX', 'OpenTelemetry'],
    highlights: [
      {
        label: 'Prompt-Based Model Selection',
        text: 'Analyzes complexity to route between local models and flagship frontier APIs with sub-3ms overhead.'
      },
      {
        label: 'Thompson Sampling RL',
        text: 'Auto-tunes model selection weights dynamically based on real-time feedback loops and latency profiles.'
      },
      {
        label: 'Pareto Cost Optimization',
        text: 'Routes simpler queries to lower-cost models, delivering 40–70% cost savings with zero quality loss.'
      }
    ],
    recruiterHighlight:
      'Engineered an adaptive LLM gateway designed to reduce API costs by dynamically routing prompts based on query complexity with Thompson Sampling RL.',
    github: 'https://github.com/PicadoLabs/ai-model-router',
    demo: null,
    tags: ['Agents', 'AI', 'Python', 'FastAPI', 'LLM Proxy', 'Cost Optimization', 'OpenAI'],
    details: {
      description:
        'AI Model Router is an inference routing service and API gateway for LLM requests. It analyzes incoming prompts using a lightweight ONNX semantic embedding classifier to determine complexity or intent, then dispatches to the most cost-effective provider.\n\nClients use standard OpenAI or Anthropic API endpoints to query the router, requiring zero changes to existing SDK client code. The router handles credentials, token budgets, and unified streaming across backends.\n\nBy leveraging cost-effective models for straightforward queries and reserving high-end models for challenging ones, Model Router delivers 40–70% API cost reductions with sub-3ms routing overhead and automated circuit breakers.',
      allTech: ['Python', 'FastAPI', 'HTTPX', 'Thompson Sampling RL', 'ONNX', 'OpenTelemetry', 'OpenAI API', 'Anthropic API', 'Docker'],
      fullHighlights: [
        'Dynamic model routing based on ONNX semantic prompt complexity classification and token analysis',
        'Drop-in OpenAI and Anthropic API-compatible proxy interface with unified streaming',
        'Thompson Sampling reinforcement learning agent auto-tuning routing weights from feedback signals',
        'Automated Pareto benchmark suite and cost-accuracy evaluator with distributed OpenTelemetry tracing',
        '3,400+ downloads, 11 contributors, and 12 forks across enterprise AI deployments',
      ],
      metricsDetail: 'pip install model-router-cli · 3,400+ Downloads · 11 Contributors · 12 Forks · Sub-3ms routing overhead · Apache 2.0',
    },
  },

  // 03. Terminal Agent
  {
    id: 'terminal-agent',
    index: '03',
    roleTag: 'Founder & Maintainer',
    icon: Terminal,
    title: 'Terminal Agent',
    headline: 'Verify-first autonomous software engineering agent.',
    cardDescription:
      'An autonomous AI coding agent that plans, modifies, tests, and independently verifies real-world codebases with sandboxed isolation and automatic rollback.',
    license: 'Apache 2.0',
    downloads: '700+ Downloads',
    contributors: '3 Contributors',
    releases: 'v0.1.1 (1 Release)',
    forks: '3 Forks',
    installCmd: 'pip install terminal-agent-cli',
    packageUrl: 'https://github.com/PicadoLabs/terminal-agent/releases',
    packageType: 'pip',
    techStack: ['Python', 'Docker', 'SQLite', 'Git', 'Pytest', 'Typer'],
    highlights: [
      {
        label: 'Autonomous Agent Loop',
        text: 'LLM planning, controlled CLI execution & independent test verification'
      },
      {
        label: 'Independent Verification',
        text: 'Separates code generation from test execution and verification inside an isolated sandbox'
      },
      {
        label: 'Automatic Rollback & Recovery',
        text: 'Classifies failures across 12 categories with SQLite checkpoints and state snapshots'
      }
    ],
    recruiterHighlight:
      'Implements a verify-first workflow by executing an independent test runner in an isolated sandbox for each code modification.',
    github: 'https://github.com/PicadoLabs/terminal-agent',
    demo: null,
    tags: ['Agents', 'Python', 'CLI', 'Testing', 'DevTools', 'Docker', 'SQLite'],
    details: {
      description:
        'Terminal Agent is an autonomous coding agent that executes development tasks end-to-end. It translates natural-language tasks into structured plans, applies code changes using controlled CLI tools, and immediately runs the project\'s test suite. It follows a verify-first approach: code generation is strictly separated from verification, and changes are only accepted when an independent test runner confirms all tests pass in a sandboxed environment.\n\nThe agent maintains context by ranking repository information and supports multiple LLM providers (OpenAI, Anthropic, Gemini, Ollama). It enforces strict security policies by performing secret detection and redaction. All tool commands execute inside isolated Docker or local sandboxes to avoid system contamination.\n\nIncludes 12 specialized developer tools and uses a SQLite database for session persistence and checkpoints. If failures occur, it classifies the error across 12 categories and automatically rolls back to the last stable state.',
      allTech: ['Python', 'Typer', 'Rich', 'Pydantic', 'HTTPX', 'GitPython', 'psutil', 'SQLite', 'Docker', 'Ollama', 'Pytest'],
      fullHighlights: [
        'Autonomous LLM planning and CLI execution loop with verify-first guardrails',
        'Deterministic context ranking over repository codebase files',
        'Multi-LLM provider architecture supporting OpenAI, Anthropic, Gemini, and Ollama',
        'Automated secret detection and redaction engine preventing credential leakage',
        'Independent sandboxed verification isolating test execution from agent generation',
        '12-category failure classification with automated SQLite rollback checkpoints',
      ],
      metricsDetail: 'pip install terminal-agent-cli · 700+ Downloads · 3 Contributors · 12 specialized CLI tools · Apache 2.0',
    },
  },

  // 04. AgentBench
  {
    id: 'agent-bench',
    index: '04',
    roleTag: 'Founder & Maintainer',
    icon: Gauge,
    title: 'AgentBench',
    headline: 'Autonomous AI agent benchmarking framework.',
    cardDescription:
      'A platform to benchmark, score, and diagnose autonomous AI coding agents on 12 polyglot software engineering tasks using deterministic rule-based scoring and full trace audits.',
    license: 'Apache 2.0',
    downloads: '12 Polyglot Benchmarks',
    contributors: '4 Contributors',
    releases: 'v1.0.0 (1 Release)',
    forks: '3 Forks',
    installCmd: 'pip install agentbench-core',
    packageUrl: 'https://github.com/PicadoLabs/agent-bench/releases',
    packageType: 'pip',
    techStack: ['Python', 'CLI', 'YAML', 'Docker', 'JSON', 'Ollama'],
    highlights: [
      {
        label: '12 Polyglot Benchmarks',
        text: 'Real-world programming and tool-use scenarios with local Ollama mode ($0 cost) and 5D composite scoring'
      },
      {
        label: 'Deterministic Rule-Based Scoring',
        text: 'Avoids stochastic LLM judging through deterministic rule-based evaluation pipelines'
      },
      {
        label: 'Execution Trace Logging',
        text: 'Complete JSON audit trail with tool calls, timestamps, and microsecond timing'
      }
    ],
    recruiterHighlight:
      'Automated multi-task benchmarking of AI agents with deterministic rule-based scoring for fair, non-stochastic comparison.',
    github: 'https://github.com/PicadoLabs/agent-bench',
    demo: null,
    tags: ['Agents', 'Python', 'CLI', 'Benchmarking', 'DevTools', 'Docker'],
    details: {
      description:
        'AgentBench is a command-line benchmarking framework to evaluate autonomous AI agents. It defines benchmarks using declarative YAML, where each task specifies a series of prompts and expected outputs. The framework launches the agent in an isolated workspace, allowing it to run code or use tools. After execution, Agent Bench applies a multi-stage, rule-based judge to score the outputs.\n\nThis evaluation avoids stochastic LLM judgments: instead, it uses cascaded rules and regex checks to deterministically assess success. Every step of the agent\'s run is logged with timestamps, creating a full JSON trace of tool calls. This enables fine-grained analysis of performance and timing.',
      allTech: ['Python', 'Typer', 'Rich', 'YAML', 'JSON', 'Docker', 'Ollama'],
      fullHighlights: [
        '12 structured polyglot benchmark tasks spanning real-world bugs, features, and CLI tools',
        'Deterministic rule-based scoring eliminating stochastic grading variability',
        'Automated multi-agent execution and evaluation harness with local Ollama zero-cost mode',
        'Full execution trace logging with microsecond timestamps and tool call inspection',
        'Custom task ingestion via declarative YAML specifications',
      ],
      metricsDetail: 'pip install agentbench-core · 12 Benchmarks · 4 Contributors · 100% deterministic evaluation · Apache 2.0',
    },
  },
];

export default function PicadoLabsPage() {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Layout
      title="PicadoLabs"
      description="PicadoLabs open-source developer tooling, autonomous AI agents, and workflow acceleration engines."
    >
      <main className={styles.pageContainer}>
        {/* Subtle Ambient Glow */}
        <div className={styles.bgGlowWrapper} aria-hidden="true">
          <div className={styles.glowOrb} />
        </div>

        <div className={styles.contentWrapper}>
          {/* Top Breadcrumb Navigation */}
          <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
            <Link to="/opensource" className={styles.breadcrumbLink}>
              <ArrowLeft size={14} />
              <span>Open Source</span>
            </Link>
            <span>/</span>
            <span className={styles.breadcrumbCurrent}>PicadoLabs</span>
          </nav>

          {/* Hero Header */}
          <header className={styles.heroHeader}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrowBadge}>Open Source Organization</span>
              <span className={styles.licenseBadge}>
                <ShieldCheck size={13} />
                <span>Apache 2.0 Verified</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>PicadoLabs</h1>
            <p className={styles.heroSubtitle}>
              Deterministic, verify-first developer infrastructure for autonomous AI software engineering. Dividing the software development lifecycle into four verifiable, specialized open-source systems.
            </p>

            <div className={styles.heroActionGroup}>
              <a
                href="https://github.com/PicadoLabs"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <IconGithub size={15} />
                <span>PicadoLabs GitHub Org</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://picadolabs.me"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryBtn}
              >
                <Globe size={14} style={{ color: 'var(--vg-accent)' }} />
                <span>picadolabs.me</span>
              </a>

              <Link
                to="/build-with-ai"
                className={styles.secondaryBtn}
              >
                <Sparkles size={14} style={{ color: 'var(--vg-accent)' }} />
                <span>build-with-ai Showcase</span>
              </Link>

              <Link
                to="/opensource"
                className={styles.secondaryBtn}
              >
                <span>All Open Source</span>
              </Link>
            </div>
          </header>

          {/* Verified Real-World Organization Metrics */}
          <div className={styles.metricsGrid} style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
            <div className={styles.metricCard}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={styles.metricValue} style={{ color: '#10B981' }}>5.3k+</span>
                <Download size={18} style={{ color: '#10B981', opacity: 0.8 }} />
              </div>
              <span className={styles.metricLabel}>Total Downloads</span>
            </div>

            <div className={styles.metricCard}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={styles.metricValue} style={{ color: '#38BDF8' }}>37+</span>
                <Users size={18} style={{ color: '#38BDF8', opacity: 0.8 }} />
              </div>
              <span className={styles.metricLabel}>Unique Contributors</span>
            </div>

            <div className={styles.metricCard}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={styles.metricValue} style={{ color: 'var(--vg-accent, #FF4D4F)' }}>4</span>
                <Package size={18} style={{ color: 'var(--vg-accent, #FF4D4F)', opacity: 0.8 }} />
              </div>
              <span className={styles.metricLabel}>Core Systems</span>
            </div>

            <div className={styles.metricCard}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={styles.metricValue} style={{ color: '#FACC15' }}>42+</span>
                <GitFork size={18} style={{ color: '#FACC15', opacity: 0.8 }} />
              </div>
              <span className={styles.metricLabel}>GitHub Forks</span>
            </div>
          </div>

          {/* Architecture Lifecycle Sequence */}
          <div style={{
            background: '#07070A',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 12,
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#787880', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'monospace', marginBottom: '0.75rem' }}>
              PicadoLabs 4-Stage Software Engineering Lifecycle
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <div style={{ background: '#0D0D12', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 8, padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700, letterSpacing: '0.04em' }}>01 PLAN</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F5F5F7', marginTop: '0.15rem' }}>build-with-ai</div>
                <div style={{ fontSize: '0.75rem', color: '#8E8E93', marginTop: '0.2rem' }}>Local Context Store</div>
              </div>

              <div style={{ background: '#0D0D12', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 8, padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#38BDF8', fontWeight: 700, letterSpacing: '0.04em' }}>02 ROUTE</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F5F5F7', marginTop: '0.15rem' }}>AI Model Router</div>
                <div style={{ fontSize: '0.75rem', color: '#8E8E93', marginTop: '0.2rem' }}>Sub-3ms Pareto Routing</div>
              </div>

              <div style={{ background: '#0D0D12', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 8, padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#C084FC', fontWeight: 700, letterSpacing: '0.04em' }}>03 EXECUTE</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F5F5F7', marginTop: '0.15rem' }}>Terminal Agent</div>
                <div style={{ fontSize: '0.75rem', color: '#8E8E93', marginTop: '0.2rem' }}>Sandbox &amp; Verify</div>
              </div>

              <div style={{ background: '#0D0D12', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 8, padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#FACC15', fontWeight: 700, letterSpacing: '0.04em' }}>04 EVALUATE</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F5F5F7', marginTop: '0.15rem' }}>AgentBench</div>
                <div style={{ fontSize: '0.75rem', color: '#8E8E93', marginTop: '0.2rem' }}>12 Polyglot Tasks</div>
              </div>
            </div>
          </div>

          {/* Quick Package Installation Box */}
          <div style={{
            background: '#0A0A0E',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 12,
            padding: '1.25rem 1.5rem',
            marginBottom: '2.5rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={16} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#F5F5F7' }}>Install Open-Source Packages</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#787880', fontFamily: 'monospace' }}>Verified on npm &amp; PyPI</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
              <div style={{ background: '#000000', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: 7, padding: '0.7rem 0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700 }}>build-with-ai</span>
                  <a href="https://www.npmjs.com/package/build-with-ai" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.68rem', color: '#38BDF8', textDecoration: 'none' }}>
                    npm ↗
                  </a>
                </div>
                <code style={{ fontSize: '0.78rem', color: '#F5F5F7', background: 'transparent', padding: 0 }}>npm install -g build-with-ai</code>
              </div>

              <div style={{ background: '#000000', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: 7, padding: '0.7rem 0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#38BDF8', fontWeight: 700 }}>AI Model Router</span>
                  <a href="https://github.com/PicadoLabs/ai-model-router" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.68rem', color: '#38BDF8', textDecoration: 'none' }}>
                    GitHub ↗
                  </a>
                </div>
                <code style={{ fontSize: '0.78rem', color: '#F5F5F7', background: 'transparent', padding: 0 }}>pip install model-router-cli</code>
              </div>

              <div style={{ background: '#000000', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: 7, padding: '0.7rem 0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#C084FC', fontWeight: 700 }}>Terminal Agent</span>
                  <a href="https://github.com/PicadoLabs/terminal-agent" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.68rem', color: '#38BDF8', textDecoration: 'none' }}>
                    GitHub ↗
                  </a>
                </div>
                <code style={{ fontSize: '0.78rem', color: '#F5F5F7', background: 'transparent', padding: 0 }}>pip install terminal-agent-cli</code>
              </div>

              <div style={{ background: '#000000', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: 7, padding: '0.7rem 0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#FACC15', fontWeight: 700 }}>AgentBench</span>
                  <a href="https://github.com/PicadoLabs/agent-bench" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.68rem', color: '#38BDF8', textDecoration: 'none' }}>
                    GitHub ↗
                  </a>
                </div>
                <code style={{ fontSize: '0.78rem', color: '#F5F5F7', background: 'transparent', padding: 0 }}>pip install agentbench-core</code>
              </div>
            </div>
          </div>

          {/* Projects List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {PICADOLABS_PROJECTS.map((project) => {
              const isExpanded = !!expandedCards[project.id];
              const IconComponent = project.icon;

              return (
                <article
                  key={project.id}
                  className={openStyles.projectCard}
                >
                  {/* Card Header */}
                  <div className={openStyles.cardHeader}>
                    <div className={openStyles.indexCategoryWrap}>
                      <span className={openStyles.projectIndex}>{project.index}</span>
                      <div className={openStyles.iconBadge}>
                        <IconComponent size={16} />
                      </div>
                      <span className={openStyles.roleBadge}>{project.roleTag}</span>
                    </div>

                    {/* Traction Badges */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {project.downloads && (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          background: 'rgba(16, 185, 129, 0.12)',
                          border: '1px solid rgba(16, 185, 129, 0.28)',
                          color: '#34D399',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          padding: '0.18rem 0.55rem',
                          borderRadius: 4,
                          fontFamily: 'monospace'
                        }}>
                          <Download size={11} />
                          <span>{project.downloads}</span>
                        </div>
                      )}

                      {project.contributors && (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          background: 'rgba(56, 189, 248, 0.12)',
                          border: '1px solid rgba(56, 189, 248, 0.28)',
                          color: '#38BDF8',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          padding: '0.18rem 0.55rem',
                          borderRadius: 4,
                          fontFamily: 'monospace'
                        }}>
                          <Users size={11} />
                          <span>{project.contributors}</span>
                        </div>
                      )}

                      {project.license && (
                        <div className={openStyles.licenseBadge}>
                          <ShieldCheck size={13} />
                          <span>{project.license}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className={openStyles.titleBlock}>
                    <h2 className={openStyles.projectTitle}>{project.title}</h2>
                    <p className={openStyles.projectTagline}>{project.headline}</p>
                    <p className={openStyles.projectSummary}>{project.cardDescription}</p>
                  </div>

                  {/* Package Install Snippet */}
                  {project.installCmd && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: 6,
                      padding: '0.45rem 0.75rem',
                      width: 'fit-content',
                      marginTop: '0.35rem'
                    }}>
                      <Terminal size={12} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                      <code style={{ fontSize: '0.76rem', color: '#E2E8F0', background: 'transparent', padding: 0 }}>
                        {project.installCmd}
                      </code>
                    </div>
                  )}

                  {/* Recruiter Callout */}
                  {project.recruiterHighlight && (
                    <div className={openStyles.recruiterCallout}>
                      <div className={openStyles.recruiterHeader}>
                        <ShieldCheck size={14} className={openStyles.recruiterIcon} />
                        <span className={openStyles.recruiterLabel}>Architecture Highlight</span>
                      </div>
                      <p className={openStyles.recruiterText}>{project.recruiterHighlight}</p>
                    </div>
                  )}

                  {/* Key Highlights List */}
                  <div className={openStyles.highlightsContainer}>
                    <span className={openStyles.highlightsHeader}>Key Engineering Deliverables</span>
                    <ul className={openStyles.highlightsList}>
                      {project.highlights.map((h, i) => {
                        if (typeof h === 'object' && h.label) {
                          return (
                            <li key={i} className={openStyles.highlightItem}>
                              <span className={openStyles.highlightDot}>•</span>
                              <span>
                                <strong className={openStyles.highlightLabel}>{h.label}: </strong>
                                <span className={openStyles.highlightText}>{h.text}</span>
                              </span>
                            </li>
                          );
                        }
                        return (
                          <li key={i} className={openStyles.highlightItem}>
                            <span className={openStyles.highlightDot}>•</span>
                            <span>{h}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className={openStyles.techTagsRow}>
                    {project.techStack.map((t, idx) => (
                      <span key={idx} className={openStyles.techTag}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className={openStyles.cardFooter}>
                    <div className={openStyles.footerLeft}>
                      <button
                        type="button"
                        className={`${openStyles.deepDiveBtn} ${isExpanded ? openStyles.deepDiveBtnActive : ''}`}
                        onClick={() => toggleExpand(project.id)}
                        aria-expanded={isExpanded}
                      >
                        <Layers size={14} />
                        <span>{isExpanded ? 'Hide Architecture Deep Dive' : 'View Architecture Deep Dive'}</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>

                    <div className={openStyles.cardActions}>
                      {project.showcaseUrl && (
                        <Link
                          to={project.showcaseUrl}
                          className={openStyles.actionBtn}
                          style={{ borderColor: 'var(--vg-accent)', color: 'var(--vg-accent)', background: 'var(--vg-accent-subtle)' }}
                          title="View Dedicated Interactive Showcase Page"
                        >
                          <Sparkles size={14} />
                          <span>Showcase</span>
                          <ArrowUpRight size={13} />
                        </Link>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={openStyles.actionBtn}
                          title="View Repository on GitHub"
                        >
                          <IconGithub size={14} />
                          <span>GitHub Repo</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                      {project.packageUrl && (
                        <a
                          href={project.packageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={openStyles.actionBtn}
                          title="Package Details & Releases"
                        >
                          <Package size={14} />
                          <span>{project.packageType === 'npm' ? 'npm Package' : 'Releases & Assets'}</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Expandable Architecture Deep Dive Panel */}
                  {isExpanded && (
                    <div className={openStyles.deepDivePanel}>
                      <div className={openStyles.deepDiveDivider} />
                      
                      <div className={openStyles.deepDiveContent}>
                        <h4 className={openStyles.deepDiveHeading}>System Architecture &amp; Implementation Details</h4>
                        
                        {project.details.description.split('\n\n').map((paragraph, pIdx) => (
                          <p key={pIdx} className={openStyles.deepDiveParagraph}>
                            {paragraph}
                          </p>
                        ))}

                        {project.details.metricsDetail && (
                          <div className={openStyles.metricsDetailBox}>
                            <span className={openStyles.metricsDetailLabel}>System Benchmarks &amp; Specs:</span>
                            <span className={openStyles.metricsDetailText}>{project.details.metricsDetail}</span>
                          </div>
                        )}

                        <div className={openStyles.deepDiveSection}>
                          <h5 className={openStyles.deepDiveSubheading}>Complete Technical Stack</h5>
                          <div className={openStyles.fullTechWrap}>
                            {project.details.allTech.map((techItem, tIdx) => (
                              <span key={tIdx} className={openStyles.fullTechChip}>
                                {techItem}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className={openStyles.deepDiveSection}>
                          <h5 className={openStyles.deepDiveSubheading}>Complete Architectural Highlights</h5>
                          <ul className={openStyles.fullHighlightsList}>
                            {project.details.fullHighlights.map((fh, fhIdx) => (
                              <li key={fhIdx} className={openStyles.fullHighlightItem}>
                                <CheckCircle2 size={13} className={openStyles.fullHighlightIcon} />
                                <span>{fh}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

        </div>
      </main>
    </Layout>
  );
}

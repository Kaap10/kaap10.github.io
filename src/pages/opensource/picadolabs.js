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
  Sparkles
} from 'lucide-react';
import styles from './dynavec.module.css';
import openStyles from '../opensource.module.css';

const IconGithub = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const IconNpm = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.13h13.74v13.74h-3.435V8.565h-3.435v10.305H5.13z" />
  </svg>
);

const PICADOLABS_PROJECTS = [
  // 1. build-with-ai
  {
    id: 'build-with-ai',
    index: '01',
    roleTag: 'Creator & Maintainer',
    icon: Terminal,
    title: 'build-with-ai',
    headline: 'Zero-API Developer CLI & AI Workflow Engine',
    cardDescription:
      'Open-source developer CLI guiding engineers through structured development phases with zero-API overhead and persistent local context across any AI model.',
    license: 'Apache 2.0',
    techStack: ['Node.js', 'JavaScript', 'CLI Engine', 'npm', 'AI Prompts'],
    highlights: [
      {
        label: 'Local-First Memory',
        text: 'Preserves architectural choices across sessions (.buildwithai/context.json) to eliminate AI context drift.'
      },
      {
        label: 'Workflow Blueprints',
        text: '6 production templates spanning SaaS MVPs, REST APIs, Expo, AI Agents/RAG, and Chrome extensions.'
      },
      {
        label: 'Interpolation Engine',
        text: 'Dynamic prompt variable injection with strict prerequisite checks and automated clipboard sync.'
      }
    ],
    github: 'https://github.com/Kaap10/build-with-ai',
    npm: 'https://www.npmjs.com/package/build-with-ai',
    showcaseUrl: '/build-with-ai',
    tags: ['Open Source', 'Node.js', 'CLI', 'Developer Tools', 'AI'],
    details: {
      description:
        'build-with-ai is an open-source, zero-API developer CLI that guides engineers through structured, end-to-end software development phases using any AI model (ChatGPT, Claude, Cursor, Gemini, local LLMs).\n\nIt features a local-first memory architecture (.buildwithai/context.json) that preserves technical choices across sessions and dynamically injects dependencies to eliminate AI context drift and hallucinations.\n\nThe system includes an extensible prompt interpolation engine with prerequisite validation (requires/writes), automated clipboard synchronization, and deterministic documentation generation (README, BUILD_LOG, CONTEXT.md).\n\nShipped with 6 production workflow templates spanning SaaS MVPs, REST APIs, React Native (Expo), AI Agent & RAG Pipelines, and Chrome Extensions, with custom JSON/HTTPS template loading support. Published as an open-source npm package (npx build-with-ai) with 100% test coverage, a multi-OS CI pipeline (Ubuntu, macOS, Windows), and zero external cloud or telemetry dependencies.',
      allTech: ['Node.js', 'JavaScript', 'CLI', 'npm', 'JSON', 'Markdown', 'Git', 'Prompt Engineering'],
      fullHighlights: [
        'Built an open-source, zero-API developer CLI that guides engineers through structured, end-to-end software development phases using any AI model (ChatGPT, Claude, Cursor, Gemini, local LLMs)',
        'Designed a local-first memory architecture (.buildwithai/context.json) that preserves technical choices across sessions and dynamically injects dependencies to eliminate AI context drift and hallucinations',
        'Implemented an extensible prompt interpolation engine with prerequisite validation (requires/writes), automated clipboard synchronization, and deterministic documentation generation (README, BUILD_LOG, CONTEXT.md)',
        'Shipped 6 production workflow templates spanning SaaS MVPs, REST APIs, React Native (Expo), AI Agent & RAG Pipelines, and Chrome Extensions, with custom JSON/HTTPS template loading support',
        'Published as an open-source npm package (npx build-with-ai) with 100% test coverage, a multi-OS CI pipeline (Ubuntu, macOS, Windows), and zero external cloud or telemetry dependencies',
      ],
      metricsDetail: 'npx build-with-ai · 626+ Downloads · 100% Test Coverage · Multi-OS CI · Apache 2.0 License',
    },
  },

  // 2. Terminal Agent
  {
    id: 'terminal-agent',
    index: '02',
    roleTag: 'PicadoLabs System',
    icon: Terminal,
    title: 'Terminal Agent',
    headline: 'Verify-first autonomous software engineering agent.',
    cardDescription:
      'An autonomous AI coding agent that plans, modifies, tests, and independently verifies real-world codebases with sandboxed isolation and automatic rollback.',
    license: 'MIT',
    techStack: ['Python', 'Docker', 'SQLite', 'Git', 'Pytest'],
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
    github: null,
    demo: null,
    tags: ['Agents', 'Python', 'CLI', 'Testing', 'DevTools', 'Docker', 'SQLite'],
    details: {
      description:
        'Terminal Agent is an autonomous coding agent that executes development tasks end-to-end. It translates natural-language tasks into structured plans, applies code changes using controlled CLI tools, and immediately runs the project\'s test suite. It follows a verify-first approach: code generation is strictly separated from verification, and changes are only accepted when an independent test runner confirms all tests and invariant checks pass in a sandboxed environment.\n\nThe agent maintains context by ranking repository information and supports multiple LLM providers (OpenAI, Anthropic, Gemini, Ollama). It enforces strict security policies by performing secret detection and redaction. All tool commands execute inside isolated Docker or local sandboxes to avoid system contamination.\n\nTerminal Agent includes 12 specialized developer tools (for file editing, shell commands, etc.) and uses a SQLite database for session persistence and checkpoints. If failures occur, it classifies the error across 12 categories and automatically rolls back to the last stable state.',
      allTech: ['Python', 'Typer', 'Rich', 'Pydantic', 'HTTPX', 'GitPython', 'psutil', 'SQLite', 'Docker', 'Ollama', 'OpenAI API', 'Anthropic API', 'Gemini API', 'Pytest'],
      fullHighlights: [
        'Autonomous LLM planning and CLI execution loop with verify-first guardrails',
        'Deterministic context ranking over repository codebase files',
        'Multi-LLM provider architecture supporting OpenAI, Anthropic, Gemini, and Ollama',
        'Automated secret detection and redaction engine preventing credential leakage',
        'Independent sandboxed verification isolating test execution from agent generation',
        '12-category failure classification with automated SQLite rollback checkpoints',
      ],
      metricsDetail: '12 specialized CLI tools · Zero-contamination sandboxes · Multi-LLM provider support',
    },
  },

  // 3. Agent Bench
  {
    id: 'agent-bench',
    index: '03',
    roleTag: 'PicadoLabs Benchmark',
    icon: Gauge,
    title: 'Agent Bench',
    headline: 'Autonomous AI agent benchmarking framework.',
    cardDescription:
      'A CLI toolkit for benchmarking AI coding agents across 40+ programming tasks using deterministic rule-based scoring and full execution trace logging.',
    license: 'MIT',
    techStack: ['Python', 'CLI', 'YAML', 'Docker', 'JSON'],
    highlights: [
      {
        label: '40+ Benchmark Tasks',
        text: 'Real-world programming and tool-use scenarios with declarative YAML definitions'
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
    github: null,
    demo: null,
    tags: ['Agents', 'Python', 'CLI', 'Benchmarking', 'DevTools', 'Docker'],
    details: {
      description:
        'Agent Bench (AgentBench) is a command-line benchmarking framework to evaluate autonomous AI agents. It defines benchmarks using declarative YAML, where each task specifies a series of prompts and expected outputs. The framework launches the agent in an isolated workspace, allowing it to run code or use tools. After execution, Agent Bench applies a multi-stage, rule-based judge to score the outputs.\n\nThis evaluation avoids stochastic LLM judgments: instead, it uses cascaded rules and regex checks to deterministically assess success. Every step of the agent\'s run is logged with timestamps, creating a full JSON trace of tool calls. This enables fine-grained analysis of performance and timing.\n\nUsers can define custom tasks or use the built-in 40+ real-world programming scenarios. Agent Bench provides metrics on task success rates and execution details, facilitating comparative analysis of different agents.',
      allTech: ['Python', 'Typer', 'Rich', 'YAML', 'JSON', 'Docker'],
      fullHighlights: [
        '40+ structured benchmark tasks spanning real-world bugs, features, and CLI tools',
        'Deterministic rule-based scoring eliminating stochastic grading variability',
        'Automated multi-agent execution and evaluation harness',
        'Full execution trace logging with microsecond timestamps and tool call inspection',
        'Custom task ingestion via declarative YAML specifications',
      ],
      metricsDetail: '40+ tasks · 100% deterministic evaluation · JSON execution traces',
    },
  },

  // 4. Model Router
  {
    id: 'model-router',
    index: '04',
    roleTag: 'PicadoLabs Proxy',
    icon: Cpu,
    title: 'Model Router',
    headline: 'Adaptive LLM selection proxy designed to optimize inference costs through intelligent routing.',
    cardDescription:
      'An intelligent proxy gateway that dynamically routes LLM queries based on prompt complexity—directing simpler queries to lower-cost models while reserving premium models for complex tasks.',
    license: 'MIT',
    techStack: ['Python', 'FastAPI', 'OpenAI API', 'Anthropic API', 'Local LLMs'],
    highlights: [
      {
        label: 'Prompt-Based Model Selection',
        text: 'Analyzes complexity to route between local models and flagship frontier APIs'
      },
      {
        label: 'OpenAI / Claude API Proxy',
        text: 'API-compatible gateway and proxy for standard client SDKs with unified streaming'
      },
      {
        label: 'Cost-Efficient Routing',
        text: 'Routes simpler queries to lower-cost models while reserving premium models for complex tasks'
      }
    ],
    recruiterHighlight:
      'Engineered an adaptive LLM gateway designed to reduce API costs by dynamically routing prompts based on query complexity.',
    github: null,
    demo: null,
    tags: ['Agents', 'AI', 'Python', 'FastAPI', 'LLM Proxy', 'Cost Optimization', 'OpenAI'],
    details: {
      description:
        'Model Router is an inference routing service that acts as an intelligent gateway for LLM requests. It analyzes each incoming prompt to determine complexity or intent, then dispatches it to the best-fitting model. For example, trivial prompts might be served by a lightweight local model, while complex reasoning tasks are routed to flagship frontier models.\n\nClients use standard OpenAI or Anthropic API endpoints to query the router, requiring no changes to existing SDK client code. The router handles credentials, token budgets, and unified streaming across backends.\n\nBy leveraging cost-effective models for straightforward queries and reserving high-end models for challenging ones, Model Router is designed to optimize API expenses, with benchmark results showing up to 40–70% API cost savings on tested workloads without quality degradation.',
      allTech: ['Python', 'FastAPI', 'HTTPX', 'OpenAI API', 'Anthropic API', 'Docker', 'Pydantic'],
      fullHighlights: [
        'Dynamic model routing based on prompt complexity analysis and token length',
        'Drop-in OpenAI and Anthropic API-compatible proxy interface',
        'Unified streaming support across local open-source and cloud models',
        'Cost-efficient routing routing simpler queries to lower-cost models and premium models for complex tasks',
        'Self-hosted gateway ensuring complete data privacy and customizable routing policies',
      ],
      metricsDetail: 'Adaptive routing: Benchmark results up to 40–70% cost savings on tested workloads · Sub-10ms routing overhead · Multi-provider failover',
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
                <span>4 Flagship Projects</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>PicadoLabs</h1>
            <p className={styles.heroSubtitle}>
              Open-source developer research laboratory specializing in zero-API developer tooling, autonomous coding agents, benchmark harnesses, and local-first AI software architecture.
            </p>

            <div className={styles.heroActionGroup}>
              <a
                href="https://github.com/Kaap10/build-with-ai"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <IconGithub size={15} />
                <span>build-with-ai GitHub</span>
                <ArrowUpRight size={13} />
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
                <span>View All Open Source</span>
              </Link>
            </div>
          </header>

          {/* Projects List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
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
                          <span>GitHub</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                      {project.npm && (
                        <a
                          href={project.npm}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={openStyles.actionBtn}
                          title="View Package on npm"
                        >
                          <IconNpm size={14} />
                          <span>npm</span>
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

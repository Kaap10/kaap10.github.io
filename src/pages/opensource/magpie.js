import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
  GitPullRequest, 
  ArrowLeft, 
  ShieldCheck, 
  ArrowUpRight,
  Database,
  Layers,
  Sparkles,
  Package,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Terminal,
  Lock,
  Cpu,
  Server,
  MessageSquareQuote
} from 'lucide-react';
import styles from './dynavec.module.css';
import openStyles from '../opensource.module.css';
import ArchitectureDiagramFlow from './ArchitectureDiagramFlow';

const IconGithub = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const ApacheLogoIcon = ({ size = 16 }) => (
  <img
    src="/img/apachelogo.png"
    alt="Apache"
    width={size}
    height={size}
    style={{ objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle' }}
  />
);

const MAGPIE_CARD = {
  id: 'magpie',
  index: '01',
  roleTag: 'Contributor · 7 Merged PRs',
  icon: ApacheLogoIcon,
  title: 'apache/magpie',
  headline: 'Vendor-Neutral AI Agent Harness Runtimes & HITL Security Framework',
  cardDescription:
    'Authored 7 major feature Pull Requests implementing first-class runtime adapters for leading AI agent harnesses and vulnerability cross-referencing infrastructure into Apache Magpie under RFC-AI-0004.',
  license: '7 Merged PRs',
  techStack: ['Python', 'Shell', 'RFC-AI-0004', 'MCP Protocol', 'OSV.dev API', 'GitHub Copilot CLI', 'Aider', 'Block Goose', 'Ollama / vLLM', 'Cursor Agent', 'Apache RAT'],
  highlights: [
    {
      label: 'OSV.dev & Vetted-Ops Dispatcher (PR #1326, #1297)',
      text: 'Engineered vulnerability cross-referencing and routed HTTP ops via Python urllib.request with strict input validation.'
    },
    {
      label: 'Copilot CLI & Coding Agent (PR #1287, Issue #318)',
      text: 'Engineered standalone Copilot CLI runtime, draft PR safety boundaries, and ~/.copilot/mcp-config.json integration.'
    },
    {
      label: 'Aider & Block Goose Runtimes (PR #1286, #1217, Issues #317, #319)',
      text: 'Designed on-demand /read skill ingestion, GOOSE_MODE="approve" HITL enforcement, and Layer 0 agent-iso credential isolation.'
    },
    {
      label: 'Local LLM & Cursor Adapters (PR #1206, #1204, Issues #315, #316)',
      text: 'Calibrated air-gapped Ollama/vLLM 70B+ triage floors, and implemented Cursor Composer symlink discovery topology.'
    }
  ],
  github: 'https://github.com/apache/magpie',
  prsUrl: 'https://github.com/apache/magpie/pulls?q=is%3Apr+is%3Amerged+author%3AKaap10',
  tags: ['Open Source', 'Apache Software Foundation', 'AI Safety', 'Model Context Protocol', 'Agent Harnesses', 'HITL'],
  details: {
    description:
      'Apache Magpie is the Apache Software Foundation\'s vendor-neutral framework for managing security triage, CVE allocation, and reproducible vulnerability workflows.\n\nAs a core external contributor across 7 merged pull requests, authored first-class runtime adapters for leading AI agent harnesses and vulnerability cross-referencing infrastructure in full compliance with RFC-AI-0004. Collaborated directly with ASF Board and PMC Member Jarek Potiuk (@potiuk) to establish rigorous Human-in-the-Loop (HITL) security boundaries, ensuring agentic systems propose changes via Draft Pull Requests rather than executing unreviewed mutations.\n\nArchitected Model Context Protocol (MCP) integrations connecting PonyMail archive search and Apache Projects tools, engineered OSV.dev and vetted-ops dispatcher backends, configured Layer 0 clean-environment wrappers (agent-iso) to scrub ambient cloud tokens, and validated all contributions against Apache RAT licensing audits, prek hooks, symlink topology linters, and vendor-neutrality scoring.',
    allTech: [
      'Python',
      'Shell / Bash',
      'RFC-AI-0004',
      'Model Context Protocol (MCP)',
      'GitHub Copilot CLI',
      'Aider Pair Programming',
      'Block Goose Agent',
      'Ollama / llama.cpp / vLLM',
      'Cursor Agent CLI',
      'Apache RAT License Auditor',
      'prek Git Hooks',
      'agent-iso Sandbox'
    ],
    architectureFlow: {
      title: 'Apache Magpie Universal Agent Harness Architecture Flow',
      mentalModel: {
        inputLabel: '1. Agentic Harness Ingestion',
        input: 'Copilot CLI, Aider, Goose, and air-gapped local model terminal runners',
        processLabel: '2. Layer 0 Isolation & Policy Boundary',
        process: 'agent-iso clean-room environment + ambient credential & token scrubbing',
        outputLabel: '3. Canonical Skills & MCP Execution',
        output: '70+ RFC-AI-0004 skills, JSON-RPC 2.0 endpoints, and zero unreviewed writes'
      },
      layers: [
        {
          stage: 'Stage 1: Client & Agentic Harness Adapters',
          connectorLabel: 'Harness Invocation & Option Normalization',
          cards: [
            {
              title: 'GitHub Copilot CLI Integration',
              pr: 'PR #1287',
              prUrl: 'https://github.com/apache/magpie/pull/1287',
              impact: 'Standalone CLI Schema • Draft PR HITL Gating',
              isContributed: true,
              points: [
                'Targeted modern standalone Copilot CLI tool runtime (~/.copilot/mcp-config.json)',
                'Enforced Draft Pull Request policy and disabled unsafe permissive flags (--allow-all, --yolo)',
                'Configured privacy framing in privacy-llm.md for embargoed vulnerability triage'
              ]
            },
            {
              title: 'Aider Pair Programming Harness',
              pr: 'PR #1286',
              prUrl: 'https://github.com/apache/magpie/pull/1286',
              impact: 'On-Demand /read • Git Discipline Enforcement',
              isContributed: true,
              points: [
                'Established on-demand /read skill pattern preventing context exhaustion across 70+ skills',
                'Enforced mandatory git discipline flags (--no-auto-commits, --no-dirty-commits)',
                'Configured .aiderignore rules blocking accidental inclusion of local secrets and overrides'
              ]
            },
            {
              title: 'Block Goose Agentic CLI Harness',
              pr: 'PR #1217',
              prUrl: 'https://github.com/apache/magpie/pull/1217',
              impact: 'GOOSE_MODE="approve" • Declarative Recipes',
              isContributed: true,
              points: [
                'Configured mandatory GOOSE_MODE: "approve" enforcing per-action interactive confirmation modals',
                'Built declarative recipe pattern (.goose/recipes/triage.yaml) wrapping Magpie workflows',
                'Documented stdio and streamable_http MCP transports connecting to Apache ecosystem servers'
              ]
            },
            {
              title: 'Local Sovereign LLM Inference',
              pr: 'PR #1206 & PR #1204',
              prUrl: 'https://github.com/apache/magpie/pull/1206',
              impact: 'Ollama / llama.cpp / vLLM • Zero-Network Triage',
              isContributed: true,
              points: [
                'Configured vendor-neutral endpoint routing for local Ollama, llama.cpp, and vLLM runtimes',
                'Documented multi-model --architect tiering with 70B+ reasoning floors for triagers',
                'Guaranteed zero external network telemetry for embargoed CVE disclosures'
              ]
            }
          ]
        },
        {
          stage: 'Stage 2: Security Isolation & Credential Scrubbing Boundary',
          connectorLabel: 'Layer 0 Credential & Environment Stripping',
          cards: [
            {
              title: 'Layer 0 Clean Environment & Credential Isolation',
              pr: 'PR #1217 & PR #1286',
              prUrl: 'https://github.com/apache/magpie/pull/1217',
              impact: 'agent-iso Sandbox • Token Scrubbing',
              isContributed: true,
              points: [
                'Integrated agent-iso execution boundary stripping ambient environment variables and cloud tokens',
                'Preserved SSH_AUTH_SOCK and git commit signature mechanics while gating remote pushes',
                'Enforced strict proposal-then-confirm human review modals across all autonomous agents'
              ]
            }
          ]
        },
        {
          stage: 'Stage 3: Canonical Tool Standard & MCP Execution Engine',
          connectorLabel: 'JSON-RPC 2.0 Tool Execution',
          cards: [
            {
              title: 'OSV.dev & Vetted-Ops Dispatcher',
              pr: 'PR #1326 & PR #1297',
              prUrl: 'https://github.com/apache/magpie/pull/1326',
              impact: 'OSV.dev API v1 • Python urllib vetted-ops',
              isContributed: true,
              points: [
                'Implemented pure Python urllib.request HTTP backend routing OSV and CVE ops without external dependencies',
                'Added strict regex validation for vulnerability IDs, packages, versions, and Git hashes preventing path traversal',
                'Whitelisted api.osv.dev across framework egress gateways and sandboxes under default-deny policies'
              ]
            },
            {
              title: 'Canonical Skill Registry & MCP Tool Engine',
              impact: '70+ RFC-AI-0004 Skills • Multi-Client JSON-RPC',
              isContributed: false,
              points: [
                'Centralized registry of 70+ vendor-neutral engineering skill definitions (RFC-AI-0004)',
                'JSON-RPC 2.0 tool execution endpoints serving PonyMail archive and Apache Project data',
                'Selective skill injection ensuring zero context bloat during model inference'
              ]
            }
          ]
        }
      ]
    },
    fullHighlights: [
      'RFC-AI-0004 Vendor-Neutral Skill Standard: Universal skill definitions running identically across Cursor, Aider, Goose, Copilot CLI, and local open models without vendor lock-in.',
      'Human-in-the-Loop (HITL) Security Enforcement: Enforced proposal-then-confirm discipline and disabled unsafe autonomous flags (--allow-all, --yolo, auto-commits) across all agent harnesses.',
      'Layer 0 Credential & Token Isolation: Engineered agent-iso execution boundaries scrubbing ambient environment variables and cloud tokens prior to launching subshells.',
      'Vulnerability Cross-Referencing & Databases: Engineered OSV.dev and CVE.org integration using pure Python urllib.request backend with strict regex validation to prevent path traversal.',
      'Model Context Protocol (MCP) Multi-Client Integration: Configured standardized JSON-RPC 2.0 schemas connecting harnesses to PonyMail and Apache Projects MCP servers.',
      'On-Demand Skill Ingestion: Implemented selective /read .agents/skills/ patterns, eliminating context window exhaustion across large tool suites.'
    ],
    metricsDetail: '7 Merged PRs · 100% Merge Rate · OSV.dev / CVE Integrations · ASF PMC Reviewed · Zero-Cloud Air-Gapped LLMs',
  },
};

const MASTER_PR_CONTRIBUTIONS = [
  {
    pr: 'PR #1326',
    url: 'https://github.com/apache/magpie/pull/1326',
    issue: 'Issue #1320',
    issueUrl: 'https://github.com/apache/magpie/issues/1320',
    category: 'Vulnerability Infrastructure',
    categoryId: 'security',
    title: 'Route OSV and CVE.org adapter recipes through vetted-ops',
    problem: 'The framework\'s recommended sandbox baseline denies Bash(curl *). However, the tools/osv and tools/cve-org adapters documented bare curl | jq recipes, causing a deny-versus-adapter-recipes inconsistency.',
    how: [
      'Extended vetted-ops Core: Implemented a pure Python standard library (urllib.request) HTTP read backend alongside the existing gh subprocess backend.',
      'Strict Parameter Validation: Added regex constraints for _VULN_ID, _PACKAGE_NAME, _VERSION, and _COMMIT_HASH to prevent URL path traversal injections.',
      'Closed Catalogue Routing: Registered 5 operations built on closed endpoint templates configured in the vetted-ops policy [endpoints] block.',
      'Preserved Output Formats: Designed the dispatcher to output raw JSON payloads to stdout, preserving the existing jq processing pipelines.'
    ],
    feedback: {
      text: 'LGTM — every blocking point from both reviews is addressed in the tree, the affected eval suites show no regression, and CI is green. Approving. ... That was the finding I most wanted closed, and it came back stronger than I asked for.',
      author: 'Jarek Potiuk (@potiuk) — ASF Board & PMC Member'
    }
  },
  {
    pr: 'PR #1297',
    url: 'https://github.com/apache/magpie/pull/1297',
    issue: 'Issue #311',
    issueUrl: 'https://github.com/apache/magpie/issues/311',
    category: 'Vulnerability Infrastructure',
    categoryId: 'security',
    title: 'OSV.dev Vulnerability Cross-Reference Adapter',
    problem: 'Security teams need to detect duplicate reports and map GHSA to existing CVEs before allocating a new CVE ID. Magpie needed a read-only tools/osv/ adapter without compromising embargoed reports.',
    how: [
      'Four Standard API Operations: Authored POSIX curl + jq operations covering get-vuln, query-package, query-commit, and query-batch.',
      'Strict Embargo Boundary: Explicitly defined rules forbidding the transmission of private reproducer commits or embargoed issue numbers to OSV.dev\'s public servers.',
      'Full Taxonomy Sync: Integrated contract:security-cross-ref across registry docs, labels, vendor-neutrality matrix, and validators.',
      'Egress Gateway Integration: Whitelisted api.osv.dev in tools/egress-gateway to ensure production readiness under default-deny network proxies.'
    ],
    feedback: {
      text: 'Approving. Everything from the previous two rounds is fixed... Verified against the tree, not the description... Thanks for the patience through three rounds.',
      author: 'Jarek Potiuk (@potiuk) — ASF Board & PMC Member'
    }
  },
  {
    pr: 'PR #1287',
    url: 'https://github.com/apache/magpie/pull/1287',
    issue: 'Issue #318',
    issueUrl: 'https://github.com/apache/magpie/issues/318',
    category: 'Agent Harnesses',
    categoryId: 'agentic',
    title: 'GitHub Copilot CLI and Coding Agent Skill Runtime',
    problem: 'GitHub provides two major Copilot surfaces: standalone terminal CLI and server-side autonomous Coding Agent. The framework lacked guides showing how both surfaces execute Magpie skills safely without unreviewed mutations or leaking embargoed security issues.',
    how: [
      'Surface Differentiation: Separated interactive human triagers using the standalone copilot binary from automated server-side runs by the Coding Agent.',
      'Standalone CLI Migration: Targeted modern agentic toolchain (npm install -g @github/copilot) following GitHub\'s deprecation of legacy gh copilot.',
      'HITL Enforcement: Enforced disabling of permissive flags (--allow-all, --yolo) and mandated strict Draft Pull Request policy for server-side Coding Agents.',
      'Privacy Boundary: Documented privacy opting via <project-config>/privacy-llm.md for triagers handling <security-list> embargoed vulnerability disclosures.',
      'MCP Integration: Formatted local MCP server configs using Copilot CLI ~/.copilot/mcp-config.json schema ("type": "local", "tools": ["*"]).'
    ],
    feedback: {
      text: 'LGTM, approving — the rewrite matches the standalone Copilot CLI and I checked the install commands, -p, --allow-all / --yolo, ~/.copilot/mcp-config.json, @copilot and the privacy framing against GitHub\'s docs.',
      author: 'Jarek Potiuk (@potiuk) — ASF Board & PMC Member'
    }
  },
  {
    pr: 'PR #1286',
    url: 'https://github.com/apache/magpie/pull/1286',
    issue: 'Issue #317',
    issueUrl: 'https://github.com/apache/magpie/issues/317',
    category: 'Agent Harnesses',
    categoryId: 'agentic',
    title: 'Aider Terminal Pair Programming Agent Runtime Guide',
    problem: 'Aider does not automatically scan large directories of skills, and its default configuration performs automatic git commits after every turn, violating Magpie\'s human-in-the-loop review tenets.',
    how: [
      'On-Demand Skill Ingestion: Established the on-demand /read .agents/skills/magpie-*/SKILL.md pattern, loading specific workflows without bloating context windows across 70+ framework skills.',
      'Git Discipline Enforcement: Prescribed mandatory --no-auto-commits and --no-dirty-commits flags (auto-commits: false in .aider.conf.yml).',
      'Local LLM & Multi-Model Tiering: Documented multi-model --architect setups using vendor-neutral placeholders and local Ollama endpoints (export OLLAMA_API_BASE=http://127.0.0.1:11434).',
      'Environment Scrubbing: Configured .aiderignore rules to block accidental inclusion of sensitive tokens, environment files, and local overrides.'
    ],
    feedback: {
      text: 'Thanks, this follows the Goose guide\'s shape closely and the harness contract, agent-iso caveat and the .aider.conf.yml keys all check out against Aider\'s docs.',
      author: 'Jarek Potiuk (@potiuk) — ASF Board & PMC Member'
    }
  },
  {
    pr: 'PR #1217',
    url: 'https://github.com/apache/magpie/pull/1217',
    issue: 'Issue #319',
    issueUrl: 'https://github.com/apache/magpie/issues/319',
    category: 'HITL & Security',
    categoryId: 'security',
    title: 'Block\'s Goose Agentic CLI Runtime Guide',
    problem: 'By default, Block\'s Goose agent runs in autonomous mode (GOOSE_MODE: "auto"), modifying files and running shell commands without interactive approval modals.',
    how: [
      'Safety Mode Configuration: Mandated GOOSE_MODE: "approve" in ~/.config/goose/config.yaml to enforce per-action interactive confirmation modals.',
      'Declarative Recipe Subsystem: Designed a declarative recipe pattern (.goose/recipes/triage.yaml) wrapping Magpie skills without duplicating underlying skill files.',
      'MCP Protocol Accuracy: Documented Goose\'s supported transport types (stdio and streamable_http) connecting to Apache Projects and PonyMail MCP servers.',
      'Transparent Isolation Caveat: Documented Layer 0 environment stripping mechanics of agent-iso goose regarding SSH_AUTH_SOCK preservation and push gating.'
    ],
    feedback: {
      text: 'All four blockers are genuinely fixed — I checked each against the pushed content, not the commit message... The Layer 0 / SSH_AUTH_SOCK caveat you added wasn\'t something I asked for explicitly and it\'s the right instinct — that\'s the part an adopter most needs to see.',
      author: 'Jarek Potiuk (@potiuk) — ASF Board & PMC Member'
    }
  },
  {
    pr: 'PR #1206',
    url: 'https://github.com/apache/magpie/pull/1206',
    issue: 'Issue #315',
    issueUrl: 'https://github.com/apache/magpie/issues/315',
    category: 'Local Inference',
    categoryId: 'local',
    title: 'Local LLM (Ollama / llama.cpp / vLLM) Skill Runtime Guide',
    problem: 'ASF projects require sovereign, privacy-preserving infrastructure for handling embargoed security disclosures and CVE triage where commercial cloud endpoints are prohibited.',
    how: [
      'Calibrated Capability Floors: Established empirical capability floors evaluated against tools/skill-evals/ (70B+ reasoning class for multi-step planning/reproduction vs 8B-14B for single-turn formatting).',
      'Universal OpenAI-Compatible APIs: Documented standard runners (Ollama, llama.cpp, vLLM) exposing /v1 endpoints connecting directly to open-source agent frontends.',
      'Air-Gapped Sovereign Posture: Validated zero-cloud telemetry architecture where model weights run strictly on private infrastructure.'
    ],
    feedback: {
      text: 'Nice one ! We will also have to add a privacy filtering to the mix (and explain that those private local LLMs do not need to have it set-up). But that can be a follow-up.',
      author: 'Jarek Potiuk (@potiuk) — ASF Board & PMC Member'
    }
  },
  {
    pr: 'PR #1204',
    url: 'https://github.com/apache/magpie/pull/1204',
    issue: 'Issue #316',
    issueUrl: 'https://github.com/apache/magpie/issues/316',
    category: 'Agent Harnesses',
    categoryId: 'agentic',
    title: 'Cursor Composer and Agent CLI Skill Runtime',
    problem: 'Contributors using Cursor IDE needed a standardized reference implementation showing how Cursor Composer and cursor-agent CLI discover and execute Magpie skills natively.',
    how: [
      'Universal Skill Discovery: Mapped Cursor\'s native workspace scanner directly to canonical .agents/skills/magpie-*/SKILL.md symlinks.',
      'Permission Alignment: Mapped Cursor\'s per-action approval modals to Magpie\'s proposal-then-confirm discipline, advising against unrestricted Auto-Runs.',
      'Headless Spec-Loop Execution: Documented cursor-agent CLI integration for headless triage passes and automated verification.',
      'Ecosystem Registration: Updated the adapter registry (docs/adapters/registry.md), contributing guidelines, and vendor-neutrality matrices.'
    ],
    feedback: {
      text: 'Approved and merged cleanly into main, establishing the canonical skill discovery architecture for subsequent agent harness adapters.',
      author: 'Jarek Potiuk (@potiuk) — ASF Board & PMC Member'
    }
  }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Contributions' },
  { id: 'agentic', label: 'Agent Harnesses' },
  { id: 'security', label: 'HITL & Security' },
  { id: 'local', label: 'Local Inference' }
];

export default function MagpieShowcasePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const filteredPRs = useMemo(() => {
    if (activeCategory === 'all') return MASTER_PR_CONTRIBUTIONS;
    return MASTER_PR_CONTRIBUTIONS.filter(item => item.categoryId === activeCategory);
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts = { all: MASTER_PR_CONTRIBUTIONS.length };
    MASTER_PR_CONTRIBUTIONS.forEach(item => {
      counts[item.categoryId] = (counts[item.categoryId] || 0) + 1;
    });
    return counts;
  }, []);

  const card = MAGPIE_CARD;
  const CardIcon = card.icon;

  return (
    <Layout
      title="apache/magpie"
      description="7 Merged Pull Requests across AI Agent Harness Runtimes, Vulnerability Cross-Referencing, and HITL Security for Apache Magpie."
    >
      <main className={styles.pageContainer}>
        <div className={styles.bgGlowWrapper} aria-hidden="true">
          <div className={styles.glowOrb} />
        </div>

        <div className={styles.contentWrapper}>
          <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
            <Link to="/opensource" className={styles.breadcrumbLink}>
              <ArrowLeft size={14} />
              <span>Open Source</span>
            </Link>
            <span>/</span>
            <span className={styles.breadcrumbCurrent}>apache/magpie Showcase</span>
          </nav>

          <header className={styles.heroHeader}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrowBadge}>
                <img
                  src="/img/apachelogo.png"
                  alt="Apache"
                  width={14}
                  height={14}
                  style={{ objectFit: 'contain', verticalAlign: 'middle', marginRight: 6 }}
                />
                Apache Software Foundation
              </span>
              <span className={styles.licenseBadge}>
                <ShieldCheck size={13} />
                <span>7 Merged PRs</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>apache/magpie</h1>
            <p className={styles.heroSubtitle}>
              Technical deep dive into 7 merged pull requests on Apache Magpie, the ASF's vendor-neutral security triage, CVE allocation, and reproducible vulnerability management framework.
            </p>

            <div className={styles.heroActionGroup}>
              <a
                href="https://github.com/apache/magpie/pulls?q=is%3Apr+is%3Amerged+author%3AKaap10"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <GitPullRequest size={15} />
                <span>View Merged PRs on GitHub</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://github.com/apache/magpie"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryBtn}
              >
                <IconGithub size={15} />
                <span>GitHub Repository</span>
                <ArrowUpRight size={13} />
              </a>

              <Link
                to="/opensource"
                className={styles.secondaryBtn}
              >
                <span>View All Open Source</span>
              </Link>
            </div>
          </header>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>7</div>
              <div className={styles.metricLabel}>Merged Pull Requests</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>100%</div>
              <div className={styles.metricLabel}>Merge Success Rate</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>RFC-AI-0004</div>
              <div className={styles.metricLabel}>Vendor-Neutral Standard</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>ASF PMC</div>
              <div className={styles.metricLabel}>Board Member Reviewed</div>
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <article className={openStyles.projectCard}>
              <div className={openStyles.cardHeader}>
                <div className={openStyles.indexCategoryWrap}>
                  <span className={openStyles.projectIndex}>{card.index}</span>
                  <div className={openStyles.iconBadge}>
                    <CardIcon size={16} />
                  </div>
                  <span className={openStyles.roleBadge}>{card.roleTag}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {card.license && (
                    <div className={openStyles.licenseBadge}>
                      <ShieldCheck size={13} />
                      <span>{card.license}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={openStyles.titleBlock}>
                <h2 className={openStyles.projectTitle}>{card.title}</h2>
                <p className={openStyles.projectTagline}>{card.headline}</p>
                <p className={openStyles.projectSummary}>{card.cardDescription}</p>
              </div>

              <div className={openStyles.highlightsContainer}>
                <span className={openStyles.highlightsHeader}>Key Engineering Deliverables</span>
                <ul className={openStyles.highlightsList}>
                  {card.highlights.map((h, i) => (
                    <li key={i} className={openStyles.highlightItem}>
                      <span className={openStyles.highlightDot}>•</span>
                      <span>
                        <strong className={openStyles.highlightLabel}>{h.label}: </strong>
                        <span className={openStyles.highlightText}>{h.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={openStyles.techTagsRow}>
                {card.techStack.map((t, idx) => (
                  <span key={idx} className={openStyles.techTag}>
                    {t}
                  </span>
                ))}
              </div>

              <div className={openStyles.cardFooter}>
                <div className={openStyles.footerLeft}>
                  <button
                    type="button"
                    className={`${openStyles.deepDiveBtn} ${isCardExpanded ? openStyles.deepDiveBtnActive : ''}`}
                    onClick={() => setIsCardExpanded(!isCardExpanded)}
                    aria-expanded={isCardExpanded}
                  >
                    <Layers size={14} />
                    <span>{isCardExpanded ? 'Hide Architecture Deep Dive' : 'View Architecture Deep Dive'}</span>
                    {isCardExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>

                <div className={openStyles.cardActions}>
                  {card.github && (
                    <a
                      href={card.github}
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
                  {card.prsUrl && (
                    <a
                      href={card.prsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={openStyles.actionBtn}
                      title="View Merged Pull Requests"
                    >
                      <GitPullRequest size={14} />
                      <span>Merged PRs</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>

              {isCardExpanded && (
                <div className={openStyles.deepDivePanel}>
                  <div className={openStyles.deepDiveDivider} />
                  <div className={openStyles.deepDiveContent}>
                    <h4 className={openStyles.deepDiveHeading}>System Architecture &amp; Implementation Details</h4>
                    {card.details.description.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className={openStyles.deepDiveParagraph}>
                        {paragraph}
                      </p>
                    ))}
                    {card.details.architectureFlow && (
                      <ArchitectureDiagramFlow flow={card.details.architectureFlow} projectId="magpie" />
                    )}
                    {card.details.metricsDetail && (
                      <div className={openStyles.metricsDetailBox}>
                        <span className={openStyles.metricsDetailLabel}>System Benchmarks &amp; Specs:</span>
                        <span className={openStyles.metricsDetailText}>{card.details.metricsDetail}</span>
                      </div>
                    )}

                    <div className={openStyles.deepDiveSection}>
                      <h5 className={openStyles.deepDiveSubheading}>Interview Talking Points (STAR Method)</h5>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.75rem' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '6px', padding: '0.85rem 1rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--vg-accent, #FF4D4F)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Situation</span>
                          <p style={{ margin: '0.35rem 0 0', fontSize: '0.86rem', color: '#CBD5E1', lineHeight: '1.55' }}>
                            The Apache Magpie framework required vendor-neutral runtime adapters to allow various AI agent harnesses (Copilot, Aider, Goose, Cursor, Local LLMs) to execute security triage skills safely without leaking embargoed vulnerabilities or performing unreviewed autonomous actions.
                          </p>
                        </div>
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '6px', padding: '0.85rem 1rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Task</span>
                          <p style={{ margin: '0.35rem 0 0', fontSize: '0.86rem', color: '#CBD5E1', lineHeight: '1.55' }}>
                            Engineer 7 major Pull Requests implementing runtime adapters for leading AI agent harnesses and vulnerability cross-referencing infrastructure while enforcing strict Human-in-the-Loop (HITL) boundaries, environment isolation (agent-iso), and Model Context Protocol (MCP) tool bridges under RFC-AI-0004.
                          </p>
                        </div>
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '6px', padding: '0.85rem 1rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FBBF24', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action</span>
                          <ul style={{ margin: '0.35rem 0 0', paddingLeft: '1.2rem', fontSize: '0.86rem', color: '#CBD5E1', lineHeight: '1.55' }}>
                            <li>Engineered the OSV.dev vulnerability cross-referencing bridge and routed HTTP operations through the <code>vetted-ops</code> Python dispatcher with strict regex validation.</li>
                            <li>Mapped platform-specific approval modalities (e.g., Goose <code>GOOSE_MODE="approve"</code>, Aider <code>--no-auto-commits</code>) to enforce proposal-then-confirm discipline.</li>
                            <li>Integrated <code>agent-iso</code> execution boundaries to scrub ambient cloud tokens before launching subshells.</li>
                            <li>Connected harnesses to PonyMail and Apache Projects MCP servers via JSON-RPC 2.0.</li>
                            <li>Calibrated local LLM capability floors (70B+ reasoning class) for air-gapped sovereign inference.</li>
                          </ul>
                        </div>
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '6px', padding: '0.85rem 1rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Result</span>
                          <ul style={{ margin: '0.35rem 0 0', paddingLeft: '1.2rem', fontSize: '0.86rem', color: '#CBD5E1', lineHeight: '1.55' }}>
                            <li>Successfully merged all 7 Pull Requests into <code>apache/magpie:main</code> with a 100% merge rate.</li>
                            <li>Collaborated directly with ASF Board/PMC maintainers, establishing the canonical skill discovery architecture and vulnerability triage bridges.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className={openStyles.deepDiveSection}>
                      <h5 className={openStyles.deepDiveSubheading}>Complete Technical Stack</h5>
                      <div className={openStyles.fullTechWrap}>
                        {card.details.allTech.map((techItem, tIdx) => (
                          <span key={tIdx} className={openStyles.fullTechChip}>
                            {techItem}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={openStyles.deepDiveSection}>
                      <h5 className={openStyles.deepDiveSubheading}>Complete Architectural Highlights</h5>
                      <ul className={openStyles.fullHighlightsList}>
                        {card.details.fullHighlights.map((fh, fhIdx) => (
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
          </div>

          <div className={styles.filterControlsBar}>
            <div className={styles.categoryFilterGroup}>
              {CATEGORY_FILTERS.map(f => (
                <button
                  key={f.id}
                  type="button"
                  className={`${styles.filterBtn} ${activeCategory === f.id ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveCategory(f.id)}
                >
                  <span>{f.label}</span>
                  <span className={styles.filterCountBadge}>{categoryCounts[f.id] || 0}</span>
                </button>
              ))}
            </div>

            <div className={styles.tableCountHint}>
              <span>Showing </span>
              <span className={styles.tableCountHighlight}>{filteredPRs.length}</span>
              <span> of </span>
              <span className={styles.tableCountHighlight}>{MASTER_PR_CONTRIBUTIONS.length}</span>
              <span> ranked pull requests</span>
            </div>
          </div>

          <div className={styles.tableContainerCard}>
            <div className={styles.prMasterTableWrap}>
              <table className={styles.prMasterTable}>
                <thead>
                  <tr>
                    <th className={styles.prLinkCol}>PR</th>
                    <th className={styles.issueLinkCol}>Issue</th>
                    <th className={styles.categoryCol}>Domain</th>
                    <th className={styles.problemCol}>What Is the Issue?</th>
                    <th className={styles.solutionCol}>How I Resolved It (Technical In-Depth)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPRs.map((prItem, idx) => (
                    <tr key={idx}>
                      <td className={styles.prLinkCol}>
                        <a
                          href={prItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.prBadgeLink}
                          title={`View ${prItem.pr} on GitHub`}
                        >
                          <span>{prItem.pr}</span>
                          <ArrowUpRight size={11} />
                        </a>
                      </td>

                      <td className={styles.issueLinkCol}>
                        {prItem.issue ? (
                          <a
                            href={prItem.issueUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.issueBadgeLink}
                            title={`View ${prItem.issue} on GitHub`}
                          >
                            <span>{prItem.issue}</span>
                            <ArrowUpRight size={10} />
                          </a>
                        ) : (
                          <span className={styles.foundationalBadge}>Foundational</span>
                        )}
                      </td>

                      <td className={styles.categoryCol}>
                        <span className={
                          prItem.categoryId === 'security'
                            ? styles.categoryTagDistributed
                            : prItem.categoryId === 'local'
                            ? styles.categoryTagAi
                            : styles.categoryTagReliability
                        }>
                          {prItem.category}
                        </span>
                      </td>

                      <td className={styles.problemCol}>
                        <div className={styles.prTitleText}>{prItem.title}</div>
                        <p className={styles.prProblemText}>{prItem.problem}</p>
                      </td>

                      <td className={styles.solutionCol}>
                        <div className={styles.prSolutionList}>
                          {prItem.how.map((point, ptIdx) => {
                            const colonIdx = point.indexOf(': ');
                            if (colonIdx !== -1) {
                              const term = point.substring(0, colonIdx);
                              const detail = point.substring(colonIdx + 2);
                              return (
                                <div key={ptIdx} className={styles.prSolutionPoint}>
                                  <span className={styles.prBullet}>•</span>
                                  <div className={styles.pointTextWrap}>
                                    <strong className={styles.techTerm}>{term}:</strong>{' '}
                                    <span className={styles.techDetail}>{detail}</span>
                                  </div>
                                </div>
                              );
                            }
                            return (
                              <div key={ptIdx} className={styles.prSolutionPoint}>
                                <span className={styles.prBullet}>•</span>
                                <span className={styles.techDetail}>{point}</span>
                              </div>
                            );
                          })}

                          {prItem.feedback && (
                            <div className={styles.tableFeedbackBox}>
                              <div className={styles.tableFeedbackHeader}>
                                <MessageSquareQuote size={12} />
                                <span>Maintainer Code Review</span>
                              </div>
                              <p className={styles.tableFeedbackText}>"{prItem.feedback.text}"</p>
                              <span className={styles.tableFeedbackAuthor}>— {prItem.feedback.author}</span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </Layout>
  );
}

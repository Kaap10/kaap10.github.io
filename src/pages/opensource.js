import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
  ArrowRight,
  ArrowUpRight,
  GitPullRequest,
  Database,
  Cpu,
  Boxes,
  Layers,
  Shield,
  Terminal,
  Zap,
  Activity,
  CheckCircle2,
  Clock
} from 'lucide-react';
import styles from './opensource.module.css';
import ParticleCanvas from '@site/src/components/ParticleCanvas';
import contributionsData from '@site/src/data/contributions.json';

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'agents', label: 'AI Agents & Models' },
  { id: 'security', label: 'AI Security & Red Teaming' },
  { id: 'database', label: 'Vector & Memory Engines' },
  { id: 'tooling', label: 'Infrastructure & Tooling' },
];

const OSS_PROJECTS = [
  {
    id: 'picadolabs',
    name: 'PicadoLabs',
    org: 'PicadoLabs Projects',
    role: 'Owner & Maintainer',
    roleType: 'owner',
    category: 'agents',
    repoMatcher: (repo) => repo.toLowerCase().startsWith('picadolabs/'),
    defaultMerged: 27,
    defaultOpen: 0,
    logoType: 'img',
    logoSrc: '/img/picadolabs.png',
    description: 'Autonomous AI orchestration, dynamic cost/latency model routing architectures, automated PR review engines, and production developer agent systems.',
    highlights: 'Engineered Thompson Sampling RL for model routing, ONNX prompt embedding classifier, Pareto benchmark evaluator, and native MCP workflow scaffolding.',
    tech: ['Model Router', 'Thompson Sampling RL', 'MCP Server', 'ONNX', 'TypeScript'],
    deepDiveUrl: '/opensource/picadolabs',
    githubUrl: 'https://github.com/search?q=org%3APicadoLabs+is%3Apr+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'magpie',
    name: 'Apache Magpie',
    org: 'Apache Software Foundation',
    role: 'Contributor',
    roleType: 'contributor',
    category: 'agents',
    repoMatcher: (repo) => repo.toLowerCase() === 'apache/magpie',
    defaultMerged: 31,
    defaultOpen: 1,
    logoType: 'img',
    logoSrc: '/img/apachelogo.png',
    description: 'Agent-assisted maintainership and development framework for Apache projects (triage, mentoring, human-reviewed agent drafting, and pairing).',
    highlights: 'Authored review findings data models (#1920), step-hook-manager-shim eval suite (#1892), public-surface-scrub security tests (#1856), and interactive findings UI (#1954).',
    tech: ['Apache Foundation', 'Agentic Triage', 'Hook Manager', 'Security Testing', 'Python'],
    deepDiveUrl: '/opensource/magpie',
    githubUrl: 'https://github.com/search?q=repo%3Aapache%2Fmagpie+is%3Apr+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'pyrit',
    name: 'Microsoft PyRIT',
    org: 'Microsoft AI Red Team',
    role: 'Contributor',
    roleType: 'contributor',
    category: 'security',
    repoMatcher: (repo) => repo.toLowerCase() === 'microsoft/pyrit',
    defaultMerged: 21,
    defaultOpen: 4,
    logoType: 'img',
    logoSrc: '/img/mslogo.png',
    description: "Microsoft's open-source Python Risk Identification Tool for GenAI. Enables automated multi-turn adversarial attacks and red teaming for LLM systems.",
    highlights: 'Built security scorers for Path Traversal (#3488), XXE injection (#3486), multi-engine RCE gadgets in SSTI (#3541), hallucinated package detection (#3693), and atomic attempt accounting (#3774).',
    tech: ['AI Red Teaming', 'Jailbreak Scoring', 'XXE & Path Traversal', 'GenAI Security', 'Python'],
    deepDiveUrl: '/opensource/pyrit',
    githubUrl: 'https://github.com/search?q=repo%3Amicrosoft%2FPyRIT+is%3Apr+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'dynavec',
    name: 'DynaVec',
    org: 'codeforstartups',
    role: 'Collaborator',
    roleType: 'collaborator',
    category: 'database',
    repoMatcher: (repo) => repo.toLowerCase() === 'codeforstartups/dynavec',
    defaultMerged: 21,
    defaultOpen: 0,
    logoType: 'icon',
    icon: Cpu,
    description: 'Serverless hybrid vector database engine built on DynamoDB and Amazon S3 Vectors for ultra-low latency semantic embeddings.',
    highlights: 'Implemented core ReAct & Planner agent primitives (#319), tool registry connectors (#328), real-time async streaming (astream) for OpenAI & Anthropic (#329), and DynaFlow retry/fallback policies (#338).',
    tech: ['Hybrid Vector DB', 'ReAct Agents', 'Async Streaming', 'DynamoDB', 'Python'],
    deepDiveUrl: '/opensource/dynavec',
    githubUrl: 'https://github.com/search?q=repo%3Acodeforstartups%2Fdynavec+is%3Apr+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'semantic-router',
    name: 'vLLM Semantic Router',
    org: 'vLLM Project',
    role: 'Contributor',
    roleType: 'contributor',
    category: 'agents',
    repoMatcher: (repo) => repo.toLowerCase() === 'vllm-project/semantic-router',
    defaultMerged: 1,
    defaultOpen: 1,
    logoType: 'icon',
    icon: Zap,
    description: 'An open, programmable routing and decision layer for LLM inference models, compute clusters, and intelligent request arbitration.',
    highlights: 'Hardened CLI configuration file operations with explicit UTF-8 encoding (#5339) and implemented runtime model naming deduplication and collision validation (#5650).',
    tech: ['vLLM Ecosystem', 'Inference Gateway', 'CLI Operations', 'Model Runtime', 'Python'],
    deepDiveUrl: null,
    githubUrl: 'https://github.com/search?q=repo%3Avllm-project%2Fsemantic-router+is%3Apr+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'airflow',
    name: 'Apache Airflow',
    org: 'Apache Software Foundation',
    role: 'Contributor',
    roleType: 'contributor',
    category: 'tooling',
    repoMatcher: (repo) => repo.toLowerCase() === 'apache/airflow',
    defaultMerged: 1,
    defaultOpen: 2,
    logoType: 'img',
    logoSrc: '/img/apachelogo.png',
    description: 'The industry-standard platform to programmatically author, schedule, and orchestrate complex distributed workflows and data pipelines.',
    highlights: 'Enhanced REST API stability by translating domain ValueErrors into proper HTTPExceptions across Task State Store (#73753) and Asset State Store (#74179) routes, plus strengthened test suite assertions (#73939).',
    tech: ['Workflow Orchestration', 'REST API', 'Task State Store', 'Python', 'FastAPI'],
    deepDiveUrl: null,
    githubUrl: 'https://github.com/search?q=repo%3Aapache%2Fairflow+is%3Apr+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'sqlite-graph-memory',
    name: 'SQLite Graph Memory',
    org: 'tonydzi',
    role: 'Collaborator',
    roleType: 'collaborator',
    category: 'database',
    repoMatcher: (repo) => repo.toLowerCase() === 'tonydzi/sqlite-graph-memory',
    defaultMerged: 5,
    defaultOpen: 0,
    logoType: 'icon',
    icon: Database,
    description: 'Agent memory substrate and Graph RAG over Obsidian and markdown notes for Claude Code, Cursor, and Codex using SQLite.',
    highlights: 'Shipped MCP server runtime & example integrations (#8), handled empty recall results safely (#10, #14), added JSON-RPC -32600 invalid payload validation (#32), and process exit propagation (#33).',
    tech: ['Graph RAG', 'MCP Server', 'SQLite', 'Claude Code / Cursor', 'TypeScript'],
    deepDiveUrl: '/opensource/sqlite-graph-memory',
    githubUrl: 'https://github.com/search?q=repo%3Atonydzi%2Fsqlite-graph-memory+is%3Apr+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'devtools',
    name: 'Angular DevTools',
    org: 'pangular-inspector',
    role: 'Contributor',
    roleType: 'contributor',
    category: 'tooling',
    repoMatcher: (repo) => repo.toLowerCase() === 'pangular-inspector/devtools',
    defaultMerged: 3,
    defaultOpen: 0,
    logoType: 'icon',
    icon: Terminal,
    description: 'Inspection tooling for Angular components, signals, DI, and routes — operating as Chrome extension, embedded panel, CLI, or MCP server for coding agents.',
    highlights: 'Contributed clear-recordings agent MCP tool (#365), non-component element tree traversal in walkAngularTree overlay (#12), and parsed redirectTo and route metadata (#10).',
    tech: ['Angular Signals', 'MCP Tools', 'Chrome Extension', 'DevTools', 'TypeScript'],
    deepDiveUrl: null,
    githubUrl: 'https://github.com/search?q=repo%3Apangular-inspector%2Fdevtools+is%3Apr+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'layer5io',
    name: 'Layer5 IO & Meshery',
    org: 'Cloud Native Ecosystem',
    role: 'Contributor',
    roleType: 'contributor',
    category: 'tooling',
    repoMatcher: (repo) => repo.toLowerCase().includes('layer5') || repo.toLowerCase().includes('meshery'),
    defaultMerged: 4,
    defaultOpen: 1,
    logoType: 'img',
    logoSrc: '/img/layer5.png',
    description: 'Service mesh management plane, visual cloud native orchestration, and hands-on academy learning paths for modern container infrastructure.',
    highlights: 'Upgraded container runtime prerequisites (Kind & Podman, #276, #278), repaired Meshery playground routes (#274), and updated Service Mesh Performance specifications.',
    tech: ['Service Mesh', 'Kubernetes', 'Kind', 'Podman', 'Cloud Native'],
    deepDiveUrl: '/opensource/layer5io',
    githubUrl: 'https://github.com/search?q=org%3Alayer5io+is%3Apr+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'palinode',
    name: 'Palinode',
    org: 'phasespace-labs',
    role: 'Contributor',
    roleType: 'contributor',
    category: 'database',
    repoMatcher: (repo) => repo.toLowerCase() === 'phasespace-labs/palinode',
    defaultMerged: 3,
    defaultOpen: 0,
    logoType: 'icon',
    icon: Boxes,
    description: 'The memory substrate for AI agents and developer tools: file-native, git-versioned, and MCP-first distributed state replication.',
    highlights: 'Normalized path guards to POSIX forward slashes across operating systems (#228), implemented non-signaling Win32 process liveness checks for Windows worktrees (#215), and added AST diagnostics guards (#207).',
    tech: ['Distributed Memory', 'Win32 API', 'Git Worktrees', 'MCP', 'Python'],
    deepDiveUrl: '/opensource/palinode',
    githubUrl: 'https://github.com/search?q=repo%3Aphasespace-labs%2Fpalinode+is%3Apr+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'agent-governance-toolkit',
    name: 'Agent Governance Toolkit',
    org: 'Microsoft',
    role: 'Contributor',
    roleType: 'contributor',
    category: 'security',
    repoMatcher: (repo) => repo.toLowerCase() === 'microsoft/agent-governance-toolkit',
    defaultMerged: 0,
    defaultOpen: 1,
    logoType: 'img',
    logoSrc: '/img/mslogo.png',
    description: 'Policy enforcement, zero-trust identity, execution sandboxing, and reliability engineering for autonomous AI agents covering OWASP Agentic Top 10.',
    highlights: 'Authored path traversal and prefix collision defenses in agent-hypervisor session isolation to prevent cross-session agent sandbox breaches (#4356).',
    tech: ['Agent Governance', 'Zero-Trust', 'OWASP Agentic Top 10', 'Sandbox Isolation', 'Python'],
    deepDiveUrl: null,
    githubUrl: 'https://github.com/search?q=repo%3Amicrosoft%2Fagent-governance-toolkit+is%3Apr+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'torch_tpu',
    name: 'Google PyTorch TPU Ops',
    org: 'google-pytorch',
    role: 'Contributor',
    roleType: 'contributor',
    category: 'tooling',
    repoMatcher: (repo) => repo.toLowerCase() === 'google-pytorch/torch_tpu',
    defaultMerged: 0,
    defaultOpen: 2,
    logoType: 'icon',
    icon: Cpu,
    description: 'PyTorch tensor compilation and hardware accelerator execution integration for Google Cloud TPUs.',
    highlights: 'Implemented strict shape and dimension validations in torch.addmv (#6011) and vector length equality enforcement in torch.dot (#5778) for reliable TPU kernel execution.',
    tech: ['PyTorch', 'Google Cloud TPU', 'Tensor Kernels', 'Linear Algebra', 'Python / C++'],
    deepDiveUrl: null,
    githubUrl: 'https://github.com/search?q=repo%3Agoogle-pytorch%2Ftorch_tpu+is%3Apr+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'quater',
    name: 'Quater Framework',
    org: 'DevilsAutumn',
    role: 'Contributor',
    roleType: 'contributor',
    category: 'tooling',
    repoMatcher: (repo) => repo.toLowerCase() === 'devilsautumn/quater',
    defaultMerged: 1,
    defaultOpen: 0,
    logoType: 'icon',
    icon: Layers,
    description: 'Backend web framework where a unified handler is exposed simultaneously as an HTTP endpoint, MCP tool, or CLI action.',
    highlights: 'Fixed remote action commands by properly forwarding custom CLI headers and request context (#192).',
    tech: ['Unified Handlers', 'MCP Tools', 'CLI Actions', 'Async Web', 'Python'],
    deepDiveUrl: '/opensource/quater',
    githubUrl: 'https://github.com/search?q=repo%3ADevilsAutumn%2Fquater+is%3Apr+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'monorepo-doctor',
    name: 'Monorepo Doctor',
    org: 'santoshyadavdev',
    role: 'Contributor',
    roleType: 'contributor',
    category: 'tooling',
    repoMatcher: (repo) => repo.toLowerCase() === 'santoshyadavdev/monorepo-doctor',
    defaultMerged: 1,
    defaultOpen: 0,
    logoType: 'icon',
    icon: Shield,
    description: 'AI agent skill that audits JavaScript & TypeScript monorepos (Turborepo, Nx, pnpm, bun) for boundary leaks and circular dependencies.',
    highlights: 'Patched AST import scanner to preserve default imports when mixed with type specifiers during monorepo package audits (#4).',
    tech: ['Monorepo Architecture', 'AST Scanners', 'Turborepo / Nx', 'TypeScript'],
    deepDiveUrl: null,
    githubUrl: 'https://github.com/search?q=repo%3Asantoshyadavdev%2Fmonorepo-doctor+is%3Apr+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'philanthropy',
    name: 'PhilanthroPy',
    org: 'PhilanthroPy Project',
    role: 'Contributor',
    roleType: 'contributor',
    category: 'tooling',
    repoMatcher: (repo) => repo.toLowerCase() === 'philanthropy-project/philanthropy',
    defaultMerged: 1,
    defaultOpen: 0,
    logoType: 'icon',
    icon: Activity,
    description: 'Scikit-learn native predictive analytics library for donor propensity, planned giving, and wealth screening.',
    highlights: 'Hardened EncounterRecencyTransformer with timezone lookup defensive guards for resilient temporal feature transformations (#221).',
    tech: ['Scikit-Learn', 'Feature Transformers', 'Predictive Modeling', 'Python'],
    deepDiveUrl: null,
    githubUrl: 'https://github.com/search?q=repo%3APhilanthroPy-Project%2FPhilanthroPy+is%3Apr+author%3AKaap10&type=pullrequests',
  },
];

// Helper to compute exact project counts from the 158 verified GitHub PRs
function computeVerifiedCounts() {
  const result = {
    totalMerged: 0,
    totalOpen: 0,
    totalRepos: 31,
  };

  OSS_PROJECTS.forEach((p) => {
    result[p.id] = { merged: 0, open: 0 };
  });

  if (contributionsData?.items) {
    const repoSet = new Set();
    contributionsData.items.forEach((item) => {
      if (item.repo) repoSet.add(item.repo);
      if (item.status === 'merged') result.totalMerged++;
      if (item.status === 'open') result.totalOpen++;

      OSS_PROJECTS.forEach((p) => {
        if (p.repoMatcher(item.repo || '')) {
          if (item.status === 'merged') result[p.id].merged++;
          if (item.status === 'open') result[p.id].open++;
        }
      });
    });

    if (repoSet.size > 0) result.totalRepos = repoSet.size;
  }

  // Ensure minimum baseline from project defaults
  OSS_PROJECTS.forEach((p) => {
    if (p.defaultMerged && result[p.id].merged < p.defaultMerged) {
      result[p.id].merged = p.defaultMerged;
    }
    if (p.defaultOpen && result[p.id].open < p.defaultOpen) {
      result[p.id].open = p.defaultOpen;
    }
  });

  return result;
}

export default function OpenSourcePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [counts, setCounts] = useState(() => computeVerifiedCounts());

  // Clear stale cached items from previous truncated calls
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('gh_org_counts_v1_Kaap10');
        localStorage.removeItem('gh_oss_counts_v2_Kaap10');
      } catch {}
    }
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return OSS_PROJECTS;
    return OSS_PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <Layout
      title="Open Source"
      description="Production open-source contributions to Apache, Microsoft PyRIT, vLLM Semantic Router, DynaVec, and developer agent ecosystems by Vardhman Gupta."
      noFooter
    >
      <main className={styles.pageContainer}>
        {/* Subtle Ambient Glow & Particle Backdrop */}
        <div className={styles.bgGlowWrapper} aria-hidden="true">
          <div className={styles.glowOrb} />
          <ParticleCanvas />
        </div>

        <div className={styles.contentWrapper}>
          {/* Header */}
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Open Source</h1>
            <p className={styles.pageSubtitle}>
              Production-grade contributions to tier-1 enterprise foundations, AI red teaming engines, distributed vector databases, and developer agent frameworks.
            </p>

            <div className={styles.statsBadgeRow}>
              <span className={styles.statsBadge}>
                <strong className={styles.highlightCount}>{counts.totalMerged || 138}+</strong> Merged Pull Requests
              </span>
              <span className={styles.statsBadge}>
                <strong className={styles.highlightCountBlue}>{counts.totalOpen || 12}</strong> In-Progress Active PRs
              </span>
              <span className={styles.statsBadge}>
                <strong className={styles.highlightCountPurple}>{counts.totalRepos || 31}</strong> Ecosystem Repositories
              </span>
              <Link to="/contribution" className={styles.viewAllContribLink}>
                <span>Live PR Activity Feed</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Category Filter Tabs */}
            <div className={styles.filterBar}>
              {CATEGORIES.map((cat) => {
                const count = cat.id === 'all' 
                  ? OSS_PROJECTS.length 
                  : OSS_PROJECTS.filter((p) => p.category === cat.id).length;
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span>{cat.label}</span>
                    <span className={styles.filterCount}>{count}</span>
                  </button>
                );
              })}
            </div>
          </header>

          {/* 2-Column Grid Box Cards */}
          <div className={styles.grid}>
            {filteredProjects.map((project) => {
              const projectCounts = counts[project.id] || { 
                merged: project.defaultMerged, 
                open: project.defaultOpen 
              };
              const mergedCount = projectCounts.merged ?? project.defaultMerged;
              const openCount = projectCounts.open ?? project.defaultOpen;

              return (
                <div key={project.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.projectInfo}>
                      <div className={styles.logoWrap}>
                        {project.logoType === 'img' ? (
                          <img src={project.logoSrc} alt="" className={styles.logoImg} />
                        ) : (
                          <project.icon size={18} className={styles.logoIcon} />
                        )}
                      </div>

                      <div className={styles.titleArea}>
                        <span className={styles.projectName}>{project.name}</span>
                        <span className={styles.orgSubtitle}>{project.org}</span>
                      </div>
                    </div>

                    <span className={`${styles.roleTag} ${styles['role_' + project.roleType]}`}>
                      {project.role}
                    </span>
                  </div>

                  <p className={styles.description}>{project.description}</p>

                  {/* Tech Tags */}
                  {project.tech && (
                    <div className={styles.tagRow}>
                      {project.tech.map((t) => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                  )}

                  <div className={styles.cardFooter}>
                    <div className={styles.prBadgeGroup}>
                      {mergedCount > 0 && (
                        <span className={styles.prBadge} title={`${mergedCount} Merged Pull Requests`}>
                          <GitPullRequest size={12} className={styles.prBadgeIcon} />
                          <span>{mergedCount} Merged</span>
                        </span>
                      )}
                      {openCount > 0 && (
                        <span className={styles.openPrBadge} title={`${openCount} Active In-Review PRs`}>
                          <Clock size={11} />
                          <span>{openCount} In Review</span>
                        </span>
                      )}
                    </div>

                    <div className={styles.actionButtons}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.prLink}
                        title="View pull requests on GitHub"
                      >
                        <span>GitHub PRs</span>
                        <ArrowUpRight size={12} />
                      </a>

                      {/* Deep Dive button temporarily hidden - will enable in future
                      {project.deepDiveUrl && (
                        <Link to={project.deepDiveUrl} className={styles.deepDiveLink}>
                          <span>Deep Dive</span>
                          <ArrowRight size={12} />
                        </Link>
                      )}
                      */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </Layout>
  );
}

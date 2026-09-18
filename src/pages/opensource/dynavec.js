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
  CheckCircle2
} from 'lucide-react';
import styles from './dynavec.module.css';
import openStyles from '../opensource.module.css';

const IconGithub = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const DYNAVEC_CARD = {
  id: 'dynavec',
  index: '02',
  roleTag: 'Contributor · 11 Merged PRs',
  icon: Package,
  title: 'dynavec',
  headline: 'Serverless Hybrid Vector Database on DynamoDB & S3',
  cardDescription:
    'Serverless vector database engine. Authored 11 merged PRs spanning dynamic SPFresh partitioning, FastMCP GraphRAG server, and cloud diagnostic CLI.',
  license: '11 Merged PRs',
  techStack: ['Python', 'DynamoDB', 'AWS S3 Vectors', 'SPFresh Indexing', 'FastMCP', 'GraphRAG', 'pytest', 'PEP 561'],
  highlights: [
    {
      label: 'SPFresh Rebalancer (PR #170, #144, #116)',
      text: 'Dynamic spherical 2-means bipartitioning, nearest-centroid merges, and non-blocking RLock buffers.'
    },
    {
      label: 'FastMCP & GraphRAG (PR #165, #120, #119)',
      text: 'Model Context Protocol server for agent vector search / GraphRAG, and SHA-256 ingestion deduplication.'
    },
    {
      label: 'Packaging & Diagnostics (PR #163, #154, #155, #2, #1)',
      text: 'PEP 561 typing compliance, dynavec doctor AWS pre-flight diagnostic CLI, and cycle-safe graph traversals.'
    }
  ],
  github: 'https://github.com/codeforstartups/dynavec',
  prsUrl: 'https://github.com/codeforstartups/dynavec/pulls?q=is%3Apr+is%3Amerged+author%3AKaap10',
  tags: ['Open Source', 'Vector Database', 'Python', 'SPFresh', 'FastMCP', 'GraphRAG', 'DynamoDB', 'AWS S3'],
  details: {
    description:
      'dynavec is a serverless hybrid vector database engineered on top of Amazon DynamoDB and Amazon S3 Vectors. As an active open-source core contributor across 11 merged PRs, engineered core vector database algorithms, ecosystem integrations, and production diagnostic tooling.\n\nKey architectural contributions include implementing the SPFresh-style incremental hot index rebalancing engine featuring dynamic spherical 2-means bipartitioning, nearest-centroid merges, normalized drift tracking, and concurrent non-blocking RLock memory buffers. Also built the official FastMCP server supporting semantic vector search, hybrid filtering, and multi-hop Knowledge Graph traversal for LLM agents (Claude Desktop, Cursor, Antigravity).\n\nAdditionally designed the dynavec doctor AWS pre-flight diagnostic health check CLI, implemented SHA-256 content-hash deduplication eliminating redundant embedding API calls, enforced PEP 561 typing compliance (py.typed), hardened cycle-safe GraphRAG traversal algorithms, validated 100+ key chunked S3 batch retrievals, and resolved Python 3.9 multi-version packaging compatibility.',
    allTech: [
      'Python',
      'DynamoDB',
      'Amazon S3 Vectors',
      'SPFresh Algorithm',
      'Spherical 2-Means',
      'FastMCP',
      'GraphRAG',
      'AWS STS / IAM',
      'SHA-256 Hashing',
      'NumPy',
      'boto3',
      'pytest',
      'Ruff',
      'mypy / PEP 561',
      'Hatchling'
    ],
    fullHighlights: [
      'PR #170 (Issue #80): Designed and implemented SPFresh-style incremental hot index rebalancing engine with dynamic 2-means bipartitioning, nearest-centroid merges, normalized drift tracking, non-blocking RLock concurrency, and 27-test validation suite',
      'PR #165 (Issue #65): Built standalone FastMCP server (dynavec.mcp.server) exposing vector search, hybrid filtering, and multi-hop Knowledge Graph traversal with zero-config AWS credential detection and CLI entrypoint',
      'PR #144 (Issue #87): Engineered dynavec doctor AWS pre-flight diagnostic health check CLI validating STS credentials, S3 Vectors index accessibility, and DynamoDB table permissions with actionable remediation',
      'PR #120 (Issue #63): Implemented in-run SHA-256 content-hash document deduplication to eliminate redundant LLM embedding API calls and database bloat during batch ingestion',
      'PR #163 (Issue #105): Authored comprehensive production FAQ and system constraints architecture documentation covering AWS region latency, 4,096-dim vector ceiling, and cost structures',
      'PR #154 (Issue #111): Added PEP 561 static type hint compliance marker (src/dynavec/py.typed) and configured Hatchling wheel packaging for mypy and IDE discovery',
      'PR #155 (Issue #34): Built Knowledge Graph traversal infinite-cycle regression test suite verifying breadth-first traversal terminates safely within depth bounds without circular loops',
      'PR #116 (Issue #14): Validated AWS S3 Vectors 100+ key chunked batch retrieval mechanics across 250-key multi-part requests',
      'PR #119 (Issue #9): Added runtime validation intercepting embedder dimension mismatches before executing network calls and resolved Ruff linter violations',
      'PR #2 (Foundational): Hardened text chunking and Reciprocal Rank Fusion (RRF) retrieval edge cases (whitespace chunks, empty candidate lists, weight configs)',
      'PR #1 (Foundational): Resolved Python 3.9 dependency resolution by adding explicit PEP 508 environment markers for MCP and CrewAI dependencies',
    ],
    metricsDetail: '11 Merged PRs · Serverless Hybrid Vector DB · SPFresh Vector Rebalancing · FastMCP & GraphRAG · AWS Doctor CLI · PEP 561',
  },
};

const MASTER_PR_CONTRIBUTIONS = [
  {
    pr: 'PR #170',
    url: 'https://github.com/codeforstartups/dynavec/pull/170',
    issue: 'Issue #80',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/80',
    category: 'Distributed Systems',
    categoryId: 'distributed',
    title: 'SPFresh-Style Incremental Hot Index Rebalancing Engine',
    problem: 'Static vector clustering (IVF/SPANN) requires expensive full offline index rebuilds when vectors are dynamically added or deleted. Hot clusters become skewed and centroids drift, degrading search recall and causing latency spikes.',
    how: [
      'Dynamic 2-Means Bipartitioning: Designed and implemented SPFreshHotIndex which monitors partition sizes and splits overloaded clusters (N > N_max) via spherical 2-means with farthest-first seed initialization and unit-norm projection in <= 10 iterations.',
      'Nearest-Centroid Merge: Automatically consolidates underflowed clusters (N < N_min) into closest neighbor centroids with overflow guards preventing infinite split/merge oscillation.',
      'Drift Tracking & Boundary Migration: Implemented normalized centroid drift metric (Delta_drift = ||c_curr - c_anchor||_2 / ||c_anchor||_2) that dynamically migrates boundary vectors.',
      'Non-Blocking Concurrency: Engineered per-partition RLock and atomic memory snapshots allowing parallel read queries alongside active background maintenance via SPFreshRebalancer.',
      'Pre-Allocated Memory Buffer: Implemented chunk-doubling contiguous NumPy buffers for O(1) amortized insertion.',
      'Testing: Wrote comprehensive 27-test suite covering 1536-D OpenAI embeddings, brute-force recall benchmarks (>85%), and 8-thread reader/writer stress testing.'
    ]
  },
  {
    pr: 'PR #165',
    url: 'https://github.com/codeforstartups/dynavec/pull/165',
    issue: 'Issue #65',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/65',
    category: 'AI & Ecosystem',
    categoryId: 'ai',
    title: 'Ship FastMCP Server for Semantic and Knowledge Graph RAG',
    problem: 'AI coding assistants and agent frameworks (Claude Desktop, Cursor, Antigravity) lacked a standardized Model Context Protocol (MCP) server to query dynavec\'s vector search and Knowledge Graph traversal directly.',
    how: [
      'FastMCP Server (dynavec.mcp.server): Built a standalone MCP server exposing dynavec_search (with hybrid filtering, metric rescoring, and reranking) and dynavec_graph_search (multi-hop entity graph traversal combined with vector ranking).',
      'Zero-Config Environment Parser: Implemented client_from_env() automatically detecting AWS credentials and initializing bring-your-own-key embedders (OpenAI, Gemini, Voyage, Mistral, Bedrock, SentenceTransformers).',
      'CLI Entrypoint & Transports: Added dynavec mcp CLI supporting both stdio and sse transports with configurable ports.',
      'Lazy Loading Architecture: Guarded heavy MCP dependencies to keep core package installation lightweight (boto3 + numpy only).'
    ]
  },
  {
    pr: 'PR #144',
    url: 'https://github.com/codeforstartups/dynavec/pull/144',
    issue: 'Issue #87',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/87',
    category: 'Distributed Systems',
    categoryId: 'distributed',
    title: 'AWS Pre-Flight Diagnostic Health Check CLI (dynavec doctor)',
    problem: 'Users deploying dynavec into their AWS accounts frequently encountered silent runtime failures due to misconfigured STS credentials, missing IAM permissions, or non-existent S3 Vector buckets/DynamoDB tables.',
    how: [
      'Diagnostic Engine (src/dynavec/cli.py): Engineered the dynavec doctor command performing non-destructive, read-only validation of cloud infrastructure.',
      'Multi-Stage Validation Pipeline: Sequentially checks: (1) AWS STS identity and caller credentials, (2) S3 Vectors index accessibility, and (3) DynamoDB table read/write permissions.',
      'Actionable UX: Formatted diagnostic reports with clear ANSI color-coded pass/fail indicators, explicit error remediation tips, and Unix exit codes (0 for healthy, 1 for failure).',
      'Offline Testing: Authored credential-free unit tests in tests/test_cli.py mocking STS/boto3 failure modes.'
    ]
  },
  {
    pr: 'PR #120',
    url: 'https://github.com/codeforstartups/dynavec/pull/120',
    issue: 'Issue #63',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/63',
    category: 'AI & Ecosystem',
    categoryId: 'ai',
    title: 'In-Run Content-Hash Document Deduplication',
    problem: 'During large batch ingestion jobs, identical text chunks across documents were repeatedly embedded and upserted, causing excessive LLM embedding API billing and database bloat.',
    how: [
      'Content-Hashed Deduplication (src/dynavec/ingest.py): Added in-memory SHA-256 content hashing across document ingestion pipelines.',
      'Cost & I/O Reduction: Evaluates chunk text hashes against an in-run hash set, silently skipping duplicate texts while preserving unique embeddings and metadata.',
      'Integration Testing: Updated ingestion test suites in tests/test_ingest.py to assert accurate deduplication counts across multi-document runs.'
    ]
  },
  {
    pr: 'PR #163',
    url: 'https://github.com/codeforstartups/dynavec/pull/163',
    issue: 'Issue #105',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/105',
    category: 'Reliability & Docs',
    categoryId: 'reliability',
    title: 'Production FAQ & System Constraints Architecture Docs',
    problem: 'Developers and platform architects lacked clarity on AWS region availability, vector dimensionality limits, consistency models, metadata splitting rules, and serverless cost structures.',
    how: [
      'Technical Documentation Page (opensource/dynavec/docs/faq.html): Authored a comprehensive production FAQ covering single-region latency optimizations, 4,096-dim vector ceiling, eventual consistency on ingest, and $3/mo cost breakdown.',
      'Metadata Architecture Details: Documented the architectural split between S3 Vectors (filterable indexed metadata) vs DynamoDB (400 KB hydrated document payload).',
      'Static Site Generator Integration: Integrated into tools/build_docs.py navigation matrix and regenerated global documentation.'
    ]
  },
  {
    pr: 'PR #154',
    url: 'https://github.com/codeforstartups/dynavec/pull/154',
    issue: 'Issue #111',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/111',
    category: 'Reliability & Docs',
    categoryId: 'reliability',
    title: 'PEP 561 Static Type Hint Compliance (py.typed)',
    problem: 'Downstream IDEs, mypy, and pyright were unable to discover dynavec\'s inline type hints because the package lacked PEP 561 compliance markers.',
    how: [
      'PEP 561 Marker: Added src/dynavec/py.typed marker file.',
      'Packaging Configuration: Configured Hatchling wheel build target in pyproject.toml (packages = ["src/dynavec"], include = ["src/dynavec/py.typed"]) ensuring type hint metadata is bundled into PyPI distribution wheels.',
      'Verification: Validated type checker discovery across clean virtual environment builds.'
    ]
  },
  {
    pr: 'PR #155',
    url: 'https://github.com/codeforstartups/dynavec/pull/155',
    issue: 'Issue #34',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/34',
    category: 'Reliability & Docs',
    categoryId: 'reliability',
    title: 'Knowledge Graph Traversal Infinite-Cycle Regression Suite',
    problem: 'Cyclic relationships in Knowledge Graphs (a -> b -> c -> a) risked causing infinite recursive loops and stack overflows during multi-hop GraphRAG traversals.',
    how: [
      'Cycle Detection Suite (tests/test_client_inmemory.py): Built regression tests constructing circular graph topologies.',
      'Termination & Isolation Checks: Verified breadth-first traversal algorithms terminate safely within depth bounds and strictly return reachable nodes without including the origin root entity.'
    ]
  },
  {
    pr: 'PR #116',
    url: 'https://github.com/codeforstartups/dynavec/pull/116',
    issue: 'Issue #14',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/14',
    category: 'Distributed Systems',
    categoryId: 'distributed',
    title: 'S3 Vectors 100+ Key Chunked Batch Retrieval Testing',
    problem: 'AWS S3 Vectors limits get_vectors API calls to 100 keys per request. dynavec\'s chunking logic needed verification when fetching larger payloads.',
    how: [
      'Batch Boundary Suite (tests/test_s3vectors.py): Designed test scenarios requesting 250 vector keys.',
      'Chunk Pagination Validation: Validated that dynavec correctly partitions keys into consecutive chunks of 100, 100, and 50, and seamlessly merges multi-part responses without key drops or order corruption.'
    ]
  },
  {
    pr: 'PR #119',
    url: 'https://github.com/codeforstartups/dynavec/pull/119',
    issue: 'Issue #9',
    issueUrl: 'https://github.com/codeforstartups/dynavec/issues/9',
    category: 'AI & Ecosystem',
    categoryId: 'ai',
    title: 'Embedder Dimension Mismatch Runtime Validation',
    problem: 'If a custom or third-party embedder model produced vector dimensions differing from the index\'s configured dimension, writes could corrupt storage indexes without clear error tracing.',
    how: [
      'Validation Guard (tests/test_client_inmemory.py): Added runtime dimension check verification confirming dynavec immediately intercepts dimension mismatches on write.',
      'Deterministic Error Handling: Verified DimensionMismatchError is raised before executing network calls, protecting database integrity.'
    ]
  },
  {
    pr: 'PR #2',
    url: 'https://github.com/codeforstartups/dynavec/pull/2',
    issue: null,
    issueUrl: null,
    category: 'Reliability & Docs',
    categoryId: 'reliability',
    title: 'Retrieval & Chunker Edge-Case Hardening',
    problem: 'Edge conditions in text chunking (whitespace-only text) and Reciprocal Rank Fusion (RRF) (mismatched weights, empty candidate lists) lacked test coverage.',
    how: [
      'Edge-Case Test Suite (tests/test_ingest.py, tests/test_retrieval.py): Validated whitespace-only chunk filtering, graceful handling of empty result lists in RRF, and weight vector dimension validation.'
    ]
  },
  {
    pr: 'PR #1',
    url: 'https://github.com/codeforstartups/dynavec/pull/1',
    issue: null,
    issueUrl: null,
    category: 'Reliability & Docs',
    categoryId: 'reliability',
    title: 'Python 3.9 Dependency Environment Markers',
    problem: 'uv and pip dependency resolution failed on Python 3.9 environments due to unconstrained Python 3.10+ sub-dependencies in pyproject.toml.',
    how: [
      'Environment Markers (pyproject.toml): Added explicit PEP 508 environment markers (mistralai>=2.0; python_version >= \'3.10\', mcp>=1.0; python_version >= \'3.10\', crewai>=0.70; python_version >= \'3.10\').',
      'Cross-Platform Compatibility: Allowed Python 3.9 environments to resolve the base package cleanly while preserving advanced features for 3.10+ runtimes.'
    ]
  }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Contributions' },
  { id: 'distributed', label: 'Distributed Systems' },
  { id: 'ai', label: 'AI & Ecosystem' },
  { id: 'reliability', label: 'Reliability & Packaging' }
];

export default function DynavecShowcasePage() {
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

  const card = DYNAVEC_CARD;
  const CardIcon = card.icon;

  return (
    <Layout
      title="dynavec"
      description="11 Merged Pull Requests across Distributed Vector Systems, GraphRAG FastMCP Server, and AWS Diagnostic Tooling for dynavec."
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
            <span className={styles.breadcrumbCurrent}>dynavec Showcase</span>
          </nav>

          {/* Hero Header */}
          <header className={styles.heroHeader}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrowBadge}>Open Source Contributions</span>
              <span className={styles.licenseBadge}>
                <ShieldCheck size={13} />
                <span>11 Merged PRs</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>dynavec</h1>
            <p className={styles.heroSubtitle}>
              Technical deep dive into 11 merged pull requests on dynavec, an open-source serverless hybrid vector database built on Amazon DynamoDB and Amazon S3 Vectors.
            </p>

            <div className={styles.heroActionGroup}>
              <a
                href="https://github.com/codeforstartups/dynavec/pulls?q=is%3Apr+is%3Amerged+author%3AKaap10"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <GitPullRequest size={15} />
                <span>View Merged PRs on GitHub</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://github.com/codeforstartups/dynavec"
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

          {/* Key Metric Stats Grid */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>11</div>
              <div className={styles.metricLabel}>Merged Pull Requests</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>3 Pillars</div>
              <div className={styles.metricLabel}>Core Architecture Domains</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>SPFresh</div>
              <div className={styles.metricLabel}>Vector Rebalancing Engine</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>FastMCP</div>
              <div className={styles.metricLabel}>GraphRAG Protocol Server</div>
            </div>
          </div>

          {/* Dynavec Project Card */}
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
                    {card.details.metricsDetail && (
                      <div className={openStyles.metricsDetailBox}>
                        <span className={openStyles.metricsDetailLabel}>System Benchmarks &amp; Specs:</span>
                        <span className={openStyles.metricsDetailText}>{card.details.metricsDetail}</span>
                      </div>
                    )}
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

          {/* Category Filter Controls */}
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

          {/* Master PR Contributions Table */}
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
                          prItem.categoryId === 'distributed'
                            ? styles.categoryTagDistributed
                            : prItem.categoryId === 'ai'
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

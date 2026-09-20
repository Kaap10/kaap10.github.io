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
  Share2,
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

const SQLITE_CARD = {
  id: 'sqlite-graph-memory',
  index: '06',
  roleTag: 'Contributor · Graph RAG & MCP Server',
  icon: Share2,
  title: 'tonydzi/sqlite-graph-memory',
  headline: 'Model Context Protocol (MCP) Server & Concurrency Scoping for Graph RAG Memory',
  cardDescription:
    'Lightweight, zero-dependency Model Context Protocol (MCP) server in pure Python stdlib for associative agent memory recall, crash-safe subprocess isolation, and granular error diagnostics.',
  license: '3 Merged PRs',
  techStack: ['Python stdlib', 'Model Context Protocol (MCP)', 'JSON-RPC 2.0', 'Graph RAG', 'SQLite', 'Subprocess Isolation', 'TDD (Red-Green)', 'pytest'],
  highlights: [
    {
      label: 'Native MCP Server Interface (PR #8, Issue #5)',
      text: 'Designed and built a zero-framework stdio JSON-RPC 2.0 MCP server exposing memory_recall tools for Claude Desktop and Cursor.'
    },
    {
      label: 'Concurrency Scoping & Noise Prevention (PR #10, Issue #9)',
      text: 'Introduced unique temporary file scoping via NamedTemporaryFile and BRAIN_ANSWER_OUT, eliminating race conditions and stdout prompt pollution.'
    },
    {
      label: 'Granular Error Diagnostics (PR #14, Issue #13)',
      text: 'Replaced swallowed read exceptions with explicit isError: True diagnostics, preventing false-positive empty recall results across 84 tests.'
    }
  ],
  github: 'https://github.com/tonydzi/sqlite-graph-memory',
  prsUrl: 'https://github.com/tonydzi/sqlite-graph-memory/pulls?q=is%3Apr+is%3Amerged+author%3AKaap10',
  tags: ['Open Source', 'Graph RAG', 'Model Context Protocol', 'Agentic Memory', 'SQLite', 'Python stdlib'],
  details: {
    description:
      'sqlite-graph-memory is an open-source agentic memory ledger combining dense vector search (e5-base) with wikilink graph traversal and cross-encoder reranking to provide zero-token-per-turn memory for AI agents.\n\nAcross 3 merged pull requests, built the official Model Context Protocol (MCP) server layer in pure Python standard library without external framework dependencies. Isolated model inference into crash-safe subprocesses, solved critical concurrency race conditions using per-call unique temporary files, and applied Red-to-Green Test-Driven Development (TDD) to prevent silent error swallowing.',
    allTech: [
      'Python Standard Library',
      'Model Context Protocol (MCP)',
      'JSON-RPC 2.0 over Stdio',
      'Graph-Augmented RAG',
      'Wikilink Graph Traversal',
      'Cross-Encoder Reranking',
      'Subprocess Concurrency Isolation',
      'NamedTemporaryFile Scoping',
      'Test-Driven Development (TDD)',
      'Mutation Testing with pytest'
    ],
    architectureFlow: {
      title: 'SQLite-Graph-Memory Native MCP & RAG Architecture Flow',
      mentalModel: {
        input: 'Claude Desktop & Cursor IDE JSON-RPC 2.0 (stdio) Requests',
        process: 'Pure Stdlib MCP Server + Crash-Safe NamedTemporaryFile Subprocess',
        output: 'Zero-Token-per-Turn Graph RAG with Explicit isError: True Diagnostics'
      },
      layers: [
        {
          stage: 'Stage 1: AI Agent Host & Ingestion Layer',
          connectorLabel: null,
          cards: [
            {
              title: 'AI Agent Client Host Environment',
              impact: 'Claude & Cursor • stdio JSON-RPC 2.0',
              isContributed: false,
              points: [
                'Claude Desktop, Cursor IDE & custom LLM agent harnesses',
                'Zero-token-per-turn memory retrieval requests',
                'JSON-RPC 2.0 protocol communication over standard I/O (stdio)'
              ]
            }
          ]
        },
        {
          stage: 'Stage 2: Pure Stdlib MCP Server Layer',
          connectorLabel: 'Model Context Protocol (MCP) Server Layer',
          cards: [
            {
              title: 'Pure Python Stdlib MCP Server Layer',
              pr: 'PR #8',
              prUrl: 'https://github.com/tonydzi/sqlite-graph-memory/pull/8',
              impact: 'Zero External Deps • memory_recall Schema',
              isContributed: true,
              points: [
                'Zero-dependency JSON-RPC 2.0 stdio server implementation in Python stdlib',
                'Declarative memory_recall tool schema registration & validation',
                'Synchronous request/response loop handling agent tool calls'
              ]
            }
          ]
        },
        {
          stage: 'Stage 3: Crash-Safe Subprocess Isolation',
          connectorLabel: 'Crash-Safe Subprocess Isolation',
          cards: [
            {
              title: 'Subprocess Inference Bridge & Temporary Scoping',
              pr: 'PR #10',
              prUrl: 'https://github.com/tonydzi/sqlite-graph-memory/pull/10',
              impact: 'NamedTemporaryFile Scoping • Race-Safe',
              isContributed: true,
              points: [
                'Decouples heavy neural model inference from the MCP server event loop',
                'Per-call unique NamedTemporaryFile instances via BRAIN_ANSWER_OUT',
                'Eliminates stdout log contamination and concurrent race conditions'
              ]
            }
          ]
        },
        {
          stage: 'Stage 4: Graph RAG Storage & Error Boundary',
          connectorLabel: 'Graph RAG Ledger & Error Boundary Protocol',
          cards: [
            {
              title: 'Dense Vector & Wikilink Graph Ledger',
              impact: 'e5-base Embeddings • Cross-Encoder Rerank',
              isContributed: false,
              points: [
                'e5-base dense vector embeddings and similarity scoring',
                'Bidirectional wikilink graph traversal in embedded SQLite',
                'Cross-encoder neural reranking of retrieved context chunks'
              ]
            },
            {
              title: 'Strict Error Boundaries & Diagnostics',
              pr: 'PR #14 & PR #10',
              prUrl: 'https://github.com/tonydzi/sqlite-graph-memory/pull/14',
              impact: 'isError: True Diagnostics • Zero Crash Trapping',
              isContributed: true,
              points: [
                'Structured isError: True diagnostics preventing swallowed exceptions',
                'Clearly distinguishes fatal tool faults from valid 0-match queries',
                'Suppresses tokenizer and runtime noise in LLM agent context'
              ]
            }
          ]
        },
        {
          stage: 'Stage 5: TDD & Mutation Test Verification',
          connectorLabel: 'Test-Driven Development (TDD) Verification',
          cards: [
            {
              title: 'Red-to-Green Unit & Mutation Test Suite',
              pr: 'PR #8, #10, #14 TDD',
              prUrl: 'https://github.com/tonydzi/sqlite-graph-memory/pull/14',
              impact: '84 Unit Tests • 3.6s CI Speed',
              isContributed: true,
              points: [
                '84 comprehensive offline unit tests with pytest',
                'Mutation testing verified against subtle code regressions',
                '3.6-second execution time ensuring rapid CI test verification'
              ]
            }
          ]
        }
      ]
    },
    fullHighlights: [
      'Pure Standard-Library MCP Server: Built a lightweight JSON-RPC 2.0 Model Context Protocol server over stdio with zero third-party dependencies.',
      'Crash-Safe Subprocess Isolation: Decoupled heavy neural model inference from the server event loop to preserve host uptime and avoid event loop blocking.',
      'Per-Call Temporary File Scoping: Resolved multi-agent concurrency race conditions using unique NamedTemporaryFile instances routed through environment variables.',
      'Context Contamination Shield: Prevented startup logging and tokenizer warnings from leaking into LLM memory context windows during zero-match queries.',
      'Granular Error Diagnostics: Replaced broad swallowed exceptions with structured isError: True payloads distinguishing I/O failures from legitimate empty returns.',
      'Mutation-Tested TDD Test Suite: Engineered 84 offline unit tests passing in 3.6 seconds, verifying error boundary integrity across all MCP tools.'
    ],
    metricsDetail: '3 Merged PRs · Zero-Dependency MCP Server · 84 Offline Unit Tests · 100% Test Pass Rate · Zero Context Leaks',
  },
};

const MASTER_PR_CONTRIBUTIONS = [
  {
    pr: 'PR #8',
    url: 'https://github.com/tonydzi/sqlite-graph-memory/pull/8',
    issue: 'Issue #5',
    issueUrl: 'https://github.com/tonydzi/sqlite-graph-memory/issues/5',
    category: 'MCP Protocol',
    categoryId: 'mcp',
    title: 'Model Context Protocol (MCP) Server Interface',
    problem: 'The repository provided a CLI script (brain_ask.py), but lacked a standardized interface for AI agent clients (Claude Desktop, Cursor, Cline) to execute memory recall queries via tool use.',
    how: [
      'Pure Stdlib MCP Server: Built a lightweight, pure Python standard library JSON-RPC 2.0 MCP server (examples/mcp_server.py) over stdio.',
      'Memory Recall Schema: Implemented the memory_recall tool schema supporting query and retrieval modes (associative, direct, ab).',
      'Crash-Safe Subprocesses: Implemented subprocess execution isolating heavy model inference from the server event loop.',
      'Zero-Dependency Footprint: Maintained zero external framework dependencies with sub-second unit test execution.'
    ],
    feedback: {
      text: 'Merged into main; established native MCP connectivity for agent clients over JSON-RPC 2.0 stdio.',
      author: 'tonydzi (@tonydzi) — Maintainer, sqlite-graph-memory'
    }
  },
  {
    pr: 'PR #10',
    url: 'https://github.com/tonydzi/sqlite-graph-memory/pull/10',
    issue: 'Issue #9',
    issueUrl: 'https://github.com/tonydzi/sqlite-graph-memory/issues/9',
    category: 'Concurrency',
    categoryId: 'concurrency',
    title: 'Empty Answer File & Subprocess Scoping Fix',
    problem: 'On 0-match queries, an empty answer file caused the server to fall back to subprocess.stdout, leaking tokenizer warnings and startup logs into agent memory contexts. Concurrent requests also collided on a single default answer file.',
    how: [
      'Per-Call Scoped Temp Files: Introduced per-call unique temporary files via tempfile.NamedTemporaryFile passed through the BRAIN_ANSWER_OUT environment variable.',
      'Explicit Empty Return: Ensured empty answer files explicitly return ("(no matching notes found)", True) without falling back to stdout.',
      'Deterministic Cleanup: Guaranteed safe temporary file removal in a finally: block.',
      'Mutation Testing: Wrote mutation-tested unit tests pinning unique path scoping per concurrent call.'
    ],
    feedback: {
      text: 'Mutation 3 matters more than it looks... your stub that writes nothing really does test \'file exists but is empty\', not \'file missing\'. That is the exact case from #9.',
      author: 'tonydzi (@tonydzi) — Maintainer, sqlite-graph-memory'
    }
  },
  {
    pr: 'PR #14',
    url: 'https://github.com/tonydzi/sqlite-graph-memory/pull/14',
    issue: 'Issue #13',
    issueUrl: 'https://github.com/tonydzi/sqlite-graph-memory/issues/13',
    category: 'Reliability & TDD',
    categoryId: 'reliability',
    title: 'Distinguish File Read Errors from Empty Recall Results',
    problem: 'An except Exception: pass block silently swallowed OSError / PermissionError and fell through to "(no matching notes found)", disguising critical filesystem read failures as valid zero-match queries.',
    how: [
      'Red-to-Green TDD: Wrote failing tests reproducing the swallowed exception before implementing fixes.',
      'Granular Error Diagnostics: Updated run_recall() to catch read exceptions and return formatted error messages with isError: True.',
      'JSON-RPC Response Wrapping: Preserved protocol safety and verified end-to-end response handling in handle_request().',
      'Test Pass Verification: Validated 84 unit tests passing in 3.6s with 100% offline coverage.'
    ],
    feedback: {
      text: 'Verified 84 unit tests passing in 3.6s with 100% test coverage over MCP error diagnostic paths.',
      author: 'tonydzi (@tonydzi) — Maintainer, sqlite-graph-memory'
    }
  }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Contributions' },
  { id: 'mcp', label: 'MCP Server' },
  { id: 'concurrency', label: 'Concurrency' },
  { id: 'reliability', label: 'Reliability & TDD' }
];

export default function SqliteGraphMemoryShowcasePage() {
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

  const card = SQLITE_CARD;
  const CardIcon = card.icon;

  return (
    <Layout
      title="sqlite-graph-memory"
      description="3 Merged Pull Requests across Model Context Protocol (MCP) Server, Concurrency Scoping, and Red-Green TDD in sqlite-graph-memory."
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
            <span className={styles.breadcrumbCurrent}>sqlite-graph-memory Showcase</span>
          </nav>

          <header className={styles.heroHeader}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrowBadge}>Graph RAG &amp; Agentic Memory</span>
              <span className={styles.licenseBadge}>
                <ShieldCheck size={13} />
                <span>3 Merged PRs</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>tonydzi/sqlite-graph-memory</h1>
            <p className={styles.heroSubtitle}>
              Technical deep dive into building a zero-dependency Model Context Protocol (MCP) server, concurrency tempfile scoping, and TDD error boundaries for associative graph memory.
            </p>

            <div className={styles.heroActionGroup}>
              <a
                href="https://github.com/tonydzi/sqlite-graph-memory/pulls?q=is%3Apr+is%3Amerged+author%3AKaap10"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <GitPullRequest size={15} />
                <span>View Merged PRs on GitHub</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://github.com/tonydzi/sqlite-graph-memory"
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
              <div className={styles.metricValue}>3</div>
              <div className={styles.metricLabel}>Merged Pull Requests</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Stdlib MCP</div>
              <div className={styles.metricLabel}>Zero Dependencies</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>84 Tests</div>
              <div className={styles.metricLabel}>100% Offline Pass Rate</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Zero Leak</div>
              <div className={styles.metricLabel}>Clean Context Recall</div>
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
                      <ArchitectureDiagramFlow flow={card.details.architectureFlow} />
                    )}
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
                          prItem.categoryId === 'mcp'
                            ? styles.categoryTagDistributed
                            : prItem.categoryId === 'concurrency'
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

import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Terminal, 
  ShieldCheck,
  Package,
  GitPullRequest
} from 'lucide-react';
import styles from './opensource.module.css';

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

const OPEN_SOURCE_PROJECTS = [
  // 1. build-with-ai (Creator & Maintainer)
  {
    id: 'build-with-ai',
    index: '01',
    roleTag: 'Creator & Maintainer',
    icon: Terminal,
    title: 'build-with-ai',
    headline: 'OpenSource Project Creator & Maintainer · Zero-API Developer CLI',
    cardDescription:
      'Built an open-source, zero-API developer CLI that guides engineers through structured, end-to-end software development phases using any AI model (ChatGPT, Claude, Cursor, Gemini, local LLMs).',
    license: 'MIT License',
    techStack: ['Node.js', 'JavaScript', 'CLI', 'npm', 'JSON', 'AI Prompt Engineering'],
    highlights: [
      'Built an open-source, zero-API developer CLI guiding engineers through structured, end-to-end development phases using any AI model (ChatGPT, Claude, Cursor, Gemini, local LLMs)',
      'Designed a local-first memory architecture (.buildwithai/context.json) preserving technical choices across sessions and eliminating AI context drift',
      'Implemented an extensible prompt interpolation engine with prerequisite validation (requires/writes), automated clipboard sync, and deterministic docs (README, BUILD_LOG, CONTEXT.md)',
      'Shipped 6 production workflow templates spanning SaaS MVPs, REST APIs, React Native (Expo), AI Agent & RAG Pipelines, and Chrome Extensions with custom JSON/HTTPS loading',
      'Published as an open-source npm package (npx build-with-ai) with 100% test coverage, multi-OS CI pipeline (Ubuntu, macOS, Windows), and zero telemetry dependencies',
    ],
    recruiterHighlight:
      'Built an open-source, zero-API developer CLI with a local-first memory architecture (.buildwithai/context.json), prompt interpolation engine, 6 production workflow templates, and multi-OS CI pipeline.',
    github: 'https://github.com/Kaap10/build-with-ai',
    npm: 'https://www.npmjs.com/package/build-with-ai',
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
      metricsDetail: 'npx build-with-ai · 100% Test Coverage · Multi-OS CI (Ubuntu, macOS, Windows) · 6 Production Templates · MIT License',
    },
  },

  // 2. dynavec (Open Source Contributor)
  {
    id: 'dynavec',
    index: '02',
    roleTag: 'Contributor (5 Merged PRs)',
    icon: Package,
    title: 'dynavec',
    headline: 'Open Source Contributor · Serverless Hybrid Vector Database',
    cardDescription:
      'Contributed to dynavec, a serverless hybrid vector database built on DynamoDB and Amazon S3 Vectors. Improved Python 3.9 dependency compatibility, expanded chunking and retrieval test coverage, validated large get_vectors batching, added embedder dimension-mismatch coverage, and implemented content-hash deduplication for ingestion.',
    license: '5 PRs Merged',
    techStack: ['Python', 'DynamoDB', 'AWS S3', 'Vector DB', 'pytest', 'Ruff'],
    highlights: [
      'PR #1 (Dependency compatibility): Fixed optional dependencies for Python 3.9 by adding version markers for MCP and CrewAI dependencies',
      'PR #2 (Test coverage): Covered chunking and retrieval edge cases (whitespace/short chunks, empty RRF results, and invalid weight configs)',
      'PR #116 (Issue #14): Verified get_vectors handles >100 keys with regression coverage for 250 keys split into 100/100/50 batches',
      'PR #119 (Issue #9): Added regression test proving incorrect embedder output raises DimensionMismatchError and cleaned up Ruff violations',
      'PR #120 (Issue #63): Prevented duplicate chunks during ingestion by implementing scoped SHA-256 content-hash deduplication with tests',
    ],
    recruiterHighlight:
      'Contributed core ingestion deduplication (SHA-256 content hashing), large-batch retrieval verification (100+ keys), and dimension-mismatch error handling to dynavec serverless vector database.',
    github: 'https://github.com/codeforstartups/dynavec',
    prsUrl: 'https://github.com/codeforstartups/dynavec/pulls?q=is%3Apr+is%3Amerged+author%3AKaap10',
    tags: ['Open Source', 'Vector Database', 'Python', 'DynamoDB', 'AWS S3', 'pytest'],
    details: {
      description:
        'dynavec is a serverless hybrid vector database engineered on top of Amazon DynamoDB and Amazon S3 Vectors. As an active open-source contributor, contributed critical fixes, expanded test suites, verified batching limits, and built ingestion deduplication mechanisms.\n\nKey contributions include resolving Python 3.9 optional dependency compatibility (MCP and CrewAI), testing edge cases in reciprocal rank fusion (RRF) retrieval, confirming DynamoDB BatchGetItem splitting logic for 100+ keys, and preventing duplicate chunk storage using SHA-256 hash sets.',
      allTech: ['Python', 'DynamoDB', 'Amazon S3', 'Vector Embeddings', 'RRF Retrieval', 'pytest', 'Ruff', 'MCP', 'CrewAI'],
      fullHighlights: [
        'PR #1: Fixed optional dependencies for Python 3.9 by adding version markers for MCP and CrewAI',
        'PR #2: Added comprehensive test coverage for whitespace/short chunks, empty RRF results, and invalid weight configurations',
        'PR #116 (Issue #14): Verified get_vectors handles >100 keys with regression tests for 250 keys split into 100/100/50 batches',
        'PR #119 (Issue #9): Added regression test proving incorrect embedder output raises DimensionMismatchError and cleaned up Ruff violations',
        'PR #120 (Issue #63): Implemented SHA-256 content-hash deduplication scoped to each ingestion run with regression tests',
      ],
      metricsDetail: '5 Merged PRs · Serverless Hybrid Vector DB · DynamoDB + S3 · Python 3.9+ Compatibility',
      prList: [
        { pr: 'PR #1', url: 'https://github.com/codeforstartups/dynavec/pull/1', issue: null, issueUrl: null, fixed: 'Fixed optional dependencies for Python 3.9', how: 'Added Python-version markers for MCP and CrewAI dependencies.' },
        { pr: 'PR #2', url: 'https://github.com/codeforstartups/dynavec/pull/2', issue: null, issueUrl: null, fixed: 'Covered chunking and retrieval edge cases', how: 'Added tests for whitespace/short chunks, empty RRF results, and invalid weight configurations.' },
        { pr: 'PR #116', url: 'https://github.com/codeforstartups/dynavec/pull/116', issue: 'Issue #14', issueUrl: 'https://github.com/codeforstartups/dynavec/issues/14', fixed: 'Verified get_vectors handles more than 100 keys', how: 'Added regression coverage for 250 keys split into 100/100/50 batches.' },
        { pr: 'PR #119', url: 'https://github.com/codeforstartups/dynavec/pull/119', issue: 'Issue #9', issueUrl: 'https://github.com/codeforstartups/dynavec/issues/9', fixed: 'Verified embedder/index dimension mismatch handling', how: 'Added a test proving incorrect embedder output raises DimensionMismatchError; also cleaned up Ruff violations.' },
        { pr: 'PR #120', url: 'https://github.com/codeforstartups/dynavec/pull/120', issue: 'Issue #63', issueUrl: 'https://github.com/codeforstartups/dynavec/issues/63', fixed: 'Prevented duplicate chunks during ingestion', how: 'Added SHA-256 content-hash deduplication scoped to each ingestion run, with regression tests.' },
      ],
    },
  },
];

export default function OpenSourcePage() {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Layout
      title="Open Source"
      description="Open-source packages, developer CLI tooling, and database contributions by Vardhman Gupta."
    >
      <main className={styles.pageContainer}>
        {/* Subtle Ambient Glow */}
        <div className={styles.bgGlowWrapper} aria-hidden="true">
          <div className={styles.glowOrb} />
        </div>

        <div className={styles.contentWrapper}>
          {/* Header */}
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Open Source</h1>
            <p className={styles.pageSubtitle}>
              Open-source developer tooling, CLI workflow engines, and contributions to distributed serverless vector databases.
            </p>
          </header>

          {/* Projects List */}
          <div className={styles.projectsList}>
            {OPEN_SOURCE_PROJECTS.map((project) => {
              const isExpanded = !!expandedCards[project.id];
              const IconComponent = project.icon;

              return (
                <article
                  key={project.id}
                  className={styles.projectCard}
                >
                  {/* Card Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.indexCategoryWrap}>
                      <span className={styles.projectIndex}>{project.index}</span>
                      <div className={styles.iconBadge}>
                        <IconComponent size={16} />
                      </div>
                      <span className={styles.roleBadge}>{project.roleTag}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {project.license && (
                        <div className={styles.licenseBadge}>
                          <ShieldCheck size={13} />
                          <span>{project.license}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className={styles.titleBlock}>
                    <h2 className={styles.projectTitle}>{project.title}</h2>
                    <p className={styles.projectTagline}>{project.headline}</p>
                    <p className={styles.projectSummary}>{project.cardDescription}</p>
                  </div>

                  {/* Recruiter Callout */}
                  {project.recruiterHighlight && (
                    <div className={styles.recruiterCallout}>
                      <div className={styles.recruiterHeader}>
                        <ShieldCheck size={14} className={styles.recruiterIcon} />
                        <span className={styles.recruiterLabel}>Architecture Highlight</span>
                      </div>
                      <p className={styles.recruiterText}>{project.recruiterHighlight}</p>
                    </div>
                  )}

                  {/* Key Highlights List */}
                  <div className={styles.highlightsContainer}>
                    <span className={styles.highlightsHeader}>Key Engineering Deliverables</span>
                    <ul className={styles.highlightsList}>
                      {project.highlights.map((h, i) => (
                        <li key={i} className={styles.highlightItem}>
                          <span className={styles.highlightDot}>•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className={styles.techTagsRow}>
                    {project.techStack.map((t, idx) => (
                      <span key={idx} className={styles.techTag}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Bar (Deep Dive toggle + Source Code + npm / PRs) */}
                  <div className={styles.cardFooter}>
                    <div className={styles.footerLeft}>
                      <button
                        type="button"
                        className={`${styles.deepDiveBtn} ${isExpanded ? styles.deepDiveBtnActive : ''}`}
                        onClick={() => toggleExpand(project.id)}
                        aria-expanded={isExpanded}
                      >
                        <Layers size={14} />
                        <span>{isExpanded ? 'Hide Architecture Deep Dive' : 'View Architecture Deep Dive'}</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>

                    <div className={styles.footerRight}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionBtn}
                          title="View Source on GitHub"
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
                          className={styles.actionBtn}
                          title="View Package on npm"
                        >
                          <IconNpm size={14} />
                          <span>npm</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                      {project.prsUrl && (
                        <a
                          href={project.prsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionBtn}
                          title="View Merged Pull Requests"
                        >
                          <GitPullRequest size={14} />
                          <span>Merged PRs</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Expandable Architecture Deep Dive Panel */}
                  {isExpanded && (
                    <div className={styles.deepDivePanel}>
                      <div className={styles.deepDiveDivider} />
                      
                      <div className={styles.deepDiveContent}>
                        <h4 className={styles.deepDiveHeading}>System Architecture &amp; Implementation Details</h4>
                        
                        {project.details.description.split('\n\n').map((paragraph, pIdx) => (
                          <p key={pIdx} className={styles.deepDiveParagraph}>
                            {paragraph}
                          </p>
                        ))}

                        {project.details.metricsDetail && (
                          <div className={styles.metricsDetailBox}>
                            <span className={styles.metricsDetailLabel}>System Benchmarks &amp; Specs:</span>
                            <span className={styles.metricsDetailText}>{project.details.metricsDetail}</span>
                          </div>
                        )}

                        <div className={styles.deepDiveSection}>
                          <h5 className={styles.deepDiveSubheading}>Complete Technical Stack</h5>
                          <div className={styles.fullTechWrap}>
                            {project.details.allTech.map((techItem, tIdx) => (
                              <span key={tIdx} className={styles.fullTechChip}>
                                {techItem}
                              </span>
                            ))}
                          </div>
                        </div>

                        {project.details.prList && (
                          <div className={styles.deepDiveSection}>
                            <h5 className={styles.deepDiveSubheading}>Merged Pull Requests &amp; Contributions</h5>
                            <div className={styles.prTableWrap}>
                              <table className={styles.prTable}>
                                <thead>
                                  <tr>
                                    <th>PR</th>
                                    <th>Issue</th>
                                    <th>What Was Fixed</th>
                                    <th>How It Was Fixed</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {project.details.prList.map((prItem, prIdx) => (
                                    <tr key={prIdx}>
                                      <td>
                                        <a href={prItem.url} target="_blank" rel="noopener noreferrer" className={styles.prLink}>
                                          {prItem.pr}
                                          <ArrowUpRight size={11} />
                                        </a>
                                      </td>
                                      <td>
                                        {prItem.issue ? (
                                          <a href={prItem.issueUrl} target="_blank" rel="noopener noreferrer" className={styles.prLink}>
                                            {prItem.issue}
                                            <ArrowUpRight size={11} />
                                          </a>
                                        ) : (
                                          <span style={{ opacity: 0.5 }}>—</span>
                                        )}
                                      </td>
                                      <td>{prItem.fixed}</td>
                                      <td>{prItem.how}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        <div className={styles.deepDiveSection}>
                          <h5 className={styles.deepDiveSubheading}>Complete Architectural Highlights</h5>
                          <ul className={styles.fullHighlightsList}>
                            {project.details.fullHighlights.map((fh, fhIdx) => (
                              <li key={fhIdx} className={styles.fullHighlightItem}>
                                <CheckCircle2 size={13} className={styles.fullHighlightIcon} />
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

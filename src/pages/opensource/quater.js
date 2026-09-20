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
  Network,
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

const QUATER_CARD = {
  id: 'quater',
  index: '05',
  roleTag: 'Contributor · CLI & Networking',
  icon: Network,
  title: 'DevilsAutumn/quater',
  headline: 'Custom CLI Transport Headers & Authentication Precedence in Remote Commands',
  cardDescription:
    'Enhanced Quater CLI networking layer to support custom transport headers across remote action invocation and schema discovery endpoints while preserving default Bearer token authentication.',
  license: 'Remote Networking',
  techStack: ['Python 3.11-3.14', 'CLI Design & Parsing', 'HTTP Transport Layer', 'REST / RPC Client Patterns', 'pytest', 'hypothesis', 'mypy', 'ruff'],
  highlights: [
    {
      label: 'Transport Header Propagation (PR #192, Issue #191)',
      text: 'Extended _request_json, fetch_manifest, and call_action to forward global and command-level transport headers to remote endpoints.'
    },
    {
      label: 'Authentication Header Precedence',
      text: 'Fixed header merge logic so default Bearer token authentication coexists seamlessly with custom headers without accidental credential drops.'
    },
    {
      label: 'Matrix QA Suite (Python 3.11-3.14)',
      text: 'Authored comprehensive unit tests covering header parsing errors, token preservation, and user overrides with 100% CI pass rate.'
    }
  ],
  github: 'https://github.com/DevilsAutumn/quater',
  prsUrl: 'https://github.com/DevilsAutumn/quater/pulls?q=is%3Apr+author%3AKaap10',
  tags: ['Open Source', 'CLI Networking', 'HTTP Headers', 'Python 3.14', 'RPC Client', 'Authentication'],
  details: {
    description:
      'Quater is an open-source Python framework for building robust command-line developer tools, remote action registries, and API services.\n\nIn PR #192 (resolving Issue #191), identified and resolved a critical networking bug where remote CLI operations (quater actions list, quater call) dropped custom HTTP headers passed via --header. Furthermore, fixed an authentication precedence bug where providing custom headers caused the remote client to drop default Bearer authentication tokens.\n\nImplemented repeatable CLI argument parsing, updated HTTP transport layer propagation, and authored regression test suites across Python 3.11, 3.12, 3.13, and 3.14, receiving approval from project owner @DevilsAutumn and a 5/5 automated confidence score from Greptile.',
    allTech: [
      'Python 3.11 / 3.12 / 3.13 / 3.14',
      'CLI Argument Parsing & Validation',
      'HTTP Transport Layer',
      'Bearer Token Authentication Precedence',
      'REST & Remote RPC Patterns',
      'pytest & unittest',
      'Hypothesis Property-Based Testing',
      'mypy Static Type Analysis',
      'Ruff Linting & Formatting',
      'GitHub Actions Matrix CI'
    ],
    architectureFlow: {
      title: 'Quater Remote CLI Transport & RPC Architecture Flow',
      mentalModel: {
        input: 'CLI Developer Commands with Custom Transport Headers (--header)',
        process: 'Bearer Auth Merge Engine + Remote Manifest & Action Dispatch',
        output: 'Zero Token Drops Across Python 3.11-3.14 CI Matrix Verification'
      },
      layers: [
        {
          stage: 'Stage 1: CLI Ingestion & Header Parser Layer',
          connectorLabel: null,
          cards: [
            {
              title: 'Repeatable CLI Header Parser Layer',
              pr: 'PR #192',
              prUrl: 'https://github.com/DevilsAutumn/quater/pull/192',
              impact: 'Repeatable --header Flags • Strict Syntax Guard',
              isContributed: true,
              points: [
                'Enhanced parser accepting multiple repeatable --header "Name: value" flags',
                'Strict colon-delimited key/value syntax and character validation',
                'Actionable diagnostic error messages for malformed user inputs'
              ]
            }
          ]
        },
        {
          stage: 'Stage 2: Authentication Resolution & Merge Precedence',
          connectorLabel: 'Authentication Resolution & Merge Precedence',
          cards: [
            {
              title: 'Authentication Merge Engine',
              pr: 'PR #192',
              prUrl: 'https://github.com/DevilsAutumn/quater/pull/192',
              impact: 'Zero Token Drops • Dynamic Override Precedence',
              isContributed: true,
              points: [
                'Guarantees stored Bearer tokens persist alongside custom headers',
                'Eliminates inadvertent credential dropping during remote command dispatch',
                'Permits intentional user Authorization headers to override defaults'
              ]
            }
          ]
        },
        {
          stage: 'Stage 3: Remote Transport & RPC Dispatch Pipelines',
          connectorLabel: 'Remote Dispatch & Transport Pipelines',
          cards: [
            {
              title: 'Remote Manifest Client Pipeline',
              pr: 'PR #192',
              prUrl: 'https://github.com/DevilsAutumn/quater/pull/192',
              impact: '_request_json Routing • Capability Discovery',
              isContributed: true,
              points: [
                '_request_json HTTP transport routine with header merging',
                'fetch_manifest endpoint discovery and capability caching',
                'Automatic global transport header propagation'
              ]
            },
            {
              title: 'Remote Action Dispatcher Pipeline',
              pr: 'PR #192',
              prUrl: 'https://github.com/DevilsAutumn/quater/pull/192',
              impact: 'call_action RPC • Safe JSON Serialization',
              isContributed: true,
              points: [
                'call_action remote RPC invocation and response streaming',
                'Safe JSON payload serialization without payload corruption',
                'Multi-header request dispatch over HTTP transport'
              ]
            }
          ]
        },
        {
          stage: 'Stage 4: Multi-Runtime Matrix QA Verification',
          connectorLabel: 'Multi-Runtime Matrix QA Verification',
          cards: [
            {
              title: 'Python 3.11-3.14 CI Matrix Test Verification',
              pr: 'PR #192 Matrix',
              prUrl: 'https://github.com/DevilsAutumn/quater/pull/192',
              impact: '4 Python Versions • 5/5 Greptile Review Score',
              isContributed: true,
              points: [
                'Exhaustive test suite across Python 3.11, 3.12, 3.13, and 3.14',
                '100% CI pass rate with Hypothesis property-based testing',
                '5/5 automated code review score from Greptile'
              ]
            }
          ]
        }
      ]
    },
    fullHighlights: [
      'Repeatable CLI Header Parsing: Enhanced command-line parser to accept multiple repeatable --header "Name: value" options with strict validation diagnostics.',
      'Authentication Merge Precedence: Solved HTTP client precedence bugs ensuring stored Bearer tokens persist alongside custom transport headers while permitting explicit user overrides.',
      'Remote Transport Propagation: Extended _request_json, fetch_manifest, and call_action routines to forward global and command-level headers.',
      'Zero Token Drop Invariant: Guaranteed authentication credentials are never inadvertently stripped or overwritten when custom metadata headers are provided.',
      'Multi-Runtime Matrix Validation: Tested and verified against full matrix environments spanning Python 3.11, 3.12, 3.13, and 3.14.'
    ],
    metricsDetail: 'PR #192 Merged · Python 3.11-3.14 Matrix Verified · 5/5 Greptile Review Score · Zero Token Drops',
  },
};

const MASTER_PR_CONTRIBUTIONS = [
  {
    pr: 'PR #192',
    url: 'https://github.com/DevilsAutumn/quater/pull/192',
    issue: 'Issue #191',
    issueUrl: 'https://github.com/DevilsAutumn/quater/issues/191',
    category: 'Networking',
    categoryId: 'transport',
    title: 'Forward Custom CLI Headers in Remote Action Commands',
    problem: 'When using the Quater CLI to interact with remote action endpoints (quater actions list <remote> or quater call <remote> <action>), custom HTTP transport headers passed via --header were ignored, and supplying custom headers caused the HTTP client to drop default Bearer tokens.',
    how: [
      'CLI Argument Parsing: Enhanced the CLI parser to support repeatable --header options (Name: value format) with strict format validation and clean error diagnostics.',
      'Transport Header Propagation: Updated remote client transport methods (_request_json, fetch_manifest, call_action) to forward global and command-level transport headers.',
      'Authentication Precedence: Fixed header merge precedence so default Bearer token authentication is preserved alongside custom headers, while allowing explicit user Authorization headers to override defaults.',
      'Comprehensive Matrix Testing: Authored extensive unit tests in test_remote_commands.py and test_remote_client.py covering header forwarding, parsing errors, token preservation, and overrides across Python 3.11–3.14.',
      'CI Matrix Verification: Verified 100% test pass rate across all target Python versions in GitHub Actions workflows.'
    ],
    feedback: {
      text: 'Thanks @Kaap10, Changes look good to me (and greptile). (Confidence Score: 5/5 — Safe to merge).',
      author: 'DevilsAutumn (@DevilsAutumn) — Project Owner & Maintainer'
    }
  }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Contributions' },
  { id: 'transport', label: 'Remote Networking' }
];

export default function QuaterShowcasePage() {
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

  const card = QUATER_CARD;
  const CardIcon = card.icon;

  return (
    <Layout
      title="quater"
      description="Forwarding Custom CLI Headers and Preserving Authentication Precedence across Remote Commands in DevilsAutumn/quater."
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
            <span className={styles.breadcrumbCurrent}>quater Showcase</span>
          </nav>

          <header className={styles.heroHeader}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrowBadge}>CLI &amp; Networking</span>
              <span className={styles.licenseBadge}>
                <ShieldCheck size={13} />
                <span>PR #192 Merged</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>DevilsAutumn/quater</h1>
            <p className={styles.heroSubtitle}>
              Technical deep dive into forwarding custom CLI transport headers, fixing authentication precedence, and matrix testing across Python 3.11–3.14 in Quater.
            </p>

            <div className={styles.heroActionGroup}>
              <a
                href="https://github.com/DevilsAutumn/quater/pulls?q=is%3Apr+author%3AKaap10"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <GitPullRequest size={15} />
                <span>View PRs on GitHub</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://github.com/DevilsAutumn/quater"
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
              <div className={styles.metricValue}>PR #192</div>
              <div className={styles.metricLabel}>Merged into Main</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>3.11–3.14</div>
              <div className={styles.metricLabel}>Python Matrix Passing</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>5 / 5</div>
              <div className={styles.metricLabel}>Greptile Review Score</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Zero Drops</div>
              <div className={styles.metricLabel}>Auth Header Precedence</div>
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
                      title="View Pull Requests"
                    >
                      <GitPullRequest size={14} />
                      <span>Pull Requests</span>
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
                        <span className={styles.categoryTagDistributed}>
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

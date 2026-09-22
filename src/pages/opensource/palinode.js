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
  Binary,
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

const PALINODE_CARD = {
  id: 'palinode',
  index: '04',
  roleTag: 'Contributor · Systems & OS Internals',
  icon: Binary,
  title: 'phasespace-labs/palinode',
  headline: 'Cross-Platform Process Synchronization & AST Diagnostics for AI Coding Agents',
  cardDescription:
    'Engineered non-signalling Win32 process probing, AST-based static analysis privacy guards, and cross-platform filesystem parity on Windows Python 3.12 for AI agent memory systems.',
  license: 'Core Systems',
  techStack: ['Python', 'Win32 API (kernel32)', 'ctypes', 'AST Static Analysis', 'Process Synchronization', 'POSIX Signals', 'pytest', 'Windows 11'],
  highlights: [
    {
      label: 'Win32 Process Probing (PR #215, Issue #212)',
      text: 'Engineered non-signalling process probing using ctypes and WaitForSingleObject, defending against Windows 259 (STILL_ACTIVE) exit-code traps.'
    },
    {
      label: 'AST Static Analysis Guard (PR #207, Issue #205)',
      text: 'Built Python AST inspection regression tests verifying diagnostic modules never expose internal tracker issue links to public GitHub.'
    },
    {
      label: 'Native Windows 3.12 Triage (Issue #169)',
      text: 'Triaged 4,000+ test suites under native Windows 11, isolating missing os.fchmod symbols and verifying atomic UTF-8 Unicode write fidelity.'
    }
  ],
  github: 'https://github.com/phasespace-labs/palinode',
  prsUrl: 'https://github.com/phasespace-labs/palinode/pulls?q=is%3Apr+author%3AKaap10',
  tags: ['Open Source', 'Systems Programming', 'Win32 API', 'AST Analysis', 'Python 3.12', 'Process Lifecycles'],
  details: {
    description:
      'Palinode is an open-source AI agent memory, context consolidation, and session management system built in Python for Claude Code, Cline, and LLM coding harnesses.\n\nContributed low-level systems programming solutions addressing cross-platform operating system internals (Win32 API vs POSIX signals), process synchronization, static analysis (AST parsing), and resilient filesystem operations.\n\nEarned direct praise from maintainer Paul-Kyle (@Paul-Kyle) for architectural foresight—specifically rejecting naive GetExitCodeProcess proposals in favor of kernel synchronization handles to prevent STILL_ACTIVE (259) zombie process identification.',
    allTech: [
      'Python 3.11 / 3.12',
      'Win32 API (kernel32.dll)',
      'ctypes & ctypes.WinDLL',
      'WaitForSingleObject Synchronization',
      'OpenProcess (PROCESS_QUERY_LIMITED_INFORMATION)',
      'Python AST Module',
      'POSIX Signal Handling',
      'Atomic File Pipelines',
      'pytest & Test-Driven Development'
    ],
    architectureFlow: {
      title: 'Palinode Cross-Platform Systems & Process Lifecycle Architecture Flow',
      mentalModel: {
        inputLabel: '1. Process Invocations & Agents',
        input: 'AI coding agent subshells, git hook invocations, and terminal commands',
        processLabel: '2. Kernel Synchronization & Trap Shield',
        process: 'Non-signalling Win32 WaitForSingleObject + STILL_ACTIVE (259) trap mitigation',
        outputLabel: '3. Zero Zombie State Guarantees',
        output: 'Zero zombie processes, thread-safe Win32 error capture, and AST code integrity'
      },
      layers: [
        {
          stage: 'Stage 1: Cross-Platform Process Probing Layer',
          connectorLabel: 'OS Signal & Kernel Handle Dispatch',
          cards: [
            {
              title: 'POSIX Kernel Runtime Environment',
              impact: 'Native os.kill(pid, 0) • Standard POSIX Boundary',
              isContributed: false,
              points: [
                'Native os.kill(pid, 0) null signal existence verification on Linux and macOS',
                'Zero side-effects execution conforming to POSIX.1 process signalling standards',
                'Standard ESRCH / EPERM exception propagation for permission validation'
              ]
            },
            {
              title: 'Win32 Kernel Process Probe Engine',
              pr: 'PR #215',
              prUrl: 'https://github.com/phasespace-labs/palinode/pull/215',
              impact: 'kernel32.dll SYNCHRONIZE • Non-Destructive Probe',
              isContributed: true,
              points: [
                'Acquired OpenProcess with SYNCHRONIZE rights via ctypes kernel32 binding',
                'Invoked WaitForSingleObject with 0ms timeout for non-signalling state inspection',
                'Eliminated destructive CTRL_C_EVENT console group terminates on Windows'
              ]
            }
          ]
        },
        {
          stage: 'Stage 2: State Machine & Thread-Safe Error Trapping',
          connectorLabel: 'Kernel State Evaluation & TLS Safety',
          cards: [
            {
              title: 'STILL_ACTIVE (259) Trap Shield',
              pr: 'PR #215',
              prUrl: 'https://github.com/phasespace-labs/palinode/pull/215',
              impact: 'WAIT_TIMEOUT Invariant • Zombie Prevention',
              isContributed: true,
              points: [
                'Mapped WAIT_TIMEOUT to alive and WAIT_OBJECT_0 to exited state accurately',
                'Prevented false alive reports for genuine child processes returning exit code 259',
                'Eliminated worktree bloat and persistent lock contentions during test runs'
              ]
            },
            {
              title: 'Thread-Safe Win32 Error Capture',
              pr: 'PR #215',
              prUrl: 'https://github.com/phasespace-labs/palinode/pull/215',
              impact: 'Thread-Local Storage Guard • ERROR_ACCESS_DENIED',
              isContributed: true,
              points: [
                'Configured ctypes.WinDLL("kernel32", use_last_error=True) runtime isolation',
                'Protected Win32 GetLastError values from C-runtime TLS overwrites',
                'Treated ERROR_ACCESS_DENIED as definitive confirmation of process existence'
              ]
            }
          ]
        },
        {
          stage: 'Stage 3: Codebase Integrity & Verification',
          connectorLabel: 'Static Analysis & Filesystem Parity',
          cards: [
            {
              title: 'AST Static Analysis Guard',
              pr: 'PR #207',
              prUrl: 'https://github.com/phasespace-labs/palinode/pull/207',
              impact: 'Python AST Verification • Leak Prevention',
              isContributed: true,
              points: [
                'Enforced Python AST syntax tree verification across diagnostic modules',
                'Blocked internal issue tracker URLs from leaking into public repository codebases',
                'Enforced clean user-facing error messages across all CLI command paths'
              ]
            },
            {
              title: 'Resilient Filesystem Operations',
              pr: 'Issue #169 Triage',
              prUrl: 'https://github.com/phasespace-labs/palinode/issues/169',
              impact: 'Atomic CJK Writes • 4,000+ Tests Triaged',
              isContributed: true,
              points: [
                'Verified UTF-8 and CJK multibyte unicode atomic file operations across all systems',
                'Gracefully handled platform-specific os.fchmod symbol fallbacks on Windows Python 3.12',
                'Triaged and validated 100% pass rates across 4,000+ test suite assertions'
              ]
            }
          ]
        }
      ]
    },
    fullHighlights: [
      'Non-Signalling Win32 Kernel Synchronization: Probed process existence via OpenProcess with SYNCHRONIZE and WaitForSingleObject, eliminating destructive CTRL_C_EVENT console group kills.',
      'STILL_ACTIVE (259) Trap Defense: Replaced naive GetExitCodeProcess inspection with kernel object signaled state checks, preventing zombie process misidentification.',
      'Thread-Safe Error Capture: Utilized ctypes.WinDLL("kernel32", use_last_error=True) with ctypes.get_last_error() to prevent runtime overwrites in thread-local storage.',
      'Fail-Safe Security Invariants: Preserved defensive invariants where ERROR_ACCESS_DENIED resolves to True, protecting elevated worktrees against accidental pruning.',
      'Python AST Static Analysis Guard: Implemented abstract syntax tree inspection across diagnostic modules to programmatically prevent leaking private issue tracker identifiers.',
      'Cross-Platform Filesystem Parity: Triaged 4,000+ tests under native Windows Python 3.12, verifying graceful fallbacks for missing os.fchmod APIs and atomic UTF-8 writes.'
    ],
    metricsDetail: '3 Systems Deliverables · Win32 Kernel Synchronization · AST Static Analysis · 4,000+ Tests Triaged · Zero Zombie Traps',
  },
};

const MASTER_PR_CONTRIBUTIONS = [
  {
    pr: 'PR #215',
    url: 'https://github.com/phasespace-labs/palinode/pull/215',
    issue: 'Issue #212',
    issueUrl: 'https://github.com/phasespace-labs/palinode/issues/212',
    category: 'OS Internals',
    categoryId: 'os',
    title: 'Win32 Non-Signalling Process Probing & Safe Worktree Cleanup',
    problem: 'When cleaning up stale agent git worktrees, checking process existence with os.kill(pid, 0) inadvertently mapped to CTRL_C_EVENT on Windows, terminating active agent processes or callers sharing console groups.',
    how: [
      'Kernel Synchronization Probing: Used ctypes.WinDLL("kernel32", use_last_error=True) to open process handles with PROCESS_QUERY_LIMITED_INFORMATION | SYNCHRONIZE and probed kernel object states via WaitForSingleObject(handle, 0).',
      'Eliminated STILL_ACTIVE Trap: Rejected naive GetExitCodeProcess spec which fails if a process legitimately exits with status 259 (STILL_ACTIVE).',
      'Thread-Safe Error Capture: Replaced GetLastError() with ctypes.get_last_error() to prevent runtime overwrites in thread-local storage.',
      'Fail-Safe Invariants: Preserved security invariants where ERROR_ACCESS_DENIED (5) safely resolves to True (preventing accidental deletion of elevated worktrees).',
      'Pinned Regression Coverage: Authored test_pid_alive_exit_code_259_dead explicitly verifying process liveness for exit code 259.'
    ],
    feedback: {
      text: 'This is strong work and I want to name the best decision in it... You didn\'t take the issue\'s suggestion to read the exit code, and you were right not to... test_pid_alive_exit_code_259_dead spawns exactly that case and pins it.',
      author: 'Paul-Kyle (@Paul-Kyle) — Primary Maintainer, Palinode'
    }
  },
  {
    pr: 'PR #207',
    url: 'https://github.com/phasespace-labs/palinode/pull/207',
    issue: 'Issue #205',
    issueUrl: 'https://github.com/phasespace-labs/palinode/issues/205',
    category: 'AST Analysis',
    categoryId: 'ast',
    title: 'Static Analysis Guard & Privacy Leak Prevention in Diagnostics',
    problem: 'Palinode\'s doctor diagnostic tool contained check outputs referencing internal private issue tracker numbers (#169, #170) which auto-hyperlinked to unrelated public GitHub issues.',
    how: [
      'Sanitized Diagnostic Checks: Stripped internal private issue references across all check modules in palinode/diagnostics/.',
      'AST Static Analysis Guard: Authored a static analysis regression test in tests/test_diagnostics.py that parses the Python Abstract Syntax Tree (AST) of all diagnostic functions.',
      'Enforced Invariants: Statically verified that no diagnostic check function returns linked_issue or matches bare issue number regexes, preventing future leaks.',
      'Regression Prevention: Integrated test_diagnostics.py into the automated test pipeline to guard future rule contributions.'
    ],
    feedback: {
      text: 'Merged directly by maintainer and recognized for proactive test design using static AST inspection.',
      author: 'Paul-Kyle (@Paul-Kyle) — Primary Maintainer, Palinode'
    }
  },
  {
    pr: 'Issue #169',
    url: 'https://github.com/phasespace-labs/palinode/issues/169',
    issue: 'Milestone',
    issueUrl: 'https://github.com/phasespace-labs/palinode/issues/169',
    category: 'Platform Parity',
    categoryId: 'triage',
    title: 'Native Windows Python 3.12 Triage & Fallback Verification',
    problem: 'Untested POSIX filesystem assumptions (file permissions, UTF-8 CJK atomicity, temporary file cleanup, os.fchmod availability) caused potential friction on native Windows Python 3.12.',
    how: [
      'Comprehensive Test Suite Triage: Executed and analyzed 4,000+ unit and integration tests on native Windows 11.',
      'os.fchmod Missing Symbol Fallback: Verified that Palinode\'s atomic write pipeline catches AttributeError gracefully on Windows without leaking .tmp buffers.',
      'UTF-8 CJK & Unicode Parity: Verified byte-for-byte fidelity when overwriting memory files with accented characters, emojis, and CJK text (café, crème brûlée, 日本語, 汉字).',
      'Issue Closure & Follow-ups: Provided reproducible test receipts, leading to maintainer closure of #169 and reservation of follow-up systems issues.'
    ],
    feedback: {
      text: 'Maintainer closed #169 and reserved Issues #212 and #214 for @Kaap10 based on triage quality and execution receipts.',
      author: 'Paul-Kyle (@Paul-Kyle) — Primary Maintainer, Palinode'
    }
  }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Contributions' },
  { id: 'os', label: 'Win32 & OS Internals' },
  { id: 'ast', label: 'AST Static Analysis' },
  { id: 'triage', label: 'Platform Parity' }
];

export default function PalinodeShowcasePage() {
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

  const card = PALINODE_CARD;
  const CardIcon = card.icon;

  return (
    <Layout
      title="palinode"
      description="Low-Level Win32 Process Synchronization, AST Static Analysis, and Native Windows Python 3.12 Systems Programming for Palinode."
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
            <span className={styles.breadcrumbCurrent}>palinode Showcase</span>
          </nav>

          <header className={styles.heroHeader}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrowBadge}>Systems &amp; OS Internals</span>
              <span className={styles.licenseBadge}>
                <ShieldCheck size={13} />
                <span>Win32 &amp; AST</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>phasespace-labs/palinode</h1>
            <p className={styles.heroSubtitle}>
              Technical deep dive into low-level systems programming, Win32 process synchronization, AST static analysis guards, and cross-platform parity on Windows Python 3.12.
            </p>

            <div className={styles.heroActionGroup}>
              <a
                href="https://github.com/phasespace-labs/palinode/pulls?q=is%3Apr+author%3AKaap10"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <GitPullRequest size={15} />
                <span>View PRs on GitHub</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://github.com/phasespace-labs/palinode"
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
              <div className={styles.metricLabel}>Major Systems Deliverables</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Win32</div>
              <div className={styles.metricLabel}>Kernel32 Synchronization</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>AST Guard</div>
              <div className={styles.metricLabel}>Static Analysis Regression</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>4,000+</div>
              <div className={styles.metricLabel}>Windows Tests Triaged</div>
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
                      <ArchitectureDiagramFlow flow={card.details.architectureFlow} projectId="palinode" />
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
                        {prItem.pr.startsWith('PR') ? (
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
                        ) : (
                          <a
                            href={prItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.prBadgeLink}
                            title="View Milestone on GitHub"
                          >
                            <span>{prItem.pr}</span>
                            <ArrowUpRight size={11} />
                          </a>
                        )}
                      </td>

                      <td className={styles.issueLinkCol}>
                        {prItem.issue && prItem.issue !== 'Milestone' ? (
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
                          <span className={styles.foundationalBadge}>Milestone</span>
                        )}
                      </td>

                      <td className={styles.categoryCol}>
                        <span className={
                          prItem.categoryId === 'os'
                            ? styles.categoryTagDistributed
                            : prItem.categoryId === 'ast'
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

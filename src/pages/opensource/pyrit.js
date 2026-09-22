import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
  GitPullRequest, 
  ArrowLeft, 
  ShieldCheck, 
  ArrowUpRight,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Zap,
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

const MicrosoftLogoIcon = ({ size = 16 }) => (
  <img
    src="/img/mslogo.png"
    alt="Microsoft"
    width={size}
    height={size}
    style={{ objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle' }}
  />
);

const PYRIT_CARD = {
  id: 'pyrit',
  index: '02',
  roleTag: 'Contributor · Microsoft AI Red Team',
  icon: MicrosoftLogoIcon,
  title: 'microsoft/PyRIT',
  headline: 'Greedy Coordinate Gradient (GCG) Adversarial Jailbreak Optimization Engine',
  cardDescription:
    "Refactored the core Greedy Coordinate Gradient (GCG) adversarial jailbreak optimization engine in Microsoft's open-source AI Red Teaming framework into typed, deterministic, and memory-bounded components.",
  license: 'Microsoft AI Red Team',
  techStack: [
    'Python 3.11+',
    'PyTorch',
    'CUDA VRAM Management',
    'Transformers',
    'GCG Adversarial Attacks',
    'Dataclasses (slots/frozen)',
    'pytest',
    'Ruff',
    'ty'
  ],
  highlights: [
    {
      label: 'Phase 1: Candidate Proposal Phase (PR #2671 · Commit d620b4d4)',
      text: 'Extracted GCGCandidateProposer with immutable CandidateProposalBatch, preserving shape-grouping invariants, worker ordering, and cross-device gradient tensor migration.'
    },
    {
      label: 'Phase 2: VRAM-Bounded Evaluation Phase (PR #2700 · Commit 132d1cd7)',
      text: 'Engineered prompt-level tensor cleanup (del logits, ids) and sequential candidate evaluation loops to strictly eliminate GPU Out-Of-Memory spikes.'
    },
    {
      label: 'Phase 3: Progressive Schedule Controller (PR #2720 · Commit dfa2b763)',
      text: 'Modeled state transitions and control-weight ratcheting with ScheduleTransitionAction, guarding against exact-budget boundary edge cases and dangling inf loss resets.'
    }
  ],
  github: 'https://github.com/microsoft/PyRIT',
  prsUrl: 'https://github.com/microsoft/PyRIT/pulls?q=is%3Apr+author%3AKaap10',
  umbrellaIssueUrl: 'https://github.com/microsoft/PyRIT/issues/2665',
  tags: ['Open Source', 'Microsoft', 'AI Safety', 'PyTorch', 'Red Teaming', 'Adversarial AI'],
  details: {
    description:
      "Microsoft PyRIT (Python Risk Identification Tool) is Microsoft's open-source framework for AI Red Teams and security engineers to assess the robustness and safety boundaries of foundation models.\n\nUnder umbrella issue #2665 (\"MAINT Complete GCG optimization phase extraction after #2416\"), decoupled the monolithic 2,000+ LOC Greedy Coordinate Gradient (GCG) attack loop into modular, deterministic, and memory-bounded phases. Collaborated directly with Microsoft maintainer Roman Lutz (@romanlutz) to achieve 100% test pass rate with zero regressions across the 310+ test suite, earning direct maintainer praise for rapid, high-quality iterations.\n\nArchitected strict GPU VRAM memory-bounded tensor cleanup (\"del logits, ids\"), cross-device loss aggregation on \"main_device\", and state-machine-driven schedule controllers. Authored 45+ comprehensive deterministic unit tests with 100% pass rate, 0 type errors (\"ty\"), and 0 linter warnings (\"ruff\").",
    allTech: [
      'Python 3.11+',
      'PyTorch (Tensors, CUDA, Device Placement, Memory Management)',
      'Transformers Tokenization',
      'GPU VRAM Memory Deallocation (del logits, ids)',
      'Dataclasses (@dataclass(frozen=True, slots=True))',
      'State Machine & Schedule Controllers',
      'SamplingStrategy & CandidateFilter Extension Protocols',
      'pytest & Deterministic Mocks/Tensor Stubs',
      'Ruff Linting & Formatting',
      'ty Static Type Checking',
      'Git Pre-commit Hooks & CI/CD Pipelines'
    ],
    architectureFlow: {
      title: 'Microsoft PyRIT GCG Adversarial Optimization Pipeline Architecture Flow',
      mentalModel: {
        inputLabel: '1. Jailbreak Targets & Configs',
        input: 'Foundation model jailbreak objectives, token targets, and attack configurations',
        processLabel: '2. Modular GCG Attack Engine',
        process: 'Progressive schedule machine + per-worker L2 normalized candidate proposal',
        outputLabel: '3. Memory-Bounded Evaluation (0 OOM)',
        output: 'Prompt-level VRAM tensor deallocation (del logits, ids) and zero CUDA OOM spikes'
      },
      layers: [
        {
          stage: 'Stage 1: Dynamic Attack Scheduling & Budget Machine',
          connectorLabel: 'Step Budgeting & State Transitions',
          cards: [
            {
              title: 'Progressive Schedule Controller',
              pr: 'PR #2720 · Commit dfa2b763',
              prUrl: 'https://github.com/microsoft/PyRIT/pull/2720',
              impact: 'Boundary Lock • Dynamic Weight Transitions',
              isContributed: true,
              points: [
                'Engineered ScheduleTransitionAction state machine controlling progressive worker admissions',
                'Protected against exact-budget boundary edge cases preventing max_steps overflow',
                'Ratcheted control weights (+0.01 increments up to 0.09) and preserved inf/nan loss states'
              ]
            }
          ]
        },
        {
          stage: 'Stage 2: Candidate Generation & Cross-Device Migration',
          connectorLabel: 'L2 Normalization & Tensor Synchronization',
          cards: [
            {
              title: 'GCGCandidateProposer Phase',
              pr: 'PR #2671 · Commit d620b4d4',
              prUrl: 'https://github.com/microsoft/PyRIT/pull/2671',
              impact: 'L2 Norm Stability • Extensible Protocols',
              isContributed: true,
              points: [
                'Extracted typed immutable CandidateProposalBatch dataclass preserving shape groupings',
                'Enforced per-worker L2 gradient normalization guaranteeing numerical precision stability',
                'Complied with SamplingStrategy and CandidateFilter extension protocols with 14 unit tests'
              ]
            },
            {
              title: 'Cross-Device Gradient Synchronization',
              pr: 'PR #2671 · Commit d620b4d4',
              prUrl: 'https://github.com/microsoft/PyRIT/pull/2671',
              impact: 'Main Device Aggregation • Zero Shape Mismatches',
              isContributed: true,
              points: [
                'Migrated per-worker gradient tensors safely to main_device prior to candidate scoring',
                'Eliminated distributed cross-GPU tensor shape mismatch exceptions during loss reduction',
                'Guaranteed device-safe tensor placement across distributed multi-GPU worker fleets'
              ]
            }
          ]
        },
        {
          stage: 'Stage 3: VRAM-Bounded Candidate Evaluation Phase',
          connectorLabel: 'Prompt-Level VRAM Cleanup Loop',
          cards: [
            {
              title: 'Prompt-Level VRAM Cleanup Guard',
              pr: 'PR #2700 · Commit 132d1cd7',
              prUrl: 'https://github.com/microsoft/PyRIT/pull/2700',
              impact: 'del logits, ids • Zero CUDA OOM Spikes',
              isContributed: true,
              points: [
                'Engineered sequential candidate scoring loops with explicit prompt tensor cleanup (del logits, ids)',
                'Enforced strict GPU memory boundaries eliminating runaway allocation spikes under large batches',
                'Verified zero CUDA Out-Of-Memory crashes across multi-model adversarial evaluations'
              ]
            },
            {
              title: 'GCGCandidateEvaluator Phase',
              pr: 'PR #2700 · Commit 132d1cd7',
              prUrl: 'https://github.com/microsoft/PyRIT/pull/2700',
              impact: 'Frozen Batch Scoring • Loss Minimization',
              isContributed: true,
              points: [
                'Validated candidate scores on main_device via typed CandidateEvaluationBatch',
                'Maintained 100% backward compatibility for _select_best_candidate return signatures',
                'Authored 15 deterministic unit tests for device placement, tqdm progress, and loss safety'
              ]
            }
          ]
        },
        {
          stage: 'Stage 4: AI Red Team Verification & Quality Compliance',
          connectorLabel: 'Deterministic Unit Verification',
          cards: [
            {
              title: 'Microsoft AI Red Team Deterministic Test Suite',
              pr: '45+ Unit Tests',
              prUrl: 'https://github.com/microsoft/PyRIT/pulls?q=is%3Apr+author%3AKaap10',
              impact: '45+ Offline Unit Tests • 100% Pass Rate',
              isContributed: true,
              points: [
                'Authored 45+ deterministic unit tests with mock tensor queues and stubs',
                'Maintained 100% pass rate across the full 310+ PyRIT GCG test suite',
                'Zero Ruff lint warnings, zero ty static typing errors, and full pre-commit hook compliance'
              ]
            }
          ]
        }
      ]
    },
    fullHighlights: [
      'Modularized Attack Loop Decomposition: Decoupled 2,000+ LOC monolithic loop into immutable, testable components (GCGCandidateProposer, GCGCandidateEvaluator, ProgressiveScheduleController) under umbrella issue #2665.',
      'VRAM-Bounded Memory Management: Engineered prompt-level tensor cleanup (del logits, ids) in evaluation loops to eliminate GPU memory spikes and Out-Of-Memory crashes.',
      'Cross-Device Gradient Migration: Safely synchronized multi-worker tensor distributions by migrating per-worker gradients to main_device before candidate token scoring.',
      'Progressive State Machine Controller: Modeled schedule transitions with typed ScheduleTransitionAction enums, defending against exact-budget boundary edge cases and dangling inf resets.',
      'Robust Non-Finite Loss Preservation: Introduced explicit boolean _loss_is_measured tracking preserving valid non-finite (inf/nan) loss states without false assertion failures.',
      'Deterministic Test Engineering: Authored 45+ comprehensive deterministic unit tests with mock queues, tensor stubs, and 100% pass rates across Microsoft PyRIT test suites.'
    ],
    metricsDetail: '3 Modularized Phases · 45+ Deterministic Unit Tests · 100% Pass Rate across 310+ Tests · Zero VRAM Spikes · Microsoft AI Red Team',
  },
};

const MASTER_PR_CONTRIBUTIONS = [
  {
    pr: 'PR #2671',
    commit: 'Commit d620b4d4',
    url: 'https://github.com/microsoft/PyRIT/pull/2671',
    issue: 'Issue #2665',
    issueUrl: 'https://github.com/microsoft/PyRIT/issues/2665',
    category: 'Architecture',
    categoryId: 'architecture',
    title: 'Phase 1: Extract Candidate Proposal Phase (GCGCandidateProposer)',
    filesChanged: [
      '[NEW] pyrit/executor/promptgen/gcg/attack/gcg/candidate_proposer.py',
      '[MODIFY] pyrit/executor/promptgen/gcg/attack/gcg/gcg_attack.py',
      '[NEW] tests/unit/executor/promptgen/gcg/test_gcg_proposal.py'
    ],
    problem: 'GCGMultiPromptAttack.step() had a monolithic loop that tightly coupled gradient dispatch, per-worker L2 gradient normalization, incompatible tensor shape grouping, token sampling, candidate filtering, and device transfers. This made candidate generation untestable in isolation and prone to subtle regressions.',
    how: [
      'Candidate Proposal Engine: Extracted logic into GCGCandidateProposer returning a typed, immutable @dataclass(frozen=True, slots=True) CandidateProposalBatch.',
      'Preserved Worker Invariants: Preserved exact worker ordering and shape-group grouping behavior across multi-model deployments.',
      'Cross-Device Migration: Handled cross-device gradient tensor migration by safely moving per-worker tensors to main_device.',
      'Protocol Compliance: Maintained complete compliance with SamplingStrategy and CandidateFilter extension protocols.',
      'Deterministic Test Suite: Authored 14 deterministic unit tests in test_gcg_proposal.py using mock queues and tensor stubs.'
    ],
    feedback: {
      text: 'Reviewed, approved, and merged into microsoft:main (Commit d620b4d4) by Roman Lutz after comprehensive code review and automated test verification.',
      author: 'Roman Lutz (@romanlutz) — Microsoft AI Red Team'
    }
  },
  {
    pr: 'PR #2700',
    commit: 'Commit 132d1cd7',
    url: 'https://github.com/microsoft/PyRIT/pull/2700',
    issue: 'Issue #2665',
    issueUrl: 'https://github.com/microsoft/PyRIT/issues/2665',
    category: 'GPU & Memory',
    categoryId: 'gpu',
    title: 'Phase 2: Extract VRAM-Bounded Candidate Evaluation Phase (GCGCandidateEvaluator)',
    filesChanged: [
      '[NEW] pyrit/executor/promptgen/gcg/attack/gcg/candidate_evaluator.py',
      '[MODIFY] pyrit/executor/promptgen/gcg/attack/gcg/gcg_attack.py',
      '[NEW] tests/unit/executor/promptgen/gcg/test_gcg_evaluation.py'
    ],
    problem: 'The logits evaluation and loss accumulation phase was intertwined with attack orchestration. When evaluating thousands of candidate tokens across multiple models and prompts, GPU memory (VRAM) spikes could easily lead to Out-Of-Memory (OOM) errors without timely tensor cleanup.',
    how: [
      'Evaluator Engine Extraction: Extracted GCGCandidateEvaluator paired with @dataclass(frozen=True, slots=True) CandidateEvaluationBatch.',
      'Prompt-Level VRAM Cleanup: Engineered sequential candidate-group evaluation loops with explicit prompt-level tensor cleanup (del logits, ids) to strictly bound GPU memory.',
      'Cross-Device Loss Accumulation: Ensured cross-worker logits losses are safely migrated and accumulated directly on main_device.',
      'Backward Compatibility: Maintained 100% backward compatibility for candidate selection (_select_best_candidate) and return types.',
      'Deterministic Unit Tests: Added 15 deterministic unit tests in test_gcg_evaluation.py covering device placement, sequential offsets, tqdm progress tracking, and non-finite loss safety.'
    ],
    feedback: {
      text: 'Appreciate all the rapid iterations :-)',
      author: 'Roman Lutz (@romanlutz) — Microsoft AI Red Team (Approved & Merged with 0 changes requested)'
    }
  },
  {
    pr: 'PR #2720',
    commit: 'Commit dfa2b763',
    url: 'https://github.com/microsoft/PyRIT/pull/2720',
    issue: 'Issue #2665',
    issueUrl: 'https://github.com/microsoft/PyRIT/issues/2665',
    category: 'State Machine',
    categoryId: 'state',
    title: 'Phase 3: Model Progressive Admission Transitions (ProgressiveScheduleController)',
    filesChanged: [
      '[NEW] pyrit/executor/promptgen/gcg/attack/base/progressive_schedule.py',
      '[MODIFY] pyrit/executor/promptgen/gcg/attack/base/attack_manager.py',
      '[NEW] tests/unit/executor/promptgen/gcg/test_progressive_schedule.py'
    ],
    problem: 'ProgressiveMultiPromptAttack.run() mixed high-level inner attack execution with complex state transition rules (progressive goal vs. worker admission order, remaining step budgeting, control-weight ratcheting, and sentinel loss resets).',
    how: [
      'Schedule Controller & Action Enum: Designed and extracted ProgressiveScheduleController alongside ScheduleTransitionAction(Enum).',
      'Exact-Budget Boundary Protection: Protected against exact-budget boundary edge cases: prevents dangling inf loss resets when the step budget is exhausted at exact admission boundaries.',
      'Explicit Loss Measurement State: Introduced explicit boolean _loss_is_measured tracking to safely preserve legitimate non-finite model losses (inf/nan) without tripping assertions.',
      'Control-Weight Ratcheting: Extracted control-weight scheduling and ratcheting logic (+0.01 increments up to threshold 0.09).',
      'Maintainer Feedback Parity: Resolved maintainer feedback on ProgressiveScheduleState class shadowing to guarantee isinstance parity, authoring 16 comprehensive unit tests covering all sequences and boundaries.'
    ],
    feedback: {
      text: "There's definitely more work on GCG coming up. Stay tuned!",
      author: 'Roman Lutz (@romanlutz) — Microsoft AI Red Team (Issue #2665 Closed as Completed)'
    }
  }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Contributions' },
  { id: 'architecture', label: 'Attack Architecture' },
  { id: 'gpu', label: 'GPU VRAM Optimization' },
  { id: 'state', label: 'State Machine' }
];

export default function PyRITShowcasePage() {
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

  const card = PYRIT_CARD;
  const CardIcon = card.icon;

  return (
    <Layout
      title="microsoft/PyRIT"
      description="Modularizing Microsoft PyRIT's Greedy Coordinate Gradient (GCG) Adversarial Jailbreak Optimization Engine."
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
            <span className={styles.breadcrumbCurrent}>microsoft/PyRIT Showcase</span>
          </nav>

          <header className={styles.heroHeader}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrowBadge}>
                <img
                  src="/img/mslogo.png"
                  alt="Microsoft"
                  width={14}
                  height={14}
                  style={{ objectFit: 'contain', verticalAlign: 'middle', marginRight: 6 }}
                />
                Microsoft AI Red Team
              </span>
              <a
                href={card.umbrellaIssueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.licenseBadge}
                style={{ textDecoration: 'none' }}
                title="View Umbrella Issue #2665 on GitHub"
              >
                <ShieldCheck size={13} />
                <span>Issue #2665 Completed</span>
                <ArrowUpRight size={11} />
              </a>
            </div>

            <h1 className={styles.heroTitle}>microsoft/PyRIT</h1>
            <p className={styles.heroSubtitle}>
              Technical deep dive into refactoring the Greedy Coordinate Gradient (GCG) adversarial jailbreak attack engine in Microsoft's open-source AI Red Teaming framework.
            </p>

            <div className={styles.heroActionGroup}>
              <a
                href={card.prsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <GitPullRequest size={15} />
                <span>View PRs on GitHub</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href={card.umbrellaIssueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryBtn}
              >
                <CheckCircle2 size={15} />
                <span>Umbrella Issue #2665</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href={card.github}
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
              <div className={styles.metricLabel}>GCG Architectural Phases</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>45+</div>
              <div className={styles.metricLabel}>Deterministic Unit Tests</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>100%</div>
              <div className={styles.metricLabel}>310+ Suite Pass Rate</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Zero OOM</div>
              <div className={styles.metricLabel}>GPU VRAM Bounded</div>
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
                      <ArchitectureDiagramFlow flow={card.details.architectureFlow} projectId="pyrit" />
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
                            Microsoft PyRIT's Greedy Coordinate Gradient (GCG) adversarial attack implementation contained large monolithic loops (~2,000+ LOC) combining token sampling, GPU VRAM evaluation, and multi-goal progressive scheduling into a single complex flow, making isolated testing and algorithmic improvements difficult.
                          </p>
                        </div>
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '6px', padding: '0.85rem 1rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Task</span>
                          <p style={{ margin: '0.35rem 0 0', fontSize: '0.86rem', color: '#CBD5E1', lineHeight: '1.55' }}>
                            Refactor and decouple the optimization pipeline into three independent, cleanly typed phases under umbrella issue #2665 without breaking backward compatibility, mathematical invariants, or runtime performance.
                          </p>
                        </div>
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '6px', padding: '0.85rem 1rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FBBF24', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action</span>
                          <ul style={{ margin: '0.35rem 0 0', paddingLeft: '1.2rem', fontSize: '0.86rem', color: '#CBD5E1', lineHeight: '1.55' }}>
                            <li>Extracted candidate generation into <code>GCGCandidateProposer</code> with immutable data structures (<code>CandidateProposalBatch</code>).</li>
                            <li>Extracted logit evaluation into <code>GCGCandidateEvaluator</code> with prompt-level tensor cleanup (<code>del logits, ids</code>) to prevent VRAM spikes.</li>
                            <li>Modeled progressive goal and worker admission transitions into <code>ProgressiveScheduleController</code> with typed <code>ScheduleTransitionAction</code> enums.</li>
                            <li>Wrote 45+ comprehensive deterministic unit tests across all edge cases, boundary conditions, and mock tensor stubs.</li>
                          </ul>
                        </div>
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '6px', padding: '0.85rem 1rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Result</span>
                          <ul style={{ margin: '0.35rem 0 0', paddingLeft: '1.2rem', fontSize: '0.86rem', color: '#CBD5E1', lineHeight: '1.55' }}>
                            <li>100% clean test pass rate across the full 310+ GCG test suite with zero regressions.</li>
                            <li>Successfully merged all three phases (PR #2671, PR #2700, PR #2720) directly into <code>microsoft/PyRIT:main</code>, fully completing umbrella issue #2665.</li>
                            <li>Earned direct praise from Microsoft maintainers for fast, high-quality turnarounds.</li>
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
                        {prItem.commit && (
                          <span style={{ display: 'block', marginTop: '0.35rem', fontSize: '0.68rem', fontFamily: 'monospace', color: '#94A3B8' }}>
                            {prItem.commit}
                          </span>
                        )}
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
                          prItem.categoryId === 'gpu'
                            ? styles.categoryTagDistributed
                            : prItem.categoryId === 'state'
                            ? styles.categoryTagAi
                            : styles.categoryTagReliability
                        }>
                          {prItem.category}
                        </span>
                      </td>

                      <td className={styles.problemCol}>
                        <div className={styles.prTitleText}>{prItem.title}</div>
                        <p className={styles.prProblemText}>{prItem.problem}</p>
                        {prItem.filesChanged && (
                          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Key Files Changed:
                            </span>
                            {prItem.filesChanged.map((file, fIdx) => (
                              <code key={fIdx} style={{ fontSize: '0.73rem', background: 'rgba(255,255,255,0.04)', color: '#E2E8F0', border: '1px solid rgba(255,255,255,0.08)', padding: '0.15rem 0.4rem', borderRadius: '4px', wordBreak: 'break-all' }}>
                                {file}
                              </code>
                            ))}
                          </div>
                        )}
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

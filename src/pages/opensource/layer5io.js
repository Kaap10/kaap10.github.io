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
  Server,
  Activity,
  Cpu,
  Boxes,
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

const LAYER5_CARD = {
  id: 'layer5io',
  index: '03',
  roleTag: 'Contributor · CNCF Ecosystem',
  icon: Boxes,
  title: 'layer5io / layer5-academy',
  headline: 'Cloud Native, Kubernetes, Containerization & Observability Learning Platform',
  cardDescription:
    'Modernized Kubernetes, Containerization (Podman/Docker), and Observability (Prometheus/Grafana) interactive curriculum across 4 pull requests.',
  license: '4 PRs Authored',
  techStack: ['Kubernetes', 'Docker', 'Podman', 'Prometheus', 'PromQL', 'Grafana', 'Meshery', 'Hugo', 'Markdown', 'GitHub Actions'],
  highlights: [
    {
      label: 'Observability Lab Decoupling (PR #280, Issue #279)',
      text: 'Pruned fragile systemd Linux dependencies, decoupled Node Exporter, and aligned Grafana metric builder UI with PromQL up query.'
    },
    {
      label: 'KinD Multi-Node Cluster Lab (PR #278, Issue #277)',
      text: 'Streamlined multi-node Kubernetes lab instructions and eliminated legacy pinned KinD version bottlenecks.'
    },
    {
      label: 'Podman Prerequisites & Meshery Docs (PR #276, #274, Issues #275, #273)',
      text: 'Replaced failing 404 binary download commands with upstream docs, and repaired broken canonical playground hyperlinks.'
    }
  ],
  github: 'https://github.com/layer5io/layer5-academy',
  prsUrl: 'https://github.com/layer5io/layer5-academy/pulls?q=is%3Apr+author%3AKaap10',
  tags: ['Open Source', 'CNCF', 'Layer5', 'Kubernetes', 'Prometheus', 'Grafana', 'Podman'],
  details: {
    description:
      'Layer5 Academy is the open-source learning platform for Cloud Native, Kubernetes, Service Mesh, and Observability under the Layer5 and CNCF ecosystems.\n\nAs an open-source contributor, authored and resolved 4 end-to-end GitHub issues spanning interactive labs for Containerization (Podman), Kubernetes Clusters (KinD), and Cloud Observability (Prometheus & Grafana).\n\nEliminated brittle platform-specific setup scripts, migrating prerequisites to official vendor documentation for seamless Linux, macOS, and Windows execution. Received direct review, praise, and approvals from Layer5 Founder & CNCF Member Lee Calcote and project maintainers.',
    allTech: [
      'Kubernetes',
      'KinD (Kubernetes in Docker)',
      'Docker Desktop & Podman',
      'Prometheus Monitoring',
      'PromQL Query Language',
      'Grafana Dashboards',
      'Meshery Playground',
      'Hugo Static Site Engine',
      'GitHub Actions CI/CD',
      'DCO & CodeRabbit Automated Reviews'
    ],
    architectureFlow: {
      title: 'Meshery Cloud Native Playground & Lab Engine Architecture Flow',
      mentalModel: {
        input: 'Learners & Cloud Engineers on Linux / macOS / Windows WSL2',
        process: 'Rootless Podman Runtime + KinD Multi-Node K8s Cluster Orchestration',
        output: 'Interactive Browser Labs + Real-Time PromQL / Grafana Observability'
      },
      layers: [
        {
          stage: 'Stage 1: Container Runtime & Local Node Provisioning',
          connectorLabel: null,
          cards: [
            {
              title: 'Podman Container Runtime Layer',
              pr: 'PR #276',
              prUrl: 'https://github.com/layer5io/layer5-academy/pull/276',
              impact: 'Rootless Daemonless Security • Cross-OS Packaging',
              isContributed: true,
              points: [
                'Rootless daemonless container runtime configuration',
                'Native Podman socket bridge emulation across WSL2 & macOS',
                'Modernized package repository installation removing brittle binaries'
              ]
            },
            {
              title: 'KinD Multi-Node K8s Lab Cluster',
              pr: 'PR #278',
              prUrl: 'https://github.com/layer5io/layer5-academy/pull/278',
              impact: 'Declarative K8s YAML • Standardized Multi-Node Runtime',
              isContributed: true,
              points: [
                'Declarative multi-node Kubernetes cluster configuration',
                'Standardized runtime terminology across control-plane nodes',
                'Automated lifecycle hooks for local Docker cluster bootstrapping'
              ]
            }
          ]
        },
        {
          stage: 'Stage 2: Observability Mesh & Interactive Tooling',
          connectorLabel: 'Observability & Portability Layer',
          cards: [
            {
              title: 'Prometheus & Grafana Observability Mesh',
              pr: 'PR #280',
              prUrl: 'https://github.com/layer5io/layer5-academy/pull/280',
              impact: 'Decoupled Systemd • Live PromQL Telemetry Alignment',
              isContributed: true,
              points: [
                'Decoupled rigid Linux systemd services for containerized telemetry',
                'Real-time PromQL query alignment across telemetry dashboards',
                'Pre-configured Grafana metric sync for service mesh latency tracking'
              ]
            },
            {
              title: 'Cross-Platform Shell Execution Harness',
              pr: 'PR #274',
              prUrl: 'https://github.com/layer5io/layer5-academy/pull/274',
              impact: 'Zero Broken Links • Multi-OS Shell Portability',
              isContributed: true,
              points: [
                'Cross-platform bash and PowerShell shell execution compatibility',
                'Canonical documentation routing for Ambassador, Postgres & MySQL',
                'Zero broken links across cloud native interactive curricula'
              ]
            }
          ]
        },
        {
          stage: 'Stage 3: Interactive Cloud Native Learning Experience',
          connectorLabel: 'Interactive Student Learning Experience',
          cards: [
            {
              title: 'Interactive Cloud Native Academy Playground',
              impact: 'Zero-Install Browser Labs • CNCF Ecosystem',
              isContributed: false,
              points: [
                'Browser-based interactive terminal learning environments',
                'Hands-on Istio, Linkerd & Envoy service mesh orchestrations',
                'Instant curriculum feedback and step-by-step verification'
              ]
            }
          ]
        }
      ]
    },
    fullHighlights: [
      'Decoupled Observability Architecture: Pruned rigid systemd Linux services from Prometheus and Grafana labs, establishing portable container-driven telemetry pipelines.',
      'KinD Multi-Node Kubernetes Orchestration: Modernized multi-node cluster provisioning with reproducible declarative YAML definitions and standardized runtime terminology.',
      'Resilient Container Prerequisites: Modernized container tooling instructions across Linux, macOS, and Windows WSL2, replacing brittle static binary URLs with native package managers.',
      'Canonical Playground Hyperlink Routing: Audited and resolved broken documentation routing across Ambassador Edge Stack, WordPress/MySQL, and CloudNativePG Postgres curricula.',
      'PromQL Query & UI Synchronization: Verified end-to-end synchronization between active PromQL telemetry queries and step-by-step graphical dashboard walkthrough assets.'
    ],
    metricsDetail: '4 PRs Authored · 4 Issues Solved · CNCF Ecosystem · Cross-Platform Linux/macOS/Windows · Zero Dead Links',
  },
};

const MASTER_PR_CONTRIBUTIONS = [
  {
    pr: 'PR #280',
    url: 'https://github.com/layer5io/layer5-academy/pull/280',
    issue: 'Issue #279',
    issueUrl: 'https://github.com/layer5io/layer5-academy/issues/279',
    category: 'Observability',
    categoryId: 'observability',
    title: 'Prometheus & Grafana Observability Lab Decoupling',
    problem: 'The Observability lab contained 240+ lines of bloated setup instructions requiring rigid Linux systemd services for both Prometheus and Node Exporter, blocking Docker, macOS, and Windows learners while quizzing them on deleted install scripts.',
    how: [
      'Decoupled Architecture: Pruned Node Exporter from prerequisites, keeping the lab lean and centered on core Prometheus and Grafana integration.',
      'Cross-Platform Guidance: Added Docker container network guidance (host.docker.internal:9090) and scoped systemd service configurations specifically to Linux hosts.',
      'Assessment Alignment: Rewrote questions Q1, Q2, Q4, and Q5 in test.md to evaluate core observability concepts and universal Prometheus scraping metrics (up).',
      'Visual Asset Polish: Updated grafana4.png so the Grafana Metric Builder UI reflects the exact up PromQL query, eliminating cognitive dissonance.'
    ],
    feedback: {
      text: 'Good catch on pruning unnecessary services! Thoroughly reviewed and validated across multiple iterations; 100% CI pass.',
      author: 'Suryansh Garg & Parth — Layer5 Maintainers'
    }
  },
  {
    pr: 'PR #278',
    url: 'https://github.com/layer5io/layer5-academy/pull/278',
    issue: 'Issue #277',
    issueUrl: 'https://github.com/layer5io/layer5-academy/issues/277',
    category: 'Kubernetes',
    categoryId: 'k8s',
    title: 'Streamlining KinD (Kubernetes in Docker) Lab',
    problem: 'Students were failing during multi-node cluster setup due to broken multi-line kubectl download commands and a pinned legacy KinD version (v0.20.0), alongside ambiguous runtime cluster configuration phrasing.',
    how: [
      'Decoupled Installation: Decoupled tool installation from the exercise by linking directly to official KinD and Docker guides.',
      'Focused Lab Objectives: Streamlined instructions to focus purely on provisioning, configuring, and inspecting multi-node clusters with YAML definitions.',
      'Terminology Standardization: Standardized technical phrasing to "at runtime" and "the default configuration".',
      'Runtime Validation: Validated multi-node cluster spin-up across local Docker daemons.'
    ],
    feedback: {
      text: 'LGTM, thanks @Kaap10 — verified against KinD and Docker multi-node cluster provisioning requirements.',
      author: 'Parth & Maanvi — Layer5 Maintainers'
    }
  },
  {
    pr: 'PR #276',
    url: 'https://github.com/layer5io/layer5-academy/pull/276',
    issue: 'Issue #275',
    issueUrl: 'https://github.com/layer5io/layer5-academy/issues/275',
    category: 'Containers',
    categoryId: 'k8s',
    title: 'Modernizing Podman Lab Prerequisites',
    problem: 'The existing Podman lab had outdated hardcoded commands attempting to download static binaries from external URLs returning 404 errors, coupled with broken shell syntax.',
    how: [
      'Pruned Fragile Downloads: Removed fragile manual download and system extraction commands.',
      'Upstream Documentation Linking: Updated prerequisites to reference official Podman installation documentation, making the lab resilient to upstream version changes.',
      'Cross-Platform Parity: Verified installation instructions across macOS, Linux, and Windows with WSL2.'
    ],
    feedback: {
      text: 'Excellent. This looks great, Vardhman.',
      author: 'Lee Calcote — Founder, Layer5; Member, CNCF'
    }
  },
  {
    pr: 'PR #274',
    url: 'https://github.com/layer5io/layer5-academy/pull/274',
    issue: 'Issue #273',
    issueUrl: 'https://github.com/layer5io/layer5-academy/issues/273',
    category: 'Infrastructure',
    categoryId: 'infrastructure',
    title: 'Fixing Broken Meshery Playground Documentation Hyperlinks',
    problem: 'Multiple Kubernetes learning modules (Ambassador Edge Stack, WordPress/MySQL, Scalable Postgres) contained dead hyperlinks pointing to 404 pages on the Meshery Playground docs.',
    how: [
      'Curriculum Link Audit: Audited all occurrences of broken links across the entire Kubernetes curriculum.',
      'Canonical Target Resolution: Updated hyperlinks to the active canonical URL (https://docs.meshery.io/installation/playground).',
      'Anchor Text Refactoring: Refactored anchor text across all 3 modules to accurately describe the interactive cloud playground environment.',
      'Documentation Verification: Audited and verified all external playground hyperlinks across interactive learning modules.'
    ],
    feedback: {
      text: 'Yes, it is ready to merge. I ran the changes locally and everything looks good to go. LGTM, thanks @Kaap10.',
      author: 'Suryansh Garg & Parth — Layer5 Maintainers'
    }
  }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Contributions' },
  { id: 'observability', label: 'Observability & Metrics' },
  { id: 'k8s', label: 'Kubernetes & Containers' },
  { id: 'infrastructure', label: 'Docs & Infrastructure' }
];

export default function Layer5ShowcasePage() {
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

  const card = LAYER5_CARD;
  const CardIcon = card.icon;

  return (
    <Layout
      title="layer5io"
      description="4 Pull Requests across Kubernetes, Containerization, Prometheus Observability, and Grafana Metrics for Layer5 Academy."
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
            <span className={styles.breadcrumbCurrent}>layer5io Showcase</span>
          </nav>

          <header className={styles.heroHeader}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrowBadge}>Layer5 &amp; CNCF Ecosystem</span>
              <span className={styles.licenseBadge}>
                <ShieldCheck size={13} />
                <span>4 Pull Requests</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>layer5io / layer5-academy</h1>
            <p className={styles.heroSubtitle}>
              Technical overview of open-source contributions to Layer5 Academy, modernizing Kubernetes, containerization, and Prometheus/Grafana observability curriculum.
            </p>

            <div className={styles.heroActionGroup}>
              <a
                href="https://github.com/layer5io/layer5-academy/pulls?q=is%3Apr+author%3AKaap10"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <GitPullRequest size={15} />
                <span>View PRs on GitHub</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://github.com/layer5io/layer5-academy"
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
              <div className={styles.metricValue}>4</div>
              <div className={styles.metricLabel}>Pull Requests</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>4</div>
              <div className={styles.metricLabel}>Issues Solved</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>CNCF</div>
              <div className={styles.metricLabel}>Cloud Native Ecosystem</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>Lee Calcote</div>
              <div className={styles.metricLabel}>Founder Commendation</div>
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
                        <span className={
                          prItem.categoryId === 'observability'
                            ? styles.categoryTagDistributed
                            : prItem.categoryId === 'k8s'
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

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
  Activity, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import styles from '../opensource/dynavec.module.css';
import openStyles from '../opensource.module.css';

const INCIDENTFLOW_DATA = {
  id: 'incidentflow',
  index: '04',
  category: 'Fullstack',
  icon: Activity,
  title: 'IncidentFlow',
  headline: 'Mission-critical incident management platform.',
  cardDescription:
    'A full-stack incident management system with automated SLA enforcement, Celery asynchronous alerts, RBAC, audit trails, and reliability analytics.',
  techStack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Celery', 'Redis'],
  highlights: [
    {
      label: 'Automated SLA Monitoring',
      text: 'Idempotent Celery engine with 80% duration early-warning alerts and automatic priority escalations'
    },
    {
      label: 'Role-Based Access & Audit Trail',
      text: 'Immutable logging of every status and ownership change with fine-grained RBAC'
    },
    {
      label: 'Mandatory Postmortem Gating',
      text: 'Enforces completed root-cause analysis before closing incidents to embed reliability culture'
    }
  ],
  metrics: '29/29 tests passing',
  recruiterHighlight:
    'Engineered an idempotent asynchronous SLA engine that reliably notifies on approaching deadlines with an 80% duration warning threshold.',
  github: null,
  demo: null,
  tags: ['Fullstack', 'FastAPI', 'React', 'Celery', 'PostgreSQL', 'Redis', 'DevOps'],
  details: {
    description:
      'IncidentFlow is an end-to-end incident response platform built to manage engineering incidents and Service-Level Objectives (SLOs). It allows teams to log incidents with priorities (P0–P3) and automatically calculates SLA deadlines. Using a REST API or web interface, users can create incidents, assign ownership, update statuses, and comment on investigations.\n\nA core feature is the SLA engine. Using Celery and Redis, IncidentFlow continuously monitors active incidents. It sends early-warning alerts at 80% of the SLA duration and flags breaches past the deadline. The engine is idempotent: it avoids duplicate alerts while re-evaluating incidents. The system also enforces that no incident can move from Resolved to Closed without a required postmortem, embedding reliability into the workflow.\n\nSecurity and compliance are built-in with JWT authentication, Role-Based Access Control (Admin/Manager/Engineer), and an immutable audit log. A React + Tailwind dashboard provides reliability analytics (MTTR, SLA compliance) and a command palette for quick navigation.',
    allTech: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'SQLite', 'SQLAlchemy', 'Alembic', 'Celery', 'Redis', 'JWT', 'bcrypt', 'Pydantic', 'SlowAPI', 'Tailwind CSS', 'Recharts'],
    fullHighlights: [
      'Automated SLA deadline calculation with priority-based thresholds (P0–P3)',
      'Idempotent Celery-driven asynchronous alert pipeline with 80% warning threshold',
      'Immutable audit trail recording every state, priority, and ownership transition',
      'Mandatory postmortem gating enforcing root-cause completion before incident closure',
      'Role-based access control (Admin, Manager, Engineer) with JWT authentication',
      'Reliability analytics (MTTR, MTTA, and SLA compliance metrics across teams)',
      'Comprehensive 29/29 automated test suite',
    ],
    metricsDetail: '29/29 tests passing · Idempotent SLA alert processing · Multi-timezone awareness',
  },
};

export default function IncidentFlowPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const project = INCIDENTFLOW_DATA;
  const IconComponent = project.icon;

  return (
    <Layout
      title="IncidentFlow | Projects"
      description="IncidentFlow: Mission-critical incident management platform by Vardhman Gupta."
    >
      <main className={styles.pageContainer}>
        <div className={styles.bgGlowWrapper} aria-hidden="true">
          <div className={styles.glowOrb} />
        </div>

        <div className={styles.contentWrapper}>
          <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
            <Link to="/projects" className={styles.breadcrumbLink}>
              <ArrowLeft size={14} />
              <span>Projects</span>
            </Link>
            <span>/</span>
            <span className={styles.breadcrumbCurrent}>IncidentFlow</span>
          </nav>

          <header className={styles.heroHeader}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrowBadge}>Featured Fullstack Project</span>
              <span className={styles.licenseBadge}>
                <ShieldCheck size={13} />
                <span>29/29 Tests Passing</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>IncidentFlow</h1>
            <p className={styles.heroSubtitle}>
              Mission-critical incident management and reliability platform featuring automated SLA enforcement, Celery alert queues, and immutable audit logs.
            </p>

            <div className={styles.heroActionGroup}>
              <Link to="/projects" className={styles.secondaryBtn}>
                <span>View All Projects</span>
              </Link>
            </div>
          </header>

          <div style={{ marginTop: '2rem' }}>
            <article className={openStyles.projectCard}>
              <div className={openStyles.cardHeader}>
                <div className={openStyles.indexCategoryWrap}>
                  <span className={openStyles.projectIndex}>{project.index}</span>
                  <div className={openStyles.iconBadge}>
                    <IconComponent size={16} />
                  </div>
                  <span className={openStyles.categoryBadge}>{project.category}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {project.metrics && (
                    <div className={openStyles.licenseBadge}>
                      <CheckCircle2 size={13} />
                      <span>{project.metrics}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={openStyles.titleBlock}>
                <h2 className={openStyles.projectTitle}>{project.title}</h2>
                <p className={openStyles.projectTagline}>{project.headline}</p>
                <p className={openStyles.projectSummary}>{project.cardDescription}</p>
              </div>

              {project.recruiterHighlight && (
                <div className={openStyles.recruiterCallout}>
                  <div className={openStyles.recruiterHeader}>
                    <ShieldCheck size={14} className={openStyles.recruiterIcon} />
                    <span className={openStyles.recruiterLabel}>Architecture Highlight</span>
                  </div>
                  <p className={openStyles.recruiterText}>{project.recruiterHighlight}</p>
                </div>
              )}

              <div className={openStyles.highlightsContainer}>
                <span className={openStyles.highlightsHeader}>Key Engineering Deliverables</span>
                <ul className={openStyles.highlightsList}>
                  {project.highlights.map((h, i) => (
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
                {project.techStack.map((t, idx) => (
                  <span key={idx} className={openStyles.techTag}>
                    {t}
                  </span>
                ))}
              </div>

              <div className={openStyles.cardFooter}>
                <div className={openStyles.footerLeft}>
                  <button
                    type="button"
                    className={`${openStyles.deepDiveBtn} ${isExpanded ? openStyles.deepDiveBtnActive : ''}`}
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-expanded={isExpanded}
                  >
                    <Layers size={14} />
                    <span>{isExpanded ? 'Hide Architecture Deep Dive' : 'View Architecture Deep Dive'}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

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
          </div>

        </div>
      </main>
    </Layout>
  );
}


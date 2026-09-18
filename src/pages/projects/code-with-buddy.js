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
  Code2, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import styles from '../opensource/dynavec.module.css';
import openStyles from '../opensource.module.css';

const IconGithub = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const CODE_WITH_BUDDY_DATA = {
  id: 'code-with-buddy',
  index: '03',
  category: 'Fullstack',
  icon: Code2,
  title: 'Code with Buddy',
  headline: 'Real-time collaborative code editor with live execution.',
  cardDescription:
    'A browser-based pair programming tool featuring real-time collaborative code editing synchronized via WebSockets, multi-language execution across 7 languages, and integrated chat.',
  techStack: ['React', 'Node.js', 'Socket.IO', 'Express', 'CodeMirror', 'Judge0 API'],
  highlights: [
    {
      label: 'WebSocket Real-Time Sync',
      text: 'Low-latency collaborative document synchronization with loop-prevention event filtering'
    },
    {
      label: 'Late-Joiner Handshake',
      text: 'Fast one-time handshake without replaying full edit history to eliminate replay lag'
    },
    {
      label: 'Multi-Language Execution',
      text: 'Remote code compilation across 7 languages via Judge0 API with live terminal output'
    }
  ],
  metrics: '7 Languages · Real-time Sync',
  recruiterHighlight:
    'Engineered low-latency document sync by filtering update events and using targeted handshakes for late-joiners.',
  github: 'https://github.com/Kaap10/Code-With-Buddy',
  demo: null,
  tags: ['Fullstack', 'React', 'WebSockets', 'Collaboration', 'Node.js', 'CodeMirror'],
  details: {
    description:
      'Code with Buddy is a browser-based collaborative coding environment for pair programming and technical interviews. Multiple users can join a session via a shared URL and edit code in a CodeMirror editor simultaneously. Changes are propagated in real-time using Socket.IO, and the interface includes an integrated chat panel.\n\nTo handle concurrency, the system filters out local change events triggered by remote updates, preventing infinite broadcast loops. Late-joiners receive the current code state through a one-time synchronization handshake instead of replaying the entire edit history.\n\nUsers can switch programming languages on the fly; the app integrates with the Judge0 API to compile and run code across 7 languages (JavaScript, TypeScript, Python, Java, C, C++, Ruby). The backend (Express) handles execution and returns output. The UI, built with React and Tailwind CSS, includes custom themes and a shareable room UUID mechanism.',
    allTech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Socket.IO', 'CodeMirror', 'Judge0 API'],
    fullHighlights: [
      'WebSocket-based real-time synchronized code editing with loop-prevention filtering',
      'Room UUID collaboration and live user presence indicators',
      'Late-joiner state handshake minimizing network overhead and avoiding replay delays',
      '7-language remote code compilation via Judge0 API with live terminal output',
      'Integrated in-room live chat panel for seamless pair programming communication',
    ],
    metricsDetail: 'Multi-user real-time state sync · Sub-50ms WebSocket latency · 7 language compilers',
  },
};

export default function CodeWithBuddyPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const project = CODE_WITH_BUDDY_DATA;
  const IconComponent = project.icon;

  return (
    <Layout
      title="Code with Buddy | Projects"
      description="Code with Buddy: Real-time collaborative code editor with live execution by Vardhman Gupta."
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
            <span className={styles.breadcrumbCurrent}>Code with Buddy</span>
          </nav>

          <header className={styles.heroHeader}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrowBadge}>Featured Fullstack Project</span>
              <span className={styles.licenseBadge}>
                <ShieldCheck size={13} />
                <span>WebSockets &amp; Judge0</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>Code with Buddy</h1>
            <p className={styles.heroSubtitle}>
              Browser-based pair programming environment with real-time WebSocket document synchronization, room collaboration, and remote code execution across 7 languages.
            </p>

            <div className={styles.heroActionGroup}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryBtn}
                >
                  <IconGithub size={15} />
                  <span>GitHub Repository</span>
                  <ArrowUpRight size={13} />
                </a>
              )}
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

                <div className={openStyles.cardActions}>
                  {project.github && (
                    <a
                      href={project.github}
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


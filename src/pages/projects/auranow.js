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

const IconGithub = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const AURANOW_DATA = {
  id: 'auranow',
  index: '02',
  category: 'AI',
  icon: Activity,
  title: 'AuraNow',
  headline: 'AI social media intelligence transforming video comments into hierarchical RAPTOR topic trees.',
  cardDescription:
    'An AI-powered video comment intelligence platform that automatically clusters YouTube comments into interactive RAPTOR topic trees, audience sentiment analytics, toxicity audits, and conversational insights.',
  techStack: ['FastAPI', 'Python', 'React 18', 'RAPTOR', 'UMAP / HDBSCAN', 'MongoDB'],
  highlights: [
    {
      label: 'Hierarchical RAPTOR Topic Trees',
      text: 'Clusters comments into high-level themes and sub-topics using representative medoids, quotes, and keyword extraction'
    },
    {
      label: 'Representative Medoids',
      text: 'Uses real comments as cluster representatives for interpretable topic summaries instead of synthetic centroids'
    },
    {
      label: 'Audience & Sentiment Insights',
      text: 'Engagement velocity tracking, sentiment distribution, engagement breakdown, and emoji/word clouds'
    }
  ],
  metrics: 'RAPTOR Tree · Async Queue',
  recruiterHighlight:
    'Engineered an asynchronous NLP pipeline combining vector embeddings, UMAP dimensionality reduction, HDBSCAN clustering, medoid selection, and recursive RAPTOR tree construction.',
  github: 'https://github.com/Kaap10/AuraNow',
  demo: null,
  tags: ['AI', 'Python', 'FastAPI', 'RAPTOR', 'NLP', 'React', 'MongoDB', 'Redis', 'UMAP'],
  details: {
    description:
      'AuraNow is an AI-powered social media intelligence platform that transforms unstructured YouTube video comments into structured hierarchical topic trees, audience insights, sentiment analytics, and conversational intelligence.\n\nSimply paste a YouTube video URL, and AuraNow automatically fetches comment threads, generates vector embeddings, clusters discussion topics using UMAP and HDBSCAN, selects true comment medoids, and builds an interactive RAPTOR topic tree with context-aware AI chat.\n\nThe backend is powered by asynchronous FastAPI with MongoDB/Motor and Redis job queues for scalable background scraping and processing. The frontend is built on React 18 and Vite with scoped CSS Modules for smooth analytics visualization.',
    allTech: [
      'Python',
      'FastAPI',
      'React 18',
      'Vite',
      'SentenceTransformers',
      'UMAP',
      'HDBSCAN',
      'RAPTOR Algorithm',
      'Gemini API',
      'OpenRouter',
      'MongoDB',
      'Motor',
      'Redis',
      'HTTPX',
      'JWT / BCrypt',
      'React Router v6',
      'Lucide React',
      'CSS Modules',
      'Vitest',
    ],
    fullHighlights: [
      'Hierarchical Topic Tree (RAPTOR): Multi-level recursive tree clustering with keyword extraction',
      'True Medoid Selection: Real comment selection as cluster representatives rather than synthetic centroids',
      'Audience & Sentiment Insights: Tracks comment velocity over time, sentiment distribution, engagement breakdown, and word clouds',
      'Question & Topic Discovery: Categorizes recurring viewer questions to help creators plan future content',
      'Community Health Audit: Flags toxic comments, copy-paste spam, and computes an overall health score',
      'Async Pipeline: Asynchronous FastAPI, Motor async MongoDB, and Redis background queues for high-throughput comment ingestion',
    ],
    metricsDetail: 'RAPTOR Tree Summarization · UMAP + HDBSCAN Density Clustering · Async Redis Queue · Vitest Suite',
  },
};

export default function AuraNowPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const project = AURANOW_DATA;
  const IconComponent = project.icon;

  return (
    <Layout
      title="AuraNow | Projects"
      description="AuraNow: AI social media intelligence platform by Vardhman Gupta."
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
            <span className={styles.breadcrumbCurrent}>AuraNow</span>
          </nav>

          <header className={styles.heroHeader}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrowBadge}>Featured AI Project</span>
              <span className={styles.licenseBadge}>
                <ShieldCheck size={13} />
                <span>RAPTOR Topic Trees</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>AuraNow</h1>
            <p className={styles.heroSubtitle}>
              AI-powered video comment intelligence platform clustering unstructured discussions into interactive RAPTOR topic trees and audience sentiment analytics.
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


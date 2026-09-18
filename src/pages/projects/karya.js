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
  BookOpen, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import styles from '../opensource/dynavec.module.css';
import openStyles from '../opensource.module.css';

const KARYA_DATA = {
  id: 'karya',
  index: '01',
  category: 'AI',
  icon: BookOpen,
  title: 'Karya',
  headline: 'Offline-first multilingual AI learning platform.',
  cardDescription:
    'An offline AI education platform combining quantized on-device LLM inference, multilingual RAG across 22 Indian languages + English, document OCR, and interactive whiteboard tools.',
  techStack: ['React', 'Node.js', 'MongoDB', 'ChromaDB', 'llama.cpp', 'NLLB-200', 'Tesseract.js'],
  highlights: [
    {
      label: 'Local LLM Tutoring',
      text: 'Quantized DeepSeek-R1-Distill-Qwen-1.5B designed and tested for 4–8GB RAM environments'
    },
    {
      label: 'Multilingual RAG & NMT',
      text: 'Local semantic retrieval with ChromaDB and separate NLLB-200 translation across 22 Indian languages + English'
    },
    {
      label: 'Automated Study Materials',
      text: 'Summaries, notes, flashcards, MCQs & algorithmic whiteboard diagrams'
    }
  ],
  metrics: 'Vector ~68ms · Chat ~1.1s (Benchmark)',
  recruiterHighlight:
    'Implemented an offline-first AI architecture using a quantized 1.5B LLM designed for 4–8GB RAM environments.',
  github: null,
  demo: null,
  tags: ['AI', 'RAG', 'Multilingual', 'Offline-First', 'llama.cpp', 'ChromaDB', 'EdTech'],
  details: {
    description:
      'Karya is an offline-first AI education platform designed for low-resource and multilingual environments. It integrates on-device LLM inference (using DeepSeek-R1-Distill-Qwen-1.5B via llama.cpp) with separate neural machine translation (NLLB-200), enabling tutoring and content generation in 22 Indian languages + English. Users can upload documents or images (via OCR) and audio (via speech-to-text), and Karya semantically indexes this content for search and retrieval.\n\nThe platform builds a knowledge tree from documents and generates AI-crafted study materials: summaries, notes, flashcards, and multiple-choice questions. There is also an AI-assisted whiteboard (Excalidraw) that can create flowcharts and diagrams algorithmically.\n\nAll processing is optimized for limited hardware: Karya uses a quantized 1.5B LLM designed and tested for 4–8GB RAM environments, and stores embeddings in a local ChromaDB. The web UI (React + Tailwind) supports rich interactions, and a mobile app (React Native) allows on-device learning with SQLite fallback when offline.',
    allTech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Native', 'Expo', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'ChromaDB', 'llama.cpp', 'NLLB-200', 'Tesseract.js', 'Whisper', 'Excalidraw', 'PyTorch', 'onnxruntime', 'SQLite'],
    fullHighlights: [
      'Quantized DeepSeek-R1-Distill-Qwen-1.5B running on-device for 4–8GB RAM environments',
      'Local semantic retrieval with ChromaDB and separate NLLB-200 translation across 22 Indian languages + English',
      'Automated generation of educational notes, summaries, flashcards, and quizzes',
      'On-device document OCR (Tesseract.js) and speech transcription (Whisper)',
      'Interactive AI whiteboard with algorithmic flowchart creation via Excalidraw',
      'Complete offline-first architecture with SQLite caching for network resilience',
    ],
    metricsDetail: 'Project Benchmarks: Vector retrieval ~68ms · Chat latency ~1.1s · Flowchart gen ~24s · 10-page PDF indexing ~4.2s · OCR CER ~1.1%',
  },
};

export default function KaryaPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const project = KARYA_DATA;
  const IconComponent = project.icon;

  return (
    <Layout
      title="Karya | Projects"
      description="Karya: Offline-first multilingual AI learning platform by Vardhman Gupta."
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
            <span className={styles.breadcrumbCurrent}>Karya</span>
          </nav>

          <header className={styles.heroHeader}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrowBadge}>Featured AI Project</span>
              <span className={styles.licenseBadge}>
                <ShieldCheck size={13} />
                <span>Offline-First Architecture</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>Karya</h1>
            <p className={styles.heroSubtitle}>
              Offline-first multilingual AI learning platform combining on-device quantized LLM inference, ChromaDB vector retrieval, and neural translation across 22 Indian languages.
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


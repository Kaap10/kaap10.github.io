import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { ArrowUpRight, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import styles from './projects.module.css';

const IconGithub = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const PROJECTS = [
  {
    id: 'guru-g',
    index: '01',
    category: 'Edge AI & Local LLMs',
    tag: 'AI / ML',
    title: 'Guru-G',
    tagline: 'Offline AI Tutor powered by Local Small Language Models',
    summary:
      'An edge-computing AI tutor built for internet-deprived and rural education zones. Runs quantized small LLMs locally on consumer hardware without sending data over the cloud, enabling instant textbook summarization, interactive flashcards, practice quizzes, and multilingual tutoring.',
    highlights: [
      'Quantized GGUF inference via Llama.cpp for zero-cloud latency and complete offline capability',
      'Context-aware curriculum ingestion supporting local PDF and textbook chunking',
      'Cross-platform responsive frontend built with React Native and FastAPI backend',
    ],
    tech: ['Llama.cpp', 'Python', 'FastAPI', 'React Native', 'LangChain', 'GGUF'],
    github: 'https://github.com/kaap10',
  },
  {
    id: 'auranow',
    index: '02',
    category: 'Retrieval & Vector Projections',
    tag: 'AI / ML',
    title: 'AuraNow',
    tagline: 'CPU-Optimized Hierarchical RAG Pipeline for High-Volume Text',
    summary:
      'A high-throughput Retrieval-Augmented Generation system designed for rapid CPU clustering and semantic search over 100K+ community comments. Utilizes dimensionality reduction and density-based clustering to generate hierarchical summaries without expensive GPU clusters.',
    highlights: [
      'Pre-computed vector projections using Sentence Transformers paired with UMAP & HDBSCAN',
      'Hierarchical context trees reducing LLM token consumption by over 60%',
      'Sub-150ms semantic query routing with asynchronous FastAPI workers',
    ],
    tech: ['Sentence Transformers', 'UMAP', 'HDBSCAN', 'FastAPI', 'Python', 'Vector Search'],
    github: 'https://github.com/kaap10',
  },
  {
    id: 'code-with-buddy',
    index: '03',
    category: 'Realtime Collaboration',
    tag: 'Full-Stack',
    title: 'Code With Buddy',
    tagline: 'Synchronized Multi-User Pair Programming IDE with Live Execution',
    summary:
      'A browser-based collaborative coding environment allowing distributed engineering teams to pair-program in real-time. Features multi-cursor awareness, syntax highlighting across 20+ languages, synchronized code execution output, and room-based access control.',
    highlights: [
      'Bi-directional state synchronization using WebSockets and Socket.IO event brokers',
      'High-performance CodeMirror editor integration with synchronized cursor telemetry',
      'Isolated sandbox container execution for multi-language test runs',
    ],
    tech: ['React.js', 'CodeMirror', 'Node.js', 'Socket.IO', 'Express', 'Docker'],
    github: 'https://github.com/kaap10',
  },
  {
    id: 'aegis-ai',
    index: '04',
    category: 'Security AI & Anomaly Detection',
    tag: 'Security',
    title: 'AegisAI',
    tagline: 'Behavior-Based Anomaly Detection for Identity Attacks & Lateral Movement',
    summary:
      'An enterprise security telemetry engine that models user access baselines to detect credential stuffing, brute-force anomalies, and lateral movement in real-time. Streams audit logs through machine learning models to trigger instant SIEM alerts.',
    highlights: [
      'Autoencoder and isolation forest models trained on high-dimensional access logs',
      'High-ingestion pipeline processing real-time telemetry through Elasticsearch and FastAPI',
      'Configurable alert scoring matrices with automated IP reputation and risk grading',
    ],
    tech: ['TensorFlow', 'FastAPI', 'Elasticsearch', 'Python', 'Scikit-Learn', 'SIEM'],
    github: 'https://github.com/kaap10',
  },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.tag === activeFilter || p.category.includes(activeFilter));

  return (
    <Layout
      title="Featured Projects"
      description="Production systems, AI architectures, and full-stack software built by Vardhman Gupta."
    >
      <main className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          
          {/* Header */}
          <header className={styles.pageHeader}>
            <span className={styles.headerEyebrow}>Engineering Portfolio</span>
            <h1 className={styles.pageTitle}>Featured Projects</h1>
            <p className={styles.pageSubtitle}>
              Production-grade systems, AI/ML architectures, and full-stack tools designed for high scale, reliability, and real-world utility.
            </p>
          </header>

          {/* Filter Pills */}
          <div className={styles.filterRow}>
            {['All', 'AI / ML', 'Full-Stack', 'Security'].map((tag) => (
              <button
                key={tag}
                type="button"
                className={`${styles.filterBtn} ${activeFilter === tag ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Project List */}
          <div className={styles.projectsList}>
            {filteredProjects.map((project) => (
              <article key={project.id} className={styles.projectCard}>
                {/* Card Top */}
                <div className={styles.cardHeader}>
                  <div className={styles.indexCategoryWrap}>
                    <span className={styles.projectIndex}>{project.index}</span>
                    <span className={styles.categoryBadge}>{project.category}</span>
                  </div>
                  <div className={styles.cardActions}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionBtn}
                    >
                      <IconGithub size={14} />
                      <span>Source Code</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>

                {/* Title & Summary */}
                <div>
                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  <p style={{ fontSize: '0.92rem', color: 'var(--vg-text, #F5F5F7)', fontWeight: 500, margin: '0.35rem 0 0.75rem' }}>
                    {project.tagline}
                  </p>
                  <p className={styles.projectSummary}>{project.summary}</p>
                </div>

                {/* Key Technical Highlights */}
                <ul className={styles.highlightsList}>
                  {project.highlights.map((h, i) => (
                    <li key={i} className={styles.highlightItem}>
                      <span className={styles.highlightDot}>•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Chips */}
                <div className={styles.techTagsRow}>
                  {project.tech.map((t, idx) => (
                    <span key={idx} className={styles.techTag}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

        </div>
      </main>
    </Layout>
  );
}
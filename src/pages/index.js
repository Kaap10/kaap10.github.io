import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Code2, 
  Layout as LayoutIcon, 
  Server, 
  BrainCircuit, 
  Terminal, 
  FileText,
  Sparkles,
  PenTool,
  Activity,
  Command,
  Edit3
} from 'lucide-react';
import styles from './index.module.css';

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

// Custom hook for progressive scroll reveals
function useScrollReveal() {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return [ref, isRevealed];
}

export default function Home() {
  const [heroRef, heroRevealed] = useScrollReveal();
  const [projectsRef, projectsRevealed] = useScrollReveal();
  const [openSourceRef, openSourceRevealed] = useScrollReveal();
  const [ecoRef, ecoRevealed] = useScrollReveal();
  const [blogsRef, blogsRevealed] = useScrollReveal();
  const [toolkitRef, toolkitRevealed] = useScrollReveal();

  return (
    <Layout
      title="Vardhman Gupta"
      description="Personal portfolio, engineering wiki, and productivity suite of Vardhman Gupta — AI/ML Engineer & Full-Stack Developer."
    >
      <main className={styles.pageContainer}>
        {/* Subtle Ambient Glow & Minimal Grid Backdrop */}
        <div className={styles.bgCanvasWrapper} aria-hidden="true">
          <div className={styles.glowOrb1} />
          <div className={styles.glowOrb2} />
          <div className={styles.gridOverlay} />
        </div>

        <div className={styles.contentWrapper}>
          
          {/* ============================================================
              1. Hero Section (Clean, Minimal, Direct)
              ============================================================ */}
          <section 
            ref={heroRef} 
            className={`${styles.heroSection} ${styles.revealSection} ${heroRevealed ? styles.isRevealed : ''}`}
          >
            <h1 className={styles.heroTitle}>
              Vardhman Gupta
            </h1>

            <p className={styles.heroHeadline}>
              AI Engineer
            </p>

            {/* Quick CTAs */}
            <div className={styles.heroActions}>
              <a href="#projects" className={styles.primaryHeroLink}>
                <span>Explore Project</span>
                <ArrowRight size={16} />
              </a>

              <Link to="/tools" className={styles.heroLink}>
                <Sparkles size={15} />
                <span>Explore Tools</span>
                <ArrowRight size={14} />
              </Link>

              <a 
                href="/Vardhman_Gupta%20(Resume).pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.heroLink}
              >
                <FileText size={15} />
                <span>Resume</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </section>

          {/* ============================================================
              2. Selected Work / Projects (Minimalist Cards)
              ============================================================ */}
          <section 
            ref={projectsRef} 
            id="projects"
            className={`${styles.section} ${styles.revealSection} ${projectsRevealed ? styles.isRevealed : ''}`}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <span className={styles.sectionEyebrow}>Selected Engineering</span>
                <h2 className={styles.sectionTitle}>Projects</h2>
              </div>
              <Link to="/projects" className={styles.viewAllLink}>
                <span>View All Details</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className={styles.projectCardsGrid}>
              {/* Project 01: build-with-ai */}
              {/* Project 01: Karya */}
              <article className={`${styles.projectCard} ${styles.staggerItem}`}>
                <div className={styles.projectCardTop}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={styles.projectIndexBadge}>01</span>
                    <span className={styles.projectCategoryTag}>Open Source</span>
                  </div>
                  <span className={styles.projectMetricTag}>MIT License</span>
                </div>

                <div className={styles.projectCardBody}>
                  <h3 className={styles.projectCardTitle}>build-with-ai</h3>
                  <p className={styles.projectCardDesc}>
                    Open-source CLI that turns AI-assisted development into a structured engineering workflow with context-aware prompts and zero API keys.
                  </p>
                </div>

                <div className={styles.projectTechRow}>
                  <span className={styles.techTag}>Node.js</span>
                  <span className={styles.techTag}>CLI</span>
                  <span className={styles.techTag}>npm</span>
                  <span className={styles.techTag}>JSON</span>
                  <span className={styles.techTag}>AI Prompts</span>
                </div>
              </article>

              {/* Project 02: Karya */}
              <article className={`${styles.projectCard} ${styles.staggerItem}`}>
                <div className={styles.projectCardTop}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={styles.projectIndexBadge}>02</span>
                    <span className={styles.projectCategoryTag}>AI</span>
                  </div>
                </div>

                <div className={styles.projectCardBody}>
                  <h3 className={styles.projectCardTitle}>Karya</h3>
                  <p className={styles.projectCardDesc}>
                    Offline-first educational platform combining local 1.5B LLM inference, multilingual RAG (22+ languages), OCR document indexing, and AI whiteboard.
                  </p>
                </div>

                <div className={styles.projectTechRow}>
                  <span className={styles.techTag}>React</span>
                  <span className={styles.techTag}>llama.cpp</span>
                  <span className={styles.techTag}>ChromaDB</span>
                  <span className={styles.techTag}>Node.js</span>
                  <span className={styles.techTag}>MongoDB</span>
                </div>
              </article>

              {/* Project 03: AuraNow */}
              {/* Project 02: AuraNow */}
              <article className={`${styles.projectCard} ${styles.staggerItem}`}>
                <div className={styles.projectCardTop}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={styles.projectIndexBadge}>03</span>
                    <span className={styles.projectIndexBadge}>02</span>
                    <span className={styles.projectCategoryTag}>AI</span>
                  </div>
                </div>

                <div className={styles.projectCardBody}>
                  <h3 className={styles.projectCardTitle}>AuraNow</h3>
                  <p className={styles.projectCardDesc}>
                    AI-powered video comment intelligence platform transforming unstructured YouTube comments into RAPTOR topic trees, sentiment analytics, and conversational intelligence.
                  </p>
                </div>

                <div className={styles.projectTechRow}>
                  <span className={styles.techTag}>FastAPI</span>
                  <span className={styles.techTag}>React 18</span>
                  <span className={styles.techTag}>Python</span>
                  <span className={styles.techTag}>RAPTOR</span>
                  <span className={styles.techTag}>MongoDB</span>
                </div>
              </article>

              {/* Project 04: Code with Buddy */}
              {/* Project 03: Code with Buddy */}
              <article className={`${styles.projectCard} ${styles.staggerItem}`}>
                <div className={styles.projectCardTop}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={styles.projectIndexBadge}>04</span>
                    <span className={styles.projectIndexBadge}>03</span>
                    <span className={styles.projectCategoryTag}>Fullstack</span>
                  </div>
                </div>

                <div className={styles.projectCardBody}>
                  <h3 className={styles.projectCardTitle}>Code with Buddy</h3>
                  <p className={styles.projectCardDesc}>
                    Realtime collaborative code editor supporting multi-cursor live synchronization via WebSockets, in-room chat, and remote code execution across 20+ languages.
                  </p>
                </div>

                <div className={styles.projectTechRow}>
                  <span className={styles.techTag}>React</span>
                  <span className={styles.techTag}>CodeMirror</span>
                  <span className={styles.techTag}>Node.js</span>
                  <span className={styles.techTag}>Socket.IO</span>
                  <span className={styles.techTag}>Express</span>
                </div>
              </article>

              {/* Project 05: IncidentFlow */}
              {/* Project 04: IncidentFlow */}
              <article className={`${styles.projectCard} ${styles.staggerItem}`}>
                <div className={styles.projectCardTop}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={styles.projectIndexBadge}>05</span>
                    <span className={styles.projectIndexBadge}>04</span>
                    <span className={styles.projectCategoryTag}>Fullstack</span>
                  </div>
                  <span className={styles.projectMetricTag}>29/29 Tests</span>
                </div>

                <div className={styles.projectCardBody}>
                  <h3 className={styles.projectCardTitle}>IncidentFlow</h3>
                  <p className={styles.projectCardDesc}>
                    Mission-critical incident response platform with automated SLA deadline monitoring, Celery async alerts, RBAC, and immutable audit logs.
                  </p>
                </div>

                <div className={styles.projectTechRow}>
                  <span className={styles.techTag}>FastAPI</span>
                  <span className={styles.techTag}>React</span>
                  <span className={styles.techTag}>PostgreSQL</span>
                  <span className={styles.techTag}>Celery</span>
                  <span className={styles.techTag}>Redis</span>
                </div>
              </article>

              {/* Project 06: Terminal Agent */}
              {/* Project 05: Terminal Agent */}
              <article className={`${styles.projectCard} ${styles.staggerItem}`}>
                <div className={styles.projectCardTop}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={styles.projectIndexBadge}>06</span>
                    <span className={styles.projectIndexBadge}>05</span>
                    <span className={styles.projectCategoryTag}>Agents</span>
                  </div>
                </div>

                <div className={styles.projectCardBody}>
                  <h3 className={styles.projectCardTitle}>Terminal Agent</h3>
                  <p className={styles.projectCardDesc}>
                    Verify-first autonomous coding agent executing end-to-end tasks with sandboxed CLI tool execution, secret redaction, and rollback.
                  </p>
                </div>

                <div className={styles.projectTechRow}>
                  <span className={styles.techTag}>Python</span>
                  <span className={styles.techTag}>Docker</span>
                  <span className={styles.techTag}>SQLite</span>
                  <span className={styles.techTag}>CLI</span>
                  <span className={styles.techTag}>LLMs</span>
                </div>
              </article>

              {/* Project 07: Agent Bench */}
              {/* Project 06: Agent Bench */}
              <article className={`${styles.projectCard} ${styles.staggerItem}`}>
                <div className={styles.projectCardTop}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={styles.projectIndexBadge}>07</span>
                    <span className={styles.projectIndexBadge}>06</span>
                    <span className={styles.projectCategoryTag}>Agents</span>
                  </div>
                </div>

                <div className={styles.projectCardBody}>
                  <h3 className={styles.projectCardTitle}>Agent Bench</h3>
                  <p className={styles.projectCardDesc}>
                    Autonomous AI agent evaluation framework providing 40+ real-world tasks, deterministic rule-based judging, and JSON execution traces.
                  </p>
                </div>

                <div className={styles.projectTechRow}>
                  <span className={styles.techTag}>Python</span>
                  <span className={styles.techTag}>CLI</span>
                  <span className={styles.techTag}>Docker</span>
                  <span className={styles.techTag}>DevTools</span>
                  <span className={styles.techTag}>Testing</span>
                </div>
              </article>

              {/* Project 08: Model Router */}
              {/* Project 07: Model Router */}
              <article className={`${styles.projectCard} ${styles.staggerItem}`}>
                <div className={styles.projectCardTop}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={styles.projectIndexBadge}>08</span>
                    <span className={styles.projectIndexBadge}>07</span>
                    <span className={styles.projectCategoryTag}>Agents</span>
                  </div>
                  <span className={styles.projectMetricTag}>40–70% Cost Reduction</span>
                </div>

                <div className={styles.projectCardBody}>
                  <h3 className={styles.projectCardTitle}>Model Router</h3>
                  <p className={styles.projectCardDesc}>
                    Adaptive LLM selection proxy and gateway that analyzes prompt complexity to route queries between local models and premium APIs.
                  </p>
                </div>

                <div className={styles.projectTechRow}>
                  <span className={styles.techTag}>Python</span>
                  <span className={styles.techTag}>FastAPI</span>
                  <span className={styles.techTag}>OpenAI</span>
                  <span className={styles.techTag}>Anthropic</span>
                  <span className={styles.techTag}>Docker</span>
                </div>
              </article>
            </div>
          </section>

          {/* ============================================================
              3. Open Source Section (build-with-ai)
              ============================================================ */}
          <section 
            ref={openSourceRef} 
            id="open-source"
            className={`${styles.section} ${styles.revealSection} ${openSourceRevealed ? styles.isRevealed : ''}`}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <span className={styles.sectionEyebrow}>Public Tooling & Packages</span>
                <h2 className={styles.sectionTitle}>Open Source</h2>
              </div>
              <span className={styles.sectionSubtitle}>MIT Licensed · npm Registry</span>
            </div>

            <div className={styles.openSourceCard}>
              <div className={styles.openSourceCardTop}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span className={styles.projectCategoryTag}>Open Source</span>
                  <span className={styles.projectMetricTag}>MIT License</span>
                  <span className={styles.projectMetricTag}>npm package</span>
                </div>
                <div className={styles.openSourceCardActions}>
                  <a 
                    href="https://github.com/Kaap10/build-with-ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.openSourceBtn}
                    aria-label="GitHub Repository"
                  >
                    <IconGithub size={14} />
                    <span>GitHub</span>
                    <ArrowUpRight size={12} />
                  </a>
                  <a 
                    href="https://www.npmjs.com/package/build-with-ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.openSourceBtn}
                    aria-label="npm package"
                  >
                    <IconNpm size={14} />
                    <span>npm</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>

              <div className={styles.openSourceCardBody}>
                <h3 className={styles.openSourceCardTitle}>build-with-ai</h3>
                <p className={styles.openSourceCardTagline}>
                  Zero-API, local-first CLI for structured AI-assisted software development.
                </p>
                <p className={styles.openSourceCardDesc}>
                  Open-source CLI that guides developers through complete software projects using 10–23 phase structured engineering workflows. It generates context-aware prompts for each phase while maintaining architectural decisions locally in <code>.buildwithai/</code> to prevent context drift across AI sessions — with zero API keys, accounts, or telemetry.
                </p>
              </div>

              <div className={styles.projectTechRow}>
                <span className={styles.techTag}>Node.js</span>
                <span className={styles.techTag}>JavaScript</span>
                <span className={styles.techTag}>CLI</span>
                <span className={styles.techTag}>npm</span>
                <span className={styles.techTag}>JSON</span>
                <span className={styles.techTag}>AI Prompt Engineering</span>
              </div>
            </div>
          </section>

          {/* ============================================================
              3. Tool Kit Section (Developer Productivity Tools)
              ============================================================ */}
          <section 
            ref={ecoRef} 
            id="tools"
            className={`${styles.section} ${styles.revealSection} ${ecoRevealed ? styles.isRevealed : ''}`}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <span className={styles.sectionEyebrow}>Living Workstation</span>
                <h2 className={styles.sectionTitle}>Tool Kit</h2>
              </div>
              <span className={styles.sectionSubtitle}>Built for Daily Engineering</span>
            </div>

            <div className={styles.ecoCardsGrid}>
              {/* Tool 1: Whiteboard */}
              <Link to="/board" className={`${styles.ecoCard} ${styles.staggerItem}`}>
                <div className={styles.ecoIconWrap}>
                  <PenTool size={20} />
                </div>
                <div className={styles.ecoCardBody}>
                  <h3 className={styles.ecoCardTitle}>Whiteboard</h3>
                  <p className={styles.ecoCardDesc}>
                    Full-featured architectural sketching canvas powered by Excalidraw for designing distributed systems and algorithms.
                  </p>
                </div>
                <div className={styles.ecoArrow}>
                  <ArrowRight size={16} />
                </div>
              </Link>

              {/* Tool 2: Tracker */}
              <Link to="/tracker" className={`${styles.ecoCard} ${styles.staggerItem}`}>
                <div className={styles.ecoIconWrap}>
                  <Activity size={20} />
                </div>
                <div className={styles.ecoCardBody}>
                  <h3 className={styles.ecoCardTitle}>Tracker</h3>
                  <p className={styles.ecoCardDesc}>
                    Custom productivity suite featuring Pomodoro Deep Work with floating PiP capsule, atomic habits, and activity heatmap.
                  </p>
                </div>
                <div className={styles.ecoArrow}>
                  <ArrowRight size={16} />
                </div>
              </Link>

              {/* Tool 3: Notebook */}
              <Link to="/tracker?tab=notebook" className={`${styles.ecoCard} ${styles.staggerItem}`}>
                <div className={styles.ecoIconWrap}>
                  <FileText size={20} />
                </div>
                <div className={styles.ecoCardBody}>
                  <h3 className={styles.ecoCardTitle}>Notebook</h3>
                  <p className={styles.ecoCardDesc}>
                    Distraction-free personal notepad with multi-notebook organization, zero typing lag, tag filtering, and auto-saving.
                  </p>
                </div>
                <div className={styles.ecoArrow}>
                  <ArrowRight size={16} />
                </div>
              </Link>

              {/* Tool 4: Quick Scratchpad */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('scratchpad:toggle'));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('scratchpad:toggle'));
                    }
                  }
                }}
                className={`${styles.ecoCard} ${styles.staggerItem}`}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.ecoIconWrap}>
                  <Edit3 size={20} />
                </div>
                <div className={styles.ecoCardBody}>
                  <h3 className={styles.ecoCardTitle}>Scratchpad</h3>
                  <p className={styles.ecoCardDesc}>
                    Global floating quick-capture scratchpad with multi-sheet tabs and instant export. Accessible everywhere with Ctrl+J.
                  </p>
                </div>
                <div className={styles.ecoArrow}>
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Tool 5: Command Palette */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
                    }
                  }
                }}
                className={`${styles.ecoCard} ${styles.staggerItem}`}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.ecoIconWrap}>
                  <Command size={20} />
                </div>
                <div className={styles.ecoCardBody}>
                  <h3 className={styles.ecoCardTitle}>Command Palette</h3>
                  <p className={styles.ecoCardDesc}>
                    Spotlight command center for lightning-fast site navigation, deep search, focus timers, and quick developer tools (Ctrl+K).
                  </p>
                </div>
                <div className={styles.ecoArrow}>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================
              4. Technical Blogs Section
              ============================================================ */}
          <section 
            ref={blogsRef} 
            id="blogs"
            className={`${styles.section} ${styles.revealSection} ${blogsRevealed ? styles.isRevealed : ''}`}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <span className={styles.sectionEyebrow}>Knowledge Base</span>
                <h2 className={styles.sectionTitle}>Technical Blogs</h2>
              </div>
              <Link to="/blogs/intro" className={styles.viewAllLink}>
                <span>View All 100+ Blogs</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className={styles.blogsCardsGrid}>
              <Link to="/blogs/intro" className={`${styles.blogCard} ${styles.staggerItem}`}>
                <div className={styles.blogCardHeader}>
                  <div className={styles.blogIconWrap}>
                    <BrainCircuit size={18} />
                  </div>
                  <span className={styles.blogCategoryBadge}>AI &amp; Machine Learning</span>
                </div>
                <h3 className={styles.blogCardTitle}>Machine Learning &amp; LLM Architecture</h3>
                <p className={styles.blogCardDesc}>
                  Deep dives into Transformer mechanics, quantization, local inference with Llama.cpp, and vector embeddings.
                </p>
                <div className={styles.blogCardFooter}>
                  <span>Explore Articles</span>
                  <ArrowRight size={14} />
                </div>
              </Link>

              <Link to="/blogs/intro" className={`${styles.blogCard} ${styles.staggerItem}`}>
                <div className={styles.blogCardHeader}>
                  <div className={styles.blogIconWrap}>
                    <Server size={18} />
                  </div>
                  <span className={styles.blogCategoryBadge}>Systems &amp; Backend</span>
                </div>
                <h3 className={styles.blogCardTitle}>System Design &amp; Distributed Systems</h3>
                <p className={styles.blogCardDesc}>
                  Scalability blueprints, cache invalidation strategies, database replication, and resilient microservice architectures.
                </p>
                <div className={styles.blogCardFooter}>
                  <span>Explore Articles</span>
                  <ArrowRight size={14} />
                </div>
              </Link>

              <Link to="/blogs/intro" className={`${styles.blogCard} ${styles.staggerItem}`}>
                <div className={styles.blogCardHeader}>
                  <div className={styles.blogIconWrap}>
                    <Code2 size={18} />
                  </div>
                  <span className={styles.blogCategoryBadge}>Algorithms &amp; DSA</span>
                </div>
                <h3 className={styles.blogCardTitle}>Data Structures &amp; Algorithms</h3>
                <p className={styles.blogCardDesc}>
                  Core algorithmic paradigms, dynamic programming optimizations, graph traversals, and time-complexity proofs.
                </p>
                <div className={styles.blogCardFooter}>
                  <span>Explore Articles</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            </div>
          </section>

          {/* ============================================================
              5. Core Engineering Techstack (Minimal Structured Grid)
              ============================================================ */}
          <section 
            ref={toolkitRef} 
            id="techstack"
            className={`${styles.section} ${styles.revealSection} ${toolkitRevealed ? styles.isRevealed : ''}`}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <span className={styles.sectionEyebrow}>Core Capabilities</span>
                <h2 className={styles.sectionTitle}>Techstack</h2>
              </div>
              <span className={styles.sectionSubtitle}>5 Domains</span>
            </div>

            <div className={styles.toolkitCardsGrid}>
              {/* Languages */}
              <div className={`${styles.toolkitDomainCard} ${styles.staggerItem}`}>
                <div className={styles.toolkitDomainHeader}>
                  <div className={styles.toolkitDomainIcon}>
                    <Code2 size={17} />
                  </div>
                  <span className={styles.toolkitDomainTitle}>Languages</span>
                </div>
                <div className={styles.toolkitPillsWrap}>
                  <span className={styles.skillPill}>Python</span>
                  <span className={styles.skillPill}>C++</span>
                  <span className={styles.skillPill}>JavaScript</span>
                  <span className={styles.skillPill}>SQL</span>
                </div>
              </div>

              {/* Frontend */}
              <div className={`${styles.toolkitDomainCard} ${styles.staggerItem}`}>
                <div className={styles.toolkitDomainHeader}>
                  <div className={styles.toolkitDomainIcon}>
                    <LayoutIcon size={17} />
                  </div>
                  <span className={styles.toolkitDomainTitle}>Frontend</span>
                </div>
                <div className={styles.toolkitPillsWrap}>
                  <span className={styles.skillPill}>React.js</span>
                  <span className={styles.skillPill}>Next.js</span>
                  <span className={styles.skillPill}>HTML5 / CSS3</span>
                  <span className={styles.skillPill}>Docusaurus</span>
                </div>
              </div>

              {/* Backend */}
              <div className={`${styles.toolkitDomainCard} ${styles.staggerItem}`}>
                <div className={styles.toolkitDomainHeader}>
                  <div className={styles.toolkitDomainIcon}>
                    <Server size={17} />
                  </div>
                  <span className={styles.toolkitDomainTitle}>Backend &amp; DB</span>
                </div>
                <div className={styles.toolkitPillsWrap}>
                  <span className={styles.skillPill}>FastAPI</span>
                  <span className={styles.skillPill}>Node.js</span>
                  <span className={styles.skillPill}>PostgreSQL</span>
                  <span className={styles.skillPill}>Supabase</span>
                </div>
              </div>

              {/* AI / ML */}
              <div className={`${styles.toolkitDomainCard} ${styles.staggerItem}`}>
                <div className={styles.toolkitDomainHeader}>
                  <div className={styles.toolkitDomainIcon}>
                    <BrainCircuit size={17} />
                  </div>
                  <span className={styles.toolkitDomainTitle}>AI / ML</span>
                </div>
                <div className={styles.toolkitPillsWrap}>
                  <span className={styles.skillPill}>PyTorch</span>
                  <span className={styles.skillPill}>LLMs / RAG</span>
                  <span className={styles.skillPill}>Transformers</span>
                  <span className={styles.skillPill}>Scikit-Learn</span>
                </div>
              </div>

              {/* Infrastructure */}
              <div className={`${styles.toolkitDomainCard} ${styles.staggerItem}`}>
                <div className={styles.toolkitDomainHeader}>
                  <div className={styles.toolkitDomainIcon}>
                    <Terminal size={17} />
                  </div>
                  <span className={styles.toolkitDomainTitle}>DevOps &amp; Infra</span>
                </div>
                <div className={styles.toolkitPillsWrap}>
                  <span className={styles.skillPill}>Docker</span>
                  <span className={styles.skillPill}>Git / GitHub</span>
                  <span className={styles.skillPill}>Linux / Bash</span>
                  <span className={styles.skillPill}>CI / CD</span>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================
              6. Minimal Clean Footer
              ============================================================ */}
          <footer className={styles.editorialFooter}>
            <div className={styles.footerTop}>
              <div>
                <span className={styles.footerBrand}>Vardhman Gupta</span>
                <span className={styles.footerTagline}>— Engineer · Builder · Learner</span>
              </div>
              <div className={styles.footerLinks}>
                <Link to="/blogs/intro" className={styles.footerLink}>Blogs</Link>
                <Link to="/projects" className={styles.footerLink}>Projects</Link>
                <Link to="/tools" className={styles.footerLink}>Tools</Link>
                <a href="/Vardhman_Gupta%20(Resume).pdf" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Resume</a>
                <a href="https://github.com/kaap10" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>GitHub</a>
                <a href="https://linkedin.com/in/vardhman-gupta" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>LinkedIn</a>
              </div>
            </div>
            <div className={styles.footerBottom}>
              © {new Date().getFullYear()} Vardhman Gupta. Built with technical precision and minimal design.
            </div>
          </footer>

        </div>
      </main>
    </Layout>
  );
}
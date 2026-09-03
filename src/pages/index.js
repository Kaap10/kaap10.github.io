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
  BookOpen
} from 'lucide-react';
import styles from './index.module.css';

const IconGithub = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const IconLinkedin = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
  const [toolkitRef, toolkitRevealed] = useScrollReveal();
  const [ecoRef, ecoRevealed] = useScrollReveal();
  const [collabRef, collabRevealed] = useScrollReveal();

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
                <h2 className={styles.sectionTitle}>Featured Projects</h2>
              </div>
              <Link to="/projects" className={styles.viewAllLink}>
                <span>View All Details</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className={styles.projectCardsGrid}>
              {/* Project 01: Guru-G */}
              <article className={`${styles.projectCard} ${styles.staggerItem}`}>
                <div className={styles.projectCardTop}>
                  <span className={styles.projectIndexBadge}>01</span>
                  <span className={styles.projectCategoryTag}>Edge AI &amp; Local LLMs</span>
                </div>

                <div className={styles.projectCardBody}>
                  <h3 className={styles.projectCardTitle}>Guru-G</h3>
                  <p className={styles.projectCardDesc}>
                    Offline AI Tutor running local small LLMs for internet-deprived regions with textbook summaries, interactive quizzes, and multilingual intelligence.
                  </p>
                </div>

                <div className={styles.projectTechRow}>
                  <span className={styles.techTag}>Llama.cpp</span>
                  <span className={styles.techTag}>Python</span>
                  <span className={styles.techTag}>FastAPI</span>
                  <span className={styles.techTag}>React Native</span>
                </div>
              </article>

              {/* Project 02: AuraNow */}
              <article className={`${styles.projectCard} ${styles.staggerItem}`}>
                <div className={styles.projectCardTop}>
                  <span className={styles.projectIndexBadge}>02</span>
                  <span className={styles.projectCategoryTag}>Retrieval &amp; Vector Embeddings</span>
                </div>

                <div className={styles.projectCardBody}>
                  <h3 className={styles.projectCardTitle}>AuraNow</h3>
                  <p className={styles.projectCardDesc}>
                    CPU-optimized RAG pipeline performing semantic clustering and hierarchical context generation over 100K+ comments with projection embeddings.
                  </p>
                </div>

                <div className={styles.projectTechRow}>
                  <span className={styles.techTag}>Sentence Transformers</span>
                  <span className={styles.techTag}>UMAP</span>
                  <span className={styles.techTag}>HDBSCAN</span>
                  <span className={styles.techTag}>FastAPI</span>
                </div>
              </article>

              {/* Project 03: Code With Buddy */}
              <article className={`${styles.projectCard} ${styles.staggerItem}`}>
                <div className={styles.projectCardTop}>
                  <span className={styles.projectIndexBadge}>03</span>
                  <span className={styles.projectCategoryTag}>Realtime Collaboration</span>
                </div>

                <div className={styles.projectCardBody}>
                  <h3 className={styles.projectCardTitle}>Code With Buddy</h3>
                  <p className={styles.projectCardDesc}>
                    Realtime collaborative code editor supporting multi-cursor live synchronization, syntax formatting, and frictionless browser-based pair programming.
                  </p>
                </div>

                <div className={styles.projectTechRow}>
                  <span className={styles.techTag}>React.js</span>
                  <span className={styles.techTag}>CodeMirror</span>
                  <span className={styles.techTag}>Node.js</span>
                  <span className={styles.techTag}>Socket.IO</span>
                </div>
              </article>

              {/* Project 04: AegisAI */}
              <article className={`${styles.projectCard} ${styles.staggerItem}`}>
                <div className={styles.projectCardTop}>
                  <span className={styles.projectIndexBadge}>04</span>
                  <span className={styles.projectCategoryTag}>Security AI &amp; Anomaly Detection</span>
                </div>

                <div className={styles.projectCardBody}>
                  <h3 className={styles.projectCardTitle}>AegisAI</h3>
                  <p className={styles.projectCardDesc}>
                    Behavior-based anomaly detection engine identifying identity attack patterns, brute-force spikes, and lateral movement with SIEM-ready alerting.
                  </p>
                </div>

                <div className={styles.projectTechRow}>
                  <span className={styles.techTag}>TensorFlow</span>
                  <span className={styles.techTag}>FastAPI</span>
                  <span className={styles.techTag}>Elasticsearch</span>
                  <span className={styles.techTag}>Python</span>
                </div>
              </article>
            </div>
          </section>

          {/* ============================================================
              3. Core Engineering Toolkit (Minimal Structured Grid)
              ============================================================ */}
          <section 
            ref={toolkitRef} 
            id="toolkit"
            className={`${styles.section} ${styles.revealSection} ${toolkitRevealed ? styles.isRevealed : ''}`}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <span className={styles.sectionEyebrow}>Core Capabilities</span>
                <h2 className={styles.sectionTitle}>Technical Toolkit</h2>
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
              4. Interactive Digital Garden Ecosystem
              ============================================================ */}
          <section 
            ref={ecoRef} 
            className={`${styles.section} ${styles.revealSection} ${ecoRevealed ? styles.isRevealed : ''}`}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <span className={styles.sectionEyebrow}>Living Workstation</span>
                <h2 className={styles.sectionTitle}>Digital Garden &amp; Tools</h2>
              </div>
              <span className={styles.sectionSubtitle}>Built for Daily Engineering</span>
            </div>

            <div className={styles.ecoCardsGrid}>
              {/* Tool 1: Technical Blogs */}
              <Link to="/blogs/intro" className={`${styles.ecoCard} ${styles.staggerItem}`}>
                <div className={styles.ecoIconWrap}>
                  <BookOpen size={20} />
                </div>
                <div className={styles.ecoCardBody}>
                  <h3 className={styles.ecoCardTitle}>Technical Blogs</h3>
                  <p className={styles.ecoCardDesc}>
                    100+ structured engineering articles spanning DSA, System Design, DBMS, ML, and Python Full-Stack.
                  </p>
                </div>
                <div className={styles.ecoArrow}>
                  <ArrowRight size={16} />
                </div>
              </Link>

              {/* Tool 2: Whiteboard */}
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
 
               {/* Tool 3: Tracker */}
               <Link to="/tracker" className={`${styles.ecoCard} ${styles.staggerItem}`}>
                 <div className={styles.ecoIconWrap}>
                   <Activity size={20} />
                 </div>
                 <div className={styles.ecoCardBody}>
                   <h3 className={styles.ecoCardTitle}>Tracker</h3>
                   <p className={styles.ecoCardDesc}>
                     Custom productivity suite featuring Pomodoro Deep Work with floating PiP capsule, atomic habit streaks, and 52-week activity heatmap.
                   </p>
                 </div>
                 <div className={styles.ecoArrow}>
                   <ArrowRight size={16} />
                 </div>
               </Link>
            </div>
          </section>

          {/* ============================================================
              5. Minimal Clean Footer
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
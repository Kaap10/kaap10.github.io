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
  FileText
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

// Reusable custom hook for smooth scroll-triggered progressive reveal
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
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
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
  const [blogsRef, blogsRevealed] = useScrollReveal();
  const [collabRef, collabRevealed] = useScrollReveal();

  return (
    <Layout
      title="Vardhman Gupta"
      description="Personal portfolio and technical knowledge base of Vardhman Gupta — AI/ML Engineer & Full-Stack Developer."
    >
      <main className={styles.pageContainer}>
        {/* Ambient Animated Glowing Orbs & Technical Grid Overlay */}
        <div className={styles.bgCanvasWrapper} aria-hidden="true">
          <div className={styles.glowOrb1} />
          <div className={styles.glowOrb2} />
          <div className={styles.glowOrb3} />
          <div className={styles.gridOverlay} />
        </div>

        <div className={styles.contentWrapper}>
          
          {/* ============================================================
              1. Hero Section (Cinematic Editorial Introduction)
              ============================================================ */}
          <section 
            ref={heroRef} 
            className={`${styles.heroSection} ${styles.revealSection} ${heroRevealed ? styles.isRevealed : ''}`}
          >
            <div className={styles.eyebrowPill}>
              <span className={styles.pulseDot} />
              <span>Engineer · Builder · Learner</span>
            </div>

            <h1 className={styles.heroTitle}>
              Vardhman Gupta
            </h1>

            <p className={styles.heroBio}>
              AI/ML engineer and full-stack developer building practical systems across{' '}
              <span className={styles.bioHighlight}>local LLMs</span>,{' '}
              <span className={styles.bioHighlight}>RAG pipelines</span>,{' '}
              <span className={styles.bioHighlight}>realtime collaboration</span>, and{' '}
              <span className={styles.bioHighlight}>security AI</span>.
            </p>

            <div className={styles.heroActions}>
              <Link to="/blogs/intro" className={styles.primaryHeroLink}>
                <span>Explore Blogs</span>
                <ArrowRight size={16} />
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

              <a 
                href="https://github.com/kaap10" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.heroLink}
              >
                <IconGithub size={15} />
                <span>GitHub</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </section>

          {/* ============================================================
              2. Selected Work / Projects (Editorial Showcase Cards)
              ============================================================ */}
          <section 
            ref={projectsRef} 
            id="projects"
            className={`${styles.section} ${styles.revealSection} ${projectsRevealed ? styles.isRevealed : ''}`}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <span className={styles.sectionEyebrow}>Featured Work</span>
                <h2 className={styles.sectionTitle}>Projects</h2>
              </div>
              <span className={styles.sectionSubtitle}>01 — 04</span>
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
                    Offline AI Tutor. Local LLM learning system for internet-deprived regions featuring textbook 
                    summaries, interactive practice questions, flashcards, and multilingual support.
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
                  <span className={styles.projectCategoryTag}>Information Retrieval &amp; RAG</span>
                </div>

                <div className={styles.projectCardBody}>
                  <h3 className={styles.projectCardTitle}>AuraNow</h3>
                  <p className={styles.projectCardDesc}>
                    CPU-first RAG Pipeline. Semantic clustering and hierarchical context generation for 100K+ comments 
                    using CPU-friendly retrieval preprocessing and vector projections.
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
                    Real-time collaborative code editor that lets multiple users write, edit, and collaborate on code together with synchronized changes and a seamless browser-based coding experience.
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
                  <span className={styles.projectCategoryTag}>Security AI &amp; Analytics</span>
                </div>

                <div className={styles.projectCardBody}>
                  <h3 className={styles.projectCardTitle}>AegisAI</h3>
                  <p className={styles.projectCardDesc}>
                    AI Security Engine. Behavior-based anomaly detection for identity attacks, brute force, and lateral 
                    movement with high-throughput SIEM-oriented alerting.
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
              3. Technical Toolkit (Structured Domain Grid)
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
              <span className={styles.sectionSubtitle}>5 Specialized Domains</span>
            </div>

            <div className={styles.toolkitCardsGrid}>
              {/* Languages */}
              <div className={`${styles.toolkitDomainCard} ${styles.staggerItem}`}>
                <div className={styles.toolkitDomainHeader}>
                  <div className={styles.toolkitDomainIcon}>
                    <Code2 size={18} />
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
                    <LayoutIcon size={18} />
                  </div>
                  <span className={styles.toolkitDomainTitle}>Frontend</span>
                </div>
                <div className={styles.toolkitPillsWrap}>
                  <span className={styles.skillPill}>React.js</span>
                  <span className={styles.skillPill}>Next.js</span>
                  <span className={styles.skillPill}>HTML5</span>
                  <span className={styles.skillPill}>CSS3</span>
                </div>
              </div>

              {/* Backend */}
              <div className={`${styles.toolkitDomainCard} ${styles.staggerItem}`}>
                <div className={styles.toolkitDomainHeader}>
                  <div className={styles.toolkitDomainIcon}>
                    <Server size={18} />
                  </div>
                  <span className={styles.toolkitDomainTitle}>Backend</span>
                </div>
                <div className={styles.toolkitPillsWrap}>
                  <span className={styles.skillPill}>Node.js</span>
                  <span className={styles.skillPill}>FastAPI</span>
                  <span className={styles.skillPill}>REST APIs</span>
                  <span className={styles.skillPill}>Express</span>
                </div>
              </div>

              {/* AI / ML */}
              <div className={`${styles.toolkitDomainCard} ${styles.staggerItem}`}>
                <div className={styles.toolkitDomainHeader}>
                  <div className={styles.toolkitDomainIcon}>
                    <BrainCircuit size={18} />
                  </div>
                  <span className={styles.toolkitDomainTitle}>AI / ML</span>
                </div>
                <div className={styles.toolkitPillsWrap}>
                  <span className={styles.skillPill}>PyTorch</span>
                  <span className={styles.skillPill}>LLMs</span>
                  <span className={styles.skillPill}>RAG</span>
                  <span className={styles.skillPill}>Transformers</span>
                  <span className={styles.skillPill}>Scikit-Learn</span>
                </div>
              </div>

              {/* Infrastructure */}
              <div className={`${styles.toolkitDomainCard} ${styles.staggerItem}`}>
                <div className={styles.toolkitDomainHeader}>
                  <div className={styles.toolkitDomainIcon}>
                    <Terminal size={18} />
                  </div>
                  <span className={styles.toolkitDomainTitle}>Infrastructure</span>
                </div>
                <div className={styles.toolkitPillsWrap}>
                  <span className={styles.skillPill}>Docker</span>
                  <span className={styles.skillPill}>Git</span>
                  <span className={styles.skillPill}>Linux Environment</span>
                  <span className={styles.skillPill}>CI / CD</span>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================
              4. Blogs & Knowledge Base Showcase
              ============================================================ */}
          <section 
            ref={blogsRef} 
            id="blogs"
            className={`${styles.section} ${styles.revealSection} ${blogsRevealed ? styles.isRevealed : ''}`}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <span className={styles.sectionEyebrow}>Writing &amp; Research</span>
                <h2 className={styles.sectionTitle}>Knowledge Base</h2>
              </div>
              <Link to="/blogs/intro" className={styles.sectionSubtitle}>
                <span>View All Categories</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className={styles.articlesGrid}>
              <Link 
                to="/blogs/Development/Python%20Full%20Stack/Flask" 
                className={`${styles.articleCard} ${styles.staggerItem}`}
              >
                <div className={styles.articleCardBody}>
                  <span className={styles.articleCategoryTag}>Development</span>
                  <h4 className={styles.articleTitle}>Flask &amp; Backend Architecture</h4>
                  <p className={styles.articleSummary}>
                    Backend architectures, Flask, FastAPI, database integrations, and high-performance server configurations.
                  </p>
                </div>
                <div className={styles.articleArrow}>
                  <ArrowRight size={18} />
                </div>
              </Link>

              <Link 
                to="/blogs/Core%20Subjects/DBMS" 
                className={`${styles.articleCard} ${styles.staggerItem}`}
              >
                <div className={styles.articleCardBody}>
                  <span className={styles.articleCategoryTag}>Core Computer Science</span>
                  <h4 className={styles.articleTitle}>Database Management Systems (DBMS)</h4>
                  <p className={styles.articleSummary}>
                    ACID properties, concurrency control protocols, query optimization, indexing strategies, and relational schema designs.
                  </p>
                </div>
                <div className={styles.articleArrow}>
                  <ArrowRight size={18} />
                </div>
              </Link>

              <Link 
                to="/blogs/Core%20Subjects/OOPs" 
                className={`${styles.articleCard} ${styles.staggerItem}`}
              >
                <div className={styles.articleCardBody}>
                  <span className={styles.articleCategoryTag}>System Design</span>
                  <h4 className={styles.articleTitle}>Object-Oriented Programming &amp; Architecture</h4>
                  <p className={styles.articleSummary}>
                    SOLID principles, design patterns, encapsulation, polymorphism, and maintainable software architecture.
                  </p>
                </div>
                <div className={styles.articleArrow}>
                  <ArrowRight size={18} />
                </div>
              </Link>

              <Link 
                to="/blogs/B.Tech%20Subjects/Data%20Warehouse%20and%20Data%20Mining" 
                className={`${styles.articleCard} ${styles.staggerItem}`}
              >
                <div className={styles.articleCardBody}>
                  <span className={styles.articleCategoryTag}>Data Engineering</span>
                  <h4 className={styles.articleTitle}>Data Warehouse &amp; Data Mining</h4>
                  <p className={styles.articleSummary}>
                    OLAP cubes, dimensional modeling, ETL pipelines, association rule mining, and large-scale data clustering.
                  </p>
                </div>
                <div className={styles.articleArrow}>
                  <ArrowRight size={18} />
                </div>
              </Link>
            </div>
          </section>

          {/* ============================================================
              5. Intentional Narrative Transition / Collaboration CTA
              ============================================================ */}
          <section 
            ref={collabRef} 
            className={`${styles.collabSection} ${styles.revealSection} ${collabRevealed ? styles.isRevealed : ''}`}
          >
            <div className={styles.collabEyebrow}>Let&#39;s Collaborate</div>
            <h2 className={styles.collabTitle}>Building systems that solve hard problems.</h2>
            <p className={styles.collabText}>
              Open to high-impact AI/ML engineering roles, production system architectures, and technical collaborations.
            </p>
            <div className={styles.collabActions}>
              <a 
                href="https://linkedin.com/in/vardhman-gupta" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.collabPrimaryBtn}
              >
                <IconLinkedin size={16} />
                <span>Connect on LinkedIn</span>
              </a>

              <a 
                href="/Vardhman_Gupta%20(Resume).pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.collabSecondaryBtn}
              >
                <FileText size={15} />
                <span>View Full Resume</span>
              </a>

              <a 
                href="https://github.com/kaap10" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.collabSecondaryBtn}
              >
                <IconGithub size={15} />
                <span>GitHub Profile</span>
              </a>
            </div>
          </section>

          {/* ============================================================
              6. Minimal Editorial Footer
              ============================================================ */}
          <footer className={styles.editorialFooter}>
            <div className={styles.footerTop}>
              <div>
                <span className={styles.footerBrand}>Vardhman Gupta</span>
                <span className={styles.footerTagline}>— Engineer · Builder · Learner</span>
              </div>
              <div className={styles.footerLinks}>
                <Link to="/blogs/intro" className={styles.footerLink}>Blogs</Link>
                <Link to="/board" className={styles.footerLink}>Board</Link>
                <Link to="/tracker" className={styles.footerLink}>Tracker</Link>
                <a href="/Vardhman_Gupta%20(Resume).pdf" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Resume</a>
                <a href="https://github.com/kaap10" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>GitHub</a>
                <a href="https://linkedin.com/in/vardhman-gupta" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>LinkedIn</a>
              </div>
            </div>
            <div className={styles.footerBottom}>
              © {new Date().getFullYear()} Vardhman Gupta. Built with editorial restraint.
            </div>
          </footer>

        </div>
      </main>
    </Layout>
  );
}
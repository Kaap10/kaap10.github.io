import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="Vardhman Gupta"
      description="Personal portfolio and technical knowledge base of Vardhman Gupta — AI/ML Engineer & Full-Stack Developer."
    >
      <main className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          
          {/* ============================================================
              Hero Section
              ============================================================ */}
          <section className={styles.heroSection}>
            <div className={styles.eyebrow}>Engineer · Builder · Learner</div>
            <h1 className={styles.heroTitle}>Vardhman Gupta</h1>
            <p className={styles.heroBio}>
              AI/ML engineer and full-stack developer building practical systems across local LLMs, 
              RAG pipelines, realtime collaboration, and security AI.
            </p>
            <div className={styles.heroActions}>
              <Link to="/blogs/intro" className={styles.primaryHeroLink}>
                Explore Blogs <span>→</span>
              </Link>
              <a 
                href="/Vardhman_Gupta%20(Resume).pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.heroLink}
              >
                Resume <span>↗</span>
              </a>
            </div>
          </section>

          {/* ============================================================
              Selected Work / Projects
              ============================================================ */}
          <section className={styles.section} id="projects">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Projects</h2>
              <span className={styles.sectionSubtitle}>01 — 04</span>
            </div>

            <div className={styles.projectList}>
              <article className={styles.projectItem}>
                <span className={styles.projectIndex}>01</span>
                <div className={styles.projectBody}>
                  <div className={styles.projectHeading}>
                    <h3 className={styles.projectName}>Guru-G</h3>
                  </div>
                  <p className={styles.projectDesc}>
                    Offline AI Tutor. Local LLM learning system for internet-deprived regions featuring textbook 
                    summaries, interactive practice questions, flashcards, and multilingual support.
                  </p>
                  <div className={styles.projectTech}>
                    <span>Llama.cpp</span>
                    <span>Python</span>
                    <span>FastAPI</span>
                    <span>React Native</span>
                  </div>
                </div>
              </article>

              <article className={styles.projectItem}>
                <span className={styles.projectIndex}>02</span>
                <div className={styles.projectBody}>
                  <div className={styles.projectHeading}>
                    <h3 className={styles.projectName}>AuraNow</h3>
                  </div>
                  <p className={styles.projectDesc}>
                    CPU-first RAG Pipeline. Semantic clustering and hierarchical context generation for 100K+ comments 
                    using CPU-friendly retrieval preprocessing and vector projections.
                  </p>
                  <div className={styles.projectTech}>
                    <span>Sentence Transformers</span>
                    <span>UMAP</span>
                    <span>HDBSCAN</span>
                  </div>
                </div>
              </article>

              <article className={styles.projectItem}>
                <span className={styles.projectIndex}>03</span>
                <div className={styles.projectBody}>
                  <div className={styles.projectHeading}>
                    <h3 className={styles.projectName}>Code With Buddy</h3>
                  </div>
                  <p className={styles.projectDesc}>
                    Real-time collaborative code editor that lets multiple users write, edit, and collaborate on code together with synchronized changes and a seamless browser-based coding experience.
                  </p>
                  <div className={styles.projectTech}>
                    <span>React.js</span>
                    <span>CodeMirror</span>
                    <span>Node.js</span>
                    <span>Socket.IO</span>
                  </div>
                </div>
              </article>

              <article className={styles.projectItem}>
                <span className={styles.projectIndex}>04</span>
                <div className={styles.projectBody}>
                  <div className={styles.projectHeading}>
                    <h3 className={styles.projectName}>AegisAI</h3>
                  </div>
                  <p className={styles.projectDesc}>
                    AI Security Engine. Behavior-based anomaly detection for identity attacks, brute force, and lateral 
                    movement with high-throughput SIEM-oriented alerting.
                  </p>
                  <div className={styles.projectTech}>
                    <span>TensorFlow</span>
                    <span>FastAPI</span>
                    <span>Elasticsearch</span>
                  </div>
                </div>
              </article>
            </div>
          </section>



          {/* ============================================================
              Technical Toolkit
              ============================================================ */}
          <section className={styles.section} id="toolkit">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Technical Toolkit</h2>
              <span className={styles.sectionSubtitle}>Core Capabilities</span>
            </div>

            <div className={styles.toolkitGrid}>
              <div className={styles.toolkitCategory}>
                <span className={styles.toolkitLabel}>Languages</span>
                <div className={styles.toolkitItems}>Python · C++ · JavaScript · SQL</div>
              </div>

              <div className={styles.toolkitCategory}>
                <span className={styles.toolkitLabel}>Frontend</span>
                <div className={styles.toolkitItems}>React.js · Next.js · HTML5 · CSS3</div>
              </div>

              <div className={styles.toolkitCategory}>
                <span className={styles.toolkitLabel}>Backend</span>
                <div className={styles.toolkitItems}>Node.js · FastAPI · REST APIs</div>
              </div>

              <div className={styles.toolkitCategory}>
                <span className={styles.toolkitLabel}>AI / ML</span>
                <div className={styles.toolkitItems}>PyTorch · LLMs · RAG · Transformers</div>
              </div>

              <div className={styles.toolkitCategory}>
                <span className={styles.toolkitLabel}>Infrastructure</span>
                <div className={styles.toolkitItems}>Docker · Git · Linux Environment</div>
              </div>
            </div>
          </section>

          {/* ============================================================
              Blogs & Knowledge Base Preview
              ============================================================ */}
          <section className={styles.section} id="blogs">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Blogs & Knowledge Base</h2>
              <Link to="/blogs/intro" className={styles.sectionSubtitle}>
                View All Categories →
              </Link>
            </div>

            <div className={styles.writingList}>
              <Link to="/blogs/DSA/intro" className={styles.writingItem}>
                <div>
                  <h4 className={styles.writingTitle}>
                    Data Structures & Algorithms
                  </h4>
                  <p className={styles.writingSummary}>
                    Pattern recognition, time complexity trade-offs, and competitive problem solving.
                  </p>
                </div>
                <div className={styles.writingMeta}>
                  <span>DSA</span>
                  <span className={styles.writingArrow}>→</span>
                </div>
              </Link>

              <Link to="/blogs/System%20Design/System_Design" className={styles.writingItem}>
                <div>
                  <h4 className={styles.writingTitle}>
                    System Design & Architecture
                  </h4>
                  <p className={styles.writingSummary}>
                    High-level and low-level architectural patterns for scalable distributed systems.
                  </p>
                </div>
                <div className={styles.writingMeta}>
                  <span>System Design</span>
                  <span className={styles.writingArrow}>→</span>
                </div>
              </Link>

              <Link to="/blogs/Development/Python%20Full%20Stack/Flask" className={styles.writingItem}>
                <div>
                  <h4 className={styles.writingTitle}>
                    Flask & Backend Architecture
                  </h4>
                  <p className={styles.writingSummary}>
                    Backend architectures, Flask, FastAPI, database integrations, and deployment notes.
                  </p>
                </div>
                <div className={styles.writingMeta}>
                  <span>Development</span>
                  <span className={styles.writingArrow}>→</span>
                </div>
              </Link>

              <Link to="/blogs/AIML/Python/intro" className={styles.writingItem}>
                <div>
                  <h4 className={styles.writingTitle}>
                    Artificial Intelligence & Machine Learning
                  </h4>
                  <p className={styles.writingSummary}>
                    Applied machine learning, deep neural nets, LLM inference, and data processing.
                  </p>
                </div>
                <div className={styles.writingMeta}>
                  <span>AI / ML</span>
                  <span className={styles.writingArrow}>→</span>
                </div>
              </Link>

              <Link to="/blogs/Core%20Subjects/intro" className={styles.writingItem}>
                <div>
                  <h4 className={styles.writingTitle}>
                    Core Computer Science Subjects
                  </h4>
                  <p className={styles.writingSummary}>
                    Operating systems, database management systems (DBMS), OOPs, and networking fundamentals.
                  </p>
                </div>
                <div className={styles.writingMeta}>
                  <span>Core CS</span>
                  <span className={styles.writingArrow}>→</span>
                </div>
              </Link>
            </div>
          </section>

          {/* ============================================================
              Minimal Editorial Footer
              ============================================================ */}
          <footer className={styles.editorialFooter}>
            <div className={styles.footerTop}>
              <div>
                <span className={styles.footerBrand}>Vardhman Gupta</span>
                <span className={styles.footerTagline}>— Engineer · Builder · Learner</span>
              </div>
              <div className={styles.footerLinks}>
                <Link to="/blogs/intro" className={styles.footerLink}>Blogs</Link>
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


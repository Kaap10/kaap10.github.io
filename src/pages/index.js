import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function Home() {
  return (
    <Layout title="Portfolio" description="Portfolio of Vardhman Gupta">
      <main className={styles.mainContainer}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>Vardhman Gupta</h1>
            <p className={styles.subtitle}>Engineer / Builder / Learner</p>
            <p className={styles.bio}>
              AI/ML engineer and full-stack developer building practical products across local LLMs, 
              RAG pipelines, realtime collaboration, and security AI.
            </p>
            <div className={styles.links}>
              <a href="/Vardhman_Gupta%20(Resume).pdf" target="_blank" rel="noopener noreferrer">Resume</a>
              <Link to="/notes/intro">Notes</Link>
            </div>
          </header>

          <section className={styles.section}>
            <h2>Projects</h2>
            <div className={styles.projectList}>
              <div className={styles.project}>
                <h3>Guru-G</h3>
                <p>Offline AI Tutor. Local LLM learning system for internet-deprived regions with textbook summaries, practice questions, flashcards, and multilingual support.</p>
                <div className={styles.tags}><span>Python</span><span>Llama.cpp</span><span>FastAPI</span><span>React Native</span></div>
              </div>
              <div className={styles.project}>
                <h3>AuraNow</h3>
                <p>CPU RAG Pipeline. Semantic clustering and hierarchical context generation for 100K+ comments using CPU-friendly retrieval preprocessing.</p>
                <div className={styles.tags}><span>Sentence Transformers</span><span>UMAP</span><span>HDBSCAN</span></div>
              </div>
              <div className={styles.project}>
                <h3>AegisAI</h3>
                <p>AI Security Engine. Behavior-based anomaly detection for identity attacks, brute force, and lateral movement with fast SIEM-oriented alerting.</p>
                <div className={styles.tags}><span>TensorFlow</span><span>FastAPI</span><span>Elasticsearch</span></div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Experience & Signals</h2>
            <ul className={styles.list}>
              <li><strong>LeetCode</strong>: 1988 peak rating, Global rank 144 in contests.</li>
              <li><strong>Hackathons</strong>: IIT Delhi + Thales runner-up.</li>
              <li><strong>Education</strong>: B.Tech AIML, 2026.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Technologies</h2>
            <p className={styles.techText}>
              Python, C++, JavaScript, SQL, React.js, Next.js, FastAPI, Node.js, PyTorch, LLMs, RAG, Docker.
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default Home;

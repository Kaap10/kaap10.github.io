import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const surfaces = [
  {
    title: 'Engineer',
    summary: 'AI/ML and full-stack systems with clean architecture and measurable product impact.',
    detail: 'FastAPI, React, TypeScript, Python, RAG, realtime apps',
  },
  {
    title: 'Builder',
    summary: 'Projects shaped around real constraints: offline access, CPU budgets, latency, and reliability.',
    detail: 'Guru-G, AuraNow, AegisAI, Code with Buddy',
  },
  {
    title: 'Learner',
    summary: 'A living wiki for DSA, system design, core CS, AIML, and development notes.',
    detail: 'Structured notes for revision, interviews, and long-term recall',
  },
];

const signals = [
  ['LeetCode', '1988 peak rating'],
  ['Contest', 'Global rank 144'],
  ['Hackathons', 'IIT Delhi + Thales runner-up'],
  ['Degree', 'B.Tech AIML, 2026'],
];

const projects = [
  {
    title: 'Guru-G',
    label: 'Offline AI Tutor',
    copy:
      'Local LLM learning system for internet-deprived regions with textbook summaries, practice questions, flashcards, and multilingual support.',
    stack: ['Python', 'Llama.cpp', 'FastAPI', 'React Native', 'SQLite'],
  },
  {
    title: 'AuraNow',
    label: 'CPU RAG Pipeline',
    copy:
      'Semantic clustering and hierarchical context generation for 100K+ comments using CPU-friendly retrieval preprocessing.',
    stack: ['Sentence Transformers', 'UMAP', 'HDBSCAN', 'RAPTOR', 'SQLite'],
  },
  {
    title: 'AegisAI',
    label: 'AI Security Engine',
    copy:
      'Behavior-based anomaly detection for identity attacks, brute force, and lateral movement with fast SIEM-oriented alerting.',
    stack: ['TensorFlow', 'FastAPI', 'Elasticsearch', 'SIEM'],
  },
];

const stack = [
  'Python',
  'TypeScript',
  'React',
  'Node.js',
  'FastAPI',
  'PyTorch',
  'TensorFlow',
  'RAG',
  'Socket.IO',
  'Supabase',
  'Docker',
  'SQLite',
];

const notes = [
  ['DSA', '/notes/DSA/intro'],
  ['System Design', '/notes/System Design/System_Design'],
  ['AI / ML', '/notes/AIML/Python/intro'],
  ['Development', '/notes/Development/intro'],
  ['Core CS', '/notes/Core Subjects/intro'],
  ['Coursework', '/notes/B.Tech Subjects/intro'],
];

function HeroPanel() {
  return (
    <aside className={styles.heroPanel} aria-label="Portfolio preview">
      <div className={styles.windowBar}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.profileLine}>
        <img src="/img/profile.png" alt="" />
        <div>
          <strong>Vardhman Gupta</strong>
          <small>available for SWE / AI roles</small>
        </div>
      </div>
      <pre className={styles.codeBlock}>
        <code>{`const vardhman = {
  focus: ['AI/ML', 'Full Stack', 'Systems'],
  ships: ['offline tutors', 'RAG pipelines', 'security AI'],
  studies: ['DSA', 'system design', 'core CS'],
  status: 'open_to_opportunities'
};`}</code>
      </pre>
      <div className={styles.panelFooter}>
        <span>build: passing</span>
        <span>notes: live</span>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>Portfolio / Technical Wiki</p>
        <h1>Build systems, document the thinking, repeat.</h1>
        <p className={styles.lead}>
          I am Vardhman Gupta, an AI/ML engineer and full-stack developer building practical
          products across local LLMs, RAG pipelines, realtime collaboration, and security AI.
        </p>
        <div className={styles.actionRow}>
          <Link className={styles.primaryAction} to="/notes/About Me">
            Start Here
          </Link>
          <a className={styles.secondaryAction} href="/Vardhman_Gupta%20(Resume).pdf">
            Resume
          </a>
          <Link className={styles.ghostAction} to="/notes/intro">
            Notes
          </Link>
        </div>
      </div>
      <HeroPanel />
    </section>
  );
}

function SignalBar() {
  return (
    <section className={styles.signalBar} aria-label="Quick highlights">
      {signals.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </section>
  );
}

function Surfaces() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>One profile, three surfaces</p>
        <h2>Readable by recruiters, engineers, and future me.</h2>
      </div>
      <div className={styles.surfaceGrid}>
        {surfaces.map((surface) => (
          <article key={surface.title} className={styles.surfaceCard}>
            <h3>{surface.title}</h3>
            <p>{surface.summary}</p>
            <span>{surface.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>Selected builds</p>
        <h2>Project work with real constraints.</h2>
      </div>
      <div className={styles.projectStack}>
        {projects.map((project, index) => (
          <article className={styles.projectRow} key={project.title}>
            <div className={styles.projectIndex}>0{index + 1}</div>
            <div>
              <p>{project.label}</p>
              <h3>{project.title}</h3>
            </div>
            <p className={styles.projectCopy}>{project.copy}</p>
            <div className={styles.stackList}>
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StackAndNotes() {
  return (
    <section className={styles.splitSection}>
      <div className={styles.stackPanel}>
        <p className={styles.kicker}>Tech stack</p>
        <h2>Modern tools, practical defaults.</h2>
        <div className={styles.techCloud}>
          {stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <div className={styles.notesPanel}>
        <p className={styles.kicker}>Docs</p>
        <h2>Learning archive</h2>
        <div className={styles.noteLinks}>
          {notes.map(([label, to]) => (
            <Link key={label} to={to}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className={styles.contact}>
      <div>
        <p className={styles.kicker}>Now</p>
        <h2>Open to Software Engineering, AI/ML, and Full Stack roles.</h2>
      </div>
      <div className={styles.contactLinks}>
        <a href="mailto:vardhmangupta2004@gmail.com">Email</a>
        <a href="https://github.com/kaap10">GitHub</a>
        <a href="https://linkedin.com/in/vardhman-gupta">LinkedIn</a>
        <a href="https://leetcode.com/Kap10/">LeetCode</a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Vardhman Gupta"
      description="Vardhman Gupta's portfolio and technical wiki for AI/ML, full-stack engineering, systems, and notes."
    >
      <main className={styles.home}>
        <Hero />
        <SignalBar />
        <Surfaces />
        <Projects />
        <StackAndNotes />
        <Contact />
      </main>
    </Layout>
  );
}

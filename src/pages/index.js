import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const sections = [
  {
    title: 'Data Structures & Algorithms',
    subtitle: 'Patterns, complexity notes, and interview-focused problem solving.',
    to: '/notes/DSA/intro',
  },
  {
    title: 'System Design',
    subtitle: 'High-level architecture, tradeoffs, and scalability references.',
    to: '/notes/System Design/System_Design',
  },
  {
    title: 'AI & ML',
    subtitle: 'Practical concepts, experiments, and implementation-oriented summaries.',
    to: '/notes/AIML/Python/intro',
  },
  {
    title: 'Development',
    subtitle: 'JavaScript, web engineering, and production coding practices.',
    to: '/notes/Development/intro',
  },
  {
    title: 'Core Subjects',
    subtitle: 'OS, DBMS, OOP, and other foundational computer science material.',
    to: '/notes/Core Subjects/intro',
  },
  {
    title: 'B.Tech Subjects',
    subtitle: 'University coursework notes organized for quick revision.',
    to: '/notes/B.Tech Subjects/intro',
  },
];

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackdrop} aria-hidden="true" />
      <div className={styles.heroContent}>
        <p className={styles.kicker}>Knowledge Hub</p>
        <h1 className={styles.title}>Professional technical notes, organized for fast recall.</h1>
        <p className={styles.lead}>
          A clean, structured personal wiki for engineering topics: built to revise concepts quickly,
          connect ideas, and keep long-term learning consistent.
        </p>
        <div className={styles.ctaRow}>
          <Link className={styles.primaryCta} to="/notes/intro">
            Start Reading
          </Link>
          <Link className={styles.secondaryCta} to="/notes/About Me">
            About This Wiki
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionGrid() {
  return (
    <section className={styles.gridSection} aria-labelledby="section-grid-heading">
      <div className={styles.gridHeader}>
        <h2 id="section-grid-heading">Browse by Area</h2>
        <p>Each section is organized to make concepts easy to find and easy to revisit.</p>
      </div>
      <div className={styles.grid}>
        {sections.map((section) => (
          <Link key={section.title} to={section.to} className={styles.card}>
            <h3>{section.title}</h3>
            <p>{section.subtitle}</p>
            <span className={styles.cardAction}>Open section</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className={styles.home}>
        <Hero />
        <SectionGrid />
      </main>
    </Layout>
  );
}
import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.eyebrow}>Personal Knowledge Base</div>
        
        <h1 className={styles.heroTitle}>
          Notes on <em>engineering</em> & systems.
        </h1>
        
        <p className={styles.subtitle}>
          A living index of technical notes on DSA, system design, ML, and core CS. Written for recall.
        </p>
        
        <Link to="/notes/intro" className={styles.ctaLink}>
          Browse notes →
        </Link>
      </div>
    </section>
  );
}

function StatsRow() {
  const stats = [
    { number: '6', label: 'Topics' },
    { number: '40+', label: 'Notes' },
    { number: '2026', label: 'Updated' },
    { number: '∞', label: 'Ongoing' },
  ];

  return (
    <section className={styles.statsSection}>
      <div className={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <div key={idx} className={styles.statCell}>
            <div className={styles.statNumber}>{stat.number}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TopicsGrid() {
  const topics = [
    {
      num: '01',
      name: 'System Design',
      desc: 'HLD, LLD, scaling patterns, architectural concepts',
      link: '/notes/System%20Design',
    },
    {
      num: '02',
      name: 'DSA',
      desc: 'Arrays, trees, graphs, dynamic programming, algorithms',
      link: '/notes/DSA',
    },
    {
      num: '03',
      name: 'AI/ML',
      desc: 'Machine learning, deep learning, GenAI, Python',
      link: '/notes/AIML',
    },
    {
      num: '04',
      name: 'Development',
      desc: 'Web technologies, JavaScript, React, databases, backend',
      link: '/notes/Development',
    },
    {
      num: '05',
      name: 'Core Subjects',
      desc: 'Operating systems, networking, databases, OOP, SQL',
      link: '/notes/Core%20Subjects',
    },
    {
      num: '06',
      name: 'B.Tech Subjects',
      desc: 'University coursework, data mining, warehousing',
      link: '/notes/B.Tech%20Subjects',
    },
  ];

  return (
    <section className={styles.topicsSection}>
      <div className={styles.topicsLabel}>Topics</div>
      <div className={styles.topicsGrid}>
        {topics.map((topic, idx) => (
          <Link key={idx} to={topic.link} className={styles.topicCell}>
            <div className={styles.topicTag}>{topic.num}</div>
            <h3 className={styles.topicName}>{topic.name}</h3>
            <p className={styles.topicDesc}>{topic.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className={styles.main}>
        <Hero />
        <StatsRow />
        <TopicsGrid />
      </main>
    </Layout>
  );
}

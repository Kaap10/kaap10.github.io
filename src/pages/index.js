import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const TOPIC_LINKS = {
  dsa: '/notes/DSA/intro',
  systemDesign: '/notes/System Design/HLD/30 Concepts',
  aiml: '/notes/AIML/Python/intro',
  development: '/notes/Development/intro',
  coreSubjects: '/notes/Core Subjects/intro',
  btech: '/notes/B.Tech Subjects/intro',
};

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <span className={styles.eyebrowPill}>Personal knowledge base</span>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleLine}>Notes on</span>
          <span className={styles.heroTitleLine}>
            <em className={styles.heroItalic}>engineering</em> & systems.
          </span>
        </h1>
        <p className={styles.heroBody}>
          A curated index of technical notes on DSA, system design, ML, and core
          CS. Written for recall, not performance.
        </p>
        <Link to="/notes/intro" className={styles.ctaButton}>
          Browse notes →
        </Link>
        <div className={styles.heroRule} aria-hidden="true" />
      </div>
    </section>
  );
}

function TopicsGrid() {
  const topics = [
    {
      id: '01',
      title: 'DSA',
      desc: 'Arrays, trees, graphs, DP, algorithms',
      to: TOPIC_LINKS.dsa,
      accent: '#f59e0b',
      icon: 'ti-binary-tree',
    },
    {
      id: '02',
      title: 'System Design',
      desc: 'HLD, LLD, scaling, architecture patterns',
      to: TOPIC_LINKS.systemDesign,
      accent: '#4f8ef7',
      icon: 'ti-topology-star',
    },
    {
      id: '03',
      title: 'AI & ML',
      desc: 'Machine learning, deep learning, GenAI',
      to: TOPIC_LINKS.aiml,
      accent: '#a78bfa',
      icon: 'ti-brain',
    },
    {
      id: '04',
      title: 'Development',
      desc: 'Web tech, JavaScript, React, backend',
      to: TOPIC_LINKS.development,
      accent: '#34d399',
      icon: 'ti-code',
    },
    {
      id: '05',
      title: 'Core Subjects',
      desc: 'OS, networking, databases, OOP',
      to: TOPIC_LINKS.coreSubjects,
      accent: '#f87171',
      icon: 'ti-cpu',
    },
    {
      id: '06',
      title: 'B.Tech',
      desc: 'University coursework and subject notes',
      to: TOPIC_LINKS.btech,
      accent: '#94a3b8',
      icon: 'ti-school',
    },
  ];

  return (
    <section className={styles.topics} aria-labelledby="topics-heading">
      <div className={styles.topicsInner}>
        <p id="topics-heading" className={styles.topicsHeading}>
          Topics
        </p>
        <div className={styles.topicsGrid}>
          {topics.map((t) => (
            <Link
              key={t.id}
              to={t.to}
              className={styles.topicCard}
              style={{'--accent': t.accent}}>
              <div className={styles.topicNum}>{t.id}</div>
              <div className={styles.topicHeader}>
                <i
                  className={`ti ${t.icon}`}
                  style={{color: t.accent, fontSize: '18px'}}
                  aria-hidden
                />
                <h3 className={styles.topicName}>{t.title}</h3>
              </div>
              <p className={styles.topicDesc}>{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className={styles.home}>
        <Hero />
        <TopicsGrid />
      </main>
    </Layout>
  );
}

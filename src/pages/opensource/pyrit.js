import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ArrowLeft } from 'lucide-react';
import styles from './dynavec.module.css';

export default function PyRITPage() {
  return (
    <Layout
      title="microsoft/PyRIT"
      description="Microsoft PyRIT open-source contributions by Vardhman Gupta."
    >
      <main className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <nav className={styles.breadcrumbNav}>
            <Link to="/opensource" className={styles.breadcrumbLink}>
              <ArrowLeft size={14} />
              <span>Open Source</span>
            </Link>
            <span>/</span>
            <span className={styles.breadcrumbCurrent}>microsoft/PyRIT</span>
          </nav>

          <header className={styles.heroHeader}>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
              microsoft/PyRIT
            </h1>
            <p style={{ color: 'var(--vg-text-muted, #A6A6AC)', fontSize: '1.05rem', margin: 0 }}>
              Open-source contributions and architecture details.
            </p>
          </header>
        </div>
      </main>
    </Layout>
  );
}


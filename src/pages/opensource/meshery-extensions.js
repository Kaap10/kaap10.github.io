import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ArrowLeft } from 'lucide-react';
import styles from './dynavec.module.css';

export default function MesheryExtensionsPage() {
  return (
    <Layout
      title="meshery-extensions"
      description="Meshery Extensions open-source contributions by Vardhman Gupta."
    >
      <main className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <nav className={styles.breadcrumbNav}>
            <Link to="/opensource" className={styles.breadcrumbLink}>
              <ArrowLeft size={14} />
              <span>Open Source</span>
            </Link>
            <span>/</span>
            <span className={styles.breadcrumbCurrent}>meshery-extensions</span>
          </nav>

          <header className={styles.heroHeader}>
            <div className={styles.eyebrowWrap} style={{ marginBottom: '0.75rem' }}>
              <span className={styles.eyebrowBadge}>
                <img
                  src="/img/layer5.png"
                  alt="Layer5 Meshery"
                  width={14}
                  height={14}
                  style={{ objectFit: 'contain', verticalAlign: 'middle', marginRight: 6 }}
                />
                Layer5 &amp; Meshery Ecosystem
              </span>
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 700, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <img
                src="/img/layer5.png"
                alt="Layer5 Meshery"
                width={30}
                height={30}
                style={{ objectFit: 'contain' }}
              />
              <span>meshery-extensions</span>
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


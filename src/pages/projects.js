import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
  ArrowRight,
  BookOpen,
  Activity,
  Code2
} from 'lucide-react';
import styles from './projects.module.css';
import ParticleCanvas from '@site/src/components/ParticleCanvas';

export default function ProjectsPage() {
  return (
    <Layout
      title="Projects"
      description="Production-oriented systems, autonomous AI agents, and full-stack platforms built by Vardhman Gupta."
      noFooter
    >
      <main className={styles.pageContainer}>
        {/* Subtle Ambient Glow & Particle Backdrop */}
        <div className={styles.bgGlowWrapper} aria-hidden="true">
          <div className={styles.glowOrb} />
          <ParticleCanvas />
        </div>

        <div className={styles.contentWrapper}>
          {/* Header */}
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Projects</h1>
            <p className={styles.pageSubtitle}>
              Production-oriented systems, autonomous AI agents, and full-stack platforms built around real engineering challenges.
            </p>

            {/* Centered Structured Project Buttons */}
            <div className={styles.buttonsContainer}>
              {/* Row 1: AI Projects */}
              <div className={styles.buttonRow}>
                <Link
                  to="/projects/karya"
                  className={styles.headerLink}
                  title="Karya (AI)"
                >
                  <BookOpen size={14} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                  <span>Karya</span>
                  <span className={styles.aiBadge}>AI</span>
                  <ArrowRight size={13} />
                </Link>

                <Link
                  to="/projects/auranow"
                  className={styles.headerLink}
                  title="AuraNow (AI)"
                >
                  <Activity size={14} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                  <span>AuraNow</span>
                  <span className={styles.aiBadge}>AI</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Row 2: Fullstack Projects */}
              <div className={styles.buttonRow}>
                <Link
                  to="/projects/code-with-buddy"
                  className={styles.headerLink}
                  title="Code with Buddy (Fullstack)"
                >
                  <Code2 size={14} style={{ color: '#3B82F6' }} />
                  <span>Code with Buddy</span>
                  <span className={styles.fullstackBadge}>Fullstack</span>
                  <ArrowRight size={13} />
                </Link>

                <Link
                  to="/projects/incidentflow"
                  className={styles.headerLink}
                  title="IncidentFlow (Fullstack)"
                >
                  <Activity size={14} style={{ color: '#3B82F6' }} />
                  <span>IncidentFlow</span>
                  <span className={styles.fullstackBadge}>Fullstack</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </header>
        </div>
      </main>
    </Layout>
  );
}
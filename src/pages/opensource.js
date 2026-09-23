import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
  ArrowRight,
  Package,
  Layers,
  Sparkles
} from 'lucide-react';
import styles from './opensource.module.css';
import ParticleCanvas from '@site/src/components/ParticleCanvas';

const IconGithub = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export default function OpenSourcePage() {
  return (
    <Layout
      title="Open Source"
      description="Open-source packages, developer CLI tooling, and database contributions by Vardhman Gupta."
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
            <h1 className={styles.pageTitle}>Open Source</h1>
            <p className={styles.pageSubtitle}>
              Open-source developer tooling, CLI workflow engines, and contributions to distributed serverless vector databases.
            </p>

            {/* Centered Structured Repository Buttons */}
            <div className={styles.buttonsContainer}>
              {/* Row 1: PicadoLabs */}
              <div className={styles.buttonRow}>
                <Link
                  to="/opensource/picadolabs"
                  className={styles.headerLink}
                  title="PicadoLabs (Owner and Maintainer)"
                >
                  <Sparkles size={13} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                  <span>PicadoLabs</span>
                  <span className={styles.ownerBadge}>Owner and Maintainer</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Row 2: Apache & Microsoft */}
              <div className={styles.buttonRow}>
                <Link
                  to="/opensource/magpie"
                  className={styles.headerLink}
                  title="apache/magpie (Contributor)"
                >
                  <img
                    src="/img/apachelogo.png"
                    alt="Apache"
                    width="14"
                    height="14"
                    style={{ objectFit: 'contain', flexShrink: 0 }}
                  />
                  <span>apache/magpie</span>
                  <span className={styles.contributorBadge}>Contributor</span>
                  <ArrowRight size={13} />
                </Link>

                <Link
                  to="/opensource/pyrit"
                  className={styles.headerLink}
                  title="microsoft/PyRIT (Contributor)"
                >
                  <img
                    src="/img/mslogo.png"
                    alt="Microsoft"
                    width="14"
                    height="14"
                    style={{ objectFit: 'contain', flexShrink: 0 }}
                  />
                  <span>microsoft/PyRIT</span>
                  <span className={styles.contributorBadge}>Contributor</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Row 3: dynavec, layer5io, palinode */}
              <div className={styles.buttonRow}>
                <Link
                  to="/opensource/dynavec"
                  className={styles.headerLink}
                  title="dynavec (Contributor)"
                  title="dynavec (Maintainer)"
                >
                  <Package size={14} style={{ color: '#22C55E' }} />
                  <span>dynavec</span>
                  <span className={styles.contributorBadge}>Contributor</span>
                  <span className={styles.contributorBadge} style={{ background: 'rgba(255, 170, 0, 0.15)', color: '#FFB700', border: '1px solid rgba(255, 170, 0, 0.2)' }}>Maintainer</span>
                  <ArrowRight size={13} />
                </Link>

                <Link
                  to="/opensource/layer5io"
                  className={styles.headerLink}
                  title="layer5io (Contributor)"
                >
                  <img
                    src="/img/layer5.png"
                    alt="Layer5"
                    width="14"
                    height="14"
                    style={{ objectFit: 'contain', flexShrink: 0 }}
                  />
                  <span>layer5io</span>
                  <span className={styles.contributorBadge}>Contributor</span>
                  <ArrowRight size={13} />
                </Link>

                <Link
                  to="/opensource/palinode"
                  className={styles.headerLink}
                  title="palinode (Contributor)"
                >
                  <IconGithub size={13} style={{ color: '#A855F7' }} />
                  <span>palinode</span>
                  <span className={styles.contributorBadge}>Contributor</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Row 4: quater, sqlite & meshery extensions */}
              <div className={styles.buttonRow}>
                <Link
                  to="/opensource/quater"
                  className={styles.headerLink}
                  title="quater (Contributor)"
                >
                  <IconGithub size={13} style={{ color: '#FAAD14' }} />
                  <span>quater</span>
                  <span className={styles.contributorBadge}>Contributor</span>
                  <ArrowRight size={13} />
                </Link>

                <Link
                  to="/opensource/sqlite-graph-memory"
                  className={styles.headerLink}
                  title="sqlite-graph-memory (Contributor)"
                >
                  <IconGithub size={13} style={{ color: '#EC4899' }} />
                  <span>sqlite-graph-memory</span>
                  <span className={styles.contributorBadge}>Contributor</span>
                  <ArrowRight size={13} />
                </Link>

                <Link
                  to="/opensource/meshery-extensions"
                  className={styles.headerLink}
                  title="meshery-extensions (Contributor)"
                >
                  <img
                    src="/img/layer5.png"
                    alt="Layer5 Meshery"
                    width="14"
                    height="14"
                    style={{ objectFit: 'contain', flexShrink: 0 }}
                  />
                  <span>meshery-extensions</span>
                  <span className={styles.contributorBadge}>Contributor</span>
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

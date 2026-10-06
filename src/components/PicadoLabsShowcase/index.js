import React from 'react';
import Link from '@docusaurus/Link';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Terminal, 
  Bot, 
  Gauge, 
  Layers, 
  Package, 
  Sparkles
} from 'lucide-react';
import styles from './styles.module.css';

const PICADO_PROJECTS = [
  {
    id: 'build-with-ai',
    name: 'build-with-ai',
    subtitle: 'Zero-API Developer CLI Engine',
    badges: [
      { text: '950+ Downloads', style: styles.badgeGreen },
      { text: '14+ Contributors', style: styles.badgeBlue },
    ],
    icon: Terminal,
    iconColor: '#22C55E',
    description: 'Local-first developer CLI guiding engineers through 11 structured software phases with zero API overhead, persistent context, and 14+ contributors.',
    externalLink: {
      label: 'npm package',
      url: 'https://www.npmjs.com/package/build-with-ai',
    },
    deepDiveUrl: '/opensource/picadolabs',
  },
  {
    id: 'model-router',
    name: 'Model Router',
    subtitle: 'Adaptive Inference Proxy',
    badges: [{ text: '40–70% Cost Cut', style: styles.badgeAccent }],
    icon: Layers,
    iconColor: 'var(--vg-accent, #FF4D4F)',
    description: 'Intelligent LLM gateway dynamically routing queries based on prompt complexity, delivering 40–70% cost savings with sub-10ms overhead.',
    deepDiveUrl: '/opensource/picadolabs',
  },
];

export default function PicadoLabsShowcase() {
  return (
    <div className={styles.container}>
      {/* Brand Header */}
      <div className={styles.ecosystemHeader}>
        <div className={styles.brandGroup}>
          <div className={styles.brandLogoWrap}>
            <img src="/img/picadolabs.png" alt="PicadoLabs" className={styles.brandLogo} />
          </div>

          <div className={styles.brandInfo}>
            <h2 className={styles.brandTitle}>PicadoLabs</h2>
            <span className={styles.brandTagline}>Autonomous AI &amp; Agent Systems Organization</span>
          </div>
        </div>

        <div className={styles.metricsRow}>
          <span className={`${styles.metricBadge} ${styles.metricAccent}`}>
            <Sparkles size={12} />
            <span>Founder &amp; Maintainer</span>
          </span>
        </div>
      </div>

      {/* 2-Column Grid of 4 Core Systems */}
      <div className={styles.grid}>
        {PICADO_PROJECTS.map((project) => (
          <div key={project.id} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.projectInfo}>
                <div className={styles.iconWrap}>
                  <project.icon size={17} style={{ color: project.iconColor }} />
                </div>

                <div className={styles.titleArea}>
                  <span className={styles.projectName}>{project.name}</span>
                  <span className={styles.projectSubtitle}>{project.subtitle}</span>
                </div>
              </div>

              <div className={styles.badgesGroup}>
                {project.badges.map((b, idx) => (
                  <span key={idx} className={`${styles.cardBadge} ${b.style}`}>
                    {b.text}
                  </span>
                ))}
              </div>
            </div>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.actions}>
              {project.externalLink && (
                <a
                  href={project.externalLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalLink}
                >
                  <Package size={13} style={{ color: '#22C55E' }} />
                  <span>{project.externalLink.label}</span>
                  <ArrowUpRight size={13} />
                </a>
              )}

              <Link to={project.deepDiveUrl} className={styles.deepDiveLink}>
                <span>Deep Dive</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Explore Banner */}
      <div className={styles.exploreBanner}>
        <div className={styles.exploreLeft}>
          <Sparkles size={17} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
          <span className={styles.exploreText}>
            Explore full architectural blueprints, benchmark suites &amp; telemetry logs.
          </span>
        </div>

        <Link to="/opensource/picadolabs" className={styles.exploreBtn}>
          <span>PicadoLabs Architecture</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

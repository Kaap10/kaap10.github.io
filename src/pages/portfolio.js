import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Layers, 
  BookOpen, 
  Terminal, 
  Code2,
  Clock,
  GitPullRequest
} from 'lucide-react';
import styles from './portfolio.module.css';
import ParticleCanvas from '@site/src/components/ParticleCanvas';
import PicadoLabsShowcase from '@site/src/components/PicadoLabsShowcase';
import ContributionsFeed from '@site/src/components/ContributionsFeed';

export default function PortfolioPage() {
  return (
    <Layout
      title="Portfolio"
      description="Portfolio of Vardhman Gupta — AI Engineer."
      noFooter
    >
      <main className={styles.pageContainer}>
        {/* Ambient Subtle Glow & Grid Backdrop */}
        <div className={styles.bgCanvasWrapper} aria-hidden="true">
          <div className={styles.glowOrb1} />
          <div className={styles.glowOrb2} />
          <div className={styles.gridOverlay} />
          <ParticleCanvas />
        </div>

        <div className={styles.contentWrapper}>
          {/* Hero Section */}
          <section className={styles.heroSection}>
            <h1 className={styles.heroTitle}>
              Vardhman Gupta
            </h1>

            <p className={styles.heroHeadline}>
              AI Engineer
            </p>

            {/* Action Buttons */}
            <div className={styles.heroActionsContainer}>
              <div className={styles.heroActionRow}>
                <Link to="/opensource" className={styles.primaryHeroLink}>
                  <GitPullRequest size={15} />
                  <span>Open Source</span>
                  <ArrowRight size={15} />
                </Link>

                <Link to="/projects" className={styles.heroLink}>
                  <Code2 size={15} style={{ color: '#38BDF8' }} />
                  <span>Projects</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className={styles.heroActionRow}>
                <Link to="/" className={styles.heroLink}>
                  <Terminal size={15} style={{ color: '#22C55E' }} />
                  <span>Terminal</span>
                  <ArrowRight size={14} />
                </Link>

                <Link to="/blogs/intro" className={styles.heroLink}>
                  <BookOpen size={15} style={{ color: '#3B82F6' }} />
                  <span>Blogs</span>
                  <ArrowRight size={14} />
                </Link>

                <Link to="/workspace" className={styles.heroLink}>
                  <Layers size={15} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                  <span>DevWorkspace</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Command Palette Exploration Hint */}
            <div 
              className={styles.paletteHintRow}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('commandPalette:open'));
                }
              }}
              title="Open Command Palette (Ctrl+K)"
            >
              <span>Finding difficult to explore? Hit </span>
              <kbd className={styles.hintKbd}>Ctrl+K</kbd>
            </div>
          </section>

          {/* PicadoLabs Core Ecosystem Showcase & Contributions Feed */}
          <section className={styles.githubSection}>
            <PicadoLabsShowcase />
            <ContributionsFeed limit={5} showViewAll={true} />
          </section>

          {/* Typographic Footer Branding */}
          <footer className={styles.footerBranding}>
            {/* Option 1: Vardhman (Active) */}
            <div className={styles.wordmarkContainer}>
              <span className={styles.outlineText}>Vardh</span>
              <span className={styles.solidTextWrap}>
                <span className={styles.accentTriangle} aria-hidden="true" />
                <span className={styles.solidText}>man</span>
              </span>
            </div>

            {/* Option 2: Kap10 (Commented out for comparison)
            <div className={styles.wordmarkContainer}>
              <span className={styles.outlineText}>Kap</span>
              <span className={styles.solidTextWrap}>
                <span className={styles.accentTriangle} aria-hidden="true" />
                <span className={styles.solidText}>10</span>
              </span>
            </div>
            */}
          </footer>
        </div>
      </main>
    </Layout>
  );
}
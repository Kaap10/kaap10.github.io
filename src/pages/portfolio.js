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
import ExperienceSection from '@site/src/components/ExperienceSection';

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
              {/* Row 1: Picado Labs | Open Source */}
              <div className={styles.heroActionRow}>
                <Link to="/opensource/picadolabs" className={styles.picadoHeroLink}>
                  <div className={styles.picadoLogoWrap}>
                    <img 
                      src="/img/picadolabs.png" 
                      alt="" 
                      width={17} 
                      height={17} 
                      style={{ borderRadius: 3, objectFit: 'contain' }} 
                    />
                  </div>
                  <span className={styles.picadoText}>Picado Labs</span>
                  <span className={styles.picadoBadge}>5.3k+</span>
                  <ArrowRight size={14} className={styles.picadoArrow} />
                </Link>

                <Link to="/opensource" className={styles.primaryHeroLink}>
                  <GitPullRequest size={15} />
                  <span>Open Source</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Row 2: Projects | Blogs | Terminal */}
              <div className={styles.heroActionRow}>
                <Link to="/projects" className={styles.heroLink}>
                  <Code2 size={15} style={{ color: '#38BDF8' }} />
                  <span>Projects</span>
                  <ArrowRight size={14} />
                </Link>

                <Link to="/blogs/intro" className={styles.heroLink}>
                  <BookOpen size={15} style={{ color: '#3B82F6' }} />
                  <span>Blogs</span>
                  <ArrowRight size={14} />
                </Link>

                <Link to="/" className={styles.heroLink}>
                  <Terminal size={15} style={{ color: '#22C55E' }} />
                  <span>Terminal</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Row 3: DevworkSpace */}
              <div className={styles.heroActionRow}>
                <Link to="/workspace" className={styles.heroLink}>
                  <Layers size={15} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                  <span>DevworkSpace</span>
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

          {/* Work Experience Section */}
          <section className={styles.githubSection}>
            <ExperienceSection />
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

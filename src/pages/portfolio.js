import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { 
  ArrowRight, 
  Sparkles, 
  FileText, 
  ArrowUpRight, 
  Layers, 
  BookOpen, 
  Terminal, 
  Code2,
  Clock,
  GitPullRequest
} from 'lucide-react';
import styles from './portfolio.module.css';

export default function PortfolioPage() {
  return (
    <Layout
      title="Portfolio"
      description="Portfolio of Vardhman Gupta — AI Engineer."
    >
      <main className={styles.pageContainer}>
        {/* Ambient Subtle Glow & Grid Backdrop */}
        <div className={styles.bgCanvasWrapper} aria-hidden="true">
          <div className={styles.glowOrb1} />
          <div className={styles.glowOrb2} />
          <div className={styles.gridOverlay} />
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
            <div className={styles.heroActions}>
              <Link to="/projects" className={styles.primaryHeroLink}>
                <Code2 size={15} />
                <span>Explore Projects</span>
                <ArrowRight size={15} />
              </Link>

              <Link to="/workspace" className={styles.heroLink}>
                <Layers size={15} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                <span>Explore DevWorkspace</span>
                <ArrowRight size={14} />
              </Link>

              <Link to="/blogs/intro" className={styles.heroLink}>
                <BookOpen size={15} style={{ color: '#3B82F6' }} />
                <span>Explore Blogs</span>
                <ArrowRight size={14} />
              </Link>

              <Link to="/" className={styles.heroLink}>
                <Terminal size={15} style={{ color: '#22C55E' }} />
                <span>Explore Terminal</span>
                <ArrowRight size={14} />
              </Link>

              <Link to="/tools" className={styles.heroLink}>
                <Sparkles size={15} style={{ color: '#FAAD14' }} />
                <span>Explore Tools</span>
                <ArrowRight size={14} />
              </Link>

              <a 
                href="#" 
                onClick={(e) => e.preventDefault()}
                className={styles.heroLink}
                title="Resume (Connecting soon)"
              >
                <FileText size={15} />
                <span>Resume</span>
                <ArrowUpRight size={14} />
              </a>
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

          {/* Recent Work Section */}
          <section className={styles.recentWorkSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleWrap}>
                <Clock size={16} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                <h2 className={styles.sectionTitle}>Recent Work</h2>
              </div>
              <span className={styles.sectionSubtitle}>Updates &amp; Highlights</span>
            </div>

            {/* Recent Work Entry */}
            <div className={styles.recentWorkContainer}>
              <a
                href="https://github.com/search?q=org%3AApache+is%3Apr+is%3Amerged+author%3AKaap10&type=pullrequests"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.recentWorkCard}
                title="View merged pull requests in Apache Software Foundation"
              >
                <div className={styles.recentWorkLeft}>
                  <div className={styles.recentWorkIconWrap}>
                    <GitPullRequest size={18} />
                  </div>
                  <div className={styles.recentWorkText}>
                    <div className={styles.recentWorkMeta}>
                      <span className={styles.recentWorkBadge}>3 Merged PRs</span>
                      <span className={styles.recentWorkDate}>Apache Software Foundation</span>
                    </div>
                    <p className={styles.recentWorkTitle}>
                      Contributed to <strong className={styles.recentWorkOrg}>Apache/magpie</strong> with 3 merged pull requests.
                    </p>
                  </div>
                </div>

                <div className={styles.recentWorkAction}>
                  <span>View PRs</span>
                  <ArrowUpRight size={15} />
                </div>
              </a>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
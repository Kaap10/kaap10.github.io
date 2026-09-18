import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { 
  ArrowRight,
  ArrowLeft, 
  PenTool, 
  Activity, 
  BookOpen, 
  Command, 
  Wrench,
  Sparkles,
  FileEdit 
} from 'lucide-react';
import styles from './workspace.module.css';
import ParticleCanvas from '@site/src/components/ParticleCanvas';

export default function WorkspacePage() {
  const triggerSpotlight = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'k',
          ctrlKey: true,
          bubbles: true,
        })
      );
    }
  };

  const triggerScratchpad = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('scratchpad:open'));
    }
  };

  return (
    <Layout
      description="Personal developer productivity suite, system design whiteboard, habit tracker, and markdown notepad designed by Vardhman Gupta."
      wrapperClassName="workspace-wrapper"
      noNavbar
      noFooter
    >
      <Head>
        <title>DevWorkspace</title>
      </Head>
      <main className={styles.pageContainer}>
        {/* Ambient Top Glow, Grid & Particle Canvas */}
        <div className={styles.bgGlowWrapper} aria-hidden="true">
          <div className={styles.glowOrb} />
          <div className={styles.gridOverlay} />
          <ParticleCanvas />
        </div>

        <div className={styles.contentWrapper}>
          {/* Header */}
          <header className={styles.pageHeader}>
            <div className={styles.headerTopRow}>
              <Link to="/portfolio" className={styles.portfolioBackBtn} title="Return to Portfolio">
                <ArrowLeft size={14} />
                <span>Portfolio</span>
              </Link>
            </div>
            <h1 className={styles.pageTitle}>DevWorkspace</h1>
            <p className={styles.pageSubtitle}>
              A unified suite of developer productivity tools, architectural design canvases, focus timers, and markdown notepads built to streamline daily engineering workflows.
            </p>
          </header>

          {/* Tools Grid (2 Cards per Row: Row 1 = 2, Row 2 = 2, Row 3 = 1) */}
          <div className={styles.toolsGrid}>
            
            {/* Tool 1: Whiteboard */}
            <article className={styles.toolCard}>
              <div className={styles.cardHeaderArea}>
                <div className={styles.toolTop}>
                  <div className={styles.toolIconTitle}>
                    <div className={styles.toolIconWrap}>
                      <PenTool size={20} />
                    </div>
                    <h2 className={styles.toolTitle}>Whiteboard</h2>
                  </div>
                  <div className={styles.toolBadgeWrap}>
                    <span className={styles.categoryBadge}>System Design</span>
                  </div>
                </div>

                <p className={styles.toolDesc}>
                  Full-fidelity architectural sketching, distributed systems diagramming, and state flow design powered by an embedded Excalidraw vector engine.
                </p>

                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <span className={styles.featureDot}>•</span>
                    <span>
                      <strong className={styles.featureLabel}>Vector Canvas: </strong>
                      System architectures, database schemas &amp; microservices.
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <span className={styles.featureDot}>•</span>
                    <span>
                      <strong className={styles.featureLabel}>Instant Export: </strong>
                      One-click PNG, SVG and clipboard export for RFCs.
                    </span>
                  </li>
                </ul>
              </div>

              <div className={styles.cardBottom}>
                <Link to="/workspace/whiteboard" className={styles.actionBtn}>
                  <PenTool size={14} />
                  <span>Launch Whiteboard</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>

            {/* Tool 2: Tracker */}
            <article className={styles.toolCard}>
              <div className={styles.cardHeaderArea}>
                <div className={styles.toolTop}>
                  <div className={styles.toolIconTitle}>
                    <div className={styles.toolIconWrap}>
                      <Activity size={20} />
                    </div>
                    <h2 className={styles.toolTitle}>Productivity Tracker</h2>
                  </div>
                  <div className={styles.toolBadgeWrap}>
                    <span className={styles.categoryBadge}>Habits &amp; Focus</span>
                  </div>
                </div>

                <p className={styles.toolDesc}>
                  Personal productivity engine backed by Supabase cloud persistence. Integrates deep work focus sessions, prioritized pipelines &amp; habit tracking.
                </p>

                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <span className={styles.featureDot}>•</span>
                    <span>
                      <strong className={styles.featureLabel}>Focus Timer: </strong>
                      Configurable Pomodoro sessions with native PiP mode.
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <span className={styles.featureDot}>•</span>
                    <span>
                      <strong className={styles.featureLabel}>52-Week Heatmap: </strong>
                      Activity consistency and habit streak logs.
                    </span>
                  </li>
                </ul>
              </div>

              <div className={styles.cardBottom}>
                <Link to="/workspace/tracker" className={styles.actionBtn}>
                  <Activity size={14} />
                  <span>Launch Tracker</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>

            {/* Tool 3: Notebook */}
            <article className={styles.toolCard}>
              <div className={styles.cardHeaderArea}>
                <div className={styles.toolTop}>
                  <div className={styles.toolIconTitle}>
                    <div className={styles.toolIconWrap}>
                      <BookOpen size={20} />
                    </div>
                    <h2 className={styles.toolTitle}>Developer Notebook</h2>
                  </div>
                  <div className={styles.toolBadgeWrap}>
                    <span className={styles.categoryBadge}>Markdown Notes</span>
                  </div>
                </div>

                <p className={styles.toolDesc}>
                  A private, distraction-free markdown notepad and snippet manager with multi-notebook hierarchies, instant typing, tag indexing &amp; auto-saving.
                </p>

                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <span className={styles.featureDot}>•</span>
                    <span>
                      <strong className={styles.featureLabel}>Notebook Stacks: </strong>
                      Organize technical notes with tag filtering and favorites.
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <span className={styles.featureDot}>•</span>
                    <span>
                      <strong className={styles.featureLabel}>Fluid Sync: </strong>
                      Local state buffering with Supabase cloud persistence.
                    </span>
                  </li>
                </ul>
              </div>

              <div className={styles.cardBottom}>
                <Link to="/workspace/notebook" className={styles.actionBtn}>
                  <BookOpen size={14} />
                  <span>Launch Notebook</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>

            {/* Tool 4: Quick Scratchpad */}
            <article className={styles.toolCard}>
              <div className={styles.cardHeaderArea}>
                <div className={styles.toolTop}>
                  <div className={styles.toolIconTitle}>
                    <div className={styles.toolIconWrap}>
                      <FileEdit size={20} />
                    </div>
                    <h2 className={styles.toolTitle}>Quick Scratchpad</h2>
                  </div>
                  <div className={styles.toolBadgeWrap}>
                    <span className={styles.categoryBadge}>Floating Drawer</span>
                  </div>
                </div>

                <p className={styles.toolDesc}>
                  A lightweight, zero-latency multi-tab markdown scratchpad drawer for jotting transient thoughts, code snippets, and meeting notes.
                </p>

                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <span className={styles.featureDot}>•</span>
                    <span>
                      <strong className={styles.featureLabel}>Multi-Sheet Tabs: </strong>
                      Manage independent named scratch buffers.
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <span className={styles.featureDot}>•</span>
                    <span>
                      <strong className={styles.featureLabel}>Instant Toggle: </strong>
                      Press <kbd className={styles.keyKbd}>Ctrl+J</kbd> to slide open drawer.
                    </span>
                  </li>
                </ul>
              </div>

              <div className={styles.cardBottom}>
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={triggerScratchpad}
                  title="Open Scratchpad Drawer (Ctrl+J)"
                >
                  <FileEdit size={14} />
                  <span>Launch Scratchpad</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </article>

            {/* Tool 5: Tools & Command Palette (Row 3 - 1 Box) */}
            <article className={styles.toolCard}>
              <div className={styles.cardHeaderArea}>
                <div className={styles.toolTop}>
                  <div className={styles.toolIconTitle}>
                    <div className={styles.toolIconWrap}>
                      <Sparkles size={20} />
                    </div>
                    <h2 className={styles.toolTitle}>Developer Tools Hub</h2>
                  </div>
                  <div className={styles.toolBadgeWrap}>
                    <span className={styles.categoryBadge}>Utilities &amp; Hub</span>
                  </div>
                </div>

                <p className={styles.toolDesc}>
                  Integrated collection of developer utilities, formatters, generators, converters, and quick command palette shortcuts for daily workflows.
                </p>

                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <span className={styles.featureDot}>•</span>
                    <span>
                      <strong className={styles.featureLabel}>Utilities &amp; Formats: </strong>
                      Code, JSON, regex, and encoding helpers.
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <span className={styles.featureDot}>•</span>
                    <span>
                      <strong className={styles.featureLabel}>Command Palette: </strong>
                      Hit <kbd className={styles.keyKbd}>Ctrl+K</kbd> to trigger instant search.
                    </span>
                  </li>
                </ul>
              </div>

              <div className={styles.cardBottom}>
                <Link to="/tools" className={styles.actionBtn}>
                  <Wrench size={14} />
                  <span>Explore Tools</span>
                  <ArrowRight size={14} />
                </Link>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={triggerSpotlight}
                  title="Open Command Palette (Ctrl+K)"
                >
                  <Command size={13} />
                  <span>Ctrl+K</span>
                </button>
              </div>
            </article>

          </div>

          {/* Quick Shortcuts Bar at bottom */}
          <section className={styles.shortcutsCard}>
            <div className={styles.shortcutsHeader}>
              <h3 className={styles.shortcutsTitle}>
                <Command size={16} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                <span>Quick Command Shortcuts</span>
              </h3>
            </div>
            <div className={styles.shortcutsGrid}>
              <button
                type="button"
                className={styles.shortcutItem}
                onClick={triggerSpotlight}
                title="Trigger Command Palette (Ctrl+K)"
              >
                <div className={styles.shortcutLeft}>
                  <Command size={14} className={styles.shortcutIcon} />
                  <span className={styles.shortcutLabel}>Command Palette</span>
                </div>
                <kbd className={styles.keyKbd}>Ctrl + K</kbd>
              </button>

              <Link
                to="/workspace/whiteboard"
                className={styles.shortcutItem}
                title="Launch Whiteboard Canvas"
              >
                <div className={styles.shortcutLeft}>
                  <PenTool size={14} className={styles.shortcutIcon} />
                  <span className={styles.shortcutLabel}>Whiteboard</span>
                </div>
                <kbd className={styles.keyKbd}>/workspace/whiteboard</kbd>
              </Link>

              <Link
                to="/workspace/tracker"
                className={styles.shortcutItem}
                title="Launch Productivity Tracker"
              >
                <div className={styles.shortcutLeft}>
                  <Activity size={14} className={styles.shortcutIcon} />
                  <span className={styles.shortcutLabel}>Tracker</span>
                </div>
                <kbd className={styles.keyKbd}>/workspace/tracker</kbd>
              </Link>

              <Link
                to="/workspace/notebook"
                className={styles.shortcutItem}
                title="Launch Developer Notebook"
              >
                <div className={styles.shortcutLeft}>
                  <BookOpen size={14} className={styles.shortcutIcon} />
                  <span className={styles.shortcutLabel}>Notebook</span>
                </div>
                <kbd className={styles.keyKbd}>/workspace/notebook</kbd>
              </Link>

              <button
                type="button"
                className={styles.shortcutItem}
                onClick={triggerScratchpad}
                title="Launch Quick Scratchpad (Ctrl+J)"
              >
                <div className={styles.shortcutLeft}>
                  <FileEdit size={14} className={styles.shortcutIcon} />
                  <span className={styles.shortcutLabel}>Quick Scratchpad</span>
                </div>
                <kbd className={styles.keyKbd}>Ctrl + J</kbd>
              </button>
            </div>
          </section>

        </div>
      </main>
    </Layout>
  );
}

import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { 
  ArrowRight,
  ArrowLeft, 
  PenTool, 
  Activity, 
  BookOpen, 
  Command,
  Maximize2,
  Clock,
  Layers,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Zap,
  FileEdit
} from 'lucide-react';
import styles from './workspace.module.css';

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
      title="DevWorkspace"
      description="Personal developer productivity suite, system design whiteboard, habit tracker, and markdown notepad designed by Vardhman Gupta."
      wrapperClassName="workspace-wrapper"
      noNavbar
      noFooter
    >
      <main className={styles.pageContainer}>
        {/* Ambient Top Glow */}
        <div className={styles.bgGlowWrapper}>
          <div className={styles.glowOrb} />
        </div>

        <div className={styles.contentWrapper}>
          {/* Header */}
          <header className={styles.pageHeader}>
            <div className={styles.headerTopRow}>
              <Link to="/portfolio" className={styles.portfolioBackBtn} title="Return to Portfolio">
                <ArrowLeft size={14} />
                <span>Portfolio</span>
              </Link>
              <div className={styles.headerEyebrow}>
                <Terminal size={14} />
                <span>Personal Productivity &amp; Systems Suite</span>
              </div>
            </div>
            <h1 className={styles.pageTitle}>DevWorkspace</h1>
            <p className={styles.pageSubtitle}>
              A unified suite of developer productivity tools, architectural design canvases, focus timers, and markdown notepads built to streamline daily engineering workflows.
            </p>

            <div className={styles.suiteStatsBar}>
              <div className={`${styles.statPill} ${styles.statPillActive}`}>
                <span className={styles.statPillDot} />
                <span>Whiteboard Canvas</span>
              </div>
              <div className={`${styles.statPill} ${styles.statPillActive}`}>
                <span className={styles.statPillDot} />
                <span>Productivity Tracker</span>
              </div>
              <div className={`${styles.statPill} ${styles.statPillActive}`}>
                <span className={styles.statPillDot} />
                <span>Developer Notebook</span>
              </div>
              <div className={`${styles.statPill} ${styles.statPillActive}`}>
                <span className={styles.statPillDot} />
                <span>Quick Scratchpad</span>
              </div>
              <div className={styles.statPill}>
                <Zap size={12} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                <span>Supabase Cloud Sync</span>
              </div>
            </div>
          </header>

          {/* Tools Grid */}
          <div className={styles.toolsGrid}>
            
            {/* Tool 1: Whiteboard */}
            <article className={styles.toolCard}>
              <div className={styles.toolTop}>
                <div className={styles.toolIconTitle}>
                  <div className={styles.toolIconWrap}>
                    <PenTool size={20} />
                  </div>
                  <h2 className={styles.toolTitle}>Whiteboard</h2>
                </div>
                <div className={styles.toolBadgeWrap}>
                  <span className={styles.categoryBadge}>System Design</span>
                  <span className={styles.shortcutBadge}>/workspace/whiteboard</span>
                </div>
              </div>

              <p className={styles.toolDesc}>
                Full-fidelity architectural sketching, distributed systems diagramming, and state flow design powered by an embedded Excalidraw vector engine.
              </p>

              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>
                    <strong className={styles.featureLabel}>Infinite Vector Canvas: </strong>
                    Draw system architectures, database schemas, and microservice workflows with hand-drawn aesthetic.
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>
                    <strong className={styles.featureLabel}>Instant Diagram Export: </strong>
                    One-click PNG, SVG, and clipboard export for engineering RFCs, documentation, and pull requests.
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>
                    <strong className={styles.featureLabel}>Platform Theme Sync: </strong>
                    Integrated dark/light theme awareness matching the developer workspace color palette.
                  </span>
                </li>
              </ul>

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
              <div className={styles.toolTop}>
                <div className={styles.toolIconTitle}>
                  <div className={styles.toolIconWrap}>
                    <Activity size={20} />
                  </div>
                  <h2 className={styles.toolTitle}>Productivity Tracker</h2>
                </div>
                <div className={styles.toolBadgeWrap}>
                  <span className={styles.categoryBadge}>Productivity &amp; Habits</span>
                  <span className={styles.shortcutBadge}>/workspace/tracker</span>
                </div>
              </div>

              <p className={styles.toolDesc}>
                Personal developer productivity engine backed by Supabase cloud persistence with local fallback caching. Integrates deep work focus sessions, prioritized task pipelines, and atomic habit tracking.
              </p>

              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>
                    <strong className={styles.featureLabel}>Zero-Drift Focus Timer: </strong>
                    Configurable Pomodoro sessions with native Picture-in-Picture (PiP) mini-capsule and ambient white noise.
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>
                    <strong className={styles.featureLabel}>5-Pillar Productivity: </strong>
                    Prioritized task management, atomic habit consistency streaks, milestone tracking, and weekly reviews.
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>
                    <strong className={styles.featureLabel}>52-Week Heatmap: </strong>
                    GitHub-style contribution graph and retrospective accomplishment logger with category breakdowns.
                  </span>
                </li>
              </ul>

              <div className={styles.cardBottom}>
                <Link to="/workspace/tracker" className={styles.actionBtn}>
                  <Activity size={14} />
                  <span>Launch Tracker</span>
                  <ArrowRight size={14} />
                </Link>
                <Link to="/workspace/tracker?tab=focus" className={styles.secondaryBtn}>
                  <Clock size={14} />
                  <span>Focus Pomodoro</span>
                </Link>
                <Link to="/workspace/tracker?tab=habits" className={styles.secondaryBtn}>
                  <CheckCircle2 size={14} />
                  <span>Habits</span>
                </Link>
              </div>
            </article>

            {/* Tool 3: Notebook */}
            <article className={styles.toolCard}>
              <div className={styles.toolTop}>
                <div className={styles.toolIconTitle}>
                  <div className={styles.toolIconWrap}>
                    <BookOpen size={20} />
                  </div>
                  <h2 className={styles.toolTitle}>Developer Notebook</h2>
                </div>
                <div className={styles.toolBadgeWrap}>
                  <span className={styles.categoryBadge}>Developer Notes</span>
                  <span className={styles.shortcutBadge}>/workspace/notebook</span>
                </div>
              </div>

              <p className={styles.toolDesc}>
                A private, distraction-free markdown notepad and snippet manager with multi-notebook hierarchies, instant typing, tag indexing, auto-saving, and quick export.
              </p>

              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>
                    <strong className={styles.featureLabel}>Multi-Notebook Hierarchy: </strong>
                    Organize technical notes into dedicated stacks with quick pin, favorite, and tag filtering.
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>
                    <strong className={styles.featureLabel}>Fluid Zero-Lag Engine: </strong>
                    Instant local state buffering with non-blocking Supabase cloud persistence and offline fallback.
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>
                    <strong className={styles.featureLabel}>Markdown &amp; Quick Export: </strong>
                    Full markdown support with instant clipboard copy, markdown file downloads, and keyword search.
                  </span>
                </li>
              </ul>

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
              <div className={styles.toolTop}>
                <div className={styles.toolIconTitle}>
                  <div className={styles.toolIconWrap}>
                    <FileEdit size={20} />
                  </div>
                  <h2 className={styles.toolTitle}>Quick Scratchpad</h2>
                </div>
                <div className={styles.toolBadgeWrap}>
                  <span className={styles.categoryBadge}>Floating Notes &amp; Snips</span>
                  <span className={styles.shortcutBadge}>Ctrl + J / Cmd + J</span>
                </div>
              </div>

              <p className={styles.toolDesc}>
                A lightweight, zero-latency multi-tab markdown scratchpad drawer for jotting down transient thoughts, code snippets, system ideas, and meeting notes without losing your active workspace context.
              </p>

              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>
                    <strong className={styles.featureLabel}>Multi-Sheet Tabs: </strong>
                    Create and manage independent named scratch sheets with individual markdown buffers.
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>
                    <strong className={styles.featureLabel}>Instant Keyboard Toggle: </strong>
                    Press <kbd className={styles.keyKbd} style={{ fontSize: '0.72rem', padding: '0.1rem 0.35rem' }}>Ctrl+J</kbd> or click the launcher in the bottom right to slide open the persistent drawer.
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>
                    <strong className={styles.featureLabel}>Browser Storage &amp; Export: </strong>
                    Real-time local storage caching with one-click markdown (.md) download and clipboard copy.
                  </span>
                </li>
              </ul>

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

          </div>

          {/* Quick Shortcuts Card */}
          <section className={styles.shortcutsCard}>
            <div className={styles.shortcutsHeader}>
              <h3 className={styles.shortcutsTitle}>
                <Command size={16} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                <span>Workspace Shortcuts &amp; Commands</span>
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


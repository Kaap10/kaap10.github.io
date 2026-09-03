import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { 
  ArrowRight, 
  PenTool, 
  Activity, 
  FileText, 
  Search, 
  Sparkles,
  Command,
  Maximize2
} from 'lucide-react';
import styles from './tools.module.css';

export default function ToolsPage() {
  const triggerScratchpad = () => {
    window.dispatchEvent(new CustomEvent('scratchpad:toggle'));
  };

  const triggerSpotlight = () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'h',
        ctrlKey: true,
        bubbles: true,
      })
    );
  };

  return (
    <Layout
      title="Engineering Tools & Living Workstation"
      description="Integrated productivity suite, whiteboard, markdown scratchpad, and spotlight search designed by Vardhman Gupta."
    >
      <main className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          
          {/* Header */}
          <header className={styles.pageHeader}>
            <span className={styles.headerEyebrow}>Living Workstation</span>
            <h1 className={styles.pageTitle}>Engineering Tools</h1>
            <p className={styles.pageSubtitle}>
              A cohesive suite of personal productivity tools, architectural design canvases, floating scratchpads, and keyboard-first command palettes.
            </p>
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
                <span className={styles.shortcutBadge}>/board</span>
              </div>

              <p className={styles.toolDesc}>
                Full-fidelity architectural sketching and design whiteboard powered by Excalidraw. Embedded directly into the workspace for diagramming distributed systems, database schema relationships, and algorithmic flows.
              </p>

              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>Infinite vector drawing canvas with hand-drawn aesthetic</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>Instant PNG, SVG, and clipboard export for system documentation</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>Dark/light theme awareness matching the platform design</span>
                </li>
              </ul>

              <div className={styles.cardBottom}>
                <Link to="/board" className={styles.actionBtn}>
                  <span>Launch Whiteboard</span>
                  <ArrowRight size={15} />
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
                  <h2 className={styles.toolTitle}>Tracker</h2>
                </div>
                <span className={styles.shortcutBadge}>/tracker</span>
              </div>

              <p className={styles.toolDesc}>
                A consolidated 5-pillar productivity suite backed by Supabase with local fallback caching. Features prioritized task management, atomic habit consistency tracking, retrospective activity logging, and deep work focus sessions.
              </p>

              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>Zero-drift Pomodoro Focus timer with native Picture-in-Picture (PiP) capsule</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>Retrospective Done Logger with categorized daily accomplishment tracking</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>52-Week GitHub-style activity contribution heatmap</span>
                </li>
              </ul>

              <div className={styles.cardBottom}>
                <Link to="/tracker" className={styles.actionBtn}>
                  <span>Launch Tracker</span>
                  <ArrowRight size={15} />
                </Link>
                <Link to="/tracker?tab=focus" className={styles.secondaryBtn}>
                  <span>Open Focus Timer</span>
                </Link>
              </div>
            </article>

            {/* Tool 3: Floating Quick Scratchpad */}
            <article className={styles.toolCard}>
              <div className={styles.toolTop}>
                <div className={styles.toolIconTitle}>
                  <div className={styles.toolIconWrap}>
                    <FileText size={20} />
                  </div>
                  <h2 className={styles.toolTitle}>Floating Quick Scratchpad</h2>
                </div>
                <span className={styles.shortcutBadge}>Ctrl + J / Cmd + J</span>
              </div>

              <p className={styles.toolDesc}>
                A global slide-over markdown notepad accessible across every route on the site. Jot down quick thoughts, code snippets, or system architecture ideas while reading blogs without leaving the page.
              </p>

              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>Multi-sheet tab organization with automatic browser local storage persistence</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>1-click live Markdown preview mode with syntax highlighted code blocks</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>Direct 1-click clipboard copy and .md file download export</span>
                </li>
              </ul>

              <div className={styles.cardBottom}>
                <button type="button" onClick={triggerScratchpad} className={styles.actionBtn}>
                  <span>Try Scratchpad Now</span>
                  <ArrowRight size={15} />
                </button>
                <span className={styles.shortcutHint}>
                  Shortcut: <kbd className={styles.shortcutBadge}>Ctrl+J</kbd>
                </span>
              </div>
            </article>

            {/* Tool 4: Global Spotlight & Command Palette */}
            <article className={styles.toolCard}>
              <div className={styles.toolTop}>
                <div className={styles.toolIconTitle}>
                  <div className={styles.toolIconWrap}>
                    <Command size={20} />
                  </div>
                  <h2 className={styles.toolTitle}>Spotlight Command Palette</h2>
                </div>
                <span className={styles.shortcutBadge}>Ctrl + H / Cmd + H</span>
              </div>

              <p className={styles.toolDesc}>
                A keyboard-first Raycast/Linear-style command palette to navigate anywhere instantly. Jump between wiki blogs, start 25m/50m Pomodoro sessions, trigger Done logs, or toggle developer utilities in 0ms.
              </p>

              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>Instant page routing across Home, Blogs, Projects, Board, and Tracker views</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>Direct execution actions: launch Pomodoro timers, float PiP capsule, or log daily entries</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureDot}>•</span>
                  <span>Full keyboard navigation with arrow keys, Enter, and Esc dismissal</span>
                </li>
              </ul>

              <div className={styles.cardBottom}>
                <button type="button" onClick={triggerSpotlight} className={styles.actionBtn}>
                  <span>Open Spotlight Search</span>
                  <ArrowRight size={15} />
                </button>
                <span className={styles.shortcutHint}>
                  Shortcut: <kbd className={styles.shortcutBadge}>Ctrl+H</kbd>
                </span>
              </div>
            </article>

          </div>

        </div>
      </main>
    </Layout>
  );
}
import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Search, 
  GitPullRequest, 
  CheckCircle2, 
  CircleDot, 
  XCircle,
  Clock
} from 'lucide-react';
import initialData from '@site/src/data/contributions.json';
import styles from './contribution.module.css';
import ParticleCanvas from '@site/src/components/ParticleCanvas';

export default function ContributionPage() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'merged' | 'open' | 'closed'
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(initialData.items || []);
  const [totalCount, setTotalCount] = useState(initialData.total || 98);

  // Background fetch to sync latest PRs
  useEffect(() => {
    let isMounted = true;
    const cacheKey = 'gh_prs_feed_v2_Kaap10';

    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < 30 * 60 * 1000 && parsed.items?.length) {
          setItems(parsed.items);
          setTotalCount(parsed.total || parsed.items.length);
          return;
        }
      }
    } catch {
      // ignore
    }

    const fetchLatestPRs = async () => {
      try {
        const res = await fetch(
          'https://api.github.com/search/issues?q=type:pr+author:Kaap10&sort=created&order=desc&per_page=100'
        );
        if (!res.ok) return;
        const data = await res.json();

        if (isMounted && data.items) {
          const freshItems = data.items.map((item) => {
            const repo = (item.repository_url || '').replace('https://api.github.com/repos/', '');
            const isMerged = Boolean(item.pull_request?.merged_at);
            const status = isMerged ? 'merged' : item.state;

            return {
              id: item.id,
              number: item.number,
              title: item.title,
              repo: repo,
              status: status,
              url: item.html_url,
              created_at: (item.created_at || '').slice(0, 10),
              closed_at: (item.closed_at || item.pull_request?.merged_at || '').slice(0, 10) || null,
            };
          });

          setItems(freshItems);
          setTotalCount(data.total_count || freshItems.length);

          try {
            localStorage.setItem(
              cacheKey,
              JSON.stringify({ timestamp: Date.now(), total: data.total_count, items: freshItems })
            );
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.error('Failed to sync PRs on contribution page:', err);
      }
    };

    fetchLatestPRs();

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute status counts
  const stats = useMemo(() => {
    let merged = 0;
    let open = 0;
    let closed = 0;

    items.forEach((item) => {
      if (item.status === 'merged') merged += 1;
      else if (item.status === 'open') open += 1;
      else if (item.status === 'closed') closed += 1;
    });

    return {
      total: items.length,
      merged: merged || 87,
      open: open || 5,
      closed: closed || 6,
    };
  }, [items]);

  // Filter, search and sort latest to oldest
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = items.filter((item) => {
      // Status filter
      if (activeTab === 'merged' && item.status !== 'merged') return false;
      if (activeTab === 'open' && item.status !== 'open') return false;
      if (activeTab === 'closed' && item.status !== 'closed') return false;

      // Text query
      if (query) {
        const matchesTitle = item.title?.toLowerCase().includes(query);
        const matchesRepo = item.repo?.toLowerCase().includes(query);
        const matchesNumber = String(item.number).includes(query);
        return matchesTitle || matchesRepo || matchesNumber;
      }

      return true;
    });

    return [...list].sort((a, b) => {
      const dateA = new Date(a.closed_at || a.created_at || 0).getTime();
      const dateB = new Date(b.closed_at || b.created_at || 0).getTime();
      if (dateB !== dateA) return dateB - dateA;
      return (b.id || 0) - (a.id || 0);
    });
  }, [items, activeTab, searchQuery]);

  return (
    <Layout
      title="All Contributions"
      description="Full archive of open source contributions, merged PRs, and software patches by Vardhman Gupta."
      noFooter
    >
      <main className={styles.pageContainer}>
        {/* Particle Backdrop & Glow */}
        <div className={styles.bgGlowWrapper} aria-hidden="true">
          <div className={styles.glowOrb} />
          <ParticleCanvas />
        </div>

        <div className={styles.contentWrapper}>
          {/* Header */}
          <header className={styles.pageHeader}>
            <Link to="/opensource" className={styles.backLink}>
              <ArrowLeft size={14} />
              <span>Back to Open Source</span>
            </Link>

            <h1 className={styles.pageTitle}>All Contributions</h1>
            <p className={styles.pageSubtitle}>
              Real-time log of pull requests, engine patches, architecture extensions, and features authored across the open source landscape.
            </p>

            {/* Stats Summary Cards */}
            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <span className={`${styles.statNumber} ${styles.statTotal}`}>{stats.total}</span>
                <span className={styles.statLabel}>Total PRs</span>
              </div>
              <div className={styles.statCard}>
                <span className={`${styles.statNumber} ${styles.statMerged}`}>{stats.merged}</span>
                <span className={styles.statLabel}>Merged</span>
              </div>
              <div className={styles.statCard}>
                <span className={`${styles.statNumber} ${styles.statOpen}`}>{stats.open}</span>
                <span className={styles.statLabel}>Open</span>
              </div>
              <div className={styles.statCard}>
                <span className={`${styles.statNumber} ${styles.statClosed}`}>{stats.closed}</span>
                <span className={styles.statLabel}>Closed</span>
              </div>
            </div>
          </header>

          {/* Interactive Toolbar */}
          <div className={styles.toolbar}>
            {/* Search Input */}
            <div className={styles.searchWrap}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search PR title, repository, #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Tabs */}
            <div className={styles.tabsGroup}>
              <button
                type="button"
                className={`${styles.tabButton} ${activeTab === 'all' ? styles.tabButtonActive : ''}`}
                onClick={() => setActiveTab('all')}
              >
                <span>All</span>
                <span className={styles.tabBadge}>{stats.total}</span>
              </button>
              <button
                type="button"
                className={`${styles.tabButton} ${activeTab === 'merged' ? styles.tabButtonActive : ''}`}
                onClick={() => setActiveTab('merged')}
              >
                <span>Merged</span>
                <span className={styles.tabBadge}>{stats.merged}</span>
              </button>
              <button
                type="button"
                className={`${styles.tabButton} ${activeTab === 'open' ? styles.tabButtonActive : ''}`}
                onClick={() => setActiveTab('open')}
              >
                <span>Open</span>
                <span className={styles.tabBadge}>{stats.open}</span>
              </button>
              <button
                type="button"
                className={`${styles.tabButton} ${activeTab === 'closed' ? styles.tabButtonActive : ''}`}
                onClick={() => setActiveTab('closed')}
              >
                <span>Closed</span>
                <span className={styles.tabBadge}>{stats.closed}</span>
              </button>
            </div>
          </div>

          {/* PR List */}
          <div className={styles.prList}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <a
                  key={item.id || item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.prCard}
                >
                  <div className={styles.prMain}>
                    <div className={styles.statusIndicator}>
                      <span
                        className={`${styles.statusDot} ${
                          item.status === 'merged'
                            ? styles.statusMerged
                            : item.status === 'open'
                            ? styles.statusOpen
                            : styles.statusClosed
                        }`}
                      />
                    </div>

                    <div className={styles.prDetails}>
                      <span className={styles.prTitle}>{item.title}</span>
                      <div className={styles.prMeta}>
                        <span className={styles.repoTag}>{item.repo}</span>
                        {item.number && <span className={styles.prNumber}>#{item.number}</span>}
                        {item.created_at && (
                          <span className={styles.prDate}>
                            {item.created_at}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.prAction}>
                    <ArrowUpRight size={17} />
                  </div>
                </a>
              ))
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyTitle}>No matching contributions found</span>
                <span className={styles.emptySubtitle}>
                  Try adjusting your search query or switching tabs.
                </span>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}


import React, { useState, useEffect, useMemo } from 'react';
import Link from '@docusaurus/Link';
import { ArrowRight, ArrowUpRight, GitPullRequest, CheckCircle2, CircleDot, XCircle } from 'lucide-react';
import initialData from '@site/src/data/contributions.json';
import styles from './styles.module.css';

export default function ContributionsFeed({ limit = 5, showViewAll = true }) {
  const [activeTab, setActiveTab] = useState('merged'); // 'merged' | 'open' | 'closed'
  const [items, setItems] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('gh_prs_feed_v2_Kaap10');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < 30 * 60 * 1000 && parsed.items?.length) {
            return parsed.items;
          }
        }
      } catch {}
    }
    return initialData.items || [];
  });
  const [totalCount, setTotalCount] = useState(initialData.total || 98);

  // Defer background fetch to background idle time so it never competes with initial render
  useEffect(() => {
    let isMounted = true;
    const cacheKey = 'gh_prs_feed_v2_Kaap10';

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
        console.error('Failed to sync PRs feed:', err);
      }
    };

    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(() => fetchLatestPRs());
      } else {
        fetchLatestPRs();
      }
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const filteredItems = useMemo(() => {
    const list = items.filter((item) => {
      if (activeTab === 'merged') return item.status === 'merged';
      if (activeTab === 'open') return item.status === 'open';
      if (activeTab === 'closed') return item.status === 'closed';
      return true;
    });

    // Sort strictly from latest to oldest
    return [...list].sort((a, b) => {
      const dateA = new Date(a.closed_at || a.created_at || 0).getTime();
      const dateB = new Date(b.closed_at || b.created_at || 0).getTime();
      if (dateB !== dateA) return dateB - dateA;
      return (b.id || 0) - (a.id || 0);
    });
  }, [items, activeTab]);

  const displayedItems = filteredItems.slice(0, limit);
  const remainingCount = Math.max(0, filteredItems.length - limit);

  return (
    <div className={styles.container}>
      {/* Header with Title & Status Tabs */}
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>
            Open Source <span className={styles.highlightBlue}>Contributions</span>
          </h2>
        </div>

        {/* Tab Controls (Merged, Open, Closed) */}
        <div className={styles.tabsWrapper}>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'merged' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('merged')}
          >
            Merged
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'open' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('open')}
          >
            Open
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'closed' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('closed')}
          >
            Closed
          </button>
        </div>
      </div>

      {/* Contributions List */}
      <div className={styles.list}>
        {displayedItems.length > 0 ? (
          displayedItems.map((item) => (
            <a
              key={item.id || item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.itemRow}
            >
              <div className={styles.bulletCol}>
                <span
                  className={`${styles.bulletDot} ${
                    item.status === 'merged'
                      ? styles.bulletMerged
                      : item.status === 'open'
                      ? styles.bulletOpen
                      : styles.bulletClosed
                  }`}
                />
              </div>

              <div className={styles.contentCol}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemRepo}>{item.repo}</span>
              </div>
            </a>
          ))
        ) : (
          <div className={styles.emptyState}>
            <span>No {activeTab} pull requests found.</span>
          </div>
        )}
      </div>

      {/* View All Button */}
      {showViewAll && (
        <div className={styles.footer}>
          <Link to="/contribution" className={styles.viewAllBtn}>
            <span>View All ({remainingCount > 0 ? `${remainingCount}+ more` : 'Contributions'})</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}


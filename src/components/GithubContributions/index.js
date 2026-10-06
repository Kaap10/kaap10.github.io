import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { ArrowUpRight, ArrowRight, GitPullRequest, Layers, ShieldCheck, Cpu, Box, Wind } from 'lucide-react';
import styles from './styles.module.css';

// Project registry with static baseline counts and metadata
const PROJECTS_CONFIG = [
  {
    id: 'magpie',
    name: 'Apache Magpie',
    org: 'Apache Software Foundation',
    repoMatcher: (repo) => repo.toLowerCase().includes('magpie'),
    defaultCount: 15,
    description: 'Cloud security posture & automated compliance discovery framework.',
    logoType: 'img',
    logoSrc: '/img/apachelogo.png',
    searchQuery: 'repo:apache/magpie is:pr is:merged author:Kaap10',
    deepDiveUrl: '/opensource/magpie',
  },
  {
    id: 'pyrit',
    name: 'Microsoft PyRIT',
    org: 'Microsoft',
    repoMatcher: (repo) => repo.toLowerCase().includes('pyrit'),
    defaultCount: 8,
    description: 'Python Risk Identification Tool for AI security & red-teaming.',
    logoType: 'img',
    logoSrc: '/img/mslogo.png',
    searchQuery: 'repo:microsoft/PyRIT is:pr is:merged author:Kaap10',
    deepDiveUrl: '/opensource/pyrit',
  },
  {
    id: 'dynavec',
    name: 'DynaVec',
    org: 'codeforstartups',
    repoMatcher: (repo) => repo.toLowerCase().includes('dynavec'),
    defaultCount: 18,
    description: 'High-dimensional vector engine & indexing architecture.',
    logoType: 'icon',
    icon: Cpu,
    searchQuery: 'repo:codeforstartups/dynavec is:pr is:merged author:Kaap10',
    deepDiveUrl: '/opensource/dynavec',
  },
  {
    id: 'picadolabs',
    name: 'Picado Labs',
    org: 'PicadoLabs Projects',
    repoMatcher: (repo) => repo.toLowerCase().startsWith('picadolabs/'),
    defaultCount: 18,
    description: 'Autonomous AI orchestration & model routing architectures.',
    logoType: 'img',
    logoSrc: '/img/picadolabs.png',
    searchQuery: 'org:PicadoLabs is:pr is:merged author:Kaap10',
    deepDiveUrl: '/opensource/picadolabs',
  },
  {
    id: 'airflow',
    name: 'Apache Airflow',
    org: 'Apache Software Foundation',
    repoMatcher: (repo) => repo.toLowerCase().includes('airflow'),
    defaultCount: 1,
    description: 'Workflow orchestration platform & distributed data processing.',
    logoType: 'img',
    logoSrc: '/img/apachelogo.png',
    searchQuery: 'repo:apache/airflow is:pr is:merged author:Kaap10',
    deepDiveUrl: 'https://github.com/search?q=repo%3Aapache%2Fairflow+is%3Apr+is%3Amerged+author%3AKaap10&type=pullrequests',
    isExternalDeepDive: true,
  },
];

export default function GithubContributions({ username = 'Kaap10' }) {
  const [counts, setCounts] = useState(() => {
    const initial = { total: 87 };
    PROJECTS_CONFIG.forEach((p) => {
      initial[p.id] = p.defaultCount;
    });
    return initial;
  });

  useEffect(() => {
    let isMounted = true;
    const cacheKey = `gh_org_counts_v1_${username}`;

    const fetchLiveCounts = async () => {
      // 1. Try localStorage cache (valid for 30 minutes)
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < 30 * 60 * 1000) {
            setCounts(parsed.counts);
            return;
          }
        }
      } catch {
        // ignore
      }

      // 2. Fetch all merged PRs for Kaap10
      try {
        const res = await fetch(
          `https://api.github.com/search/issues?q=type:pr+author:${username}+is:merged&per_page=100`
        );
        if (!res.ok) return;
        const data = await res.json();

        if (isMounted && data.items) {
          const newCounts = { total: data.total_count || 87 };

          // Reset project counters
          PROJECTS_CONFIG.forEach((p) => {
            newCounts[p.id] = 0;
          });

          // Aggregate per project matcher
          data.items.forEach((item) => {
            let repoPath = '';
            if (item.repository_url) {
              repoPath = item.repository_url.replace('https://api.github.com/repos/', '');
            } else if (item.html_url) {
              const parts = item.html_url.split('/');
              if (parts.length >= 5) {
                repoPath = `${parts[3]}/${parts[4]}`;
              }
            }

            PROJECTS_CONFIG.forEach((p) => {
              if (p.repoMatcher(repoPath)) {
                newCounts[p.id] = (newCounts[p.id] || 0) + 1;
              }
            });
          });

          // Fill with default baseline if query per_page truncated
          PROJECTS_CONFIG.forEach((p) => {
            if (!newCounts[p.id] || newCounts[p.id] === 0) {
              newCounts[p.id] = p.defaultCount;
            }
          });

          setCounts(newCounts);

          try {
            localStorage.setItem(
              cacheKey,
              JSON.stringify({ timestamp: Date.now(), counts: newCounts })
            );
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.error('Failed to fetch org PR counts:', err);
      }
    };

    fetchLiveCounts();
    return () => {
      isMounted = false;
    };
  }, [username]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Open Source Contributions</h2>
        <span className={styles.statsBadge}>
          <strong className={styles.highlightCount}>{counts.total}+</strong> Merged Pull Requests
        </span>
      </div>

      {/* Grid of Concise Project Cards */}
      <div className={styles.grid}>
        {PROJECTS_CONFIG.map((project) => {
          const prCount = counts[project.id] || project.defaultCount;
          const ghSearchUrl = `https://github.com/search?q=${encodeURIComponent(project.searchQuery)}&type=pullrequests`;

          return (
            <div key={project.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.projectInfo}>
                  <div className={styles.logoWrap}>
                    {project.logoType === 'img' ? (
                      <img src={project.logoSrc} alt="" className={styles.logoImg} />
                    ) : (
                      <project.icon size={17} className={styles.logoIcon} />
                    )}
                  </div>

                  <div className={styles.titleArea}>
                    <span className={styles.projectName}>{project.name}</span>
                    <span className={styles.orgName}>{project.org}</span>
                  </div>
                </div>

                <span className={styles.prBadge}>
                  {prCount} Merged {prCount === 1 ? 'PR' : 'PRs'}
                </span>
              </div>

              <p className={styles.description}>{project.description}</p>

              <div className={styles.actions}>
                <a
                  href={ghSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.prLink}
                  title={`View merged PRs in ${project.name}`}
                >
                  <GitPullRequest size={13} style={{ color: '#A855F7' }} />
                  <span>View PRs</span>
                  <ArrowUpRight size={13} />
                </a>

                {project.isExternalDeepDive ? (
                  <a
                    href={project.deepDiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.deepDiveLink}
                  >
                    <span>Overview</span>
                    <ArrowUpRight size={13} />
                  </a>
                ) : (
                  <Link to={project.deepDiveUrl} className={styles.deepDiveLink}>
                    <span>Deep Dive</span>
                    <ArrowRight size={13} />
                  </Link>
                )}
              </div>
            </div>
          );
        })}

        {/* Global Link to All OSS Contributions */}
        <div className={styles.allContributionsCard}>
          <div className={styles.allLeft}>
            <GitPullRequest size={18} style={{ color: '#A855F7' }} />
            <span className={styles.allText}>
              Explore contributions to <strong>Palinode</strong>, <strong>Layer5</strong>, <strong>SQLite Graph Memory</strong> &amp; more.
            </span>
          </div>

          <Link to="/opensource" className={styles.exploreBtn}>
            <span>All OSS Projects</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

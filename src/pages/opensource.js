import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
  ArrowRight,
  ArrowUpRight,
  GitPullRequest,
  Package,
  Layers,
  Database,
  Cpu,
  Boxes
} from 'lucide-react';
import styles from './opensource.module.css';
import ParticleCanvas from '@site/src/components/ParticleCanvas';

const OSS_PROJECTS = [
  {
    id: 'picadolabs',
    name: 'PicadoLabs',
    org: 'PicadoLabs Projects',
    role: 'Owner & Maintainer',
    roleType: 'owner',
    repoMatcher: (repo) => repo.toLowerCase().startsWith('picadolabs/'),
    defaultPRCount: 18,
    logoType: 'img',
    logoSrc: '/img/picadolabs.png',
    description: 'Autonomous AI orchestration, dynamic model routing architectures, and production developer agent systems.',
    deepDiveUrl: '/opensource/picadolabs',
    githubUrl: 'https://github.com/search?q=org%3APicadoLabs+is%3Apr+is%3Amerged+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'magpie',
    name: 'Apache Magpie',
    org: 'Apache Software Foundation',
    role: 'Contributor',
    roleType: 'contributor',
    repoMatcher: (repo) => repo.toLowerCase().includes('magpie'),
    defaultPRCount: 15,
    logoType: 'img',
    logoSrc: '/img/apachelogo.png',
    description: 'Cloud security posture management & automated compliance discovery framework for enterprise footprints.',
    deepDiveUrl: '/opensource/magpie',
    githubUrl: 'https://github.com/search?q=repo%3Aapache%2Fmagpie+is%3Apr+is%3Amerged+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'pyrit',
    name: 'Microsoft PyRIT',
    org: 'Microsoft AI Red Team',
    role: 'Contributor',
    roleType: 'contributor',
    repoMatcher: (repo) => repo.toLowerCase().includes('pyrit'),
    defaultPRCount: 8,
    logoType: 'img',
    logoSrc: '/img/mslogo.png',
    description: 'Python Risk Identification Tool for Generative AI security, automated jailbreak detection, and vulnerability testing.',
    deepDiveUrl: '/opensource/pyrit',
    githubUrl: 'https://github.com/search?q=repo%3Amicrosoft%2FPyRIT+is%3Apr+is%3Amerged+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'dynavec',
    name: 'DynaVec',
    org: 'codeforstartups',
    role: 'Collaborator',
    roleType: 'collaborator',
    repoMatcher: (repo) => repo.toLowerCase().includes('dynavec'),
    defaultPRCount: 18,
    logoType: 'icon',
    icon: Cpu,
    description: 'High-dimensional vector database engine and nearest-neighbor indexing architecture for fast similarity search.',
    deepDiveUrl: '/opensource/dynavec',
    githubUrl: 'https://github.com/search?q=repo%3Acodeforstartups%2Fdynavec+is%3Apr+is%3Amerged+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'layer5io',
    name: 'Layer5 IO',
    org: 'Cloud Native Ecosystem',
    role: 'Contributor',
    roleType: 'contributor',
    repoMatcher: (repo) => repo.toLowerCase().includes('layer5'),
    defaultPRCount: 3,
    logoType: 'img',
    logoSrc: '/img/layer5.png',
    description: 'Service mesh management plane, visual topology orchestration, and interactive learning academy labs.',
    deepDiveUrl: '/opensource/layer5io',
    githubUrl: 'https://github.com/search?q=org%3Alayer5io+is%3Apr+is%3Amerged+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'palinode',
    name: 'Palinode',
    org: 'phasespace-labs',
    role: 'Contributor',
    roleType: 'contributor',
    repoMatcher: (repo) => repo.toLowerCase().includes('palinode'),
    defaultPRCount: 3,
    logoType: 'icon',
    icon: Boxes,
    description: 'Decentralized consensus protocols, state-machine replication engines, and distributed network tooling.',
    deepDiveUrl: '/opensource/palinode',
    githubUrl: 'https://github.com/search?q=repo%3Aphasespace-labs%2Fpalinode+is%3Apr+is%3Amerged+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'sqlite-graph-memory',
    name: 'SQLite Graph Memory',
    org: 'tonydzi',
    role: 'Collaborator',
    roleType: 'collaborator',
    repoMatcher: (repo) => repo.toLowerCase().includes('sqlite-graph-memory'),
    defaultPRCount: 3,
    logoType: 'icon',
    icon: Database,
    description: 'Lightweight embedded graph storage and relational memory retrieval layer built over SQLite for AI agents.',
    deepDiveUrl: '/opensource/sqlite-graph-memory',
    githubUrl: 'https://github.com/search?q=repo%3Atonydzi%2Fsqlite-graph-memory+is%3Apr+is%3Amerged+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'quater',
    name: 'Quater',
    org: 'DevilsAutumn',
    role: 'Contributor',
    roleType: 'contributor',
    repoMatcher: (repo) => repo.toLowerCase().includes('quater'),
    defaultPRCount: 1,
    logoType: 'icon',
    icon: Layers,
    description: 'High-performance asynchronous data manipulation, stream processing, and event ingestion utilities.',
    deepDiveUrl: '/opensource/quater',
    githubUrl: 'https://github.com/search?q=repo%3ADevilsAutumn%2Fquater+is%3Apr+is%3Amerged+author%3AKaap10&type=pullrequests',
  },
  {
    id: 'meshery-extensions',
    name: 'Meshery Extensions',
    org: 'meshery-extensions',
    role: 'Contributor',
    roleType: 'contributor',
    repoMatcher: (repo) => repo.toLowerCase().includes('meshery'),
    defaultPRCount: 1,
    logoType: 'img',
    logoSrc: '/img/layer5.png',
    description: 'Specialized cloud native playground extensions and runtime integrations for Meshery.',
    deepDiveUrl: '/opensource/meshery-extensions',
    githubUrl: 'https://github.com/search?q=org%3Ameshery-extensions+is%3Apr+is%3Amerged+author%3AKaap10&type=pullrequests',
  },
];

export default function OpenSourcePage() {
  const [counts, setCounts] = useState(() => {
    const initial = { total: 87 };
    OSS_PROJECTS.forEach((p) => {
      initial[p.id] = p.defaultPRCount;
    });
    return initial;
  });

  useEffect(() => {
    let isMounted = true;
    const cacheKey = 'gh_org_counts_v1_Kaap10';

    const fetchCounts = async () => {
      // Check cache (30 mins)
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < 30 * 60 * 1000) {
            setCounts((prev) => ({ ...prev, ...parsed.counts }));
            return;
          }
        }
      } catch {
        // ignore
      }

      try {
        const res = await fetch(
          'https://api.github.com/search/issues?q=type:pr+author:Kaap10+is:merged&per_page=100'
        );
        if (!res.ok) return;
        const data = await res.json();

        if (isMounted && data.items) {
          const newCounts = { total: data.total_count || 87 };

          OSS_PROJECTS.forEach((p) => {
            newCounts[p.id] = 0;
          });

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

            OSS_PROJECTS.forEach((p) => {
              if (p.repoMatcher(repoPath)) {
                newCounts[p.id] = (newCounts[p.id] || 0) + 1;
              }
            });
          });

          OSS_PROJECTS.forEach((p) => {
            if (!newCounts[p.id] || newCounts[p.id] === 0) {
              newCounts[p.id] = p.defaultPRCount;
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
        console.error('Failed to fetch OSS counts:', err);
      }
    };

    fetchCounts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Layout
      title="Open Source"
      description="Open-source packages, developer CLI tooling, and database contributions by Vardhman Gupta."
      noFooter
    >
      <main className={styles.pageContainer}>
        {/* Subtle Ambient Glow & Particle Backdrop */}
        <div className={styles.bgGlowWrapper} aria-hidden="true">
          <div className={styles.glowOrb} />
          <ParticleCanvas />
        </div>

        <div className={styles.contentWrapper}>
          {/* Header */}
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Open Source</h1>
            <p className={styles.pageSubtitle}>
              Open-source developer tooling, AI agent frameworks, and contributions to distributed vector engines and enterprise ecosystems.
            </p>
            <div className={styles.statsBadgeRow}>
              <span className={styles.statsBadge}>
                <strong className={styles.highlightCount}>{counts.total || 87}+</strong> Total Merged Pull Requests
              </span>
              <Link to="/contribution" className={styles.viewAllContribLink}>
                <span>View All Contributions</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </header>

          {/* 2-Column Grid Box Cards */}
          <div className={styles.grid}>
            {OSS_PROJECTS.map((project) => {
              const prCount = counts[project.id] || project.defaultPRCount;

              return (
                <div key={project.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.projectInfo}>
                      <div className={styles.logoWrap}>
                        {project.logoType === 'img' ? (
                          <img src={project.logoSrc} alt="" className={styles.logoImg} />
                        ) : (
                          <project.icon size={18} className={styles.logoIcon} />
                        )}
                      </div>

                      <div className={styles.titleArea}>
                        <span className={styles.projectName}>{project.name}</span>
                        <span className={styles.orgSubtitle}>{project.org}</span>
                      </div>
                    </div>

                    <span className={`${styles.roleTag} ${styles['role_' + project.roleType]}`}>
                      {project.role}
                    </span>
                  </div>

                  <p className={styles.description}>{project.description}</p>

                  <div className={styles.cardFooter}>
                    <span className={styles.prBadge} title={`${prCount} Merged Pull Requests`}>
                      <GitPullRequest size={12} className={styles.prBadgeIcon} />
                      <span>{prCount} Merged {prCount === 1 ? 'PR' : 'PRs'}</span>
                    </span>

                    <div className={styles.actionButtons}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.prLink}
                        title="View merged pull requests on GitHub"
                      >
                        <span>PRs</span>
                        <ArrowUpRight size={12} />
                      </a>

                      <Link to={project.deepDiveUrl} className={styles.deepDiveLink}>
                        <span>Deep Dive</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </Layout>
  );
}

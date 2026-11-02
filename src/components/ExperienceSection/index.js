import React from 'react';
import Link from '@docusaurus/Link';
import { 
  Briefcase, 
  GitPullRequest, 
  ArrowUpRight, 
  Download, 
  Users, 
  CheckCircle2, 
  Globe, 
  Code2, 
  Sparkles,
  Layers,
  Terminal
} from 'lucide-react';
import styles from './styles.module.css';

export default function ExperienceSection() {
  return (
    <div className={styles.container} id="experience">
      {/* Section Header */}
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>
            Work <span className={styles.highlightBlue}>Experience</span>
          </h2>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className={styles.timeline}>
        {/* 1. Building @ PicadoLabs */}
        <div className={styles.item} id="experience-picadolabs">
          <div className={styles.iconCol}>
            <div className={styles.iconCircle}>
              <img 
                src="/img/picadolabs.png" 
                alt="" 
                width={17} 
                height={17} 
                style={{ borderRadius: 3, objectFit: 'contain' }} 
              />
            </div>
          </div>

          <div className={styles.contentCol}>
            <div className={styles.itemHeader}>
              <div className={styles.roleTitleWrap}>
                <h3 className={styles.itemTitle}>
                  <Link to="/opensource/picadolabs" className={styles.itemLink}>
                    <span>Building @ PicadoLabs</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </h3>
                <span className={styles.companyTag}>Founder &amp; Maintainer</span>
              </div>
              <span className={styles.period}>July'2026 — Present</span>
            </div>

            {/* Traction Badges */}
            <div className={styles.metricsRow}>
              <span className={`${styles.metricBadge} ${styles.metricBlue}`}>
                <Users size={12} />
                <span>37+ Contributors</span>
              </span>
              <span className={`${styles.metricBadge} ${styles.metricGreen}`}>
                <Download size={12} />
                <span>5.3k+ Downloads</span>
              </span>
              <span className={`${styles.metricBadge} ${styles.metricPurple}`}>
                <Layers size={12} />
                <span>4 Core Systems</span>
              </span>
            </div>

            <p className={styles.description}>
              Architecting deterministic, verify-first developer infrastructure and autonomous software engineering systems — including <strong>build-with-ai</strong> (1.2k+ downloads), <strong>AI Model Router</strong> (sub-3ms Pareto proxy), <strong>Terminal Agent</strong>, and <strong>AgentBench</strong>.
            </p>
          </div>
        </div>

        {/* 2. Open Source Contributor */}
        <div className={styles.item} id="experience-opensource">
          <div className={styles.iconCol}>
            <div className={styles.iconCircle} style={{ borderColor: 'rgba(56, 189, 248, 0.3)' }}>
              <GitPullRequest size={16} style={{ color: '#38BDF8' }} />
            </div>
          </div>

          <div className={styles.contentCol}>
            <div className={styles.itemHeader}>
              <div className={styles.roleTitleWrap}>
                <h3 className={styles.itemTitle}>
                  <Link to="/opensource" className={styles.itemLink}>
                    <span>Open Source (Contributor &amp; Collaborator)</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </h3>
              </div>
              <span className={styles.period}>Aug'2026 — Present</span>
            </div>

            {/* Breakdown of Major Contributions */}
            <div className={styles.subList}>
              <a 
                href="https://github.com/search?q=repo%3Aapache%2Fmagpie+is%3Apr+author%3AKaap10&type=pullrequests"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.subItem}
                style={{ textDecoration: 'none' }}
              >
                <span className={styles.subItemName}>
                  <img src="/img/apachelogo.png" alt="" width={15} height={15} style={{ objectFit: 'contain' }} />
                  <span>Apache Magpie (Contributor)</span>
                </span>
                <span className={styles.subItemCount}>31 Merged PRs</span>
              </a>

              <a 
                href="https://github.com/search?q=repo%3Amicrosoft%2FPyRIT+is%3Apr+author%3AKaap10&type=pullrequests"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.subItem}
                style={{ textDecoration: 'none' }}
              >
                <span className={styles.subItemName}>
                  <img src="/img/mslogo.png" alt="" width={14} height={14} style={{ objectFit: 'contain' }} />
                  <span>Microsoft PyRIT (Contributor)</span>
                </span>
                <span className={styles.subItemCount}>21 Merged PRs</span>
              </a>

              <a 
                href="https://github.com/search?q=repo%3Acodeforstartups%2Fdynavec+is%3Apr+author%3AKaap10&type=pullrequests"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.subItem}
                style={{ textDecoration: 'none' }}
              >
                <span className={styles.subItemName}>
                  <Code2 size={14} style={{ color: '#38BDF8' }} />
                  <span>DynaVec (Collaborator)</span>
                </span>
                <span className={styles.subItemCount}>21 Merged PRs</span>
              </a>
            </div>

            <p className={styles.description} style={{ marginTop: '0.4rem' }}>
              Engineered security evaluators, ReAct agent primitives, real-time async streaming pipelines, and review finding parsers across 138+ total merged pull requests.
            </p>
          </div>
        </div>

        {/* 3. Dazu Services */}
        <div className={styles.item} id="experience-dazu">
          <div className={styles.iconCol}>
            <div className={styles.iconCircle} style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
              <Briefcase size={15} style={{ color: '#FBBF24' }} />
            </div>
          </div>

          <div className={styles.contentCol}>
            <div className={styles.itemHeader}>
              <div className={styles.roleTitleWrap}>
                <h3 className={styles.itemTitle}>Dazu Services (Startup)</h3>
                <span className={styles.companyTag} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#FBBF24', borderColor: 'rgba(245, 158, 11, 0.25)' }}>
                  Full Stack Developer Intern
                </span>
              </div>
              <span className={styles.period}>Aug'2025 — Oct'2025</span>
            </div>

            <div className={styles.metricsRow}>
              <span className={`${styles.metricBadge} ${styles.metricBlue}`}>
                <span>React · TypeScript · Node.js · Supabase · Docker CI/CD</span>
              </span>
            </div>

            <p className={styles.description}>
              Engineered full-stack microservices using React, TypeScript, Node.js, and Supabase, optimizing database queries and Docker CI/CD pipelines to drive a ~35% reduction in API response latency.
            </p>
          </div>
        </div>

        {/* 4. Freelancing */}
        <div className={styles.item} id="experience-freelancing">
          <div className={styles.iconCol}>
            <div className={styles.iconCircle} style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}>
              <Globe size={15} style={{ color: '#34D399' }} />
            </div>
          </div>

          <div className={styles.contentCol}>
            <div className={styles.itemHeader}>
              <div className={styles.roleTitleWrap}>
                <h3 className={styles.itemTitle}>Freelancing</h3>
              </div>
              <span className={styles.period}>March'2025 — April'2025</span>
            </div>

            <div className={styles.metricsRow}>
              <span className={`${styles.metricBadge} ${styles.metricGreen}`}>
                <CheckCircle2 size={12} />
                <span>Delivered website to startup ($48)</span>
              </span>
            </div>

            <p className={styles.description}>
              Designed, built, and successfully delivered a production-ready web platform for an early-stage startup with custom responsive UI components, rapid turnaround, and full handover documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

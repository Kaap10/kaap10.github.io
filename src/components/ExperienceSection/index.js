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
  Layers,
  ShieldCheck
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
        {/* 1. Apache Magpie Committer (The Apache Software Foundation) */}
        <div className={styles.item} id="experience-apache-magpie">
          <div className={styles.iconCol}>
            <div className={styles.iconCircle}>
              <img 
                src="/img/apachelogo.png" 
                alt="Apache" 
                width={17} 
                height={17} 
                style={{ objectFit: 'contain' }} 
              />
            </div>
          </div>

          <div className={styles.contentCol}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>
                <a 
                  href="https://github.com/apache/magpie" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.itemLink}
                >
                  <span>Apache Magpie Committer</span>
                  <ArrowUpRight size={13} />
                </a>
              </h3>
              <span className={styles.period}>
                <span className={styles.liveDot} aria-hidden="true" />
                <span>Nov'2026 — Present</span>
              </span>
            </div>

            <div className={styles.roleSubtitle}>
              The Apache Software Foundation · Remote
            </div>

            {/* Matte Metadata Badges */}
            <div className={styles.metricsRow}>
              <span className={`${styles.metricBadge} ${styles.metricBlue}`}>
                <ShieldCheck size={12} />
                <span>Official Committer</span>
              </span>
              <span className={`${styles.metricBadge} ${styles.metricMatte}`}>
                <span>Contributor (Aug'2026 — Nov'2026)</span>
              </span>
            </div>

            <p className={styles.leadDescription}>
              Elected as an official Committer for the Apache Magpie project.
            </p>

            <ul className={styles.bulletList}>
              <li className={styles.bulletItem}>
                Building and maintaining developer tooling, multi-forge VCS adapters (GitLab, Forgejo, OSV.dev), and security sandboxing.
              </li>
              <li className={styles.bulletItem}>
                Designing Claude Code mods and automated review triage workflows.
              </li>
              <li className={styles.bulletItem}>
                Reviewing pull requests and collaborating on codebase architecture with community maintainers.
              </li>
            </ul>
          </div>
        </div>

        {/* 2. Building @ PicadoLabs */}
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
              <h3 className={styles.itemTitle}>
                <Link to="/opensource/picadolabs" className={styles.itemLink}>
                  <span>Building @ PicadoLabs</span>
                  <ArrowUpRight size={13} />
                </Link>
              </h3>
              <span className={styles.period}>
                <span className={styles.liveDot} aria-hidden="true" />
                <span>July'2026 — Present</span>
              </span>
            </div>

            <div className={styles.roleSubtitle}>
              Founder &amp; Maintainer
            </div>

            {/* Traction Badges */}
            <div className={styles.metricsRow}>
              <span className={`${styles.metricBadge} ${styles.metricBlue}`}>
                <Users size={12} />
                <span>42+ Contributors</span>
              </span>
              <span className={`${styles.metricBadge} ${styles.metricGreen}`}>
                <Download size={12} />
                <span>7.2k+ Downloads</span>
              </span>
              <span className={`${styles.metricBadge} ${styles.metricMatte}`}>
                <Layers size={12} />
                <span>4 Core Systems</span>
              </span>
            </div>

            <p className={styles.description}>
              Architecting deterministic, verify-first developer infrastructure and autonomous software engineering systems — including <strong>build-with-ai</strong> (1.4k+ downloads), <strong>AI Model Router</strong> (sub-3ms Pareto proxy), <strong>Terminal Agent</strong>, and <strong>AgentBench</strong>.
            </p>
          </div>
        </div>

        {/* 3. Open Source Contributor */}
        <div className={styles.item} id="experience-opensource">
          <div className={styles.iconCol}>
            <div className={styles.iconCircle}>
              <GitPullRequest size={15} style={{ color: '#38BDF8' }} />
            </div>
          </div>

          <div className={styles.contentCol}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>
                <Link to="/opensource" className={styles.itemLink}>
                  <span>Open Source Contributor</span>
                  <ArrowUpRight size={13} />
                </Link>
              </h3>
              <span className={styles.period}>
                <span className={styles.liveDot} aria-hidden="true" />
                <span>Aug'2026 — Present</span>
              </span>
            </div>

            {/* Breakdown of Major Contributions */}
            <div className={styles.subList}>
              <a 
                href="https://github.com/search?q=repo%3Aapache%2Fmagpie+is%3Apr+author%3AKaap10&type=pullrequests"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.subItem}
              >
                <span className={styles.subItemName}>
                  <img src="/img/apachelogo.png" alt="" width={15} height={15} style={{ objectFit: 'contain' }} />
                  <span>Apache Magpie (Committer)</span>
                </span>
                <span className={styles.subItemCount}>54 Merged PRs</span>
              </a>

              <a 
                href="https://github.com/search?q=repo%3Amicrosoft%2FPyRIT+is%3Apr+author%3AKaap10&type=pullrequests"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.subItem}
              >
                <span className={styles.subItemName}>
                  <img src="/img/mslogo.png" alt="" width={14} height={14} style={{ objectFit: 'contain' }} />
                  <span>Microsoft PyRIT (Contributor)</span>
                </span>
                <span className={styles.subItemCount}>34 Merged PRs</span>
              </a>

              <a 
                href="https://github.com/search?q=repo%3Acodeforstartups%2Fdynavec+is%3Apr+author%3AKaap10&type=pullrequests"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.subItem}
              >
                <span className={styles.subItemName}>
                  <Code2 size={14} style={{ color: '#38BDF8' }} />
                  <span>DynaVec (Collaborator)</span>
                </span>
                <span className={styles.subItemCount}>22 Merged PRs</span>
              </a>
            </div>

            <p className={styles.description} style={{ marginTop: '0.45rem' }}>
              Engineered security evaluators, ReAct agent primitives, real-time async streaming pipelines, and review finding parsers across 177+ total merged pull requests.
            </p>

            <div className={styles.subListFooter}>
              <Link to="/opensource" className={styles.viewAllBtn}>
                <span>View All</span>
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Dazu Services */}
        <div className={styles.item} id="experience-dazu">
          <div className={styles.iconCol}>
            <div className={styles.iconCircle}>
              <Briefcase size={15} style={{ color: '#A1A1AA' }} />
            </div>
          </div>

          <div className={styles.contentCol}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>Dazu Services (Startup)</h3>
              <span className={styles.period}>Aug'2025 — Oct'2025</span>
            </div>

            <div className={styles.roleSubtitle}>
              Full Stack Developer Intern
            </div>

            <div className={styles.metricsRow}>
              <span className={`${styles.metricBadge} ${styles.metricMatte}`}>
                <span>React · TypeScript · Node.js · Supabase · Docker CI/CD</span>
              </span>
            </div>

            <p className={styles.description}>
              Engineered full-stack microservices using React, TypeScript, Node.js, and Supabase, optimizing database queries and Docker CI/CD pipelines to drive a ~35% reduction in API response latency.
            </p>
          </div>
        </div>

        {/* 5. Freelancing */}
        <div className={styles.item} id="experience-freelancing">
          <div className={styles.iconCol}>
            <div className={styles.iconCircle}>
              <Globe size={15} style={{ color: '#A1A1AA' }} />
            </div>
          </div>

          <div className={styles.contentCol}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>Freelancing</h3>
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

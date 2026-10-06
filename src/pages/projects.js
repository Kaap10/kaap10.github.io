import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { 
  ArrowUpRight,
  Pin,
  Sparkles,
  Bot,
  Code2,
  ShieldAlert,
  Terminal,
  Layers,
  Cpu,
  Database
} from 'lucide-react';
import styles from './projects.module.css';
import ParticleCanvas from '@site/src/components/ParticleCanvas';

const TECH_ICONS = {
  nextjs: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.666 17.502l-6.85-8.878v8.878H9.37V6.498h1.838l6.85 8.91v-8.91h1.446v11.004h-1.838z" />
    </svg>
  ),
  react: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
    </svg>
  ),
  typescript: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M2 3h20v18H2V3zm10.7 8.5h-1.8V19H9.3v-7.5H7.5V10h5.2v1.5zm6.8 2.2c-.3-.2-.8-.4-1.4-.6-.4-.1-.7-.3-.8-.4-.2-.1-.2-.3-.2-.4 0-.2.1-.4.3-.5.2-.1.5-.2.9-.2.4 0 .7.1 1 .2.3.1.5.3.7.6l1.1-.9c-.3-.4-.7-.7-1.2-.9-.5-.2-1.1-.3-1.6-.3-.7 0-1.3.1-1.7.4-.5.3-.7.7-.7 1.2 0 .4.1.7.4 1 .2.2.6.4 1.2.6.5.2.8.3 1 .4.2.1.2.3.2.5 0 .2-.1.4-.3.6-.2.1-.6.2-1 .2-.5 0-.9-.1-1.3-.3-.4-.2-.7-.5-.9-.9l-1.2.8c.3.5.8.9 1.4 1.2.6.3 1.3.4 2 .4.8 0 1.5-.2 2-.5.5-.3.8-.8.8-1.4 0-.4-.1-.8-.4-1.1z" />
    </svg>
  ),
  python: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M11.91 0c-3.1 0-2.91 1.35-2.91 1.35l.01 1.4h2.95v.42H6.07S4 3 4 6.13c0 3.12 1.8 3 1.8 3h1.08V7.6c0-1.73 1.48-1.65 1.48-1.65h2.9v-.43c0-1.66 1.42-1.62 1.42-1.62h2.97S16 0 11.91 0zm-1.6 1.05c.34 0 .61.27.61.61s-.27.61-.61.61a.61.61 0 0 1-.61-.61c0-.34.27-.61.61-.61zm1.78 21.9c3.1 0 2.91-1.35 2.91-1.35l-.01-1.4h-2.95v-.42h5.89s2.07.18 2.07-2.95c0-3.12-1.8-3-1.8-3h-1.08v1.53c0 1.73-1.48 1.65-1.48 1.65h-2.9v.43c0 1.66-1.42 1.62-1.42 1.62H9.66S8 24 12.09 24zm1.6-1.05a.61.61 0 0 1-.61-.61c0-.34.27-.61.61-.61.34 0 .61.27.61.61 0 .34-.27.61-.61.61z" />
    </svg>
  ),
  tailwind: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6-2.2-4.2-1.8-.913-.228-1.565-.89-2.288-1.624C16.336 2.582 14.975 1.2 12.001 1.2zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6-2.2-4.2-1.8-.913-.228-1.565-.89-2.288-1.624C10.336 9.782 8.975 8.4 6.001 8.4z" />
    </svg>
  ),
  docker: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.575a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm0 2.716h2.118a.186.186 0 00.186-.186V6.291a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm0 2.714h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954 0h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H8.075a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-2.714h2.119a.186.186 0 00.185-.186V6.291a.185.185 0 00-.185-.185H8.075a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.955 2.714h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.12a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zM23.77 11.89c-.39-.24-.92-.35-1.57-.35-.2 0-.4.01-.6.04-.33-.77-.94-1.33-1.78-1.63l-.4-.14-.24.34c-.45.64-.69 1.4-.69 2.19 0 .15.01.29.03.44-.45.24-.97.37-1.52.37H.85c-.47 0-.85.38-.85.85 0 3.32 1.34 6.44 3.77 8.78 2.22 2.14 5.2 3.32 8.39 3.32 7.74 0 11.45-5.22 11.82-10.74.02-.27.02-.51.02-.75 0-1.12-.08-2.03-.23-2.36z" />
    </svg>
  ),
  kubernetes: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M11.96 0L2.1 5.69v11.38l9.86 5.69 9.86-5.69V5.69L11.96 0zm-.01 2.31l7.85 4.53-2.88 1.66-4.97-2.87-4.97 2.87-2.88-1.66 7.85-4.53zm-7.85 6.47l2.88 1.66v5.74L4.1 17.84V8.78zm9.85 1.67l4.98 2.87-4.98 2.87-4.98-2.87 4.98-2.87zm-1.01 7.64v5.74l-2.88-1.66V16.43l2.88 1.66zm2.02 0l2.88-1.66v5.74l-2.88 1.66v-5.74zm4.98-1.84l-2.88-1.66v-5.74l2.88-1.66v9.06z" />
    </svg>
  ),
  nodejs: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-.8 4.2h1.6v2.4H11.2V4.2zm-4.8 3.6h1.6v6H6.4V7.8zm9.6 0H17.6v6H16V7.8z" />
    </svg>
  ),
  fastapi: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm1.08 4.8l-1.32 6.6h3.6l-5.76 7.8 1.32-6.6h-3.6l5.76-7.8z" />
    </svg>
  ),
  redis: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5zm0 8L2 15l10 5 10-5-10-5z" />
    </svg>
  ),
  pytorch: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M12.72 0a10.8 10.8 0 00-6.17 19.66l1.24-1.24A9.05 9.05 0 0112.72 1.76V0zm2.56 3.65a1.18 1.18 0 100 2.36 1.18 1.18 0 000-2.36zM12.72 5.3a7.2 7.2 0 00-4.11 13.11l1.24-1.24a5.45 5.45 0 013.87-9.52v-2.35z" />
    </svg>
  ),
  websockets: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 16l-4-4m0 0l4-4m-4 4h18m-4 8l4-4m0 0l-4-4" />
    </svg>
  ),
  postgres: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  ),
  go: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M1.5 8.5h6.2v1.5H3.2v4.8h4.5v-2.2H5.8v-1.4h3.6v4.9c0 .4-.3.7-.7.7H2.2c-.4 0-.7-.3-.7-.7V9.2c0-.4.3-.7.7-.7zm10.5 0h5.2c.4 0 .7.3.7.7v6.3c0 .4-.3.7-.7.7H12c-.4 0-.7-.3-.7-.7V9.2c0-.4.3-.7.7-.7zm4.2 6.3V10h-3.4v4.8h3.4z" />
    </svg>
  ),
  prometheus: (props) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

const PROJECTS = [
  {
    id: 'karya',
    name: 'Karya',
    status: 'Live',
    statusType: 'live',
    isPinned: true,
    tagline: 'Multi-agent autonomous system for automated codebase intelligence, task orchestration, and developer productivity.',
    link: '/projects/karya',
    techStack: ['nextjs', 'react', 'typescript', 'python', 'fastapi', 'tailwind'],
    preview: {
      title: 'Build with Autonomous Intelligence',
      tag: 'Karya Core Engine v2.0',
      headline: 'Autonomous Codebase Intelligence',
      badgeText: 'Multi-Agent Orchestrator',
      accentColor: '#FF4D4F',
      glowColor: 'rgba(255, 77, 79, 0.28)'
    }
  },
  {
    id: 'auranow',
    name: 'AuraNow',
    status: 'Live',
    statusType: 'live',
    isPinned: false,
    tagline: 'Contextual real-time intelligence engine with adaptive multimodal memory and fast inference pipelines.',
    link: '/projects/auranow',
    techStack: ['nextjs', 'react', 'typescript', 'pytorch', 'redis', 'websockets'],
    preview: {
      title: 'Real-time Multimodal Engine',
      tag: 'AuraNow Neural Inference',
      headline: 'Real-Time Intelligence & Neural Memory',
      badgeText: 'Adaptive Memory Engine',
      accentColor: '#C084FC',
      glowColor: 'rgba(192, 132, 252, 0.28)'
    }
  },
  {
    id: 'code-with-buddy',
    name: 'Code with Buddy',
    status: 'Building',
    statusType: 'building',
    isPinned: false,
    tagline: 'Collaborative developer workspace with real-time state synchronization, live sandboxes, and pairing tooling.',
    link: '/projects/code-with-buddy',
    techStack: ['nextjs', 'react', 'typescript', 'nodejs', 'websockets', 'docker'],
    preview: {
      title: 'Real-Time Developer Collaboration',
      tag: 'Live Cloud Sandboxes',
      headline: 'Pair Programming & Live Sandboxes',
      badgeText: 'CRDT Sync Engine',
      accentColor: '#38BDF8',
      glowColor: 'rgba(56, 189, 248, 0.28)'
    }
  },
  {
    id: 'incidentflow',
    name: 'IncidentFlow',
    status: 'Building',
    statusType: 'building',
    isPinned: false,
    tagline: 'Automated incident management, triage orchestration, and reliability monitoring platform for microservices.',
    link: '/projects/incidentflow',
    techStack: ['go', 'python', 'kubernetes', 'prometheus', 'nextjs', 'postgres'],
    preview: {
      title: 'SRE & Reliability Automation',
      tag: 'Automated Telemetry Triage',
      headline: 'Microservices Reliability & Triage Platform',
      badgeText: 'SRE Incident Automation',
      accentColor: '#F43F5E',
      glowColor: 'rgba(244, 63, 94, 0.28)'
    }
  },
];

export default function ProjectsPage() {
  return (
    <Layout
      title="Projects"
      description="Production-oriented systems, autonomous AI agents, and full-stack platforms built by Vardhman Gupta."
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
            <h1 className={styles.pageTitle}>Projects</h1>
            <p className={styles.pageSubtitle}>
              Production-oriented systems, autonomous AI agents, and full-stack platforms built around real engineering challenges.
            </p>
          </header>

          {/* 2-Column Grid Product Showcase Cards */}
          <div className={styles.grid}>
            {PROJECTS.map((project) => (
              <div key={project.id} className={styles.card}>
                {/* Visual Preview Container */}
                <div className={styles.previewContainer}>
                  {project.isPinned && (
                    <div className={styles.pinBadge} title="Featured Project">
                      <Pin size={12} className={styles.pinIcon} />
                    </div>
                  )}

                  {/* Browser Mockup Header */}
                  <div className={styles.browserHeader}>
                    <div className={styles.browserDots}>
                      <span className={styles.dot} />
                      <span className={styles.dot} />
                      <span className={styles.dot} />
                    </div>
                    <div className={styles.browserAddressBar}>
                      <span>{project.preview.tag}</span>
                    </div>
                  </div>

                  {/* Inner Mockup Graphic Canvas */}
                  <div 
                    className={styles.mockupCanvas}
                    style={{ '--preview-glow': project.preview.glowColor }}
                  >
                    <div className={styles.mockupGlowOrb} />
                    
                    <div className={styles.mockupContent}>
                      <span 
                        className={styles.mockupBadge}
                        style={{ borderColor: project.preview.accentColor, color: project.preview.accentColor }}
                      >
                        {project.preview.badgeText}
                      </span>
                      <h3 className={styles.mockupHeadline}>
                        {project.preview.headline}
                      </h3>
                      <div className={styles.mockupSearchBar}>
                        <Terminal size={12} style={{ color: project.preview.accentColor }} />
                        <span>Ready for inference &amp; deployment...</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info & Meta Area */}
                <div className={styles.cardBody}>
                  <div className={styles.titleRow}>
                    <h2 className={styles.projectName}>{project.name}</h2>
                  </div>

                  <p className={styles.description}>{project.tagline}</p>

                  <div className={styles.cardFooter}>
                    {/* Tech Stack Icons */}
                    <div className={styles.techStackRow}>
                      {project.techStack.map((tech) => {
                        const IconComponent = TECH_ICONS[tech];
                        return (
                          <span key={tech} className={styles.techIconWrap} title={tech}>
                            {IconComponent ? <IconComponent /> : <span>{tech}</span>}
                          </span>
                        );
                      })}
                    </div>

                    {/* View Project Action */}
                    <Link to={project.link} className={styles.viewProjectLink}>
                      <span>View Project</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
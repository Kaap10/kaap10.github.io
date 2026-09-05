import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Terminal, 
  Activity, 
  BookOpen, 
  Code2, 
  Gauge, 
  Cpu, 
  Video, 
  ShieldCheck
} from 'lucide-react';
import styles from './projects.module.css';

const IconGithub = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const PROJECTS = [
  // 1. Karya (AI)
  {
    id: 'karya',
    index: '01',
    category: 'AI',
    filterTag: 'AI',
    icon: BookOpen,
    title: 'Karya',
    headline: 'Offline-first multilingual AI learning platform.',
    cardDescription:
      'An offline AI education platform combining quantized on-device LLM inference, multilingual RAG (22+ languages), document OCR, and interactive whiteboard tools.',
    techStack: ['React', 'Node.js', 'MongoDB', 'ChromaDB', 'llama.cpp'],
    highlights: [
      'Local LLM-powered tutoring: Quantized 1.5B model running on consumer 4–8GB hardware',
      'Multilingual RAG search: Neural machine translation across 22+ languages with local ChromaDB',
      'AI-generated study materials: Instant automated summaries, notes, flashcards, MCQs & diagrams',
    ],
    metrics: 'Vector ~68ms · Chat ~1.1s',
    recruiterHighlight:
      'Implemented an offline-first AI architecture by quantizing a 1.5B LLM for low-RAM devices, enabling advanced NLP features without cloud dependence.',
    github: 'https://github.com/kaap10',
    demo: null,
    tags: ['AI', 'RAG', 'Multilingual', 'Offline-First', 'llama.cpp', 'ChromaDB', 'EdTech'],
    details: {
      description:
        'Karya is an offline-first AI education platform designed for low-resource and multilingual environments. It integrates on-device LLM inference (using Distill Qwen-1.5B) with neural machine translation (NLLB-200), enabling tutoring and content generation in 22+ languages. Users can upload documents or images (via OCR) and audio (via speech-to-text), and Karya semantically indexes this content for search and retrieval.\n\nThe platform builds a knowledge tree from documents and generates AI-crafted study materials: summaries, notes, flashcards, and multiple-choice questions. There is also an AI-assisted whiteboard (Excalidraw) that can create flowcharts and diagrams algorithmically.\n\nAll processing is optimized for limited hardware: Karya uses a quantized 1.5B LLM to run on 4–8GB devices, and stores embeddings in a local ChromaDB. The web UI (React + Tailwind) supports rich interactions, and a mobile app (React Native) allows on-device learning with SQLite fallback when offline.',
      allTech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Native', 'Expo', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'ChromaDB', 'llama.cpp', 'NLLB-200', 'Tesseract.js', 'Whisper', 'Excalidraw', 'PyTorch', 'onnxruntime', 'SQLite'],
      fullHighlights: [
        'Local multilingual LLM tutoring on low-spec hardware',
        'RAG-enabled semantic search across 22+ languages',
        'AI-generated educational notes, flashcards, and quizzes',
        'On-device OCR and speech transcription (Whisper)',
        'Interactive AI whiteboard with algorithmic flowchart creation',
        'Complete offline-first architecture with SQLite caching',
      ],
      metricsDetail: 'Vector retrieval ~68ms · Chat latency ~1.1s · Flowchart gen ~24s · 10-page PDF indexing ~4.2s · OCR CER ~1.1%',
    },
  },

  // 2. AuraNow (Fullstack)
  {
    id: 'auranow',
    index: '02',
    category: 'Fullstack',
    filterTag: 'Fullstack',
    icon: Video,
    title: 'AuraNow',
    headline: 'AI-native video conferencing platform with semantic search.',
    cardDescription:
      'An open-source video conferencing app built with Next.js and LiveKit WebRTC, featuring real-time automated meeting summarization and semantic transcript Q&A.',
    techStack: ['React', 'TypeScript', 'LiveKit', 'Next.js', 'MongoDB'],
    highlights: [
      'LiveKit WebRTC conferencing: Multi-party low-latency video, audio, and screen sharing',
      'AI meeting assistant: Real-time live transcript generation, action items, and executive summaries',
      'Semantic transcript Q&A: Vector search (Pinecone) over meeting archives for instant retrieval',
    ],
    metrics: null,
    recruiterHighlight:
      'Built an AI-enhanced video conferencing platform combining LiveKit WebRTC with real-time meeting transcription and semantic search.',
    github: 'https://github.com/kaap10',
    demo: null,
    tags: ['Fullstack', 'LiveKit', 'Next.js', 'React', 'WebRTC', 'AI', 'MongoDB'],
    details: {
      description:
        'Auranow (also known as Aura) is an advanced video conferencing platform combining LiveKit\'s WebRTC infrastructure with AI enhancements. It allows multiple participants to join video calls with chat and screen sharing. The frontend is built with Next.js and React, ensuring a smooth user experience.\n\nIts key differentiator is the built-in AI assistant. During a call, an LLM listens and produces live transcripts, summaries, and action items. After the meeting, users can ask questions about the content: the system uses embeddings and semantic search (OpenAI/Pinecone) to retrieve relevant sections of the transcript.\n\nThe app uses Clerk for authentication and MongoDB for storage. It supports serverless deployment on Vercel, making it scalable. Auranow demonstrates a combination of real-time communication and NLP: it is literally an "AI-powered Zoom" designed for modern remote teams.',
      allTech: ['React', 'Next.js', 'TypeScript', 'LiveKit', 'MongoDB', 'Clerk', 'Stripe', 'Anthropic API', 'OpenAI API', 'Pinecone', 'Tailwind CSS'],
      fullHighlights: [
        'LiveKit-based multi-party WebRTC video and audio streams',
        'Real-time LLM meeting transcription and action-item synthesis',
        'Semantic transcript Q&A powered by vector embeddings',
        'Scalable Next.js and React full-stack architecture',
        'Secure Clerk authentication and MongoDB persistence',
      ],
      metricsDetail: 'Low-latency WebRTC video · Real-time AI transcription · Vector archive retrieval',
    },
  },

  // 3. Code with Buddy (Fullstack)
  {
    id: 'code-with-buddy',
    index: '03',
    category: 'Fullstack',
    filterTag: 'Fullstack',
    icon: Code2,
    title: 'Code with Buddy',
    headline: 'Real-time collaborative code editor with live execution.',
    cardDescription:
      'A browser-based pair programming tool featuring real-time multi-user code editing synchronized via WebSockets, multi-language execution, and integrated chat.',
    techStack: ['React', 'Node.js', 'Socket.IO', 'Express', 'CodeMirror'],
    highlights: [
      'WebSocket-based real-time editing: Low-latency multi-cursor synchronization',
      'Late-joiner state sync: Fast one-time handshake without replaying full edit history',
      'Multi-language execution: Remote code compilation across 20+ languages via Judge0 API',
    ],
    metrics: null,
    recruiterHighlight:
      'Engineered low-latency sync by filtering update events and using targeted handshakes for late-joiners.',
    github: 'https://github.com/kaap10',
    demo: null,
    tags: ['Fullstack', 'React', 'WebSockets', 'Collaboration', 'Node.js', 'CodeMirror'],
    details: {
      description:
        'Code with Buddy is a browser-based collaborative coding environment for pair programming and technical interviews. Multiple users can join a session via a shared URL and edit code in a CodeMirror editor simultaneously. Changes are propagated in real-time using Socket.IO, and the interface shows live collaborator cursors and an integrated chat panel.\n\nTo handle concurrency, the system filters out local change events triggered by remote updates, preventing infinite broadcast loops. Late-joiners receive the current code state through a one-time synchronization handshake instead of replaying the entire edit history.\n\nUsers can switch programming languages on the fly; the app integrates with the Judge0 API to compile and run code (supporting JavaScript, Python, Java, C/C++, C#, Ruby, etc.). The backend (Express) handles execution and returns output. The UI, built with React and Tailwind CSS, includes custom themes and a shareable room UUID mechanism.',
      allTech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Socket.IO', 'CodeMirror', 'Judge0 API'],
      fullHighlights: [
        'WebSocket-based real-time synchronized code editing',
        'Room UUID collaboration and live user presence',
        'Late-joiner state handshake minimizing network overhead',
        'Multi-language code compilation and live terminal output',
        'In-room live chat with collaborator presence indicators',
      ],
      metricsDetail: 'Multi-user real-time state sync · Sub-50ms WebSocket latency · 20+ language compilers',
    },
  },

  // 4. IncidentFlow (Fullstack)
  {
    id: 'incidentflow',
    index: '04',
    category: 'Fullstack',
    filterTag: 'Fullstack',
    icon: Activity,
    title: 'IncidentFlow',
    headline: 'Mission-critical incident management platform.',
    cardDescription:
      'A full-stack incident management system with automated SLA enforcement, Celery asynchronous alerts, RBAC, audit trails, and real-time reliability analytics.',
    techStack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Celery'],
    highlights: [
      'Automated SLA deadline monitoring: Idempotent Celery engine with 80% duration early-warning alerts',
      'Role-based access control & audit trail: Immutable logging of every status and ownership change',
      'Mandatory postmortem gating: Enforces completed root-cause analysis before closing incidents',
    ],
    metrics: '29/29 tests passing',
    recruiterHighlight:
      'Engineered an idempotent asynchronous SLA engine that reliably notifies on approaching deadlines without duplicating alerts.',
    github: 'https://github.com/kaap10',
    demo: null,
    tags: ['Fullstack', 'FastAPI', 'React', 'Celery', 'PostgreSQL', 'Redis', 'DevOps'],
    details: {
      description:
        'IncidentFlow is an end-to-end incident response platform built to manage engineering incidents and Service-Level Objectives (SLOs). It allows teams to log incidents with priorities (P0–P3) and automatically calculates SLA deadlines. Using a REST API or web interface, users can create incidents, assign ownership, update statuses, and comment on investigations.\n\nA core feature is the SLA engine. Using Celery and Redis, IncidentFlow continuously monitors active incidents. It sends early-warning alerts at 80% of the SLA duration and flags breaches past the deadline. The engine is idempotent: it avoids duplicate alerts while re-evaluating incidents in real time. The system also enforces that no incident can move from Resolved to Closed without a required postmortem, embedding reliability into the workflow.\n\nSecurity and compliance are built-in with JWT authentication, Role-Based Access Control (Admin/Manager/Engineer), and an immutable audit log. A React + Tailwind dashboard provides analytics (MTTR, SLA compliance) and a command palette for quick navigation.',
      allTech: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'SQLite', 'SQLAlchemy', 'Alembic', 'Celery', 'Redis', 'JWT', 'bcrypt', 'Pydantic', 'SlowAPI', 'Tailwind CSS', 'Recharts'],
      fullHighlights: [
        'Automated SLA deadline calculation and monitoring',
        'Celery-driven async alerts with 80% warning threshold',
        'Immutable audit trail for all incident modifications',
        'Mandatory postmortem gating before incident closure',
        'Role-based access control (Admin, Manager, Engineer)',
        'Real-time MTTR and SLA compliance analytics',
        'Full 29/29 automated test coverage',
      ],
      metricsDetail: '29/29 tests passing · 100% SLA alert idempotency · Multi-timezone awareness',
    },
  },

  // 5. Terminal Agent (Agents)
  {
    id: 'terminal-agent',
    index: '05',
    category: 'Agents',
    filterTag: 'Agents',
    icon: Terminal,
    title: 'Terminal Agent',
    headline: 'Verify-first autonomous software engineering agent.',
    cardDescription:
      'An autonomous AI coding agent that plans, modifies, tests, and independently verifies real-world codebases with sandboxed isolation and automatic rollback.',
    techStack: ['Python', 'Docker', 'SQLite', 'Git', 'Pytest'],
    highlights: [
      'Autonomous agent loop: LLM planning, controlled CLI execution & test verification',
      'Sandboxed test verification: Changes accepted only when independent test runner passes',
      'Automatic rollback & recovery: Classifies failures across 12 categories with SQLite checkpoints',
    ],
    metrics: null,
    recruiterHighlight:
      'Implements a verify-first workflow by executing an independent test suite in an isolated sandbox for each code modification.',
    github: 'https://github.com/kaap10',
    demo: null,
    tags: ['Agents', 'Python', 'CLI', 'Testing', 'DevTools', 'Docker', 'SQLite'],
    details: {
      description:
        'Terminal Agent is an autonomous coding agent that executes development tasks end-to-end. It translates natural-language tasks into structured plans, applies code changes using controlled CLI tools, and immediately runs the project\'s test suite. It follows a verify-first approach: changes are only accepted when an independent verifier (an LLM-based test runner) confirms all tests pass in a sandboxed environment.\n\nThe agent maintains context by ranking repository information and supports multiple LLM providers (OpenAI, Anthropic, Gemini, Ollama). It enforces strict security policies by performing secret detection and redaction. All tool commands execute inside isolated Docker or local sandboxes to avoid system contamination.\n\nTerminal Agent includes 12 specialized developer tools (for file editing, shell commands, etc.) and uses a SQLite database for session persistence and checkpoints. If failures occur, it classifies the error and automatically rolls back to the last stable state.',
      allTech: ['Python', 'Typer', 'Rich', 'Pydantic', 'HTTPX', 'GitPython', 'psutil', 'SQLite', 'Docker', 'Ollama', 'OpenAI API', 'Anthropic API', 'Gemini API', 'Pytest'],
      fullHighlights: [
        'Autonomous LLM planning and execution loop',
        'Deterministic context ranking over repository files',
        'Multi-LLM provider architecture (OpenAI, Anthropic, Gemini, Ollama)',
        'Secret detection and redaction engine',
        'Independent sandboxed test verification',
        '12-category failure classification and automatic rollback',
        'SQLite checkpoint persistence across sessions',
      ],
      metricsDetail: '12 specialized CLI tools · Zero-contamination sandboxes · Multi-LLM provider support',
    },
  },

  // 6. Agent Bench (Agents)
  {
    id: 'agent-bench',
    index: '06',
    category: 'Agents',
    filterTag: 'Agents',
    icon: Gauge,
    title: 'Agent Bench',
    headline: 'Autonomous AI agent benchmarking framework.',
    cardDescription:
      'A CLI toolkit for benchmarking AI coding agents across 40+ programming tasks using deterministic rule-based scoring and full execution trace logging.',
    techStack: ['Python', 'CLI', 'YAML', 'Docker', 'JSON'],
    highlights: [
      '40+ structured benchmark tasks: Real-world programming and tool-use scenarios',
      'Deterministic rule-based scoring: Eliminates stochastic LLM grading via cascaded regex & test rules',
      'Execution trace logging: Complete JSON audit trail with tool calls, timestamps, and timing',
    ],
    metrics: '40+ benchmark tasks',
    recruiterHighlight:
      'Automated multi-task benchmarking of AI agents with deterministic rule-based scoring for fair, non-stochastic comparison.',
    github: 'https://github.com/kaap10',
    demo: null,
    tags: ['Agents', 'Python', 'CLI', 'Benchmarking', 'DevTools', 'Docker'],
    details: {
      description:
        'Agent Bench (AgentBench) is a command-line benchmarking framework to evaluate autonomous AI agents. It defines benchmarks using YAML, where each task specifies a series of prompts and expected outputs. The framework launches the agent in an isolated workspace, allowing it to run code or use tools. After execution, Agent Bench applies a multi-stage, rule-based judge to score the outputs.\n\nThis evaluation avoids stochastic LLM judgments: instead, it uses cascaded rules and regex checks to deterministically assess success. Every step of the agent\'s run is logged with timestamps, creating a full JSON trace of tool calls. This enables fine-grained analysis of performance and timing.\n\nUsers can define custom tasks or use the built-in 40+ real-world programming scenarios. Agent Bench provides metrics on task success rates and execution details, facilitating comparative analysis of different agents.',
      allTech: ['Python', 'Typer', 'Rich', 'YAML', 'JSON', 'Docker'],
      fullHighlights: [
        '40+ structured benchmark tasks spanning real-world bugs and features',
        'Deterministic rule-based scoring avoiding stochastic LLM judges',
        'Automated multi-agent execution and evaluation harness',
        'Full execution trace logging with microsecond timestamps',
        'Custom task ingestion via declarative YAML specifications',
      ],
      metricsDetail: '40+ tasks · 100% deterministic evaluation · JSON execution traces',
    },
  },

  // 7. Model Router (AI)
  {
    id: 'model-router',
    index: '07',
    category: 'AI',
    filterTag: 'AI',
    icon: Cpu,
    title: 'Model Router',
    headline: 'Adaptive LLM selection proxy reducing costs by 40–70%.',
    cardDescription:
      'An intelligent proxy gateway that dynamically routes LLM queries based on prompt complexity—directing simple tasks to lightweight models and reserving premium APIs for hard queries.',
    techStack: ['Python', 'FastAPI', 'OpenAI API', 'Anthropic API', 'Local LLMs'],
    highlights: [
      'Prompt-based model selection: Analyzes complexity to route between local models and flagship APIs',
      'OpenAI / Claude API proxy: Drop-in replacement compatible with standard client SDKs',
      '40–70% cost reduction: Preserves output quality while dramatically lowering token expenses',
    ],
    metrics: '40–70% cost reduction',
    recruiterHighlight:
      'Engineered a cost-optimized LLM gateway that saves up to 70% on API calls by dynamically routing prompts to appropriate models.',
    github: 'https://github.com/kaap10',
    demo: null,
    tags: ['AI', 'Python', 'FastAPI', 'LLM Proxy', 'Cost Optimization', 'OpenAI'],
    details: {
      description:
        'Model Router is an inference routing service that acts as a gateway for LLM requests. It analyzes each incoming prompt to determine complexity or intent, then dispatches it to the best-fitting model. For example, trivial prompts might be served by an open-source local model or GPT-3.5, while complex tasks are sent to GPT-4 or Claude for higher-quality responses.\n\nClients use standard OpenAI or Anthropic API endpoints to query the router, requiring no changes to existing code. The router handles API keys and can stream results from multiple backends.\n\nBy leveraging cheaper models for easy queries and preserving high-end models for difficult ones, Model Router achieves significant savings—studies show about 40–70% reduction in API costs. This adaptive orchestration maintains output quality while lowering expenses. The service is fully self-hosted, enabling data privacy and customization.',
      allTech: ['Python', 'FastAPI', 'HTTPX', 'OpenAI API', 'Anthropic API', 'Docker', 'Pydantic'],
      fullHighlights: [
        'Dynamic model routing based on prompt difficulty and token length',
        'Drop-in OpenAI and Anthropic proxy interface',
        'Unified streaming support across local and cloud backends',
        '40–70% verified API cost savings without quality degradation',
        'Self-hosted gateway ensuring complete data privacy',
      ],
      metricsDetail: '40–70% cost reduction · Sub-10ms routing overhead · Multi-provider failover',
    },
  },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.filterTag === activeFilter);
  }, [activeFilter]);

  const counts = useMemo(() => {
    return {
      all: PROJECTS.length,
      ai: PROJECTS.filter((p) => p.filterTag === 'AI').length,
      fullstack: PROJECTS.filter((p) => p.filterTag === 'Fullstack').length,
      agents: PROJECTS.filter((p) => p.filterTag === 'Agents').length,
    };
  }, []);

  return (
    <Layout
      title="Projects"
      description="Production systems, autonomous AI agents, and full-stack software built by Vardhman Gupta."
    >
      <main className={styles.pageContainer}>
        {/* Subtle Ambient Glow */}
        <div className={styles.bgGlowWrapper} aria-hidden="true">
          <div className={styles.glowOrb} />
        </div>

        <div className={styles.contentWrapper}>
          
          {/* Header */}
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Projects</h1>
            <p className={styles.pageSubtitle}>
              Production systems, autonomous AI agents, and full-stack platforms engineered for scale, reliability, and real-world impact.
            </p>
          </header>

          {/* Filter Pills with Exact Categories: All, AI, Fullstack, Agents */}
          <div className={styles.filterRow}>
            {[
              { id: 'All', label: `All (${counts.all})` },
              { id: 'AI', label: `AI (${counts.ai})` },
              { id: 'Fullstack', label: `Fullstack (${counts.fullstack})` },
              { id: 'Agents', label: `Agents (${counts.agents})` },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`${styles.filterBtn} ${activeFilter === id ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Project Cards List */}
          <div className={styles.projectsList}>
            {filteredProjects.map((project) => {
              const isExpanded = !!expandedCards[project.id];
              const IconComponent = project.icon;

              return (
                <article
                  key={project.id}
                  className={styles.projectCard}
                >
                  {/* Card Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.indexCategoryWrap}>
                      <span className={styles.projectIndex}>{project.index}</span>
                      <div className={styles.iconBadge}>
                        <IconComponent size={16} />
                      </div>
                      <span className={styles.categoryBadge}>{project.category}</span>
                    </div>

                    {project.metrics && (
                      <div className={styles.metricsPill}>
                        <CheckCircle2 size={13} />
                        <span>{project.metrics}</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div className={styles.titleBlock}>
                    <h2 className={styles.projectTitle}>{project.title}</h2>
                    <p className={styles.projectTagline}>{project.headline}</p>
                    <p className={styles.projectSummary}>{project.cardDescription}</p>
                  </div>

                  {/* Recruiter Callout */}
                  <div className={styles.recruiterCallout}>
                    <div className={styles.recruiterHeader}>
                      <ShieldCheck size={14} className={styles.recruiterIcon} />
                      <span className={styles.recruiterLabel}>Architecture Highlight</span>
                    </div>
                    <p className={styles.recruiterText}>{project.recruiterHighlight}</p>
                  </div>

                  {/* Key Highlights List */}
                  <div className={styles.highlightsContainer}>
                    <span className={styles.highlightsHeader}>Key Engineering Deliverables</span>
                    <ul className={styles.highlightsList}>
                      {project.highlights.map((h, i) => (
                        <li key={i} className={styles.highlightItem}>
                          <span className={styles.highlightDot}>•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className={styles.techTagsRow}>
                    {project.techStack.map((t, idx) => (
                      <span key={idx} className={styles.techTag}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Bar (Deep Dive toggle + Source Code) */}
                  <div className={styles.cardFooter}>
                    <div className={styles.footerLeft}>
                      <button
                        type="button"
                        className={`${styles.deepDiveBtn} ${isExpanded ? styles.deepDiveBtnActive : ''}`}
                        onClick={() => toggleExpand(project.id)}
                        aria-expanded={isExpanded}
                      >
                        <Layers size={14} />
                        <span>{isExpanded ? 'Hide Architecture Deep Dive' : 'View Architecture Deep Dive'}</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>

                    <div className={styles.footerRight}>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionBtn}
                        title="View Source on GitHub"
                      >
                        <IconGithub size={14} />
                        <span>GitHub</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>

                  {/* Expandable Architecture Deep Dive Panel */}
                  {isExpanded && (
                    <div className={styles.deepDivePanel}>
                      <div className={styles.deepDiveDivider} />
                      
                      <div className={styles.deepDiveContent}>
                        <h4 className={styles.deepDiveHeading}>System Architecture &amp; Implementation Details</h4>
                        
                        {project.details.description.split('\n\n').map((paragraph, pIdx) => (
                          <p key={pIdx} className={styles.deepDiveParagraph}>
                            {paragraph}
                          </p>
                        ))}

                        {project.details.metricsDetail && (
                          <div className={styles.metricsDetailBox}>
                            <span className={styles.metricsDetailLabel}>System Benchmarks &amp; Specs:</span>
                            <span className={styles.metricsDetailText}>{project.details.metricsDetail}</span>
                          </div>
                        )}

                        <div className={styles.deepDiveSection}>
                          <h5 className={styles.deepDiveSubheading}>Complete Technical Stack</h5>
                          <div className={styles.fullTechWrap}>
                            {project.details.allTech.map((techItem, tIdx) => (
                              <span key={tIdx} className={styles.fullTechChip}>
                                {techItem}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className={styles.deepDiveSection}>
                          <h5 className={styles.deepDiveSubheading}>Complete Architectural Highlights</h5>
                          <ul className={styles.fullHighlightsList}>
                            {project.details.fullHighlights.map((fh, fhIdx) => (
                              <li key={fhIdx} className={styles.fullHighlightItem}>
                                <CheckCircle2 size={13} className={styles.fullHighlightIcon} />
                                <span>{fh}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                </article>
              );
            })}
          </div>

        </div>
      </main>
    </Layout>
  );
}
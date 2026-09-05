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
  ShieldCheck,
  Package
} from 'lucide-react';
import styles from './projects.module.css';

const IconGithub = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const IconNpm = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.13h13.74v13.74h-3.435V8.565h-3.435v10.305H5.13z" />
  </svg>
);

const PROJECTS = [
  // 1. build-with-ai (Open Source)
  {
    id: 'build-with-ai',
    index: '01',
    category: 'Open Source',
    filterTag: 'Open Source',
    icon: Terminal,
    title: 'build-with-ai',
    headline: 'Zero-API, local-first CLI for structured AI-assisted software development.',
    cardDescription:
      'Open-source CLI that turns AI-assisted development into a structured engineering workflow. Generates context-aware prompts, preserves architectural decisions locally, and guides developers from discovery to deployment — with zero API keys or telemetry.',
    license: 'MIT License',
    techStack: ['Node.js', 'JavaScript', 'CLI', 'npm', 'JSON', 'AI Prompt Engineering'],
    highlights: [
      '10–23 phase structured workflows across different project templates',
      'Automatic architectural context injection across steps',
      'Works with ChatGPT, Claude, Gemini, Cursor, Copilot, DeepSeek & Ollama',
      'Local .buildwithai/ state and decision management',
      '6 built-in production-oriented templates',
      'Deterministic README.md, BUILD_LOG.md & CONTEXT.md generation',
      'Zero API keys, accounts, telemetry, or vendor lock-in',
      'Custom community templates via local JSON or HTTPS',
    ],
    metrics: null,
    recruiterHighlight:
      'Architected a deterministic, local-first CLI workflow engine that orchestrates multi-phase software delivery across multiple AI assistants and models without cloud storage or telemetry.',
    github: 'https://github.com/Kaap10/build-with-ai',
    npm: 'https://www.npmjs.com/package/build-with-ai',
    tags: ['Open Source', 'Node.js', 'CLI', 'Developer Tools', 'AI'],
    details: {
      description:
        'build-with-ai is an open-source CLI that guides developers through complete software projects using structured, sequential engineering workflows. It generates context-aware prompts for each development phase while maintaining architectural decisions locally to prevent context drift between AI sessions.\n\nBy keeping state within a local `.buildwithai/` directory and utilizing reproducible prompts, developers can seamlessly switch between multiple AI assistants and models (ChatGPT, Claude, Gemini, DeepSeek, Cursor, Copilot, Ollama) while ensuring strict architectural continuity without vendor lock-in.',
      allTech: ['Node.js', 'JavaScript', 'CLI', 'npm', 'JSON', 'Markdown', 'Git', 'Prompt Engineering'],
      fullHighlights: [
        '10–23 phase sequential development workflows tailored per project template',
        'Automatic architectural context injection across phases',
        'Prompt generation compatible with all major AI assistants and models',
        'Local .buildwithai/ state and architectural decision records',
        '6 built-in templates (Full-Stack, CLI, Agent, API, Library, Mobile)',
        'Deterministic README.md, BUILD_LOG.md & CONTEXT.md generation',
        'Zero API keys, accounts, telemetry, or vendor lock-in',
        'Custom community template ingestion via local JSON or HTTPS',
        'Open-source under the MIT License',
      ],
      metricsDetail: 'Zero API keys required · 100% Local-first · 6 Production Templates · MIT License',
    },
  },

  // 2. Karya (AI)
  {
    id: 'karya',
    index: '02',
    category: 'AI',
    filterTag: 'AI',
    icon: BookOpen,
    title: 'Karya',
    headline: 'Offline-first multilingual AI learning platform.',
    cardDescription:
      'An offline AI education platform combining quantized on-device LLM inference, multilingual RAG across 22 Indian languages + English, document OCR, and interactive whiteboard tools.',
    techStack: ['React', 'Node.js', 'MongoDB', 'ChromaDB', 'llama.cpp'],
    highlights: [
      'Local LLM tutoring: Quantized DeepSeek-R1-Distill-Qwen-1.5B designed and tested for 4–8GB RAM environments',
      'Multilingual RAG & NMT: Local semantic retrieval with ChromaDB and separate NLLB-200 translation across 22 Indian languages + English',
      'Automated study materials: Summaries, notes, flashcards, MCQs & diagrams',
    ],
    metrics: 'Vector ~68ms · Chat ~1.1s (Benchmark)',
    recruiterHighlight:
      'Implemented an offline-first AI architecture using a quantized 1.5B LLM designed for 4–8GB RAM environments.',
    github: null,
    demo: null,
    tags: ['AI', 'RAG', 'Multilingual', 'Offline-First', 'llama.cpp', 'ChromaDB', 'EdTech'],
    details: {
      description:
        'Karya is an offline-first AI education platform designed for low-resource and multilingual environments. It integrates on-device LLM inference (using DeepSeek-R1-Distill-Qwen-1.5B via llama.cpp) with separate neural machine translation (NLLB-200), enabling tutoring and content generation in 22 Indian languages + English. Users can upload documents or images (via OCR) and audio (via speech-to-text), and Karya semantically indexes this content for search and retrieval.\n\nThe platform builds a knowledge tree from documents and generates AI-crafted study materials: summaries, notes, flashcards, and multiple-choice questions. There is also an AI-assisted whiteboard (Excalidraw) that can create flowcharts and diagrams algorithmically.\n\nAll processing is optimized for limited hardware: Karya uses a quantized 1.5B LLM designed and tested for 4–8GB RAM environments, and stores embeddings in a local ChromaDB. The web UI (React + Tailwind) supports rich interactions, and a mobile app (React Native) allows on-device learning with SQLite fallback when offline.',
      allTech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Native', 'Expo', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'ChromaDB', 'llama.cpp', 'NLLB-200', 'Tesseract.js', 'Whisper', 'Excalidraw', 'PyTorch', 'onnxruntime', 'SQLite'],
      fullHighlights: [
        'Quantized DeepSeek-R1-Distill-Qwen-1.5B running on-device for 4–8GB RAM environments',
        'Local semantic retrieval with ChromaDB and separate NLLB-200 translation across 22 Indian languages + English',
        'Automated generation of educational notes, summaries, flashcards, and quizzes',
        'On-device document OCR (Tesseract.js) and speech transcription (Whisper)',
        'Interactive AI whiteboard with algorithmic flowchart creation via Excalidraw',
        'Complete offline-first architecture with SQLite caching for network resilience',
      ],
      metricsDetail: 'Project Benchmarks: Vector retrieval ~68ms · Chat latency ~1.1s · Flowchart gen ~24s · 10-page PDF indexing ~4.2s · OCR CER ~1.1%',
    },
  },

  // 3. AuraNow (AI)
  {
    id: 'auranow',
    index: '03',
    category: 'AI',
    filterTag: 'AI',
    icon: Activity,
    title: 'AuraNow',
    headline: 'AI social media intelligence transforming video comments into hierarchical RAPTOR topic trees.',
    cardDescription:
      'An AI-powered video comment intelligence platform that automatically clusters YouTube comments into interactive RAPTOR topic trees, audience sentiment analytics, toxicity audits, and conversational insights.',
    techStack: ['FastAPI', 'Python', 'React 18', 'RAPTOR', 'UMAP / HDBSCAN', 'MongoDB'],
    highlights: [
      'Hierarchical RAPTOR Topic Trees: Clusters comments into high-level themes and sub-topics using representative medoids, quotes, and keyword extraction',
      'Representative Medoids: Uses real comments as cluster representatives for interpretable topic summaries instead of synthetic centroids',
      'Audience & Sentiment Insights: Engagement velocity tracking, sentiment distribution, engagement breakdown, and emoji/word clouds',
    ],
    metrics: 'RAPTOR Tree · Async Queue',
    recruiterHighlight:
      'Engineered an asynchronous NLP pipeline combining vector embeddings, UMAP dimensionality reduction, HDBSCAN clustering, medoid selection, and recursive RAPTOR tree construction.',
    github: 'https://github.com/Kaap10/AuraNow',
    demo: null,
    tags: ['AI', 'Python', 'FastAPI', 'RAPTOR', 'NLP', 'React', 'MongoDB', 'Redis', 'UMAP'],
    details: {
      description:
        'AuraNow is an AI-powered social media intelligence platform that transforms unstructured YouTube video comments into structured hierarchical topic trees, audience insights, sentiment analytics, and conversational intelligence.\n\nSimply paste a YouTube video URL, and AuraNow automatically fetches comment threads, generates vector embeddings, clusters discussion topics using UMAP and HDBSCAN, selects true comment medoids, and builds an interactive RAPTOR topic tree with context-aware AI chat.\n\nThe backend is powered by asynchronous FastAPI with MongoDB/Motor and Redis job queues for scalable background scraping and processing. The frontend is built on React 18 and Vite with scoped CSS Modules for smooth analytics visualization.',
      allTech: [
        'Python',
        'FastAPI',
        'React 18',
        'Vite',
        'SentenceTransformers',
        'UMAP',
        'HDBSCAN',
        'RAPTOR Algorithm',
        'Gemini API',
        'OpenRouter',
        'MongoDB',
        'Motor',
        'Redis',
        'HTTPX',
        'JWT / BCrypt',
        'React Router v6',
        'Lucide React',
        'CSS Modules',
        'Vitest',
      ],
      fullHighlights: [
        'Hierarchical Topic Tree (RAPTOR): Multi-level recursive tree clustering with keyword extraction',
        'True Medoid Selection: Real comment selection as cluster representatives rather than synthetic centroids',
        'Audience & Sentiment Insights: Tracks comment velocity over time, sentiment distribution, engagement breakdown, and word clouds',
        'Question & Topic Discovery: Categorizes recurring viewer questions to help creators plan future content',
        'Community Health Audit: Flags toxic comments, copy-paste spam, and computes an overall health score',
        'Async Pipeline: Asynchronous FastAPI, Motor async MongoDB, and Redis background queues for high-throughput comment ingestion',
      ],
      metricsDetail: 'RAPTOR Tree Summarization · UMAP + HDBSCAN Density Clustering · Async Redis Queue · Vitest Suite',
    },
  },

  // 4. Code with Buddy (Fullstack)
  {
    id: 'code-with-buddy',
    index: '04',
    category: 'Fullstack',
    filterTag: 'Fullstack',
    icon: Code2,
    title: 'Code with Buddy',
    headline: 'Real-time collaborative code editor with live execution.',
    cardDescription:
      'A browser-based pair programming tool featuring real-time collaborative code editing synchronized via WebSockets, multi-language execution across 7 languages, and integrated chat.',
    techStack: ['React', 'Node.js', 'Socket.IO', 'Express', 'CodeMirror'],
    highlights: [
      'WebSocket-based real-time editing: Low-latency collaborative document synchronization',
      'Late-joiner state sync: Fast one-time handshake without replaying full edit history',
      'Multi-language execution: Remote code compilation across 7 languages via Judge0 API',
    ],
    metrics: '7 Languages · Real-time Sync',
    recruiterHighlight:
      'Engineered low-latency document sync by filtering update events and using targeted handshakes for late-joiners.',
    github: 'https://github.com/Kaap10/Code-With-Buddy',
    demo: null,
    tags: ['Fullstack', 'React', 'WebSockets', 'Collaboration', 'Node.js', 'CodeMirror'],
    details: {
      description:
        'Code with Buddy is a browser-based collaborative coding environment for pair programming and technical interviews. Multiple users can join a session via a shared URL and edit code in a CodeMirror editor simultaneously. Changes are propagated in real-time using Socket.IO, and the interface includes an integrated chat panel.\n\nTo handle concurrency, the system filters out local change events triggered by remote updates, preventing infinite broadcast loops. Late-joiners receive the current code state through a one-time synchronization handshake instead of replaying the entire edit history.\n\nUsers can switch programming languages on the fly; the app integrates with the Judge0 API to compile and run code across 7 languages (JavaScript, TypeScript, Python, Java, C, C++, Ruby). The backend (Express) handles execution and returns output. The UI, built with React and Tailwind CSS, includes custom themes and a shareable room UUID mechanism.',
      allTech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Socket.IO', 'CodeMirror', 'Judge0 API'],
      fullHighlights: [
        'WebSocket-based real-time synchronized code editing with loop-prevention filtering',
        'Room UUID collaboration and live user presence indicators',
        'Late-joiner state handshake minimizing network overhead and avoiding replay delays',
        '7-language remote code compilation via Judge0 API with live terminal output',
        'Integrated in-room live chat panel for seamless pair programming communication',
      ],
      metricsDetail: 'Multi-user real-time state sync · Sub-50ms WebSocket latency · 7 language compilers',
    },
  },

  // 5. IncidentFlow (Fullstack)
  {
    id: 'incidentflow',
    index: '05',
    category: 'Fullstack',
    filterTag: 'Fullstack',
    icon: Activity,
    title: 'IncidentFlow',
    headline: 'Mission-critical incident management platform.',
    cardDescription:
      'A full-stack incident management system with automated SLA enforcement, Celery asynchronous alerts, RBAC, audit trails, and reliability analytics.',
    techStack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Celery'],
    highlights: [
      'Automated SLA deadline monitoring: Idempotent Celery engine with 80% duration early-warning alerts',
      'Role-based access control & audit trail: Immutable logging of every status and ownership change',
      'Mandatory postmortem gating: Enforces completed root-cause analysis before closing incidents',
    ],
    metrics: '29/29 tests passing',
    recruiterHighlight:
      'Engineered an idempotent asynchronous SLA engine that reliably notifies on approaching deadlines with an 80% duration warning threshold.',
    github: null,
    demo: null,
    tags: ['Fullstack', 'FastAPI', 'React', 'Celery', 'PostgreSQL', 'Redis', 'DevOps'],
    details: {
      description:
        'IncidentFlow is an end-to-end incident response platform built to manage engineering incidents and Service-Level Objectives (SLOs). It allows teams to log incidents with priorities (P0–P3) and automatically calculates SLA deadlines. Using a REST API or web interface, users can create incidents, assign ownership, update statuses, and comment on investigations.\n\nA core feature is the SLA engine. Using Celery and Redis, IncidentFlow continuously monitors active incidents. It sends early-warning alerts at 80% of the SLA duration and flags breaches past the deadline. The engine is idempotent: it avoids duplicate alerts while re-evaluating incidents. The system also enforces that no incident can move from Resolved to Closed without a required postmortem, embedding reliability into the workflow.\n\nSecurity and compliance are built-in with JWT authentication, Role-Based Access Control (Admin/Manager/Engineer), and an immutable audit log. A React + Tailwind dashboard provides reliability analytics (MTTR, SLA compliance) and a command palette for quick navigation.',
      allTech: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'SQLite', 'SQLAlchemy', 'Alembic', 'Celery', 'Redis', 'JWT', 'bcrypt', 'Pydantic', 'SlowAPI', 'Tailwind CSS', 'Recharts'],
      fullHighlights: [
        'Automated SLA deadline calculation with priority-based thresholds (P0–P3)',
        'Idempotent Celery-driven asynchronous alert pipeline with 80% warning threshold',
        'Immutable audit trail recording every state, priority, and ownership transition',
        'Mandatory postmortem gating enforcing root-cause completion before incident closure',
        'Role-based access control (Admin, Manager, Engineer) with JWT authentication',
        'Reliability analytics (MTTR, MTTA, and SLA compliance metrics across teams)',
        'Comprehensive 29/29 automated test suite',
      ],
      metricsDetail: '29/29 tests passing · Idempotent SLA alert processing · Multi-timezone awareness',
    },
  },

  // 6. Terminal Agent (Agents)
  {
    id: 'terminal-agent',
    index: '06',
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
      'Independent verification: Separates code generation from test execution and verification inside an isolated sandbox',
      'Automatic rollback & recovery: Classifies failures across 12 categories with SQLite checkpoints',
    ],
    metrics: 'Verify-First Workflow',
    recruiterHighlight:
      'Implements a verify-first workflow by executing an independent test runner in an isolated sandbox for each code modification.',
    github: null,
    demo: null,
    tags: ['Agents', 'Python', 'CLI', 'Testing', 'DevTools', 'Docker', 'SQLite'],
    details: {
      description:
        'Terminal Agent is an autonomous coding agent that executes development tasks end-to-end. It translates natural-language tasks into structured plans, applies code changes using controlled CLI tools, and immediately runs the project\'s test suite. It follows a verify-first approach: code generation is strictly separated from verification, and changes are only accepted when an independent test runner confirms all tests and invariant checks pass in a sandboxed environment.\n\nThe agent maintains context by ranking repository information and supports multiple LLM providers (OpenAI, Anthropic, Gemini, Ollama). It enforces strict security policies by performing secret detection and redaction. All tool commands execute inside isolated Docker or local sandboxes to avoid system contamination.\n\nTerminal Agent includes 12 specialized developer tools (for file editing, shell commands, etc.) and uses a SQLite database for session persistence and checkpoints. If failures occur, it classifies the error across 12 categories and automatically rolls back to the last stable state.',
      allTech: ['Python', 'Typer', 'Rich', 'Pydantic', 'HTTPX', 'GitPython', 'psutil', 'SQLite', 'Docker', 'Ollama', 'OpenAI API', 'Anthropic API', 'Gemini API', 'Pytest'],
      fullHighlights: [
        'Autonomous LLM planning and CLI execution loop with verify-first guardrails',
        'Deterministic context ranking over repository codebase files',
        'Multi-LLM provider architecture supporting OpenAI, Anthropic, Gemini, and Ollama',
        'Automated secret detection and redaction engine preventing credential leakage',
        'Independent sandboxed verification isolating test execution from agent generation',
        '12-category failure classification with automated SQLite rollback checkpoints',
      ],
      metricsDetail: '12 specialized CLI tools · Zero-contamination sandboxes · Multi-LLM provider support',
    },
  },

  // 7. Agent Bench (Agents)
  {
    id: 'agent-bench',
    index: '07',
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
      'Deterministic rule-based scoring: Avoids stochastic LLM judging through deterministic rule-based evaluation',
      'Execution trace logging: Complete JSON audit trail with tool calls, timestamps, and timing',
    ],
    metrics: '40+ benchmark tasks',
    recruiterHighlight:
      'Automated multi-task benchmarking of AI agents with deterministic rule-based scoring for fair, non-stochastic comparison.',
    github: null,
    demo: null,
    tags: ['Agents', 'Python', 'CLI', 'Benchmarking', 'DevTools', 'Docker'],
    details: {
      description:
        'Agent Bench (AgentBench) is a command-line benchmarking framework to evaluate autonomous AI agents. It defines benchmarks using declarative YAML, where each task specifies a series of prompts and expected outputs. The framework launches the agent in an isolated workspace, allowing it to run code or use tools. After execution, Agent Bench applies a multi-stage, rule-based judge to score the outputs.\n\nThis evaluation avoids stochastic LLM judgments: instead, it uses cascaded rules and regex checks to deterministically assess success. Every step of the agent\'s run is logged with timestamps, creating a full JSON trace of tool calls. This enables fine-grained analysis of performance and timing.\n\nUsers can define custom tasks or use the built-in 40+ real-world programming scenarios. Agent Bench provides metrics on task success rates and execution details, facilitating comparative analysis of different agents.',
      allTech: ['Python', 'Typer', 'Rich', 'YAML', 'JSON', 'Docker'],
      fullHighlights: [
        '40+ structured benchmark tasks spanning real-world bugs, features, and CLI tools',
        'Deterministic rule-based scoring eliminating stochastic grading variability',
        'Automated multi-agent execution and evaluation harness',
        'Full execution trace logging with microsecond timestamps and tool call inspection',
        'Custom task ingestion via declarative YAML specifications',
      ],
      metricsDetail: '40+ tasks · 100% deterministic evaluation · JSON execution traces',
    },
  },

  // 8. Model Router (Agents)
  {
    id: 'model-router',
    index: '08',
    category: 'Agents',
    filterTag: 'Agents',
    icon: Cpu,
    title: 'Model Router',
    headline: 'Adaptive LLM selection proxy designed to optimize inference costs through intelligent routing.',
    cardDescription:
      'An intelligent proxy gateway that dynamically routes LLM queries based on prompt complexity—directing simpler queries to lower-cost models while reserving premium models for complex tasks.',
    techStack: ['Python', 'FastAPI', 'OpenAI API', 'Anthropic API', 'Local LLMs'],
    highlights: [
      'Prompt-based model selection: Analyzes complexity to route between local models and flagship APIs',
      'OpenAI / Claude API proxy: API-compatible gateway and proxy for standard client SDKs',
      'Cost-efficient routing: Routes simpler queries to lower-cost models while reserving premium models for complex tasks',
    ],
    metrics: 'Adaptive Routing · Cost Optimization',
    recruiterHighlight:
      'Engineered an adaptive LLM gateway designed to reduce API costs by dynamically routing prompts based on query complexity.',
    github: null,
    demo: null,
    tags: ['Agents', 'AI', 'Python', 'FastAPI', 'LLM Proxy', 'Cost Optimization', 'OpenAI'],
    details: {
      description:
        'Model Router is an inference routing service that acts as an intelligent gateway for LLM requests. It analyzes each incoming prompt to determine complexity or intent, then dispatches it to the best-fitting model. For example, trivial prompts might be served by a lightweight local model, while complex reasoning tasks are routed to flagship frontier models.\n\nClients use standard OpenAI or Anthropic API endpoints to query the router, requiring no changes to existing SDK client code. The router handles credentials, token budgets, and unified streaming across backends.\n\nBy leveraging cost-effective models for straightforward queries and reserving high-end models for challenging ones, Model Router is designed to optimize API expenses, with benchmark results showing up to 40–70% API cost savings on tested workloads without quality degradation.',
      allTech: ['Python', 'FastAPI', 'HTTPX', 'OpenAI API', 'Anthropic API', 'Docker', 'Pydantic'],
      fullHighlights: [
        'Dynamic model routing based on prompt complexity analysis and token length',
        'Drop-in OpenAI and Anthropic API-compatible proxy interface',
        'Unified streaming support across local open-source and cloud models',
        'Cost-efficient routing routing simpler queries to lower-cost models and premium models for complex tasks',
        'Self-hosted gateway ensuring complete data privacy and customizable routing policies',
      ],
      metricsDetail: 'Adaptive routing: Benchmark results up to 40–70% cost savings on tested workloads · Sub-10ms routing overhead · Multi-provider failover',
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
      openSource: PROJECTS.filter((p) => p.filterTag === 'Open Source').length,
      ai: PROJECTS.filter((p) => p.filterTag === 'AI').length,
      fullstack: PROJECTS.filter((p) => p.filterTag === 'Fullstack').length,
      agents: PROJECTS.filter((p) => p.filterTag === 'Agents').length,
    };
  }, []);

  return (
    <Layout
      title="Projects"
      description="Production-oriented systems, autonomous AI agents, open-source software, and full-stack platforms built by Vardhman Gupta."
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
              Production-oriented systems, autonomous AI agents, open-source developer tooling, and full-stack platforms built around real engineering challenges.
            </p>
          </header>

          {/* Filter Pills: All, Open Source, AI, Fullstack, Agents */}
          <div className={styles.filterRow}>
            {[
              { id: 'All', label: `All (${counts.all})` },
              { id: 'Open Source', label: `Open Source (${counts.openSource})` },
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {project.license && (
                        <div className={styles.licenseBadge}>
                          <ShieldCheck size={13} />
                          <span>{project.license}</span>
                        </div>
                      )}
                      {project.metrics && (
                        <div className={styles.metricsPill}>
                          <CheckCircle2 size={13} />
                          <span>{project.metrics}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className={styles.titleBlock}>
                    <h2 className={styles.projectTitle}>{project.title}</h2>
                    <p className={styles.projectTagline}>{project.headline}</p>
                    <p className={styles.projectSummary}>{project.cardDescription}</p>
                  </div>

                  {/* Recruiter Callout */}
                  {project.recruiterHighlight && (
                    <div className={styles.recruiterCallout}>
                      <div className={styles.recruiterHeader}>
                        <ShieldCheck size={14} className={styles.recruiterIcon} />
                        <span className={styles.recruiterLabel}>Architecture Highlight</span>
                      </div>
                      <p className={styles.recruiterText}>{project.recruiterHighlight}</p>
                    </div>
                  )}

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

                  {/* Action Bar (Deep Dive toggle + Source Code + npm) */}
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
                      {project.github && (
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
                      )}
                      {project.npm && (
                        <a
                          href={project.npm}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionBtn}
                          title="View Package on npm"
                        >
                          <IconNpm size={14} />
                          <span>npm</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
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
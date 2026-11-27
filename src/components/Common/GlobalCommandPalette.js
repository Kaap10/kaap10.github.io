import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from '@docusaurus/router';
import {
  Compass,
  Layers,
  BookOpen,
  PenTool,
  Activity,
  Code2,
  Terminal,
  FileText,
  Sparkles,
  CheckSquare,
  Timer,
  BarChart3,
  Search,
  GitPullRequest,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Target,
  Clock,
  Flame,
  Globe,
  Mail,
  Database,
  Shield,
  Cpu,
  Briefcase,
  ShieldCheck
} from 'lucide-react';
import contributionsData from '@site/src/data/contributions.json';
import styles from './commonComponents.module.css';

// Master Command Registry
const COMMANDS = [
  // 1. Primary Hubs & Navigation
  {
    id: 'nav-portfolio',
    section: 'Navigation',
    title: 'Go to Portfolio (Home)',
    subtitle: 'Vardhman Gupta — AI Agents, Dev Tools, LLM Security & OSS',
    keywords: ['portfolio', 'home', 'resume', 'cv', 'about', 'engineer', 'experience', 'vardhman'],
    icon: <Compass size={16} />,
    path: '/portfolio',
  },
  {
    id: 'nav-opensource',
    section: 'Navigation',
    title: 'Go to Open Source Hub',
    subtitle: '177+ merged PRs across Apache, Microsoft PyRIT, DynaVec & PicadoLabs',
    keywords: ['opensource', 'open source', 'bwa', 'build-with-ai', 'dynavec', 'apache', 'magpie', 'pr', 'github'],
    icon: <GitPullRequest size={16} />,
    path: '/opensource',
  },
  {
    id: 'nav-projects',
    section: 'Navigation',
    title: 'Go to Projects',
    subtitle: 'build-with-ai, ai-model-router, terminal-agent & agent-bench',
    keywords: ['projects', 'repos', 'picadolabs', 'build-with-ai', 'ai-model-router', 'terminal-agent', 'agent-bench'],
    icon: <Code2 size={16} />,
    path: '/projects',
  },
  {
    id: 'nav-tech-blogs',
    section: 'Navigation',
    title: 'Open Technical Blogs (Hashnode)',
    subtitle: 'https://kap10.hashnode.dev/',
    keywords: ['blogs', 'technical blogs', 'hashnode', 'articles', 'writing', 'engineering'],
    icon: <BookOpen size={16} />,
    path: 'https://kap10.hashnode.dev/',
  },
  {
    id: 'nav-workspace',
    section: 'Navigation',
    title: 'Go to DevWorkspace Hub',
    subtitle: 'Integrated developer tooling & productivity suite',
    keywords: ['workspace', 'devworkspace', 'hub', 'suite', 'tools', 'whiteboard', 'notebook', 'tracker'],
    icon: <Layers size={16} />,
    path: '/workspace',
  },
  {
    id: 'nav-notes',
    section: 'Navigation',
    title: 'Go to Revision Notes',
    subtitle: 'Core Python, Flask, System Design & Engineering Notes',
    keywords: ['notes', 'docs', 'python', 'flask', 'dsa', 'system design', 'revision'],
    icon: <FileText size={16} />,
    path: '/blogs/intro',
  },
  {
    id: 'nav-terminal',
    section: 'Navigation',
    title: 'Go to Workstation Terminal',
    subtitle: 'Interactive Unix shell & developer terminal',
    keywords: ['terminal', 'cli', 'bash', 'pty', 'shell', 'neofetch'],
    icon: <Terminal size={16} />,
    path: '/',
  },

  // 2. Work Experience (Verified Timeline)
  {
    id: 'exp-timeline',
    section: 'Experience',
    title: 'Work Experience Timeline',
    subtitle: 'Apache Magpie Committer, PicadoLabs, Open Source & Dazu Services',
    keywords: ['experience', 'work', 'career', 'jobs', 'roles', 'resume', 'timeline', 'employment'],
    icon: <Briefcase size={16} />,
    path: '/portfolio#experience',
  },
  {
    id: 'exp-apache-magpie',
    section: 'Experience',
    title: 'Apache Magpie Committer',
    subtitle: 'The Apache Software Foundation · Nov 2026 – Present · Remote',
    keywords: ['apache', 'magpie', 'committer', 'asf', 'foundation', 'vcs', 'gitlab', 'forgejo', 'osv', 'claude code'],
    icon: <ShieldCheck size={16} />,
    path: '/portfolio#experience-apache-magpie',
  },
  {
    id: 'exp-picadolabs',
    section: 'Experience',
    title: 'Building @ PicadoLabs: Founder & Maintainer',
    subtitle: 'July 2026 – Present · 7.2k+ Downloads, 42+ Contributors, 4 Core Systems',
    keywords: ['picadolabs', 'founder', 'maintainer', 'ai', 'agents', 'experience', 'build-with-ai', 'router', 'agentbench', 'terminal agent'],
    icon: <Globe size={16} />,
    path: '/portfolio#experience-picadolabs',
  },
  {
    id: 'exp-opensource',
    section: 'Experience',
    title: 'Open Source Contributor',
    subtitle: 'Aug 2026 – Present · Apache Magpie (54 PRs), PyRIT (34 PRs), DynaVec (22 PRs)',
    keywords: ['opensource', 'open source', 'contributor', 'collaborator', 'apache', 'magpie', 'microsoft', 'pyrit', 'dynavec', 'experience', '177 prs'],
    icon: <GitPullRequest size={16} />,
    path: '/portfolio#experience-opensource',
  },
  {
    id: 'exp-dazu',
    section: 'Experience',
    title: 'Dazu Services (Startup): Full Stack Developer Intern',
    subtitle: 'Aug 2025 – Oct 2025 · React, TypeScript, Node.js, Supabase, Docker CI/CD',
    keywords: ['dazu', 'dazu services', 'intern', 'full stack', 'developer', 'startup', 'react', 'typescript', 'node.js', 'supabase', 'docker', 'latency'],
    icon: <Briefcase size={16} />,
    path: '/portfolio#experience-dazu',
  },
  {
    id: 'exp-freelancing',
    section: 'Experience',
    title: 'Freelancing: Delivered Website to Startup',
    subtitle: 'March 2025 – April 2025 · Production platform delivery ($48 contract)',
    keywords: ['freelance', 'freelancing', 'client', 'startup', 'contract', 'delivered', 'experience'],
    icon: <Code2 size={16} />,
    path: '/portfolio#experience-freelancing',
  },

  // 3. Open Source Showcases (Verified Live Data)
  {
    id: 'oss-feed',
    section: 'Open Source',
    title: 'Open Source Hub: 177+ Merged Pull Requests',
    subtitle: 'Full interactive feed across 31 repositories (Apache, Microsoft, DynaVec, PicadoLabs)',
    keywords: ['opensource', 'open source', 'prs', 'merged', 'github', 'feed', '177 prs', '206 prs', 'contributions'],
    icon: <GitPullRequest size={16} />,
    path: '/opensource',
  },
  {
    id: 'oss-live-feed',
    section: 'Open Source',
    title: 'Live PR Activity Feed (206 Authored PRs)',
    subtitle: 'Filterable list of all merged, open, and closed pull requests',
    keywords: ['pr feed', 'contributions', 'activity', 'pull requests', '206'],
    icon: <Activity size={16} />,
    path: '/contribution',
  },
  {
    id: 'oss-magpie',
    section: 'Open Source',
    title: 'Apache Magpie (Committer): 54 Merged PRs',
    subtitle: 'Security triage queue, multi-agent review comparison, RFC-AI-0004 & agent-iso',
    keywords: ['apache', 'magpie', 'committer', 'copilot', 'aider', 'goose', 'mcp', 'hitl', 'agent', '54 prs'],
    icon: <Shield size={16} />,
    path: '/opensource/magpie',
  },
  {
    id: 'oss-pyrit',
    section: 'Open Source',
    title: 'Microsoft PyRIT: 34 Merged PRs',
    subtitle: 'AI Red Teaming, SQLi/PathTraversal/XXE/SSTI scorers & GCG adversarial pipeline',
    keywords: ['microsoft', 'pyrit', 'gcg', 'jailbreak', 'red team', 'sqli', 'xxe', 'ssti', '34 prs'],
    icon: <Zap size={16} />,
    path: '/opensource/pyrit',
  },
  {
    id: 'oss-dynavec',
    section: 'Open Source',
    title: 'DynaVec (Collaborator): 22 Merged PRs',
    subtitle: 'Serverless hybrid vector DB, ReAct agent primitives & CI regression evals',
    keywords: ['dynavec', 'vector', 'database', 'collaborator', 'fastmcp', 'dynamodb', 's3', '22 prs'],
    icon: <Zap size={16} />,
    path: '/opensource/dynavec',
  },
  {
    id: 'oss-picadolabs',
    section: 'Open Source',
    title: 'PicadoLabs: 7.2k+ Downloads & 42+ Contributors',
    subtitle: 'Autonomous AI developer infrastructure org (Founder & Maintainer)',
    keywords: ['picadolabs', 'org', 'maintainer', 'tools', 'developer tools', '7.2k downloads', '42 contributors', 'owner'],
    icon: <Globe size={16} />,
    path: '/opensource/picadolabs',
  },
  {
    id: 'oss-sqlite-graph',
    section: 'Open Source',
    title: 'SQLite-Graph-Memory: 6 Merged PRs',
    subtitle: 'Graph RAG over Markdown, MCP server runtime & JSON-RPC validation',
    keywords: ['sqlite', 'graph', 'memory', 'mcp', 'rag', 'claude', 'cursor', '6 prs'],
    icon: <Database size={16} />,
    path: '/opensource/sqlite-graph-memory',
  },
  {
    id: 'oss-palinode',
    section: 'Open Source',
    title: 'Palinode: Win32 Kernel Synchronization',
    subtitle: 'Non-signalling WaitForSingleObject probing & POSIX path guards',
    keywords: ['palinode', 'win32', 'kernel', 'waitforsingleobject', 'ast'],
    icon: <Cpu size={16} />,
    path: '/opensource/palinode',
  },
  {
    id: 'oss-quater',
    section: 'Open Source',
    title: 'Quater: Remote CLI Transport & RPC',
    subtitle: 'Repeatable --header flags, Bearer auth merge engine & Python CI',
    keywords: ['quater', 'cli', 'header', 'bearer', 'auth', 'rpc'],
    icon: <Terminal size={16} />,
    path: '/opensource/quater',
  },
  {
    id: 'oss-layer5io',
    section: 'Open Source',
    title: 'Layer5 Meshery: 4 Merged PRs',
    subtitle: 'Cloud native component catalog, Kind/Podman prerequisites & academy routes',
    keywords: ['layer5', 'meshery', 'catalog', 'cloud native', 'kubernetes'],
    icon: <Sparkles size={16} />,
    path: '/opensource/layer5io',
  },

  // 4. PicadoLabs Core Projects
  {
    id: 'proj-bwa',
    section: 'Projects',
    title: 'build-with-ai: Zero-API Deterministic SDLC CLI',
    subtitle: '1.4k+ Downloads · 30+ Contributors · Persistent .buildwithai/ memory',
    keywords: ['build-with-ai', 'bwa', 'cli', 'zero-api', 'npm', 'sdlc', 'templates', '1.4k'],
    icon: <Terminal size={16} />,
    path: '/build-with-ai',
  },
  {
    id: 'proj-router',
    section: 'Projects',
    title: 'ai-model-router: Cost-Aware LLM Routing & RL Gateway',
    subtitle: '3.7k+ Downloads · 13+ Contributors · Sub-3ms Pareto Traffic Control',
    keywords: ['ai-model-router', 'router', 'llm', 'thompson sampling', 'onnx', 'fastapi', '3.7k'],
    icon: <Cpu size={16} />,
    path: '/opensource/picadolabs#ai-model-router',
  },
  {
    id: 'proj-terminal-agent',
    section: 'Projects',
    title: 'terminal-agent: Verify-First Sandboxed Coding Agent',
    subtitle: '1.4k+ Downloads · 4+ Contributors · Docker isolation & SQLite rollback',
    keywords: ['terminal-agent', 'coding agent', 'sandbox', 'docker', 'verify-first', '1.4k'],
    icon: <Shield size={16} />,
    path: '/opensource/picadolabs#terminal-agent',
  },
  {
    id: 'proj-agent-bench',
    section: 'Projects',
    title: 'agent-bench: Multi-Turn Coding Agent Eval Suite',
    subtitle: '700+ Downloads · 4+ Contributors · 12 polyglot benchmarks & 5D scoring',
    keywords: ['agent-bench', 'benchmark', 'eval', 'ollama', 'yaml', '700'],
    icon: <BarChart3 size={16} />,
    path: '/opensource/picadolabs#agent-bench',
  },

  // 5. DevWorkspace Tools
  {
    id: 'ws-whiteboard',
    section: 'Workspace',
    title: 'Open Whiteboard Canvas (Excalidraw)',
    subtitle: 'Full-bleed architecture sketching and system diagrams',
    keywords: ['whiteboard', 'board', 'draw', 'excalidraw', 'diagram', 'architecture', 'sketch', 'canvas'],
    icon: <PenTool size={16} />,
    path: '/workspace/whiteboard',
  },
  {
    id: 'ws-notebook',
    section: 'Workspace',
    title: 'Open Developer Notebook',
    subtitle: 'Two-pane Markdown editor, code scratchpad & persistent notes',
    keywords: ['notebook', 'notes', 'markdown', 'onenote', 'notion', 'editor', 'scratchpad'],
    icon: <BookOpen size={16} />,
    path: '/workspace/notebook',
  },
  {
    id: 'ws-tracker',
    section: 'Workspace',
    title: 'Go to Productivity Tracker',
    subtitle: 'Unified tasks, daily habits matrix, focus timer & 52-week heatmap',
    keywords: ['tracker', 'today', 'dashboard', 'productivity', 'habits', 'tasks', 'focus', 'pomodoro'],
    icon: <Activity size={16} />,
    path: '/workspace/tracker',
  },
  {
    id: 'ws-tasks',
    section: 'Workspace',
    title: 'Tracker: Tasks & Execution Board',
    subtitle: 'Priority Kanban pipelines, backlog management',
    keywords: ['tasks', 'todo', 'kanban', 'pipeline', 'backlog'],
    icon: <CheckSquare size={16} />,
    path: '/workspace/tracker?tab=tasks',
  },
  {
    id: 'ws-goals',
    section: 'Workspace',
    title: 'Tracker: Goals & Milestones',
    subtitle: 'Strategic objectives, deliverables & quarterly OKRs',
    keywords: ['goals', 'milestones', 'targets', 'objectives', 'okr'],
    icon: <Target size={16} />,
    path: '/workspace/tracker?tab=goals',
  },
  {
    id: 'ws-habits',
    section: 'Workspace',
    title: 'Tracker: Daily Habits Matrix',
    subtitle: 'Habit streaks, consistency tracking & frequency logs',
    keywords: ['habits', 'streaks', 'atomic', 'daily', 'consistency'],
    icon: <Flame size={16} />,
    path: '/workspace/tracker?tab=habits',
  },
  {
    id: 'ws-focus',
    section: 'Workspace',
    title: 'Tracker: Deep Work Focus Timer',
    subtitle: 'Pomodoro countdown clock, audio chimes & focus states',
    keywords: ['focus', 'timer', 'pomodoro', 'deep work', 'countdown'],
    icon: <Clock size={16} />,
    path: '/workspace/tracker?tab=focus',
  },
  {
    id: 'ws-insights',
    section: 'Workspace',
    title: 'Tracker: Analytics & 52-Week Heatmap',
    subtitle: 'Annual productivity metrics, completion rates & retrospectives',
    keywords: ['insights', 'analytics', 'stats', 'heatmap', 'activity', 'retrospective'],
    icon: <BarChart3 size={16} />,
    path: '/workspace/tracker?tab=progress',
  },
  {
    id: 'tool-scratchpad',
    section: 'Workspace',
    title: 'Open Quick Scratchpad Drawer',
    subtitle: 'Persistent memo drawer accessible across any page',
    shortcut: 'Ctrl+J',
    keywords: ['scratchpad', 'notes', 'memo', 'editor', 'drawer', 'workspace'],
    icon: <FileText size={16} />,
    action: ({ navigate }) => {
      if (typeof window !== 'undefined') {
        const isWs = window.location.pathname.startsWith('/workspace');
        if (!isWs) {
          navigate('/workspace');
        }
        window.dispatchEvent(new CustomEvent('scratchpad:open'));
      }
    },
  },

  // 6. Quick Actions & Profiles
  {
    id: 'focus-25',
    section: 'Actions',
    title: 'Start 25m Focus Session (Pomodoro)',
    subtitle: 'Launches persistent focus countdown widget',
    keywords: ['pomodoro', '25', 'focus', 'timer', 'start'],
    icon: <Timer size={16} />,
    action: ({ setToast }) => {
      const state = {
        startedAt: Date.now(),
        accumulated: 0,
        totalPreset: 25 * 60,
        mode: 'countdown',
        isActive: true,
        isoStartTime: new Date().toISOString(),
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('kaap10_active_focus_session', JSON.stringify(state));
        localStorage.setItem('kaap10_widget_visible', '1');
        window.dispatchEvent(new CustomEvent('focusWidget:open'));
        window.dispatchEvent(new CustomEvent('focusWidget:stateChange', { detail: state }));
        window.dispatchEvent(new CustomEvent('focusTimer:start', { detail: { duration: 25 * 60 } }));
        window.dispatchEvent(new CustomEvent('focusCapsule:open'));
        setToast('Started 25m Focus Session');
      }
    },
  },
  {
    id: 'focus-50',
    section: 'Actions',
    title: 'Start 50m Deep Work Session',
    subtitle: 'Launches 50-minute deep work sprint capsule',
    keywords: ['deep work', '50', 'focus', 'timer', 'sprint'],
    icon: <Timer size={16} />,
    action: ({ setToast }) => {
      const state = {
        startedAt: Date.now(),
        accumulated: 0,
        totalPreset: 50 * 60,
        mode: 'countdown',
        isActive: true,
        isoStartTime: new Date().toISOString(),
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('kaap10_active_focus_session', JSON.stringify(state));
        localStorage.setItem('kaap10_widget_visible', '1');
        window.dispatchEvent(new CustomEvent('focusWidget:open'));
        window.dispatchEvent(new CustomEvent('focusWidget:stateChange', { detail: state }));
        window.dispatchEvent(new CustomEvent('focusTimer:start', { detail: { duration: 50 * 60 } }));
        window.dispatchEvent(new CustomEvent('focusCapsule:open'));
        setToast('Started 50m Deep Work Session');
      }
    },
  },
  {
    id: 'focus-pip',
    section: 'Actions',
    title: 'Open Floating Timer Capsule (PiP)',
    subtitle: 'Picture-in-picture floating mini clock widget',
    keywords: ['pip', 'floating', 'capsule', 'widget', 'mini timer'],
    icon: <Clock size={16} />,
    action: ({ setToast }) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('kaap10_widget_visible', '1');
        localStorage.setItem('kaap10_widget_size', 'pill');
        window.dispatchEvent(new CustomEvent('focusWidget:open'));
        setToast('Floating Timer Capsule opened');
      }
    },
  },
  {
    id: 'action-copy-portfolio',
    section: 'Actions',
    title: 'Copy Portfolio URL to Clipboard',
    subtitle: 'https://kaap10.github.io/portfolio',
    keywords: ['copy', 'portfolio', 'link', 'share', 'url'],
    icon: <Copy size={16} />,
    action: ({ setToast }) => {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText('https://kaap10.github.io/portfolio');
        setToast('Portfolio URL copied to clipboard');
      }
    },
  },
  {
    id: 'action-copy-email',
    section: 'Actions',
    title: 'Copy Email Address to Clipboard',
    subtitle: 'vardhmangupta2004@gmail.com',
    keywords: ['email', 'copy', 'mail', 'contact', 'reach out'],
    icon: <Mail size={16} />,
    action: ({ setToast }) => {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText('vardhmangupta2004@gmail.com');
        setToast('Email address copied to clipboard');
      }
    },
  },
  {
    id: 'action-apache-prs',
    section: 'Actions',
    title: 'View Merged Apache Pull Requests',
    subtitle: 'Direct GitHub search for Apache contributions',
    keywords: ['apache', 'magpie', 'pr', 'pull requests', 'contributions', 'github'],
    icon: <GitPullRequest size={16} />,
    action: () => {
      window.open('https://github.com/search?q=org%3AApache+is%3Apr+is%3Amerged+author%3AKaap10&type=pullrequests', '_blank');
    },
  },
  {
    id: 'social-github',
    section: 'Actions',
    title: 'Open GitHub Profile (@Kaap10)',
    subtitle: 'Repositories, open source PRs and activity',
    keywords: ['github', 'profile', 'repos', 'kaap10'],
    icon: <ExternalLink size={16} />,
    action: () => window.open('https://github.com/Kaap10', '_blank'),
  },
  {
    id: 'social-linkedin',
    section: 'Actions',
    title: 'Open LinkedIn Profile',
    subtitle: 'Vardhman Gupta professional profile',
    keywords: ['linkedin', 'profile', 'connect', 'vardhman'],
    icon: <ExternalLink size={16} />,
    action: () => window.open('https://linkedin.com/in/vardhman-gupta', '_blank'),
  },
  {
    id: 'social-leetcode',
    section: 'Actions',
    title: 'Open LeetCode Profile (@kap10)',
    subtitle: 'Data structures & algorithms problem solving',
    keywords: ['leetcode', 'dsa', 'algorithms', 'problems'],
    icon: <ExternalLink size={16} />,
    action: () => window.open('https://leetcode.com/u/kap10/', '_blank'),
  },
  {
    id: 'social-email',
    section: 'Actions',
    title: 'Send Email to Vardhman Gupta',
    subtitle: 'mailto:vardhmangupta2004@gmail.com',
    keywords: ['email', 'contact', 'mail', 'reach out'],
    icon: <Mail size={16} />,
    action: () => (window.location.href = 'mailto:vardhmangupta2004@gmail.com'),
  },
];

// Tiered relevance scoring for fast fuzzy matches
function scoreCommand(cmd, query) {
  if (!query) return 1;
  const q = query.toLowerCase().trim();
  const title = cmd.title.toLowerCase();
  const subtitle = (cmd.subtitle || '').toLowerCase();
  const section = cmd.section.toLowerCase();
  const keywords = (cmd.keywords || []).map((k) => k.toLowerCase());

  if (title === q) return 1000;
  if (title.startsWith(q)) return 500;
  const words = title.split(/[\s:,\-()]+/).filter(Boolean);
  if (words.some((w) => w === q)) return 350;
  if (words.some((w) => w.startsWith(q))) return 250;
  if (title.includes(q)) return 180;
  if (subtitle.includes(q)) return 140;
  if (keywords.some((k) => k === q)) return 160;
  if (keywords.some((k) => k.startsWith(q))) return 120;
  if (keywords.some((k) => k.includes(q))) return 80;
  if (section.startsWith(q)) return 60;
  if (section.includes(q)) return 40;

  // Multi-term token matching
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length > 1) {
    const fullHaystack = `${title} ${subtitle} ${section} ${keywords.join(' ')}`;
    if (tokens.every((t) => fullHaystack.includes(t))) {
      let score = 220;
      if (tokens.every((t) => title.includes(t))) score += 120;
      return score;
    }
  }

  // Initialisms (e.g., "mcp", "dsa", "pr", "bwa")
  const acronym = words.map((w) => w[0]).join('');
  if (acronym.includes(q)) return 110;

  return 0;
}

// Live PR search across verified GitHub contributions
function searchPullRequests(query) {
  const raw = query.trim().toLowerCase();
  if (raw.length < 2 || !contributionsData?.items) return [];

  const cleanNum = raw.startsWith('#') ? raw.slice(1) : raw;
  const tokens = raw.split(/\s+/).filter(Boolean);
  const matches = [];

  for (const pr of contributionsData.items) {
    const numStr = String(pr.number || '');
    const titleLower = (pr.title || '').toLowerCase();
    const repoLower = (pr.repo || '').toLowerCase();
    let score = 0;

    if (numStr === cleanNum) {
      score = 950;
    } else if (numStr.startsWith(cleanNum) && /^\d+$/.test(cleanNum)) {
      score = 400;
    } else if (tokens.every((t) => titleLower.includes(t) || repoLower.includes(t) || numStr.includes(t.replace('#', '')))) {
      score = repoLower.includes(raw) ? 150 : 120;
      if (pr.status === 'merged') score += 20;
    }

    if (score > 0) {
      matches.push({ pr, score });
    }
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, 6).map(({ pr }) => ({
    id: `pr-${pr.id}`,
    section: 'Pull Requests',
    title: `#${pr.number}: ${pr.title}`,
    subtitle: `${pr.repo} · ${pr.status.toUpperCase()} · ${pr.closed_at || pr.created_at}`,
    shortcut: pr.status.toUpperCase(),
    icon: <GitPullRequest size={16} />,
    path: pr.url,
  }));
}

// Highlight matching substring inside title
function HighlightMatch({ text, query }) {
  const q = query.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className={styles.paletteHighlight}>{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

const CATEGORY_CHIPS = ['All', 'Experience', 'Navigation', 'Open Source', 'Projects', 'Workspace', 'Actions'];

export default function GlobalCommandPalette() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  const inputRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const toastTimeoutRef = useRef(null);
  const toastTriggeredRef = useRef(false);
  const pointerMovedRef = useRef(false);
  const history = useHistory();

  const showToast = (msg) => {
    toastTriggeredRef.current = true;
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      setIsOpen(false);
    }, 1050);
  };

  const navigateTo = (path) => {
    if (!path) return;
    if (path.startsWith('http') || path.startsWith('mailto:')) {
      window.open(path, path.startsWith('mailto:') ? '_self' : '_blank', 'noopener,noreferrer');
    } else {
      try {
        const [targetPath, hash] = path.split('#');
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

        if (hash && (currentPath === targetPath || (currentPath === '/' && targetPath === '/portfolio'))) {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }

        if (history && typeof history.push === 'function') {
          history.push(path);
        } else {
          window.location.href = path;
        }

        if (hash) {
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 150);
        }
      } catch (_) {
        window.location.href = path;
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Global Keyboard Listener: Ctrl+K / Cmd+K (plus '/' when not in an input)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (
        e.key === '/' &&
        !isOpen &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '') &&
        !document.activeElement?.isContentEditable
      ) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Open Command Palette via custom event
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
    };
    window.addEventListener('commandPalette:open', handleOpenEvent);
    return () => window.removeEventListener('commandPalette:open', handleOpenEvent);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveCategory('All');
      setSelectedIndex(0);
      setToastMessage(null);
      toastTriggeredRef.current = false;
      pointerMovedRef.current = false;
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isOpen]);

  // Scored & Category Filtered Commands + Live PR Search
  const filtered = useMemo(() => {
    let list = COMMANDS;

    if (activeCategory !== 'All') {
      list = list.filter((c) => c.section === activeCategory);
    }

    if (!query.trim()) {
      return list;
    }

    const scored = [];
    for (const cmd of list) {
      const score = scoreCommand(cmd, query);
      if (score > 0) {
        scored.push({ cmd, score });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    const results = scored.map((s) => s.cmd);

    // Append verified GitHub PR matches when searching across All or Open Source
    if (activeCategory === 'All' || activeCategory === 'Open Source') {
      const prMatches = searchPullRequests(query);
      results.push(...prMatches);
    }

    return results;
  }, [query, activeCategory]);

  // Instant scroll without lag
  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex].scrollIntoView({
        block: 'nearest',
        behavior: 'auto',
      });
    }
  }, [selectedIndex]);

  const executeCommand = (cmd) => {
    if (!cmd) return;
    if (cmd.action) {
      toastTriggeredRef.current = false;
      cmd.action({
        navigate: navigateTo,
        setToast: showToast,
      });
      if (!toastTriggeredRef.current) {
        setTimeout(() => setIsOpen(false), 60);
      }
    } else if (cmd.path) {
      setIsOpen(false);
      navigateTo(cmd.path);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      pointerMovedRef.current = false;
      if (filtered.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      pointerMovedRef.current = false;
      if (filtered.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      pointerMovedRef.current = false;
      setSelectedIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      pointerMovedRef.current = false;
      if (filtered.length > 0) setSelectedIndex(filtered.length - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filtered[selectedIndex];
      if (selected) {
        executeCommand(selected);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currentIdx = CATEGORY_CHIPS.indexOf(activeCategory);
      const step = e.shiftKey ? -1 : 1;
      const nextCategory = CATEGORY_CHIPS[(currentIdx + step + CATEGORY_CHIPS.length) % CATEGORY_CHIPS.length];
      setActiveCategory(nextCategory);
      setSelectedIndex(0);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (query.trim()) {
        setQuery('');
        setSelectedIndex(0);
      } else {
        setIsOpen(false);
      }
    }
  };

  if (!mounted || !isOpen || typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <div className={styles.paletteOverlay} onClick={() => setIsOpen(false)}>
      <div
        className={styles.paletteModal}
        style={{ position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        onMouseMove={() => {
          pointerMovedRef.current = true;
        }}
      >
        {/* Action Toast Feedback Pill */}
        {toastMessage && (
          <div className={styles.paletteToast}>
            <Check size={14} style={{ color: '#34D399' }} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Search Header */}
        <div className={styles.paletteSearchWrapper}>
          <span style={{ color: '#38BDF8', display: 'flex' }}>
            <Search size={17} />
          </span>
          <input
            ref={inputRef}
            type="text"
            className={styles.paletteInput}
            placeholder="Search experience, 206 PRs (#2295), projects, or hit Tab..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className={styles.paletteShortcutBadge}>{query ? 'ESC clear' : 'ESC'}</span>
        </div>

        {/* Category Filter Chips Bar */}
        <div className={styles.paletteFilterBar}>
          {CATEGORY_CHIPS.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.paletteFilterBtn} ${activeCategory === cat ? styles.paletteFilterBtnActive : ''}`}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Command List */}
        <div className={styles.paletteList} ref={listRef}>
          {filtered.length === 0 ? (
            <div className={styles.paletteEmpty}>
              No commands or PRs found matching "{query}"
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              const prevItem = index > 0 ? filtered[index - 1] : null;
              const showSectionHeader =
                (activeCategory === 'All' || item.section === 'Pull Requests') &&
                (!prevItem || prevItem.section !== item.section);

              return (
                <React.Fragment key={item.id}>
                  {showSectionHeader && (
                    <div className={styles.paletteSectionTitle}>{item.section}</div>
                  )}
                  <button
                    ref={(el) => (itemRefs.current[index] = el)}
                    type="button"
                    className={`${styles.paletteItem} ${isSelected ? styles.paletteItemActive : ''}`}
                    onClick={() => executeCommand(item)}
                    onMouseEnter={() => {
                      if (pointerMovedRef.current) setSelectedIndex(index);
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                      <span className={styles.paletteItemIcon}>{item.icon}</span>
                      <div className={styles.paletteItemContent}>
                        <span className={styles.paletteItemTitle}>
                          <HighlightMatch text={item.title} query={query} />
                        </span>
                        {item.subtitle && (
                          <span className={styles.paletteItemSub}>{item.subtitle}</span>
                        )}
                      </div>
                    </div>

                    {item.shortcut && (
                      <span className={styles.paletteShortcutBadge}>{item.shortcut}</span>
                    )}
                  </button>
                </React.Fragment>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className={styles.paletteFooter}>
          <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span>
              <kbd className={styles.paletteShortcutBadge}>↑</kbd>{' '}
              <kbd className={styles.paletteShortcutBadge}>↓</kbd> navigate
            </span>
            <span>
              <kbd className={styles.paletteShortcutBadge}>↵</kbd> open
            </span>
            <span>
              <kbd className={styles.paletteShortcutBadge}>Tab</kbd> category
            </span>
          </div>
          <span className={styles.paletteCountMeta}>
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'} · Ctrl+K
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}

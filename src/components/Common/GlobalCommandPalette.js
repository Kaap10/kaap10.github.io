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
  Repeat,
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
  Wrench,
  Sun,
  Moon,
  Database,
  Shield,
  Cpu
} from 'lucide-react';
import styles from './commonComponents.module.css';

// Master Command Registry
const COMMANDS = [
  // 1. Primary Hubs & Navigation
  {
    id: 'nav-portfolio',
    section: 'Navigation',
    title: 'Go to Portfolio',
    subtitle: 'Vardhman Gupta — AI Engineer',
    keywords: ['portfolio', 'resume', 'cv', 'about', 'engineer', 'experience', 'vardhman'],
    shortcut: 'G P',
    icon: <Compass size={16} />,
    path: '/portfolio',
  },
  {
    id: 'nav-workspace',
    section: 'Navigation',
    title: 'Go to DevWorkspace Hub',
    subtitle: 'Integrated developer tooling & productivity suite',
    keywords: ['workspace', 'devworkspace', 'hub', 'suite', 'tools', 'whiteboard', 'notebook', 'tracker'],
    shortcut: 'G W',
    icon: <Layers size={16} />,
    path: '/workspace',
  },
  {
    id: 'nav-opensource',
    section: 'Navigation',
    title: 'Go to Open Source Hub',
    subtitle: 'Apache, Microsoft PyRIT, Dynavec, Palinode & MCP contributions',
    keywords: ['opensource', 'open source', 'bwa', 'build-with-ai', 'dynavec', 'apache', 'magpie', 'pr', 'github'],
    shortcut: 'G O',
    icon: <GitPullRequest size={16} />,
    path: '/opensource',
  },
  {
    id: 'nav-projects',
    section: 'Navigation',
    title: 'Go to Featured Projects',
    subtitle: 'Karya AI, AuraNow, IncidentFlow & Autonomous Agent systems',
    keywords: ['projects', 'repos', 'karya', 'auranow', 'incidentflow', 'terminal agent', 'code with buddy'],
    shortcut: 'G J',
    icon: <Code2 size={16} />,
    path: '/projects',
  },
  {
    id: 'nav-blogs',
    section: 'Navigation',
    title: 'Go to Technical Blogs',
    subtitle: 'System Design, DSA, ML & Large Language Models',
    keywords: ['blogs', 'articles', 'dsa', 'system design', 'machine learning', 'llm', 'transformers'],
    shortcut: 'G L',
    icon: <FileText size={16} />,
    path: '/blogs/intro',
  },
  {
    id: 'nav-docs',
    section: 'Navigation',
    title: 'Go to Technical Documentation',
    subtitle: 'Comprehensive guides and engineering references',
    keywords: ['docs', 'documentation', 'guides', 'reference', 'manual', 'api'],
    shortcut: 'G D',
    icon: <BookOpen size={16} />,
    path: '/docs',
  },
  {
    id: 'nav-terminal',
    section: 'Navigation',
    title: 'Go to Workstation Terminal (Home)',
    subtitle: 'Interactive Unix shell & developer terminal',
    keywords: ['terminal', 'home', 'cli', 'bash', 'pty', 'shell', 'neofetch'],
    shortcut: 'G H',
    icon: <Terminal size={16} />,
    path: '/',
  },

  // 2. Open Source Showcases (All Merged Work)
  {
    id: 'oss-magpie',
    section: 'Open Source',
    title: 'Apache Magpie: Universal Agent Harnesses',
    subtitle: 'RFC-AI-0004 standard, Copilot CLI, Aider, Goose & agent-iso sandbox',
    keywords: ['apache', 'magpie', 'copilot', 'aider', 'goose', 'mcp', 'hitl', 'agent', 'pr 1287', 'pr 1286', 'pr 1217'],
    icon: <Shield size={16} />,
    path: '/opensource/magpie',
  },
  {
    id: 'oss-pyrit',
    section: 'Open Source',
    title: 'Microsoft PyRIT: GCG Adversarial Pipeline',
    subtitle: 'Dynamic schedule machine, L2 candidate proposer & prompt VRAM cleanup',
    keywords: ['microsoft', 'pyrit', 'gcg', 'jailbreak', 'red team', 'vram', 'torch', 'pr 2720', 'pr 2671', 'pr 2700'],
    icon: <Zap size={16} />,
    path: '/opensource/pyrit',
  },
  {
    id: 'oss-sqlite-graph',
    section: 'Open Source',
    title: 'SQLite-Graph-Memory: Native MCP & Graph RAG',
    subtitle: 'Pure Python stdlib JSON-RPC 2.0 stdio server & NamedTemporaryFile bridge',
    keywords: ['sqlite', 'graph', 'memory', 'mcp', 'rag', 'claude', 'cursor', 'namedtemporaryfile', 'pr 8', 'pr 10', 'pr 14'],
    icon: <Database size={16} />,
    path: '/opensource/sqlite-graph-memory',
  },
  {
    id: 'oss-palinode',
    section: 'Open Source',
    title: 'Palinode: Win32 Kernel Synchronization',
    subtitle: 'Non-signalling WaitForSingleObject probing & STILL_ACTIVE 259 shield',
    keywords: ['palinode', 'win32', 'kernel', 'waitforsingleobject', 'still_active', 'ast', 'pr 215', 'pr 207'],
    icon: <Cpu size={16} />,
    path: '/opensource/palinode',
  },
  {
    id: 'oss-quater',
    section: 'Open Source',
    title: 'Quater: Remote CLI Transport & RPC',
    subtitle: 'Repeatable --header flags, Bearer auth merge engine & Python 3.11-3.14 CI',
    keywords: ['quater', 'cli', 'header', 'bearer', 'auth', 'rpc', 'matrix', 'pr 192'],
    icon: <Terminal size={16} />,
    path: '/opensource/quater',
  },
  {
    id: 'oss-dynavec',
    section: 'Open Source',
    title: 'Dynavec: Vector DB & SPFresh Hot Index',
    subtitle: 'FastMCP stdio server, 2-Means RAM index, SHA-256 dedup & S3 cold storage',
    keywords: ['dynavec', 'vector', 'database', 'fastmcp', 'dynamodb', 's3', 'spfresh', 'pr 165', 'pr 170', 'pr 120'],
    icon: <Zap size={16} />,
    path: '/opensource/dynavec',
  },
  {
    id: 'oss-layer5io',
    section: 'Open Source',
    title: 'Layer5 Meshery: Design Engine & Catalog',
    subtitle: 'Unified cloud native component catalog, SVG render pipelines & PR #1082',
    keywords: ['layer5', 'meshery', 'catalog', 'svg', 'cloud native', 'pr 1082', 'pr 1083'],
    icon: <Sparkles size={16} />,
    path: '/opensource/layer5io',
  },
  {
    id: 'oss-bwa',
    section: 'Open Source',
    title: 'build-with-ai: Zero-API-Key Coding CLI',
    subtitle: 'Autonomous AI terminal coding agent, multi-provider model routing',
    keywords: ['build-with-ai', 'bwa', 'cli', 'zero-api', 'npm', 'prompt engineering', 'coding agent'],
    icon: <Sparkles size={16} />,
    path: '/build-with-ai',
  },
  {
    id: 'oss-picadolabs',
    section: 'Open Source',
    title: 'PicadoLabs: Developer Tooling Organization',
    subtitle: 'Open-source infrastructure tooling (Owner and Lead Maintainer)',
    keywords: ['picadolabs', 'org', 'maintainer', 'tools', 'developer tools'],
    icon: <Globe size={16} />,
    path: '/opensource/picadolabs',
  },

  // 3. Featured Projects
  {
    id: 'proj-karya',
    section: 'Projects',
    title: 'Karya: Autonomous AI Task Execution Platform',
    subtitle: 'Hierarchical multi-agent reasoning, DAG dependency scheduling',
    keywords: ['karya', 'agent', 'dag', 'autonomous', 'ai platform', 'workflow'],
    icon: <Sparkles size={16} />,
    path: '/projects/karya',
  },
  {
    id: 'proj-auranow',
    section: 'Projects',
    title: 'AuraNow: Contextual Real-Time AI System',
    subtitle: 'Adaptive user state modeling, low-latency contextual inference',
    keywords: ['auranow', 'contextual', 'realtime', 'streaming', 'neural'],
    icon: <Activity size={16} />,
    path: '/projects/auranow',
  },
  {
    id: 'proj-incidentflow',
    section: 'Projects',
    title: 'IncidentFlow: AI Incident Triage Engine',
    subtitle: 'Automated telemetry root-cause clustering and diagnostic runbooks',
    keywords: ['incidentflow', 'sre', 'incident', 'devops', 'triage', 'root cause'],
    icon: <Shield size={16} />,
    path: '/projects/incidentflow',
  },
  {
    id: 'proj-code-with-buddy',
    section: 'Projects',
    title: 'Code with Buddy: AI Pair Programming',
    subtitle: 'Live collaborative coding with contextual LLM code analysis',
    keywords: ['code with buddy', 'pair programming', 'editor', 'collaboration'],
    icon: <Code2 size={16} />,
    path: '/projects/code-with-buddy',
  },

  // 4. DevWorkspace Tools
  {
    id: 'ws-whiteboard',
    section: 'Workspace',
    title: 'Open Whiteboard Canvas (Excalidraw)',
    subtitle: 'Full-bleed architecture sketching and system diagrams',
    keywords: ['whiteboard', 'board', 'draw', 'excalidraw', 'diagram', 'architecture', 'sketch', 'canvas'],
    shortcut: 'G B',
    icon: <PenTool size={16} />,
    path: '/workspace/whiteboard',
  },
  {
    id: 'ws-notebook',
    section: 'Workspace',
    title: 'Open Developer Notebook',
    subtitle: 'Two-pane Markdown editor, code scratchpad & persistent notes',
    keywords: ['notebook', 'notes', 'markdown', 'onenote', 'notion', 'editor', 'scratchpad'],
    shortcut: 'G N',
    icon: <BookOpen size={16} />,
    path: '/workspace/notebook',
  },
  {
    id: 'ws-tracker',
    section: 'Workspace',
    title: 'Go to Productivity Tracker',
    subtitle: 'Unified tasks, daily habits matrix, focus timer & 52-week heatmap',
    keywords: ['tracker', 'today', 'dashboard', 'productivity', 'habits', 'tasks', 'focus', 'pomodoro'],
    shortcut: 'G T',
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

  // 5. Theme & System Control Actions
  {
    id: 'action-toggle-theme',
    section: 'Actions',
    title: 'Toggle Color Theme (Dark / Light)',
    subtitle: 'Switch between Obsidian Darkness and Warm Paper light mode',
    keywords: ['theme', 'dark', 'light', 'mode', 'color', 'toggle', 'switch', 'sun', 'moon'],
    shortcut: 'T T',
    icon: <Sun size={16} />,
    action: ({ setToast }) => {
      if (typeof document !== 'undefined') {
        const toggleBtn =
          document.querySelector('button[class*="colorModeToggle"]') ||
          document.querySelector('.navbar__color-mode-toggle');
        if (toggleBtn) {
          toggleBtn.click();
        } else {
          const current = document.documentElement.getAttribute('data-theme') || 'dark';
          const next = current === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', next);
          try {
            localStorage.setItem('theme', next);
          } catch (_) {}
        }
        const updated = document.documentElement.getAttribute('data-theme') || 'dark';
        setToast(`Theme switched to ${updated} mode`);
      }
    },
  },
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
    shortcut: 'C P',
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
    shortcut: 'C E',
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
    id: 'social-medium',
    section: 'Actions',
    title: 'Open Medium Blog Profile',
    subtitle: 'Articles on software engineering and systems',
    keywords: ['medium', 'blog', 'writing', 'articles'],
    icon: <ExternalLink size={16} />,
    action: () => window.open('https://medium.com/@kap10', '_blank'),
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

  // Exact title match
  if (title === q) return 1000;
  // Title starts with query
  if (title.startsWith(q)) return 500;
  // Title contains exact word
  const words = title.split(/[\s:,\-()]+/);
  if (words.some((w) => w === q)) return 350;
  if (words.some((w) => w.startsWith(q))) return 250;
  // Title includes query
  if (title.includes(q)) return 180;
  // Subtitle includes query
  if (subtitle.includes(q)) return 140;
  // Keyword exact match
  if (keywords.some((k) => k === q)) return 160;
  // Keyword starts with query
  if (keywords.some((k) => k.startsWith(q))) return 120;
  // Keyword includes query
  if (keywords.some((k) => k.includes(q))) return 80;
  // Section starts with query
  if (section.startsWith(q)) return 60;
  if (section.includes(q)) return 40;

  // Initialisms (e.g., "mcp", "dsa", "pr", "bwa")
  const acronym = words.map((w) => w[0]).join('');
  if (acronym.includes(q)) return 110;

  return 0;
}

const CATEGORY_CHIPS = ['All', 'Navigation', 'Open Source', 'Projects', 'Workspace', 'Actions'];

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
  const history = useHistory();

  const showToast = (msg) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      setIsOpen(false);
    }, 1100);
  };

  const navigateTo = (path) => {
    if (!path) return;
    if (path.startsWith('http') || path.startsWith('mailto:')) {
      window.open(path, path.startsWith('mailto:') ? '_self' : '_blank');
    } else {
      try {
        if (history && typeof history.push === 'function') {
          history.push(path);
        } else {
          window.location.href = path;
        }
      } catch (_) {
        window.location.href = path;
      }
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global Keyboard Listener: Ctrl+K / Cmd+K and Ctrl+H / Cmd+H
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Support Ctrl+K / Cmd+K or Ctrl+H / Cmd+H globally
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K' || e.key === 'h' || e.key === 'H')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
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
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [isOpen]);

  // Scored & Category Filtered Commands
  const filtered = useMemo(() => {
    let list = COMMANDS;

    // Filter by active category tab if selected
    if (activeCategory !== 'All') {
      list = list.filter((c) => c.section === activeCategory);
    }

    if (!query.trim()) {
      return list;
    }

    // Score and sort results descending
    const scored = [];
    for (const cmd of list) {
      const score = scoreCommand(cmd, query);
      if (score > 0) {
        scored.push({ cmd, score });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.map((s) => s.cmd);
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
      cmd.action({
        navigate: navigateTo,
        setToast: showToast,
      });
      // If it didn't trigger a toast, close immediately
      if (!toastMessage) {
        setTimeout(() => setIsOpen(false), 80);
      }
    } else if (cmd.path) {
      setIsOpen(false);
      navigateTo(cmd.path);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filtered.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filtered.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filtered[selectedIndex];
      if (selected) {
        executeCommand(selected);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Cycle through categories on Tab
      const currentIdx = CATEGORY_CHIPS.indexOf(activeCategory);
      const nextCategory = CATEGORY_CHIPS[(currentIdx + 1) % CATEGORY_CHIPS.length];
      setActiveCategory(nextCategory);
      setSelectedIndex(0);
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
      >
        {/* Action Toast Feedback Pill */}
        {toastMessage && (
          <div className={styles.paletteToast}>
            <Check size={14} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Search Header */}
        <div className={styles.paletteSearchWrapper}>
          <span style={{ color: 'var(--vg-accent, #FF4D4F)', display: 'flex' }}>
            <Search size={18} />
          </span>
          <input
            ref={inputRef}
            type="text"
            className={styles.paletteInput}
            placeholder="Type a command, project name, or hit Tab to filter..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className={styles.paletteShortcutBadge}>ESC</span>
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
            <div
              style={{
                padding: '2.5rem 1rem',
                textAlign: 'center',
                color: 'var(--vg-text-muted, #A6A6AC)',
                fontSize: '0.85rem',
              }}
            >
              No commands found matching "{query}"
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              const showSectionHeader =
                !query.trim() &&
                activeCategory === 'All' &&
                (index === 0 || filtered[index - 1].section !== item.section);

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
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                      <span className={styles.paletteItemIcon}>{item.icon}</span>
                      <div className={styles.paletteItemContent}>
                        <span className={styles.paletteItemTitle}>{item.title}</span>
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
              <kbd className={styles.paletteShortcutBadge}>Tab</kbd> switch tab
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--ifm-font-family-monospace, monospace)',
              fontSize: '0.72rem',
              color: 'var(--vg-text-subtle, #787880)',
            }}
          >
            Ctrl+K / Cmd+K
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
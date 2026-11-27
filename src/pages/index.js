import React, { useState, useEffect, useRef, useCallback } from 'react';
import Layout from '@theme/Layout';
import { 
  Terminal as TerminalIcon, 
  HelpCircle,
  RotateCcw,
  Folder,
  FileText,
  Compass,
  Target,
  Code,
  Code2,
  BookOpen,
  Wrench,
  Zap,
  Check,
  X,
  ExternalLink,
  ArrowUpRight,
  PenTool,
  Sparkles,
  LayoutGrid,
  Timer
} from 'lucide-react';
import styles from './index.module.css';

const COMMAND_LIST = [
  'help', 'ls', 'cd', 'cat', 'portfolio', 'workspace', 'projects', 'tools', 
  'opensource', 'picadolabs', 'build-with-ai', 'bwa', 'ai-model-router', 'terminal-agent', 'agent-bench',
  'dynavec', 'whiteboard', 'board', 'notebook', 'tracker', 'blogs', 'notes', 'contribution',
  'focus', 'pomodoro', 'timer', 'palette', 'spotlight', 'scratchpad', 'resume', 
  'cv', 'explore', 'neofetch', 'fastfetch', 'whoami', 'pwd', 'clear', 
  'cls', 'history', 'uname', 'date', 'uptime', 'echo', 'sudo', 
  'github', 'linkedin', 'leetcode', 'hashnode', 'apache', 'magpie', 'email', 'open', 'goto', 'about', 'skills', 
  'contact', 'recent', 'git', 'curl', 'ping', 'top', 'htop', 'man'
];

const FILE_SYSTEM = {
  'workspace': { type: 'dir', route: '/workspace', desc: 'Developer Workspace & Central Tools Hub' },
  'portfolio': { type: 'dir', route: '/portfolio', desc: 'Interactive Engineering Portfolio' },
  'projects': { type: 'dir', route: '/projects', desc: 'PicadoLabs Core Systems & Repositories' },
  'opensource': { type: 'dir', route: '/opensource', desc: 'Open Source Projects & 177+ Merged PRs' },
  'picadolabs': { type: 'dir', route: '/opensource/picadolabs', desc: 'PicadoLabs Org (7.2k+ Downloads, 42+ Contributors)' },
  'contribution': { type: 'dir', route: '/contribution', desc: 'Live PR Activity Feed (206 Authored PRs)' },
  'build-with-ai': { type: 'dir', route: '/build-with-ai', desc: 'Zero-API Deterministic SDLC CLI (1.4k+ Downloads)' },
  'dynavec': { type: 'dir', route: '/opensource/dynavec', desc: 'Serverless Hybrid Vector DB (22 Merged PRs)' },
  'whiteboard': { type: 'dir', route: '/workspace/whiteboard', desc: 'Architecture Whiteboard & Visual Canvas' },
  'notebook': { type: 'dir', route: '/workspace/notebook', desc: 'Interactive Markdown & Developer Notebook' },
  'tracker': { type: 'dir', route: '/workspace/tracker', desc: 'Productivity, Habits & Focus Tracker' },
  'blogs': { type: 'dir', route: 'https://kap10.hashnode.dev/', desc: 'Technical Blogs on Hashnode' },
  'notes': { type: 'dir', route: '/blogs/intro', desc: 'Core Python, Flask & Revision Notes' },
  'about.txt': { type: 'file', content: `Vardhman Gupta
Apache Magpie Committer | Founder @ PicadoLabs
Building AI agents and developer tools, working on LLM security, and actively contributing to OSS.` },
  'recent-work.txt': { type: 'file', content: `[RECENT WORK & CONTRIBUTIONS]
• Apache Magpie Committer (The Apache Software Foundation) — 54 Merged PRs
  URL: https://github.com/search?q=repo%3Aapache%2Fmagpie+is%3Apr+author%3AKaap10&type=pullrequests
• Microsoft PyRIT — 34 Merged PRs (AI Red Teaming, SQLi/PathTraversal/XXE/SSTI Scorers)
• DynaVec — 22 Merged PRs (Serverless Hybrid Vector DB, ReAct Agents & CI Evals)
• PicadoLabs — 7.2k+ Downloads & 42+ Contributors across build-with-ai, ai-model-router, terminal-agent & agent-bench
• Total Verified Open Source Impact: 177+ Merged PRs across 31 Repositories` },
  'skills.json': { type: 'file', content: `{
  "languages": ["Python", "TypeScript", "JavaScript", "Go", "C++", "SQL"],
  "ai_security": ["AI Agents", "LLM Red Teaming", "Thompson Sampling RL", "MCP", "RAG Pipelines"],
  "systems": ["FastAPI", "Docker", "Kubernetes", "Redis", "PostgreSQL", "Supabase"],
  "frontend": ["React", "Next.js", "Docusaurus", "CSS Modules", "TailwindCSS"]
}` },
  'contact.sh': { type: 'file', content: `#!/bin/bash
# Contact Vardhman Gupta
EMAIL="vardhmangupta2004@gmail.com"
GITHUB="https://github.com/Kaap10"
LINKEDIN="https://linkedin.com/in/vardhman-gupta"
LEETCODE="https://leetcode.com/u/kap10/"
BLOG="https://kap10.hashnode.dev/"
STATUS="Open to high-impact engineering opportunities & open source collaboration."` },
  'resume.pdf': { type: 'file', content: `[RESUME] Detailed experience and credentials available in the Portfolio section.
Run 'portfolio' or 'cd portfolio' to explore complete work experience, projects, and OSS impact.` }
};

const SUGGESTIONS = [
  { label: 'help', cmd: 'help', Icon: HelpCircle, isRoute: false },
  { label: 'portfolio', cmd: 'portfolio', route: '/portfolio', Icon: Compass, isRoute: true },
  { label: 'opensource', cmd: 'opensource', route: '/opensource', Icon: Code2, isRoute: true },
  { label: 'picadolabs', cmd: 'picadolabs', route: '/opensource/picadolabs', Icon: Sparkles, isRoute: true },
  { label: 'projects', cmd: 'projects', route: '/projects', Icon: Code, isRoute: true },
  { label: 'workspace', cmd: 'workspace', route: '/workspace', Icon: LayoutGrid, isRoute: true },
  { label: 'whiteboard', cmd: 'whiteboard', route: '/workspace/whiteboard', Icon: PenTool, isRoute: true },
  { label: 'notebook', cmd: 'notebook', route: '/workspace/notebook', Icon: FileText, isRoute: true },
  { label: 'tracker', cmd: 'tracker', route: '/workspace/tracker', Icon: Target, isRoute: true },
  { label: 'blogs', cmd: 'blogs', route: 'https://kap10.hashnode.dev/', Icon: BookOpen, isRoute: true },
  { label: 'ls', cmd: 'ls', Icon: Folder, isRoute: false },
  { label: 'palette', cmd: 'palette', Icon: Zap, isRoute: false },
  { label: 'clear', cmd: 'clear', Icon: RotateCcw, isRoute: false }
];

const INITIAL_OUTPUT = [
  {
    type: 'banner',
    content: `  ██╗   ██╗ █████╗ ██████╗ ██████╗ ██╗  ██╗███╗   ███╗ █████╗ ███╗   ██╗
  ██║   ██║██╔══██╗██╔══██╗██╔══██╗██║  ██║████╗ ████║██╔══██╗████╗  ██║
  ██║   ██║███████║██████╔╝██║  ██║███████║██╔████╔██║███████║██╔██╗ ██║
  ╚██╗ ██╔╝██╔══██║██╔══██╗██║  ██║██╔══██║██║╚██╔╝██║██╔══██║██║╚██╗██║
   ╚████╔╝ ██║  ██║██║  ██║██████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║
    ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
  ──────────────────────────────────────────────────────────────────────────
  Agentic AI & Security Engineer
  I build AI agents and developer tools, work on LLM security, and actively
  contribute to OSS (150+ Merged PRs)
  Type 'help' to list commands, or run 'portfolio'.
  ──────────────────────────────────────────────────────────────────────────`
  }
];

const NEOFETCH_ASCII = [
  "      /\\",
  "     /  \\",
  "    /\\   \\",
  "   /      \\",
  "  /   ,,   \\",
  " /   |  |  -\\",
  "/_-''    ''-_/"
].join("\n");



/* ==========================================================================
   Formatted File Content Component (Auto-detects URLs and Email addresses)
   ========================================================================== */
function FormattedFileContent({ content }) {
  if (!content) return null;

  const urlOrEmailRegex = /(https?:\/\/[^\s"'<>\)]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = urlOrEmailRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.substring(lastIndex, match.index));
    }
    const val = match[0];
    const isEmail = val.includes('@') && !val.startsWith('http');
    const href = isEmail ? `mailto:${val}` : val;

    parts.push(
      <a
        key={match.index}
        href={href}
        target={isEmail ? '_self' : '_blank'}
        rel={isEmail ? undefined : 'noopener noreferrer'}
        onClick={(e) => e.stopPropagation()}
      >
        {val}
      </a>
    );
    lastIndex = match.index + val.length;
  }

  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }

  return <pre className={styles.fileContentBlock}>{parts}</pre>;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [historyList, setHistoryList] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [outputList, setOutputList] = useState(INITIAL_OUTPUT);

  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('is-home-page');
      return () => {
        document.documentElement.classList.remove('is-home-page');
      };
    }
  }, []);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [outputList]);

  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const openInNewTab = useCallback((rawRoute) => {
    if (typeof window === 'undefined') return;
    const url = rawRoute.startsWith('http') 
      ? rawRoute 
      : `${window.location.origin}${rawRoute.startsWith('/') ? rawRoute : '/' + rawRoute}`;
    
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  const navigateTo = useCallback((route, label) => {
    const fullUrl = typeof window !== 'undefined' && !route.startsWith('http')
      ? `${window.location.origin}${route.startsWith('/') ? route : '/' + route}`
      : route;

    setOutputList(prev => [
      ...prev,
      { 
        type: 'nav_launch', 
        label, 
        route,
        url: fullUrl 
      }
    ]);

    openInNewTab(route);
  }, [openInNewTab]);

  const executeCommand = useCallback((cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    setHistoryList(prev => [...prev, raw]);
    setHistoryIndex(-1);

    const newOutputs = [{ type: 'command', command: raw }];

    // Check for markdown link paste: [Explore Project](http://localhost:3000/portfolio#projects) or [Explore Tools](...)
    const mdLinkMatches = [...raw.matchAll(/\[(.*?)\]\((.*?)\)/g)];
    if (mdLinkMatches.length > 0) {
      mdLinkMatches.forEach(m => {
        const label = m[1];
        let targetUrl = m[2];
        if (targetUrl.includes('localhost:') || targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
          try {
            const urlObj = new URL(targetUrl);
            targetUrl = urlObj.pathname + urlObj.hash;
          } catch (_) {}
        }
        navigateTo(targetUrl, label || 'Target');
      });
      return;
    }

    // Check for direct URLs
    if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('localhost:')) {
      const url = raw.startsWith('localhost:') ? `http://${raw}` : raw;
      openInNewTab(url);
      newOutputs.push({
        type: 'nav_launch',
        label: url,
        route: url,
        url: url
      });
      setOutputList(prev => [...prev, ...newOutputs]);
      setInput('');
      return;
    }

    // Clean and normalize command string
    const normalized = raw.toLowerCase().replace(/['"`]/g, '').trim();

    // Check multi-word natural phrases
    const PHRASE_ROUTES = {
      'explore workspace': ['/workspace', 'DevWorkspace Hub'],
      'view workspace': ['/workspace', 'DevWorkspace Hub'],
      'show workspace': ['/workspace', 'DevWorkspace Hub'],
      'devworkspace': ['/workspace', 'DevWorkspace Hub'],
      'explore devworkspace': ['/workspace', 'DevWorkspace Hub'],
      'explore project': ['/projects', 'Projects Showcase'],
      'explore projects': ['/projects', 'Projects Showcase'],
      'view project': ['/projects', 'Projects Showcase'],
      'view projects': ['/projects', 'Projects Showcase'],
      'show project': ['/projects', 'Projects Showcase'],
      'show projects': ['/projects', 'Projects Showcase'],
      'explore tools': ['/tools', 'Developer Tools'],
      'explore tool': ['/tools', 'Developer Tools'],
      'view tools': ['/tools', 'Developer Tools'],
      'view tool': ['/tools', 'Developer Tools'],
      'show tools': ['/tools', 'Developer Tools'],
      'explore portfolio': ['/portfolio', 'Portfolio'],
      'view portfolio': ['/portfolio', 'Portfolio'],
      'show portfolio': ['/portfolio', 'Portfolio'],
      'explore opensource': ['/opensource', 'Open Source Hub'],
      'explore open source': ['/opensource', 'Open Source Hub'],
      'explore open-source': ['/opensource', 'Open Source Hub'],
      'view opensource': ['/opensource', 'Open Source Hub'],
      'explore picadolabs': ['/opensource/picadolabs', 'PicadoLabs Hub'],
      'view picadolabs': ['/opensource/picadolabs', 'PicadoLabs Hub'],
      'explore board': ['/workspace/whiteboard', 'Interactive Whiteboard'],
      'explore whiteboard': ['/workspace/whiteboard', 'Interactive Whiteboard'],
      'view board': ['/workspace/whiteboard', 'Interactive Whiteboard'],
      'view whiteboard': ['/workspace/whiteboard', 'Interactive Whiteboard'],
      'explore notebook': ['/workspace/notebook', 'Interactive Notebook'],
      'view notebook': ['/workspace/notebook', 'Interactive Notebook'],
      'show notebook': ['/workspace/notebook', 'Interactive Notebook'],
      'explore tracker': ['/workspace/tracker', 'Focus & Habits Tracker'],
      'view tracker': ['/workspace/tracker', 'Focus & Habits Tracker'],
      'show tracker': ['/workspace/tracker', 'Focus & Habits Tracker'],
      'explore blogs': ['https://kap10.hashnode.dev/', 'Technical Blogs (Hashnode)'],
      'explore blog': ['https://kap10.hashnode.dev/', 'Technical Blogs (Hashnode)'],
      'view blogs': ['https://kap10.hashnode.dev/', 'Technical Blogs (Hashnode)'],
      'technical blogs': ['https://kap10.hashnode.dev/', 'Technical Blogs (Hashnode)'],
      'explore notes': ['/blogs/intro', 'Revision Notes'],
      'explore bwa': ['/build-with-ai', 'build-with-ai Showcase'],
      'explore build-with-ai': ['/build-with-ai', 'build-with-ai Showcase'],
      'explore build with ai': ['/build-with-ai', 'build-with-ai Showcase'],
      'explore dynavec': ['/opensource/dynavec', 'dynavec Contributions Showcase'],
      'view dynavec': ['/opensource/dynavec', 'dynavec Contributions Showcase'],
    };

    if (PHRASE_ROUTES[normalized]) {
      const [targetRoute, targetLabel] = PHRASE_ROUTES[normalized];
      setOutputList(prev => [...prev, ...newOutputs]);
      setInput('');
      navigateTo(targetRoute, targetLabel);
      return;
    }

    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    const argStr = args.join(' ').toLowerCase();

    switch (cmd) {
      case 'help':
      case '?':
      case 'commands':
        newOutputs.push({
          type: 'help',
          content: [
            { category: 'CORE WORKSPACE & TOOLS (OPENS IN NEW TAB)', items: [
              { name: 'portfolio', route: '/portfolio', desc: 'Open interactive Engineering Portfolio & Work Experience' },
              { name: 'opensource', route: '/opensource', desc: 'Explore 177+ Merged PRs across 31 Repositories' },
              { name: 'picadolabs', route: '/opensource/picadolabs', desc: 'PicadoLabs Hub (7.2k+ Downloads, 42+ Contributors)' },
              { name: 'projects', route: '/projects', desc: 'PicadoLabs Core Systems (build-with-ai, router, agent, bench)' },
              { name: 'workspace', route: '/workspace', desc: 'Open Developer Workspace & Central Tools Hub' },
              { name: 'whiteboard', route: '/workspace/whiteboard', desc: 'Open Interactive Architecture Whiteboard Canvas' },
              { name: 'notebook', route: '/workspace/notebook', desc: 'Open Standalone Engineering Notebook' },
              { name: 'tracker', route: '/workspace/tracker', desc: 'Open Focus, Habits, Goals & Productivity Tracker' },
              { name: 'blogs', route: 'https://kap10.hashnode.dev/', desc: 'Read Technical Blogs on Hashnode' },
              { name: 'notes', route: '/blogs/intro', desc: 'Core Python, Flask & Revision Notes' }
            ]},
            { category: 'FOCUS & WORKFLOW CONTROLS', items: [
              { name: 'focus [25|50]', desc: 'Start a Pomodoro focus timer session & launch Capsule widget' },
              { name: 'palette', desc: 'Open Global Command Palette (Ctrl+K / Cmd+K)' },
              { name: 'scratchpad', desc: 'Open Global Markdown Scratchpad drawer (Ctrl+J)' },
              { name: 'resume', route: '/portfolio', desc: 'View complete resume and engineering credentials' },
              { name: 'recent', desc: 'Show recent work & Apache Magpie Committer stats' }
            ]},
            { category: 'EXTERNAL PROFILES & COMMUNITY', items: [
              { name: 'apache', route: 'https://github.com/search?q=repo%3Aapache%2Fmagpie+is%3Apr+author%3AKaap10&type=pullrequests', desc: 'View 54 merged PRs in Apache Magpie (Committer)' },
              { name: 'github', route: 'https://github.com/Kaap10', desc: 'Open GitHub profile (Kaap10)' },
              { name: 'linkedin', route: 'https://linkedin.com/in/vardhman-gupta', desc: 'Open LinkedIn profile' },
              { name: 'leetcode', route: 'https://leetcode.com/u/kap10/', desc: 'Open LeetCode profile (kap10)' },
              { name: 'hashnode', route: 'https://kap10.hashnode.dev/', desc: 'Open Technical Blogs on Hashnode' },
              { name: 'email', desc: 'Send an email to Vardhman Gupta' }
            ]},
            { category: 'FILE SYSTEM & SYSTEM INSPECTION', items: [
              { name: 'ls [-la]', desc: 'List files, routes, and workspace directories' },
              { name: 'cat <file>', desc: 'Read file contents (e.g. cat about.txt, cat skills.json, cat recent-work.txt)' },
              { name: 'pwd', desc: 'Print working directory path' },
              { name: 'whoami', desc: 'Display active user identity and role' },
              { name: 'neofetch', desc: 'Display system telemetry & developer specs' },
              { name: 'uname -a', desc: 'Print operating system & kernel release' },
              { name: 'date', desc: 'Display current system timestamp' },
              { name: 'uptime', desc: 'Display workstation system uptime' }
            ]},
            { category: 'SHELL & UTILITIES', items: [
              { name: 'explore <target>', desc: 'Explore specific section (e.g. explore workspace, explore projects)' },
              { name: 'cd <target>', desc: 'Navigate to target directory in new tab' },
              { name: 'clear', desc: 'Clear terminal output buffer (Ctrl+L)' },
              { name: 'history', desc: 'Show session command history' },
              { name: 'echo <text>', desc: 'Print arguments to stdout' },
              { name: 'git status', desc: 'Show working tree status and branch info' },
              { name: 'curl <url>', desc: 'Fetch URL or inspect API endpoints' },
              { name: 'top', desc: 'Display active system processes & resource usage' },
              { name: 'sudo <cmd>', desc: 'Execute command with elevated privileges' }
            ]}
          ]
        });
        break;

      case 'workspace':
      case 'devworkspace':
      case 'hub':
        navigateTo('/workspace', 'DevWorkspace Hub');
        break;

      case 'portfolio':
      case 'portfolio#projects':
      case 'portfolio#experience':
        navigateTo('/portfolio', 'Portfolio');
        break;

      case 'projects':
      case 'project':
      case 'proj':
        navigateTo('/projects', 'Projects Showcase');
        break;

      case 'tools':
      case 'tool':
        navigateTo('/tools', 'Developer Tools');
        break;

      case 'opensource':
      case 'os':
      case 'open-source':
      case 'open_source':
        navigateTo('/opensource', 'Open Source Hub');
        break;

      case 'picadolabs':
      case 'picado':
        navigateTo('/opensource/picadolabs', 'PicadoLabs Hub');
        break;

      case 'contribution':
      case 'contributions':
        navigateTo('/contribution', 'Live PR Activity Feed');
        break;

      case 'build-with-ai':
      case 'buildwithai':
      case 'bwa':
      case 'ai-architect':
        navigateTo('/build-with-ai', 'build-with-ai Showcase');
        break;

      case 'ai-model-router':
      case 'terminal-agent':
      case 'agent-bench':
        navigateTo('/opensource/picadolabs', `PicadoLabs — ${cmd}`);
        break;

      case 'dynavec':
      case 'dyna-vec':
        navigateTo('/opensource/dynavec', 'dynavec Contributions Showcase');
        break;

      case 'board':
      case 'whiteboard':
      case 'draw':
      case 'canvas':
      case 'excalidraw':
        navigateTo('/workspace/whiteboard', 'Interactive Whiteboard');
        break;

      case 'notebook':
      case 'notepad':
      case 'onenote':
        navigateTo('/workspace/notebook', 'Interactive Notebook');
        break;

      case 'tracker':
      case 'habits':
      case 'goals':
      case 'tasks':
        navigateTo('/workspace/tracker', 'Focus & Habits Tracker');
        break;

      case 'focus':
      case 'pomodoro':
      case 'timer': {
        const mins = parseInt(args[0], 10) || 25;
        const durationSec = mins * 60;
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('focusTimer:start', { detail: { duration: durationSec } }));
          window.dispatchEvent(new CustomEvent('focusCapsule:open'));
        }
        newOutputs.push({
          type: 'success',
          content: `Started ${mins}-minute Focus Timer! Focus Capsule widget is active in bottom-right.`
        });
        break;
      }

      case 'palette':
      case 'spotlight':
      case 'cmd':
      case 'command-palette':
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('commandPalette:open'));
        }
        newOutputs.push({
          type: 'success',
          content: 'Opening Global Command Palette (Ctrl+K / Cmd+K)...'
        });
        break;

      case 'blogs':
      case 'blog':
      case 'hashnode':
      case 'articles':
      case 'article':
        navigateTo('https://kap10.hashnode.dev/', 'Technical Blogs (Hashnode)');
        break;

      case 'notes':
      case 'docs':
        navigateTo('/blogs/intro', 'Revision Notes');
        break;

      case 'resume':
      case 'cv':
      case 'resume.pdf':
        navigateTo('/portfolio', 'Resume & Experience');
        break;

      case 'about':
      case 'about.txt':
        newOutputs.push({ type: 'file_content', content: FILE_SYSTEM['about.txt'].content });
        break;

      case 'skills':
      case 'skills.json':
        newOutputs.push({ type: 'file_content', content: FILE_SYSTEM['skills.json'].content });
        break;

      case 'contact':
      case 'contact.sh':
      case './contact.sh':
        newOutputs.push({ type: 'file_content', content: FILE_SYSTEM['contact.sh'].content });
        break;

      case 'scratchpad':
      case 'scratch':
      case 'memo':
      case 'pad':
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('scratchpad:open'));
        }
        newOutputs.push({
          type: 'success',
          content: 'Opened Global Scratchpad drawer (Markdown Editor). Shortcut: Ctrl+J / Cmd+J'
        });
        break;

      case 'explore':
      case 'view':
      case 'show':
      case 'goto':
      case 'open':
        if (!argStr) {
          if (cmd === 'explore') {
            newOutputs.push({
              type: 'help',
              content: [
                {
                  category: 'EXPLORE TARGETS (Type command or click to open)',
                  items: [
                    { name: 'explore workspace', route: '/workspace', desc: 'Central developer workspace & unified tools hub' },
                    { name: 'explore portfolio', route: '/portfolio', desc: 'Complete engineering background & credentials' },
                    { name: 'explore projects', route: '/projects', desc: 'Production systems & AI repositories' },
                    { name: 'explore tools', route: '/tools', desc: 'Interactive developer tools & sandboxes' },
                    { name: 'explore whiteboard', route: '/workspace/whiteboard', desc: 'Architecture visual whiteboard & canvas' },
                    { name: 'explore notebook', route: '/workspace/notebook', desc: 'Interactive OneNote & markdown workspace' },
                    { name: 'explore tracker', route: '/workspace/tracker', desc: 'Daily productivity, tasks, and focus timer' },
                    { name: 'explore opensource', route: '/opensource', desc: 'Open-source packages & 177+ merged PRs' },
                    { name: 'explore picadolabs', route: '/opensource/picadolabs', desc: 'PicadoLabs Hub (7.2k+ Downloads)' },
                    { name: 'explore build-with-ai', route: '/build-with-ai', desc: 'Zero-API Software Architect CLI Showcase' },
                    { name: 'explore dynavec', route: '/opensource/dynavec', desc: 'Serverless Vector DB contribution showcase' },
                    { name: 'explore blogs', route: 'https://kap10.hashnode.dev/', desc: 'Technical blogs on Hashnode' },
                    { name: 'explore apache', route: 'https://github.com/search?q=repo%3Aapache%2Fmagpie+is%3Apr+author%3AKaap10&type=pullrequests', desc: '54 merged PRs in Apache Magpie (Committer)' },
                    { name: 'explore leetcode', route: 'https://leetcode.com/u/kap10/', desc: 'LeetCode profile & algorithmic problems' }
                  ]
                }
              ]
            });
          } else {
            newOutputs.push({ type: 'error', content: `Usage: ${cmd} <target | url>` });
          }
        } else {
          const target = argStr.replace(/^\//, '').replace(/\/$/, '');
          if (target === 'workspace' || target === 'devworkspace' || target === 'hub') {
            navigateTo('/workspace', 'DevWorkspace Hub');
          } else if (target === 'projects' || target === 'project' || target === 'proj') {
            navigateTo('/projects', 'Projects Showcase');
          } else if (target === 'tools' || target === 'tool') {
            navigateTo('/tools', 'Developer Tools');
          } else if (target === 'portfolio' || target === 'portfolio#projects') {
            navigateTo('/portfolio', 'Portfolio');
          } else if (target === 'opensource' || target === 'os' || target === 'open source' || target === 'open-source') {
            navigateTo('/opensource', 'Open Source Hub');
          } else if (target === 'picadolabs' || target === 'picado') {
            navigateTo('/opensource/picadolabs', 'PicadoLabs Hub');
          } else if (target === 'build-with-ai' || target === 'buildwithai' || target === 'bwa') {
            navigateTo('/build-with-ai', 'build-with-ai Showcase');
          } else if (target === 'dynavec' || target === 'dyna-vec') {
            navigateTo('/opensource/dynavec', 'dynavec Showcase');
          } else if (target === 'board' || target === 'whiteboard' || target === 'draw' || target === 'canvas') {
            navigateTo('/workspace/whiteboard', 'Interactive Whiteboard');
          } else if (target === 'notebook' || target === 'notepad' || target === 'onenote') {
            navigateTo('/workspace/notebook', 'Interactive Notebook');
          } else if (target === 'tracker' || target === 'habits' || target === 'focus') {
            navigateTo('/workspace/tracker', 'Focus & Habits Tracker');
          } else if (target === 'blogs' || target === 'blog' || target === 'articles' || target === 'hashnode') {
            navigateTo('https://kap10.hashnode.dev/', 'Technical Blogs (Hashnode)');
          } else if (target === 'notes') {
            navigateTo('/blogs/intro', 'Revision Notes');
          } else if (target === 'about' || target === 'about.txt') {
            newOutputs.push({ type: 'file_content', content: FILE_SYSTEM['about.txt'].content });
          } else if (target === 'recent' || target === 'recent-work' || target === 'recent-work.txt' || target === 'recentwork') {
            newOutputs.push({ type: 'file_content', content: FILE_SYSTEM['recent-work.txt'].content });
          } else if (target === 'skills' || target === 'skills.json') {
            newOutputs.push({ type: 'file_content', content: FILE_SYSTEM['skills.json'].content });
          } else if (target === 'contact' || target === 'contact.sh' || target === './contact.sh') {
            newOutputs.push({ type: 'file_content', content: FILE_SYSTEM['contact.sh'].content });
          } else if (target === 'resume' || target === 'resume.pdf' || target === 'cv') {
            navigateTo('/portfolio', 'Resume & Experience');
          } else if (target === 'scratchpad' || target === 'notes' || target === 'memo') {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('scratchpad:open'));
            }
            newOutputs.push({
              type: 'success',
              content: 'Opened Global Scratchpad drawer (Markdown Editor). Shortcut: Ctrl+J / Cmd+J'
            });
          } else if (target === 'palette' || target === 'spotlight' || target === 'cmd') {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('commandPalette:open'));
            }
            newOutputs.push({
              type: 'success',
              content: 'Opening Global Command Palette (Ctrl+K / Cmd+K)...'
            });
          } else if (target === 'github') {
            openInNewTab('https://github.com/Kaap10');
            newOutputs.push({ 
              type: 'nav_launch', 
              label: 'GitHub Profile', 
              route: 'https://github.com/Kaap10',
              url: 'https://github.com/Kaap10'
            });
          } else if (target === 'linkedin') {
            openInNewTab('https://linkedin.com/in/vardhman-gupta');
            newOutputs.push({ 
              type: 'nav_launch', 
              label: 'LinkedIn Profile', 
              route: 'https://linkedin.com/in/vardhman-gupta',
              url: 'https://linkedin.com/in/vardhman-gupta'
            });
          } else if (target === 'leetcode' || target === 'lc') {
            openInNewTab('https://leetcode.com/u/kap10/');
            newOutputs.push({ 
              type: 'nav_launch', 
              label: 'LeetCode Profile', 
              route: 'https://leetcode.com/u/kap10/',
              url: 'https://leetcode.com/u/kap10/'
            });
          } else if (target === 'medium') {
            openInNewTab('https://medium.com/@kap10');
            newOutputs.push({ 
              type: 'nav_launch', 
              label: 'Medium Profile', 
              route: 'https://medium.com/@kap10',
              url: 'https://medium.com/@kap10'
            });
          } else if (target === 'apache' || target === 'magpie' || target === 'prs') {
            const apacheUrl = 'https://github.com/search?q=org%3AApache+is%3Apr+is%3Amerged+author%3AKaap10&type=pullrequests';
            openInNewTab(apacheUrl);
            newOutputs.push({ 
              type: 'nav_launch', 
              label: 'Apache / magpie Merged PRs', 
              route: apacheUrl,
              url: apacheUrl
            });
          } else if (target === 'email' || target === 'mail') {
            window.location.href = 'mailto:vardhmangupta2004@gmail.com';
            newOutputs.push({ type: 'success', content: 'Opening default mail client...' });
          } else if (FILE_SYSTEM[target] && FILE_SYSTEM[target].route) {
            navigateTo(FILE_SYSTEM[target].route, target);
          } else if (FILE_SYSTEM[target] && FILE_SYSTEM[target].content) {
            newOutputs.push({ type: 'file_content', content: FILE_SYSTEM[target].content });
          } else if (target.startsWith('http://') || target.startsWith('https://')) {
            openInNewTab(target);
            newOutputs.push({ 
              type: 'nav_launch', 
              label: target, 
              route: target,
              url: target
            });
          } else {
            newOutputs.push({ type: 'error', content: `${cmd}: unknown target '${argStr}'. Try 'explore', 'help' or 'ls'.` });
          }
        }
        break;

      case 'cd':
        if (!argStr || argStr === '~' || argStr === '/' || argStr === '.') {
          newOutputs.push({ type: 'info', content: 'Current directory: /home/vardhman (~)' });
        } else {
          const target = argStr.replace(/^\//, '').replace(/\/$/, '').toLowerCase();
          if (FILE_SYSTEM[target] && FILE_SYSTEM[target].type === 'dir') {
            navigateTo(FILE_SYSTEM[target].route, target);
          } else if (target === 'workspace' || target === 'devworkspace' || target === 'hub') {
            navigateTo('/workspace', 'DevWorkspace Hub');
          } else if (target === 'projects' || target === 'project' || target === 'proj') {
            navigateTo('/projects', 'Projects Showcase');
          } else if (target === 'tools' || target === 'tool') {
            navigateTo('/tools', 'Developer Tools');
          } else if (target === 'portfolio' || target === 'portfolio#projects') {
            navigateTo('/portfolio', 'Portfolio');
          } else if (target === 'opensource' || target === 'os' || target === 'open source' || target === 'open-source') {
            navigateTo('/opensource', 'Open Source Hub');
          } else if (target === 'picadolabs' || target === 'picado') {
            navigateTo('/opensource/picadolabs', 'PicadoLabs Hub');
          } else if (target === 'build-with-ai' || target === 'buildwithai' || target === 'bwa') {
            navigateTo('/build-with-ai', 'build-with-ai Showcase');
          } else if (target === 'dynavec' || target === 'dyna-vec') {
            navigateTo('/opensource/dynavec', 'dynavec Showcase');
          } else if (target === 'board' || target === 'whiteboard' || target === 'draw' || target === 'canvas') {
            navigateTo('/workspace/whiteboard', 'Interactive Whiteboard');
          } else if (target === 'notebook' || target === 'notepad' || target === 'onenote') {
            navigateTo('/workspace/notebook', 'Interactive Notebook');
          } else if (target === 'tracker' || target === 'habits' || target === 'focus') {
            navigateTo('/workspace/tracker', 'Focus & Habits Tracker');
          } else if (target === 'blogs' || target === 'blog' || target === 'articles' || target === 'hashnode') {
            navigateTo('https://kap10.hashnode.dev/', 'Technical Blogs (Hashnode)');
          } else if (target === 'notes') {
            navigateTo('/blogs/intro', 'Revision Notes');
          } else if (target === '..' || target === '../') {
            newOutputs.push({ type: 'info', content: 'Already at root working directory: /home/vardhman' });
          } else if (FILE_SYSTEM[target] && FILE_SYSTEM[target].type === 'file') {
            newOutputs.push({ type: 'error', content: `cd: not a directory: ${argStr}. Use 'cat ${argStr}' or '${argStr}' to read file.` });
          } else {
            newOutputs.push({ type: 'error', content: `cd: no such file or directory: ${argStr}` });
          }
        }
        break;

      case 'ls':
      case 'dir':
      case 'll':
        newOutputs.push({
          type: 'ls',
          entries: Object.entries(FILE_SYSTEM).map(([name, data]) => ({
            name,
            type: data.type,
            route: data.route || null,
            desc: data.desc || ''
          }))
        });
        break;

      case 'cat':
        if (!argStr) {
          newOutputs.push({ type: 'error', content: 'Usage: cat <filename>' });
        } else {
          const targetFile = argStr.toLowerCase();
          if (FILE_SYSTEM[targetFile]) {
            if (FILE_SYSTEM[targetFile].type === 'dir') {
              newOutputs.push({ type: 'error', content: `cat: ${argStr}: Is a directory. Use 'cd ${argStr}' or '${argStr}' to open in new tab.` });
            } else {
              newOutputs.push({ type: 'file_content', content: FILE_SYSTEM[targetFile].content });
            }
          } else {
            newOutputs.push({ type: 'error', content: `cat: ${argStr}: No such file or directory` });
          }
        }
        break;

      case 'whoami':
      case 'id':
        newOutputs.push({
          type: 'success',
          content: 'vardhman (uid=1000 gid=1000 groups=1000[vardhman],apache[committer],picadolabs[founder]) · AI Agents, Dev Tools & LLM Security'
        });
        break;

      case 'pwd':
        newOutputs.push({
          type: 'info',
          content: '/home/vardhman/kaap10-workstation'
        });
        break;

      case 'neofetch':
      case 'fastfetch':
        newOutputs.push({
          type: 'neofetch',
          data: {
            user: 'vardhman@workstation',
            os: 'Kaap10 Workstation OS 6.8.0 (x86_64)',
            host: 'MacBook Pro 16" (M3 Max / 64GB)',
            kernel: '6.8.0-kaap10-zen1',
            uptime: '42 days, 13 hours, 37 mins',
            shell: 'zsh 5.9 (x86_64-apple-darwin)',
            resolution: '3456x2234 Retina @ 120Hz',
            theme: 'Matte Obsidian (#FF4D4F)',
            terminal: 'kaap10-web-pty v2.5.0',
            cpu: 'Apple M3 Max (16 Cores: 12P + 4E)',
            memory: '18.4 GiB / 64.0 GiB (28%)',
            stack: 'Python, TypeScript, Go, FastAPI, React, Docker'
          }
        });
        break;

      case 'uname':
        newOutputs.push({
          type: 'info',
          content: args.includes('-a')
            ? 'Linux workstation 6.8.0-kaap10-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux'
            : 'Linux'
        });
        break;

      case 'date':
      case 'time':
        newOutputs.push({
          type: 'info',
          content: new Date().toString()
        });
        break;

      case 'uptime':
        newOutputs.push({
          type: 'info',
          content: ' 15:35:12 up 42 days, 13:37,  1 user,  load average: 0.12, 0.08, 0.03'
        });
        break;

      case 'echo':
        newOutputs.push({
          type: 'text',
          content: argStr || ''
        });
        break;

      case 'git':
        if (args[0] === 'status' || !args[0]) {
          newOutputs.push({
            type: 'file_content',
            content: `On branch main\nYour branch is up to date with 'origin/main'.\n\nNothing to commit, working tree clean.`
          });
        } else if (args[0] === 'log') {
          newOutputs.push({
            type: 'file_content',
            content: `commit 8f3b19c (HEAD -> main)\nAuthor: Vardhman Gupta <vardhmangupta2004@gmail.com>\nDate:   Mon Sep 7 2026\n\n    feat: interactive workstation terminal & particle canvas system`
          });
        } else {
          newOutputs.push({
            type: 'info',
            content: `git: '${args.join(' ')}' is executed. Repo status: healthy.`
          });
        }
        break;

      case 'curl':
      case 'ping':
        if (!argStr) {
          newOutputs.push({ type: 'error', content: 'usage: curl <url>' });
        } else {
          newOutputs.push({
            type: 'file_content',
            content: `HTTP/2 200 OK\nserver: cloudflare\ncontent-type: application/json; charset=utf-8\n\n{\n  "status": "online",\n  "host": "${argStr}",\n  "latency": "14ms",\n  "target": "kaap10.github.io"\n}`
          });
        }
        break;

      case 'top':
      case 'htop':
        newOutputs.push({
          type: 'file_content',
          content: `Tasks: 142 total, 1 running, 141 sleeping\n%Cpu(s):  2.4 us,  1.1 sy,  0.0 ni, 96.5 id\nMiB Mem :  65536.0 total,  47104.0 free,  18432.0 used\n\n  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     COMMAND\n 1042 vardhman  20   0   14.2g   2.1g   412m S   3.8   3.2     workstation-pty\n  891 vardhman  20   0    8.4g   1.2g   210m S   1.2   1.8     docusaurus-core\n  104 root      20   0    2.1g   512m   180m S   0.4   0.8     systemd`
        });
        break;

      case 'clear':
      case 'cls':
        setOutputList([]);
        setInput('');
        return;

      case 'history':
        newOutputs.push({
          type: 'history',
          items: historyList
        });
        break;

      case 'sudo':
        if (!argStr) {
          newOutputs.push({ type: 'error', content: 'usage: sudo <command>' });
        } else {
          newOutputs.push({ 
            type: 'system', 
            content: '[sudo] user vardhman: authenticating with biometric enclave... granted.' 
          });
          setTimeout(() => executeCommand(argStr), 100);
        }
        break;

      case 'recent':
      case 'recent-work':
      case 'recentwork':
        newOutputs.push({ type: 'file_content', content: FILE_SYSTEM['recent-work.txt'].content });
        break;

      case 'apache':
      case 'magpie':
      case 'prs': {
        const apacheUrl = 'https://github.com/search?q=repo%3Aapache%2Fmagpie+is%3Apr+author%3AKaap10&type=pullrequests';
        openInNewTab(apacheUrl);
        newOutputs.push({
          type: 'success',
          content: 'Apache Magpie Committer: 54 Merged Pull Requests (177+ total merged across 31 repos).'
        });
        newOutputs.push({ 
          type: 'nav_launch', 
          label: 'Apache Magpie PRs', 
          route: apacheUrl,
          url: apacheUrl
        });
        break;
      }

      case 'leetcode':
      case 'lc':
        openInNewTab('https://leetcode.com/u/kap10/');
        newOutputs.push({ 
          type: 'nav_launch', 
          label: 'LeetCode Profile (@kap10)', 
          route: 'https://leetcode.com/u/kap10/',
          url: 'https://leetcode.com/u/kap10/'
        });
        break;

      case 'hashnode':
      case 'medium':
        openInNewTab('https://kap10.hashnode.dev/');
        newOutputs.push({ 
          type: 'nav_launch', 
          label: 'Technical Blogs (Hashnode)', 
          route: 'https://kap10.hashnode.dev/',
          url: 'https://kap10.hashnode.dev/'
        });
        break;

      case 'github':
        openInNewTab('https://github.com/Kaap10');
        newOutputs.push({ 
          type: 'nav_launch', 
          label: 'GitHub Profile', 
          route: 'https://github.com/Kaap10',
          url: 'https://github.com/Kaap10'
        });
        break;

      case 'linkedin':
        openInNewTab('https://linkedin.com/in/vardhman-gupta');
        newOutputs.push({ 
          type: 'nav_launch', 
          label: 'LinkedIn Profile', 
          route: 'https://linkedin.com/in/vardhman-gupta',
          url: 'https://linkedin.com/in/vardhman-gupta'
        });
        break;

      case 'email':
      case 'mail':
        window.location.href = 'mailto:vardhmangupta2004@gmail.com';
        newOutputs.push({ type: 'success', content: 'Triggering mailto:vardhmangupta2004@gmail.com...' });
        break;

      case 'exit':
      case 'quit':
      case 'logout':
        newOutputs.push({ type: 'info', content: 'Session active. Workstation terminal running continuously.' });
        break;

      default:
        const cleanCmd = cmd.replace(/^\.\//, '').replace(/^\//, '');
        if (FILE_SYSTEM[cleanCmd]) {
          if (FILE_SYSTEM[cleanCmd].type === 'file') {
            newOutputs.push({ type: 'file_content', content: FILE_SYSTEM[cleanCmd].content });
          } else if (FILE_SYSTEM[cleanCmd].type === 'dir' && FILE_SYSTEM[cleanCmd].route) {
            navigateTo(FILE_SYSTEM[cleanCmd].route, cleanCmd);
          }
        } else {
          newOutputs.push({
            type: 'error',
            content: `command not found: ${cmd}. Type 'help' to see available commands or 'ls' to list targets.`
          });
        }
        break;
    }

    setOutputList(prev => [...prev, ...newOutputs]);
    setInput('');
  }, [historyList, navigateTo, openInNewTab]);

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      setOutputList([]);
      return;
    } else if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      setOutputList(prev => [...prev, { type: 'command', command: `${input}^C` }]);
      setInput('');
      setHistoryIndex(-1);
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyList.length === 0) return;
      const nextIdx = historyIndex === -1 ? historyList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(historyList[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= historyList.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIdx);
        setInput(historyList[nextIdx] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const trimmedLeft = input.trimStart();
      if (!trimmedLeft) return;

      const tokens = trimmedLeft.split(/\s+/);
      // Complete command name if single token without trailing space
      if (tokens.length === 1 && !trimmedLeft.endsWith(' ')) {
        const partial = tokens[0].toLowerCase();
        const matching = COMMAND_LIST.filter(c => c.startsWith(partial));
        if (matching.length === 1) {
          setInput(matching[0]);
        } else if (matching.length > 1) {
          setOutputList(prev => [
            ...prev,
            { type: 'command', command: input },
            { type: 'info', content: matching.join('   ') }
          ]);
        } else {
          const fileMatches = Object.keys(FILE_SYSTEM).filter(f => f.startsWith(partial));
          if (fileMatches.length === 1) {
            setInput(`cat ${fileMatches[0]}`);
          }
        }
      } else {
        // Complete argument for cat / cd / open / explore
        const baseCmd = tokens[0].toLowerCase();
        const partialArg = (trimmedLeft.endsWith(' ') ? '' : tokens[tokens.length - 1]).toLowerCase();
        const candidates = Object.keys(FILE_SYSTEM).filter((key) => {
          if (baseCmd === 'cat') return FILE_SYSTEM[key].type === 'file';
          if (baseCmd === 'cd') return FILE_SYSTEM[key].type === 'dir';
          return true;
        }).filter(key => key.startsWith(partialArg));

        if (candidates.length === 1) {
          setInput(`${baseCmd} ${candidates[0]}`);
        } else if (candidates.length > 1) {
          setOutputList(prev => [
            ...prev,
            { type: 'command', command: input },
            { type: 'info', content: candidates.join('   ') }
          ]);
        }
      }
    }
  };

  return (
    <Layout
      title="Home"
      description="Personal website, digital workstation, and interactive terminal of Vardhman Gupta."
      wrapperClassName="homepage-wrapper"
      noNavbar
      noFooter
    >
      <main className={styles.pageContainer}>
        {/* Subtle Matte Technical Grid Backdrop */}
        <div className={styles.bgCanvasWrapper} aria-hidden="true">
          <div className={styles.gridOverlay} />
        </div>

        {/* Realistic Isolated MacBook Pro Device Mockup */}
        <div className={styles.laptopWrapper}>
          {/* Display Lid Frame */}
          <div className={styles.laptopLid}>
            {/* Top Camera Notch */}
            <div className={styles.cameraNotch}>
              <div className={styles.cameraLens} />
              <div className={styles.cameraSensor} />
            </div>

            {/* Screen Display Area */}
            <div className={styles.laptopScreen}>
              {/* Window Title Bar */}
              <div className={styles.windowTitleBar}>
                <div className={styles.windowControls}>
                  <button 
                    type="button" 
                    className={`${styles.windowDot} ${styles.dotRed}`} 
                    onClick={() => setOutputList([])} 
                    title="Clear Terminal" 
                    aria-label="Clear Terminal"
                  />
                  <button 
                    type="button" 
                    className={`${styles.windowDot} ${styles.dotYellow}`} 
                    onClick={() => executeCommand('help')} 
                    title="Show Help" 
                    aria-label="Show Help"
                  />
                  <button 
                    type="button" 
                    className={`${styles.windowDot} ${styles.dotGreen}`} 
                    onClick={() => executeCommand('neofetch')} 
                    title="Run Neofetch" 
                    aria-label="Run Neofetch"
                  />
                </div>

                <div className={styles.windowTabTitle}>
                  <TerminalIcon size={12} className={styles.tabIcon} />
                  <span>bash - vardhman@workstation: ~</span>
                </div>

                <div className={styles.windowActions}>
                  <button 
                    type="button"
                    className={styles.miniActionButton}
                    onClick={() => executeCommand('help')}
                    title="Help documentation"
                  >
                    <HelpCircle size={12} />
                    <span>help</span>
                  </button>
                  <button 
                    type="button"
                    className={styles.miniActionButton}
                    onClick={() => setOutputList([])}
                    title="Clear buffer"
                  >
                    <RotateCcw size={12} />
                    <span>clear</span>
                  </button>
                </div>
              </div>

              {/* Terminal Body Content */}
              <div 
                className={styles.terminalBody} 
                ref={terminalBodyRef}
                onClick={focusInput}
              >
                {/* Rendered Output History */}
                {outputList.map((item, idx) => (
                  <div key={idx} className={styles.outputItem}>
                    {item.type === 'banner' && (
                      <pre className={styles.bannerAscii}>{item.content}</pre>
                    )}

                    {item.type === 'command' && (
                      <div className={styles.commandLineEcho}>
                        <span className={styles.promptUser}>vardhman@workstation</span>
                        <span className={styles.promptSep}>:</span>
                        <span className={styles.promptPath}>~</span>
                        <span className={styles.promptSymbol}>$</span>
                        <span className={styles.echoCommandText}>{item.command}</span>
                      </div>
                    )}

                    {/* Dedicated Navigation Launch Link Item */}
                    {item.type === 'nav_launch' && (
                      <div className={styles.navLaunchContainer}>
                        <div className={styles.navLaunchMessage}>
                          <span className={styles.systemPulseDot} />
                          <span>Opening {item.label}...</span>
                        </div>
                        <a 
                          href={item.url || item.route} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.navLaunchButton}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Open {item.label} in new tab</span>
                          <ArrowUpRight size={13} />
                        </a>
                      </div>
                    )}

                    {item.type === 'text' && (
                      <div className={styles.standardText}>{item.content}</div>
                    )}

                    {item.type === 'system' && (
                      <div className={styles.systemMessage}>
                        <span className={styles.systemPulseDot} />
                        <span>{item.content}</span>
                      </div>
                    )}

                    {item.type === 'success' && (
                      <div className={styles.successMessage}>
                        <Check size={13} className={styles.statusInlineIcon} />
                        <span>{item.content}</span>
                      </div>
                    )}

                    {item.type === 'info' && (
                      <div className={styles.infoMessage}>{item.content}</div>
                    )}

                    {item.type === 'error' && (
                      <div className={styles.errorMessage}>
                        <X size={13} className={styles.statusInlineIcon} />
                        <span>{item.content}</span>
                      </div>
                    )}

                    {item.type === 'file_content' && (
                      <FormattedFileContent content={item.content} />
                    )}

                    {item.type === 'ls' && (
                      <div className={styles.lsGrid}>
                        {item.entries.map((entry, eIdx) => {
                          if (entry.type === 'dir' && entry.route) {
                            return (
                              <a
                                key={eIdx}
                                href={entry.route}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.lsItem} ${styles.lsDir}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <Folder size={13} className={styles.lsIcon} />
                                <span className={styles.lsName}>{entry.name}/</span>
                                <ExternalLink size={11} className={styles.lsLinkIcon} />
                              </a>
                            );
                          }

                          return (
                            <div 
                              key={eIdx} 
                              className={`${styles.lsItem} ${styles.lsFile}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                executeCommand(`cat ${entry.name}`);
                              }}
                            >
                              <FileText size={13} className={styles.lsIcon} />
                              <span className={styles.lsName}>{entry.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {item.type === 'help' && (
                      <div className={styles.helpContainer}>
                        {item.content.map((sec, sIdx) => (
                          <div key={sIdx} className={styles.helpSection}>
                            <div className={styles.helpCategoryTitle}>{sec.category}</div>
                            <div className={styles.helpItemsGrid}>
                              {sec.items.map((h, hIdx) => {
                                if (h.route) {
                                  return (
                                    <a 
                                      key={hIdx}
                                      href={h.route}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={styles.helpRowLink}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <code className={styles.helpCommand}>{h.name}</code>
                                      <span className={styles.helpDesc}>{h.desc}</span>
                                      <ArrowUpRight size={12} className={styles.helpLinkIcon} />
                                    </a>
                                  );
                                }

                                return (
                                  <div 
                                    key={hIdx} 
                                    className={styles.helpRow}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      executeCommand(h.name.split(' ')[0]);
                                    }}
                                  >
                                    <code className={styles.helpCommand}>{h.name}</code>
                                    <span className={styles.helpDesc}>{h.desc}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.type === 'neofetch' && (
                      <div className={styles.neofetchContainer}>
                        <pre className={styles.neofetchLogo}>
                          {NEOFETCH_ASCII}
                        </pre>
                        <div className={styles.neofetchData}>
                          <div className={styles.neofetchUser}>{item.data.user}</div>
                          <div className={styles.neofetchDivider}>---------------------</div>
                          <div className={styles.neofetchRow}><span className={styles.neofetchKey}>OS:</span> <span className={styles.neofetchVal}>{item.data.os}</span></div>
                          <div className={styles.neofetchRow}><span className={styles.neofetchKey}>Host:</span> <span className={styles.neofetchVal}>{item.data.host}</span></div>
                          <div className={styles.neofetchRow}><span className={styles.neofetchKey}>Kernel:</span> <span className={styles.neofetchVal}>{item.data.kernel}</span></div>
                          <div className={styles.neofetchRow}><span className={styles.neofetchKey}>Uptime:</span> <span className={styles.neofetchVal}>{item.data.uptime}</span></div>
                          <div className={styles.neofetchRow}><span className={styles.neofetchKey}>Shell:</span> <span className={styles.neofetchVal}>{item.data.shell}</span></div>
                          <div className={styles.neofetchRow}><span className={styles.neofetchKey}>Resolution:</span> <span className={styles.neofetchVal}>{item.data.resolution}</span></div>
                          <div className={styles.neofetchRow}><span className={styles.neofetchKey}>Theme:</span> <span className={styles.neofetchVal}>{item.data.theme}</span></div>
                          <div className={styles.neofetchRow}><span className={styles.neofetchKey}>CPU:</span> <span className={styles.neofetchVal}>{item.data.cpu}</span></div>
                          <div className={styles.neofetchRow}><span className={styles.neofetchKey}>Memory:</span> <span className={styles.neofetchVal}>{item.data.memory}</span></div>
                          <div className={styles.neofetchRow}><span className={styles.neofetchKey}>Stack:</span> <span className={styles.neofetchValHighlight}>{item.data.stack}</span></div>
                        </div>
                      </div>
                    )}

                    {item.type === 'history' && (
                      <div className={styles.historyList}>
                        {item.items.map((hCmd, hIdx) => (
                          <div key={hIdx} className={styles.historyRow}>
                            <span className={styles.historyNum}>{hIdx + 1}</span>
                            <span className={styles.historyCmd}>{hCmd}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Active Interactive Input Prompt */}
                <div className={styles.activePromptRow}>
                  <span className={styles.promptUser}>vardhman@workstation</span>
                  <span className={styles.promptSep}>:</span>
                  <span className={styles.promptPath}>~</span>
                  <span className={styles.promptSymbol}>$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    className={styles.terminalInput}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    spellCheck="false"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="Type command (e.g. portfolio, tracker, help, ls)..."
                  />
                </div>
              </div>

              {/* Bottom Quick Suggestion Action Chips (Opens in New Tab) */}
              <div className={styles.terminalSuggestionsBar}>
                <span className={styles.suggestionsLabel}>Quick:</span>
                <div className={styles.suggestionsList}>
                  {SUGGESTIONS.map((s, idx) => {
                    const ChipIcon = s.Icon;

                    if (s.isRoute && s.route) {
                      return (
                        <a
                          key={idx}
                          href={s.route}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.suggestionChip}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOutputList(prev => [
                              ...prev,
                              { type: 'command', command: s.cmd },
                              { type: 'nav_launch', label: s.label, route: s.route, url: s.route }
                            ]);
                          }}
                          title={`Open ${s.label} in new tab`}
                        >
                          <ChipIcon size={12} className={styles.chipSvgIcon} />
                          <span>{s.label}</span>
                          <ArrowUpRight size={10} className={styles.chipLinkArrow} />
                        </a>
                      );
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        className={styles.suggestionChip}
                        onClick={(e) => {
                          e.stopPropagation();
                          executeCommand(s.cmd);
                        }}
                        title={"Run " + s.cmd}
                      >
                        <ChipIcon size={12} className={styles.chipSvgIcon} />
                        <span>{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Screen Glass Reflection Sheen */}
              <div className={styles.screenSheen} />
            </div>
          </div>

          {/* Laptop Aluminum Base & Notch */}
          <div className={styles.laptopBase}>
            <div className={styles.thumbNotch} />
          </div>
        </div>
      </main>
    </Layout>
  );
}

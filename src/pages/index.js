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
  Sparkles
} from 'lucide-react';
import styles from './index.module.css';

const COMMAND_LIST = [
  'help', 'ls', 'cd', 'cat', 'portfolio', 'projects', 'tools', 
  'opensource', 'build-with-ai', 'bwa', 'dynavec', 'board', 'tracker', 'blogs', 'scratchpad', 'resume', 
  'cv', 'explore', 'neofetch', 'fastfetch', 'whoami', 'pwd', 'clear', 
  'cls', 'history', 'uname', 'date', 'uptime', 'echo', 'sudo', 
  'github', 'linkedin', 'email', 'open', 'goto', 'about', 'skills', 
  'contact', 'git', 'curl', 'ping', 'top', 'htop', 'man'
];

const FILE_SYSTEM = {
  'portfolio': { type: 'dir', route: '/portfolio', desc: 'Interactive Engineering Portfolio' },
  'projects': { type: 'dir', route: '/projects', desc: 'Production Systems & Repositories' },
  'tools': { type: 'dir', route: '/tools', desc: 'Developer Utilities & Sandboxes' },
  'opensource': { type: 'dir', route: '/opensource', desc: 'Open Source Projects & Contributions' },
  'build-with-ai': { type: 'dir', route: '/build-with-ai', desc: 'Zero-API Software Architect CLI Showcase' },
  'dynavec': { type: 'dir', route: '/opensource/dynavec', desc: 'Serverless Hybrid Vector DB Contributions' },
  'board': { type: 'dir', route: '/board', desc: 'Architecture Whiteboard & Visual Canvas' },
  'tracker': { type: 'dir', route: '/tracker', desc: 'Productivity & Focus Tracker' },
  'blogs': { type: 'dir', route: '/blogs/intro', desc: 'Technical Articles & Guides' },
  'about.txt': { type: 'file', content: `Vardhman Gupta
AI & Distributed Systems Engineer | Open Source Enthusiast
Passionate about low-latency architectures, autonomous agent workflows, and clean developer tooling.
Building high-impact software systems with Go, Python, Rust, React, and Kubernetes.` },
  'skills.json': { type: 'file', content: `{
  "languages": ["Go", "Python", "Rust", "TypeScript", "C++", "SQL"],
  "systems": ["Kubernetes", "Docker", "Kafka", "Redis", "gRPC", "PostgreSQL", "Supabase"],
  "frontend": ["React", "Next.js", "Docusaurus", "CSS Modules", "TailwindCSS"],
  "ai_ml": ["LLM Agent Orchestration", "RAG Pipelines", "PyTorch", "HuggingFace"]
}` },
  'contact.sh': { type: 'file', content: `#!/bin/bash
# Contact Vardhman Gupta
EMAIL="vardhmangupta2004@gmail.com"
GITHUB="https://github.com/Kaap10"
LINKEDIN="https://linkedin.com/in/vardhman-gupta"
STATUS="Open to high-impact engineering opportunities & open source collaboration."` },
  'resume.pdf': { type: 'file', content: `[RESUME] Detailed resume available in the Portfolio section.
Run 'portfolio' or 'cd portfolio' to explore complete experience, projects, and credentials.` }
};

const SUGGESTIONS = [
  { label: 'help', cmd: 'help', Icon: HelpCircle, isRoute: false },
  { label: 'portfolio', cmd: 'portfolio', route: '/portfolio', Icon: Compass, isRoute: true },
  { label: 'projects', cmd: 'projects', route: '/projects', Icon: Code, isRoute: true },
  { label: 'tools', cmd: 'tools', route: '/tools', Icon: Wrench, isRoute: true },
  { label: 'opensource', cmd: 'opensource', route: '/opensource', Icon: Code2, isRoute: true },
  { label: 'board', cmd: 'board', route: '/board', Icon: PenTool, isRoute: true },
  { label: 'tracker', cmd: 'tracker', route: '/tracker', Icon: Target, isRoute: true },
  { label: 'blogs', cmd: 'blogs', route: '/blogs/intro', Icon: BookOpen, isRoute: true },
  { label: 'ls', cmd: 'ls', Icon: Folder, isRoute: false },
  { label: 'clear', cmd: 'clear', Icon: RotateCcw, isRoute: false }
];

const INITIAL_OUTPUT = [
  {
    type: 'banner',
    content: `  ██╗  ██╗ █████╗  ██████╗  ██╗ ██████╗ 
  ██║ ██╔╝██╔══██╗██╔══██╗███║██╔═████╗
  █████╔╝ ███████║██████╔╝╚██║██║██╔██║
  ██╔═██╗ ██╔══██║██╔═══╝  ██║████╔╝██║
  ██║  ██╗██║  ██║██║      ██║╚██████╔╝
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝      ╚═╝ ╚═════╝ 
  ─────────────────────────────────────────────────────────────
  Kap10 Workstation OS v2.4.0 (x86_64-apple-darwin)
  Type 'help' to list commands, or run 'portfolio' / 'tracker'.
  All navigation links open directly in a new browser tab.
  ─────────────────────────────────────────────────────────────`
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
   High-Performance Particle Canvas Component (particles.js Style Network)
   ========================================================================== */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(85, Math.floor((width * height) / 14000));
    const particles = [];

    const colors = [
      'rgba(255, 77, 79, 0.75)',
      'rgba(255, 120, 117, 0.65)',
      'rgba(255, 204, 199, 0.55)',
      'rgba(255, 255, 255, 0.45)',
      'rgba(255, 77, 79, 0.35)'
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 1.8 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.5 + 0.3
      });
    }

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let lastTime = performance.now();
    const maxLinkDist = 115;
    const maxMouseDist = 135;

    const animate = (currentTime) => {
      if (!isVisible) return;
      const dt = Math.min(32, currentTime - lastTime) / 16;
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLinkDist) {
            const alpha = (1 - dist / maxLinkDist) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 77, 79, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        if (mouse.x > 0 && mouse.y > 0) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < maxMouseDist) {
            const mAlpha = (1 - mDist / maxMouseDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 120, 117, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            p.x -= (mdx / mDist) * 0.25;
            p.y -= (mdy / mDist) * 0.25;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.particleCanvas} aria-hidden="true" />;
}

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
    if (
      normalized === 'explore project' ||
      normalized === 'explore projects' ||
      normalized === 'view project' ||
      normalized === 'view projects' ||
      normalized === 'show project' ||
      normalized === 'show projects'
    ) {
      navigateTo('/projects', 'Projects Showcase');
      return;
    }

    if (
      normalized === 'explore tools' ||
      normalized === 'explore tool' ||
      normalized === 'view tools' ||
      normalized === 'view tool' ||
      normalized === 'show tools'
    ) {
      navigateTo('/tools', 'Developer Tools');
      return;
    }

    if (
      normalized === 'explore portfolio' ||
      normalized === 'view portfolio' ||
      normalized === 'show portfolio'
    ) {
      navigateTo('/portfolio', 'Portfolio');
      return;
    }

    if (
      normalized === 'explore opensource' ||
      normalized === 'explore open source' ||
      normalized === 'explore open-source' ||
      normalized === 'view opensource'
    ) {
      navigateTo('/opensource', 'Open Source Hub');
      return;
    }

    if (
      normalized === 'explore board' ||
      normalized === 'explore whiteboard' ||
      normalized === 'view board'
    ) {
      navigateTo('/board', 'Interactive Whiteboard');
      return;
    }

    if (
      normalized === 'explore tracker' ||
      normalized === 'view tracker'
    ) {
      navigateTo('/tracker', 'Focus & Habits Tracker');
      return;
    }

    if (
      normalized === 'explore blogs' ||
      normalized === 'explore blog' ||
      normalized === 'view blogs'
    ) {
      navigateTo('/blogs/intro', 'Engineering Blogs');
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
            { category: 'NAVIGATION (OPENS IN NEW TAB)', items: [
              { name: 'portfolio', route: '/portfolio', desc: 'Open interactive Engineering Portfolio' },
              { name: 'projects', route: '/projects', desc: 'View Full Projects Catalog & Repositories' },
              { name: 'tools', route: '/tools', desc: 'Access Developer Tools Suite & Utilities' },
              { name: 'opensource', route: '/opensource', desc: 'Explore Open Source Projects (MIT/npm)' },
              { name: 'build-with-ai', route: '/build-with-ai', desc: 'Zero-API Software Architect CLI Showcase' },
              { name: 'board', route: '/board', desc: 'Open Interactive Architecture Whiteboard' },
              { name: 'tracker', route: '/tracker', desc: 'Open Focus & Productivity Tracker' },
              { name: 'blogs', route: '/blogs/intro', desc: 'Read Engineering Articles & Blogs' },
              { name: 'resume', route: '/portfolio', desc: 'View complete resume and experience profile' },
              { name: 'explore <target>', desc: 'Explore specific section (e.g. explore projects, explore tools)' },
              { name: 'scratchpad', desc: 'Open global Markdown Scratchpad drawer (Ctrl+J)' },
              { name: 'cd <target>', desc: 'Change directory / open target in new tab' },
              { name: 'open <target>', desc: 'Launch specified application in new tab' },
              { name: 'goto <target>', desc: 'Jump directly to page or URL in new tab' }
            ]},
            { category: 'FILE SYSTEM & INSPECTION', items: [
              { name: 'ls [-la]', desc: 'List files and directories' },
              { name: 'cat <file>', desc: 'Read file contents (e.g. cat about.txt, cat skills.json)' },
              { name: 'pwd', desc: 'Print working directory path' },
              { name: 'whoami', desc: 'Display active user identity and role' },
              { name: 'neofetch', desc: 'Display system telemetry & developer specs' },
              { name: 'uname -a', desc: 'Print operating system & kernel release' },
              { name: 'date', desc: 'Display current system timestamp' },
              { name: 'uptime', desc: 'Display workstation system uptime' }
            ]},
            { category: 'UTILITIES & SOCIAL', items: [
              { name: 'clear', desc: 'Clear terminal screen' },
              { name: 'history', desc: 'Show session command history' },
              { name: 'echo <text>', desc: 'Print arguments to stdout' },
              { name: 'git status', desc: 'Show working tree status and branch info' },
              { name: 'curl <url>', desc: 'Fetch URL or inspect API endpoints' },
              { name: 'top', desc: 'Display active system processes & resource usage' },
              { name: 'sudo <cmd>', desc: 'Execute command with elevated privileges' },
              { name: 'github', route: 'https://github.com/Kaap10', desc: 'Open GitHub profile (Kaap10)' },
              { name: 'linkedin', route: 'https://linkedin.com/in/vardhman-gupta', desc: 'Open LinkedIn profile' },
              { name: 'email', desc: 'Send an email to Vardhman Gupta' }
            ]}
          ]
        });
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

      case 'build-with-ai':
      case 'buildwithai':
      case 'bwa':
      case 'ai-architect':
        navigateTo('/build-with-ai', 'build-with-ai Showcase');
        break;

      case 'dynavec':
      case 'dyna-vec':
        navigateTo('/opensource/dynavec', 'dynavec Contributions Showcase');
        break;

      case 'board':
      case 'whiteboard':
      case 'draw':
      case 'canvas':
        navigateTo('/board', 'Interactive Whiteboard');
        break;

      case 'tracker':
      case 'habits':
      case 'goals':
      case 'focus':
      case 'tasks':
        navigateTo('/tracker', 'Focus & Habits Tracker');
        break;

      case 'blogs':
      case 'blog':
      case 'articles':
      case 'article':
      case 'posts':
      case 'post':
      case 'docs':
        navigateTo('/blogs/intro', 'Engineering Blogs');
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
      case 'notes':
      case 'note':
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
                    { name: 'explore projects', route: '/projects', desc: 'Production systems & AI repositories' },
                    { name: 'explore tools', route: '/tools', desc: 'Interactive developer tools & sandboxes' },
                    { name: 'explore portfolio', route: '/portfolio', desc: 'Complete engineering background & credentials' },
                    { name: 'explore opensource', route: '/opensource', desc: 'Open-source packages & contributions' },
                    { name: 'explore build-with-ai', route: '/build-with-ai', desc: 'Zero-API Software Architect CLI Showcase' },
                    { name: 'explore board', route: '/board', desc: 'System architecture visual whiteboard' },
                    { name: 'explore tracker', route: '/tracker', desc: 'Daily productivity, tasks, and focus timer' },
                    { name: 'explore blogs', route: '/blogs/intro', desc: 'In-depth engineering articles and notes' },
                  ]
                }
              ]
            });
          } else {
            newOutputs.push({ type: 'error', content: `Usage: ${cmd} <target | url>` });
          }
        } else {
          const target = argStr.replace(/^\//, '').replace(/\/$/, '');
          if (target === 'projects' || target === 'project' || target === 'proj') {
            navigateTo('/projects', 'Projects Showcase');
          } else if (target === 'tools' || target === 'tool') {
            navigateTo('/tools', 'Developer Tools');
          } else if (target === 'portfolio' || target === 'portfolio#projects') {
            navigateTo('/portfolio', 'Portfolio');
          } else if (target === 'opensource' || target === 'os' || target === 'open source' || target === 'open-source') {
            navigateTo('/opensource', 'Open Source Hub');
          } else if (target === 'build-with-ai' || target === 'buildwithai' || target === 'bwa') {
            navigateTo('/build-with-ai', 'build-with-ai Showcase');
          } else if (target === 'board' || target === 'whiteboard') {
            navigateTo('/board', 'Interactive Whiteboard');
          } else if (target === 'tracker' || target === 'habits' || target === 'focus') {
            navigateTo('/tracker', 'Focus & Habits Tracker');
          } else if (target === 'blogs' || target === 'blog' || target === 'articles') {
            navigateTo('/blogs/intro', 'Engineering Blogs');
          } else if (target === 'about' || target === 'about.txt') {
            newOutputs.push({ type: 'file_content', content: FILE_SYSTEM['about.txt'].content });
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
          } else if (target === 'projects' || target === 'project' || target === 'proj') {
            navigateTo('/projects', 'Projects Showcase');
          } else if (target === 'tools' || target === 'tool') {
            navigateTo('/tools', 'Developer Tools');
          } else if (target === 'portfolio' || target === 'portfolio#projects') {
            navigateTo('/portfolio', 'Portfolio');
          } else if (target === 'opensource' || target === 'os' || target === 'open source' || target === 'open-source') {
            navigateTo('/opensource', 'Open Source Hub');
          } else if (target === 'board' || target === 'whiteboard') {
            navigateTo('/board', 'Interactive Whiteboard');
          } else if (target === 'tracker' || target === 'habits' || target === 'focus') {
            navigateTo('/tracker', 'Focus & Habits Tracker');
          } else if (target === 'blogs' || target === 'blog' || target === 'articles') {
            navigateTo('/blogs/intro', 'Engineering Blogs');
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
          content: 'vardhman (uid=1000 gid=1000 groups=1000[vardhman],4[adm],27[sudo],999[docker]) · AI & Systems Engineer'
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
            theme: 'Crimson Slate Dark (#FF4D4F)',
            terminal: 'kaap10-web-pty v2.4.0',
            cpu: 'Apple M3 Max (16 Cores: 12P + 4E)',
            memory: '18.4 GiB / 64.0 GiB (28%)',
            stack: 'Go, Python, Rust, React, Kubernetes, Supabase'
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
      const current = input.trim();
      if (!current) return;
      const matching = COMMAND_LIST.filter(c => c.startsWith(current.toLowerCase()));
      if (matching.length === 1) {
        setInput(matching[0]);
      } else if (matching.length > 1) {
        setOutputList(prev => [
          ...prev,
          { type: 'command', command: input },
          { type: 'info', content: matching.join('   ') }
        ]);
      } else {
        const fileMatches = Object.keys(FILE_SYSTEM).filter(f => f.startsWith(current.toLowerCase()));
        if (fileMatches.length === 1) {
          setInput(`cat ${fileMatches[0]}`);
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
        {/* Dynamic Interactive Particles Network Canvas & Volumetric Smoke */}
        <div className={styles.bgCanvasWrapper} aria-hidden="true">
          <ParticleCanvas />
          <div className={styles.glowOrb} />
          <div className={styles.glowOrbSecondary} />
          
          {/* Volumetric Organic Smoke System */}
          <div className={styles.smokeContainer}>
            <div className={`${styles.smokePuff} ${styles.smokePuff1}`} />
            <div className={`${styles.smokePuff} ${styles.smokePuff2}`} />
            <div className={`${styles.smokePuff} ${styles.smokePuff3}`} />
            <div className={`${styles.smokePuff} ${styles.smokePuff4}`} />
            <div className={`${styles.smokePuff} ${styles.smokePuff5}`} />
            <div className={`${styles.smokePuff} ${styles.smokePuff6}`} />
            <div className={styles.groundMistLayer} />
            <div className={styles.crimsonHaze} />
          </div>

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

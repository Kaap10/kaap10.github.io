import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
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
  Wrench
} from 'lucide-react';
import styles from './commonComponents.module.css';

const COMMANDS = [
  // 1. Primary Hubs & Navigation
  {
    id: 'nav-portfolio',
    section: 'Navigation',
    title: 'Go to Portfolio',
    keywords: ['portfolio', 'resume', 'cv', 'about', 'engineer', 'experience'],
    shortcut: 'G P',
    icon: <Compass size={16} />,
    action: () => (window.location.href = '/portfolio'),
  },
  {
    id: 'nav-workspace',
    section: 'Navigation',
    title: 'Go to DevWorkspace Hub',
    keywords: ['workspace', 'devworkspace', 'hub', 'suite', 'tools'],
    shortcut: 'G W',
    icon: <Layers size={16} />,
    action: () => (window.location.href = '/workspace'),
  },
  {
    id: 'nav-whiteboard',
    section: 'Navigation',
    title: 'Open Whiteboard Canvas',
    keywords: ['whiteboard', 'board', 'draw', 'excalidraw', 'diagram', 'architecture', 'sketch', 'canvas'],
    shortcut: 'G B',
    icon: <PenTool size={16} />,
    action: () => (window.location.href = '/workspace/whiteboard'),
  },
  {
    id: 'nav-notebook',
    section: 'Navigation',
    title: 'Open Developer Notebook',
    keywords: ['notebook', 'notes', 'markdown', 'onenote', 'notion', 'editor', 'scratchpad'],
    shortcut: 'G N',
    icon: <BookOpen size={16} />,
    action: () => (window.location.href = '/workspace/notebook'),
  },
  {
    id: 'nav-tracker',
    section: 'Navigation',
    title: 'Go to Productivity Tracker',
    keywords: ['tracker', 'today', 'dashboard', 'productivity', 'habits', 'tasks', 'focus', 'pomodoro'],
    shortcut: 'G T',
    icon: <Activity size={16} />,
    action: () => (window.location.href = '/workspace/tracker'),
  },
  {
    id: 'nav-projects',
    section: 'Navigation',
    title: 'Go to Featured Projects',
    keywords: ['projects', 'repos', 'karya', 'auranow', 'incidentflow', 'terminal agent', 'agent bench', 'model router'],
    shortcut: 'G J',
    icon: <Code2 size={16} />,
    action: () => (window.location.href = '/projects'),
  },
  {
    id: 'nav-tools',
    section: 'Navigation',
    title: 'Go to Developer Tools Overview',
    keywords: ['tools', 'utilities', 'sandboxes', 'converters', 'jwt', 'regex'],
    shortcut: 'G U',
    icon: <Wrench size={16} />,
    action: () => (window.location.href = '/tools'),
  },
  {
    id: 'nav-opensource',
    section: 'Navigation',
    title: 'Go to Open Source Hub',
    keywords: ['opensource', 'open source', 'bwa', 'build-with-ai', 'dynavec', 'apache', 'magpie', 'pr'],
    shortcut: 'G O',
    icon: <GitPullRequest size={16} />,
    action: () => (window.location.href = '/opensource'),
  },
  {
    id: 'nav-blogs',
    section: 'Navigation',
    title: 'Go to Technical Blogs',
    keywords: ['blogs', 'articles', 'dsa', 'system design', 'machine learning', 'llm', 'transformers'],
    shortcut: 'G L',
    icon: <FileText size={16} />,
    action: () => (window.location.href = '/blogs/intro'),
  },
  {
    id: 'nav-terminal',
    section: 'Navigation',
    title: 'Go to Workstation Terminal (Home)',
    keywords: ['terminal', 'home', 'cli', 'bash', 'pty', 'shell', 'neofetch'],
    shortcut: 'G H',
    icon: <Terminal size={16} />,
    action: () => (window.location.href = '/'),
  },

  // 2. Open Source Showcases
  {
    id: 'nav-bwa',
    section: 'Open Source Showcases',
    title: 'Open build-with-ai Showcase',
    keywords: ['build-with-ai', 'bwa', 'cli', 'zero-api', 'npm', 'prompt engineering'],
    icon: <Sparkles size={16} />,
    action: () => (window.location.href = '/build-with-ai'),
  },
  {
    id: 'nav-dynavec',
    section: 'Open Source Showcases',
    title: 'Open dynavec Vector DB Showcase',
    keywords: ['dynavec', 'vector', 'database', 'fastmcp', 'dynamodb', 's3', 'python', 'spfresh'],
    icon: <Zap size={16} />,
    action: () => (window.location.href = '/opensource/dynavec'),
  },

  // 3. Tracker Sub-Views
  {
    id: 'nav-tasks',
    section: 'Tracker Sub-Views',
    title: 'Tracker: Tasks & Execution',
    keywords: ['tasks', 'todo', 'kanban', 'pipeline', 'backlog'],
    icon: <CheckSquare size={16} />,
    action: () => (window.location.href = '/workspace/tracker?tab=tasks'),
  },
  {
    id: 'nav-goals',
    section: 'Tracker Sub-Views',
    title: 'Tracker: Goals & Milestones',
    keywords: ['goals', 'milestones', 'targets', 'objectives', 'okr'],
    icon: <Target size={16} />,
    action: () => (window.location.href = '/workspace/tracker?tab=goals'),
  },
  {
    id: 'nav-habits',
    section: 'Tracker Sub-Views',
    title: 'Tracker: Daily Habits Matrix',
    keywords: ['habits', 'streaks', 'atomic', 'daily', 'consistency'],
    icon: <Flame size={16} />,
    action: () => (window.location.href = '/workspace/tracker?tab=habits'),
  },
  {
    id: 'nav-focus',
    section: 'Tracker Sub-Views',
    title: 'Tracker: Deep Work Focus Timer',
    keywords: ['focus', 'timer', 'pomodoro', 'deep work', 'countdown'],
    icon: <Clock size={16} />,
    action: () => (window.location.href = '/workspace/tracker?tab=focus'),
  },
  {
    id: 'nav-insights',
    section: 'Tracker Sub-Views',
    title: 'Tracker: Analytics & 52-Week Heatmap',
    keywords: ['insights', 'analytics', 'stats', 'heatmap', 'activity', 'retrospective'],
    icon: <BarChart3 size={16} />,
    action: () => (window.location.href = '/workspace/tracker?tab=progress'),
  },

  // 4. Focus & Productivity Presets
  {
    id: 'focus-25',
    section: 'Focus & Productivity',
    title: 'Start 25m Pomodoro Session',
    keywords: ['pomodoro', '25', 'focus', 'timer', 'start'],
    icon: <Timer size={16} />,
    action: () => {
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
      }
    },
  },
  {
    id: 'focus-50',
    section: 'Focus & Productivity',
    title: 'Start 50m Deep Work Session',
    keywords: ['deep work', '50', 'focus', 'timer', 'sprint'],
    icon: <Timer size={16} />,
    action: () => {
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
      }
    },
  },
  {
    id: 'focus-pip',
    section: 'Focus & Productivity',
    title: 'Open Floating Timer Capsule (PiP)',
    keywords: ['pip', 'floating', 'capsule', 'widget', 'mini timer'],
    icon: <Clock size={16} />,
    action: () => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('kaap10_widget_visible', '1');
        localStorage.setItem('kaap10_widget_size', 'pill');
        window.dispatchEvent(new CustomEvent('focusWidget:open'));
      }
    },
  },

  // 5. Developer Tools
  {
    id: 'tool-scratchpad',
    section: 'Developer Tools',
    title: 'Open Quick Scratchpad Drawer',
    shortcut: 'Ctrl+J',
    keywords: ['scratchpad', 'notes', 'memo', 'editor', 'drawer', 'workspace'],
    icon: <FileText size={16} />,
    action: () => {
      if (typeof window !== 'undefined') {
        const isWs = window.location.pathname.startsWith('/workspace');
        if (!isWs) {
          window.location.href = '/workspace';
        }
        window.dispatchEvent(new CustomEvent('scratchpad:open'));
      }
    },
  },
  {
    id: 'action-apache-prs',
    section: 'Developer Tools',
    title: 'View Apache/magpie Merged PRs',
    keywords: ['apache', 'magpie', 'pr', 'pull requests', 'contributions', 'github'],
    icon: <GitPullRequest size={16} />,
    action: () => {
      window.open('https://github.com/search?q=org%3AApache+is%3Apr+is%3Amerged+author%3AKaap10&type=pullrequests', '_blank');
    },
  },

  // 6. Quick Actions & Social Links
  {
    id: 'action-copy-portfolio',
    section: 'Quick Actions & Links',
    title: 'Copy Portfolio URL to Clipboard',
    keywords: ['copy', 'portfolio', 'link', 'share', 'url'],
    icon: <Copy size={16} />,
    action: () => {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText('https://kaap10.github.io/portfolio');
      }
    },
  },
  {
    id: 'social-github',
    section: 'Quick Actions & Links',
    title: 'Open GitHub Profile (@Kaap10)',
    keywords: ['github', 'profile', 'repos', 'kaap10'],
    icon: <ExternalLink size={16} />,
    action: () => window.open('https://github.com/Kaap10', '_blank'),
  },
  {
    id: 'social-linkedin',
    section: 'Quick Actions & Links',
    title: 'Open LinkedIn Profile',
    keywords: ['linkedin', 'profile', 'connect', 'vardhman'],
    icon: <ExternalLink size={16} />,
    action: () => window.open('https://linkedin.com/in/vardhman-gupta', '_blank'),
  },
  {
    id: 'social-leetcode',
    section: 'Quick Actions & Links',
    title: 'Open LeetCode Profile (@kap10)',
    keywords: ['leetcode', 'dsa', 'algorithms', 'problems'],
    icon: <ExternalLink size={16} />,
    action: () => window.open('https://leetcode.com/u/kap10/', '_blank'),
  },
  {
    id: 'social-medium',
    section: 'Quick Actions & Links',
    title: 'Open Medium Blog Profile',
    keywords: ['medium', 'blog', 'writing', 'articles'],
    icon: <ExternalLink size={16} />,
    action: () => window.open('https://medium.com/@kap10', '_blank'),
  },
  {
    id: 'social-email',
    section: 'Quick Actions & Links',
    title: 'Send Email to Vardhman Gupta',
    keywords: ['email', 'contact', 'mail', 'reach out'],
    icon: <Mail size={16} />,
    action: () => (window.location.href = 'mailto:vardhmangupta2004@gmail.com'),
  },
];

export default function GlobalCommandPalette() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);

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
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [isOpen]);

  // Fuzzy search filter
  const filtered = useMemo(() => {
    if (!query.trim()) return COMMANDS;
    const q = query.toLowerCase().trim();
    return COMMANDS.filter((c) => {
      const titleMatch = c.title.toLowerCase().includes(q);
      const sectionMatch = c.section.toLowerCase().includes(q);
      const keywordMatch = Array.isArray(c.keywords) && c.keywords.some((k) => k.toLowerCase().includes(q));
      return titleMatch || sectionMatch || keywordMatch;
    });
  }, [query]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filtered[selectedIndex];
      if (selected) {
        setIsOpen(false);
        selected.action();
      }
    }
  };

  if (!mounted || !isOpen || typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <div className={styles.paletteOverlay} onClick={() => setIsOpen(false)}>
      <div className={styles.paletteModal} onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        {/* Search Header */}
        <div className={styles.paletteSearchWrapper}>
          <span style={{ color: 'var(--vg-accent, #FF4D4F)', display: 'flex' }}>
            <Search size={18} />
          </span>
          <input
            ref={inputRef}
            type="text"
            className={styles.paletteInput}
            placeholder="Type a command, tool name, or jump to page..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className={styles.paletteShortcutBadge}>ESC</span>
        </div>

        {/* Command List */}
        <div className={styles.paletteList} ref={listRef}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--vg-text-muted, #A6A6AC)', fontSize: '0.85rem' }}>
              No commands found matching "{query}"
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              const showSectionHeader = index === 0 || filtered[index - 1].section !== item.section;

              return (
                <React.Fragment key={item.id}>
                  {showSectionHeader && (
                    <div className={styles.paletteSectionTitle}>{item.section}</div>
                  )}
                  <button
                    ref={(el) => (itemRefs.current[index] = el)}
                    type="button"
                    className={`${styles.paletteItem} ${isSelected ? styles.paletteItemActive : ''}`}
                    onClick={() => {
                      setIsOpen(false);
                      item.action();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                      <span className={styles.paletteItemIcon}>{item.icon}</span>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</span>
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
          <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
            <span><kbd className={styles.paletteShortcutBadge}>↑</kbd> <kbd className={styles.paletteShortcutBadge}>↓</kbd> navigate</span>
            <span><kbd className={styles.paletteShortcutBadge}>↵</kbd> select</span>
          </div>
          <span style={{ fontFamily: 'var(--ifm-font-family-monospace, monospace)', fontSize: '0.72rem' }}>
            Ctrl+K / Cmd+K
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
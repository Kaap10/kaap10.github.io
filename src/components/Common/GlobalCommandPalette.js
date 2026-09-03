import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import {
  IconHome,
  IconBook,
  IconBoard,
  IconZap,
  IconTasks,
  IconFlame,
  IconClock,
  IconBarChart,
  IconFocus,
  IconPill,
  IconLotus,
  IconCode,
  IconEdit,
  IconSearch,
} from './GlobalIcons';
import styles from './commonComponents.module.css';

const COMMANDS = [
  // Navigation
  {
    id: 'nav-home',
    section: 'Navigation',
    title: 'Go to Home',
    shortcut: 'G H',
    icon: <IconHome size={16} />,
    action: () => (window.location.href = '/'),
  },
  {
    id: 'nav-blogs',
    section: 'Navigation',
    title: 'Go to Blogs & Knowledge Base',
    shortcut: 'G B',
    icon: <IconBook size={16} />,
    action: () => (window.location.href = '/blogs'),
  },
  {
    id: 'nav-projects',
    section: 'Navigation',
    title: 'Go to Featured Projects',
    shortcut: 'G P',
    icon: <IconCode size={16} />,
    action: () => (window.location.href = '/projects'),
  },
  {
    id: 'nav-tools',
    section: 'Navigation',
    title: 'Go to Developer Tools Overview',
    shortcut: 'G O',
    icon: <IconTasks size={16} />,
    action: () => (window.location.href = '/tools'),
  },
  {
    id: 'nav-board',
    section: 'Navigation',
    title: 'Open Interactive Whiteboard',
    title: 'Open Whiteboard',
    shortcut: 'G W',
    icon: <IconBoard size={16} />,
    action: () => (window.location.href = '/board'),
  },
  {
    id: 'nav-tracker',
    section: 'Navigation',
    title: 'Go to Tracker Dashboard',
    shortcut: 'G T',
    icon: <IconZap size={16} />,
    action: () => (window.location.href = '/tracker'),
  },
  {
    id: 'nav-tasks',
    section: 'Tracker Views',
    title: 'Tracker: Tasks & Execution',
    icon: <IconTasks size={16} />,
    action: () => (window.location.href = '/tracker?tab=tasks'),
  },
  {
    id: 'nav-goals',
    section: 'Tracker Views',
    title: 'Tracker: Goals & Milestones',
    icon: <IconZap size={16} />,
    action: () => (window.location.href = '/tracker?tab=goals'),
  },
  {
    id: 'nav-habits',
    section: 'Tracker Views',
    title: 'Tracker: Daily Habits Matrix',
    icon: <IconFlame size={16} />,
    action: () => (window.location.href = '/tracker?tab=habits'),
  },
  {
    id: 'nav-focus',
    section: 'Tracker Views',
    title: 'Tracker: Deep Work Focus Timer',
    icon: <IconClock size={16} />,
    action: () => (window.location.href = '/tracker?tab=focus'),
  },
  {
    id: 'nav-insights',
    section: 'Tracker Views',
    title: 'Tracker: Analytics & Done Logs',
    icon: <IconBarChart size={16} />,
    action: () => (window.location.href = '/tracker?tab=progress'),
  },

  // Focus Actions
  {
    id: 'focus-25',
    section: 'Focus & Timer',
    title: 'Start 25m Pomodoro Session',
    icon: <IconFocus size={16} />,
    action: () => {
      const state = {
        startedAt: Date.now(),
        accumulated: 0,
        totalPreset: 25 * 60,
        mode: 'countdown',
        isActive: true,
        isoStartTime: new Date().toISOString(),
      };
      localStorage.setItem('kaap10_active_focus_session', JSON.stringify(state));
      localStorage.setItem('kaap10_widget_visible', '1');
      window.dispatchEvent(new CustomEvent('focusWidget:open'));
      window.dispatchEvent(new CustomEvent('focusWidget:stateChange', { detail: state }));
    },
  },
  {
    id: 'focus-50',
    section: 'Focus & Timer',
    title: 'Start 50m Deep Work Session',
    icon: <IconFocus size={16} />,
    action: () => {
      const state = {
        startedAt: Date.now(),
        accumulated: 0,
        totalPreset: 50 * 60,
        mode: 'countdown',
        isActive: true,
        isoStartTime: new Date().toISOString(),
      };
      localStorage.setItem('kaap10_active_focus_session', JSON.stringify(state));
      localStorage.setItem('kaap10_widget_visible', '1');
      window.dispatchEvent(new CustomEvent('focusWidget:open'));
      window.dispatchEvent(new CustomEvent('focusWidget:stateChange', { detail: state }));
    },
  },
  {
    id: 'focus-pip',
    section: 'Focus & Timer',
    title: 'Open Floating Timer Capsule (PiP)',
    icon: <IconPill size={16} />,
    action: () => {
      localStorage.setItem('kaap10_widget_visible', '1');
      localStorage.setItem('kaap10_widget_size', 'pill');
      window.dispatchEvent(new CustomEvent('focusWidget:open'));
    },
  },

  // Retrospective Done Logger
  {
    id: 'log-naam-jap',
    section: 'Quick Done Log',
    title: 'Log: Naam Jap Session Completed',
    icon: <IconLotus size={16} />,
    action: () => {
      const d = new Date();
      const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const newLog = {
        id: 'log_' + Date.now(),
        category: 'Naam Jap',
        details: 'Completed Naam Jap session with focused contemplation.',
        duration_minutes: 30,
        log_date: todayStr,
        created_at: new Date().toISOString(),
      };
      try {
        const saved = JSON.parse(localStorage.getItem('kaap10_activity_logs') || '[]');
        saved.unshift(newLog);
        localStorage.setItem('kaap10_activity_logs', JSON.stringify(saved));
      } catch (_) {}
      window.location.href = '/tracker?tab=progress';
    },
  },
  {
    id: 'log-dsa',
    section: 'Quick Done Log',
    title: 'Log: DSA Problem Solving',
    icon: <IconCode size={16} />,
    action: () => {
      window.location.href = '/tracker?tab=progress';
    },
  },

  // Developer Tools
  {
    id: 'tool-scratchpad',
    section: 'Developer Tools',
    title: 'Toggle Quick Scratchpad (Markdown)',
    shortcut: 'Ctrl+J',
    icon: <IconEdit size={16} />,
    action: () => {
      window.dispatchEvent(new CustomEvent('scratchpad:toggle'));
    },
  },
];

export default function GlobalCommandPalette() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global Ctrl+H / Cmd+H (and Ctrl+K) Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Support Ctrl+H / Cmd+H or Ctrl+K / Cmd+K
      if ((e.metaKey || e.ctrlKey) && (e.key === 'h' || e.key === 'H' || e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filtered = useMemo(() => {
    if (!query.trim()) return COMMANDS;
    const q = query.toLowerCase();
    return COMMANDS.filter(
      (c) => c.title.toLowerCase().includes(q) || c.section.toLowerCase().includes(q)
    );
  }, [query]);

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
            <IconSearch size={18} />
          </span>
          <input
            ref={inputRef}
            type="text"
            className={styles.paletteInput}
            placeholder="Type a command, jump to page, or start timer..."
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
                    type="button"
                    className={`${styles.paletteItem} ${isSelected ? styles.paletteItemActive : ''}`}
                    onClick={() => {
                      setIsOpen(false);
                      item.action();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className={styles.paletteItemIcon}>{item.icon}</span>
                      <span>{item.title}</span>
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
            Ctrl+H / Cmd+H
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
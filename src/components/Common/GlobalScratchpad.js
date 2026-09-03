import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  IconEdit,
  IconEye,
  IconCopy,
  IconDownload,
  IconTrash,
  IconPlus,
  IconClose,
  IconCheck,
} from './GlobalIcons';
import styles from './commonComponents.module.css';

const STORAGE_KEY = 'kaap10_scratchpad_sheets';

const DEFAULT_SHEETS = [
  {
    id: 'sheet_1',
    title: 'Quick Notes',
    content: `# Quick Scratchpad (Ctrl+J / Cmd+J)\n\nJot down thoughts, code snippets, or system architecture ideas while reading blogs and docs.\n\n\`\`\`python\n# Fast memoization example\nfrom functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)\n\`\`\`\n\n- [x] Auto-saved in browser\n- [ ] Exportable to Markdown\n`,
  },
];

export default function GlobalScratchpad() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sheets, setSheets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return DEFAULT_SHEETS;
  });
  const [activeSheetId, setActiveSheetId] = useState(() => sheets[0]?.id || 'sheet_1');
  const [isPreview, setIsPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global Ctrl+J / Cmd+J Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'j' || e.key === 'J')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    const handleToggleEvent = () => setIsOpen((prev) => !prev);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scratchpad:toggle', handleToggleEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scratchpad:toggle', handleToggleEvent);
    };
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sheets));
    } catch (_) {}
  }, [sheets]);

  const activeSheet = sheets.find((s) => s.id === activeSheetId) || sheets[0];

  const updateContent = (val) => {
    setSheets((prev) =>
      prev.map((s) => (s.id === activeSheet.id ? { ...s, content: val } : s))
    );
  };

  const addSheet = () => {
    const newId = 'sheet_' + Date.now();
    const newSheet = {
      id: newId,
      title: `Sheet ${sheets.length + 1}`,
      content: '',
    };
    setSheets((prev) => [...prev, newSheet]);
    setActiveSheetId(newId);
  };

  const deleteSheet = (id) => {
    if (sheets.length <= 1) return;
    setSheets((prev) => prev.filter((s) => s.id !== id));
    if (activeSheetId === id) {
      setActiveSheetId(sheets.find((s) => s.id !== id)?.id || 'sheet_1');
    }
  };

  const handleCopy = () => {
    if (!activeSheet?.content) return;
    navigator.clipboard.writeText(activeSheet.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleExport = () => {
    if (!activeSheet) return;
    const blob = new Blob([activeSheet.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeSheet.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderMarkdown = (text) => {
    if (!text) return <p style={{ color: 'var(--vg-text-subtle, #787880)' }}>Empty note. Write some markdown...</p>;

    const lines = text.split('\n');
    return (
      <div>
        {lines.map((line, idx) => {
          if (line.startsWith('# ')) return <h2 key={idx} style={{ fontSize: '1.2rem', margin: '0.5rem 0', color: 'var(--vg-text, #F5F5F7)' }}>{line.slice(2)}</h2>;
          if (line.startsWith('## ')) return <h3 key={idx} style={{ fontSize: '1rem', margin: '0.4rem 0', color: 'var(--vg-text, #F5F5F7)' }}>{line.slice(3)}</h3>;
          if (line.startsWith('- [x] ')) return <div key={idx} style={{ color: '#52c41a', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><IconCheck size={12} /> {line.slice(6)}</div>;
          if (line.startsWith('- [ ] ')) return <div key={idx} style={{ color: 'var(--vg-text-muted, #A6A6AC)' }}>◻ {line.slice(6)}</div>;
          if (line.startsWith('- ')) return <div key={idx} style={{ color: 'var(--vg-text, #F5F5F7)' }}>• {line.slice(2)}</div>;
          if (line.startsWith('```')) return <pre key={idx} style={{ margin: '0.35rem 0' }}><code>{line}</code></pre>;
          return <p key={idx} style={{ margin: '0.2rem 0', color: 'var(--vg-text, #F5F5F7)' }}>{line}</p>;
        })}
      </div>
    );
  };

  if (!mounted || typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <>
      {/* Floating Circular Launcher Button (Bottom Right) */}
      {!isOpen && (
        <button
          type="button"
          className={styles.quickLauncherBtn}
          onClick={() => setIsOpen(true)}
          title="Quick Scratchpad (Ctrl+J / Cmd+J)"
          aria-label="Open Quick Scratchpad (Ctrl+J / Cmd+J)"
        >
          <img
            src="/img/scratchpad.png"
            alt="Scratchpad"
            className={styles.launcherIcon}
            width="26"
            height="26"
          />
        </button>
      )}

      {/* Floating Scratchpad Drawer */}
      {isOpen && (
        <div className={styles.scratchpadDrawer}>
          {/* Header */}
          <div className={styles.scratchpadHeader}>
            <div className={styles.scratchpadTabs}>
              {sheets.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`${styles.scratchpadTab} ${s.id === activeSheet.id ? styles.scratchpadTabActive : ''}`}
                  onClick={() => setActiveSheetId(s.id)}
                >
                  {s.title}
                </button>
              ))}
              <button
                type="button"
                className={styles.scratchpadTab}
                onClick={addSheet}
                title="Add New Sheet"
                style={{ padding: '0.2rem 0.45rem', display: 'flex', alignItems: 'center' }}
              >
                <IconPlus size={12} />
              </button>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <button
                type="button"
                className={styles.scratchpadBtn}
                onClick={() => setIsPreview(!isPreview)}
                title={isPreview ? 'Switch to Edit Mode' : 'Switch to Preview Mode'}
              >
                {isPreview ? <IconEdit size={13} /> : <IconEye size={13} />}
                <span>{isPreview ? 'Edit' : 'Preview'}</span>
              </button>
              <button
                type="button"
                className={styles.scratchpadBtn}
                onClick={() => setIsOpen(false)}
                title="Close (Ctrl+J)"
                style={{ color: 'var(--vg-accent, #FF4D4F)', padding: '0.3rem 0.45rem' }}
              >
                <IconClose size={14} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className={styles.scratchpadBody}>
            {!isPreview ? (
              <textarea
                className={styles.scratchpadTextarea}
                placeholder="Type your notes, code snippets, or markdown here..."
                value={activeSheet?.content || ''}
                onChange={(e) => updateContent(e.target.value)}
                autoFocus
              />
            ) : (
              <div className={styles.scratchpadPreview}>
                {renderMarkdown(activeSheet?.content || '')}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className={styles.scratchpadFooter}>
            <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
              <button type="button" className={styles.scratchpadBtn} onClick={handleCopy}>
                {copied ? <IconCheck size={13} style={{ color: '#52c41a' }} /> : <IconCopy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button type="button" className={styles.scratchpadBtn} onClick={handleExport}>
                <IconDownload size={13} />
                <span>Export</span>
              </button>
              {sheets.length > 1 && (
                <button
                  type="button"
                  className={styles.scratchpadBtn}
                  onClick={() => deleteSheet(activeSheet.id)}
                  style={{ color: 'var(--vg-accent, #FF4D4F)' }}
                  title="Delete Sheet"
                >
                  <IconTrash size={13} />
                </button>
              )}
            </div>

            <span style={{ fontSize: '0.72rem', color: 'var(--vg-text-muted, #A6A6AC)' }}>
              Auto-saved · <kbd style={{ fontFamily: 'var(--ifm-font-family-monospace, monospace)' }}>Ctrl+J</kbd>
            </span>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
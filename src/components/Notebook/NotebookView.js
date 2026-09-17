import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  BookOpen,
  Folder,
  Plus,
  Search,
  Star,
  Pin,
  Trash2,
  Edit2,
  Copy,
  Download,
  Check,
  Tag,
  X,
  FileText,
  Clock,
  ArrowUpDown,
  Printer,
  ChevronRight,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  FileDown,
  FileType,
  Globe,
  Share2,
} from 'lucide-react';
import NotebookToolbar from './NotebookToolbar';
import MarkdownRenderer from './MarkdownRenderer';
import {
  exportNoteAsPDF,
  exportNotebookAsPDF,
  exportNoteAsHTML,
} from './exportUtils';
import styles from './styles.module.css';

export default function NotebookView({
  notebooks,
  notes,
  activeNotebookId,
  activeNoteId,
  onSelectNotebook,
  onSelectNote,
  onCreateNotebook,
  onEditNotebook,
  onDeleteNotebook,
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
  onTogglePin,
  onToggleFavorite,
  isNotebooksOpen,
  onToggleNotebooks,
  isPagesOpen,
  onTogglePages,
}) {
  // Navigation, Filtering & Sorting
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'pinned' | 'favorites' | 'notebook' | 'tag'
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('updated'); // 'updated' | 'created' | 'title'
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');
  const [isTagInputOpen, setIsTagInputOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  // Editor View Mode & Fullscreen Mode
  const [viewMode, setViewMode] = useState('split'); // 'edit' | 'split' | 'preview'
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorPaneRef = useRef(null);

  // Synchronize fullscreen state with native browser events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const activeEl =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      
      const isCurrentlyFullscreen = Boolean(activeEl);
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Toggle editor pane fullscreen (opens only the editor/notes pane shown in photo)
  const handleToggleFullscreen = useCallback(() => {
    if (typeof document === 'undefined') return;

    const isCurrentlyFullscreen = Boolean(
      document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );

    const targetEl = editorPaneRef.current;

    if (!isCurrentlyFullscreen) {
      if (targetEl) {
        if (targetEl.requestFullscreen) {
          targetEl.requestFullscreen().catch(() => setIsFullscreen(true));
        } else if (targetEl.webkitRequestFullscreen) {
          targetEl.webkitRequestFullscreen();
        } else if (targetEl.mozRequestFullScreen) {
          targetEl.mozRequestFullScreen();
        } else if (targetEl.msRequestFullscreen) {
          targetEl.msRequestFullscreen();
        } else {
          setIsFullscreen(true);
        }
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => setIsFullscreen(false));
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  }, []);

  // Local note buffer for 100% fluid, zero-lag typing
  const [localTitle, setLocalTitle] = useState('');
  const [localContent, setLocalContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const localTitleRef = useRef('');
  const localContentRef = useRef('');
  const textareaRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const exportMenuRef = useRef(null);
  const currentNoteIdRef = useRef(activeNoteId);

  // Close export dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(e.target)) {
        setIsExportMenuOpen(false);
      }
    };
    if (isExportMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExportMenuOpen]);

  // Active Notebook Object
  const currentNotebook = useMemo(() => {
    return notebooks.find((nb) => nb.id === activeNotebookId) || notebooks[0] || null;
  }, [notebooks, activeNotebookId]);

  // Extract all unique tags across notes
  const allTags = useMemo(() => {
    const tagSet = new Set();
    notes.forEach((n) => {
      if (Array.isArray(n.tags)) {
        n.tags.forEach((t) => tagSet.add(t.trim()));
      }
    });
    return Array.from(tagSet).filter(Boolean);
  }, [notes]);

  // Filtered & Sorted Notes List
  const filteredNotes = useMemo(() => {
    return notes
      .filter((n) => {
        if (selectedFilter === 'notebook') {
          if (activeNotebookId && n.notebook_id !== activeNotebookId) return false;
        } else if (selectedFilter === 'pinned') {
          if (!n.is_pinned) return false;
        } else if (selectedFilter === 'favorites') {
          if (!n.is_favorite) return false;
        } else if (selectedFilter === 'tag') {
          if (!selectedTag || !Array.isArray(n.tags) || !n.tags.includes(selectedTag)) return false;
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = n.title?.toLowerCase().includes(q);
          const matchContent = n.content?.toLowerCase().includes(q);
          const matchTags = Array.isArray(n.tags) && n.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchContent && !matchTags) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (a.is_pinned && !b.is_pinned) return -1;
        if (!a.is_pinned && b.is_pinned) return 1;

        if (sortBy === 'title') {
          return (a.title || '').localeCompare(b.title || '');
        }
        if (sortBy === 'created') {
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        }
        return new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0);
      });
  }, [notes, selectedFilter, activeNotebookId, selectedTag, searchQuery, sortBy]);

  // Active Note Object
  const currentNote = useMemo(() => {
    if (activeNoteId) {
      const found = notes.find((n) => n.id === activeNoteId);
      if (found) return found;
    }
    return filteredNotes.length > 0 ? filteredNotes[0] : null;
  }, [notes, activeNoteId, filteredNotes]);

  // Flush any pending unsaved buffer immediately to onUpdateNote
  const flushLocalEdits = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
    if (currentNoteIdRef.current) {
      onUpdateNote(currentNoteIdRef.current, {
        title: localTitleRef.current,
        content: localContentRef.current,
      });
    }
    setIsSaving(false);
  }, [onUpdateNote]);

  // Synchronize local input state whenever the selected note ID changes
  useEffect(() => {
    if (currentNote) {
      if (currentNoteIdRef.current !== currentNote.id) {
        // Flush changes for previous note before switching
        if (currentNoteIdRef.current) {
          flushLocalEdits();
        }
        currentNoteIdRef.current = currentNote.id;
        localTitleRef.current = currentNote.title || '';
        localContentRef.current = currentNote.content || '';
        setLocalTitle(currentNote.title || '');
        setLocalContent(currentNote.content || '');
      }
    } else {
      if (currentNoteIdRef.current) {
        flushLocalEdits();
      }
      currentNoteIdRef.current = null;
      localTitleRef.current = '';
      localContentRef.current = '';
      setLocalTitle('');
      setLocalContent('');
    }
  }, [currentNote?.id, flushLocalEdits]);

  // Debounced auto-save handler (350ms)
  const triggerDebouncedSave = useCallback(
    (noteId, updates) => {
      setIsSaving(true);
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        onUpdateNote(noteId, updates);
        setIsSaving(false);
        saveTimeoutRef.current = null;
      }, 350);
    },
    [onUpdateNote]
  );

  // Guarantee persistence on page unload, tab switch, and component unmount
  useEffect(() => {
    const handleBeforeUnload = () => {
      flushLocalEdits();
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushLocalEdits();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      flushLocalEdits();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [flushLocalEdits]);

  // Title change
  const handleTitleChange = (val) => {
    localTitleRef.current = val;
    setLocalTitle(val);
    if (currentNote) {
      triggerDebouncedSave(currentNote.id, { title: val });
    }
  };

  // Content change
  const handleContentChange = (val) => {
    localContentRef.current = val;
    setLocalContent(val);
    if (currentNote) {
      triggerDebouncedSave(currentNote.id, { content: val });
    }
  };

  // Toolbar Formatting Applier
  const handleApplyFormat = (type) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = localContent.substring(start, end);
    let replacement = '';
    let newCursorPos = start;

    switch (type) {
      case 'bold':
        replacement = selectedText ? `**${selectedText}**` : '**bold text**';
        newCursorPos = start + (selectedText ? replacement.length : 2);
        break;
      case 'italic':
        replacement = selectedText ? `*${selectedText}*` : '*italic text*';
        newCursorPos = start + (selectedText ? replacement.length : 1);
        break;
      case 'strikethrough':
        replacement = selectedText ? `~~${selectedText}~~` : '~~strikethrough~~';
        newCursorPos = start + (selectedText ? replacement.length : 2);
        break;
      case 'inline-code':
        replacement = selectedText ? `\`${selectedText}\`` : '`code`';
        newCursorPos = start + (selectedText ? replacement.length : 1);
        break;
      case 'h1':
        replacement = `\n# ${selectedText || 'Heading 1'}\n`;
        newCursorPos = start + replacement.length;
        break;
      case 'h2':
        replacement = `\n## ${selectedText || 'Heading 2'}\n`;
        newCursorPos = start + replacement.length;
        break;
      case 'h3':
        replacement = `\n### ${selectedText || 'Heading 3'}\n`;
        newCursorPos = start + replacement.length;
        break;
      case 'task':
        replacement = `\n- [ ] ${selectedText || 'New task'}\n`;
        newCursorPos = start + replacement.length;
        break;
      case 'bullet':
        replacement = `\n- ${selectedText || 'List item'}\n`;
        newCursorPos = start + replacement.length;
        break;
      case 'number':
        replacement = `\n1. ${selectedText || 'List item'}\n`;
        newCursorPos = start + replacement.length;
        break;
      case 'quote':
        replacement = `\n> ${selectedText || 'Quote'}\n`;
        newCursorPos = start + replacement.length;
        break;
      case 'code-block':
        replacement = `\n\`\`\`javascript\n${selectedText || '// write code here'}\n\`\`\`\n`;
        newCursorPos = start + replacement.length;
        break;
      case 'table':
        replacement = `\n| Column 1 | Column 2 | Column 3 |\n| :--- | :--- | :--- |\n| Value 1 | Value 2 | Value 3 |\n`;
        newCursorPos = start + replacement.length;
        break;
      case 'hr':
        replacement = '\n---\n';
        newCursorPos = start + replacement.length;
        break;
      case 'link':
        replacement = selectedText ? `[${selectedText}](https://)` : '[Link Title](https://example.com)';
        newCursorPos = start + replacement.length;
        break;
      default:
        return;
    }

    const newContent = localContent.substring(0, start) + replacement + localContent.substring(end);
    handleContentChange(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 10);
  };

  // Keyboard Shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = localContent.substring(0, start) + '  ' + localContent.substring(end);
      handleContentChange(newContent);
      setTimeout(() => {
        textarea.setSelectionRange(start + 2, start + 2);
      }, 0);
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      handleApplyFormat('bold');
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault();
      handleApplyFormat('italic');
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      handleApplyFormat('link');
    }
  };

  // Toggle Task Checkbox in Markdown Preview
  const handleToggleTask = (lineIndex) => {
    const lines = localContent.split('\n');
    if (lines[lineIndex] !== undefined) {
      const line = lines[lineIndex];
      if (line.includes('- [ ]')) {
        lines[lineIndex] = line.replace('- [ ]', '- [x]');
      } else if (line.includes('- [x]') || line.includes('- [X]')) {
        lines[lineIndex] = line.replace(/- \[[xX]\]/, '- [ ]');
      }
      const newContent = lines.join('\n');
      handleContentChange(newContent);
    }
  };

  // Add Tag
  const handleAddTag = (e) => {
    e.preventDefault();
    if (!newTagInput.trim() || !currentNote) return;
    const cleanTag = newTagInput.trim().replace(/^#/, '');
    const currentTags = Array.isArray(currentNote.tags) ? currentNote.tags : [];
    if (!currentTags.includes(cleanTag)) {
      onUpdateNote(currentNote.id, { tags: [...currentTags, cleanTag] });
    }
    setNewTagInput('');
    setIsTagInputOpen(false);
  };

  // Remove Tag
  const handleRemoveTag = (tagToRemove) => {
    if (!currentNote) return;
    const currentTags = Array.isArray(currentNote.tags) ? currentNote.tags : [];
    onUpdateNote(currentNote.id, { tags: currentTags.filter((t) => t !== tagToRemove) });
  };

  // Copy note content
  const handleCopyNote = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(localContent || '');
      setCopiedStatus(true);
      setTimeout(() => setCopiedStatus(false), 2000);
    }
  };

  // Download note as Markdown file
  const handleDownloadNote = () => {
    const blob = new Blob([localContent || ''], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(localTitle || 'note').toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Notion-style Export Single Note as PDF
  const handleExportPDF = () => {
    if (!currentNote) return;
    const noteWithBuffer = {
      ...currentNote,
      title: localTitle,
      content: localContent,
    };
    exportNoteAsPDF(noteWithBuffer, currentNotebook?.title);
    setIsExportMenuOpen(false);
  };

  // Notion-style Export Full Notebook as PDF
  const handleExportNotebookPDF = () => {
    if (!currentNotebook) return;
    exportNotebookAsPDF(currentNotebook, notes);
    setIsExportMenuOpen(false);
  };

  // Export Note as HTML
  const handleExportHTML = () => {
    if (!currentNote) return;
    const noteWithBuffer = {
      ...currentNote,
      title: localTitle,
      content: localContent,
    };
    exportNoteAsHTML(noteWithBuffer, currentNotebook?.title);
    setIsExportMenuOpen(false);
  };

  // Metrics
  const wordCount = useMemo(() => {
    if (!localContent) return 0;
    const words = localContent.trim().split(/\s+/);
    return words.filter(Boolean).length;
  }, [localContent]);

  const charCount = (localContent || '').length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Format relative timestamp
  const getNoteRelativeTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 2) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`${styles.mainWorkspace} ${isFocusMode ? styles.focusModeWorkspace : ''}`}>
      {/* ================================================================
          Column 1: Notebook Stacks & Section Navigation (OneNote style)
          ================================================================ */}
      {isNotebooksOpen && !isFocusMode && (
        <aside className={styles.notebooksColumn}>
          {/* Quick Views */}
          <div className={styles.sidebarSectionHeader}>
            <span className={styles.sidebarSectionTitle}>Views</span>
          </div>

          <div className={styles.navList}>
            <button
              type="button"
              className={`${styles.navItem} ${selectedFilter === 'all' ? styles.navItemActive : ''}`}
              onClick={() => {
                setSelectedFilter('all');
                setSelectedTag(null);
              }}
            >
              <div className={styles.navItemLeft}>
                <BookOpen size={14} />
                <span className={styles.navItemTitle}>All Pages</span>
              </div>
              <span className={styles.countBadge}>{notes.length}</span>
            </button>

            <button
              type="button"
              className={`${styles.navItem} ${selectedFilter === 'pinned' ? styles.navItemActive : ''}`}
              onClick={() => {
                setSelectedFilter('pinned');
                setSelectedTag(null);
              }}
            >
              <div className={styles.navItemLeft}>
                <Pin size={14} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                <span className={styles.navItemTitle}>Pinned</span>
              </div>
              <span className={styles.countBadge}>{notes.filter((n) => n.is_pinned).length}</span>
            </button>

            <button
              type="button"
              className={`${styles.navItem} ${selectedFilter === 'favorites' ? styles.navItemActive : ''}`}
              onClick={() => {
                setSelectedFilter('favorites');
                setSelectedTag(null);
              }}
            >
              <div className={styles.navItemLeft}>
                <Star size={14} style={{ color: '#FAAD14' }} />
                <span className={styles.navItemTitle}>Starred</span>
              </div>
              <span className={styles.countBadge}>{notes.filter((n) => n.is_favorite).length}</span>
            </button>
          </div>

          {/* Notebook Stacks Section */}
          <div className={styles.sidebarSectionHeader}>
            <span className={styles.sidebarSectionTitle}>Notebooks</span>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={onCreateNotebook}
              title="Create Notebook"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className={styles.navList}>
            {notebooks.map((nb) => {
              const isActive = selectedFilter === 'notebook' && activeNotebookId === nb.id;
              const count = notes.filter((n) => n.notebook_id === nb.id).length;
              return (
                <div
                  key={nb.id}
                  className={`${styles.notebookItem} ${isActive ? styles.notebookItemActive : ''}`}
                  onClick={() => {
                    setSelectedFilter('notebook');
                    setSelectedTag(null);
                    onSelectNotebook(nb.id);
                  }}
                >
                  <div className={styles.navItemLeft}>
                    <Folder size={14} style={{ color: nb.color || 'var(--vg-accent, #FF4D4F)' }} />
                    <span className={styles.navItemTitle}>{nb.title}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className={styles.countBadge}>{count}</span>
                    <div className={styles.notebookActions}>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditNotebook(nb);
                        }}
                        title="Edit Notebook"
                      >
                        <Edit2 size={12} />
                      </button>
                      {notebooks.length > 1 && (
                        <button
                          type="button"
                          className={styles.iconBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteNotebook(nb);
                          }}
                          title="Delete Notebook"
                          style={{ color: 'var(--vg-accent, #FF4D4F)' }}
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tags Cloud */}
          {allTags.length > 0 && (
            <>
              <div className={styles.sidebarSectionHeader}>
                <span className={styles.sidebarSectionTitle}>Tags</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '0 0.85rem 1rem' }}>
                {allTags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={styles.tagPill}
                    style={{
                      cursor: 'pointer',
                      background:
                        selectedFilter === 'tag' && selectedTag === t
                          ? 'var(--vg-accent, #FF4D4F)'
                          : 'var(--vg-surface, #2E2E31)',
                      color:
                        selectedFilter === 'tag' && selectedTag === t
                          ? '#FFFFFF'
                          : 'var(--vg-text-muted, #A6A6AC)',
                      borderColor:
                        selectedFilter === 'tag' && selectedTag === t
                          ? 'var(--vg-accent, #FF4D4F)'
                          : 'var(--vg-border, rgba(255, 255, 255, 0.08))',
                    }}
                    onClick={() => {
                      setSelectedFilter('tag');
                      setSelectedTag(t);
                    }}
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </>
          )}
        </aside>
      )}

      {/* ================================================================
          Column 2: Page List / Note Index (OneNote Page Browser)
          ================================================================ */}
      {isPagesOpen && !isFocusMode && (
        <aside className={styles.pagesColumn}>
          {/* Header & New Page Button */}
          <div className={styles.pagesHeader}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0 }}>
                <span className={styles.pagesHeaderTitle}>
                  {selectedFilter === 'all' && 'All Pages'}
                  {selectedFilter === 'pinned' && 'Pinned'}
                  {selectedFilter === 'favorites' && 'Starred'}
                  {selectedFilter === 'tag' && `#${selectedTag}`}
                  {selectedFilter === 'notebook' && (currentNotebook?.title || 'Pages')}
                </span>
                <span className={styles.countBadge}>{filteredNotes.length}</span>
              </div>

              {/* Collapse All Pages Button */}
              <button
                type="button"
                className={styles.iconBtn}
                onClick={onTogglePages}
                title="Hide All Pages sidebar"
              >
                <PanelLeftClose size={14} />
              </button>
            </div>

            {/* Search Box */}
            <div className={styles.searchBox}>
              <Search size={14} style={{ color: 'var(--vg-text-subtle, #787880)', flexShrink: 0 }} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search notes & #tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.iconBtn}
                  style={{ width: '18px', height: '18px' }}
                  onClick={() => setSearchQuery('')}
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Sort & Action Sub-bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--vg-text-subtle)' }}>
                <ArrowUpDown size={12} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.sortSelect}
                >
                  <option value="updated">Recently Edited</option>
                  <option value="created">Date Created</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>

              <button
                type="button"
                className={styles.addPageBtn}
                onClick={onCreateNote}
                title="Create New Page in this Notebook"
              >
                <Plus size={13} />
                <span>Page</span>
              </button>
            </div>
          </div>

          {/* Scrollable List of Notes */}
          <div className={styles.pagesScrollArea}>
            {filteredNotes.length === 0 ? (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--vg-text-subtle)', fontSize: '0.78rem' }}>
                No notes found.
                <button
                  type="button"
                  onClick={onCreateNote}
                  style={{
                    display: 'block',
                    margin: '0.5rem auto 0',
                    background: 'none',
                    border: 'none',
                    color: 'var(--vg-accent)',
                    cursor: 'pointer',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                  }}
                >
                  + Add new page
                </button>
              </div>
            ) : (
              filteredNotes.map((note) => {
                const isActive = currentNote?.id === note.id;
                const noteTitle = isActive ? localTitle || 'Untitled Note' : note.title || 'Untitled Note';
                const noteSnippet = isActive
                  ? (localContent || '').replace(/\n+/g, ' ').trim()
                  : (note.content || '').replace(/\n+/g, ' ').trim();
                const timeLabel = getNoteRelativeTime(note.updated_at || note.created_at);

                return (
                  <article
                    key={note.id}
                    className={`${styles.noteCard} ${isActive ? styles.noteCardActive : ''}`}
                    onClick={() => onSelectNote(note.id)}
                  >
                    <div className={styles.noteCardTop}>
                      <h3 className={styles.noteCardTitle}>{noteTitle}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
                        {note.is_pinned && (
                          <Pin size={11} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                        )}
                        {note.is_favorite && (
                          <Star size={11} style={{ color: '#FAAD14' }} />
                        )}
                      </div>
                    </div>

                    {noteSnippet && <p className={styles.noteCardSnippet}>{noteSnippet}</p>}

                    <div className={styles.noteCardMeta}>
                      <span>{timeLabel}</span>
                      {Array.isArray(note.tags) && note.tags.length > 0 && (
                        <span className={styles.tagPill}>#{note.tags[0]}</span>
                      )}
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </aside>
      )}

      {/* ================================================================
          Column 3: Rich OneNote Editor & Live Markdown Canvas
          ================================================================ */}
      <main ref={editorPaneRef} className={`${styles.editorPane} ${isFullscreen ? styles.editorPaneFullscreen : ''}`}>
        {currentNote ? (
          <>
            {/* Top Document Header Bar */}
            <div className={styles.editorHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1, minWidth: 0 }}>
                {/* Reveal Pages Button if Column 2 is hidden */}
                {!isPagesOpen && (
                  <button
                    type="button"
                    className={styles.expandPagesBtn}
                    onClick={onTogglePages}
                    title="Show All Pages index sidebar"
                  >
                    <PanelLeftOpen size={14} />
                    <span>Pages</span>
                  </button>
                )}

                <input
                  type="text"
                  className={styles.titleInput}
                  value={localTitle}
                  placeholder="Untitled Note"
                  onChange={(e) => handleTitleChange(e.target.value)}
                  onBlur={flushLocalEdits}
                />
              </div>

              <div className={styles.editorActions}>
                {/* Pin Toggle */}
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => onTogglePin(currentNote.id)}
                  title={currentNote.is_pinned ? 'Unpin note' : 'Pin note to top'}
                  style={{ color: currentNote.is_pinned ? 'var(--vg-accent, #FF4D4F)' : 'var(--vg-text-muted)' }}
                >
                  <Pin size={15} />
                </button>

                {/* Star Favorite Toggle */}
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => onToggleFavorite(currentNote.id)}
                  title={currentNote.is_favorite ? 'Remove star' : 'Star note'}
                  style={{ color: currentNote.is_favorite ? '#FAAD14' : 'var(--vg-text-muted)' }}
                >
                  <Star size={15} />
                </button>

                {/* Direct Notion PDF Export Button */}
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={handleExportPDF}
                  title="Export Page as PDF (Notion-style)"
                >
                  <Printer size={15} />
                </button>

                {/* Export Options Menu Dropdown */}
                <div className={styles.exportMenuWrapper} ref={exportMenuRef}>
                  <button
                    type="button"
                    className={`${styles.iconBtn} ${isExportMenuOpen ? styles.iconBtnActive : ''}`}
                    onClick={() => setIsExportMenuOpen((prev) => !prev)}
                    title="Export Options (PDF, Markdown, HTML)"
                  >
                    <Download size={15} />
                  </button>

                  {isExportMenuOpen && (
                    <div className={styles.exportDropdown}>
                      <button
                        type="button"
                        className={styles.exportMenuItem}
                        onClick={handleExportPDF}
                      >
                        <div className={styles.exportMenuItemLeft}>
                          <FileType size={14} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                          <span>Export Page as PDF</span>
                        </div>
                        <span className={styles.exportFormatBadge}>.pdf</span>
                      </button>

                      <button
                        type="button"
                        className={styles.exportMenuItem}
                        onClick={handleExportNotebookPDF}
                      >
                        <div className={styles.exportMenuItemLeft}>
                          <Folder size={14} style={{ color: '#FAAD14' }} />
                          <span>Export Full Notebook</span>
                        </div>
                        <span className={styles.exportFormatBadge}>.pdf</span>
                      </button>

                      <div className={styles.exportMenuDivider} />

                      <button
                        type="button"
                        className={styles.exportMenuItem}
                        onClick={() => {
                          handleDownloadNote();
                          setIsExportMenuOpen(false);
                        }}
                      >
                        <div className={styles.exportMenuItemLeft}>
                          <FileDown size={14} style={{ color: '#22C55E' }} />
                          <span>Download Markdown</span>
                        </div>
                        <span className={styles.exportFormatBadge}>.md</span>
                      </button>

                      <button
                        type="button"
                        className={styles.exportMenuItem}
                        onClick={handleExportHTML}
                      >
                        <div className={styles.exportMenuItemLeft}>
                          <Globe size={14} style={{ color: '#3B82F6' }} />
                          <span>Download HTML</span>
                        </div>
                        <span className={styles.exportFormatBadge}>.html</span>
                      </button>

                      <div className={styles.exportMenuDivider} />

                      <button
                        type="button"
                        className={styles.exportMenuItem}
                        onClick={() => {
                          handleCopyNote();
                          setIsExportMenuOpen(false);
                        }}
                      >
                        <div className={styles.exportMenuItemLeft}>
                          {copiedStatus ? (
                            <Check size={14} style={{ color: '#22C55E' }} />
                          ) : (
                            <Copy size={14} />
                          )}
                          <span>{copiedStatus ? 'Copied!' : 'Copy Markdown Text'}</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Delete Note */}
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => onDeleteNote(currentNote)}
                  title="Delete note"
                  style={{ color: 'var(--vg-accent, #FF4D4F)' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* Sub-bar: Notebook Selector & Tag Management */}
            <div className={styles.subBar}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--vg-text-subtle)', fontSize: '0.75rem' }}>Notebook:</span>
                <select
                  className={styles.notebookSelect}
                  value={currentNote.notebook_id || ''}
                  onChange={(e) => onUpdateNote(currentNote.id, { notebook_id: e.target.value })}
                >
                  {notebooks.map((nb) => (
                    <option key={nb.id} value={nb.id}>
                      {nb.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tag Chips */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                {Array.isArray(currentNote.tags) &&
                  currentNote.tags.map((t) => (
                    <span key={t} className={styles.tagPill} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      #{t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          color: 'var(--vg-text-subtle)',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        title="Remove tag"
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}

                {isTagInputOpen ? (
                  <form onSubmit={handleAddTag} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="tag name..."
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      autoFocus
                      onBlur={() => setIsTagInputOpen(false)}
                      style={{
                        background: 'var(--vg-bg-elevated, #262628)',
                        border: '1px solid var(--vg-accent, #FF4D4F)',
                        borderRadius: 'var(--vg-radius-sm, 6px)',
                        color: 'var(--vg-text, #F5F5F7)',
                        fontSize: '0.72rem',
                        padding: '0.1rem 0.35rem',
                        outline: 'none',
                        width: '85px',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}
                    />
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsTagInputOpen(true)}
                    style={{
                      background: 'transparent',
                      border: '1px dashed var(--vg-border, rgba(255, 255, 255, 0.08))',
                      borderRadius: 'var(--vg-radius-sm, 6px)',
                      padding: '0.1rem 0.4rem',
                      fontSize: '0.7rem',
                      color: 'var(--vg-text-subtle, #787880)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                    }}
                  >
                    <Tag size={10} />
                    <span>+ Add Tag</span>
                  </button>
                )}
              </div>
            </div>

            {/* OneNote-Style Formatting Ribbon */}
            <NotebookToolbar
              viewMode={viewMode}
              setViewMode={setViewMode}
              isFullscreen={isFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
              onApplyFormat={handleApplyFormat}
            />

            {/* Editor Body: Split / Edit / Preview Modes */}
            <div className={styles.editorWorkspaceArea}>
              {/* Raw Markdown Editor Pane */}
              {(viewMode === 'edit' || viewMode === 'split') && (
                <div
                  className={`${styles.editorPaneSide} ${viewMode === 'split' ? styles.splitEditor : styles.fullEditor}`}
                >
                  <textarea
                    ref={textareaRef}
                    className={styles.markdownTextarea}
                    value={localContent}
                    placeholder="Write your notes, code snippets, and architecture diagrams here..."
                    onChange={(e) => handleContentChange(e.target.value)}
                    onBlur={flushLocalEdits}
                    onKeyDown={handleKeyDown}
                    spellCheck="false"
                  />
                </div>
              )}

              {/* Rendered Markdown Preview Pane */}
              {(viewMode === 'preview' || viewMode === 'split') && (
                <div
                  className={`${styles.previewPaneSide} ${viewMode === 'split' ? styles.splitPreview : styles.fullPreview}`}
                >
                  <MarkdownRenderer
                    content={localContent}
                    onToggleTask={handleToggleTask}
                  />
                </div>
              )}
            </div>

            {/* Status Footer Bar */}
            <footer className={styles.editorFooter}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <span>{wordCount} words</span>
                <span>·</span>
                <span>{charCount} chars</span>
                <span>·</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  <Clock size={11} /> {readingTimeMinutes} min read
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ color: isSaving ? 'var(--vg-text-muted)' : '#22C55E', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  <Check size={12} /> {isSaving ? 'Saving...' : 'Auto-saved'}
                </span>
                {isFocusMode && (
                  <button
                    type="button"
                    className={styles.exitFocusBtn}
                    onClick={() => setIsFocusMode(false)}
                  >
                    Exit Focus
                  </button>
                )}
              </div>
            </footer>
          </>
        ) : (
          <div className={styles.emptyState}>
            <FileText size={44} style={{ color: 'var(--vg-accent, #FF4D4F)', opacity: 0.6 }} />
            <h2 className={styles.emptyTitle}>No Page Selected</h2>
            <p className={styles.emptySubtitle}>
              Select a note from the pages index or create a new page to begin writing.
            </p>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={onCreateNote}
              style={{ marginTop: '0.5rem' }}
            >
              <Plus size={15} />
              <span>Create New Page</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

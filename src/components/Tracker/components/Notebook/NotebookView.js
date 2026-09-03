import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTracker } from '../../context/TrackerContext';
import NotebookModal from './NotebookModal';
import {
  IconNotebook,
  IconPlus,
  IconSearch,
  IconStar,
  IconPin,
  IconTrash,
  IconEdit,
  IconCopy,
  IconDownload,
  IconCheck,
  IconFolder,
  IconBold,
  IconItalic,
  IconList,
  IconQuote,
  IconCode,
  IconTable,
  IconEye,
  IconHeading1,
  IconHeading2,
  IconHeading3,
} from '../Common/Icons';
import styles from './notebook.module.css';
import globalStyles from '../../styles/tracker.module.css';

export default function NotebookView() {
  const {
    notebooks,
    notes,
    activeNotebookId,
    setActiveNotebookId,
    activeNoteId,
    setActiveNoteId,
    createNotebook,
    updateNotebook,
    deleteNotebook,
    createNote,
    updateNote,
    deleteNote,
    toggleNotePin,
    toggleNoteFavorite,
    openConfirmModal,
  } = useTracker();

  // Navigation & Filter State
  const [selectedFilter, setSelectedFilter] = useState('notebook'); // 'all' | 'pinned' | 'favorites' | 'notebook' | 'tag'
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editorMode, setEditorMode] = useState('split'); // 'edit' | 'split' | 'preview'
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [notebookModalOpen, setNotebookModalOpen] = useState(false);
  const [editingNotebookData, setEditingNotebookData] = useState(null);
  const [newTagInput, setNewTagInput] = useState('');
  const [isTagInputOpen, setIsTagInputOpen] = useState(false);

  const textareaRef = useRef(null);

  // Default selection initialization
  useEffect(() => {
    if (notebooks.length > 0 && !activeNotebookId) {
      setActiveNotebookId(notebooks[0].id);
    }
  }, [notebooks, activeNotebookId, setActiveNotebookId]);

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

  // Active Notebook Object
  const currentNotebook = useMemo(() => {
    return notebooks.find((nb) => nb.id === activeNotebookId) || notebooks[0] || null;
  }, [notebooks, activeNotebookId]);

  // Filtered Notes list
  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      // 1. Sidebar Category/Filter
      if (selectedFilter === 'notebook') {
        if (activeNotebookId && n.notebook_id !== activeNotebookId) return false;
      } else if (selectedFilter === 'pinned') {
        if (!n.is_pinned) return false;
      } else if (selectedFilter === 'favorites') {
        if (!n.is_favorite) return false;
      } else if (selectedFilter === 'tag') {
        if (!selectedTag || !Array.isArray(n.tags) || !n.tags.includes(selectedTag)) return false;
      }

      // 2. Search Query (Title, Content, Tags)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = n.title?.toLowerCase().includes(q);
        const matchContent = n.content?.toLowerCase().includes(q);
        const matchTags = Array.isArray(n.tags) && n.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchContent && !matchTags) return false;
      }

      return true;
    }).sort((a, b) => {
      // Pinned first, then updated_at descending
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0);
    });
  }, [notes, selectedFilter, activeNotebookId, selectedTag, searchQuery]);

  // Active Note Object
  const currentNote = useMemo(() => {
    if (activeNoteId) {
      const found = notes.find((n) => n.id === activeNoteId);
      if (found) return found;
    }
    return filteredNotes.length > 0 ? filteredNotes[0] : null;
  }, [notes, activeNoteId, filteredNotes]);

  // Auto-select first note if activeNoteId is not valid
  useEffect(() => {
    if (filteredNotes.length > 0 && (!activeNoteId || !notes.some((n) => n.id === activeNoteId))) {
      setActiveNoteId(filteredNotes[0].id);
    }
  }, [filteredNotes, activeNoteId, setActiveNoteId, notes]);

  // Create New Note handler
  const handleCreateNote = async () => {
    const parentId = activeNotebookId || (notebooks[0] ? notebooks[0].id : null);
    if (!parentId) {
      setNotebookModalOpen(true);
      return;
    }

    const newNote = await createNote({
      notebook_id: parentId,
      title: 'Untitled Note',
      content: '# Untitled Note\n\nStart writing your thoughts, design diagrams, or code architecture...\n',
      tags: selectedTag ? [selectedTag] : [],
    });

    if (newNote && newNote.id) {
      setActiveNoteId(newNote.id);
      if (selectedFilter !== 'notebook') {
        setSelectedFilter('notebook');
      }
    }
  };

  // Note Content change with debounced save
  const handleContentChange = (val) => {
    if (!currentNote) return;
    updateNote(currentNote.id, { content: val });
  };

  // Note Title change
  const handleTitleChange = (val) => {
    if (!currentNote) return;
    updateNote(currentNote.id, { title: val });
  };

  // Add Tag to active note
  const handleAddTag = (e) => {
    e.preventDefault();
    if (!newTagInput.trim() || !currentNote) return;
    const cleanTag = newTagInput.trim().replace(/^#/, '');
    const currentTags = Array.isArray(currentNote.tags) ? currentNote.tags : [];
    if (!currentTags.includes(cleanTag)) {
      updateNote(currentNote.id, { tags: [...currentTags, cleanTag] });
    }
    setNewTagInput('');
    setIsTagInputOpen(false);
  };

  // Remove Tag from active note
  const handleRemoveTag = (tagToRemove) => {
    if (!currentNote) return;
    const currentTags = Array.isArray(currentNote.tags) ? currentNote.tags : [];
    updateNote(currentNote.id, { tags: currentTags.filter((t) => t !== tagToRemove) });
  };

  // Delete current Note with confirmation
  const handleDeleteNote = (note) => {
    if (!note) return;
    openConfirmModal(
      'Delete Note?',
      `Are you sure you want to permanently delete "${note.title || 'Untitled Note'}"?`,
      () => deleteNote(note.id)
    );
  };

  // Delete Notebook with confirmation
  const handleDeleteNotebook = (nb, e) => {
    e.stopPropagation();
    openConfirmModal(
      'Delete Notebook?',
      `Are you sure you want to delete "${nb.title}"? All notes inside this notebook will also be removed.`,
      () => deleteNotebook(nb.id)
    );
  };

  // Copy note content
  const handleCopyNote = () => {
    if (!currentNote) return;
    navigator.clipboard.writeText(currentNote.content || '');
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  // Download note as .md file
  const handleDownloadNote = () => {
    if (!currentNote) return;
    const blob = new Blob([currentNote.content || ''], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(currentNote.title || 'note').toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Markdown Toolbar Action Inserter
  const insertMarkdown = (syntax, wrap = false) => {
    const textarea = textareaRef.current;
    if (!textarea || !currentNote) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = currentNote.content || '';

    let newText = '';
    let newCursorPos = start;

    if (wrap) {
      const selected = text.substring(start, end) || 'text';
      newText = text.substring(0, start) + syntax + selected + syntax + text.substring(end);
      newCursorPos = start + syntax.length + selected.length + syntax.length;
    } else {
      newText = text.substring(0, start) + syntax + text.substring(end);
      newCursorPos = start + syntax.length;
    }

    updateNote(currentNote.id, { content: newText });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Word & Character counter
  const wordCount = useMemo(() => {
    if (!currentNote?.content) return 0;
    const words = currentNote.content.trim().split(/\s+/);
    return words.filter(Boolean).length;
  }, [currentNote?.content]);

  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Custom rich markdown renderer
  const renderRichMarkdown = (content) => {
    if (!content || !content.trim()) {
      return (
        <div style={{ color: 'var(--vg-text-subtle)', fontStyle: 'italic', padding: '1rem 0' }}>
          Empty note. Start typing in the editor or use the toolbar above.
        </div>
      );
    }

    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeLines = [];
    const elements = [];

    lines.forEach((line, idx) => {
      // Code Block Start / End
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLines = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <pre key={`code-${idx}`}>
              <code>{codeLines.join('\n')}</code>
            </pre>
          );
          codeLines = [];
        }
        return;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      // Headings
      if (line.startsWith('# ')) {
        elements.push(<h1 key={idx}>{line.slice(2)}</h1>);
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(<h2 key={idx}>{line.slice(3)}</h2>);
        return;
      }
      if (line.startsWith('### ')) {
        elements.push(<h3 key={idx}>{line.slice(4)}</h3>);
        return;
      }
      if (line.startsWith('#### ')) {
        elements.push(<h4 key={idx} style={{ fontSize: '1rem', fontWeight: 600, margin: '0.8rem 0 0.3rem', color: 'var(--vg-text)' }}>{line.slice(5)}</h4>);
        return;
      }

      // Horizontal Rule
      if (line.trim() === '---' || line.trim() === '***') {
        elements.push(<hr key={idx} style={{ border: 'none', borderTop: '1px solid var(--vg-border)', margin: '1.25rem 0' }} />);
        return;
      }

      // Checklists
      if (line.startsWith('- [x] ') || line.startsWith('- [X] ')) {
        elements.push(
          <div key={idx} className={styles.taskItemRow}>
            <span style={{ color: 'var(--vg-accent)', display: 'inline-flex' }}>
              <IconCheck size={14} />
            </span>
            <span style={{ textDecoration: 'line-through', opacity: 0.65 }}>{line.slice(6)}</span>
          </div>
        );
        return;
      }
      if (line.startsWith('- [ ] ')) {
        elements.push(
          <div key={idx} className={styles.taskItemRow}>
            <span style={{ color: 'var(--vg-text-muted)', display: 'inline-flex' }}>◻</span>
            <span>{line.slice(6)}</span>
          </div>
        );
        return;
      }

      // Blockquotes / Callouts
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={idx}>
            <p>{line.slice(2)}</p>
          </blockquote>
        );
        return;
      }

      // Bullet List
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <ul key={idx} style={{ margin: '0.25rem 0' }}>
            <li>{line.slice(2)}</li>
          </ul>
        );
        return;
      }

      // Standard Paragraph
      if (line.trim() === '') {
        elements.push(<div key={idx} style={{ height: '0.65rem' }} />);
      } else {
        elements.push(<p key={idx}>{line}</p>);
      }
    });

    if (inCodeBlock && codeLines.length > 0) {
      elements.push(
        <pre key="unclosed-code">
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
    }

    return <div className={styles.previewContent}>{elements}</div>;
  };

  return (
    <div className={styles.notebookWrapper}>
      {/* Header View Bar */}
      <div className={globalStyles.viewHeader}>
        <div>
          <h1 className={globalStyles.viewTitle}>Notebook</h1>
          <p className={globalStyles.viewSubtitle}>
            Personal markdown knowledge vault · Distributed architecture notes, ideas, and system design docs.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            type="button"
            className={globalStyles.btnSecondary}
            onClick={() => {
              setEditingNotebookData(null);
              setNotebookModalOpen(true);
            }}
          >
            <IconFolder size={15} />
            <span>New Notebook</span>
          </button>

          <button
            type="button"
            className={globalStyles.btnPrimary}
            onClick={handleCreateNote}
          >
            <IconPlus size={16} />
            <span>New Note</span>
          </button>
        </div>
      </div>

      {/* 3-Pane Notebook Layout */}
      <div className={styles.notebookLayout}>
        {/* ================================================================
            Pane 1: Notebooks & Navigation Rail
            ================================================================ */}
        <aside className={styles.notebookSidebar}>
          {/* Quick Views */}
          <div className={styles.sidebarSectionHeader}>
            <span className={styles.sidebarSectionTitle}>Views</span>
          </div>

          <div className={styles.sidebarNavList}>
            <button
              type="button"
              className={`${styles.sidebarNavItem} ${selectedFilter === 'all' ? styles.sidebarNavItemActive : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              <div className={styles.sidebarItemLeft}>
                <IconNotebook size={15} />
                <span className={styles.sidebarItemTitle}>All Notes</span>
              </div>
              <span className={styles.sidebarItemBadge}>{notes.length}</span>
            </button>

            <button
              type="button"
              className={`${styles.sidebarNavItem} ${selectedFilter === 'pinned' ? styles.sidebarNavItemActive : ''}`}
              onClick={() => setSelectedFilter('pinned')}
            >
              <div className={styles.sidebarItemLeft}>
                <IconPin size={14} />
                <span className={styles.sidebarItemTitle}>Pinned</span>
              </div>
              <span className={styles.sidebarItemBadge}>
                {notes.filter((n) => n.is_pinned).length}
              </span>
            </button>

            <button
              type="button"
              className={`${styles.sidebarNavItem} ${selectedFilter === 'favorites' ? styles.sidebarNavItemActive : ''}`}
              onClick={() => setSelectedFilter('favorites')}
            >
              <div className={styles.sidebarItemLeft}>
                <IconStar size={14} />
                <span className={styles.sidebarItemTitle}>Starred</span>
              </div>
              <span className={styles.sidebarItemBadge}>
                {notes.filter((n) => n.is_favorite).length}
              </span>
            </button>
          </div>

          {/* Notebooks List */}
          <div className={styles.sidebarSectionHeader}>
            <span className={styles.sidebarSectionTitle}>Notebooks</span>
            <button
              type="button"
              className={globalStyles.iconBtn}
              onClick={() => {
                setEditingNotebookData(null);
                setNotebookModalOpen(true);
              }}
              title="Create Notebook"
            >
              <IconPlus size={14} />
            </button>
          </div>

          <div className={styles.notebookList}>
            {notebooks.map((nb) => {
              const isActive = selectedFilter === 'notebook' && activeNotebookId === nb.id;
              const count = notes.filter((n) => n.notebook_id === nb.id).length;
              return (
                <div
                  key={nb.id}
                  className={`${styles.notebookCard} ${isActive ? styles.notebookCardActive : ''}`}
                  onClick={() => {
                    setSelectedFilter('notebook');
                    setActiveNotebookId(nb.id);
                  }}
                >
                  <div className={styles.sidebarItemLeft}>
                    <span className={styles.notebookIcon}>
                      <IconFolder size={15} />
                    </span>
                    <span className={styles.notebookTitle}>{nb.title}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className={styles.sidebarItemBadge}>{count}</span>
                    <div className={styles.notebookActions}>
                      <button
                        type="button"
                        className={globalStyles.iconBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingNotebookData(nb);
                          setNotebookModalOpen(true);
                        }}
                        title="Edit Notebook"
                      >
                        <IconEdit size={12} />
                      </button>
                      {notebooks.length > 1 && (
                        <button
                          type="button"
                          className={globalStyles.iconBtn}
                          onClick={(e) => handleDeleteNotebook(nb, e)}
                          title="Delete Notebook"
                          style={{ color: 'var(--vg-accent)' }}
                        >
                          <IconTrash size={12} />
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
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '0 0.75rem 1rem' }}>
                {allTags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={styles.tagPill}
                    style={{
                      cursor: 'pointer',
                      background: selectedFilter === 'tag' && selectedTag === t ? 'var(--vg-accent)' : 'var(--vg-surface)',
                      color: selectedFilter === 'tag' && selectedTag === t ? '#fff' : 'var(--vg-text-muted)',
                      border: '1px solid ' + (selectedFilter === 'tag' && selectedTag === t ? 'var(--vg-accent)' : 'var(--vg-border)'),
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

        {/* ================================================================
            Pane 2: Notes List
            ================================================================ */}
        <section className={styles.notesListPane}>
          <div className={styles.notesListHeader}>
            <div className={styles.notesListTopRow}>
              <h2 className={styles.notesListTitle}>
                {selectedFilter === 'all' && 'All Notes'}
                {selectedFilter === 'pinned' && 'Pinned Notes'}
                {selectedFilter === 'favorites' && 'Starred Notes'}
                {selectedFilter === 'tag' && `#${selectedTag}`}
                {selectedFilter === 'notebook' && (currentNotebook?.title || 'Notebook')}
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--vg-text-subtle)' }}>
                {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
              </span>
            </div>

            <div className={styles.searchBox}>
              <IconSearch size={14} style={{ color: 'var(--vg-text-subtle)' }} />
              <input
                type="text"
                placeholder="Search notes & tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.notesScrollArea}>
            {filteredNotes.length === 0 ? (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--vg-text-subtle)', fontSize: '0.82rem' }}>
                No notes found.
                <button
                  type="button"
                  className={globalStyles.linkBtn}
                  onClick={handleCreateNote}
                  style={{ display: 'block', margin: '0.5rem auto 0' }}
                >
                  Create your first note →
                </button>
              </div>
            ) : (
              filteredNotes.map((note) => {
                const isActive = currentNote?.id === note.id;
                const snippet = (note.content || '')
                  .replace(/^[#\s\-*>`]+/gm, '')
                  .replace(/\n+/g, ' ')
                  .trim();

                const d = new Date(note.updated_at || note.created_at || Date.now());
                const dateLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                return (
                  <article
                    key={note.id}
                    className={`${styles.noteItem} ${isActive ? styles.noteItemActive : ''}`}
                    onClick={() => setActiveNoteId(note.id)}
                  >
                    <div className={styles.noteItemTop}>
                      <h3 className={styles.noteItemTitle}>
                        {note.title || 'Untitled Note'}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                        {note.is_pinned && (
                          <span style={{ color: 'var(--vg-accent)' }} title="Pinned">
                            <IconPin size={12} filled />
                          </span>
                        )}
                        {note.is_favorite && (
                          <span style={{ color: '#FAAD14' }} title="Starred">
                            <IconStar size={12} filled />
                          </span>
                        )}
                      </div>
                    </div>

                    <p className={styles.noteItemSnippet}>
                      {snippet || 'Empty note...'}
                    </p>

                    <div className={styles.noteItemMeta}>
                      <span>{dateLabel}</span>
                      {Array.isArray(note.tags) && note.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: '3px' }}>
                          {note.tags.slice(0, 2).map((t) => (
                            <span key={t} className={styles.tagPill}>
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        {/* ================================================================
            Pane 3: Full Note Editor & Live Preview Canvas
            ================================================================ */}
        <main className={styles.editorPane}>
          {currentNote ? (
            <>
              {/* Editor Header */}
              <div className={styles.editorHeader}>
                <div className={styles.editorHeaderLeft}>
                  <input
                    type="text"
                    className={styles.titleInput}
                    value={currentNote.title || ''}
                    placeholder="Untitled Note"
                    onChange={(e) => handleTitleChange(e.target.value)}
                  />
                </div>

                <div className={styles.editorHeaderRight}>
                  {/* Pin Toggle */}
                  <button
                    type="button"
                    className={globalStyles.iconBtn}
                    onClick={() => toggleNotePin(currentNote.id)}
                    title={currentNote.is_pinned ? 'Unpin Note' : 'Pin Note to Top'}
                    style={{ color: currentNote.is_pinned ? 'var(--vg-accent)' : 'var(--vg-text-muted)' }}
                  >
                    <IconPin size={15} filled={currentNote.is_pinned} />
                  </button>

                  {/* Favorite Toggle */}
                  <button
                    type="button"
                    className={globalStyles.iconBtn}
                    onClick={() => toggleNoteFavorite(currentNote.id)}
                    title={currentNote.is_favorite ? 'Remove Star' : 'Star Note'}
                    style={{ color: currentNote.is_favorite ? '#FAAD14' : 'var(--vg-text-muted)' }}
                  >
                    <IconStar size={15} filled={currentNote.is_favorite} />
                  </button>

                  {/* Copy Button */}
                  <button
                    type="button"
                    className={globalStyles.iconBtn}
                    onClick={handleCopyNote}
                    title="Copy Markdown to Clipboard"
                  >
                    {copiedStatus ? <IconCheck size={14} style={{ color: '#52C41A' }} /> : <IconCopy size={15} />}
                  </button>

                  {/* Download .md */}
                  <button
                    type="button"
                    className={globalStyles.iconBtn}
                    onClick={handleDownloadNote}
                    title="Download as .md file"
                  >
                    <IconDownload size={15} />
                  </button>

                  {/* Delete Note */}
                  <button
                    type="button"
                    className={globalStyles.iconBtn}
                    onClick={() => handleDeleteNote(currentNote)}
                    title="Delete Note"
                    style={{ color: 'var(--vg-accent)' }}
                  >
                    <IconTrash size={15} />
                  </button>

                  {/* Mode Switcher */}
                  <div style={{ display: 'flex', gap: '2px', background: 'var(--vg-surface)', padding: '2px', borderRadius: 'var(--vg-radius-sm)', marginLeft: '0.25rem' }}>
                    <button
                      type="button"
                      className={`${styles.modeSwitchBtn} ${editorMode === 'edit' ? styles.modeSwitchBtnActive : ''}`}
                      onClick={() => setEditorMode('edit')}
                    >
                      <IconEdit size={13} />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      className={`${styles.modeSwitchBtn} ${editorMode === 'split' ? styles.modeSwitchBtnActive : ''}`}
                      onClick={() => setEditorMode('split')}
                    >
                      <span>Split</span>
                    </button>

                    <button
                      type="button"
                      className={`${styles.modeSwitchBtn} ${editorMode === 'preview' ? styles.modeSwitchBtnActive : ''}`}
                      onClick={() => setEditorMode('preview')}
                    >
                      <IconEye size={13} />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags & Notebook Meta Strip */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.35rem 1.25rem', borderBottom: '1px solid var(--vg-border)', background: 'var(--vg-surface)', fontSize: '0.76rem', gap: '0.75rem', flexWrap: 'wrap' }}>
                {/* Notebook picker */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--vg-text-subtle)' }}>Notebook:</span>
                  <select
                    className={globalStyles.select}
                    value={currentNote.notebook_id || ''}
                    onChange={(e) => updateNote(currentNote.id, { notebook_id: e.target.value })}
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.78rem', width: 'auto' }}
                  >
                    {notebooks.map((nb) => (
                      <option key={nb.id} value={nb.id}>
                        {nb.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                  {Array.isArray(currentNote.tags) &&
                    currentNote.tags.map((t) => (
                      <span key={t} className={styles.tagPill} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        #{t}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          style={{ background: 'none', border: 'none', padding: 0, color: 'var(--vg-text-subtle)', cursor: 'pointer', fontSize: '0.75rem' }}
                          title="Remove tag"
                        >
                          ×
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
                          background: 'var(--vg-bg-elevated)',
                          border: '1px solid var(--vg-accent)',
                          borderRadius: 'var(--vg-radius-sm)',
                          color: 'var(--vg-text)',
                          fontSize: '0.72rem',
                          padding: '0.1rem 0.35rem',
                          outline: 'none',
                          width: '80px',
                        }}
                      />
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsTagInputOpen(true)}
                      style={{
                        background: 'transparent',
                        border: '1px dashed var(--vg-border)',
                        borderRadius: 'var(--vg-radius-sm)',
                        padding: '0.1rem 0.4rem',
                        fontSize: '0.7rem',
                        color: 'var(--vg-text-subtle)',
                        cursor: 'pointer',
                      }}
                    >
                      + Add Tag
                    </button>
                  )}
                </div>
              </div>

              {/* Markdown Toolbar (Visible in Edit and Split modes) */}
              {editorMode !== 'preview' && (
                <div className={styles.markdownToolbar}>
                  <button type="button" className={styles.toolBtn} onClick={() => insertMarkdown('**', true)} title="Bold (**text**)">
                    <IconBold size={13} />
                  </button>
                  <button type="button" className={styles.toolBtn} onClick={() => insertMarkdown('*', true)} title="Italic (*text*)">
                    <IconItalic size={13} />
                  </button>

                  <div className={styles.toolDivider} />

                  <button type="button" className={styles.toolBtn} onClick={() => insertMarkdown('# ')} title="Heading 1 (# )">
                    <IconHeading1 size={13} />
                  </button>
                  <button type="button" className={styles.toolBtn} onClick={() => insertMarkdown('## ')} title="Heading 2 (## )">
                    <IconHeading2 size={13} />
                  </button>
                  <button type="button" className={styles.toolBtn} onClick={() => insertMarkdown('### ')} title="Heading 3 (### )">
                    <IconHeading3 size={13} />
                  </button>

                  <div className={styles.toolDivider} />

                  <button type="button" className={styles.toolBtn} onClick={() => insertMarkdown('- [ ] ')} title="Task Checklist (- [ ] )">
                    <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>☑</span>
                  </button>
                  <button type="button" className={styles.toolBtn} onClick={() => insertMarkdown('- ')} title="Bullet List (- )">
                    <IconList size={13} />
                  </button>
                  <button type="button" className={styles.toolBtn} onClick={() => insertMarkdown('> ')} title="Quote Block (> )">
                    <IconQuote size={13} />
                  </button>

                  <div className={styles.toolDivider} />

                  <button type="button" className={styles.toolBtn} onClick={() => insertMarkdown('`', true)} title="Inline Code (`code`)">
                    <span style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>&lt;/&gt;</span>
                  </button>
                  <button type="button" className={styles.toolBtn} onClick={() => insertMarkdown('\n```javascript\n// code here\n```\n')} title="Code Block (```)">
                    <IconCode size={13} />
                  </button>
                  <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => insertMarkdown('\n| Column 1 | Column 2 |\n| :--- | :--- |\n| Item 1 | Item 2 |\n')}
                    title="Insert Table"
                  >
                    <IconTable size={13} />
                  </button>
                  <button type="button" className={styles.toolBtn} onClick={() => insertMarkdown('\n---\n')} title="Horizontal Rule (---)">
                    <span style={{ fontSize: '0.78rem' }}>―</span>
                  </button>
                </div>
              )}

              {/* Editor Workspace (Textarea + Preview) */}
              <div className={styles.editorWorkspace}>
                {editorMode !== 'preview' && (
                  <textarea
                    ref={textareaRef}
                    className={styles.markdownTextarea}
                    value={currentNote.content || ''}
                    placeholder="Write markdown here... Use # for headings, - [ ] for tasks, ``` for code blocks."
                    onChange={(e) => handleContentChange(e.target.value)}
                  />
                )}

                {editorMode === 'split' && <div className={styles.splitDivider} />}

                {editorMode !== 'edit' && (
                  <div className={styles.markdownPreview}>
                    {renderRichMarkdown(currentNote.content)}
                  </div>
                )}
              </div>

              {/* Editor Footer */}
              <div className={styles.editorFooter}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span>{wordCount} words</span>
                  <span>·</span>
                  <span>{readingTimeMinutes} min read</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#52C41A', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <IconCheck size={12} /> Auto-saved
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.emptyEditor}>
              <IconNotebook size={36} style={{ color: 'var(--vg-accent)', opacity: 0.6 }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--vg-text)', margin: 0 }}>
                No Note Selected
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--vg-text-muted)', margin: 0, maxWidth: '320px' }}>
                Select a note from the list on the left, or create a brand new note to begin drafting.
              </p>
              <button
                type="button"
                className={globalStyles.btnPrimary}
                onClick={handleCreateNote}
                style={{ marginTop: '0.5rem' }}
              >
                <IconPlus size={15} />
                <span>Create New Note</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Notebook Creation & Editing Modal */}
      <NotebookModal
        isOpen={notebookModalOpen}
        onClose={() => {
          setNotebookModalOpen(false);
          setEditingNotebookData(null);
        }}
        initialData={editingNotebookData}
      />
    </div>
  );
}

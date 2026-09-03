import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
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
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [notebookModalOpen, setNotebookModalOpen] = useState(false);
  const [editingNotebookData, setEditingNotebookData] = useState(null);
  const [newTagInput, setNewTagInput] = useState('');
  const [isTagInputOpen, setIsTagInputOpen] = useState(false);

  // Local note buffer for 100% fluid, zero-lag typing
  const [localTitle, setLocalTitle] = useState('');
  const [localContent, setLocalContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const textareaRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const currentNoteIdRef = useRef(activeNoteId);

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

  // Synchronize local input state whenever the selected note ID changes
  useEffect(() => {
    if (currentNote) {
      if (currentNoteIdRef.current !== currentNote.id) {
        // Switching notes: flush any pending save for the previous note
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
          saveTimeoutRef.current = null;
        }
        currentNoteIdRef.current = currentNote.id;
        setLocalTitle(currentNote.title || '');
        setLocalContent(currentNote.content || '');
      }
    } else {
      currentNoteIdRef.current = null;
      setLocalTitle('');
      setLocalContent('');
    }
  }, [currentNote?.id]);

  // Debounced auto-save function (400ms)
  const triggerDebouncedSave = useCallback((noteId, updates) => {
    setIsSaving(true);
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      updateNote(noteId, updates);
      setIsSaving(false);
      saveTimeoutRef.current = null;
    }, 400);
  }, [updateNote]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

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
      content: '',
      tags: selectedTag ? [selectedTag] : [],
    });

    if (newNote && newNote.id) {
      setActiveNoteId(newNote.id);
      currentNoteIdRef.current = newNote.id;
      setLocalTitle('Untitled Note');
      setLocalContent('');
      if (selectedFilter !== 'notebook') {
        setSelectedFilter('notebook');
      }
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 50);
    }
  };

  // Note Content change handler (instant local state + debounced background sync)
  const handleContentChange = (val) => {
    setLocalContent(val);
    if (currentNote) {
      triggerDebouncedSave(currentNote.id, { content: val });
    }
  };

  // Note Title change handler
  const handleTitleChange = (val) => {
    setLocalTitle(val);
    if (currentNote) {
      triggerDebouncedSave(currentNote.id, { title: val });
    }
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
      `Are you sure you want to permanently delete "${localTitle || note.title || 'Untitled Note'}"?`,
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
    navigator.clipboard.writeText(localContent || '');
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  // Download note as text file
  const handleDownloadNote = () => {
    const blob = new Blob([localContent || ''], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(localTitle || 'note').toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Word & Character counter
  const wordCount = useMemo(() => {
    if (!localContent) return 0;
    const words = localContent.trim().split(/\s+/);
    return words.filter(Boolean).length;
  }, [localContent]);

  const charCount = (localContent || '').length;

  return (
    <div className={styles.notebookWrapper}>
      {/* Header View Bar */}
      <div className={styles.notebookHeader}>
        <div>
          <h1 className={globalStyles.viewTitle} style={{ fontSize: '1.5rem', marginBottom: '0.15rem' }}>Notebook</h1>
          <p className={globalStyles.viewSubtitle} style={{ fontSize: '0.8rem', margin: 0 }}>
            Personal notepad &amp; notes · Quick thoughts, snippets, and technical ideas.
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

      {/* 2-Pane Unified Notepad Layout */}
      <div className={styles.notebookLayout}>
        {/* ================================================================
            Pane 1: Unified Notebooks, Views & Notes Navigation Sidebar
            ================================================================ */}
        <aside className={styles.notebookSidebar}>
          {/* Search Box */}
          <div style={{ padding: '0.75rem 0.65rem 0.5rem' }}>
            <div className={styles.searchBox}>
              <IconSearch size={14} style={{ color: 'var(--vg-text-subtle)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search notes & tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

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

          {/* Notebooks Section */}
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

          {/* Notes List inside Sidebar */}
          <div className={styles.sidebarSectionHeader}>
            <span className={styles.sidebarSectionTitle}>
              {selectedFilter === 'all' && 'All Notes'}
              {selectedFilter === 'pinned' && 'Pinned Notes'}
              {selectedFilter === 'favorites' && 'Starred Notes'}
              {selectedFilter === 'tag' && `#${selectedTag}`}
              {selectedFilter === 'notebook' && (currentNotebook?.title || 'Notes')}
            </span>
            <button
              type="button"
              className={globalStyles.iconBtn}
              onClick={handleCreateNote}
              title="New Note"
            >
              <IconPlus size={14} />
            </button>
          </div>

          <div className={styles.notesScrollArea}>
            {filteredNotes.length === 0 ? (
              <div style={{ padding: '1rem 0.5rem', textAlign: 'center', color: 'var(--vg-text-subtle)', fontSize: '0.78rem' }}>
                No notes found.
                <button
                  type="button"
                  className={globalStyles.linkBtn}
                  onClick={handleCreateNote}
                  style={{ display: 'block', margin: '0.35rem auto 0', fontSize: '0.78rem' }}
                >
                  + Add new note
                </button>
              </div>
            ) : (
              filteredNotes.map((note) => {
                const isActive = currentNote?.id === note.id;
                const noteTitle = isActive ? (localTitle || 'Untitled Note') : (note.title || 'Untitled Note');
                const noteSnippet = isActive ? (localContent || '').replace(/\n+/g, ' ').trim() : (note.content || '').replace(/\n+/g, ' ').trim();
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
                        {noteTitle}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                        {note.is_pinned && (
                          <span style={{ color: 'var(--vg-accent)' }} title="Pinned">
                            <IconPin size={11} filled />
                          </span>
                        )}
                        {note.is_favorite && (
                          <span style={{ color: '#FAAD14' }} title="Starred">
                            <IconStar size={11} filled />
                          </span>
                        )}
                      </div>
                    </div>

                    {noteSnippet && (
                      <p className={styles.noteItemSnippet}>
                        {noteSnippet}
                      </p>
                    )}

                    <div className={styles.noteItemMeta}>
                      <span>{dateLabel}</span>
                      {Array.isArray(note.tags) && note.tags.length > 0 && (
                        <span className={styles.tagPill}>
                          #{note.tags[0]}
                        </span>
                      )}
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* Tags Cloud */}
          {allTags.length > 0 && (
            <>
              <div className={styles.sidebarSectionHeader}>
                <span className={styles.sidebarSectionTitle}>Tags</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '0 0.65rem 1rem' }}>
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
            Pane 2: Full-Width Clean Notepad Canvas
            ================================================================ */}
        <main className={styles.editorPane}>
          {currentNote ? (
            <>
              {/* Notepad Header */}
              <div className={styles.editorHeader}>
                <div className={styles.editorHeaderLeft}>
                  <input
                    type="text"
                    className={styles.titleInput}
                    value={localTitle}
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
                    title="Copy Note Text"
                  >
                    {copiedStatus ? <IconCheck size={14} style={{ color: '#52C41A' }} /> : <IconCopy size={15} />}
                  </button>

                  {/* Download Note as Text */}
                  <button
                    type="button"
                    className={globalStyles.iconBtn}
                    onClick={handleDownloadNote}
                    title="Download Note (.txt)"
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
                </div>
              </div>

              {/* Tags & Notebook Selector Sub-bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 1.25rem', borderBottom: '1px solid var(--vg-border)', background: 'var(--vg-surface)', fontSize: '0.76rem', gap: '0.75rem', flexWrap: 'wrap' }}>
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

              {/* Clean Notepad Textarea Body */}
              <div className={styles.notepadWorkspace}>
                <textarea
                  ref={textareaRef}
                  className={styles.notepadTextarea}
                  value={localContent}
                  placeholder="Type your notes here..."
                  onChange={(e) => handleContentChange(e.target.value)}
                  spellCheck="false"
                />
              </div>

              {/* Notepad Status Footer */}
              <div className={styles.editorFooter}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span>{wordCount} words</span>
                  <span>·</span>
                  <span>{charCount} characters</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: isSaving ? 'var(--vg-text-muted)' : '#52C41A', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <IconCheck size={12} /> {isSaving ? 'Saving...' : 'Auto-saved'}
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
                Select a note from the sidebar or click New Note to begin writing.
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

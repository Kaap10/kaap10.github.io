import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@site/src/components/Tracker/context/AuthContext';
import AuthView from '@site/src/components/Tracker/components/Auth/AuthView';
import ConfigModal from '@site/src/components/Tracker/components/Auth/ConfigModal';
import { useNotebookStorage } from './useNotebookStorage';
import NotebookHeader from './NotebookHeader';
import NotebookView from './NotebookView';
import NotebookModal from './NotebookModal';
import styles from './styles.module.css';

function NotebookContent() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [configModalOpen, setConfigModalOpen] = useState(false);

  const {
    notebooks,
    notes,
    activeNotebookId,
    activeNoteId,
    isLoaded,
    syncStatus,
    selectNotebook,
    selectNote,
    createNotebook,
    updateNotebook,
    deleteNotebook,
    createNote,
    updateNote,
    deleteNote,
    toggleNotePin,
    toggleNoteFavorite,
    exportAllNotesJSON,
    importNotesJSON,
  } = useNotebookStorage(user);

  const [notebookModalOpen, setNotebookModalOpen] = useState(false);
  const [editingNotebookData, setEditingNotebookData] = useState(null);

  // Dual Sidebar States: Column 1 (Notebooks Stacks) and Column 2 (All Pages Index)
  const [isNotebooksOpen, setIsNotebooksOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kaap10_nb_sidebar_notebooks');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  const [isPagesOpen, setIsPagesOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kaap10_nb_sidebar_pages');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  const handleToggleNotebooks = () => {
    setIsNotebooksOpen((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('kaap10_nb_sidebar_notebooks', String(next));
      }
      return next;
    });
  };

  const handleTogglePages = () => {
    setIsPagesOpen((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('kaap10_nb_sidebar_pages', String(next));
      }
      return next;
    });
  };

  // Keyboard shortcut listener: Ctrl+[ (Notebooks), Ctrl+] (Pages)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      const isInput = tag === 'input' || tag === 'textarea' || document.activeElement?.isContentEditable;
      if (!isInput) {
        if (e.key === '[' || (e.ctrlKey && e.key === '\\')) {
          e.preventDefault();
          handleToggleNotebooks();
        } else if (e.key === ']' || (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e'))) {
          e.preventDefault();
          handleTogglePages();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Modal handlers
  const handleOpenCreateModal = () => {
    setEditingNotebookData(null);
    setNotebookModalOpen(true);
  };

  const handleOpenEditModal = (nb) => {
    setEditingNotebookData(nb);
    setNotebookModalOpen(true);
  };

  const handleSaveNotebook = (data) => {
    if (editingNotebookData) {
      updateNotebook(editingNotebookData.id, data);
    } else {
      createNotebook(data);
    }
  };

  const handleDeleteNotebookWithConfirm = (nb) => {
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm(
        `Are you sure you want to delete the notebook "${nb.title}"? All notes inside it will also be deleted.`
      );
      if (confirmed) {
        deleteNotebook(nb.id);
      }
    }
  };

  const handleDeleteNoteWithConfirm = (note) => {
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm(
        `Are you sure you want to delete "${note.title || 'Untitled Note'}"?`
      );
      if (confirmed) {
        deleteNote(note.id);
      }
    }
  };

  // If not logged in and auth finished loading, show login screen
  if (!user && !authLoading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--vg-bg, #121216)', padding: '2rem 1rem' }}>
        <AuthView />
      </div>
    );
  }

  if (!isLoaded || authLoading) {
    return (
      <div className={styles.notebookApp} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--vg-text-muted)', fontSize: '0.88rem' }}>
          Loading Developer Notebook...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.notebookApp}>
      {/* Top Floating App Header */}
      <NotebookHeader
        syncStatus={syncStatus}
        currentUser={user}
        onOpenSettings={() => setConfigModalOpen(true)}
        onSignOut={signOut}
        onNewNotebook={handleOpenCreateModal}
        onNewNote={() => createNote({ title: 'Untitled Note', content: '' })}
        onExportBackup={exportAllNotesJSON}
        onImportBackup={importNotesJSON}
        isNotebooksOpen={isNotebooksOpen}
        onToggleNotebooks={handleToggleNotebooks}
        isPagesOpen={isPagesOpen}
        onTogglePages={handleTogglePages}
      />

      {/* Main Multi-Column Workspace */}
      <NotebookView
        notebooks={notebooks}
        notes={notes}
        activeNotebookId={activeNotebookId}
        activeNoteId={activeNoteId}
        onSelectNotebook={selectNotebook}
        onSelectNote={selectNote}
        onCreateNotebook={handleOpenCreateModal}
        onEditNotebook={handleOpenEditModal}
        onDeleteNotebook={handleDeleteNotebookWithConfirm}
        onCreateNote={() => createNote({ title: 'Untitled Note', content: '' })}
        onUpdateNote={updateNote}
        onDeleteNote={handleDeleteNoteWithConfirm}
        onTogglePin={toggleNotePin}
        onToggleFavorite={toggleNoteFavorite}
        isNotebooksOpen={isNotebooksOpen}
        onToggleNotebooks={handleToggleNotebooks}
        isPagesOpen={isPagesOpen}
        onTogglePages={handleTogglePages}
      />

      {/* Notebook Creation & Editing Modal */}
      <NotebookModal
        isOpen={notebookModalOpen}
        onClose={() => {
          setNotebookModalOpen(false);
          setEditingNotebookData(null);
        }}
        onSave={handleSaveNotebook}
        initialData={editingNotebookData}
      />

      {/* Supabase Settings / Config Modal */}
      <ConfigModal
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
      />
    </div>
  );
}

export default function NotebookApp() {
  return (
    <AuthProvider>
      <NotebookContent />
    </AuthProvider>
  );
}

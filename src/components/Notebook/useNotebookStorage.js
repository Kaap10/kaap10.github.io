import { useState, useEffect, useCallback, useRef } from 'react';
import { getSupabase } from '@site/src/components/Tracker/services/supabaseClient';

const STORAGE_KEYS = {
  NOTEBOOKS: 'kaap10_dev_notebooks',
  NOTES: 'kaap10_dev_notes',
  ACTIVE_NB: 'kaap10_active_nb_id',
  ACTIVE_NOTE: 'kaap10_active_note_id',
};

const DEFAULT_NOTEBOOK_ID = '00000000-0000-4000-8000-000000000001';
const DEFAULT_NOTE_ID = '00000000-0000-4000-8000-000000000002';

const DEFAULT_NOTEBOOK = {
  id: DEFAULT_NOTEBOOK_ID,
  title: 'Engineering & Code',
  description: 'Technical notes, code snippets, and architecture designs.',
  color: '#FF4D4F',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const DEFAULT_NOTE = {
  id: DEFAULT_NOTE_ID,
  notebook_id: DEFAULT_NOTEBOOK_ID,
  title: 'Welcome to Developer Notebook',
  content: `# Developer Notebook\n\nWelcome to your private, distraction-free markdown notepad and code snippet manager.\n\n### Key Features\n- **Zero-Lag Typing**: Instant local state with background cloud auto-save.\n- **Multi-Notebook Stacks**: Organize notes into engineering topics.\n- **Tags & Search**: Fast full-text indexing with \`#tags\`.\n- **Export & Backup**: Export individual notes as \`.md\` or backup your full notebook library as JSON.\n\nHappy coding!`,
  tags: ['getting-started', 'guide'],
  is_pinned: true,
  is_favorite: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const isValidUUID = (str) => {
  if (typeof str !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
};

const generateUUID = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function useNotebookStorage(passedUser = null) {
  const [notebooks, setNotebooks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeNotebookId, setActiveNotebookId] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState('synced'); // 'synced' | 'saving' | 'offline'
  const [currentUser, setCurrentUser] = useState(passedUser || null);

  const activeUserRef = useRef(passedUser || null);
  const pendingSaveTimeouts = useRef({});

  // Synchronize when passedUser changes
  useEffect(() => {
    if (passedUser) {
      setCurrentUser(passedUser);
      activeUserRef.current = passedUser;
      fetchCloudData(passedUser.id);
    } else {
      setCurrentUser(null);
      activeUserRef.current = null;
    }
  }, [passedUser?.id]);

  // 1. Initialize Auth and Load Local Cache First
  useEffect(() => {
    let isMounted = true;

    // Load local storage cache immediately
    if (typeof window !== 'undefined') {
      try {
        const localNbs = localStorage.getItem(STORAGE_KEYS.NOTEBOOKS);
        const localNotes = localStorage.getItem(STORAGE_KEYS.NOTES);
        const savedNbId = localStorage.getItem(STORAGE_KEYS.ACTIVE_NB);
        const savedNoteId = localStorage.getItem(STORAGE_KEYS.ACTIVE_NOTE);

        let initialNbs = localNbs ? JSON.parse(localNbs) : [DEFAULT_NOTEBOOK];
        let initialNotes = localNotes ? JSON.parse(localNotes) : [DEFAULT_NOTE];

        // Sanitize legacy non-UUID ids
        initialNbs = initialNbs.map((nb) => ({
          ...nb,
          id: isValidUUID(nb.id) ? nb.id : generateUUID(),
        }));
        const validNbIds = new Set(initialNbs.map((nb) => nb.id));
        const defaultNbId = initialNbs[0]?.id || DEFAULT_NOTEBOOK_ID;
        initialNotes = initialNotes.map((n) => ({
          ...n,
          id: isValidUUID(n.id) ? n.id : generateUUID(),
          notebook_id: isValidUUID(n.notebook_id) && validNbIds.has(n.notebook_id) ? n.notebook_id : defaultNbId,
        }));

        if (isMounted) {
          setNotebooks(initialNbs);
          setNotes(initialNotes);
          setActiveNotebookId(savedNbId && validNbIds.has(savedNbId) ? savedNbId : initialNbs[0]?.id || null);
          setActiveNoteId(savedNoteId || initialNotes[0]?.id || null);
          setIsLoaded(true);
        }
      } catch (err) {
        console.warn('Failed to parse local notebook storage:', err);
        if (isMounted) {
          setNotebooks([DEFAULT_NOTEBOOK]);
          setNotes([DEFAULT_NOTE]);
          setActiveNotebookId(DEFAULT_NOTEBOOK.id);
          setActiveNoteId(DEFAULT_NOTE.id);
          setIsLoaded(true);
        }
      }
    }

    // Check active Supabase session
    const client = getSupabase();
    if (client) {
      client.auth.getSession().then(({ data: { session } }) => {
        if (!isMounted) return;
        const user = session?.user || null;
        setCurrentUser(user);
        activeUserRef.current = user;
        if (user) {
          fetchCloudData(user.id);
        }
      });

      const { data: authListener } = client.auth.onAuthStateChange((_event, session) => {
        if (!isMounted) return;
        const user = session?.user || null;
        setCurrentUser(user);
        activeUserRef.current = user;
        if (user) {
          fetchCloudData(user.id);
        }
      });

      return () => {
        isMounted = false;
        authListener?.subscription?.unsubscribe();
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Save to LocalStorage whenever notebooks or notes change
  const persistToLocal = useCallback((newNbs, newNotes) => {
    if (typeof window === 'undefined') return;
    try {
      if (newNbs) localStorage.setItem(STORAGE_KEYS.NOTEBOOKS, JSON.stringify(newNbs));
      if (newNotes) localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(newNotes));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, []);

  // Set active notebook and persist selection
  const selectNotebook = useCallback((id) => {
    setActiveNotebookId(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_NB, id || '');
    }
  }, []);

  // Set active note and persist selection
  const selectNote = useCallback((id) => {
    setActiveNoteId(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_NOTE, id || '');
    }
  }, []);

  // Fetch from Supabase Cloud and merge with Local
  const fetchCloudData = async (userId) => {
    const client = getSupabase();
    if (!client || !userId) return;
    setSyncStatus('saving');

    try {
      const [nbsRes, notesRes] = await Promise.all([
        client.from('notebooks').select('*').order('created_at', { ascending: true }),
        client.from('notes').select('*').order('updated_at', { ascending: false }),
      ]);

      if (nbsRes.error) throw nbsRes.error;
      if (notesRes.error) throw notesRes.error;

      let cloudNbs = nbsRes.data || [];
      let cloudNotes = notesRes.data || [];

      // If user has zero cloud notebooks, push default/local
      if (cloudNbs.length === 0) {
        const defaultNbWithUser = { ...DEFAULT_NOTEBOOK, id: generateUUID(), user_id: userId };
        const defaultNoteWithUser = {
          ...DEFAULT_NOTE,
          id: generateUUID(),
          notebook_id: defaultNbWithUser.id,
          user_id: userId,
        };

        await Promise.all([
          client.from('notebooks').insert([defaultNbWithUser]),
          client.from('notes').insert([defaultNoteWithUser]),
        ]);

        cloudNbs = [defaultNbWithUser];
        cloudNotes = [defaultNoteWithUser];
      }

      setNotebooks(cloudNbs);
      setNotes(cloudNotes);
      persistToLocal(cloudNbs, cloudNotes);

      if (!activeNotebookId && cloudNbs.length > 0) {
        selectNotebook(cloudNbs[0].id);
      }
      if (!activeNoteId && cloudNotes.length > 0) {
        selectNote(cloudNotes[0].id);
      }

      setSyncStatus('synced');
    } catch (err) {
      console.warn('Cloud sync failed, continuing offline:', err);
      setSyncStatus('offline');
    }
  };

  // Create Notebook
  const createNotebook = useCallback(
    async ({ title, description, color }) => {
      const newNb = {
        id: generateUUID(),
        title: title?.trim() || 'Untitled Notebook',
        description: description?.trim() || '',
        color: color || '#FF4D4F',
        created_at: new Date().toISOString(),
        user_id: activeUserRef.current?.id || null,
      };

      setNotebooks((prev) => {
        const updated = [...prev, newNb];
        persistToLocal(updated, null);
        return updated;
      });

      selectNotebook(newNb.id);

      // Cloud sync
      const client = getSupabase();
      if (client && activeUserRef.current) {
        setSyncStatus('saving');
        try {
          await client.from('notebooks').insert([newNb]);
          setSyncStatus('synced');
        } catch (e) {
          console.warn('Cloud insert notebook failed:', e);
          setSyncStatus('offline');
        }
      }

      return newNb;
    },
    [persistToLocal, selectNotebook]
  );

  // Update Notebook
  const updateNotebook = useCallback(
    async (id, updates) => {
      setNotebooks((prev) => {
        const updated = prev.map((nb) => (nb.id === id ? { ...nb, ...updates, updated_at: new Date().toISOString() } : nb));
        persistToLocal(updated, null);
        return updated;
      });

      const client = getSupabase();
      if (client && activeUserRef.current) {
        try {
          await client.from('notebooks').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id);
        } catch (e) {
          console.warn('Cloud update notebook failed:', e);
        }
      }
    },
    [persistToLocal]
  );

  // Delete Notebook & its Notes
  const deleteNotebook = useCallback(
    async (id) => {
      setNotebooks((prev) => {
        const updatedNbs = prev.filter((nb) => nb.id !== id);
        persistToLocal(updatedNbs, null);
        return updatedNbs;
      });

      setNotes((prev) => {
        const updatedNotes = prev.filter((n) => n.notebook_id !== id);
        persistToLocal(null, updatedNotes);
        return updatedNotes;
      });

      if (activeNotebookId === id) {
        const remaining = notebooks.filter((nb) => nb.id !== id);
        selectNotebook(remaining.length > 0 ? remaining[0].id : null);
      }

      const client = getSupabase();
      if (client && activeUserRef.current) {
        try {
          await client.from('notebooks').delete().eq('id', id);
        } catch (e) {
          console.warn('Cloud delete notebook failed:', e);
        }
      }
    },
    [activeNotebookId, notebooks, persistToLocal, selectNotebook]
  );

  // Create Note
  const createNote = useCallback(
    async ({ notebook_id, title, content, tags }) => {
      const targetNbId = notebook_id || activeNotebookId || notebooks[0]?.id;
      const newNote = {
        id: generateUUID(),
        notebook_id: targetNbId,
        title: title?.trim() || 'Untitled Note',
        content: content || '',
        tags: Array.isArray(tags) ? tags : [],
        is_pinned: false,
        is_favorite: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: activeUserRef.current?.id || null,
      };

      setNotes((prev) => {
        const updated = [newNote, ...prev];
        persistToLocal(null, updated);
        return updated;
      });

      selectNote(newNote.id);

      const client = getSupabase();
      if (client && activeUserRef.current) {
        setSyncStatus('saving');
        try {
          await client.from('notes').insert([newNote]);
          setSyncStatus('synced');
        } catch (e) {
          console.warn('Cloud insert note failed:', e);
          setSyncStatus('offline');
        }
      }

      return newNote;
    },
    [activeNotebookId, notebooks, persistToLocal, selectNote]
  );

  // Update Note (with debounced cloud sync)
  const updateNote = useCallback(
    (id, updates) => {
      const timestamp = new Date().toISOString();
      const payload = { ...updates, updated_at: timestamp };

      // Instant optimistic local update
      setNotes((prev) => {
        const updated = prev.map((n) => (n.id === id ? { ...n, ...payload } : n));
        persistToLocal(null, updated);
        return updated;
      });

      // Debounced Cloud Sync
      const client = getSupabase();
      if (client && activeUserRef.current) {
        setSyncStatus('saving');
        if (pendingSaveTimeouts.current[id]) {
          clearTimeout(pendingSaveTimeouts.current[id]);
        }
        pendingSaveTimeouts.current[id] = setTimeout(async () => {
          try {
            await client.from('notes').update(payload).eq('id', id);
            setSyncStatus('synced');
          } catch (e) {
            console.warn('Cloud update note failed:', e);
            setSyncStatus('offline');
          }
          delete pendingSaveTimeouts.current[id];
        }, 400);
      }
    },
    [persistToLocal]
  );

  // Delete Note
  const deleteNote = useCallback(
    async (id) => {
      setNotes((prev) => {
        const updated = prev.filter((n) => n.id !== id);
        persistToLocal(null, updated);
        return updated;
      });

      if (activeNoteId === id) {
        const remaining = notes.filter((n) => n.id !== id);
        selectNote(remaining.length > 0 ? remaining[0].id : null);
      }

      const client = getSupabase();
      if (client && activeUserRef.current) {
        try {
          await client.from('notes').delete().eq('id', id);
        } catch (e) {
          console.warn('Cloud delete note failed:', e);
        }
      }
    },
    [activeNoteId, notes, persistToLocal, selectNote]
  );

  // Toggle Note Pin
  const toggleNotePin = useCallback(
    (id) => {
      const target = notes.find((n) => n.id === id);
      if (!target) return;
      updateNote(id, { is_pinned: !target.is_pinned });
    },
    [notes, updateNote]
  );

  // Toggle Note Favorite
  const toggleNoteFavorite = useCallback(
    (id) => {
      const target = notes.find((n) => n.id === id);
      if (!target) return;
      updateNote(id, { is_favorite: !target.is_favorite });
    },
    [notes, updateNote]
  );

  // Export all notebooks & notes as JSON backup
  const exportAllNotesJSON = useCallback(() => {
    const backupData = {
      version: 1,
      exported_at: new Date().toISOString(),
      notebooks,
      notes,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `developer-notebook-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [notebooks, notes]);

  // Import from JSON backup
  const importNotesJSON = useCallback(
    async (jsonContent) => {
      try {
        const parsed = JSON.parse(jsonContent);
        if (!parsed.notebooks || !parsed.notes) {
          return { success: false, message: 'Invalid backup file format.' };
        }

        const mergedNbs = [...notebooks];
        parsed.notebooks.forEach((nb) => {
          if (!mergedNbs.some((existing) => existing.id === nb.id)) {
            mergedNbs.push(nb);
          }
        });

        const mergedNotes = [...notes];
        parsed.notes.forEach((n) => {
          if (!mergedNotes.some((existing) => existing.id === n.id)) {
            mergedNotes.push(n);
          }
        });

        setNotebooks(mergedNbs);
        setNotes(mergedNotes);
        persistToLocal(mergedNbs, mergedNotes);

        const client = getSupabase();
        if (client && activeUserRef.current) {
          setSyncStatus('saving');
          try {
            await Promise.all([
              client.from('notebooks').upsert(mergedNbs),
              client.from('notes').upsert(mergedNotes),
            ]);
            setSyncStatus('synced');
          } catch (e) {
            console.warn('Cloud sync on import failed:', e);
            setSyncStatus('offline');
          }
        }

        return { success: true };
      } catch (err) {
        return { success: false, message: err.message };
      }
    },
    [notebooks, notes, persistToLocal]
  );

  return {
    notebooks,
    notes,
    activeNotebookId,
    activeNoteId,
    isLoaded,
    syncStatus,
    currentUser,
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
  };
}


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
  const notesRef = useRef([]);
  const notebooksRef = useRef([]);

  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  useEffect(() => {
    notebooksRef.current = notebooks;
  }, [notebooks]);

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

      const cloudNbs = nbsRes.data || [];
      const cloudNotes = notesRes.data || [];

      // Read current local state from localStorage for safe merging
      let localNbs = [];
      let localNotes = [];
      try {
        const rawNbs = localStorage.getItem(STORAGE_KEYS.NOTEBOOKS);
        const rawNotes = localStorage.getItem(STORAGE_KEYS.NOTES);
        if (rawNbs) localNbs = JSON.parse(rawNbs);
        if (rawNotes) localNotes = JSON.parse(rawNotes);
      } catch (e) {
        console.warn('Error reading local cache during merge:', e);
      }

      // --- 1. Merge Notebooks ---
      const nbMap = new Map();
      cloudNbs.forEach((nb) => nbMap.set(nb.id, nb));

      const nbsToUpsert = [];
      localNbs.forEach((locNb) => {
        if (!locNb || !locNb.id) return;
        const validId = isValidUUID(locNb.id) ? locNb.id : generateUUID();
        const nbObj = { ...locNb, id: validId, user_id: userId };

        if (!nbMap.has(validId)) {
          // Local notebook not in cloud -> keep and push to cloud
          nbMap.set(validId, nbObj);
          nbsToUpsert.push(nbObj);
        } else {
          // Exists in both -> compare updated_at
          const cloudNb = nbMap.get(validId);
          const locTime = new Date(nbObj.updated_at || nbObj.created_at || 0).getTime();
          const cldTime = new Date(cloudNb.updated_at || cloudNb.created_at || 0).getTime();
          if (locTime > cldTime) {
            nbMap.set(validId, nbObj);
            nbsToUpsert.push(nbObj);
          }
        }
      });

      let mergedNbs = Array.from(nbMap.values());

      // If user has zero notebooks anywhere, initialize a default notebook
      if (mergedNbs.length === 0) {
        const defaultNbWithUser = {
          ...DEFAULT_NOTEBOOK,
          id: generateUUID(),
          user_id: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        mergedNbs = [defaultNbWithUser];
        nbsToUpsert.push(defaultNbWithUser);
      }

      // Upsert any missing/updated notebooks to cloud
      if (nbsToUpsert.length > 0) {
        client.from('notebooks').upsert(nbsToUpsert).catch((err) => {
          console.warn('Background upsert notebooks failed:', err);
        });
      }

      const validNbIds = new Set(mergedNbs.map((nb) => nb.id));
      const fallbackNbId = mergedNbs[0].id;

      // --- 2. Merge Notes ---
      const notesMap = new Map();
      cloudNotes.forEach((n) => notesMap.set(n.id, n));

      const notesToUpsert = [];
      localNotes.forEach((locNote) => {
        if (!locNote || !locNote.id) return;
        const validNoteId = isValidUUID(locNote.id) ? locNote.id : generateUUID();
        const targetNbId = isValidUUID(locNote.notebook_id) && validNbIds.has(locNote.notebook_id)
          ? locNote.notebook_id
          : fallbackNbId;

        const noteObj = {
          ...locNote,
          id: validNoteId,
          notebook_id: targetNbId,
          user_id: userId,
        };

        if (!notesMap.has(validNoteId)) {
          // Local note not in cloud -> keep and push to cloud
          notesMap.set(validNoteId, noteObj);
          notesToUpsert.push(noteObj);
        } else {
          // Exists in both -> compare updated_at
          // Exists in both -> compare updated_at and content completeness
          const cloudNote = notesMap.get(validNoteId);
          const locTime = new Date(noteObj.updated_at || noteObj.created_at || 0).getTime();
          const cldTime = new Date(cloudNote.updated_at || cloudNote.created_at || 0).getTime();
          if (locTime > cldTime) {
          const hasLocalData = (noteObj.content && noteObj.content.trim().length > 0) || (noteObj.title && noteObj.title !== 'Untitled Note');
          const isCloudBlank = (!cloudNote.content || cloudNote.content.trim().length === 0) && (!cloudNote.title || cloudNote.title === 'Untitled Note');

          if (locTime > cldTime || (hasLocalData && isCloudBlank)) {
            notesMap.set(validNoteId, noteObj);
            notesToUpsert.push(noteObj);
          }
        }
      });

      let mergedNotes = Array.from(notesMap.values());

      // If user has zero notes anywhere, initialize a default note
      if (mergedNotes.length === 0) {
        const defaultNoteWithUser = {
          ...DEFAULT_NOTE,
          id: generateUUID(),
          notebook_id: fallbackNbId,
          user_id: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        mergedNotes = [defaultNoteWithUser];
        notesToUpsert.push(defaultNoteWithUser);
      }

      // Upsert any missing/updated notes to cloud
      if (notesToUpsert.length > 0) {
        client.from('notes').upsert(notesToUpsert).catch((err) => {
          console.warn('Background upsert notes failed:', err);
        });
      }

      // Update state and write to localStorage
      setNotebooks(mergedNbs);
      setNotes(mergedNotes);
      persistToLocal(mergedNbs, mergedNotes);

      // Verify active selection
      const savedNbId = localStorage.getItem(STORAGE_KEYS.ACTIVE_NB);
      const savedNoteId = localStorage.getItem(STORAGE_KEYS.ACTIVE_NOTE);

      if (savedNbId && validNbIds.has(savedNbId)) {
        setActiveNotebookId(savedNbId);
      } else if (mergedNbs.length > 0) {
        selectNotebook(mergedNbs[0].id);
      }

      if (savedNoteId && mergedNotes.some((n) => n.id === savedNoteId)) {
        setActiveNoteId(savedNoteId);
      } else if (mergedNotes.length > 0) {
        selectNote(mergedNotes[0].id);
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
      const user = activeUserRef.current;
      const newNb = {
        id: generateUUID(),
        title: title?.trim() || 'Untitled Notebook',
        description: description?.trim() || '',
        color: color || '#FF4D4F',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: user?.id || null,
      };

      setNotebooks((prev) => {
        const updated = [...prev, newNb];
        persistToLocal(updated, null);
        return updated;
      });

      selectNotebook(newNb.id);

      // Cloud sync
      const client = getSupabase();
      if (client && user?.id) {
        setSyncStatus('saving');
        try {
          const { error } = await client.from('notebooks').upsert([newNb]);
          if (error) {
            console.warn('Cloud upsert notebook failed:', error);
            setSyncStatus('offline');
          } else {
            setSyncStatus('synced');
          }
        } catch (e) {
          console.warn('Cloud insert notebook exception:', e);
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
    async ({ notebook_id, title, content, tags } = {}) => {
      const user = activeUserRef.current;
      const targetNbId = notebook_id || activeNotebookId || notebooks[0]?.id;
      const newNote = {
        id: generateUUID(),
        notebook_id: targetNbId,
        title: title !== undefined ? title : 'Untitled Note',
        content: content || '',
        tags: Array.isArray(tags) ? tags : [],
        is_pinned: false,
        is_favorite: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: user?.id || null,
      };

      setNotes((prev) => {
        const updated = [newNote, ...prev];
        persistToLocal(null, updated);
        return updated;
      });

      selectNote(newNote.id);

      const client = getSupabase();
      if (client && user?.id) {
        setSyncStatus('saving');
        try {
          const { error } = await client.from('notes').upsert([newNote]);
          if (error) {
            console.warn('Cloud upsert note failed:', error);
            setSyncStatus('offline');
          } else {
            setSyncStatus('synced');
          }
        } catch (e) {
          console.warn('Cloud upsert note exception:', e);
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
        notesRef.current = updated;
        persistToLocal(null, updated);
        return updated;
      });

      // Debounced Cloud Sync
      // Debounced Cloud Sync using FULL NOTE UPSERT
      const client = getSupabase();
      const user = activeUserRef.current;
      if (client && user?.id) {
        setSyncStatus('saving');
        if (pendingSaveTimeouts.current[id]) {
          clearTimeout(pendingSaveTimeouts.current[id]);
        }
        pendingSaveTimeouts.current[id] = setTimeout(async () => {
          try {
            const { error } = await client.from('notes').update(payload).eq('id', id);
            const currentNoteObj = notesRef.current.find((n) => n.id === id) || { id, ...payload };
            const fullNoteToSave = {
              id: currentNoteObj.id || id,
              notebook_id: currentNoteObj.notebook_id || notebooksRef.current[0]?.id,
              title: currentNoteObj.title || 'Untitled Note',
              content: currentNoteObj.content || '',
              tags: Array.isArray(currentNoteObj.tags) ? currentNoteObj.tags : [],
              is_pinned: Boolean(currentNoteObj.is_pinned),
              is_favorite: Boolean(currentNoteObj.is_favorite),
              created_at: currentNoteObj.created_at || timestamp,
              updated_at: timestamp,
              user_id: user.id,
            };

            const { error } = await client.from('notes').upsert([fullNoteToSave]);
            if (error) {
              console.warn('Cloud update note error:', error);
              console.warn('Cloud upsert note error:', error);
              setSyncStatus('offline');
            } else {
              setSyncStatus('synced');
            }
          } catch (e) {
            console.warn('Cloud update note failed:', e);
            setSyncStatus('offline');
          }
          delete pendingSaveTimeouts.current[id];
        }, 350);
        }, 300);
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


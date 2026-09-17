import { useState, useEffect, useRef, useCallback } from 'react';
import { getSupabase } from '../Tracker/services/supabaseClient';

const INDEX_STORAGE_KEY = 'kaap10_whiteboards_index';
const BOARD_STORAGE_PREFIX = 'kaap10_wb_';
const LEGACY_STORAGE_KEY = 'kaap10_board_excalidraw_data';

const DEFAULT_BOARD_ID = 'default-main';

export function useBoardStorage() {
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(DEFAULT_BOARD_ID);
  const [isLoaded, setIsLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState('saved'); // 'saved' | 'saving' | 'synced' | 'offline'
  const [currentUser, setCurrentUser] = useState(null);

  const localSaveTimeoutRef = useRef(null);
  const cloudSaveTimeoutRef = useRef(null);
  const activeBoardRef = useRef(activeBoardId);
  activeBoardRef.current = activeBoardId;

  // Helper: Read single board content from localStorage
  const getLocalBoardData = useCallback((boardId) => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem(`${BOARD_STORAGE_PREFIX}${boardId}`);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.warn(`Failed to parse local board ${boardId}:`, e);
      return null;
    }
  }, []);

  // Helper: Save single board content to localStorage
  const setLocalBoardData = useCallback((boardId, data) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`${BOARD_STORAGE_PREFIX}${boardId}`, JSON.stringify(data));
    } catch (e) {
      console.warn(`Failed to write local board ${boardId}:`, e);
    }
  }, []);

  // Cloud Sync & Merge Helper
  const syncWithSupabase = useCallback(async (userSession) => {
    const supabase = getSupabase();
    if (!supabase || !userSession?.user) return;

    try {
      const { data, error } = await supabase
        .from('whiteboards')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        console.warn('Failed to fetch cloud whiteboards:', error.message);
        return;
      }

      if (data) {
        setBoards((currentLocalBoards) => {
          const cloudBoardMap = new Map(data.map((b) => [b.id, b]));
          const mergedList = [];
          const processedIds = new Set();

          // 1. Process cloud boards
          data.forEach((cloudBoard) => {
            processedIds.add(cloudBoard.id);
            setLocalBoardData(cloudBoard.id, {
              elements: cloudBoard.elements || [],
              appState: cloudBoard.app_state || {},
              files: cloudBoard.files || {},
            });
            mergedList.push({
              id: cloudBoard.id,
              title: cloudBoard.title,
              createdAt: cloudBoard.created_at,
              updatedAt: cloudBoard.updated_at,
              elementCount: Array.isArray(cloudBoard.elements) ? cloudBoard.elements.length : 0,
              isCloud: true,
            });
          });

          // 2. Preserve any local-only boards and queue them for cloud sync
          currentLocalBoards.forEach((localBoard) => {
            if (!processedIds.has(localBoard.id)) {
              mergedList.push(localBoard);
              const localData = getLocalBoardData(localBoard.id);
              if (localData && (localData.elements?.length > 0 || localBoard.title !== 'Main Whiteboard')) {
                // Upload local-only board to Supabase in background
                supabase
                  .from('whiteboards')
                  .insert({
                    user_id: userSession.user.id,
                    title: localBoard.title,
                    elements: localData.elements || [],
                    app_state: localData.appState || {},
                    files: localData.files || {},
                  })
                  .then(() => {});
              }
            }
          });

          if (typeof window !== 'undefined') {
            localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(mergedList));
          }

          if (mergedList.length > 0 && !mergedList.some((b) => b.id === activeBoardRef.current)) {
            setActiveBoardId(mergedList[0].id);
          }

          return mergedList;
        });

        setSyncStatus('synced');
      }
    } catch (err) {
      console.warn('Error during Supabase whiteboard sync:', err);
    }
  }, [getLocalBoardData, setLocalBoardData]);

  // Initialize and migrate legacy single-board if needed
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let initialBoards = [];
    try {
      const savedIndex = localStorage.getItem(INDEX_STORAGE_KEY);
      if (savedIndex) {
        initialBoards = JSON.parse(savedIndex);
      }
    } catch (e) {
      console.warn('Failed to parse whiteboards index:', e);
    }

    // Check for legacy single-board migration
    try {
      const legacyData = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyData && initialBoards.length === 0) {
        const parsedLegacy = JSON.parse(legacyData);
        const legacyBoardMeta = {
          id: DEFAULT_BOARD_ID,
          title: 'Main Whiteboard',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          elementCount: parsedLegacy?.elements?.length || 0,
        };
        initialBoards = [legacyBoardMeta];
        localStorage.setItem(`${BOARD_STORAGE_PREFIX}${DEFAULT_BOARD_ID}`, legacyData);
        localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(initialBoards));
      }
    } catch (e) {
      console.warn('Failed to migrate legacy board:', e);
    }

    // If still no boards, create a fresh default board
    if (!initialBoards || initialBoards.length === 0) {
      const defaultMeta = {
        id: DEFAULT_BOARD_ID,
        title: 'Main Whiteboard',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        elementCount: 0,
      };
      initialBoards = [defaultMeta];
      setLocalBoardData(DEFAULT_BOARD_ID, { elements: [], appState: {}, files: {} });
      localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(initialBoards));
    }

    setBoards(initialBoards);
    setActiveBoardId(initialBoards[0]?.id || DEFAULT_BOARD_ID);
    setIsLoaded(true);

    // Initial Supabase Session Check
    const supabase = getSupabase();
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setCurrentUser(session.user);
          syncWithSupabase(session);
        }
      });

      // Subscribe to auth state changes for seamless logins
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setCurrentUser(session?.user || null);
        if (session?.user) {
          syncWithSupabase(session);
        }
      });

      return () => {
        authListener?.subscription?.unsubscribe();
        if (localSaveTimeoutRef.current) clearTimeout(localSaveTimeoutRef.current);
        if (cloudSaveTimeoutRef.current) clearTimeout(cloudSaveTimeoutRef.current);
      };
    }

    return () => {
      if (localSaveTimeoutRef.current) clearTimeout(localSaveTimeoutRef.current);
      if (cloudSaveTimeoutRef.current) clearTimeout(cloudSaveTimeoutRef.current);
    };
  }, [getLocalBoardData, setLocalBoardData, syncWithSupabase]);

  // Debounced Save Function
  const saveBoardData = useCallback((boardId, sceneData) => {
    if (!boardId || !sceneData) return;

    setSyncStatus('saving');

    // 1. Fast Local Save (Debounced 300ms)
    if (localSaveTimeoutRef.current) clearTimeout(localSaveTimeoutRef.current);
    localSaveTimeoutRef.current = setTimeout(() => {
      try {
        const sanitizedData = {
          elements: sceneData.elements || [],
          appState: {
            viewBackgroundColor: sceneData.appState?.viewBackgroundColor,
            currentItemFontFamily: sceneData.appState?.currentItemFontFamily,
          },
          files: sceneData.files || {},
        };
        setLocalBoardData(boardId, sanitizedData);

        // Update index element count and timestamp
        setBoards((prev) => {
          const updated = prev.map((b) => {
            if (b.id === boardId) {
              return {
                ...b,
                updatedAt: new Date().toISOString(),
                elementCount: sceneData.elements?.length || 0,
              };
            }
            return b;
          });
          if (typeof window !== 'undefined') {
            localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(updated));
          }
          return updated;
        });

        setSyncStatus('saved');
      } catch (err) {
        console.warn('Failed local auto-save:', err);
      }
    }, 300);

    // 2. Cloud Supabase Save (Debounced 1200ms)
    if (cloudSaveTimeoutRef.current) clearTimeout(cloudSaveTimeoutRef.current);
    cloudSaveTimeoutRef.current = setTimeout(async () => {
      const supabase = getSupabase();
      if (!supabase) return;

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return;

        const currentMeta = boards.find((b) => b.id === boardId);
        const title = currentMeta?.title || 'Untitled Whiteboard';

        // Check if ID is a valid UUID or local temporary ID
        const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(boardId);
        
        const payload = {
          user_id: session.user.id,
          title,
          elements: sceneData.elements || [],
          app_state: {
            viewBackgroundColor: sceneData.appState?.viewBackgroundColor,
            currentItemFontFamily: sceneData.appState?.currentItemFontFamily,
          },
          files: sceneData.files || {},
          updated_at: new Date().toISOString(),
        };

        if (isValidUUID) {
          payload.id = boardId;
        }

        const { data, error } = await supabase
          .from('whiteboards')
          .upsert(payload)
          .select()
          .single();

        if (error) {
          console.warn('Failed cloud whiteboard sync:', error.message);
        } else if (data) {
          // If board had a temporary local ID, update it with server UUID
          if (!isValidUUID && data.id) {
            const serverId = data.id;
            setLocalBoardData(serverId, sceneData);
            if (typeof window !== 'undefined') {
              localStorage.removeItem(`${BOARD_STORAGE_PREFIX}${boardId}`);
            }
            setBoards((prev) => {
              const updated = prev.map((b) => (b.id === boardId ? { ...b, id: serverId, isCloud: true } : b));
              if (typeof window !== 'undefined') {
                localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(updated));
              }
              return updated;
            });
            if (activeBoardRef.current === boardId) {
              setActiveBoardId(serverId);
            }
          }
          setSyncStatus('synced');
        }
      } catch (err) {
        console.warn('Cloud sync error:', err);
      }
    }, 1200);
  }, [boards, setLocalBoardData]);

  // Flush current board save immediately (used before switching)
  const flushSaveImmediate = useCallback((boardId, sceneData) => {
    if (!boardId || !sceneData) return;
    try {
      const sanitizedData = {
        elements: sceneData.elements || [],
        appState: {
          viewBackgroundColor: sceneData.appState?.viewBackgroundColor,
          currentItemFontFamily: sceneData.appState?.currentItemFontFamily,
        },
        files: sceneData.files || {},
      };
      setLocalBoardData(boardId, sanitizedData);
    } catch (e) {
      // ignore
    }
  }, [setLocalBoardData]);

  // Create a new board
  const createBoard = useCallback(async (customTitle) => {
    const title = (customTitle || '').trim() || 'New Whiteboard';
    const newId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `wb-${Date.now()}`;
    const newMeta = {
      id: newId,
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      elementCount: 0,
    };

    const emptyScene = { elements: [], appState: {}, files: {} };
    setLocalBoardData(newId, emptyScene);

    const updated = [newMeta, ...boards];
    setBoards(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(updated));
    }
    setActiveBoardId(newId);

    // Sync to Supabase if logged in
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data, error } = await supabase
            .from('whiteboards')
            .insert({
              user_id: session.user.id,
              title,
              elements: [],
              app_state: {},
              files: {},
            })
            .select()
            .single();

          if (!error && data) {
            setLocalBoardData(data.id, emptyScene);
            if (typeof window !== 'undefined') {
              localStorage.removeItem(`${BOARD_STORAGE_PREFIX}${newId}`);
            }
            setBoards((prev) => {
              const patched = prev.map((b) => (b.id === newId ? { ...b, id: data.id, isCloud: true } : b));
              if (typeof window !== 'undefined') {
                localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(patched));
              }
              return patched;
            });
            setActiveBoardId(data.id);
          }
        }
      } catch (err) {
        console.warn('Failed cloud creation:', err);
      }
    }

    return newId;
  }, [boards, setLocalBoardData]);

  // Import board from .excalidraw JSON file
  const importBoardFromJSON = useCallback(async (fileContent, fileName) => {
    try {
      const parsed = JSON.parse(fileContent);
      let elements = [];
      let appState = {};
      let files = {};

      if (Array.isArray(parsed)) {
        elements = parsed;
      } else if (parsed && typeof parsed === 'object') {
        elements = Array.isArray(parsed.elements) ? parsed.elements : [];
        appState = parsed.appState || {};
        files = parsed.files || {};
      }

      const boardTitle = (fileName || 'Imported Diagram').replace(/\.(excalidraw|json)$/i, '').trim() || 'Imported Whiteboard';
      const newId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `wb-${Date.now()}`;
      
      const newMeta = {
        id: newId,
        title: boardTitle,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        elementCount: elements.length,
      };

      const sceneData = { elements, appState, files };
      setLocalBoardData(newId, sceneData);

      const updated = [newMeta, ...boards];
      setBoards(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(updated));
      }
      setActiveBoardId(newId);

      // Sync to Supabase if logged in
      const supabase = getSupabase();
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data, error } = await supabase
            .from('whiteboards')
            .insert({
              user_id: session.user.id,
              title: boardTitle,
              elements,
              app_state: appState,
              files,
            })
            .select()
            .single();

          if (!error && data) {
            setLocalBoardData(data.id, sceneData);
            if (typeof window !== 'undefined') {
              localStorage.removeItem(`${BOARD_STORAGE_PREFIX}${newId}`);
            }
            setBoards((prev) => {
              const patched = prev.map((b) => (b.id === newId ? { ...b, id: data.id, isCloud: true } : b));
              if (typeof window !== 'undefined') {
                localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(patched));
              }
              return patched;
            });
            setActiveBoardId(data.id);
          }
        }
      }

      return { success: true, boardId: newId, sceneData };
    } catch (err) {
      console.error('Failed to import .excalidraw file:', err);
      return { success: false, error: err.message };
    }
  }, [boards, setLocalBoardData]);

  // Rename a board
  const renameBoard = useCallback(async (boardId, newTitle) => {
    const trimmed = (newTitle || '').trim() || 'Untitled Whiteboard';
    setBoards((prev) => {
      const updated = prev.map((b) => (b.id === boardId ? { ...b, title: trimmed, updatedAt: new Date().toISOString() } : b));
      if (typeof window !== 'undefined') {
        localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });

    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await supabase
            .from('whiteboards')
            .update({ title: trimmed, updated_at: new Date().toISOString() })
            .eq('id', boardId)
            .eq('user_id', session.user.id);
        }
      } catch (err) {
        console.warn('Failed cloud rename:', err);
      }
    }
  }, []);

  // Duplicate a board
  const duplicateBoard = useCallback(async (boardId) => {
    const sourceMeta = boards.find((b) => b.id === boardId);
    if (!sourceMeta) return;

    const sourceData = getLocalBoardData(boardId) || { elements: [], appState: {}, files: {} };
    const newTitle = `${sourceMeta.title} (Copy)`;
    const newId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `wb-${Date.now()}`;

    const newMeta = {
      id: newId,
      title: newTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      elementCount: sourceData.elements?.length || 0,
    };

    setLocalBoardData(newId, sourceData);

    const updated = [newMeta, ...boards];
    setBoards(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(updated));
    }
    setActiveBoardId(newId);

    // Sync copy to Supabase
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data, error } = await supabase
            .from('whiteboards')
            .insert({
              user_id: session.user.id,
              title: newTitle,
              elements: sourceData.elements || [],
              app_state: sourceData.appState || {},
              files: sourceData.files || {},
            })
            .select()
            .single();

          if (!error && data) {
            setLocalBoardData(data.id, sourceData);
            if (typeof window !== 'undefined') {
              localStorage.removeItem(`${BOARD_STORAGE_PREFIX}${newId}`);
            }
            setBoards((prev) => {
              const patched = prev.map((b) => (b.id === newId ? { ...b, id: data.id, isCloud: true } : b));
              if (typeof window !== 'undefined') {
                localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(patched));
              }
              return patched;
            });
            setActiveBoardId(data.id);
          }
        }
      } catch (err) {
        console.warn('Failed cloud duplicate:', err);
      }
    }

    return newId;
  }, [boards, getLocalBoardData, setLocalBoardData]);

  // Delete a board
  const deleteBoard = useCallback(async (boardId) => {
    if (boards.length <= 1) {
      // Don't delete the last board; reset it to empty instead
      const resetMeta = {
        ...boards[0],
        title: 'Main Whiteboard',
        elementCount: 0,
        updatedAt: new Date().toISOString(),
      };
      setLocalBoardData(resetMeta.id, { elements: [], appState: {}, files: {} });
      setBoards([resetMeta]);
      if (typeof window !== 'undefined') {
        localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify([resetMeta]));
      }
      return;
    }

    const updated = boards.filter((b) => b.id !== boardId);
    setBoards(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(updated));
      localStorage.removeItem(`${BOARD_STORAGE_PREFIX}${boardId}`);
    }

    if (activeBoardId === boardId) {
      setActiveBoardId(updated[0]?.id || DEFAULT_BOARD_ID);
    }

    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await supabase
            .from('whiteboards')
            .delete()
            .eq('id', boardId)
            .eq('user_id', session.user.id);
        }
      } catch (err) {
        console.warn('Failed cloud delete:', err);
      }
    }
  }, [activeBoardId, boards, setLocalBoardData]);

  return {
    boards,
    activeBoardId,
    activeBoardMeta: boards.find((b) => b.id === activeBoardId) || boards[0],
    isLoaded,
    syncStatus,
    currentUser,
    getLocalBoardData,
    saveBoardData,
    flushSaveImmediate,
    createBoard,
    importBoardFromJSON,
    setActiveBoardId,
    renameBoard,
    duplicateBoard,
    deleteBoard,
  };
}

import { useState, useEffect, useRef, useCallback } from 'react';
import { getSupabase } from '../Tracker/services/supabaseClient';

const INDEX_STORAGE_KEY = 'kaap10_whiteboards_index';
const BOARD_STORAGE_PREFIX = 'kaap10_wb_';
const LEGACY_STORAGE_KEY = 'kaap10_board_excalidraw_data';

const DEFAULT_BOARD_ID = '00000000-0000-4000-8000-000000000003';

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

const DEFAULT_BOARD_META = {
  id: DEFAULT_BOARD_ID,
  title: 'Main Whiteboard',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  elementCount: 0,
  isCloud: false,
};

export function useBoardStorage() {
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(DEFAULT_BOARD_ID);
  const [isLoaded, setIsLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState('saved'); // 'saved' | 'saving' | 'synced' | 'offline'
  const [currentUser, setCurrentUser] = useState(null);

  const boardsRef = useRef([]);
  const activeBoardRef = useRef(activeBoardId);
  const activeUserRef = useRef(null);
  const pendingLocalTimeouts = useRef({});
  const pendingCloudTimeouts = useRef({});

  // Keep refs synchronized
  useEffect(() => {
    boardsRef.current = boards;
  }, [boards]);

  useEffect(() => {
    activeBoardRef.current = activeBoardId;
  }, [activeBoardId]);

  useEffect(() => {
    activeUserRef.current = currentUser;
  }, [currentUser]);

  // Reliable async user resolver
  const getAuthenticatedUser = useCallback(async () => {
    if (activeUserRef.current?.id) return activeUserRef.current;
    const supabase = getSupabase();
    if (!supabase) return null;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUser(session.user);
        activeUserRef.current = session.user;
        return session.user;
      }
    } catch (e) {
      console.warn('Error fetching Supabase auth session:', e);
    }
    return null;
  }, []);

  // Helper: Read single board content from localStorage
  const getLocalBoardData = useCallback((boardId) => {
    if (typeof window === 'undefined' || !boardId) return null;
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
    if (typeof window === 'undefined' || !boardId) return;
    try {
      localStorage.setItem(`${BOARD_STORAGE_PREFIX}${boardId}`, JSON.stringify(data));
    } catch (e) {
      console.warn(`Failed to write local board ${boardId}:`, e);
    }
  }, []);

  // Cloud Sync & Deduplication Helper
  const syncWithSupabase = useCallback(
    async (userSession) => {
      const supabase = getSupabase();
      const user = userSession?.user || (await getAuthenticatedUser());
      if (!supabase || !user?.id) return;

      try {
        const { data, error } = await supabase
          .from('whiteboards')
          .select('*')
          .order('updated_at', { ascending: false });

        if (error) {
          console.warn('Failed to fetch cloud whiteboards:', error.message);
          setSyncStatus('offline');
          return;
        }

        if (data) {
          // 1. Deduplicate cloud boards if ghost duplicates exist from earlier bugs
          const uniqueCloudBoards = [];
          const seenKeys = new Map();
          const duplicateIdsToDelete = [];

          data.forEach((board) => {
            const elCount = Array.isArray(board.elements) ? board.elements.length : 0;
            const dedupKey = `${board.title}_${elCount}`;

            if (seenKeys.has(dedupKey) && elCount === 0 && board.title === 'New Whiteboard') {
              duplicateIdsToDelete.push(board.id);
            } else {
              seenKeys.set(dedupKey, board);
              uniqueCloudBoards.push(board);
            }
          });

          // Clean up ghost duplicates from Supabase
          if (duplicateIdsToDelete.length > 0) {
            supabase
              .from('whiteboards')
              .delete()
              .in('id', duplicateIdsToDelete)
              .eq('user_id', user.id)
              .then(() => {})
              .catch(() => {});
          }

          // 2. Read local cache
          let localBoardsList = [];
          try {
            const raw = localStorage.getItem(INDEX_STORAGE_KEY);
            if (raw) localBoardsList = JSON.parse(raw);
          } catch (e) {
            localBoardsList = boardsRef.current;
          }

          const mergedList = [];
          const processedIds = new Set();

          // 3. Process Cloud Boards into local storage
          uniqueCloudBoards.forEach((cloudBoard) => {
            processedIds.add(cloudBoard.id);
            setLocalBoardData(cloudBoard.id, {
              elements: cloudBoard.elements || [],
              appState: cloudBoard.app_state || {},
              files: cloudBoard.files || {},
            });

            mergedList.push({
              id: cloudBoard.id,
              title: cloudBoard.title || 'Untitled Whiteboard',
              createdAt: cloudBoard.created_at,
              updatedAt: cloudBoard.updated_at,
              elementCount: Array.isArray(cloudBoard.elements) ? cloudBoard.elements.length : 0,
              isCloud: true,
            });
          });

          // 4. Preserve and upsert any local-only boards with consistent UUID
          const boardsToUpsertCloud = [];
          localBoardsList.forEach((locBoard) => {
            if (!locBoard || !locBoard.id) return;
            const validId = isValidUUID(locBoard.id) ? locBoard.id : generateUUID();

            if (!processedIds.has(validId)) {
              processedIds.add(validId);
              const localData = getLocalBoardData(locBoard.id) || { elements: [], appState: {}, files: {} };

              if (validId !== locBoard.id) {
                setLocalBoardData(validId, localData);
                if (typeof window !== 'undefined') {
                  localStorage.removeItem(`${BOARD_STORAGE_PREFIX}${locBoard.id}`);
                }
              }

              const boardMeta = {
                id: validId,
                title: locBoard.title || 'Untitled Whiteboard',
                createdAt: locBoard.createdAt || new Date().toISOString(),
                updatedAt: locBoard.updatedAt || new Date().toISOString(),
                elementCount: localData.elements?.length || 0,
                isCloud: true,
              };
              mergedList.push(boardMeta);

              if (localData.elements?.length > 0 || locBoard.title !== 'Main Whiteboard') {
                boardsToUpsertCloud.push({
                  id: validId,
                  user_id: user.id,
                  title: locBoard.title || 'Untitled Whiteboard',
                  elements: localData.elements || [],
                  app_state: localData.appState || {},
                  files: localData.files || {},
                  created_at: boardMeta.createdAt,
                  updated_at: boardMeta.updatedAt,
                });
              }
            }
          });

          // If zero boards exist anywhere, create a default board
          if (mergedList.length === 0) {
            const defaultBoard = {
              ...DEFAULT_BOARD_META,
              id: generateUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isCloud: true,
            };
            mergedList.push(defaultBoard);
            setLocalBoardData(defaultBoard.id, { elements: [], appState: {}, files: {} });
            boardsToUpsertCloud.push({
              id: defaultBoard.id,
              user_id: user.id,
              title: defaultBoard.title,
              elements: [],
              app_state: {},
              files: {},
            });
          }

          if (boardsToUpsertCloud.length > 0) {
            supabase.from('whiteboards').upsert(boardsToUpsertCloud).catch((err) => {
              console.warn('Failed background upsert for local whiteboards:', err);
            });
          }

          setBoards(mergedList);
          boardsRef.current = mergedList;
          if (typeof window !== 'undefined') {
            localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(mergedList));
          }

          if (!mergedList.some((b) => b.id === activeBoardRef.current)) {
            const nextActive = mergedList[0]?.id || DEFAULT_BOARD_ID;
            setActiveBoardId(nextActive);
            activeBoardRef.current = nextActive;
          }

          setSyncStatus('synced');
        }
      } catch (err) {
        console.warn('Error during Supabase whiteboard sync:', err);
        setSyncStatus('offline');
      }
    },
    [getAuthenticatedUser, getLocalBoardData, setLocalBoardData]
  );

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
      if (legacyData && (!initialBoards || initialBoards.length === 0)) {
        const parsedLegacy = JSON.parse(legacyData);
        const legacyUUID = generateUUID();
        const legacyBoardMeta = {
          id: legacyUUID,
          title: 'Main Whiteboard',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          elementCount: parsedLegacy?.elements?.length || 0,
          isCloud: false,
        };
        initialBoards = [legacyBoardMeta];
        localStorage.setItem(`${BOARD_STORAGE_PREFIX}${legacyUUID}`, legacyData);
        localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(initialBoards));
      }
    } catch (e) {
      console.warn('Failed to migrate legacy board:', e);
    }

    // Sanitize any non-UUID board IDs in local storage
    if (Array.isArray(initialBoards) && initialBoards.length > 0) {
      initialBoards = initialBoards.map((b) => {
        if (!isValidUUID(b.id)) {
          const newUUID = generateUUID();
          const oldData = getLocalBoardData(b.id);
          if (oldData) {
            setLocalBoardData(newUUID, oldData);
            localStorage.removeItem(`${BOARD_STORAGE_PREFIX}${b.id}`);
          }
          return { ...b, id: newUUID };
        }
        return b;
      });
    }

    // If still no boards, create a fresh default board with valid UUID
    if (!initialBoards || initialBoards.length === 0) {
      const defaultId = generateUUID();
      const defaultMeta = {
        ...DEFAULT_BOARD_META,
        id: defaultId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      initialBoards = [defaultMeta];
      setLocalBoardData(defaultId, { elements: [], appState: {}, files: {} });
      localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(initialBoards));
    }

    setBoards(initialBoards);
    boardsRef.current = initialBoards;
    const initialActive = initialBoards[0]?.id || DEFAULT_BOARD_ID;
    setActiveBoardId(initialActive);
    activeBoardRef.current = initialActive;
    setIsLoaded(true);

    // Supabase Session Check
    const supabase = getSupabase();
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        const user = session?.user || null;
        setCurrentUser(user);
        activeUserRef.current = user;
        if (user) {
          syncWithSupabase(session);
        }
      });

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        const user = session?.user || null;
        setCurrentUser(user);
        activeUserRef.current = user;
        if (user) {
          syncWithSupabase(session);
        }
      });

      return () => {
        authListener?.subscription?.unsubscribe();
        Object.values(pendingLocalTimeouts.current).forEach(clearTimeout);
        Object.values(pendingCloudTimeouts.current).forEach(clearTimeout);
      };
    }

    return () => {
      Object.values(pendingLocalTimeouts.current).forEach(clearTimeout);
      Object.values(pendingCloudTimeouts.current).forEach(clearTimeout);
    };
  }, [getLocalBoardData, setLocalBoardData, syncWithSupabase]);

  // Debounced Save Function (Atomic Upsert)
  const saveBoardData = useCallback(
    (boardId, sceneData) => {
      if (!boardId || !sceneData) return;

      const validId = isValidUUID(boardId) ? boardId : generateUUID();
      const elementCount = Array.isArray(sceneData.elements) ? sceneData.elements.length : 0;
      const timestamp = new Date().toISOString();

      setSyncStatus('saving');

      // 1. Fast Local Save (Debounced 250ms)
      if (pendingLocalTimeouts.current[validId]) {
        clearTimeout(pendingLocalTimeouts.current[validId]);
      }
      pendingLocalTimeouts.current[validId] = setTimeout(() => {
        try {
          const sanitizedData = {
            elements: sceneData.elements || [],
            appState: {
              viewBackgroundColor: sceneData.appState?.viewBackgroundColor,
              currentItemFontFamily: sceneData.appState?.currentItemFontFamily,
            },
            files: sceneData.files || {},
          };
          setLocalBoardData(validId, sanitizedData);

          // Update index element count and timestamp
          setBoards((prev) => {
            const updated = prev.map((b) => {
              if (b.id === validId) {
                return {
                  ...b,
                  updatedAt: timestamp,
                  elementCount,
                };
              }
              return b;
            });
            boardsRef.current = updated;
            if (typeof window !== 'undefined') {
              localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(updated));
            }
            return updated;
          });

          setSyncStatus('saved');
        } catch (err) {
          console.warn('Failed local auto-save:', err);
        }
        delete pendingLocalTimeouts.current[validId];
      }, 250);

      // 2. Cloud Supabase Save (Debounced 800ms) with ATOMIC UPSERT
      const supabase = getSupabase();
      if (supabase) {
        if (pendingCloudTimeouts.current[validId]) {
          clearTimeout(pendingCloudTimeouts.current[validId]);
        }
        pendingCloudTimeouts.current[validId] = setTimeout(async () => {
          try {
            const user = await getAuthenticatedUser();
            if (!user?.id) {
              setSyncStatus('saved');
              delete pendingCloudTimeouts.current[validId];
              return;
            }

            const currentMeta = boardsRef.current.find((b) => b.id === validId);
            const title = currentMeta?.title || 'Untitled Whiteboard';

            const payload = {
              id: validId,
              user_id: user.id,
              title,
              elements: sceneData.elements || [],
              app_state: {
                viewBackgroundColor: sceneData.appState?.viewBackgroundColor,
                currentItemFontFamily: sceneData.appState?.currentItemFontFamily,
              },
              files: sceneData.files || {},
              updated_at: timestamp,
            };

            const { error } = await supabase.from('whiteboards').upsert([payload]);

            if (error) {
              console.warn('Failed cloud whiteboard upsert:', error.message || error);
              setSyncStatus('offline');
            } else {
              setSyncStatus('synced');
            }
          } catch (err) {
            console.warn('Cloud sync error:', err);
            setSyncStatus('offline');
          }
          delete pendingCloudTimeouts.current[validId];
        }, 800);
      }
    },
    [getAuthenticatedUser, setLocalBoardData]
  );

  // Flush current board save immediately (used before switching)
  const flushSaveImmediate = useCallback(
    (boardId, sceneData) => {
      if (!boardId || !sceneData) return;
      const validId = isValidUUID(boardId) ? boardId : generateUUID();
      try {
        const sanitizedData = {
          elements: sceneData.elements || [],
          appState: {
            viewBackgroundColor: sceneData.appState?.viewBackgroundColor,
            currentItemFontFamily: sceneData.appState?.currentItemFontFamily,
          },
          files: sceneData.files || {},
        };
        setLocalBoardData(validId, sanitizedData);
      } catch (e) {
        // ignore
      }
    },
    [setLocalBoardData]
  );

  // Create a new board
  const createBoard = useCallback(
    async (customTitle) => {
      const title = (customTitle || '').trim() || 'New Whiteboard';
      const newId = generateUUID();
      const timestamp = new Date().toISOString();
      const user = await getAuthenticatedUser();

      const newMeta = {
        id: newId,
        title,
        createdAt: timestamp,
        updatedAt: timestamp,
        elementCount: 0,
        isCloud: Boolean(user?.id),
      };

      const emptyScene = { elements: [], appState: {}, files: {} };
      setLocalBoardData(newId, emptyScene);

      setBoards((prev) => {
        const updated = [newMeta, ...prev];
        boardsRef.current = updated;
        if (typeof window !== 'undefined') {
          localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(updated));
        }
        return updated;
      });

      setActiveBoardId(newId);
      activeBoardRef.current = newId;

      // Sync directly to Supabase with assigned UUID
      const supabase = getSupabase();
      if (supabase && user?.id) {
        try {
          const { error } = await supabase.from('whiteboards').upsert([
            {
              id: newId,
              user_id: user.id,
              title,
              elements: [],
              app_state: {},
              files: {},
              created_at: timestamp,
              updated_at: timestamp,
            },
          ]);
          if (error) {
            console.warn('Failed cloud creation:', error.message || error);
          } else {
            setSyncStatus('synced');
          }
        } catch (err) {
          console.warn('Failed cloud creation:', err);
        }
      }

      return newId;
    },
    [getAuthenticatedUser, setLocalBoardData]
  );

  // Import board from .excalidraw JSON file
  const importBoardFromJSON = useCallback(
    async (fileContent, fileName) => {
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

        const boardTitle =
          (fileName || 'Imported Diagram').replace(/\.(excalidraw|json)$/i, '').trim() || 'Imported Whiteboard';
        const newId = generateUUID();
        const timestamp = new Date().toISOString();
        const user = await getAuthenticatedUser();

        const newMeta = {
          id: newId,
          title: boardTitle,
          createdAt: timestamp,
          updatedAt: timestamp,
          elementCount: elements.length,
          isCloud: Boolean(user?.id),
        };

        const sceneData = { elements, appState, files };
        setLocalBoardData(newId, sceneData);

        setBoards((prev) => {
          const updated = [newMeta, ...prev];
          boardsRef.current = updated;
          if (typeof window !== 'undefined') {
            localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(updated));
          }
          return updated;
        });

        setActiveBoardId(newId);
        activeBoardRef.current = newId;

        const supabase = getSupabase();
        if (supabase && user?.id) {
          const { error } = await supabase.from('whiteboards').upsert([
            {
              id: newId,
              user_id: user.id,
              title: boardTitle,
              elements,
              app_state: appState,
              files,
              created_at: timestamp,
              updated_at: timestamp,
            },
          ]);
          if (!error) {
            setSyncStatus('synced');
          }
        }

        return { success: true, boardId: newId, sceneData };
      } catch (err) {
        console.error('Failed to import .excalidraw file:', err);
        return { success: false, error: err.message };
      }
    },
    [getAuthenticatedUser, setLocalBoardData]
  );

  // Rename a board
  const renameBoard = useCallback(
    async (boardId, newTitle) => {
      const trimmed = (newTitle || '').trim() || 'Untitled Whiteboard';
      const timestamp = new Date().toISOString();
      const user = await getAuthenticatedUser();

      setBoards((prev) => {
        const updated = prev.map((b) =>
          b.id === boardId ? { ...b, title: trimmed, updatedAt: timestamp } : b
        );
        boardsRef.current = updated;
        if (typeof window !== 'undefined') {
          localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(updated));
        }
        return updated;
      });

      const supabase = getSupabase();
      if (supabase && user?.id) {
        try {
          await supabase
            .from('whiteboards')
            .update({ title: trimmed, updated_at: timestamp })
            .eq('id', boardId)
            .eq('user_id', user.id);
        } catch (err) {
          console.warn('Failed cloud rename:', err);
        }
      }
    },
    [getAuthenticatedUser]
  );

  // Duplicate a board
  const duplicateBoard = useCallback(
    async (boardId) => {
      const sourceMeta = boardsRef.current.find((b) => b.id === boardId);
      if (!sourceMeta) return;

      const sourceData = getLocalBoardData(boardId) || { elements: [], appState: {}, files: {} };
      const newTitle = `${sourceMeta.title} (Copy)`;
      const newId = generateUUID();
      const timestamp = new Date().toISOString();
      const user = await getAuthenticatedUser();

      const newMeta = {
        id: newId,
        title: newTitle,
        createdAt: timestamp,
        updatedAt: timestamp,
        elementCount: sourceData.elements?.length || 0,
        isCloud: Boolean(user?.id),
      };

      setLocalBoardData(newId, sourceData);

      setBoards((prev) => {
        const updated = [newMeta, ...prev];
        boardsRef.current = updated;
        if (typeof window !== 'undefined') {
          localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(updated));
        }
        return updated;
      });

      setActiveBoardId(newId);
      activeBoardRef.current = newId;

      const supabase = getSupabase();
      if (supabase && user?.id) {
        try {
          await supabase.from('whiteboards').upsert([
            {
              id: newId,
              user_id: user.id,
              title: newTitle,
              elements: sourceData.elements || [],
              app_state: sourceData.appState || {},
              files: sourceData.files || {},
              created_at: timestamp,
              updated_at: timestamp,
            },
          ]);
        } catch (err) {
          console.warn('Failed cloud duplicate:', err);
        }
      }

      return newId;
    },
    [getAuthenticatedUser, getLocalBoardData, setLocalBoardData]
  );

  // Delete a board
  const deleteBoard = useCallback(
    async (boardId) => {
      const user = await getAuthenticatedUser();

      if (boardsRef.current.length <= 1) {
        const resetId = generateUUID();
        const resetMeta = {
          ...DEFAULT_BOARD_META,
          id: resetId,
          title: 'Main Whiteboard',
          elementCount: 0,
          updatedAt: new Date().toISOString(),
        };
        setLocalBoardData(resetId, { elements: [], appState: {}, files: {} });
        setBoards([resetMeta]);
        boardsRef.current = [resetMeta];
        setActiveBoardId(resetId);
        activeBoardRef.current = resetId;

        if (typeof window !== 'undefined') {
          localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify([resetMeta]));
          localStorage.removeItem(`${BOARD_STORAGE_PREFIX}${boardId}`);
        }

        const supabase = getSupabase();
        if (supabase && user?.id) {
          await supabase.from('whiteboards').delete().eq('id', boardId).eq('user_id', user.id);
          await supabase.from('whiteboards').upsert([
            {
              id: resetId,
              user_id: user.id,
              title: resetMeta.title,
              elements: [],
              app_state: {},
              files: {},
            },
          ]);
        }
        return;
      }

      const updated = boardsRef.current.filter((b) => b.id !== boardId);
      setBoards(updated);
      boardsRef.current = updated;

      if (typeof window !== 'undefined') {
        localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(updated));
        localStorage.removeItem(`${BOARD_STORAGE_PREFIX}${boardId}`);
      }

      if (activeBoardRef.current === boardId) {
        const nextId = updated[0]?.id || DEFAULT_BOARD_ID;
        setActiveBoardId(nextId);
        activeBoardRef.current = nextId;
      }

      const supabase = getSupabase();
      if (supabase && user?.id) {
        try {
          await supabase.from('whiteboards').delete().eq('id', boardId).eq('user_id', user.id);
        } catch (err) {
          console.warn('Failed cloud delete:', err);
        }
      }
    },
    [getAuthenticatedUser, setLocalBoardData]
  );

  // Manual deduplication cleanup action
  const cleanDuplicates = useCallback(async () => {
    const user = await getAuthenticatedUser();
    const supabase = getSupabase();
    const currentList = boardsRef.current;

    const seen = new Map();
    const toKeep = [];
    const idsToDelete = [];

    currentList.forEach((b) => {
      const data = getLocalBoardData(b.id);
      const contentHash = `${b.title}_${data?.elements?.length || 0}_${JSON.stringify(data?.elements?.[0] || {})}`;
      if (seen.has(contentHash)) {
        idsToDelete.push(b.id);
      } else {
        seen.set(contentHash, b);
        toKeep.push(b);
      }
    });

    if (idsToDelete.length > 0) {
      setBoards(toKeep);
      boardsRef.current = toKeep;
      if (typeof window !== 'undefined') {
        localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(toKeep));
        idsToDelete.forEach((id) => localStorage.removeItem(`${BOARD_STORAGE_PREFIX}${id}`));
      }

      if (!toKeep.some((b) => b.id === activeBoardRef.current)) {
        setActiveBoardId(toKeep[0]?.id || DEFAULT_BOARD_ID);
      }

      if (supabase && user?.id) {
        try {
          await supabase.from('whiteboards').delete().in('id', idsToDelete).eq('user_id', user.id);
        } catch (e) {
          console.warn('Error deleting duplicates from Supabase:', e);
        }
      }
    }

    return idsToDelete.length;
  }, [getAuthenticatedUser, getLocalBoardData]);

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
    cleanDuplicates,
  };
}

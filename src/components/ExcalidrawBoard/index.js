import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import '@excalidraw/excalidraw/index.css';
import { useBoardStorage } from './useBoardStorage';
import BoardHeader from './BoardHeader';
import BoardDrawer from './BoardDrawer';
import styles from './styles.module.css';

export default function ExcalidrawBoard() {
  const [ExcalidrawComp, setExcalidrawComp] = useState(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { colorMode } = useColorMode();

  const currentSceneRef = useRef({ elements: [], appState: {}, files: {} });

  const {
    boards,
    activeBoardId,
    activeBoardMeta,
    isLoaded: isStorageLoaded,
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
  } = useBoardStorage();

  // Dynamic import of Excalidraw for SSR compatibility
  useEffect(() => {
    let isMounted = true;
    import('@excalidraw/excalidraw')
      .then((mod) => {
        if (!isMounted) return;
        setExcalidrawComp(() => mod.Excalidraw);
      })
      .catch((err) => {
        console.error('Failed to dynamically load Excalidraw module:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // When active board changes or when excalidrawAPI initializes, load target scene into canvas
  useEffect(() => {
    if (!excalidrawAPI || !activeBoardId || !isStorageLoaded) return;

    const targetData = getLocalBoardData(activeBoardId) || { elements: [], appState: {}, files: {} };
    currentSceneRef.current = targetData;

    try {
      excalidrawAPI.updateScene({
        elements: targetData.elements || [],
        appState: {
          ...targetData.appState,
          viewBackgroundColor: targetData.appState?.viewBackgroundColor || (colorMode === 'dark' ? '#121212' : '#ffffff'),
        },
        files: targetData.files || {},
      });
    } catch (e) {
      console.warn('Failed to update scene for board:', activeBoardId, e);
    }
  }, [activeBoardId, excalidrawAPI, isStorageLoaded, getLocalBoardData, colorMode]);

  // Track user edits on canvas
  const handleChange = useCallback(
    (elements, appState, files) => {
      currentSceneRef.current = { elements, appState, files };
      saveBoardData(activeBoardId, { elements, appState, files });
    },
    [activeBoardId, saveBoardData]
  );

  // Switch to another board smoothly
  const handleSwitchBoard = useCallback(
    (targetBoardId) => {
      if (targetBoardId === activeBoardId) return;

      // 1. Immediately flush current changes for active board
      flushSaveImmediate(activeBoardId, currentSceneRef.current);

      // 2. Read target scene data
      const targetData = getLocalBoardData(targetBoardId) || { elements: [], appState: {}, files: {} };
      currentSceneRef.current = targetData;

      // 3. Update active board ID
      setActiveBoardId(targetBoardId);

      // 4. Update scene directly in Excalidraw canvas
      if (excalidrawAPI) {
        try {
          excalidrawAPI.updateScene({
            elements: targetData.elements || [],
            appState: {
              ...targetData.appState,
              viewBackgroundColor: targetData.appState?.viewBackgroundColor || (colorMode === 'dark' ? '#121212' : '#ffffff'),
            },
            files: targetData.files || {},
          });
        } catch (e) {
          console.warn('Failed to update scene on switch:', e);
        }
      }
    },
    [activeBoardId, flushSaveImmediate, getLocalBoardData, setActiveBoardId, excalidrawAPI, colorMode]
  );

  // Create new board and switch to it
  const handleCreateBoard = useCallback(
    async (title) => {
      // Flush current board first
      flushSaveImmediate(activeBoardId, currentSceneRef.current);
      const newId = await createBoard(title);
      currentSceneRef.current = { elements: [], appState: {}, files: {} };
      if (excalidrawAPI) {
        excalidrawAPI.updateScene({ elements: [], appState: {}, files: {} });
      }
      return newId;
    },
    [activeBoardId, flushSaveImmediate, createBoard, excalidrawAPI]
  );

  // Import board from .excalidraw JSON file
  const handleImportBoard = useCallback(
    async (fileContent, fileName) => {
      flushSaveImmediate(activeBoardId, currentSceneRef.current);
      const res = await importBoardFromJSON(fileContent, fileName);
      if (res?.success && excalidrawAPI) {
        currentSceneRef.current = res.sceneData;
        try {
          excalidrawAPI.updateScene({
            elements: res.sceneData.elements || [],
            appState: {
              ...res.sceneData.appState,
              viewBackgroundColor: res.sceneData.appState?.viewBackgroundColor || (colorMode === 'dark' ? '#121212' : '#ffffff'),
            },
            files: res.sceneData.files || {},
          });
        } catch (e) {
          console.warn('Failed to render imported scene:', e);
        }
      }
      return res;
    },
    [activeBoardId, flushSaveImmediate, importBoardFromJSON, excalidrawAPI, colorMode]
  );

  // Export board as .excalidraw file
  const handleExportBoard = useCallback(
    (boardId) => {
      const meta = boards.find((b) => b.id === boardId) || activeBoardMeta;
      const data = getLocalBoardData(boardId) || { elements: [], appState: {}, files: {} };
      
      const fileData = {
        type: 'excalidraw',
        version: 2,
        source: 'https://kaap10.github.io/workspace/whiteboard',
        elements: data.elements || [],
        appState: data.appState || {},
        files: data.files || {},
      };

      const jsonStr = JSON.stringify(fileData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${(meta?.title || 'whiteboard').replace(/\s+/g, '_')}.excalidraw`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    [boards, activeBoardMeta, getLocalBoardData]
  );

  if (!ExcalidrawComp || !isStorageLoaded) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p className={styles.loadingText}>Initializing Whiteboard Engine...</p>
      </div>
    );
  }

  // Get initial data for first mount
  const initialData = getLocalBoardData(activeBoardId) || { elements: [], appState: {}, files: {} };

  return (
    <div className={styles.boardWrapper}>
      {/* Floating Header Toolbar */}
      <BoardHeader
        boards={boards}
        activeBoardMeta={activeBoardMeta}
        syncStatus={syncStatus}
        currentUser={currentUser}
        onSwitchBoard={handleSwitchBoard}
        onCreateBoard={handleCreateBoard}
        onRenameBoard={renameBoard}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Board Management Drawer / Modal */}
      <BoardDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        boards={boards}
        activeBoardId={activeBoardId}
        onSwitchBoard={handleSwitchBoard}
        onCreateBoard={handleCreateBoard}
        onRenameBoard={renameBoard}
        onDuplicateBoard={duplicateBoard}
        onDeleteBoard={deleteBoard}
        onCleanDuplicates={cleanDuplicates}
        onExportBoard={handleExportBoard}
        onImportBoard={handleImportBoard}
      />

      {/* Excalidraw Vector Canvas */}
      <ExcalidrawComp
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        theme={colorMode === 'dark' ? 'dark' : 'light'}
        initialData={initialData}
        onChange={handleChange}
        UIOptions={{
          canvasActions: {
            loadScene: true,
            saveToActiveFile: true,
            export: { saveFileToDisk: true },
            saveAsImage: true,
          },
        }}
      />
    </div>
  );
}

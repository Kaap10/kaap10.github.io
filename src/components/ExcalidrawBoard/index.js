import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import '@excalidraw/excalidraw/index.css';
import styles from './styles.module.css';

const LOCAL_STORAGE_KEY = 'kaap10_board_excalidraw_data';

export default function ExcalidrawBoard() {
  const [ExcalidrawComp, setExcalidrawComp] = useState(null);
  const { colorMode } = useColorMode();
  const [initialData, setInitialData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    import('@excalidraw/excalidraw')
      .then((mod) => {
        if (!isMounted) return;
        setExcalidrawComp(() => mod.Excalidraw);
        try {
          const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            setInitialData(parsed);
          }
        } catch (e) {
          console.warn('Failed to parse saved board state:', e);
        }
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load Excalidraw component:', err);
      });

    return () => {
      isMounted = false;
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = useCallback((elements, appState, files) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      try {
        const dataToSave = {
          elements,
          appState: {
            viewBackgroundColor: appState.viewBackgroundColor,
            currentItemFontFamily: appState.currentItemFontFamily,
          },
          files,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
      } catch (err) {
        // Handle storage quota or privacy restrictions gracefully
      }
    }, 400);
  }, []);

  if (!isLoaded || !ExcalidrawComp) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Loading Whiteboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.boardWrapper}>
      <ExcalidrawComp
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


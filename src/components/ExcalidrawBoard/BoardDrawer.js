import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Search, 
  Plus, 
  Copy, 
  Trash2, 
  Download, 
  Upload,
  Edit2, 
  Check, 
  PenTool, 
  Layers, 
  Calendar
} from 'lucide-react';
import styles from './styles.module.css';

export default function BoardDrawer({
  isOpen,
  onClose,
  boards,
  activeBoardId,
  onSwitchBoard,
  onCreateBoard,
  onRenameBoard,
  onDuplicateBoard,
  onDeleteBoard,
  onExportBoard,
  onImportBoard,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [importStatus, setImportStatus] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredBoards = boards.filter((b) =>
    (b.title || '').toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const startRename = (board) => {
    setEditingId(board.id);
    setEditTitle(board.title);
  };

  const saveRename = (boardId) => {
    if (editTitle.trim()) {
      onRenameBoard(boardId, editTitle.trim());
    }
    setEditingId(null);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (newTitle.trim()) {
      onCreateBoard(newTitle.trim());
      setNewTitle('');
    } else {
      onCreateBoard('New Whiteboard');
    }
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (content && onImportBoard) {
        onImportBoard(content, file.name).then((res) => {
          if (res?.success) {
            setImportStatus({ type: 'success', text: `Imported "${file.name}" successfully!` });
            setTimeout(() => setImportStatus(null), 3000);
          } else {
            setImportStatus({ type: 'error', text: res?.error || 'Invalid file format' });
            setTimeout(() => setImportStatus(null), 4000);
          }
        });
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  return (
    <div className={styles.drawerOverlay} onClick={onClose}>
      <div className={styles.drawerModal} onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className={styles.drawerHeader}>
          <div className={styles.drawerHeaderLeft}>
            <PenTool size={18} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
            <h2 className={styles.drawerTitle}>Manage Whiteboards</h2>
            <span className={styles.drawerCountBadge}>{boards.length} Boards</span>
          </div>

          <div className={styles.drawerHeaderRight}>
            {/* Hidden File Input for Import */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".excalidraw,.json,application/json"
              style={{ display: 'none' }}
              onChange={handleFileImport}
            />
            <button
              type="button"
              className={styles.importTopBtn}
              onClick={() => fileInputRef.current?.click()}
              title="Import .excalidraw or JSON diagram file"
            >
              <Upload size={13} />
              <span>Import</span>
            </button>

            <button type="button" className={styles.drawerCloseBtn} onClick={onClose} title="Close Manager">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {importStatus && (
          <div className={`${styles.drawerToast} ${importStatus.type === 'error' ? styles.drawerToastError : styles.drawerToastSuccess}`}>
            <span>{importStatus.text}</span>
          </div>
        )}

        {/* Search & Quick Creation Toolbar */}
        <div className={styles.drawerToolbar}>
          <div className={styles.drawerSearchBox}>
            <Search size={14} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search whiteboards (e.g. DSA, System Design...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.drawerSearchInput}
            />
            {searchQuery && (
              <button type="button" className={styles.clearSearchBtn} onClick={() => setSearchQuery('')}>
                <X size={12} />
              </button>
            )}
          </div>

          <form className={styles.drawerCreateRow} onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="New board title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className={styles.drawerCreateInput}
            />
            <button type="submit" className={styles.drawerCreateBtn}>
              <Plus size={14} />
              <span>Create</span>
            </button>
          </form>
        </div>

        {/* Boards List / Grid */}
        <div className={styles.drawerBoardsGrid}>
          {filteredBoards.length === 0 ? (
            <div className={styles.emptySearchState}>
              <Layers size={32} style={{ color: 'var(--vg-text-subtle, #787880)' }} />
              <p>No whiteboards found matching "{searchQuery}"</p>
              <button
                type="button"
                className={styles.resetSearchBtn}
                onClick={() => {
                  setSearchQuery('');
                  onCreateBoard(searchQuery || 'New Whiteboard');
                }}
              >
                Create "{searchQuery}"
              </button>
            </div>
          ) : (
            filteredBoards.map((board) => {
              const isActive = board.id === activeBoardId;
              const isEditing = editingId === board.id;
              const isConfirmingDelete = confirmDeleteId === board.id;

              return (
                <article
                  key={board.id}
                  className={`${styles.boardCard} ${isActive ? styles.boardCardActive : ''}`}
                >
                  <div className={styles.boardCardTop}>
                    <div className={styles.boardCardTitleWrap}>
                      {isEditing ? (
                        <div className={styles.cardRenameForm}>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveRename(board.id);
                              if (e.key === 'Escape') setEditingId(null);
                            }}
                            autoFocus
                            className={styles.cardRenameInput}
                          />
                          <button
                            type="button"
                            className={styles.cardRenameSave}
                            onClick={() => saveRename(board.id)}
                            title="Save title"
                          >
                            <Check size={13} />
                          </button>
                        </div>
                      ) : (
                        <h3
                          className={styles.boardCardTitle}
                          onClick={() => {
                            onSwitchBoard(board.id);
                            onClose();
                          }}
                          title="Open this whiteboard"
                        >
                          {board.title}
                          {isActive && <span className={styles.activePillTag}>Active</span>}
                        </h3>
                      )}
                    </div>

                    {!isEditing && (
                      <button
                        type="button"
                        className={styles.cardIconBtn}
                        onClick={() => startRename(board)}
                        title="Rename"
                      >
                        <Edit2 size={13} />
                      </button>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className={styles.boardCardMeta}>
                    <span className={styles.metaItem}>
                      <span className={styles.metaDot}>•</span>
                      <strong>{board.elementCount || 0}</strong> items
                    </span>
                    <span className={styles.metaItem}>
                      <Calendar size={11} />
                      {new Date(board.updatedAt).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {/* Actions Footer */}
                  <div className={styles.boardCardFooter}>
                    <button
                      type="button"
                      className={`${styles.cardOpenBtn} ${isActive ? styles.cardOpenBtnActive : ''}`}
                      onClick={() => {
                        onSwitchBoard(board.id);
                        onClose();
                      }}
                    >
                      <span>{isActive ? 'Current Canvas' : 'Open Board'}</span>
                    </button>

                    <div className={styles.cardFooterActions}>
                      <button
                        type="button"
                        className={styles.cardActionBtn}
                        onClick={() => onDuplicateBoard(board.id)}
                        title="Duplicate this whiteboard"
                      >
                        <Copy size={13} />
                      </button>

                      <button
                        type="button"
                        className={styles.cardActionBtn}
                        onClick={() => onExportBoard(board.id)}
                        title="Export as .excalidraw JSON"
                      >
                        <Download size={13} />
                      </button>

                      {isConfirmingDelete ? (
                        <div className={styles.deleteConfirmWrap}>
                          <button
                            type="button"
                            className={styles.deleteConfirmYes}
                            onClick={() => {
                              onDeleteBoard(board.id);
                              setConfirmDeleteId(null);
                            }}
                            title="Confirm delete"
                          >
                            Delete?
                          </button>
                          <button
                            type="button"
                            className={styles.deleteConfirmCancel}
                            onClick={() => setConfirmDeleteId(null)}
                            title="Cancel"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className={styles.cardDeleteBtn}
                          onClick={() => setConfirmDeleteId(board.id)}
                          title="Delete whiteboard"
                          disabled={boards.length <= 1}
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

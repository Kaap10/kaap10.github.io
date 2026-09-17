import React, { useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { 
  Layers, 
  ChevronDown, 
  Plus, 
  Cloud, 
  RefreshCw, 
  FolderOpen, 
  Edit3, 
  Check, 
  X,
  LayoutGrid,
  User,
  LogIn
} from 'lucide-react';
import styles from './styles.module.css';

export default function BoardHeader({
  boards,
  activeBoardMeta,
  syncStatus,
  currentUser,
  onSwitchBoard,
  onCreateBoard,
  onRenameBoard,
  onOpenDrawer,
  onOpenAuthModal,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (activeBoardMeta) {
      setTempTitle(activeBoardMeta.title || 'Untitled Whiteboard');
    }
  }, [activeBoardMeta]);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingTitle]);

  // Click outside listener for dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setIsQuickCreateOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTitleSubmit = () => {
    if (tempTitle.trim() && activeBoardMeta) {
      onRenameBoard(activeBoardMeta.id, tempTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleQuickCreate = (e) => {
    e.preventDefault();
    if (newBoardName.trim()) {
      onCreateBoard(newBoardName.trim());
      setNewBoardName('');
      setIsQuickCreateOpen(false);
      setDropdownOpen(false);
    }
  };

  return (
    <header className={styles.boardHeaderFloating}>
      {/* 1. Hub Navigation */}
      <Link to="/workspace" className={styles.hubLink} title="Return to DevWorkspace Hub">
        <Layers size={14} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
        <span className={styles.hubLinkText}>Workspace</span>
      </Link>

      <span className={styles.headerDivider} />

      {/* 2. Board Selector Dropdown */}
      <div className={styles.boardDropdownWrapper} ref={dropdownRef}>
        {isEditingTitle ? (
          <div className={styles.inlineRenameForm}>
            <input
              ref={inputRef}
              type="text"
              className={styles.inlineRenameInput}
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleTitleSubmit();
                if (e.key === 'Escape') setIsEditingTitle(false);
              }}
              maxLength={40}
            />
            <button className={styles.inlineRenameBtn} onClick={handleTitleSubmit} title="Save">
              <Check size={12} />
            </button>
            <button className={styles.inlineRenameBtn} onClick={() => setIsEditingTitle(false)} title="Cancel">
              <X size={12} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={styles.activeBoardPill}
            onClick={() => setDropdownOpen((prev) => !prev)}
            title="Click to switch or manage whiteboards"
          >
            {/* Sync Dot Status indicator inside pill */}
            {syncStatus === 'saving' ? (
              <RefreshCw size={10} className={styles.spinIcon} title="Saving changes..." />
            ) : syncStatus === 'synced' ? (
              <Cloud size={11} style={{ color: '#4ade80' }} title="Synced to Supabase Cloud" />
            ) : (
              <span className={styles.savedDot} title="Saved in local browser cache" />
            )}

            <span className={styles.activeBoardTitle}>
              {activeBoardMeta?.title || 'Main Whiteboard'}
            </span>

            <ChevronDown 
              size={12} 
              className={`${styles.dropdownChevron} ${dropdownOpen ? styles.dropdownChevronOpen : ''}`} 
            />
          </button>
        )}

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className={styles.boardDropdownMenu}>
            <div className={styles.dropdownHeader}>
              <span>Your Whiteboards ({boards.length})</span>
              <button
                type="button"
                className={styles.dropdownManageBtn}
                onClick={() => {
                  setDropdownOpen(false);
                  onOpenDrawer();
                }}
              >
                <LayoutGrid size={11} />
                <span>All Boards</span>
              </button>
            </div>

            <div className={styles.dropdownList}>
              {boards.map((b) => {
                const isActive = b.id === activeBoardMeta?.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    className={`${styles.dropdownItem} ${isActive ? styles.dropdownItemActive : ''}`}
                    onClick={() => {
                      onSwitchBoard(b.id);
                      setDropdownOpen(false);
                    }}
                  >
                    <div className={styles.dropdownItemLeft}>
                      <span className={styles.dropdownItemTitle}>{b.title}</span>
                      <span className={styles.dropdownItemMeta}>
                        {b.elementCount || 0} items • {new Date(b.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    {isActive && <Check size={13} className={styles.activeCheckIcon} />}
                  </button>
                );
              })}
            </div>

            {isQuickCreateOpen ? (
              <form className={styles.dropdownCreateForm} onSubmit={handleQuickCreate}>
                <input
                  type="text"
                  placeholder="Board name (e.g. DSA, System Design)..."
                  className={styles.dropdownCreateInput}
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  autoFocus
                />
                <div className={styles.dropdownCreateActions}>
                  <button type="submit" className={styles.dropdownCreateSubmit}>Create</button>
                  <button type="button" className={styles.dropdownCreateCancel} onClick={() => setIsQuickCreateOpen(false)}>Cancel</button>
                </div>
              </form>
            ) : (
              <div className={styles.dropdownBottomActions}>
                <button
                  type="button"
                  className={styles.dropdownNewBtn}
                  onClick={() => setIsQuickCreateOpen(true)}
                >
                  <Plus size={13} />
                  <span>New Board</span>
                </button>
                <button
                  type="button"
                  className={styles.dropdownRenameBtn}
                  onClick={() => {
                    setDropdownOpen(false);
                    setIsEditingTitle(true);
                  }}
                  title="Rename active board"
                >
                  <Edit3 size={12} />
                  <span>Rename</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <span className={styles.headerDivider} />

      {/* 3. Action Buttons */}
      <button
        type="button"
        className={styles.quickActionBtn}
        onClick={() => onCreateBoard('Untitled Whiteboard')}
        title="Create new whiteboard"
      >
        <Plus size={13} />
        <span>New</span>
      </button>

      <button
        type="button"
        className={styles.quickActionBtn}
        onClick={onOpenDrawer}
        title="Open Whiteboard Manager"
      >
        <FolderOpen size={13} />
        <span>Boards</span>
      </button>

      {/* 4. Auth / Cloud Sync Status Button */}
      {onOpenAuthModal && (
        <>
          <span className={styles.headerDivider} />
          <button
            type="button"
            className={`${styles.quickActionBtn} ${currentUser ? styles.authPillConnected : ''}`}
            onClick={onOpenAuthModal}
            title={currentUser ? `Logged in as ${currentUser.email} (Click for Account)` : 'Sign in to sync whiteboards across devices'}
          >
            {currentUser ? (
              <>
                <span className={styles.userInitialBadge}>
                  {currentUser.user_metadata?.full_name
                    ? currentUser.user_metadata.full_name.charAt(0).toUpperCase()
                    : currentUser.email?.charAt(0).toUpperCase() || 'U'}
                </span>
                <span className={styles.authBtnText}>Account</span>
              </>
            ) : (
              <>
                <LogIn size={13} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
                <span className={styles.authBtnText}>Sign In</span>
              </>
            )}
          </button>
        </>
      )}
    </header>
  );
}

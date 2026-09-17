import React, { useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import {
  ArrowLeft,
  BookOpen,
  Plus,
  FolderPlus,
  Download,
  Upload,
  User,
  CheckCircle2,
  RefreshCw,
  WifiOff,
  SidebarClose,
  SidebarOpen,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import styles from './styles.module.css';

export default function NotebookHeader({
  syncStatus,
  currentUser,
  onOpenSettings,
  onSignOut,
  onNewNotebook,
  onNewNote,
  onExportBackup,
  onImportBackup,
  isNotebooksOpen,
  onToggleNotebooks,
  isPagesOpen,
  onTogglePages,
}) {
  const fileInputRef = useRef(null);
  const userMenuRef = useRef(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (content && typeof content === 'string') {
        onImportBackup(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  const userName = currentUser?.user_metadata?.full_name || currentUser?.email?.split('@')[0] || 'User';
  const userEmail = currentUser?.email || '';
  const userInitial = (userName.charAt(0) || currentUser?.email?.charAt(0) || 'U').toUpperCase();

  return (
    <header className={styles.headerBar}>
      {/* Left Area: Back Button, Dual Sidebar Toggles & App Brand */}
      <div className={styles.headerLeft}>
        <Link to="/workspace" className={styles.backBtn} title="Return to DevWorkspace Hub">
          <ArrowLeft size={14} />
          <span>Workspace</span>
        </Link>

        {/* Toggle 1: Notebooks Stacks */}
        <button
          type="button"
          className={`${styles.iconBtn} ${!isNotebooksOpen ? styles.iconBtnInactive : ''}`}
          onClick={onToggleNotebooks}
          title={isNotebooksOpen ? 'Hide Notebooks Sidebar' : 'Show Notebooks Sidebar'}
        >
          {isNotebooksOpen ? <SidebarClose size={15} /> : <SidebarOpen size={15} />}
        </button>

        {/* Toggle 2: All Pages Index Sidebar */}
        <button
          type="button"
          className={`${styles.iconBtn} ${!isPagesOpen ? styles.iconBtnInactive : ''}`}
          onClick={onTogglePages}
          title={isPagesOpen ? 'Hide All Pages Sidebar' : 'Show All Pages Sidebar'}
        >
          {isPagesOpen ? <PanelLeftClose size={15} /> : <PanelLeftOpen size={15} />}
        </button>

        <div className={styles.headerDivider} />

        <div className={styles.appBrand}>
          <BookOpen size={16} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
          <span>Notebook</span>
        </div>
      </div>

      {/* Right Area: Sync Status, Actions & User Profile */}
      <div className={styles.headerRight}>
        {/* Sync Status Badge */}
        <div className={styles.syncBadge}>
          {syncStatus === 'synced' && (
            <>
              <CheckCircle2 size={12} style={{ color: '#22c55e' }} />
              <span>Synced</span>
            </>
          )}
          {syncStatus === 'saving' && (
            <>
              <RefreshCw size={12} className={styles.spinIcon} style={{ color: '#faad14' }} />
              <span>Saving...</span>
            </>
          )}
          {syncStatus === 'offline' && (
            <>
              <WifiOff size={12} style={{ color: '#787880' }} />
              <span>Offline</span>
            </>
          )}
        </div>

        {/* Hidden File Input for Import */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".json"
          onChange={handleFileChange}
        />

        {/* Backup Export / Import */}
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onExportBackup}
          title="Backup all notes (JSON)"
        >
          <Download size={15} />
        </button>

        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => fileInputRef.current?.click()}
          title="Import backup (JSON)"
        >
          <Upload size={15} />
        </button>

        <div className={styles.headerDivider} />

        {/* Create Notebook & Note Actions */}
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onNewNotebook}
          title="Create a new notebook stack"
        >
          <FolderPlus size={14} />
          <span>New Notebook</span>
        </button>

        <button
          type="button"
          className={styles.btnPrimary}
          onClick={onNewNote}
          title="Create a new note page"
        >
          <Plus size={15} />
          <span>New Note</span>
        </button>

        <div className={styles.headerDivider} />

        {/* User Account Pill & Dropdown Menu */}
        {currentUser ? (
          <div className={styles.userSection} ref={userMenuRef}>
            <button
              type="button"
              className={styles.accountPill}
              onClick={() => setUserMenuOpen((prev) => !prev)}
              title={`Account: ${userName} (${userEmail})`}
            >
              <div className={styles.accountAvatar}>{userInitial}</div>
              <span className={styles.accountName}>{userName}</span>
              <ChevronDown size={13} style={{ color: 'var(--vg-text-muted)', marginLeft: '2px' }} />
            </button>

            {/* Quick direct Settings button */}
            <button
              type="button"
              className={styles.iconBtn}
              onClick={onOpenSettings}
              title="Supabase Settings & Credentials"
            >
              <Settings size={15} />
            </button>

            {/* Quick direct Sign Out button */}
            <button
              type="button"
              className={styles.iconBtn}
              onClick={onSignOut}
              title="Sign Out"
              style={{ color: 'var(--vg-accent, #FF4D4F)' }}
            >
              <LogOut size={15} />
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <div className={styles.accountDropdown}>
                <div className={styles.dropdownHeader}>
                  <div className={styles.dropdownAvatar}>{userInitial}</div>
                  <div className={styles.dropdownUserInfo}>
                    <span className={styles.dropdownUserName} title={userName}>{userName}</span>
                    <span className={styles.dropdownUserEmail} title={userEmail}>{userEmail}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.dropdownItem}
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenSettings();
                  }}
                >
                  <Settings size={14} />
                  <span>Supabase Settings</span>
                </button>

                <div className={styles.dropdownDivider} />

                <button
                  type="button"
                  className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                  onClick={() => {
                    setUserMenuOpen(false);
                    onSignOut();
                  }}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={onOpenSettings}
            title="Configure Supabase / Sign In"
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
          >
            <User size={14} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}

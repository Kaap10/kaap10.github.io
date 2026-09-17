import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { useAuth } from './context/AuthContext';
import { useTracker } from './context/TrackerContext';
import {
  IconDashboard,
  IconTasks,
  IconGoals,
  IconFocus,
  IconHabit,
  IconProgress,
  IconLogOut,
  IconUser,
  IconSearch,
  IconSidebarCollapse,
  IconSidebarExpand,
  IconArrowLeft,
} from './components/Common/Icons';
import styles from './styles/tracker.module.css';

export default function TrackerLayout({ children }) {
  const { user, signOut } = useAuth();
  const { activeTab, setActiveTab, error, refreshData, setSearchModalOpen } = useTracker();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tracker_sidebar_collapsed') === 'true';
    }
    return false;
  });

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('tracker_sidebar_collapsed', String(next));
      }
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      const isInput = tag === 'input' || tag === 'textarea' || document.activeElement?.isContentEditable;
      if (!isInput && (e.key === '[' || (e.ctrlKey && e.key === '\\') || (e.metaKey && e.key === '\\'))) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Today', icon: IconDashboard },
    { id: 'tasks', label: 'Tasks', icon: IconTasks },
    { id: 'goals', label: 'Goals', icon: IconGoals },
    { id: 'habits', label: 'Habits', icon: IconHabit },
    { id: 'focus', label: 'Focus', icon: IconFocus },
    { id: 'progress', label: 'Insights', icon: IconProgress },
  ];

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';

  return (
    <div className={styles.trackerContainer}>
      {/* Desktop Sticky Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
        <div>
          {/* Top Bar: Back to Workspace & Sidebar Toggle */}
          <div className={styles.sidebarHeader}>
            <Link to="/workspace" className={styles.backBtn} title="Return to DevWorkspace Hub">
              <IconArrowLeft size={14} />
              <span>Workspace</span>
            </Link>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={toggleSidebar}
              title="Hide Sidebar ([)"
              style={{ color: 'var(--vg-text-muted)', padding: '0.2rem' }}
            >
              <IconSidebarCollapse size={16} />
            </button>
          </div>

          {/* Workspace Brand Header */}
          <div className={styles.brandTitle} style={{ padding: '0 0.5rem 0.85rem' }}>
            <IconDashboard size={16} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
            <span>Tracker</span>
          </div>

          {/* Navigation Links */}
          <nav className={styles.navMenu}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className={styles.sidebarFooter}>
          <div className={styles.userCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--vg-surface-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--vg-text-muted)',
                  flexShrink: 0,
                }}
              >
                <IconUser size={14} />
              </div>
              <div className={styles.userInfo}>
                <span className={styles.userName} title={userName}>{userName}</span>
                <span className={styles.userEmail} title={userEmail}>{userEmail}</span>
              </div>
            </div>

            <button
              type="button"
              className={styles.iconBtn}
              onClick={signOut}
              title="Sign Out"
              style={{ color: 'var(--vg-accent)', flexShrink: 0 }}
            >
              <IconLogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header Bar */}
      <header className={styles.mobileHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Link to="/workspace" className={styles.backBtn} title="Return to DevWorkspace Hub">
            <IconArrowLeft size={14} />
            <span>Workspace</span>
          </Link>
          <div className={styles.brandTitle} style={{ fontSize: '0.88rem', fontWeight: 600 }}>
            <IconDashboard size={16} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
            <span>Tracker</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => setSearchModalOpen(true)}
            title="Search (Cmd+K / Ctrl+K)"
            style={{ padding: '0.45rem', border: '1px solid var(--vg-border)', borderRadius: 'var(--vg-radius-sm)' }}
          >
            <IconSearch size={16} />
          </button>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={signOut}
            title={`Sign Out (${userName})`}
            style={{ color: 'var(--vg-accent)', padding: '0.45rem', border: '1px solid var(--vg-border)', borderRadius: 'var(--vg-radius-sm)' }}
          >
            <IconLogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main View Area */}
      <main className={styles.mainContent}>
        {sidebarCollapsed && (
          <div style={{ position: 'fixed', top: '16px', left: '16px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 30 }}>
            <Link to="/workspace" className={styles.sidebarExpandBtn} style={{ position: 'static' }} title="Return to DevWorkspace Hub">
              <IconArrowLeft size={14} />
              <span>Workspace</span>
            </Link>
            <button
              type="button"
              className={styles.sidebarExpandBtn}
              style={{ position: 'static' }}
              onClick={toggleSidebar}
              title="Expand Sidebar ([)"
              aria-label="Expand Sidebar"
            >
              <IconSidebarExpand size={15} />
              <span>Sidebar</span>
            </button>
          </div>
        )}
        {error && (
          <div
            style={{
              background: 'rgba(255, 77, 79, 0.12)',
              border: '1px solid var(--vg-accent-border)',
              borderRadius: 'var(--vg-radius-sm)',
              padding: '0.85rem 1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              fontSize: '0.85rem',
              color: 'var(--vg-accent)',
            }}
          >
            <span>{error}</span>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={refreshData}
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
            >
              Retry
            </button>
          </div>
        )}
        {children}
      </main>

      {/* Mobile Bottom Navigation (Clean 5 items) */}
      <nav className={styles.mobileNav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`${styles.mobileNavItem} ${isActive ? styles.mobileNavItemActive : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}
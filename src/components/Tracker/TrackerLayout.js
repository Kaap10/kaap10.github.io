import React from 'react';
import { useAuth } from './context/AuthContext';
import { useTracker } from './context/TrackerContext';
import {
  IconDashboard,
  IconTasks,
  IconGoals,
  IconFocus,
  IconHabit,
  IconCalendar,
  IconResources,
  IconProgress,
  IconReview,
  IconStats,
  IconLogOut,
  IconUser,
  IconSearch,
} from './components/Common/Icons';
import styles from './styles/tracker.module.css';

export default function TrackerLayout({ children }) {
  const { user, signOut } = useAuth();
  const { activeTab, setActiveTab, error, refreshData, setSearchModalOpen } = useTracker();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: IconDashboard },
    { id: 'tasks', label: 'Tasks', icon: IconTasks },
    { id: 'goals', label: 'Goals', icon: IconGoals },
    { id: 'focus', label: 'Focus Mode', icon: IconFocus },
    { id: 'habits', label: 'Habits', icon: IconHabit },
    { id: 'calendar', label: 'Calendar', icon: IconCalendar },
    { id: 'resources', label: 'Resources', icon: IconResources },
    { id: 'progress', label: 'Analytics', icon: IconProgress },
    { id: 'reviews', label: 'Reviews', icon: IconReview },
    { id: 'stats', label: 'Statistics', icon: IconStats },
  ];

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';

  return (
    <div className={styles.trackerContainer}>
      {/* Desktop Sticky Sidebar */}
      <aside className={styles.sidebar}>
        <div>
          {/* Workspace Brand / Header */}
          <div className={styles.sidebarHeader}>
            <div className={styles.brandTitle}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--vg-accent)',
                  boxShadow: '0 0 10px var(--vg-accent)',
                }}
              />
              <span>Productivity OS</span>
            </div>
            <span className={styles.badge}>V2.0</span>
          </div>

          {/* Quick Search Trigger */}
          <div style={{ padding: '0 0.85rem 0.65rem 0.85rem' }}>
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--vg-radius-sm)',
                background: 'var(--vg-surface-strong)',
                border: '1px solid var(--vg-border)',
                color: 'var(--vg-text-muted)',
                fontSize: '0.78rem',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <IconSearch size={14} />
                <span>Search...</span>
              </div>
              <kbd style={{ fontSize: '0.68rem', padding: '0.1rem 0.35rem', background: 'var(--vg-surface)', borderRadius: '3px', border: '1px solid var(--vg-border)' }}>
                {typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform) ? '⌘K' : 'Ctrl+K'}
              </kbd>
            </button>
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

      {/* Main View Area */}
      <main className={styles.mainContent}>
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

      {/* Mobile Bottom Navigation */}
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

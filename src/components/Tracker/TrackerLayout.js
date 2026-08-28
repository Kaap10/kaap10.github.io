import React from 'react';
import { useAuth } from './context/AuthContext';
import { useTracker } from './context/TrackerContext';
import {
  IconDashboard,
  IconTasks,
  IconGoals,
  IconResources,
  IconProgress,
  IconLogOut,
  IconUser,
} from './components/Common/Icons';
import styles from './styles/tracker.module.css';

export default function TrackerLayout({ children }) {
  const { user, signOut } = useAuth();
  const { activeTab, setActiveTab, error, refreshData } = useTracker();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: IconDashboard },
    { id: 'tasks', label: 'Tasks', icon: IconTasks },
    { id: 'goals', label: 'Goals', icon: IconGoals },
    { id: 'resources', label: 'Resources', icon: IconResources },
    { id: 'progress', label: 'Progress', icon: IconProgress },
  ];

  const userName = user?.user_metadata?.full_name || 'Vardhman Gupta';
  const userEmail = user?.email || 'private';

  return (
    <div className={styles.trackerContainer}>
      {/* Desktop Sidebar */}
      <aside className={styles.sidebar}>
        <div>
          <div className={styles.sidebarHeader}>
            <div className={styles.brandBadge}>VG</div>
            <div>
              <div className={styles.brandTitle}>Tracker</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--vg-text-subtle)', fontFamily: 'monospace' }}>
                v1.0 private
              </div>
            </div>
          </div>

          <nav className={styles.navGroup}>
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                >
                  <IconComp size={17} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className={styles.sidebarFooter}>
          <div className={styles.userCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
              style={{ color: 'var(--vg-accent)' }}
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
      <nav className={styles.mobileBottomNav}>
        {navItems.map((item) => {
          const IconComp = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`${styles.mobileNavItem} ${isActive ? styles.mobileNavItemActive : ''}`}
            >
              <IconComp size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}


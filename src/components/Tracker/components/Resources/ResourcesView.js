import React, { useState, useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconStar,
  IconExternalLink,
  IconResources,
  IconType,
} from '../Common/Icons';
import EmptyState from '../Common/EmptyState';
import styles from '../../styles/tracker.module.css';

const TYPES = ['All', 'Website', 'YouTube', 'PDF', 'GitHub', 'Course', 'Book', 'Other'];
const CATEGORIES = ['All', 'Learning', 'System Design', 'AI/ML', 'DSA', 'Development', 'Documentation', 'Other'];

export default function ResourcesView() {
  const {
    resources,
    deleteResource,
    toggleResourceFavorite,
    setResourceModalOpen,
    setEditingResource,
    requestConfirmation,
  } = useTracker();

  const [typeFilter, setTypeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      if (onlyFavorites && !r.favorite) return false;
      if (typeFilter !== 'All' && r.type !== typeFilter) return false;
      if (categoryFilter !== 'All' && r.category !== categoryFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = r.title?.toLowerCase().includes(q);
        const descMatch = r.description?.toLowerCase().includes(q);
        const urlMatch = r.url?.toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !urlMatch) return false;
      }

      return true;
    });
  }, [resources, typeFilter, categoryFilter, searchQuery, onlyFavorites]);

  const handleDelete = (resource) => {
    requestConfirmation({
      title: 'Delete Resource',
      message: `Are you sure you want to remove "${resource.title}" from your resources vault?`,
      onConfirm: async () => {
        await deleteResource(resource.id);
      },
    });
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setResourceModalOpen(true);
  };

  return (
    <div>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitleArea}>
          <span className={styles.headerKicker}>Knowledge Vault</span>
          <h1 className={styles.headerTitle}>Resources</h1>
          <p className={styles.headerSubtitle}>
            Curate technical documentation, courses, books, and references.
          </p>
        </div>

        <button
          type="button"
          className={styles.btnPrimary}
          onClick={() => {
            setEditingResource(null);
            setResourceModalOpen(true);
          }}
        >
          <IconPlus size={16} />
          <span>Add Resource</span>
        </button>
      </div>

      {/* Filter / Search Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Type selector & Favorites toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'inline-flex',
              background: 'var(--vg-surface)',
              padding: '0.25rem',
              borderRadius: 'var(--vg-radius-sm)',
              border: '1px solid var(--vg-border)',
              gap: '0.2rem',
            }}
          >
            {['All', 'YouTube', 'PDF', 'GitHub', 'Course', 'Book'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: typeFilter === t ? 'var(--vg-bg-elevated)' : 'transparent',
                  color: typeFilter === t ? 'var(--vg-text)' : 'var(--vg-text-muted)',
                  transition: 'all 150ms ease',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={onlyFavorites ? styles.btnPrimary : styles.btnSecondary}
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
          >
            <IconStar size={14} filled={onlyFavorites} />
            <span>Favorites</span>
          </button>
        </div>

        {/* Right side search and category dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexGrow: 1, maxWidth: '420px' }}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={styles.select}
            style={{ padding: '0.45rem 0.65rem', fontSize: '0.82rem', width: '140px' }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <div style={{ position: 'relative', width: '100%' }}>
            <span
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--vg-text-subtle)',
                display: 'flex',
              }}
            >
              <IconSearch size={14} />
            </span>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.input}
              style={{ paddingLeft: '2rem', fontSize: '0.82rem' }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Resources */}
      {filteredResources.length === 0 ? (
        <EmptyState
          icon={<IconResources size={22} />}
          title="No resources found"
          description="Save YouTube guides, papers, repos, and documentation to build your reference hub."
          actionLabel="Add Resource"
          onAction={() => {
            setEditingResource(null);
            setResourceModalOpen(true);
          }}
        />
      ) : (
        <div className={styles.resourceGrid}>
          {filteredResources.map((res) => (
            <div key={res.id} className={styles.resourceCard}>
              <div>
                <div className={styles.resourceHeader}>
                  <div className={styles.resourceTypeIcon}>
                    <IconType type={res.type} size={16} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => toggleResourceFavorite(res.id)}
                      title={res.favorite ? 'Unfavorite' : 'Favorite'}
                      style={{ color: res.favorite ? '#faad14' : 'var(--vg-text-subtle)' }}
                    >
                      <IconStar size={16} filled={res.favorite} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => handleEdit(res)}
                      title="Edit"
                    >
                      <IconEdit size={14} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => handleDelete(res)}
                      title="Delete"
                      style={{ color: 'var(--vg-accent)' }}
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: '0.65rem' }}>
                  <h4 className={styles.resourceTitle}>{res.title}</h4>
                  {res.description && <p className={styles.resourceDesc}>{res.description}</p>}
                </div>
              </div>

              <div className={styles.resourceFooter}>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <span className={`${styles.badge} ${styles.badgeCategory}`}>{res.category}</span>
                  <span className={styles.badge} style={{ background: 'var(--vg-surface)', color: 'var(--vg-text-subtle)' }}>
                    {res.type}
                  </span>
                </div>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconBtn}
                  title="Open Resource"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: 'var(--vg-accent)',
                    fontSize: '0.78rem',
                    textDecoration: 'none',
                  }}
                >
                  <span>Open</span>
                  <IconExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


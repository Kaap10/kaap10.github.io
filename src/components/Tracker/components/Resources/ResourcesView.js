import React, { useState, useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';
import EmptyState from '../Common/EmptyState';
import {
  IconResources,
  IconPlus,
  IconSearch,
  IconStar,
  IconExternalLink,
  IconEdit,
  IconTrash,
  IconType,
  IconNote,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

const TYPES = ['All Types', 'Website', 'YouTube', 'PDF', 'GitHub', 'Course', 'Book', 'Other'];
const CATEGORIES = ['All Categories', 'Learning', 'System Design', 'AI/ML', 'DSA', 'Development', 'Documentation', 'Other'];

export default function ResourcesView() {
  const {
    resources,
    updateResource,
    deleteResource,
    setEditingResource,
    setResourceModalOpen,
    setActiveResourceForNotes,
    setNotesModalOpen,
    openConfirmModal,
  } = useTracker();

  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [activeTab, setActiveTab] = useState('all'); // all, favorites, reading, completed
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      if (activeTab === 'favorites' && !r.favorite) return false;
      if (activeTab === 'reading' && r.status !== 'in_progress') return false;
      if (activeTab === 'completed' && r.status !== 'completed') return false;

      if (selectedType !== 'All Types' && r.type !== selectedType) return false;
      if (selectedCategory !== 'All Categories' && r.category !== selectedCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = r.title?.toLowerCase().includes(q);
        const matchDesc = r.description?.toLowerCase().includes(q);
        const matchNotes = r.notes?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchNotes) return false;
      }

      return true;
    });
  }, [resources, activeTab, selectedType, selectedCategory, searchQuery]);

  const toggleFavorite = (resource) => {
    updateResource(resource.id, { favorite: !resource.favorite });
  };

  const handleDelete = (resource) => {
    openConfirmModal(
      'Delete Resource?',
      `Are you sure you want to remove "${resource.title}"?`,
      () => deleteResource(resource.id)
    );
  };

  return (
    <div className={styles.viewContainer}>
      {/* Header */}
      <div className={styles.viewHeader}>
        <div>
          <h1 className={styles.viewTitle}>Knowledge Vault & Resources</h1>
          <p className={styles.viewSubtitle}>
            Curate technical papers, video courses, documentation repos, and learning notes.
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

      {/* Filter Tabs & Search */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div className={styles.filterTabs}>
            {[
              { id: 'all', label: `All (${resources.length})` },
              { id: 'favorites', label: '★ Starred' },
              { id: 'reading', label: 'Currently Reading' },
              { id: 'completed', label: 'Finished' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                className={`${styles.filterTab} ${activeTab === t.id ? styles.filterTabActive : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '240px' }}>
            <input
              type="text"
              placeholder="Search resources & notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.input}
              style={{ paddingLeft: '2rem', height: '34px', fontSize: '0.82rem' }}
            />
            <span style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--vg-text-muted)', display: 'flex' }}>
              <IconSearch size={14} />
            </span>
          </div>
        </div>

        {/* Type & Category Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={styles.select}
            style={{ width: 'auto', height: '34px', fontSize: '0.82rem', padding: '0.2rem 0.6rem' }}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.select}
            style={{ width: 'auto', height: '34px', fontSize: '0.82rem', padding: '0.2rem 0.6rem' }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Resources */}
      {filteredResources.length === 0 ? (
        <EmptyState
          icon={IconResources}
          title="No resources found"
          description="Save links, documentation, research papers, and technical books."
          actionLabel="Add New Resource"
          onAction={() => {
            setEditingResource(null);
            setResourceModalOpen(true);
          }}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {filteredResources.map((res) => {
            return (
              <div key={res.id} className={styles.resourceCard}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--vg-radius-sm)',
                        background: 'var(--vg-surface-strong)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--vg-accent)',
                      }}
                    >
                      <IconType type={res.type} size={16} />
                    </div>
                    <div>
                      <span className={styles.categoryTag}>{res.category}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => toggleFavorite(res)}
                      title={res.favorite ? 'Unstar' : 'Star as Favorite'}
                      style={{ color: res.favorite ? '#faad14' : 'var(--vg-text-muted)' }}
                    >
                      <IconStar size={15} filled={res.favorite} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => {
                        setEditingResource(res);
                        setResourceModalOpen(true);
                      }}
                      title="Edit Resource"
                    >
                      <IconEdit size={14} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => handleDelete(res)}
                      title="Delete Resource"
                      style={{ color: 'var(--vg-accent)' }}
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: '0.75rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--vg-text)', lineHeight: '1.3' }}>
                    {res.title}
                  </h3>
                  {res.description && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', marginTop: '0.35rem', lineHeight: '1.4' }}>
                      {res.description}
                    </p>
                  )}
                </div>

                {/* Status & Notes Trigger */}
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--vg-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        padding: '0.12rem 0.45rem',
                        borderRadius: '3px',
                        background:
                          res.status === 'completed'
                            ? 'rgba(82, 196, 26, 0.12)'
                            : res.status === 'in_progress'
                            ? 'rgba(24, 144, 255, 0.12)'
                            : 'var(--vg-surface-strong)',
                        color:
                          res.status === 'completed'
                            ? '#52c41a'
                            : res.status === 'in_progress'
                            ? '#1890ff'
                            : 'var(--vg-text-muted)',
                        fontWeight: 600,
                      }}
                    >
                      {res.status === 'completed' ? 'Finished ✓' : res.status === 'in_progress' ? 'Reading' : 'Unread'}
                    </span>

                    <button
                      type="button"
                      className={styles.btnSecondary}
                      onClick={() => {
                        setActiveResourceForNotes(res);
                        setNotesModalOpen(true);
                      }}
                      style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <IconNote size={12} />
                      <span>{res.notes ? 'Notes ✓' : '+ Note'}</span>
                    </button>
                  </div>

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkBtn}
                    style={{ fontSize: '0.78rem' }}
                  >
                    <span>Open</span>
                    <IconExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

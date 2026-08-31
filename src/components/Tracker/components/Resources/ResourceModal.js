import React, { useState, useEffect } from 'react';
import { useTracker } from '../../context/TrackerContext';
import { IconClose, IconResources, IconAlertCircle } from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

const TYPES = ['Website', 'YouTube', 'PDF', 'GitHub', 'Course', 'Book', 'Other'];
const CATEGORIES = ['Learning', 'System Design', 'AI/ML', 'DSA', 'Development', 'Documentation', 'Other'];

export default function ResourceModal({ isOpen, onClose, initialData = null }) {
  const { createResource, updateResource } = useTracker();

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('Website');
  const [category, setCategory] = useState('Learning');
  const [description, setDescription] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
    if (initialData) {
      setTitle(initialData.title || '');
      setUrl(initialData.url || '');
      setType(initialData.type || 'Website');
      setCategory(initialData.category || 'Learning');
      setDescription(initialData.description || '');
      setFavorite(!!initialData.favorite);
    } else {
      setTitle('');
      setUrl('');
      setType('Website');
      setCategory('Learning');
      setDescription('');
      setFavorite(false);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!title.trim()) {
      setErrorMsg('Title is required.');
      return;
    }
    let cleanUrl = url.trim();
    if (!cleanUrl) {
      setErrorMsg('Resource URL is required.');
      return;
    }
    if (!/^https?:\/\//i.test(cleanUrl) && !cleanUrl.startsWith('/')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    setLoading(true);

    try {
      const payload = {
        title: title.trim(),
        url: cleanUrl,
        type,
        category,
        description: description.trim() || null,
        favorite,
      };


      if (initialData && initialData.id) {
        await updateResource(initialData.id, payload);
      } else {
        await createResource(payload);
      }
      onClose();
    } catch (err) {
      console.error('Error saving resource:', err);
      setErrorMsg(err.message || 'Failed to save resource. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--vg-accent)' }}>
              <IconResources size={18} />
            </span>
            <h3 className={styles.modalTitle}>{initialData ? 'Edit Resource' : 'Add Resource'}</h3>
          </div>
          <button type="button" className={styles.iconBtn} onClick={onClose}>
            <IconClose size={16} />
          </button>
        </div>

        {errorMsg && (
          <div
            style={{
              background: 'rgba(255, 77, 79, 0.12)',
              border: '1px solid var(--vg-accent-border)',
              borderRadius: 'var(--vg-radius-sm)',
              padding: '0.65rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.82rem',
              color: 'var(--vg-accent)',
            }}
          >
            <IconAlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Title *</label>
            <input
              type="text"
              placeholder="e.g. Designing Data-Intensive Applications"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Resource URL *</label>
            <input
              type="url"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.modalGridCols2}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={styles.select}
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.select}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Notes / Summary</label>
            <textarea
              placeholder="Key takeaways, chapters, or reference points..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              rows={3}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="resource-fav"
              checked={favorite}
              onChange={(e) => setFavorite(e.target.checked)}
              style={{ accentColor: 'var(--vg-accent)', width: '16px', height: '16px' }}
            />
            <label htmlFor="resource-fav" style={{ fontSize: '0.85rem', color: 'var(--vg-text)', cursor: 'pointer' }}>
              Mark as Favorite / Starred
            </label>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Add Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

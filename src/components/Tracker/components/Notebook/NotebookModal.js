import React, { useState, useEffect } from 'react';
import { useTracker } from '../../context/TrackerContext';
import {
  IconClose,
  IconNotebook,
  IconFolder,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

const ICONS = [
  { id: 'book', label: 'Book' },
  { id: 'folder', label: 'Folder' },
  { id: 'code', label: 'Code' },
  { id: 'target', label: 'Target' },
  { id: 'star', label: 'Star' },
  { id: 'sparkles', label: 'Sparkles' },
];

export default function NotebookModal({ isOpen, onClose, initialData = null }) {
  const { createNotebook, updateNotebook } = useTracker();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('book');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setIcon(initialData.icon || 'book');
    } else {
      setTitle('');
      setDescription('');
      setIcon('book');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      if (initialData && initialData.id) {
        await updateNotebook(initialData.id, {
          title: title.trim(),
          description: description.trim() || null,
          icon,
        });
      } else {
        await createNotebook({
          title: title.trim(),
          description: description.trim() || null,
          icon,
        });
      }
      onClose();
    } catch (err) {
      console.error('Error saving notebook:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            {initialData ? 'Edit Notebook' : 'Create New Notebook'}
          </h3>
          <button type="button" className={styles.iconBtn} onClick={onClose}>
            <IconClose size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Notebook Title *</label>
            <input
              type="text"
              placeholder="e.g. Distributed Systems, AI Architecture, Learning"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description (Optional)</label>
            <textarea
              placeholder="What knowledge or notes belong in this notebook?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              style={{ minHeight: '60px' }}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Icon</label>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {ICONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIcon(item.id)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--vg-radius-sm)',
                    border: '1px solid ' + (icon === item.id ? 'var(--vg-accent)' : 'var(--vg-border)'),
                    background: icon === item.id ? 'var(--vg-surface-strong)' : 'var(--vg-surface)',
                    color: icon === item.id ? 'var(--vg-accent)' : 'var(--vg-text-muted)',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.btnSecondary} onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary} disabled={loading || !title.trim()}>
              {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Create Notebook'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

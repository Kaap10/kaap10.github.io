import React from 'react';
import { IconAlertCircle, IconClose } from './Icons';
import styles from '../../styles/tracker.module.css';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onClose, confirmLabel = 'Delete', danger = true }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
        <div className={styles.modalHeader}>
          <div style={{ display: 'flex', alignItem: 'center', gap: '0.5rem' }}>
            <span style={{ color: danger ? 'var(--vg-accent)' : 'var(--vg-text)' }}>
              <IconAlertCircle size={20} />
            </span>
            <h3 className={styles.modalTitle}>{title || 'Confirm Action'}</h3>
          </div>
          <button className={styles.iconBtn} onClick={onClose}>
            <IconClose size={16} />
          </button>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--vg-text-muted)', lineHeight: '1.5', margin: 0 }}>
          {message || 'Are you sure you want to proceed? This action cannot be undone.'}
        </p>

        <div className={styles.modalActions}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={danger ? styles.btnDanger : styles.btnPrimary}
            onClick={() => {
              if (onConfirm) onConfirm();
              if (onClose) onClose();
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}


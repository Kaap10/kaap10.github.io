import React from 'react';
import { IconPlus } from './Icons';
import styles from '../../styles/tracker.module.css';

export default function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
        background: 'var(--vg-surface)',
        borderRadius: 'var(--vg-radius-md)',
        border: '1px dashed var(--vg-border)',
        gap: '0.75rem',
        width: '100%',
      }}
    >
      {icon && (
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--vg-surface-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--vg-accent)',
            marginBottom: '0.25rem',
          }}
        >
          {icon}
        </div>
      )}
      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: 'var(--vg-text)' }}>
        {title || 'No items yet'}
      </h4>
      <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--vg-text-muted)', maxWidth: '340px' }}>
        {description || 'Get started by creating your first entry.'}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={onAction}
          style={{ marginTop: '0.5rem' }}
        >
          <IconPlus size={15} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}


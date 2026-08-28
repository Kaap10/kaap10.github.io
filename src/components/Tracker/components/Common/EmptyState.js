import React from 'react';
import { IconPlus, IconSparkles } from './Icons';
import styles from '../../styles/tracker.module.css';

export default function EmptyState({ icon, title, description, actionLabel, onAction }) {
  // Render icon whether passed as a React component function or JSX element
  const renderIcon = () => {
    if (!icon) {
      return <IconSparkles size={22} />;
    }
    if (React.isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === 'function') {
      const IconComponent = icon;
      return <IconComponent size={22} />;
    }
    return <IconSparkles size={22} />;
  };

  // Clean label to prevent duplicate "+" icons
  const cleanLabel = actionLabel ? actionLabel.replace(/^\+\s*/, '') : '';

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
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'rgba(255, 77, 79, 0.08)',
          border: '1px solid rgba(255, 77, 79, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--vg-accent)',
          marginBottom: '0.25rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        {renderIcon()}
      </div>

      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: 'var(--vg-text)' }}>
        {title || 'No items yet'}
      </h4>

      <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--vg-text-muted)', maxWidth: '360px', lineHeight: 1.4 }}>
        {description || 'Get started by creating your first entry.'}
      </p>

      {cleanLabel && onAction && (
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={onAction}
          style={{ marginTop: '0.5rem' }}
        >
          <IconPlus size={15} />
          <span>{cleanLabel}</span>
        </button>
      )}
    </div>
  );
}

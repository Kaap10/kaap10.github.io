import React from 'react';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Terminal,
  Table,
  Minus,
  Link2,
  Heading1,
  Heading2,
  Heading3,
  Columns,
  Eye,
  Edit3,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import styles from './styles.module.css';

export default function NotebookToolbar({
  viewMode,
  setViewMode,
  isFullscreen,
  onToggleFullscreen,
  onApplyFormat,
}) {
  return (
    <div className={styles.toolbarRibbon}>
      {/* Format Group 1: Headings & Text Styles */}
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('h1')}
          title="Heading 1 (# Title)"
        >
          <Heading1 size={15} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('h2')}
          title="Heading 2 (## Title)"
        >
          <Heading2 size={15} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('h3')}
          title="Heading 3 (### Title)"
        >
          <Heading3 size={15} />
        </button>

        <div className={styles.toolbarDivider} />

        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('bold')}
          title="Bold (Ctrl+B)"
        >
          <Bold size={14} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('italic')}
          title="Italic (Ctrl+I)"
        >
          <Italic size={14} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('strikethrough')}
          title="Strikethrough (~~text~~)"
        >
          <Strikethrough size={14} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('inline-code')}
          title="Inline Code (`code`)"
        >
          <Code size={14} />
        </button>
      </div>

      <div className={styles.toolbarDivider} />

      {/* Format Group 2: Lists & Checklists */}
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('task')}
          title="Interactive Task List (- [ ] task)"
        >
          <CheckSquare size={14} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('bullet')}
          title="Bullet List (- item)"
        >
          <List size={14} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('number')}
          title="Numbered List (1. item)"
        >
          <ListOrdered size={14} />
        </button>
      </div>

      <div className={styles.toolbarDivider} />

      {/* Format Group 3: Blocks, Quotes, Tables & Links */}
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('quote')}
          title="Blockquote (> quote)"
        >
          <Quote size={14} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('code-block')}
          title="Code Block (```js)"
        >
          <Terminal size={14} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('table')}
          title="Insert Markdown Table"
        >
          <Table size={14} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('hr')}
          title="Horizontal Rule (---)"
        >
          <Minus size={14} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => onApplyFormat('link')}
          title="Insert Link ([text](url))"
        >
          <Link2 size={14} />
        </button>
      </div>

      {/* View Mode & Focus Controls on the Right */}
      <div className={styles.toolbarRight}>
        <div className={styles.viewModePill}>
          <button
            type="button"
            className={`${styles.viewModeBtn} ${viewMode === 'edit' ? styles.viewModeBtnActive : ''}`}
            onClick={() => setViewMode('edit')}
            title="Editor Mode"
          >
            <Edit3 size={13} />
            <span>Edit</span>
          </button>
          <button
            type="button"
            className={`${styles.viewModeBtn} ${viewMode === 'split' ? styles.viewModeBtnActive : ''}`}
            onClick={() => setViewMode('split')}
            title="Split Side-by-Side View"
          >
            <Columns size={13} />
            <span>Split</span>
          </button>
          <button
            type="button"
            className={`${styles.viewModeBtn} ${viewMode === 'preview' ? styles.viewModeBtnActive : ''}`}
            onClick={() => setViewMode('preview')}
            title="Rendered Document Preview"
          >
            <Eye size={13} />
            <span>Preview</span>
          </button>
        </div>

        <div className={styles.toolbarDivider} />

        <button
          type="button"
          className={`${styles.toolbarBtn} ${isFullscreen ? styles.toolbarBtnActive : ''}`}
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Exit Browser Fullscreen (Esc)' : 'Enter Browser Fullscreen (F11)'}
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>
    </div>
  );
}


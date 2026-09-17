import React from 'react';
import styles from './styles.module.css';

/**
 * Lightweight, fast Markdown renderer tailored for Developer Notebook
 * Supports Headings, Bold, Italic, Strikethrough, Code blocks, Inline code,
 * Blockquotes, Interactive Task Checkboxes, Tables, Bullet & Numbered lists, and Links.
 */
export default function MarkdownRenderer({ content, onToggleTask }) {
  if (!content || !content.trim()) {
    return (
      <div className={styles.emptyPreview}>
        <p>No content to preview. Start writing in the editor.</p>
      </div>
    );
  }

  const lines = content.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockLines = [];
  let inTable = false;
  let tableHeader = [];
  let tableRows = [];

  const flushTable = (key) => {
    if (inTable && tableHeader.length > 0) {
      elements.push(
        <div key={`table-${key}`} className={styles.previewTableWrapper}>
          <table className={styles.previewTable}>
            <thead>
              <tr>
                {tableHeader.map((th, i) => (
                  <th key={i}>{parseInline(th.trim())}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((td, cIdx) => (
                    <td key={cIdx}>{parseInline(td.trim())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      inTable = false;
      tableHeader = [];
      tableRows = [];
    }
  };

  const flushCodeBlock = (key) => {
    if (inCodeBlock) {
      elements.push(
        <pre key={`code-${key}`} className={styles.previewCodeBlock}>
          {codeBlockLang && <span className={styles.previewCodeLang}>{codeBlockLang}</span>}
          <code>{codeBlockLines.join('\n')}</code>
        </pre>
      );
      inCodeBlock = false;
      codeBlockLang = '';
      codeBlockLines = [];
    }
  };

  const parseInline = (text) => {
    if (!text) return text;
    // Replace inline code, bold, italic, links, strikethrough
    const parts = [];
    let remaining = text;
    let partKey = 0;

    // Regex for inline patterns: `code`, **bold**, *italic*, ~~strikethrough~~, [text](url)
    const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|~~[^~]+~~|\[[^\]]+\]\([^)]+\))/g;
    let match;
    let lastIndex = 0;

    while ((match = pattern.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        parts.push(remaining.substring(lastIndex, match.index));
      }
      const raw = match[0];
      if (raw.startsWith('`') && raw.endsWith('`')) {
        parts.push(
          <code key={partKey++} className={styles.previewInlineCode}>
            {raw.slice(1, -1)}
          </code>
        );
      } else if (raw.startsWith('**') && raw.endsWith('**')) {
        parts.push(
          <strong key={partKey++} style={{ color: 'var(--vg-text, #F5F5F7)', fontWeight: 600 }}>
            {parseInline(raw.slice(2, -2))}
          </strong>
        );
      } else if (raw.startsWith('*') && raw.endsWith('*')) {
        parts.push(
          <em key={partKey++} style={{ fontStyle: 'italic', color: 'var(--vg-text, #F5F5F7)' }}>
            {parseInline(raw.slice(1, -1))}
          </em>
        );
      } else if (raw.startsWith('~~') && raw.endsWith('~~')) {
        parts.push(
          <del key={partKey++} style={{ textDecoration: 'line-through', opacity: 0.6 }}>
            {parseInline(raw.slice(2, -2))}
          </del>
        );
      } else if (raw.startsWith('[') && raw.includes('](') && raw.endsWith(')')) {
        const linkText = raw.substring(1, raw.indexOf(']('));
        const linkUrl = raw.substring(raw.indexOf('](') + 2, raw.length - 1);
        parts.push(
          <a
            key={partKey++}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.previewLink}
          >
            {linkText}
          </a>
        );
      }
      lastIndex = pattern.lastIndex;
    }

    if (lastIndex < remaining.length) {
      parts.push(remaining.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced Code Blocks (```)
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock(i);
      } else {
        if (inTable) flushTable(i);
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Tables (| col 1 | col 2 |)
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const cells = line
        .trim()
        .slice(1, -1)
        .split('|');

      // Check if this is the separator row (|---|---|)
      if (cells.every((c) => /^[\s-:]+$/.test(c))) {
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableHeader = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable(i);
    }

    // Empty Lines
    if (!line.trim()) {
      elements.push(<div key={`empty-${i}`} className={styles.previewSpacer} />);
      continue;
    }

    // Horizontal Rule (---, ***, ___)
    if (/^(\s*[-*_]\s*){3,}$/.test(line.trim())) {
      elements.push(<hr key={`hr-${i}`} className={styles.previewHr} />);
      continue;
    }

    // Headings (#, ##, ###, ####)
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${i}`} className={styles.previewH1}>
          {parseInline(line.slice(2))}
        </h1>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${i}`} className={styles.previewH2}>
          {parseInline(line.slice(3))}
        </h2>
      );
      continue;
    }
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} className={styles.previewH3}>
          {parseInline(line.slice(4))}
        </h3>
      );
      continue;
    }
    if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={`h4-${i}`} className={styles.previewH4}>
          {parseInline(line.slice(5))}
        </h4>
      );
      continue;
    }

    // Task Checklist Items (- [ ] or - [x])
    const taskMatch = line.match(/^(\s*)-\s*\[([ xX])\]\s*(.*)$/);
    if (taskMatch) {
      const isChecked = taskMatch[2].toLowerCase() === 'x';
      const taskText = taskMatch[3];
      elements.push(
        <div key={`task-${i}`} className={styles.previewTaskItem}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onToggleTask && onToggleTask(i)}
            className={styles.previewCheckbox}
          />
          <span
            style={{
              textDecoration: isChecked ? 'line-through' : 'none',
              opacity: isChecked ? 0.6 : 1,
            }}
          >
            {parseInline(taskText)}
          </span>
        </div>
      );
      continue;
    }

    // Blockquote (> )
    if (line.startsWith('> ') || line === '>') {
      elements.push(
        <blockquote key={`quote-${i}`} className={styles.previewBlockquote}>
          {parseInline(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Bullet Lists (- , * )
    if (/^\s*[-*]\s+/.test(line)) {
      const text = line.replace(/^\s*[-*]\s+/, '');
      elements.push(
        <div key={`bullet-${i}`} className={styles.previewBulletItem}>
          <span className={styles.previewBulletDot}>•</span>
          <span>{parseInline(text)}</span>
        </div>
      );
      continue;
    }

    // Numbered Lists (1. , 2. )
    const numMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (numMatch) {
      elements.push(
        <div key={`num-${i}`} className={styles.previewNumberedItem}>
          <span className={styles.previewNumberLabel}>{numMatch[2]}.</span>
          <span>{parseInline(numMatch[3])}</span>
        </div>
      );
      continue;
    }

    // Standard Paragraph
    elements.push(
      <p key={`p-${i}`} className={styles.previewParagraph}>
        {parseInline(line)}
      </p>
    );
  }

  if (inCodeBlock) flushCodeBlock(lines.length);
  if (inTable) flushTable(lines.length);

  return <div className={styles.previewDocument}>{elements}</div>;
}


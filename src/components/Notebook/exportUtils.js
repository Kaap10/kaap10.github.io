/**
 * Notion-Style Export Utility for Developer Notebook
 * Generates pristine PDF, Markdown, and self-contained HTML exports.
 */

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Helper to convert Markdown text into clean HTML string for PDF printing
export function markdownToHTML(markdown) {
  if (!markdown) return '';

  const lines = markdown.split('\n');
  const htmlParts = [];
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockLines = [];
  let inTable = false;
  let tableHeader = [];
  let tableRows = [];

  const parseInline = (text) => {
    if (!text) return '';
    let res = escapeHtml(text);
    // Inline code `code`
    res = res.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    // Bold **text**
    res = res.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Italic *text*
    res = res.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    // Strikethrough ~~text~~
    res = res.replace(/~~([^~]+)~~/g, '<del>$1</del>');
    // Link [text](url)
    res = res.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    return res;
  };

  const flushTable = () => {
    if (inTable && tableHeader.length > 0) {
      let tblHtml = '<table><thead><tr>';
      tableHeader.forEach((th) => {
        tblHtml += `<th>${parseInline(th.trim())}</th>`;
      });
      tblHtml += '</tr></thead><tbody>';
      tableRows.forEach((row) => {
        tblHtml += '<tr>';
        row.forEach((td) => {
          tblHtml += `<td>${parseInline(td.trim())}</td>`;
        });
        tblHtml += '</tr>';
      });
      tblHtml += '</tbody></table>';
      htmlParts.push(tblHtml);
      inTable = false;
      tableHeader = [];
      tableRows = [];
    }
  };

  const flushCodeBlock = () => {
    if (inCodeBlock) {
      htmlParts.push(
        `<div class="code-wrapper">${codeBlockLang ? `<span class="code-lang">${escapeHtml(codeBlockLang)}</span>` : ''}<pre><code>${escapeHtml(codeBlockLines.join('\n'))}</code></pre></div>`
      );
      inCodeBlock = false;
      codeBlockLang = '';
      codeBlockLines = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced Code Block
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock();
      } else {
        if (inTable) flushTable();
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Table rows
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const cells = line
        .trim()
        .slice(1, -1)
        .split('|');

      if (cells.every((c) => /^[\s-:]+$/.test(c))) {
        continue; // table separator row
      }

      if (!inTable) {
        inTable = true;
        tableHeader = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Empty lines
    if (!line.trim()) {
      htmlParts.push('<div class="spacer"></div>');
      continue;
    }

    // Horizontal Rule
    if (/^(\s*[-*_]\s*){3,}$/.test(line.trim())) {
      htmlParts.push('<hr />');
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      htmlParts.push(`<h1>${parseInline(line.slice(2))}</h1>`);
      continue;
    }
    if (line.startsWith('## ')) {
      htmlParts.push(`<h2>${parseInline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith('### ')) {
      htmlParts.push(`<h3>${parseInline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith('#### ')) {
      htmlParts.push(`<h4>${parseInline(line.slice(5))}</h4>`);
      continue;
    }

    // Task Checklist items
    const taskMatch = line.match(/^(\s*)-\s*\[([ xX])\]\s*(.*)$/);
    if (taskMatch) {
      const isChecked = taskMatch[2].toLowerCase() === 'x';
      const taskText = taskMatch[3];
      htmlParts.push(
        `<div class="task-item"><input type="checkbox" ${isChecked ? 'checked' : ''} disabled /><span class="${isChecked ? 'task-done' : ''}">${parseInline(taskText)}</span></div>`
      );
      continue;
    }

    // Blockquote
    if (line.startsWith('> ') || line === '>') {
      htmlParts.push(`<blockquote>${parseInline(line.slice(2))}</blockquote>`);
      continue;
    }

    // Bullet list
    if (/^\s*[-*]\s+/.test(line)) {
      const text = line.replace(/^\s*[-*]\s+/, '');
      htmlParts.push(`<div class="bullet-item"><span class="bullet-dot">•</span><span>${parseInline(text)}</span></div>`);
      continue;
    }

    // Numbered list
    const numMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (numMatch) {
      htmlParts.push(`<div class="num-item"><span class="num-label">${numMatch[2]}.</span><span>${parseInline(numMatch[3])}</span></div>`);
      continue;
    }

    // Standard paragraph
    htmlParts.push(`<p>${parseInline(line)}</p>`);
  }

  if (inCodeBlock) flushCodeBlock();
  if (inTable) flushTable();

  return htmlParts.join('\n');
}

/**
 * Generate full Notion-styled printable HTML template
 */
function getPrintableHTMLDoc({ title, subtitle, metadata, contentHtml, isMultiPage = false }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title || 'Developer Notebook'}</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm 18mm 16mm;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .page-break {
        page-break-before: always;
        break-before: page;
      }
    }
    * {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Geist", Helvetica, Arial, sans-serif;
      color: #18181b;
      background: #ffffff;
      line-height: 1.65;
      font-size: 10.5pt;
      margin: 0;
      padding: 0;
    }
    .notion-doc {
      max-width: 820px;
      margin: 0 auto;
      padding: 10px 0;
    }
    .doc-header {
      border-bottom: 1.5px solid #e4e4e7;
      padding-bottom: 14px;
      margin-bottom: 22px;
    }
    h1.doc-title {
      font-size: 24pt;
      font-weight: 700;
      letter-spacing: -0.03em;
      margin: 0 0 8px 0;
      color: #09090b;
      line-height: 1.2;
    }
    .doc-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 8.5pt;
      color: #71717a;
      font-family: 'JetBrains Mono', SFMono-Regular, Menlo, Consolas, monospace;
      flex-wrap: wrap;
    }
    .meta-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 6px;
      background: #f4f4f5;
      border: 1px solid #e4e4e7;
      border-radius: 4px;
      color: #3f3f46;
    }
    .tag-badge {
      display: inline-block;
      padding: 1px 5px;
      border-radius: 3px;
      background: rgba(255, 77, 79, 0.1);
      border: 1px solid rgba(255, 77, 79, 0.25);
      color: #e03131;
      font-size: 8pt;
    }
    h1 { font-size: 16pt; font-weight: 700; letter-spacing: -0.02em; margin: 20px 0 8px; color: #09090b; border-bottom: 1px solid #f4f4f5; padding-bottom: 4px; }
    h2 { font-size: 13.5pt; font-weight: 600; letter-spacing: -0.015em; margin: 16px 0 6px; color: #18181b; }
    h3 { font-size: 11.5pt; font-weight: 600; margin: 14px 0 4px; color: #27272a; }
    h4 { font-size: 10.5pt; font-weight: 600; margin: 10px 0 4px; color: #3f3f46; }
    p { margin: 6px 0; color: #27272a; }
    .spacer { height: 8px; }
    hr { border: none; height: 1px; background: #e4e4e7; margin: 16px 0; }
    
    blockquote {
      border-left: 3px solid #ff4d4f;
      padding: 4px 12px;
      margin: 10px 0;
      background: #fafafa;
      color: #52525b;
      font-style: italic;
      border-radius: 0 4px 4px 0;
      page-break-inside: avoid;
    }
    
    .code-wrapper {
      position: relative;
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 6px;
      padding: 10px 14px;
      margin: 12px 0;
      page-break-inside: avoid;
    }
    .code-lang {
      position: absolute;
      top: 4px;
      right: 8px;
      font-size: 7.5pt;
      font-family: 'JetBrains Mono', monospace;
      color: #a1a1aa;
      text-transform: uppercase;
    }
    pre {
      margin: 0;
      overflow-x: auto;
    }
    pre code {
      font-family: 'JetBrains Mono', SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 8.8pt;
      color: #f4f4f5;
      line-height: 1.55;
    }
    code.inline-code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.8pt;
      padding: 1px 4px;
      background: #f4f4f5;
      border: 1px solid #e4e4e7;
      border-radius: 3px;
      color: #e03131;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 9.5pt;
      page-break-inside: avoid;
    }
    th, td {
      border: 1px solid #e4e4e7;
      padding: 6px 10px;
      text-align: left;
    }
    th {
      background: #f4f4f5;
      font-weight: 600;
      color: #18181b;
    }
    td {
      background: #ffffff;
    }
    
    .task-item {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin: 3px 0;
      font-size: 10pt;
    }
    .task-item input {
      margin: 0;
      vertical-align: middle;
      accent-color: #ff4d4f;
    }
    .task-done {
      text-decoration: line-through;
      color: #a1a1aa;
    }
    
    .bullet-item, .num-item {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin: 3px 0;
      padding-left: 4px;
    }
    .bullet-dot {
      color: #ff4d4f;
      font-weight: bold;
    }
    .num-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9pt;
      color: #71717a;
    }
    a {
      color: #ff4d4f;
      text-decoration: underline;
    }
    .toc-section {
      background: #fafafa;
      border: 1px solid #e4e4e7;
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .toc-title {
      font-size: 11pt;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 8px;
    }
    .toc-list {
      margin: 0;
      padding-left: 18px;
      font-size: 9.5pt;
    }
    .toc-list li {
      margin-bottom: 4px;
    }
  </style>
</head>
<body>
  <div class="notion-doc">
    <header class="doc-header">
      <h1 class="doc-title">${escapeHtml(title || 'Untitled Note')}</h1>
      <div class="doc-meta">
        ${metadata.notebook ? `<span class="meta-badge">📁 ${escapeHtml(metadata.notebook)}</span>` : ''}
        ${metadata.date ? `<span class="meta-badge">🗓️ ${escapeHtml(metadata.date)}</span>` : ''}
        ${metadata.wordCount ? `<span class="meta-badge">📝 ${metadata.wordCount} words</span>` : ''}
        ${
          Array.isArray(metadata.tags) && metadata.tags.length > 0
            ? metadata.tags.map((t) => `<span class="tag-badge">#${escapeHtml(t)}</span>`).join(' ')
            : ''
        }
      </div>
    </header>

    <main class="doc-body">
      ${contentHtml}
    </main>
  </div>
</body>
</html>`;
}

/**
 * Export a single Note to Notion-styled PDF
 */
export function exportNoteAsPDF(note, notebookTitle = 'General') {
  if (!note) return;

  const title = note.title || 'Untitled Note';
  const d = new Date(note.updated_at || note.created_at || Date.now());
  const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const wordCount = (note.content || '').trim().split(/\s+/).filter(Boolean).length;

  const contentHtml = markdownToHTML(note.content || '');
  const htmlDoc = getPrintableHTMLDoc({
    title,
    metadata: {
      notebook: notebookTitle,
      date: dateStr,
      wordCount,
      tags: note.tags || [],
    },
    contentHtml,
  });

  // Open in an invisible printable iframe or print window
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlDoc);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
}

/**
 * Export an entire Notebook (all notes compiled) to Notion-styled PDF
 */
export function exportNotebookAsPDF(notebook, notes = []) {
  if (!notebook) return;

  const nbTitle = notebook.title || 'Notebook';
  const nbNotes = notes.filter((n) => n.notebook_id === notebook.id);
  const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Generate Table of Contents
  let tocHtml = `<div class="toc-section"><h2 class="toc-title">Table of Contents (${nbNotes.length} Pages)</h2><ol class="toc-list">`;
  nbNotes.forEach((n) => {
    tocHtml += `<li><strong>${escapeHtml(n.title || 'Untitled Note')}</strong> ${Array.isArray(n.tags) && n.tags.length > 0 ? `· <span style="color:#888;">#${n.tags.map((t) => escapeHtml(t)).join(', #')}</span>` : ''}</li>`;
  });
  tocHtml += `</ol></div>`;

  // Compile all notes with page breaks
  let allPagesHtml = tocHtml;
  nbNotes.forEach((n, idx) => {
    const nDate = new Date(n.updated_at || n.created_at || Date.now()).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const nWordCount = (n.content || '').trim().split(/\s+/).filter(Boolean).length;
    const nBodyHtml = markdownToHTML(n.content || '');

    allPagesHtml += `
      <div class="${idx > 0 ? 'page-break' : ''}">
        <header class="doc-header" style="margin-top: ${idx > 0 ? '20px' : '0'};">
          <h1 class="doc-title">${escapeHtml(n.title || 'Untitled Note')}</h1>
          <div class="doc-meta">
            <span class="meta-badge">Page ${idx + 1} of ${nbNotes.length}</span>
            <span class="meta-badge">🗓️ ${escapeHtml(nDate)}</span>
            <span class="meta-badge">📝 ${nWordCount} words</span>
            ${Array.isArray(n.tags) && n.tags.length > 0 ? n.tags.map((t) => `<span class="tag-badge">#${escapeHtml(t)}</span>`).join(' ') : ''}
          </div>
        </header>
        <main class="doc-body">${nBodyHtml}</main>
      </div>
    `;
  });

  const htmlDoc = getPrintableHTMLDoc({
    title: `${nbTitle} — Full Notebook Collection`,
    metadata: {
      notebook: nbTitle,
      date: nowStr,
      wordCount: nbNotes.reduce((acc, curr) => acc + (curr.content || '').trim().split(/\s+/).filter(Boolean).length, 0),
    },
    contentHtml: allPagesHtml,
    isMultiPage: true,
  });

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlDoc);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 300);
  }
}

/**
 * Export single note as standalone self-contained HTML file
 */
export function exportNoteAsHTML(note, notebookTitle = 'General') {
  if (!note) return;
  const title = note.title || 'Untitled Note';
  const d = new Date(note.updated_at || note.created_at || Date.now());
  const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const wordCount = (note.content || '').trim().split(/\s+/).filter(Boolean).length;
  const contentHtml = markdownToHTML(note.content || '');

  const htmlDoc = getPrintableHTMLDoc({
    title,
    metadata: {
      notebook: notebookTitle,
      date: dateStr,
      wordCount,
      tags: note.tags || [],
    },
    contentHtml,
  });

  const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.html`;
  a.click();
  URL.revokeObjectURL(url);
}


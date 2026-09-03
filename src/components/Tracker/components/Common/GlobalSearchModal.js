import React, { useState, useEffect, useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';
import {
  IconSearch,
  IconClose,
  IconTasks,
  IconGoals,
  IconMilestone,
  IconResources,
  IconReview,
  IconNotebook,
} from './Icons';
import styles from '../../styles/tracker.module.css';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const {
    tasks,
    goals,
    milestones,
    resources,
    weeklyReviews,
    monthlyReviews,
    notes,
    notebooks,
    setActiveNotebookId,
    setActiveNoteId,
    setActiveTab,
    setEditingTask,
    setTaskModalOpen,
    setEditingGoal,
    setGoalModalOpen,
    setEditingResource,
    setResourceModalOpen,
  } = useTracker();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);


  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        results[selectedIndex].onSelect();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };


  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const list = [];

    // Search Tasks
    tasks.forEach((t) => {
      if (
        t.title?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.category?.toLowerCase().includes(q)
      ) {
        list.push({
          type: 'Task',
          icon: IconTasks,
          title: t.title,
          subtitle: `${t.category} · Priority: ${t.priority} · Status: ${t.status}`,
          item: t,
          onSelect: () => {
            setActiveTab('tasks');
            setEditingTask(t);
            setTaskModalOpen(true);
            onClose();
          },
        });
      }
    });

    // Search Goals
    goals.forEach((g) => {
      if (
        g.title?.toLowerCase().includes(q) ||
        g.description?.toLowerCase().includes(q)
      ) {
        list.push({
          type: 'Goal',
          icon: IconGoals,
          title: g.title,
          subtitle: `${g.type === 'short_term' ? 'Short-term' : 'Long-term'} · ${g.progress}% completed`,
          item: g,
          onSelect: () => {
            setActiveTab('goals');
            setEditingGoal(g);
            setGoalModalOpen(true);
            onClose();
          },
        });
      }
    });

    // Search Milestones
    milestones.forEach((m) => {
      if (
        m.title?.toLowerCase().includes(q) ||
        m.description?.toLowerCase().includes(q)
      ) {
        list.push({
          type: 'Milestone',
          icon: IconMilestone,
          title: m.title,
          subtitle: `Status: ${m.status}`,
          item: m,
          onSelect: () => {
            setActiveTab('goals');
            onClose();
          },
        });
      }
    });

    // Search Resources
    resources.forEach((r) => {
      if (
        r.title?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.notes?.toLowerCase().includes(q) ||
        r.category?.toLowerCase().includes(q)
      ) {
        list.push({
          type: 'Resource',
          icon: IconResources,
          title: r.title,
          subtitle: `${r.type} · ${r.category} · Status: ${r.status || 'unread'}`,
          item: r,
          onSelect: () => {
            setActiveTab('resources');
            setEditingResource(r);
            setResourceModalOpen(true);
            onClose();
          },
        });
      }
    });

    // Search Reviews
    weeklyReviews.forEach((w) => {
      if (
        w.what_went_well?.toLowerCase().includes(q) ||
        w.biggest_achievement?.toLowerCase().includes(q) ||
        w.top_priorities?.toLowerCase().includes(q)
      ) {
        list.push({
          type: 'Weekly Review',
          icon: IconReview,
          title: `Week of ${w.week_start_date}`,
          subtitle: `Achievement: ${w.biggest_achievement || 'Logged'}`,
          item: w,
          onSelect: () => {
            setActiveTab('reviews');
            onClose();
          },
        });
      }
    });

    // Search Notes in Notebook
    (notes || []).forEach((n) => {
      if (
        n.title?.toLowerCase().includes(q) ||
        n.content?.toLowerCase().includes(q) ||
        (Array.isArray(n.tags) && n.tags.some((t) => t.toLowerCase().includes(q)))
      ) {
        const parentNb = (notebooks || []).find((nb) => nb.id === n.notebook_id);
        list.push({
          type: 'Note',
          icon: IconNotebook,
          title: n.title || 'Untitled Note',
          subtitle: `Notebook: ${parentNb?.title || 'General'} · Updated: ${new Date(n.updated_at || n.created_at || Date.now()).toLocaleDateString()}`,
          item: n,
          onSelect: () => {
            if (n.notebook_id) setActiveNotebookId(n.notebook_id);
            setActiveNoteId(n.id);
            setActiveTab('notebook');
            onClose();
          },
        });
      }
    });

    return list.slice(0, 15);
  }, [
    query,
    tasks,
    goals,
    milestones,
    resources,
    weeklyReviews,
    setActiveTab,
    setEditingTask,
    setTaskModalOpen,
    setEditingGoal,
    setGoalModalOpen,
    setEditingResource,
    setResourceModalOpen,
    onClose,
  ]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose} style={{ alignItems: 'flex-start', paddingTop: '10vh' }}>
      <div
        className={styles.modalContent}
        style={{ maxWidth: '600px', width: '100%', padding: '0', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--vg-border)',
          }}
        >
          <span style={{ color: 'var(--vg-text-muted)' }}>
            <IconSearch size={18} />
          </span>
          <input
            type="text"
            placeholder="Search tasks, goals, milestones, resources, notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'var(--vg-text)',
              fontSize: '0.95rem',
              outline: 'none',
            }}
            autoFocus
          />
          <button type="button" className={styles.iconBtn} onClick={onClose}>
            <IconClose size={16} />
          </button>
        </div>

        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.5rem' }}>
          {query.trim() === '' ? (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--vg-text-muted)', fontSize: '0.85rem' }}>
              Type to search across your productivity workspace...
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--vg-text-muted)', fontSize: '0.85rem' }}>
              No matching records found for "{query}".
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {results.map((res, idx) => {
                const IconComponent = res.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={idx}
                    onClick={res.onSelect}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--vg-radius-sm)',
                      cursor: 'pointer',
                      background: isSelected ? 'var(--vg-surface-strong)' : 'transparent',
                      border: isSelected ? '1px solid var(--vg-border)' : '1px solid transparent',
                    }}
                    className={styles.searchItem}
                  >

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
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent size={16} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--vg-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {res.title}
                        </span>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            padding: '0.15rem 0.4rem',
                            borderRadius: '4px',
                            background: 'var(--vg-surface-strong)',
                            color: 'var(--vg-text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.03em',
                          }}
                        >
                          {res.type}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--vg-text-muted)', marginTop: '0.1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {res.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


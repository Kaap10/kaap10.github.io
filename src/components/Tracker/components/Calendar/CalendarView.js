import React, { useState, useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconTasks,
  IconGoals,
  IconFocus,
  IconFlame,
  IconCheck,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

export default function CalendarView() {
  const {
    tasks,
    goals,
    milestones,
    focusSessions,
    habitLogs,
    habits,
    toggleTaskStatus,
    setEditingTask,
    setTaskModalOpen,
  } = useTracker();

  // Local date helper — avoids off-by-one errors in timezones ahead of UTC (e.g. IST UTC+5:30)
  const localDateStr = (d) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(() => localDateStr(new Date()));
  const [viewMode, setViewMode] = useState('month'); // 'month' | 'week' | 'day'

  // Month navigation helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const handlePrev = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(year, month - 1, 1));
    } else if (viewMode === 'week') {
      const d = new Date(currentDate);
      d.setDate(d.getDate() - 7);
      setCurrentDate(d);
    } else {
      const d = new Date(currentDate);
      d.setDate(d.getDate() - 1);
      setCurrentDate(d);
      setSelectedDateStr(localDateStr(d));
    }
  };

  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(year, month + 1, 1));
    } else if (viewMode === 'week') {
      const d = new Date(currentDate);
      d.setDate(d.getDate() + 7);
      setCurrentDate(d);
    } else {
      const d = new Date(currentDate);
      d.setDate(d.getDate() + 1);
      setCurrentDate(d);
      setSelectedDateStr(localDateStr(d));
    }
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDateStr(localDateStr(now));
  };


  // Calendar Days Calculation for Month View
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun..6 = Sat
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month padding — use local date parts to avoid UTC off-by-one
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevDate = new Date(year, month - 1, d);
      days.push({
        dateStr: localDateStr(prevDate),
        dayNum: d,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const curDate = new Date(year, month, i);
      days.push({
        dateStr: localDateStr(curDate),
        dayNum: i,
        isCurrentMonth: true,
      });
    }

    // Next month padding to fill complete weeks (up to 42 cells)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        dateStr: localDateStr(nextDate),
        dayNum: i,
        isCurrentMonth: false,
      });
    }

    return days;
  }, [year, month]);


  // Aggregate items mapped by date
  const eventsByDate = useMemo(() => {
    const map = {};

    const addEvent = (dStr, event) => {
      if (!dStr) return;
      if (!map[dStr]) map[dStr] = [];
      map[dStr].push(event);
    };

    // Tasks
    tasks.forEach((t) => {
      if (t.due_date) {
        addEvent(t.due_date, {
          id: `task_${t.id}`,
          type: 'task',
          title: t.title,
          status: t.status,
          priority: t.priority,
          category: t.category,
          time: t.due_time,
          raw: t,
        });
      }
    });

    // Goals & Milestones
    goals.forEach((g) => {
      if (g.target_date) {
        addEvent(g.target_date, {
          id: `goal_${g.id}`,
          type: 'goal',
          title: `Goal Deadline: ${g.title}`,
          raw: g,
        });
      }
    });

    milestones.forEach((m) => {
      if (m.target_date) {
        addEvent(m.target_date, {
          id: `milestone_${m.id}`,
          type: 'milestone',
          title: `Milestone: ${m.title}`,
          raw: m,
        });
      }
    });

    // Focus Sessions
    focusSessions.forEach((s) => {
      const dStr = (s.completed_at || s.created_at).split('T')[0];
      const mins = Math.round((Number(s.duration) || 0) / 60);
      addEvent(dStr, {
        id: `focus_${s.id}`,
        type: 'focus',
        title: `Focus Session (${mins}m)`,
        raw: s,
      });
    });

    // Habits
    habitLogs.forEach((l) => {
      const habitObj = habits.find((h) => h.id === l.habit_id);
      addEvent(l.completed_date, {
        id: `habit_${l.id}`,
        type: 'habit',
        title: `Habit: ${habitObj ? habitObj.name : 'Completed'}`,
        raw: l,
      });
    });

    return map;
  }, [tasks, goals, milestones, focusSessions, habitLogs, habits]);

  const selectedDateEvents = eventsByDate[selectedDateStr] || [];
  const todayStr = localDateStr(new Date());


  return (
    <div className={styles.viewContainer}>
      {/* Header & Controls */}
      <div className={styles.viewHeader}>
        <div>
          <h1 className={styles.viewTitle}>Productivity Calendar</h1>
          <p className={styles.viewSubtitle}>
            Unified view of task deadlines, milestone dates, deep work sessions, and habits.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button type="button" className={styles.btnSecondary} onClick={handleToday}>
            Today
          </button>
          <button type="button" className={styles.iconBtn} onClick={handlePrev}>
            <IconChevronLeft size={16} />
          </button>
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--vg-text)', minWidth: '140px', textAlign: 'center' }}>
            {monthName}
          </span>
          <button type="button" className={styles.iconBtn} onClick={handleNext}>
            <IconChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Grid: Calendar Month Grid + Selected Date Inspector */}
      <div className={styles.calendarGrid}>
        {/* Left: Calendar Month Table */}
        <div className={styles.card} style={{ padding: '1rem' }}>
          {/* Day of week headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '0.5rem' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <span key={d} style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--vg-text-muted)', padding: '0.25rem 0' }}>
                {d}
              </span>
            ))}
          </div>

          {/* Date Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem' }}>
            {calendarDays.map((cell) => {
              const isSelected = cell.dateStr === selectedDateStr;
              const isToday = cell.dateStr === todayStr;
              const events = eventsByDate[cell.dateStr] || [];

              return (
                <div
                  key={cell.dateStr}
                  onClick={() => setSelectedDateStr(cell.dateStr)}
                  style={{
                    minHeight: '62px',
                    padding: '0.35rem',
                    borderRadius: 'var(--vg-radius-sm)',
                    background: isSelected
                      ? 'rgba(255, 77, 79, 0.08)'
                      : cell.isCurrentMonth
                      ? 'var(--vg-surface)'
                      : 'transparent',
                    border: isSelected
                      ? '1px solid var(--vg-accent)'
                      : isToday
                      ? '1px solid var(--vg-border-hover)'
                      : '1px solid transparent',
                    cursor: 'pointer',
                    opacity: cell.isCurrentMonth ? 1 : 0.35,
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: isToday ? 700 : 500,
                        color: isToday ? 'var(--vg-accent)' : 'var(--vg-text)',
                      }}
                    >
                      {cell.dayNum}
                    </span>

                    {events.length > 0 && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          background: 'var(--vg-surface-strong)',
                          color: 'var(--vg-text-muted)',
                          padding: '0.05rem 0.3rem',
                          borderRadius: '3px',
                        }}
                      >
                        {events.length}
                      </span>
                    )}
                  </div>

                  {/* Tiny Event Dot Indicator Badges */}
                  <div style={{ display: 'flex', gap: '0.15rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                    {events.slice(0, 4).map((ev, i) => (
                      <div
                        key={i}
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          background:
                            ev.type === 'task'
                              ? ev.status === 'completed'
                                ? '#52c41a'
                                : 'var(--vg-accent)'
                              : ev.type === 'goal' || ev.type === 'milestone'
                              ? '#1890ff'
                              : ev.type === 'focus'
                              ? '#fa8c16'
                              : '#722ed1',
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Date Detail Inspector */}
        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IconCalendar size={18} style={{ color: 'var(--vg-accent)' }} />
              <h3 className={styles.cardTitle}>
                {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </h3>
            </div>

            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => {
                setEditingTask({ due_date: selectedDateStr });
                setTaskModalOpen(true);
              }}
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
            >
              + Task
            </button>
          </div>

          {selectedDateEvents.length === 0 ? (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--vg-text-muted)', fontSize: '0.85rem' }}>
              No scheduled deadlines or logged activity on this date.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {selectedDateEvents.map((ev) => {
                if (ev.type === 'task') {
                  const task = ev.raw;
                  const isDone = task.status === 'completed';
                  return (
                    <div
                      key={ev.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.6rem 0.8rem',
                        borderRadius: 'var(--vg-radius-sm)',
                        background: 'var(--vg-surface)',
                        border: '1px solid var(--vg-border)',
                      }}
                    >
                      <button
                        type="button"
                        className={`${styles.checkbox} ${isDone ? styles.checkboxChecked : ''}`}
                        onClick={() => toggleTaskStatus(task.id)}
                      >
                        {isDone && <IconCheck size={12} />}
                      </button>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 500, color: isDone ? 'var(--vg-text-muted)' : 'var(--vg-text)', textDecoration: isDone ? 'line-through' : 'none' }}>
                          {task.title}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--vg-text-muted)', marginTop: '0.15rem' }}>
                          {task.category} · Priority: {task.priority} {task.due_time ? `· @ ${task.due_time}` : ''}
                        </div>
                      </div>
                    </div>
                  );
                }

                if (ev.type === 'focus') {
                  const s = ev.raw;
                  const mins = Math.round((Number(s.duration) || 0) / 60);
                  return (
                    <div
                      key={ev.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.55rem 0.75rem',
                        borderRadius: 'var(--vg-radius-sm)',
                        background: 'rgba(250, 140, 22, 0.08)',
                        border: '1px solid rgba(250, 140, 22, 0.2)',
                        fontSize: '0.82rem',
                      }}
                    >
                      <IconFocus size={15} style={{ color: '#fa8c16' }} />
                      <div>
                        <span style={{ fontWeight: 600, color: 'var(--vg-text)' }}>Deep Work Session</span>
                        <div style={{ fontSize: '0.74rem', color: 'var(--vg-text-muted)' }}>
                          Logged {mins} minutes of focused execution
                        </div>
                      </div>
                    </div>
                  );
                }

                if (ev.type === 'habit') {
                  return (
                    <div
                      key={ev.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.55rem 0.75rem',
                        borderRadius: 'var(--vg-radius-sm)',
                        background: 'rgba(82, 196, 26, 0.08)',
                        border: '1px solid rgba(82, 196, 26, 0.2)',
                        fontSize: '0.82rem',
                      }}
                    >
                      <IconFlame size={15} style={{ color: '#52c41a' }} />
                      <span style={{ color: 'var(--vg-text)' }}>{ev.title}</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={ev.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.55rem 0.75rem',
                      borderRadius: 'var(--vg-radius-sm)',
                      background: 'rgba(24, 144, 255, 0.08)',
                      border: '1px solid rgba(24, 144, 255, 0.2)',
                      fontSize: '0.82rem',
                    }}
                  >
                    <IconGoals size={15} style={{ color: '#1890ff' }} />
                    <span style={{ color: 'var(--vg-text)' }}>{ev.title}</span>
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


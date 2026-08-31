import React from 'react';
import { useTracker } from '../../context/TrackerContext';
import EmptyState from '../Common/EmptyState';
import {
  IconHabit,
  IconPlus,
  IconFlame,
  IconCheck,
  IconEdit,
  IconTrash,
  IconTrophy,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

export default function HabitsView() {
  const {
    habits,
    habitLogs,
    habitStreaks,
    toggleHabitDate,
    deleteHabit,
    setEditingHabit,
    setHabitModalOpen,
    openConfirmModal,
  } = useTracker();

  // Generate the last 7 days (today down to 6 days ago)
  const last7Days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    // Use local date parts to avoid UTC off-by-one in timezones ahead of UTC (e.g. IST)
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.getDate();
    last7Days.push({ dateStr, dayName, dayNum, isToday: i === 0 });
  }


  const handleDelete = (habit) => {
    openConfirmModal(
      'Delete Habit?',
      `Are you sure you want to delete "${habit.name}"? All historical logs for this habit will be removed.`,
      () => deleteHabit(habit.id)
    );
  };

  const activeHabits = habits.filter((h) => !h.archived);

  return (
    <div className={styles.viewContainer}>
      {/* Header */}
      <div className={styles.viewHeader}>
        <div>
          <h1 className={styles.viewTitle}>Habit Tracker & Consistency</h1>
          <p className={styles.viewSubtitle}>
            Build atomic engineering routines, track daily streaks, and measure discipline.
          </p>
        </div>

        <button
          type="button"
          className={styles.btnPrimary}
          onClick={() => {
            setEditingHabit(null);
            setHabitModalOpen(true);
          }}
        >
          <IconPlus size={16} />
          <span>New Habit</span>
        </button>
      </div>

      {activeHabits.length === 0 ? (
        <EmptyState
          icon={IconHabit}
          title="No daily habits established"
          description="Create your first habit (e.g. Daily LeetCode, Research Paper Reading, Workout, Writing)."
          actionLabel="Add First Habit"
          onAction={() => {
            setEditingHabit(null);
            setHabitModalOpen(true);
          }}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {activeHabits.map((habit) => {
            const streakData = habitStreaks[habit.id] || {
              currentStreak: 0,
              longestStreak: 0,
              completionRate: 0,
              totalCompletions: 0,
            };

            const logsForHabit = new Set(
              habitLogs
                .filter((l) => l.habit_id === habit.id)
                .map((l) => l.completed_date)
            );

            return (
              <div key={habit.id} className={styles.card}>
                <div className={styles.habitCardHeader}>
                  {/* Left: Info */}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--vg-text)' }}>
                        {habit.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.12rem 0.45rem',
                          borderRadius: '4px',
                          background: 'var(--vg-surface-strong)',
                          color: 'var(--vg-text-muted)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {habit.frequency}
                      </span>
                    </div>

                    {habit.description && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--vg-text-muted)', marginTop: '0.25rem' }}>
                        {habit.description}
                      </div>
                    )}

                    {/* Streak Badges */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginTop: '0.65rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: streakData.currentStreak > 0 ? '#fa8c16' : 'var(--vg-text-muted)', fontWeight: 600 }}>
                        <IconFlame size={15} />
                        <span>{streakData.currentStreak} Day Streak</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--vg-text-muted)' }}>
                        <IconTrophy size={14} />
                        <span>Best: {streakData.longestStreak} days</span>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: 'var(--vg-text-muted)' }}>
                        30d Rate: <strong style={{ color: 'var(--vg-accent)' }}>{streakData.completionRate}%</strong>
                      </div>
                    </div>
                  </div>

                  {/* Center: 7-Day Check-in Matrix */}
                  <div className={styles.habitCheckinRow}>
                    {last7Days.map((day) => {
                      const isCompleted = logsForHabit.has(day.dateStr);
                      return (
                        <div
                          key={day.dateStr}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.3rem',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '0.68rem',
                              color: day.isToday ? 'var(--vg-accent)' : 'var(--vg-text-muted)',
                              fontWeight: day.isToday ? 700 : 500,
                            }}
                          >
                            {day.dayName}
                          </span>

                          <button
                            type="button"
                            className={`${styles.checkbox} ${isCompleted ? styles.checkboxChecked : ''}`}
                            onClick={() => toggleHabitDate(habit.id, day.dateStr)}
                            title={`${day.dateStr}: ${isCompleted ? 'Completed' : 'Not completed'}`}
                            style={{
                              width: '30px',
                              height: '30px',
                              borderRadius: 'var(--vg-radius-sm)',
                            }}
                          >
                            {isCompleted ? <IconCheck size={14} /> : <span style={{ fontSize: '0.7rem', color: 'var(--vg-text-muted)' }}>{day.dayNum}</span>}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => {
                        setEditingHabit(habit);
                        setHabitModalOpen(true);
                      }}
                      title="Edit Habit"
                    >
                      <IconEdit size={15} />
                    </button>

                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => handleDelete(habit)}
                      title="Delete Habit"
                      style={{ color: 'var(--vg-accent)' }}
                    >
                      <IconTrash size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


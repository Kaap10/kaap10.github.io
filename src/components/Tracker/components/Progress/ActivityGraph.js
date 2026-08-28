import React, { useState, useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';
import styles from '../../styles/tracker.module.css';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export default function ActivityGraph() {
  const { activityMap } = useTracker();
  const [hoveredDay, setHoveredDay] = useState(null);

  // Generate 52 weeks (364/371 days) starting from aligned Sunday
  const weeks = useMemo(() => {
    const today = new Date();
    const result = [];
    
    // Find the end date: this week's Saturday
    const end = new Date(today);
    const dayOfWeek = end.getDay(); // 0 (Sun) to 6 (Sat)
    end.setDate(end.getDate() + (6 - dayOfWeek));

    // 52 weeks * 7 days = 364 days backwards
    const start = new Date(end);
    start.setDate(start.getDate() - (52 * 7 - 1));

    let currentWeek = [];
    const cur = new Date(start);

    while (cur <= end) {
      const dateStr = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}-${String(cur.getDate()).padStart(2, '0')}`;

      const entry = activityMap[dateStr] || {
        date: dateStr,
        tasksCompleted: 0,
        focusSeconds: 0,
        habitsCompleted: 0,
        totalScore: 0,
      };

      currentWeek.push({
        date: dateStr,
        dayNum: cur.getDate(),
        month: cur.getMonth(),
        year: cur.getFullYear(),
        ...entry,
      });

      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }

      cur.setDate(cur.getDate() + 1);
    }

    if (currentWeek.length > 0) {
      result.push(currentWeek);
    }

    return result;
  }, [activityMap]);

  // Determine cell color shade based on activity score
  const getCellColor = (score) => {
    if (!score || score === 0) return 'var(--vg-surface-strong)';
    if (score <= 2) return 'rgba(255, 77, 79, 0.35)'; // light accent
    if (score <= 5) return 'rgba(255, 77, 79, 0.6)';  // medium accent
    if (score <= 8) return 'rgba(255, 77, 79, 0.85)'; // strong accent
    return '#ff4d4f';                                  // max intensity
  };

  // Month label positions above the columns
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDay = week[0];
      if (firstDay && firstDay.month !== lastMonth) {
        labels.push({
          index: weekIndex,
          name: MONTH_NAMES[firstDay.month],
        });
        lastMonth = firstDay.month;
      }
    });

    return labels;
  }, [weeks]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Month Labels */}
      <div style={{ display: 'flex', marginLeft: '32px', position: 'relative', height: '18px', fontSize: '0.72rem', color: 'var(--vg-text-muted)' }}>
        {monthLabels.map((m, idx) => (
          <span
            key={idx}
            style={{
              position: 'absolute',
              left: `${m.index * 14}px`,

            }}
          >
            {m.name}
          </span>
        ))}
      </div>

      {/* Main Grid: Days of week labels + 52 Week Columns */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {/* Day of week labels (Mon, Wed, Fri) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '26px', fontSize: '0.68rem', color: 'var(--vg-text-muted)', lineHeight: '11px' }}>
          {DAY_LABELS.map((d, i) => (
            <div key={i} style={{ height: '11px', textAlign: 'right' }}>
              {d}
            </div>
          ))}
        </div>

        {/* 52 Columns */}
        <div style={{ display: 'flex', gap: '3px', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {weeks.map((week, wIdx) => (
            <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {week.map((day) => {
                const isHovered = hoveredDay && hoveredDay.date === day.date;
                return (
                  <div
                    key={day.date}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    style={{
                      width: '11px',
                      height: '11px',
                      borderRadius: '2px',
                      background: getCellColor(day.totalScore),
                      border: isHovered ? '1px solid var(--vg-text)' : '1px solid transparent',
                      cursor: 'pointer',
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer: Legend & Tooltip Details */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--vg-text-muted)', minHeight: '24px' }}>
        <div>
          {hoveredDay ? (
            <div style={{ fontSize: '0.78rem', color: 'var(--vg-text)' }}>
              <strong>{hoveredDay.date}:</strong>{' '}
              <strong style={{ color: 'var(--vg-accent)' }}>{hoveredDay.tasksCompleted}</strong> tasks completed,{' '}
              <strong style={{ color: '#fa8c16' }}>{Math.round((hoveredDay.focusSeconds || 0) / 60)}m</strong> focus,{' '}
              <strong style={{ color: '#52c41a' }}>{hoveredDay.habitsCompleted}</strong> habits logged (Score: {hoveredDay.totalScore})
            </div>
          ) : (
            <span>Hover over any cell to inspect productivity velocity</span>
          )}
        </div>

        {/* Color scale legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}>
          <span>Less</span>
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--vg-surface-strong)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(255, 77, 79, 0.35)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(255, 77, 79, 0.6)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(255, 77, 79, 0.85)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#ff4d4f' }} />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import styles from '../../styles/tracker.module.css';

/**
 * GitHub-style 52-week activity contribution heatmap for the tracker
 */
export default function ActivityGraph({ activityMap = {} }) {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Generate the 52-week array (364/365 days ending today)
  const calendarData = useMemo(() => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Go back 52 weeks (364 days) + adjust to start on a Monday
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);
    const dayOfWeek = startDate.getDay(); // 0 is Sunday, 1 is Monday
    const offset = (dayOfWeek + 6) % 7; // shift so week starts on Monday
    startDate.setDate(startDate.getDate() - offset);

    const current = new Date(startDate);
    while (current <= today) {
      const dateStr = current.toISOString().split('T')[0];
      const count = activityMap[dateStr] || 0;

      let level = 0;
      if (count >= 8) level = 4;
      else if (count >= 5) level = 3;
      else if (count >= 3) level = 2;
      else if (count >= 1) level = 1;

      days.push({
        date: dateStr,
        displayDate: current.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        count,
        level,
        dayOfWeek: current.getDay(),
      });

      current.setDate(current.getDate() + 1);
    }

    return days;
  }, [activityMap]);

  const totalCompletions = useMemo(() => {
    return Object.values(activityMap).reduce((acc, curr) => acc + curr, 0);
  }, [activityMap]);

  return (
    <div className={styles.heatmapWrapper}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0, color: 'var(--vg-text)' }}>
            Annual Activity Heatmap
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', margin: '0.2rem 0 0' }}>
            {totalCompletions} tasks completed in the past year
          </p>
        </div>

        {/* Hovered cell info tooltip */}
        <div
          style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            color: hoveredCell ? 'var(--vg-accent)' : 'var(--vg-text-subtle)',
            minHeight: '1.2rem',
          }}
        >
          {hoveredCell ? (
            <span>
              <strong>{hoveredCell.count}</strong> {hoveredCell.count === 1 ? 'task' : 'tasks'} completed on{' '}
              {hoveredCell.displayDate}
            </span>
          ) : (
            <span>Hover over any day for details</span>
          )}
        </div>
      </div>

      {/* Grid */}
      <div style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <div className={styles.heatmapGrid}>
          {calendarData.map((day) => {
            const levelClass =
              day.level === 4
                ? styles.cellLevel4
                : day.level === 3
                ? styles.cellLevel3
                : day.level === 2
                ? styles.cellLevel2
                : day.level === 1
                ? styles.cellLevel1
                : styles.cellLevel0;

            return (
              <div
                key={day.date}
                className={`${styles.heatmapCell} ${levelClass}`}
                onMouseEnter={() => setHoveredCell(day)}
                onMouseLeave={() => setHoveredCell(null)}
                onClick={() => setHoveredCell(day)}
                title={`${day.count} tasks on ${day.displayDate}`}
              />
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className={styles.heatmapLegend}>
        <span>Less</span>
        <div className={`${styles.heatmapCell} ${styles.cellLevel0}`} />
        <div className={`${styles.heatmapCell} ${styles.cellLevel1}`} />
        <div className={`${styles.heatmapCell} ${styles.cellLevel2}`} />
        <div className={`${styles.heatmapCell} ${styles.cellLevel3}`} />
        <div className={`${styles.heatmapCell} ${styles.cellLevel4}`} />
        <span>More</span>
      </div>
    </div>
  );
}


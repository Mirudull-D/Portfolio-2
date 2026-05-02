import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './PageLoader.module.css';

const COLORS = ['#4ECDC4', '#FFE66D', '#FF3B3B', '#4CAF50'];

function getColumnConfig() {
  const count = Math.max(4, Math.floor(window.innerWidth / 240));
  const columns = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const bell = Math.sin(t * Math.PI);
    const delay = i * 80 - bell * 120;
    columns.push({ index: i, delay, color: COLORS[i % 4] });
  }
  return columns;
}

export default function PageLoader({ onDone }) {
  const [columns, setColumns] = useState(() => getColumnConfig());
  const [hidden, setHidden] = useState(false);
  const [logoFade, setLogoFade] = useState(false);
  const columnRefs = useRef([]);
  const stripRefs = useRef([]);

  useEffect(() => {
    const maxDelay = columns[columns.length - 1].delay;
    const totalDuration = 600 + maxDelay + 1000;

    const timers = [];

    const logoFadeTimer = setTimeout(() => setLogoFade(true), 400);

    const startTimeout = setTimeout(() => {
      columns.forEach((col) => {
        const colEl = columnRefs.current[col.index];
        const stripEl = stripRefs.current[col.index];
        if (!colEl || !stripEl) return;

        const drift = col.index % 2 === 0 ? '3px' : '-3px';

        colEl.animate(
          [
            { transform: 'translateY(0) translateX(0)' },
            { transform: `translateY(-105%) translateX(${drift})` }
          ],
          {
            duration: 1000,
            delay: col.delay,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards',
          }
        );

        stripEl.animate(
          [
            { height: '4px', bottom: '0' },
            { height: '100vh', bottom: '0', offset: 0.3 },
            { height: '100vh', bottom: '0', offset: 0.35 },
            { height: '100vh', bottom: '0' }
          ],
          {
            duration: 1000,
            delay: col.delay,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards',
          }
        );
      });
    }, 600);

    timers.push(logoFadeTimer, startTimeout);

    const hideTimer = setTimeout(() => setHidden(true), 600 + totalDuration);
    const doneTimer = setTimeout(() => onDone(), 600 + totalDuration + 100);
    timers.push(hideTimer, doneTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [columns, onDone]);

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumnConfig());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const setColumnRef = useCallback((el, index) => {
    columnRefs.current[index] = el;
  }, []);

  const setStripRef = useCallback((el, index) => {
    stripRefs.current[index] = el;
  }, []);

  return (
    <div className={`${styles.overlay} ${hidden ? styles.hidden : ''}`}>
      <div className={`${styles.logo} ${logoFade ? styles.logoFade : ''}`}>MIRUDULL</div>
      <div className={styles.columns}>
        {columns.map((col) => (
          <div
            key={col.index}
            ref={(el) => setColumnRef(el, col.index)}
            className={styles.column}
          >
            <div
              ref={(el) => setStripRef(el, col.index)}
              className={styles.strip}
              style={{ backgroundColor: col.color }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

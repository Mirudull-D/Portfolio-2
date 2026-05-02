import { useRef, useEffect, useState, useCallback } from 'react';
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
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const columnRefs = useRef([]);
  const stripRefs = useRef([]);
  const animating = useRef(false);
  const [columns, setColumns] = useState(() => getColumnConfig());
  const [hidden, setHidden] = useState(false);

  const runAnimations = useCallback(() => {
    columnRefs.current = [];
    stripRefs.current = [];

    if (logoRef.current) {
      logoRef.current.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 200, delay: 400, fill: 'forwards' }
      );
    }

    columns.forEach((col) => {
      const colEl = columnRefs.current[col.index];
      const stripEl = stripRefs.current[col.index];
      const drift = col.index % 2 === 0 ? '3px' : '-3px';

      if (colEl) {
        colEl.animate(
          [
            { transform: 'translateY(0) translateX(0)' },
            { transform: `translateY(-105%) translateX(${drift})` }
          ],
          {
            duration: 1000,
            delay: 600 + col.delay,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards',
          }
        );
      }

      if (stripEl) {
        stripEl.animate(
          [
            { height: '4px', bottom: '0' },
            { height: '100vh', bottom: '0', offset: 0.3 },
            { height: '100vh', bottom: '0', offset: 0.35 },
            { height: '100vh', bottom: '0' }
          ],
          {
            duration: 1000,
            delay: 600 + col.delay,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards',
          }
        );
      }
    });

    const maxDelay = columns[columns.length - 1].delay;
    const totalDuration = 600 + maxDelay + 1000;
    return totalDuration;
  }, [columns]);

  useEffect(() => {
    if (!overlayRef.current || animating.current) return;

    animating.current = true;
    const wait = runAnimations();
    const hideTimer = setTimeout(() => setHidden(true), wait);
    const timer = setTimeout(() => onDone(), wait + 100);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(timer);
    };
  }, [onDone, runAnimations]);

  useEffect(() => {
    const handleResize = () => {
      if (!animating.current) setColumns(getColumnConfig());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={overlayRef} className={`${styles.overlay} ${hidden ? styles.hidden : ''}`}>
      <div ref={logoRef} className={styles.logo}>MIRUDULL</div>
      <div className={styles.columns}>
        {columns.map((col) => (
          <div
            key={col.index}
            ref={(el) => {
              columnRefs.current[col.index] = el;
            }}
            className={styles.column}
          >
            <div
              ref={(el) => {
                stripRefs.current[col.index] = el;
              }}
              className={styles.strip}
              style={{ backgroundColor: col.color }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

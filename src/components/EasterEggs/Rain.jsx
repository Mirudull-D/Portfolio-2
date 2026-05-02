import { useState, useEffect, useRef } from 'react';
import styles from './Rain.module.css';

const colors = ['#4ECDC4', '#FFE66D', '#FF3B3B', '#4CAF50'];

export default function Rain({ active }) {
  const [dots, setDots] = useState([]);
  const rafRefs = useRef([]);

  useEffect(() => {
    if (!active) return;

    const newDots = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -2,
      speed: 3 + Math.random() * 4,
      drift: (Math.random() - 0.5),
      size: 6 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setDots(newDots);

    const animate = () => {
      rafRefs.current.forEach(cancelAnimationFrame);
      rafRefs.current = [];

      setDots(prev => {
        const updated = prev
          .map(dot => ({
            ...dot,
            y: dot.y + dot.speed * 0.16,
            x: dot.x + dot.drift * 0.16,
          }))
          .filter(dot => dot.y < 110);
        return updated;
      });

      if (rafRefs.current.length === 0) {
        const rafId = requestAnimationFrame(animate);
        rafRefs.current.push(rafId);
      }
    };

    const loopId = requestAnimationFrame(animate);
    rafRefs.current.push(loopId);

    return () => {
      rafRefs.current.forEach(id => cancelAnimationFrame(id));
      rafRefs.current = [];
      setDots([]);
    };
  }, [active]);

  return (
    <div className={styles.rainContainer}>
      {dots.map(dot => (
        <div
          key={dot.id}
          className={styles.dot}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
          }}
        />
      ))}
    </div>
  );
}

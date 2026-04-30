import React, { useEffect, useState } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Slight delay to ensure paint
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.label}>
        FULLSTACK DEVELOPER
      </div>

      <div className={styles.monument}>
        <h1 className={`${styles.line} display-xl ${loaded ? styles.revealed : ''}`} style={{ transitionDelay: '0ms' }}>
          MIRU
        </h1>
        <h1
          className={`${styles.line} display-l misregister ${loaded ? styles.revealed : ''}`}
          style={{
            transitionDelay: '300ms',
            color: 'var(--riso-cyan)',
            '--misregister-color': 'var(--riso-yellow)'
          }}
          data-text="BUILDS"
        >
          BUILDS
        </h1>
      </div>

      <p className={`${styles.subtitle} body-text ${loaded ? styles.subtitleRevealed : ''}`}>
        Systems that think. Interfaces that breathe.
      </p>

      <div className={styles.year}>
        2025
      </div>
    </section>
  );
}

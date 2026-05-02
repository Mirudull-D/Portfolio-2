import { useState, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Experience.module.css';

export default function Experience() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  const [contentShow, setContentShow] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setContentShow(true), 100);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <section className={styles.experience} ref={ref} id="experience">
      <div className={styles.header}>
        <div className={styles.label}>EXPERIENCE</div>
        <div className={styles.rightLabel}>02 ROLES · ONGOING</div>
      </div>

      <div className={styles.body}>
        <div className={`${styles.expLeft} ${contentShow ? styles.fadeUp : ''}`}>
          <h2 className={styles.companyName}>
            SKETCH
            <br />
            SRM
          </h2>
          <div className={styles.roleTitle}>R&D LEAD</div>
          <div className={styles.duration}>FEB 2024 — PRESENT</div>
          <p className={styles.description}>
            Leading research initiatives and mentoring students in web technologies at SRM Institute.
          </p>
          <div className={`${styles.tagStrip} ${styles.redTags}`}>
            HTML · CSS · JAVASCRIPT · REACT · TECHNICAL MENTORING
          </div>
        </div>

        <div className={`${styles.expRight} ${contentShow ? styles.fadeUp : ''}`}>
          <h2 className={`${styles.companyName} ${styles.outlined}`}>
            CEXNEA
            <br />
            SYSTEMS
          </h2>
          <div className={styles.roleTitle}>FULLSTACK DEVELOPER INTERN</div>
          <div className={styles.duration}>2025 — PRESENT</div>
          <p className={styles.description}>
            Building production full stack systems at Cexnea Systems across frontend and backend.
          </p>
          <div className={`${styles.tagStrip} ${styles.cyanTags}`}>
            REACT · NODE · FASTAPI · POSTGRESQL · REST APIs
          </div>
        </div>
      </div>
    </section>
  );
}

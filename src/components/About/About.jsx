import React, { useEffect, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './About.module.css';

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section className={styles.about} ref={ref} id="about">
      <div className={styles.watermark}>ABOUT</div>

      <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.heading}>
          <h2 className="display-s">
            <span className={styles.filled}>I BUILD</span>
            <br />
            <span className="outlined-text">THINGS</span>
          </h2>
        </div>

        <div className={styles.paragraphs}>
          <p className="body-text">
            I write code the way a letterpress operator sets type — one deliberate 
            decision at a time. Every system I build is an argument for clarity, 
            stripped of ornament, obsessed with structure.
          </p>
          <p className="body-text">
            I've spent three years turning complex problems into interfaces that 
            feel inevitable. The kind of software where users don't notice the 
            engineering — they just move through it. That invisibility is the craft.
          </p>
          <p className="body-text">
            When I'm not building, I'm sketching type hierarchies on dot-grid notebooks 
            or hunting for the perfect dosa at 2 AM in Besant Nagar. The hunger for 
            precision carries over.
          </p>
        </div>
      </div>

      <div className={`${styles.statsRow} ${isVisible ? styles.statsVisible : ''}`}>
        <div className={styles.stat}>
          <div className={styles.statNumber}>
            <Counter target={3} suffix="+" />
          </div>
          <div className="label-text" style={{ opacity: 0.5 }}>YEARS EXPERIENCE</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>
            <Counter target={12} suffix="+" />
          </div>
          <div className="label-text" style={{ opacity: 0.5 }}>PROJECTS BUILT</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>
            <Counter target={2} />
          </div>
          <div className="label-text" style={{ opacity: 0.5 }}>ROLES HELD</div>
        </div>
      </div>

      <div className={styles.metaStrip}>
        <span>BASED IN <span className={styles.green}>CHENNAI</span></span>
        <span className={styles.separator}>·</span>
        <span>D MIRUDULL</span>
        <span className={styles.separator}>·</span>
        <span>FULL STACK</span>
        <span className={styles.separator}>·</span>
        <span>OPEN TO WORK</span>
      </div>
    </section>
  );
}

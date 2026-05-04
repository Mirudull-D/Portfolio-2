import React, { useEffect, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { GitHubCalendar } from 'react-github-calendar';
import ElectricBorder from '../ElectricBorder/ElectricBorder';
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

      <div style={{ display: 'flex', flexDirection: 'row', gap: '4rem', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap-reverse', position: 'relative', zIndex: 2 }}>
        
        {/* Left Side: Electric Border Card */}
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }}>
          <ElectricBorder style={{ padding: '6px' }}>
            <img 
              src="https://picsum.photos/400/500?random=1" 
              alt="Random visual" 
              style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block', borderRadius: '8px' }} 
            />
          </ElectricBorder>
        </div>

        {/* Right Side: Text Content */}
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`} style={{ flex: '1.5', margin: '0', maxWidth: '640px' }}>
          <div className={styles.heading}>
            <h2 className="display-s">
              <span className={styles.filled}>I BUILD THINGS</span>

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

      <div className={`${styles.githubWrapper} ${isVisible ? styles.visible : ''}`} style={{ marginTop: '6rem', display: 'flex', flexDirection: 'row', gap: '4rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>

        <div style={{ flex: '1', minWidth: '600px', padding: '3rem', background: 'var(--bg-secondary, rgba(255,255,255,0.02))', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)' }}>
          <h3 className="body-text" style={{ marginBottom: '2.5rem', textAlign: 'center', opacity: 0.8, letterSpacing: '0.1em', fontSize: '1.5rem' }}>CONTRIBUTIONS</h3>
          <div style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
            <GitHubCalendar 
              username="Mirudull-D" 
              colorScheme="light"
              blockSize={16}
              blockMargin={6}
              fontSize={16}
            />
          </div>
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

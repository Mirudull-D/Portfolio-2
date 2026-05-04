import { useState, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Experience.module.css';

const experiences = [
  {
    company: 'CEXNEA SYSTEMS',
    role: 'FULLSTACK DEVELOPER INTERN',
    duration: 'MAR 2025 — PRESENT',
    year: '2025',
    description: 'Building production full stack systems at Cexnea Systems across frontend and backend.',
    tags: ['REACT', 'NODE', 'FASTAPI', 'POSTGRESQL', 'REST APIs'],
    color: 'var(--riso-cyan)'
  },
  {
    company: 'SKETCH SRM',
    role: 'R&D LEAD',
    duration: 'FEB 2024 — PRESENT',
    year: '2024',
    description: 'Leading research initiatives and mentoring students in web technologies at SRM Institute.',
    tags: ['HTML', 'CSS', 'JAVASCRIPT', 'REACT', 'TECHNICAL MENTORING'],
    color: 'var(--riso-red)'
  }
];

export default function Experience() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={styles.experience} ref={ref} id="experience">
      <div className={styles.watermark}>EXPERIENCE</div>
      <div className={styles.header}>
        <div className={styles.label}>EXPERIENCE</div>
      </div>

      <div className={styles.timelineContainer}>
        <div className={`${styles.timelineLine} ${isVisible ? styles.lineGrow : ''}`} />
        
        {experiences.map((exp, index) => (
          <div 
            key={exp.company} 
            className={`${styles.timelineItem} ${isVisible ? styles.fadeUp : ''}`}
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            <div className={styles.timelineNode}>
              <div className={styles.nodeCore} style={{ backgroundColor: exp.color }} />
              {exp.duration.includes('PRESENT') && (
                <div className={styles.nodePulse} style={{ backgroundColor: exp.color }} />
              )}
            </div>
            <div className={styles.yearBadge} style={{ color: exp.color }}>{exp.year}</div>
            
            <div className={styles.content}>
              <div className={styles.metaRow}>
                <div className={styles.duration} style={{ color: exp.color }}>{exp.duration}</div>
                {exp.duration.includes('PRESENT') && (
                  <span className={styles.presentBadge} style={{ borderColor: exp.color, color: exp.color }}>ACTIVE</span>
                )}
              </div>
              <h2 className={styles.companyName}>{exp.company}</h2>
              <div className={styles.roleTitle}>{exp.role}</div>
              <p className={styles.description}>{exp.description}</p>
              <div className={styles.tagStrip}>
                {exp.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

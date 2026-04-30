import React from 'react';
import styles from './Stack.module.css';

const stackRows = [
  {
    category: 'FRONTEND',
    techs: [
      { name: 'REACT', color: 'var(--riso-cyan)', outlined: false },
      { name: 'VITE', color: 'var(--riso-red)', outlined: true },
      { name: 'CSS', color: 'var(--riso-cyan)', outlined: false },
    ]
  },
  {
    category: 'BACKEND',
    techs: [
      { name: 'NODE', color: 'var(--riso-red)', outlined: false },
      { name: 'FASTAPI', color: 'var(--riso-cyan)', outlined: true },
      { name: 'SPRING', color: 'var(--riso-red)', outlined: false },
    ]
  },
  {
    category: 'LANGUAGES',
    techs: [
      { name: 'TYPESCRIPT', color: 'var(--riso-cyan)', outlined: false },
      { name: 'PYTHON', color: 'var(--riso-red)', outlined: true },
      { name: 'JAVA', color: 'var(--riso-cyan)', outlined: false },
    ]
  },
  {
    category: 'DATA',
    techs: [
      { name: 'POSTGRES', color: 'var(--riso-red)', outlined: false },
      { name: 'REDIS', color: 'var(--riso-cyan)', outlined: true },
      { name: 'MONGO', color: 'var(--riso-red)', outlined: false },
    ]
  },
  {
    category: 'DEVOPS',
    techs: [
      { name: 'DOCKER', color: 'var(--riso-cyan)', outlined: false },
      { name: 'GIT', color: 'var(--riso-red)', outlined: true },
      { name: 'LINUX', color: 'var(--riso-cyan)', outlined: false },
    ]
  }
];

export default function Stack() {
  return (
    <section className={styles.stack}>
      <div className={styles.label}>TOOLS &amp; THINKING</div>
      <div className={styles.rows}>
        {stackRows.map((row) => (
          <div key={row.category} className={`${styles.row} interactive-text`} style={{ '--strike-color': 'var(--riso-cyan)' }}>
            <span className={styles.categoryName}>{row.category}</span>
            <span className={styles.techList}>
              {row.techs.map((tech, j) => (
                <span key={tech.name}>
                  <span
                    className={tech.outlined ? styles.techOutlined : styles.techFilled}
                    style={{ color: tech.color }}
                  >
                    {tech.name}
                  </span>
                  {j < row.techs.length - 1 && (
                    <span className={styles.dot}>·</span>
                  )}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

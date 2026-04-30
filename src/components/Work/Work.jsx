import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Work.module.css';

const projects = [
  {
    name: 'SYNTHESIS',
    desc: 'A decentralized protocol for verifiable AI model training. Reduces compute overhead by 40% while maintaining cryptographic proofs of work.',
    tags: ['React', 'Solidity', 'WebGL', 'TypeScript'],
    misregister: false
  },
  {
    name: 'NEXUS BROWSER',
    desc: 'An experimental spatial interface for navigating dense information graphs. Built entirely on the Canvas API with a custom physics engine.',
    tags: ['Vite', 'Canvas API', 'Rust', 'WASM'],
    misregister: false
  },
  {
    name: 'ECHO CHAMBER',
    desc: 'Audio analysis tool for acoustic room modeling. Features real-time spectral decomposition and impulse response generation.',
    tags: ['Next.js', 'WebAudio API', 'Python', 'FastAPI'],
    misregister: true // The "best work" gets the misregistration
  },
  {
    name: 'VANTAGE POINT',
    desc: 'A lightweight observability dashboard for distributed microservices. Aggregates logs, metrics, and traces into a single pane of glass.',
    tags: ['Vue', 'Go', 'Prometheus', 'Redis'],
    misregister: false
  },
  {
    name: 'CHRONOS',
    desc: 'Time-series database visualization engine capable of rendering millions of data points smoothly without downsampling.',
    tags: ['React', 'D3.js', 'Java', 'Spring Boot'],
    misregister: false
  },
  {
    name: 'KINETIC',
    desc: 'Open-source animation library for performant micro-interactions. Used by over 10,000 developers worldwide.',
    tags: ['Vanilla JS', 'CSS', 'Rollup', 'Jest'],
    misregister: false
  }
];

const ProjectBlock = ({ project, index }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  
  const isEven = index % 2 === 1; // 0-indexed, so 1,3,5 are even visually
  const nameStyle = isEven ? styles.filled : 'outlined-text';

  return (
    <article 
      ref={ref}
      className={`${styles.block} ${isVisible ? styles.visible : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <h2 
        className={`interactive-text display-m ${nameStyle} ${project.misregister ? 'misregister' : ''}`}
        style={{
          '--strike-color': 'var(--riso-red)',
          '--misregister-color': 'var(--riso-red)'
        }}
        data-text={project.name}
      >
        {project.name}
      </h2>
      
      <div className={styles.details}>
        <div className={styles.desc}>
          <p className="body-text">{project.desc}</p>
        </div>
        <div className={styles.tags}>
          {project.tags.map(tag => (
            <div key={tag} className="label-text">{tag}</div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default function Work() {
  return (
    <section className={styles.work}>
      <div className={styles.label}>PROJECTS</div>
      <div className={styles.projectsList}>
        {projects.map((p, i) => (
          <ProjectBlock key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

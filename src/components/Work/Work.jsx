import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Work.module.css';

const projects = [
  {
    name: 'SYNTHESIS',
    desc: 'A decentralized protocol for verifiable AI model training. Reduces compute overhead by 40% while maintaining cryptographic proofs of work.',
    tags: ['React', 'Solidity', 'WebGL', 'TypeScript'],
    misregister: false,
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    name: 'NEXUS BROWSER',
    desc: 'An experimental spatial interface for navigating dense information graphs. Built entirely on the Canvas API with a custom physics engine.',
    tags: ['Vite', 'Canvas API', 'Rust', 'WASM'],
    misregister: false,
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    name: 'ECHO CHAMBER',
    desc: 'Audio analysis tool for acoustic room modeling. Features real-time spectral decomposition and impulse response generation.',
    tags: ['Next.js', 'WebAudio API', 'Python', 'FastAPI'],
    misregister: true,
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    name: 'VANTAGE POINT',
    desc: 'A lightweight observability dashboard for distributed microservices. Aggregates logs, metrics, and traces into a single pane of glass.',
    tags: ['Vue', 'Go', 'Prometheus', 'Redis'],
    misregister: false,
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    name: 'CHRONOS',
    desc: 'Time-series database visualization engine capable of rendering millions of data points smoothly without downsampling.',
    tags: ['React', 'D3.js', 'Java', 'Spring Boot'],
    misregister: false,
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    name: 'KINETIC',
    desc: 'Open-source animation library for performant micro-interactions. Used by over 10,000 developers worldwide.',
    tags: ['Vanilla JS', 'CSS', 'Rollup', 'Jest'],
    misregister: false,
    liveUrl: '#',
    githubUrl: '#'
  }
];

const ProjectBlock = ({ project, index, isActive, onClick }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  
  const isEven = index % 2 === 1;
  const nameStyle = isEven ? styles.filled : 'outlined-text';

  return (
    <article 
      ref={ref}
      className={`${styles.block} ${isVisible ? styles.visible : ''} ${isActive ? styles.isOpen : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={styles.rowHeader}>
        <span className={`${styles.projectNum} label-text`} style={{ opacity: 0.6 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 
          className={`interactive-text display-m ${nameStyle} ${project.misregister ? 'misregister' : ''}`}
          style={{
            '--strike-color': 'var(--riso-red)',
            '--misregister-color': 'var(--riso-red)'
          }}
          data-text={project.name}
          onClick={() => onClick(index)}
        >
          {project.name}
        </h2>
      </div>
      
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
  const [activeIndex, setActiveIndex] = useState(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  const openPanel = (index) => {
    setActiveIndex(index);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPanelVisible(true);
      });
    });
  };

  const closePanel = () => {
    setPanelVisible(false);
    setTimeout(() => {
      setActiveIndex(null);
    }, 500);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && activeIndex !== null) {
        closePanel();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeIndex]);

  const project = activeIndex !== null ? projects[activeIndex] : null;

  return (
    <section className={styles.work} id="work">
      <div className={styles.label}>PROJECTS</div>
      <div className={styles.projectsList}>
        {projects.map((p, i) => (
          <ProjectBlock 
            key={p.name} 
            project={p} 
            index={i}
            isActive={activeIndex === i}
            onClick={openPanel}
          />
        ))}
      </div>

      {activeIndex !== null && project && (
        <>
          <div 
            ref={overlayRef}
            className={`${styles.overlay} ${panelVisible ? styles.overlayVisible : ''}`} 
            onClick={closePanel} 
          />
          <div 
            ref={panelRef}
            className={`${styles.panel} ${panelVisible ? styles.panelOpen : ''}`}
          >
            <button className={styles.closeBtn} onClick={closePanel} aria-label="Close panel">
              ×
            </button>
            <div className={styles.panelContent}>
              <div className={styles.panelHeader}>
                <span className="label-text" style={{ opacity: 0.3 }}>
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <h2 className={styles.panelName}>{project.name}</h2>
              </div>

              <img
                src={`https://picsum.photos/480/270?random=${activeIndex + 1}`}
                alt={project.name}
                className={styles.panelImage}
              />

              <p className="body-text" style={{ opacity: 0.7, lineHeight: 1.8 }}>
                {project.desc}
              </p>

              <div className={styles.panelStack}>
                <div className="label-text" style={{ opacity: 0.3, marginBottom: 12 }}>STACK</div>
                <div className={styles.panelTags}>
                  {project.tags.map(tag => (
                    <span key={tag} className="label-text">{tag}</span>
                  ))}
                </div>
              </div>

              <div className={styles.panelLinks}>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.outlineBtn}>
                  LIVE ↗
                </a>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.outlineBtn}>
                  GITHUB ↗
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

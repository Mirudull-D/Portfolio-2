import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Work.module.css';

const projects = [
  {
    name: 'BNPL DECISION ENGINE',
    desc: 'High-performance 2-stage credit decision engine for Buy Now Pay Later services. Isolation Forest fraud gate → Logistic Regression pre-qualification (~2ms) → XGBoost final decision with SHAP explanations. P99 latency: ~670ms, well within 2s SLA.',
    tags: ['Python', 'XGBoost', 'FastAPI', 'Scikit-learn', 'SHAP'],
    githubUrl: 'https://github.com/Mirudull-D/BNPL-ML-Pipeline'
  },
  {
    name: 'KIRO PRO',
    desc: 'WhatsApp-native AI business OS for Indian SMBs. Handles orders in any language, voice notes via Whisper, image analysis via Llama Vision. Auto-generates GST invoices, processes Razorpay payments, syncs to Google Sheets.',
    tags: ['Node.js', 'TypeScript', 'PostgreSQL', 'Groq LLM', 'Prisma'],
    githubUrl: 'https://github.com/Mirudull-D/Kiro'
  },
  {
    name: 'GIOM',
    desc: 'Full-featured E-commerce mobile app built with React Native + Expo Router. Complete shopping flow — onboarding, auth, product discovery, cart, checkout, orders, profile. Modular architecture with Context API state management and custom hooks.',
    tags: ['React Native', 'Expo Router', 'TypeScript', 'Context API', 'Axios'],
    githubUrl: 'https://github.com/Mirudull-D/Giom_front-end'
  },
  {
    name: 'SERVESYNC',
    desc: 'Production-ready restaurant ordering backend. Customer authentication, order management with Prisma transactions for atomic consistency, kitchen dashboard APIs, full order status lifecycle — PLACED → PREPARING → READY → COMPLETED.',
    tags: ['Express.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'JWT', 'Zod'],
    githubUrl: 'https://github.com/Mirudull-D/ServeSync'
  }
];

const ProjectBlock = ({ project, index, isActive, onClick }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  
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
          className={`${styles.projectName} display-m`}
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
            className={`${styles.overlay} ${panelVisible ? styles.overlayVisible : ''}`} 
            onClick={closePanel} 
          />
          <div className={`${styles.panel} ${panelVisible ? styles.panelOpen : ''}`}>
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

              <div className={styles.panelDescWrap}>
                <p className={styles.panelDesc}>
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
              </div>

              <div className={styles.panelLinks}>
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

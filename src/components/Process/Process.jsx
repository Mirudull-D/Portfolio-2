import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Process.module.css';

const phases = [
  {
    name: 'THINK',
    number: '01',
    treatment: 'filled', // filled near-black
    desc: "Every project starts by sitting in the problem until the constraints become the architecture. I don't sketch solutions — I sketch questions until the right one collapses into an answer.",
  },
  {
    name: 'MAKE',
    number: '02',
    treatment: 'outlined',
    desc: 'I build in layers — data first, logic second, surface last. The interface is the final argument, not the first draft. Code is revised the way prose is revised: ruthlessly.',
  },
  {
    name: 'SHIP',
    number: '03',
    treatment: 'green', // filled in --riso-green
    desc: 'Shipping is a verb, not a milestone. Every deployment is an opinion. I optimize for the moment the user forgets they\'re using software.',
  },
];

const PhaseBlock = ({ phase, index }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 });

  let nameClass = styles.phaseName;
  let nameStyle = {};

  if (phase.treatment === 'outlined') {
    nameClass += ' outlined-text';
  } else if (phase.treatment === 'green') {
    nameStyle.color = 'var(--riso-green)';
  }

  return (
    <div
      ref={ref}
      className={`${styles.phaseBlock} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.numberWatermark}>{phase.number}</div>

      <h2
        className={`interactive-text display-l ${nameClass}`}
        style={{ '--strike-color': 'var(--riso-yellow)', ...nameStyle }}
      >
        {phase.name}
      </h2>

      <div className={styles.phaseDesc}>
        <p className="body-text">{phase.desc}</p>
      </div>
    </div>
  );
};

export default function Process() {
  return (
    <section className={styles.process}>
      {phases.map((phase, i) => (
        <PhaseBlock key={phase.name} phase={phase} index={i} />
      ))}
    </section>
  );
}

import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Stack.module.css';

const strips = [
  {
    direction: 'left',
    speed: '30s',
    className: styles.strip1,
    items: ['REACT', 'VITE', 'HTML', 'CSS', 'TYPESCRIPT', 'TAILWIND', 'FRAMER MOTION', 'GSAP'],
    outlined: false,
  },
  {
    direction: 'right',
    speed: '24s',
    className: styles.strip2,
    items: ['FASTAPI', 'SPRING BOOT', 'NODE', 'REST APIs', 'JWT', 'POSTGRESQL', 'MYSQL', 'REDIS'],
    outlined: true,
  },
  {
    direction: 'left',
    speed: '36s',
    className: styles.strip3,
    items: ['PYTHON', 'JAVA', 'JAVASCRIPT', 'TYPESCRIPT', 'BASH', 'SQL'],
    outlined: false,
  },
  {
    direction: 'right',
    speed: '28s',
    className: styles.strip4,
    items: ['DOCKER', 'NGINX', 'VERCEL', 'GITHUB ACTIONS', 'LINUX', 'POSTMAN', 'FIREBASE'],
    outlined: false,
  },
];

const MarqueeStrip = ({ strip }) => {
  const itemMarkup = strip.items.map((item, i) => (
    <span key={i} className={`${styles.stripItem} ${strip.outlined ? styles.outlined : ''}`}>
      {item}
    </span>
  ));

  const separator = <span className={styles.stripSeparator}>·</span>;

  const list = [
    ...strip.items.flatMap((item, i) => [
      <span key={`a-${i}`} className={`${styles.stripItem} ${strip.outlined ? styles.outlined : ''}`}>{item}</span>,
      <span key={`s-${i}`} className={styles.stripSeparator}>·</span>,
    ]),
    ...strip.items.flatMap((item, i) => [
      <span key={`b-${i}`} className={`${styles.stripItem} ${strip.outlined ? styles.outlined : ''}`}>{item}</span>,
      <span key={`t-${i}`} className={styles.stripSeparator}>·</span>,
    ]),
  ];

  return (
    <div className={`${styles.strip} ${styles[strip.direction]} ${strip.className}`} style={{ '--speed': strip.speed }}>
      <div className={styles.stripTrack}>
        {list}
      </div>
    </div>
  );
};

export default function Stack() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section className={styles.stack} ref={ref}>
      <div className={styles.stackBlock}>
        <div className={styles.header}>
          <div className={styles.label}>TOOLS &amp; THINKING</div>
          <div className={styles.liveIndicator}>
            <div className={styles.liveDot} />
            <span className={styles.liveText}>LIVE</span>
          </div>
        </div>
        <div className={`${styles.stripBlock} ${isVisible ? styles.revealed : ''}`}>
          {strips.map((strip, i) => (
            <MarqueeStrip key={i} strip={strip} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from 'react';
import styles from './Terminal.module.css';

const lines = [
  '> INITIALIZING MIRUDULL.SYS...',
  '> BACKEND ENGINEER. OCCASIONAL FRONTEND CRIMINAL.',
  '> CURRENTLY ON LEAVE. BUILDING THINGS ANYWAY.',
  '> FAVORITE STACK: WHATEVER SHIPS FASTEST.',
  '> ONCE DEBUGGED FOR 4 HOURS. IT WAS A SEMICOLON.',
  '> STATUS: OPEN TO WORK. SLIGHTLY CAFFEINATED.',
  '> TYPE \'EXIT\' TO CLOSE.',
];

export default function Terminal({ onClose }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [closing, setClosing] = useState(false);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    lines.forEach((_, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, lines[i]]);
      }, 200 * (i + 1));
    });
  }, []);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [visibleLines.length === lines.length]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (input.trim().toUpperCase() === 'EXIT') {
        setClosing(true);
        setTimeout(onClose, 600);
      } else {
        setInput('');
      }
    } else if (e.key === 'Escape') {
      setClosing(true);
      setTimeout(onClose, 600);
    }
  };

  return (
    <div className={`${styles.terminal} ${closing ? styles.closing : ''}`}>
      <div className={styles.terminalBlock}>
        {visibleLines.map((line, i) => (
          <div key={i} className={styles.line}>{line}</div>
        ))}
        {visibleLines.length === lines.length && (
          <div className={styles.inputRow}>
            <span className={styles.prompt}>{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.input}
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}

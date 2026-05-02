import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './IdleDim.module.css';

export default function IdleDim({ onDim, onWake }) {
  const [visible, setVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const timerRef = useRef(null);
  const textTimerRef = useRef(null);
  const callbackRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (visible) {
      setVisible(false);
      setTextVisible(false);
      onWake?.();
    }
    clearTimeout(timerRef.current);
    clearTimeout(textTimerRef.current);

    timerRef.current = setTimeout(() => {
      setVisible(true);
      textTimerRef.current = setTimeout(() => {
        setTextVisible(true);
      }, 3000);
    }, 60000);
  }, [visible, onWake]);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];
    const handler = resetTimer;
    events.forEach(event => window.addEventListener(event, handler));
    return () => events.forEach(event => window.removeEventListener(event, handler));
  }, [resetTimer]);

  useEffect(() => {
    resetTimer();
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(textTimerRef.current);
    };
  }, []);

  return (
    <div className={`${styles.overlay} ${visible ? styles.visible : ''}`}>
      <div className={`${styles.text} ${textVisible ? styles.textVisible : ''}`}>
        still there?
      </div>
    </div>
  );
}

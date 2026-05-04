import React, { useState } from 'react';
import styles from './Mascot.module.css';

export default function Mascot() {
  const [message, setMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const messages = [
      "I build things that think.",
      "Need a dev? I'm your bot.",
      "Check out the terminal!",
      "Systems that breathe...",
      "Miru is the best."
    ];
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div 
      className={styles.mascotContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {message && <div className={styles.speechBubble}>{message}</div>}
      <div className={`${styles.mascot} ${isHovered ? styles.wiggle : ''}`}>
        <img 
          src="/mascot.png" 
          alt="Mascot" 
          className={styles.mascotImage}
        />
      </div>
    </div>
  );
}

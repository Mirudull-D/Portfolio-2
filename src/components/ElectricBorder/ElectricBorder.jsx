import React from 'react';
import styles from './ElectricBorder.module.css';

const ElectricBorder = ({ children, className = '', style = {}, color1 = 'var(--riso-yellow, #ffd700)', color2 = 'var(--riso-green, #00ff00)', color3 = 'var(--riso-orange, #ffa500)' }) => {
  return (
    <div className={`${styles.electricWrapper} ${className}`} style={style}>
      <div 
        className={styles.glow} 
        style={{
          '--color-1': color1,
          '--color-2': color2,
          '--color-3': color3,
        }}
      />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default ElectricBorder;

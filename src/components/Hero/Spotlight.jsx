import { useRef, useState, useEffect } from "react";
import styles from "./Spotlight.module.css";

export default function Spotlight({ children, className = "", color = "rgba(255, 255, 255, 0.15)" }) {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.spotlightWrapper} ${className}`}
    >
      <div
        className={styles.spotlight}
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import Squares from "./Squares";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <Squares
        speed={0.5}
        squareSize={40}
        borderColor="rgba(0, 0, 0, 0.05)"
        hoverFillColor="rgba(78, 205, 196, 0.08)"
      />

      <div className={styles.content}>
        <div className={`${styles.label} ${loaded ? styles.revealed : ""}`}>
          FULLSTACK DEVELOPER
        </div>

        <div className={styles.monument}>
          <div
            className={`${styles.lineWrapper} ${loaded ? styles.revealed : ""}`}
            style={{ transitionDelay: "0ms" }}
          >
            <h1 className={`${styles.line} display-xl`}>MIRU</h1>
          </div>
          <div
            className={`${styles.lineWrapper} ${loaded ? styles.revealed : ""}`}
            style={{ transitionDelay: "300ms" }}
          >
            <h1
              className={`${styles.line} display-l misregister`}
              style={{
                color: "var(--riso-cyan)",
                "--misregister-color": "var(--riso-yellow)",
              }}
              data-text="BUILDS"
            >
              BUILDS
            </h1>
          </div>
        </div>

        <p
          className={`${styles.subtitle} body-text ${loaded ? styles.subtitleRevealed : ""}`}
        >
          Systems that think. Interfaces that breathe.
        </p>

        <div className={`${styles.year} ${loaded ? styles.revealed : ""}`}>
          2025
        </div>
      </div>
    </section>
  );
}

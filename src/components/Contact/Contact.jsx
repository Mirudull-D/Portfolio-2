import React from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.center}>
        <h2 className={styles.heading}>
          <span className={styles.line1}>LET'S</span>
          <br />
          <span 
            className={`${styles.line2} misregister`}
            data-text="BUILD"
            style={{ '--misregister-color': 'var(--riso-green)' }}
          >
            BUILD
          </span>
        </h2>

        <a 
          href="mailto:d.mirudull@gmail.com"
          className={`${styles.email} interactive-text`}
          style={{ '--strike-color': 'var(--riso-green)' }}
        >
          d.mirudull@gmail.com
        </a>

        <div className={styles.links}>
          <a 
            href="https://github.com/Mirudull-D" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            GITHUB
          </a>
          <a 
            href="https://www.linkedin.com/in/mirudull-d" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            LINKEDIN
          </a>
        </div>
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerText}>© MIRUDULL 2025</span>
        <span className={styles.footerText}>BUILT WITH INTENTION</span>
      </footer>
    </section>
  );
}

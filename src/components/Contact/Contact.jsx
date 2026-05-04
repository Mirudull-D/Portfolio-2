import React from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.textSide}>
            <h2 className={styles.bigTitle}>
              LET'S
              <br />
              BUILD
              <br />
              SOMETHING
            </h2>
            <p className={styles.subText}>
              I'm always open to new opportunities and collaborations. 
              Drop a message and let's turn your idea into reality.
            </p>
          </div>

          <div className={styles.formWrapper}>
            <h2 className={styles.formHeading}>GET IN TOUCH _</h2>
            
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>NAME</label>
                <input type="text" placeholder="Miru" className={styles.input} />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>EMAIL</label>
                <input type="email" placeholder="d.mirudull@gmail.com" className={styles.input} />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>MESSAGE</label>
                <textarea placeholder="Your Message..." className={styles.textarea}></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>
                SEND MESSAGE 
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={styles.sendIcon}
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.links}>
            <a href="https://github.com/Mirudull-D" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GITHUB</a>
            <a href="https://www.linkedin.com/in/mirudull-d" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LINKEDIN</a>
            <a href="mailto:d.mirudull@gmail.com" className={styles.socialLink}>EMAIL</a>
          </div>

          <footer className={styles.footer}>
            <div className={styles.footerLeft}><span className={styles.footerText}>© MIRUDULL 2025</span></div>
            <div className={styles.footerCenter}><span className={styles.footerText}>BUILT WITH INTENTION</span></div>
            <div className={styles.footerRight}><span className={styles.footerText}>BASED IN CHENNAI · INDIA</span></div>
          </footer>
        </div>
      </div>
    </section>
  );
}

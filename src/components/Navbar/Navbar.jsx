import { useState } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'STACK', href: '#stack' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar} data-navbar="true">
      <div className={styles.logo}>MIRUDULL</div>

      <div className={styles.centerLinks}>
        {navLinks.map(link => (
          <a
            key={link.label}
            href={link.href}
            onClick={e => handleNavClick(e, link.href)}
            className={styles.navLink}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className={styles.rightLinks}>
        <a href="https://github.com/Mirudull-D" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/><path d="M9 18c-4.5 1-5-2.5-7-3"/></svg>
        </a>
        <a href="https://linkedin.com/in/mirudull" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.resumeBtn}>
          RESUME
        </a>
      </div>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ''}`} />
        <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ''}`} />
        <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ''}`} />
      </button>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        {navLinks.map(link => (
          <a
            key={link.label}
            href={link.href}
            onClick={e => handleNavClick(e, link.href)}
            className={styles.mobileNavLink}
          >
            {link.label}
          </a>
        ))}
        <div className={styles.mobileSocials}>
          <a href="https://github.com/Mirudull-D" target="_blank" rel="noopener noreferrer" className={styles.mobileSocialLink}>GITHUB</a>
          <a href="https://linkedin.com/in/mirudull" target="_blank" rel="noopener noreferrer" className={styles.mobileSocialLink}>LINKEDIN</a>
        </div>
      </div>
    </nav>
  );
}

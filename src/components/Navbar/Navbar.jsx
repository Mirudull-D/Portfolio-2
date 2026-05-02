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
    <nav className={styles.navbar}>
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

      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.resumeBtn}>
        RESUME
      </a>

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
      </div>
    </nav>
  );
}

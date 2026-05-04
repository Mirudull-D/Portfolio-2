import React, { useEffect, useState, useCallback, useRef } from "react";
import Hero from "./components/Hero/Hero";
import Work from "./components/Work/Work";
import About from "./components/About/About";
import Stack from "./components/Stack/Stack";
import Experience from "./components/Experience/Experience";
import Contact from "./components/Contact/Contact";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import Navbar from "./components/Navbar/Navbar";
import Mascot from "./components/Mascot/Mascot";
import PageLoader from "./components/PageLoader/PageLoader";
import Terminal from "./components/Terminal/Terminal";
import IdleDim from "./components/EasterEggs/IdleDim";
import Rain from "./components/EasterEggs/Rain";
import "./index.css";

const Grain = () => (
  <svg className="grain-overlay">
    <filter id="noiseFilter">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.8"
        numOctaves="3"
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [terminal, setTerminal] = useState(false);
  const [isInverted, setIsInverted] = useState(false);
  const [rainActive, setRainActive] = useState(false);
  const [broken404, setBroken404] = useState(false);
  const [fixing404, setFixing404] = useState(false);

  const invertedRef = useRef(false);
  const mainRef = useRef(null);
  const navbarRef = useRef(null);
  const originalPositionsRef = useRef(null);
  const rainCooldownRef = useRef(false);
  const sectionsBreakableRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const nav = document.querySelector(`[data-navbar="true"]`);
    const main = document.querySelector(`[data-main="true"]`);
    if (nav) navbarRef.current = nav;
    if (main) {
      mainRef.current = main;
      const sections = main.querySelectorAll("section");
      sectionsBreakableRef.current = Array.from(sections);
    }
  }, [loading]);

  useEffect(() => {
    let buffer = "";
    let timer = null;

    const handleKeydown = (e) => {
      if (terminal && e.key === "Escape") {
        setTerminal(false);
        return;
      }
      if (loading || terminal) return;

      buffer += e.key.toUpperCase();
      if (buffer.length > 6) buffer = buffer.slice(-6);

      if (buffer === "INVERT") {
        document.body.classList.add("glitch-active");

        const elements = document.querySelectorAll("h1, h2, h3, p, span, div");
        elements.forEach((el) => {
          const originalTransform = el.style.transform;
          const randomX = (Math.random() - 0.5) * 20;
          const randomY = (Math.random() - 0.5) * 10;
          el.style.transform = `translate(${randomX}px, ${randomY}px)`;
          el.style.textShadow = "2px 0 #FF3B3B, -2px 0 #4ECDC4";

          setTimeout(() => {
            el.style.transform = originalTransform;
            el.style.textShadow = "none";
          }, 150);
        });

        setTimeout(() => {
          document.body.classList.remove("glitch-active");
          setIsInverted((prev) => {
            const next = !prev;
            invertedRef.current = next;
            document.body.classList.toggle("inverted", next);
            return next;
          });
        }, 400);
        buffer = "";
        clearTimeout(timer);
        timer = setTimeout(() => {
          buffer = "";
        }, 2000);
        return;
      }

      if (buffer.length >= 3) {
        const suffix = buffer.slice(-3);
        if (suffix === "404" && !broken404) {
          trigger404Break();
          buffer = "";
          clearTimeout(timer);
          timer = setTimeout(() => {
            buffer = "";
          }, 2000);
          return;
        }
      }

      if (buffer.length >= 4) {
        const suffix = buffer.slice(-4);
        if (suffix === "RAIN" && !rainCooldownRef.current) {
          setRainActive(true);
          rainCooldownRef.current = true;
          setTimeout(() => {
            setRainActive(false);
            setTimeout(() => {
              rainCooldownRef.current = false;
            }, 3000);
          }, 4000);
          buffer = "";
          clearTimeout(timer);
          timer = setTimeout(() => {
            buffer = "";
          }, 2000);
          return;
        }
      }

      clearTimeout(timer);
      timer = setTimeout(() => {
        buffer = "";
      }, 2000);
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      clearTimeout(timer);
    };
  }, [loading, terminal, broken404]);

  const trigger404Break = useCallback(() => {
    const sections = sectionsBreakableRef.current;
    if (sections.length === 0) return;

    originalPositionsRef.current = sections.map((section) => {
      const style = window.getComputedStyle(section);
      return {
        position: style.position,
        top: style.top,
        left: style.left,
        transform: style.transform,
        zIndex: style.zIndex,
      };
    });

    sections.forEach((section) => {
      const randomTop = Math.random() * 60 + 5;
      const randomLeft = Math.random() * 80 + 5;
      const randomZ = Math.floor(Math.random() * 20) + 1;

      section.style.position = "absolute";
      section.style.top = `${randomTop}%`;
      section.style.left = `${randomLeft}%`;
      section.style.zIndex = randomZ;
      section.style.transition = "all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)";
    });

    if (navbarRef.current) {
      navbarRef.current.style.transition =
        "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)";
      navbarRef.current.style.transform = "rotate(15deg)";
    }

    setBroken404(true);
  }, []);

  const fix404 = useCallback(() => {
    const sections = sectionsBreakableRef.current;
    const originals = originalPositionsRef.current;
    if (!sections.length || !originals) return;

    setFixing404(true);

    sections.forEach((section, i) => {
      const orig = originals[i];
      section.style.transition = "all 800ms cubic-bezier(0.76, 0, 0.24, 1)";
      section.style.position = orig.position;
      section.style.top = orig.top;
      section.style.left = orig.left;
      section.style.zIndex = orig.zIndex;
    });

    if (navbarRef.current) {
      navbarRef.current.style.transition =
        "transform 800ms cubic-bezier(0.76, 0, 0.24, 1)";
      navbarRef.current.style.transform = "rotate(0deg)";
    }

    setTimeout(() => {
      sections.forEach((section, i) => {
        const orig = originals[i];
        section.style.transition = "";
        section.style.position = orig.position;
        section.style.top = orig.top;
        section.style.left = orig.left;
        section.style.zIndex = orig.zIndex;
      });

      if (navbarRef.current) {
        navbarRef.current.style.transition = "";
        navbarRef.current.style.transform = "rotate(0deg)";
      }

      setBroken404(false);
      setFixing404(false);
      originalPositionsRef.current = null;
    }, 800);
  }, []);

  useEffect(() => {
    if (!isInverted) return;

    let timeoutId;

    const scheduleGlitch = () => {
      if (!invertedRef.current) return;

      const elements = document.querySelectorAll(
        "h1, h2, h3, p, a, span.label-text",
      );
      if (elements.length === 0) return;

      const count = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * elements.length);
        const el = elements[idx];
        if (!el) continue;

        const shift = (Math.random() - 0.5) * 2;
        el.style.transition = "none";
        el.style.transform = `translateX(${shift}px)`;
        el.style.textShadow = `1px 0 rgba(255,59,59,0.3), -1px 0 rgba(78,205,196,0.3)`;

        setTimeout(() => {
          el.style.transform = "";
          el.style.textShadow = "none";
        }, 80);
      }

      timeoutId = setTimeout(scheduleGlitch, 2000 + Math.random() * 3000);
    };

    timeoutId = setTimeout(scheduleGlitch, 2000 + Math.random() * 3000);

    return () => clearTimeout(timeoutId);
  }, [isInverted]);

  const handleLoaderDone = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <PageLoader onDone={handleLoaderDone} />}
      {terminal && <Terminal onClose={() => setTerminal(false)} />}
      {!loading && <IdleDim />}
      <Rain active={rainActive} />
      <Navbar />
    
      <Mascot />
      <Grain />
      <ScrollProgress />
      <main data-main="true">
        <Hero />
        <Work />
        <About />
        <Stack />
        <Experience />
        <Contact />
      </main>

      {broken404 && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 99999,
          }}
        >
          <button
            onClick={fix404}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#FFF",
              border: "1px solid var(--riso-red)",
              background: "var(--riso-red)",
              padding: "12px 24px",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "var(--riso-red)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "var(--riso-red)";
              e.target.style.color = "#FFF";
            }}
          >
            [ FIX IT ]
          </button>
        </div>
      )}
    </>
  );
}

export default App;

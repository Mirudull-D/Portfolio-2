import React, { useEffect, useState, useCallback, useRef } from "react";
import Hero from "./components/Hero/Hero";
import Work from "./components/Work/Work";
import About from "./components/About/About";
import Stack from "./components/Stack/Stack";
import Experience from "./components/Experience/Experience";
import Contact from "./components/Contact/Contact";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import Navbar from "./components/Navbar/Navbar";
import PageLoader from "./components/PageLoader/PageLoader";
import Terminal from "./components/Terminal/Terminal";
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
  const [wrongGravity, setWrongGravity] = useState(false);
  const [isInverted, setIsInverted] = useState(false);
  const invertedRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let buffer = "";
    let timer = null;

    const handleKeydown = (e) => {
      if (wrongGravity && e.key === "Escape") return;
      if (terminal && e.key === "Escape") {
        setTerminal(false);
        return;
      }
      if (loading || terminal || wrongGravity) return;

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
  }, [loading, terminal, wrongGravity]);

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
        el.style.transition = 'none';
        el.style.transform = `translateX(${shift}px)`;
        el.style.textShadow = `1px 0 rgba(255,59,59,0.3), -1px 0 rgba(78,205,196,0.3)`;

        setTimeout(() => {
          el.style.transform = '';
          el.style.textShadow = 'none';
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
      {wrongGravity && <WrongGravity onClose={() => setWrongGravity(false)} />}
      <Navbar />
      <Grain />
      <ScrollProgress />
      <main>
        <Hero />
        <Work />
        <About />
        <Stack />
        <Experience />
        <Contact />
      </main>
    </>
  );
}

export default App;

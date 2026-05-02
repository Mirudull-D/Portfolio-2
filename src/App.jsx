import React, { useEffect, useState, useCallback } from 'react';
import Hero from './components/Hero/Hero';
import Work from './components/Work/Work';
import About from './components/About/About';
import Stack from './components/Stack/Stack';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Navbar from './components/Navbar/Navbar';
import PageLoader from './components/PageLoader/PageLoader';
import Terminal from './components/Terminal/Terminal';
import './index.css';

const Grain = () => (
  <svg className="grain-overlay">
    <filter id="noiseFilter">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.8" 
        numOctaves="3" 
        stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [terminal, setTerminal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let buffer = '';
    let timer = null;

    const handleKeydown = (e) => {
      if (loading || terminal) return;
      buffer += e.key.toUpperCase();
      if (buffer.length > 4) buffer = buffer.slice(-4);
      if (buffer === 'MIRU') {
        setTerminal(true);
        buffer = '';
      }
      clearTimeout(timer);
      timer = setTimeout(() => { buffer = ''; }, 1500);
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      clearTimeout(timer);
    };
  }, [loading, terminal]);

  const handleLoaderDone = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <PageLoader onDone={handleLoaderDone} />}
      {terminal && <Terminal onClose={() => setTerminal(false)} />}
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

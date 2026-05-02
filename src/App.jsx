import React, { useEffect } from 'react';
import Hero from './components/Hero/Hero';
import Work from './components/Work/Work';
import About from './components/About/About';
import Stack from './components/Stack/Stack';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
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

import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import NavigationRail from './components/NavigationRail';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Capabilities from './components/Capabilities';
import CurrentFocus from './components/CurrentFocus';
import About from './components/About';
import OpenTo from './components/OpenTo';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for slim left vertical Navigation Rail
  useEffect(() => {
    const sectionIds = ['hero', 'work', 'skills', 'about', 'focus', 'contact'];
    const observers = [];

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-35% 0px -40% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observers.push(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [loadingComplete]);

  return (
    <div className="app-layout-root">
      {/* Initial Mission Control Loading Screen with SS Monogram */}
      {!loadingComplete && (
        <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Slim Fixed Left Vertical Navigation Rail */}
      <NavigationRail activeSection={activeSection} />

      {/* Main Content Stream */}
      <main id="main-content" className="main-content-flow">
        <Hero />
        <Projects />
        <Skills />
        <Capabilities />
        <CurrentFocus />
        <About />
        <OpenTo />
        <Contact />
      </main>

      {/* Mission Control Footer */}
      <Footer />
    </div>
  );
}

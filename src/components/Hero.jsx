import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Terminal } from 'lucide-react';
import HeroScene from './HeroScene';
import { portfolioData } from '../data/portfolio';

export default function Hero() {
  const { identity } = portfolioData;

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section" aria-label="Command Center Hero">
      {/* Procedural 3D Mission Control Environment (Right/Background) */}
      <HeroScene />

      {/* Asymmetric Left Command Content */}
      <div className="hero-content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="hero-text-block"
        >
          {/* Telemetry Status Line */}
          <div className="hero-status-pill">
            <span className="status-indicator-dot" aria-hidden="true" />
            <span className="status-indicator-text">{identity.status}</span>
          </div>

          {/* Semantic Main Heading */}
          <h1 className="hero-title">{identity.name}</h1>

          {/* Primary Role */}
          <div className="hero-role-badge">
            <h2>{identity.role}</h2>
          </div>

          {/* Thin Amber Divider */}
          <div className="hero-amber-divider" aria-hidden="true" />

          {/* Primary Short Introduction */}
          <p className="hero-intro-text">
            {identity.heroIntro}
          </p>

          {/* Supporting Short Line */}
          <p className="hero-supporting-text">
            {identity.heroSupporting}
          </p>

          {/* Primary Focus Tags */}
          <div className="hero-focus-tags" aria-label="Core Focus Areas">
            {identity.primaryFocus.map((focus) => (
              <span key={focus} className="tech-tag">
                {focus}
              </span>
            ))}
          </div>

          {/* Mission Control CTAs */}
          <div className="hero-actions">
            <a
              href="#work"
              onClick={(e) => scrollToSection(e, '#work')}
              className="hud-btn hud-btn-primary"
            >
              <span>[ EXPLORE WORK ]</span>
              <ArrowDown size={14} />
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="hud-btn hud-btn-secondary"
            >
              <Terminal size={14} />
              <span>[ TRANSMIT SIGNAL ]</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Corner Telemetry Coordinates */}
      <div className="hero-telemetry-overlay" aria-hidden="true">
        <span>LOC: {identity.coordinates}</span>
        <span>CORE: {identity.version}</span>
      </div>
    </section>
  );
}

import React from 'react';
import { portfolioData } from '../data/portfolio';
import SSMonogram from './SSMonogram';

export default function NavigationRail({ activeSection = 'hero' }) {
  const { sections } = portfolioData;

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="nav-rail" aria-label="Mission Navigation Rail">
      {/* Top Brand Monogram — Clickable to Hero */}
      <div className="nav-rail-top">
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, 'hero')}
          className="nav-rail-logo"
          aria-label="Return to Hero section"
        >
          <SSMonogram size={26} strokeColor="var(--accent)" glow={true} showFraming={false} />
        </a>
      </div>

      {/* Middle Dot Navigation */}
      <nav className="nav-rail-menu" aria-label="Navigation Sections">
        <ul className="nav-rail-list">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <li key={section.id} className="nav-rail-item">
                <a
                  href={`#${section.id}`}
                  onClick={(e) => scrollToSection(e, section.id)}
                  className={`nav-dot-link ${isActive ? 'active' : ''}`}
                  aria-label={`Jump to ${section.label} section`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="nav-dot" aria-hidden="true" />
                  <span className="nav-dot-tooltip" role="tooltip">
                    <span className="tooltip-code">{section.code}</span>
                    <span className="tooltip-label">{section.label}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Telemetry Monospace Metadata */}
      <div className="nav-rail-bottom" aria-hidden="true">
        <span className="nav-rail-coord">SYS</span>
        <span className="nav-rail-status-dot" />
      </div>
    </aside>
  );
}

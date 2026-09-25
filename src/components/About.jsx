import React from 'react';
import { portfolioData } from '../data/portfolio';

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="content-section" aria-label="About Developer">
      <header className="section-hud-header">
        <span className="section-badge-code">05 // DEVELOPER PROFILE</span>
        <h2 className="section-main-title">About</h2>
        <div className="section-glow-line" />
      </header>

      <div className="about-panel-box">
        {/* Core verified positioning text */}
        <div className="about-main-statement">
          <p className="about-lead-paragraph">
            {about.coreMessage}
          </p>
        </div>

        {/* Structured Technical Discipline Breakdown */}
        <div className="about-spec-grid">
          <div className="about-spec-column">
            <span className="spec-label">PRIMARY ROLE</span>
            <span className="spec-value">{about.primaryRole}</span>
          </div>

          <div className="about-spec-column">
            <span className="spec-label">DEVELOPER POSITIONING</span>
            <ul className="spec-list">
              {about.focusAreas.map((area) => (
                <li key={area} className="spec-item">
                  <span className="spec-dash">—</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-spec-column">
            <span className="spec-label">PRIMARY FOCUS</span>
            <div className="spec-tags-wrap">
              {about.technicalBreadth.map((item) => (
                <span key={item} className="tech-tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

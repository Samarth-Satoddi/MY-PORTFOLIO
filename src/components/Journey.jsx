import React from 'react';
import { portfolioData } from '../data/portfolio';

export default function Journey() {
  const { journey } = portfolioData;

  return (
    <section id="journey" className="content-section" aria-label="Journey and Experience">
      <header className="section-hud-header">
        <span className="section-badge-code">{journey.badge}</span>
        <h2 className="section-main-title">{journey.title}</h2>
        <p className="section-desc-sub">{journey.subtitle}</p>
        <div className="section-glow-line" />
      </header>

      <div className="timeline-track-wrapper">
        {journey.milestones.map((milestone) => (
          <div key={milestone.title} className="timeline-item">
            <span className="timeline-node-dot" aria-hidden="true" />
            <div className="timeline-card">
              <div className="timeline-year-tag">
                {milestone.year} // {milestone.category}
              </div>
              <h3 className="timeline-title">{milestone.title}</h3>
              <p className="timeline-desc">{milestone.description}</p>
              <div className="timeline-tags">
                {milestone.tags.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

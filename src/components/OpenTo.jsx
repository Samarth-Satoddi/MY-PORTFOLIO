import React from 'react';
import { portfolioData } from '../data/portfolio';

export default function OpenTo() {
  const { openTo } = portfolioData;

  return (
    <section id="open-to" className="content-section" aria-label="Open Opportunities">
      <header className="section-hud-header">
        <span className="section-badge-code">06 // COLLABORATION HORIZONS</span>
        <h2 className="section-main-title">Open To</h2>
        <div className="section-glow-line" />
      </header>

      <div className="open-to-panel">
        <div className="open-to-grid">
          {openTo.map((item, index) => {
            const indexStr = String(index + 1).padStart(2, '0');
            return (
              <div key={item} className="open-to-card">
                <div className="open-to-top">
                  <span className="open-to-channel">CH-{indexStr}</span>
                  <span className="open-to-indicator" />
                </div>
                <div className="open-to-text">{item}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { portfolioData } from '../data/portfolio';

export default function CurrentFocus() {
  const { currentFocus } = portfolioData;

  return (
    <section id="focus" className="content-section" aria-label="Current Technical Focus">
      <header className="section-hud-header">
        <span className="section-badge-code">04 // ACTIVE VECTORS</span>
        <h2 className="section-main-title">Current Focus</h2>
        <p className="section-desc-sub">
          Current technical focus areas undergoing active development, architecture exploration, and benchmark testing.
        </p>
        <div className="section-glow-line" />
      </header>

      {/* Mission Control Status Panel */}
      <div className="focus-panel-container">
        <div className="focus-panel-header">
          <div className="focus-panel-title">MISSION DIRECTIVES // TECHNICAL VECTORS</div>
          <div className="focus-panel-meta">ALL CHANNELS ACTIVE // NO METRIC FABRICATION</div>
        </div>

        <div className="focus-grid">
          {currentFocus.map((focusItem, index) => {
            const indexStr = String(index + 1).padStart(2, '0');
            return (
              <div key={focusItem} className="focus-item-card">
                <div className="focus-item-top">
                  <span className="focus-index-tag">VECTOR-{indexStr}</span>
                  <span className="focus-live-dot" aria-hidden="true" />
                </div>
                <div className="focus-name-label">{focusItem}</div>
                <div className="focus-bar-visual" aria-hidden="true">
                  <span className="focus-bar-tick active" />
                  <span className="focus-bar-tick active" />
                  <span className="focus-bar-tick active" />
                  <span className="focus-bar-tick" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

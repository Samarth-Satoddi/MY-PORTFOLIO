import React from 'react';
import { portfolioData } from '../data/portfolio';

export default function Capabilities() {
  const { capabilities } = portfolioData;

  return (
    <section id="capabilities" className="content-section" aria-label="What I Do">
      <header className="section-hud-header">
        <span className="section-badge-code">03 // OPERATIONAL SCOPE</span>
        <h2 className="section-main-title">What I Do</h2>
        <p className="section-desc-sub">
          Core engineering disciplines applied across production software and intelligent systems.
        </p>
        <div className="section-glow-line" />
      </header>

      {/* Asymmetric Typography & Technical Separators */}
      <div className="capabilities-telemetry-panel">
        <div className="capabilities-list">
          {capabilities.map((item, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            return (
              <div key={item} className="capability-row">
                <div className="capability-prefix">
                  <span className="capability-num">{num}</span>
                  <span className="capability-divider">/</span>
                  <span className="capability-code">SYS-OP</span>
                </div>

                <div className="capability-text-box">
                  <span className="capability-statement">{item}</span>
                </div>

                <div className="capability-telemetry-tag">
                  <span className="tag-status">ACTIVE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { portfolioData } from '../data/portfolio';

export default function Intelligence() {
  const { intelligence } = portfolioData;

  return (
    <section id="intelligence" className="content-section" aria-label="Intelligence Systems">
      <header className="section-hud-header">
        <span className="section-badge-code">{intelligence.badge}</span>
        <h2 className="section-main-title">{intelligence.title}</h2>
        <p className="section-desc-sub">{intelligence.subtitle}</p>
        <div className="section-glow-line" />
      </header>

      {/* Futuristic Neural Topology Grid */}
      <div className="intelligence-network-container">
        {intelligence.nodes.map((node) => (
          <div key={node.name} className="intelligence-node-card">
            <div className="node-header">
              <span className="node-beacon-circle" aria-hidden="true" />
              <h3 className="node-name">{node.name}</h3>
            </div>
            <p className="node-desc">{node.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

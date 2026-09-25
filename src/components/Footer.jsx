import React from 'react';
import SSMonogram from './SSMonogram';
import { portfolioData } from '../data/portfolio';

export default function Footer() {
  const { identity } = portfolioData;

  return (
    <footer className="footer-container" aria-label="Mission Control Telemetry Footer">
      <div className="footer-inner">
        <div className="footer-brand-side">
          <SSMonogram size={28} strokeColor="#F5A65B" glow={false} />
          <div className="footer-text-group">
            <span className="footer-name">{identity.name}</span>
            <span className="footer-role">{identity.role}</span>
          </div>
        </div>

        <div className="footer-center-telemetry">
          <span className="telemetry-pill">MISSION CONTROL // STATIC BUILD</span>
          <span className="telemetry-coords">{identity.coordinates}</span>
        </div>

        <div className="footer-right-status">
          <span className="footer-version">{identity.version}</span>
          <span className="footer-nominal-dot" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}

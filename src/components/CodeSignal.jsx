import React from 'react';
import { Terminal, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export default function CodeSignal() {
  const { codeSignal } = portfolioData;
  const { terminal } = codeSignal;

  return (
    <section id="code-signal" className="content-section" aria-label="Code Signal and Telemetry">
      <header className="section-hud-header">
        <span className="section-badge-code">{codeSignal.badge}</span>
        <h2 className="section-main-title">{codeSignal.title}</h2>
        <p className="section-desc-sub">
          Continuous telemetry monitoring repository commits, container builds, and agentic workflows.
        </p>
        <div className="section-glow-line" />
      </header>

      <div className="terminal-window">
        {/* Terminal Title Bar */}
        <div className="terminal-titlebar">
          <div className="terminal-dots">
            <span className="terminal-dot" />
            <span className="terminal-dot" />
            <span className="terminal-dot" />
          </div>
          <span className="terminal-title-text">SAMARTH // TELEMETRY TERMINAL [SSH:PORT 22]</span>
          <a
            href="https://github.com/samarth092006"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontSize: '0.75rem' }}
          >
            <span>GITHUB</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body">
          <div className="terminal-prompt-line">
            <span>{terminal.user} cat system_status.log</span>
          </div>

          <div style={{ color: 'var(--accent-gold)' }}>
            &gt; {terminal.status}
          </div>
          <div style={{ color: 'var(--metallic-silver)' }}>
            &gt; DEVELOPER: {terminal.developer} | STATE: {terminal.state}
          </div>
          <div style={{ color: 'var(--text-muted)' }}>
            &gt; FOCUS: {terminal.focus}
          </div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>
            &gt; VCS: {terminal.commitHash}
          </div>

          {/* Telemetry Stats Grid */}
          <div className="terminal-stats-grid">
            {terminal.stats.map((s) => (
              <div key={s.label} className="terminal-stat-item">
                <span className="terminal-stat-label">{s.label}</span>
                <span className="terminal-stat-value">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Real-time System Logs */}
          <div className="terminal-log-output">
            {terminal.recentLog.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

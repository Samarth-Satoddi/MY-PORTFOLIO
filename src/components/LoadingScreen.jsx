import React, { useState, useEffect } from 'react';
import SSMonogram from './SSMonogram';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING VISUAL SYSTEM...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const sequence = [
      { p: 25, text: 'INITIALIZING VISUAL SYSTEM...', delay: 200 },
      { p: 58, text: 'CALIBRATING SS PROCEDURAL GEOMETRY...', delay: 500 },
      { p: 84, text: 'CONFIGURING TELEMETRY & FIBONACCI SPHERE...', delay: 900 },
      { p: 100, text: 'MISSION CONTROL NOMINAL // READY', delay: 1300 },
    ];

    const timers = sequence.map(({ p, text, delay }) =>
      setTimeout(() => {
        setProgress(p);
        setStatusText(text);
        if (p === 100) {
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 400);
          }, 300);
        }
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`loading-screen ${isDone ? 'fade-out' : ''}`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Mission Control Initializing"
    >
      <div className="loading-container">
        {/* Procedural Vector SS Monogram with Technical Framing */}
        <div className="loading-logo-box">
          <SSMonogram size={72} strokeColor="#F5A65B" glow={true} showFraming={true} />
        </div>

        {/* Technical Title */}
        <div className="loading-brand-title">SAMARTH // MISSION CONTROL</div>

        {/* Subtitle / Telemetry Status */}
        <div className="loading-status-text">{statusText}</div>

        {/* Thin Amber Telemetry Progress Bar */}
        <div className="loading-track">
          <div className="loading-bar" style={{ width: `${progress}%` }} />
        </div>

        {/* Metadata Readout */}
        <div className="loading-meta-row">
          <span className="loading-meta-item">STATUS: BOOTING</span>
          <span className="loading-percentage">{progress}%</span>
          <span className="loading-meta-item">DPR: 1.5x ACTIVE</span>
        </div>
      </div>
    </div>
  );
}

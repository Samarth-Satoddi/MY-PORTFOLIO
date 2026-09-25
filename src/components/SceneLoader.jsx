import React from 'react';
import SSMonogram from './SSMonogram';

/**
 * Mission Control styled minimal 3D initialization loader with SS Monogram.
 */
export default function SceneLoader({ label = 'INITIALIZING VISUAL TELEMETRY SYSTEM' }) {
  return (
    <div className="scene-loader-container" role="status" aria-live="polite">
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="scene-loader-reticle" aria-hidden="true" style={{ position: 'absolute', width: '56px', height: '56px' }} />
        <SSMonogram size={34} glow={true} strokeColor="#F5A65B" />
      </div>
      <span className="scene-loader-text" style={{ marginTop: '12px' }}>{label}</span>
      <span className="scene-fallback-sub">SAMARTH // SS TELEMETRY ONLINE</span>
    </div>
  );
}

import React from 'react';
import ssLogo from '../assets/ss-logo.png';

/**
 * Authentic SS Monogram — Samarth's Signature Brand Mark
 * Powered by the high-precision metallic photo insignia with screen blending.
 */
export default function SSMonogram({
  size = 32,
  className = '',
  glow = false,
  showFraming = false,
  style = {},
}) {
  return (
    <div
      className={`ss-monogram-wrapper ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        filter: glow ? 'drop-shadow(0 0 12px rgba(245, 166, 91, 0.6))' : 'none',
        ...style,
      }}
      aria-label="Samarth SS Monogram"
      role="img"
    >
      <img
        src={ssLogo}
        alt="Samarth SS Monogram"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          mixBlendMode: 'screen',
          WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 56%, rgba(0,0,0,0) 74%)',
          maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 56%, rgba(0,0,0,0) 74%)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </div>
  );
}

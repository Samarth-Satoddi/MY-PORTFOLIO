import React from 'react';

/**
 * Isolated Error Boundary for 3D canvases.
 * Prevents WebGL or Three.js runtime crashes from failing the host page.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('3D Canvas encountered an isolated rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="scene-fallback-container" role="alert">
          <span className="scene-fallback-text">
            {this.props.title || 'TELEMETRY SIMULATION // 2D STATIC FALLBACK'}
          </span>
          <span className="scene-fallback-sub">
            {this.props.subtitle || '3D context unavailable. Interface nominal.'}
          </span>
        </div>
      );
    }

    return this.props.children;
  }
}

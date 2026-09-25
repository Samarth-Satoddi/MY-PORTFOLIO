import React, { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import ErrorBoundary from './ErrorBoundary';
import { isWebGLAvailable } from '../utils/webgl';

function StaticShapeSvg({ shape }) {
  switch (shape) {
    case 'torus':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '48px', height: '48px' }}>
          <ellipse cx="32" cy="32" rx="22" ry="12" stroke="#F5A65B" strokeWidth="1.2" />
          <ellipse cx="32" cy="32" rx="10" ry="5" stroke="#7C8A99" strokeWidth="1.2" />
          <line x1="10" y1="32" x2="22" y2="32" stroke="#2A3742" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="42" y1="32" x2="54" y2="32" stroke="#2A3742" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );
    case 'octahedron':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '48px', height: '48px' }}>
          <polygon points="32,8 52,32 32,56 12,32" stroke="#F5A65B" strokeWidth="1.2" />
          <line x1="12" y1="32" x2="52" y2="32" stroke="#7C8A99" strokeWidth="1.2" />
          <line x1="32" y1="8" x2="32" y2="56" stroke="#2A3742" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );
    case 'icosahedron':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '48px', height: '48px' }}>
          <polygon points="32,8 52,20 52,44 32,56 12,44 12,20" stroke="#F5A65B" strokeWidth="1.2" />
          <polygon points="32,20 44,28 44,36 32,44 20,36 20,28" stroke="#7C8A99" strokeWidth="1" />
          <line x1="32" y1="8" x2="32" y2="20" stroke="#F5A65B" strokeWidth="1" />
        </svg>
      );
    case 'cone':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '48px', height: '48px' }}>
          <polygon points="32,8 52,48 12,48" stroke="#F5A65B" strokeWidth="1.2" />
          <ellipse cx="32" cy="48" rx="20" ry="6" stroke="#7C8A99" strokeWidth="1" />
          <line x1="32" y1="8" x2="32" y2="54" stroke="#2A3742" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );
    case 'dodecahedron':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '48px', height: '48px' }}>
          <polygon points="32,8 49,15 54,34 40,48 24,48 10,34 15,15" stroke="#F5A65B" strokeWidth="1.2" />
          <polygon points="32,20 40,24 42,33 36,40 28,40 22,33 24,24" stroke="#7C8A99" strokeWidth="1" />
        </svg>
      );
    case 'cube':
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '48px', height: '48px' }}>
          <polygon points="32,10 52,22 32,34 12,22" stroke="#F5A65B" strokeWidth="1.2" />
          <polygon points="12,22 32,34 32,54 12,42" stroke="#7C8A99" strokeWidth="1.2" />
          <polygon points="52,22 32,34 32,54 52,42" stroke="#2A3742" strokeWidth="1.2" />
        </svg>
      );
  }
}

function LiveShapeMesh({ shape, reducedMotion }) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (!meshRef.current || reducedMotion) return;
    meshRef.current.rotation.x += delta * 0.75;
    meshRef.current.rotation.y += delta * 1.1;
  });

  const renderGeometry = () => {
    switch (shape) {
      case 'torus':
        return <torusGeometry args={[0.9, 0.32, 16, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1.2, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1.15, 0]} />;
      case 'cone':
        return <coneGeometry args={[1.0, 1.6, 16, 2]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1.05, 0]} />;
      case 'cube':
      default:
        return <boxGeometry args={[1.3, 1.3, 1.3]} />;
    }
  };

  return (
    <group ref={meshRef}>
      {/* Outer Amber Wireframe */}
      <mesh>
        {renderGeometry()}
        <meshStandardMaterial
          wireframe
          color="#F5A65B"
          emissive="#F5A65B"
          emissiveIntensity={0.85}
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>
      {/* Inner Graphite Metallic Core */}
      <mesh scale={0.8}>
        {renderGeometry()}
        <meshStandardMaterial
          color="#131A22"
          roughness={0.5}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

export default function ProjectPreview({ shape, isHovered }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglSupported] = useState(() => isWebGLAvailable());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <div className="project-preview-wrapper" aria-hidden="true">
      {isHovered && webglSupported ? (
        <ErrorBoundary fallback={<StaticShapeSvg shape={shape} />}>
          <Suspense fallback={<div className="preview-canvas-placeholder" />}>
            <div className="preview-canvas-container">
              <Canvas
                camera={{ position: [0, 0, 3.2], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
              >
                <ambientLight intensity={0.65} />
                <pointLight position={[3, 3, 3]} intensity={1.5} color="#F5A65B" />
                <pointLight position={[-2, -2, -2]} intensity={0.5} color="#7C8A99" />
                <LiveShapeMesh shape={shape} reducedMotion={reducedMotion} />
              </Canvas>
            </div>
          </Suspense>
        </ErrorBoundary>
      ) : (
        <div className="preview-static-container">
          <StaticShapeSvg shape={shape} />
        </div>
      )}
    </div>
  );
}

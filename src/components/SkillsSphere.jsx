import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import ErrorBoundary from './ErrorBoundary';
import SceneLoader from './SceneLoader';
import { portfolioData } from '../data/portfolio';
import { isWebGLAvailable } from '../utils/webgl';

// Calculate points on a sphere using the Fibonacci golden angle spiral
function getFibonacciSpherePoints(samples, radius = 2.4) {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle (~2.39996 rad)

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (Math.max(samples - 1, 1))) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

function SphereNodes({ isHovered, reducedMotion }) {
  const groupRef = useRef();
  const { sphereSkills } = portfolioData;

  const points = useMemo(() => {
    return getFibonacciSpherePoints(sphereSkills.length, 2.35);
  }, [sphereSkills.length]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Auto-rotates slowly; pauses on hover and under reduced-motion
    if (!isHovered && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.14;
      groupRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Subtle orbital wireframe framework */}
      <mesh>
        <icosahedronGeometry args={[2.32, 1]} />
        <meshStandardMaterial
          wireframe
          color="#2A3742"
          roughness={0.9}
          metalness={0.2}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Latitudinal reference rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.3, 2.32, 64]} />
        <meshBasicMaterial color="#394B5A" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[2.3, 2.32, 64]} />
        <meshBasicMaterial color="#394B5A" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Fibonacci Distributed Skills */}
      {sphereSkills.map((skill, index) => {
        const position = points[index] || new THREE.Vector3(0, 0, 0);
        const isCore = skill.category === 'core' || skill.category === 'ai';

        return (
          <group key={skill.name} position={position}>
            {/* Small glowing anchor node */}
            <mesh>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshBasicMaterial color={isCore ? '#F5A65B' : '#7C8A99'} />
            </mesh>

            {/* Billboarded HTML text badge facing camera */}
            <Html
              center
              distanceFactor={6.5}
              position={[0, 0.04, 0]}
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <div
                className={`skill-sphere-badge ${isCore ? 'core' : ''}`}
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  padding: '2px 8px',
                  borderRadius: '2px',
                  color: isCore ? '#F5A65B' : '#E9EEF3',
                  backgroundColor: 'rgba(11, 15, 20, 0.92)',
                  border: `1px solid ${isCore ? 'rgba(245, 166, 91, 0.6)' : '#2A3742'}`,
                  boxShadow: isCore ? '0 0 10px rgba(245, 166, 91, 0.25)' : 'none',
                  textTransform: 'uppercase',
                }}
              >
                {skill.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

// 2D Static Wrapped Skill Fallback (for non-WebGL or mobile screen widths)
export function StaticSkillsFallback() {
  const { sphereSkills } = portfolioData;

  return (
    <div className="skills-fallback-grid" aria-label="Static Skills Inventory">
      {sphereSkills.map((skill) => {
        const isCore = skill.category === 'core' || skill.category === 'ai';
        return (
          <span
            key={skill.name}
            className={`tech-tag ${isCore ? 'highlight' : ''}`}
            style={{
              padding: '6px 12px',
              fontSize: '0.8125rem',
            }}
          >
            <span className="dot-node" style={{ backgroundColor: isCore ? '#F5A65B' : '#7C8A99' }} />
            {skill.name}
          </span>
        );
      })}
    </div>
  );
}

export default function SkillsSphere() {
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglSupported] = useState(() => isWebGLAvailable());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!webglSupported) {
    return (
      <div className="skills-stage-box">
        <StaticSkillsFallback />
      </div>
    );
  }

  return (
    <div
      className="skills-stage-box"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Interactive 3D Fibonacci Skills Sphere (Auto-rotating, pauses on hover)"
    >
      <div className="skills-sphere-telemetry-hint" aria-hidden="true">
        <span>FIBONACCI ORBITAL SPHERE // HOVER TO INSPECT</span>
      </div>

      <ErrorBoundary fallback={<StaticSkillsFallback />}>
        <Suspense fallback={<SceneLoader label="CALIBRATING FIBONACCI SPHERE..." />}>
          <Canvas
            camera={{ position: [0, 0, 5.8], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.8} />
            <pointLight position={[5, 5, 5]} intensity={1.6} color="#F5A65B" />
            <pointLight position={[-4, -4, -3]} intensity={0.6} color="#7C8A99" />
            <SphereNodes isHovered={isHovered} reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

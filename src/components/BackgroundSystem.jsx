import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { isWebGLAvailable } from '../utils/webgl';

function AtmosphericField({ count = 220, reducedMotion }) {
  const pointsRef = useRef();

  const [positions, orig] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const o = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      o[i * 3] = pos[i * 3];
      o[i * 3 + 1] = pos[i * 3 + 1];
      o[i * 3 + 2] = pos[i * 3 + 2];
    }
    return [pos, o];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return;
    const time = state.clock.getElapsedTime() * 0.08;
    const array = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      array[idx + 1] = orig[idx + 1] + Math.sin(time + i * 0.3) * 0.15;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#AEB4BC"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

export default function BackgroundSystem() {
  const [webglSupported, setWebglSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  if (!webglSupported) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1]}
      >
        <AtmosphericField count={220} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}

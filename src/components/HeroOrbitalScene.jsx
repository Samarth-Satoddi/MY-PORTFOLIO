import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ssLogo from '../assets/ss-logo.png';
import { isWebGLAvailable } from '../utils/webgl';

// 3D Ambient Dust & Ember Particles surrounding the SS Insignia
function AmbientDustParticles({ count = 240, reducedMotion }) {
  const pointsRef = useRef();

  const [positions, orig] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const o = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 1.0 + Math.random() * 3.5;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;
      const z = (Math.random() - 0.5) * 2.5;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      o[i * 3] = x;
      o[i * 3 + 1] = y;
      o[i * 3 + 2] = z;
    }
    return [pos, o];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return;
    const time = state.clock.getElapsedTime() * 0.12;
    const array = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      array[idx + 1] = orig[idx + 1] + Math.sin(time + i * 0.35) * 0.14;
      array[idx] = orig[idx] + Math.cos(time + i * 0.25) * 0.10;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        color="#FFB347"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

// Subtle 3D Depth Rings complementing the Insignia
function DepthAtmosphereRings({ reducedMotion }) {
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (reducedMotion || !ringRef.current) return;
    ringRef.current.rotation.z += delta * 0.06;
  });

  return (
    <group ref={ringRef} position={[0, 0, -0.3]}>
      <mesh>
        <ringGeometry args={[2.5, 2.52, 64]} />
        <meshBasicMaterial color="#FF8A00" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <ringGeometry args={[2.8, 2.81, 64]} />
        <meshBasicMaterial color="#AEB4BC" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function SceneContainer({ mousePos, reducedMotion }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current || reducedMotion) return;
    const targetX = -mousePos.y * 0.12;
    const targetY = mousePos.x * 0.15;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 4]} intensity={1.8} color="#FF9D2E" />
      <AmbientDustParticles count={240} reducedMotion={reducedMotion} />
      <DepthAtmosphereRings reducedMotion={reducedMotion} />
    </group>
  );
}

export default function HeroOrbitalScene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="hero-orbital-stage">
      {/* 3D WebGL Particle & Depth Layer */}
      {webglSupported ? (
        <Suspense fallback={null}>
          <Canvas
            className="hero-orbital-canvas"
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
          >
            <SceneContainer mousePos={mousePos} reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      ) : null}

      {/* Seamless Authentic Metallic SS Insignia with Screen Blending and Tilt Parallax */}
      <img
        src={ssLogo}
        alt="Samarth SS Insignia"
        className="hero-center-logo-img"
        style={{
          transform: `perspective(1000px) rotateX(${-mousePos.y * 7}deg) rotateY(${mousePos.x * 9}deg)`,
        }}
      />
    </div>
  );
}

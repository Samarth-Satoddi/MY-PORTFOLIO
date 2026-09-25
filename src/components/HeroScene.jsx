import React, { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ssLogo from '../assets/ss-logo.png';
import ErrorBoundary from './ErrorBoundary';
import SceneLoader from './SceneLoader';
import { isWebGLAvailable } from '../utils/webgl';

// 3D Ambient Dust & Ember Particles surrounding the SS Insignia
function ParticleField({ count = 220, reducedMotion }) {
  const pointsRef = useRef();

  const [positions, orig] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const o = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 1.0 + Math.random() * 4.2;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;
      const z = (Math.random() - 0.5) * 3.5 - 0.3;
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
    const arr = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      arr[idx + 1] = orig[idx + 1] + Math.sin(time + i * 0.4) * 0.14;
      arr[idx] = orig[idx] + Math.cos(time + i * 0.28) * 0.10;
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
        color="#F5A65B"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

// 3D Depth Rings complementing the Insignia
function DepthAtmosphereRings({ reducedMotion }) {
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (reducedMotion || !ringRef.current) return;
    ringRef.current.rotation.z += delta * 0.05;
  });

  return (
    <group ref={ringRef} position={[1.85, 0.05, -0.4]}>
      {/* Outer subtle orbital ring */}
      <mesh>
        <ringGeometry args={[2.55, 2.57, 64]} />
        <meshBasicMaterial color="#F5A65B" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      {/* Inner technical reticle */}
      <mesh>
        <ringGeometry args={[2.9, 2.91, 64]} />
        <meshBasicMaterial color="#7C8A99" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Orbiting beacon dots */}
      <mesh position={[2.56, 0, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#F5A65B" />
      </mesh>
      <mesh position={[-2.56, 0, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#F5A65B" />
      </mesh>
    </group>
  );
}

// Secondary Wireframe Icosahedron framing the space
function SecondaryWireframe({ reducedMotion }) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (reducedMotion || !meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.08;
    meshRef.current.rotation.x += delta * 0.04;
  });

  return (
    <mesh ref={meshRef} position={[1.85, 0.05, -0.6]}>
      <icosahedronGeometry args={[2.2, 0]} />
      <meshStandardMaterial
        wireframe
        color="#2A3742"
        emissive="#131A22"
        emissiveIntensity={0.2}
        roughness={0.9}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function Scene3D({ reducedMotion }) {
  return (
    <group>
      <ambientLight intensity={0.65} />
      <pointLight position={[3, 3, 4]} intensity={1.8} color="#F5A65B" />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="#7C8A99" />

      {/* Particles around the space */}
      <ParticleField count={220} reducedMotion={reducedMotion} />

      {/* Secondary Wireframe Icosahedron */}
      <SecondaryWireframe reducedMotion={reducedMotion} />

      {/* Depth Atmosphere Rings */}
      <DepthAtmosphereRings reducedMotion={reducedMotion} />
    </group>
  );
}

export default function HeroScene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglSupported] = useState(() => isWebGLAvailable());
  const [introProgress, setIntroProgress] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    // Mouse movement tracking for tilt parallax
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth initial load entrance animation
    let start = null;
    let animId;
    const duration = 1200;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setIntroProgress(ease);
      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };
    animId = requestAnimationFrame(step);

    return () => {
      mediaQuery.removeEventListener('change', handler);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="hero-scene-canvas-wrapper" aria-hidden="true">
      {/* 3D WebGL Atmosphere Layer */}
      {webglSupported && (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={<SceneLoader label="ACQUIRING ORBITAL TELEMETRY..." />}>
            <Canvas
              className="hero-webgl-canvas"
              camera={{ position: [0, 0, 5.4], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 1.5]}
            >
              <Scene3D reducedMotion={reducedMotion} />
            </Canvas>
          </Suspense>
        </ErrorBoundary>
      )}

      {/* Authentic Metallic SS Photo Insignia with 3D Tilt Parallax & Seamless Screen Blend */}
      <div
        className="hero-photo-ss-container"
        style={{
          transform: reducedMotion
            ? `scale(${introProgress})`
            : `perspective(1000px) rotateX(${-mousePos.y * 6}deg) rotateY(${mousePos.x * 8}deg) scale(${introProgress})`,
          opacity: introProgress,
        }}
      >
        <div className="hero-ss-ambient-glow" />
        <img
          src={ssLogo}
          alt="Samarth SS Insignia"
          className="hero-authentic-ss-img"
        />
      </div>
    </div>
  );
}

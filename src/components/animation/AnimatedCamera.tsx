'use client';

import React, { useRef, Suspense } from 'react';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function CinematicAsset({ 
  url, 
  meshRef, 
  position, 
  rotation, 
  scale 
}: { 
  url: string; 
  meshRef: React.RefObject<THREE.Mesh | null>; 
  position: [number, number, number]; 
  rotation: [number, number, number]; 
  scale: number 
}) {
  const texture = useTexture(url);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

function CameraScene({ 
  cameraRef, 
  reelRef 
}: { 
  cameraRef: React.RefObject<THREE.Mesh | null>; 
  reelRef: React.RefObject<THREE.Mesh | null>;
}) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <Environment preset="studio" />
      
      <Suspense fallback={null}>
        {/* Film Camera - Enters from Left */}
        <CinematicAsset 
          url="/camera.png" 
          meshRef={cameraRef}
          position={[-10, 0, 0]} 
          rotation={[0, -0.4, 0]} 
          scale={3.5} 
        />
        {/* Film Reel - Enters from Right */}
        <CinematicAsset 
          url="/reel.png" 
          meshRef={reelRef}
          position={[10, -1, -2]} 
          rotation={[0, 0.5, 0]} 
          scale={3} 
        />
      </Suspense>
    </>
  );
}

export default function AnimatedCamera() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraMeshRef = useRef<THREE.Mesh>(null);
  const reelMeshRef = useRef<THREE.Mesh>(null);

  useGSAP(() => {
    if (!cameraMeshRef.current || !reelMeshRef.current) return;

    // MASTER TIMELINE: Entry -> Cross -> Parallax
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });

    // Phase 1 & 2: Entry and Cross Motion
    masterTl.to(cameraMeshRef.current.position, {
      x: 12, // Cross to the other side
      y: -2,
      duration: 2,
      ease: 'power2.inOut'
    }, 0)
    .to(reelMeshRef.current.position, {
      x: -12, // Cross to the other side
      y: -5,
      duration: 2,
      ease: 'power2.inOut'
    }, 0)
    // Subtle rotation during cross
    .to(cameraMeshRef.current.rotation, {
      y: Math.PI * 0.1,
      duration: 2,
      ease: 'power2.inOut'
    }, 0)
    .to(reelMeshRef.current.rotation, {
      y: -Math.PI * 0.1,
      duration: 2,
      ease: 'power2.inOut'
    }, 0);

    // Continuous downward parallax (applied throughout the timeline)
    // We add a subtle y offset that grows with scroll
    masterTl.to([cameraMeshRef.current.position, reelMeshRef.current.position], {
      y: "-=18", // Move down as user scrolls
      duration: 8,
      ease: 'none'
    }, 0);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {/* Fixed Background Cinematic Base */}
      <div className="absolute inset-0 z-[-2] bg-[#fdfcff]">
        <Image 
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2500&auto=format&fit=crop" 
          alt="Cinematic Background" 
          fill 
          className="object-cover opacity-10 grayscale brightness-110"
        />
      </div>

      <Canvas
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <CameraScene cameraRef={cameraMeshRef} reelRef={reelMeshRef} />
      </Canvas>
      
      {/* Background Cinematic Lighting Floaters (GPU Optimized / #9f81b9 theme) */}
      <div className="gpu-accelerated absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#9f81b9]/5 to-transparent opacity-30" />
      <div className="gpu-accelerated absolute bottom-0 left-0 w-2/3 h-full bg-gradient-to-r from-[#9f81b9]/5 to-transparent opacity-30" />
      
      {/* Film Grain / Scanline Overlay for texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>
    </div>
  );
}

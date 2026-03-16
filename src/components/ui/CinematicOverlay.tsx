'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CinematicOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Elegant soft glow pulses for atmospheric depth
    const glowPulse = () => {
      gsap.to('.silk-glow', {
        opacity: 0.02 + Math.random() * 0.04,
        duration: 5 + Math.random() * 3,
        onComplete: glowPulse,
        ease: "sine.inOut"
      });
    };
    glowPulse();

    // Subtle lens flare that follows mouse with high inertia
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth) * 100;
      const yPercent = (clientY / window.innerHeight) * 100;

      gsap.to(flareRef.current, {
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        duration: 4,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: overlayRef });

  return (
    <div ref={overlayRef} className="fixed inset-0 pointer-events-none z-[9999] select-none overflow-hidden">
      {/* Dynamic Silk Glow - Uses deep purple for depth */}
      <div className="silk-glow absolute inset-0 bg-[#6a4a8c]/5 mix-blend-overlay" />

      {/* Light Scanlines (Refined for 8K Raw feel) */}
      <div className="absolute inset-0 opacity-[0.012] bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(106,74,140,0.1)_50%)] bg-[length:100%_4px]" />
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(106,74,140,0.02)_100%)]" />
      
      {/* Focal Lens Flare (Ultra Subtle Lavender) */}
      <div 
        ref={flareRef}
        className="absolute w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[#d6c5e3]/5 blur-[200px] rounded-full mix-blend-screen"
      />

      {/* Anamorphic Light Streaks */}
      <div className="absolute top-[15%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#6a4a8c]/10 to-transparent" />
      <div className="absolute bottom-[20%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d6c5e3]/5 to-transparent blur-[1px]" />
    </div>
  );
}

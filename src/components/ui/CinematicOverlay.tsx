'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CinematicOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Elegant soft glow pulses
    const glowPulse = () => {
      gsap.to('.silk-glow', {
        opacity: 0.03 + Math.random() * 0.05,
        duration: 4 + Math.random() * 2,
        onComplete: glowPulse,
        ease: "sine.inOut"
      });
    };
    glowPulse();

    // Subtle lens flare interaction
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth) * 100;
      const yPercent = (clientY / window.innerHeight) * 100;

      gsap.to(flareRef.current, {
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        duration: 3,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: overlayRef });

  return (
    <div ref={overlayRef} className="fixed inset-0 pointer-events-none z-[9999] select-none overflow-hidden">
      {/* Silk Glow Base */}
      <div className="silk-glow absolute inset-0 bg-indigo-100/5 mix-blend-overlay opacity-30" />

      {/* Ultra-subtle Grain for texture (almost invisible) */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none" 
           style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />
           
      {/* Light Scanlines (Professional width) */}
      <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(159,129,185,0.1)_50%)] bg-[length:100%_2px]" />
      
      {/* Soft Silk Vignette (Indigo based) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(159,129,185,0.03)_100%)]" />
      
      {/* Professional Lens Flare (Ultra Subtle) */}
      <div 
        ref={flareRef}
        className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-indigo-200/5 blur-[150px] rounded-full mix-blend-screen"
      />

      {/* Elegant Anamorphic Streaks */}
      <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-300/10 to-transparent" />
      <div className="absolute bottom-[25%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-200/10 to-transparent" />
    </div>
  );
}

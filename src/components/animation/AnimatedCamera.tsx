'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function AnimatedCamera() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cameraRef.current || !reelRef.current) return;

    // MASTER TIMELINE: Continuous Drifting 2D Motion
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });

    // 1. Initial State: Cinematic preparation
    gsap.set(cameraRef.current, { xPercent: 110, yPercent: 10, rotate: -5, scale: 0.9 });
    gsap.set(reelRef.current, { xPercent: -15, yPercent: 40, rotate: 10, scale: 0.7 });

    // 2. Initial dramatic Cross & Perspective Shift (Hero -> Concept)
    masterTl.to(cameraRef.current, {
      xPercent: 15,
      yPercent: 30,
      scale: 1.4,
      rotate: 15,
      duration: 3,
      ease: 'power2.inOut'
    }, 0)
    .to(reelRef.current, {
      xPercent: 75,
      yPercent: 60,
      scale: 1.2,
      rotate: -10,
      duration: 3,
      ease: 'power2.inOut'
    }, 0);

    // 3. Grand Wide Panning Sweep (Concept -> Mission -> Experience)
    masterTl.to(cameraRef.current, {
      xPercent: 85,
      yPercent: 45,
      scale: 1.1,
      rotate: -5,
      duration: 4,
      ease: 'sine.inOut'
    }, 3)
    .to(reelRef.current, {
      xPercent: 5,
      yPercent: 20,
      scale: 0.9,
      rotate: 5,
      duration: 4,
      ease: 'sine.inOut'
    }, 3);

    // 4. Final Deep Perspective & Rotation (Characters -> Movement -> Contact)
    masterTl.to(cameraRef.current, {
      xPercent: 10,
      yPercent: 75,
      scale: 1.6,
      rotate: 25,
      duration: 5,
      ease: 'power1.inOut'
    }, 7)
    .to(reelRef.current, {
      xPercent: 60,
      yPercent: 5,
      scale: 1.8,
      rotate: -20,
      duration: 5,
      ease: 'power1.inOut'
    }, 7);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Layer (Fixed Base) */}
      <div className="absolute inset-0 z-[-1] bg-[#fdfcff]/30">
        <Image 
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2500&auto=format&fit=crop" 
          alt="Cinematic Base" 
          fill 
          className="object-cover opacity-[0.02] grayscale"
          priority
        />
      </div>

      {/* 2D Persistent Motion Layer */}
      <div className="relative w-full h-full">
        {/* Film Camera (Continuous visibility) */}
        <div ref={cameraRef} className="absolute w-[350px] md:w-[500px] aspect-square transition-opacity duration-1000 will-change-transform">
          <Image 
            src="/camera.png" 
            alt="Film Camera" 
            width={500} 
            height={500} 
            className="w-full h-full object-contain opacity-25 drop-shadow-[0_40px_100px_rgba(159,129,185,0.12)]"
          />
        </div>

        {/* Film Reel (Continuous visibility) */}
        <div ref={reelRef} className="absolute w-[250px] md:w-[400px] aspect-square transition-opacity duration-1000 will-change-transform">
          <Image 
            src="/reel.png" 
            alt="Film Reel" 
            width={400} 
            height={400} 
            className="w-full h-full object-contain opacity-15 drop-shadow-[0_40px_100px_rgba(159,129,185,0.12)]"
          />
        </div>
      </div>
      
      {/* Cinematic Overlays */}
      <div className="gpu-accelerated absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#9f81b9]/5 to-transparent opacity-25" />
      <div className="gpu-accelerated absolute bottom-0 left-0 w-2/3 h-full bg-gradient-to-r from-[#9f81b9]/5 to-transparent opacity-25" />
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40" />
      </div>
    </div>
  );
}

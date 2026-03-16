'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function PageEntrance() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Final cleanup if needed
      }
    });

    // 1. Initial State: Screen is covered by two shutters
    tl.to('.shutter-top', {
      yPercent: -100,
      duration: 1.5,
      ease: 'expo.inOut',
      delay: 0.5
    })
    .to('.shutter-bottom', {
      yPercent: 100,
      duration: 1.5,
      ease: 'expo.inOut',
    }, '<')
    .to('.page-content', {
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.5')
    .to(containerRef.current, {
      display: 'none',
      duration: 0
    });

    // 2. Add an "Exposing" text effect during the shutter move
    tl.fromTo('.entrance-text', {
      opacity: 0,
      scale: 1.2,
      letterSpacing: '2em'
    }, {
      opacity: 0.8,
      scale: 1,
      letterSpacing: '1em',
      duration: 2,
      ease: 'power3.out'
    }, 0)
    .to('.entrance-text', {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: 'power3.in'
    }, '-=1.2');

  }, {});

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden bg-white">
      {/* Shutters */}
      <div className="shutter-top absolute top-0 left-0 w-full h-1/2 bg-[#6a4a8c]" />
      <div className="shutter-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#6a4a8c]" />

      {/* Entrance Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="entrance-text text-white text-xs font-mono tracking-[1em] uppercase font-black">
          THE PREMIERE
        </h1>
      </div>
    </div>
  );
}

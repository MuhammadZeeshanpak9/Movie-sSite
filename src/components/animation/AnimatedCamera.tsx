'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedCamera Component
 * Feature: 6 vintage cameras wandering dynamically across the entire screen.
 * They move independently left, right, up, and down to create a "drifting on set" feel.
 */
export default function AnimatedCamera() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for 6 camera instances
  const camRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useGSAP(() => {
    const cameras = camRefs.map(ref => ref.current).filter((el): el is HTMLDivElement => el !== null);
    if (cameras.length === 0) return;

    // ── INITIAL RANDOMIZATION ──────────────────────────────────────
    cameras.forEach((cam, i) => {
      // Set randomized start positions and scales
      gsap.set(cam, {
        opacity: i === 0 ? 0.6 : 0.35,
        scale: 1 - (i * 0.1),
        // Start them scattered across the viewport
        x: `${Math.random() * 80 - 40}vw`,
        y: `${Math.random() * 60 - 30}vh`,
      });
    });

    // ── LARGE-SCALE WANDERING (Everywhere on Screen) ──────────────
    cameras.forEach((cam, i) => {
      // Independent horizontal wandering
      gsap.to(cam, {
        x: (i % 2 === 0) ? `+=${15 + Math.random() * 25}vw` : `-=${15 + Math.random() * 25}vw`,
        duration: 8 + Math.random() * 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Independent vertical wandering
      gsap.to(cam, {
        y: (i % 3 === 0) ? `+=${15 + Math.random() * 20}vh` : `-=${15 + Math.random() * 20}vh`,
        duration: 10 + Math.random() * 12,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Inner image tilt/sway for personality
      const inner = cam.querySelector('img');
      if (inner) {
        gsap.to(inner, {
          rotate: i % 2 === 0 ? 25 : -25,
          duration: 5 + Math.random() * 5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    });

    // ── SCROLL-SENSITIVE DEPTH ────────────────────────────────────
    // Maintains the scroll connection while they wander
    cameras.forEach((cam, i) => {
      const depth = 1 - (i * 0.1);
      gsap.to(cam, {
        y: `+=${30 * depth}vh`,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5 + (i * 0.5),
        },
      });
    });

    // ── CONTEXTUAL DIMMING ──────────────────────────────────────────
    ScrollTrigger.create({
      trigger: '#section-3',
      start: 'top center',
      endTrigger: '#section-7',
      end: 'bottom center',
      onEnter: () => gsap.to(cameras, { opacity: 0.15, duration: 1.5, overwrite: 'auto' }),
      onLeaveBack: () => {
        cameras.forEach((cam, i) => {
          gsap.to(cam, { opacity: i === 0 ? 0.6 : 0.35, duration: 1.5, overwrite: 'auto' });
        });
      },
      onLeave: () => gsap.to(cameras, { opacity: 0, duration: 2, overwrite: 'auto' }),
      onEnterBack: () => gsap.to(cameras, { opacity: 0.15, duration: 1.5, overwrite: 'auto' }),
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent"
    >
      {/* Starting clusters (will be offset by GSAP randomization) */}
      <div ref={camRefs[0]} className="absolute top-[20%] left-[10%] w-[330px] z-[-1]">
        <img src="/animate_camera.png" alt="Main Camera" className="w-full h-auto drop-shadow-2xl" />
      </div>

      <div ref={camRefs[1]} className="absolute top-[50%] right-[15%] w-[260px] z-[-2]">
        <img src="/animate_camera.png" alt="" className="w-full h-auto filter blur-[0.5px] grayscale" />
      </div>

      <div ref={camRefs[2]} className="absolute bottom-[20%] left-[15%] w-[220px] z-[-2]">
        <img src="/animate_camera.png" alt="" className="w-full h-auto filter blur-[1px] grayscale opacity-80" />
      </div>

      <div ref={camRefs[3]} className="absolute top-[10%] right-[30%] w-[180px] z-[-3]">
        <img src="/animate_camera.png" alt="" className="w-full h-auto filter blur-[1.5px] grayscale opacity-70" />
      </div>

      <div ref={camRefs[4]} className="absolute middle-y left-[30%] w-[140px] z-[-3]">
        <img src="/animate_camera.png" alt="" className="w-full h-auto filter blur-[2px] grayscale opacity-60" />
      </div>

      <div ref={camRefs[5]} className="absolute bottom-[30%] right-[35%] w-[130px] z-[-3]">
        <img src="/animate_camera.png" alt="" className="w-full h-auto filter blur-[2.5px] grayscale opacity-50" />
      </div>

      {/* Atmospheric grain/glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(159,129,185,0.02)_100%)]" />
    </div>
  );
}

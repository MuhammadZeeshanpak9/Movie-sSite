'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedCamera Component
 * Enhancements: Mouse-parallax, advanced noise-like movement, and depth-of-field (DOF).
 */
const ASSETS = [
  { id: 'asset-1', src: '/user_asset_1.png', depth: 0.95, baseSize: 240, startY: 15, direction: 1, blurScale: 0 },
  { id: 'asset-2', src: '/user_asset_2.png', depth: 0.45, baseSize: 180, startY: 45, direction: -1, blurScale: 4 },
  { id: 'asset-3', src: '/user_asset_3.png', depth: 0.75, baseSize: 160, startY: 75, direction: 1, blurScale: 1 },
  { id: 'asset-4', src: '/user_asset_4.png', depth: 0.25, baseSize: 120, startY: 25, direction: -1, blurScale: 8 },
  { id: 'asset-5', src: '/user_asset_5.png', depth: 0.85, baseSize: 200, startY: 55, direction: 1, blurScale: 0.5 },
  { id: 'asset-6', src: '/user_asset_6.png', depth: 0.35, baseSize: 140, startY: 85, direction: -1, blurScale: 6 },
];

export default function AnimatedCamera() {
  const containerRef = useRef<HTMLDivElement>(null);
  const assetsLayerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll('.floating-asset');

    elements.forEach((el, i) => {
      const asset = ASSETS[i];
      const duration = (20 + Math.random() * 20) * (2 - asset.depth);

      // ── INFINITE ORGANIC HORIZONTAL FLOAT ─────────────────────
      const startX = asset.direction === 1 ? -30 : 130;
      const endX = asset.direction === 1 ? 130 : -30;

      gsap.set(el, { xPercent: startX });

      gsap.to(el, {
        xPercent: endX,
        duration: duration,
        ease: 'none',
        repeat: -1,
      }).progress(Math.random());

      // ── ADVANCED ORGANIC DRIFT (Multi-axis) ─────────────────────
      gsap.to(el, {
        y: `+=${(15 + Math.random() * 25) * (asset.depth)}vh`,
        x: `+=${(5 + Math.random() * 10) * asset.direction}vw`,
        duration: 8 + Math.random() * 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(el, {
        rotation: asset.direction * (15 + Math.random() * 30),
        duration: 10 + Math.random() * 10,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });

      // ── SCROLL PARALLAX ───────────────────────────────────────────
      gsap.to(el, {
        y: `-=${60 * asset.depth}vh`,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1 + ((1 - asset.depth) * 3),
        },
      });
    });

    // ── MOUSE PARALLAX (Subtle Camera Movement) ───────────────────
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      elements.forEach((el, i) => {
        const depth = ASSETS[i].depth;
        gsap.to(el, {
          x: xPos * depth,
          y: yPos * depth,
          duration: 2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ── SECTION-BASED FOCUS SHIFTS ──────────────────────────────────
    ScrollTrigger.create({
      trigger: '#section-3',
      start: 'top center',
      end: 'bottom bottom',
      onEnter: () => gsap.to(elements, { 
        opacity: (i) => ASSETS[i].depth > 0.7 ? 0.15 : 0.08, 
        filter: (i) => `blur(${ASSETS[i].blurScale * 2}px) grayscale(0.8)`, 
        duration: 2 
      }),
      onLeaveBack: () => {
        elements.forEach((el, i) => {
          const asset = ASSETS[i];
          gsap.to(el, { 
            opacity: asset.depth > 0.6 ? 0.7 : 0.5, 
            filter: `blur(${asset.blurScale}px) grayscale(0)`,
            duration: 2 
          });
        });
      },
      onLeave: () => gsap.to(elements, { opacity: 0, duration: 2.5, overwrite: 'auto' }),
      onEnterBack: () => gsap.to(elements, { opacity: 0.1, duration: 1.5, overwrite: 'auto' }),
    });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent"
    >
      <div ref={assetsLayerRef} className="absolute inset-0 w-full h-full">
        {ASSETS.map((asset) => (
          <div
            key={asset.id}
            className="floating-asset absolute will-change-transform"
            style={{
              top: `${asset.startY}%`,
              width: `${asset.baseSize}px`,
              opacity: asset.depth > 0.6 ? 0.7 : 0.5,
              zIndex: Math.floor(asset.depth * 100), // Foreground assets have higher z-index
              filter: `blur(${asset.blurScale}px)`,
            }}
          >
            <img
              src={asset.src}
              alt=""
              className="w-full h-auto drop-shadow-[0_40px_100px_rgba(106,74,140,0.15)]"
            />
          </div>
        ))}
      </div>

      {/* Atmospheric Subtle Purple Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(106,74,140,0.03)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(106,74,140,0.02)_0%,transparent_50%)]" />
    </div>
  );
}

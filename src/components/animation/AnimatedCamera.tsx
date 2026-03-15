'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedCamera Component
 * Feature: Multi-element cinematic background using user-provided cleaned assets.
 * Cameras, reels, and clapperboards float continuously with parallax depth.
 */
const ASSETS = [
  { id: 'asset-1', src: '/user_asset_1.png', depth: 0.9, baseSize: 340, startY: 15, direction: 1 },
  { id: 'asset-2', src: '/user_asset_2.png', depth: 0.5, baseSize: 260, startY: 45, direction: -1 },
  { id: 'asset-3', src: '/user_asset_3.png', depth: 0.7, baseSize: 220, startY: 75, direction: 1 },
  { id: 'asset-4', src: '/user_asset_4.png', depth: 0.3, baseSize: 180, startY: 25, direction: -1 },
  { id: 'asset-5', src: '/user_asset_5.png', depth: 0.8, baseSize: 280, startY: 55, direction: 1 },
  { id: 'asset-6', src: '/user_asset_6.png', depth: 0.4, baseSize: 200, startY: 85, direction: -1 },
];

export default function AnimatedCamera() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll('.floating-asset');

    elements.forEach((el, i) => {
      const asset = ASSETS[i];
      // Duration scale: foreground (depth 1) is slower, background (depth 0) is faster
      const duration = (25 + Math.random() * 15) * asset.depth;

      // ── CONTINUOUS HORIZONTAL FLOAT (INFINITE) ─────────────────────
      const startX = asset.direction === 1 ? -40 : 140;
      const endX = asset.direction === 1 ? 140 : -40;

      gsap.set(el, { left: `${startX}%` });

      gsap.to(el, {
        left: `${endX}%`,
        duration: duration,
        ease: 'none',
        repeat: -1,
      }).progress(Math.random()); // Random start offset

      // ── ORGANIC DRIFT (vertical & rotation) ────────────────────────
      gsap.to(el, {
        y: (i % 2 === 0 ? '+=' : '-=') + (20 + Math.random() * 20) + 'vh',
        duration: 10 + Math.random() * 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(el, {
        rotation: asset.direction * (20 + Math.random() * 20),
        duration: 8 + Math.random() * 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // ── SCROLL PARALLAX ───────────────────────────────────────────
      gsap.to(el, {
        y: `+=${40 * asset.depth}vh`,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5 + ((1 - asset.depth) * 2),
        },
      });
    });

    // ── CONTEXTUAL DIMMING ──────────────────────────────────────────
    ScrollTrigger.create({
      trigger: '#section-3',
      start: 'top center',
      endTrigger: '#section-7',
      end: 'bottom center',
      onEnter: () => gsap.to(elements, { opacity: 0.1, duration: 1.5, overwrite: 'auto' }),
      onLeaveBack: () => {
        elements.forEach((el, i) => {
          gsap.to(el, { opacity: ASSETS[i].depth > 0.6 ? 0.6 : 0.4, duration: 1.5, overwrite: 'auto' });
        });
      },
      onLeave: () => gsap.to(elements, { opacity: 0, duration: 2, overwrite: 'auto' }),
      onEnterBack: () => gsap.to(elements, { opacity: 0.1, duration: 1.5, overwrite: 'auto' }),
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent"
    >
      {ASSETS.map((asset) => (
        <div
          key={asset.id}
          className="floating-asset absolute will-change-transform"
          style={{
            top: `${asset.startY}%`,
            width: `${asset.baseSize}px`,
            opacity: asset.depth > 0.6 ? 0.6 : 0.4,
            zIndex: Math.floor(asset.depth * -10),
            filter: asset.depth < 0.5 ? `blur(${(0.5 - asset.depth) * 10}px) grayscale(0.5)` : 'none',
          }}
        >
          <img
            src={asset.src}
            alt=""
            className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          />
        </div>
      ))}

      {/* Atmospheric grain/glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(106,74,140,0.02)_100%)]" />
    </div>
  );
}

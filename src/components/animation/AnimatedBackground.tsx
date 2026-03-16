'use client';

/**
 * AnimatedBackground.tsx
 *
 * A production-ready, hydration-safe animated particle background.
 *
 * ✅ SSR-safe: No Math.random() during server render.
 * ✅ Hydration-safe: Particles are generated ONLY inside useEffect (client-side).
 * ✅ GPU-accelerated: Uses will-change: transform on every particle.
 * ✅ Zero re-renders: Particle data is stable after mount (no dependencies in useEffect).
 * ✅ Mouse parallax: Subtle layer depth effect on mousemove.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  id: number;
  left: number;       // % from left
  top: number;        // % from top
  scale: number;      // 0.4 – 1.2
  opacity: number;    // 0.05 – 0.25
  size: number;       // px diameter
  duration: number;   // animation duration in seconds
  delay: number;      // animation delay in seconds
  depth: number;      // 0–1, used for parallax intensity
}

// ─── Constants ───────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 35;
const BASE_COLOR = '159, 129, 185'; // #9f81b9 in RGB

// ─── Seeded random helper ─────────────────────────────────────────────────────
// Deterministic pseudo-random based on index — avoids any SSR/client mismatch
// if you ever need server-side stable values.
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ─── Particle generator ───────────────────────────────────────────────────────
function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left:     seededRandom(i * 7)   * 100,
    top:      seededRandom(i * 13)  * 100,
    scale:    0.4 + seededRandom(i * 3)  * 0.8,
    opacity:  0.05 + seededRandom(i * 17) * 0.20,
    size:     8  + seededRandom(i * 5)  * 24,
    duration: 8  + seededRandom(i * 11) * 14,
    delay:   -seededRandom(i * 19) * 20, // negative delay = start mid-animation
    depth:    seededRandom(i * 23),
  }));
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AnimatedBackground({ className = '' }: { className?: string }) {
  // Particles start as null — never rendered on the server.
  const [particles, setParticles] = useState<Particle[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate particles after mount (client-only).
  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  // ── Mouse Parallax ──────────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalized -0.5 to 0.5
    const xNorm = clientX / innerWidth - 0.5;
    const yNorm = clientY / innerHeight - 0.5;

    const els = containerRef.current.querySelectorAll<HTMLDivElement>('.bg-particle');
    els.forEach((el) => {
      const depth = parseFloat(el.dataset.depth ?? '0');
      const strength = depth * 30; // max 30px shift for deepest layer
      el.style.transform = `translate(${xNorm * strength}px, ${yNorm * strength}px) scale(${parseFloat(el.dataset.scale ?? '1')})`;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <>
      {/* Inject keyframe animation once via a style tag */}
      <style>{`
        @keyframes bg-float {
          0%, 100% { transform: translateY(0px) scale(var(--particle-scale)); opacity: var(--particle-opacity); }
          33%       { transform: translateY(-22px) scale(calc(var(--particle-scale) * 1.08)); }
          66%       { transform: translateY(12px) scale(calc(var(--particle-scale) * 0.94)); opacity: calc(var(--particle-opacity) * 0.6); }
        }
      `}</style>

      <div
        ref={containerRef}
        aria-hidden="true"
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      >
        {/*
         * Only render particles after mount.
         * On the server / first render: nothing is rendered → no hydration mismatch.
         */}
        {particles?.map((p) => (
          <div
            key={p.id}
            className="bg-particle absolute rounded-full"
            data-depth={p.depth.toFixed(3)}
            data-scale={p.scale.toFixed(3)}
            style={{
              // Position & size
              left: `${p.left}%`,
              top:  `${p.top}%`,
              width:  `${p.size}px`,
              height: `${p.size}px`,

              // Color — semi-transparent purple
              background: `rgba(${BASE_COLOR}, ${p.opacity})`,

              // Soft glow / blur
              boxShadow: `0 0 ${p.size * 1.5}px rgba(${BASE_COLOR}, ${p.opacity * 0.6})`,
              filter: `blur(${p.size * 0.15}px)`,

              // CSS custom properties drive the animation values
              ['--particle-scale' as string]: p.scale,
              ['--particle-opacity' as string]: p.opacity,

              // GPU acceleration
              willChange: 'transform, opacity',

              // Float animation
              animation: `bg-float ${p.duration}s ${p.delay}s ease-in-out infinite`,
            }}
          />
        ))}

        {/*
         * Radial gradient overlays for ambient glow — no random values, always safe.
         */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(159,129,185,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(159,129,185,0.06)_0%,transparent_50%)]" />
      </div>
    </>
  );
}

'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const GEAR_ASSETS = [
  { id: 'clapper-1', type: 'clapper', x: 15, y: 20, size: 120, rotation: -15, delay: 0 },
  { id: 'clapper-2', type: 'clapper', x: 80, y: 70, size: 100, rotation: 10, delay: 1.5 },
  { id: 'reel-1', type: 'reel', x: 10, y: 80, size: 280, rotation: 0, speed: 1.5 },
  { id: 'reel-2', type: 'reel', x: 85, y: 15, size: 320, rotation: 0, speed: 1.2 },
  { id: 'camera-1', type: 'camera', x: 50, y: 40, size: 400, opacity: 0.03 },
];

export default function MovieSetBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Clapperboard "Snap" Animation
    gsap.to('.clapper-top', {
      rotate: -30,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: {
        each: 1,
        repeatRefresh: true
      }
    });

    // Reel Rotation
    gsap.to('.film-reel', {
      rotate: 360,
      duration: 10,
      repeat: -1,
      ease: 'none',
    });

    // Light Beams Sweping
    gsap.to('.light-beam', {
      rotate: '+=20',
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 2
    });

    // Particles Drift
    gsap.to('.set-particle', {
      y: '+=100',
      x: '+=50',
      opacity: 0,
      duration: 'random(5, 10)',
      repeat: -1,
      ease: 'none',
      stagger: {
        amount: 5,
        from: 'random'
      }
    });

    // Scroll Parallax for the whole set
    gsap.to('.set-element', {
      y: (i, el) => {
        const depth = parseFloat(el.getAttribute('data-depth') || '1');
        return -200 * depth;
      },
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-2] overflow-hidden bg-transparent">
      {/* Volumetric Spotlights */}
      <div className="absolute inset-0 z-0">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className={`light-beam absolute top-[-20%] left-[${i * 25}%] w-[400px] h-[150%] opacity-[0.12]`}
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(106, 74, 140, 0.5), transparent)',
              transformOrigin: 'top center',
              filter: 'blur(80px)',
              left: `${i * 30 - 15}%`
            }}
          />
        ))}
      </div>

      {/* Equipment Layer */}
      <div className="absolute inset-0">
        {GEAR_ASSETS.map((asset) => (
          <div 
            key={asset.id}
            data-depth={asset.type === 'reel' ? 0.4 : 0.8}
            className="set-element absolute will-change-transform opacity-[0.18]"
            style={{
              left: `${asset.x}%`,
              top: `${asset.y}%`,
              width: `${asset.size}px`,
              transform: `rotate(${asset.rotation || 0}deg)`
            }}
          >
            {asset.type === 'clapper' && (
              <div className="relative">
                <div className="clapper-top w-full h-4 bg-[#6a4a8c] rounded-t-sm origin-left" />
                <div className="w-full h-16 bg-[#6a4a8c] rounded-b-sm border-t-2 border-white/20" />
              </div>
            )}
            {asset.type === 'reel' && (
              <div className="film-reel relative aspect-square border-8 border-dashed border-[#6a4a8c]/40 rounded-full flex items-center justify-center">
                <div className="w-1/2 h-1/2 border-4 border-[#6a4a8c]/20 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-full bg-[#6a4a8c]/10" />
                  <div className="w-full h-1 bg-[#6a4a8c]/10" />
                </div>
              </div>
            )}
            {asset.type === 'camera' && (
              <div className="relative animate-pulse duration-[10s]">
                <div className="w-full aspect-video bg-[#6a4a8c]/10 rounded-lg relative overflow-hidden">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-[#6a4a8c]/20 rounded-full" />
                   <div className="absolute top-4 left-4 w-4 h-4 bg-red-500/20 rounded-full" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dust/Bokeh Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i}
            className="set-particle absolute w-2 h-2 bg-[#6a4a8c]/10 rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() + 0.5})`
            }}
          />
        ))}
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(106,74,140,0.02)_100%)]" />
    </div>
  );
}

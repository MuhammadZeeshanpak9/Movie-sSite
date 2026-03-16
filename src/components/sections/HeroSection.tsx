'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticButtonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    // Master Scroll Parallax
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    masterTl.to('.hero-parallax-bg', { y: 200, scale: 1.1, ease: 'none' })
      .to('.hero-content', { y: -100, opacity: 0, ease: 'none' }, 0);

    // Entrance: Staggered Letter Reveal and Elements
    const entranceTl = gsap.timeline({ delay: 0.2 });
    
    entranceTl.from('.hero-reveal-line', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out',
    })
    .from('.hero-metadata-reveal', {
      opacity: 0,
      x: 20,
      duration: 1,
      stagger: 0.1,
      ease: 'power2.out',
    }, '-=1');

    // Magnetic Button Effect
    const handleMagneticMove = (e: MouseEvent) => {
      const btn = magneticButtonRef.current;
      if (!btn) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = btn.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      // Only trigger if close enough
      const magnetRange = 100;
      if (Math.abs(distanceX) < magnetRange && Math.abs(distanceY) < magnetRange) {
        gsap.to(btn, {
          x: distanceX * 0.35,
          y: distanceY * 0.35,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    window.addEventListener('mousemove', handleMagneticMove);
    return () => window.removeEventListener('mousemove', handleMagneticMove);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full pt-20 pb-12 md:min-h-[80vh] flex flex-col justify-center px-8 md:px-24 z-10 overflow-hidden bg-transparent">
      {/* Cinematic Background Layer */}
      <div className="hero-parallax-bg gpu-accelerated absolute inset-0 z-[-1] opacity-60">
        <Image
          src="/hero_bg_camera_clean.png"
          alt="Vintage Film Camera Background"
          fill
          className="object-cover"
          priority
        />
        {/* Soft White to Transparent Gradient - Reduced Opacity */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
        {/* Subtle Purple Tint */}
        <div className="absolute inset-0 bg-[#6a4a8c]/5" />
      </div>

      <div className="hero-content gpu-accelerated max-w-7xl w-full mx-auto relative">
        <div className="hero-reveal-line mb-12 flex items-center gap-6 overflow-hidden">
          <div className="w-16 h-[1px] bg-[#6a4a8c]/30" />
          <span className="text-[10px] font-mono tracking-[0.8em] text-[#6a4a8c] uppercase font-bold">
            PROTAGONIST SYSTEM v3.5
          </span>
        </div>

        <div className="mb-10">
          <h1 className="text-5xl md:text-7xl font-playfair font-black text-slate-900 leading-[0.9] tracking-tighter">
            <div className="hero-reveal-line overflow-hidden">THE WORLD&apos;S</div>
            <div className="hero-reveal-line overflow-hidden">GREATEST MOVIE</div>
            <div className="hero-reveal-line overflow-hidden italic font-light text-[#6a4a8c]">
              ABOUT YOU.
            </div>
          </h1>
        </div>

        <div className="hero-reveal-line max-w-xl mb-20 overflow-hidden">
          <p className="text-lg md:text-xl font-inter font-light text-[#6a4a8c]/80 leading-relaxed uppercase tracking-[0.2em]">
            A cinematic experience designed for those who <br />
            demand <span className="text-[#6a4a8c] font-black underline decoration-1 underline-offset-4">visual excellence</span>.
          </p>
        </div>

        <div className="hero-reveal-line flex flex-wrap gap-12 items-center">
          <button 
            ref={magneticButtonRef}
            className="px-14 py-6 bg-[#6a4a8c] text-white text-[10px] font-mono tracking-[0.4em] uppercase font-black hover:bg-[#4a2a6c] transition-colors shadow-[0_30px_60px_rgba(106,74,140,0.25)] relative group overflow-hidden"
          >
            <span className="relative z-10">Explore Act I</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-cinematic" />
          </button>
          
          <button className="group flex items-center gap-6 text-[10px] font-mono tracking-[0.4em] text-slate-900 uppercase font-black">
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">The Vision</span>
            <div className="w-12 h-[1px] bg-slate-900/20 group-hover:w-24 group-hover:bg-[#6a4a8c] transition-all duration-700" />
          </button>
        </div>
      </div>

      {/* Floating Vertical Branding */}
      <div className="hero-metadata-reveal absolute top-24 right-12 md:right-24 hidden lg:flex flex-col items-end gap-4 select-none pointer-events-none z-20 mix-blend-difference">
        <span className="text-[9px] font-mono tracking-[1em] text-white uppercase font-black">
          ACT ONE
        </span>
        <div className="w-[1px] h-32 bg-white/30" />
        <span className="text-[9px] font-mono tracking-[1em] text-white uppercase font-black [writing-mode:vertical-rl]">
          PRODUCTION 2026
        </span>
      </div>

      {/* Cinematic Corner Metadata */}
      <div className="absolute bottom-16 right-12 hidden md:flex items-end gap-16 select-none">
        <div className="hero-metadata-reveal flex flex-col gap-2 items-end">
          <span className="text-[9px] font-mono text-[#6a4a8c]/50">DYNAMIC RANGE</span>
          <span className="text-xs font-mono text-slate-900 uppercase font-black">16 STOPS</span>
        </div>
        <div className="hero-metadata-reveal flex flex-col gap-2 items-end">
          <span className="text-[9px] font-mono text-[#6a4a8c]/50">COLOR SPACE</span>
          <span className="text-xs font-mono text-slate-900 uppercase font-black">ACES-CG</span>
        </div>
        <div className="hero-metadata-reveal flex flex-col gap-2 items-end">
          <span className="text-[9px] font-mono text-[#6a4a8c]/50">OPTICS</span>
          <span className="text-xs font-mono text-slate-900 uppercase font-black">ANAMORPHIC</span>
        </div>
      </div>
    </section>
  );
}

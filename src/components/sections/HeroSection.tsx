'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Master Timeline for Scroll Sync
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2, // Unified scrub for smoothness
      }
    });

    masterTl.to('.hero-parallax-bg', { y: 150, scale: 1.05, ease: 'none' })
            .to('.hero-content', { y: -50, opacity: 0.8, ease: 'none' }, 0);

    // Entrance with Cinematic Reveal Rhythm
    const entranceTl = gsap.timeline({ delay: 0.5 });
    entranceTl.from('.hero-reveal', {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full pt-40 pb-24 md:min-h-screen flex flex-col justify-center px-8 md:px-24 z-10 overflow-hidden bg-transparent">
      {/* Local Vintage Camera Background */}
      <div className="hero-parallax-bg gpu-accelerated absolute inset-0 z-[-1] opacity-80 transition-all duration-1000">
        <Image 
          src="/hero_bg_camera.png" 
          alt="Vintage Film Camera Background" 
          fill 
          className="object-cover"
          priority
        />
        {/* Indigo Cinematic Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent" />
        <div className="absolute inset-0 bg-[#9f81b9]/10" />
      </div>

      <div className="hero-content gpu-accelerated max-w-7xl w-full mx-auto">
        <div className="hero-reveal mb-12 flex items-center gap-4">
          <div className="w-12 h-[1px] bg-indigo-400" />
          <span className="text-xs font-mono tracking-[0.5em] text-indigo-400 uppercase font-black">PROTAGONIST SYSTEM v3.0</span>
        </div>
        
        <div className="hero-reveal relative mb-12">
          <h1 className="text-5xl md:text-[7rem] font-playfair font-black text-slate-900 leading-[0.95] tracking-tighter">
            THE WORLD&apos;S <br />
            GREATEST MOVIE <br />
            <span className="italic font-light text-[#6a4a8c]">ABOUT YOU.</span>
          </h1>
        </div>

        <div className="hero-reveal max-w-xl mb-16">
          <p className="text-lg md:text-xl font-inter font-light text-[#6a4a8c] leading-relaxed uppercase tracking-widest">
            A cinematic experience designed for those who <br />
            demand <span className="text-indigo-600 font-bold">visual excellence</span> and narrative depth.
          </p>
        </div>

        <div className="hero-reveal flex flex-wrap gap-8 items-center">
          <button className="px-12 py-5 bg-[#6a4a8c] text-white text-xs font-mono tracking-[0.3em] uppercase font-bold hover:bg-[#5a3b7a] transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(106,74,140,0.3)]">
            Explore Act I
          </button>
          <button className="group flex items-center gap-4 text-xs font-mono tracking-[0.3em] text-slate-900 uppercase font-bold">
            <span>The Vision</span>
            <div className="w-8 h-[1px] bg-slate-900 transition-all group-hover:w-16" />
          </button>
        </div>
      </div>

      {/* Top Right Branding Column - Vertical Stack */}
      <div className="hero-reveal absolute top-20 right-12 md:right-24 hidden lg:flex flex-col items-end gap-3 select-none pointer-events-none z-20 text-right">
        <span className="text-[10px] md:text-xs font-mono tracking-[0.5em] text-black uppercase font-black opacity-80">
          THE WORLD&apos;S
        </span>
        <span className="text-[10px] md:text-xs font-mono tracking-[0.5em] text-black uppercase font-black opacity-90">
          GREATEST MOVIE
        </span>
        <span className="text-xs md:text-sm font-mono tracking-[0.6em] text-black uppercase font-black drop-shadow-sm">
          ABOUT YOU
        </span>
        <div className="w-16 h-[1px] bg-black/60 mt-4" />
      </div>

      {/* Cinematic Metadata Corner */}
      <div className="absolute bottom-12 right-12 hidden md:flex items-end gap-12 select-none">
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[10px] font-mono text-[#6a4a8c]">RES</span>
          <span className="text-xs font-mono text-slate-900 uppercase">8K RAW</span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[10px] font-mono text-[#6a4a8c]">FPS</span>
          <span className="text-xs font-mono text-slate-900 uppercase">24.00</span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[10px] font-mono text-[#6a4a8c]">ISO</span>
          <span className="text-xs font-mono text-slate-900 uppercase">800</span>
        </div>
      </div>
    </section>
  );
}

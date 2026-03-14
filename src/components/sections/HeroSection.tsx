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
    <section ref={containerRef} className="relative w-full min-h-screen flex flex-col justify-center px-8 md:px-24 z-10 overflow-hidden bg-white">
      {/* Background Image Overlay */}
      <div className="hero-parallax-bg gpu-accelerated absolute inset-0 z-[-1] opacity-60">
        <Image 
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2500&auto=format&fit=crop" 
          alt="Professional Camera" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
      </div>

      <div className="hero-content gpu-accelerated max-w-7xl w-full mx-auto">
        <div className="hero-reveal mb-12 flex items-center gap-4">
          <div className="w-12 h-[1px] bg-indigo-400" />
          <span className="text-xs font-mono tracking-[0.5em] text-indigo-400 uppercase font-black">PROTAGONIST SYSTEM v3.0</span>
        </div>
        
        <div className="hero-reveal relative mb-12">
          <h1 className="text-7xl md:text-[12rem] font-playfair font-black text-slate-900 leading-[0.8] tracking-tighter">
            CRAFTING <br />
            <span className="italic font-light text-slate-300">LEGACIES.</span>
          </h1>
        </div>

        <div className="hero-reveal max-w-xl mb-16">
          <p className="text-lg md:text-xl font-inter font-light text-slate-500 leading-relaxed uppercase tracking-widest">
            A cinematic experience designed for those who <br />
            demand <span className="text-indigo-600 font-bold">visual excellence</span> and narrative depth.
          </p>
        </div>

        <div className="hero-reveal flex flex-wrap gap-8 items-center">
          <button className="px-12 py-5 bg-[#9f81b9] text-white text-xs font-mono tracking-[0.3em] uppercase font-bold hover:bg-[#8a6da6] transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(159,129,185,0.3)]">
            Explore Act I
          </button>
          <button className="group flex items-center gap-4 text-xs font-mono tracking-[0.3em] text-slate-900 uppercase font-bold">
            <span>The Vision</span>
            <div className="w-8 h-[1px] bg-slate-900 transition-all group-hover:w-16" />
          </button>
        </div>
      </div>

      {/* Cinematic Metadata Corner */}
      <div className="absolute bottom-12 right-12 hidden md:flex items-end gap-12 select-none">
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[10px] font-mono text-slate-300">RES</span>
          <span className="text-xs font-mono text-slate-900 uppercase">8K RAW</span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[10px] font-mono text-slate-300">FPS</span>
          <span className="text-xs font-mono text-slate-900 uppercase">24.00</span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[10px] font-mono text-slate-300">ISO</span>
          <span className="text-xs font-mono text-slate-900 uppercase">800</span>
        </div>
      </div>
    </section>
  );
}

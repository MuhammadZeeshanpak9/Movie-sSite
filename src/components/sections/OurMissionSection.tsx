'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function OurMissionSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      }
    });

    tl.from('.mission-reveal', {
      opacity: 0,
      x: -50,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out'
    })
    .from('.mission-visual', {
      opacity: 0,
      x: 50,
      duration: 1.5,
      ease: 'power4.out'
    }, '-=1.2');

    // Smooth Scroll Parallax for Visual
    gsap.to('.mission-visual-inner', {
      y: 80,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-20 md:py-40 px-8 flex flex-col items-center justify-center overflow-hidden bg-transparent">
      <div className="max-w-7xl z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
        {/* Cinematic Content */}
        <div className="mission-content gpu-accelerated">
          <span className="mission-reveal text-[10px] font-mono text-[#6a4a8c] tracking-[1em] mb-6 block uppercase font-black opacity-60">
            STRATEGIC INTENT
          </span>
          <h2 className="mission-reveal text-5xl md:text-7xl font-playfair font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
            BEYOND <br />
            <span className="italic font-light text-[#6a4a8c]">THE REEL.</span>
          </h2>
          
          <div className="mission-reveal w-16 h-[1px] bg-[#6a4a8c]/20 mb-10" />
          
          <p className="mission-reveal text-xl md:text-2xl font-light text-[#6a4a8c]/80 mb-12 font-inter leading-relaxed max-w-xl uppercase tracking-[0.1em]">
            We transform you from a passive viewer to the active <br />
            <span className="text-slate-900 font-black">director of your journey.</span>
          </p>
          
          <div className="mission-reveal flex flex-wrap items-center gap-16">
            <button className="group flex items-center gap-8">
               <div className="w-24 h-24 rounded-full border border-[#6a4a8c]/10 flex items-center justify-center transition-all duration-700 group-hover:bg-[#6a4a8c] group-hover:border-[#6a4a8c] group-hover:shadow-[0_40px_80px_rgba(106,74,140,0.3)]">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[18px] border-l-[#6a4a8c] border-b-[12px] border-b-transparent ml-1.5 group-hover:border-l-white transition-all duration-500" />
               </div>
               <span className="text-[10px] font-mono font-black tracking-[0.5em] uppercase text-slate-900 group-hover:text-[#6a4a8c] transition-colors">
                 PLAY MANIFESTO
               </span>
            </button>

            <div className="flex items-center gap-4 bg-white/5 border border-[#6a4a8c]/10 px-6 py-2 rounded-full mb-12 animate-pulse">
              <div className="w-2 h-2 bg-[#6a4a8c] rounded-full" />
              <span className="text-[10px] font-mono font-black text-[#6a4a8c] tracking-widest uppercase">LIVE PREMIERE: 195 NATIONS</span>
            </div>
            <div className="flex flex-col border-l border-slate-100 pl-12">
              <span className="text-[9px] font-mono text-[#6a4a8c]/40 mb-2 tracking-[0.4em] uppercase font-black">GLOBAL IMPACT</span>
              <span className="text-4xl font-playfair font-black text-slate-900 uppercase tracking-tighter">195 NATIONS</span>
            </div>
          </div>
        </div>

        <div className="mission-visual gpu-accelerated relative">
          <div className="mission-visual-inner gpu-accelerated aspect-square bg-white/5 relative overflow-hidden border border-[#6a4a8c]/10 group shadow-[0_60px_120px_rgba(106,74,140,0.1)]">
            <div className="absolute inset-0 p-8 transition-transform duration-1000 group-hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/Director.png"
                  alt="Cinematic Hardware Silhouette"
                  className="w-full h-full object-contain"
                />
               <div className="absolute inset-0 bg-[#6a4a8c]/5 group-hover:bg-transparent transition-colors duration-700" />
            </div>
            {/* Cinematic Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(106,74,140,0.01)_50%)] bg-[length:100%_6px] pointer-events-none" />
          </div>
          
          {/* Floating Floating Caption */}
          <div className="absolute -bottom-16 -left-16 bg-white p-14 max-w-sm shadow-[0_60px_120px_rgba(0,0,0,0.1)] border border-slate-50 hidden sm:block">
              <h4 className="text-4xl font-playfair font-black text-slate-900 mb-8 italic tracking-tight">The Director’s Cut</h4>
              <p className="text-[10px] font-light text-[#6a4a8c] leading-relaxed uppercase tracking-[0.3em] font-inter">
                When you dictate your story, you change the world. You are the final authority of your own production.
              </p>
          </div>
        </div>
      </div>
    </section>
  );
}

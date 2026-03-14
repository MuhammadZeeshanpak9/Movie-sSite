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
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1.2,
      }
    });

    tl.from('.mission-content > *', {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.mission-visual', {
      opacity: 0,
      scale: 0.95,
      duration: 1.5,
      ease: 'power3.out'
    }, '-=1');

    // Subtle parallax for the visual (optimized)
    gsap.to('.mission-visual-inner', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      },
      y: 50,
      ease: 'none'
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-60 px-8 flex flex-col items-center justify-center overflow-hidden bg-white">
      <div className="max-w-7xl z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
        {/* Cinematic Typography Side */}
        <div className="mission-content gpu-accelerated">
          <span className="text-[10px] font-mono text-indigo-400 tracking-[0.6em] mb-8 block uppercase font-black">Strategic Intent</span>
          <h2 className="text-7xl md:text-[10rem] font-playfair font-black text-slate-900 leading-[0.8] mb-12 tracking-tighter">
            BEYOND <br />
            <span className="italic font-light text-slate-300">THE REEL.</span>
          </h2>
          <div className="w-16 h-[1px] bg-indigo-400 mb-12" />
          <p className="text-2xl md:text-3xl font-light text-slate-500 mb-12 font-inter leading-relaxed max-w-xl uppercase tracking-widest">
            We transform you from a passive viewer to the active <span className="text-slate-900 font-black">director of your journey.</span>
          </p>
          
          <div className="flex items-center gap-16">
            <button className="group flex items-center gap-6">
               <div className="w-20 h-20 rounded-full border border-slate-100 flex items-center justify-center transition-all duration-700 group-hover:bg-[#9f81b9] group-hover:border-[#9f81b9] group-hover:shadow-[0_20px_40px_rgba(159,129,185,0.3)]">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-slate-900 border-b-[10px] border-b-transparent ml-1 group-hover:border-l-white transition-all duration-500" />
               </div>
               <span className="text-xs font-black tracking-[0.4em] uppercase text-slate-900 group-hover:text-indigo-600 transition-colors">Play Manifesto</span>
            </button>

            <div className="flex flex-col border-l border-slate-100 pl-10">
              <span className="text-[10px] font-mono text-indigo-400 mb-2 tracking-[0.4em] uppercase font-black">GLOBAL IMPACT</span>
              <span className="text-3xl font-playfair font-black text-slate-900 uppercase">89 NATIONS</span>
            </div>
          </div>
        </div>

        {/* Dynamic Image/Visual Area */}
        <div className="mission-visual gpu-accelerated relative mt-24 lg:mt-0">
          <div className="mission-visual-inner gpu-accelerated aspect-[4/5] bg-slate-50 relative overflow-hidden border border-slate-50 group shadow-[0_40px_80px_rgba(0,0,0,0.03)]">
            <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
               <Image 
                 src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop" 
                 alt="Professional Lens" 
                 fill 
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-indigo-900/5 group-hover:bg-transparent transition-colors duration-700" />
            </div>
            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(159,129,185,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />
          </div>
          
          <div className="absolute -bottom-16 -left-16 bg-white p-12 max-w-sm shadow-[0_50px_100px_rgba(0,0,0,0.08)] border border-slate-50">
              <h4 className="text-3xl font-playfair font-black text-slate-900 mb-6 italic">The Director’s Cut</h4>
              <p className="text-sm font-light text-slate-500 leading-relaxed uppercase tracking-widest">
                When you dictate your story, you change the world. You are the final authority of your own production.
              </p>
          </div>
        </div>
      </div>
    </section>
  );
}

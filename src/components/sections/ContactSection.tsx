'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.contact-content > *', {
      scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 80%',
      },
      opacity: 0,
      x: -50,
      stagger: 0.15,
      duration: 1.2,
      ease: 'expo.out'
    });

    gsap.from('.contact-form', {
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 85%',
      },
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-60 flex flex-col items-center justify-center px-8 z-10 bg-transparent">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-40 items-start">
        
        {/* Final Statement */}
        <div className="contact-content">
          <span className="text-[10px] font-mono text-indigo-400 tracking-[0.6em] mb-8 block uppercase font-black">Open Call</span>
          <h2 className="text-6xl md:text-[10rem] font-playfair font-black text-slate-900 leading-[0.8] mb-12 tracking-tighter">
            JOIN THE <br />
            <span className="italic font-light text-slate-300">SCENE.</span>
          </h2>
          <div className="w-16 h-[1px] bg-indigo-400 mb-12" />
          <p className="text-xl text-slate-500 font-light leading-relaxed max-w-md mb-12 uppercase tracking-widest">
            The script is waiting for your signature. The crew is on standby. Your epic begins today.
          </p>
          <div className="text-[10px] font-mono text-slate-300 tracking-[1em] uppercase font-bold">
            NOW CASTING PROTAGONISTS
          </div>
        </div>

        {/* Minimalist Form */}
        <div className="contact-form w-full bg-slate-50/50 p-12 md:p-20 border border-slate-50">
          <form className="flex flex-col gap-16">
             <div className="relative group">
                <span className="text-[10px] font-mono text-indigo-400 uppercase font-black tracking-widest">01. Identity</span>
                <input 
                   type="text" 
                   className="w-full bg-transparent border-b border-slate-200 py-6 text-2xl font-playfair text-slate-800 placeholder:text-slate-200 focus:outline-none focus:border-indigo-600 transition-colors"
                   placeholder="Your Name"
                />
             </div>

             <div className="relative group">
                <span className="text-[10px] font-mono text-indigo-400 uppercase font-black tracking-widest">02. Signal</span>
                <input 
                   type="email" 
                   className="w-full bg-transparent border-b border-slate-200 py-6 text-2xl font-playfair text-slate-800 placeholder:text-slate-200 focus:outline-none focus:border-indigo-600 transition-colors"
                   placeholder="Email Address"
                />
             </div>

             <div className="relative group">
                <span className="text-[10px] font-mono text-indigo-400 uppercase font-black tracking-widest">03. Narrative</span>
                <textarea 
                   rows={1}
                   className="w-full bg-transparent border-b border-slate-200 py-6 text-2xl font-playfair text-slate-800 placeholder:text-slate-200 focus:outline-none focus:border-indigo-600 transition-colors resize-none"
                   placeholder="Your Logline"
                />
             </div>

             <button className="group relative w-full overflow-hidden bg-[#9f81b9] py-10 text-white text-xs font-black tracking-[0.5em] uppercase transition-all shadow-[0_20px_40px_rgba(159,129,185,0.2)] hover:scale-[1.02] active:scale-[0.98]">
                <span className="relative z-10">Submit Script</span>
                <div className="absolute inset-0 bg-indigo-800 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]" />
             </button>
          </form>
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-40 md:mt-80 flex flex-col md:flex-row justify-between w-full max-w-7xl pt-16 border-t border-slate-100 opacity-40 text-[10px] font-mono tracking-[0.6em] uppercase font-black">
        <span>© {new Date().getFullYear()} PROTAGONIST STUDIO</span>
        <span>A PRECISE NARRATIVE PRODUCTION</span>
      </div>
    </section>
  );
}

'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    // Entrance Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    });

    tl.from('.contact-reveal', {
      opacity: 0,
      x: -30,
      stagger: 0.2,
      duration: 1.5,
      ease: 'power4.out'
    })
    .from('.contact-form-wrap', {
      opacity: 0,
      scale: 0.95,
      y: 50,
      duration: 1.5,
      ease: 'expo.out'
    }, '-=1.2');

    // Magnetic Button Effect
    if (buttonRef.current) {
      const btn = buttonRef.current;
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.6,
          ease: 'power2.out'
        });
        
        gsap.to('.btn-glow', {
          x: x * 0.5,
          y: y * 0.5,
          opacity: 1,
          duration: 0.6
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
        gsap.to('.btn-glow', { opacity: 0, x: 0, y: 0, duration: 1 });
      };

      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-20 md:py-40 flex flex-col items-center justify-center px-8 z-10 bg-transparent">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-start">
        
        {/* Cinematic Content Left */}
        <div className="contact-content-left flex flex-col">
          <span className="contact-reveal text-[10px] font-mono text-[#6a4a8c] tracking-[0.8em] mb-10 block uppercase font-black opacity-60">
            PRODUCTION ENQUIRY
          </span>
          <h2 className="contact-reveal text-5xl md:text-8xl font-playfair font-black text-slate-900 leading-[0.9] mb-10 tracking-tighter">
            JOIN THE <br />
            <span className="italic font-light text-[#6a4a8c]">SCENE.</span>
          </h2>
          
          <div className="contact-reveal w-20 h-[1.5px] bg-[#6a4a8c]/20 mb-16" />
          
          <p className="contact-reveal text-xl md:text-2xl font-light text-[#6a4a8c]/70 font-inter leading-relaxed max-w-md mb-12 uppercase tracking-[0.1em]">
            The script is waiting for your signature. The crew is on standby. Your epic begins today.
          </p>
          
          <div className="contact-reveal flex flex-col gap-8">
             <div className="group flex items-center gap-6 cursor-pointer">
                <div className="w-12 h-[1px] bg-[#6a4a8c]/30 group-hover:w-20 group-hover:bg-[#6a4a8c] transition-all duration-700" />
                <span className="text-[10px] font-mono font-black text-slate-900 tracking-[0.4em] uppercase">CASTING@PROTAGONIST.STUDIO</span>
             </div>
             <div className="group flex items-center gap-6 cursor-pointer">
                <div className="w-12 h-[1px] bg-[#6a4a8c]/30 group-hover:w-20 group-hover:bg-[#6a4a8c] transition-all duration-700" />
                <span className="text-[10px] font-mono font-black text-slate-900 tracking-[0.4em] uppercase">+1 (555) CINEMA-01</span>
             </div>
          </div>
        </div>

        {/* Minimalist Premium Form Right */}
        <div className="contact-form-wrap w-full glass-card p-14 md:p-24 border border-[#6a4a8c]/10 glow-shadow-purple">
          <form className="flex flex-col gap-20">
             <div className="relative group">
                <span className="text-[9px] font-mono text-[#6a4a8c] uppercase font-black tracking-[0.3em] opacity-40 group-focus-within:opacity-100 transition-opacity">01. IDENTITY</span>
                <input 
                   type="text" 
                   className="w-full bg-transparent border-b border-[#6a4a8c]/10 py-8 text-3xl font-playfair text-slate-900 placeholder:text-slate-200 focus:outline-none focus:border-[#6a4a8c] transition-colors"
                   placeholder="Your Name"
                />
             </div>

             <div className="relative group">
                <span className="text-[9px] font-mono text-[#6a4a8c] uppercase font-black tracking-[0.3em] opacity-40 group-focus-within:opacity-100 transition-opacity">02. SIGNAL</span>
                <input 
                   type="email" 
                   className="w-full bg-transparent border-b border-[#6a4a8c]/10 py-8 text-3xl font-playfair text-slate-900 placeholder:text-slate-200 focus:outline-none focus:border-[#6a4a8c] transition-colors"
                   placeholder="Email Address"
                />
             </div>

             <div className="relative group">
                <span className="text-[9px] font-mono text-[#6a4a8c] uppercase font-black tracking-[0.3em] opacity-40 group-focus-within:opacity-100 transition-opacity">03. NARRATIVE</span>
                <textarea 
                   rows={1}
                   className="w-full bg-transparent border-b border-[#6a4a8c]/10 py-8 text-3xl font-playfair text-slate-900 placeholder:text-slate-200 focus:outline-none focus:border-[#6a4a8c] transition-colors resize-none"
                   placeholder="Your Logline"
                />
             </div>

             <div className="pt-12">
                <button 
                  ref={buttonRef}
                  className="group relative w-full overflow-hidden bg-[#6a4a8c] py-12 text-white text-[10px] font-black tracking-[0.6em] uppercase transition-all shadow-[0_40px_80px_rgba(106,74,140,0.25)] hover:shadow-[0_60px_120px_rgba(106,74,140,0.4)]"
                >
                   <span className="relative z-10 transition-transform duration-500 group-hover:scale-110 block">SUBMIT SCRIPT</span>
                   <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-cinematic" />
                   <div className="btn-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/20 blur-[60px] rounded-full pointer-events-none opacity-0" />
                </button>
                <p className="mt-10 text-[9px] font-mono text-[#6a4a8c]/40 text-center tracking-widest uppercase italic">
                  * All submissions are reviewed by the head of production.
                </p>
             </div>
          </form>
        </div>
      </div>

      {/* Cinematic Footer Branding */}
      <div className="mt-24 md:mt-48 flex flex-col items-center w-full max-w-7xl pt-12 border-t border-[#6a4a8c]/5">
        <div className="flex flex-col md:flex-row justify-between w-full opacity-30 text-[8px] font-mono tracking-[0.6em] uppercase font-black mb-12 text-[#6a4a8c]">
          <span>© {new Date().getFullYear()} PROTAGONIST STUDIO</span>
          <span className="my-2 md:my-0">A PRECISE NARRATIVE PRODUCTION</span>
          <span>EST. MCMLXXXIX</span>
        </div>
        
        <h1 className="text-[8vw] font-playfair font-black text-slate-900/5 select-none leading-none tracking-tighter">
          THE END.
        </h1>
      </div>
    </section>
  );
}

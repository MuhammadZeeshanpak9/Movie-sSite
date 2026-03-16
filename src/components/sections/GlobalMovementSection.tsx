'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Counter({ end, label }: { end: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to({ val: 0 }, {
      val: end,
      duration: 4,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      onUpdate: function() {
        setCount(Math.floor(this.targets()[0].val));
      },
      ease: 'expo.out'
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="flex flex-col gap-6 border-l border-[#6a4a8c]/10 pl-12 py-6 group">
      <div className="text-5xl md:text-7xl font-playfair font-black text-slate-900 leading-none tracking-tighter group-hover:text-[#6a4a8c] transition-colors duration-700">
        {count}<span className="text-[#6a4a8c]/20 text-3xl md:text-4xl font-light ml-2">+</span>
      </div>
      <div className="text-[10px] font-mono text-[#6a4a8c] tracking-[0.5em] uppercase font-black opacity-40 group-hover:opacity-100 transition-opacity">
        {label}
      </div>
    </div>
  );
}

export default function GlobalMovementSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from('.movement-reveal', {
      opacity: 0,
      y: 40,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out'
    });

    gsap.from('.stat-reveal', {
      opacity: 0,
      x: 50,
      duration: 1.5,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.stats-container',
        start: 'top 85%',
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-20 md:py-40 px-8 z-10 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-24 md:gap-40">
        
        <div className="gpu-accelerated max-w-4xl">
          <span className="movement-reveal text-[10px] font-mono text-[#6a4a8c] tracking-[1em] mb-12 block uppercase font-black opacity-60">
            PRODUCTION DATA
          </span>
          <h2 className="movement-reveal text-5xl md:text-8xl font-playfair font-black text-slate-900 leading-[0.9] mb-10 tracking-tighter uppercase">
            GLOBAL <br />
            <span className="italic font-light text-[#6a4a8c]">REACH.</span>
          </h2>
          <div className="movement-reveal w-24 h-[1.5px] bg-[#6a4a8c]/20 mb-16" />
          <p className="movement-reveal text-xl md:text-2xl text-[#6a4a8c]/70 font-light leading-relaxed uppercase tracking-[0.1em] font-inter max-w-2xl italic">
            The premiere has already started. Across the globe, the narrative is shifting from observation to direction.
          </p>
        </div>

        <div className="stats-container flex flex-col gap-16 md:min-w-[500px] w-full lg:w-auto">
          <div className="stat-reveal"><Counter end={142} label="STORIES DIRECTED (K)" /></div>
          <div className="stat-reveal"><Counter end={12} label="SCENES COMPLETED (M)" /></div>
          <div className="stat-reveal"><Counter end={89} label="COUNTRIES ACTIVATED" /></div>
        </div>

      </div>

      {/* Background Graphic Element */}
      <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] border border-[#6a4a8c]/5 rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] border border-[#6a4a8c]/5 rounded-full pointer-events-none" />
    </section>
  );
}

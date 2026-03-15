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
      duration: 3,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
      },
      onUpdate: function() {
        setCount(Math.floor(this.targets()[0].val));
      },
      ease: 'power4.out'
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="flex flex-col gap-4 border-l border-slate-100 pl-12 py-4">
      <div className="text-7xl md:text-[8rem] font-playfair font-black text-slate-900 leading-none tracking-tighter">
        {count}
      </div>
      <div className="text-[10px] font-mono text-indigo-500 tracking-[0.5em] uppercase font-bold">
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
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1.2,
      }
    });

    tl.from('.movement-title', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.movement-stat', {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out'
    }, "-=0.8");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="gpu-accelerated relative w-full py-24 md:py-60 px-8 z-10 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 md:gap-24">
        
        <div className="movement-title gpu-accelerated max-w-2xl">
          <span className="text-[10px] font-mono text-indigo-400 tracking-[0.6em] mb-8 block uppercase font-black">Live Production Data</span>
          <h2 className="text-6xl md:text-[10.5rem] font-playfair font-black text-slate-900 leading-[0.8] mb-12 tracking-tighter">
            GLOBAL <br />
            <span className="italic font-light text-[#6a4a8c]">REACH.</span>
          </h2>
          <div className="w-16 h-[1px] bg-indigo-400 mb-8" />
          <p className="text-lg text-[#6a4a8c] font-light leading-relaxed uppercase tracking-widest">
            The premiere has already started. Across the globe, the narrative is shifting from observation to direction.
          </p>
        </div>

        <div className="flex flex-col gap-12 md:min-w-[450px]">
          <div className="movement-stat gpu-accelerated"><Counter end={142} label="STORIES DIRECTED (K)" /></div>
          <div className="movement-stat gpu-accelerated"><Counter end={12} label="SCENES COMPLETED (M)" /></div>
          <div className="movement-stat gpu-accelerated"><Counter end={89} label="COUNTRIES ACTIVATED" /></div>
        </div>

      </div>
    </section>
  );
}

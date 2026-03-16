'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const STEPS = [
  { num: '01', title: 'CLAIM THE ROLE', desc: 'Step onto the set. The world is built, the lighting is set, but the chair is empty.', image: '/bg_anim_1.png' },
  { num: '02', title: 'DISCOVER THE ARC', desc: 'Identify the narrative beats that have shaped you. The patterns are there if you look.', image: '/bg_anim_2.png' },
  { num: '03', title: 'FORGE THE SCRIPT', desc: 'Take control of the dialogue. Rewrite the scenes that no longer serve the epic.', image: '/bg_anim_3.png' },
  { num: '04', title: 'CALL ACTION', desc: 'Live the movie. Every decision is a masterclass in intentionality.', image: '/bg_anim_4.png' },
];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    });

    tl.from('.how-reveal', {
      opacity: 0,
      y: 40,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out'
    });

    gsap.from('.how-step', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.how-grid',
        start: 'top bottom', // fires as soon as grid enters viewport
      }
    });
  }, { scope: containerRef });
  
  return (
    <section ref={containerRef} className="relative w-full py-20 md:py-40 px-8 z-10 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-32 max-w-4xl">
          <span className="how-reveal text-[10px] font-mono text-[#6a4a8c] tracking-[1em] mb-6 block uppercase font-black opacity-60">
            STRATEGIC PIPELINE
          </span>
          <h2 className="how-reveal text-5xl md:text-8xl font-playfair font-black text-slate-900 leading-[0.9] tracking-tighter">
            THE <br />
            <span className="italic font-light text-[#6a4a8c]">PROCESS.</span>
          </h2>
        </div>

        <div className="how-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {STEPS.map((step) => (
            <div key={step.num} className="how-step group relative h-[400px] md:h-[550px] overflow-hidden glass-card border border-[#6a4a8c]/5">
              {/* Cinematic Image Frame */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover transition-all duration-1500 group-hover:scale-110 ease-cinematic" 
                />
                <div className="absolute inset-0 bg-white/10 group-hover:bg-[#6a4a8c]/90 transition-colors duration-1000" />
              </div>

              <div className="relative h-full p-12 flex flex-col justify-end z-10 group-hover:text-white transition-colors duration-700">
                <div className="flex items-center justify-between mb-12">
                   <span className="text-[10px] font-mono text-[#6a4a8c] group-hover:text-white font-black tracking-[0.5em]">{step.num}</span>
                   <div className="w-12 h-[1px] bg-[#6a4a8c]/20 group-hover:w-24 group-hover:bg-white/40 transition-all duration-1000" />
                </div>
                
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-cinematic">
                  <h3 className="text-4xl font-playfair font-black mb-8 tracking-tight uppercase leading-[1.1]">
                    {step.title}
                  </h3>
                  <p className="text-[10px] font-light leading-relaxed uppercase tracking-[0.25em] opacity-60 group-hover:opacity-90 max-w-[220px] font-inter">
                    {step.desc}
                  </p>
                </div>

                {/* Interaction Accent */}
                <div className="absolute top-12 right-12 w-12 h-12 border-t border-r border-[#6a4a8c]/10 group-hover:border-white/40 transition-all duration-1000" />
                
                {/* Progress Bar Accent */}
                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-[#6a4a8c] group-hover:bg-white group-hover:w-full transition-all duration-1000 ease-soft" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

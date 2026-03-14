'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const STEPS = [
  { num: '01', title: 'CLAIM THE ROLE', desc: 'Step onto the set. The world is built, the lighting is set, but the chair is empty.', image: 'https://images.unsplash.com/photo-1485090958803-84cbdaba9d8e?q=80&w=1000&auto=format&fit=crop' },
  { num: '02', title: 'DISCOVER THE ARC', desc: 'Identify the narrative beats that have shaped you. The patterns are there if you look.', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop' },
  { num: '03', title: 'FORGE THE SCRIPT', desc: 'Take control of the dialogue. Rewrite the scenes that no longer serve the epic.', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed0963c?q=80&w=1000&auto=format&fit=crop' },
  { num: '04', title: 'CALL ACTION', desc: 'Live the movie. Every decision is a masterclass in intentionality.', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000&auto=format&fit=crop' },
];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1.2,
      }
    });

    tl.from('.how-header', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.how-step', {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power3.out'
    }, "-=0.8");
  }, { scope: containerRef });
  
  return (
    <section ref={containerRef} className="relative w-full py-60 px-8 z-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="how-header mb-40">
          <span className="text-[10px] font-mono text-indigo-400 tracking-[0.6em] mb-6 block uppercase font-black">Strategic Pipeline</span>
          <h2 className="text-6xl md:text-[10rem] font-playfair font-black text-slate-900 leading-[0.8] tracking-tighter">
            THE <br />
            <span className="italic font-light text-slate-300">PROCESS.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step) => (
            <div key={step.num} className="how-step gpu-accelerated flex flex-col group relative h-[500px] overflow-hidden border border-slate-50 bg-slate-50">
              {/* Cinematic Image Frame */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image 
                  src={step.image} 
                  alt={step.title} 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-white/80 group-hover:bg-indigo-900/40 transition-colors duration-700" />
              </div>

              <div className="relative h-full p-10 flex flex-col justify-end z-10 group-hover:text-white transition-colors duration-500">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono text-indigo-400 group-hover:text-indigo-200 font-black tracking-widest">{step.num}</span>
                  <div className="w-8 h-[1px] bg-indigo-200 group-hover:w-16 group-hover:bg-white transition-all duration-700" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-playfair font-black mb-4 tracking-tight uppercase leading-none">
                    {step.title}
                  </h3>
                  <p className="text-[10px] font-medium leading-relaxed uppercase tracking-[0.2em] opacity-80 max-w-[200px]">
                    {step.desc}
                  </p>
                </div>

                {/* Progress Bar Accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#9f81b9] group-hover:w-full transition-all duration-1000" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

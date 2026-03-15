'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const EXPERIENCES = [
  {
    title: 'The Protagonist',
    desc: 'You are no longer an observer. In this narrative, every action you take ripples through the scenes of your existence.',
    label: 'ROLE 01',
    image: 'https://images.unsplash.com/photo-1542204113-e93526286435?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'The Director',
    desc: 'Take the chair. Shape the environment, choose the cast, and decide where the lens focuses next.',
    label: 'ROLE 02',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'The Epic',
    desc: 'Your life isn’t a short film. It’s a multi-arc saga with no limits on the final act.',
    label: 'ROLE 03',
    image: 'https://images.unsplash.com/photo-1512113569143-146959b3bc2f?q=80&w=1000&auto=format&fit=crop'
  },
];

export default function TheExperienceSection() {
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

    tl.from('.exp-title', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.experience-row', {
      opacity: 0,
      y: 60,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power3.out'
    }, "-=0.8");
  }, { scope: containerRef });
  
  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-60 px-8 flex flex-col items-center z-10 overflow-hidden bg-transparent">
      {/* Large Cinematic Header */}
      <div className="exp-title max-w-7xl w-full mb-20 md:mb-40">
        <span className="text-indigo-400 font-mono tracking-[0.6em] text-[10px] block mb-6 font-black uppercase">Technical Mastery</span>
        <h2 className="text-6xl md:text-[10rem] font-playfair font-black text-slate-900 leading-[0.8] tracking-tighter">
          THE <br />
          <span className="italic font-light text-[#9f81b9]">EXPERIENCE.</span>
        </h2>
      </div>

      {/* Cinematic Rows */}
      <div className="max-w-7xl w-full flex flex-col gap-24 md:gap-60">
        {EXPERIENCES.map((exp, i) => (
          <ExperienceRow key={i} {...exp} index={i} />
        ))}
      </div>
    </section>
  );
}

function ExperienceRow({ title, desc, label, index, image }: { title: string; desc: string; label: string; index: number, image: string }) {
  const isEven = index % 2 === 0;

  return (
    <div 
      className={`experience-row gpu-accelerated flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 md:gap-32 items-center`}
    >
      {/* Visual Placeholder (Cinematic Frame) */}
      <div className="flex-1 w-full aspect-[16/9] bg-slate-50 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
        <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105">
           <Image 
             src={image} 
             alt={title} 
             fill 
             className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
           />
           <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-700" />
        </div>
        
        {/* Abstract Cinematic Element */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[80%] h-[1px] bg-white/20 group-hover:w-full transition-all duration-700" />
            <div className="absolute w-[1px] h-[30%] bg-white/20 group-hover:h-[50%] transition-all duration-700" />
        </div>

        <div className="absolute bottom-8 left-8 text-[10px] font-mono text-slate-400 tracking-[0.5em] uppercase font-bold">
          {label}
        </div>
        
        {/* Cinematic Crop Marks */}
        <div className="absolute top-8 left-8 w-6 h-[1px] bg-slate-300" />
        <div className="absolute top-8 left-8 w-[1px] h-6 bg-slate-300" />
        <div className="absolute bottom-8 right-8 w-6 h-[1px] bg-slate-300" />
        <div className="absolute bottom-8 right-8 w-[1px] h-6 bg-slate-300" />
      </div>

      {/* Content */}
      <div className={`flex-1 flex flex-col ${isEven ? 'items-start' : 'items-end md:text-right'}`}>
        <div className="w-16 h-[1px] bg-indigo-400 mb-8" />
        <h3 className="text-4xl md:text-6xl font-playfair font-bold mb-8 text-slate-900 leading-tight">
          {title}
        </h3>
        <p className="text-lg text-[#9f81b9] font-light leading-relaxed max-w-md uppercase tracking-wider">
          {desc}
        </p>
        
        <button className="mt-12 group flex items-center gap-6 overflow-hidden">
          <span className="text-xs tracking-[0.4em] font-mono text-indigo-400 uppercase font-black">View Details</span>
          <div className="relative w-12 h-[1px] bg-indigo-200">
            <div className="absolute inset-0 bg-indigo-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </div>
        </button>
      </div>
    </div>
  );
}

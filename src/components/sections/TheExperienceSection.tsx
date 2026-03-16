'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const EXPERIENCES = [
  {
    title: 'THE PROTAGONIST',
    desc: 'You are no longer an observer. In this narrative, every action you take ripples through the scenes of your existence.',
    label: 'SCENE 01',
    image: 'https://images.unsplash.com/photo-1542204113-e93526286435?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'THE DIRECTOR',
    desc: 'Take the chair. Shape the environment, choose the cast, and decide where the lens focuses next.',
    label: 'SCENE 02',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'THE EPIC',
    desc: 'Your life isn’t a short film. It’s a multi-arc saga with no limits on the final act.',
    label: 'SCENE 03',
    image: 'https://images.unsplash.com/photo-1512113569143-146959b3bc2f?q=80&w=1000&auto=format&fit=crop'
  },
];

export default function TheExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from('.exp-reveal', {
      opacity: 0,
      y: 40,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out'
    });
  }, { scope: containerRef });
  
  return (
    <section ref={containerRef} className="relative w-full py-20 md:py-40 px-8 flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* Large Cinematic Header */}
      <div className="max-w-7xl w-full mb-16 md:mb-32">
        <span className="exp-reveal text-[10px] font-mono text-[#6a4a8c] tracking-[1em] mb-6 block uppercase font-black opacity-60">
          TECHNICAL MASTERY
        </span>
        <h2 className="exp-reveal text-5xl md:text-8xl font-playfair font-black text-slate-900 leading-[0.9] tracking-tighter">
          THE <br />
          <span className="italic font-light text-[#6a4a8c]">EXPERIENCE.</span>
        </h2>
      </div>

      {/* Cinematic Rows */}
      <div className="max-w-7xl w-full flex flex-col gap-20 md:gap-40">
        {EXPERIENCES.map((exp, i) => (
          <ExperienceRow key={i} {...exp} index={i} />
        ))}
      </div>
    </section>
  );
}

function ExperienceRow({ title, desc, label, index, image }: { title: string; desc: string; label: string; index: number, image: string }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useGSAP(() => {
    gsap.from(rowRef.current, {
      opacity: 0,
      x: isEven ? -100 : 100,
      duration: 1.5,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: rowRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: rowRef });

  return (
    <div 
      ref={rowRef}
      className={`gpu-accelerated flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-20 md:gap-40 items-center`}
    >
      {/* Visual Frame */}
      <div className="flex-1 w-full aspect-[16/10] bg-slate-50 relative overflow-hidden group shadow-[0_40px_80px_rgba(0,0,0,0.05)] cursor-pointer glass-card border border-[#6a4a8c]/5">
        <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105">
           <Image 
             src={image} 
             alt={title} 
             fill 
             className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-cinematic"
           />
           <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-700" />
        </div>
        
        {/* Abstract Cinematic Overlays */}
        <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-[1px] bg-[#6a4a8c]/10 group-hover:bg-[#6a4a8c]/30 transition-all duration-700" />
        <div className="absolute inset-y-12 left-1/2 -translate-x-1/2 w-[1px] bg-[#6a4a8c]/10 group-hover:bg-[#6a4a8c]/30 transition-all duration-700" />

        <div className="absolute top-12 left-12 text-[9px] font-mono text-[#6a4a8c] tracking-[0.5em] uppercase font-black opacity-40 group-hover:opacity-100 transition-opacity">
          {label}
        </div>
        
        {/* Viewfinder Marks */}
        <div className="absolute top-12 right-12 w-8 h-[1px] bg-[#6a4a8c]/20" />
        <div className="absolute top-12 right-12 w-[1px] h-8 bg-[#6a4a8c]/20" />
        <div className="absolute bottom-12 left-12 w-8 h-[1px] bg-[#6a4a8c]/20" />
        <div className="absolute bottom-12 left-12 w-[1px] h-8 bg-[#6a4a8c]/20" />
      </div>

      {/* Content */}
      <div className={`flex-1 flex flex-col ${isEven ? 'items-start' : 'items-end md:text-right'}`}>
        <div className="w-20 h-[1.5px] bg-[#6a4a8c]/20 mb-12" />
        <h3 className="text-4xl md:text-5xl font-playfair font-black mb-6 text-slate-900 leading-[1.1] tracking-tight uppercase">
          {title}
        </h3>
        <p className="text-lg md:text-xl text-[#6a4a8c]/80 font-light leading-relaxed max-lg mb-10 uppercase tracking-[0.1em] font-inter">
          {desc}
        </p>
        
        <button className="group flex items-center gap-8 overflow-hidden">
          <span className="text-[10px] tracking-[0.6em] font-mono text-slate-900 uppercase font-black">VIEW DETAILS</span>
          <div className="relative w-16 h-[1.5px] bg-[#6a4a8c]/20">
            <div className="absolute inset-0 bg-[#6a4a8c] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-cinematic" />
          </div>
        </button>
      </div>
    </div>
  );
}

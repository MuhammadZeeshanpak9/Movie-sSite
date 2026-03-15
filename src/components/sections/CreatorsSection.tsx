'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CREATORS = [
  { name: 'ELENA ROSTOVA', role: 'EXECUTIVE PRODUCER', desc: 'Crafting the frameworks that make your story unignorable.', image: 'https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=1000&auto=format&fit=crop' },
  { name: 'MARCUS FINCH', role: 'DIRECTOR OF EXPERIENCES', desc: 'Ensuring every micro-interaction feels like a pivotal scene.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop' },
  { name: 'SARAH CHEN', role: 'LEAD NARRATOLOGIST', desc: 'Structuring your chaos into a compelling character arc.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop' },
];

export default function CreatorsSection() {
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

    tl.from('.creators-header', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.creator-card', {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 1.5,
      ease: 'power3.out'
    }, "-=0.8");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-60 px-8 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="creators-header mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-indigo-400 tracking-[1em] mb-4 block uppercase font-black">THE ARCHITECTS</span>
            <h2 className="text-6xl md:text-[8rem] font-playfair font-black text-slate-900 leading-[0.8] tracking-tighter uppercase">
              CREATIVE <br />
              <span className="italic font-light text-[#9f81b9]">FORCE.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CREATORS.map((char, i) => (
            <CreatorCard key={char.name} char={char} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CreatorCard({ char, index }: { char: typeof CREATORS[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(cardRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="creator-card gpu-accelerated group bg-white border border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-shadow duration-500 overflow-hidden"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image src={char.image} alt={char.name} fill className="object-cover transition-all duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-700" />
      </div>

      <div className="p-12 relative">
        <div className="text-[10px] font-mono text-slate-400 mb-8 flex items-center gap-4">
           <span className="w-8 h-[1px] bg-indigo-500" />
           STAFF ID-{100 + index}
        </div>
        
        <h3 className="text-3xl md:text-4xl font-playfair font-bold text-slate-800 mb-4 group-hover:text-indigo-400 transition-colors duration-500">
          {char.name}
        </h3>
        <div className="text-xs text-[#9f81b9] font-mono tracking-wider mb-8 uppercase font-bold">{char.role}</div>
        
        <p className="font-light text-[#9f81b9] text-base leading-relaxed uppercase tracking-widest">
          {char.desc}
        </p>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-4 right-4 w-4 h-[1px] bg-indigo-400" />
          <div className="absolute top-4 right-4 w-[1px] h-4 bg-indigo-400" />
        </div>
      </div>
    </div>
  );
}

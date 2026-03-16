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
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from('.creators-reveal', {
      opacity: 0,
      y: 40,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out'
    });

    // Staggered Cards Entrance
    gsap.from('.creator-card', {
      opacity: 0,
      y: 100,
      scale: 0.95,
      duration: 1.5,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.creators-grid',
        start: 'top 85%',
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-20 md:py-40 px-8 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-3xl">
            <span className="creators-reveal text-[10px] font-mono text-[#6a4a8c] tracking-[1em] mb-6 block uppercase font-black opacity-60">
              THE ARCHITECTS
            </span>
            <h2 className="creators-reveal text-5xl md:text-8xl font-playfair font-black text-slate-900 leading-[0.9] tracking-tighter uppercase">
              CREATIVE <br />
              <span className="italic font-light text-[#6a4a8c]">FORCE.</span>
            </h2>
          </div>
          <p className="creators-reveal max-w-xs text-slate-500 font-inter font-light border-l border-[#6a4a8c]/20 pl-10 leading-loose uppercase text-[10px] tracking-[0.25em]">
            Behind every masterpiece is a team that refuses to compromise on the vision. Meet the architects of your epic.
          </p>
        </div>

        <div className="creators-grid grid grid-cols-1 md:grid-cols-3 gap-12">
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
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current || !innerRef.current) return;
    
    const card = cardRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 12;
      const rotateY = (centerX - x) / 12;
      
      gsap.to(innerRef.current, {
        rotateX,
        rotateY,
        scale: 0.92,
        z: -100,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(innerRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        z: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto'
      });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: cardRef });

  return (
    <div 
      ref={cardRef}
      className="creator-card perspective-[2000px] group cursor-pointer h-[450px] md:h-[650px]"
    >
      <div 
        ref={innerRef}
        className="relative w-full h-full preserve-3d transition-transform duration-500 ease-out will-change-transform glass-card border border-[#6a4a8c]/5"
      >
        <div className="relative aspect-[1/1.2] overflow-hidden">
          <Image 
            src={char.image} 
            alt={char.name} 
            fill 
            className="object-cover transition-all duration-1500 group-hover:scale-105 ease-cinematic" 
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>

        <div className="p-12 relative flex flex-col justify-end h-[calc(100%-1.2*100%)]">
          <div className="text-[9px] font-mono text-[#6a4a8c] mb-10 flex items-center gap-6 font-black opacity-40 group-hover:opacity-100 transition-opacity">
             <div className="w-10 h-[1px] bg-[#6a4a8c]/30" />
             STAFF ID-{100 + index}
          </div>
          
          <h3 className="text-3xl font-playfair font-black text-slate-900 mb-6 group-hover:text-white transition-colors duration-700 leading-tight">
            {char.name}
          </h3>
          <div className="text-[10px] text-[#6a4a8c] font-mono tracking-[0.3em] mb-10 uppercase font-black">{char.role}</div>
          
          <p className="font-light text-slate-500 text-[10px] leading-relaxed uppercase tracking-[0.2em] font-inter group-hover:text-slate-700 transition-colors">
            {char.desc}
          </p>

          {/* Cinematic Viewfinder Corner */}
          <div className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-[#6a4a8c]/10 group-hover:border-[#6a4a8c]/40 transition-all duration-1000" />
        </div>

        {/* Interaction Glint */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      </div>
    </div>
  );
}

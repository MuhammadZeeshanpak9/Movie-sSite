'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CHARACTERS = [
  { id: '01', name: 'THE IDLE', role: 'PROTAGONIST', quote: 'I am the master of my fate, I am the captain of my soul.', image: '/char_idle.png' },
  { id: '02', name: 'SERAPHINA', role: 'ANTAGONIST', quote: 'Every story needs a villain, but even villains have a heart.', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop' },
  { id: '03', name: 'ELIAS VANE', role: 'THE MENTOR', quote: 'Your legacy is built one scene at a time.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop' },
  { id: '04', name: 'KAIROS', role: 'THE SHADOW', quote: 'Sometimes the strongest light casting the deepest shadow.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop' },
];

export default function MainCharactersSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from('.char-reveal', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out'
    });

    // Grid entrance
    gsap.from('.character-card', {
      opacity: 0,
      scale: 0.9,
      y: 100,
      stagger: 0.1,
      duration: 1.5,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.char-grid',
        start: 'top 80%',
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-16 md:py-32 px-8 md:px-24 z-10 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-24 md:mb-40 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-3xl">
            <span className="char-reveal text-[10px] font-mono text-[#6a4a8c] tracking-[0.8em] mb-8 block uppercase font-black opacity-60">
              THE ENSEMBLE
            </span>
            <h2 className="char-reveal text-5xl md:text-7xl font-playfair font-black text-slate-900 leading-[0.9] tracking-tighter">
              MAIN <br />
              <span className="italic font-light text-[#6a4a8c] uppercase">CHARACTERS.</span>
            </h2>
          </div>
          <p className="char-reveal max-w-xs text-slate-500 font-inter font-light border-l border-[#6a4a8c]/20 pl-10 leading-loose uppercase text-[10px] tracking-[0.25em]">
            A script is nothing without the souls that inhabit it. Meet the pillars of the upcoming narrative.
          </p>
        </div>

        {/* Characters Grid */}
        <div className="char-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {CHARACTERS.map((char, i) => (
            <CharacterCard key={char.id} {...char} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CharacterCard({ name, role, quote, index, image }: { name: string; role: string; quote: string; index: number, image: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current || !innerRef.current) return;
    
    const card = cardRef.current;
    
    // Shrinking and Exposing Entrance Effect
    gsap.fromTo(card, {
      scale: 1.5,
      opacity: 0,
      clipPath: 'inset(10% 10% 10% 10%)'
    }, {
      scale: 1,
      opacity: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.5,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 95%',
        toggleActions: 'play none none reverse'
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 8;
      const rotateY = (centerX - x) / 8;
      
      gsap.to(innerRef.current, {
        rotateX,
        rotateY,
        scale: 0.92,
        z: -100,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      // Added subtle glow movement based on mouse
      gsap.to('.card-glow', {
        x: (x - centerX) * 0.15,
        y: (y - centerY) * 0.15,
        duration: 0.8,
        ease: 'power2.out'
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
      gsap.to('.card-glow', { x: 0, y: 0, duration: 1 });
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
      className="character-card perspective-[2000px] group cursor-pointer h-[450px] md:h-[600px] transition-shadow duration-700 hover:shadow-[0_40px_80px_rgba(106,74,140,0.1)]"
    >
      <div 
        ref={innerRef}
        className="relative w-full h-full preserve-3d transition-transform duration-500 ease-out will-change-transform glass-card border border-[#6a4a8c]/10"
      >
        {/* Dynamic Glow Layer */}
        <div className="card-glow absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(106,74,140,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Background Image - Now Clear */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="object-cover group-hover:scale-105 transition-all duration-1500 ease-cinematic"
          />
          {/* Subtle bottom shadow only on hover for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        {/* Content Layer */}
        <div className="relative h-full p-12 flex flex-col justify-end z-10 translate-z-[60px]">
          <div className="mb-8">
            <span className="text-[9px] font-mono text-[#6a4a8c] tracking-[0.6em] font-black block mb-4">
              0{index + 1} // {role}
            </span>
            <h3 className="text-3xl md:text-4xl font-playfair font-black text-slate-900 leading-[0.85] uppercase group-hover:text-white transition-colors duration-500">
              {name.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h3>
          </div>

          <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-1000 ease-soft translate-z-[40px]">
            <p className="text-[10px] text-slate-600 font-inter font-light italic leading-loose uppercase tracking-[0.25em] border-t border-[#6a4a8c]/20 pt-8">
              &quot;{quote}&quot;
            </p>
          </div>
          
          {/* Production ID */}
          <div className="absolute top-12 left-12 transform-z-[80px] opacity-30 group-hover:opacity-100 transition-opacity">
            <span className="text-[8px] font-mono text-[#6a4a8c] tracking-widest uppercase font-black">
              PID-{2026 + index}
            </span>
          </div>

          {/* Elegant Scanner Accent */}
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-[#6a4a8c]/20 transition-all duration-1000 group-hover:w-20 group-hover:h-20 group-hover:border-[#6a4a8c] group-hover:glow-shadow-purple" />
        </div>
        
        {/* Cinematic Glint */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 pointer-events-none" />
      </div>
    </div>
  );
}

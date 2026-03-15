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
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1.2,
      }
    });

    tl.from('.character-header', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.character-card', {
      opacity: 0,
      y: 60,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power3.out'
    }, "-=0.8");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-60 px-8 md:px-24 z-10 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="character-header mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-indigo-400 tracking-[1em] mb-4 block uppercase font-black">THE ENSEMBLE</span>
            <h2 className="text-6xl md:text-[8rem] font-playfair font-black text-slate-900 leading-[0.8] tracking-tighter">
              MAIN <br />
              <span className="italic font-light text-[#6a4a8c] uppercase">CHARACTERS.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[#6a4a8c] font-inter font-light mt-8 md:mt-0 border-l border-slate-100 pl-8 leading-loose uppercase text-[10px] tracking-widest">
            A script is nothing without the souls that inhabit it. Meet the pillars of the upcoming narrative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    
    const imageElement = cardRef.current.querySelector('.char-img');
    const contentElement = cardRef.current.querySelector('.char-content');
    
    tlRef.current = gsap.timeline({ paused: true })
      .to(imageElement, { scale: 1.1, duration: 1, ease: 'power2.out' })
      .to(contentElement, { y: -20, duration: 1, ease: 'power2.out' }, 0);
  }, { scope: cardRef });

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => tlRef.current?.play()}
      onMouseLeave={() => tlRef.current?.reverse()}
      onTouchStart={() => {
        // Toggle animation on touch
        const tl = tlRef.current;
        if (!tl) return;
        
        if (tl.progress() === 0) {
          tl.play();
        } else {
          tl.reverse();
        }
      }}
      className="character-card gpu-accelerated group relative h-[500px] md:h-[600px] bg-slate-50 overflow-hidden border border-slate-100 cursor-pointer"
    >
      <div className="char-img absolute inset-0 z-0">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-80 group-hover:opacity-40 group-active:opacity-40 transition-opacity duration-700" />
      </div>

      <div className="char-content relative h-full p-10 flex flex-col justify-end z-10">
        <div className="mb-4">
          <span className="text-[10px] font-mono text-indigo-500 tracking-[0.4em] font-black block mb-2">0{index + 1} {"//"} {role}</span>
          <h3 className="text-4xl font-playfair font-black text-slate-900 leading-tight uppercase group-hover:text-indigo-900 transition-colors">
            {name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h3>
        </div>

        <div className="h-0 group-hover:h-24 group-active:h-24 overflow-hidden transition-all duration-700 ease-cinematic">
          <p className="text-[10px] text-[#6a4a8c] font-light italic leading-loose uppercase tracking-widest border-t border-indigo-100 pt-6">
            &quot;{quote}&quot;
          </p>
        </div>
        
        {/* Elegant Accent */}
        <div className="absolute top-0 right-0 p-8 transform rotate-90 origin-top-right">
          <span className="text-[9px] font-mono text-[#6a4a8c] group-hover:text-indigo-200 tracking-widest uppercase font-bold transition-colors">STAFF ID-{100 + index}</span>
        </div>
      </div>
      
      {/* Interaction Glint */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
    </div>
  );
}

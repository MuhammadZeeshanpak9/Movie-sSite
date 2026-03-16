'use client';

import React, { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SCENES = [
  {
    id: '01',
    title: 'THE INCITING INCIDENT',
    desc: 'The moment your old world crumbles to make room for the new masterpiece.',
    time: 'ACT I',
    image: '/assets/images/the-inciting-incident.png'
  },
  {
    id: '02',
    title: 'THE DARK ROOM',
    desc: 'Where potential is developed. The struggle that defines the character arc.',
    time: 'ACT II',
    image: 'https://images.unsplash.com/photo-1585647347384-2593bc35716b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '03',
    title: 'THE PREMIERE',
    desc: 'When the world finally sees what you’ve been building in the shadows.',
    time: 'ACT III',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop'
  },
];

export default function TheConceptSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      }
    });

    tl.from('.concept-reveal', {
      opacity: 0,
      y: 50,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out'
    });

    // Horizontal Parallax for Cards
    gsap.from('.concept-card', {
      x: (i) => (i - 1) * 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.concept-grid',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="gpu-accelerated relative w-full py-16 md:py-32 flex flex-col items-center justify-center px-8 z-10 bg-transparent">
      <div className="max-w-7xl w-full">
        {/* Section Header */}
        <div className="mb-24 md:mb-40 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-3xl">
            <span className="concept-reveal text-[10px] font-mono text-[#6a4a8c] tracking-[0.8em] mb-8 block uppercase font-black">
              THE NARRATIVE ENGINE
            </span>
            <h2 className="concept-reveal text-5xl md:text-7xl font-playfair font-black text-slate-900 leading-[0.9] tracking-tighter">
              A STORY <br />
              <span className="italic font-light text-[#6a4a8c]">UNFOLDING.</span>
            </h2>
          </div>
          <p className="concept-reveal max-w-xs text-slate-500 font-inter font-light border-l border-[#6a4a8c]/20 pl-10 leading-loose uppercase text-[10px] tracking-[0.25em]">
            Life is not a series of random events. It’s a carefully crafted film, and you are the protagonist.
          </p>
        </div>

        {/* Storyboard Grid */}
        <div className="concept-grid grid grid-cols-1 md:grid-cols-3 gap-12">
          {SCENES.map((scene) => (
            <div 
              key={scene.id} 
              className="concept-card group relative h-[400px] md:h-[550px] overflow-hidden glass-card"
            >
              <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={scene.image} 
                  alt={scene.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/10 group-hover:bg-[#6a4a8c]/90 transition-colors duration-700" />
              </div>

              <div className="relative h-full p-12 flex flex-col justify-between z-10 transition-colors duration-700 group-hover:text-white">
                <div className="absolute top-12 right-12 text-5xl font-playfair font-black text-[#6a4a8c]/10 group-hover:text-white/10 select-none">
                  {scene.id}
                </div>

                <div>
                  <div className="text-[9px] font-mono text-[#6a4a8c] group-hover:text-white tracking-[0.5em] mb-12 flex items-center gap-6 font-black transition-colors">
                    <div className="w-10 h-[1px] bg-[#6a4a8c]/30 group-hover:bg-white/40" />
                    {scene.time}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-playfair font-black mb-8 leading-[1.1] tracking-tight">
                    {scene.title}
                  </h3>
                </div>

                <p className="text-sm font-light text-slate-500 group-hover:text-slate-200 leading-relaxed max-w-[240px] uppercase tracking-widest font-inter">
                  {scene.desc}
                </p>

                {/* Interactive Bar */}
                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-white group-hover:w-full transition-all duration-700 ease-cinematic" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

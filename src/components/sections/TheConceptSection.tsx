'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SCENES = [
  {
    id: '01',
    title: 'THE INCITING INCIDENT',
    desc: 'The moment your old world crumbles to make room for the new masterpiece.',
    time: 'ACT I',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop'
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
        scrub: 1.2,
      }
    });

    tl.from('.concept-header', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.concept-card', {
      opacity: 0,
      y: 60,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power3.out'
    }, "-=0.8");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="gpu-accelerated relative w-full py-24 md:py-60 flex flex-col items-center justify-center px-8 z-10 bg-transparent">
      <div className="max-w-7xl w-full">
        {/* Section Title */}
        <div className="concept-header mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-mono text-indigo-400 tracking-[0.4em] mb-4 block uppercase font-black">THE NARRATIVE ENGINE</span>
            <h2 className="text-6xl md:text-[8rem] font-playfair font-black text-slate-900 leading-[0.8] tracking-tighter">
              A STORY <br />
              <span className="italic font-light text-slate-300">UNFOLDING.</span>
            </h2>
          </div>
          <p className="max-w-xs text-slate-400 font-inter font-light mt-8 md:mt-0 border-l border-slate-100 pl-8 leading-loose uppercase text-[10px] tracking-widest">
            Life is not a series of random events. It’s a carefully crafted film, and you are the protagonist.
          </p>
        </div>

        {/* Storyboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 group/container">
          {SCENES.map((scene) => (
            <div key={scene.id} className="concept-card group relative h-[450px] md:h-[600px] overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-110">
                <Image 
                  src={scene.image} 
                  alt={scene.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-white/90 group-hover:bg-indigo-900/80 transition-colors duration-700" />
              </div>

              <div className="relative h-full p-16 flex flex-col justify-between z-10 transition-colors duration-700 group-hover:text-white">
                {/* Background Number */}
                <div className="absolute top-[-5%] right-[-5%] text-[12rem] font-playfair font-black text-slate-100/50 group-hover:text-white/10 transition-colors duration-700 -z-10 select-none">
                  {scene.id}
                </div>

                <div>
                  <div className="text-[10px] font-mono text-indigo-400 group-hover:text-indigo-300 tracking-[0.4em] mb-12 flex items-center gap-4 font-black">
                    <span className="w-12 h-[1px] bg-indigo-200 group-hover:bg-indigo-400 transition-colors" />
                    {scene.time}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-8 leading-tight">
                    {scene.title}
                  </h3>
                </div>

                <p className="text-base font-light text-[#9f81b9] group-hover:text-slate-300 leading-relaxed max-w-[200px]">
                  {scene.desc}
                </p>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#9f81b9] group-hover:w-full transition-all duration-1000" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

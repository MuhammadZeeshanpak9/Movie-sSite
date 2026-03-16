'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const BOOKING_OPTIONS = [
  {
    title: 'Phone Consultation',
    duration: '1 HOUR',
    price: '$5,000',
    desc: 'Initial mental and emotional alignment via secure voice channel.',
    id: '01'
  },
  {
    title: 'Video Consultation',
    duration: '1 HOUR',
    price: '$50,000',
    desc: 'Deep-dive visual analysis and spiritual self-recognition.',
    id: '02'
  },
  {
    title: 'One-on-One',
    duration: '30 MINUTES',
    price: '$250,000',
    desc: 'Intensive physical presence session for precise outcome mapping.',
    id: '03'
  },
  {
    title: 'One-on-One Elite',
    duration: '1 HOUR',
    price: '$500,000',
    desc: 'Full-spectrum spiritual integration and mastery session.',
    id: '04'
  },
  {
    title: 'Production (Short)',
    duration: '30 MINUTES',
    price: '$500,000',
    desc: 'The beginning of your cinematic reality. Actual movie production.',
    id: '05'
  },
  {
    title: 'Feature Production',
    duration: '1 HOUR',
    price: '$1,000,000',
    desc: 'The complete World’s Greatest Movie About You. The ultimate legacy.',
    id: '06'
  }
];

export default function BookingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    });

    tl.from('.booking-reveal', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out'
    });

    // Individual triggers for each card to ensure bottom row visibility
    const cards = containerRef.current?.querySelectorAll('.price-card');
    if (cards) {
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%', // Trigger when top of card is 90% from top of viewport
            toggleActions: 'play none none none'
          }
        });
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="gpu-accelerated relative w-full py-20 md:py-40 px-8 md:px-24 z-10 bg-transparent overflow-hidden border-t border-slate-100/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-start justify-between gap-12">
          <div className="max-w-3xl">
            <span className="booking-reveal text-[10px] font-mono text-[#6a4a8c] tracking-[0.8em] mb-8 block uppercase font-black opacity-60">
              RESERVE YOUR LEGACY
            </span>
            <h2 className="booking-reveal text-5xl md:text-8xl font-playfair font-black text-slate-900 leading-[0.9] tracking-tighter mb-12">
              BOOK <br />
              <span className="italic font-light text-[#6a4a8c]">NOW.</span>
            </h2>
            <div className="booking-reveal max-w-2xl">
              <p className="text-xl md:text-2xl font-light text-[#6a4a8c]/80 font-inter leading-relaxed uppercase tracking-[0.1em] mb-8">
                This session is a custom mental and emotional analysis integrated with spiritual understanding of <span className="text-slate-900 font-black">SELF</span> that has proven to 100% provide accurate and precise positive outcomes for individuals who practice their truth.
              </p>
              <div className="flex flex-col gap-4">
                 <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase font-bold">
                   WORLD&apos;S GREATEST MOVIE ABOUT YOU PRODUCTION IS AN ACTUAL MOVIE PRODUCTION CREATED FOR THE INDIVIDUAL.
                 </p>
                 <span className="text-[8px] font-mono text-red-500 tracking-widest uppercase font-black">
                   (FINANCE OPTIONS AVAILABLE)
                 </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="booking-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {BOOKING_OPTIONS.map((opt) => (
            <div 
              key={opt.id}
              className="price-card gpu-accelerated group relative p-12 glass-card border border-[#6a4a8c]/10 hover:border-[#6a4a8c]/40 transition-all duration-700 flex flex-col justify-between min-h-[520px] h-full"
            >
              <div className="absolute top-12 right-12 text-4xl font-playfair font-black text-[#6a4a8c]/5 group-hover:text-[#6a4a8c]/10 transition-colors select-none">
                {opt.id}
              </div>
              
              <div>
                <span className="text-[9px] font-mono text-[#6a4a8c] tracking-[0.5em] uppercase font-black mb-6 block">
                  {opt.duration}
                </span>
                <h3 className="text-3xl font-playfair font-black text-slate-900 uppercase leading-none mb-6">
                  {opt.title}
                </h3>
                <div className="w-12 h-[1px] bg-[#6a4a8c]/20 mb-10 group-hover:w-full transition-all duration-700" />
                <p className="text-[10px] text-slate-500 font-inter leading-relaxed uppercase tracking-widest font-light mb-12">
                  {opt.desc}
                </p>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-playfair font-black text-slate-900 tracking-tighter">
                    {opt.price}
                  </span>
                  <span className="text-[8px] font-mono text-slate-400 font-black tracking-widest uppercase">
                    USD
                  </span>
                </div>
                
                <button className="w-full py-5 border border-slate-900 text-[10px] font-mono tracking-[0.4em] uppercase font-black hover:bg-slate-900 hover:text-white transition-all duration-500">
                  BOOK NOW
                </button>
              </div>
              
              {/* Scanline hover effect */}
              <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-gradient-to-t from-[#6a4a8c]/5 to-transparent transition-all duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

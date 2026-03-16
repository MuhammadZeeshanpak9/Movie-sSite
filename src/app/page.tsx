'use client';

import React from 'react';
import AnimatedCamera from '@/components/animation/AnimatedCamera';
import MovieSetBackground from '@/components/animation/MovieSetBackground';

import HeroSection from '@/components/sections/HeroSection';
import TheConceptSection from '@/components/sections/TheConceptSection';
import OurMissionSection from '@/components/sections/OurMissionSection';
import TheExperienceSection from '@/components/sections/TheExperienceSection';
import MainCharactersSection from '@/components/sections/MainCharactersSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import CreatorsSection from '@/components/sections/CreatorsSection';
import GlobalMovementSection from '@/components/sections/GlobalMovementSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main className="relative w-full text-slate-900 bg-transparent selection:bg-indigo-400/30">
      {/* 2D Animated Background Layer */}
      <MovieSetBackground />
      <AnimatedCamera />

      {/* Foreground Scrolling HTML Content */}
      <div id="scroll-container" className="relative z-10 w-full flex flex-col">
        {/* Sections */}

        <div id="section-1" className="min-h-screen">
          <HeroSection />
        </div>

        <div id="section-2" className="backdrop-blur-[1px]">
          <TheConceptSection />
        </div>

        <div id="section-3" className="shadow-[0_-50px_100px_rgba(0,0,0,0.02)] border-t border-slate-100/50">
          <OurMissionSection />
        </div>

        <div id="section-4">
          <TheExperienceSection />
        </div>

        <div id="section-5">
          <MainCharactersSection />
        </div>

        <div id="section-6" className="border-t border-slate-100/50">
          <HowItWorksSection />
        </div>

        <div id="section-7" className="backdrop-blur-sm border-t border-slate-100/50">
          <CreatorsSection />
        </div>

        <div id="section-8">
          <GlobalMovementSection />
        </div>

        <div id="section-9" className="bg-transparent shadow-[0_-50px_100px_rgba(0,0,0,0.02)]">
          <ContactSection />
        </div>

      </div>
    </main>
  );
}

import React from "react";
import { HeroHalftone } from "@/components/HeroHalftone";
import { Navbar } from "./Navbar";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col overflow-hidden bg-[var(--ht-bg)] theme-transition">
      {/* Include Navbar above the hero */}
      <Navbar />

      {/* 
        HALFTONE BACKGROUND LAYER 
        It sits behind the content, presenting the animated dot-field.
        We ensure it only takes up the first screen height.
      */}
      <HeroHalftone 
        imageUrl="/hands.png" 
        config={{
          spacing: 12,
          maxDotRadiusRatio: 0.45,
          subjectThreshold: 0.05,
          shadowRetention: 1.5
        }}
        sweepSpeed={1200}
        sweepSoftness={800}
      />

      {/* 
        CONTENT LAYER 
        Positioned relatively to be pulled above the halftone canvas (z-10).
      */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 mt-20 pointer-events-none">
        
        {/* Minimal Transparent Wrapper */}
        <div className="w-full max-w-4xl text-center pointer-events-auto">
          
          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-sans font-semibold tracking-tighter text-[var(--ht-text)] mb-6 leading-[1.05] theme-transition">
            Rebooting the <br className="hidden md:block"/>
            Creative Connection.
          </h1>

          <p className="text-lg md:text-xl font-sans font-light text-[var(--ht-text)] opacity-60 mb-10 max-w-2xl mx-auto leading-relaxed theme-transition">
            We're not building another platform. We're building a place where people belong.
          </p>

          <div className="flex justify-center">
            <button className="px-8 py-3.5 bg-[var(--ht-text)] text-[var(--ht-bg)] rounded-full font-medium transition-transform hover:scale-105 shadow-md theme-transition">
              Join our World
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}



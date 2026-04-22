import React from "react";
import { HeroHalftone } from "@/components/HeroHalftone";
import { Navbar } from "./Navbar";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col bg-white overflow-hidden">
      <Navbar />

      {/* 
        HALFTONE ARTWORK LAYER 
        Placed absolutely behind the content.
        The component itself handles the 'overscan' to frame the center.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroHalftone
          imageUrl="/hands.png"
          brightThreshold={0.28}
          spacing={7}
          sweepSpeed={350} // Slightly faster to compensate for the much wider STABLE_W
        />
      </div>

      {/* 
        CONTENT LAYER 
        Centred vertically and horizontally. 
        Protected by the framing effect of the hands.
      */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pointer-events-none">
        <div className="w-full max-w-2xl text-center pointer-events-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-semibold tracking-tighter text-black mb-5 leading-[1.05]">
            Rebooting the<br className="hidden md:block" /> Creative Connection.
          </h1>
          
          <p className="text-lg md:text-xl font-sans font-light text-black/50 mb-8 max-w-lg mx-auto leading-relaxed">
            We&apos;re not building another platform. We&apos;re building a place where people belong.
          </p>

          <div className="flex justify-center">
            <button className="px-8 py-3.5 bg-black text-white rounded-full text-sm font-medium tracking-wide transition-transform hover:scale-105 shadow-xl">
              Join our World
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

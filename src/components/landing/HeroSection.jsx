import React from "react";
import { HeroHalftone } from "@/components/HeroHalftone";
import { Navbar } from "./Navbar";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col overflow-hidden">
      {/* Include Navbar above the hero */}
      <Navbar />

      {/* 
        3D GLB LAYER 
        It sits behind the content but is softly interactive.
        We ensure it only takes up the first screen height, wrapping it in an absolute positioned div 
        inside this relative section. When scrolling, it scrolls naturally out of view.
      */}
      <HeroHalftone imageUrl="https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1200&auto=format&fit=crop" spacing={20} />

      {/* 
        CONTENT LAYER 
        Positioned relatively to be pulled above the 3D canvas (z-10).
        Glassmorphism panel helps content pop cleanly over the 3D model.
      */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 mt-20 pointer-events-none">
        
        {/* Minimal Transparent Wrapper */}
        <div className="w-full max-w-4xl text-center pointer-events-auto">
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--ht-text)] mb-6 leading-[1.1] theme-transition">
            Rebooting the <br className="hidden md:block"/>
            Creative Connection.
          </h1>

          <p className="text-lg md:text-xl text-[var(--ht-text)] opacity-70 mb-10 max-w-2xl mx-auto leading-relaxed theme-transition">
            We're not building another platform. We're building a place where people belong.
          </p>

          <div className="flex justify-center">
            <button className="px-8 py-3 bg-[var(--ht-text)] text-[var(--ht-bg)] rounded-full font-semibold transition-transform hover:scale-105 shadow-lg theme-transition">
              Join our World
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

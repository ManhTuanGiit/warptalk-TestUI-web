import React from "react";
import { HeroScene } from "./HeroScene";
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
      <HeroScene />

      {/* 
        CONTENT LAYER 
        Positioned relatively to be pulled above the 3D canvas (z-10).
        Glassmorphism panel helps content pop cleanly over the 3D model.
      */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 mt-20 pointer-events-none">
        
        {/* Glassmorphism Card Wrapper */}
        <div className="bg-slate-950/20 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-14 max-w-4xl w-full text-center pointer-events-auto shadow-2xl">
          
          <div className="inline-flex items-center gap-3 px-4 py-1.5 mb-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            Next-Gen AI Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Warp space and time with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-500">Enterprise AI</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience real-time multilingual intelligence. Break down language barriers instantly with a clean, cinematic platform designed for modern global teams.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-semibold transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Get Started Free
            </button>
            <button className="px-8 py-4 bg-transparent hover:bg-white/5 border border-white/20 text-white rounded-full font-semibold transition-all">
              View Product Demo
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

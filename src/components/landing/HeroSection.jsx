import React from "react";
import { HeroHalftone } from "@/components/HeroHalftone";
import { Navbar } from "./Navbar";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col bg-white overflow-hidden">
      <Navbar />

      {/*
        ─── HERO BODY ───────────────────────────────────────────────
        A full-height flex column centred vertically.
        The halftone SVG sits below the headline block as an art element.
      */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-0 gap-0">

        {/* Copy block */}
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-semibold tracking-tighter text-black mb-5 leading-[1.05]">
            Rebooting the<br className="hidden md:block" /> Creative Connection.
          </h1>
          <p className="text-lg md:text-xl font-sans font-light text-black/55 mb-8 max-w-lg mx-auto leading-relaxed">
            We&apos;re not building another platform. We&apos;re building a place where people belong.
          </p>
          <div className="flex justify-center">
            <button className="px-8 py-3.5 bg-black text-white rounded-full text-sm font-medium tracking-wide transition-transform hover:scale-105">
              Join our World
            </button>
          </div>
        </div>

        {/*
          ─── HALFTONE HANDS COMPOSITION ─────────────────────────────
          One continuous SVG of the touching-hands subject.
          Positioned below the copy, taking the full remaining width.
          max-w caps it so it stays compositionally centred.
          The SVG viewBox is 900×540 and scales proportionally via CSS.
        */}
        <div className="w-full max-w-5xl mt-4">
          <HeroHalftone
            imageUrl="/hands.png"
            brightThreshold={0.28}
            spacing={11}
            sweepSpeed={480}
            sweepSoftness={260}
            className="w-full"
          />
        </div>

      </div>
    </section>
  );
}

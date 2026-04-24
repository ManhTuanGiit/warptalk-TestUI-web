"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  progress: MotionValue<number>;
  totalCards: number;
}

export function CaseStudyCard({ study, index, progress, totalCards }: CaseStudyCardProps) {
  // We want the card to stay pinned for a while.
  // The overall scroll container will have a height of `totalCards * 100vh`.
  // `progress` goes from 0 to 1 over the entire stack.
  
  // A card becomes active when `progress` reaches `index / totalCards`.
  // A card starts to shrink and fade when `progress` reaches `(index + 1) / totalCards`.
  
  // p0: This card starts sliding up
  const p0 = (index - 1) / totalCards;
  // p1: This card is fully active
  const p1 = index / totalCards;
  // p2: The next card is fully active (covering this one)
  const p2 = (index + 1) / totalCards;
  
  // To avoid Web Animations API crash ("Offsets must be monotonically non-decreasing"),
  // we must ensure our scroll progress ranges are strictly between [0, 1].
  // Since index 0 would yield a negative p0, we truncate the input/output arrays for the first card.
  const isFirst = index === 0;

  const inputR = isFirst ? [p1, p2] : [p0, p1, p2];
  
  // Y offset: Slides in from 100vh below, reaches 0 at p1, then drifts up to -4vh
  const y = useTransform(
    progress,
    inputR,
    isFirst ? ["0vh", "-4vh"] : ["100vh", "0vh", "-4vh"]
  );
  
  // Scale: 1 until it's active, then shrinks down to 0.94 as it gets covered
  const scale = useTransform(
    progress,
    inputR,
    isFirst ? [1, 0.94] : [1, 1, 0.94]
  );

  // Opacity: 1 until it's active, then fades to 0.4
  const opacity = useTransform(
    progress,
    inputR,
    isFirst ? [1, 0.4] : [1, 1, 0.4]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        transformOrigin: "top center",
      }}
      className="absolute inset-0 w-full flex flex-col md:flex-row bg-[#0a0a0a] rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
    >
      {/* Left Column - Image */}
      <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[600px] bg-[#111] relative overflow-hidden flex items-center justify-center p-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10" />
        <motion.img 
          src={study.imageUrl} 
          alt={study.title}
          className="w-full max-w-md h-auto object-cover rounded-xl shadow-2xl relative z-20"
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, margin: "-100px" }}
        />
      </div>

      {/* Right Column - Content */}
      <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-gradient-to-br from-[#0f0f0f] to-[#050505]">
        <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-slate-400 mb-6 uppercase">
          <span>{study.year}</span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span>{study.category}</span>
        </div>
        
        <h3 className="text-sm font-medium text-slate-300 mb-4">{study.brand}</h3>
        
        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-tight mb-6">
          {study.title}
        </h2>
        
        <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed mb-10 max-w-lg">
          {study.description}
        </p>
        
        <div className="flex items-center gap-4 mb-12">
          <button className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:scale-105 transition-transform shadow-lg">
            {study.ctaLabel}
          </button>
        </div>
        
        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
          {study.metrics.map((metric, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-2xl md:text-3xl font-semibold text-white mb-1">{metric.value}</span>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

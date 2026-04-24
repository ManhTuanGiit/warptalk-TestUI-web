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
  
  const cardDuration = 1 / totalCards;
  const slotStart = index * cardDuration;
  const slotEnd = (index + 1) * cardDuration;

  // Phase calculations
  const enterStart = slotStart - 0.35 * cardDuration;
  const holdStart = slotStart + 0.1 * cardDuration;
  const exitStart = slotEnd - 0.35 * cardDuration;
  const exitEnd = slotEnd + 0.1 * cardDuration;

  // Build strict arrays for WAAPI bounds (must be between 0 and 1, monotonically increasing)
  const isFirst = index === 0;
  const isLast = index === totalCards - 1;

  let inputR: number[] = [];
  let yVals: string[] = [];
  let scaleVals: number[] = [];
  let opacityVals: number[] = [];

  if (isFirst) {
    // First card: No enter phase, just hold and exit
    inputR = [0, exitStart, Math.min(exitEnd, 1)];
    yVals = ["0vh", "0vh", "-6vh"];
    scaleVals = [1, 1, 0.95];
    opacityVals = [1, 1, 0.25];
  } else if (isLast) {
    // Last card: Enter and hold, no exit phase
    inputR = [Math.max(enterStart, 0), holdStart, 1];
    yVals = ["100vh", "0vh", "0vh"];
    scaleVals = [0.96, 1, 1];
    opacityVals = [0, 1, 1];
  } else {
    // Middle cards: Enter, hold, and exit
    inputR = [Math.max(enterStart, 0), holdStart, exitStart, Math.min(exitEnd, 1)];
    yVals = ["100vh", "0vh", "0vh", "-6vh"];
    scaleVals = [0.96, 1, 1, 0.95];
    opacityVals = [0, 1, 1, 0.25];
  }

  const y = useTransform(progress, inputR, yVals);
  const scale = useTransform(progress, inputR, scaleVals);
  const opacity = useTransform(progress, inputR, opacityVals);

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

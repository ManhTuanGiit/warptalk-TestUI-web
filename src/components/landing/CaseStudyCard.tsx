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


  const inputR: number[] = [];
  const outY: string[] = [];
  const outScale: number[] = [];
  const outTextOpacity: number[] = [];

  for (let j = 0; j <= totalCards; j++) {
    // 1. Lock Point (Card j is fully active)
    const pLock = j / totalCards;
    inputR.push(pLock);

    const dist = j - index;
    if (dist < 0) {
      // This card is incoming / waiting below
      outY.push("100vh");
      outScale.push(1);
      outTextOpacity.push(1);
    } else if (dist === 0) {
      // This card is perfectly active
      outY.push("0px");
      outScale.push(1);
      outTextOpacity.push(1);
    } else {
      // This card is pushed into the background stack.
      // Tighter compact stack: 16px offset per layer, 1.5% scale reduction per layer.
      outY.push(`-${dist * 16}px`);
      outScale.push(1 - dist * 0.015);
      outTextOpacity.push(0); // Content hidden to prevent text overlap
    }

    // 2. Handoff Point (Next card covers 75% of the screen)
    if (j < totalCards) {
      const pHandoff = (j + 0.75) / totalCards;
      inputR.push(pHandoff);

      if (dist < 0) {
        if (dist === -1) {
          // This card is the incoming card, it's 75% of the way up
          outY.push("25vh");
        } else {
          outY.push("100vh");
        }
        outScale.push(1);
        outTextOpacity.push(1);
      } else if (dist === 0) {
        // This card is active. It holds perfectly still until 75% coverage!
        outY.push("0px");
        outScale.push(1);
        outTextOpacity.push(1);
      } else {
        // This card is in the background, smoothly transitioning deeper
        outY.push(`-${(dist + 0.75) * 16}px`);
        outScale.push(1 - (dist + 0.75) * 0.015);
        outTextOpacity.push(0);
      }
    }
  }

  const y = useTransform(progress, inputR, outY);
  const scale = useTransform(progress, inputR, outScale);
  const contentOpacity = useTransform(progress, inputR, outTextOpacity);

  return (
    <motion.div
      style={{
        y,
        scale,
        transformOrigin: "top center",
      }}
      // Solid shell: opacity 1 always. Physical stack shadow and top-border added for clear depth.
      className="absolute inset-0 w-full flex flex-col md:flex-row glass-card overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
    >
      <motion.div style={{ opacity: contentOpacity }} className="w-full h-full flex flex-col md:flex-row">
        {/* Left Column - Image */}
        <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[600px] bg-slate-100/50 relative overflow-hidden flex items-center justify-center p-8">
          {/* Grey gradient overlay removed to prevent washed-out look */}
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
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center">
          <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-slate-500 mb-6 uppercase">
            <span>{study.year}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>{study.category}</span>
          </div>

          <h3 className="text-sm font-medium readable-muted mb-4">{study.brand}</h3>

          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight mb-6">
            {study.title}
          </h2>

          <p className="text-base md:text-lg readable-muted font-light leading-relaxed mb-10 max-w-lg">
            {study.description}
          </p>

          <div className="flex items-center gap-4 mb-12">
            <button className="px-6 py-3 rounded-full bg-slate-950 text-white text-sm font-medium hover:scale-105 transition-transform shadow-lg">
              {study.ctaLabel}
            </button>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[rgba(15,23,42,0.1)]">
            {study.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl md:text-3xl font-semibold text-slate-900 mb-1">{metric.value}</span>
                <span className="text-xs readable-muted font-medium uppercase tracking-wider">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

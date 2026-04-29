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


  const inputMap = [0];
  const yMap = [index === 0 ? "0vh" : "100vh"];
  const scaleMap = [1];

  if (index > 0) {
    inputMap.push((index - 1) / totalCards);
    yMap.push("100vh");
    scaleMap.push(1);
  }

  inputMap.push(index / totalCards);
  yMap.push("0vh");
  scaleMap.push(1);

  if (index < totalCards - 1) {
    inputMap.push((index + 1) / totalCards);
    yMap.push("0vh");
    scaleMap.push(0.95);

    inputMap.push(1);
    yMap.push("0vh");
    scaleMap.push(0.95);
  }

  const y = useTransform(progress, inputMap, yMap);
  const scale = useTransform(progress, inputMap, scaleMap);

  return (
    <motion.div
      style={{
        y,
        scale,
        transformOrigin: "top center",
      }}
      className="absolute inset-0 w-full flex flex-col md:flex-row bg-[#1A1A1D] rounded-[30px] overflow-hidden"
    >
      <div className="w-full h-full flex flex-col md:flex-row">
        {/* Left Column - Image */}
        <div className="w-full md:w-1/2 h-[300px] md:h-full bg-[#222225] relative overflow-hidden">
          <motion.img
            src={study.imageUrl}
            alt={study.title}
            className="w-full h-full object-cover relative z-20"
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, margin: "-100px" }}
          />
        </div>

        {/* Right Column - Content */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center">
          <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-slate-400 mb-6 uppercase">
            <span>{study.year}</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>{study.category}</span>
          </div>

          <h3 className="text-sm font-medium text-slate-300 mb-4">{study.brand}</h3>

          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-tight mb-6">
            {study.title}
          </h2>

          <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed mb-10 max-w-lg">
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
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

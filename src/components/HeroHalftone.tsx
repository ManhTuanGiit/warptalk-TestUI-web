"use client";

import React, { useEffect, useRef, useState } from "react";
import { generateHalftoneDots, HalftoneDot } from "@/lib/generateHalftoneSvg";

/**
 * Stable internal sampling resolution.
 * Pushed to extreme high-res to capture very fine hand anatomy.
 */
const STABLE_W = 2800;
const STABLE_H = 1050;

const DEFAULT_CONFIG = {
  spacing: 4.5, // Extreme density grid
  maxDotRadiusRatio: 0.35, // Smaller dots to prevent chunky overlaps
  brightThreshold: 0.22, // Lowered to pull in more shadow detail and contours
};

interface HeroHalftoneProps {
  imageUrl: string;
  brightThreshold?: number;
  spacing?: number;
  sweepSpeed?: number;
  sweepSoftness?: number;
  className?: string;
}

export function HeroHalftone({
  imageUrl,
  brightThreshold = DEFAULT_CONFIG.brightThreshold,
  spacing = DEFAULT_CONFIG.spacing,
  className = "",
}: HeroHalftoneProps) {
  const [dots, setDots] = useState<HalftoneDot[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Generate dots once based on the stable coordinate system
  useEffect(() => {
    let active = true;
    generateHalftoneDots(imageUrl, STABLE_W, STABLE_H, {
      spacing,
      maxDotRadiusRatio: DEFAULT_CONFIG.maxDotRadiusRatio,
      brightThreshold,
    }).then((d) => {
      if (active) setDots(d);
    });
    return () => { active = false; };
  }, [imageUrl, spacing, brightThreshold]);

  return (
    <div 
      className={`relative w-full h-full pointer-events-none ${className}`}
      style={{ minHeight: "500px" }}
    >
      <svg
        viewBox={`0 0 ${STABLE_W} ${STABLE_H}`}
        xmlns="http://www.w3.org/2000/svg"
        // Positioned at top-70% so the visual center of the hands sits 
        // well below the center of the hero section, framing the bottom.
        className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ 
          width: "120vw",  // Force overscan beyond viewport edges
          height: "auto",
          minWidth: "1600px", // Prevent collapsing on small viewports
          display: "block",
          overflow: "visible" 
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sweep-gradient" gradientUnits="userSpaceOnUse" x1="-1500" y1="0" x2="0" y2="0">
            {/* 20% opacity at ends, 100% in the middle. #333333 is 20% white. */}
            <stop offset="0%" stopColor="#333333" />
            <stop offset="25%" stopColor="#ffffff" />
            <stop offset="75%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#333333" />
            {!prefersReducedMotion && (
              <animate attributeName="x1" values="-1500; 2800" dur="8s" repeatCount="indefinite" />
            )}
            {!prefersReducedMotion && (
              <animate attributeName="x2" values="0; 4300" dur="8s" repeatCount="indefinite" />
            )}
          </linearGradient>
          <mask id="sweep-mask">
            <rect x="-1500" y="0" width="6000" height="100%" fill="url(#sweep-gradient)" />
          </mask>
        </defs>

        <g fill="black" mask="url(#sweep-mask)">
          {dots.map((dot, i) => (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={dot.baseRadius}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

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
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Isolate hero animation lifecycle: strictly pause/hide when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "20% 0px 20% 0px" } // Keep active slightly before/after viewport
    );
    
    observer.observe(el);
    return () => observer.unobserve(el);
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
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none ${className}`}
      style={{ minHeight: "500px", visibility: isVisible ? "visible" : "hidden" }}
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
          <linearGradient id="sweep-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1500" y2="0">
            {/* 20% opacity at ends, 100% in the middle. #333333 is 20% white. */}
            <stop offset="0%" stopColor="#333333" />
            <stop offset="25%" stopColor="#ffffff" />
            <stop offset="75%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#333333" />
          </linearGradient>
          <mask id="sweep-mask">
            {/* Base 20% visibility across the whole canvas */}
            <rect x="0" y="0" width="100%" height="100%" fill="#333333" />
            
            {/* Animated bright sweep band */}
            <rect 
              x="0" 
              y="0" 
              width="1500" 
              height="100%" 
              fill="url(#sweep-gradient)" 
              style={prefersReducedMotion ? {} : {
                animation: "halftone-sweep 8s linear infinite",
                animationPlayState: isVisible ? "running" : "paused"
              }}
            />
          </mask>
        </defs>

        <style>
          {`
            @keyframes halftone-sweep {
              0% { transform: translateX(-1500px); }
              100% { transform: translateX(${STABLE_W + 500}px); }
            }
          `}
        </style>

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

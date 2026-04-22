"use client";

import React, { useEffect, useRef, useState } from "react";
import { generateHalftoneDots, HalftoneDot } from "@/lib/generateHalftoneSvg";

/**
 * Stable internal sampling resolution.
 * Significantly increased resolution for higher visual fidelity and anatomical detail.
 */
const STABLE_W = 2200;
const STABLE_H = 825;

const DEFAULT_CONFIG = {
  spacing: 7, // Much denser grid for finer detail
  maxDotRadiusRatio: 0.40, // Slightly smaller max ratio to keep the grid clean
  brightThreshold: 0.28,
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
  sweepSpeed = 250,    // Stable coordinate units per second for the continuous wave
  sweepSoftness = 400, // Not strictly used for the wave, but kept for signature
  className = "",
}: HeroHalftoneProps) {
  const [dots, setDots] = useState<HalftoneDot[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const rafRef = useRef<number>(0);

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
      if (active) {
        circleRefs.current = new Array(d.length).fill(null);
        setDots(d);
      }
    });
    return () => { active = false; };
  }, [imageUrl, spacing, brightThreshold]);

  // Primary animation loop: Continuous left-to-right traveling wave
  useEffect(() => {
    if (dots.length === 0 || prefersReducedMotion) return;

    const startTime = performance.now();
    const waveLength = STABLE_W * 1.5; // How wide the wave is

    const frame = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const shift = elapsed * sweepSpeed;

      for (let i = 0; i < dots.length; i++) {
        const circle = circleRefs.current[i];
        if (!circle) continue;
        const dot = dots[i];

        // Position along the moving wave, wraps around
        const wavePos = ((dot.x - shift) % waveLength + waveLength) % waveLength;
        const phase = wavePos / waveLength; // 0 to 1

        let multiplier = 0.1; // Minimum visibility (10%)
        
        // Easing function for smooth transitions
        const smooth = (x: number) => x * x * (3 - 2 * x);

        // 0 to 20%: Fade In
        if (phase < 0.2) {
          multiplier = 0.1 + 0.9 * smooth(phase / 0.2);
        } 
        // 20% to 80%: Fully Revealed
        else if (phase < 0.8) {
          multiplier = 1.0;
        } 
        // 80% to 100%: Fade Out smoothly back to 10%
        else {
          multiplier = 1.0 - 0.9 * smooth((phase - 0.8) / 0.2);
        }

        circle.setAttribute("r", (dot.baseRadius * multiplier).toFixed(2));
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dots, prefersReducedMotion, sweepSpeed]);

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
        <g fill="black">
          {dots.map((dot, i) => (
            <circle
              key={i}
              ref={(el) => { circleRefs.current[i] = el; }}
              cx={dot.x}
              cy={dot.y}
              r={prefersReducedMotion ? dot.baseRadius : 0}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import { generateHalftoneSvg, HalftoneDot, HalftoneConfig } from "@/lib/generateHalftoneSvg";
import "@/styles/theme.css";

interface HeroHalftoneProps {
  imageUrl: string;
  config?: Partial<HalftoneConfig>;
  className?: string;
  sweepSpeed?: number;
  sweepSoftness?: number;
  pulseAmplitude?: number;
  pulseSpeed?: number;
}

const DEFAULT_CONFIG: HalftoneConfig = {
  spacing: 14,
  maxDotRadiusRatio: 0.45,
  subjectThreshold: 0.1, // Drop pixels lighter than this density
  shadowRetention: 1.2, // Boost contrast of valid pixels
};

export function HeroHalftone({
  imageUrl,
  config = {},
  className = "",
  sweepSpeed = 1200, // Pixels per second
  sweepSoftness = 800, // Fade in duration in pixels
  pulseAmplitude = 0.05, // 5% radius modulation
  pulseSpeed = 1.5,
}: HeroHalftoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [dots, setDots] = useState<HalftoneDot[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // 1. Detect Reduced Motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // 2. Responsive ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    let timeoutId: NodeJS.Timeout;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      clearTimeout(timeoutId);
      // Debounce window resizing
      timeoutId = setTimeout(() => setDimensions({ width, height }), 150);
    });
    observer.observe(containerRef.current);
    return () => { observer.disconnect(); clearTimeout(timeoutId); };
  }, []);

  // 3. Generate Halftone Data from Image
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0 || !imageUrl) return;

    let isMounted = true;
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };

    generateHalftoneSvg(imageUrl, dimensions.width, dimensions.height, mergedConfig)
      .then((generatedDots) => {
        if (isMounted) {
          // Filter out any NaN radii just in case
          const validDots = generatedDots.filter(d => !isNaN(d.baseRadius));
          if (validDots.length < generatedDots.length) {
             console.warn(`Filtered out ${generatedDots.length - validDots.length} dots with NaN radius.`);
          }
          circleRefs.current = new Array(validDots.length).fill(null);
          setDots(validDots);
        }
      })
      .catch((err) => console.error("[HeroHalftone] Error generating halftone:", err));

    return () => { isMounted = false; };
  }, [imageUrl, dimensions, config.spacing, config.maxDotRadiusRatio, config.subjectThreshold, config.shadowRetention]);

  // 4. Animation Loop via direct DOM mutation
  useEffect(() => {
    if (dots.length === 0 || prefersReducedMotion) return;

    let animationFrameId: number;
    let startTime = performance.now();

    const animate = (time: number) => {
      const t = (time - startTime) * 0.001; 

      dots.forEach((dot, index) => {
        const circle = circleRefs.current[index];
        if (!circle) return;

        // Primary Motion: Sweep from left to right
        const sweepProgress = (t * sweepSpeed) - dot.x;
        
        let revealMultiplier = 0;
        if (sweepProgress > 0) {
          revealMultiplier = Math.min(1, sweepProgress / sweepSoftness); 
        }

        // Secondary Motion: Subtle pulse once revealed
        let pulse = 1;
        if (revealMultiplier >= 1) {
          pulse = 1 + Math.sin(t * pulseSpeed + dot.x * 0.01) * pulseAmplitude;
        }

        // Final radius calculation
        const finalRadius = dot.baseRadius * revealMultiplier * pulse;
        
        // Mutate DOM directly: ONLY change radius, NO x/y movement
        circle.setAttribute("r", (isNaN(finalRadius) ? 0 : finalRadius).toFixed(2));
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dots, prefersReducedMotion, sweepSpeed, sweepSoftness, pulseAmplitude, pulseSpeed]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 z-0 overflow-hidden theme-transition ${className}`}
      style={{ pointerEvents: "none" }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="block">
        <g fill="var(--ht-dot)">
          {dots.map((dot, i) => (
            <circle
              key={`${dot.x}-${dot.y}`}
              ref={(el) => { circleRefs.current[i] = el; }}
              cx={dot.x}
              cy={dot.y}
              r={prefersReducedMotion ? (isNaN(dot.baseRadius) ? 0 : dot.baseRadius) : 0}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}




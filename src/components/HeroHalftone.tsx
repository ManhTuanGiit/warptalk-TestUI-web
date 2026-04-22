"use client";

import React, { useEffect, useRef, useState } from "react";
import { generateHalftoneDots, HalftoneDot } from "@/lib/generateHalftoneSvg";

// ─────────────────────────────────────────
// Internal sampling resolution.
// All dots are generated in this coordinate space.
// The SVG uses a matching viewBox and CSS scales the display.
// ─────────────────────────────────────────
const SAMPLE_W = 900;
const SAMPLE_H = 540;

const CONFIG = {
  spacing: 11,          // tighter grid = more dot density / definition
  maxDotRadiusRatio: 0.44,
  brightThreshold: 0.28, // tune: raise if too many bg dots, lower if hands are sparse
};

interface HeroHalftoneProps {
  imageUrl: string;
  /** Optionally override config */
  brightThreshold?: number;
  spacing?: number;
  sweepSpeed?: number;   // px/s in viewBox coords — e.g. 500
  sweepSoftness?: number; // px fade width — e.g. 250
  className?: string;
}

export function HeroHalftone({
  imageUrl,
  brightThreshold = CONFIG.brightThreshold,
  spacing = CONFIG.spacing,
  sweepSpeed = 480,
  sweepSoftness = 260,
  className = "",
}: HeroHalftoneProps) {
  const [dots, setDots] = useState<HalftoneDot[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  // Reduced-motion detection
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // Generate dots once at mount (fixed internal resolution)
  useEffect(() => {
    let alive = true;
    generateHalftoneDots(imageUrl, SAMPLE_W, SAMPLE_H, {
      spacing,
      maxDotRadiusRatio: CONFIG.maxDotRadiusRatio,
      brightThreshold,
    }).then((d) => {
      if (alive) {
        circleRefs.current = new Array(d.length).fill(null);
        setDots(d);
      }
    });
    return () => { alive = false; };
  }, [imageUrl, spacing, brightThreshold]);

  // Left-to-right reveal sweep (direct DOM mutation, no React re-render)
  useEffect(() => {
    if (dots.length === 0 || prefersReducedMotion) return;

    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000; // seconds elapsed

      for (let i = 0; i < dots.length; i++) {
        const circle = circleRefs.current[i];
        if (!circle) continue;
        const dot = dots[i];

        // sweepFront advances from x=0 → x=SAMPLE_W over time
        const front = t * sweepSpeed;
        const progress = front - dot.x;

        let reveal = 0;
        if (progress > 0) {
          reveal = Math.min(1, progress / sweepSoftness);
        }

        circle.setAttribute("r", (dot.baseRadius * reveal).toFixed(2));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dots, prefersReducedMotion, sweepSpeed, sweepSoftness]);

  return (
    <svg
      viewBox={`0 0 ${SAMPLE_W} ${SAMPLE_H}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <g fill="#000000">
        {dots.map((dot, i) => (
          <circle
            key={i}
            ref={(el) => { circleRefs.current[i] = el; }}
            cx={dot.x}
            cy={dot.y}
            // Static for reduced-motion; starts at 0 and is driven by animation loop otherwise
            r={prefersReducedMotion ? dot.baseRadius : 0}
          />
        ))}
      </g>
    </svg>
  );
}

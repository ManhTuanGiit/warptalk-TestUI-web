"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import "@/styles/theme.css";

interface HeroHalftoneProps {
  spacing?: number; // Distance between dots
  className?: string;
}

export function HeroHalftone({
  spacing = 22,
  className = "",
}: HeroHalftoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
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
      timeoutId = setTimeout(() => setDimensions({ width, height }), 100);
    });
    observer.observe(containerRef.current);
    return () => { observer.disconnect(); clearTimeout(timeoutId); };
  }, []);

  // 3. Generate Mathematical Grid
  const dots = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];
    
    // Add extra padding to cover edges during wave motion
    const cols = Math.ceil(dimensions.width / spacing) + 4;
    const rows = Math.ceil(dimensions.height / spacing) + 4;
    
    const newDots = [];
    for (let y = -2; y < rows; y++) {
      for (let x = -2; x < cols; x++) {
        newDots.push({
          x: x * spacing,
          y: y * spacing,
          col: x,
          row: y
        });
      }
    }
    circleRefs.current = new Array(newDots.length).fill(null);
    return newDots;
  }, [dimensions, spacing]);

  // 4. Animation Loop
  useEffect(() => {
    if (dots.length === 0 || prefersReducedMotion) return;

    let animationFrameId: number;
    let startTime = performance.now();
    
    const { width, height } = dimensions;
    const cx = width / 2;
    const cy = height / 2;

    const animate = (time: number) => {
      const t = (time - startTime) * 0.001; 
      
      dots.forEach((dot, index) => {
        const circle = circleRefs.current[index];
        if (!circle) return;

        // Base coordinates
        const bx = dot.x;
        const by = dot.y;

        // 1. Fluid Wave Calculation (Moving right to left)
        const flowSpeed = 1.2;
        const phaseX = bx * 0.003 - t * flowSpeed;
        const phaseY = by * 0.005;
        
        // Complex wave combining sine and cosine for terrain feel
        const wave1 = Math.sin(phaseX + phaseY);
        const wave2 = Math.cos(phaseX * 1.5 - phaseY * 0.8 + t * 0.5);
        const combinedWave = (wave1 + wave2) * 0.5; // Range ~ [-1, 1]
        
        // 3. Central Mask (Fade out dots in the middle so text is visible)
        // Create an elliptical mask
        const dx = bx - cx;
        const dy = by - cy; // Keep it fixed on Y
        // Elliptical distance: squash the Y axis so the mask is wider horizontally
        const distToCenter = Math.sqrt((dx * dx) + (dy * dy * 4)); 
        
        const maskRadius = 400; // Radius of the clearing
        const maskFeather = 250;
        
        let maskAlpha = 1;
        if (distToCenter < maskRadius) {
          maskAlpha = 0; // Completely hidden in center
        } else if (distToCenter < maskRadius + maskFeather) {
          // Smooth fade out
          maskAlpha = (distToCenter - maskRadius) / maskFeather;
        }

        // 4. Calculate Final Radius
        // Map wave [-1, 1] to dot size [0.1, 0.45]
        const sizeFactor = (combinedWave + 1) * 0.5; // [0, 1]
        const maxR = spacing * 0.45;
        const minR = spacing * 0.05;
        
        let finalRadius = minR + sizeFactor * (maxR - minR);
        finalRadius *= maskAlpha; // Apply center mask

        // DOM Mutation: ONLY animate radius, NO vertical displacement
        circle.setAttribute("r", finalRadius.toFixed(2));
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dots, prefersReducedMotion, dimensions, spacing]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 z-0 overflow-hidden theme-transition bg-[var(--ht-bg)] ${className}`}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="block">
        <g fill="var(--ht-dot)">
          {dots.map((dot, i) => (
            <circle
              key={`${dot.col}-${dot.row}`}
              ref={(el) => { circleRefs.current[i] = el; }}
              cx={dot.x}
              cy={dot.y}
              r={prefersReducedMotion ? spacing * 0.2 : 0}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

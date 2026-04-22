"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function HalftoneScene() {
  const canvasRef = useRef(null);
  const { resolvedTheme } = useTheme();
  
  // Mouse state
  const mouseRef = useRef({ x: -1000, y: -1000, isHovering: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let time = 0;
    const COLUMNS = 45;
    let width, height, spacing, rows;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      spacing = width / COLUMNS;
      rows = Math.ceil(height / spacing);
    };

    window.addEventListener("resize", resize);
    resize();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dot color depends on theme
      const dotColor = resolvedTheme === "dark" ? "#60a5fa" : "#3b82f6";
      ctx.fillStyle = dotColor;

      for (let i = 0; i < COLUMNS; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + spacing / 2;
          const y = j * spacing + spacing / 2;

          // Sine Wave logic
          const waveFreq = 0.15;
          const waveSpeed = time * 0.03;
          const sineValue = (Math.sin(i * waveFreq - waveSpeed) + 1) / 2;

          const minRadius = spacing * 0.05;
          const maxRadius = spacing * 0.35;
          let radius = minRadius + sineValue * (maxRadius - minRadius);

          // Mouse interaction logic
          const { x: mx, y: my, isHovering } = mouseRef.current;
          if (isHovering) {
            const dx = x - mx;
            const dy = y - my;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const hoverInfluenceRadius = spacing * 5;

            if (distance < hoverInfluenceRadius) {
              const influence = 1 - distance / hoverInfluenceRadius;
              const bonusRadius = influence * (spacing * 0.5);
              radius += bonusRadius;
              radius = Math.min(radius, spacing * 0.6); // cap size
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      time++;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  // Handle Mouse Events
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000, isHovering: false };
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full block"
      />
    </div>
  );
}

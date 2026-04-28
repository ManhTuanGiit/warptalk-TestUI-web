"use client";
import React, { useRef, useCallback } from "react";

// ─── Tunable Constants ────────────────────────────────────────────────────────
const FRACTAL_RIB_SIZE              = 16;
const FRACTAL_RIB_OPACITY           = 0.8;
const FRACTAL_SECONDARY_RIB_OPACITY = 0.4;
const FRACTAL_BLOOM_OPACITY         = 0.6;
const FRACTAL_NOISE_OPACITY         = 0.15;
const FRACTAL_GLARE_SIZE            = 36;
const FRACTAL_GLARE_OPACITY         = 1;
const FRACTAL_BORDER_RADIUS         = 18;

interface FractalGlassSlotProps {
  className?: string;
  minHeight?: number;
  backgroundImage?: string;
}

export function FractalGlassSlot({
  className = "",
  minHeight = 220,
  backgroundImage: customBgImage = "/fractal.jpg",
}: FractalGlassSlotProps) {
  const slotRef = useRef<HTMLDivElement>(null);

  // ── Pointer tracking (no re-renders — directly sets CSS vars) ───────────
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = slotRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width);
    const y = ((e.clientY - rect.top) / rect.height);
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    el.style.setProperty("--glare-opacity", String(FRACTAL_GLARE_OPACITY));
  }, []);

  const handlePointerLeave = useCallback(() => {
    const el = slotRef.current;
    if (!el) return;
    el.style.setProperty("--glare-opacity", "0");
  }, []);

  const R = FRACTAL_BORDER_RADIUS;
  const rs = FRACTAL_RIB_SIZE;

  // ── Layer 3: Primary Ribs ──
  const ribGrad = `repeating-linear-gradient(90deg,
    rgba(255,255,255,0.18) 0px,
    rgba(255,255,255,0.05) ${rs * 0.15}px,
    rgba(0,0,0,0.2) ${rs * 0.3}px,
    rgba(255,255,255,0.08) ${rs * 0.5}px,
    rgba(255,255,255,0.02) ${rs * 0.65}px,
    rgba(0,0,0,0.15) ${rs * 0.85}px,
    rgba(255,255,255,0.18) ${rs}px
  )`;

  // ── Layer 4: Secondary Refraction ──
  const ribGrad2 = `repeating-linear-gradient(90deg,
    rgba(255,255,255,0.1) 0px,
    rgba(0,0,0,0.1) ${rs * 0.25}px,
    rgba(255,255,255,0.05) ${rs * 0.5}px,
    rgba(0,0,0,0.15) ${rs * 0.75}px,
    rgba(255,255,255,0.1) ${rs}px
  )`;

  return (
    <div
      ref={slotRef}
      className={`fractal-slot-root ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        ["--mx" as string]: "50%",
        ["--my" as string]: "50%",
        ["--glare-opacity" as string]: "0",
        position: "relative",
        minHeight,
        borderRadius: R,
        overflow: "hidden",
        flex: 1,
        cursor: "crosshair",
        backgroundColor: "#000",
      }}
    >
      {/* LAYER 1 — BASE IMAGE */}
      <div style={{
        position: "absolute", inset: -2, // slightly larger to prevent blur edges
        backgroundImage: `url(${customBgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "saturate(1.1)", // slightly richer contrast/saturation
      }} />

      {/* LAYER 2 — COLOR ENHANCEMENT / CINEMATIC TINT */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(135deg, rgba(10,20,50,0.5) 0%, rgba(200,0,100,0.2) 50%, rgba(255,100,0,0.3) 100%)",
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }} />

      {/* LAYER 3 — PRIMARY FLUTED / RIBBED GLASS */}
      <div style={{
        position: "absolute", inset: -10, // to prevent backdrop-filter edge bleed
        backgroundImage: ribGrad,
        backdropFilter: "blur(12px) saturate(140%)",
        WebkitBackdropFilter: "blur(12px) saturate(140%)",
        opacity: FRACTAL_RIB_OPACITY,
        pointerEvents: "none",
      }} />

      {/* LAYER 4 — SECONDARY REFRACTION DEPTH */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: ribGrad2,
        mixBlendMode: "screen",
        opacity: FRACTAL_SECONDARY_RIB_OPACITY,
        pointerEvents: "none",
        transform: "translateX(3px)", // offset from primary
      }} />

      {/* LAYER 5 — SOFT BLOOM / LIGHT BLEED */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: [
          "radial-gradient(circle at 10% 20%, rgba(0, 190, 255, 0.4), transparent 40%)",
          "radial-gradient(circle at 80% 40%, rgba(255, 0, 150, 0.3), transparent 50%)",
          "radial-gradient(circle at 30% 80%, rgba(255, 150, 45, 0.35), transparent 45%)"
        ].join(", "),
        mixBlendMode: "screen",
        opacity: FRACTAL_BLOOM_OPACITY,
        pointerEvents: "none",
      }} />

      {/* LAYER 6 — GRAIN / NOISE */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: FRACTAL_NOISE_OPACITY,
        mixBlendMode: "soft-light",
        pointerEvents: "none",
      }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="fractalNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#fractalNoise)" />
        </svg>
      </div>

      {/* LAYER 7 — EDGE LIGHTING / GLASS BORDER */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: R,
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: [
          "inset 1px 1px 0 rgba(255,255,255,0.25)",
          "inset -1px -1px 0 rgba(0,0,0,0.3)",
          "inset 0 -20px 40px rgba(0,0,0,0.4)"
        ].join(", "),
        pointerEvents: "none",
      }} />

      {/* LAYER 9 — CURSOR GLARE */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: "var(--glare-opacity, 0)",
        backgroundImage: `radial-gradient(
          circle at var(--mx, 50%) var(--my, 50%),
          rgba(255,255,255,0.28) 0%,
          rgba(255,255,255,0.14) 12%,
          rgba(255,255,255,0.06) 22%,
          transparent ${FRACTAL_GLARE_SIZE}%
        )`,
        transition: "opacity 300ms ease",
        mixBlendMode: "screen",
        willChange: "opacity",
      }} />

      {/* LAYER 8 — CONTENT */}
      <div style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        height: "100%",
        minHeight,
        display: "flex",
        alignItems: "flex-end",
        padding: "28px 32px",
        boxSizing: "border-box",
      }}>
        <span style={{
          color: "rgba(255,255,255,0.9)",
          fontSize: 38,
          fontWeight: 300,
          letterSpacing: "-0.02em",
          textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          userSelect: "none",
          lineHeight: 1,
        }}>
          FractalGlass
        </span>
      </div>
    </div>
  );
}

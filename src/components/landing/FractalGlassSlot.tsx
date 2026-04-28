"use client";
import React, { useRef, useCallback } from "react";

// ─── Tunable Constants ────────────────────────────────────────────────────────
const FRACTAL_RIB_SIZE        = 20;
const FRACTAL_NOISE_OPACITY   = 0.18;
const FRACTAL_RADIUS          = 18;
const FRACTAL_GLARE_STRENGTH  = 0.55;

interface FractalGlassSlotProps {
  className?: string;
  minHeight?: number;
  backgroundImage?: string;
}

export function FractalGlassSlot({
  className = "",
  minHeight = 220,
  backgroundImage: customBgImage,
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
    el.style.setProperty("--glare-opacity", String(FRACTAL_GLARE_STRENGTH));
  }, []);

  const handlePointerLeave = useCallback(() => {
    const el = slotRef.current;
    if (!el) return;
    el.style.setProperty("--glare-opacity", "0");
  }, []);

  const R = FRACTAL_RADIUS;
  const rs = FRACTAL_RIB_SIZE;

  // Rib gradient stops
  const ribGrad = `repeating-linear-gradient(90deg,
    rgba(255,255,255,0.24) 0px,
    rgba(255,255,255,0.09) ${rs * 0.1}px,
    rgba(0,0,0,0.32) ${rs * 0.3}px,
    rgba(255,255,255,0.12) ${rs * 0.5}px,
    rgba(255,255,255,0.02) ${rs * 0.65}px,
    rgba(0,0,0,0.22) ${rs * 0.85}px,
    rgba(255,255,255,0.24) ${rs}px
  )`;

  const ribGrad2 = `repeating-linear-gradient(90deg,
    rgba(255,255,255,0.14) 0px,
    rgba(0,0,0,0.18) ${rs * 0.25}px,
    rgba(255,255,255,0.06) ${rs * 0.5}px,
    rgba(0,0,0,0.12) ${rs * 0.75}px,
    rgba(255,255,255,0.14) ${rs}px
  )`;

  const baseBg = customBgImage
    ? `url(${customBgImage})`
    : [
        "radial-gradient(circle at 8% 18%, rgba(0,190,255,0.82), transparent 28%)",
        "radial-gradient(circle at 48% 32%, rgba(255,0,150,0.72), transparent 34%)",
        "radial-gradient(circle at 86% 60%, rgba(255,150,45,0.95), transparent 38%)",
        "radial-gradient(circle at 28% 78%, rgba(0,220,200,0.35), transparent 30%)",
        "linear-gradient(115deg, #020712 0%, #071426 32%, #16051b 58%, #110600 100%)",
      ].join(", ");

  return (
    <div
      ref={slotRef}
      className={`fractal-slot-root ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        // CSS variable defaults
        ["--mx" as string]: "50%",
        ["--my" as string]: "50%",
        ["--glare-opacity" as string]: "0",
        position: "relative",
        minHeight,
        borderRadius: R,
        overflow: "hidden",
        flex: 1,
        cursor: "crosshair",
      }}
    >

      {/* 1. Base Background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: baseBg,
        backgroundSize: customBgImage ? "cover" : "200% 200%",
        backgroundPosition: customBgImage ? "center" : "0% 0%",
        backgroundRepeat: "no-repeat",
      }} />

      {/* 2. Diagonal Light Beam */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(118deg, rgba(0,210,255,0.35) 5%, rgba(255,0,180,0.28) 30%, rgba(255,140,50,0.45) 65%, transparent 85%)",
        mixBlendMode: "screen",
        opacity: 0.75,
        pointerEvents: "none",
      }} />

      {/* 3. Fluted Ribs (primary) */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: ribGrad,
        backdropFilter: `blur(14px) saturate(180%)`,
        WebkitBackdropFilter: `blur(14px) saturate(180%)`,
        mixBlendMode: "overlay",
        opacity: 0.88,
        pointerEvents: "none",
      }} />

      {/* 4. Refraction Ribs (secondary, offset for depth) */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: ribGrad2,
        mixBlendMode: "screen",
        opacity: 0.4,
        pointerEvents: "none",
      }} />

      {/* 5. Vignette */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: [
          "radial-gradient(ellipse at 0% 100%, rgba(0,0,0,0.88), transparent 50%)",
          "linear-gradient(to right, rgba(0,0,0,0.55), transparent 48%)",
          "linear-gradient(to top, rgba(0,0,0,0.5), transparent 55%)",
          "radial-gradient(ellipse at 100% 0%, rgba(0,0,0,0.2), transparent 50%)",
        ].join(", "),
        pointerEvents: "none",
      }} />

      {/* 6. Noise / Grain */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: FRACTAL_NOISE_OPACITY,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="fgNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#fgNoise)" />
        </svg>
      </div>

      {/* 7. Pointer-following Glare */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: "var(--glare-opacity, 0)",
        backgroundImage: `radial-gradient(
          circle at var(--mx, 50%) var(--my, 50%),
          rgba(255, 255, 255, 0.45) 0%,
          rgba(255, 255, 255, 0.22) 8%,
          rgba(255, 255, 255, 0.08) 18%,
          transparent 34%
        )`,
        transition: "opacity 220ms ease",
        mixBlendMode: "screen",
        willChange: "opacity",
      }} />

      {/* 8. Edge Lighting */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: R,
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: [
          "inset 0 1px 0 rgba(255,255,255,0.38)",
          "inset 0 -32px 80px rgba(0,0,0,0.5)",
          "0 20px 50px rgba(0,0,0,0.3)",
        ].join(", "),
        pointerEvents: "none",
      }} />

      {/* 9. Content */}
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
          color: "rgba(255,255,255,0.88)",
          fontSize: 38,
          fontWeight: 300,
          letterSpacing: "-0.02em",
          textShadow: "0 8px 30px rgba(0,0,0,0.5)",
          userSelect: "none",
          lineHeight: 1,
        }}>
          FractalGlass
        </span>
      </div>
    </div>
  );
}

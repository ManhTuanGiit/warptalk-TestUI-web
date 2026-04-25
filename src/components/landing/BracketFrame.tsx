"use client";
import React from "react";

interface BracketFrameProps {
  children: React.ReactNode;
  className?: string;
  /** Length of the corner bracket arms in px */
  armLength?: number;
  /** Thickness of the bracket strokes in px */
  strokeWidth?: number;
  /** Color of the bracket strokes */
  strokeColor?: string;
  /** Color of the faint connecting lines between corners */
  lineColor?: string;
  /** Whether to show faint connecting lines between corners */
  showLines?: boolean;
  /** Padding inside the frame */
  padding?: number;
}

/**
 * BracketFrame
 *
 * Renders an angular, technical-documentation-style frame
 * with heavy L-shaped corner accents and optional faint
 * connecting lines. Used for the cyber-industrial Contact
 * section UI.
 *
 * The corners are drawn via absolutely-positioned pseudo-like
 * divs (4 corners × 2 arms each = 8 elements).
 */
export function BracketFrame({
  children,
  className = "",
  armLength = 28,
  strokeWidth = 2,
  strokeColor = "rgba(255,255,255,0.35)",
  lineColor = "rgba(255,255,255,0.06)",
  showLines = true,
  padding = 32,
}: BracketFrameProps) {
  const arm = armLength;
  const sw = strokeWidth;
  const sc = strokeColor;

  // Shared arm style helper
  const armStyle = (
    pos: Record<string, number | string>,
    w: number | string,
    h: number | string
  ): React.CSSProperties => ({
    position: "absolute",
    ...pos,
    width: w,
    height: h,
    background: sc,
    pointerEvents: "none",
  });

  return (
    <div
      className={`relative ${className}`}
      style={{ padding }}
    >
      {/* ── Faint connecting lines (optional) ─────────────────── */}
      {showLines && (
        <>
          {/* Top */}
          <div style={{ position: "absolute", top: 0, left: arm, right: arm, height: 1, background: lineColor }} />
          {/* Bottom */}
          <div style={{ position: "absolute", bottom: 0, left: arm, right: arm, height: 1, background: lineColor }} />
          {/* Left */}
          <div style={{ position: "absolute", left: 0, top: arm, bottom: arm, width: 1, background: lineColor }} />
          {/* Right */}
          <div style={{ position: "absolute", right: 0, top: arm, bottom: arm, width: 1, background: lineColor }} />
        </>
      )}

      {/* ── Corner brackets (4 corners × 2 arms) ────────────── */}

      {/* Top-Left */}
      <div style={armStyle({ top: 0, left: 0 }, arm, sw)} />
      <div style={armStyle({ top: 0, left: 0 }, sw, arm)} />

      {/* Top-Right */}
      <div style={armStyle({ top: 0, right: 0 }, arm, sw)} />
      <div style={armStyle({ top: 0, right: 0 }, sw, arm)} />

      {/* Bottom-Left */}
      <div style={armStyle({ bottom: 0, left: 0 }, arm, sw)} />
      <div style={armStyle({ bottom: 0, left: 0 }, sw, arm)} />

      {/* Bottom-Right */}
      <div style={armStyle({ bottom: 0, right: 0 }, arm, sw)} />
      <div style={armStyle({ bottom: 0, right: 0 }, sw, arm)} />

      {/* ── Content ──────────────────────────────────────────── */}
      {children}
    </div>
  );
}

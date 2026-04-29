"use client";
import React from "react";
import { PricingPlan } from "@/data/pricing";
import { Check } from "lucide-react";

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
}

// Toggle to true to see geometry outlines (blue=outer, red=main, green=cta)
const DEBUG = false;

export function PricingCard({ plan, isYearly }: PricingCardProps) {
  const isCustom = typeof plan.monthlyPrice === "string";
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const billingCycle = isCustom ? "" : isYearly ? "/yr" : "/mo";
  const isPopular = plan.isPopular;

  // ── Dimensions ──────────────────────────────────────────────────
  const W   = isPopular ? 268 : 248;
  const H   = isPopular ? 420 : 400;
  const pad = 10;
  const gap = 8;
  const ctaW = isPopular ? 130 : 120;
  const ctaH = isPopular ? 58  : 54;
  const r   = 14;   // main region corner radius
  const cr  = 18;   // concave elbow radius

  // Inner available area
  const iW = W - 2 * pad;
  const iH = H - 2 * pad;
  // Cut-out dimensions (CTA + gap)
  const cutW = ctaW + gap;
  const cutH = ctaH + gap;

  // ── Main Content Region clip-path (L-shape with concave elbow) ──
  const mainClip = [
    `M ${r},0`,
    `L ${iW - r},0`,
    `Q ${iW},0 ${iW},${r}`,                                           // top-right
    `L ${iW},${iH - cutH - r}`,
    `Q ${iW},${iH - cutH} ${iW - r},${iH - cutH}`,                   // shelf corner (convex)
    `L ${iW - cutW + cr},${iH - cutH}`,                               // shelf going left
    `A ${cr},${cr} 0 0 0 ${iW - cutW},${iH - cutH + cr}`,            // concave elbow
    `L ${iW - cutW},${iH - r}`,                                       // narrow section down
    `Q ${iW - cutW},${iH} ${iW - cutW - r},${iH}`,                   // bottom-right of narrow (convex)
    `L ${r},${iH}`,
    `Q 0,${iH} 0,${iH - r}`,                                         // bottom-left
    `L 0,${r}`,
    `Q 0,0 ${r},0`,                                                    // top-left
    `Z`,
  ].join(" ");

  // ── Glass colours ───────────────────────────────────────────────
  const mainBg     = isPopular ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.85)";
  const mainBorder = isPopular ? "rgba(15,23,42,1)"  : "rgba(15,23,42,0.1)";
  const ctaBg      = isPopular ? "rgba(255,255,255,1)" : "rgba(15,23,42,0.05)";
  const ctaBorder  = isPopular ? "rgba(255,255,255,0.3)"  : "rgba(15,23,42,0.1)";
  const frameBg    = isPopular ? "rgba(15,23,42,0.05)" : "rgba(255,255,255,0.5)";
  const frameBrd   = isPopular ? "rgba(15,23,42,0.1)" : "rgba(15,23,42,0.05)";
  const txt        = isPopular ? "white" : "#0f172a";

  return (
    /* ── OUTER FRAME ─────────────────────────────────────────────── */
    <div
      className="relative flex-shrink-0 transition-all duration-300"
      style={{
        width: W, height: H,
        borderRadius: 20,
        background: frameBg,
        border: `1px solid ${frameBrd}`,
        ...(DEBUG ? { outline: "2px solid blue" } : {}),
      }}
    >

      {/* ── MAIN CONTENT REGION (L-shaped via SVG + clipped content) ── */}

      {/* SVG background layer — renders glass fill + border on the L-shape */}
      <svg
        width={iW} height={iH}
        viewBox={`0 0 ${iW} ${iH}`}
        className="absolute"
        style={{ top: pad, left: pad, pointerEvents: "none" }}
      >
        <path d={mainClip} fill={mainBg} />
        <path d={mainClip} fill="none" stroke={mainBorder} strokeWidth="1" />
      </svg>

      {/* Content layer — backdrop-blur clipped to the same L-shape */}
      <div
        className="absolute flex flex-col"
        style={{
          top: pad, left: pad, width: iW, height: iH,
          clipPath: `path('${mainClip}')`,
          WebkitClipPath: `path('${mainClip}')`,
          backdropFilter: "blur(18px) saturate(180%)",
          WebkitBackdropFilter: "blur(18px) saturate(180%)",
          color: txt,
          padding: "22px 20px 16px 20px",
          boxSizing: "border-box",
          ...(DEBUG ? { outline: "2px solid red", outlineOffset: -2 } : {}),
        }}
      >
        {isPopular && (
          <div className="mb-3">
            <span className="px-3 py-1 bg-white/20 border border-white/30 text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
              Most Popular
            </span>
          </div>
        )}

        <h3 className="text-lg font-bold mb-1 tracking-tight">{plan.name}</h3>
        <p className={`text-[11px] mb-4 leading-relaxed ${isPopular ? "text-slate-200" : "readable-muted"}`}>
          {plan.description}
        </p>

        <div className="mb-5 flex items-baseline">
          <span className="text-4xl font-extrabold tracking-tight">
            {isCustom ? price : `$${price}`}
          </span>
          <span className={`text-[11px] font-semibold ml-1 ${isPopular ? "text-slate-300" : "readable-muted"}`}>
            {billingCycle}
          </span>
        </div>

        {/* Features — constrained width so text doesn't enter the CTA zone */}
        <ul className="flex flex-col gap-2.5 mt-auto" style={{ maxWidth: iW - cutW - 8 }}>
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[11px] font-medium leading-tight">
              <div className={`flex items-center justify-center rounded-full w-4 h-4 shrink-0 mt-0.5 ${isPopular ? "bg-white/20" : "bg-slate-900/10"}`}>
                <Check className={`w-2.5 h-2.5 ${isPopular ? "text-white" : "text-slate-950"}`} strokeWidth={3} />
              </div>
              <span className={isPopular ? "text-slate-200" : "text-slate-700"}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── CTA REGION (inside the outer frame, bottom-right) ──────── */}
      {plan.id === "enterprise" ? (
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute flex items-center justify-center font-bold text-[10px] uppercase tracking-widest cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.98]"
          style={{
            bottom: pad, right: pad,
            width: ctaW, height: ctaH,
            borderRadius: r,
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            background: ctaBg,
            border: `1px solid ${ctaBorder}`,
            boxShadow: isPopular ? "0 8px 20px rgba(0,0,0,0.12)" : "0 4px 12px rgba(15,23,42,0.04)",
            color: isPopular ? "#0f172a" : txt,
            outline: "none",
            letterSpacing: "0.1em",
            textDecoration: "none",
            ...(DEBUG ? { outline: "2px solid green" } : {}),
          }}
        >
          {plan.ctaLabel}
        </a>
      ) : (
        <button
          className="absolute flex items-center justify-center font-bold text-[10px] uppercase tracking-widest cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.98]"
          style={{
            bottom: pad, right: pad,
            width: ctaW, height: ctaH,
            borderRadius: r,
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            background: ctaBg,
            border: `1px solid ${ctaBorder}`,
            boxShadow: isPopular ? "0 8px 20px rgba(0,0,0,0.12)" : "0 4px 12px rgba(15,23,42,0.04)",
            color: isPopular ? "#0f172a" : txt,
            outline: "none",
            letterSpacing: "0.1em",
            ...(DEBUG ? { outline: "2px solid green" } : {}),
          }}
        >
          {plan.ctaLabel}
        </button>
      )}

    </div>
  );
}

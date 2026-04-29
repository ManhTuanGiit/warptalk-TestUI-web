"use client";
import React from "react";
import { motion } from "framer-motion";

interface PricingToggleProps {
  isYearly: boolean;
  onChange: (isYearly: boolean) => void;
}

export function PricingToggle({ isYearly, onChange }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <span className={`text-sm font-semibold transition-colors duration-200 ${!isYearly ? "text-slate-950" : "readable-muted"}`}>
        Monthly
      </span>
      
      <button 
        onClick={() => onChange(!isYearly)}
        className="relative w-16 h-[34px] bg-slate-200 backdrop-blur-md border border-slate-300 rounded-full flex items-center px-1 shadow-inner transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Toggle billing cycle"
      >
        <motion.div 
          className="w-6 h-6 bg-white rounded-full shadow-md"
          animate={{ x: isYearly ? 30 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>

      <span className={`text-sm font-semibold flex items-center transition-colors duration-200 ${isYearly ? "text-slate-950" : "readable-muted"}`}>
        Yearly 
        <span className="ml-2 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-full">
          Save 20%
        </span>
      </span>
    </div>
  );
}

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
      <span className={`text-sm font-semibold transition-colors duration-200 ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
        Monthly
      </span>
      
      <button 
        onClick={() => onChange(!isYearly)}
        className="relative w-16 h-[34px] bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center px-1 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Toggle billing cycle"
      >
        <motion.div 
          className="w-6 h-6 bg-white rounded-full shadow-md"
          animate={{ x: isYearly ? 30 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>

      <span className={`text-sm font-semibold flex items-center transition-colors duration-200 ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
        Yearly 
        <span className="ml-2 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-white/10 border border-white/20 shadow-sm text-foreground rounded-full">
          Save 20%
        </span>
      </span>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { PricingToggle } from "./PricingToggle";
import { PricingCard } from "./PricingCard";
import { PricingComparisonTable } from "./PricingComparisonTable";
import { pricingPlans } from "@/data/pricing";

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="bg-[#f8f9fa] text-black py-24 relative z-20 overflow-hidden" id="pricing">
      {/* Background glassmorphism orbs */}
      <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-slate-200/60 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-white rounded-full blur-[100px] -z-10" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Simple pricing for every stage
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-light leading-relaxed max-w-xl mx-auto">
            Choose the plan that best fits your needs. Scale effortlessly as you grow.
          </p>
          
          <PricingToggle isYearly={isYearly} onChange={setIsYearly} />
        </div>

        {/* Cards row — fixed-size outer frames, bottom-aligned */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-4 lg:gap-3 xl:gap-4 mt-10 max-w-6xl mx-auto relative z-10">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 bg-white/20 backdrop-blur-3xl border-t border-slate-200/50 mt-20">
        <PricingComparisonTable />
      </div>
    </section>
  );
}

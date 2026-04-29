import React from "react";
import { comparisonFeatures, pricingPlans } from "@/data/pricing";
import { Check, Minus } from "lucide-react";

export function PricingComparisonTable() {
  return (
    <div className="mt-40 overflow-x-auto pb-12 px-4 md:px-0">
      <div className="min-w-[800px] w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-semibold tracking-tight text-foreground">Compare all features</h3>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left w-1/4 p-5 border-b border-white/10 text-muted-foreground font-semibold uppercase tracking-wider text-xs">Features</th>
              {pricingPlans.map((plan) => (
                <th key={plan.id} className="w-[18.75%] p-5 border-b border-white/10 text-center font-bold text-foreground text-lg">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((feature, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors group">
                <td className="p-5 border-b border-white/5 text-sm text-slate-300 font-semibold group-hover:text-foreground transition-colors">{feature.name}</td>
                {pricingPlans.map((plan) => {
                  const val = feature[plan.id as keyof typeof feature];
                  return (
                    <td key={plan.id} className="p-5 border-b border-white/5 text-center">
                      {typeof val === "boolean" ? (
                        val ? (
                          <div className="flex justify-center">
                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                              <Check className="w-4 h-4 text-foreground" strokeWidth={3} />
                            </div>
                          </div>
                        ) : (
                          <Minus className="w-5 h-5 mx-auto text-slate-500" />
                        )
                      ) : (
                        <span className="text-sm font-semibold text-slate-200">{val}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

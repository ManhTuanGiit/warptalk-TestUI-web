import React from "react";
import { Video, Headset, Mic2 } from "lucide-react";

export function IntegrationsStrip() {
  return (
    <section className="py-12 border-y border-slate-900/5 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
          
          <div className="shrink-0 text-center md:text-left">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
              Works seamlessly where you already meet
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-4 text-slate-800">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 opacity-50" />
              <span className="font-medium text-sm md:text-base">Zoom</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 opacity-50" />
              <span className="font-medium text-sm md:text-base">Google Meet</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 opacity-50" />
              <span className="font-medium text-sm md:text-base">Microsoft Teams</span>
            </div>
            <div className="flex items-center gap-2">
              <Headset className="w-5 h-5 opacity-50" />
              <span className="font-medium text-sm md:text-base">Virtual Audio Device</span>
            </div>
            <div className="flex items-center gap-2">
              <Mic2 className="w-5 h-5 opacity-50" />
              <span className="font-medium text-sm md:text-base hidden lg:inline">Any app that accepts virtual audio input</span>
              <span className="font-medium text-sm md:text-base lg:hidden">Any virtual audio app</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

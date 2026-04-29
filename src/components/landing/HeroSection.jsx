"use client";
import React from "react";
import { HeroHalftone } from "@/components/HeroHalftone";
import { Navbar } from "./Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col bg-background overflow-hidden">
      <Navbar />

      {/* 
        HALFTONE ARTWORK LAYER 
        Reframed visually as AI-powered human connection.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroHalftone
          imageUrl="/hands.png"
          brightThreshold={0.22}
          spacing={4.5}
          sweepSpeed={400}
        />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center px-4 md:px-8 max-w-[1400px] mx-auto w-full pointer-events-none gap-12 lg:gap-8">

        {/* Left: Copy & CTAs */}
        <div className="w-full max-w-2xl text-center lg:text-left pointer-events-auto flex flex-col items-center lg:items-start pt-20 lg:pt-0">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-semibold tracking-tighter text-foreground mb-6 leading-[1.05]">
            Speak once.<br /> Let every teammate hear you in their language.
          </h1>

          <p className="text-lg md:text-xl font-sans font-light readable-muted mb-10 max-w-lg lg:max-w-xl leading-relaxed">
            WarpTalk translates live meeting speech, preserves speaker voice characteristics, and turns conversations into transcripts, summaries, and action insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
            <Button size="lg" className="rounded-full px-8 h-12 text-sm font-semibold shadow-xl bg-slate-950 text-white hover:bg-slate-800">
              Try WarpTalk Free
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-sm font-semibold bg-white/50 backdrop-blur-md border-slate-900/10 text-slate-900 hover:bg-slate-900/5">
              Book Demo
            </Button>
          </div>
        </div>

        {/* Right: Floating Glassmorphic UI Card */}
        <div className="w-full lg:flex-1 flex justify-center lg:justify-end pointer-events-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full max-w-[420px] rounded-2xl border border-slate-900/10 bg-white/70 backdrop-blur-2xl p-6 shadow-2xl flex flex-col gap-4"
          >
            {/* Header: Lang to Lang */}
            <div className="flex items-center justify-between border-b border-slate-900/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">Source</span>
                  <span className="text-sm text-slate-900 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    English
                  </span>
                </div>
                <div className="text-slate-400 text-lg">→</div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">Target</span>
                  <span className="text-sm text-slate-900 font-semibold">Japanese</span>
                </div>
              </div>
              <div className="px-2 py-1 rounded bg-slate-900/5 text-[10px] uppercase tracking-wider text-slate-600 font-bold border border-slate-900/10">
                Near Real-Time
              </div>
            </div>

            {/* Content: Transcript */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-900/10 shrink-0"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-500 font-medium">Alex (Speaker)</span>
                  <p className="text-sm text-slate-900 leading-snug">
                    &quot;So, if we optimize the database queries, we should see a massive drop in latency.&quot;
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 mt-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <span className="text-blue-400 text-xs font-bold">AI</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-2">
                    Translated & Cloned Voice
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 text-[9px] uppercase font-bold tracking-wider">Active</span>
                  </span>
                  <p className="text-sm text-slate-900 leading-snug">
                    &quot;データベースのクエリを最適化すれば、レイテンシーが大幅に低下するはずです。&quot;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

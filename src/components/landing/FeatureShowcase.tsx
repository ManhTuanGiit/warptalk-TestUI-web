import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Languages, AudioWaveform, FileText, Sparkles, LayoutDashboard, Settings } from "lucide-react";

export function FeatureShowcase() {
  return (
    <section className="py-24 px-4 md:px-8 bg-background relative border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        <div className="text-center max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            More than translation. A complete AI meeting copilot.
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Everything you need to run seamless global operations.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">

          {/* GROUP 1: Communication Core (Large block taking 8 cols) */}
          <Card className="md:col-span-8 bg-white/5 border-white/10 backdrop-blur-md group hover:border-white/20 transition-colors">
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <Badge variant="outline" className="mb-2 text-white/50 border-white/10">Communication Core</Badge>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Languages className="w-6 h-6 text-emerald-400" />
                  Real-Time Translation & Voice Cloning
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300 text-base max-w-md">
                Experience borderless conversations. Our engine translates live speech into your target language and synthesizes it using the original speaker&apos;s exact voice characteristics, maintaining tone and emotion.
              </CardDescription>
              <div className="mt-8 h-32 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent animate-pulse" />
                <AudioWaveform className="w-16 h-16 text-white/20" />
              </div>
            </CardContent>
          </Card>

          {/* GROUP 2: Meeting Intelligence - Split into two 4-col blocks or stack? Let's stack them in the remaining 4 cols */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Card className="flex-1 bg-white/5 border-white/10 backdrop-blur-md group hover:border-white/20 transition-colors">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2 text-white/50 border-white/10">Intelligence</Badge>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Live Transcripts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 text-sm">
                  Interactive, scrollable transcripts generated in real-time, allowing you to highlight and annotate.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="flex-1 bg-white/5 border-white/10 backdrop-blur-md group hover:border-white/20 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  AI Summaries & Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 text-sm">
                  Automatic post-meeting summaries, action items extraction, and sentiment analysis.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* GROUP 3: Platform Layer (Takes full 12 cols, split inside) */}
          <Card className="md:col-span-12 bg-white/5 border-white/10 backdrop-blur-md group hover:border-white/20 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 md:p-8 md:border-r border-white/10">
                <Badge variant="outline" className="mb-2 text-white/50 border-white/10">Platform Layer</Badge>
                <CardTitle className="text-xl flex items-center gap-2 mb-3">
                  <LayoutDashboard className="w-5 h-5 text-slate-400" />
                  Meeting Management
                </CardTitle>
                <CardDescription className="text-slate-300 text-sm">
                  Organize your global communications. Access history, manage recordings, search past transcripts, and share meeting assets securely within your organization.
                </CardDescription>
              </div>
              <div className="p-6 md:p-8">
                <CardTitle className="text-xl flex items-center gap-2 mb-3 mt-4 md:mt-0 md:pt-8">
                  <Settings className="w-5 h-5 text-slate-400" />
                  Workspace & Subscriptions
                </CardTitle>
                <CardDescription className="text-slate-300 text-sm">
                  Enterprise-grade RBAC, JWT access control, and flexible billing. Easily scale your team&apos;s translation capacity as your global presence grows.
                </CardDescription>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquareOff, ClockAlert, MicOff } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-background relative border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">

        {/* Subtle blur effect behind title */}
        <div className="absolute top-20 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Global teams shouldn&apos;t mean lost context.
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Language shouldn&apos;t be the bottleneck for your best ideas. When communication breaks down, the cost is more than just translation errors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10">

          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader className="items-center pb-2">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <MessageSquareOff className="w-6 h-6 text-red-400" />
              </div>
              <CardTitle className="text-xl">Misunderstood ideas</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-sm">
                Brilliant concepts get lost in translation. Nuance is stripped away, leaving only basic summaries that miss the core message.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader className="items-center pb-2">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                <ClockAlert className="w-6 h-6 text-orange-400" />
              </div>
              <CardTitle className="text-xl">Delayed decisions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-sm">
                Meetings drag on. Follow-up emails are needed just to clarify what was said. Projects stall because alignment takes twice as long.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader className="items-center pb-2">
              <div className="w-12 h-12 rounded-full bg-slate-500/10 flex items-center justify-center mb-4">
                <MicOff className="w-6 h-6 text-slate-400" />
              </div>
              <CardTitle className="text-xl">Lost tone & identity</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-sm">
                Standard translation bots sound robotic. The speaker&apos;s passion, emphasis, and personal voice characteristics are completely erased.
              </CardDescription>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}

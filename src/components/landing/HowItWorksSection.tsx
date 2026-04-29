"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mic, Captions, Globe, Wand2, FileText, Lightbulb } from "lucide-react";

const steps = [
  {
    id: "capture",
    title: "Capture voice",
    icon: <Mic className="w-5 h-5" />,
    description: "WarpTalk securely captures the raw audio from your meeting platform.",
    detail: "Our virtual audio driver cleanly isolates individual speaker streams."
  },
  {
    id: "transcribe",
    title: "Transcribe speech",
    icon: <Captions className="w-5 h-5" />,
    description: "Speech is converted to text instantly using low-latency models.",
    detail: "High-accuracy transcription handles industry jargon and accents."
  },
  {
    id: "translate",
    title: "Translate meaning",
    icon: <Globe className="w-5 h-5" />,
    description: "AI translates the context, not just the literal words.",
    detail: "Preserves the intended meaning across cultural and linguistic boundaries."
  },
  {
    id: "respeak",
    title: "Re-speak (Cloned)",
    icon: <Wand2 className="w-5 h-5" />,
    description: "The translated text is spoken back using the speaker's cloned voice.",
    detail: "Maintains tone, pitch, and emotion for natural interaction."
  },
  {
    id: "display",
    title: "Display transcript",
    icon: <FileText className="w-5 h-5" />,
    description: "A live, scrollable transcript is provided for visual tracking.",
    detail: "Follow along and highlight important moments in real-time."
  },
  {
    id: "insights",
    title: "Generate insights",
    icon: <Lightbulb className="w-5 h-5" />,
    description: "Post-meeting, AI generates summaries and action items.",
    detail: "Automatically syncs with your project management tools."
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-background relative border-t border-slate-900/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        <div className="text-center max-w-2xl mb-16">
          <h2 className="section-heading">
            How it works
          </h2>
          <p className="section-subtitle px-4 py-2 rounded-full premium-border bg-slate-900/5 inline-block">
            Near real-time, designed for natural conversation.
          </p>
        </div>

        {/* Desktop Layout: Tabs */}
        <div className="hidden md:block w-full max-w-4xl">
          <Tabs defaultValue="capture" orientation="horizontal" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8 bg-transparent">
              {steps.map((step) => (
                <TabsTrigger key={step.id} value={step.id} className="flex flex-col gap-2 h-auto py-3">
                  <div className="p-2 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-700">
                    {step.icon}
                  </div>
                  <span className="text-xs">{step.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {steps.map((step) => (
              <TabsContent key={step.id} value={step.id}>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      {step.icon} {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-slate-900 mb-2">{step.description}</p>
                    <p className="text-sm readable-muted">{step.detail}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Mobile Layout: Stacked Cards */}
        <div className="md:hidden flex flex-col gap-4 w-full">
          {steps.map((step, index) => (
            <Card key={step.id} className="glass-card relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-[60px] font-black text-slate-900/5 leading-none select-none">
                {index + 1}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-1.5 rounded bg-slate-900/5 text-slate-900">
                    {step.icon}
                  </div>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="readable-muted text-sm">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}

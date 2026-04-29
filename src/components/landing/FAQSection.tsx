"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Does WarpTalk replace Zoom or Google Meet?",
    answer: "No. WarpTalk is designed to work alongside your existing meeting stack. It integrates seamlessly with Zoom, Google Meet, and Microsoft Teams via a virtual audio device, allowing you to keep your current workflow."
  },
  {
    question: "How does real-time speech translation work?",
    answer: "WarpTalk captures the speaker's audio, transcribes it, translates the meaning in near real-time, and synthesizes the translated text back into audio. It is designed for natural conversation without heavy delays."
  },
  {
    question: "Does it preserve the speaker's voice?",
    answer: "Yes. Our AI voice cloning technology analyzes the speaker's audio stream and preserves their unique tone, pitch, and vocal characteristics in the translated output."
  },
  {
    question: "What happens if AI voice generation is slow?",
    answer: "Our infrastructure targets a latency of ≤ 2 seconds per semantic chunk. If network issues occur, the system gracefully falls back to a live text-only transcript so no context is ever lost."
  },
  {
    question: "Can participants choose different listening languages?",
    answer: "Yes. Every participant can select their preferred target language independently. A single speaker can be heard in Japanese, German, and Spanish simultaneously by different teammates."
  },
  {
    question: "How are credits consumed?",
    answer: "Credits are consumed based on the duration of active AI translation and the number of target languages generated. You only pay for what your team actively uses."
  },
  {
    question: "Is transcript and meeting data protected?",
    answer: "Absolutely. We ensure secure transport via HTTPS/WSS, enforce RBAC with JWT-based access controls, and do not use your private meeting data to train our core models."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-background relative border-t border-white/5">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Common questions
          </h2>
          <p className="text-muted-foreground font-light">
            Everything you need to know about integrating WarpTalk.
          </p>
        </div>

        <div className="w-full flex flex-col divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="w-full">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex flex-1 items-center justify-between py-5 w-full text-left font-medium transition-all hover:underline text-foreground"
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden text-sm transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100 mb-5" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="text-muted-foreground pr-8 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

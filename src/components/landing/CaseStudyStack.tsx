"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { caseStudies } from "@/data/caseStudies";
import { CaseStudyCard } from "./CaseStudyCard";

export function CaseStudyStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      className="bg-white relative"
      id="case-studies"
    >
      {/* Small intro area that scrolls past normally */}
      <div className="w-full max-w-7xl mx-auto pt-32 pb-12 px-6 md:px-12 text-center md:text-left">
        <h2 className="section-heading">
          Use Cases
        </h2>
        <p className="section-subtitle mt-4 max-w-2xl mx-auto md:mx-0">
          See how WarpTalk removes borders from everyday operations.
        </p>
      </div>

      {/* The sticky full-viewport immersive stack */}
      <div
        ref={containerRef}
        id="case-studies-sticky-zone"
        style={{ height: `${caseStudies.length * 150}vh` }} // Increased scroll distance as requested
        className="relative w-full"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-8 py-8">

          <div className="relative w-[1280vw] max-w-[1280px] h-[80vh] min-h-[620px] max-h-[600px] flex justify-center">
            {caseStudies.map((study, i) => {
              return (
                <div key={study.id} className="absolute inset-0 w-full h-full">
                  <CaseStudyCard
                    study={study}
                    index={i}
                    progress={scrollYProgress}
                    totalCards={caseStudies.length}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

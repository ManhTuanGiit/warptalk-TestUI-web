"use client";

import React from "react";
import { useThemeOnScroll } from "@/lib/useThemeOnScroll";

export function ScrollThemeTrigger({ children, className }) {
  const triggerRef = useThemeOnScroll(0.5);

  return (
    <div ref={triggerRef} className={className}>
      {children}
    </div>
  );
}

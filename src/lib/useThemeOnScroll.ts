"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function useThemeOnScroll(threshold = 0.5) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const { setTheme } = useTheme();

  useEffect(() => {
    // Set initial theme to light for the Hero section
    setTheme("light");

    const element = triggerRef.current;
    if (!element) return;

    // Trigger when the element crosses the middle of the viewport
    const observerOptions = {
      root: null,
      rootMargin: `-${Math.round(threshold * 100)}% 0px -${Math.round((1 - threshold) * 100)}% 0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Scrolled down past the trigger threshold
          setTheme("dark");
        } else {
          // If the element leaves the screen downwards (scrolling back to hero)
          if (entry.boundingClientRect.top > 0) {
            setTheme("light");
          }
        }
      });
    }, observerOptions);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [setTheme, threshold]);

  return triggerRef;
}

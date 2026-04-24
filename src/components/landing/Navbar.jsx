"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Languages } from "lucide-react";

export function Navbar() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY;
          lastScrollY = currentScrollY;

          const zone = document.getElementById("case-studies-sticky-zone");
          if (zone) {
            const rect = zone.getBoundingClientRect();
            // Zone is active if its top is near/above the viewport, and bottom is below 100px.
            const isZoneActive = rect.top <= 100 && rect.bottom >= 100;
            
            // Hide ONLY if we are actively inside the zone AND scrolling down.
            // If scrolling up, always show it.
            if (isZoneActive && isScrollingDown) {
              setIsHidden(true);
            } else {
              setIsHidden(false);
            }
          } else {
            setIsHidden(false); // Failsafe
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed top-6 left-0 right-0 z-50 px-4 md:px-8 flex justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isHidden ? "translate-y-[-150%] opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <nav className={`w-full max-w-5xl bg-white/35 backdrop-blur-md backdrop-saturate-200 border border-gray-300/30 rounded-2xl py-3 px-6 md:px-8 shadow-sm ${isHidden ? "pointer-events-none" : "pointer-events-auto"}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Languages className="h-6 w-6 text-slate-900 transition-transform group-hover:scale-105" />
            <span className="font-semibold text-lg tracking-tight text-slate-900 uppercase">WarpTalk</span>
          </Link>

          {/* Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            <Link href="#features" className="hover:text-black transition-colors">Features</Link>
            <Link href="#solutions" className="hover:text-black transition-colors">Solutions</Link>
            <Link href="#pricing" className="hover:text-black transition-colors">Pricing</Link>
            <Link href="#contact" className="hover:text-black transition-colors">Contact</Link>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/login" className="hidden sm:block text-slate-700 hover:text-black transition-colors">
              Log in
            </Link>
            <Link href="/register" className="bg-black text-white px-6 py-2 rounded-full transition-transform hover:scale-105 shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}


import React from "react";
import Link from "next/link";
import { Languages } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Languages className="h-6 w-6 text-[var(--ht-text)] transition-transform group-hover:scale-105" />
          <span className="font-semibold text-lg tracking-tight text-[var(--ht-text)] uppercase letter-spacing-wide">WarpTalk</span>
        </Link>

        {/* Links (Desktop) */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-[var(--ht-text)] opacity-80">
          <Link href="#features" className="hover:opacity-100 transition-opacity">Features</Link>
          <Link href="#solutions" className="hover:opacity-100 transition-opacity">Solutions</Link>
          <Link href="#pricing" className="hover:opacity-100 transition-opacity">Pricing</Link>
          <Link href="#contact" className="hover:opacity-100 transition-opacity">Contact</Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/login" className="hidden sm:block text-[var(--ht-text)] opacity-80 hover:opacity-100 transition-opacity">
            Log in
          </Link>
          <Link href="/register" className="bg-[var(--ht-text)] text-[var(--ht-bg)] px-6 py-2.5 rounded-full transition-transform hover:scale-105 shadow-sm">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}


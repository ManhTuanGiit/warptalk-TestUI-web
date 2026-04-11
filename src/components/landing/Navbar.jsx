import React from "react";
import Link from "next/link";
import { Languages } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-background/5 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Languages className="h-6 w-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
          <span className="font-bold text-lg tracking-tight text-white group-hover:text-emerald-50 transition-colors">WarpTalk</span>
        </Link>

        {/* Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#features" className="hover:text-emerald-300 transition-colors">Features</Link>
          <Link href="#solutions" className="hover:text-emerald-300 transition-colors">Solutions</Link>
          <Link href="#pricing" className="hover:text-emerald-300 transition-colors">Pricing</Link>
          <Link href="#contact" className="hover:text-emerald-300 transition-colors">Contact</Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/login" className="hidden sm:block text-slate-300 hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/register" className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 px-4 py-2 rounded-full transition-all hover:scale-105">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

import React from "react";
import Link from "next/link";

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 md:py-24 px-4 md:px-8 bg-background border-t border-slate-900/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8">
        
        {/* Brand & Description */}
        <div className="max-w-sm flex flex-col gap-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white border border-slate-200"></div>
            </div>
            WarpTalk
          </Link>
          <p className="text-sm readable-muted leading-relaxed">
            AI-powered meeting translation that preserves your voice and breaks down global communication barriers in near real-time.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-8 md:gap-24">
          
          {/* Product Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#how-it-works" className="text-sm readable-muted hover:text-slate-900 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-sm readable-muted hover:text-slate-900 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-sm readable-muted hover:text-slate-900 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-sm readable-muted hover:text-slate-900 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-sm readable-muted hover:text-slate-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Compatibility Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-foreground">Works With</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-sm readable-muted cursor-default">
                  Zoom
                </span>
              </li>
              <li>
                <span className="text-sm readable-muted cursor-default">
                  Google Meet
                </span>
              </li>
              <li>
                <span className="text-sm readable-muted cursor-default">
                  Microsoft Teams
                </span>
              </li>
              <li>
                <span className="text-sm readable-muted cursor-default">
                  Virtual Audio Device
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs readable-muted">
          &copy; {currentYear} WarpTalk. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-xs readable-muted">
          <span>Enterprise-Grade AI Infrastructure</span>
        </div>
      </div>
    </footer>
  );
}

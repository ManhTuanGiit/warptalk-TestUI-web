"use client";
import React, { useState } from "react";
import { FractalGlassSlot } from "./FractalGlassSlot";

// ─── Tunable Layout Constants ─────────────────────────────────────────────────
const FRACTAL_SLOT_MIN_HEIGHT = 220;
const CONTACT_CONTAINER_PADDING = 36;
const CONTACT_GRID_GAP = 32;
const DEBUG_CONTACT_LAYOUT = false;

// ─── Tab Data ─────────────────────────────────────────────────────────────────
const TABS = ["Pricing", "Feature", "Other"] as const;
type TabType = (typeof TABS)[number];

// ─── Social Icons (inline SVG) ────────────────────────────────────────────────
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46v-7.13a8.16 8.16 0 005.58 2.18v-3.45a4.85 4.85 0 01-2.93-1.09 4.86 4.86 0 01-1.05-1.06h1.63a1 1 0 001-1V6.69h2.35z" />
    </svg>
  );
}
function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

export function ContactSection() {
  const [activeTab, setActiveTab] = useState<TabType>("Pricing");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", form);
  };

  // Debug outline helper
  const dbg = (color: string) =>
    DEBUG_CONTACT_LAYOUT ? { outline: `2px solid ${color}`, outlineOffset: -1 } : {};

  return (
    <section
      id="contact"
      className="relative bg-white py-20 md:py-28"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* ── Section Title ──────────────────────────────────── */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-3">
            Contact
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-light max-w-md mx-auto leading-relaxed">
            Reach out for enterprise solutions, custom integrations, or any questions.
          </p>
        </div>

        {/* ── Master Container (dark glassmorphism panel) ───── */}
        <div
          className="w-full rounded-[24px]"
          style={{
            background: "rgba(8, 8, 10, 0.88)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            padding: CONTACT_CONTAINER_PADDING,
            ...dbg("blue"),
          }}
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{ gap: CONTACT_GRID_GAP }}
          >

            {/* ── LEFT COLUMN ────────────────────────────────── */}
            <div
              className="flex flex-col gap-6"
              style={dbg("red")}
            >
              {/* Segmented Pill Tabs */}
              <div
                className="inline-flex self-start rounded-[14px] p-1.5"
                style={{
                  background: "rgba(255, 255, 255, 0.75)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 text-[13px] font-semibold rounded-[10px] transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-black text-white shadow-sm"
                        : "bg-transparent text-black/70 hover:text-black"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Contact Details */}
              <div className="flex flex-col gap-5 mt-2">
                <ContactRow
                  label="Email Us"
                  value="Warptalk.support@gmail.com"
                />
                <ContactRow
                  label="Phone Number"
                  value="+84123456789"
                />
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold text-white/90">
                    Other Contact
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <SocialButton><FacebookIcon /></SocialButton>
                    <SocialButton><InstagramIcon /></SocialButton>
                    <SocialButton><TikTokIcon /></SocialButton>
                    <SocialButton><PinterestIcon /></SocialButton>
                  </div>
                </div>
              </div>

              {/* Fractal Glass UI Slot */}
              <FractalGlassSlot
                className="mt-2"
                minHeight={FRACTAL_SLOT_MIN_HEIGHT}
              />
            </div>

            {/* ── RIGHT COLUMN (Contact Form) ────────────────── */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              style={dbg("green")}
            >
              {/* Name */}
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="contact-input"
                style={inputStyle}
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="contact-input"
                style={inputStyle}
              />

              {/* Message */}
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                className="contact-input flex-1"
                style={{
                  ...inputStyle,
                  resize: "none",
                  minHeight: FRACTAL_SLOT_MIN_HEIGHT,
                  ...(dbg("orange")),
                }}
              />
            </form>

          </div>
        </div>
      </div>

      {/* ── Scoped input styles ──────────────────────────────── */}
      <style jsx>{`
        .contact-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(209, 213, 219, 0.3);
          border-radius: 14px;
          color: black;
          font-size: 16px;
          padding: 18px 20px;
          outline: none;
          transition: all 0.2s ease;
          font-weight: 400;
          box-sizing: border-box;
        }
        .contact-input::placeholder {
          color: rgba(0, 0, 0, 0.45);
        }
        .contact-input:focus {
          background: rgba(255, 255, 255, 0.92);
          border-color: rgba(209, 213, 219, 0.6);
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </section>
  );
}

/* ── Input inline style (base, overridden by scoped CSS for pseudo-classes) ── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255, 255, 255, 0.82)",
  backdropFilter: "blur(16px) saturate(180%)",
  WebkitBackdropFilter: "blur(16px) saturate(180%)",
  border: "1px solid rgba(209, 213, 219, 0.3)",
  borderRadius: 14,
  color: "black",
  fontSize: 16,
  padding: "18px 20px",
  outline: "none",
  fontWeight: 400,
  boxSizing: "border-box",
};

/* ── Sub-components ──────────────────────────────────────────── */

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[13px] font-semibold text-white/90">{label}</span>
      <span className="text-[14px] text-white/60 font-light">{value}</span>
    </div>
  );
}

function SocialButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-colors"
    >
      {children}
    </button>
  );
}

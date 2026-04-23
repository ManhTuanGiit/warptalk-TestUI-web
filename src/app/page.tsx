import { HeroSection } from "@/components/landing/HeroSection";
import { ScrollThemeTrigger } from "@/components/landing/ScrollThemeTrigger";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      {/* Additional sections like Features, Testimonials, Pricing will go here */}
      {/* Section Local Styling instead of Global Theme Flip */}
      {/* This prevents global repaints, scrollbar flashing, and layout jitter */}
      <section className="h-screen flex flex-col items-center justify-center text-slate-300 bg-slate-950">
        <h2 className="text-4xl font-bold mb-4">Dark Theme Area</h2>
        <p>This section is permanently styled dark, independent of global theme state.</p>
      </section>
    </main>
  );
}

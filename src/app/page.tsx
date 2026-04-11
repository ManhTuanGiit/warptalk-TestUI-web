import { HeroSection } from "@/components/landing/HeroSection";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      {/* Additional sections like Features, Testimonials, Pricing will go here */}
      {/* 
        The HeroSection uses min-h-screen, so the content below will require the user to scroll. 
        When they scroll down, the 3D model inside the HeroSection will naturally go out of view.
      */}
      <div className="h-screen flex items-center justify-center text-slate-400">
        <p>Scroll down to see more sections (placeholder)</p>
      </div>
    </main>
  );
}

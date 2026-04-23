import { HeroSection } from "@/components/landing/HeroSection";
import { ScrollThemeTrigger } from "@/components/landing/ScrollThemeTrigger";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      {/* Additional sections like Features, Testimonials, Pricing will go here */}
      {/* Permanently Light Section */}
      <section className="h-screen flex flex-col items-center justify-center text-slate-900 bg-white">
        <h2 className="text-4xl font-bold mb-4">Features Section</h2>
        <p className="text-slate-500">The entire scroll experience is now visually light and stable.</p>
      </section>
    </main>
  );
}

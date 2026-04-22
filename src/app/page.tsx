import { HeroSection } from "@/components/landing/HeroSection";
import { ScrollThemeTrigger } from "@/components/landing/ScrollThemeTrigger";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      {/* Additional sections like Features, Testimonials, Pricing will go here */}
      <ScrollThemeTrigger className="h-screen flex flex-col items-center justify-center text-slate-700 dark:text-slate-400 bg-white dark:bg-transparent transition-colors duration-700">
        <h2 className="text-4xl font-bold mb-4">Dark Theme Activated</h2>
        <p>Scroll up to switch back to Light Theme.</p>
      </ScrollThemeTrigger>
    </main>
  );
}

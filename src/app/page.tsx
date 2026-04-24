import { HeroSection } from "@/components/landing/HeroSection";
import { CaseStudyStack } from "@/components/landing/CaseStudyStack";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <CaseStudyStack />
      
      {/* Additional sections like Features, Testimonials, Pricing will go here */}
    </main>
  );
}

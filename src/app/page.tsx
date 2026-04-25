import { HeroSection } from "@/components/landing/HeroSection";
import { CaseStudyStack } from "@/components/landing/CaseStudyStack";
import { PricingSection } from "@/components/landing/PricingSection";
import { ContactSection } from "@/components/landing/ContactSection";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <CaseStudyStack />
      <PricingSection />
      <ContactSection />
      
      {/* Additional sections like Features, Testimonials will go here */}
    </main>
  );
}

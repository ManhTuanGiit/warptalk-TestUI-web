import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { IntegrationsStrip } from "@/components/landing/IntegrationsStrip";
import { CaseStudyStack } from "@/components/landing/CaseStudyStack";
import { TechnicalTrust } from "@/components/landing/TechnicalTrust";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { FooterSection } from "@/components/landing/FooterSection";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeatureShowcase />
      <IntegrationsStrip />
      <CaseStudyStack />
      <TechnicalTrust />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}

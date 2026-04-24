export interface CaseStudy {
  id: string;
  year: string;
  category: string;
  brand: string;
  title: string;
  description: string;
  ctaLabel: string;
  imageUrl: string;
  metrics: { value: string; label: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-1",
    year: "2026",
    category: "GLOBAL E-COMMERCE",
    brand: "LUMIÈRE STUDIOS",
    title: "Redefining digital luxury without borders.",
    description:
      "Lumière Studios required a multilingual storefront that didn't feel like a translation layer. We implemented real-time AI speech-to-text models that allow VIP clients to browse and order using natural voice commands in 40 languages, achieving a massive uplift in conversion.",
    ctaLabel: "View Case Study",
    imageUrl: "/hands.png", // Reusing existing local asset for demo
    metrics: [
      { value: "40+", label: "Languages" },
      { value: "215%", label: "Voice Conv." },
      { value: "<200ms", label: "Latency" },
    ],
  },
  {
    id: "cs-2",
    year: "2025",
    category: "HEALTHCARE PLATFORM",
    brand: "VITAL CONNECT",
    title: "Breaking the language barrier in telemedicine.",
    description:
      "Vital Connect connects doctors and patients globally. Using our proprietary real-time neural translation, we eliminated language barriers in live video consultations, empowering medical professionals to deliver critical care anywhere in the world seamlessly.",
    ctaLabel: "Read the Story",
    imageUrl: "/hands.png",
    metrics: [
      { value: "12M+", label: "Consults" },
      { value: "99.8%", label: "Accuracy" },
      { value: "0", label: "Barrier" },
    ],
  },
  {
    id: "cs-3",
    year: "2026",
    category: "FINTECH INFRASTRUCTURE",
    brand: "NEON BANK",
    title: "Securing voice-first banking globally.",
    description:
      "Neon Bank wanted to introduce voice-authenticated transactions across all their European markets. We provided a unified AI layer that handles dialect-specific voice recognition, sentiment analysis, and secure routing with military-grade encryption.",
    ctaLabel: "Explore the Tech",
    imageUrl: "/hands.png",
    metrics: [
      { value: "10B+", label: "Transactions" },
      { value: "50ms", label: "Auth Speed" },
      { value: "100%", label: "Uptime" },
    ],
  },
  {
    id: "cs-4",
    year: "2025",
    category: "CREATIVE AGENCY",
    brand: "OBLIVION",
    title: "A borderless space for global creators.",
    description:
      "Oblivion's remote teams span 15 time zones. We replaced their fragmented tooling with a unified, real-time translated voice workspace, allowing designers and directors to collaborate fluidly without ever switching languages.",
    ctaLabel: "See the Workflow",
    imageUrl: "/hands.png",
    metrics: [
      { value: "15", label: "Timezones" },
      { value: "3x", label: "Velocity" },
      { value: "Seamless", label: "Delivery" },
    ],
  },
];

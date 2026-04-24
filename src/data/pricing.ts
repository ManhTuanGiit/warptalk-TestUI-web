export type PricingPlan = {
  id: string;
  name: string;
  monthlyPrice: number | string;
  yearlyPrice: number | string;
  description: string;
  features: string[];
  ctaLabel: string;
  isPopular?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Basic access for individuals exploring the platform.",
    features: [
      "Basic access",
      "Limited features",
      "Community support"
    ],
    ctaLabel: "Try now",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 50,
    yearlyPrice: 500,
    description: "Good for individual professionals or small teams.",
    features: [
      "Standard features",
      "Better limits",
      "Email support"
    ],
    ctaLabel: "Purchase",
  },
  {
    id: "premium",
    name: "Premium",
    monthlyPrice: 100,
    yearlyPrice: 1000,
    description: "Advanced tools for growing teams and businesses.",
    features: [
      "Advanced features",
      "Priority support",
      "Better collaboration tools"
    ],
    ctaLabel: "Purchase now",
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    description: "Best for larger teams with complex needs.",
    features: [
      "Custom integrations",
      "Dedicated support",
      "Custom analytics"
    ],
    ctaLabel: "Contact",
  }
];

export type ComparisonFeature = {
  name: string;
  free: string | boolean;
  pro: string | boolean;
  premium: string | boolean;
  enterprise: string | boolean;
};

export const comparisonFeatures: ComparisonFeature[] = [
  { name: "Basic access", free: true, pro: true, premium: true, enterprise: true },
  { name: "Priority support", free: false, pro: false, premium: true, enterprise: true },
  { name: "Advanced analytics", free: false, pro: "Standard", premium: "Advanced", enterprise: "Custom" },
  { name: "Team collaboration", free: false, pro: "Up to 5", premium: "Up to 20", enterprise: "Unlimited" },
  { name: "API access", free: false, pro: false, premium: true, enterprise: true },
  { name: "Custom integrations", free: false, pro: false, premium: false, enterprise: true },
  { name: "Dedicated onboarding", free: false, pro: false, premium: false, enterprise: true },
];

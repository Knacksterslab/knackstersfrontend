/**
 * Subscription Plans Configuration
 * Centralized plan pricing and features
 * Must match backend PLAN_CONFIG pricing (in cents)
 */

export const PLAN_CONFIG = {
  TRIAL: {
    name: 'TRIAL',
    displayName: 'Trial to Hire',
    price: 0,
    priceDisplay: 'Free',
    hours: 50,
    hoursDisplay: '50 hours',
    description: 'Evaluate a professional for a full-time role — 50 hours of real work before you commit to hiring.',
    badge: 'Hire Risk-Free',
    features: [
      '50 hours of real work — valid 30 days',
      'Evaluate one role at a time',
      'One trial per company',
      'Dedicated Customer Success Manager',
      'Expert matching in 2-4 hours',
      'Convert to full-time hire anytime',
    ],
    constraints: {
      validDays: 30,
      oneDomainOnly: true,
      onePerCompany: true,
    },
  },
  FLEX_RETAINER: {
    name: 'FLEX_RETAINER',
    displayName: 'Flex Retainer',
    // First-month onboarding rate; ongoing standard rate applies from month 2
    onboardingPrice: 3500,
    onboardingPriceDisplay: '$3,500',
    price: 7000,
    priceDisplay: '$7,000',
    hours: 100,
    hoursDisplay: '100 hours',
    description: 'Perfect for focused, ongoing projects.',
    onboardingDescription: 'Start with 100 managed hours for $3,500 while we map your needs, assign talent, build your delivery workflow, and prove fit. Then $7,000/month.',
    features: [
      '100 hours per month',
      'Dedicated Customer Success Manager',
      'Expert matching in 2-4 hours',
      '24/7 support',
      'Real-time dashboard',
      'Cancel anytime',
    ],
  },
  PRO_RETAINER: {
    name: 'PRO_RETAINER',
    displayName: 'Pro Retainer',
    price: 12500,
    priceDisplay: '$12,500',
    hours: 200,
    hoursDisplay: '200 hours',
    description: 'For teams running multiple workstreams.',
    features: [
      '200 hours per month',
      'Dedicated Customer Success Manager',
      'Priority matching in under 2 hours',
      'Priority 24/7 support',
      'Advanced analytics',
      'Cancel anytime',
    ],
  },
  GROWTH: {
    name: 'GROWTH',
    displayName: 'Growth Plan',
    price: 25000,
    priceDisplay: '$25,000',
    hours: 450,
    hoursDisplay: '450 hours',
    description: 'For scaling businesses with large teams.',
    features: [
      '450 hours per month',
      'Priority Customer Success Manager',
      'Expert matching in 1-2 hours',
      'Quarterly strategy reviews',
      'Custom reporting',
      'Advanced analytics',
    ],
  },
  ENTERPRISE: {
    name: 'ENTERPRISE',
    displayName: 'Enterprise Plan',
    price: 0,
    priceDisplay: 'Custom',
    hours: 0,
    hoursDisplay: 'Custom hours',
    description: 'Tailored solutions for large organisations.',
    features: [
      'Custom hours allocation',
      'Dedicated success team',
      'Instant expert matching',
      'Custom SLAs & contracts',
      'White-label options',
      'Custom integrations',
    ],
  },
};

export type PlanType = keyof typeof PLAN_CONFIG;

export function getPlanConfig(planName: PlanType) {
  return PLAN_CONFIG[planName];
}

// Convert config to a UI-ready shape.
// All display-logic decisions live here — consumers use displayPrice / displayPeriod /
// displayDescription with no conditionals.
export function getPricingPlansArray(popularPlan: PlanType = 'PRO_RETAINER') {
  return Object.values(PLAN_CONFIG).map(plan => {
    const hasOnboarding = 'onboardingPriceDisplay' in plan;
    const onboardingPriceDisplay = hasOnboarding ? (plan as any).onboardingPriceDisplay as string : undefined;
    const onboardingDescription  = hasOnboarding ? (plan as any).onboardingDescription  as string : undefined;

    const displayPrice = onboardingPriceDisplay ?? plan.priceDisplay;

    const displayPeriod =
      plan.priceDisplay === 'Free'    ? '30-day trial'   :
      plan.priceDisplay === 'Custom'  ? 'contact sales'  :
      hasOnboarding                   ? `first month · then ${plan.priceDisplay}/mo` :
                                        'per month';

    const displayDescription = onboardingDescription ?? plan.description;

    const badge = hasOnboarding
      ? 'First-Month Onboarding Rate'
      : ('badge' in plan ? (plan as any).badge as string : undefined);

    return {
      name: plan.name,
      displayName: plan.displayName,
      displayPrice,
      displayPeriod,
      displayDescription,
      priceValue: plan.price,
      hours: plan.hoursDisplay,
      features: plan.features,
      badge,
      popular: plan.name === popularPlan,
    };
  });
}

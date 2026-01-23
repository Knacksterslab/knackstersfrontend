/**
 * Subscription Plans Configuration
 * Centralized plan pricing and features
 * Must match backend PLAN_CONFIG pricing (in cents)
 */

export const PLAN_CONFIG = {
  STARTER: {
    name: 'STARTER',
    displayName: 'Starter Plan',
    price: 12500, // Display price in dollars
    priceDisplay: '$12,500',
    hours: 200,
    hoursDisplay: '200 hours',
    description: 'Perfect for growing teams',
    features: [
      '200 hours per month',
      'Dedicated account manager',
      'Expert matching in 2-4 hours',
      '24/7 support'
    ],
  },
  GROWTH: {
    name: 'GROWTH',
    displayName: 'Growth Plan',
    price: 25000,
    priceDisplay: '$25,000',
    hours: 450,
    hoursDisplay: '450 hours',
    description: 'For scaling businesses',
    features: [
      '450 hours per month',
      'Priority account manager',
      'Expert matching in 1-2 hours',
      'Quarterly strategy reviews'
    ],
  },
  ENTERPRISE: {
    name: 'ENTERPRISE',
    displayName: 'Enterprise Plan',
    price: 0,
    priceDisplay: 'Custom',
    hours: 0,
    hoursDisplay: 'Custom hours',
    description: 'Tailored solutions',
    features: [
      'Custom hours allocation',
      'Dedicated success team',
      'Instant expert matching',
      'Custom SLAs & contracts'
    ],
  },
};

export type PlanType = keyof typeof PLAN_CONFIG;

// Helper function to get plan config by name
export function getPlanConfig(planName: PlanType) {
  return PLAN_CONFIG[planName];
}

// Convert config to pricing plans array format
export function getPricingPlansArray(popularPlan: PlanType = 'STARTER') {
  return Object.values(PLAN_CONFIG).map(plan => ({
    name: plan.name,
    price: plan.priceDisplay,
    priceValue: plan.price,
    hours: plan.hoursDisplay,
    description: plan.description,
    features: plan.features,
    popular: plan.name === popularPlan,
  }));
}

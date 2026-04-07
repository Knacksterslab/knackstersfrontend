'use client';

import Link from 'next/link';
import { CheckCircle, Phone } from 'lucide-react';

export const pricingPlans = [
  {
    id: 'trial',
    name: 'Trial to Hire',
    price: 'Free',
    period: '30-day trial',
    hours: '50 hours',
    hoursSub: 'included, no card needed',
    badge: 'Hire Risk-Free',
    badgeStyle: 'bg-green-500 text-white',
    borderStyle: 'border-green-400',
    accentColor: 'text-green-600',
    topBarColor: 'bg-green-400',
    ctaLabel: 'Start Free Trial',
    ctaHref: '/signup',
    ctaStyle: 'bg-green-600 hover:bg-green-700 text-white',
    highlighted: false,
    bestFor: 'Companies evaluating a professional for a permanent full-time role',
    features: [
      '50 hours of real work — valid 30 days',
      'Evaluate one role at a time',
      'One trial per company',
      'Dedicated Customer Success Manager',
      'Expert matching in 2–4 hours',
      'Convert to full-time hire anytime',
    ],
  },
  {
    id: 'flex',
    name: 'Flex Retainer',
    price: '$7,000',
    period: 'per month',
    hours: '100 hours',
    hoursSub: 'per month',
    badge: null,
    badgeStyle: '',
    borderStyle: 'border-gray-200',
    accentColor: 'text-[#FF9634]',
    topBarColor: 'bg-gray-200',
    ctaLabel: 'Get Started',
    ctaHref: '/signup',
    ctaStyle: '',
    highlighted: false,
    bestFor: 'Focused teams and ongoing projects',
    features: [
      'Dedicated Customer Success Manager',
      'Access to 10,000+ experts',
      'All 6 service domains',
      'Real-time dashboard',
      'No contracts',
      'Cancel anytime',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Retainer',
    price: '$12,500',
    period: 'per month',
    hours: '200 hours',
    hoursSub: 'per month',
    badge: 'Most Popular',
    badgeStyle: 'bg-yellow-400 text-gray-900',
    borderStyle: 'border-[#5A1568]',
    accentColor: 'text-[#FF9634]',
    topBarColor: 'bg-[#5A1568]',
    ctaLabel: 'Get Started',
    ctaHref: '/signup',
    ctaStyle: '',
    highlighted: true,
    bestFor: 'Teams running multiple projects simultaneously',
    features: [
      'Everything in Flex, plus:',
      'Priority matching in under 2 hours',
      'Priority 24/7 support',
      'Advanced analytics',
      'Custom reporting',
      'Multiple workstreams',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$25,000',
    period: 'per month',
    hours: '450 hours',
    hoursSub: 'per month',
    badge: null,
    badgeStyle: '',
    borderStyle: 'border-gray-200',
    accentColor: 'text-[#FF9634]',
    topBarColor: 'bg-gray-200',
    ctaLabel: 'Get Started',
    ctaHref: '/signup',
    ctaStyle: '',
    highlighted: false,
    bestFor: 'Scaling companies with large teams',
    features: [
      'Everything in Pro, plus:',
      'Dedicated senior CSM',
      'Quarterly business reviews',
      'Custom reporting',
      'Volume pricing benefits',
    ],
  },
];

export const enterprisePlanFeatures = [
  'Everything in Growth, plus:',
  'White-label options',
  'Custom integrations',
  'Dedicated success team',
  'SLA guarantees',
  'Custom workflows',
  'Custom hours allocation',
];

interface PricingCardsProps {
  /** Pass true when rendered on a dark background so the overage note uses light text */
  darkBackground?: boolean;
}

export default function PricingCards({ darkBackground = false }: PricingCardsProps) {
  return (
    <div>
      {/* 4-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {pricingPlans.map(plan => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-2xl border-2 ${plan.borderStyle} bg-white ${plan.highlighted ? 'shadow-xl' : 'shadow-sm'}`}
          >
            {plan.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                <span className={`${plan.badgeStyle} text-xs font-bold px-3 py-1 rounded-full shadow-sm`}>
                  {plan.badge}
                </span>
              </div>
            )}

            <div className={`h-1.5 w-full rounded-t-[14px] ${plan.topBarColor}`} />

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                {plan.name}
              </h3>

              <div className="mb-4">
                <span className="text-3xl font-extrabold text-[rgb(38,38,38)]">{plan.price}</span>
                {plan.price !== 'Free' && (
                  <span className="text-sm text-gray-400 ml-1">{plan.period}</span>
                )}
              </div>

              <div className={`text-base font-bold mb-0.5 ${plan.accentColor}`}>
                {plan.hours}
              </div>
              <div className="text-xs text-gray-400 mb-4">{plan.hoursSub}</div>

              <p className="text-xs text-gray-500 leading-relaxed mb-5 border-b border-gray-100 pb-4">
                {plan.bestFor}
              </p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[rgb(89,89,89)]">
                    <CheckCircle
                      size={14}
                      className={`flex-shrink-0 mt-0.5 ${plan.id === 'trial' ? 'text-green-500' : 'text-[#FF9634]'}`}
                    />
                    <span className="font-sans leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.ctaHref}>
                <button
                  className={`w-full py-3 rounded-xl text-sm font-bold font-sans transition-all ${
                    plan.id === 'trial' ? plan.ctaStyle : 'text-white'
                  }`}
                  style={
                    plan.id === 'trial'
                      ? {}
                      : plan.highlighted
                      ? { backgroundColor: '#5A1568' }
                      : { backgroundImage: 'linear-gradient(90deg, #E9414C, #FF9634)' }
                  }
                >
                  {plan.ctaLabel}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise — full-width dark card */}
      <div className="rounded-2xl border-2 border-gray-800 bg-[#1a1a2e] overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#E9414C] to-[#FF9634]" />
        <div className="p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex-1">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Enterprise</div>
            <div className="text-3xl font-extrabold text-white mb-1">Custom pricing</div>
            <p className="text-gray-400 font-sans text-sm max-w-xl">
              Large-scale teams, bespoke integrations, white-label options, and SLA guarantees.
              We'll build a plan around your exact headcount and domain needs.
            </p>
          </div>
          <div className="flex-1">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {enterprisePlanFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300 font-sans">
                  <CheckCircle size={14} className="text-[#FF9634] flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="mailto:connect@knacksters.co"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold font-sans text-white border-2 border-white/20 hover:border-white/40 transition-colors"
            >
              <Phone size={16} />
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* Overage note */}
      <p className={`text-center text-sm font-sans mt-6 ${darkBackground ? '' : 'text-gray-500'}`}
        style={darkBackground ? { color: 'rgb(140,140,140)' } : {}}>
        Need extra hours?{' '}
        <span className="font-bold text-[#FF9634]">$100 per additional hour</span>
        {' '}— billed monthly, no minimums.
      </p>
    </div>
  );
}

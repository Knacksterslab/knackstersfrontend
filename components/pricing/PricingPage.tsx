'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
  Shield,
  Users,
  HeartHandshake,
  Clock,
  DollarSign,
  BarChart3,
  ArrowRight,
  Sparkles,
  Phone,
} from 'lucide-react';
import ComparisonTable from '@/components/shared/ComparisonTable';
import PrimaryButton from '@/components/svg/primary-button';

const pricingPlans = [
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

const enterprisePlan = {
  features: [
    'Everything in Growth, plus:',
    'White-label options',
    'Custom integrations',
    'Dedicated success team',
    'SLA guarantees',
    'Custom workflows',
    'Custom hours allocation',
  ],
};

const allIncluded = [
  { icon: Users, label: 'Dedicated CSM' },
  { icon: Shield, label: '8% pass-rate vetting' },
  { icon: Zap, label: 'Matched in 2–4 hours' },
  { icon: BarChart3, label: 'Real-time dashboard' },
  { icon: Clock, label: 'No long-term contracts' },
  { icon: DollarSign, label: 'No setup fees' },
  { icon: HeartHandshake, label: 'Full-time hire anytime' },
  { icon: Sparkles, label: 'Access to 10,000+ experts' },
];

const faqs = [
  {
    q: 'Is there a setup fee or cancellation penalty?',
    a: 'No setup fees, no onboarding charges, no cancellation penalties. You can cancel at the end of any billing month — no notice required.',
  },
  {
    q: 'What exactly counts as an "hour"?',
    a: 'An hour is a logged work hour by the expert on your tasks. Your CSM reviews and approves timesheets monthly. You only pay for verified, approved hours.',
  },
  {
    q: 'What happens if I use more hours than my plan includes?',
    a: 'Additional hours are billed at $100/hour, added to your next monthly invoice. There are no minimums and no surprise charges — your CSM will flag if you\'re approaching your limit.',
  },
  {
    q: 'Can I switch plans mid-month?',
    a: 'Yes. Upgrades take effect immediately. Downgrades apply from the next billing cycle.',
  },
  {
    q: 'Can I run tasks across multiple domains on one plan?',
    a: 'Yes — all paid plans include access to all 6 service domains: AI Solutions, Cybersecurity, Development & DevOps, Design & Creative, Growth & Customer Success, and Healthcare & Life Sciences.',
  },
  {
    q: "What's the difference between Trial to Hire and a paid subscription?",
    a: "The Trial is a 30-day, 50-hour evaluation — one per company, one role at a time, no credit card. If you want to hire the person full-time after the trial, you can do so directly. If you want ongoing access to multiple experts across projects, that's what the paid subscription plans are for.",
  },
  {
    q: 'Is there a minimum commitment for paid plans?',
    a: 'No. All plans are month-to-month. The only commitment is the current billing month — you can cancel before the next one begins.',
  },
  {
    q: 'How does Enterprise pricing work?',
    a: 'Enterprise plans are fully custom — we agree on hours, scope, and price based on your specific needs. Contact our sales team for a tailored proposal.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-left gap-4"
      >
        <span className="font-sans font-semibold text-[rgb(38,38,38)] text-sm sm:text-base">{q}</span>
        {open ? (
          <ChevronUp size={18} className="flex-shrink-0 text-gray-400" />
        ) : (
          <ChevronDown size={18} className="flex-shrink-0 text-gray-400" />
        )}
      </button>
      {open && (
        <p className="pb-4 text-sm text-[rgb(89,89,89)] font-sans leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section
        className="relative bg-[rgb(250,250,250)] bg-cover bg-center overflow-hidden py-16 sm:py-20 md:py-24 px-4"
        style={{ backgroundImage: 'url(/hero-bg.png)', backgroundPosition: 'center bottom' }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-gray-200 rounded-full px-4 py-1.5 mb-5 shadow-sm">
            <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span className="text-sm font-sans text-[rgb(89,89,89)]">No hidden fees · No contracts · Cancel anytime</span>
          </div>

          <h1 className="m-0 leading-[1.15] font-mono font-normal text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] text-[rgb(38,38,38)] mb-4">
            Transparent Pricing.{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #E9414C 0%, #FF9634 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Start Free.
            </span>
          </h1>
          <p className="mt-2 font-sans text-[rgb(89,89,89)] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Try a vetted professional for 50 hours at no cost. When you're ready to scale, choose a plan that grows with your team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <PrimaryButton
                width="220"
                height="52"
                wrapperClassName="hero-primary-button-wrapper"
                gradientId="paint0_linear_pricing_hero"
              />
            </Link>
            <Link
              href="#plans"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold font-sans text-[rgb(38,38,38)] border-2 border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
            >
              View plans
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Plan Cards */}
      <section id="plans" className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-[rgb(38,38,38)] mb-3">
              Choose your plan
            </h2>
            <p className="font-sans text-base sm:text-lg text-[rgb(89,89,89)] max-w-2xl mx-auto">
              Month-to-month. No setup costs. Scale up or down whenever you need.
            </p>
          </div>

          {/* 4-column grid for paid plans */}
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
                        plan.id === 'trial'
                          ? plan.ctaStyle
                          : plan.highlighted
                          ? 'text-white'
                          : 'text-white'
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

          {/* Enterprise card — full width */}
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
                  {enterprisePlan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300 font-sans">
                      <CheckCircle size={14} className="text-[#FF9634] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-shrink-0">
                <Link
                  href="mailto:sales@knacksters.co"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold font-sans text-white border-2 border-white/20 hover:border-white/40 transition-colors"
                >
                  <Phone size={16} />
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>

          {/* Overage note */}
          <p className="text-center text-sm font-sans text-gray-500 mt-6">
            Need extra hours?{' '}
            <span className="font-bold text-[#FF9634]">$100 per additional hour</span>
            {' '}— billed monthly, no minimums.
          </p>
        </div>
      </section>

      {/* All Plans Include */}
      <section className="py-14 px-4 bg-[#f9f9f9]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-mono font-normal text-center text-[1.5rem] sm:text-[1.75rem] text-[rgb(38,38,38)] mb-10">
            Every plan includes
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {allIncluded.map((item, i) => {
              const IconComponent = item.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundImage: 'linear-gradient(135deg, #E9414C, #FF9634)' }}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-semibold font-sans text-[rgb(38,38,38)]">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <ComparisonTable
            heading="Why $7,000/month is cheaper than you think"
            subheading="Compare the real cost of Knacksters against unmanaged alternatives — and see what you're actually saving"
            footerNote="💡 With Knacksters, you get management, vetting, and flexibility included. Alternatives charge extra for each."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 px-4 bg-[#f9f9f9]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-[rgb(38,38,38)] mb-3">
              Pricing FAQ
            </h2>
            <p className="font-sans text-base sm:text-lg text-[rgb(89,89,89)]">
              Everything you need to know before you sign up
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-2">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 font-sans mt-6">
            More questions?{' '}
            <Link href="/faq" className="text-[#FF9634] font-semibold hover:underline">
              Visit the full FAQ
            </Link>{' '}
            or{' '}
            <Link href="mailto:hello@knacksters.co" className="text-[#FF9634] font-semibold hover:underline">
              email us
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 px-4 bg-[#262626]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-white mb-4">
            Start with 50 Free Hours
          </h2>
          <p className="font-sans text-base sm:text-lg mb-2" style={{ color: 'rgb(140,140,140)' }}>
            No credit card. No commitment. Work with a vetted expert for a full month — then decide.
          </p>
          <p className="font-sans text-sm mb-8" style={{ color: 'rgb(100,100,100)' }}>
            Or{' '}
            <Link href="mailto:hello@knacksters.co" className="underline text-[#FF9634]">
              book a free consultation
            </Link>{' '}
            and we'll walk you through the right plan for your team.
          </p>
          <Link href="/signup" className="inline-block">
            <PrimaryButton
              width="256"
              height="56"
              wrapperClassName="hero-primary-button-wrapper"
              gradientId="paint0_linear_pricing_cta"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}

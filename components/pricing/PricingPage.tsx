'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
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
} from 'lucide-react';
import ComparisonTable from '@/components/shared/ComparisonTable';
import PricingCards from '@/components/shared/PricingCards';
import PrimaryButton from '@/components/svg/primary-button';

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

          <PricingCards />
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

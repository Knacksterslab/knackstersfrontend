"use client";

import Link from "next/link";
import { 
  UserPlus,
  Target,
  Zap,
  CheckCircle,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  ArrowRight,
  Star,
  Award,
  Shield,
  Sparkles,
  BarChart3,
  UserCheck,
  Briefcase,
  HeartHandshake
} from "lucide-react";
import PrimaryButton from "../svg/primary-button";
import ComparisonTable from "../shared/ComparisonTable";

export default function HowItWorksPage() {

  // Two distinct starting paths
  const startingPaths = [
    {
      icon: HeartHandshake,
      badge: "Most Popular Starting Point",
      badgeColor: "bg-green-500",
      title: "Trial to Hire",
      subtitle: "Evaluating someone for a permanent role?",
      description: "Work with a vetted professional for 50 hours — completely free. See their quality, assess the fit, then decide: hire them full-time or convert to a subscription. No credit card, no commitment.",
      steps: ["Sign up free", "Get matched in 2–4 hours", "50 hours of real work", "Hire full-time or subscribe"],
      cta: "Start Free Trial",
      ctaHref: "/signup",
      accentColor: "border-green-400",
      bgColor: "bg-green-50",
      ctaStyle: "bg-green-600 hover:bg-green-700 text-white",
    },
    {
      icon: Briefcase,
      badge: "For Ongoing Teams",
      badgeColor: "bg-gradient-to-r from-[#E9414C] to-[#FF9634]",
      title: "Subscribe & Scale",
      subtitle: "Need ongoing expert capacity?",
      description: "Choose a monthly plan and get a managed team of vetted professionals across any of our 6 domains — deployed within hours, managed end-to-end by your dedicated Customer Success Manager.",
      steps: ["Choose a plan from $7,000/mo", "15-min onboarding call", "Experts deployed same day", "Scale up or down monthly"],
      cta: "View Plans",
      ctaHref: "/signup",
      accentColor: "border-[#FF9634]",
      bgColor: "bg-orange-50",
      ctaStyle: "text-white",
    },
  ];

  const journeySteps = [
    {
      number: "01",
      title: "Start Free or Subscribe",
      description: "Choose your path: evaluate a professional for a permanent role with 50 free hours, or jump straight into a subscription plan. Either way, you're matched with experts within hours.",
      time: "5 minutes",
      outcome: "Account created & plan selected",
      details: [
        "Trial to Hire — free, 50 hours, evaluate one professional for a permanent role",
        "Flex Retainer ($7,000/mo) — 100 hours for focused ongoing projects",
        "Pro Retainer ($12,500/mo) — 200 hours for teams running multiple workstreams",
        "Growth ($25,000/mo) — 450 hours for scaling businesses",
        "Enterprise — custom pricing and hours for large organisations",
        "No credit card required for the Trial to Hire plan"
      ],
      icon: UserPlus,
      color: "from-blue-500 to-cyan-600"
    },
    {
      number: "02",
      title: "Meet Your Customer Success Manager",
      description: "Within 15 minutes of signing up, your dedicated CSM reaches out via video call to understand your goals, whether you're hiring for a permanent role or building an ongoing team.",
      time: "15 minutes",
      outcome: "Clear understanding of your goals",
      details: [
        "Dedicated CSM assigned immediately upon signup",
        "15-minute video onboarding call — not a sales call",
        "For Trial to Hire: define the role you're evaluating",
        "For subscriptions: share project requirements and priorities",
        "Establish quality standards, timelines, and success metrics",
        "Get instant access to the full client dashboard"
      ],
      icon: Users,
      color: "from-purple-500 to-pink-600"
    },
    {
      number: "03",
      title: "Expert Matching (Hours, Not Weeks)",
      description: "Your CSM searches our 10,000+ vetted professionals and presents the best 2–3 candidates for your approval. You review and approve — they handle the rest.",
      time: "2–4 hours (your CSM handles this)",
      outcome: "Curated expert profiles presented",
      details: [
        "CSM searches pre-screened talent pool of 10,000+ professionals",
        "Filtered by skills, availability, experience level, and domain",
        "Reviews portfolios and past client ratings (avg 4.8/5 — 8% pass rate)",
        "Shortlists top 2–3 candidates that match your needs",
        "Presents detailed profiles with expertise and recommendations",
        "You approve in your dashboard — no back-and-forth emails"
      ],
      icon: Zap,
      color: "from-orange-500 to-red-600"
    },
    {
      number: "04",
      title: "Approval & Immediate Start",
      description: "Review candidate profiles in your dashboard, approve your preferred expert, and work begins immediately. No procurement hoops, no delays.",
      time: "15 minutes (your approval)",
      outcome: "Expert assigned and work begins",
      details: [
        "Review detailed profiles: portfolio, skills, ratings, and availability",
        "Approve one expert or multiple for different tasks",
        "CSM assigns specific deliverables and timelines",
        "Expert begins work immediately upon your approval",
        "Full visibility into tasks and progress from day one"
      ],
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600"
    },
    {
      number: "05",
      title: "Execution — Managed for You",
      description: "Your CSM handles daily coordination, quality control, and progress tracking. You spend ~30 minutes a week reviewing deliverables. That's it.",
      time: "~30 mins/week for you",
      outcome: "Projects move forward without management overhead",
      details: [
        "CSM conducts daily check-ins with assigned professionals",
        "Quality control and progress tracking handled for you",
        "Regular status updates on milestones and deliverables",
        "Review completed work in the dashboard and approve or request revisions",
        "CSM resolves any issues — you never manage the talent directly"
      ],
      icon: TrendingUp,
      color: "from-indigo-500 to-purple-600"
    },
    {
      number: "06",
      title: "Track, Scale, Optimise",
      description: "Monitor hours in real-time, approve timesheets, and adjust your team month-to-month. No contracts, no penalties.",
      time: "Monthly review",
      outcome: "Flexible, predictable costs",
      details: [
        "Real-time dashboard shows hours used vs. remaining",
        "Review and approve monthly timesheets with one click",
        "See all completed deliverables and project history",
        "Scale up by adding hours or domains next month",
        "Scale down or cancel anytime — zero long-term contracts"
      ],
      icon: BarChart3,
      color: "from-teal-500 to-cyan-600"
    },
  ];

  // Trial to Hire specific journey
  const trialOutcome = {
    number: "07",
    title: "Decide: Hire Full-Time or Subscribe",
    description: "After your 50 trial hours, you've seen real work from a real professional. Now you choose — with complete confidence and zero risk.",
    time: "Your decision, your timeline",
    outcome: "Zero-risk hiring or seamless subscription",
    details: [
      "Hire them full-time — your CSM coordinates the transition, transparent conversion terms, no surprises",
      "Convert to a subscription plan — keep working together under Flex, Pro, or Growth",
      "Not the right fit? Walk away with no obligation — your CSM will find another match",
      "No lengthy interview processes — you already know they can deliver",
      "No recruiting fees — the trial hours were free"
    ],
    icon: UserCheck,
    color: "from-amber-500 to-orange-600"
  };


  const pricingPlans = [
    {
      name: "Trial to Hire",
      price: "Free",
      period: "",
      hours: "50 hours",
      badge: "Hire Risk-Free",
      badgeStyle: "bg-green-500 text-white",
      features: [
        "50 hours of real work — valid 30 days",
        "Evaluate one role at a time",
        "One trial per company",
        "Dedicated Customer Success Manager",
        "Expert matching in 2–4 hours",
        "Convert to full-time hire anytime"
      ],
      bestFor: "Companies evaluating a professional for a permanent full-time role",
      cta: "Start Free Trial",
      highlighted: false,
      borderStyle: "border-green-400",
      ctaStyle: "bg-green-600 hover:bg-green-700 text-white",
    },
    {
      name: "Flex Retainer",
      price: "$7,000",
      period: "per month",
      hours: "100 hours",
      features: [
        "Dedicated Customer Success Manager",
        "Access to 10,000+ experts",
        "All 6 service domains",
        "Real-time dashboard",
        "No contracts",
        "Cancel anytime"
      ],
      bestFor: "Focused teams and ongoing projects",
      cta: "Get Started",
      highlighted: false,
      borderStyle: "border-gray-200",
      ctaStyle: "text-white",
    },
    {
      name: "Pro Retainer",
      price: "$12,500",
      period: "per month",
      hours: "200 hours",
      badge: "Most Popular",
      badgeStyle: "bg-yellow-400 text-gray-900",
      features: [
        "Everything in Flex, plus:",
        "Priority matching in under 2 hours",
        "Priority 24/7 support",
        "Advanced analytics",
        "Custom reporting",
        "Multiple workstreams"
      ],
      bestFor: "Teams running multiple projects simultaneously",
      cta: "Get Started",
      highlighted: true,
      borderStyle: "border-[#5A1568]",
      ctaStyle: "text-white",
    },
    {
      name: "Growth",
      price: "$25,000",
      period: "per month",
      hours: "450 hours",
      features: [
        "Everything in Pro, plus:",
        "Dedicated senior CSM",
        "Quarterly business reviews",
        "Custom reporting",
        "Volume pricing benefits"
      ],
      bestFor: "Scaling companies with large teams",
      cta: "Get Started",
      highlighted: false,
      borderStyle: "border-gray-200",
      ctaStyle: "text-white",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      hours: "Custom hours",
      features: [
        "Everything in Growth, plus:",
        "White-label options",
        "Custom integrations",
        "Dedicated success team",
        "SLA guarantees",
        "Custom workflows"
      ],
      bestFor: "Large enterprises with ongoing needs",
      cta: "Contact Sales",
      highlighted: false,
      borderStyle: "border-gray-200",
      ctaStyle: "text-white",
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Deploy in Hours",
      description: "Our record is 37 minutes from signup to expert assigned. Average is 2–4 hours. Not days, not weeks."
    },
    {
      icon: Shield,
      title: "Pre-Vetted Experts",
      description: "Only 8% of applicants pass our 3-step screening: portfolio review, skills test, and background check."
    },
    {
      icon: Users,
      title: "Fully Managed",
      description: "Your CSM handles coordination, quality control, and issue resolution. You spend ~30 minutes a week."
    },
    {
      icon: Award,
      title: "Hire or Subscribe",
      description: "Try before you hire — 50 free hours to evaluate any professional for a permanent role, with zero risk."
    }
  ];

  return (
    <div className="min-h-screen">

      {/* Hero — brand aligned: hero-bg.png, font-mono, brand colors */}
      <section
        className="relative bg-[rgb(250,250,250)] bg-cover bg-center overflow-hidden py-16 sm:py-20 md:py-24 px-4"
        style={{ backgroundImage: "url(/hero-bg.png)", backgroundPosition: "center bottom" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h1 className="m-0 leading-[1.15] font-mono font-normal text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] text-[rgb(38,38,38)] mb-4">
            Try a Professional for Free.{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #E9414C 0%, #FF9634 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Hire or Scale.
            </span>
          </h1>
          <p className="mt-2 leading-[1.57] font-normal font-sans text-[rgb(89,89,89)] text-base sm:text-lg md:text-xl text-center max-w-2xl mx-auto mb-6">
            Work with a vetted expert for 50 hours free — then hire them full-time or scale with a managed subscription. No credit card. No commitment.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-orange-500 text-orange-500" />
              ))}
            </div>
            <span className="text-sm font-sans text-[rgb(89,89,89)]">4.8/5 from 200+ enterprise clients</span>
          </div>
          <Link href="/signup" className="inline-block">
            <PrimaryButton
              width="256"
              height="56"
              wrapperClassName="hero-primary-button-wrapper"
              gradientId="paint0_linear_hiw_hero"
            />
          </Link>
        </div>
      </section>

      {/* Two Ways to Start */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-[rgb(38,38,38)] mb-3">
              Two Ways to Start
            </h2>
            <p className="font-sans text-base sm:text-lg text-[rgb(89,89,89)] max-w-2xl mx-auto">
              Whether you're hiring someone permanently or building an ongoing team — we have a path for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {startingPaths.map((path, index) => {
              const IconComponent = path.icon;
              const isSubscribe = index === 1;
              return (
                <div key={index} className={`relative rounded-2xl border-2 ${path.accentColor} ${path.bgColor} p-8`}>
                  <div className="absolute -top-3.5 left-6">
                    <span className={`${path.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm`}>
                      {path.badge}
                    </span>
                  </div>
                  <div className="flex items-start gap-4 mb-4 mt-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isSubscribe ? 'bg-gradient-to-br from-[#E9414C] to-[#FF9634]' : 'bg-green-600'}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[rgb(38,38,38)] font-sans">{path.title}</h3>
                      <p className="text-sm text-[rgb(89,89,89)] font-sans">{path.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[rgb(89,89,89)] font-sans leading-relaxed mb-5">{path.description}</p>
                  <div className="flex flex-col gap-2 mb-6">
                    {path.steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${isSubscribe ? 'bg-[#FF9634]' : 'bg-green-600'}`}>
                          {i + 1}
                        </div>
                        <span className="text-sm font-sans text-[rgb(38,38,38)]">{step}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={path.ctaHref}>
                    <button
                      className={`w-full py-2.5 rounded-xl text-sm font-bold font-sans transition-all ${path.ctaStyle}`}
                      style={isSubscribe ? { backgroundImage: "linear-gradient(90deg, #E9414C, #FF9634)" } : {}}
                    >
                      {path.cta} →
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-16 sm:py-20 px-4 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-[rgb(38,38,38)] mb-3">
              The Complete Journey
            </h2>
            <p className="font-sans text-base sm:text-lg text-[rgb(89,89,89)] max-w-3xl mx-auto">
              From signup to a running team — here's exactly what happens and when
            </p>
          </div>

          <div className="space-y-10 md:space-y-12">
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
                >
                  <div className="lg:w-1/3 flex justify-center">
                    <div className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}>
                      <IconComponent className="w-20 h-20 sm:w-24 sm:h-24 text-white" />
                      <div
                        className="absolute -top-4 -right-4 w-14 h-14 rounded-full border-4 flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: '#5A1568', borderColor: '#7A2A88' }}
                      >
                        <span className="text-xl font-bold text-white font-mono">{step.number}</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-2/3 w-full">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-md hover:shadow-xl transition-all">
                      <h3 className="text-xl sm:text-2xl font-bold text-[rgb(38,38,38)] mb-2 font-sans">{step.title}</h3>
                      <p className="text-sm sm:text-base text-[rgb(89,89,89)] mb-5 font-sans leading-relaxed">{step.description}</p>
                      <div className="flex flex-wrap gap-3 mb-5">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
                          <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-xs font-medium text-blue-900 font-sans">{step.time}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-xs font-medium text-green-900 font-sans">{step.outcome}</span>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#5A1568' }} />
                            <span className="text-xs sm:text-sm text-[rgb(89,89,89)] font-sans">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trial to Hire outcome — visually distinct */}
          <div className="mt-12">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-green-100 border border-green-300 rounded-full px-4 py-2">
                <HeartHandshake className="w-4 h-4 text-green-700" />
                <span className="text-sm font-semibold text-green-800 font-sans">Trial to Hire Outcome</span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/3 flex justify-center">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl">
                  <UserCheck className="w-20 h-20 sm:w-24 sm:h-24 text-white" />
                  <div
                    className="absolute -top-4 -right-4 w-14 h-14 rounded-full border-4 flex items-center justify-center shadow-lg bg-green-600"
                    style={{ borderColor: '#16a34a' }}
                  >
                    <span className="text-xl font-bold text-white font-mono">07</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3 w-full">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-green-400 shadow-md hover:shadow-xl transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Trial to Hire Only</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[rgb(38,38,38)] mb-2 font-sans">{trialOutcome.title}</h3>
                  <p className="text-sm sm:text-base text-[rgb(89,89,89)] mb-5 font-sans leading-relaxed">{trialOutcome.description}</p>
                  <div className="flex flex-wrap gap-3 mb-5">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-200">
                      <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-xs font-medium text-green-900 font-sans">{trialOutcome.time}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200">
                      <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span className="text-xs font-medium text-amber-900 font-sans">{trialOutcome.outcome}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {trialOutcome.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
                        <span className="text-xs sm:text-sm text-[rgb(89,89,89)] font-sans">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <ComparisonTable
            footerNote="💡 With Knacksters, you're not just paying for talent — you're eliminating hiring risk, management overhead, and long-term commitment."
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 sm:py-20 px-4 bg-[#262626]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-white mb-3">
              Transparent Pricing
            </h2>
            <p className="font-sans text-base sm:text-lg max-w-3xl mx-auto" style={{ color: 'rgb(140,140,140)' }}>
              No hidden fees. No setup costs. No cancellation penalties. Start free, scale as you grow.
            </p>
          </div>

          {/* Scrollable plan cards */}
          <div className="overflow-x-auto pb-3 pt-5 -mx-4 px-4">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  style={{ width: '220px', flexShrink: 0 }}
                  className={`relative flex flex-col rounded-2xl border-2 ${plan.borderStyle} bg-white`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                      <span className={`${plan.badgeStyle} text-xs font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap`}>
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <div className={`h-1 w-full rounded-t-2xl ${plan.name === 'Trial to Hire' ? 'bg-green-400' : plan.highlighted ? 'bg-[#5A1568]' : 'bg-gray-200'}`} />
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{plan.name}</h3>
                    <div className="text-2xl font-extrabold text-[rgb(38,38,38)] mb-0.5">{plan.price}</div>
                    <div className="text-xs text-gray-400 mb-1">{plan.period || '30-day trial'}</div>
                    <div className={`text-sm font-bold mb-3 ${plan.name === 'Trial to Hire' ? 'text-green-600' : 'text-[#FF9634]'}`}>{plan.hours}</div>
                    <p className="text-xs text-gray-400 mb-3 leading-relaxed">{plan.bestFor}</p>
                    <div className="border-t border-gray-100 mb-4" />
                    <ul className="space-y-2.5 mb-5 flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[rgb(89,89,89)] leading-snug">
                          <CheckCircle size={13} className={`flex-shrink-0 mt-0.5 ${plan.name === 'Trial to Hire' ? 'text-green-500' : 'text-[#FF9634]'}`} />
                          <span className="font-sans">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/signup">
                      <button
                        className={`w-full py-2.5 rounded-xl text-sm font-bold font-sans transition-all ${plan.ctaStyle}`}
                        style={
                          plan.name === 'Trial to Hire' ? {} :
                          plan.highlighted ? { backgroundColor: '#5A1568' } :
                          { backgroundImage: "linear-gradient(90deg, #E9414C, #FF9634)" }
                        }
                      >
                        {plan.cta}
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm font-sans" style={{ color: 'rgb(140,140,140)' }}>
              Need more than your plan includes?{" "}
              <span className="font-bold text-[#FF9634]">$100 per additional hour</span> — billed monthly, no minimums.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-[rgb(38,38,38)] mb-3">
              Why Knacksters?
            </h2>
            <p className="font-sans text-base sm:text-lg text-[rgb(89,89,89)] max-w-3xl mx-auto">
              Join 200+ enterprise clients who've eliminated hiring risk and scaled their teams on-demand
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundImage: "linear-gradient(135deg, #E9414C, #FF9634)" }}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 font-sans text-[rgb(38,38,38)]">{benefit.title}</h3>
                  <p className="text-sm font-sans text-[rgb(89,89,89)] leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA — dark, brand aligned */}
      <section className="py-16 sm:py-20 px-4 bg-[#262626]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-white mb-4">
            Start with 50 Free Hours
          </h2>
          <p className="font-sans text-base sm:text-lg mb-2" style={{ color: 'rgb(140,140,140)' }}>
            Try a vetted professional for a full month — hire them full-time or scale with a plan. No credit card needed.
          </p>
          <p className="font-sans text-sm mb-8" style={{ color: 'rgb(100,100,100)' }}>
            Or <Link href="/signup" className="underline text-[#FF9634]">book a free 15-minute consultation</Link> and we'll walk you through it.
          </p>
          <Link href="/signup" className="inline-block">
            <PrimaryButton
              width="256"
              height="56"
              wrapperClassName="hero-primary-button-wrapper"
              gradientId="paint0_linear_hiw_cta"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}

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
  Settings,
  UserCheck
} from "lucide-react";
import PrimaryButton from "../svg/primary-button";

export default function HowItWorksPage() {
  const journeySteps = [
    {
      number: "01",
      title: "Subscribe & Meet Your Manager",
      description: "Choose your plan and have a 15-minute onboarding call with your dedicated Business Manager who'll understand your needs.",
      time: "15 minutes",
      outcome: "Clear understanding of your goals",
      details: [
        "Choose from Starter ($12,500/mo), Growth ($25,000/mo), or Enterprise plans",
        "Secure payment setup (invoice or card)",
        "Meet your dedicated Business Manager via video call",
        "Share your initial project requirements and priorities",
        "Get instant access to the client dashboard"
      ],
      icon: UserPlus,
      color: "from-blue-500 to-cyan-600"
    },
    {
      number: "02",
      title: "Define Your Requirements",
      description: "Your manager works with you to break down projects, define skill needs, and create a clear roadmap.",
      time: "30-60 minutes",
      outcome: "Detailed project roadmap",
      details: [
        "Manager asks targeted questions about your business goals",
        "Break down complex projects into specific tasks",
        "Define required skills, expertise levels, and experience",
        "Set clear timelines and delivery expectations",
        "Establish quality standards and success metrics"
      ],
      icon: Target,
      color: "from-purple-500 to-pink-600"
    },
    {
      number: "03",
      title: "Expert Matching (Minutes)",
      description: "Your manager searches our 9,999+ vetted professionals and presents the best 2-3 candidates for your approval.",
      time: "2-4 hours (manager handles this)",
      outcome: "Curated expert profiles",
      details: [
        "Manager searches pre-screened talent pool of 9,999+ professionals",
        "Filters by skills, availability, experience, and hourly rates",
        "Reviews portfolios and past client ratings (avg 4.8/5)",
        "Shortlists top 2-3 candidates that match your needs",
        "Presents detailed profiles with expertise and recommendations"
      ],
      icon: Zap,
      color: "from-orange-500 to-red-600"
    },
    {
      number: "04",
      title: "Approval & Assignment",
      description: "Review candidate profiles, approve your preferred expert(s), and work begins immediately.",
      time: "15 minutes (your approval)",
      outcome: "Expert assigned and ready",
      details: [
        "Review detailed expert profiles in your dashboard",
        "See portfolios, skills, ratings, and availability",
        "Approve one or multiple experts for different tasks",
        "Manager assigns specific deliverables and timelines",
        "Expert begins work immediately upon assignment"
      ],
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600"
    },
    {
      number: "05",
      title: "Execution & Management",
      description: "Your manager handles daily coordination while you stay focused on your business. Review deliverables and provide feedback.",
      time: "Ongoing (30 mins/week for you)",
      outcome: "Projects move forward",
      details: [
        "Manager conducts daily check-ins with assigned talent",
        "Quality control and progress tracking handled for you",
        "Regular status updates on project milestones",
        "You review completed deliverables in the dashboard",
        "Provide feedback directly—manager ensures revisions"
      ],
      icon: TrendingUp,
      color: "from-indigo-500 to-purple-600"
    },
    {
      number: "06",
      title: "Track, Scale, Optimize",
      description: "Monitor hours in real-time, approve timesheets, and adjust your team size month-to-month with no contracts.",
      time: "Monthly review",
      outcome: "Flexible, predictable costs",
      details: [
        "Real-time dashboard shows hours used vs. remaining",
        "Review and approve monthly timesheets",
        "See all completed deliverables and project status",
        "Scale up by adding more hours or experts next month",
        "Scale down or cancel anytime—no long-term contracts"
      ],
      icon: BarChart3,
      color: "from-teal-500 to-cyan-600"
    },
    {
      number: "07",
      title: "Found the Perfect Fit? Hire Full-Time",
      description: "When a Knackster becomes invaluable, convert them to a permanent role through our streamlined hiring pathway.",
      time: "Optional",
      outcome: "Zero-risk permanent hire",
      details: [
        "You've already proven the expert's skills through real work",
        "No recruiting fees or lengthy interview processes",
        "Your manager coordinates the transition seamlessly",
        "Transparent conversion terms—no surprises",
        "Continue working together as a full-time team member"
      ],
      icon: UserCheck,
      color: "from-amber-500 to-orange-600"
    }
  ];

  const differentiators = [
    {
      feature: "Time to Start",
      knacksters: "Minutes",
      freelance: "1-2 weeks",
      staffing: "4-6 weeks",
      fulltime: "6-12 weeks",
      highlight: true
    },
    {
      feature: "Who Manages",
      knacksters: "Dedicated Manager",
      freelance: "You do it all",
      staffing: "You do it all",
      fulltime: "You do it all",
      highlight: true
    },
    {
      feature: "Quality Vetting",
      knacksters: "Pre-screened (8% pass rate)",
      freelance: "Hit or miss",
      staffing: "Variable",
      fulltime: "Unknown until hired",
      highlight: false
    },
    {
      feature: "Monthly Cost",
      knacksters: "$12,500 (200 hrs)",
      freelance: "$15-25K",
      staffing: "$20-40K",
      fulltime: "$10-15K + benefits",
      highlight: false
    },
    {
      feature: "Flexibility",
      knacksters: "Scale monthly",
      freelance: "Per project",
      staffing: "6-12 mo contracts",
      fulltime: "Fixed forever",
      highlight: false
    },
    {
      feature: "Risk Level",
      knacksters: "Low",
      freelance: "High",
      staffing: "Medium",
      fulltime: "Very High",
      highlight: false
    },
    {
      feature: "Cancel Anytime",
      knacksters: "✓ Yes",
      freelance: "N/A",
      staffing: "✗ No",
      fulltime: "✗ No",
      highlight: true
    },
    {
      feature: "Multi-Expertise",
      knacksters: "✓ 6 domains",
      freelance: "✗ Single skill",
      staffing: "⚠ Extra cost",
      fulltime: "✗ Single skill",
      highlight: true
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$12,500",
      period: "per month",
      hours: "200 hours included",
      features: [
        "Dedicated Business Manager",
        "Access to 9,999+ experts",
        "All 6 service domains",
        "Real-time dashboard",
        "No contracts",
        "Cancel anytime"
      ],
      bestFor: "Small teams, focused projects",
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Growth",
      price: "$25,000",
      period: "per month",
      hours: "450 hours included",
      badge: "Most Popular",
      features: [
        "Everything in Starter, plus:",
        "Priority talent matching",
        "Dedicated account manager",
        "Quarterly business reviews",
        "Advanced analytics",
        "Custom reporting"
      ],
      bestFor: "Growing companies, multiple projects",
      cta: "Get Started",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      hours: "Unlimited hours",
      features: [
        "Everything in Growth, plus:",
        "White-label options",
        "Custom integrations",
        "Dedicated support team",
        "SLA guarantees",
        "Custom workflows"
      ],
      bestFor: "Large enterprises, ongoing needs",
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Deploy in Minutes",
      description: "Our record is 37 minutes from signup to expert assigned. Average time is 4-6 hours."
    },
    {
      icon: Shield,
      title: "Pre-Vetted Experts",
      description: "Only 8% of applicants pass our 3-step screening: portfolio review, skills test, background check."
    },
    {
      icon: Users,
      title: "Managed for You",
      description: "Your Business Manager handles coordination, quality control, and issue resolution. You focus on your business."
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "4.8/5 average rating from 200+ enterprise clients. 960,000+ hours delivered successfully."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-mono text-gray-900">
              How <span style={{ color: '#5A1568' }}>Knacksters Works</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 leading-relaxed font-sans px-4">
              Your expert team, deployed in minutes—managed end-to-end. No hiring hassles, no management overhead, no long-term commitments.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6 sm:mb-8">
              <Link href="/signup" className="inline-block">
                <div className="w-[180px] sm:w-[200px]">
                  <div className="scale-90 sm:scale-100 origin-center">
                    <PrimaryButton
                      width="200"
                      height="56"
                      wrapperClassName="primary-button-wrapper"
                      gradientId="paint0_linear_howitworks_hero"
                    />
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-600 font-sans">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 fill-orange-500 text-orange-500" />
                ))}
              </div>
              <span className="text-xs sm:text-sm">4.8/5 from 200+ enterprise clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey - 7 Steps */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 font-mono">
              The Complete Journey
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-sans px-4">
              From signup to scaling—here's exactly how we work together to build your on-demand team
            </p>
          </div>

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
                >
                  {/* Icon & Number */}
                  <div className="lg:w-1/3 flex justify-center">
                    <div className={`relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl sm:rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}>
                      <IconComponent className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white" />
                      <div 
                        className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-4 flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: '#5A1568', borderColor: '#7A2A88' }}
                      >
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-white font-mono">{step.number}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-2/3 w-full">
                    <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border-2 border-gray-300 shadow-xl hover:shadow-2xl transition-all">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 font-sans">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 font-sans">
                        {step.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 rounded-lg border border-blue-200">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-medium text-blue-900 font-sans whitespace-nowrap">{step.time}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-medium text-green-900 font-sans">{step.outcome}</span>
                        </div>
                      </div>

                      <ul className="space-y-2 sm:space-y-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 sm:gap-3">
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" style={{ color: '#5A1568' }} />
                            <span className="text-xs sm:text-sm text-gray-700 font-sans">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 font-mono">
              Knacksters vs. The Alternatives
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-sans px-4">
              See how we stack up against traditional hiring, freelance marketplaces, and staffing agencies
            </p>
          </div>

          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[700px] bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
              <thead>
                <tr style={{ backgroundColor: '#5A1568' }} className="text-white">
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left font-bold font-sans text-xs sm:text-sm whitespace-nowrap">Feature</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-bold font-sans text-xs sm:text-sm whitespace-nowrap">Knacksters</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-sans text-xs sm:text-sm whitespace-nowrap">Freelance</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-sans text-xs sm:text-sm whitespace-nowrap">Staffing</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-sans text-xs sm:text-sm whitespace-nowrap">Full-Time</th>
                </tr>
              </thead>
              <tbody>
                {differentiators.map((row, index) => (
                  <tr 
                    key={index}
                    className={`border-b border-gray-100 ${row.highlight ? 'bg-orange-50' : 'bg-white'} hover:bg-gray-50 transition-colors`}
                  >
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold text-gray-900 font-sans text-xs sm:text-sm whitespace-nowrap">{row.feature}</td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center font-bold font-sans text-xs sm:text-sm whitespace-nowrap" style={{ color: '#5A1568' }}>{row.knacksters}</td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center text-gray-600 font-sans text-xs sm:text-sm whitespace-nowrap">{row.freelance}</td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center text-gray-600 font-sans text-xs sm:text-sm whitespace-nowrap">{row.staffing}</td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center text-gray-600 font-sans text-xs sm:text-sm whitespace-nowrap">{row.fulltime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-sans italic px-4">
              💡 You're not just paying for talent—you're paying to eliminate hiring, management, and risk.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 font-mono">
              Transparent Pricing
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-sans px-4">
              No hidden fees. No setup costs. No cancellation penalties. Just simple, predictable pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-transform hover:scale-105 ${
                  plan.highlighted
                    ? 'text-white shadow-2xl scale-[1.02] md:scale-105'
                    : 'bg-white border-2 border-gray-200 shadow-md'
                }`}
                style={plan.highlighted ? { backgroundColor: '#5A1568' } : {}}
              >
                {plan.badge && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 px-3 sm:px-4 py-1 bg-yellow-400 text-gray-900 rounded-full text-xs sm:text-sm font-bold font-sans">
                    {plan.badge}
                  </div>
                )}
                
                <div className="text-center mb-5 sm:mb-6">
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 font-sans ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className={`text-3xl sm:text-4xl font-bold font-mono ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-base sm:text-lg ${plan.highlighted ? 'text-white/80' : 'text-gray-600'} font-sans`}>
                      {' '}{plan.period}
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm font-medium font-sans ${plan.highlighted ? 'text-white/90' : 'text-gray-600'}`}>
                    {plan.hours}
                  </p>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-white' : 'text-green-500'}`} />
                      <span className={`text-xs sm:text-sm font-sans ${plan.highlighted ? 'text-white' : 'text-gray-700'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-4 sm:mb-6">
                  <p className={`text-xs font-sans ${plan.highlighted ? 'text-white/80' : 'text-gray-500'}`}>
                    Best for: {plan.bestFor}
                  </p>
                </div>

                <Link href="/signup" className="block">
                  <button
                    className={`w-full py-2.5 sm:py-3 rounded-lg font-bold transition-all font-sans text-sm sm:text-base ${
                      plan.highlighted
                        ? 'bg-white hover:bg-gray-100'
                        : 'text-white hover:shadow-lg'
                    }`}
                    style={
                      plan.highlighted
                        ? { color: '#5A1568' }
                        : { backgroundColor: '#5A1568' }
                    }
                  >
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 text-center px-4">
            <div className="inline-block bg-purple-50 border rounded-xl p-4 sm:p-6 max-w-lg" style={{ borderColor: '#E9D5F5' }}>
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" style={{ color: '#5A1568' }} />
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 font-sans">Additional Hours</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 font-sans">
                Need more than your plan includes? <span className="font-bold" style={{ color: '#5A1568' }}>$100 per additional hour</span>
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 font-sans">Billed monthly, no minimums</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 font-mono">
              Why Choose Knacksters?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-sans px-4">
              Join 200+ enterprise clients who've eliminated hiring hassles and scaled their teams on-demand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-sans">{benefit.title}</h3>
                  <p className="text-gray-300 font-sans">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-mono">
            Ready to Deploy Your Expert Team?
          </h2>
          <p className="text-xl text-gray-700 mb-8 font-sans">
            Start with a 15-minute consultation. We'll show you exactly how Knacksters works for your specific needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Link href="/signup" className="inline-block">
              <div style={{ width: '200px' }}>
                <PrimaryButton
                  width="200"
                  height="56"
                  wrapperClassName="primary-button-wrapper"
                  gradientId="paint0_linear_howitworks_cta"
                />
              </div>
            </Link>
          </div>
          <p className="text-sm text-gray-600 font-sans">
            💳 No credit card required • 📞 Free consultation • 🚀 Deploy in minutes
          </p>
        </div>
      </section>
    </div>
  );
}

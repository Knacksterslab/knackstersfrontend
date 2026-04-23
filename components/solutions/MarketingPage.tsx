"use client";

import Link from "next/link";
import { 
  Target, 
  TrendingUp, 
  PenTool, 
  BarChart3, 
  Radio, 
  Megaphone,
  Sparkles,
  Search,
  MousePointerClick,
  Share2,
  Mail,
  Users,
  LineChart,
  Zap,
  Newspaper,
  Video,
  Calendar,
  Globe,
  CheckCircle2,
  Award,
  Heart,
  RefreshCw,
  HeartHandshake,
  Star,
  Activity,
} from "lucide-react";
import PrimaryButton from "../svg/primary-button";

export default function MarketingPage() {
  const roleCategories = [
    {
      icon: Target,
      title: "Strategy, Leadership & Brand",
      description: "Vision, positioning, and overall business impact driving growth excellence.",
      roles: [
        "Chief Marketing Officer (CMO)",
        "VP / Director of Marketing",
        "Marketing Strategist",
        "Brand Manager / Strategist",
        "Product Marketing Manager (PMM)",
        "Market Research Analyst"
      ],
      color: "from-orange-500 to-amber-600"
    },
    {
      icon: TrendingUp,
      title: "Digital & Performance Marketing",
      description: "Data-driven acquisition and conversion across all digital channels.",
      roles: [
        "Digital Marketing Manager",
        "Search Engine Optimization (SEO) Specialist",
        "Search Engine Marketing (SEM/PPC) Specialist",
        "Social Media Manager / Strategist",
        "Paid Social Media Specialist",
        "Email Marketing Specialist",
        "Affiliate Marketing Manager",
        "Growth Hacker / Growth Marketer"
      ],
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: PenTool,
      title: "Content & Creative",
      description: "Compelling storytelling and creative execution that engages audiences.",
      roles: [
        "Content Strategist",
        "Content Marketing Manager",
        "Copywriter",
        "Creative Director",
        "Marketing Designer / Graphic Designer",
        "Video Producer / Marketer",
        "Podcast Producer"
      ],
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: BarChart3,
      title: "Analytics, Technology & Operations",
      description: "The data and infrastructure backbone powering modern growth.",
      roles: [
        "Marketing Analyst / Data Analyst",
        "Marketing Operations (Marketing Ops) Manager",
        "CRM / Lifecycle Marketing Manager",
        "Marketing Technologist",
        "Conversion Rate Optimization (CRO) Specialist"
      ],
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Users,
      title: "Customer Success & Retention",
      description: "Onboarding, retention, expansion, and long-term revenue growth.",
      roles: [
        "Customer Success Manager (CSM)",
        "Customer Success Director",
        "Onboarding Specialist",
        "Account Expansion Manager",
        "Customer Retention Specialist",
        "Revenue Operations (RevOps) Manager",
        "Customer Experience (CX) Manager"
      ],
      color: "from-teal-500 to-cyan-600"
    },
    {
      icon: Radio,
      title: "Public Relations & Communications",
      description: "Earned media, reputation management, and strategic public messaging.",
      roles: [
        "Public Relations Manager / Specialist",
        "Communications Director",
        "Influencer Marketing Manager",
        "Community Manager"
      ],
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: Megaphone,
      title: "Specialized & Channel-Specific",
      description: "Focused expertise for specific markets, channels, and business models.",
      roles: [
        "Event Marketing Manager",
        "Partnership Marketing / Alliance Manager",
        "Field / Regional Marketing Manager",
        "B2B (Business-to-Business) Marketer",
        "B2C (Business-to-Consumer) Marketer"
      ],
      color: "from-red-500 to-orange-600"
    },
    {
      icon: Sparkles,
      title: "Emerging & Modern Roles",
      description: "Cutting-edge growth for the future of customer engagement.",
      roles: [
        "Customer Experience (CX) Marketer",
        "Brand Advocacy Manager",
        "Voice Search / AI Content Strategist",
        "Web3 / Metaverse Marketing Strategist"
      ],
      color: "from-teal-500 to-green-600"
    }
  ];

  const growthServices = [
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Rank higher and drive organic traffic with strategic search optimization.",
      category: "marketing"
    },
    {
      icon: MousePointerClick,
      title: "Paid Advertising (PPC)",
      description: "Maximize ROI with expertly managed Google Ads, Meta, and LinkedIn campaigns.",
      category: "marketing"
    },
    {
      icon: Share2,
      title: "Social Media Marketing",
      description: "Build engaged communities and drive conversions across all platforms.",
      category: "marketing"
    },
    {
      icon: Mail,
      title: "Email Marketing & Automation",
      description: "Nurture leads and retain customers with personalized email journeys.",
      category: "marketing"
    },
    {
      icon: PenTool,
      title: "Content Marketing",
      description: "Create compelling content that attracts, educates, and converts.",
      category: "marketing"
    },
    {
      icon: Video,
      title: "Video Production",
      description: "Produce high-impact video content that tells your story and drives action.",
      category: "marketing"
    },
    {
      icon: LineChart,
      title: "Marketing Analytics",
      description: "Turn data into actionable insights and measurable business outcomes.",
      category: "marketing"
    },
    {
      icon: Target,
      title: "Brand Strategy",
      description: "Build a distinctive brand that resonates with your target audience.",
      category: "marketing"
    },
    {
      icon: Heart,
      title: "Customer Onboarding",
      description: "Design seamless onboarding experiences that activate users fast and reduce early churn.",
      category: "success"
    },
    {
      icon: RefreshCw,
      title: "Retention & Churn Reduction",
      description: "Identify at-risk accounts early and implement proactive strategies to keep customers.",
      category: "success"
    },
    {
      icon: HeartHandshake,
      title: "Account Expansion & Upsell",
      description: "Grow revenue from existing customers through strategic expansion and upsell programmes.",
      category: "success"
    },
    {
      icon: Activity,
      title: "Revenue Operations (RevOps)",
      description: "Align marketing, sales, and success teams around a single revenue engine.",
      category: "success"
    },
    {
      icon: Star,
      title: "Customer Health Scoring",
      description: "Build data-driven health models that predict renewal risk and expansion opportunity.",
      category: "success"
    },
    {
      icon: Globe,
      title: "Account-Based Marketing (ABM)",
      description: "Target high-value accounts with personalized, multi-channel campaigns.",
      category: "marketing"
    },
    {
      icon: Newspaper,
      title: "PR & Media Relations",
      description: "Earn media coverage and manage your public reputation.",
      category: "marketing"
    },
    {
      icon: Calendar,
      title: "Event Marketing",
      description: "Create memorable experiences that generate leads and build brand loyalty.",
      category: "marketing"
    },
  ];

  const allTools = [
    // Marketing
    "Google Analytics", "HubSpot", "Salesforce", "Marketo",
    "Mailchimp", "SEMrush", "Ahrefs", "Google Ads",
    "Meta Business Suite", "Hootsuite", "Tableau", "Optimizely",
    // Customer Success
    "Gainsight", "ChurnZero", "Intercom", "Zendesk",
    "Totango", "Planhat", "Mixpanel", "Amplitude",
  ];

  const stats = [
    { value: "3.5×", label: "Average ROI on growth campaigns" },
    { value: "40%", label: "Average churn reduction" },
    { value: "2.8×", label: "Net Revenue Retention improvement" },
    { value: "< 30 min", label: "Time to first expert matched" },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Full Revenue Lifecycle",
      description: "From first click to long-term retention — we cover acquisition, activation, and expansion in one domain."
    },
    {
      icon: Target,
      title: "Multi-Channel Expertise",
      description: "Integrated campaigns across SEO, paid media, social, email, and customer success touchpoints."
    },
    {
      icon: Zap,
      title: "Agile Execution",
      description: "Rapid testing, iteration, and optimization for continuous improvement."
    },
    {
      icon: Award,
      title: "Industry Veterans",
      description: "Seasoned marketers and CSMs with proven track records across B2B SaaS, e-commerce, and enterprise."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50 py-20 px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white border border-orange-200 rounded-full px-4 py-2 mb-6 shadow-sm">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700 font-sans">Growth & Customer Success</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-mono leading-tight">
              Acquire. Retain.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-teal-500">
                Grow.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-sans">
              The only domain that covers the full revenue flywheel — expert marketers who win customers and customer success specialists who keep and grow them.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["SEO & Paid Media", "Content Strategy", "Customer Success", "RevOps", "Retention & Churn Reduction", "ABM"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-white border border-orange-200 rounded-full text-sm font-medium text-gray-700 font-sans shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup" className="inline-block">
                <div style={{ width: '200px' }}>
                  <PrimaryButton
                    width="200"
                    height="56"
                    wrapperClassName="primary-button-wrapper"
                    gradientId="paint0_linear_growth_hero"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-white font-mono mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400 font-sans">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Two Sides of Growth */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-mono">
              Two Sides of the Revenue Flywheel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans">
              Most companies optimise for acquisition or retention. We help you do both — because sustainable growth requires both.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Growth Marketing side */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-10 border border-orange-200">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-sans">Growth Marketing</h3>
              <p className="text-gray-600 mb-6 font-sans">Drive awareness, acquisition, and conversion across every digital channel. Turn ad spend into pipeline and content into customers.</p>
              <ul className="space-y-3">
                {["SEO & Organic Search", "Paid Media (PPC / Social)", "Content & Brand Strategy", "Email & Marketing Automation", "Analytics & Attribution", "ABM & B2B Demand Generation"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Success side */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-10 border border-teal-200">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-sans">Customer Success</h3>
              <p className="text-gray-600 mb-6 font-sans">Keep the customers you worked hard to win. Reduce churn, expand accounts, and turn satisfied customers into your biggest growth engine.</p>
              <ul className="space-y-3">
                {["Customer Onboarding & Activation", "Health Scoring & Early Warning", "Churn Reduction Programmes", "Upsell & Expansion Playbooks", "Revenue Operations (RevOps)", "NPS & Customer Feedback Loops"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Role Categories */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-mono">
              Specialisations We Cover
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans">
              From CMOs to Customer Success Managers — access the complete growth and retention talent spectrum
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roleCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-sans">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-5 font-sans">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.roles.map((role, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="font-sans">{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-mono">
              Services We Deliver
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans">
              Comprehensive execution across every stage of the customer journey — from first impression to long-term advocacy
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {growthServices.map((service, index) => {
              const IconComponent = service.icon;
              const isSuccess = service.category === "success";
              return (
                <div
                  key={index}
                  className={`rounded-xl p-6 border transition-all duration-300 group hover:shadow-lg ${
                    isSuccess
                      ? "bg-teal-50 border-teal-200 hover:border-teal-400"
                      : "bg-white border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                    isSuccess
                      ? "bg-gradient-to-br from-teal-100 to-cyan-100"
                      : "bg-gradient-to-br from-orange-100 to-amber-100"
                  }`}>
                    <IconComponent className={`w-6 h-6 ${isSuccess ? "text-teal-600" : "text-orange-600"}`} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5 font-sans">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-sans">
                    {service.description}
                  </p>
                  {isSuccess && (
                    <span className="inline-block mt-3 text-xs font-semibold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                      Customer Success
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 font-sans">
              <div className="w-3 h-3 rounded-full bg-orange-400"></div>
              Growth Marketing
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 font-sans">
              <div className="w-3 h-3 rounded-full bg-teal-400"></div>
              Customer Success
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-mono">
              Best-in-Class Tool Stack
            </h2>
            <p className="text-lg text-gray-600 font-sans">
              Our experts are fluent in the industry's most powerful growth and customer success platforms
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {allTools.map((tool, index) => (
              <span
                key={index}
                className="px-5 py-2.5 bg-white text-gray-800 rounded-full font-medium text-sm border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all font-sans"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
              Why Knacksters for Growth & Customer Success?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-sans">
              We're the only platform where you can hire a growth marketer and a CSM under the same subscription — no switching vendors, no coordination overhead.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-sans">{benefit.title}</h3>
                  <p className="text-gray-300 font-sans text-sm leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-mono">
            Ready to Grow and Keep Your Customers?
          </h2>
          <p className="text-xl text-gray-700 mb-4 font-sans">
            Connect with expert growth marketers and customer success managers who deliver results across the full revenue lifecycle.
          </p>
          <p className="text-sm text-gray-500 mb-8 font-sans">
            Start with 50 free hours — no credit card required.
          </p>
          <Link href="/signup" className="inline-block">
            <div style={{ width: '200px' }} className="mx-auto">
              <PrimaryButton
                width="200"
                height="56"
                wrapperClassName="primary-button-wrapper"
                gradientId="paint0_linear_growth_cta"
              />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

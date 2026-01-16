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
  Database,
  Zap,
  Newspaper,
  Video,
  Calendar,
  Globe,
  CheckCircle2,
  ArrowRight,
  Rocket,
  Award,
  DollarSign
} from "lucide-react";
import PrimaryButton from "../svg/primary-button";

export default function MarketingPage() {
  const marketingCategories = [
    {
      icon: Target,
      title: "Strategy, Leadership & Brand",
      description: "Vision, positioning, and overall business impact driving marketing excellence.",
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
      description: "The data and infrastructure backbone powering modern marketing.",
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
      description: "Cutting-edge marketing for the future of customer engagement.",
      roles: [
        "Customer Experience (CX) Marketer",
        "Brand Advocacy Manager",
        "Voice Search / AI Content Strategist",
        "Web3 / Metaverse Marketing Strategist"
      ],
      color: "from-teal-500 to-green-600"
    }
  ];

  const marketingSolutions = [
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Rank higher and drive organic traffic with strategic search optimization."
    },
    {
      icon: MousePointerClick,
      title: "Paid Advertising (PPC)",
      description: "Maximize ROI with expertly managed Google Ads, Meta, and LinkedIn campaigns."
    },
    {
      icon: Share2,
      title: "Social Media Marketing",
      description: "Build engaged communities and drive conversions across all platforms."
    },
    {
      icon: Mail,
      title: "Email Marketing & Automation",
      description: "Nurture leads and retain customers with personalized email journeys."
    },
    {
      icon: PenTool,
      title: "Content Marketing",
      description: "Create compelling content that attracts, educates, and converts."
    },
    {
      icon: Video,
      title: "Video Production",
      description: "Produce high-impact video content that tells your story and drives action."
    },
    {
      icon: LineChart,
      title: "Marketing Analytics",
      description: "Turn data into actionable insights and measurable business outcomes."
    },
    {
      icon: Users,
      title: "Influencer Partnerships",
      description: "Amplify your reach through authentic creator and influencer collaborations."
    },
    {
      icon: Target,
      title: "Brand Strategy",
      description: "Build a distinctive brand that resonates with your target audience."
    },
    {
      icon: Newspaper,
      title: "PR & Media Relations",
      description: "Earn media coverage and manage your public reputation."
    },
    {
      icon: Calendar,
      title: "Event Marketing",
      description: "Create memorable experiences that generate leads and build brand loyalty."
    },
    {
      icon: Globe,
      title: "Account-Based Marketing (ABM)",
      description: "Target high-value accounts with personalized, multi-channel campaigns."
    }
  ];

  const marketingTools = [
    "Google Analytics", "HubSpot", "Salesforce", "Marketo",
    "Mailchimp", "SEMrush", "Ahrefs", "Google Ads",
    "Meta Business Suite", "Hootsuite", "Buffer", "Tableau",
    "Hotjar", "Optimizely", "Canva", "Adobe Creative Cloud"
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Measurable Growth",
      description: "Data-driven strategies that deliver trackable ROI and business impact."
    },
    {
      icon: Target,
      title: "Multi-Channel Expertise",
      description: "Integrated campaigns across SEO, paid media, social, email, and more."
    },
    {
      icon: Zap,
      title: "Agile Execution",
      description: "Rapid testing, iteration, and optimization for continuous improvement."
    },
    {
      icon: Award,
      title: "Industry Veterans",
      description: "Seasoned marketers with proven track records across B2B and B2C."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20 px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-mono">
              Marketing That <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">Drives Results</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-sans">
              From brand strategy to performance marketing, our expert marketers deliver measurable growth across every channel. Data-driven, creative, and laser-focused on your business goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup" className="inline-block">
                <div style={{ width: '200px' }}>
                  <PrimaryButton
                    width="200"
                    height="56"
                    wrapperClassName="primary-button-wrapper"
                    gradientId="paint0_linear_marketing_hero"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Categories Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-mono">
              Marketing Specializations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans">
              Access the complete spectrum of marketing expertise—from strategic leadership to tactical execution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketingCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 font-sans">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-6 font-sans">
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

      {/* Marketing Solutions Grid */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-mono">
              Marketing Solutions We Deliver
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans">
              Comprehensive services across every channel and stage of the customer journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {marketingSolutions.map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-sans">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-sans">
                    {solution.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Marketing Tools */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-mono">
              Best-in-Class Marketing Stack
            </h2>
            <p className="text-lg text-gray-600 font-sans">
              Our marketers leverage the industry's most powerful tools and platforms
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {marketingTools.map((tool, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-gradient-to-r from-orange-50 to-amber-50 text-gray-800 rounded-full font-medium text-sm border border-orange-200 hover:border-orange-400 hover:shadow-md transition-all font-sans"
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
              Why Choose Knacksters Marketing?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-sans">
              Partner with marketers who combine creativity with analytics to drive sustainable growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center mx-auto mb-6">
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-mono">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-xl text-gray-700 mb-8 font-sans">
            Connect with expert marketers who deliver measurable results across every channel and stage of the customer journey.
          </p>
          <Link href="/signup" className="inline-block">
            <div style={{ width: '200px' }} className="mx-auto">
              <PrimaryButton
                width="200"
                height="56"
                wrapperClassName="primary-button-wrapper"
                gradientId="paint0_linear_marketing_cta"
              />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

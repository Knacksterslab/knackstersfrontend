"use client";

import Link from "next/link";
import { 
  Brain, 
  Code, 
  Database, 
  Eye, 
  Shield, 
  Users, 
  Sparkles,
  Rocket,
  Target,
  Zap,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import KnackstersButton from "../svg/knacksters-button";

interface ServiceCategory {
  icon: React.ElementType;
  title: string;
  description: string;
  roles: string[];
  color: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    icon: Brain,
    title: "Core Research & Development",
    description: "Pushing the frontier of AI capabilities with cutting-edge research and innovative model development.",
    roles: [
      "AI Research Scientists (ML, Deep Learning, NLP, Computer Vision)",
      "AI Research Engineers",
      "Algorithm Development Specialists",
      "Model Architecture Designers"
    ],
    color: "from-purple-500 to-indigo-600"
  },
  {
    icon: Code,
    title: "Engineering & Development",
    description: "Building and scaling reliable AI systems from concept to production-ready solutions.",
    roles: [
      "Machine Learning Engineers",
      "MLOps Engineers",
      "AI/ML Software Engineers",
      "AI Infrastructure Engineers",
      "Robotics Software Engineers"
    ],
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: Database,
    title: "Data & Analytics",
    description: "Ensuring high-quality data pipelines and analytics that fuel your AI initiatives.",
    roles: [
      "Data Scientists",
      "Data Engineers",
      "AI Data Analysts",
      "Data Quality Specialists",
      "Data Labeling Managers"
    ],
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: Eye,
    title: "Applied AI & Domain Specialization",
    description: "Tailored AI solutions for specific industries and use cases that drive measurable results.",
    roles: [
      "NLP Engineers",
      "Computer Vision Engineers",
      "Speech/Audio AI Engineers",
      "AI Product Managers",
      "Domain-Specific AI Specialists (Finance, Healthcare, Legal)"
    ],
    color: "from-orange-500 to-red-600"
  },
  {
    icon: Shield,
    title: "Strategy, Ethics & Governance",
    description: "Responsible AI implementation with frameworks for fairness, compliance, and risk management.",
    roles: [
      "AI Ethicists & Responsible AI Leads",
      "AI Governance & Risk Specialists",
      "AI Compliance Officers",
      "AI Solutions Architects",
      "Prompt Engineers"
    ],
    color: "from-pink-500 to-rose-600"
  },
  {
    icon: Users,
    title: "Leadership & Strategic Roles",
    description: "Executive guidance to align AI initiatives with business objectives and drive transformation.",
    roles: [
      "Chief AI Officers (CAIO)",
      "Head of AI / Director of AI",
      "AI Strategy Consultants",
      "AI Transformation Leaders",
      "AI Innovation Advisors"
    ],
    color: "from-violet-500 to-purple-600"
  }
];

const useCases = [
  {
    icon: Sparkles,
    title: "Generative AI & LLMs",
    description: "Custom chatbots, content generation, code assistants, and intelligent automation powered by large language models."
  },
  {
    icon: Target,
    title: "Predictive Analytics",
    description: "Forecast trends, optimize operations, and make data-driven decisions with advanced predictive models."
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Image recognition, video analytics, quality inspection, and visual AI for manufacturing and retail."
  },
  {
    icon: Zap,
    title: "Process Automation",
    description: "Intelligent workflow automation, document processing, and robotic process automation (RPA) enhanced with AI."
  },
  {
    icon: Brain,
    title: "Recommendation Systems",
    description: "Personalized product recommendations, content curation, and customer experience optimization."
  },
  {
    icon: Shield,
    title: "AI Compliance & Security",
    description: "Ensure your AI systems meet regulatory requirements (GDPR, EU AI Act) and security standards."
  }
];

const benefits = [
  "End-to-end AI expertise from strategy to deployment",
  "Faster time-to-value with proven methodologies",
  "Scalable solutions that grow with your business",
  "Industry-leading talent across all AI disciplines",
  "Ethical AI practices and governance frameworks",
  "Flexible engagement models (project-based, team augmentation, fully managed)"
];

export default function AISolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4 sm:py-24 md:py-32 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Enterprise AI Solutions</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              Transform Your Business with
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Intelligent AI Solutions
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              From cutting-edge research to production-ready systems, we deliver comprehensive AI services that drive innovation, ensure compliance, and create competitive advantage.
            </p>
            
            <div className="flex justify-center">
              <Link href="/signup">
                <KnackstersButton 
                  text="Get Started"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              Comprehensive AI Expertise
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              Access specialized talent across every AI discipline to build, scale, and govern your intelligent systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                    {category.description}
                  </p>
                  
                  <div className="space-y-2">
                    {category.roles.slice(0, 3).map((role, roleIndex) => (
                      <div key={roleIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{role}</span>
                      </div>
                    ))}
                    {category.roles.length > 3 && (
                      <p className="text-xs text-gray-500 italic pl-6">
                        +{category.roles.length - 3} more specializations
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              AI Solutions for Every Challenge
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              Real-world applications that deliver measurable business impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-orange-500 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                    {useCase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
                Why Choose Knacksters for AI?
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                We're not just another AI vendor. We're your strategic partner in AI transformation, offering depth and breadth that few can match.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-orange-200/50">
                    <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <Rocket className="w-8 h-8 text-orange-500" />
                  <h3 className="text-2xl font-bold text-gray-900">Get Started Today</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Whether you need a single AI specialist or a complete team, we can scale to your needs. Start with a free consultation to explore how AI can transform your business.
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700">Free AI readiness assessment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700">Custom solution roadmap</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700">Flexible engagement models</span>
                  </li>
                </ul>

                <Link href="/signup" className="block">
                  <KnackstersButton 
                    text="Get Started"
                  />
                </Link>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -z-10 top-8 -right-8 w-full h-full bg-gradient-to-br from-orange-200 to-pink-200 rounded-2xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
            Ready to Unlock AI's Potential?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
            Join forward-thinking companies leveraging AI to innovate faster, operate smarter, and compete better.
          </p>
          
          <div className="flex justify-center">
            <Link href="/signup">
              <KnackstersButton 
                text="Get Started"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

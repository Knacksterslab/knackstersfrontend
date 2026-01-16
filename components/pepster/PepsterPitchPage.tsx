"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Heart, 
  MapPin, 
  Users, 
  Calendar,
  Store,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Target,
  Shield,
  BarChart3,
  Megaphone,
  Smartphone,
  ArrowRight,
  DollarSign,
  Clock,
  MessageCircle
} from "lucide-react";
import KnackstersButton from "../svg/knacksters-button";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const daterFeatures: Feature[] = [
  {
    icon: Calendar,
    title: "Curated Experiences",
    description: "Browse activities at partner venues within a 25-mile radius. Match with others interested in the same experience.",
    color: "from-[#FF6B35] to-[#F7931E]"
  },
  {
    icon: MessageCircle,
    title: "No Ghosting, No Waiting Games",
    description: "Once you send a date invite, they have 24 HOURS TO RESPOND. If they don't, the invite expires. Once accepted, PEPSTER HANDLES THE CHAT.",
    color: "from-[#F7931E] to-[#FFC837]"
  },
  {
    icon: MapPin,
    title: "Smart Geolocation",
    description: "Google-powered location matching ensures you connect with nearby dates for convenient meetups.",
    color: "from-[#0f3460] to-[#16213e]"
  },
  {
    icon: Shield,
    title: "Face Verification & Safety",
    description: "Every user goes through FACE VERIFICATION, and dates happen at VETTED LOCATIONS where hosts follow safety protocols.",
    color: "from-[#533483] to-[#7952b3]"
  }
];

const hostBenefits: Feature[] = [
  {
    icon: Store,
    title: "Free Experience Hosting",
    description: "List your venue's experiences at zero cost. Integrate with existing systems or use Pepster's free tools.",
    color: "from-[#FF6B35] to-[#F7931E]"
  },
  {
    icon: Megaphone,
    title: "Targeted Marketing",
    description: "Free promotion through push notifications, email, and SMS to actively dating users in your area.",
    color: "from-[#533483] to-[#7952b3]"
  },
  {
    icon: BarChart3,
    title: "Data Insights",
    description: "Access anonymized demographic data for smarter event planning, retention strategies, and expansion.",
    color: "from-[#0f3460] to-[#16213e]"
  },
  {
    icon: TrendingUp,
    title: "76% Increase in Recurring Customers",
    description: "Hosts report significant boost in customer loyalty through memorable date experiences.",
    color: "from-[#F7931E] to-[#FFC837]"
  }
];

const stats = [
  { label: "Active Platform", value: "iOS App Store" },
  { label: "Pricing Model", value: "100% Free" },
  { label: "Match Radius", value: "25 Miles" },
  { label: "Customer Return Rate", value: "76%+" }
];

const valueProps = [
  "Eliminates endless swiping and ghosting",
  "Authentic connections through shared experiences",
  "Symbiotic ecosystem benefiting daters and businesses",
  "No subscription fees for users",
  "Free onboarding and tools for venue partners",
  "Face verification for safety and authenticity"
];

export default function PepsterPitchPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white py-20 px-4 sm:py-24 md:py-32 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FF6B35]/20 to-[#F7931E]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#FF6B35]/20 to-[#F7931E]/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-[#FF6B35]/50">
              <Heart className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-sm font-medium">Experiential Dating Platform</span>
            </div>
            
            {/* Pepster Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                <Image
                  src="/images/partners/1767319987780-pepsterapp-logo-removebg-preview.png"
                  alt="Pepster Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              <span className="block bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#FFC837] bg-clip-text text-transparent">
                Real Dates, Real Connections
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              Pepster transforms online dating by eliminating endless swiping and superficial chats. 
              Instead, we connect people through curated experiences at real venues, creating authentic 
              connections while driving business growth for our partners.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a 
                href="https://apps.apple.com/us/app/pepster-meet-date-people/id1552316077" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#FF6B35] font-semibold rounded-lg hover:bg-[#FFF5F2] transition-colors shadow-lg"
              >
                <Smartphone className="w-5 h-5" />
                Download on App Store
              </a>
              <a 
                href="https://www.trypepster.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                <ArrowRight className="w-5 h-5" />
                Visit Website
              </a>
            </div>
            
            {/* Key Features Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <div className="bg-white/10 backdrop-blur-sm border border-[#FF6B35]/50 rounded-xl p-4 hover:bg-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[#FF6B35]" />
                  <div>
                    <div className="text-lg font-bold text-white">24-Hour Response</div>
                    <div className="text-sm text-white/80">No more ghosting</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-[#F7931E]/50 rounded-xl p-4 hover:bg-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#F7931E]" />
                  <div>
                    <div className="text-lg font-bold text-white">Face Verified</div>
                    <div className="text-sm text-white/80">Authentic connections</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-[#FFC837]/50 rounded-xl p-4 hover:bg-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-[#FFC837]" />
                  <div>
                    <div className="text-lg font-bold text-white">Vetted Venues</div>
                    <div className="text-sm text-white/80">Safe date locations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Banner */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#0f3460] to-[#16213e] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#FF6B35] mb-2">100%</div>
              <div className="text-sm text-gray-300">Free to Use</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#F7931E] mb-2">24hrs</div>
              <div className="text-sm text-gray-300">Response Window</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FFC837] mb-2">25mi</div>
              <div className="text-sm text-gray-300">Match Radius</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">76%+</div>
              <div className="text-sm text-gray-300">Host Repeat Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              Mission & Vision
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] mx-auto mb-6"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#FFF5F2] to-white rounded-2xl p-8 md:p-12 border-2 border-[#FF6B35]/30">
              <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                Creating a "Dating Club" Experience
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                Traditional dating apps lead to frustration through miscommunication, texting anxiety, and lack of genuine intent. 
                Pepster revolutionizes this by emphasizing in-person dates centered around curated experiences.
              </p>
              
              <div className="space-y-4">
                {[
                  "Connections built through actions, not endless messaging",
                  "Authentic interactions at real venues (dining, events, activities)",
                  "Clear intent with direct date proposals",
                  "Mutual benefits: meaningful dates for users, loyal customers for venues"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-white rounded-lg border-2 border-[#FF6B35]">
                <p className="text-xl font-bold text-[#FF6B35] mb-2">Our Vision</p>
                <p className="text-gray-700">
                  Become the go-to platform for experiential dating worldwide, starting with urban markets in Nigeria 
                  and expanding globally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works with App Preview */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: App Mockup */}
            <div className="relative">
              <div className="relative z-10">
                {/* Phone Frame Mockup */}
                <div className="mx-auto max-w-sm">
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden">
                      {/* Phone Notch */}
                      <div className="bg-black h-7 rounded-b-3xl mx-auto w-40"></div>
                      
                      {/* App Content Area */}
                      <div className="bg-gradient-to-br from-[#FFF5F2] to-white p-6 h-[600px] flex flex-col items-center justify-center">
                        <div className="text-center space-y-6">
                          <div className="w-24 h-24 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-full mx-auto flex items-center justify-center animate-pulse">
                            <Heart className="w-12 h-12 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">Choose Experience</h3>
                          <p className="text-gray-600">Match with someone who chose the same date spot</p>
                          
                          {/* Action Buttons Preview */}
                          <div className="space-y-3 pt-8">
                            <div className="flex items-center gap-3 bg-red-50 border-2 border-red-200 rounded-xl p-3">
                              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">✕</span>
                              </div>
                              <span className="text-sm font-semibold text-gray-800">DELETE</span>
                            </div>
                            <div className="flex items-center gap-3 bg-orange-50 border-2 border-orange-200 rounded-xl p-3">
                              <div className="w-10 h-10 bg-[#FFB84D] rounded-full flex items-center justify-center flex-shrink-0">
                                <DollarSign className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-sm font-semibold text-gray-800">TREAT</span>
                            </div>
                            <div className="flex items-center gap-3 bg-green-50 border-2 border-green-200 rounded-xl p-3">
                              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Heart className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-sm font-semibold text-gray-800">DUTCH</span>
                            </div>
                            <div className="flex items-center gap-3 bg-blue-50 border-2 border-blue-200 rounded-xl p-3">
                              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-sm font-semibold text-gray-800">SPONSOR</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/10 to-[#F7931E]/10 rounded-3xl -z-10 transform rotate-3"></div>
            </div>

            {/* Right: How It Works */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
                How It Works
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] mb-8"></div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Choose A Date Spot</h3>
                    <p className="text-gray-600 leading-relaxed">Pick a venue from our curated list of experiences in your area.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#F7931E] to-[#FFC837] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Match With Someone</h3>
                    <p className="text-gray-600 leading-relaxed">See who else chose the same experience and decide if you want to connect.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#0f3460] to-[#16213e] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Set The Tone</h3>
                    <p className="text-gray-600 leading-relaxed">Choose DELETE, TREAT, DUTCH, or SPONSOR - no confusion, just clarity.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#533483] to-[#7952b3] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Meet In Person</h3>
                    <p className="text-gray-600 leading-relaxed">Once confirmed, your date is scheduled. Pepster handles the chat and confirms all details.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Decide What's Next</h3>
                    <p className="text-gray-600 leading-relaxed">After the date, BOTH must agree to stay in touch. You'll also rate your date and the venue.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dater Features */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-gradient-to-br from-[#FFF5F2] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              For Daters
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              Skip the superficial swipes and endless chats. Meet real people through shared experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {daterFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#FF6B35] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Date Proposal Options - Updated with DELETE and matching Pepster's design */}
          <div className="mt-12 bg-gradient-to-r from-[#FF6B35] via-[#FF8C5C] to-[#F7931E] rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">"Shoot Your Shot" in One Click</h3>
            <p className="text-center mb-8 text-white/90 text-lg">Actions speak louder than words - choose your payment option upfront</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* DELETE */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 hover:bg-white/30 transition-all group">
                <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl font-bold">✕</span>
                </div>
                <h4 className="text-xl font-bold mb-3">DELETE</h4>
                <p className="text-white/90 text-sm leading-relaxed">You already know, keep it moving.</p>
              </div>
              
              {/* TREAT */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 hover:bg-white/30 transition-all group">
                <div className="w-14 h-14 bg-[#FFB84D] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3">TREAT</h4>
                <p className="text-white/90 text-sm leading-relaxed">You like them so much, you are willing to foot all the bills for your date.</p>
              </div>
              
              {/* DUTCH */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 hover:bg-white/30 transition-all group">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3">DUTCH</h4>
                <p className="text-white/90 text-sm leading-relaxed">You ask them out but everyone knows they gotta pay their fair share.</p>
              </div>
              
              {/* SPONSOR */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 hover:bg-white/30 transition-all group">
                <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3">SPONSOR</h4>
                <p className="text-white/90 text-sm leading-relaxed">You are asking them out but they pay the cost of the date if they are interested.</p>
              </div>
            </div>
            
            {/* Additional tagline */}
            <div className="mt-8 text-center">
              <p className="text-xl md:text-2xl font-bold italic">"Remember actions speak louder than words?"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Host Benefits */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              For Business Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              Transform your venue into a dating destination. Free onboarding, powerful marketing, and data insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {hostBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-[#F7931E] hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Host Types */}
          <div className="bg-gradient-to-br from-[#FFF5F2] to-white rounded-2xl p-8 border-2 border-[#FF6B35]/30">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Perfect for These Venues</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Restaurants", "Cafés & Bars", "Event Spaces", "Gyms", "Museums", "Entertainment Venues", "Shops & Retail", "Activity Centers"].map((venue, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center border-2 border-[#FF6B35]/20 hover:border-[#FF6B35] transition-colors">
                  <p className="font-semibold text-gray-800">{venue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              Business Model
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              A B2B2C ecosystem designed for sustainable growth
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-[#FF6B35]/30">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Users className="w-8 h-8 text-[#FF6B35]" />
                User Side
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">100% free to download and use</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">No subscriptions or in-app purchases</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Low barriers to entry for rapid adoption</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-[#533483]/30">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Store className="w-8 h-8 text-[#533483]" />
                Host Side
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Free onboarding and tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Premium analytics and marketing add-ons</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Featured experience advertising slots</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-2xl p-8 border-2 border-[#F7931E]/30">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Value Proposition</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {valueProps.map((prop, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#F7931E] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{prop}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              Target Audience
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#FFF5F2] to-white rounded-2xl p-8 border-2 border-[#FF6B35]/30">
              <Target className="w-12 h-12 text-[#FF6B35] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Daters</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Adults (18+) in urban areas frustrated with traditional apps, seeking immediate, 
                low-pressure real-life connections without the emotional drain of texting.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF6B35] rounded-full"></div>
                  <span className="text-gray-700">Young professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF6B35] rounded-full"></div>
                  <span className="text-gray-700">Millennials & Gen Z</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF6B35] rounded-full"></div>
                  <span className="text-gray-700">Experience-focused individuals</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#F7F7FF] to-white rounded-2xl p-8 border-2 border-[#533483]/30">
              <Store className="w-12 h-12 text-[#533483] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hosts</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Small to medium-sized businesses in hospitality, retail, and entertainment seeking 
                innovative ways to boost foot traffic and customer loyalty.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#533483] rounded-full"></div>
                  <span className="text-gray-700">Cafes, bars & restaurants</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#533483] rounded-full"></div>
                  <span className="text-gray-700">Gyms & fitness centers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#533483] rounded-full"></div>
                  <span className="text-gray-700">Museums & entertainment venues</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            Pepster is proudly supported by Knacksters
          </p>
        </div>
      </section>
    </div>
  );
}

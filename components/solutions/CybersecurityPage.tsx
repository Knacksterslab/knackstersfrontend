"use client";

import Link from "next/link";
import { 
  Shield, 
  Lock, 
  Eye, 
  FileCheck, 
  Server, 
  Users,
  AlertTriangle,
  Search,
  Bug,
  Network,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Target
} from "lucide-react";
import KnackstersButton from "../svg/knacksters-button";

interface SecurityCategory {
  icon: React.ElementType;
  title: string;
  description: string;
  roles: string[];
  color: string;
}

const securityCategories: SecurityCategory[] = [
  {
    icon: Shield,
    title: "Defensive Security (Blue Team)",
    description: "24/7 security operations defending against threats with real-time detection, incident response, and continuous monitoring.",
    roles: [
      "SOC Analysts (Tiers 1-3)",
      "Incident Responders",
      "Digital Forensics Analysts (DFIR)",
      "Threat Intelligence Analysts",
      "Threat Hunters",
      "Security Engineers (Defensive)",
      "Security Architects (Defensive)",
      "Vulnerability Management Analysts"
    ],
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: Bug,
    title: "Offensive Security (Red Team)",
    description: "Ethical hackers who simulate real-world attacks to identify vulnerabilities before malicious actors do.",
    roles: [
      "Penetration Testers (Web, Network, Mobile, Wireless, Physical)",
      "Red Team Operators",
      "Exploit Developers",
      "Security Researchers (Zero-day hunters)",
      "Social Engineering Consultants",
      "Business Email Compromise (BEC) Specialists"
    ],
    color: "from-red-500 to-orange-600"
  },
  {
    icon: Target,
    title: "Hybrid & Bridging Roles",
    description: "Bridge the gap between offensive and defensive security to maximize organizational resilience.",
    roles: [
      "Purple Team Engineers",
      "Security Consultants",
      "Security Assessment Specialists",
      "Security Automation Engineers (SOAR)",
      "Cybersecurity Architects"
    ],
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: FileCheck,
    title: "Governance, Risk & Compliance (GRC)",
    description: "Ensure regulatory compliance, manage risk, and implement robust security governance frameworks.",
    roles: [
      "GRC Analysts & Specialists",
      "Cybersecurity Auditors",
      "Risk Management Specialists",
      "Compliance Officers (GDPR, HIPAA, PCI-DSS, SOX)",
      "Third-Party Risk Management (TPRM) Analysts",
      "Policy & Standards Specialists"
    ],
    color: "from-emerald-500 to-green-600"
  },
  {
    icon: Server,
    title: "Security Engineering & Architecture",
    description: "Design and build secure systems from the ground up with defense-in-depth strategies.",
    roles: [
      "Security Engineers",
      "Security Architects",
      "Cloud Security Engineers/Architects (AWS, Azure, GCP)",
      "Application Security (AppSec) Engineers",
      "Product Security Engineers",
      "DevSecOps Engineers",
      "IAM Specialists/Engineers"
    ],
    color: "from-indigo-500 to-blue-600"
  },
  {
    icon: Lock,
    title: "Privacy & Data Protection",
    description: "Protect user privacy and ensure compliance with data protection regulations worldwide.",
    roles: [
      "Data Protection Officers (DPO)",
      "Privacy Officers",
      "Privacy Engineers",
      "Privacy Consultants",
      "Cryptographers"
    ],
    color: "from-teal-500 to-cyan-600"
  },
  {
    icon: Users,
    title: "Security Leadership & Management",
    description: "Executive leadership to drive security strategy, program management, and organizational transformation.",
    roles: [
      "Chief Information Security Officers (CISO)",
      "Chief Security Officers (CSO)",
      "VP of Security / Head of Security",
      "Security Directors",
      "Security Managers (SOC, AppSec, etc.)",
      "Cyber Threat Intelligence (CTI) Directors"
    ],
    color: "from-violet-500 to-purple-600"
  },
  {
    icon: Network,
    title: "Specialized & Emerging Security",
    description: "Cutting-edge expertise for specialized domains including critical infrastructure and emerging technologies.",
    roles: [
      "ICS/OT Security Specialists (Critical Infrastructure)",
      "IoT Security Specialists",
      "Cloud-Native Security Engineers",
      "Blockchain/Web3 Security Specialists",
      "AI/ML Security Specialists",
      "Security Solutions Architects (Pre-Sales)"
    ],
    color: "from-orange-500 to-red-600"
  }
];

const securitySolutions = [
  {
    icon: ShieldCheck,
    title: "Security Operations Center (SOC)",
    description: "Build or augment your SOC with expert analysts for 24/7 monitoring, detection, and incident response."
  },
  {
    icon: Bug,
    title: "Penetration Testing & Red Team",
    description: "Comprehensive testing including web/mobile/network pentests, red team operations, and social engineering assessments."
  },
  {
    icon: AlertTriangle,
    title: "Business Email Compromise (BEC) Defense",
    description: "Protect against email fraud, phishing, and impersonation attacks with detection and employee training."
  },
  {
    icon: FileCheck,
    title: "Security Audits & Compliance",
    description: "Meet regulatory requirements (SOC 2, ISO 27001, GDPR, HIPAA, PCI-DSS) with thorough assessments."
  },
  {
    icon: Search,
    title: "Threat Hunting & Intelligence",
    description: "Proactive threat hunting and intelligence gathering to identify advanced persistent threats (APTs)."
  },
  {
    icon: Lock,
    title: "Digital Forensics & Incident Response",
    description: "Expert DFIR services for rapid incident investigation, containment, eradication, and recovery."
  },
  {
    icon: Network,
    title: "Cloud Security & Architecture",
    description: "Secure your cloud infrastructure with best practices for AWS, Azure, and GCP environments."
  },
  {
    icon: Eye,
    title: "Security Awareness & Training",
    description: "Build security culture with social engineering simulations and comprehensive employee training."
  },
  {
    icon: Target,
    title: "Privacy & Data Protection",
    description: "Ensure GDPR, CCPA compliance with privacy impact assessments and data protection controls."
  },
  {
    icon: Users,
    title: "Third-Party Risk Management",
    description: "Assess and continuously monitor cybersecurity risks from vendors and supply chain partners."
  },
  {
    icon: Server,
    title: "OT/ICS Security",
    description: "Secure critical infrastructure, industrial control systems, and operational technology environments."
  },
  {
    icon: Zap,
    title: "Security Automation & SOAR",
    description: "Automate security operations with orchestration, automation, and response platforms."
  }
];

const benefits = [
  "Access to elite security professionals across all disciplines",
  "Flexible engagement models (project, augmentation, fully managed)",
  "Rapid deployment to address immediate security needs",
  "Proven methodologies aligned with industry frameworks (NIST, CIS, MITRE)",
  "Cost-effective alternative to building in-house security teams",
  "24/7 coverage for continuous security operations"
];

const complianceFrameworks = [
  "SOC 2 Type I & II",
  "ISO 27001",
  "GDPR",
  "HIPAA",
  "PCI DSS",
  "NIST CSF",
  "CIS Controls",
  "CMMC"
];

export default function CybersecurityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white py-20 px-4 sm:py-24 md:py-32 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Shield className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium">Enterprise Cybersecurity Solutions</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              Protect Your Business from
              <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Evolving Cyber Threats
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              From Blue Team defense to Red Team offense, GRC compliance to privacy protection—we deliver end-to-end cybersecurity expertise across every domain to safeguard your business against evolving threats.
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

      {/* Security Categories */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              Comprehensive Security Expertise
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              Access specialized security professionals across every domain to build, operate, and optimize your security program
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityCategories.map((category, index) => {
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

      {/* Security Solutions */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              Security Solutions That Protect
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              Proven security services that address your most critical challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securitySolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-red-500 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                    {solution.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance & Frameworks */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              Compliance & Industry Standards
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              We help you meet and exceed regulatory requirements across industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {complianceFrameworks.map((framework, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-red-200/50 text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <FileCheck className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <span className="text-gray-800 font-semibold text-sm">{framework}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <ShieldCheck className="w-10 h-10 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Compliance Made Simple</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our compliance specialists guide you through complex regulatory requirements, conduct thorough assessments, and implement controls to ensure ongoing compliance and successful audits.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Gap assessment & remediation</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Policy & procedure development</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Audit preparation & support</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Continuous compliance monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
                Why Choose Knacksters for Cybersecurity?
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                Security threats evolve daily. Partner with experts who stay ahead of the curve and protect what matters most.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 shadow-2xl border border-red-200">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold text-gray-900">Get Started Today</h3>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Don't wait for a security incident to take action. Start building your security program with expert guidance and proven methodologies.
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700">Free security assessment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700">Custom security roadmap</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700">Rapid team deployment</span>
                  </li>
                </ul>

                <Link href="/signup" className="block">
                  <KnackstersButton 
                    text="Get Started"
                  />
                </Link>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -z-10 top-8 -right-8 w-full h-full bg-gradient-to-br from-red-200 to-orange-200 rounded-2xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
            Secure Your Future Today
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
            Join organizations that trust Knacksters to protect their most valuable assets and maintain regulatory compliance.
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

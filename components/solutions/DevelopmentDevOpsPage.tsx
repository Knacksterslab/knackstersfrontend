"use client";

import Link from "next/link";
import { 
  Code, 
  Server, 
  TabletSmartphone, 
  Cloud, 
  Layers, 
  Users,
  Rocket,
  GitBranch,
  Container,
  Monitor,
  Database,
  CheckCircle2,
  ArrowRight,
  Zap,
  Target,
  Settings,
  Glasses
} from "lucide-react";
import KnackstersButton from "../svg/knacksters-button";

interface DevelopmentCategory {
  icon: React.ElementType;
  title: string;
  description: string;
  roles: string[];
  color: string;
}

const developmentCategories: DevelopmentCategory[] = [
  {
    icon: Code,
    title: "Frontend Development",
    description: "Build stunning, responsive user interfaces with modern frameworks and best practices.",
    roles: [
      "Frontend Engineers/Developers (React, Angular, Vue.js)",
      "UI Engineers",
      "JavaScript/TypeScript Specialists",
      "Web Performance Engineers",
      "Micro-Frontend Architects"
    ],
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Robust server-side logic, APIs, and data management powering your applications.",
    roles: [
      "Backend Engineers/Developers (Java, Python, Go, Node.js, C#)",
      "API Engineers (REST, GraphQL, gRPC)",
      "Microservices Architects",
      "Integration Engineers",
      "Backend Performance Engineers"
    ],
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: Layers,
    title: "Full-Stack Development",
    description: "End-to-end development expertise across the entire application stack.",
    roles: [
      "Full-Stack Engineers/Developers",
      "MEAN/MERN Stack Developers",
      "Jamstack Developers",
      "T-Shaped Engineers",
      "Product Engineers"
    ],
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: TabletSmartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    roles: [
      "iOS Developers (Swift, Objective-C)",
      "Android Developers (Kotlin, Java)",
      "React Native Developers",
      "Flutter Developers",
      "Mobile DevOps Engineers"
    ],
    color: "from-orange-500 to-red-600"
  },
  {
    icon: Glasses,
    title: "AR/VR Development",
    description: "Immersive experiences for augmented and virtual reality platforms.",
    roles: [
      "Unity Developers (C#)",
      "Unreal Engine Developers (C++, Blueprints)",
      "3D Graphics Engineers",
      "AR/VR Software Engineers",
      "Computer Vision Engineers (AR Tracking)",
      "Spatial Computing Developers",
      "WebXR Developers"
    ],
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    icon: Container,
    title: "DevOps & CI/CD",
    description: "Automate delivery pipelines and foster collaboration between development and operations.",
    roles: [
      "DevOps Engineers",
      "CI/CD Pipeline Engineers",
      "Build/Release Engineers",
      "Infrastructure as Code (IaC) Specialists",
      "Configuration Management Engineers"
    ],
    color: "from-indigo-500 to-blue-600"
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description: "Design, deploy, and manage scalable cloud-native infrastructure and services.",
    roles: [
      "Cloud Engineers (AWS, Azure, GCP)",
      "Cloud Architects",
      "Infrastructure Engineers",
      "Kubernetes/Container Specialists",
      "Cloud Migration Engineers"
    ],
    color: "from-cyan-500 to-blue-600"
  },
  {
    icon: Monitor,
    title: "Site Reliability Engineering (SRE)",
    description: "Ensure applications run reliably at scale with software-driven operational excellence.",
    roles: [
      "Site Reliability Engineers (SRE)",
      "Production Engineers",
      "Chaos Engineers",
      "Observability Engineers",
      "Performance Engineers"
    ],
    color: "from-teal-500 to-green-600"
  },
  {
    icon: GitBranch,
    title: "Platform Engineering",
    description: "Build internal developer platforms that empower teams to ship faster with confidence.",
    roles: [
      "Platform Engineers",
      "Developer Experience (DevEx) Engineers",
      "Internal Tools Developers",
      "Platform Architects",
      "Self-Service Platform Builders"
    ],
    color: "from-violet-500 to-purple-600"
  },
  {
    icon: Database,
    title: "Specialized Development",
    description: "Expert developers for niche domains and emerging technologies.",
    roles: [
      "Embedded Systems Engineers",
      "Firmware Developers (C, C++, Rust)",
      "Game Developers (Unity, Unreal Engine)",
      "Desktop Application Developers",
      "IoT Engineers",
      "Low-Code/No-Code Platform Developers"
    ],
    color: "from-rose-500 to-pink-600"
  },
  {
    icon: Users,
    title: "Engineering Leadership",
    description: "Technical leadership to guide teams, architecture, and engineering strategy.",
    roles: [
      "Engineering Managers",
      "Technical Leads / Team Leads",
      "Software/Systems Architects",
      "Solutions Architects",
      "Director/VP of Engineering",
      "Chief Technology Officer (CTO)"
    ],
    color: "from-gray-700 to-gray-900"
  }
];

const solutions = [
  {
    icon: Rocket,
    title: "Cloud-First Applications",
    description: "Build modern, scalable applications designed for cloud platforms from day one."
  },
  {
    icon: TabletSmartphone,
    title: "Mobile Applications",
    description: "Native iOS/Android apps or cross-platform solutions with React Native and Flutter."
  },
  {
    icon: Glasses,
    title: "AR/VR Experiences",
    description: "Immersive augmented and virtual reality applications for training, gaming, and visualization."
  },
  {
    icon: Server,
    title: "Enterprise Software",
    description: "Mission-critical enterprise applications with robust architecture and security."
  },
  {
    icon: Database,
    title: "Microservices & APIs",
    description: "Scalable microservices architectures with well-designed RESTful and GraphQL APIs."
  },
  {
    icon: Container,
    title: "Containerization & Orchestration",
    description: "Docker, Kubernetes, and cloud-native deployments for modern infrastructure."
  },
  {
    icon: GitBranch,
    title: "CI/CD Pipeline Development",
    description: "Automated build, test, and deployment pipelines for continuous delivery."
  },
  {
    icon: Cloud,
    title: "Cloud Migration & Modernization",
    description: "Migrate legacy systems to cloud platforms with minimal disruption."
  },
  {
    icon: Settings,
    title: "IoT & Edge Computing",
    description: "Connected devices and edge applications for smart infrastructure."
  },
  {
    icon: Zap,
    title: "Digital Commerce",
    description: "E-commerce platforms and payment integrations for seamless transactions."
  },
  {
    icon: Target,
    title: "Workflow Management",
    description: "Custom workflow automation and business process management systems."
  },
  {
    icon: Monitor,
    title: "Observability & Monitoring",
    description: "Comprehensive monitoring, logging, and alerting with Prometheus, Grafana, ELK."
  },
  {
    icon: Database,
    title: "Finance & Payments",
    description: "Secure, compliant applications for financial services and payment processing."
  }
];

const benefits = [
  "Elite engineers across all specializations and tech stacks",
  "Flexible engagement models: project-based, team augmentation, or fully managed",
  "Modern development practices: Agile, DevOps, CI/CD, IaC",
  "Cloud-native expertise across AWS, Azure, and GCP",
  "Proven track record with scalable, reliable systems",
  "Rapid team deployment to meet urgent deadlines"
];

const techStacks = [
  "React, Angular, Vue.js",
  "Node.js, Python, Java, Go, C#",
  "AWS, Azure, GCP",
  "Docker, Kubernetes",
  "React Native, Flutter",
  "Unity, Unreal Engine, WebXR",
  "PostgreSQL, MongoDB, Redis",
  "Terraform, Ansible",
  "Jenkins, GitLab CI, GitHub Actions"
];

export default function DevelopmentDevOpsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20 px-4 sm:py-24 md:py-32 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Code className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium">Software Development & DevOps</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              Build, Ship, and Scale with
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                World-Class Engineering Talent
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              From frontend to backend, mobile to cloud-native infrastructure—access elite software engineers, DevOps specialists, SREs, and platform engineers who build reliable, scalable systems that drive your business forward.
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

      {/* Development Categories */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              Comprehensive Development Expertise
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              Access specialized talent across every layer of modern software development and operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {developmentCategories.map((category, index) => {
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

      {/* Solutions */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              Solutions We Build
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              Modern applications and infrastructure for every business need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-blue-500 mb-4" />
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

      {/* Tech Stack */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
              Technologies We Master
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
              Expertise across modern development tools, frameworks, and platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {techStacks.map((tech, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <Code className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <span className="text-gray-800 font-semibold text-sm">{tech}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <Settings className="w-10 h-10 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Modern Development Practices</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our teams follow industry best practices including Agile methodologies, continuous integration/deployment (CI/CD), infrastructure as code (IaC), and comprehensive testing strategies.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Agile/Scrum methodologies</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Test-driven development (TDD)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Infrastructure as Code (IaC)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Continuous monitoring & observability</span>
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
                Why Choose Knacksters?
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                Get the engineering talent you need, when you need it, without the overhead of traditional hiring.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-2xl border border-blue-200">
                <div className="flex items-center gap-3 mb-6">
                  <Rocket className="w-8 h-8 text-blue-500" />
                  <h3 className="text-2xl font-bold text-gray-900">Get Started Today</h3>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Whether you need a single specialist or an entire team, we can scale to your needs. Start with a free consultation to discuss your project.
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">Free technical consultation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">Custom team composition</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">Rapid onboarding & deployment</span>
                  </li>
                </ul>

                <Link href="/signup" className="block">
                  <KnackstersButton 
                    text="Get Started"
                  />
                </Link>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -z-10 top-8 -right-8 w-full h-full bg-gradient-to-br from-blue-200 to-cyan-200 rounded-2xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:py-20 md:py-24 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-mono), "Space Mono", monospace' }}>
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
            Join innovative companies that trust Knacksters to deliver world-class software engineering and DevOps expertise.
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

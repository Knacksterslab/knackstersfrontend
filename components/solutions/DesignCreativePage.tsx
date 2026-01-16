"use client";

import Link from "next/link";
import { 
  Lightbulb, 
  Users, 
  LayoutGrid, 
  Palette, 
  Rocket, 
  Layers,
  Search,
  Map,
  Sparkles,
  Eye,
  Type,
  Shapes,
  Film,
  Pen,
  Box,
  CheckCircle2,
  ArrowRight,
  Zap,
  Target,
  Heart
} from "lucide-react";
import PrimaryButton from "../svg/primary-button";

export default function DesignCreativePage() {
  const designCategories = [
    {
      icon: Lightbulb,
      title: "Strategy, Innovation & Research",
      description: "Understanding context, human behavior, and defining opportunity spaces.",
      roles: [
        "Design Strategist / Innovation Strategist",
        "UX Researcher (User Researcher)",
        "Service Designer",
        "Design Thinking Facilitator",
        "Human Factors Engineer / Ergonomist"
      ],
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Users,
      title: "User Experience (UX) Design",
      description: "Crafting the structure, flow, and logic of seamless interactions.",
      roles: [
        "UX Designer (User Experience Designer)",
        "Information Architect (IA)",
        "Interaction Designer (IxD)",
        "UX Writer / Content Strategist"
      ],
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Palette,
      title: "User Interface (UI) & Visual Design",
      description: "Creating beautiful, on-brand visual experiences that captivate users.",
      roles: [
        "UI Designer (User Interface Designer)",
        "Visual Designer",
        "Brand Designer / Identity Designer",
        "Motion Designer",
        "Digital Illustrator"
      ],
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: Rocket,
      title: "Product Design & Leadership",
      description: "Bridging design, business, and technology to ship exceptional products.",
      roles: [
        "Product Designer",
        "Senior / Staff Product Designer",
        "Design Director / Head of Design",
        "Chief Design Officer (CDO) / VP of Design"
      ],
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Sparkles,
      title: "Specialized & Emerging",
      description: "Cutting-edge design for design systems, AR/VR, accessibility, and more.",
      roles: [
        "Design Systems Designer / Architect",
        "UX/UI Developer (Design Technologist)",
        "AR/VR / Immersive Experience Designer",
        "Accessibility Specialist / Inclusive Designer",
        "Design Ops (Design Operations)",
        "Game UX/UI Designer"
      ],
      color: "from-teal-500 to-green-600"
    },
    {
      icon: Layers,
      title: "Cross-Functional Collaboration",
      description: "Roles that work hand-in-hand with designers to bring visions to life.",
      roles: [
        "Product Manager (Design-Focused)",
        "Frontend Developer (UI-Focused)",
        "Creative Director",
        "Brand Strategist"
      ],
      color: "from-indigo-500 to-purple-600"
    }
  ];

  const designSolutions = [
    {
      icon: Search,
      title: "User Research & Testing",
      description: "Uncover deep insights through qualitative and quantitative research methods."
    },
    {
      icon: Map,
      title: "User Journey Mapping",
      description: "Visualize end-to-end experiences and identify optimization opportunities."
    },
    {
      icon: LayoutGrid,
      title: "Wireframing & Prototyping",
      description: "Rapidly iterate on ideas with low and high-fidelity prototypes."
    },
    {
      icon: Eye,
      title: "Visual Design & Branding",
      description: "Create stunning visual identities that resonate with your audience."
    },
    {
      icon: Film,
      title: "Motion Graphics & Animation",
      description: "Bring interfaces to life with engaging animations and micro-interactions."
    },
    {
      icon: Type,
      title: "Design Systems",
      description: "Build scalable, consistent component libraries for enterprise products."
    },
    {
      icon: Shapes,
      title: "UI/UX Design",
      description: "Design intuitive, beautiful interfaces that users love to interact with."
    },
    {
      icon: Pen,
      title: "Custom Illustrations",
      description: "Create unique, branded visual assets that tell your story."
    },
    {
      icon: Box,
      title: "3D & Spatial Design",
      description: "Craft immersive AR/VR experiences for the next generation of products."
    },
    {
      icon: Heart,
      title: "Accessibility Audits",
      description: "Ensure your products are inclusive and meet WCAG compliance standards."
    },
    {
      icon: Rocket,
      title: "Product Design",
      description: "End-to-end product ownership from concept to launch and beyond."
    },
    {
      icon: Target,
      title: "Design Strategy",
      description: "Align design decisions with business goals and user needs."
    }
  ];

  const designTools = [
    "Figma", "Sketch", "Adobe XD", "Adobe Creative Suite",
    "Framer", "Principle", "After Effects", "Blender",
    "InVision", "Miro", "FigJam", "Maze", "UserTesting"
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Rapid Iteration",
      description: "Move from concept to high-fidelity prototype in days, not weeks."
    },
    {
      icon: Users,
      title: "User-Centered Approach",
      description: "Every design decision is backed by research and user insights."
    },
    {
      icon: Target,
      title: "Business Impact",
      description: "Design that drives measurable outcomes—engagement, conversion, retention."
    },
    {
      icon: CheckCircle2,
      title: "Proven Process",
      description: "Battle-tested design thinking frameworks and agile methodologies."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20 px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-mono">
              Design & Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-sans">
              Transform your brand with world-class designers who blend creativity, strategy, and user empathy. From research to visual design, we craft experiences that delight users and drive business results.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup" className="inline-block">
                <div style={{ width: '200px' }}>
                  <PrimaryButton
                    width="200"
                    height="56"
                    wrapperClassName="primary-button-wrapper"
                    gradientId="paint0_linear_design_hero"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Design Categories Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-mono">
              Design Specializations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans">
              Access the full spectrum of design expertise—from strategic innovation to pixel-perfect execution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-pink-300 hover:shadow-xl transition-all duration-300"
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
                        <CheckCircle2 className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
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

      {/* Design Solutions Grid */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-mono">
              Design Solutions We Deliver
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans">
              From strategy to execution, we cover every aspect of the design process
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {designSolutions.map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-pink-300 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-pink-600" />
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

      {/* Design Tools */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-mono">
              Industry-Leading Tools
            </h2>
            <p className="text-lg text-gray-600 font-sans">
              Our designers are experts in the tools that power modern design
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {designTools.map((tool, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-gradient-to-r from-pink-50 to-purple-50 text-gray-800 rounded-full font-medium text-sm border border-pink-200 hover:border-pink-400 hover:shadow-md transition-all font-sans"
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
              Why Choose Knacksters Design?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-sans">
              Partner with designers who understand both the art and science of great experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
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
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-mono">
            Ready to Transform Your User Experience?
          </h2>
          <p className="text-xl text-gray-700 mb-8 font-sans">
            Connect with world-class designers who bring creativity, strategy, and user empathy to every project.
          </p>
          <Link href="/signup" className="inline-block">
            <div style={{ width: '200px' }} className="mx-auto">
              <PrimaryButton
                width="200"
                height="56"
                wrapperClassName="primary-button-wrapper"
                gradientId="paint0_linear_design_cta"
              />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

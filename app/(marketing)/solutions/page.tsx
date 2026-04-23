import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/svg/primary-button";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Solutions - Knacksters",
  description:
    "Explore Knacksters' full range of on-demand professional solutions — AI, cybersecurity, software development, design, growth marketing, customer success, and healthcare.",
  keywords: [
    "on-demand talent", "AI solutions", "cybersecurity", "software development",
    "design creative", "growth marketing", "customer success", "healthcare staffing",
    "cloud workforce", "Knacksters"
  ],
  alternates: { canonical: "https://www.knacksters.co/solutions" },
  openGraph: {
    title: "Solutions - Knacksters",
    description: "Access expert talent across every domain — from AI and cybersecurity to growth marketing and customer success.",
    url: "https://www.knacksters.co/solutions",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630, alt: "Knacksters Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions - Knacksters",
    description: "Access expert talent across every domain — from AI and cybersecurity to growth marketing and customer success.",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Knacksters Solution Domains",
  description: "Pre-vetted on-demand professionals across six specialised domains.",
  url: "https://www.knacksters.co/solutions",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AI Solutions", url: "https://www.knacksters.co/solutions/ai-solutions" },
    { "@type": "ListItem", position: 2, name: "Cybersecurity", url: "https://www.knacksters.co/solutions/cybersecurity" },
    { "@type": "ListItem", position: 3, name: "Development & DevOps", url: "https://www.knacksters.co/solutions/development-devops" },
    { "@type": "ListItem", position: 4, name: "Design & Creative", url: "https://www.knacksters.co/solutions/design-creative" },
    { "@type": "ListItem", position: 5, name: "Growth & Customer Success", url: "https://www.knacksters.co/solutions/marketing" },
    { "@type": "ListItem", position: 6, name: "Healthcare & Life Sciences", url: "https://www.knacksters.co/solutions/healthcare-life-sciences" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.knacksters.co" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.knacksters.co/solutions" },
  ],
};

const solutions = [
  {
    emoji: "🤖",
    title: "AI Solutions",
    tagline: "Harness the Power of AI",
    description:
      "From strategy to implementation and compliance — our AI specialists help you adopt, optimize, and scale intelligent solutions tailored to your business.",
    href: "/solutions/ai-solutions",
    cta: "Transform with AI",
    accentColor: "#7C3AED",
    tags: ["Machine Learning", "LLM Integration", "AI Strategy", "Automation"],
  },
  {
    emoji: "🛡️",
    title: "Cybersecurity",
    tagline: "Secure Your Digital Assets",
    description:
      "Protect your business from evolving threats — from proactive defence and penetration testing to rapid incident response and compliance.",
    href: "/solutions/cybersecurity",
    cta: "Protect Your Business",
    accentColor: "#E9414C",
    tags: ["Pen Testing", "SOC", "Compliance", "Cloud Security"],
  },
  {
    emoji: "💻",
    title: "Development & DevOps",
    tagline: "Build with Confidence",
    description:
      "Transform ideas into reality with expert engineers and cloud architects. From frontend to backend, mobile to cloud-native — scalable and reliable.",
    href: "/solutions/development-devops",
    cta: "Build Smarter Today",
    accentColor: "#0EA5E9",
    tags: ["Full Stack", "DevOps", "Cloud", "Mobile"],
  },
  {
    emoji: "🎨",
    title: "Design & Creative",
    tagline: "Craft a Lasting Impression",
    description:
      "From brand identity to UX/UI and motion design — our creatives build digital experiences that delight users and reflect your vision.",
    href: "/solutions/design-creative",
    cta: "Design Your Future",
    accentColor: "#EC4899",
    tags: ["UX/UI", "Brand Identity", "Motion", "Product Design"],
  },
  {
    emoji: "🚀",
    title: "Growth & Customer Success",
    tagline: "Acquire. Retain. Grow.",
    description:
      "The full revenue flywheel in one domain — expert marketers who win customers and CSMs who keep and expand them.",
    href: "/solutions/marketing",
    cta: "Accelerate Growth",
    accentColor: "#FF9634",
    tags: ["Growth Marketing", "CSM", "SEO", "RevOps", "Retention"],
    isNew: true,
  },
  {
    emoji: "🏥",
    title: "Healthcare & Life Sciences",
    tagline: "Clinical Excellence at Scale",
    description:
      "Specialised talent for clinical trials, data management, and regulatory compliance — accelerating your programmes with vetted professionals.",
    href: "/solutions/healthcare-life-sciences",
    cta: "Discover Solutions",
    accentColor: "#10B981",
    tags: ["Clinical Trials", "Regulatory", "Biostatistics", "Data Management"],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbSchema} />
    <div className="min-h-screen">

      {/* Hero — matches brand: light bg, hero-bg.png, font-mono headline */}
      <section
        className="relative bg-[rgb(250,250,250)] bg-cover bg-center overflow-hidden py-16 sm:py-20 md:py-24 px-4"
        style={{ backgroundImage: "url(/hero-bg.png)", backgroundPosition: "center bottom" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h1
            className="m-0 leading-[1.15] font-mono font-normal text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.75rem] text-[rgb(38,38,38)] mb-4"
          >
            Every Skill Your Business Needs,{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #E9414C 0%, #FF9634 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              On Demand
            </span>
          </h1>

          <p className="mt-2 mb-0 leading-[1.57] font-normal font-sans text-[rgb(89,89,89)] text-base sm:text-lg md:text-xl text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            Access pre-vetted professionals across six specialised domains. Start with 50 free hours — no credit card needed.
          </p>

          <div className="mb-2 flex justify-center">
            <Link href="/signup" className="inline-block">
              <PrimaryButton
                width="256"
                height="56"
                wrapperClassName="hero-primary-button-wrapper"
                gradientId="paint0_linear_solutions_hero"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar — dark, matches SolutionsComponent bg */}
      <section className="py-8 px-4 bg-[#262626]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "6", label: "Solution Domains" },
            { value: "10,000+", label: "Vetted Professionals" },
            { value: "960,000+", label: "Hours Delivered" },
            { value: "50 hrs", label: "Free to Start" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="text-2xl sm:text-3xl font-bold font-mono mb-1"
                style={{
                  backgroundImage: "linear-gradient(90deg, #E9414C 0%, #FF9634 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-sans" style={{ color: "rgb(140,140,140)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions grid */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-[rgb(38,38,38)] mb-3">
              Browse by Domain
            </h2>
            <p
              className="font-sans text-base sm:text-lg max-w-2xl mx-auto"
              style={{ color: "rgb(140,140,140)", lineHeight: "1.57" }}
            >
              Each domain gives you access to deeply specialised, vetted talent — ready to embed in your team in under 30 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {solutions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group relative flex flex-col bg-white rounded-xl border border-gray-200 hover:border-[#FF9634] hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Accent top bar */}
                <div
                  className="h-1 w-full flex-shrink-0"
                  style={{ backgroundColor: s.accentColor }}
                />

                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${s.accentColor}22 0%, ${s.accentColor}44 100%)`,
                      }}
                    >
                      {s.emoji}
                    </div>
                    {s.isNew && (
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full text-white font-sans"
                        style={{ backgroundImage: "linear-gradient(90deg, #E9414C, #FF9634)" }}
                      >
                        New
                      </span>
                    )}
                  </div>

                  {/* Title & tagline */}
                  <p
                    className="text-xs font-semibold uppercase tracking-wider font-sans mb-1"
                    style={{ color: s.accentColor }}
                  >
                    {s.tagline}
                  </p>
                  <h3 className="font-mono font-normal text-xl text-[rgb(38,38,38)] mb-3">
                    {s.title}
                  </h3>

                  <p
                    className="font-sans text-sm leading-relaxed flex-1 mb-5"
                    style={{ color: "rgb(89,89,89)" }}
                  >
                    {s.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full border font-sans"
                        style={{ color: "rgb(89,89,89)", borderColor: "rgb(229,229,229)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div
                    className="flex items-center gap-1.5 text-sm font-semibold font-sans group-hover:gap-3 transition-all"
                    style={{ color: s.accentColor }}
                  >
                    {s.cta}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke={s.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA — dark, brand gradient button */}
      <section className="py-16 sm:py-20 px-4 bg-[#262626]">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-mono font-normal text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] text-white mb-4"
          >
            Ready to Transform Your Business?
          </h2>
          <p
            className="font-sans text-base sm:text-lg mb-8"
            style={{ color: "rgb(140,140,140)", lineHeight: "1.57" }}
          >
            Start with 50 free hours, get matched with expert talent in under 30 minutes, and scale as you grow — no credit card needed.
          </p>
          <div className="flex justify-center">
            <Link href="/signup" className="inline-block">
              <PrimaryButton
                width="256"
                height="56"
                wrapperClassName="hero-primary-button-wrapper"
                gradientId="paint0_linear_solutions_cta"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

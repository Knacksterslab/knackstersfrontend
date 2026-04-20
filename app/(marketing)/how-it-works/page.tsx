import HowItWorksPage from "@/components/how-it-works/HowItWorksPage";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "How Knacksters Works - Deploy Expert Teams in Minutes",
  description:
    "Learn how Knacksters connects you with vetted professionals in minutes. From onboarding to execution, discover our managed talent platform that eliminates hiring hassles.",
  keywords: ["how it works", "talent platform", "on-demand professionals", "managed talent", "hire experts", "deploy teams"],
  alternates: { canonical: "https://www.knacksters.co/how-it-works" },
  openGraph: {
    title: "How Knacksters Works - Deploy Expert Teams in Minutes",
    description: "Learn how Knacksters connects you with vetted professionals in minutes. From onboarding to execution.",
    url: "https://www.knacksters.co/how-it-works",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630, alt: "How Knacksters Works" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Knacksters Works - Deploy Expert Teams in Minutes",
    description: "Learn how Knacksters connects you with vetted professionals in minutes. From onboarding to execution.",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Hire On-Demand Talent with Knacksters",
  description: "Deploy pre-vetted expert professionals in minutes using Knacksters' managed talent platform.",
  totalTime: "PT48H",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Book a Free Strategy Call",
      text: "Schedule a free 15-minute call with our team to discuss your needs, goals, and the type of expert you're looking for.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Get Matched with Vetted Talent",
      text: "Within 48 hours, we match you with pre-vetted professionals who have been screened for skills, experience, and culture fit.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Start Working — Risk Free",
      text: "Begin with 50 free hours. Your dedicated Customer Success Manager handles onboarding, contracts, and ongoing management.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Scale as You Grow",
      text: "Add more hours, specialists, or domains as your business grows — all managed through a single dashboard.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.knacksters.co" },
    { "@type": "ListItem", position: 2, name: "How It Works", item: "https://www.knacksters.co/how-it-works" },
  ],
};

export default function HowItWorksServicePage() {
  return (
    <>
      <JsonLd data={howToSchema} />
      <JsonLd data={breadcrumbSchema} />
      <HowItWorksPage />
    </>
  );
}

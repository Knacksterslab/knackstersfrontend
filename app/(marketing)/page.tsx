import type { Metadata } from "next";
import CallToAction from "@/components/sections/CallToAction";
import SolutionsComponent from "@/components/sections/SolutionsComponent";
import BenefitsComponent from "@/components/sections/BenefitsComponent";
import UseCases from "@/components/sections/UseCases";
import Banner from "@/components/sections/banner";
import ProcessFlowComponent from "@/components/process-flow/ProcessFlowComponent";
import Scroller from "@/components/shared/Scroller";
import PartnersComponent from "@/components/partners/PartnersComponent";
import { defaultLandingContent } from "@/components/landing/landing-content";
import JsonLd, { organizationSchema, websiteSchema } from "@/components/seo/JsonLd";

// Rebuild page every 60 seconds (ISR) instead of disabling cache entirely
export const revalidate = 60;

export const metadata: Metadata = {
  title: defaultLandingContent.seo.pageTitle,
  description: defaultLandingContent.seo.metaDescription,
  keywords: [
    "on-demand talent",
    "cloud workforce",
    "managed talent platform",
    "vetted professionals",
    "AI experts",
    "cybersecurity professionals",
    "remote talent",
    "staff augmentation",
  ],
  openGraph: {
    title: defaultLandingContent.seo.pageTitle,
    description: defaultLandingContent.seo.metaDescription,
    url: "https://www.knacksters.co",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630, alt: "Knacksters - On-Demand Cloud Workforce" }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultLandingContent.seo.pageTitle,
    description: defaultLandingContent.seo.metaDescription,
    images: ["/hero-bg.png"],
  },
};

// Fetch talent cards server-side
async function getTalentCards() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    const response = await fetch(`${apiUrl}/api/public/content/landing-hero`, {
      next: { revalidate: 60 },
    });

    if (response.ok) {
      const data = await response.json();
      
      if (data.success && data.data?.content?.talentCards) {
        return data.data.content.talentCards;
      }
    }
  } catch (error) {
    console.error('Failed to fetch talent cards server-side:', error);
  }
  
  // Return default cards as fallback
  return defaultLandingContent.hero.talentCards;
}

export default async function Home() {
  const talentCards = await getTalentCards();

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <Banner talentCards={talentCards} />
      <div className="flex justify-center py-8">
        <Scroller />
      </div>
      <ProcessFlowComponent />
      <PartnersComponent />
      <SolutionsComponent />
      <BenefitsComponent />
      <UseCases />
      <CallToAction />
    </>
  );
}


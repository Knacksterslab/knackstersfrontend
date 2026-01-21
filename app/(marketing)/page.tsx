import type { Metadata } from "next";
import CallToAction from "@/components/sections/CallToAction";
import SolutionsComponent from "@/components/sections/SolutionsComponent";
import BenefitsComponent from "@/components/sections/BenefitsComponent";
import UseCases from "@/components/sections/UseCases";
import Banner from "@/components/sections/banner";
import ProcessFlowComponent from "@/components/process-flow/ProcessFlowComponent";
import Scroller from "@/components/shared/Scroller";
import PartnersComponent from "@/components/partners/PartnersComponent";
import { defaultLandingContent, LandingContent } from "@/components/landing/landing-content";

// Force dynamic rendering and revalidation
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching

export const metadata: Metadata = {
  title: defaultLandingContent.seo.pageTitle,
  description: defaultLandingContent.seo.metaDescription,
  keywords: [
    "talent network",
    "professional networking",
    "skilled professionals",
    "talent recruitment",
    "career opportunities",
  ],
};

// Fetch talent cards server-side
async function getTalentCards() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    const response = await fetch(`${apiUrl}/api/public/content/landing-hero`, {
      cache: 'no-store', // Always fetch fresh data
      next: { revalidate: 0 },
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


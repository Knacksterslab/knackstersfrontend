import type { Metadata } from "next";
import { BACKEND_URL } from "@/lib/config/env";
import CallToAction from "@/components/sections/CallToAction";
import SolutionsComponent from "@/components/sections/SolutionsComponent";
import BenefitsComponent from "@/components/sections/BenefitsComponent";
import UseCases from "@/components/sections/UseCases";
import Banner from "@/components/sections/banner";
import ProcessFlowComponent from "@/components/process-flow/ProcessFlowComponent";
import Scroller from "@/components/shared/Scroller";
import PartnersComponent from "@/components/partners/PartnersComponent";
import SocialProofSection from "@/components/sections/SocialProofSection";
import { defaultLandingContent } from "@/components/landing/landing-content";
import JsonLd, { organizationSchema, websiteSchema } from "@/components/seo/JsonLd";

// Rebuild page every 60 seconds (ISR) instead of disabling cache entirely
export const revalidate = 60;
const shouldLogLandingDiagnostics =
  process.env.NODE_ENV !== "production" || process.env.LANDING_HERO_DEBUG === "true";

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
  alternates: { canonical: "https://www.knacksters.co" },
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
    const response = await fetch(`${BACKEND_URL}/api/public/content/landing-hero`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error('Landing hero API returned non-OK status', {
        status: response.status,
        statusText: response.statusText,
        apiUrl: BACKEND_URL,
      });
      return defaultLandingContent.hero.talentCards;
    }

    const data = await response.json();
    if (data.success && Array.isArray(data.data?.content?.talentCards) && data.data.content.talentCards.length > 0) {
      if (shouldLogLandingDiagnostics) {
        console.info("[landing-hero] using API content", {
          apiUrl: BACKEND_URL,
          cardsCount: data.data.content.talentCards.length,
          firstCardName: data.data.content.talentCards[0]?.name || null,
        });
      }
      return data.data.content.talentCards;
    }

    console.error('Landing hero API returned unexpected payload shape', {
      apiUrl: BACKEND_URL,
      hasSuccess: !!data?.success,
      hasData: !!data?.data,
      hasContent: !!data?.data?.content,
      hasTalentCards: Array.isArray(data?.data?.content?.talentCards),
      talentCardsCount: Array.isArray(data?.data?.content?.talentCards) ? data.data.content.talentCards.length : 0,
    });
  } catch (error) {
    console.error('Failed to fetch talent cards server-side:', error);
  }
  
  // Return default cards as fallback
  if (shouldLogLandingDiagnostics) {
    console.info("[landing-hero] using fallback content", {
      cardsCount: defaultLandingContent.hero.talentCards.length,
      firstCardName: defaultLandingContent.hero.talentCards[0]?.name || null,
    });
  }
  return defaultLandingContent.hero.talentCards;
}

export default async function Home() {
  const talentCards = await getTalentCards();
  if (shouldLogLandingDiagnostics) {
    console.info("[landing-hero] final render payload", {
      cardsCount: talentCards.length,
      firstCardName: talentCards[0]?.name || null,
    });
  }

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
      <SocialProofSection />
      <SolutionsComponent />
      <BenefitsComponent />
      <UseCases />
      <CallToAction />
    </>
  );
}


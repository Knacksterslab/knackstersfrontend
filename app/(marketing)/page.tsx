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

export default function Home() {
  return (
    <>
      <Banner />
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


import HowItWorksPage from "@/components/how-it-works/HowItWorksPage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Knacksters Works - Deploy Expert Teams in Minutes",
  description:
    "Learn how Knacksters connects you with vetted professionals in minutes. From onboarding to execution, discover our managed talent platform that eliminates hiring hassles.",
  keywords: ["how it works", "talent platform", "on-demand professionals", "managed talent", "hire experts", "deploy teams"],
  openGraph: {
    title: "How Knacksters Works - Deploy Expert Teams in Minutes",
    description: "Learn how Knacksters connects you with vetted professionals in minutes. From onboarding to execution.",
    url: "https://www.knacksters.co/how-it-works",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Knacksters Works - Deploy Expert Teams in Minutes",
    description: "Learn how Knacksters connects you with vetted professionals in minutes. From onboarding to execution.",
  },
};

export default function HowItWorksServicePage() {
  return <HowItWorksPage />;
}

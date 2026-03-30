import type { Metadata } from "next";
import MarketingPage from "@/components/solutions/MarketingPage";

export const metadata: Metadata = {
  title: "Growth & Customer Success Services",
  description:
    "Drive acquisition and retention with expert growth marketers and customer success managers. From SEO and paid media to customer onboarding, RevOps, and churn reduction—measurable results across the full revenue lifecycle.",
  keywords: ["growth marketing", "customer success manager", "CSM", "marketing services", "SEO", "content marketing", "paid media", "RevOps", "customer retention", "customer onboarding", "digital marketing", "email marketing"],
  openGraph: {
    title: "Growth & Customer Success - Knacksters",
    description: "Expert marketers and CSMs who drive acquisition, retention, and revenue expansion across every channel.",
    url: "https://www.knacksters.co/solutions/marketing",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth & Customer Success - Knacksters",
    description: "Expert marketers and CSMs who drive acquisition, retention, and revenue expansion across every channel.",
  },
};

export default function MarketingServicePage() {
  return <MarketingPage />;
}

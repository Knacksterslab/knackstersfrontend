import type { Metadata } from "next";
import MarketingPage from "@/components/solutions/MarketingPage";

export const metadata: Metadata = {
  title: "Marketing Services",
  description:
    "Drive growth with expert marketers. From SEO and content strategy to paid media and marketing analytics—our specialists deliver measurable results across every channel.",
  keywords: ["marketing services", "SEO", "content marketing", "paid media", "marketing analytics", "growth marketing", "digital marketing", "social media marketing", "email marketing"],
  openGraph: {
    title: "Marketing Services - Knacksters",
    description: "Drive growth with expert marketers. From SEO and content strategy to paid media and marketing analytics.",
    url: "https://www.knacksters.co/solutions/marketing",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Services - Knacksters",
    description: "Drive growth with expert marketers. From SEO and content strategy to paid media and marketing analytics.",
  },
};

export default function MarketingServicePage() {
  return <MarketingPage />;
}

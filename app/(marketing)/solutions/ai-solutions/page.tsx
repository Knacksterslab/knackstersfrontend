import type { Metadata } from "next";
import AISolutionsPage from "@/components/solutions/AISolutionsPage";

export const metadata: Metadata = {
  title: "AI Solutions & Services",
  description: "Comprehensive AI services from strategy to implementation. Expert AI research, engineering, data science, MLOps, governance, and domain-specific solutions for enterprise transformation.",
  keywords: ["AI solutions", "machine learning", "AI implementation", "AI compliance", "MLOps", "AI strategy", "AI governance", "enterprise AI"],
  openGraph: {
    title: "AI Solutions & Services - Knacksters",
    description: "Comprehensive AI services from strategy to implementation. Expert AI research, engineering, data science, MLOps, and governance.",
    url: "https://www.knacksters.co/solutions/ai-solutions",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions & Services - Knacksters",
    description: "Comprehensive AI services from strategy to implementation. Expert AI research, engineering, data science, MLOps, and governance.",
  },
};

export default function AIServicesRoute() {
  return <AISolutionsPage />;
}

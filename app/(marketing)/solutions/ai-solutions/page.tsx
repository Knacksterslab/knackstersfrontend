import type { Metadata } from "next";
import AISolutionsPage from "@/components/solutions/AISolutionsPage";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "AI Solutions & Services",
  description: "Comprehensive AI services from strategy to implementation. Expert AI research, engineering, data science, MLOps, governance, and domain-specific solutions for enterprise transformation.",
  keywords: ["AI solutions", "machine learning", "AI implementation", "AI compliance", "MLOps", "AI strategy", "AI governance", "enterprise AI"],
  alternates: { canonical: "https://www.knacksters.co/solutions/ai-solutions" },
  openGraph: {
    title: "AI Solutions & Services - Knacksters",
    description: "Comprehensive AI services from strategy to implementation. Expert AI research, engineering, data science, MLOps, and governance.",
    url: "https://www.knacksters.co/solutions/ai-solutions",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630, alt: "Knacksters AI Solutions & Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions & Services - Knacksters",
    description: "Comprehensive AI services from strategy to implementation. Expert AI research, engineering, data science, MLOps, and governance.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Solutions & Services",
  description: "Comprehensive AI services from strategy to implementation. Expert AI research, engineering, data science, MLOps, governance, and domain-specific solutions.",
  provider: { "@type": "Organization", name: "Knacksters", url: "https://www.knacksters.co" },
  serviceType: "Artificial Intelligence Consulting & Engineering",
  areaServed: "Worldwide",
  url: "https://www.knacksters.co/solutions/ai-solutions",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Strategy & Roadmapping" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Machine Learning Engineering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "MLOps & AI Infrastructure" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Governance & Compliance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Data Science & Analytics" } },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.knacksters.co" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.knacksters.co/solutions" },
    { "@type": "ListItem", position: 3, name: "AI Solutions", item: "https://www.knacksters.co/solutions/ai-solutions" },
  ],
};

export default function AIServicesRoute() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <AISolutionsPage />
    </>
  );
}

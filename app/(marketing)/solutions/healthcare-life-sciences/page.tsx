import type { Metadata } from "next";
import HealthcareLifeSciencesPage from "@/components/solutions/HealthcareLifeSciencesPage";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Healthcare & Life Sciences Services",
  description:
    "Expert healthcare professionals for clinical trials, data management, regulatory compliance, and medical research. From clinical data managers to biostatisticians—we deliver specialized talent for pharma, biotech, and medical device companies.",
  keywords: ["healthcare staffing", "life sciences", "clinical trials", "biostatistician", "regulatory compliance", "pharma talent", "biotech professionals", "medical device", "clinical data management"],
  alternates: { canonical: "https://www.knacksters.co/solutions/healthcare-life-sciences" },
  openGraph: {
    title: "Healthcare & Life Sciences Services - Knacksters",
    description: "Expert healthcare professionals for clinical trials, regulatory compliance, and medical research.",
    url: "https://www.knacksters.co/solutions/healthcare-life-sciences",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630, alt: "Knacksters Healthcare & Life Sciences Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare & Life Sciences Services - Knacksters",
    description: "Expert healthcare professionals for clinical trials, regulatory compliance, and medical research.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Healthcare & Life Sciences Services",
  description: "Specialized talent for clinical trials, data management, regulatory compliance, and medical research — pharma, biotech, and medical device companies.",
  provider: { "@type": "Organization", name: "Knacksters", url: "https://www.knacksters.co" },
  serviceType: "Healthcare & Life Sciences Staffing",
  areaServed: "Worldwide",
  url: "https://www.knacksters.co/solutions/healthcare-life-sciences",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Healthcare & Life Sciences Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Clinical Trial Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Regulatory Affairs & Compliance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Biostatistics & Data Science" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Clinical Data Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Medical Research Support" } },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.knacksters.co" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.knacksters.co/solutions" },
    { "@type": "ListItem", position: 3, name: "Healthcare & Life Sciences", item: "https://www.knacksters.co/solutions/healthcare-life-sciences" },
  ],
};

export default function HealthcareLifeSciencesServicePage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <HealthcareLifeSciencesPage />
    </>
  );
}

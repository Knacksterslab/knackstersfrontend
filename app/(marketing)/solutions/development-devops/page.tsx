import type { Metadata } from "next";
import DevelopmentDevOpsPage from "@/components/solutions/DevelopmentDevOpsPage";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Software Development & DevOps Services",
  description: "Comprehensive software development and DevOps expertise. Frontend, backend, mobile, cloud engineers, SREs, platform engineers, and DevOps specialists for building and scaling modern applications.",
  keywords: ["software development", "DevOps", "SRE", "cloud engineering", "frontend developer", "backend developer", "full-stack", "mobile development", "platform engineering", "CI/CD", "kubernetes", "microservices"],
  alternates: { canonical: "https://www.knacksters.co/solutions/development-devops" },
  openGraph: {
    title: "Software Development & DevOps Services - Knacksters",
    description: "Comprehensive software development and DevOps expertise. Frontend, backend, mobile, cloud engineers, SREs, and DevOps specialists.",
    url: "https://www.knacksters.co/solutions/development-devops",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630, alt: "Knacksters Software Development & DevOps Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development & DevOps Services - Knacksters",
    description: "Comprehensive software development and DevOps expertise. Frontend, backend, mobile, cloud engineers, SREs, and DevOps specialists.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Software Development & DevOps Services",
  description: "Comprehensive software development and DevOps expertise. Frontend, backend, mobile, cloud engineers, SREs, platform engineers, and DevOps specialists.",
  provider: { "@type": "Organization", name: "Knacksters", url: "https://www.knacksters.co" },
  serviceType: "Software Development & DevOps Engineering",
  areaServed: "Worldwide",
  url: "https://www.knacksters.co/solutions/development-devops",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Development & DevOps Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Frontend & Full-Stack Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Backend & API Engineering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Engineering & Architecture" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "DevOps, SRE & Platform Engineering" } },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.knacksters.co" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.knacksters.co/solutions" },
    { "@type": "ListItem", position: 3, name: "Development & DevOps", item: "https://www.knacksters.co/solutions/development-devops" },
  ],
};

export default function DevelopmentDevOpsRoute() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <DevelopmentDevOpsPage />
    </>
  );
}

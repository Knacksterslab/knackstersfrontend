import type { Metadata } from "next";
import CybersecurityPage from "@/components/solutions/CybersecurityPage";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Cybersecurity Solutions & Services",
  description: "Comprehensive cybersecurity services from Blue Team defense to Red Team offense. Expert SOC analysts, penetration testers, DFIR specialists, GRC consultants, and privacy engineers for complete enterprise protection.",
  keywords: ["cybersecurity", "blue team", "red team", "SOC", "penetration testing", "DFIR", "incident response", "GRC", "compliance", "privacy", "threat hunting", "social engineering", "business email compromise", "CISO", "security operations"],
  alternates: { canonical: "https://www.knacksters.co/solutions/cybersecurity" },
  openGraph: {
    title: "Cybersecurity Solutions & Services - Knacksters",
    description: "Comprehensive cybersecurity services from Blue Team defense to Red Team offense. Expert SOC analysts, pen testers, DFIR, and GRC consultants.",
    url: "https://www.knacksters.co/solutions/cybersecurity",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630, alt: "Knacksters Cybersecurity Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Solutions & Services - Knacksters",
    description: "Comprehensive cybersecurity services from Blue Team defense to Red Team offense. Expert SOC analysts, pen testers, DFIR, and GRC consultants.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cybersecurity Solutions & Services",
  description: "Comprehensive cybersecurity services from Blue Team defense to Red Team offense. Expert SOC analysts, penetration testers, DFIR specialists, and GRC consultants.",
  provider: { "@type": "Organization", name: "Knacksters", url: "https://www.knacksters.co" },
  serviceType: "Cybersecurity Consulting & Managed Security",
  areaServed: "Worldwide",
  url: "https://www.knacksters.co/solutions/cybersecurity",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cybersecurity Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Blue Team Defense & SOC Operations" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Red Team Penetration Testing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Forensics & Incident Response (DFIR)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "GRC & Compliance Consulting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Privacy Engineering" } },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.knacksters.co" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.knacksters.co/solutions" },
    { "@type": "ListItem", position: 3, name: "Cybersecurity", item: "https://www.knacksters.co/solutions/cybersecurity" },
  ],
};

export default function CybersecurityRoute() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <CybersecurityPage />
    </>
  );
}

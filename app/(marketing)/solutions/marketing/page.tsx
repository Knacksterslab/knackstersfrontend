import type { Metadata } from "next";
import MarketingPage from "@/components/solutions/MarketingPage";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Growth & Customer Success Services",
  description:
    "Drive acquisition and retention with expert growth marketers and customer success managers. From SEO and paid media to customer onboarding, RevOps, and churn reduction—measurable results across the full revenue lifecycle.",
  keywords: ["growth marketing", "customer success manager", "CSM", "marketing services", "SEO", "content marketing", "paid media", "RevOps", "customer retention", "customer onboarding", "digital marketing", "email marketing"],
  alternates: { canonical: "https://www.knacksters.co/solutions/marketing" },
  openGraph: {
    title: "Growth & Customer Success - Knacksters",
    description: "Expert marketers and CSMs who drive acquisition, retention, and revenue expansion across every channel.",
    url: "https://www.knacksters.co/solutions/marketing",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630, alt: "Knacksters Growth & Customer Success Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth & Customer Success - Knacksters",
    description: "Expert marketers and CSMs who drive acquisition, retention, and revenue expansion across every channel.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Growth & Customer Success Services",
  description: "Expert growth marketers and customer success managers driving acquisition, retention, and revenue expansion — SEO, paid media, RevOps, and churn reduction.",
  provider: { "@type": "Organization", name: "Knacksters", url: "https://www.knacksters.co" },
  serviceType: "Growth Marketing & Customer Success Management",
  areaServed: "Worldwide",
  url: "https://www.knacksters.co/solutions/marketing",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Growth & Customer Success Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Growth Marketing & SEO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Paid Media & Performance Marketing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Customer Success Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Revenue Operations (RevOps)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Customer Onboarding & Retention" } },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.knacksters.co" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.knacksters.co/solutions" },
    { "@type": "ListItem", position: 3, name: "Growth & Customer Success", item: "https://www.knacksters.co/solutions/marketing" },
  ],
};

export default function MarketingServicePage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <MarketingPage />
    </>
  );
}

import type { Metadata } from "next";
import DesignCreativePage from "@/components/solutions/DesignCreativePage";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Design & Creative Services",
  description:
    "Transform your brand with expert designers. From UX research to visual design, motion graphics to design systems—our creative professionals deliver exceptional user experiences.",
  keywords: ["design services", "UX design", "UI design", "brand design", "motion graphics", "design systems", "creative professionals", "graphic design", "product design"],
  alternates: { canonical: "https://www.knacksters.co/solutions/design-creative" },
  openGraph: {
    title: "Design & Creative Services - Knacksters",
    description: "Transform your brand with expert designers. From UX research to visual design, motion graphics to design systems.",
    url: "https://www.knacksters.co/solutions/design-creative",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630, alt: "Knacksters Design & Creative Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design & Creative Services - Knacksters",
    description: "Transform your brand with expert designers. From UX research to visual design, motion graphics to design systems.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Design & Creative Services",
  description: "Transform your brand with expert designers. From UX research to visual design, motion graphics to design systems—creative professionals delivering exceptional user experiences.",
  provider: { "@type": "Organization", name: "Knacksters", url: "https://www.knacksters.co" },
  serviceType: "Design & Creative Services",
  areaServed: "Worldwide",
  url: "https://www.knacksters.co/solutions/design-creative",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Design Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "UX Research & UI Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Identity & Visual Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Motion Graphics & Animation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Design Systems" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Product Design" } },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.knacksters.co" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.knacksters.co/solutions" },
    { "@type": "ListItem", position: 3, name: "Design & Creative", item: "https://www.knacksters.co/solutions/design-creative" },
  ],
};

export default function DesignCreativeServicePage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <DesignCreativePage />
    </>
  );
}

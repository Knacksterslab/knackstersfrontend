import type { Metadata } from "next";
import DesignCreativePage from "@/components/solutions/DesignCreativePage";

export const metadata: Metadata = {
  title: "Design & Creative Services",
  description:
    "Transform your brand with expert designers. From UX research to visual design, motion graphics to design systems—our creative professionals deliver exceptional user experiences.",
  keywords: ["design services", "UX design", "UI design", "brand design", "motion graphics", "design systems", "creative professionals", "graphic design", "product design"],
  openGraph: {
    title: "Design & Creative Services - Knacksters",
    description: "Transform your brand with expert designers. From UX research to visual design, motion graphics to design systems.",
    url: "https://www.knacksters.co/solutions/design-creative",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design & Creative Services - Knacksters",
    description: "Transform your brand with expert designers. From UX research to visual design, motion graphics to design systems.",
  },
};

export default function DesignCreativeServicePage() {
  return <DesignCreativePage />;
}

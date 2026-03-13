import type { Metadata } from "next";
import HealthcareLifeSciencesPage from "@/components/solutions/HealthcareLifeSciencesPage";

export const metadata: Metadata = {
  title: "Healthcare & Life Sciences Services",
  description:
    "Expert healthcare professionals for clinical trials, data management, regulatory compliance, and medical research. From clinical data managers to biostatisticians—we deliver specialized talent for pharma, biotech, and medical device companies.",
  keywords: ["healthcare staffing", "life sciences", "clinical trials", "biostatistician", "regulatory compliance", "pharma talent", "biotech professionals", "medical device", "clinical data management"],
  openGraph: {
    title: "Healthcare & Life Sciences Services - Knacksters",
    description: "Expert healthcare professionals for clinical trials, regulatory compliance, and medical research.",
    url: "https://www.knacksters.co/solutions/healthcare-life-sciences",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare & Life Sciences Services - Knacksters",
    description: "Expert healthcare professionals for clinical trials, regulatory compliance, and medical research.",
  },
};

export default function HealthcareLifeSciencesServicePage() {
  return <HealthcareLifeSciencesPage />;
}

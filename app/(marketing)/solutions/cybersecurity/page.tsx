import type { Metadata } from "next";
import CybersecurityPage from "@/components/solutions/CybersecurityPage";

export const metadata: Metadata = {
  title: "Cybersecurity Solutions & Services",
  description: "Comprehensive cybersecurity services from Blue Team defense to Red Team offense. Expert SOC analysts, penetration testers, DFIR specialists, GRC consultants, and privacy engineers for complete enterprise protection.",
  keywords: ["cybersecurity", "blue team", "red team", "SOC", "penetration testing", "DFIR", "incident response", "GRC", "compliance", "privacy", "threat hunting", "social engineering", "business email compromise", "CISO", "security operations"],
  openGraph: {
    title: "Cybersecurity Solutions & Services - Knacksters",
    description: "Comprehensive cybersecurity services from Blue Team defense to Red Team offense. Expert SOC analysts, pen testers, DFIR, and GRC consultants.",
    url: "https://www.knacksters.co/solutions/cybersecurity",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Solutions & Services - Knacksters",
    description: "Comprehensive cybersecurity services from Blue Team defense to Red Team offense. Expert SOC analysts, pen testers, DFIR, and GRC consultants.",
  },
};

export default function CybersecurityRoute() {
  return <CybersecurityPage />;
}

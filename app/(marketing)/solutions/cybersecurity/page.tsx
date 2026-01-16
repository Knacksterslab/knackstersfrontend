import type { Metadata } from "next";
import CybersecurityPage from "@/components/solutions/CybersecurityPage";

export const metadata: Metadata = {
  title: "Cybersecurity Solutions & Services - Knacksters",
  description: "Comprehensive cybersecurity services from Blue Team defense to Red Team offense. Expert SOC analysts, penetration testers, DFIR specialists, GRC consultants, and privacy engineers for complete enterprise protection.",
  keywords: ["cybersecurity", "blue team", "red team", "SOC", "penetration testing", "DFIR", "incident response", "GRC", "compliance", "privacy", "threat hunting", "social engineering", "business email compromise", "CISO", "security operations"],
};

export default function CybersecurityRoute() {
  return <CybersecurityPage />;
}

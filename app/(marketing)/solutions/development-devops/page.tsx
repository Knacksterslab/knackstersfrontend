import type { Metadata } from "next";
import DevelopmentDevOpsPage from "@/components/solutions/DevelopmentDevOpsPage";

export const metadata: Metadata = {
  title: "Software Development & DevOps Services",
  description: "Comprehensive software development and DevOps expertise. Frontend, backend, mobile, cloud engineers, SREs, platform engineers, and DevOps specialists for building and scaling modern applications.",
  keywords: ["software development", "DevOps", "SRE", "cloud engineering", "frontend developer", "backend developer", "full-stack", "mobile development", "platform engineering", "CI/CD", "kubernetes", "microservices"],
  openGraph: {
    title: "Software Development & DevOps Services - Knacksters",
    description: "Comprehensive software development and DevOps expertise. Frontend, backend, mobile, cloud engineers, SREs, and DevOps specialists.",
    url: "https://www.knacksters.co/solutions/development-devops",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development & DevOps Services - Knacksters",
    description: "Comprehensive software development and DevOps expertise. Frontend, backend, mobile, cloud engineers, SREs, and DevOps specialists.",
  },
};

export default function DevelopmentDevOpsRoute() {
  return <DevelopmentDevOpsPage />;
}

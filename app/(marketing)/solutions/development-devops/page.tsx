import type { Metadata } from "next";
import DevelopmentDevOpsPage from "@/components/solutions/DevelopmentDevOpsPage";

export const metadata: Metadata = {
  title: "Software Development & DevOps Services - Knacksters",
  description: "Comprehensive software development and DevOps expertise. Frontend, backend, mobile, cloud engineers, SREs, platform engineers, and DevOps specialists for building and scaling modern applications.",
  keywords: ["software development", "DevOps", "SRE", "cloud engineering", "frontend developer", "backend developer", "full-stack", "mobile development", "platform engineering", "CI/CD", "kubernetes", "microservices"],
};

export default function DevelopmentDevOpsRoute() {
  return <DevelopmentDevOpsPage />;
}

import type { Metadata } from "next";
import AISolutionsPage from "@/components/solutions/AISolutionsPage";

export const metadata: Metadata = {
  title: "AI Solutions & Services - Knacksters",
  description: "Comprehensive AI services from strategy to implementation. Expert AI research, engineering, data science, MLOps, governance, and domain-specific solutions for enterprise transformation.",
  keywords: ["AI solutions", "machine learning", "AI implementation", "AI compliance", "MLOps", "AI strategy", "AI governance", "enterprise AI"],
};

export default function AIServicesRoute() {
  return <AISolutionsPage />;
}

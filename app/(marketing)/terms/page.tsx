import TermsOfServicePage from "@/components/legal/TermsOfServicePage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review Knacksters' Terms of Service to understand your rights and responsibilities when using our on-demand talent platform.",
  alternates: { canonical: "https://www.knacksters.co/terms" },
  openGraph: {
    title: "Terms of Service - Knacksters",
    description: "Review Knacksters' Terms of Service to understand your rights and responsibilities.",
    url: "https://www.knacksters.co/terms",
  },
};

export default function TermsPage() {
  return <TermsOfServicePage />;
}

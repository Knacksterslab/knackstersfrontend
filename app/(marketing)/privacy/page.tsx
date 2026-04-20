import PrivacyPolicyPage from "@/components/legal/PrivacyPolicyPage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Knacksters collects, uses, and protects your personal information. We're committed to transparency and data security.",
  alternates: { canonical: "https://www.knacksters.co/privacy" },
  openGraph: {
    title: "Privacy Policy - Knacksters",
    description: "Learn how Knacksters collects, uses, and protects your personal information.",
    url: "https://www.knacksters.co/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyPolicyPage />;
}

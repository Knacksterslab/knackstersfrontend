import FAQPage from "@/components/shared/FAQPage";

import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description: "Get answers to common questions about Knacksters' managed talent platform, pricing, professionals, and how we help businesses scale with expert talent.",
  keywords: ["FAQ", "frequently asked questions", "talent platform pricing", "how to hire", "knacksters help"],
  openGraph: {
    title: "FAQ - Knacksters | Frequently Asked Questions",
    description: "Get answers to common questions about Knacksters' managed talent platform, pricing, and how we help businesses scale.",
    url: "https://www.knacksters.co/faq",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Knacksters | Frequently Asked Questions",
    description: "Get answers to common questions about Knacksters' managed talent platform, pricing, and how we help businesses scale.",
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Knacksters work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Knacksters is a managed talent platform that provides on-demand access to vetted professionals. You subscribe to a plan, get assigned a dedicated Customer Success Manager, and we match you with expert professionals in minutes—not weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Knacksters cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer a free Trial to Hire plan (50 hours, 30 days, one domain, one per company). Paid plans start at $7,000/month for 100 hours (Flex Retainer). Pro Retainer is $12,500/month for 200 hours. Growth is $25,000/month for 450 hours. Enterprise plans are custom. All plans include a dedicated Customer Success Manager.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you vet your professionals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We have a rigorous 3-step screening process: portfolio review, domain-specific skills assessment, and background checks. Only 8% of applicants pass all three stages.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I am not satisfied with the professional?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We allow clients to work with up to three professionals per position during the trial period. You will not be billed unless you are satisfied.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a trial period?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We start each engagement with a no-risk trial period. If you are completely satisfied, we bill you for the time and continue. If not, you will not be billed.',
      },
    },
  ],
};

export default function FAQ() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <FAQPage />
    </>
  );
}

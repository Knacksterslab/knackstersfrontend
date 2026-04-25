import type { Metadata } from "next";
import TryBeforeYouHirePage from "@/components/solutions/TryBeforeYouHirePage";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Try Before You Hire Talent",
  description:
    "Reduce hiring risk with Knacksters' Try Before You Hire model. Evaluate real execution, communication, and fit, then choose to continue via subscription or convert to direct hire.",
  keywords: [
    "try before you hire",
    "trial to hire talent",
    "vetted talent trial",
    "hire with low risk",
    "evaluate talent before hiring",
    "customer success trial hire",
  ],
  alternates: { canonical: "https://www.knacksters.co/solutions/try-before-you-hire" },
  openGraph: {
    title: "Try Before You Hire Talent - Knacksters",
    description:
      "Evaluate real execution before commitment. Get matched with pre-vetted talent in under 30 minutes.",
    url: "https://www.knacksters.co/solutions/try-before-you-hire",
    images: [{ url: "/hero-bg.png", width: 1200, height: 630, alt: "Knacksters Try Before You Hire Model" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Try Before You Hire Talent - Knacksters",
    description:
      "Reduce hiring risk with a structured trial model. Evaluate real work before long-term commitment.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Try Before You Hire Model",
  description:
    "A low-risk talent model that lets companies evaluate real execution, communication, and fit before choosing either subscription-based continuation or direct hire conversion.",
  provider: { "@type": "Organization", name: "Knacksters", url: "https://www.knacksters.co" },
  serviceType: "Trial-to-Hire Talent Matching",
  areaServed: "Worldwide",
  url: "https://www.knacksters.co/solutions/try-before-you-hire",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Try Before You Hire Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Role Scoping & Trial Planning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Under-30-Minute Talent Matching" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Structured Trial Evaluation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conversion to Long-Term Engagement" } },
    ],
  },
  offers: {
    "@type": "Offer",
    name: "50 Free Hours Trial",
    price: "0",
    priceCurrency: "USD",
    description: "Start with 50 free hours and no long-term lock-in.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does try-before-you-hire mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It means evaluating talent through real scoped work before deciding what path fits best: continue via subscription or convert to direct hire.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can I get matched?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Knacksters matches clients with pre-vetted professionals in under 30 minutes for trial-ready roles.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after the trial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After the trial, teams can either continue through a Knacksters subscription for ongoing managed capacity or proceed with a direct hire decision based on trial performance.",
      },
    },
    {
      "@type": "Question",
      name: "What should I evaluate during the trial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evaluate communication, speed of understanding, quality of output, ownership, responsiveness, and team fit using a structured scorecard.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.knacksters.co" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.knacksters.co/solutions" },
    { "@type": "ListItem", position: 3, name: "Try Before You Hire", item: "https://www.knacksters.co/solutions/try-before-you-hire" },
  ],
};

export default function TryBeforeYouHireRoute() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <TryBeforeYouHirePage />
    </>
  );
}


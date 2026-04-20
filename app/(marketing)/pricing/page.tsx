import PricingPage from '@/components/pricing/PricingPage';
import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Pricing | Knacksters',
  description:
    'Transparent, subscription-based pricing. Start free with 50 hours, then scale with Flex Retainer, Pro Retainer, Growth, or Enterprise plans. No hidden fees, no contracts.',
  keywords: ['pricing', 'on-demand talent pricing', 'managed talent plans', 'staff augmentation cost', 'flex retainer', 'enterprise talent'],
  alternates: { canonical: 'https://www.knacksters.co/pricing' },
  openGraph: {
    title: 'Pricing | Knacksters — Transparent On-Demand Talent Plans',
    description: 'Start free with 50 hours. Scale with Flex, Pro, Growth, or Enterprise plans. No hidden fees, no contracts.',
    url: 'https://www.knacksters.co/pricing',
    images: [{ url: '/hero-bg.png', width: 1200, height: 630, alt: 'Knacksters Pricing Plans' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | Knacksters — Transparent On-Demand Talent Plans',
    description: 'Start free with 50 hours. Scale with Flex, Pro, Growth, or Enterprise plans. No hidden fees, no contracts.',
  },
};

const offerCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'On-Demand Talent Platform',
  provider: { '@type': 'Organization', name: 'Knacksters', url: 'https://www.knacksters.co' },
  url: 'https://www.knacksters.co/pricing',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Knacksters Subscription Plans',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Free Start',
        description: '50 free hours to get started — no credit card required.',
        price: '0',
        priceCurrency: 'USD',
        eligibleQuantity: { '@type': 'QuantitativeValue', value: 50, unitText: 'hours' },
      },
      {
        '@type': 'Offer',
        name: 'Flex Retainer',
        description: 'Flexible monthly hours for growing teams. Scale up or down as needed.',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'Pro Retainer',
        description: 'Dedicated talent hours with priority matching and a dedicated CSM.',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'Enterprise',
        description: 'Custom plans with SLAs, dedicated account management, and multi-domain talent.',
        priceCurrency: 'USD',
      },
    ],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.knacksters.co' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://www.knacksters.co/pricing' },
  ],
};

export default function Pricing() {
  return (
    <>
      <JsonLd data={offerCatalogSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PricingPage />
    </>
  );
}

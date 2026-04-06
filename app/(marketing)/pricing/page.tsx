import PricingPage from '@/components/pricing/PricingPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Knacksters',
  description:
    'Transparent, subscription-based pricing. Start free with 50 hours, then scale with Flex Retainer, Pro Retainer, Growth, or Enterprise plans. No hidden fees, no contracts.',
};

export default function Pricing() {
  return <PricingPage />;
}

import Image from 'next/image';
import { defaultLandingContent } from '@/components/landing/landing-content';
import { getLiveStats } from '@/lib/utils/stats';
import { BACKEND_URL } from '@/lib/config/env';

interface Partner {
  slug: string;
  name: string;
  logoUrl: string;
  logoUrlDark?: string | null;
  websiteUrl?: string | null;
  category: string;
}

async function fetchActivePartners(): Promise<Partner[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/partners`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.partners ?? [];
  } catch {
    return [];
  }
}

function PartnerLogo({ partner }: { partner: Partner }) {
  const card = (
    <div className="flex-shrink-0 w-36 sm:w-40 md:w-44 mx-3 group">
      <div className="aspect-[3/2] relative overflow-hidden bg-white rounded-xl p-3 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
        <Image
          src={partner.logoUrl}
          alt={`${partner.name} logo`}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-110 p-1"
          sizes="176px"
        />
      </div>
    </div>
  );

  if (partner.websiteUrl) {
    return (
      <a
        href={partner.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`Visit ${partner.name} website`}
      >
        {card}
      </a>
    );
  }
  return card;
}

export default async function PartnersComponent() {
  const [activePartners, { title, description }, { professionals, professionalsLabel, hoursDelivered, hoursDeliveredLabel }] =
    await Promise.all([
      fetchActivePartners(),
      Promise.resolve(defaultLandingContent.partners),
      Promise.resolve(getLiveStats()),
    ]);

  // Duplicate enough times so the marquee always fills wide screens
  const copies = activePartners.length > 0
    ? Math.max(2, Math.ceil(12 / activePartners.length)) * 2
    : 0;
  const marqueeItems = Array.from({ length: copies }, () => activePartners).flat();

  return (
    <section
      className="w-full pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28 relative overflow-hidden"
      style={{ backgroundColor: '#7D1F2A' }}
    >
      {/* Top — header + stats */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-10 sm:pb-12 md:pb-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          {/* Headline + description */}
          <div className="max-w-xl">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-3 sm:mb-4 font-mono"
            >
              {title}
            </h2>
            <p
              className="text-sm sm:text-base md:text-lg text-gray-100"
              style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}
            >
              {description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-row gap-10 sm:gap-12 md:gap-16 sm:text-right">
            <div>
              <div
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}
              >
                {professionals}
              </div>
              <p
                className="text-xs sm:text-sm md:text-base text-gray-200 mt-1"
                style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}
              >
                {professionalsLabel}
              </p>
            </div>
            <div>
              <div
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}
              >
                {hoursDelivered}
              </div>
              <p
                className="text-xs sm:text-sm md:text-base text-gray-200 mt-1"
                style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}
              >
                {hoursDeliveredLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee — full-width, edge-to-edge */}
      {activePartners.length > 0 && (
        <div className="relative w-full overflow-hidden pb-12 sm:pb-14 md:pb-16">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 h-full w-16 sm:w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #7D1F2A, transparent)' }}
          />
          <div
            className="absolute right-0 top-0 h-full w-16 sm:w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #7D1F2A, transparent)' }}
          />

          <div className="animate-marquee">
            {marqueeItems.map((partner, i) => (
              <PartnerLogo key={`${partner.slug}-${i}`} partner={partner} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

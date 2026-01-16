'use client';

import Image from 'next/image';
import { getActivePartners } from './partner-config';
import { defaultLandingContent } from '@/components/landing/landing-content';

export default function PartnersComponent() {
  const activePartners = getActivePartners();
  const { title, description } = defaultLandingContent.partners;
  const { professionals, professionalsLabel, hoursDelivered, hoursDeliveredLabel } = defaultLandingContent.statistics;

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ backgroundColor: '#7D1F2A' }}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-10 sm:gap-12 lg:gap-16">
          {/* Left Side - Header and Statistics */}
          <div className="flex-1 w-full lg:w-auto text-center lg:text-left">
            {/* Header */}
            <div className="mb-6 sm:mb-8 md:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-normal text-white mb-3 sm:mb-4 font-mono">
                {title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 max-w-2xl mx-auto lg:mx-0 font-sans px-4 sm:px-0" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                {description}
              </p>
            </div>

            {/* Statistics */}
            <div className="flex flex-row justify-center lg:justify-start gap-8 sm:gap-10 md:gap-12 lg:gap-16">
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-sans" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                  {professionals}
                </div>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 mt-1 sm:mt-2 font-sans" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                  {professionalsLabel}
                </p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-sans" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                  {hoursDelivered}
                </div>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 mt-1 sm:mt-2 font-sans" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                  {hoursDeliveredLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Partner Logos Grid */}
          <div className="flex-1 w-full lg:max-w-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {activePartners.map((partner, index) => {
                // Create zigzag effect by alternating vertical offset (only on larger screens)
                const isEven = index % 2 === 0;
                const offsetClass = isEven ? 'md:mt-0' : 'md:mt-6 lg:mt-8';
                
                const partnerCard = (
                  <div
                    className={`flex items-center justify-center partner-logo-container 
                    transition-all duration-300 group
                    hover:-translate-y-2
                    animate-fadeInUp relative ${offsetClass}`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="w-full aspect-[3/2] relative overflow-hidden bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md hover:shadow-xl transition-shadow">
                      <Image
                        src={partner.logoUrl}
                        alt={`${partner.name} logo`}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-110 p-1"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 200px"
                      />
                    </div>
                  </div>
                );

                return partner.website ? (
                  <a
                    key={partner.id}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    title={`Visit ${partner.name} website`}
                  >
                    {partnerCard}
                  </a>
                ) : (
                  <div key={partner.id}>
                    {partnerCard}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

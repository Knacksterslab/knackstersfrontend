import TestimonialCarousel from './TestimonialCarousel';

interface Metric {
  id: string;
  value: string;
  label: string;
  visible: boolean;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  visible: boolean;
}

interface SocialProofContent {
  headline: string;
  subheadline: string;
  visible: boolean;
  metrics: Metric[];
  testimonials: Testimonial[];
}

async function fetchSocialProof(): Promise<SocialProofContent | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/content/social-proof`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.content ?? null;
  } catch {
    return null;
  }
}

export default async function SocialProofSection() {
  const content = await fetchSocialProof();

  // Don't render if no content, section hidden, or nothing visible to show
  if (!content || !content.visible) return null;

  const visibleMetrics = content.metrics.filter(m => m.visible && m.value && m.label);
  const visibleTestimonials = content.testimonials.filter(t => t.visible && t.quote && t.author);

  if (visibleMetrics.length === 0 && visibleTestimonials.length === 0) return null;

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-[#1a1a1a]">
      <div className="mx-auto max-w-7xl">

        {/* Section header */}
        <div className="mb-8 sm:mb-10 md:mb-12 text-center">
          <h2
            className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal text-white mb-3 sm:mb-4 font-mono"
          >
            {content.headline}
          </h2>
          {content.subheadline && (
            <p
              className="max-w-3xl mx-auto text-sm sm:text-base text-[#8C8C8C] px-4"
              style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}
            >
              {content.subheadline}
            </p>
          )}
        </div>

        {/* Metrics grid */}
        {visibleMetrics.length > 0 && (
          <div
            className={`grid gap-4 sm:gap-5 md:gap-6 ${visibleMetrics.length === 1
                ? 'grid-cols-1 max-w-xs mx-auto'
                : visibleMetrics.length === 2
                ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
                : visibleMetrics.length === 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : 'grid-cols-2 lg:grid-cols-4'
              } ${visibleTestimonials.length > 0 ? 'mb-6 sm:mb-8' : ''}`}
          >
            {visibleMetrics.map(metric => (
              <div
                key={metric.id}
                className="rounded-lg sm:rounded-xl p-5 sm:p-6 border border-[#434343] hover:border-gray-600 transition-all duration-300 text-center"
              >
                <div
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums"
                  style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}
                >
                  {metric.value}
                </div>
                <p
                  className="text-xs sm:text-sm text-[#BFBFBF] leading-snug"
                  style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}
                >
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Testimonials carousel */}
        {visibleTestimonials.length > 0 && (
          <TestimonialCarousel testimonials={visibleTestimonials} />
        )}

      </div>
    </section>
  );
}

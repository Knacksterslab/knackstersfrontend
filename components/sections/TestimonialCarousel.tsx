'use client';

import { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface Props {
  testimonials: Testimonial[];
  intervalMs?: number;
}

export default function TestimonialCarousel({ testimonials, intervalMs = 7000 }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((idx: number) => {
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setFading(false);
    }, 250);
  }, []);

  const next = useCallback(() => {
    goTo((active + 1) % testimonials.length);
  }, [active, testimonials.length, goTo]);

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [paused, next, intervalMs, testimonials.length]);

  if (testimonials.length === 0) return null;

  const t = testimonials[active];

  return (
    <div
      className="max-w-2xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <figure
        className="rounded-lg sm:rounded-xl p-6 sm:p-8 border border-[#434343] hover:border-gray-600 transition-all duration-300 flex flex-col justify-between"
        style={{
          minHeight: '180px',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}
      >
        <blockquote
          className="text-[#BFBFBF] text-sm sm:text-[15px] leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}
        >
          <span className="text-2xl text-[#434343] font-serif leading-none mr-1">&ldquo;</span>
          {t.quote}
          <span className="text-2xl text-[#434343] font-serif leading-none ml-1">&rdquo;</span>
        </blockquote>

        <div className="flex items-center justify-between gap-4">
          <figcaption className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-white"
              style={{ background: 'linear-gradient(135deg, #E9414C 0%, #FF9634 100%)' }}
            >
              {t.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <p
                className="text-sm font-semibold text-white"
                style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}
              >
                {t.author}
              </p>
              <p
                className="text-xs text-[#8C8C8C]"
                style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}
              >
                {t.role}{t.role && t.company ? ', ' : ''}{t.company}
              </p>
            </div>
          </figcaption>

          {/* Dot indicators — only show when there are multiple */}
          {testimonials.length > 1 && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="rounded-full transition-all duration-300 focus:outline-none"
                  style={{
                    width: i === active ? '20px' : '8px',
                    height: '8px',
                    background: i === active
                      ? 'linear-gradient(90deg, #E9414C, #FF9634)'
                      : '#434343',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </figure>
    </div>
  );
}

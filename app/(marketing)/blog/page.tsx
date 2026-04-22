import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity/client'
import { ALL_POSTS_QUERY } from '@/lib/sanity/queries'
import { SanityPost } from '@/lib/sanity/types'
import JsonLd from '@/components/seo/JsonLd'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog — Insights on Talent, AI & Growth',
  description: 'Expert insights on hiring on-demand talent, AI adoption, cybersecurity, DevOps, growth marketing, and scaling your business with vetted professionals.',
  keywords: ['talent blog', 'hire AI engineer', 'on-demand talent tips', 'staff augmentation guide', 'cybersecurity hiring'],
  alternates: { canonical: 'https://www.knacksters.co/blog' },
  openGraph: {
    title: 'Blog — Knacksters | Insights on Talent, AI & Growth',
    description: 'Expert insights on hiring on-demand talent, AI adoption, cybersecurity, and scaling with vetted professionals.',
    url: 'https://www.knacksters.co/blog',
    images: [{ url: '/hero-bg.png', width: 1200, height: 630, alt: 'Knacksters Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Knacksters | Insights on Talent, AI & Growth',
    description: 'Expert insights on hiring on-demand talent, AI adoption, cybersecurity, and scaling with vetted professionals.',
  },
}

const CATEGORY_LABELS: Record<string, string> = {
  'customer-success': 'Customer Success',
  'cybersecurity': 'Cybersecurity',
  'hiring': 'Hiring',
}

const CATEGORY_COLORS: Record<string, string> = {
  'customer-success': '#FF9634',
  'cybersecurity': '#E9414C',
  'hiring': '#7C3AED',
}

function formatDate(dateString?: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.knacksters.co' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.knacksters.co/blog' },
  ],
}

export default async function BlogIndexPage() {
  const posts: SanityPost[] = await sanityClient.fetch(ALL_POSTS_QUERY)

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section
        className="relative bg-[rgb(250,250,250)] bg-cover bg-center overflow-hidden py-16 sm:py-20 px-4"
        style={{ backgroundImage: 'url(/hero-bg.png)', backgroundPosition: 'center bottom' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-mono font-normal text-[2rem] sm:text-[2.5rem] md:text-[3rem] text-[rgb(38,38,38)] mb-4 leading-tight">
            Insights on{' '}
            <span style={{ backgroundImage: 'linear-gradient(90deg, #E9414C 0%, #FF9634 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Talent & Growth
            </span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-[rgb(89,89,89)] max-w-2xl mx-auto leading-relaxed">
            Practical guides on hiring vetted professionals, AI adoption, cybersecurity, and scaling your business.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-sans text-[rgb(140,140,140)] text-lg">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const accentColor = post.category ? CATEGORY_COLORS[post.category] ?? '#FF9634' : '#FF9634'
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white rounded-xl border border-gray-200 hover:border-[#FF9634] hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="h-1 w-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
                    <div className="p-6 flex flex-col flex-1">
                      {post.category && (
                        <span
                          className="text-xs font-semibold uppercase tracking-wider font-sans mb-3"
                          style={{ color: accentColor }}
                        >
                          {CATEGORY_LABELS[post.category] ?? post.category}
                        </span>
                      )}
                      <h2 className="font-mono font-normal text-lg text-[rgb(38,38,38)] mb-3 group-hover:text-[#E9414C] transition-colors leading-snug">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="font-sans text-sm text-[rgb(89,89,89)] leading-relaxed flex-1 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        {post.publishedAt && (
                          <span className="text-xs font-sans text-[rgb(140,140,140)]">
                            {formatDate(post.publishedAt)}
                          </span>
                        )}
                        <span
                          className="text-xs font-semibold font-sans flex items-center gap-1 group-hover:gap-2 transition-all"
                          style={{ color: accentColor }}
                        >
                          Read more
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#262626]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] text-white mb-4">
            Ready to deploy expert talent?
          </h2>
          <p className="font-sans text-base text-[rgb(140,140,140)] mb-8">
            Start with 50 free hours. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 rounded-lg font-sans font-semibold text-white text-base transition-opacity hover:opacity-90"
            style={{ backgroundImage: 'linear-gradient(90deg, #E9414C 0%, #FF9634 100%)' }}
          >
            Get Started Free →
          </Link>
        </div>
      </section>
    </>
  )
}

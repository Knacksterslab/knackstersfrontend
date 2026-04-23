import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { sanityClient } from '@/lib/sanity/client'
import { ROLE_BY_SLUG_QUERY, ALL_ROLE_SLUGS_QUERY } from '@/lib/sanity/queries'
import { SanityRolePage, SanityBlock } from '@/lib/sanity/types'
import JsonLd from '@/components/seo/JsonLd'

export const revalidate = 60

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(ALL_ROLE_SLUGS_QUERY)
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const role: SanityRolePage | null = await sanityClient.fetch(ROLE_BY_SLUG_QUERY, { slug: params.slug })
  if (!role) return {}

  const title = role.seoTitle ?? `Hire a ${role.title} | Knacksters`
  const description = role.seoDescription ?? role.shortIntro ?? `Find pre-vetted ${role.title} professionals on demand. Matched in under 30 minutes. Start with 50 free hours.`
  const url = `https://www.knacksters.co/roles/${params.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: '/hero-bg.png', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="font-mono font-normal text-2xl text-[rgb(38,38,38)] mt-8 mb-3">{children}</h1>,
    h2: ({ children }: any) => <h2 className="font-mono font-normal text-xl text-[rgb(38,38,38)] mt-6 mb-2">{children}</h2>,
    h3: ({ children }: any) => <h3 className="font-mono font-normal text-lg text-[rgb(38,38,38)] mt-4 mb-2">{children}</h3>,
    normal: ({ children }: any) => <p className="font-sans text-base text-[rgb(89,89,89)] leading-relaxed mb-3">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-1 font-sans text-[rgb(89,89,89)]">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-1 font-sans text-[rgb(89,89,89)]">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-base leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="text-base leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-[rgb(38,38,38)]">{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ value, children }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-[#E9414C] underline hover:no-underline">
        {children}
      </a>
    ),
  },
}

interface SectionProps {
  title: string
  accentColor: string
  content?: SanityBlock[]
}

function RoleSection({ title, accentColor, content }: SectionProps) {
  if (!content?.length) return null
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
        <h2 className="font-mono font-normal text-xl text-[rgb(38,38,38)]">{title}</h2>
      </div>
      <div className="pl-4">
        <PortableText value={content} components={portableTextComponents} />
      </div>
    </div>
  )
}

export default async function RolePage({ params }: Props) {
  const role: SanityRolePage | null = await sanityClient.fetch(ROLE_BY_SLUG_QUERY, { slug: params.slug })
  if (!role) notFound()

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${role.title} — On Demand`,
    description: role.seoDescription ?? role.shortIntro ?? `Pre-vetted ${role.title} professionals available on demand.`,
    provider: { '@type': 'Organization', name: 'Knacksters', url: 'https://www.knacksters.co' },
    serviceType: role.title,
    areaServed: 'Worldwide',
    url: `https://www.knacksters.co/roles/${params.slug}`,
    offers: {
      '@type': 'Offer',
      name: '50 Free Hours Trial',
      price: '0',
      priceCurrency: 'USD',
      description: 'Start with 50 free hours — no credit card required.',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.knacksters.co' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://www.knacksters.co/solutions' },
      { '@type': 'ListItem', position: 3, name: role.title, item: `https://www.knacksters.co/roles/${params.slug}` },
    ],
  }

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section
        className="relative bg-[rgb(250,250,250)] bg-cover bg-center overflow-hidden py-16 sm:py-20 px-4"
        style={{ backgroundImage: 'url(/hero-bg.png)', backgroundPosition: 'center bottom' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="font-sans text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ color: '#FF9634' }}
          >
            On-Demand Talent
          </p>
          <h1 className="font-mono font-normal text-[2rem] sm:text-[2.5rem] md:text-[3rem] text-[rgb(38,38,38)] leading-tight mb-4">
            Hire a{' '}
            <span style={{ backgroundImage: 'linear-gradient(90deg, #E9414C 0%, #FF9634 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {role.title}
            </span>
          </h1>
          {role.shortIntro && (
            <p className="font-sans text-base sm:text-lg text-[rgb(89,89,89)] max-w-2xl mx-auto leading-relaxed mb-8">
              {role.shortIntro}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-block px-8 py-4 rounded-lg font-sans font-semibold text-white text-base transition-opacity hover:opacity-90"
              style={{ backgroundImage: 'linear-gradient(90deg, #E9414C 0%, #FF9634 100%)' }}
            >
              Start Free — 50 Hours →
            </Link>
            <Link
              href="/how-it-works"
              className="inline-block px-8 py-4 rounded-lg font-sans font-semibold text-[rgb(38,38,38)] text-base border border-gray-300 hover:border-[#FF9634] transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-8 px-4 bg-[#262626]">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: '<30 min', label: 'Matched within' },
            { value: '50 hrs', label: 'Free to start' },
            { value: '100%', label: 'Pre-vetted' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="text-2xl font-bold font-mono mb-1"
                style={{ backgroundImage: 'linear-gradient(90deg, #E9414C 0%, #FF9634 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-sans" style={{ color: 'rgb(140,140,140)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content sections */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <RoleSection title="Who This Is For" accentColor="#FF9634" content={role.whoItsFor} />
          <RoleSection title="Common Problems We Solve" accentColor="#E9414C" content={role.commonProblems} />
          <RoleSection title="What to Test in Your Free Trial" accentColor="#7C3AED" content={role.whatToTestInTrial} />
          <RoleSection title="Why Knacksters" accentColor="#0EA5E9" content={role.whyKnacksters} />
          <RoleSection title="Frequently Asked Questions" accentColor="#10B981" content={role.faq} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#262626]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-mono font-normal text-[1.75rem] sm:text-[2rem] text-white mb-4">
            Ready to hire a {role.title}?
          </h2>
          <p className="font-sans text-base text-[rgb(140,140,140)] mb-8">
            Get matched with pre-vetted talent in under 30 minutes. Start with 50 free hours.
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

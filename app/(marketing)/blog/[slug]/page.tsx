import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { sanityClient } from '@/lib/sanity/client'
import { POST_BY_SLUG_QUERY, ALL_POST_SLUGS_QUERY } from '@/lib/sanity/queries'
import { SanityPost } from '@/lib/sanity/types'
import JsonLd from '@/components/seo/JsonLd'

export const revalidate = 60

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(ALL_POST_SLUGS_QUERY)
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post: SanityPost | null = await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug: params.slug })
  if (!post) return {}

  const title = post.seoTitle ?? post.title
  const description = post.seoDescription ?? post.excerpt ?? ''
  const url = `https://www.knacksters.co/blog/${params.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: '/hero-bg.png', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  'customer-success': 'Customer Success',
  'cybersecurity': 'Cybersecurity',
  'hiring': 'Hiring',
}

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="font-mono font-normal text-2xl sm:text-3xl text-[rgb(38,38,38)] mt-10 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="font-mono font-normal text-xl sm:text-2xl text-[rgb(38,38,38)] mt-8 mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="font-mono font-normal text-lg text-[rgb(38,38,38)] mt-6 mb-2">{children}</h3>,
    normal: ({ children }: any) => <p className="font-sans text-base text-[rgb(89,89,89)] leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#FF9634] pl-4 my-6 italic font-sans text-[rgb(89,89,89)]">{children}</blockquote>
    ),
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

function formatDate(dateString?: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: Props) {
  const post: SanityPost | null = await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug: params.slug })
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    datePublished: post.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Knacksters',
      url: 'https://www.knacksters.co',
      logo: { '@type': 'ImageObject', url: 'https://www.knacksters.co/logo.svg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.knacksters.co/blog/${params.slug}` },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.knacksters.co' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.knacksters.co/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.knacksters.co/blog/${params.slug}` },
    ],
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <article className="min-h-screen">
        {/* Header */}
        <section
          className="relative bg-[rgb(250,250,250)] bg-cover bg-center overflow-hidden py-14 sm:py-20 px-4"
          style={{ backgroundImage: 'url(/hero-bg.png)', backgroundPosition: 'center bottom' }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/blog" className="font-sans text-sm text-[rgb(140,140,140)] hover:text-[#E9414C] transition-colors">
                ← Blog
              </Link>
              {post.category && (
                <>
                  <span className="text-[rgb(200,200,200)]">/</span>
                  <span
                    className="font-sans text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full text-white"
                    style={{ backgroundImage: 'linear-gradient(90deg, #E9414C 0%, #FF9634 100%)' }}
                  >
                    {CATEGORY_LABELS[post.category] ?? post.category}
                  </span>
                </>
              )}
            </div>
            <h1 className="font-mono font-normal text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] text-[rgb(38,38,38)] leading-tight mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="font-sans text-base sm:text-lg text-[rgb(89,89,89)] leading-relaxed mb-4">
                {post.excerpt}
              </p>
            )}
            {post.publishedAt && (
              <span className="font-sans text-sm text-[rgb(140,140,140)]">
                {formatDate(post.publishedAt)}
              </span>
            )}
          </div>
        </section>

        {/* Body */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            {post.body ? (
              <PortableText value={post.body} components={portableTextComponents} />
            ) : (
              <p className="font-sans text-[rgb(140,140,140)]">No content yet.</p>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-[#262626]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-mono font-normal text-[1.5rem] sm:text-[2rem] text-white mb-4">
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
      </article>
    </>
  )
}

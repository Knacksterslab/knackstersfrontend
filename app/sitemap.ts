import { MetadataRoute } from 'next';
import { sanityClient } from '@/lib/sanity/client';
import { ALL_POST_SLUGS_QUERY, ALL_ROLE_SLUGS_QUERY, ALL_CASE_STUDY_SLUGS_QUERY, ALL_COMPARISON_SLUGS_QUERY } from '@/lib/sanity/queries';

const BASE_URL = 'https://www.knacksters.co';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/solutions/try-before-you-hire`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/solutions/ai-solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/solutions/cybersecurity`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/solutions/development-devops`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/solutions/design-creative`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/solutions/marketing`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/solutions/healthcare-life-sciences`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  try {
    const [postSlugs, roleSlugs, caseStudySlugs, comparisonSlugs] = await Promise.all([
      sanityClient.fetch<{ slug: string }[]>(ALL_POST_SLUGS_QUERY),
      sanityClient.fetch<{ slug: string }[]>(ALL_ROLE_SLUGS_QUERY),
      sanityClient.fetch<{ slug: string }[]>(ALL_CASE_STUDY_SLUGS_QUERY),
      sanityClient.fetch<{ slug: string }[]>(ALL_COMPARISON_SLUGS_QUERY),
    ]);

    const blogPages: MetadataRoute.Sitemap = postSlugs
      .filter((s) => s.slug)
      .map((s) => ({
        url: `${BASE_URL}/blog/${s.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
      }));

    const rolePages: MetadataRoute.Sitemap = roleSlugs
      .filter((s) => s.slug)
      .map((s) => ({
        url: `${BASE_URL}/roles/${s.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      }));

    const caseStudyPages: MetadataRoute.Sitemap = caseStudySlugs
      .filter((s) => s.slug)
      .map((s) => ({
        url: `${BASE_URL}/case-studies/${s.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      }));

    const comparisonPages: MetadataRoute.Sitemap = comparisonSlugs
      .filter((s) => s.slug)
      .map((s) => ({
        url: `${BASE_URL}/compare/${s.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      }));

    return [...staticPages, ...blogPages, ...rolePages, ...caseStudyPages, ...comparisonPages];
  } catch {
    return staticPages;
  }
}

interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Knacksters',
  url: 'https://www.knacksters.co',
  logo: 'https://www.knacksters.co/logo.svg',
  description: '360° on-demand cloud workforce with pre-vetted professionals across AI, cybersecurity, development, design, marketing, and healthcare.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'connect@knacksters.co',
    contactType: 'customer support',
  },
  sameAs: [
    'https://twitter.com/knackstersco',
    'https://www.linkedin.com/company/knacksters',
    'https://www.youtube.com/@KnackstersLab',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Knacksters',
  url: 'https://www.knacksters.co',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.knacksters.co/solutions/{search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

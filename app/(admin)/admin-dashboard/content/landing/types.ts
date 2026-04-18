export interface TalentCard {
  id: string;
  image: string;
  name: string;
  role: string;
}

export type SolutionIcon = 'calendar' | 'customer-service' | 'development' | 'design' | 'marketing' | 'ai-brain' | 'shield' | 'healthcare';

export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  icon: SolutionIcon;
}

export interface LandingContent {
  hero: {
    headline: string;
    subheadline: string;
    ctaButtonText: string;
    talentCards: TalentCard[];
  };
  statistics: {
    professionals: string;
    professionalsLabel: string;
    hoursDelivered: string;
    hoursDeliveredLabel: string;
  };
  partners: {
    title: string;
    description: string;
  };
  solutions: {
    title: string;
    subtitle: string;
    items: SolutionItem[];
    ctaCard: {
      title: string;
      buttonText: string;
      buttonLink: string;
    };
  };
  benefits: {
    title: string;
    subtitle: string;
  };
  useCases: {
    title: string;
    subtitle: string;
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
  seo: {
    pageTitle: string;
    metaDescription: string;
  };
}

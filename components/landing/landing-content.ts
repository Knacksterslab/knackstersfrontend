export interface LandingContent {
  hero: {
    headline: string;
    subheadline: string;
    ctaButtonText: string;
    talentCards: Array<{
      id: string;
      image: string;
      name: string;
      role: string;
    }>;
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
    items: Array<{
      id: string;
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
      icon: 'calendar' | 'customer-service' | 'development' | 'design' | 'marketing' | 'ai-brain' | 'shield' | 'healthcare';
    }>;
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

export const defaultLandingContent: LandingContent = {
  "hero": {
    "headline": "Revolutionize the Way You Work",
    "subheadline": "Meet Knacksters, 360° On-Demand Cloud Workforce!",
    "ctaButtonText": "Get Started",
    "talentCards": [
      {
        "id": "talent-1",
        "image": "/images/1767310859581-san-woman.jpg",
        "name": "Katlego",
        "role": "Runner"
      },
      {
        "id": "talent-2",
        "image": "/images/people-image-2.png",
        "name": "Talent 2",
        "role": "Designer"
      },
      {
        "id": "talent-3",
        "image": "/images/people-image-3.png",
        "name": "Talent 3",
        "role": "Manager"
      },
      {
        "id": "talent-4",
        "image": "/images/people-image-1.png",
        "name": "Talent 4",
        "role": "Developer"
      },
      {
        "id": "talent-5",
        "image": "/images/people-image-2.png",
        "name": "Talent 5",
        "role": "Marketer"
      },
      {
        "id": "talent-6",
        "image": "/images/people-image-3.png",
        "name": "Talent 6",
        "role": "Analyst"
      }
    ]
  },
  "statistics": {
    "professionals": "9,999+",
    "professionalsLabel": "Professionals in Network",
    "hoursDelivered": "960,000+",
    "hoursDeliveredLabel": "Hours Delivered"
  },
  "partners": {
    "title": "Trusted by Leading Companies",
    "description": "Deploy expert talent for your most critical needs in minutes, not hours. Join the innovative companies that trust our vetted network to deliver results."
  },
  "solutions": {
    "title": "Solutions",
    "subtitle": "Empower Your Business with Our Comprehensive Professional Ecosystem!",
    "items": [
      {
        "id": "ai-solutions",
        "title": "Harness the Power of AI",
        "description": "From strategy to implementation and compliance—our AI specialists help you adopt, optimize, and scale intelligent solutions tailored to your business needs.",
        "buttonText": "Transform with AI",
        "buttonLink": "/solutions/ai-solutions",
        "icon": "ai-brain"
      },
      {
        "id": "cybersecurity",
        "title": "Secure Your Digital Assets",
        "description": "Protect your business from evolving threats with our comprehensive cybersecurity solutions, from proactive defense to rapid incident response.",
        "buttonText": "Protect Your Business",
        "buttonLink": "/solutions/cybersecurity",
        "icon": "shield"
      },
      {
        "id": "development",
        "title": "Build with Confidence",
        "description": "Transform ideas into reality with our expert software engineers, DevOps specialists, and cloud architects. From frontend to backend, mobile to cloud-native—we build scalable, reliable systems.",
        "buttonText": "Build Smarter Today",
        "buttonLink": "/solutions/development-devops",
        "icon": "development"
      },
      {
        "id": "design",
        "title": "Craft a Lasting Impression",
        "description": "From captivating graphics to user-friendly web designs, our UX/UI experts build engaging digital experiences that reflect your brand's vision.",
        "buttonText": "Design Your Future",
        "buttonLink": "/solutions/design-creative",
        "icon": "design"
      },
      {
        "id": "marketing",
        "title": "Marketing That Drives Results",
        "description": "Our SEO specialists, content creators, and social media experts deliver strategies that enhance your brand visibility and drive growth. Take your business to the forefront of the digital space.",
        "buttonText": "Boost Your Brand Now",
        "buttonLink": "/solutions/marketing",
        "icon": "marketing"
      },
      {
        "id": "healthcare",
        "title": "Healthcare & Life Sciences Excellence",
        "description": "Specialized talent for clinical trials, data management, and regulatory compliance. From clinical data managers to biostatisticians—accelerate your clinical programs with expert healthcare professionals.",
        "buttonText": "Discover Solutions",
        "buttonLink": "/solutions/healthcare-life-sciences",
        "icon": "healthcare"
      }
    ],
    "ctaCard": {
      "title": "Ready to Transform Your Business?",
      "buttonText": "Discover your team today",
      "buttonLink": "/signup"
    }
  },
  "benefits": {
    "title": "Why Choose Knacksters?",
    "subtitle": "Experience unmatched flexibility, quality, and support designed to help your business thrive."
  },
  "useCases": {
    "title": "Unlock Limitless Potential – Explore Knacksters' Use Cases",
    "subtitle": "Discover how Knacksters tackles challenges with precision, backed by smart tools and expert strategies."
  },
  "cta": {
    "title": "Reimagine Your Business Operations with Knacksters",
    "description": "Join a network where expert teams and smart tools simplify success.",
    "buttonText": "Join Knacksters Now"
  },
  "seo": {
    "pageTitle": "Knacksters - 360° On-Demand Cloud Workforce",
    "metaDescription": "Access a 360° on-demand cloud workforce with Knacksters. Connect with pre-vetted professionals across AI, cybersecurity, development, design, marketing, and healthcare."
  }
};

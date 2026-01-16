export interface Partner {
  id: string;
  name: string;
  logoUrl: string; // Path to logo in /public/images/partners/
  logoUrlDark?: string; // Optional dark mode logo
  active: boolean;
  website?: string; // Optional link to partner site
  category?: 'client' | 'technology'; // Optional categorization
}

export const partners: Partner[] = [
  {
    id: 'cirklu-devtool',
    name: 'Cirklu Security',
    logoUrl: '/images/partners/1767320056131-chatgpt-image-aug-6--2025--09-13-58-pm-removebg-preview.png',
    active: true,
    category: 'client',
    website: 'http://www.cirklu.com'
  },
  {
    id: 'qintium',
    name: 'Qintium Finance',
    logoUrl: '/images/partners/1767303003964-canvas.png',
    active: true,
    category: 'client'
  },
  {
    id: 'venchurify',
    name: 'Venchurify',
    logoUrl: '/images/partners/1767303071733-chatgpt-image-aug-30--2025--11-02-00-am.png',
    active: true,
    category: 'client'
  },
  {
    id: 'skilldna',
    name: 'Skilldna',
    logoUrl: '/images/partners/1767319974892-chatgpt-image-sep-7--2025--10-08-18-pm-removebg-preview.png',
    active: true,
    category: 'client'
  },
  {
    id: 'dijiny',
    name: 'Dijiny',
    logoUrl: '/images/partners/1767303132704-dijiny--1-.png',
    active: true,
    category: 'client'
  },
  {
    id: 'pepster',
    name: 'Pepster',
    logoUrl: '/images/partners/1767319987780-pepsterapp-logo-removebg-preview.png',
    active: true,
    category: 'client'
  },
  {
    id: 'seftekra',
    name: 'Seftekra',
    logoUrl: '/images/partners/1767320030131-chatgpt-image-jan-1--2026--03-34-34-pm-removebg-preview.png',
    active: true,
    category: 'client'
  },
  {
    id: 'streetit-button',
    name: 'Streeqit',
    logoUrl: '/images/partners/1767319829687-chatgpt-image-jan-1--2026--03-49-53-pm-removebg-preview.png',
    active: true,
    category: 'client'
  }
];

// Helper functions
export const getActivePartners = () => partners.filter(p => p.active);
export const getPartnersByCategory = (category: 'client' | 'technology') => 
  partners.filter(p => p.active && p.category === category);

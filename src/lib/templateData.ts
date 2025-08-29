export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  isPremium: boolean;
  colors: string[];
  features: string[];
}

export const fallbackTemplates: Template[] = [
  {
    id: 'chameleon-pro',
    name: 'Chameleon Pro',
    description: 'ATS-friendly resume with customizable colors and professional layout',
    category: 'Professional',
    thumbnail: '/templates/chameleon-pro.jpg',
    isPremium: false,
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
    features: ['ATS Optimized', 'Custom Colors', 'Professional Layout', 'Print Ready']
  },
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    description: 'Clean and modern design with focus on content and readability',
    category: 'Modern',
    thumbnail: '/templates/modern-minimalist.jpg',
    isPremium: false,
    colors: ['#6366f1', '#06b6d4', '#84cc16', '#f97316'],
    features: ['Modern Design', 'Clean Layout', 'Mobile Friendly', 'Easy to Customize']
  },
  {
    id: 'executive-classic',
    name: 'Executive Classic',
    description: 'Traditional resume format preferred by conservative industries',
    category: 'Classic',
    thumbnail: '/templates/executive-classic.jpg',
    isPremium: true,
    colors: ['#1e40af', '#374151', '#9ca3af', '#4b5563'],
    features: ['Traditional Layout', 'Executive Style', 'Industry Standard', 'Professional']
  },
  {
    id: 'creative-modern',
    name: 'Creative Modern',
    description: 'Modern design with creative elements for designers and creatives',
    category: 'Creative',
    thumbnail: '/templates/creative-modern.jpg',
    isPremium: true,
    colors: ['#8b5cf6', '#ec4899', '#f43f5e', '#d946ef'],
    features: ['Creative Design', 'Modern Layout', 'Portfolio Integration', 'Visual Appeal']
  }
];

export const getTemplatesWithFallback = async (): Promise<Template[]> => {
  try {
    const response = await fetch('/api/templates');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch templates: ${response.status}`);
    }
    
    const templates = await response.json();
    
    // Validate the response structure
    if (Array.isArray(templates) && templates.length > 0) {
      return templates;
    }
    
    throw new Error('Invalid templates data received');
  } catch (error) {
    console.warn('Using fallback templates due to error:', error);
    return fallbackTemplates;
  }
};

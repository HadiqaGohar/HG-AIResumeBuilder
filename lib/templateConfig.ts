// Template Configuration System
// This makes it easy to add new templates

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  image: string;
  isWorking: boolean;
  category?: string;
  features?: string[];
  isPro?: boolean;
  popularity?: number;
  link?: string;
}

export const templateConfigs: TemplateConfig[] = [
  {
    id: '1',
    name: 'Chameleon Pro Resume',
    description: 'Clean, ATS-friendly design with customizable colors to match your personal brand.',
    image: '/Template/template1.png',
    isWorking: true,
    category: 'Professional',
    features: [
      'ATS-Friendly',
      'Customizable Colors',
      'Professional Layout',
      'Sidebar Design'
    ],
    isPro: false,
    link: '/dashboard/Template1'
  },
  {
    id: '2',
    name: 'Modern Professional',
    description: 'Two-column, professional layout with modern styling and timeline design.',
    image: '/Template/template2.png',
    isWorking: true,
    category: 'Modern',
    features: [
      'Two-Column Layout',
      'Timeline Design',
      'Clean Typography',
      'Professional Look',
      'Progress Bars'
    ],
    isPro: false,
    link: '/dashboard/Template2'

  },
  {
    id: '3',
    name: 'Creative Sidebar',
    description: 'Perfect for creative professionals with sidebar design and gradient colors.',
    image: '/Template/template3.png',
    isWorking: true,
    category: 'Creative',
    features: [
      'Sidebar Design',
      'Gradient Colors',
      'Creative Layout',
      'Visual Elements',
      'Color Accents'
    ],
    isPro: false,
    link: '/dashboard/Template3'
  },
  {
    id: '4',
    name: 'Executive Elite',
    description: 'Sophisticated design for senior-level professionals.',
    image: '/coming.jpg',
    isWorking: false,
    category: 'Executive',
    features: [
      'Executive Style',
      'Sophisticated Design',
      'Leadership Focus',
      'Premium Look'
    ],
    isPro: true
  },
  {
    id: '5',
    name: 'Tech Specialist',
    description: 'Optimized for developers and tech professionals.',
    image: '/coming.jpg',
    isWorking: false,
    category: 'Technology',
    features: [
      'Tech-Focused',
      'Skills Highlight',
      'Project Showcase',
      'Clean Code Style'
    ],
    isPro: false
  },
  {
    id: '6',
    name: 'Minimalist Pro',
    description: 'Clean and simple design focusing on content.',
    image: '/coming.jpg',
    isWorking: false,
    category: 'Professional',
    features: [
      'Minimalist Design',
      'Content Focus',
      'Clean Layout',
      'Professional'
    ],
    isPro: false
  },
  {
    id: '7',
    name: 'Creative Portfolio',
    description: 'Perfect for designers and creative professionals.',
    image: '/coming.jpg',
    isWorking: false,
    category: 'Creative',
    features: [
      'Portfolio Showcase',
      'Visual Elements',
      'Creative Layout',
      'Color Highlights'
    ],
    isPro: true
  },
  {
    id: '8',
    name: 'Corporate Executive',
    description: 'Sophisticated design for C-level executives.',
    image: '/coming.jpg',
    isWorking: false,
    category: 'Executive',
    features: [
      'Executive Style',
      'Leadership Focus',
      'Premium Design',
      'Professional'
    ],
    isPro: true
  },
  {
    id: '9',
    name: 'Modern Gradient',
    description: 'Contemporary design with gradient accents.',
    image: '/coming.jpg',
    isWorking: false,
    category: 'Modern',
    features: [
      'Gradient Design',
      'Modern Layout',
      'Color Accents',
      'Contemporary'
    ],
    isPro: false
  },
  {
    id: '10',
    name: 'Academic Scholar',
    description: 'Designed for academic and research professionals.',
    image: '/coming.jpg',
    isWorking: false,
    category: 'Professional',
    features: [
      'Academic Focus',
      'Research Highlight',
      'Publication Section',
      'Scholarly Design'
    ],
    isPro: false
  }
];

// Helper functions
export const getTemplateById = (id: string): TemplateConfig | undefined => {
  return templateConfigs.find(template => template.id === id);
};

export const getWorkingTemplates = (): TemplateConfig[] => {
  return templateConfigs.filter(template => template.isWorking);
};

export const getTemplatesByCategory = (category: string): TemplateConfig[] => {
  return templateConfigs.filter(template => template.category === category);
};

export const getProTemplates = (): TemplateConfig[] => {
  return templateConfigs.filter(template => template.isPro);
};

export const getFreeTemplates = (): TemplateConfig[] => {
  return templateConfigs.filter(template => !template.isPro);
};

// Template component mapping
export const getTemplateComponent = (templateId: string) => {
  switch (templateId) {
    case '1':
      return 'Template1';
    case '2':
      return 'Template2';
    case '3':
      return 'Template3';
    case '4':
      return 'Template4';
    case '5':
      return 'Template5';
    default:
      return 'Template1';
  }
};

// Instructions for adding new templates:
/*
To add a new template:

1. Add template config to templateConfigs array above
2. Create the template component in /components/templates/
3. Add the import and case in TemplateRenderer.tsx
4. Add the template image to /public/Template/
5. Set isWorking: true when template is ready

Example:
{
  id: '6',
  name: 'New Template Name',
  description: 'Description of the template',
  image: '/Template/template6.png',
  isWorking: true,
  category: 'Category',
  features: ['Feature 1', 'Feature 2'],
  isPro: false
}
*/
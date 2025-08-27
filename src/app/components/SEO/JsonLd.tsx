import React from 'react';

interface JsonLdProps {
  data: object;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Common structured data schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "HG Resume Builder",
  "url": "https://hg-resume-builder.vercel.app",
  "logo": "https://hg-resume-builder.vercel.app/logo.png",
  "description": "Professional AI-powered resume builder with ATS-friendly templates",
  "founder": {
    "@type": "Person",
    "name": "Hadiqa Gohar",
    "url": "https://github.com/HadiqaGohar"
  },
  "sameAs": [
    "https://github.com/HadiqaGohar",
    "https://linkedin.com/in/hadiqagohar"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://hg-resume-builder.vercel.app/contact"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "HG Resume Builder",
  "url": "https://hg-resume-builder.vercel.app",
  "description": "Create professional resumes with AI-powered tools and ATS-friendly templates",
  "publisher": {
    "@type": "Organization",
    "name": "HG Resume Builder"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://hg-resume-builder.vercel.app/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "HG Resume Builder",
  "description": "AI-powered professional resume builder with ATS-friendly templates",
  "url": "https://hg-resume-builder.vercel.app",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1250",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "AI-powered resume generation",
    "ATS-friendly templates", 
    "Real-time preview",
    "Multiple export formats",
    "Professional templates",
    "Skills optimization",
    "Cover letter creation",
    "Job matching suggestions"
  ]
};
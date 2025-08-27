import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Professional Resume Templates | HG Resume Builder - ATS-Friendly CV Templates",
  description: "Choose from 10+ professional resume templates designed by experts. ATS-friendly, customizable, and perfect for any industry. Create your perfect CV in minutes - completely free!",
  keywords: [
    "resume templates",
    "CV templates", 
    "professional resume templates",
    "ATS friendly templates",
    "free resume templates",
    "modern resume templates",
    "creative resume templates",
    "executive resume templates",
    "tech resume templates",
    "resume design",
    "CV design",
    "job application templates"
  ],
  openGraph: {
    title: "Professional Resume Templates | HG Resume Builder",
    description: "Choose from 10+ professional resume templates designed by experts. ATS-friendly, customizable, and perfect for any industry.",
    url: "https://hg-resume-builder.vercel.app/template",
    type: "website",
    images: [
      {
        url: "/og-templates.png",
        width: 1200,
        height: 630,
        alt: "HG Resume Builder - Professional Resume Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Resume Templates | HG Resume Builder",
    description: "Choose from 10+ professional resume templates designed by experts. ATS-friendly and customizable.",
    images: ["/og-templates.png"],
  },
  alternates: {
    canonical: "https://hg-resume-builder.vercel.app/template",
  },
};
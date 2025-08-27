import React from "react";

import Home from "./components/Home";
import Card from "./components/Card";
import CVSecion from "./components/CVSecion";
import BugReportButton from "./components/BugReportButton";
import SupportSection from "./components/SupportSection";

import MovingSeparation from "./components/Sepration";
import MovingPills from "./components/Movingpills";
import Features from "./components/Features";
import ActiveTemplates from "./components/ActiveTemplates";

// Enhanced structured data for homepage
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://hg-resume-builder.vercel.app/#website",
      url: "https://hg-resume-builder.vercel.app/",
      name: "HG Resume Builder",
      description:
        "Professional AI-powered resume builder with ATS-friendly templates",
      publisher: {
        "@id": "https://hg-resume-builder.vercel.app/#organization",
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://hg-resume-builder.vercel.app/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://hg-resume-builder.vercel.app/#organization",
      name: "HG Resume Builder",
      url: "https://hg-resume-builder.vercel.app/",
      logo: {
        "@type": "ImageObject",
        url: "https://hg-resume-builder.vercel.app/logo.png",
      },
      founder: {
        "@type": "Person",
        name: "Hadiqa Gohar",
      },
      sameAs: ["https://github.com/HadiqaGohar"],
    },
    {
      "@type": "WebApplication",
      name: "HG Resume Builder",
      description:
        "Create professional resumes with AI-powered tools and ATS-friendly templates",
      url: "https://hg-resume-builder.vercel.app/",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1250",
        bestRating: "5",
        worstRating: "1",
      },
      featureList: [
        "AI-powered resume generation",
        "ATS-friendly templates",
        "Real-time preview",
        "Multiple export formats",
        "Professional templates",
        "Skills optimization",
        "Cover letter creation",
        "Job matching suggestions",
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://hg-resume-builder.vercel.app/",
        },
      ],
    },
  ],
};

function Main() {
  return (
    <>
      {/* Enhanced structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="relative">
        {/* Semantic HTML structure for better SEO */}
        <section aria-label="Hero section">
          <Home />
        </section>

        {/* Visual separator */}
        <div className="flex" role="presentation">
          <div className="bg-purple-500 h-3 w-[800px]"></div>
          <div className="bg-yellow-300 h-3 w-[300px] rounded-r-lg"></div>
        </div>

        <section aria-label="Resume templates showcase">
          <Card />
        </section>

        <section aria-label="Features overview">
          <MovingPills />
        </section>

        <section aria-label="CV creation process">
          <CVSecion />
        </section>

        <MovingSeparation />

        <section aria-label="Application features">
          <Features />
        </section>

        <section aria-label="Featured resume templates">
          <ActiveTemplates />
        </section>

        <section aria-label="Support and help">
          <SupportSection />
        </section>

        {/* Floating Bug Report Button */}
        <BugReportButton />
      </main>
    </>
  );
}

export default Main;

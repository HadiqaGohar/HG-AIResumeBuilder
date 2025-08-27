

// 'use client';

// import React from 'react';
// // Import specific icons you want to use
// // Using Simple Icons (Si) for most tech logos
// import {
//   SiNextdotjs,
//   SiReact,
//   SiTypescript,
//   SiTailwindcss,
//   SiOpenai,
//   SiFirebase,
//   SiMongodb,
//   SiNodedotjs, // Changed from FaNodeJs for consistency if Si available
//   SiVercel,
//      // Corrected import!
//   SiHtml5,          // For HTML
//   SiCss3,           // For CSS
//   SiJavascript,     // For JavaScript
//   SiPython,         // For Python
//   SiStreamlit,      // For Streamlit
//   // SiChainlit, // Check if SiChainlit exists, otherwise use a generic icon
// } from 'react-icons/si';

// // Using Font Awesome (Fa) for generic icons or if Si is not available
// import {
//   FaBolt,   // Generic for 'uv' (speed/performance)
//   FaLink,   // Generic for 'chainlit' (linking AI components)
//   FaRobot,  // Alternative for AI/Chainlit if FaLink doesn't fit
// } from 'react-icons/fa';


// // Define your logos with their corresponding React Icon components
// const logos = [
//   { id: 1, icon: SiNextdotjs, alt: 'Next.js Logo' },
//   { id: 2, icon: SiReact, alt: 'React Logo' },
//   { id: 3, icon: SiTypescript, alt: 'TypeScript Logo' },
//   { id: 4, icon: SiTailwindcss, alt: 'Tailwind CSS Logo' },
//   { id: 5, icon: SiOpenai, alt: 'OpenAI Logo' },
//   { id: 6, icon: SiFirebase, alt: 'Firebase Logo' },
//   { id: 7, icon: SiMongodb, alt: 'MongoDB Logo' },
//   { id: 8, icon: SiNodedotjs, alt: 'Node.js Logo' }, // Changed to SiNodedotjs
//   { id: 9, icon: SiVercel, alt: 'Vercel Logo' },
// //   { id: 10, icon: SiMicrosoftazure, alt: 'Azure Logo' },
// //   { id: 11, icon: SiAmazonaws, alt: 'AWS Logo' },
//   { id: 12, icon: SiHtml5, alt: 'HTML5 Logo' },
//   { id: 13, icon: SiCss3, alt: 'CSS3 Logo' },
//   { id: 14, icon: SiJavascript, alt: 'JavaScript Logo' },
//   { id: 15, icon: SiPython, alt: 'Python Logo' },
//   { id: 16, icon: FaBolt, alt: 'UV (Fast Python)' }, // Using FaBolt for 'uv'
//   { id: 17, icon: SiStreamlit, alt: 'Streamlit Logo' },
//   { id: 18, icon: FaLink, alt: 'Chainlit (AI Framework)' }, // Using FaLink for 'Chainlit'
//   { id: 19, icon: FaRobot, alt: 'AI' }, // Added a generic AI icon
//   // You can add many more as needed, just import them first!
//   // Example:
//   // { id: 20, icon: SiDocker, alt: 'Docker Logo' },
//   // { id: 21, icon: SiKubernetes, alt: 'Kubernetes Logo' },
//   // { id: 22, icon: SiPostgresql, alt: 'PostgreSQL Logo' },
// ];

// export default function MovingSeparation() {
//   return (
//     <div className="w-full bg-[#091714] overflow-hidden py-8 relative">
//       {/* Fading edges to make the scroll look continuous */}
//       <div className="absolute inset-0 bg-gradient-to-r from-[#091714] via-transparent to-[#091714] z-10 pointer-events-none"></div>

//       {/* The actual scrolling container */}
//       {/* 'logo-scroll' class for global CSS animation */}
//       <div className="flex logo-scroll">
//         {/* Duplicate the logos array to ensure a seamless loop */}
//         {logos.concat(logos).map((logo, index) => {
//           const IconComponent = logo.icon; // Get the icon component
//           return (
//             <div key={`${logo.id}-${index}`} className="flex-shrink-0 mx-8"> {/* Adjust mx for spacing between logos */}
//               {/* Render the React Icon component */}
//               {IconComponent && (
//                 <IconComponent
//                   className="h-12 w-auto text-[#0a9e6d] opacity-70 hover:opacity-100 transition-opacity duration-300"
//                   // Optional: Apply filter for monochrome look, helpful if icons are originally colored
//                   style={{ filter: 'grayscale(100%) brightness(200%)' }}
//                   aria-label={logo.alt} // Good for accessibility
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
// Import specific icons you want to use
// Using Simple Icons (Si) for most tech logos
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiOpenai,
  SiFirebase,
  SiMongodb,
  SiNodedotjs,
  SiVercel,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiPython,
  SiStreamlit,
} from "react-icons/si";

// Using Font Awesome (Fa) for generic icons
import { FaBolt, FaLink, FaRobot } from "react-icons/fa";

const logos = [
  { id: 1, icon: SiNextdotjs, alt: "Next.js Logo" },
  { id: 2, icon: SiReact, alt: "React Logo" },
  { id: 3, icon: SiTypescript, alt: "TypeScript Logo" },
  { id: 4, icon: SiTailwindcss, alt: "Tailwind CSS Logo" },
  { id: 5, icon: SiOpenai, alt: "OpenAI Logo" },
  { id: 6, icon: SiFirebase, alt: "Firebase Logo" },
  { id: 7, icon: SiMongodb, alt: "MongoDB Logo" },
  { id: 8, icon: SiNodedotjs, alt: "Node.js Logo" },
  { id: 9, icon: SiVercel, alt: "Vercel Logo" },
  { id: 10, icon: SiHtml5, alt: "HTML5 Logo" },
  { id: 11, icon: SiCss3, alt: "CSS3 Logo" },
  { id: 12, icon: SiJavascript, alt: "JavaScript Logo" },
  { id: 13, icon: SiPython, alt: "Python Logo" },
  { id: 14, icon: FaBolt, alt: "UV (Fast Python)" },
  { id: 15, icon: SiStreamlit, alt: "Streamlit Logo" },
  { id: 16, icon: FaLink, alt: "Chainlit (AI Framework)" },
  { id: 17, icon: FaRobot, alt: "AI" },
];

export default function MovingSeparation() {
  return (
    <div className="w-full bg-white overflow-hidden py-6 relative">
      <style jsx>{`
        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-scroll {
          display: flex;
          animation: logo-scroll 20s linear infinite;
        }
        .logo-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      {/* Subtle gradient edges to blend with white background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none"></div>

      {/* Scrolling container with original logo-scroll class */}
      <div className="flex logo-scroll">
        {/* Duplicate logos for seamless loop */}
        {logos.concat(logos).map((logo, index) => {
          const IconComponent = logo.icon;
          return (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 mx-6 sm:mx-8 md:mx-10 "
            >
              {IconComponent && (
                <IconComponent
                  className="h-10 sm:h-12 md:h-14 w-auto text-purple-600 opacity-70 hover:opacity-100 transition-opacity duration-300"
                  style={{ filter: "grayscale(0%) brightness(100%)" }}
                  aria-label={logo.alt}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
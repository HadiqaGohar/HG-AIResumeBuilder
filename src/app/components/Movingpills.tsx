// "use client";

// import React from "react";

// // CV, Resume, and AI job-related topics
// const topRowPills = [
//   "AI-Powered Resume Builder",
//   "ATS-Friendly CV Templates",
//   "Professional Resume Design",
//   "Career Objective Writing",
//   "Skills Section Optimization",
//   "Work Experience Formatting",
//   "Achievement Quantification",
//   "Industry-Specific Resumes",
// ];

// const midRowPills = [
//   "Executive CV Creation",
//   "Technical Skills Showcase",
//   "Leadership Experience Highlighting",
//   "Career Gap Solutions",
//   "Professional Summary Writing",
//   "Education Section Enhancement",
//   "Certification Placement",
//   "Portfolio Integration",
// ];

// const bottomRowPills = [
//   "Interview Preparation Guide",
//   "Salary Negotiation Tips",
//   "LinkedIn Profile Optimization",
//   "Cover Letter Automation",
//   "Job Market Analysis",
//   "Career Transition Support",
//   "Personal Branding Strategy",
//   "AI Job Matching",
// ];

// export default function MovingPills() {
//   const sectionBgColorClass = "bg-white dark:bg-neutral-950";
//   const fadeColorClass = "from-white dark:from-neutral-950";

//   return (
//     <section
//       className={`w-full py-16 ${sectionBgColorClass} text-black dark:text-white overflow-hidden`}
//     >
//       <div className="max-w-7xl mx-auto space-y-5 lg:space-y-8">
//         {/* Top Row: Left to Right - NOW uses animate-scroll-ltr */}
//         <div className="flex overflow-hidden relative ">
//           <div
//             className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r ${fadeColorClass} to-transparent z-10 pointer-events-none`}
//           ></div>
//           <div
//             className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l ${fadeColorClass} to-transparent z-10 pointer-events-none`}
//           ></div>
//           <div className="flex animate-scroll-ltr">
//             {" "}
//             {/* Changed from animate-infinite-scroll-ltr */}
//             {topRowPills.concat(topRowPills).map((text, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0 mx-4  px-4 lg:px-6 py-2 lg:py-3 border bg-purple-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-full text-sm md:text-lg font-light shadow-md"
//               >
//                 {text}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Middle Row: Right to Left - NOW uses animate-scroll-rtl */}
//         <div className="flex overflow-hidden relative justify-end">
//           <div
//             className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r ${fadeColorClass} to-transparent z-10 pointer-events-none`}
//           ></div>
//           <div
//             className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l ${fadeColorClass} to-transparent z-10 pointer-events-none`}
//           ></div>
//           <div className="flex animate-scroll-rtl">
//             {" "}
//             {/* Changed from animate-infinite-scroll */}
//             {midRowPills.concat(midRowPills).map((text, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0 mx-4  px-4 lg:px-6 py-2 lg:py-3  border bg-yellow-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-full text-sm md:text-lg  font-light shadow-md"
//               >
//                 {text}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom Row: Left to Right - NOW uses animate-scroll-ltr */}
//         <div className="flex overflow-hidden relative">
//           <div
//             className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r ${fadeColorClass} to-transparent z-10 pointer-events-none`}
//           ></div>
//           <div
//             className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l ${fadeColorClass} to-transparent z-10 pointer-events-none`}
//           ></div>
//           <div className="flex animate-scroll-ltr">
//             {" "}
//             {/* Changed from animate-infinite-scroll-ltr */}
//             {bottomRowPills.concat(bottomRowPills).map((text, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0 mx-4 px-4 lg:px-6 py-2 lg:py-3 border bg-blue-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-full text-sm md:text-lg  font-light shadow-md"
//               >
//                 {text}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import React from "react";

// CV, Resume, and AI job-related topics
const topRowPills = [
  "AI-Powered Resume Builder",
  "ATS-Friendly CV Templates",
  "Professional Resume Design",
  "Career Objective Writing",
  "Skills Section Optimization",
  "Work Experience Formatting",
  "Achievement Quantification",
  "Industry-Specific Resumes",
];

const midRowPills = [
  "Executive CV Creation",
  "Technical Skills Showcase",
  "Leadership Experience Highlighting",
  "Career Gap Solutions",
  "Professional Summary Writing",
  "Education Section Enhancement",
  "Certification Placement",
  "Portfolio Integration",
];

const bottomRowPills = [
  "Interview Preparation Guide",
  "Salary Negotiation Tips",
  "LinkedIn Profile Optimization",
  "Cover Letter Automation",
  "Job Market Analysis",
  "Career Transition Support",
  "Personal Branding Strategy",
  "AI Job Matching",
];

export default function MovingPills() {
  const sectionBgColorClass = "bg-white dark:bg-neutral-950";
  const fadeColorClass = "from-white dark:from-neutral-950";

  return (
    <section
      className={`w-full py-16 ${sectionBgColorClass} text-black dark:text-white overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto space-y-5 lg:space-y-8">
        {/* Top Row: Left to Right */}
        <div className="flex overflow-hidden relative">
          <div
            className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r ${fadeColorClass} to-transparent z-10 pointer-events-none`}
          ></div>
          <div
            className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l ${fadeColorClass} to-transparent z-10 pointer-events-none`}
          ></div>
          <div className="flex animate-scroll-ltr">
            {topRowPills.concat(topRowPills).map((text, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 px-4 lg:px-6 py-2 lg:py-3 border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/50 text-purple-800 dark:text-purple-200 rounded-full text-sm md:text-base font-medium shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Middle Row: Right to Left */}
        <div className="flex overflow-hidden relative justify-end">
          <div
            className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r ${fadeColorClass} to-transparent z-10 pointer-events-none`}
          ></div>
          <div
            className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l ${fadeColorClass} to-transparent z-10 pointer-events-none`}
          ></div>
          <div className="flex animate-scroll-rtl">
            {midRowPills.concat(midRowPills).map((text, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 px-4 lg:px-6 py-2 lg:py-3 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 rounded-full text-sm md:text-base font-medium shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Left to Right */}
        <div className="flex overflow-hidden relative">
          <div
            className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r ${fadeColorClass} to-transparent z-10 pointer-events-none`}
          ></div>
          <div
            className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l ${fadeColorClass} to-transparent z-10 pointer-events-none`}
          ></div>
          <div className="flex animate-scroll-ltr">
            {bottomRowPills.concat(bottomRowPills).map((text, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 px-4 lg:px-6 py-2 lg:py-3 border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 rounded-full text-sm md:text-base font-medium shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-ltr {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-rtl {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-ltr {
          animation: scroll-ltr 30s linear infinite;
        }
        
        .animate-scroll-rtl {
          animation: scroll-rtl 30s linear infinite;
        }
        
        .animate-scroll-ltr:hover,
        .animate-scroll-rtl:hover {
          animation-play-state: paused;
        }
        
        @media (max-width: 768px) {
          .animate-scroll-ltr,
          .animate-scroll-rtl {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  );
}

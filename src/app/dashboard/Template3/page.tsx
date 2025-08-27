// // 'use client';

// // import React from 'react';
// // import { useResumeStore } from '../../../../lib/store';
// // import Template3 from '../../components/templates/Template3';
// // import ResumeEditor from '../../components/ResumeEditor';
// // import ThemeCustomizer from '../../components/ThemeCustomizer';
// // import { generatePDF } from '../../../../lib/pdfGenerator';

// // const Template3Dashboard: React.FC = () => {
// //   const { resumeData } = useResumeStore();

// //   const handleDownloadPDF = async () => {
// //     try {
// //       await generatePDF(resumeData, 'resume-template3.pdf', '3', false);
// //     } catch (error) {
// //       console.error('Error generating PDF:', error);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="container mx-auto px-4 py-8">
// //         <div className="mb-8">
// //           <h1 className="text-3xl font-bold text-gray-800 mb-2">
// //             Template 3 - Purple Sidebar Design
// //           </h1>
// //           <p className="text-gray-600">
// //             Perfect for creative professionals with sidebar design and gradient colors.
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
// //           {/* Left Column - Resume Editor */}
// //           <div className="xl:col-span-1">
// //             <div className="space-y-6">
// //               <ResumeEditor />
// //               <ThemeCustomizer />
// //             </div>
// //           </div>

// //           {/* Right Column - Template Preview */}
// //           <div className="xl:col-span-2">
// //             <div className="sticky top-8">
// //               <Template3 
// //                 data={resumeData} 
// //                 onDownload={handleDownloadPDF}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Template3Dashboard;
// 'use client';

// import React from 'react';
// import { useResumeStore } from '../../../../lib/store';
// import Template3 from '../../components/templates/Template3';
// import ResumeEditor from '../../components/ResumeEditor';
// import ThemeCustomizer from '../../components/ThemeCustomizer';
// import { generatePDF } from '../../../../lib/pdfGenerator';

// const Template3Dashboard: React.FC = () => {
//   const { resumeData = {
//     name: "",
//     github: "",
//     image: "",
//     projects: [],
//     extra: [],
//     tag: "",
//     email: "",
//     location: "",
//     certifications: [],
//     phone: "",
//     number: "",
//     summary: "",
//     websites: [],
//     linkedin: "",
//     skills: [],
//     education: [],
//     experience: [],
//     student: [],
//     courses: [],
//     internships: [],
//     extracurriculars: [],
//     hobbies: [],
//     references: [],
//     languages: [],
//     awards: [],
//     headerColor: "#a3e4db",
//     nameFontStyle: "regular",
//     nameFontSize: 18,
//     tagFontStyle: "regular",
//     tagFontSize: 14,
//     summaryFontStyle: "regular",
//     summaryFontSize: 12,
//     profileImage: null,
//     source: "user",
//   } } = useResumeStore(); // Default to store's initial state

//   const handleDownloadPDF = async () => {
//     try {
//       await generatePDF(resumeData, 'resume-template3.pdf', '3', false);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             Template 3 - Purple Sidebar Design
//           </h1>
//           <p className="text-gray-600">
//             Perfect for creative professionals with sidebar design and gradient colors.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//           <div className="xl:col-span-1">
//             <div className="space-y-6">
//               <ResumeEditor />
//               <ThemeCustomizer />
//             </div>
//           </div>

//           <div className="xl:col-span-2">
//             <div className="sticky top-8">
//               <Template3 
//                 resumeData={resumeData} 
//                 onDownload={handleDownloadPDF}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Template3Dashboard;

'use client';

import React from 'react';
import { useResumeStore } from '../../../../lib/store';
import Template3 from '../../components/templates/Template3';
import ResumeEditor from '../../components/ResumeEditor';
import ThemeCustomizer from '../../components/ThemeCustomizer';
import { generatePDF } from '../../../../lib/pdfGenerator';

const Template3Dashboard: React.FC = () => {
  const { resumeData = {
    name: "",
    github: "",
    image: "",
    projects: [],
    extra: [],
    tag: "",
    email: "",
    location: "",
    certifications: [],
    phone: "",
    number: "",
    summary: "",
    websites: [],
    linkedin: "",
    skills: [],
    education: [],
    experience: [],
    student: [],
    courses: [],
    internships: [],
    extracurriculars: [],
    hobbies: [],
    references: [],
    languages: [],
    awards: [],
    headerColor: "#a3e4db",
    nameFontStyle: "regular",
    nameFontSize: 18,
    tagFontStyle: "regular",
    tagFontSize: 14,
    summaryFontStyle: "regular",
    summaryFontSize: 12,
    profileImage: null,
    source: "user",
  } } = useResumeStore();

  const handleDownloadPDF = async () => {
    try {
      await generatePDF(resumeData, 'resume-template3.pdf', '3', false);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Template 3 - Purple Sidebar Design
          </h1>
          <p className="text-gray-600">
            Perfect for creative professionals with sidebar design and gradient colors.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1">
            <div className="space-y-6">
              <ResumeEditor />
              <ThemeCustomizer />
            </div>
          </div>

          <div className="xl:col-span-2">
            <div className="sticky top-8">
              <Template3 
                resumeData={resumeData} // Ensure prop name matches Template3's interface
                onDownload={handleDownloadPDF}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template3Dashboard;
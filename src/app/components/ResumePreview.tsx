// // 'use client';

// // import React from 'react';
// // import { useResumeStore } from '../../../lib/store';
// // import { FiEdit3, FiDownload, FiPrinter } from 'react-icons/fi';
// // import { useRouter } from 'next/navigation';
// // import TemplateRenderer from './TemplateRenderer';
// // import { generatePDF } from '../../../lib/pdfGenerator';

// // const ResumePreview: React.FC = () => {
// //   const { resumeData, templateId } = useResumeStore();
// //   const router = useRouter();

// //   const handleDownload = async () => {
// //     const filename = `${resumeData.name || 'resume'}_resume.pdf`;
// //     // Check if it's AI generated or user created
// //     const isAIGenerated = (resumeData )?.source === "ai" || 
// //                          sessionStorage.getItem("templateSource") === "ai";
// //     await generatePDF(resumeData, filename, templateId || "1", isAIGenerated);
// //   };

// //   const handleEdit = () => {
// //     router.push('/dashboard?tab=edit');
// //   };

// //   const handlePrint = () => {
// //     window.print();
// //   };

// //   return (
// //     <div className="bg-white rounded-xl shadow-lg overflow-hidden">
// //       {/* Action Buttons */}
// //       <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
// //         <h3 className="text-lg font-semibold text-gray-800">Resume Preview - Template {templateId || '1'}</h3>
// //         <div className="flex space-x-2">
// //           <button
// //             onClick={handleEdit}
// //             className="flex items-center px-3 py-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors"
// //             title="Edit Resume"
// //           >
// //             <FiEdit3 className="w-4 h-4 mr-1" />
// //             Edit
// //           </button>
// //           <button
// //             onClick={handlePrint}
// //             className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
// //             title="Print Resume"
// //           >
// //             <FiPrinter className="w-4 h-4 mr-1" />
// //             Print
// //           </button>
// //           <button
// //             onClick={handleDownload}
// //             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //           >
// //             <FiDownload className="w-4 h-4 mr-2" />
// //             Download
// //           </button>
// //         </div>
// //       </div>

// //       {/* Template Renderer */}
// //       <div className="template-preview-container relative">
// //         {/* Preview Container with Print-like Styling */}
// //         <div className="preview-wrapper bg-gray-100 p-8 min-h-screen">
// //           <div className="resume-page bg-white shadow-2xl mx-auto" style={{
// //             width: '8.5in',
// //             minHeight: '11in',
// //             maxWidth: '100%',
// //             transform: 'scale(0.8)',
// //             transformOrigin: 'top center',
// //             margin: '0 auto'
// //           }}>
// //             <TemplateRenderer 
// //               templateId={templateId || '1'}
// //               data={resumeData}
// //               onDownload={handleDownload}
// //             />
// //           </div>
// //         </div>
        
// //         {/* Floating Edit Button */}
// //         <div className="fixed bottom-6 right-6 z-50 print-hidden">
// //           <button
// //             onClick={handleEdit}
// //             className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
// //             title="Quick Edit"
// //           >
// //             <FiEdit3 className="w-5 h-5 mr-2" />
// //             Quick Edit
// //           </button>
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         @media print {
// //           .preview-wrapper {
// //             background: white !important;
// //             padding: 0 !important;
// //           }
// //           .resume-page {
// //             transform: none !important;
// //             box-shadow: none !important;
// //             width: 100% !important;
// //             max-width: none !important;
// //           }
// //         }
        
// //         @media screen and (max-width: 768px) {
// //           .resume-page {
// //             transform: scale(0.6) !important;
// //           }
// //         }
        
// //         @media screen and (max-width: 480px) {
// //           .resume-page {
// //             transform: scale(0.4) !important;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default ResumePreview;



"use client";

import React from "react";
import { useResumeStore } from "../../../lib/store";
import { FiEdit3, FiDownload, FiPrinter } from "react-icons/fi";
import { useRouter } from "next/navigation";
import TemplateRenderer from "./TemplateRenderer";
import { generatePDF } from "../../../lib/pdfGenerator";

const ResumePreview: React.FC = () => {
  const { resumeData, templateId } = useResumeStore();
  const router = useRouter();

  const handleDownload = async () => {
    const filename = `${resumeData.name || "resume"}_resume.pdf`;
    const isAIGenerated =
      resumeData?.source === "ai" || sessionStorage.getItem("templateSource") === "ai";
    await generatePDF(resumeData, filename, templateId || "1", isAIGenerated);
  };

  const handleEdit = () => {
    router.push("/dashboard?tab=edit");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Action Buttons */}
      <div className="bg-gray-50 px-3 sm:px-6 py-2 sm:py-4 border-b flex flex-col sm:flex-row justify-between items-center">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          Resume Preview - Template {templateId || "1"}
        </h3>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={handleEdit}
            className="flex items-center px-2 sm:px-3 py-1 sm:py-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors text-xs sm:text-sm"
            title="Edit Resume"
          >
            <FiEdit3 className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
            Edit
          </button>
{/*           <button
            onClick={handlePrint}
            className="flex items-center px-2 sm:px-3 py-1 sm:py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors text-xs sm:text-sm"
            title="Print Resume"
          >
            <FiPrinter className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
            Print
          </button> */}
          <button
            onClick={handleDownload}
            className="flex items-center px-2 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
          >
            <FiDownload className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
            Download
          </button>
        </div>
      </div>

      {/* Template Renderer */}
      <div className="template-preview-container relative">
        {/* Preview Container with Print-like Styling */}
        <div className="preview-wrapper bg-gray-100 p-2 sm:p-4 min-h-screen">
          <div
            className="resume-page bg-white shadow-2xl mx-auto"
            style={{
              width: "8.5in",
              minHeight: "11in",
              maxWidth: "100%",
              transform: "scale(0.8)",
              transformOrigin: "top center",
              margin: "0 auto",
            }}
          >
            <TemplateRenderer
              templateId={templateId || "1"}
              data={resumeData}
              onDownload={handleDownload}
            />
          </div>
        </div>

        {/* Floating Edit Button */}
        <div className="fixed bottom-2 sm:bottom-6 right-2 sm:right-6 z-50 print-hidden">
          <button
            onClick={handleEdit}
            className="flex items-center px-3 sm:px-6 py-1 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
            title="Quick Edit"
          >
            <FiEdit3 className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2" />
            Quick Edit
          </button>
        </div>
      </div>

      <style jsx>{`
        @media print {
          .preview-wrapper {
            background: white !important;
            padding: 0 !important;
          }
          .resume-page {
            transform: none !important;
            box-shadow: none !important;
            width: 100% !important;
            max-width: none !important;
          }
          .print-hidden {
            display: none !important;
          }
        }

        @media screen and (max-width: 768px) {
          .resume-page {
            transform: scale(0.6) !important;
          }
        }

        @media screen and (max-width: 480px) {
          .resume-page {
            transform: scale(0.4) !important;
          }
        }

        @media screen and (max-width: 320px) {
          .resume-page {
            transform: scale(0.3) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;






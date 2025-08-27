// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { useResumeStore } from "../../../lib/store";
// import { apiUtils } from "../../../lib/api";
// import { toast } from "react-hot-toast";
// import ResumeEditor from "../components/ResumeEditor";
// import JobOptimizer from "../components/JobOptimizer";
// import ResumePreview from "../components/ResumePreview";
// import ThemeCustomizer from "../components/ThemeCustomizer";
// import ErrorBoundary from "../components/ErrorBoundary";

// import {
//   FiUser,
//   FiTarget,
//   FiEye,
//   FiDownload,
//   FiSettings,
//   FiCheck,
//   FiAlertCircle,
//   FiEdit3,
// } from "react-icons/fi";
// import { generatePDF } from "../../../lib/pdfGenerator";

// type TabType = "edit" | "optimize" | "preview" | "settings";

// const Dashboard: React.FC = () => {
//   const {} = useSession();
//   const { resumeData, templateId } = useResumeStore();
//   const [activeTab, setActiveTab] = useState<TabType>("edit");
//   const [backendStatus, setBackendStatus] = useState<
//     "checking" | "connected" | "disconnected"
//   >("checking");

//   // Handle URL parameters for tab switching
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const tabParam = urlParams.get("tab") as TabType;
//     if (
//       tabParam &&
//       ["edit", "optimize", "preview", "settings"].includes(tabParam)
//     ) {
//       setActiveTab(tabParam);
//     }
//   }, []);

//   // Check backend status on mount
//   useEffect(() => {
//     const checkBackend = async () => {
//       const isAvailable = await apiUtils.isBackendAvailable();
//       setBackendStatus(isAvailable ? "connected" : "disconnected");

//       if (!isAvailable) {
//         toast.error(
//           "Backend service is unavailable. Some features may not work."
//         );
//       }
//     };

//     checkBackend();
//   }, []);

//   // Calculate completion percentage
//   const getCompletionPercentage = () => {
//     try {
//       const fields = [
//         resumeData.name,
//         resumeData.email,
//         resumeData.tag,
//         resumeData.summary,
//         resumeData.skills?.length,
//         resumeData.education?.length,
//         resumeData.experience?.length,
//       ];

//       const completed = fields.filter((field) => {
//         if (typeof field === "string") {
//           return field && field.trim().length > 0;
//         }
//         if (typeof field === "number") {
//           return field > 0;
//         }
//         return false;
//       }).length;

//       return Math.round((completed / fields.length) * 100);
//     } catch (error) {
//       console.error("Error calculating completion percentage:", error);
//       return 0;
//     }
//   };

//   const completionPercentage = getCompletionPercentage();

//   // Handle PDF download
//   const handleDownload = async () => {
//     // Check if this is AI generated or user created
//     const isAIGenerated =
//       window.location.pathname.includes("ai-templates") ||
//       localStorage.getItem("resumeSource") === "ai" ||
//       (resumeData)?.source === "ai" ||
//       sessionStorage.getItem("templateSource") === "ai";

//     const filename = `${resumeData.name || "resume"}_${
//       isAIGenerated ? "ai" : "user"
//     }_template${templateId || "1"}.pdf`;
//     const success = await generatePDF(resumeData, filename, templateId || "1", isAIGenerated);

//     if (success) {
//       toast.success(
//         `${isAIGenerated ? "AI" : "User"} Template ${
//           templateId || "1"
//         } PDF downloaded successfully!`
//       );
//     } else {
//       toast.error("PDF generation failed, using print instead");
//     }
//   };

//   const tabs = [
//     { id: "edit" as TabType, label: "Edit Resume", icon: FiUser },
//     { id: "optimize" as TabType, label: "Job Optimizer", icon: FiTarget },
//     { id: "preview" as TabType, label: "Preview", icon: FiEye },
//     { id: "settings" as TabType, label: "Customize", icon: FiSettings },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Resume Dashboard
//               </h1>
//               {resumeData.name && (
//                 <span className="ml-4 text-gray-600">
//                   Welcome back, {resumeData.name}!
//                 </span>
//               )}
//             </div>

//             <div className="flex items-center space-x-4">
//               {/* Backend Status */}
//               <div className="flex items-center">
//                 {backendStatus === "checking" ? (
//                   <div className="flex items-center text-yellow-600">
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
//                     <span className="text-sm">Checking...</span>
//                   </div>
//                 ) : backendStatus === "connected" ? (
//                   <div className="flex items-center text-green-600">
//                     <FiCheck className="w-4 h-4 mr-2" />
//                     <span className="text-sm">Connected</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center text-red-600">
//                     <FiAlertCircle className="w-4 h-4 mr-2" />
//                     <span className="text-sm">Offline</span>
//                   </div>
//                 )}
//               </div>

//               {/* Completion Status */}
//               <div className="flex items-center">
//                 <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
//                   <div
//                     className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
//                     style={{ width: `${completionPercentage}%` }}
//                   ></div>
//                 </div>
//                 <span className="text-sm text-gray-600">
//                   {completionPercentage}% Complete
//                 </span>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex space-x-2">
//                 <button className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                   <FiEye className="w-4 h-4 mr-2" />
//                   Preview
//                 </button>
//                 <button
//                   onClick={handleDownload}
//                   className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
//                 >
//                   <FiDownload className="w-4 h-4 mr-2" />
//                   Download
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <nav className="flex space-x-8">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
//                     activeTab === tab.id
//                       ? "border-blue-500 text-blue-600"
//                       : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                   }`}
//                 >
//                   <Icon className="w-4 h-4 mr-2" />
//                   {tab.label}
//                 </button>
//               );
//             })}
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

//         {/* Template Selection Info */}
//         <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
//                 <FiEye className="w-6 h-6 text-purple-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-purple-800">
//                   ✅ Template {templateId || "1"} Selected!
//                 </h3>
//                 <p className="text-purple-600">
//                   Ready to edit your resume. Start filling in your information
//                   below.
//                 </p>
//               </div>
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setActiveTab("edit")}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
//               >
//                 <FiEdit3 className="w-4 h-4 mr-2" />
//                 Start Editing
//               </button>
//               <Link
//                 href="/template"
//                 className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//               >
//                 Change Template
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Welcome Message for New Users */}
//         {!resumeData.name && activeTab === "edit" && (
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
//             <div className="flex items-center">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
//                 <FiUser className="w-6 h-6 text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-blue-800">
//                   Welcome to HG Resume Craft!
//                 </h3>
//                 <p className="text-blue-600">
//                   Start by filling out your basic information below, or upload
//                   an existing resume to get started quickly.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Tab Content */}
//         <div className="transition-all duration-300">
//           {activeTab === "edit" && (
//             <ErrorBoundary>
//               <ResumeEditor
//                 onSave={() => toast.success("Resume saved successfully!")}
//               />
//             </ErrorBoundary>
//           )}

//           {activeTab === "optimize" && (
//             <ErrorBoundary>
//               <JobOptimizer />
//             </ErrorBoundary>
//           )}

//           {activeTab === "preview" && (
//             <ErrorBoundary>
//               <ResumePreview />
//             </ErrorBoundary>
//           )}

//           {activeTab === "settings" && (
//             <ErrorBoundary>
//               <ThemeCustomizer />
//             </ErrorBoundary>
//           )}
//         </div>
//       </div>

//       {/* Quick Stats */}
//       {resumeData.name && (
//         <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 border">
//           <div className="text-sm text-gray-600 mb-2">Quick Stats</div>
//           <div className="space-y-1 text-xs">
//             <div className="flex justify-between">
//               <span>Skills:</span>
//               <span className="font-semibold">
//                 {resumeData.skills?.length || 0}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Experience:</span>
//               <span className="font-semibold">
//                 {resumeData.experience?.length || 0}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Education:</span>
//               <span className="font-semibold">
//                 {resumeData.education?.length || 0}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useResumeStore } from "../../../lib/store";
import { apiUtils } from "../../../lib/api";
import { toast } from "react-hot-toast";
import ResumeEditor from "../components/ResumeEditor";
import JobOptimizer from "../components/JobOptimizer";
import ResumePreview from "../components/ResumePreview";
import ThemeCustomizer from "../components/ThemeCustomizer";
import ErrorBoundary from "../components/ErrorBoundary";

import {
  FiUser,
  FiTarget,
  FiEye,
  FiDownload,
  FiSettings,
  FiCheck,
  FiAlertCircle,
  FiEdit3,
} from "react-icons/fi";
import { generatePDF } from "../../../lib/pdfGenerator";

type TabType = "edit" | "optimize" | "preview" | "settings";

const Dashboard: React.FC = () => {
  const {} = useSession();
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
  }, templateId } = useResumeStore();
  const [activeTab, setActiveTab] = useState<TabType>("edit");
  const [backendStatus, setBackendStatus] = useState<
    "checking" | "connected" | "disconnected"
  >("checking");

  // Handle URL parameters for tab switching
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get("tab") as TabType;
    if (
      tabParam &&
      ["edit", "optimize", "preview", "settings"].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }
  }, []);

  // Check backend status on mount
  useEffect(() => {
    const checkBackend = async () => {
      const isAvailable = await apiUtils.isBackendAvailable();
      setBackendStatus(isAvailable ? "connected" : "disconnected");

      if (!isAvailable) {
        toast.error(
          "Backend service is unavailable. Some features may not work."
        );
      }
    };

    checkBackend();
  }, []);

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    try {
      const fields = [
        resumeData.name,
        resumeData.email,
        resumeData.tag,
        resumeData.summary,
        resumeData.skills?.length,
        resumeData.education?.length,
        resumeData.experience?.length,
      ];

      const completed = fields.filter((field) => {
        if (typeof field === "string") {
          return field && field.trim().length > 0;
        }
        if (typeof field === "number") {
          return field > 0;
        }
        return false;
      }).length;

      return Math.round((completed / fields.length) * 100);
    } catch (error) {
      console.error("Error calculating completion percentage:", error);
      return 0;
    }
  };

  const completionPercentage = getCompletionPercentage();

  // Handle PDF download
  const handleDownload = async () => {
    const isAIGenerated =
      window.location.pathname.includes("ai-templates") ||
      localStorage.getItem("resumeSource") === "ai" ||
      resumeData.source === "ai" ||
      sessionStorage.getItem("templateSource") === "ai";

    const filename = `${resumeData.name || "resume"}_${
      isAIGenerated ? "ai" : "user"
    }_template${templateId || "1"}.pdf`;
    const success = await generatePDF(resumeData, filename, templateId || "1", isAIGenerated);

    if (success) {
      toast.success(
        `${isAIGenerated ? "AI" : "User"} Template ${
          templateId || "1"
        } PDF downloaded successfully!`
      );
    } else {
      toast.error("PDF generation failed, using print instead");
    }
  };

  const tabs = [
    { id: "edit" as TabType, label: "Edit Resume", icon: FiUser },
    { id: "optimize" as TabType, label: "Job Optimizer", icon: FiTarget },
    { id: "preview" as TabType, label: "Preview", icon: FiEye },
    { id: "settings" as TabType, label: "Customize", icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Resume Dashboard
              </h1>
              {resumeData.name && (
                <span className="ml-4 text-gray-600">
                  Welcome back, {resumeData.name}!
                </span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Backend Status */}
              <div className="flex items-center">
                {backendStatus === "checking" ? (
                  <div className="flex items-center text-yellow-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
                    <span className="text-sm">Checking...</span>
                  </div>
                ) : backendStatus === "connected" ? (
                  <div className="flex items-center text-green-600">
                    <FiCheck className="w-4 h-4 mr-2" />
                    <span className="text-sm">Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <FiAlertCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm">Offline</span>
                  </div>
                )}
              </div>

              {/* Completion Status */}
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  {completionPercentage}% Complete
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FiEye className="w-4 h-4 mr-2" />
                  Preview
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  <FiDownload className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Template Selection Info */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <FiEye className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800">
                  ✅ Template {templateId || "1"} Selected!
                </h3>
                <p className="text-purple-600">
                  Ready to edit your resume. Start filling in your information
                  below.
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("edit")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <FiEdit3 className="w-4 h-4 mr-2" />
                Start Editing
              </button>
              <Link
                href="/template"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Change Template
              </Link>
            </div>
          </div>
        </div>

        {/* Welcome Message for New Users */}
        {!resumeData.name && activeTab === "edit" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FiUser className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800">
                  Welcome to HG Resume Craft!
                </h3>
                <p className="text-blue-600">
                  Start by filling out your basic information below, or upload
                  an existing resume to get started quickly.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === "edit" && (
            <ErrorBoundary>
              <ResumeEditor
                onSave={() => toast.success("Resume saved successfully!")}
              />
            </ErrorBoundary>
          )}

          {activeTab === "optimize" && (
            <ErrorBoundary>
              <JobOptimizer />
            </ErrorBoundary>
          )}

          {activeTab === "preview" && (
            <ErrorBoundary>
              <ResumePreview />
            </ErrorBoundary>
          )}

          {activeTab === "settings" && (
            <ErrorBoundary>
              <ThemeCustomizer />
            </ErrorBoundary>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      {resumeData.name && (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 border">
          <div className="text-sm text-gray-600 mb-2">Quick Stats</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Skills:</span>
              <span className="font-semibold">
                {resumeData.skills?.length || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Experience:</span>
              <span className="font-semibold">
                {resumeData.experience?.length || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Education:</span>
              <span className="font-semibold">
                {resumeData.education?.length || 0}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
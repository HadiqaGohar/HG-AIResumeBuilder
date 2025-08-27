// // // "use client";

// // // import React, { useState, useCallback } from "react";
// // // import { useResumeStore } from "../../../lib/store";
// // // import { resumeAPI } from "../../../lib/api";
// // // import { toast } from "react-hot-toast";
// // // import {
// // //   FiTarget,
// // //   FiRefreshCw,
// // //   FiCheck,
// // //   FiArrowRight,
// // //   FiZap,
// // //   FiTrendingUp,
// // // } from "react-icons/fi";

// // // interface JobOptimizerProps {
// // //   onOptimizationComplete?: () => void;
// // // }

// // // const JobOptimizer: React.FC<JobOptimizerProps> = ({
// // //   onOptimizationComplete,
// // // }) => {
// // //   const { resumeData, setResumeData } = useResumeStore();
// // //   const [jobDescription, setJobDescription] = useState("");
// // //   const [isOptimizing, setIsOptimizing] = useState(false);
// // //   const [optimization, setOptimization] = useState<any>(null);
// // //   const [showResults, setShowResults] = useState(false);

// // //   const optimizeResume = useCallback(async () => {
// // //     if (!jobDescription.trim()) {
// // //       toast.error("Please enter a job description");
// // //       return;
// // //     }

// // //     if (!resumeData.name || !resumeData.skills?.length) {
// // //       toast.error("Please complete your resume basic information first");
// // //       return;
// // //     }

// // //     setIsOptimizing(true);
// // //     try {
// // //       const response = await resumeAPI.optimizeResume({
// // //         job_description: jobDescription,
// // //         resume_data: resumeData,
// // //       });

// // //       setOptimization(response);
// // //       setShowResults(true);
// // //       toast.success("Resume optimization completed!");
// // //     } catch (error: any) {
// // //       toast.error(error.message || "Failed to optimize resume");
// // //     } finally {
// // //       setIsOptimizing(false);
// // //     }
// // //   }, [jobDescription, resumeData]);

// // //   const applyOptimization = useCallback(() => {
// // //     if (!optimization) return;

// // //     // Apply optimized summary
// // //     if (optimization.optimized_summary) {
// // //       setResumeData({ summary: optimization.optimized_summary });
// // //     }

// // //     // Add suggested skills (avoid duplicates)
// // //     if (optimization.suggested_skills?.length) {
// // //       const currentSkills = resumeData.skills || [];
// // //       const newSkills = [...currentSkills];

// // //       optimization.suggested_skills.forEach((skill: string) => {
// // //         if (!newSkills.some((existing) => existing.toLowerCase() === skill.toLowerCase())) {
// // //           newSkills.push(skill);
// // //         }
// // //       });

// // //       setResumeData({ skills: newSkills });
// // //     }

// // //     toast.success("Optimization applied to your resume!");
// // //     onOptimizationComplete?.();
// // //   }, [optimization, resumeData.skills, setResumeData, onOptimizationComplete]);

// // //   const clearOptimization = () => {
// // //     setOptimization(null);
// // //     setShowResults(false);
// // //     setJobDescription("");
// // //   };

// // //   return (
// // //     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
// // //       <div className="flex items-center mb-6">
// // //         <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
// // //           <FiTarget className="w-6 h-6 text-white" />
// // //         </div>
// // //         <div>
// // //           <h2 className="text-2xl font-bold text-gray-800">
// // //             Job-Specific Optimization
// // //           </h2>
// // //           <p className="text-gray-600">
// // //             Tailor your resume for specific job opportunities
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {!showResults ? (
// // //         <div className="space-y-6">
// // //           {/* Job Description Input */}
// // //           <div>
// // //             <label className="block text-sm font-semibold text-gray-700 mb-2">
// // //               Job Description
// // //             </label>
// // //             <textarea
// // //               value={jobDescription}
// // //               onChange={(e) => setJobDescription(e.target.value)}
// // //               placeholder="Paste the job description here. Include requirements, responsibilities, and preferred qualifications..."
// // //               rows={8}
// // //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
// // //             />
// // //             <p className="text-sm text-gray-500 mt-2">
// // //               The more detailed the job description, the better the optimization
// // //               results.
// // //             </p>
// // //           </div>

// // //           {/* Optimize Button */}
// // //           <div className="flex justify-center">
// // //             <button
// // //               onClick={optimizeResume}
// // //               disabled={isOptimizing || !jobDescription.trim()}
// // //               className="flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
// // //             >
// // //               <FiRefreshCw
// // //                 className={`w-5 h-5 mr-2 ${isOptimizing ? "animate-spin" : ""}`}
// // //               />
// // //               {isOptimizing ? "Optimizing Resume..." : "Optimize Resume"}
// // //             </button>
// // //           </div>

// // //           {/* Features */}
// // //           <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
// // //             <div className="text-center">
// // //               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
// // //                 <FiTrendingUp className="w-6 h-6 text-blue-600" />
// // //               </div>
// // //               <h3 className="font-semibold text-gray-800 mb-2">
// // //                 ATS Optimization
// // //               </h3>
// // //               <p className="text-sm text-gray-600">
// // //                 Optimize for Applicant Tracking Systems with relevant keywords
// // //               </p>
// // //             </div>

// // //             <div className="text-center">
// // //               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
// // //                 <FiZap className="w-6 h-6 text-green-600" />
// // //               </div>
// // //               <h3 className="font-semibold text-gray-800 mb-2">
// // //                 Smart Suggestions
// // //               </h3>
// // //               <p className="text-sm text-gray-600">
// // //                 Get AI-powered suggestions for skills and improvements
// // //               </p>
// // //             </div>

// // //             <div className="text-center">
// // //               <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
// // //                 <FiTarget className="w-6 h-6 text-purple-600" />
// // //               </div>
// // //               <h3 className="font-semibold text-gray-800 mb-2">Job Matching</h3>
// // //               <p className="text-sm text-gray-600">
// // //                 Align your resume content with job requirements
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       ) : (
// // //         <div className="space-y-8">
// // //           {/* Results Header */}
// // //           <div className="flex items-center justify-between">
// // //             <h3 className="text-xl font-semibold text-gray-800">
// // //               Optimization Results
// // //             </h3>
// // //             <div className="flex space-x-3">
// // //               <button
// // //                 onClick={applyOptimization}
// // //                 className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
// // //               >
// // //                 <FiCheck className="w-4 h-4 mr-2" />
// // //                 Apply Changes
// // //               </button>
// // //               <button
// // //                 onClick={clearOptimization}
// // //                 className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
// // //               >
// // //                 Start Over
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Optimized Summary */}
// // //           {optimization?.optimized_summary && (
// // //             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
// // //               <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
// // //                 <FiArrowRight className="w-4 h-4 mr-2" />
// // //                 Optimized Professional Summary
// // //               </h4>
// // //               <div className="space-y-4">
// // //                 <div>
// // //                   <p className="text-sm text-gray-600 mb-2">Current Summary:</p>
// // //                   <p className="text-gray-800 bg-white p-3 rounded border">
// // //                     {resumeData.summary || "No summary provided"}
// // //                   </p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-sm text-blue-600 mb-2">
// // //                     AI-Optimized Summary:
// // //                   </p>
// // //                   <p className="text-gray-800 bg-blue-100 p-3 rounded border border-blue-300">
// // //                     {optimization.optimized_summary}
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* Suggested Skills */}
// // //           {optimization?.suggested_skills?.length > 0 && (
// // //             <div className="bg-green-50 border border-green-200 rounded-lg p-6">
// // //               <h4 className="font-semibold text-green-800 mb-3 flex items-center">
// // //                 <FiZap className="w-4 h-4 mr-2" />
// // //                 Suggested Skills to Add
// // //               </h4>
// // //               <div className="flex flex-wrap gap-2">
// // //                 {optimization.suggested_skills.map(
// // //                   (skill: string, index: number) => (
// // //                     <span
// // //                       key={index}
// // //                       className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm border border-green-300"
// // //                     >
// // //                       {skill}
// // //                     </span>
// // //                   )
// // //                 )}
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* Keyword Matches */}
// // //           {optimization?.keyword_matches?.length > 0 && (
// // //             <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
// // //               <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
// // //                 <FiTarget className="w-4 h-4 mr-2" />
// // //                 Matching Keywords Found
// // //               </h4>
// // //               <div className="flex flex-wrap gap-2">
// // //                 {optimization.keyword_matches.map(
// // //                   (keyword: string, index: number) => (
// // //                     <span
// // //                       key={index}
// // //                       className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm border border-purple-300"
// // //                     >
// // //                       {keyword}
// // //                     </span>
// // //                   )
// // //                 )}
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* Improvement Suggestions */}
// // //           {optimization?.improvement_suggestions?.length > 0 && (
// // //             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
// // //               <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
// // //                 <FiTrendingUp className="w-4 h-4 mr-2" />
// // //                 Improvement Suggestions
// // //               </h4>
// // //               <ul className="space-y-2">
// // //                 {optimization.improvement_suggestions.map(
// // //                   (suggestion: string, index: number) => (
// // //                     <li key={index} className="flex items-start">
// // //                       <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
// // //                       <span className="text-gray-700">{suggestion}</span>
// // //                     </li>
// // //                   )
// // //                 )}
// // //               </ul>
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default JobOptimizer;
// // "use client";

// // import React, { useState, useCallback } from "react";
// // import { useResumeStore, ResumeData } from "../../../lib/store";
// // import { resumeAPI } from "../../../lib/api";
// // import { toast } from "react-hot-toast";
// // import {
// //   FiTarget,
// //   FiRefreshCw,
// //   FiCheck,
// //   FiArrowRight,
// //   FiZap,
// //   FiTrendingUp,
// // } from "react-icons/fi";

// // interface OptimizationResult {
// //   optimized_summary?: string;
// //   suggested_skills?: string[];
// //   keyword_matches?: string[];
// //   improvement_suggestions?: string[];
// // }

// // interface JobOptimizerProps {
// //   onOptimizationComplete?: () => void;
// // }

// // const JobOptimizer: React.FC<JobOptimizerProps> = ({
// //   onOptimizationComplete,
// // }) => {
// //   const { resumeData, setResumeData } = useResumeStore();
// //   const [jobDescription, setJobDescription] = useState("");
// //   const [isOptimizing, setIsOptimizing] = useState(false);
// //   const [optimization, setOptimization] = useState<OptimizationResult | null>(null);
// //   const [showResults, setShowResults] = useState(false);

// //   const optimizeResume = useCallback(async () => {
// //     if (!jobDescription.trim()) {
// //       toast.error("Please enter a job description");
// //       return;
// //     }

// //     if (!resumeData.name || !resumeData.skills?.length) {
// //       toast.error("Please complete your resume basic information first");
// //       return;
// //     }

// //     setIsOptimizing(true);
// //     try {
// //       // Sanitize resumeData to ensure valid format
// //       const sanitizedResumeData: Partial<ResumeData> = {
// //         name: resumeData.name || "",
// //         skills: Array.isArray(resumeData.skills) ? resumeData.skills.filter(s => typeof s === "string") : [],
// //         summary: resumeData.summary || "",
// //         email: resumeData.email || "",
// //         education: Array.isArray(resumeData.education) ? resumeData.education : [],
// //         experience: Array.isArray(resumeData.experience) ? resumeData.experience : [],
// //       };
// //       console.log("Sending data to API:", { job_description: jobDescription, resume_data: sanitizedResumeData });

// //       const response = await resumeAPI.optimizeResume({
// //         job_description: jobDescription,
// //         resume_data: sanitizedResumeData,
// //       });

// //       console.log("API Response:", response);
// //       if (!response || typeof response !== "object") {
// //         throw new Error("Invalid response format from server");
// //       }

// //       setOptimization(response);
// //       setShowResults(true);
// //       toast.success("Resume optimization completed!");
// //     } catch (error) {
// //       console.error("API Error:", error);
// //       const errorMessage = error.response?.data?.error?.details || error.message || "Failed to optimize resume";
// //       toast.error(errorMessage);
// //     } finally {
// //       setIsOptimizing(false);
// //     }
// //   }, [jobDescription, resumeData]);

// //   const applyOptimization = useCallback(() => {
// //     if (!optimization) {
// //       toast.error("No optimization data available");
// //       return;
// //     }

// //     console.log("Applying optimization:", optimization);

// //     // Apply optimized summary
// //     if (typeof optimization.optimized_summary === "string") {
// //       setResumeData({ summary: optimization.optimized_summary });
// //       console.log("Updated summary:", useResumeStore.getState().resumeData.summary);
// //     }

// //     // Add suggested skills (avoid duplicates)
// //     if (Array.isArray(optimization.suggested_skills) && optimization.suggested_skills.length) {
// //       const currentSkills = Array.isArray(resumeData.skills) ? resumeData.skills : [];
// //       const newSkills = [...currentSkills];

// //       optimization.suggested_skills.forEach((skill: string) => {
// //         if (typeof skill === "string" && !newSkills.some((existing) => existing.toLowerCase() === skill.toLowerCase())) {
// //           newSkills.push(skill);
// //         }
// //       });

// //       setResumeData({ skills: newSkills });
// //       console.log("Updated skills:", useResumeStore.getState().resumeData.skills);
// //     }

// //     toast.success("Optimization applied to your resume!");
// //     onOptimizationComplete?.();
// //   }, [optimization, resumeData.skills, setResumeData, onOptimizationComplete]);

// //   const clearOptimization = () => {
// //     setOptimization(null);
// //     setShowResults(false);
// //     setJobDescription("");
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
// //       <div className="flex items-center mb-6">
// //         <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
// //           <FiTarget className="w-6 h-6 text-white" />
// //         </div>
// //         <div>
// //           <h2 className="text-2xl font-bold text-gray-800">
// //             Job-Specific Optimization
// //           </h2>
// //           <p className="text-gray-600">
// //             Tailor your resume for specific job opportunities
// //           </p>
// //         </div>
// //       </div>

// //       {!showResults ? (
// //         <div className="space-y-6">
// //           {/* Job Description Input */}
// //           <div>
// //             <label className="block text-sm font-semibold text-gray-700 mb-2">
// //               Job Description
// //             </label>
// //             <textarea
// //               value={jobDescription}
// //               onChange={(e) => setJobDescription(e.target.value)}
// //               placeholder="Paste the job description here. Include requirements, responsibilities, and preferred qualifications..."
// //               rows={8}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
// //             />
// //             <p className="text-sm text-gray-500 mt-2">
// //               The more detailed the job description, the better the optimization
// //               results.
// //             </p>
// //           </div>

// //           {/* Optimize Button */}
// //           <div className="flex justify-center">
// //             <button
// //               onClick={optimizeResume}
// //               disabled={isOptimizing || !jobDescription.trim()}
// //               className="flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
// //             >
// //               <FiRefreshCw
// //                 className={`w-5 h-5 mr-2 ${isOptimizing ? "animate-spin" : ""}`}
// //               />
// //               {isOptimizing ? "Optimizing Resume..." : "Optimize Resume"}
// //             </button>
// //           </div>

// //           {/* Features */}
// //           <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
// //             <div className="text-center">
// //               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
// //                 <FiTrendingUp className="w-6 h-6 text-blue-600" />
// //               </div>
// //               <h3 className="font-semibold text-gray-800 mb-2">
// //                 ATS Optimization
// //               </h3>
// //               <p className="text-sm text-gray-600">
// //                 Optimize for Applicant Tracking Systems with relevant keywords
// //               </p>
// //             </div>

// //             <div className="text-center">
// //               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
// //                 <FiZap className="w-6 h-6 text-green-600" />
// //               </div>
// //               <h3 className="font-semibold text-gray-800 mb-2">
// //                 Smart Suggestions
// //               </h3>
// //               <p className="text-sm text-gray-600">
// //                 Get AI-powered suggestions for skills and improvements
// //               </p>
// //             </div>

// //             <div className="text-center">
// //               <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
// //                 <FiTarget className="w-6 h-6 text-purple-600" />
// //               </div>
// //               <h3 className="font-semibold text-gray-800 mb-2">Job Matching</h3>
// //               <p className="text-sm text-gray-600">
// //                 Align your resume content with job requirements
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="space-y-8">
// //           {/* Results Header */}
// //           <div className="flex items-center justify-between">
// //             <h3 className="text-xl font-semibold text-gray-800">
// //               Optimization Results
// //             </h3>
// //             <div className="flex space-x-3">
// //               <button
// //                 onClick={applyOptimization}
// //                 className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
// //               >
// //                 <FiCheck className="w-4 h-4 mr-2" />
// //                 Apply Changes
// //               </button>
// //               <button
// //                 onClick={clearOptimization}
// //                 className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
// //               >
// //                 Start Over
// //               </button>
// //             </div>
// //           </div>

// //           {/* Optimized Summary */}
// //           {optimization?.optimized_summary && (
// //             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
// //               <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
// //                 <FiArrowRight className="w-4 h-4 mr-2" />
// //                 Optimized Professional Summary
// //               </h4>
// //               <div className="space-y-4">
// //                 <div>
// //                   <p className="text-sm text-gray-600 mb-2">Current Summary:</p>
// //                   <p className="text-gray-800 bg-white p-3 rounded border">
// //                     {resumeData.summary || "No summary provided"}
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-blue-600 mb-2">
// //                     AI-Optimized Summary:
// //                   </p>
// //                   <p className="text-gray-800 bg-blue-100 p-3 rounded border border-blue-300">
// //                     {optimization.optimized_summary}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Suggested Skills */}
// //           {optimization?.suggested_skills?.length > 0 && (
// //             <div className="bg-green-50 border border-green-200 rounded-lg p-6">
// //               <h4 className="font-semibold text-green-800 mb-3 flex items-center">
// //                 <FiZap className="w-4 h-4 mr-2" />
// //                 Suggested Skills to Add
// //               </h4>
// //               <div className="flex flex-wrap gap-2">
// //                 {optimization.suggested_skills.map(
// //                   (skill: string, index: number) => (
// //                     <span
// //                       key={index}
// //                       className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm border border-green-300"
// //                     >
// //                       {skill}
// //                     </span>
// //                   )
// //                 )}
// //               </div>
// //             </div>
// //           )}

// //           {/* Keyword Matches */}
// //           {optimization?.keyword_matches?.length > 0 && (
// //             <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
// //               <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
// //                 <FiTarget className="w-4 h-4 mr-2" />
// //                 Matching Keywords Found
// //               </h4>
// //               <div className="flex flex-wrap gap-2">
// //                 {optimization.keyword_matches.map(
// //                   (keyword: string, index: number) => (
// //                     <span
// //                       key={index}
// //                       className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm border border-purple-300"
// //                     >
// //                       {keyword}
// //                     </span>
// //                   )
// //                 )}
// //               </div>
// //             </div>
// //           )}

// //           {/* Improvement Suggestions */}
// //           {optimization?.improvement_suggestions?.length > 0 && (
// //             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
// //               <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
// //                 <FiTrendingUp className="w-4 h-4 mr-2" />
// //                 Improvement Suggestions
// //               </h4>
// //               <ul className="space-y-2">
// //                 {optimization.improvement_suggestions.map(
// //                   (suggestion: string, index: number) => (
// //                     <li key={index} className="flex items-start">
// //                       <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
// //                       <span className="text-gray-700">{suggestion}</span>
// //                     </li>
// //                   )
// //                 )}
// //               </ul>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default JobOptimizer;

// "use client";

// import React, { useState, useCallback } from "react";
// import { useResumeStore } from "../../../lib/store";
// import { resumeAPI, ResumeData as ApiResumeData } from "../../../lib/api";
// import { toast } from "react-hot-toast";
// import {
//   FiTarget,
//   FiRefreshCw,
//   FiCheck,
//   FiArrowRight,
//   FiZap,
//   FiTrendingUp,
// } from "react-icons/fi";

// // interface Education {
// //   degree: string;
// //   institution: string;
// //   year?: string;
// // }

// // interface Experience {
// //   title: string;
// //   company: string;
// //   dates?: string;
// // }

// interface OptimizationResult {
//   optimized_summary?: string;
//   suggested_skills?: string[];
//   keyword_matches?: string[];
//   improvement_suggestions?: string[];
// }

// interface JobOptimizerProps {
//   onOptimizationComplete?: () => void;
// }

// const JobOptimizer: React.FC<JobOptimizerProps> = ({
//   onOptimizationComplete,
// }) => {
//   const { resumeData, setResumeData } = useResumeStore();
//   const [jobDescription, setJobDescription] = useState("");
//   const [isOptimizing, setIsOptimizing] = useState(false);
//   const [optimization, setOptimization] = useState<OptimizationResult | null>(null);
//   const [showResults, setShowResults] = useState(false);

//   const optimizeResume = useCallback(async () => {
//     if (!jobDescription.trim()) {
//       toast.error("Please enter a job description");
//       return;
//     }

//     if (!resumeData.name || !resumeData.skills?.length) {
//       toast.error("Please complete your resume basic information first");
//       return;
//     }

//     setIsOptimizing(true);
//     try {
//       const sanitizedResumeData: ApiResumeData = {
//         name: resumeData.name || "",
//         skills: Array.isArray(resumeData.skills)
//           ? resumeData.skills.filter((s): s is string => typeof s === "string")
//           : [],
//         summary: resumeData.summary || "",
//         email: resumeData.email || "",
//         education: Array.isArray(resumeData.education)
//           ? resumeData.education.map(item =>
//               typeof item === "string"
//                 ? item
//                 : `${item.degree} at ${item.institution}${item.year ? `, ${item.year}` : ""}`
//             )
//           : [],
//         experience: Array.isArray(resumeData.experience)
//           ? resumeData.experience.map(item =>
//               typeof item === "string"
//                 ? item
//                 : `${item.title} at ${item.company}${item.dates ? `, ${item.dates}` : ""}`
//             )
//           : [],
//       };
//       console.log("Sending data to API:", { job_description: jobDescription, resume_data: sanitizedResumeData });

//       const response = await resumeAPI.optimizeResume({
//         job_description: jobDescription,
//         resume_data: sanitizedResumeData,
//       });

//       console.log("API Response:", response);
//       if (!response || typeof response !== "object") {
//         throw new Error("Invalid response format from server");
//       }

//       setOptimization(response);
//       setShowResults(true);
//       toast.success("Resume optimization completed!");
//     } catch (error) {
//       console.error("API Error:", error);
//       const errorMessage = error.response?.data?.error?.details || error.message || "Failed to optimize resume";
//       toast.error(errorMessage);
//     } finally {
//       setIsOptimizing(false);
//     }
//   }, [jobDescription, resumeData]);

//   const applyOptimization = useCallback(() => {
//     if (!optimization) {
//       toast.error("No optimization data available");
//       return;
//     }

//     console.log("Applying optimization:", optimization);

//     if (typeof optimization.optimized_summary === "string") {
//       setResumeData({ summary: optimization.optimized_summary });
//       console.log("Updated summary:", useResumeStore.getState().resumeData.summary);
//     }

//     if (Array.isArray(optimization.suggested_skills) && optimization.suggested_skills.length) {
//       const currentSkills = Array.isArray(resumeData.skills) ? resumeData.skills : [];
//       const newSkills = [...currentSkills];

//       optimization.suggested_skills.forEach((skill: string) => {
//         if (typeof skill === "string" && !newSkills.some((existing) => existing.toLowerCase() === skill.toLowerCase())) {
//           newSkills.push(skill);
//         }
//       });

//       setResumeData({ skills: newSkills });
//       console.log("Updated skills:", useResumeStore.getState().resumeData.skills);
//     }

//     toast.success("Optimization applied to your resume!");
//     onOptimizationComplete?.();
//   }, [optimization, resumeData.skills, setResumeData, onOptimizationComplete]);

//   const clearOptimization = () => {
//     setOptimization(null);
//     setShowResults(false);
//     setJobDescription("");
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
//       <div className="flex items-center mb-6">
//         <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
//           <FiTarget className="w-6 h-6 text-white" />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             Job-Specific Optimization
//           </h2>
//           <p className="text-gray-600">
//             Tailor your resume for specific job opportunities
//           </p>
//         </div>
//       </div>

//       {!showResults ? (
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Job Description
//             </label>
//             <textarea
//               value={jobDescription}
//               onChange={(e) => setJobDescription(e.target.value)}
//               placeholder="Paste the job description here. Include requirements, responsibilities, and preferred qualifications..."
//               rows={8}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//             />
//             <p className="text-sm text-gray-500 mt-2">
//               The more detailed the job description, the better the optimization
//               results.
//             </p>
//           </div>

//           <div className="flex justify-center">
//             <button
//               onClick={optimizeResume}
//               disabled={isOptimizing || !jobDescription.trim()}
//               className="flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//             >
//               <FiRefreshCw
//                 className={`w-5 h-5 mr-2 ${isOptimizing ? "animate-spin" : ""}`}
//               />
//               {isOptimizing ? "Optimizing Resume..." : "Optimize Resume"}
//             </button>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <FiTrendingUp className="w-6 h-6 text-blue-600" />
//               </div>
//               <h3 className="font-semibold text-gray-800 mb-2">
//                 ATS Optimization
//               </h3>
//               <p className="text-sm text-gray-600">
//                 Optimize for Applicant Tracking Systems with relevant keywords
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <FiZap className="w-6 h-6 text-green-600" />
//               </div>
//               <h3 className="font-semibold text-gray-800 mb-2">
//                 Smart Suggestions
//               </h3>
//               <p className="text-sm text-gray-600">
//                 Get AI-powered suggestions for skills and improvements
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <FiTarget className="w-6 h-6 text-purple-600" />
//               </div>
//               <h3 className="font-semibold text-gray-800 mb-2">Job Matching</h3>
//               <p className="text-sm text-gray-600">
//                 Align your resume content with job requirements
//               </p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="space-y-8">
//           <div className="flex items-center justify-between">
//             <h3 className="text-xl font-semibold text-gray-800">
//               Optimization Results
//             </h3>
//             <div className="flex space-x-3">
//               <button
//                 onClick={applyOptimization}
//                 className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//               >
//                 <FiCheck className="w-4 h-4 mr-2" />
//                 Apply Changes
//               </button>
//               <button
//                 onClick={clearOptimization}
//                 className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Start Over
//               </button>
//             </div>
//           </div>

//           {optimization?.optimized_summary && (
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//               <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
//                 <FiArrowRight className="w-4 h-4 mr-2" />
//                 Optimized Professional Summary
//               </h4>
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-sm text-gray-600 mb-2">Current Summary:</p>
//                   <p className="text-gray-800 bg-white p-3 rounded border">
//                     {resumeData.summary || "No summary provided"}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-blue-600 mb-2">
//                     AI-Optimized Summary:
//                   </p>
//                   <p className="text-gray-800 bg-blue-100 p-3 rounded border border-blue-300">
//                     {optimization.optimized_summary}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {optimization?.suggested_skills?.length > 0 && (
//             <div className="bg-green-50 border border-green-200 rounded-lg p-6">
//               <h4 className="font-semibold text-green-800 mb-3 flex items-center">
//                 <FiZap className="w-4 h-4 mr-2" />
//                 Suggested Skills to Add
//               </h4>
//               <div className="flex flex-wrap gap-2">
//                 {optimization.suggested_skills.map(
//                   (skill: string, index: number) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm border border-green-300"
//                     >
//                       {skill}
//                     </span>
//                   )
//                 )}
//               </div>
//             </div>
//           )}

//           {optimization?.keyword_matches?.length > 0 && (
//             <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
//               <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
//                 <FiTarget className="w-4 h-4 mr-2" />
//                 Matching Keywords Found
//               </h4>
//               <div className="flex flex-wrap gap-2">
//                 {optimization.keyword_matches.map(
//                   (keyword: string, index: number) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm border border-purple-300"
//                     >
//                       {keyword}
//                     </span>
//                   )
//                 )}
//               </div>
//             </div>
//           )}

//           {optimization?.improvement_suggestions?.length > 0 && (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
//               <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
//                 <FiTrendingUp className="w-4 h-4 mr-2" />
//                 Improvement Suggestions
//               </h4>
//               <ul className="space-y-2">
//                 {optimization.improvement_suggestions.map(
//                   (suggestion: string, index: number) => (
//                     <li key={index} className="flex items-start">
//                       <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
//                       <span className="text-gray-700">{suggestion}</span>
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobOptimizer;

"use client";

import React, { useState, useCallback } from "react";
import { useResumeStore } from "../../../lib/store";
import { resumeAPI, ResumeData as ApiResumeData } from "../../../lib/api";
import { toast } from "react-hot-toast";
import {
  FiTarget,
  FiRefreshCw,
  FiCheck,
  FiArrowRight,
  FiZap,
  FiTrendingUp,
} from "react-icons/fi";

interface OptimizationResult {
  optimized_summary?: string;
  suggested_skills?: string[];
  keyword_matches?: string[];
  improvement_suggestions?: string[];
}

interface JobOptimizerProps {
  onOptimizationComplete?: () => void;
}

const JobOptimizer: React.FC<JobOptimizerProps> = ({
  onOptimizationComplete,
}) => {
  const { resumeData, setResumeData } = useResumeStore();
  const [jobDescription, setJobDescription] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimization, setOptimization] = useState<OptimizationResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const optimizeResume = useCallback(async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }

    if (!resumeData.name || !resumeData.skills?.length) {
      toast.error("Please complete your resume basic information first");
      return;
    }

    setIsOptimizing(true);
    try {
      const sanitizedResumeData: ApiResumeData = {
        name: resumeData.name || "",
        skills: Array.isArray(resumeData.skills)
          ? resumeData.skills.filter((s): s is string => typeof s === "string")
          : [],
        summary: resumeData.summary || "",
        email: resumeData.email || "",
        education: Array.isArray(resumeData.education) ? resumeData.education : [],
        experience: Array.isArray(resumeData.experience) ? resumeData.experience : [],
      };
      console.log("Sending data to API:", { job_description: jobDescription, resume_data: sanitizedResumeData });

      const response = await resumeAPI.optimizeResume({
        job_description: jobDescription,
        resume_data: sanitizedResumeData,
      });

      console.log("API Response:", response);
      if (!response || typeof response !== "object") {
        throw new Error("Invalid response format from server");
      }

      setOptimization(response);
      setShowResults(true);
      toast.success("Resume optimization completed!");
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage = error.response?.data?.error?.details || error.message || "Failed to optimize resume";
      toast.error(errorMessage);
    } finally {
      setIsOptimizing(false);
    }
  }, [jobDescription, resumeData]);

  const applyOptimization = useCallback(() => {
    if (!optimization) {
      toast.error("No optimization data available");
      return;
    }

    console.log("Applying optimization:", optimization);

    if (typeof optimization.optimized_summary === "string") {
      setResumeData({ summary: optimization.optimized_summary });
      console.log("Updated summary:", useResumeStore.getState().resumeData.summary);
    }

    if (Array.isArray(optimization.suggested_skills) && optimization.suggested_skills.length) {
      const currentSkills = Array.isArray(resumeData.skills) ? resumeData.skills : [];
      const newSkills = [...currentSkills];

      optimization.suggested_skills.forEach((skill: string) => {
        if (typeof skill === "string" && !newSkills.some((existing) => existing.toLowerCase() === skill.toLowerCase())) {
          newSkills.push(skill);
        }
      });

      setResumeData({ skills: newSkills });
      console.log("Updated skills:", useResumeStore.getState().resumeData.skills);
    }

    toast.success("Optimization applied to your resume!");
    onOptimizationComplete?.();
  }, [optimization, resumeData.skills, setResumeData, onOptimizationComplete]);

  const clearOptimization = () => {
    setOptimization(null);
    setShowResults(false);
    setJobDescription("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
          <FiTarget className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Job-Specific Optimization
          </h2>
          <p className="text-gray-600">
            Tailor your resume for specific job opportunities
          </p>
        </div>
      </div>

      {!showResults ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here. Include requirements, responsibilities, and preferred qualifications..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              The more detailed the job description, the better the optimization
              results.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={optimizeResume}
              disabled={isOptimizing || !jobDescription.trim()}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <FiRefreshCw
                className={`w-5 h-5 mr-2 ${isOptimizing ? "animate-spin" : ""}`}
              />
              {isOptimizing ? "Optimizing Resume..." : "Optimize Resume"}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiTrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                ATS Optimization
              </h3>
              <p className="text-sm text-gray-600">
                Optimize for Applicant Tracking Systems with relevant keywords
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiZap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Smart Suggestions
              </h3>
              <p className="text-sm text-gray-600">
                Get AI-powered suggestions for skills and improvements
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiTarget className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Job Matching</h3>
              <p className="text-sm text-gray-600">
                Align your resume content with job requirements
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">
              Optimization Results
            </h3>
            <div className="flex space-x-3">
              <button
                onClick={applyOptimization}
                className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <FiCheck className="w-4 h-4 mr-2" />
                Apply Changes
              </button>
              <button
                onClick={clearOptimization}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>

          {optimization?.optimized_summary && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                <FiArrowRight className="w-4 h-4 mr-2" />
                Optimized Professional Summary
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Current Summary:</p>
                  <p className="text-gray-800 bg-white p-3 rounded border">
                    {resumeData.summary || "No summary provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-600 mb-2">
                    AI-Optimized Summary:
                  </p>
                  <p className="text-gray-800 bg-blue-100 p-3 rounded border border-blue-300">
                    {optimization.optimized_summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {optimization?.suggested_skills?.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                <FiZap className="w-4 h-4 mr-2" />
                Suggested Skills to Add
              </h4>
              <div className="flex flex-wrap gap-2">
                {optimization.suggested_skills.map(
                  (skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm border border-green-300"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          {optimization?.keyword_matches?.length > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                <FiTarget className="w-4 h-4 mr-2" />
                Matching Keywords Found
              </h4>
              <div className="flex flex-wrap gap-2">
                {optimization.keyword_matches.map(
                  (keyword: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm border border-purple-300"
                    >
                      {keyword}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          {optimization?.improvement_suggestions?.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                <FiTrendingUp className="w-4 h-4 mr-2" />
                Improvement Suggestions
              </h4>
              <ul className="space-y-2">
                {optimization.improvement_suggestions.map(
                  (suggestion: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobOptimizer;
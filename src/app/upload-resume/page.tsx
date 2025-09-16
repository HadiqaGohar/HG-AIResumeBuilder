
// "use client";

// import { useState, useCallback, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { useResumeStore } from "../../../lib/store";
// import { frontendAPI, apiUtils } from "../../../lib/api";
// import { toast } from "react-hot-toast";
// import { FiUpload, FiFile, FiCheck, FiX } from "react-icons/fi";

// export default function UploadResume() {
//   const { setResumeData, setTemplateId } = useResumeStore();
//   const router = useRouter();
//   const { status } = useSession();

//   // State
//   const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [uploadError, setUploadError] = useState<string | null>(null);
//   const [dragActive, setDragActive] = useState(false);

//   // Get template ID from URL params
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const templateParam = urlParams.get("template");
//     if (templateParam) {
//       setSelectedTemplate(templateParam);
//       setTemplateId(templateParam);
//     }
//   }, [setTemplateId]);

//   // Redirect to signin if not authenticated
//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/auth/signin");
//     }
//   }, [status, router]);

//   // --- Handlers ---
//   const handleFileUpload = useCallback(
//     async (file: File) => {
//       // Validate file type
//       if (!apiUtils.isValidFileType(file)) {
//         setUploadError("Please upload a PDF or DOCX file only.");
//         toast.error("Invalid file type. Please upload PDF or DOCX files only.");
//         return;
//       }

//       // Validate file size (max 10MB)
//       const maxSize = 10 * 1024 * 1024;
//       if (file.size > maxSize) {
//         setUploadError("File size must be less than 10MB.");
//         toast.error("File too large. Please upload a file smaller than 10MB.");
//         return;
//       }

//       setUploadedFile(file);
//       setIsProcessing(true);
//       setUploadError(null);

//       try {
//         toast.loading("AI is analyzing your resume...", { id: "upload" });

//         const extractedData = await frontendAPI.uploadResume(file);

//         const validationErrors = apiUtils.validateResumeData(extractedData);
//         if (validationErrors.length > 0) {
//           console.warn("Validation warnings:", validationErrors);
//           toast.dismiss("upload");
//           toast.success(
//             "Resume uploaded with some missing information. You can edit it later."
//           );
//         } else {
//           toast.dismiss("upload");
//           toast.success("Resume successfully analyzed and uploaded!");
//         }

//         setResumeData(extractedData);

//         if (selectedTemplate) {
//           router.push(`/resume/customize/${selectedTemplate}`);
//         } else {
//           // ...............................For check..........................................
//           // router.push("/upload-resume/ai-templates");
//           router.push("/template");
//         }
//       } catch (err: unknown) {
//         const message =
//           err instanceof Error
//             ? err.message
//             : "Failed to process your resume. Please try again.";
//         console.error("Upload error:", err);
//         setUploadError(message);
//         toast.dismiss("upload");
//         toast.error(message);
//       } finally {
//         setIsProcessing(false);
//       }
//     },
//     [setResumeData, router, selectedTemplate]
//   );

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) handleFileUpload(file);
//   };

//   const handleDrag = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   }, []);

//   const handleDrop = useCallback(
//     (e: React.DragEvent) => {
//       e.preventDefault();
//       e.stopPropagation();
//       setDragActive(false);

//       if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//         handleFileUpload(e.dataTransfer.files[0]);
//       }
//     },
//     [handleFileUpload]
//   );

//   const removeFile = () => {
//     setUploadedFile(null);
//     setUploadError(null);
//   };

//   // --- Conditional Rendering (after hooks declared) ---
//   if (status === "loading") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (status === "unauthenticated") {
//     return null;
//   }

//   // --- UI ---
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 flex items-center justify-center">
//       <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-3xl border border-gray-100">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
//             <FiUpload className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">
//             AI-Powered Resume Upload
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Upload your existing resume and let our AI transform it into a
//             professional masterpiece
//           </p>
//         </div>

//         {/* Upload Area */}
//         <div className="mb-8">
//           <div
//             className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
//               dragActive
//                 ? "border-blue-500 bg-blue-50"
//                 : uploadedFile
//                 ? "border-green-500 bg-green-50"
//                 : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
//             }`}
//             onDragEnter={handleDrag}
//             onDragLeave={handleDrag}
//             onDragOver={handleDrag}
//             onDrop={handleDrop}
//           >
//             {!uploadedFile ? (
//               <>
//                 <div className="mb-4">
//                   <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-xl font-semibold text-gray-700 mb-2">
//                     {dragActive
//                       ? "Drop your resume here"
//                       : "Drag & drop your resume"}
//                   </p>
//                   <p className="text-gray-500 mb-4">or</p>
//                 </div>

//                 <label className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
//                   <input
//                     type="file"
//                     accept=".pdf,.docx"
//                     onChange={handleFileChange}
//                     className="hidden"
//                     disabled={isProcessing}
//                   />
//                   <FiFile className="w-5 h-5 mr-2" />
//                   Choose File
//                 </label>

//                 <p className="text-sm text-gray-500 mt-4">
//                   Supports PDF and DOCX files up to 10MB
//                 </p>
//               </>
//             ) : (
//               <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-green-200">
//                 <div className="flex items-center">
//                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
//                     <FiCheck className="w-5 h-5 text-green-600" />
//                   </div>
//                   <div className="text-left">
//                     <p className="font-semibold text-gray-800">
//                       {uploadedFile.name}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {apiUtils.formatFileSize(uploadedFile.size)}
//                     </p>
//                   </div>
//                 </div>
//                 {!isProcessing && (
//                   <button
//                     onClick={removeFile}
//                     className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
//                   >
//                     <FiX className="w-4 h-4 text-red-600" />
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Processing Status */}
//         {isProcessing && (
//           <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
//             <div className="flex items-center justify-center mb-4">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             </div>
//             <p className="text-blue-800 font-semibold text-center mb-2">
//               AI is analyzing your resume...
//             </p>
//             <p className="text-blue-600 text-sm text-center">
//               This may take a few moments while we extract and structure your
//               information
//             </p>
//           </div>
//         )}

//         {/* Error Display */}
//         {uploadError && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
//             <div className="flex items-center">
//               <FiX className="w-5 h-5 text-red-600 mr-2" />
//               <p className="text-red-800 font-semibold">Upload Error</p>
//             </div>
//             <p className="text-red-600 text-sm mt-1">{uploadError}</p>
//           </div>
//         )}

//         {/* Features */}
//         <div className="grid md:grid-cols-3 gap-6 mt-8">
//           <div className="text-center p-4">
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
//               <span className="text-2xl">🤖</span>
//             </div>
//             <h3 className="font-semibold text-gray-800 mb-2">AI-Powered</h3>
//             <p className="text-sm text-gray-600">
//               Advanced AI extracts and structures your resume data automatically
//             </p>
//           </div>

//           <div className="text-center p-4">
//             <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
//               <span className="text-2xl">⚡</span>
//             </div>
//             <h3 className="font-semibold text-gray-800 mb-2">Lightning Fast</h3>
//             <p className="text-sm text-gray-600">
//               Process your resume in seconds, not minutes
//             </p>
//           </div>

//           <div className="text-center p-4">
//             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
//               <span className="text-2xl">🎨</span>
//             </div>
//             <h3 className="font-semibold text-gray-800 mb-2">
//               Beautiful Templates
//             </h3>
//             <p className="text-sm text-gray-600">
//               Choose from professionally designed templates
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useResumeStore } from "../../../lib/store";
import { frontendAPI, apiUtils } from "../../../lib/api";
import { toast } from "react-hot-toast";
import { FiUpload, FiFile, FiCheck, FiX, FiActivity, FiZap, FiBrush } from "react-icons/fi";

export default function UploadResume() {
  const { setResumeData, setTemplateId } = useResumeStore();
  const router = useRouter();
  const { status } = useSession();

  // State
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Get template ID from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const templateParam = urlParams.get("template");
    if (templateParam) {
      setSelectedTemplate(templateParam);
      setTemplateId(templateParam);
    }
  }, [setTemplateId]);

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // --- Handlers ---
  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!apiUtils.isValidFileType(file)) {
        setUploadError("Please upload a PDF or DOCX file only.");
        toast.error("Invalid file type. Please upload PDF or DOCX files only.");
        return;
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setUploadError("File size must be less than 10MB.");
        toast.error("File too large. Please upload a file smaller than 10MB.");
        return;
      }

      setUploadedFile(file);
      setIsProcessing(true);
      setUploadError(null);

      try {
        toast.loading("AI is analyzing your resume...", { id: "upload" });

        const extractedData = await frontendAPI.uploadResume(file);

        const validationErrors = apiUtils.validateResumeData(extractedData);
        if (validationErrors.length > 0) {
          console.warn("Validation warnings:", validationErrors);
          toast.dismiss("upload");
          toast.success(
            "Resume uploaded with some missing information. You can edit it later."
          );
        } else {
          toast.dismiss("upload");
          toast.success("Resume successfully analyzed and uploaded!");
        }

        setResumeData(extractedData);

        if (selectedTemplate) {
          router.push(`/resume/customize/${selectedTemplate}`);
        } else {
          router.push("/template");
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to process your resume. Please try again.";
        console.error("Upload error:", err);
        setUploadError(message);
        toast.dismiss("upload");
        toast.error(message);
      } finally {
        setIsProcessing(false);
      }
    },
    [setResumeData, router, selectedTemplate]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileUpload(e.dataTransfer.files[0]);
      }
    },
    [handleFileUpload]
  );

  const removeFile = () => {
    setUploadedFile(null);
    setUploadError(null);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-2 sm:p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-2 sm:mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-2 sm:p-4 flex items-center justify-center">
      <div className="bg-white rounded-xl sm:rounded-3xl shadow-lg p-4 sm:p-6 w-full max-w-3xl border border-gray-100">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-2 sm:mb-4">
            <FiUpload className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
            AI-Powered Resume Upload
          </h1>
          <p className="text-gray-600 text-sm sm:text-lg">
            Upload your existing resume and let our AI transform it into a
            professional masterpiece
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-4 sm:mb-6">
          <div
            className={`relative border-2 border-dashed rounded-xl p-2 sm:p-4 text-center transition-all duration-300 ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : uploadedFile
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!uploadedFile ? (
              <>
                <div className="mb-2 sm:mb-4">
                  <FiUpload className="w-6 h-6 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-1 sm:mb-2" />
                  <p className="text-base sm:text-xl font-semibold text-gray-700 mb-1 sm:mb-2">
                    {dragActive
                      ? "Drop your resume here"
                      : "Drag & drop your resume"}
                  </p>
                  <p className="text-gray-500 mb-1 sm:mb-2 text-sm sm:text-base">
                    or
                  </p>
                </div>

                <label className="inline-flex items-center px-4 sm:px-6 py-1 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm">
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isProcessing}
                  />
                  <FiFile className="w-3 sm:w-5 h-3 sm:h-5 mr-1 sm:mr-2" />
                  Choose File
                </label>

                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                  Supports PDF and DOCX files up to 10MB
                </p>
              </>
            ) : (
              <div className="flex items-center justify-between bg-white rounded-lg p-2 sm:p-3 border border-green-200">
                <div className="flex items-center">
                  <div className="w-6 h-6 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mr-1 sm:mr-2">
                    <FiCheck className="w-3 sm:w-5 h-3 sm:h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 text-xs sm:text-sm">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {apiUtils.formatFileSize(uploadedFile.size)}
                    </p>
                  </div>
                </div>
                {!isProcessing && (
                  <button
                    onClick={removeFile}
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                  >
                    <FiX className="w-3 sm:w-4 h-3 sm:h-4 text-red-600" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
            </div>
            <p className="text-blue-800 font-semibold text-center text-sm sm:text-base mb-1 sm:mb-2">
              AI is analyzing your resume...
            </p>
            <p className="text-blue-600 text-xs sm:text-sm text-center">
              This may take a few moments while we extract and structure your
              information
            </p>
          </div>
        )}

        {/* Error Display */}
        {uploadError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-2 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-center">
              <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-1 sm:mr-2" />
              <p className="text-red-800 font-semibold text-sm sm:text-base">
                Upload Error
              </p>
            </div>
            <p className="text-red-600 text-xs sm:text-sm mt-1">{uploadError}</p>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
          <div className="text-center p-2 sm:p-3">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
              <FiActivity className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-base mb-1 sm:mb-2">
              AI-Powered
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Advanced AI extracts and structures your resume data automatically
            </p>
          </div>

          <div className="text-center p-2 sm:p-3">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
              <FiZap className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-base mb-1 sm:mb-2">
              Lightning Fast
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Process your resume in seconds, not minutes
            </p>
          </div>

          <div className="text-center p-2 sm:p-3">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
              <FiBrush className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-base mb-1 sm:mb-2">
              Beautiful Templates
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Choose from professionally designed templates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

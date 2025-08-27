// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// // import { useSession } from 'next-auth/react';
// import { useResumeStore } from '../../../../../lib/store';
// import { Button } from '../../../components/ui/button';
// import { FiArrowRight, FiUpload, FiEdit3, FiEye } from 'react-icons/fi';
// import Link from 'next/link';
// import Image from 'next/image';


// export default function CustomizeTemplate({
//   params,
// }: {
//   params: { templateId: string };
// }) {
//   const router = useRouter();
//   // const { data: session } = useSession();
//   const { setTemplateId, 
//     // templateId
//    } = useResumeStore();

//   useEffect(() => {
//     // Set the template ID when the page loads
//     setTemplateId(params.templateId);
//   }, [params.templateId, setTemplateId]);

//   const handleCreateNew = () => {
//     // Both guests and authenticated users can use the dashboard
//     // Guests will see prompts to sign in for saving features
//     router.push('/dashboard');
//   };

//   const handleUploadResume = () => {
//     // Go to upload resume page
//     router.push('/upload-resume');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
//       <div className="max-w-4xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//             Let&apos;s Build Your Resume
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             You&apos;ve selected Template {params.templateId}. Choose how you&apos;d like to get started.
//           </p>
//         </div>

//         {/* Options Cards */}
//         <div className="grid md:grid-cols-2 gap-8 mb-12">
//           {/* Create New Resume */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-purple-300 transition-all duration-300 transform hover:scale-105">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <FiEdit3 className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">
//                 Create New Resume
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 Start from scratch with our guided resume builder. Fill in your information step by step with AI assistance.
//               </p>
//               <ul className="text-left text-gray-600 mb-8 space-y-2">
//                 <li className="flex items-center">
//                   <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//                   AI-powered content suggestions
//                 </li>
//                 <li className="flex items-center">
//                   <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//                   Real-time preview
//                 </li>
//                 <li className="flex items-center">
//                   <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//                   ATS-friendly formatting
//                 </li>
//                 <li className="flex items-center">
//                   <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//                   Professional templates
//                 </li>
//               </ul>
//               <Button
//                 onClick={handleCreateNew}
//                 className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center"
//               >
//                 Start Building
//                 <FiArrowRight className="ml-2 w-5 h-5" />
//               </Button>
//             </div>
//           </div>

//           {/* Upload Existing Resume */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-blue-300 transition-all duration-300 transform hover:scale-105">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <FiUpload className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">
//                 Upload Existing Resume
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 Have a resume already? Upload it and we&apos;ll extract your information and apply it to your chosen template.
//               </p>
//               <ul className="text-left text-gray-600 mb-8 space-y-2">
//                 <li className="flex items-center">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
//                   Automatic data extraction
//                 </li>
//                 <li className="flex items-center">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
//                   PDF & Word support
//                 </li>
//                 <li className="flex items-center">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
//                   AI enhancement suggestions
//                 </li>
//                 <li className="flex items-center">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
//                   Quick template conversion
//                 </li>
//               </ul>
//               <Button
//                 onClick={handleUploadResume}
//                 className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center"
//               >
//                 Upload Resume
//                 <FiUpload className="ml-2 w-5 h-5" />
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="text-center">
//           <p className="text-gray-600 mb-6">
//             Need to see more templates or preview your current selection?
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link href="/template">
//               <Button
//                 variant="outline"
//                 className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600 transition-all duration-300"
//               >
//                 <FiEye className="mr-2 w-5 h-5" />
//                 Browse Templates
//               </Button>
//             </Link>
//             <Link href="/dashboard">
//               <Button
//                 variant="outline"
//                 className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
//               >
//                 <FiEdit3 className="mr-2 w-5 h-5" />
//                 Go to Editor
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {/* Template Preview (if available) */}
//         {params.templateId === '1' && (
//           <div className="mt-12 text-center">
//             <h4 className="text-lg font-semibold text-gray-700 mb-4">
//               Selected Template Preview
//             </h4>
//             <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto">
//               <Image 
//                 src="/Template/template1.png" 
//                 alt="Template 1 Preview" 
//                 className="w-full h-auto rounded"
//                 height={100}
//                 width={100}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
// import { useSession } from 'next-auth/react';
import { useResumeStore } from '../../../../../lib/store';
import { Button } from '../../../components/ui/button';
import { FiArrowRight, FiUpload, FiEdit3, FiEye } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

export default function CustomizeTemplate() {
  const router = useRouter();
  // ✅ Read [templateId] from the URL in a client component
  const params = useParams<{ templateId: string | string[] }>();
  const templateId =
    Array.isArray(params?.templateId) ? params.templateId[0] : params?.templateId ?? '';

  // const { data: session } = useSession();
  const { setTemplateId } = useResumeStore();

  useEffect(() => {
    if (templateId) setTemplateId(templateId);
  }, [templateId, setTemplateId]);

  const handleCreateNew = () => {
    router.push('/dashboard');
  };

  const handleUploadResume = () => {
    router.push('/upload-resume');
  };

  return (
    <Suspense fallback={<div className="p-6 text-gray-600">Loading...</div>}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Let&apos;s Build Your Resume
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {templateId
                ? <>You&apos;ve selected Template {templateId}. Choose how you&apos;d like to get started.</>
                : <>Choose how you&apos;d like to get started.</>}
            </p>
          </div>

          {/* Options Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Create New Resume */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-purple-300 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiEdit3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Create New Resume
                </h3>
                <p className="text-gray-600 mb-6">
                  Start from scratch with our guided resume builder. Fill in your information step by step with AI assistance.
                </p>
                <ul className="text-left text-gray-600 mb-8 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    AI-powered content suggestions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Real-time preview
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    ATS-friendly formatting
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Professional templates
                  </li>
                </ul>
                <Button
                  onClick={handleCreateNew}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center"
                >
                  Start Building
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Upload Existing Resume */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-blue-300 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiUpload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Upload Existing Resume
                </h3>
                <p className="text-gray-600 mb-6">
                  Have a resume already? Upload it and we&apos;ll extract your information and apply it to your chosen template.
                </p>
                <ul className="text-left text-gray-600 mb-8 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Automatic data extraction
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    PDF &amp; Word support
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    AI enhancement suggestions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Quick template conversion
                  </li>
                </ul>
                <Button
                  onClick={handleUploadResume}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center"
                >
                  Upload Resume
                  <FiUpload className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Need to see more templates or preview your current selection?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/template">
                <Button
                  variant="outline"
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600 transition-all duration-300"
                >
                  <FiEye className="mr-2 w-5 h-5" />
                  Browse Templates
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                >
                  <FiEdit3 className="mr-2 w-5 h-5" />
                  Go to Editor
                </Button>
              </Link>
            </div>
          </div>

          {/* Template Preview (if available) */}
          {templateId === '1' && (
            <div className="mt-12 text-center">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Selected Template Preview
              </h4>
              <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto">
                <Image
                  src="/Template/template1.png"
                  alt="Template 1 Preview"
                  className="w-full h-auto rounded"
                  height={100}
                  width={100}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}

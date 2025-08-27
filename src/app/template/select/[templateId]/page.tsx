'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useResumeStore } from '../../../../../lib/store';
import { Button } from '../../../components/ui/button';
import { FiArrowRight, FiUpload, FiEdit3, FiEye, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

// export default function SelectTemplate({
//   params,
// }: {
//   params: { templateId: string };
// }) {
//   const router = useRouter();
//   const { setTemplateId } = useResumeStore();

export default function SelectTemplate() {
  const router = useRouter();
  const params = useParams<{ templateId: string }>(); // ✅ useParams is the correct way in client components
  const { setTemplateId } = useResumeStore();

  useEffect(() => {
    setTemplateId(params.templateId);
  }, [params.templateId, setTemplateId]);

  const handleCreateNew = () => {
    router.push('/dashboard');
  };

  const handleUploadResume = () => {
    router.push(`/upload-resume/ai-templates/${params.templateId}`);
  };

  const getTemplateName = (id: string) => {
    switch (id) {
      case '1':
        return 'Chameleon Pro Resume';
      case '2':
        return 'Modern Professional';
      default:
        return `Template ${id}`;
    }
  };

  const getTemplateDescription = (id: string) => {
    switch (id) {
      case '1':
        return 'Clean, ATS-friendly design with customizable colors to match your personal brand.';
      case '2':
        return 'Two-column, professional layout with modern styling.';
      default:
        return 'Professional resume template designed for success.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/template"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Templates
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            You Selected: {getTemplateName(params.templateId)}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {getTemplateDescription(params.templateId)}
          </p>
          
          {/* Template Preview */}
          {params.templateId === '1' && (
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-white rounded-lg shadow-xl p-4">
                <Image 
                  src="/Template/template1.png" 
                  alt="Template 1 Preview" 
                  width={400}
                  height={500}
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
          )}
        </div>

        {/* Options */}
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
                  Step-by-step guidance
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  AI-powered suggestions
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Real-time preview
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Professional formatting
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

          {/* Upload & AI Enhancement */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-blue-300 transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiUpload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Upload & Enhance with AI
              </h3>
              <p className="text-gray-600 mb-6">
                Upload your existing resume and let AI enhance it with our selected template design.
              </p>
              <ul className="text-left text-gray-600 mb-8 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Automatic data extraction
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  AI content enhancement
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Template conversion
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Professional optimization
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

        {/* Template Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            What You Get with {getTemplateName(params.templateId)}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiEye className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">ATS-Friendly</h4>
              <p className="text-gray-600 text-sm">Optimized for Applicant Tracking Systems</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiEdit3 className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Customizable</h4>
              <p className="text-gray-600 text-sm">Colors, fonts, and layout options</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiArrowRight className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Professional</h4>
              <p className="text-gray-600 text-sm">Designed by experts for success</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-600">
            Need help choosing? <Link href="/faq" className="text-purple-600 hover:underline">Check our FAQ</Link> or try our AI assistant!
          </p>
        </div>
      </div>
    </div>
  );
}
'use client';
import { useRouter } from 'next/navigation';
import { FiUpload, FiPlus, FiX, FiFile, FiEdit3 } from 'react-icons/fi';
import { Card, CardContent } from './ui/card';

interface ResumeOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateId: string;
}

export default function ResumeOptionModal({ isOpen, onClose, templateId }: ResumeOptionModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleNewResume = () => {
    onClose();
    router.push(`/resume/customize/${templateId}`);
  };

  const handleUploadResume = () => {
    onClose();
    router.push(`/upload-resume?template=${templateId}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Choose Your Path</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-gray-600 text-center mb-6">
            How would you like to create your resume?
          </p>

          {/* New Resume Option */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-purple-500 group"
            onClick={handleNewResume}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiPlus className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Create New Resume
                  </h3>
                  <p className="text-sm text-gray-600">
                    Start fresh with AI-guided questions and smart suggestions
                  </p>
                </div>
                <FiEdit3 className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
              </div>
            </CardContent>
          </Card>

          {/* Upload Resume Option */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-green-500 group"
            onClick={handleUploadResume}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiUpload className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Upload Existing Resume
                  </h3>
                  <p className="text-sm text-gray-600">
                    Upload your PDF/DOCX and let AI extract and improve it
                  </p>
                </div>
                <FiFile className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
              </div>
            </CardContent>
          </Card>

          {/* Features List */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">{"✨ What you'll get:"}</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• AI-powered content optimization</li>
              <li>• ATS-friendly formatting</li>
              <li>• Professional templates</li>
              <li>• Real-time preview</li>
              <li>• Download in multiple formats</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}